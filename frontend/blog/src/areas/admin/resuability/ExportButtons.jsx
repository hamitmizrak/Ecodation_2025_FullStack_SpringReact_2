import React from "react";

/**
 * ExportButtons
 *
 * Props:
 * - onExcel: () => void
 * - onPdf: () => void
 * - onCsv: () => void (opsiyonel)
 * - onPrint: () => void (opsiyonel)
 * - loading: true/false (her butonda loading gösterir)
 * - disabled: true/false
 * - exports: ["excel", "pdf", "csv", "print"] (gösterilecek butonlar)
 * - className: Ek class
 */
export default function ExportButtons({
                                          onExcel,
                                          onPdf,
                                          onCsv,
                                          onPrint,
                                          loading = false,
                                          disabled = false,
                                          exports = ["excel", "pdf"],
                                          className = "",
                                      }) {
    return (
        <div className={`d-flex gap-2 flex-wrap ${className}`}>
            {exports.includes("excel") && (
                <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={onExcel}
                    disabled={loading || disabled}
                >
                    {loading ? (
                        <span className="spinner-border spinner-border-sm me-1" />
                    ) : (
                        <i className="fa fa-file-excel me-1" />
                    )}
                    Excel
                </button>
            )}
            {exports.includes("pdf") && (
                <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={onPdf}
                    disabled={loading || disabled}
                >
                    {loading ? (
                        <span className="spinner-border spinner-border-sm me-1" />
                    ) : (
                        <i className="fa fa-file-pdf me-1" />
                    )}
                    PDF
                </button>
            )}
            {exports.includes("csv") && (
                <button
                    type="button"
                    className="btn btn-outline-info"
                    onClick={onCsv}
                    disabled={loading || disabled}
                >
                    {loading ? (
                        <span className="spinner-border spinner-border-sm me-1" />
                    ) : (
                        <i className="fa fa-file-csv me-1" />
                    )}
                    CSV
                </button>
            )}
            {exports.includes("print") && (
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={onPrint}
                    disabled={loading || disabled}
                >
                    {loading ? (
                        <span className="spinner-border spinner-border-sm me-1" />
                    ) : (
                        <i className="fa fa-print me-1" />
                    )}
                    Yazdır
                </button>
            )}
        </div>
    );
}
