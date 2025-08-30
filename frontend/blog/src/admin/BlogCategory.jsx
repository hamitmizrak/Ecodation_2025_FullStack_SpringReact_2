// src/admin/BlogCategory.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { Modal } from 'bootstrap';
import { useSelector } from 'react-redux';
import { selectAuth } from '../features/auth/authSlice';
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../api/blogCategoryService';

/* ---------- yardımcılar: modal artıkları temizle + hata normalize ---------- */
function cleanupBootstrapModalArtifacts() {
  document.body.classList.remove('modal-open');
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
  document.querySelectorAll('.modal-backdrop').forEach((el) => el.remove());
}

function pick(obj, ...keys) {
  for (const k of keys) {
    const v = obj?.[k];
    if (v !== undefined && v !== null && v !== '') return v;
  }
  return undefined;
}
function normalizeBackendError(be) {
  if (!be) return { general: 'İşlem başarısız', fields: {} };
  const general =
    pick(be, 'message', 'error', 'errorMessage', 'detail', 'description') ||
    pick(be?.data, 'message', 'error') ||
    pick(be?.result, 'message', 'error') ||
    'İşlem başarısız';

  const fields = {};
  const mapLike =
    be?.fieldErrors && typeof be.fieldErrors === 'object' && !Array.isArray(be.fieldErrors)
      ? be.fieldErrors
      : be?.errors && typeof be.errors === 'object' && !Array.isArray(be.errors)
      ? be.errors
      : be?.data?.fieldErrors && typeof be.data.fieldErrors === 'object'
      ? be.data.fieldErrors
      : be?.result?.fieldErrors && typeof be.result.fieldErrors === 'object'
      ? be.result.fieldErrors
      : null;
  if (mapLike) {
    for (const [k, v] of Object.entries(mapLike)) {
      if (v) fields[k] = Array.isArray(v) ? v[0] : String(v);
    }
  }
  return { general, fields };
}
/* ------------------------------------------------------------------------- */

