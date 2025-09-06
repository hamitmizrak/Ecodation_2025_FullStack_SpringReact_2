import React from "react";

/**
 * Reusable form field component (input, textarea, select)
 *
 * Props:
 * - label: alan etiketi
 * - value: input/textarea değeri
 * - onChange: (e) => ...   // zorunlu!
 * - error: string (hata mesajı, varsa kırmızı gösterir)
 * - required: true/false
 * - as: "input" | "textarea" | "select" | (varsayılan: "input")
 * - type: input type ("text", "email", "number", ...)
 * - options: select için [{value, label}, ...]
 * - placeholder, className, ... (ek propslar)
 */
export default function FormField({
                                      label,
                                      value,
                                      onChange,
                                      error,
                                      required,
                                      as = "input",
                                      type = "text",
                                      options = [],
                                      className = "",
                                      ...rest
                                  }) {
    const id = React.useId ? React.useId() : ("ff_" + Math.random().toString(36).slice(2, 9));

    let control;
    if (as === "textarea") {
        control = (
            <textarea
                id={id}
                className={`form-control${error ? " is-invalid" : ""} ${className}`}
                value={value}
                onChange={onChange}
                required={required}
                {...rest}
            />
        );
    } else if (as === "select") {
        control = (
            <select
                id={id}
                className={`form-control${error ? " is-invalid" : ""} ${className}`}
                value={value}
                onChange={onChange}
                required={required}
                {...rest}
            >
                <option value="">Seçiniz...</option>
                {options.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
        );
    } else {
        control = (
            <input
                id={id}
                type={type}
                className={`form-control${error ? " is-invalid" : ""} ${className}`}
                value={value}
                onChange={onChange}
                required={required}
                {...rest}
            />
        );
    }

    return (
        <div className="mb-2">
            {label && (
                <label htmlFor={id} className="form-label">
                    {label}{" "}
                    {required && <span className="text-danger" title="Zorunlu">*</span>}
                </label>
            )}
            {control}
            {error && <div className="invalid-feedback d-block">{error}</div>}
        </div>
    );
}
