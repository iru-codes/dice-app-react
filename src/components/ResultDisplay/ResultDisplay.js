import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./ResultDisplay.css";
const ResultDisplay = ({ results, totalSumResult, resultRef }) => {
    if (results.length === 0 && !totalSumResult)
        return null;
    const isMultiple = results.length > 1 || results.some(r => r.tiradas.length > 1);
    const isSumatoria = !!totalSumResult;
    return (_jsx("div", { className: "resultado_container", ref: resultRef, children: _jsxs("div", { className: "resultado", children: [_jsx("h3", { children: "Resultado" }), _jsxs("div", { id: "resultado_total", children: [results.map(res => (res.tiradas.map((t, i) => (_jsxs("div", { className: "resultado_dado", children: [_jsx("p", { className: "resultado_header", children: _jsxs("strong", { children: ["D", res.caras] }) }), _jsxs("p", { className: "resultado_valores", children: [isMultiple ? `Roll ${i + 1}: ` : "", t.modificador !== 0
                                            ? `${t.base} ${t.modificador > 0 ? "+" : "-"} ${Math.abs(t.modificador)} = ${t.tirada}`
                                            : `${t.base}`] }), !isSumatoria && isMultiple && res.exitos && res.exitos[i] !== undefined && (_jsx("p", { className: "resultado_estado", children: res.exitos[i] ? "¡Exitosa!" : "¡Fallida!" })), !isMultiple && res.exitoTotal !== null && (_jsx("p", { className: "resultado_estado", children: res.exitoTotal ? "¡Exitosa!" : "¡Fallida!" }))] }, `${res.caras}-${i}`))))), totalSumResult && (_jsxs("div", { className: "resultado_dado total_resumen", children: [_jsxs("p", { className: "resultado_suma", children: [" Total: ", totalSumResult.suma] }), totalSumResult.exitoTotal !== null && (_jsx("p", { className: "resultado_estado", children: totalSumResult.exitoTotal ? "¡Tirada exitosa!" : "¡Tirada fallida!" }))] }))] })] }) }));
};
export default ResultDisplay;
