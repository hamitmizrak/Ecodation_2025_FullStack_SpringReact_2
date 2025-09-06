// /admin/resuability/FormConfirmDialog.jsx
import React from "react";
import BsModal from "./BsModal";

export default function FormConfirmDialog({
                                          show,
                                          title = "Onay",
                                          text = "Bu işlemi yapmak istediğinize emin misiniz?",
                                          onClose,
                                          onConfirm,
                                          confirmText = "Evet",
                                          cancelText = "İptal",
                                          confirmVariant = "danger",
                                          loading = false,
                                          children,
                                          ...rest
                                      }) {
    return (
        <BsModal
            show={show}
            title={title}
            onClose={onClose}
            size="md"
            footer={
                <>
                    <button className="btn btn-outline-secondary" onClick={onClose} disabled={loading}>
                        {cancelText}
                    </button>
                    <button className={`btn btn-${confirmVariant}`} onClick={onConfirm} disabled={loading}>
                        {loading && <span className="spinner-border spinner-border-sm me-1" />}
                        {confirmText}
                    </button>
                </>
            }
            {...rest}
        >
            <div className="mb-0">{text}</div>
            {children}
        </BsModal>
    );
}
