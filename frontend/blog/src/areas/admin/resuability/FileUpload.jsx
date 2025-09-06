import React, { useRef } from "react";

/**
 * Reusable FileUpload
 *
 * Props:
 * - label: Açıklama (opsiyonel)
 * - value: null | File | string (URL) (tek dosya)
 * - onChange: (file: File|null) => void
 * - accept: "image/*" vs. (varsayılan: "image/*")
 * - preview: true/false (varsayılan: true, görsel dosyada otomatik göster)
 * - maxSize: maksimum dosya boyutu MB (opsiyonel)
 * - className: ek className
 * - disabled: true/false
 */
export default function FileUpload({
                                       label,
                                       value,
                                       onChange,
                                       accept = "image/*",
                                       preview = true,
                                       maxSize,
                                       className = "",
                                       disabled = false,
                                   }) {
    const fileRef = useRef();

    const handleFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) {
            onChange(null);
            return;
        }
        if (maxSize && file.size > maxSize * 1024 * 1024) {
            alert("Maksimum dosya boyutu: " + maxSize + " MB");
            fileRef.current.value = "";
            onChange(null);
            return;
        }
        onChange(file);
    };

    // Önizleme URL'i (dosya ise blob, string ise url)
    let previewUrl = "";
    if (value && preview) {
        if (typeof value === "string") previewUrl = value;
        else if (typeof value === "object" && value instanceof File) previewUrl = URL.createObjectURL(value);
    }

    return (
        <div className={`mb-2 ${className}`}>
            {label && <label className="form-label">{label}</label>}
            <input
                type="file"
                accept={accept}
                className="form-control"
                ref={fileRef}
                disabled={disabled}
                onChange={handleFile}
            />
            {previewUrl && (
                <div className="mt-2">
                    {accept.startsWith("image") ? (
                        <img
                            src={previewUrl}
                            alt="Önizleme"
                            style={{ maxHeight: 180, maxWidth: "100%", objectFit: "contain", borderRadius: 8 }}
                        />
                    ) : (
                        <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="d-block">
                            Dosyayı Görüntüle / İndir
                        </a>
                    )}
                </div>
            )}
        </div>
    );
}
