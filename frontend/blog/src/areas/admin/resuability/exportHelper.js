import { showInfo, showSuccess, showError } from "./toastHelper";

// Her entity için: Excel export
export async function exportExcelHelper({
                                            data,
                                            columns,
                                            fileName = "export",
                                            sheetName = "Sheet1"
                                        }) {
    try {
        showInfo("Excel hazırlanıyor…");
        const XLSX = await import("xlsx");
        // Header: columns'dan alınır
        const headers = columns.map(c => c.label || c.key);
        // Data: columns'a göre maplenir
        const rows = data.map((row, idx) => {
            const obj = {};
            obj["#"] = idx + 1;
            columns.forEach(col => {
                obj[col.label || col.key] =
                    typeof col.export === "function"
                        ? col.export(row, idx)
                        : row[col.key] ?? "";
            });
            return obj;
        });
        const ws = XLSX.utils.json_to_sheet(rows, { header: ["#", ...headers] });
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
        const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const blob = new Blob([wbout], { type: "application/octet-stream" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${fileName}_${new Date().toISOString().slice(0, 10)}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        showSuccess("Excel indirildi.");
    } catch {
        showError("Excel için: npm i xlsx");
    }
}

// Her entity için: PDF export
export async function exportPdfHelper({
                                          data,
                                          columns,
                                          fileName = "export",
                                          pdfTitle = "Export",
                                      }) {
    try {
        showInfo("PDF hazırlanıyor…");
        const jsPDF = (await import("jspdf")).default;
        const autoTable = (await import("jspdf-autotable")).default;
        const doc = new jsPDF();
        const head = [["#", ...columns.map(c => c.label || c.key)]];
        const body = data.map((row, idx) => [
            idx + 1,
            ...columns.map(col =>
                typeof col.export === "function"
                    ? col.export(row, idx)
                    : row[col.key] ?? ""
            ),
        ]);
        autoTable(doc, {
            head,
            body,
            styles: { fontSize: 8, cellPadding: 2 },
            margin: { top: 10 },
        });
        doc.save(`${fileName}_${new Date().toISOString().slice(0, 10)}.pdf`);
        showSuccess("PDF indirildi.");
    } catch {
        showError("PDF için: npm i jspdf jspdf-autotable");
    }
}
