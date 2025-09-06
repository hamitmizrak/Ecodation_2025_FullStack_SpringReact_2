import React, { useEffect } from "react";

// Bootstrap-like, sade ve reusable modal bileşeni
export default function BsModal({ show, title, children, footer, onClose, size = "lg" }) {
    useEffect(() => {
        function onEsc(e) {
            if (e.key === "Escape") onClose?.();
        }
        if (show) document.addEventListener("keydown", onEsc);
        return () => document.removeEventListener("keydown", onEsc);
    }, [show, onClose]);

    if (!show) return null;

    return (
        <>
            <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-modal="true">
                <div className={`modal-dialog modal-${size} modal-dialog-centered`} role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title m-0">{title}</h5>
                            <button type="button" className="btn-close" aria-label="Kapat" onClick={onClose} />
                        </div>
                        <div className="modal-body">{children}</div>
                        {footer && <div className="modal-footer">{footer}</div>}
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show" onClick={onClose} />
        </>
    );
}
