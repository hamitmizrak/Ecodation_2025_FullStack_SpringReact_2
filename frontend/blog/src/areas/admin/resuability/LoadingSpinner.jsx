import React from "react";

/**
 * Reusable loading spinner
 *
 * Props:
 * - size: "sm" | "md" | "lg" | px değeri (varsayılan: md)
 * - text: Açıklama/metin (opsiyonel)
 * - className: Ek className
 * - style: Ek stil
 */
export default function LoadingSpinner({
                                           size = "md",
                                           text = "",
                                           className = "",
                                           style = {},
                                       }) {
    // Bootstrap için büyüklük ayarı
    let spinnerSize = "";
    let customStyle = { ...style };
    if (typeof size === "string") {
        if (size === "sm") spinnerSize = " spinner-border-sm";
        if (size === "lg") customStyle = { ...customStyle, width: "3rem", height: "3rem" };
    } else if (typeof size === "number") {
        customStyle = { ...customStyle, width: size, height: size };
    }

    return (
        <div className={`d-flex flex-column align-items-center justify-content-center ${className}`}>
            <div
                className={`spinner-border${spinnerSize}`}
                style={customStyle}
                role="status"
            />
            {text && <span className="mt-2 small text-muted">{text}</span>}
        </div>
    );
}
