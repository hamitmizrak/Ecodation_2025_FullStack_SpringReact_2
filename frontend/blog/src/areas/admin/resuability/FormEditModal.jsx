// /admin/resuability/FormEditModal.jsx
import React from "react";
import BsModal from "./BsModal";

export default function FormEditModal({
                                      show,
                                      title,
                                      onClose,
                                      onSubmit,
                                      loading,
                                      children,
                                  }) {
    return (
        <BsModal show={show} title={title} onClose={onClose}>
            <form onSubmit={onSubmit} noValidate>
                {children}
                <div className="d-flex justify-content-end gap-2 mt-3">
                    <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                        İptal
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading && <span className="spinner-border spinner-border-sm me-2" />}
                        <i className="fa fa-save me-1" /> Kaydet
                    </button>
                </div>
            </form>
        </BsModal>
    );
}
