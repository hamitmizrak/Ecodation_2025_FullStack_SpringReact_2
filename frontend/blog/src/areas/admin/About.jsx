// src/areas/admin/About.jsx

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

import ReusableToast from "./resuability/ReusableToast";
import { showSuccess, showError, showInfo, showPromise } from "./resuability/toastHelper";
import DataTable from "./resuability/DataTable";
import BsModal from "./resuability/BsModal";
import ExportButtons from "./resuability/ExportButtons";
import FilterBar from "./resuability/FilterBar";
import FormField from "./resuability/FormField";
import LoadingSpinner from "./resuability/LoadingSpinner";
import { API_BASE, ENDPOINTS, IMAGE_BASE } from "../../config/api";
import FileUpload from "./resuability/FileUpload";
import FormDetailModal from "./resuability/FormDetailModal";
import FormEditModal from "./resuability/FormEditModal";
import FormConfirmDialog from "./resuability/FormConfirmDialog";

// ------- Helper Fonksiyonlar -------
const EMPTY_IMAGE_MARKERS = ["", "null", "undefined", "-", "yok", "resim yok"];
const isEmptyLike = (u) => {
  const s = String(u ?? "").trim().toLowerCase();
  return EMPTY_IMAGE_MARKERS.includes(s);
};
const isProbablyImageUrl = (u) => {
  const s = String(u ?? "").trim();
  return (
      /^https?:\/\//i.test(s) ||
      s.startsWith("/upload/") ||
      /\.(jpe?g|png|webp|gif|bmp|svg)(\?.*)?$/i.test(s)
  );
};
const normalizeImageUrl = (u) => {
  if (isEmptyLike(u)) return "";
  const s = String(u ?? "").trim();
  return isProbablyImageUrl(s) ? s : "";
};
const truncate = (str, n = 50) =>
    str && str.length > n ? str.slice(0, n) + "…" : str || "";
const pick = (obj, ...keys) => {
  for (const k of keys) {
    const v = obj?.[k];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return undefined;
};
function normalizeApiResult(res) {
  const root = res?.data ?? res;
  const payload = root?.data ?? root?.result ?? root?.items ?? root?.content ?? root;
  return payload;
}
function normalizeBackendError(be) {
  if (!be) return { general: "İşlem başarısız", fields: {} };
  const general =
      pick(be, "message", "error", "errorMessage", "detail", "description") ||
      pick(be?.data, "message", "error") ||
      pick(be?.result, "message", "error") ||
      "İşlem başarısız";
  const fields = {};
  const mapLike =
      be?.fieldErrors && typeof be.fieldErrors === "object" && !Array.isArray(be.fieldErrors)
          ? be.fieldErrors
          : be?.errors && typeof be.errors === "object" && !Array.isArray(be.errors)
              ? be.errors
              : be?.data?.fieldErrors && typeof be.data.fieldErrors === "object"
                  ? be.data.fieldErrors
                  : be?.result?.fieldErrors && typeof be.result.fieldErrors === "object"
                      ? be.result.fieldErrors
                      : null;
  if (mapLike) {
    for (const [k, v] of Object.entries(mapLike)) {
      if (v) fields[k] = Array.isArray(v) ? v[0] : String(v);
    }
  }
  const arr =
      (Array.isArray(be?.fieldErrors) && be.fieldErrors) ||
      (Array.isArray(be?.errors) && be.errors) ||
      (Array.isArray(be?.validationErrors) && be.validationErrors) ||
      (Array.isArray(be?.violations) && be.violations) ||
      (Array.isArray(be?.data?.errors) && be.data.errors) ||
      (Array.isArray(be?.result?.errors) && be.result.errors) ||
      null;
  if (arr) {
    arr.forEach((it) => {
      const key =
          it?.field || it?.name || it?.propertyPath || it?.path || it?.param || it?.code;
      const msg =
          it?.message ||
          it?.defaultMessage ||
          it?.errorMessage ||
          it?.reason ||
          it?.description;
      if (key && msg) fields[key] = msg;
    });
  }
  return { general, fields };
}
function resolveImageUrl(src) {
  if (!src) return "";
  if (/^https?:\/\//i.test(src)) return src;
  return `${IMAGE_BASE}${src.startsWith("/") ? src : "/" + src}`;
}
function getId(obj) {
  return (
      obj?.id ??
      obj?.aboutId ??
      obj?.aboutID ??
      obj?.uid ??
      obj?.uuid ??
      obj?.pkId ??
      obj?.about_id ??
      undefined
  );
}
function formatDate(iso) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" });
  } catch {
    return iso;
  }
}