export default function BlogCategory() {
  const { roles } = useSelector(selectAuth);
  const isAdmin = useMemo(
    () =>
      (roles || [])
        .map(String)
        .map((r) => r.toUpperCase())
        .includes('ADMIN'),
    [roles]
  );

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);

  // form state
  const emptyForm = { id: null, name: '', slug: '', description: '', active: true };
  const [form, setForm] = useState(emptyForm);
  const [err, setErr] = useState({ name: '', slug: '', description: '', active: '', general: '' });
  const invalid = useMemo(() => ({ name: !!err.name, slug: !!err.slug }), [err]);

  const [deleteId, setDeleteId] = useState(null);

  const list = async (opts = {}) => {
    setLoading(true);
    try {
      const res = await fetchCategories({
        page: opts.page ?? page,
        size: opts.size ?? size,
        q: opts.q ?? q,
      });
      // Backend list dönüşü farklı olabilir:
      // 1) { content, totalPages } (Spring Page)
      // 2) { data: { content, totalPages } }
      // 3) Düz liste []
      const body = res?.data ?? {};
      let content =
        body.content ||
        body.items ||
        body.results ||
        body.data?.content ||
        body.data?.items ||
        body.data?.results;
      let tp = body.totalPages ?? body.data?.totalPages ?? 0;

      if (!Array.isArray(content)) {
        // Düz liste döndüyse
        if (Array.isArray(body)) content = body;
        else content = [];
      }

      setItems(content);
      setTotalPages(Number(tp) || 0);
    } catch (e) {
      console.error('Kategori listesi alınamadı:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) list({ page: 0 });
  }, [isAdmin]);

  const openCreate = () => {
    setForm(emptyForm);
    setErr({ name: '', slug: '', description: '', active: '', general: '' });
    const el = document.getElementById('catModal');
    if (el) Modal.getOrCreateInstance(el).show();
  };

  const openEdit = (row) => {
    setForm({
      id: row.id ?? row.categoryId ?? row.uuid ?? null,
      name: row.name ?? row.categoryName ?? '',
      slug: row.slug ?? row.seoSlug ?? '',
      description: row.description ?? row.explanation ?? '',
      active: row.active ?? row.enabled ?? true ? true : false,
    });
    setErr({ name: '', slug: '', description: '', active: '', general: '' });
    const el = document.getElementById('catModal');
    if (el) Modal.getOrCreateInstance(el).show();
  };

  const onFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === 'checkbox' ? checked : value }));
    setErr((s) => ({ ...s, [name]: '', general: '' }));
  };

  const save = async (e) => {
    e.preventDefault();

    const next = { name: '', slug: '', description: '', active: '', general: '' };
    if (!form.name) next.name = 'Kategori adı zorunlu';
    if (!form.slug) next.slug = 'Slug zorunlu';
    setErr(next);
    if (next.name || next.slug) return;

    const payload = {
      name: form.name,
      slug: form.slug,
      description: form.description,
      active: !!form.active,
    };

    try {
      if (form.id) {
        await updateCategory(form.id, payload);
      } else {
        await createCategory(payload);
      }

      const modalEl = document.getElementById('catModal');
      if (modalEl) {
        const inst = Modal.getOrCreateInstance(modalEl);
        modalEl.addEventListener(
          'hidden.bs.modal',
          () => {
            cleanupBootstrapModalArtifacts();
            setForm(emptyForm);
            list();
          },
          { once: true }
        );
        inst.hide();
      } else {
        cleanupBootstrapModalArtifacts();
        setForm(emptyForm);
        list();
      }
    } catch (e2) {
      const be = e2?.response?.data;
      const { general, fields } = normalizeBackendError(be);
      setErr((s) => ({
        ...s,
        name: fields?.name || s.name,
        slug: fields?.slug || s.slug,
        description: fields?.description || s.description,
        active: fields?.active || s.active,
        general: general || 'Kaydetme başarısız',
      }));
    }
  };

  const askDelete = (id) => {
    setDeleteId(id);
    const el = document.getElementById('deleteModal');
    if (el) Modal.getOrCreateInstance(el).show();
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteCategory(deleteId);
      const el = document.getElementById('deleteModal');
      if (el) {
        const inst = Modal.getOrCreateInstance(el);
        el.addEventListener(
          'hidden.bs.modal',
          () => {
            cleanupBootstrapModalArtifacts();
            setDeleteId(null);
            list();
          },
          { once: true }
        );
        inst.hide();
      } else {
        cleanupBootstrapModalArtifacts();
        setDeleteId(null);
        list();
      }
    } catch (e2) {
      console.error('Silme hata:', e2);
    }
  };

  const onSearch = (e) => {
    e.preventDefault();
    list({ page: 0, q });
  };

  const changePage = (p) => {
    if (p < 0) return;
    if (totalPages && p >= totalPages) return;
    setPage(p);
    list({ page: p });
  };

  if (!isAdmin) {
    return (
      <div className="container py-4">
        <h4>403 - Yetkisiz</h4>
        <p>Bu sayfaya erişmek için ADMIN rolü gerekli.</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3>Blog Kategorileri</h3>
        <button className="btn btn-primary" onClick={openCreate}>
          <i className="fa fa-plus me-1" /> Yeni Kategori
        </button>
      </div>

      {/* Arama */}
      <form className="row g-2 mb-3" onSubmit={onSearch}>
        <div className="col-auto">
          <input
            className="form-control"
            placeholder="Ara..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <button className="btn btn-outline-secondary">Ara</button>
        </div>
      </form>

      {/* Liste */}
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Ad</th>
              <th>Slug</th>
              <th>Durum</th>
              <th style={{ width: 160 }}>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5}>Yükleniyor...</td>
              </tr>
            ) : items.length ? (
              items.map((it, idx) => {
                const id = it.id ?? it.categoryId ?? it.uuid ?? idx;
                return (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{it.name ?? it.categoryName ?? '-'}</td>
                    <td>{it.slug ?? it.seoSlug ?? '-'}</td>
                    <td>
                      {it.active ?? it.enabled ?? true ? (
                        <span className="badge bg-success">Aktif</span>
                      ) : (
                        <span className="badge bg-secondary">Pasif</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => openEdit(it)}
                      >
                        <i className="fa fa-pen" />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => askDelete(id)}
                      >
                        <i className="fa fa-trash" />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5}>Kayıt bulunamadı.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Sayfalama (Spring Page varsa) */}
      {totalPages > 1 && (
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary btn-sm" onClick={() => changePage(page - 1)}>
            ‹ Önceki
          </button>
          <span className="align-self-center small">
            Sayfa {page + 1} / {totalPages}
          </span>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => changePage(page + 1)}>
            Sonraki ›
          </button>
        </div>
      )}

      {/* Kategori Modal */}
      <div className="modal fade" id="catModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={save} noValidate>
              <div className="modal-header">
                <h5 className="modal-title">{form.id ? 'Kategoriyi Düzenle' : 'Yeni Kategori'}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Kapat"
                />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Ad</label>
                  <input
                    name="name"
                    className={`form-control ${invalid.name ? 'is-invalid' : ''}`}
                    value={form.name}
                    onChange={onFormChange}
                  />
                  <div className="invalid-feedback">{err.name}</div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Slug</label>
                  <input
                    name="slug"
                    className={`form-control ${invalid.slug ? 'is-invalid' : ''}`}
                    value={form.slug}
                    onChange={onFormChange}
                  />
                  <div className="invalid-feedback">{err.slug}</div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Açıklama</label>
                  <textarea
                    name="description"
                    className="form-control"
                    rows={3}
                    value={form.description}
                    onChange={onFormChange}
                  />
                </div>
                <div className="form-check">
                  <input
                    id="active"
                    name="active"
                    type="checkbox"
                    className="form-check-input"
                    checked={!!form.active}
                    onChange={onFormChange}
                  />
                  <label htmlFor="active" className="form-check-label">
                    Aktif
                  </label>
                </div>
                {err.general && <div className="text-danger small mt-2">{err.general}</div>}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Kapat
                </button>
                <button className="btn btn-primary" type="submit">
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Silme Onay Modal */}
      <div className="modal fade" id="deleteModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Silme Onayı</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Kapat"
              />
            </div>
            <div className="modal-body">Bu kategoriyi silmek istediğinize emin misiniz?</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                İptal
              </button>
              <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                Sil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
