// /admin/resuability/FormDetailModal.jsx
import React from "react";
import BsModal from "./BsModal";

export default function FormDetailModal({
                                        show,
                                        title = "Detay",
                                        onClose,
                                        detail,
                                        fields = [],
                                        imageKey = "imageUrl",
                                        resolveImageUrl,
                                        formatDate,
                                        ...rest
                                    }) {
    return (
        <BsModal show={show} title={title} onClose={onClose} size="lg" {...rest}>
            {detail ? (
                <div className="row g-3">
                    <div className="col-12 col-md-4">
                        <div className="border rounded bg-light p-2">
                            {detail[imageKey] ? (
                                <img
                                    src={resolveImageUrl ? resolveImageUrl(detail[imageKey]) : detail[imageKey]}
                                    alt="detay"
                                    className="thumb-img rounded w-100"
                                    style={{ maxHeight: 220, objectFit: "contain", background: "#fff" }}
                                />
                            ) : (
                                <div className="d-flex align-items-center justify-content-center rounded" style={{ minHeight: 160 }}>
                                    <span className="text-muted small">RESIM YOK</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-12 col-md-8">
                        <div className="mb-2 text-muted small">
                            Oluşturulma: {formatDate && detail.systemCreatedDate ? formatDate(detail.systemCreatedDate) : detail.systemCreatedDate}
                        </div>
                        {fields.map(f => (
                            <div className="mb-3" key={f.key}>
                                <div className="fw-semibold mb-1">{f.label}</div>
                                <div className="text-muted" style={{ whiteSpace: "pre-wrap" }}>
                                    {detail[f.key]}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-muted">Kayıt bulunamadı.</div>
            )}
            <div className="d-flex justify-content-end mt-3">
                <button className="btn btn-secondary" onClick={onClose}>
                    Kapat
                </button>
            </div>
        </BsModal>
    );
}