// ---------- API Endpointler ve Client ----------
const RAW = ENDPOINTS?.ABOUT || {};
const RAW_LIST = RAW.LIST || "/about/api/v1.0.0/list";
const BASE = RAW_LIST.endsWith("/list")
    ? RAW_LIST.slice(0, -"/list".length)
    : RAW_LIST;
const EP = {
  LIST: RAW_LIST.endsWith("/list") ? RAW_LIST : `${BASE}/list`,
  CREATE: RAW.CREATE || `${BASE}/create`,
  UPDATE:
      typeof RAW.UPDATE === "function"
          ? RAW.UPDATE
          : (id) => `${(typeof RAW.UPDATE === "string" && RAW.UPDATE) || `${BASE}/update`}/${id}`,
  DELETE:
      typeof RAW.DELETE === "function"
          ? RAW.DELETE
          : (id) => `${(typeof RAW.DELETE === "string" && RAW.DELETE) || `${BASE}/delete`}/${id}`,
};
const client = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});
client.interceptors.request.use((cfg) => {
  const token =
      localStorage.getItem("access_token") ||
      localStorage.getItem("token") ||
      sessionStorage.getItem("access_token");
  if (token && !cfg.headers.Authorization) {
    cfg.headers.Authorization = /^Bearer\s/i.test(token) ? token : `Bearer ${token}`;
  }
  cfg.headers["X-Requested-With"] = "XMLHttpRequest";
  return cfg;
});

