import React from "react";

// columns: [{ key, label, sortable, render }]
export default function DataTable({
                                      columns = [],
                                      data = [],
                                      sort = { by: "", dir: "asc" },
                                      onSort = () => {},
                                      page = 1,
                                      pageSize = 10,
                                      total = 0,
                                      onPageChange = () => {},
                                      renderActions, // function(row, rowIndex): JSX
                                      loading = false,
                                      noDataText = "Kayıt yok.",
                                  }) {
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const pageNumbers = React.useMemo(() => {
        let start = Math.max(1, page - 2);
        let end = Math.min(totalPages, start + 4);
        start = Math.max(1, end - 4);
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }, [page, totalPages]);

    const sortIcon = (key) => {
        if (sort.by !== key) return <i className="fa fa-sort text-muted" />;
        return (
            <i className={`fa ${sort.dir === "asc" ? "fa-sort-up" : "fa-sort-down"}`} />
        );
    };

    return (
        <div className="table-responsive">
            <table className="table align-middle mb-0">
                <thead className="table-light">
                <tr>
                    <th style={{ width: 56 }}>#</th>
                    {columns.map((col) => (
                        <th key={col.key} style={col.style}>
                            {col.sortable ? (
                                <button
                                    type="button"
                                    className="btn btn-link p-0 text-decoration-none"
                                    onClick={() => onSort(col.key)}
                                >
                                    {col.label} {sortIcon(col.key)}
                                </button>
                            ) : (
                                col.label
                            )}
                        </th>
                    ))}
                    {renderActions && (
                        <th className="text-end" style={{ width: 140 }}>
                            İşlem
                        </th>
                    )}
                </tr>
                </thead>
                <tbody>
                {data.length > 0 ? (
                    data.map((row, idx) => (
                        <tr key={row.id ?? row.aboutId ?? idx}>
                            <td>{(page - 1) * pageSize + idx + 1}</td>
                            {columns.map((col) => (
                                <td key={col.key}>
                                    {col.render ? col.render(row, idx) : row[col.key]}
                                </td>
                            ))}
                            {renderActions && (
                                <td className="text-end">{renderActions(row, idx)}</td>
                            )}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={columns.length + 2} className="text-center text-muted py-4">
                            {loading ? "Yükleniyor…" : noDataText}
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 py-2">
                <div className="small text-muted">
                    Toplam: {total} / Sayfa: {page} / {totalPages}
                </div>
                <div className="d-flex align-items-center gap-2">
                    <nav>
                        <ul className="pagination pagination-sm mb-0">
                            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                                <button className="page-link" onClick={() => onPageChange(1)}>
                                    &laquo;
                                </button>
                            </li>
                            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                                <button className="page-link" onClick={() => onPageChange(page - 1)}>
                                    Önceki
                                </button>
                            </li>
                            {pageNumbers.map((n) => (
                                <li key={n} className={`page-item ${n === page ? "active" : ""}`}>
                                    <button className="page-link" onClick={() => onPageChange(n)}>
                                        {n}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                                <button className="page-link" onClick={() => onPageChange(page + 1)}>
                                    Sonraki
                                </button>
                            </li>
                            <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                                <button className="page-link" onClick={() => onPageChange(totalPages)}>
                                    &raquo;
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}
