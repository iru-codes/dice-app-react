import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./DicePreferences.css";
const DicePreferences = ({ preferences, onChange }) => {
    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        const newValue = type === "checkbox" ? checked : value;
        onChange(name, type === "number" ? parseInt(String(newValue)) || 0 : newValue);
    };
    return (_jsxs("div", { className: "menu_resultados", children: [_jsx("h4", { className: "subtitulo", children: "Preferencias" }), _jsxs("div", { className: "menu", children: [_jsxs("p", { className: "mod", children: ["Modificadores:", _jsx("input", { type: "number", name: "modificador", value: preferences.modificador, onChange: handleChange })] }), _jsxs("div", { id: "num_objetivo", children: [_jsxs("p", { children: [_jsxs("span", { children: [_jsx("input", { type: "radio", name: "comparador", value: "mayor", checked: preferences.comparador === "mayor", onChange: handleChange }), "Mayor que..."] }), _jsxs("span", { children: [_jsx("input", { type: "radio", name: "comparador", value: "menor", checked: preferences.comparador === "menor", onChange: handleChange }), "Menor que..."] })] }), _jsxs("p", { id: "check_mod", children: ["Ingres\u00E1 el valor:", _jsx("input", { type: "number", name: "objetivo", min: "0", value: preferences.objetivo, onChange: handleChange })] })] }), _jsxs("p", { id: "check_suma", children: [_jsx("input", { type: "checkbox", name: "sumatoria", checked: preferences.sumatoria, onChange: handleChange, disabled: !preferences.multiples, className: !preferences.multiples ? "disabled-checkbox" : "" }), "Sumar resultados"] })] }), _jsxs("p", { className: "check_multi", children: [_jsx("input", { type: "checkbox", name: "multiples", checked: preferences.multiples, onChange: handleChange }), "Tirar varios dados"] })] }));
};
export default DicePreferences;
