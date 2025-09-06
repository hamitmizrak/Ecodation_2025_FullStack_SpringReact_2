import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ReusableToast from "./resuability/ReusableToast";
import { showSuccess, showError, showInfo, showPromise } from "./resuability/toastHelper";
import DataTable from "./resuability/DataTable";
import ExportButtons from "./resuability/ExportButtons";
import FilterBar from "./resuability/FilterBar";
import FormField from "./resuability/FormField";
import LoadingSpinner from "./resuability/LoadingSpinner";
import FileUpload from "./resuability/FileUpload";
import FormDetailModal from "./resuability/FormDetailModal";
import FormEditModal from "./resuability/FormEditModal";
import FormConfirmDialog from "./resuability/FormConfirmDialog";
import { API_BASE, ENDPOINTS, IMAGE_BASE } from "../../config/api";
import { exportExcelHelper, exportPdfHelper } from "./resuability/exportHelper";

// --- Helperlar ---
const resolveImageUrl = (src) =>
    !src ? "" : /^https?:\/\//i.test(src) ? src : `${IMAGE_BASE}${src.startsWith("/") ? src : "/" + src}`;
const truncate = (str, n = 50) => str && str.length > n ? str.slice(0, n) + "…" : str || "";
const getId = (obj) => obj?.id ?? obj?.aboutId ?? obj?.aboutID ?? obj?.uid ?? obj?.uuid ?? obj?.pkId ?? obj?.about_id;
const formatDate = (iso) => !iso ? "" : new Date(iso).toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" });
const normalizeApiResult = (res) =>
    res?.data?.data ?? res?.data?.result ?? res?.data?.items ?? res?.data?.content ?? res?.data ??
    res?.result ?? res?.items ?? res?.content ?? res;
function normalizeBackendError(be) {
    if (!be) return { general: "İşlem başarısız", fields: {} };
    const general =
        be?.message || be?.error || be?.errorMessage || be?.detail || be?.description ||
        be?.data?.message || be?.data?.error || be?.result?.message || be?.result?.error || "İşlem başarısız";
    const fields = {};
    let mapLike = be?.fieldErrors ?? be?.errors ?? be?.data?.fieldErrors ?? be?.data?.errors ?? be?.result?.fieldErrors ?? be?.result?.errors;
    if (typeof mapLike === "object" && !Array.isArray(mapLike)) {
        for (const [k, v] of Object.entries(mapLike)) fields[k] = Array.isArray(v) ? v[0] : String(v);
    }
    const arr = be?.fieldErrors ?? be?.errors ?? be?.validationErrors ?? be?.violations ?? be?.data?.errors ?? be?.result?.errors;
    if (Array.isArray(arr)) {
        arr.forEach(it => {
            const key = it?.field || it?.name || it?.propertyPath || it?.path || it?.param || it?.code;
            const msg = it?.message || it?.defaultMessage || it?.errorMessage || it?.reason || it?.description;
            if (key && msg) fields[key] = msg;
        });
    }
    return { general, fields };
}

// --- API Endpointler ---
const RAW = ENDPOINTS?.ABOUT || {};
const RAW_LIST = RAW.LIST || "/about/api/v1.0.0/list";
const BASE = RAW_LIST.endsWith("/list") ? RAW_LIST.slice(0, -"/list".length) : RAW_LIST;
const EP = {
    LIST: RAW_LIST.endsWith("/list") ? RAW_LIST : `${BASE}/list`,
    CREATE: RAW.CREATE || `${BASE}/create`,
    UPDATE: typeof RAW.UPDATE === "function" ? RAW.UPDATE : (id) => `${RAW.UPDATE || `${BASE}/update`}/${id}`,
    DELETE: typeof RAW.DELETE === "function" ? RAW.DELETE : (id) => `${RAW.DELETE || `${BASE}/delete`}/${id}`,
};
const client = axios.create({
    baseURL: API_BASE,
    withCredentials: true,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN"
});
client.interceptors.request.use(cfg => {
    const token = localStorage.getItem("access_token") || localStorage.getItem("token") || sessionStorage.getItem("access_token");
    if (token && !cfg.headers.Authorization) cfg.headers.Authorization = /^Bearer\s/i.test(token) ? token : `Bearer ${token}`;
    cfg.headers["X-Requested-With"] = "XMLHttpRequest";
    return cfg;
});

