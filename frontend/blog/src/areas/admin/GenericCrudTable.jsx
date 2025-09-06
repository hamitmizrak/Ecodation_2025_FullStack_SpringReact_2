// src/components/GenericCrudTable.jsx
import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

function GenericCrudTable({
                              entityName = "Kayıt",
                              fields = [],
                              api = {}, // {list, create, update, delete}
                              idKey = "id",
                              pageSizeOptions = [5, 10, 20, 50],
                              defaultPageSize = 10,
                          }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    // Form ve Modal State
    const emptyForm = Object.fromEntries(fields.map(f => [f.key, '']));
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [toDelete, setToDelete] = useState(null);
    const [errs, setErrs] = useState({});

    // Arama/Filtreleme
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(defaultPageSize);

    // Data fetch
    const refresh = async () => {
        setLoading(true);
        try {
            const res = await axios.get(api.list);
            setItems(res.data?.data || res.data?.content || []);
        } catch {
            toast.error('Liste yüklenemedi');
        }
        setLoading(false);
    };
    useEffect(() => { refresh(); }, []);

    // Filtre + Pagination
    const filtered = useMemo(() => {
        if (!query) return items;
        return items.filter(it =>
            fields.some(f => String(it[f.key] || '').toLowerCase().includes(query.toLowerCase()))
        );
    }, [items, query, fields]);
    const paged = useMemo(() => {
        const start = (page - 1) * pageSize;
        return filtered.slice(start, start + pageSize);
    }, [filtered, page, pageSize]);
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

    // Modal aç-kapa fonksiyonları
    const openCreate = () => {
        setEditId(null);
        setForm(emptyForm);
        setErrs({});
        setShowEdit(true);
    };
    const openEdit = (it) => {
        setEditId(it[idKey]);
        setForm(Object.fromEntries(fields.map(f => [f.key, it[f.key] || ''])));
        setErrs({});
        setShowEdit(true);
    };

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validasyon
        let vErrs = {};
        fields.forEach(f => {
            if (f.required && !form[f.key]) vErrs[f.key] = `${f.label} zorunlu`;
        });
        setErrs(vErrs);
        if (Object.keys(vErrs).length) return toast.error('Eksik alan(lar) var');

        try {
            if (editId) {
                await axios.put(typeof api.update === 'function' ? api.update(editId) : api.update, form);
                toast.success('Güncellendi');
            } else {
                await axios.post(api.create, form);
                toast.success('Eklendi');
            }
            setShowEdit(false);
            refresh();
        } catch (ex) {
            toast.error('Kayıt işlemi başarısız');
        }
    };

    // Delete
    const confirmDelete = async () => {
        try {
            await axios.delete(typeof api.delete === 'function' ? api.delete(toDelete[idKey]) : api.delete);
            toast.success('Silindi');
            setShowDelete(false);
            refresh();
        } catch {
            toast.error('Silinemedi');
        }
    };

    return (
        <div>
            <Toaster />
            {/* Search & New */}
            <div className="d-flex justify-content-between mb-3">
                <form onSubmit={e => { e.preventDefault(); }}>
                    <input
                        placeholder="Ara..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className="form-control"
                        style={{ width: 220, display: 'inline-block' }}
                    />
                </form>
                <button className="btn btn-primary" onClick={openCreate}>
                    <i className="fa fa-plus" /> Yeni {entityName}
                </button>
            </div>

            {/* Table */}
            <table className="table table-bordered align-middle">
                <thead>
                <tr>
                    <th>#</th>
                    {fields.map(f => <th key={f.key}>{f.label}</th>)}
                    <th style={{ width: 120 }}>İşlem</th>
                </tr>
                </thead>
                <tbody>
                {paged.map((it, idx) => (
                    <tr key={it[idKey]}>
                        <td>{(page-1)*pageSize + idx + 1}</td>
                        {fields.map(f => (
                            <td key={f.key}>
                                {f.type === 'image' && it[f.key] ?
                                    <img src={it[f.key]} alt="img" style={{ maxHeight: 36, maxWidth: 80 }} />
                                    : String(it[f.key] || '').slice(0, 80)
                                }
                            </td>
                        ))}
                        <td>
                            <button className="btn btn-sm btn-outline-primary me-1" onClick={() => openEdit(it)}>
                                <i className="fa fa-pen" />
                            </button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => { setToDelete(it); setShowDelete(true); }}>
                                <i className="fa fa-trash" />
                            </button>
                        </td>
                    </tr>
                ))}
                {!paged.length && <tr><td colSpan={fields.length+2} className="text-center text-muted">Kayıt yok</td></tr>}
                </tbody>
            </table>
            {/* Pagination */}
            <div className="d-flex justify-content-between align-items-center mt-2">
                <div>Toplam: {filtered.length} / Sayfa: {page}/{totalPages}</div>
                <div>
                    <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}>
                        {pageSizeOptions.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                    <button disabled={page===1} onClick={() => setPage(1)}>{'<<'}</button>
                    <button disabled={page===1} onClick={() => setPage(p => p-1)}>Önceki</button>
                    <button disabled={page===totalPages} onClick={() => setPage(p => p+1)}>Sonraki</button>
                    <button disabled={page===totalPages} onClick={() => setPage(totalPages)}>{'>>'}</button>
                </div>
            </div>

            {/* Modal: Create/Edit */}
            {showEdit && (
                <div className="modal fade show d-block" tabIndex={-1}>
                    <div className="modal-dialog modal-md">
                        <form className="modal-content" onSubmit={handleSubmit}>
                            <div className="modal-header">
                                <div className="modal-title">{editId ? 'Düzenle' : 'Yeni'} {entityName}</div>
                                <button type="button" className="btn-close" onClick={() => setShowEdit(false)} />
                            </div>
                            <div className="modal-body">
                                {fields.map(f => (
                                    <div key={f.key} className="mb-2">
                                        <label className="form-label">{f.label} {f.required && <span className="text-danger">*</span>}</label>
                                        {f.type === 'textarea' ?
                                            <textarea className="form-control" rows={3}
                                                      value={form[f.key]} onChange={e => setForm(s => ({ ...s, [f.key]: e.target.value }))} />
                                            : f.type === 'image' ?
                                                <input type="text" className="form-control"
                                                       placeholder="Görsel URL" value={form[f.key]}
                                                       onChange={e => setForm(s => ({ ...s, [f.key]: e.target.value }))} />
                                                :
                                                <input type="text" className="form-control"
                                                       value={form[f.key]}
                                                       onChange={e => setForm(s => ({ ...s, [f.key]: e.target.value }))} />
                                        }
                                        {errs[f.key] && <div className="text-danger small">{errs[f.key]}</div>}
                                    </div>
                                ))}
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-outline-secondary" type="button" onClick={() => setShowEdit(false)}>İptal</button>
                                <button className="btn btn-primary" type="submit">Kaydet</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Delete */}
            {showDelete && (
                <div className="modal fade show d-block" tabIndex={-1}>
                    <div className="modal-dialog modal-sm">
                        <div className="modal-content">
                            <div className="modal-header"><div className="modal-title">Sil?</div></div>
                            <div className="modal-body">
                                <div className="mb-2">{toDelete && fields[0] && (toDelete[fields[0].key] || '-')}</div>
                                <div>Silmek istediğinize emin misiniz?</div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-outline-secondary" onClick={() => setShowDelete(false)}>İptal</button>
                                <button className="btn btn-danger" onClick={confirmDelete}>Sil</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default GenericCrudTable;
