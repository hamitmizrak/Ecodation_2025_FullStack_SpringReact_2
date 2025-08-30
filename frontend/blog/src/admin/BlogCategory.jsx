// src/admin/BlogCategory.jsx
import React, { useEffect, useMemo, useState } from 'react';
import {
  listBlogCategories,
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
} from '../api/blogCategoryService';

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
  const arrayLike =
    (Array.isArray(be?.fieldErrors) && be.fieldErrors) ||
    (Array.isArray(be?.errors) && be.errors) ||
    (Array.isArray(be?.validationErrors) && be.validationErrors) ||
    (Array.isArray(be?.violations) && be.violations) ||
    (Array.isArray(be?.data?.errors) && be.data.errors) ||
    (Array.isArray(be?.result?.errors) && be.result.errors) ||
    null;
  if (arrayLike) {
    arrayLike.forEach((it) => {
      const key = it?.field || it?.name || it?.propertyPath || it?.path || it?.param || it?.code;
      const msg =
        it?.message || it?.defaultMessage || it?.errorMessage || it?.reason || it?.description;
      if (key && msg) fields[key] = msg;
    });
  }
  return { general, fields };
}

export default function BlogCategory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const empty = { name: '', description: '', visible: true };
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);

  const [errs, setErrs] = useState({ name: '', description: '', visible: '', general: '' });
  const invalid = useMemo(() => ({ name: !!errs.name, description: !!errs.description }), [errs]);

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await listBlogCategories();
      const data = res?.data?.data || res?.data?.result || res?.data || [];
      setItems(Array.isArray(data) ? data : data.content || []);
    } catch (e) {
      // no-op
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === 'checkbox' ? checked : value }));
    setErrs((s) => ({ ...s, [name]: '', general: '' }));
  };

  const validate = () => {
    const e = { name: '', description: '', general: '' };
    if (!form.name) e.name = 'Kategori adı zorunlu';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e0 = validate();
    setErrs((s) => ({ ...s, ...e0 }));
    if (e0.name || e0.description) return;

    try {
      if (editId) await updateBlogCategory(editId, form);
      else await createBlogCategory(form);

      setForm(empty);
      setEditId(null);
      setErrs({ name: '', description: '', visible: '', general: '' });
      refresh();
    } catch (ex) {
      const be = ex?.response?.data;
      const { general, fields } = normalizeBackendError(be);
      setErrs((s) => ({
        ...s,
        name: fields.name || s.name,
        description: fields.description || s.description,
        visible: fields.visible || s.visible,
        general: general || 'Kaydetme başarısız',
      }));
    }
  };

  const onEdit = (it) => {
    setForm({
      name: it.name ?? it.categoryName ?? '',
      description: it.description ?? it.categoryDescription ?? '',
      visible: it.visible ?? it.status ?? true,
    });
    setEditId(it.id ?? it.categoryId ?? null);
    setErrs({ name: '', description: '', visible: '', general: '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onDelete = async (id) => {
    if (!window.confirm('Silmek istediğinize emin misiniz?')) return;
    try {
      await deleteBlogCategory(id);
      refresh();
    } catch (ex) {
      alert(ex?.response?.data?.message || ex.message || 'Silme başarısız');
    }
  };

  const onCancel = () => {
    setForm(empty);
    setEditId(null);
    setErrs({ name: '', description: '', visible: '', general: '' });
  };

  return (
    <div>
      <h5 className="mb-3">
        <i className="fa fa-tags me-2" />
        Blog Kategorileri
      </h5>

      <div className="row g-3">
        <div className="col-12 col-xl-5">
          <div className="card border-0 shadow-sm">
            <div className="card-header fw-semibold">
              {editId ? 'Kategoriyi Düzenle' : 'Yeni Kategori Ekle'}
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label className="form-label">
                    Ad <span className="text-danger">*</span>
                  </label>
                  <input
                    name="name"
                    className={`form-control ${invalid.name ? 'is-invalid' : ''}`}
                    value={form.name}
                    onChange={onChange}
                    placeholder="Örn: Java, Frontend..."
                  />
                  <div className="invalid-feedback">{errs.name}</div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Açıklama</label>
                  <textarea
                    name="description"
                    className={`form-control ${invalid.description ? 'is-invalid' : ''}`}
                    value={form.description}
                    onChange={onChange}
                    placeholder="Kısa açıklama..."
                    rows={3}
                  />
                  <div className="invalid-feedback">{errs.description}</div>
                </div>
                <div className="form-check mb-3">
                  <input
                    id="visible"
                    type="checkbox"
                    name="visible"
                    className="form-check-input"
                    checked={!!form.visible}
                    onChange={onChange}
                  />
                  <label htmlFor="visible" className="form-check-label">
                    Aktif
                  </label>
                </div>
                {errs.general && <div className="text-danger small mb-2">{errs.general}</div>}
                <div className="d-flex gap-2">
                  <button className="btn btn-primary" type="submit">
                    <i className="fa fa-save me-1" />
                    {editId ? 'Güncelle' : 'Ekle'}
                  </button>
                  {editId && (
                    <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
                      İptal
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Liste */}
        <div className="col-12 col-xl-7">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header fw-semibold d-flex align-items-center justify-content-between">
              <span>Mevcut Kategoriler</span>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={refresh}
                disabled={loading}
              >
                <i className={`fa ${loading ? 'fa-spinner fa-spin' : 'fa-rotate'}`} /> Yenile
              </button>
            </div>
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Ad</th>
                    <th>Açıklama</th>
                    <th>Durum</th>
                    <th className="text-end">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it, idx) => (
                    <tr key={it.id ?? it.categoryId ?? idx}>
                      <td>{idx + 1}</td>
                      <td>{it.name ?? it.categoryName}</td>
                      <td className="text-muted">{it.description ?? it.categoryDescription}</td>
                      <td>
                        {it.visible ?? it.status ? (
                          <span className="badge rounded-pill text-bg-success">Aktif</span>
                        ) : (
                          <span className="badge rounded-pill text-bg-secondary">Pasif</span>
                        )}
                      </td>
                      <td className="text-end">
                        <div className="btn-group btn-group-sm">
                          <button className="btn btn-outline-primary" onClick={() => onEdit(it)}>
                            <i className="fa fa-pen" />
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => onDelete(it.id ?? it.categoryId)}
                          >
                            <i className="fa fa-trash" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center text-muted py-4">
                        Kategori yok.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* istersen footer'a sayfalama ekleriz */}
          </div>
        </div>
      </div>
    </div>
  );
}