// --- Field Array ---
const aboutFields = [
    { key: "aboutName", label: "About Name", required: true, type: "text", placeholder: "Örn: Hakkımızda başlığı" },
    { key: "mission", label: "Misyon", required: true, type: "textarea", placeholder: "Misyon açıklaması…" },
    { key: "vision", label: "Vizyon", required: true, type: "textarea", placeholder: "Vizyon açıklaması…" }
];

// --- Ana Component ---
export default function About() {
    const emptyForm = Object.fromEntries(aboutFields.map(f => [f.key, ""]));
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ ...emptyForm, imageFile: null, imageUrl: "" });
    const [editId, setEditId] = useState(null);
    const [errs, setErrs] = useState({ ...emptyForm, general: "" });
    const [searchTerm, setSearchTerm] = useState("");
    const [query, setQuery] = useState("");
    const [showAll, setShowAll] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({ name: "", mission: "", vision: "", from: "", to: "", hasImage: false });
    const [filtersDraft, setFiltersDraft] = useState(filters);
    const [sort, setSort] = useState({ by: "created", dir: "desc" });
    const setSortBy = (by) => setSort(s => s.by === by ? { by, dir: s.dir === "asc" ? "desc" : "asc" } : { by, dir: "asc" });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [zoom, setZoom] = useState({ visible: false, src: "", x: 0, y: 0 });
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [detail, setDetail] = useState(null);
    const [toDelete, setToDelete] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    // --- Thumbnail zoom efekti için event fonksiyonları ---
    const onThumbEnter = (src, e) => setZoom({
        visible: true, src: resolveImageUrl(src),
        x: e?.clientX ? e.clientX + 18 : 100, y: e?.clientY ? e.clientY + 18 : 100
    });
    const onThumbMove = (e) => setZoom(z => z.visible ? { ...z, x: e.clientX + 18, y: e.clientY + 18 } : z);
    const onThumbLeave = () => setZoom(z => ({ ...z, visible: false }));

    const filterFields = [
        { key: "name", label: "About Name", type: "text" },
        { key: "mission", label: "Misyon", type: "text" },
        { key: "vision", label: "Vizyon", type: "text" },
        { key: "hasImage", label: "Sadece resimli", type: "checkbox" },
        { key: "from", label: "Başlangıç tarihi", type: "date" },
        { key: "to", label: "Bitiş tarihi", type: "date" }
    ];

    const refresh = async () => {
        setLoading(true);
        try {
            const res = await client.get(EP.LIST);
            const data = normalizeApiResult(res);
            setItems(Array.isArray(data) ? data : Array.isArray(data?.content) ? data.content : []);
        } catch {
            showError("Liste yüklenemedi. Ağ/yetki kontrol edin.");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => { refresh(); }, []);

    const filtered = useMemo(() => {
        let list = items;
        if (query) {
            const q = query.toLowerCase();
            list = list.filter(it =>
                aboutFields.some(f =>
                    (it[f.key] || "").toLowerCase().includes(q)
                )
            );
        }
        const { name, mission, vision, from, to, hasImage } = filters;
        if (name) list = list.filter(it => ((it.aboutName || it.about) || "").toLowerCase().includes(name.toLowerCase()));
        if (mission) list = list.filter(it => (it.mission || "").toLowerCase().includes(mission.toLowerCase()));
        if (vision) list = list.filter(it => (it.vision || "").toLowerCase().includes(vision.toLowerCase()));
        if (from || to) {
            const fromDate = from ? new Date(from + "T00:00:00") : null;
            const toDate = to ? new Date(to + "T23:59:59") : null;
            list = list.filter(it => {
                const d = it.systemCreatedDate ? new Date(it.systemCreatedDate) : null;
                if (!d) return false;
                if (fromDate && d < fromDate) return false;
                if (toDate && d > toDate) return false;
                return true;
            });
        }
        if (hasImage) list = list.filter(it => !!it.imageUrl);
        return list;
    }, [items, query, filters]);

    const sorted = useMemo(() => {
        const arr = [...filtered];
        const by = sort.by;
        const dir = sort.dir === "asc" ? 1 : -1;
        const getVal = (it) => {
            switch (by) {
                case "image": return it.imageUrl ? 1 : 0;
                case "aboutName": return (it.aboutName || it.about || "").toLowerCase();
                case "mission": return (it.mission || "").toLowerCase();
                case "vision": return (it.vision || "").toLowerCase();
                case "created":
                default: return it.systemCreatedDate ? new Date(it.systemCreatedDate).getTime() : 0;
            }
        };
        arr.sort((a, b) => {
            const va = getVal(a), vb = getVal(b);
            return va < vb ? -1 * dir : va > vb ? 1 * dir : 0;
        });
        return arr;
    }, [filtered, sort]);

    const paged = useMemo(() => sorted.slice((page - 1) * pageSize, page * pageSize), [sorted, page, pageSize]);
    useEffect(() => { if (page > Math.max(1, Math.ceil(sorted.length / pageSize))) setPage(1); }, [sorted, pageSize]);

    // --- Tablo Kolonları (orijinal img ve zoom için mouse eventleri ile) ---
    const columns = [
        {
            key: "imageUrl", label: "Görsel", sortable: false,
            render: (row) => row.imageUrl ? (
                <img
                    src={resolveImageUrl(row.imageUrl)}
                    alt="about"
                    style={{
                        maxWidth: 180,
                        maxHeight: 140,
                        objectFit: "contain",
                        borderRadius: 6,
                        boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
                        cursor: "zoom-in"
                    }}
                    onMouseEnter={e => onThumbEnter(row.imageUrl, e)}
                    onMouseMove={onThumbMove}
                    onMouseLeave={onThumbLeave}
                />
            ) : (
                <span className="text-muted small">RESIM YOK</span>
            ),
        },
        ...aboutFields.map(f => ({
            key: f.key, label: f.label, sortable: true,
            render: row => showAll ? row[f.key] : truncate(row[f.key], 20)
        })),
        { key: "systemCreatedDate", label: "Oluşturulma", sortable: true, style: { width: 180 }, render: row => formatDate(row.systemCreatedDate) },
    ];

    const openCreate = () => { setEditId(null); setForm({ ...emptyForm, imageFile: null, imageUrl: "" }); setErrs({ ...emptyForm, general: "" }); setShowEditModal(true); };
    const openEdit = (it) => {
        setEditId(getId(it));
        setForm({
            ...aboutFields.reduce((acc, f) => ({ ...acc, [f.key]: it[f.key] || "" }), {}),
            imageFile: null,
            imageUrl: it.imageUrl || ""
        });
        setErrs({ ...emptyForm, general: "" });
        setShowEditModal(true);
    };
    const openView = (it) => { setDetail(it); setShowViewModal(true); };
    const onDelete = (it) => { setToDelete(it); setShowDeleteModal(true); };

    const validateForm = (fields, form) => {
        const v = {};
        fields.forEach(f => { if (f.required && !form[f.key]?.trim()) v[f.key] = `${f.label} zorunlu`; });
        return v;
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
        if (form.imageFile) fd.append("file", form.imageFile);
        return method === "POST" ? client.post(url, fd) : client.put(url, fd);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submitting) {
            showInfo("Bir işlem zaten devam ediyor. Lütfen bekleyin!");
            return;
        }
        const v = validateForm(aboutFields, form);
        setErrs(s => ({ ...s, ...v }));
        if (Object.keys(v).length > 0) {
            showError("Zorunlu alanları doldurun!");
            return;
        }
        setSubmitting(true);
        try {
            const dto = buildDto();
            let op;
            if (editId) {
                const url = typeof EP.UPDATE === "function" ? EP.UPDATE(editId) : `${EP.UPDATE}/${editId}`;
                op = form.imageFile ? sendMultipart("PUT", url, dto) : client.put(url, dto);
            } else {
                op = form.imageFile ? sendMultipart("POST", EP.CREATE, dto) : client.post(EP.CREATE, dto);
            }
            await showPromise(op, {
                loading: editId ? "Güncelleniyor…" : "Kaydediliyor…",
                success: editId ? "Kayıt güncellendi." : "Kayıt oluşturuldu.",
                error: (ex) => normalizeBackendError(ex?.response?.data || ex).general || "Hata oluştu.",
            });
            setShowEditModal(false); setForm({ ...emptyForm, imageFile: null, imageUrl: "" }); setEditId(null); refresh();
        } catch (ex) {
            const be = ex?.response?.data || ex;
            const { general, fields } = normalizeBackendError(be);
            setErrs(s => ({ ...s, ...fields, general: general || "Kaydetme başarısız" }));
            showError(general + (fields ? "\n" + Object.entries(fields).map(([k, m]) => `• ${k}: ${m}`).join("\n") : ""));
        } finally {
            setSubmitting(false);
        }
    };

    const confirmDelete = async () => {
        if (!toDelete) return;
        try {
            const id = getId(toDelete);
            if (id === undefined || id === null) { showError("Silinecek kaydın ID bilgisi yok."); return; }
            const url = typeof EP.DELETE === "function" ? EP.DELETE(id) : `${EP.DELETE}/${id}`;
            await showPromise(client.delete(url), {
                loading: "Siliniyor…", success: "Kayıt silindi.",
                error: (ex) => normalizeBackendError(ex?.response?.data || ex).general || "Silme başarısız.",
            });
            setShowDeleteModal(false); setToDelete(null); refresh();
        } catch (ex) {
            showError(normalizeBackendError(ex?.response?.data || ex).general || "Silme başarısız");
        }
    };

    const exportExcel = () =>
        exportExcelHelper({
            data: sorted,
            columns: [
                { key: "aboutName", label: "About Name" },
                { key: "mission", label: "Misyon" },
                { key: "vision", label: "Vizyon" },
                { key: "systemCreatedDate", label: "Oluşturulma", export: row => formatDate(row.systemCreatedDate) }
            ],
            fileName: "about",
            sheetName: "About"
        });

    const exportPdf = () =>
        exportPdfHelper({
            data: sorted,
            columns: [
                { key: "aboutName", label: "About Name" },
                { key: "mission", label: "Misyon" },
                { key: "vision", label: "Vizyon" },
                { key: "systemCreatedDate", label: "Oluşturulma", export: row => formatDate(row.systemCreatedDate) }
            ],
            fileName: "about",
            pdfTitle: "About"
        });

    return (
        <div className="container py-3">
            <style>{`
        .zoom-float {
          position: fixed;
          z-index: 1060;
          pointer-events: none;
          background: #fff;
          border: 1px solid rgba(0,0,0,.1);
          box-shadow: 0 8px 24px rgba(0,0,0,.15);
          padding: 6px;
          border-radius: .5rem;
        }
        .zoom-float img {
          max-width: 320px;
          max-height: 240px;
          display: block;
        }
      `}</style>
            <ReusableToast position="top-right" duration={4000} />
            <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
                <h5 className="m-0"><i className="fa fa-id-card me-2" /> About / Hakkımızda</h5>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                    <form className="input-group" onSubmit={e => {
                        e.preventDefault(); setQuery(searchTerm.trim());
                        if (searchTerm.trim()) showInfo(`"${searchTerm.trim()}" için arama uygulandı.`);
                    }}>
                        <input className="form-control" placeholder="Ara: about name, misyon, vizyon…" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                        <button type="submit" className="btn btn-outline-secondary"><i className="fa fa-search me-1" />Ara</button>
                        <button type="button" className="btn btn-outline-dark" onClick={() => { setSearchTerm(""); setQuery(""); showInfo("Arama temizlendi."); }}><i className="fa fa-times me-1" />Temizle</button>
                    </form>
                    <div className="form-check form-switch ms-2">
                        <input id="showAll" className="form-check-input" type="checkbox" checked={showAll}
                               onChange={e => { setShowAll(e.target.checked); showInfo(e.target.checked ? "Metinler tam gösteriliyor." : "Metinler kısaltılıyor."); }} />
                        <label htmlFor="showAll" className="form-check-label">Metinleri tam göster</label>
                    </div>
                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowFilters(!showFilters)}><i className="fa fa-filter me-1" /> Filtre</button>
                    <ExportButtons onExcel={exportExcel} onPdf={exportPdf} loading={loading} exports={["excel", "pdf"]} />
                    <button className="btn btn-primary" onClick={openCreate}><i className="fa fa-plus me-1" /> Yeni Kayıt</button>
                </div>
            </div>
            {showFilters && (
                <div className="card border-0 shadow-sm mb-3">
                    <div className="card-body">
                        <FilterBar fields={filterFields} values={filtersDraft} onChange={setFiltersDraft}
                                   onApply={() => { setFilters(filtersDraft); showSuccess("Filtreler uygulandı."); }}
                                   onReset={() => { const f = { name: "", mission: "", vision: "", from: "", to: "", hasImage: false }; setFilters(f); setFiltersDraft(f); showInfo("Filtreler sıfırlandı."); }} />
                    </div>
                </div>
            )}
            <div className="card border-0 shadow-sm" style={{ minHeight: 320, position: "relative" }}>
                {loading ? (
                    <div className="py-5"><LoadingSpinner size="lg" text="Veriler yükleniyor..." /></div>
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
                        renderActions={row => (
                            <div className="btn-group btn-group-sm">
                                <button className="btn btn-outline-secondary" onClick={() => openView(row)}><i className="fa fa-eye" /></button>
                                <button className="btn btn-outline-primary" onClick={() => openEdit(row)}><i className="fa fa-pen" /></button>
                                <button className="btn btn-outline-danger" onClick={() => onDelete(row)}><i className="fa fa-trash" /></button>
                            </div>
                        )}
                    />
                )}
            </div>
            {/* Hover zoom layer */}
            {zoom.visible && (
                <div className="zoom-float" style={{ top: zoom.y, left: zoom.x }}>
                    <img src={zoom.src} alt="zoom" />
                </div>
            )}
            <FormEditModal show={showEditModal} title={editId ? "Kaydı Düzenle" : "Yeni Kayıt"}
                           onClose={() => setShowEditModal(false)} onSubmit={handleSubmit} loading={loading || submitting}>
                <div className="row g-3">
                    {aboutFields.map(f => (
                        <div className="col-12 col-md-6" key={f.key}>
                            <FormField
                                label={f.label}
                                required={f.required}
                                as={f.type === "textarea" ? "textarea" : undefined}
                                rows={f.type === "textarea" ? 4 : undefined}
                                value={form[f.key]}
                                error={errs[f.key]}
                                onChange={e => {
                                    setForm(s => ({ ...s, [f.key]: e.target.value }));
                                    setErrs(s => ({ ...s, [f.key]: "", general: "" }));
                                }}
                                placeholder={f.placeholder}
                            />
                        </div>
                    ))}
                    <div className="col-12 col-md-6">
                        <FileUpload
                            label="Görsel (opsiyonel)"
                            value={form.imageFile || form.imageUrl}
                            onChange={file => { setForm(f => ({ ...f, imageFile: file })); }}
                            accept="image/*"
                            maxSize={2}
                            preview={true}
                            resolveImageUrl={resolveImageUrl}
                        />
                    </div>
                    {errs.general && (<div className="col-12 text-danger small">{errs.general}</div>)}
                    <div className="d-flex justify-content-end gap-2 mt-3">
                        <button type="button" className="btn btn-outline-secondary" onClick={() => setShowEditModal(false)}>
                            İptal
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={loading || submitting}>
                            {(loading || submitting) && <LoadingSpinner size="sm" className="me-2" />}
                            <i className="fa fa-save me-1" /> {editId ? "Güncelle" : "Kaydet"}
                        </button>
                    </div>
                </div>
            </FormEditModal>
            <FormDetailModal show={showViewModal} title="Detay" onClose={() => setShowViewModal(false)} detail={detail}
                             fields={aboutFields} imageKey="imageUrl" resolveImageUrl={resolveImageUrl} formatDate={formatDate} />
            <FormConfirmDialog show={showDeleteModal} title="Silme Onayı"
                               text="Bu kaydı silmek istediğinize emin misiniz?"
                               onClose={() => setShowDeleteModal(false)} onConfirm={confirmDelete}
                               confirmText={<><i className="fa fa-trash me-1" /> Sil</>} loading={loading}>
                {toDelete && (
                    <div className="mt-2 small text-muted">
                        <div><strong>ID:</strong> {getId(toDelete) ?? "—"}</div>
                        <div>{truncate(toDelete.aboutName || toDelete.about, 100)}</div>
                    </div>
                )}
            </FormConfirmDialog>
        </div>
    );
}