// ========== COMPONENT ==========
export default function About() {
  // ------ STATE ------
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const emptyForm = { aboutName: "", mission: "", vision: "", imageFile: null, imageUrl: "" };
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [errs, setErrs] = useState({ aboutName: "", mission: "", vision: "", general: "" });
  const invalid = useMemo(
      () => ({
        aboutName: !!errs.aboutName,
        mission: !!errs.mission,
        vision: !!errs.vision,
      }),
      [errs]
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    mission: "",
    vision: "",
    from: "",
    to: "",
    hasImage: false,
  });
  const [filtersDraft, setFiltersDraft] = useState(filters);
  const [sort, setSort] = useState({ by: "created", dir: "desc" });
  const setSortBy = (by) => {
    setSort((s) =>
        s.by === by ? { by, dir: s.dir === "asc" ? "desc" : "asc" } : { by, dir: "asc" }
    );
    setPage(1);
  };
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [zoom, setZoom] = useState({ visible: false, src: "", x: 0, y: 0 });
  const onThumbEnter = (src) =>
      setZoom({ visible: true, src: resolveImageUrl(src), x: 0, y: 0 });
  const onThumbMove = (e) =>
      setZoom((z) =>
          z.visible ? { ...z, x: e.clientX + 18, y: e.clientY + 18 } : z
      );
  const onThumbLeave = () => setZoom((z) => ({ ...z, visible: false }));

  // CRUD
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [detail, setDetail] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [preview, setPreview] = useState("");

  // --- FilterBar alan tanımı ---
  const filterFields = [
    { key: "name", label: "About Name", type: "text" },
    { key: "mission", label: "Misyon", type: "text" },
    { key: "vision", label: "Vizyon", type: "text" },
    { key: "hasImage", label: "Sadece resimli", type: "checkbox" },
    { key: "from", label: "Başlangıç tarihi", type: "date" },
    { key: "to", label: "Bitiş tarihi", type: "date" }
  ];

  // ------ VERİ ALIMI ------
  const refresh = async () => {
    setLoading(true);
    try {
      const res = await client.get(EP.LIST);
      const data = normalizeApiResult(res);
      const arr = Array.isArray(data)
          ? data
          : Array.isArray(data?.content)
              ? data.content
              : [];
      setItems(arr || []);
    } catch (e) {
      showError("Liste yüklenemedi. Ağ/yetki kontrol edin.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    refresh();
    // eslint-disable-next-line
  }, []);

  // --- FİLTRE/ARAMA/SORT/PAGE
  const filtered = useMemo(() => {
    let list = Array.isArray(items) ? items : [];
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
          (it) =>
              ((it.aboutName || it.about) || "").toLowerCase().includes(q) ||
              (it.mission || "").toLowerCase().includes(q) ||
              (it.vision || "").toLowerCase().includes(q)
      );
    }
    const name = (filters.name || "").toLowerCase();
    const mis = (filters.mission || "").toLowerCase();
    const vis = (filters.vision || "").toLowerCase();
    const from = filters.from ? new Date(filters.from + "T00:00:00") : null;
    const to = filters.to ? new Date(filters.to + "T23:59:59") : null;
    if (name)
      list = list.filter((it) =>
          ((it.aboutName || it.about) || "").toLowerCase().includes(name)
      );
    if (mis)
      list = list.filter((it) => (it.mission || "").toLowerCase().includes(mis));
    if (vis)
      list = list.filter((it) => (it.vision || "").toLowerCase().includes(vis));
    if (from || to) {
      list = list.filter((it) => {
        const d = it.systemCreatedDate ? new Date(it.systemCreatedDate) : null;
        if (!d) return false;
        if (from && d < from) return false;
        if (to && d > to) return false;
        return true;
      });
    }
    if (filters.hasImage) list = list.filter((it) => !!it.imageUrl);
    return list;
  }, [items, query, filters]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    const by = sort.by;
    const dir = sort.dir === "asc" ? 1 : -1;
    const getVal = (it) => {
      switch (by) {
        case "image":
          return it.imageUrl ? 1 : 0;
        case "about":
          return (it.aboutName || it.about || "").toLowerCase();
        case "mission":
          return (it.mission || "").toLowerCase();
        case "vision":
          return (it.vision || "").toLowerCase();
        case "created":
        default:
          return it.systemCreatedDate
              ? new Date(it.systemCreatedDate).getTime()
              : 0;
      }
    };
    arr.sort((a, b) => {
      const va = getVal(a);
      const vb = getVal(b);
      if (va < vb) return -1 * dir;
      if (va > vb) return 1 * dir;
      return 0;
    });
    return arr;
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages]);
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  // ----- columns (REUSABLE DATATABLE)
  const columns = [
    {
      key: "imageUrl",
      label: "Görsel",
      sortable: false,
      style: { width: 120 },
      render: (row) =>
          row.imageUrl ? (
              <div
                  className="thumb-wrap"
                  onMouseEnter={() => onThumbEnter(row.imageUrl)}
                  onMouseMove={onThumbMove}
                  onMouseLeave={onThumbLeave}
              >
                <img
                    src={resolveImageUrl(row.imageUrl)}
                    alt="about"
                    className="thumb-img border"
                />
                <div className="thumb-lens">
                  <i className="fa fa-search-plus" />
                </div>
              </div>
          ) : (
              <div
                  className="bg-light border rounded d-flex align-items-center justify-content-center"
                  style={{ width: 72, height: 48 }}
              >
                <span className="text-muted small">RESIM YOK</span>
              </div>
          ),
    },
    {
      key: "aboutName",
      label: "About Name",
      sortable: true,
      render: (row) =>
          showAll ? row.aboutName || row.about : truncate(row.aboutName || row.about, 20),
    },
    {
      key: "mission",
      label: "Misyon",
      sortable: true,
      render: (row) => (showAll ? row.mission : truncate(row.mission, 20)),
    },
    {
      key: "vision",
      label: "Vizyon",
      sortable: true,
      render: (row) => (showAll ? row.vision : truncate(row.vision, 20)),
    },
    {
      key: "systemCreatedDate",
      label: "Oluşturulma",
      sortable: true,
      style: { width: 180 },
      render: (row) => formatDate(row.systemCreatedDate),
    },
  ];

  // ------- CRUD İşlemleri -------
  const openCreate = () => {
    setEditId(null);
    setForm(emptyForm);
    setPreview("");
    setErrs({ aboutName: "", mission: "", vision: "", general: "" });
    setShowEditModal(true);
  };
  const openEdit = (it) => {
    setEditId(getId(it));
    setForm({
      aboutName: it.aboutName || it.about || "",
      mission: it.mission || "",
      vision: it.vision || "",
      imageFile: null,
      imageUrl: it.imageUrl || "",
    });
    setPreview(it.imageUrl ? resolveImageUrl(it.imageUrl) : "");
    setErrs({ aboutName: "", mission: "", vision: "", general: "" });
    setShowEditModal(true);
  };
  const openView = (it) => {
    setDetail(it);
    setShowViewModal(true);
  };
  const onDelete = (it) => {
    setToDelete(it);
    setShowDeleteModal(true);
  };
  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setForm((s) => ({ ...s, imageFile: f }));
    setPreview(URL.createObjectURL(f));
    showInfo("Görsel önizlemesi hazır.");
  };
  const buildDto = () => ({
    aboutName: form.aboutName?.trim(),
    about: form.aboutName?.trim(),
    mission: form.mission?.trim(),
    vision: form.vision?.trim(),
    imageUrl: form.imageUrl || undefined,
  });
  const sendMultipart = async (method, url, dto) => {
    const fd = new FormData();
    fd.append("about", new Blob([JSON.stringify(dto)], { type: "application/json" }));
    if (form.imageFile) {
      fd.append("file", form.imageFile);
      fd.append("image", form.imageFile);
    }
    return method === "POST" ? client.post(url, fd) : client.put(url, fd);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = { aboutName: "", mission: "", vision: "" };
    if (!form.aboutName?.trim()) v.aboutName = "About name zorunlu";
    if (!form.mission?.trim()) v.mission = "Misyon zorunlu";
    if (!form.vision?.trim()) v.vision = "Vizyon zorunlu";
    setErrs((s) => ({ ...s, ...v }));
    if (v.aboutName || v.mission || v.vision) {
      const longMsg = [
        v.aboutName && `• ${v.aboutName}`,
        v.mission && `• ${v.mission}`,
        v.vision && `• ${v.vision}`,
      ]
          .filter(Boolean)
          .join("\n");
      showError(`Eksik/Geçersiz alanlar:\n${longMsg}`);
      return;
    }
    try {
      const dto = buildDto();
      if (editId) {
        const url =
            typeof EP.UPDATE === "function" ? EP.UPDATE(editId) : `${EP.UPDATE}/${editId}`;
        const op = form.imageFile
            ? sendMultipart("PUT", url, dto)
            : client.put(url, dto);
        await showPromise(op, {
          loading: "Güncelleniyor…",
          success: "Kayıt güncellendi.",
          error: (ex) =>
              normalizeBackendError(ex?.response?.data || ex).general || "Hata oluştu.",
        });
      } else {
        const op = form.imageFile
            ? sendMultipart("POST", EP.CREATE, dto)
            : client.post(EP.CREATE, dto);
        await showPromise(op, {
          loading: "Kaydediliyor…",
          success: "Kayıt oluşturuldu.",
          error: (ex) =>
              normalizeBackendError(ex?.response?.data || ex).general || "Hata oluştu.",
        });
      }
      setShowEditModal(false);
      setForm(emptyForm);
      setEditId(null);
      setPreview("");
      refresh();
    } catch (ex) {
      const be = ex?.response?.data || ex;
      const { general, fields } = normalizeBackendError(be);
      setErrs((s) => ({
        ...s,
        aboutName: fields.aboutName || s.aboutName,
        mission: fields.mission || s.mission,
        vision: fields.vision || s.vision,
        general: general || "Kaydetme başarısız",
      }));
      const fieldMsgs = Object.entries(fields || {})
          .map(([k, m]) => `• ${k}: ${m}`)
          .join("\n");
      showError(`${general}${fieldMsgs ? `\n${fieldMsgs}` : ""}`);
    }
  };
  const confirmDelete = async () => {
    if (!toDelete) return;
    try {
      const id = getId(toDelete);
      if (id === undefined || id === null) {
        showError("Silinecek kaydın ID bilgisi yok.");
        return;
      }
      const url =
          typeof EP.DELETE === "function" ? EP.DELETE(id) : `${EP.DELETE}/${id}`;
      await showPromise(client.delete(url), {
        loading: "Siliniyor…",
        success: "Kayıt silindi.",
        error: (ex) =>
            normalizeBackendError(ex?.response?.data || ex).general ||
            "Silme başarısız.",
      });
      setShowDeleteModal(false);
      setToDelete(null);
      refresh();
    } catch (ex) {
      showError(
          normalizeBackendError(ex?.response?.data || ex).general || "Silme başarısız"
      );
    }
  };
  const exportExcel = async () => {
    try {
      showInfo("Excel hazırlanıyor…");
      const XLSX = await import("xlsx");
      const rows = sorted.map((it, idx) => ({
        "#": idx + 1,
        ID: getId(it) ?? "",
        "About Name": it.aboutName || it.about || "",
        Misyon: it.mission || "",
        Vizyon: it.vision || "",
        Oluşturulma: formatDate(it.systemCreatedDate) || "",
      }));
      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "About");
      const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const blob = new Blob([wbout], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `about_${new Date().toISOString().slice(0, 10)}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      showSuccess("Excel indirildi.");
    } catch (err) {
      showError("Excel için: npm i xlsx");
    }
  };
  const exportPdf = async () => {
    try {
      showInfo("PDF hazırlanıyor…");
      const jsPDF = (await import("jspdf")).default;
      const autoTable = (await import("jspdf-autotable")).default;
      const doc = new jsPDF();
      const head = [["#", "About Name", "Misyon", "Vizyon", "Oluşturulma"]];
      const body = sorted.map((it, idx) => [
        idx + 1,
        it.aboutName || it.about || "",
        it.mission || "",
        it.vision || "",
        formatDate(it.systemCreatedDate) || "",
      ]);
      autoTable(doc, { head, body, styles: { fontSize: 8, cellPadding: 2 }, margin: { top: 10 } });
      doc.save(`about_${new Date().toISOString().slice(0, 10)}.pdf`);
      showSuccess("PDF indirildi.");
    } catch (err) {
      showError("PDF için: npm i jspdf jspdf-autotable");
    }
  };

  // ---------- JSX -------------
  return (
      <div className="container py-3">
        <ReusableToast position="top-right" duration={4000} />
        <style>{`
        .thumb-wrap{ position:relative; width:72px; height:48px; overflow:hidden; border-radius:.375rem; }
        .thumb-img{ width:100%; height:100%; object-fit:cover; transition:transform .2s ease-in-out; }
        .thumb-wrap:hover .thumb-img{ transform:scale(1.05); }
        .thumb-lens{ position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.25); color:#fff; opacity:0; transition:opacity .2s; }
        .thumb-wrap:hover .thumb-lens{ opacity:1; }
        .thumb-wrap-lg{ position:relative; width:100%; height:220px; overflow:hidden; border-radius:.375rem; }
        .thumb-wrap-lg .thumb-img{ width:100%; height:100%; object-fit:contain; transition:transform .2s ease-in-out; background:#fff; }
        .thumb-wrap-lg:hover .thumb-img{ transform:scale(1.02); }
        .zoom-float{ position:fixed; z-index:1060; pointer-events:none; background:#fff; border:1px solid rgba(0,0,0,.1); box-shadow:0 8px 24px rgba(0,0,0,.15); padding:6px; border-radius:.5rem; }
        .zoom-float img{ max-width:320px; max-height:240px; display:block; }
      `}</style>

        {/* Üst bar */}
        <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
          <h5 className="m-0">
            <i className="fa fa-id-card me-2" /> About / Hakkımızda
          </h5>
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <form
                className="input-group"
                onSubmit={(e) => {
                  e.preventDefault();
                  setQuery(searchTerm.trim());
                  if (searchTerm.trim()) showInfo(`"${searchTerm.trim()}" için arama uygulandı.`);
                }}
            >
              <input
                  className="form-control"
                  placeholder="Ara: about name, misyon, vizyon…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="btn btn-outline-secondary">
                <i className="fa fa-search me-1" />
                Ara
              </button>
              <button
                  type="button"
                  className="btn btn-outline-dark"
                  onClick={() => {
                    setSearchTerm("");
                    setQuery("");
                    showInfo("Arama temizlendi.");
                  }}
              >
                <i className="fa fa-times me-1" />
                Temizle
              </button>
            </form>
            <div className="form-check form-switch ms-2">
              <input
                  id="showAll"
                  className="form-check-input"
                  type="checkbox"
                  checked={showAll}
                  onChange={(e) => {
                    setShowAll(e.target.checked);
                    showInfo(
                        e.target.checked
                            ? "Metinler tam gösteriliyor."
                            : "Metinler kısaltılıyor."
                    );
                  }}
              />
              <label htmlFor="showAll" className="form-check-label">
                Metinleri tam göster
              </label>
            </div>
            <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowFilters(!showFilters)}
            >
              <i className="fa fa-filter me-1" /> Filtre
            </button>
            {/* Export Buttons REUSABLE! */}
            <ExportButtons
                onExcel={exportExcel}
                onPdf={exportPdf}
                loading={loading}
                exports={["excel", "pdf"]}
            />
            <button className="btn btn-primary" onClick={openCreate}>
              <i className="fa fa-plus me-1" /> Yeni Kayıt
            </button>
          </div>
        </div>

        {/* Filtre Kartı (REUSABLE) */}
        {showFilters && (
            <div className="card border-0 shadow-sm mb-3">
              <div className="card-body">
                <FilterBar
                    fields={filterFields}
                    values={filtersDraft}
                    onChange={setFiltersDraft}
                    onApply={() => {
                      setFilters(filtersDraft);
                      showSuccess("Filtreler uygulandı.");
                    }}
                    onReset={() => {
                      const f = { name: "", mission: "", vision: "", from: "", to: "", hasImage: false };
                      setFilters(f);
                      setFiltersDraft(f);
                      showInfo("Filtreler sıfırlandı.");
                    }}
                />
              </div>
            </div>
        )}

        {/* DataTable loading + REUSABLE */}
        <div className="card border-0 shadow-sm" style={{ minHeight: 320, position: "relative" }}>
          {loading ? (
              <div className="py-5">
                <LoadingSpinner size="lg" text="Veriler yükleniyor..." />
              </div>
          ) : (
              <DataTable
                  columns={columns}
                  data={paged}
                  sort={sort}
                  onSort={setSortBy}
                  page={page}
                  pageSize={pageSize}
                  total={filtered.length}
                  onPageChange={setPage}
                  loading={loading}
                  renderActions={(row) => (
                      <div className="btn-group btn-group-sm">
                        <button className="btn btn-outline-secondary" onClick={() => openView(row)}>
                          <i className="fa fa-eye" />
                        </button>
                        <button className="btn btn-outline-primary" onClick={() => openEdit(row)}>
                          <i className="fa fa-pen" />
                        </button>
                        <button className="btn btn-outline-danger" onClick={() => onDelete(row)}>
                          <i className="fa fa-trash" />
                        </button>
                      </div>
                  )}
              />
          )}
        </div>

        {/* Hover büyük önizleme */}
        {zoom.visible && (
            <div className="zoom-float" style={{ top: zoom.y, left: zoom.x }}>
              <img src={zoom.src} alt="zoom" />
            </div>
        )}

        {/*Form Create */}
        <FormEditModal
            show={showEditModal}
            title={editId ? "Kaydı Düzenle" : "Yeni Kayıt"}
            onClose={() => setShowEditModal(false)}
            onSubmit={handleSubmit}
            loading={loading}
        >
          <div className="row g-3">
            <div className="col-12">
              <FormField
                  label="About Name"
                  required
                  value={form.aboutName}
                  error={errs.aboutName}
                  onChange={e => {
                    setForm(s => ({ ...s, aboutName: e.target.value }));
                    setErrs(s => ({ ...s, aboutName: "", general: "" }));
                  }}
                  placeholder="Örn: Hakkımızda başlığı"
              />
            </div>
            <div className="col-12 col-md-6">
              <FormField
                  label="Misyon"
                  as="textarea"
                  rows={4}
                  required
                  value={form.mission}
                  error={errs.mission}
                  onChange={e => {
                    setForm(s => ({ ...s, mission: e.target.value }));
                    setErrs(s => ({ ...s, mission: "", general: "" }));
                  }}
                  placeholder="Misyon açıklaması…"
              />
            </div>
            <div className="col-12 col-md-6">
              <FormField
                  label="Vizyon"
                  as="textarea"
                  rows={4}
                  required
                  value={form.vision}
                  error={errs.vision}
                  onChange={e => {
                    setForm(s => ({ ...s, vision: e.target.value }));
                    setErrs(s => ({ ...s, vision: "", general: "" }));
                  }}
                  placeholder="Vizyon açıklaması…"
              />
            </div>
            <div className="col-12 col-md-6">
              <FileUpload
                  label="Görsel (opsiyonel) Sürükleyip bırakabilirsiniz"
                  value={form.imageFile || form.imageUrl}
                  onChange={file => {
                    setForm(f => ({ ...f, imageFile: file }));
                    setPreview(file ? URL.createObjectURL(file) : "");
                  }}
                  accept="image/*"
                  maxSize={2}
                  preview={true}
              />
            </div>
            {errs.general && (
                <div className="col-12 text-danger small">{errs.general}</div>
            )}
          </div>
        </FormEditModal>


        {/*Form Detay */}
        <FormDetailModal
            show={showViewModal}
            title="Detay"
            onClose={() => setShowViewModal(false)}
            detail={detail}
            fields={[
              { key: "aboutName", label: "About Name" },
              { key: "mission", label: "Misyon" },
              { key: "vision", label: "Vizyon" }
            ]}
            imageKey="imageUrl"
            resolveImageUrl={resolveImageUrl}
            formatDate={formatDate}
        />

        {/*Form Delete, */}
        <FormConfirmDialog
            show={showDeleteModal}
            title="Silme Onayı"
            text="Bu kaydı silmek istediğinize emin misiniz?"
            onClose={() => setShowDeleteModal(false)}
            onConfirm={confirmDelete}
            confirmText={<><i className="fa fa-trash me-1" /> Sil</>}
            loading={loading}
        >
          {toDelete && (
              <div className="mt-2 small text-muted">
                <div>
                  <strong>ID:</strong> {getId(toDelete) ?? "—"}
                </div>
                <div>{truncate(toDelete.aboutName || toDelete.about, 100)}</div>
              </div>
          )}
        </FormConfirmDialog>
      </div>
  );
}

