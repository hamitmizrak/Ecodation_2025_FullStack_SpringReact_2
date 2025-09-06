import React from "react";

/**
 * Reusable filter bar component.
 *
 * Props:
 * - fields: [
 *     {
 *       key: "name",
 *       label: "About Name",
 *       type: "text" | "select" | "checkbox" | "date" | "number" | "custom",
 *       options: [{ value, label }] (select için),
 *       col: 3, (bootstrap grid col, default 3)
 *       ...rest (ek props)
 *     },
 *     ...
 *   ]
 * - values: { [key]: value }
 * - onChange: (values) => void
 * - onApply: () => void
 * - onReset: () => void
 * - loading: (opsiyonel)
 */
export default function FilterBar({
                                      fields = [],
                                      values = {},
                                      onChange,
                                      onApply,
                                      onReset,
                                      loading = false,
                                  }) {
    const handleChange = (key, val) => {
        onChange({ ...values, [key]: val });
    };

    return (
        <form
            className="row g-3"
            onSubmit={e => {
                e.preventDefault();
                onApply && onApply();
            }}
        >
            {fields.map((field, i) => {
                const {
                    key,
                    label,
                    type = "text",
                    options = [],
                    col = 3,
                    ...rest
                } = field;
                let ctrl;
                if (type === "select") {
                    ctrl = (
                        <select
                            className="form-control"
                            value={values[key] ?? ""}
                            onChange={e => handleChange(key, e.target.value)}
                            {...rest}
                        >
                            <option value="">Seçiniz…</option>
                            {options.map(o => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                        </select>
                    );
                } else if (type === "checkbox") {
                    ctrl = (
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id={key}
                                checked={!!values[key]}
                                onChange={e => handleChange(key, e.target.checked)}
                                {...rest}
                            />
                            <label className="form-check-label" htmlFor={key}>
                                {label}
                            </label>
                        </div>
                    );
                } else if (type === "date") {
                    ctrl = (
                        <input
                            type="date"
                            className="form-control"
                            value={values[key] ?? ""}
                            onChange={e => handleChange(key, e.target.value)}
                            {...rest}
                        />
                    );
                } else if (type === "custom" && field.render) {
                    ctrl = field.render({
                        value: values[key],
                        onChange: val => handleChange(key, val),
                        ...field,
                    });
                } else {
                    ctrl = (
                        <input
                            type={type}
                            className="form-control"
                            value={values[key] ?? ""}
                            onChange={e => handleChange(key, e.target.value)}
                            placeholder={label}
                            {...rest}
                        />
                    );
                }
                // Checkbox'lar için label input dışında, diğerlerinde dışında
                return (
                    <div className={`col-12 col-md-${col || 3}`} key={key}>
                        {type !== "checkbox" && label && (
                            <label className="form-label">{label}</label>
                        )}
                        {ctrl}
                    </div>
                );
            })}
            <div className="col-12 d-flex justify-content-end gap-2">
                <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={onReset}
                    disabled={loading}
                >
                    Sıfırla
                </button>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                >
                    Uygula
                </button>
            </div>
        </form>
    );
}
