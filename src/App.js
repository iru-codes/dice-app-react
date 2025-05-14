import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useEffect, useState } from "react";
import DiceCard from "./components/DiceCard/DiceCard";
import DicePreferences from "./components/DicePreferences/DicePreferences";
import DiceRollButton from "./components/DiceRollButton/DiceRollButton";
import ResultDisplay from "./components/ResultDisplay/ResultDisplay";
import ResetButton from "./components/ResetButton/ResetButton";
import Logo from "./components/AnimatedLogo/AnimatedLogo";
import "./App.css";
const DICE_TYPES = [4, 6, 8, 10, 12, 20, 100];
const App = () => {
    const [diceCounts, setDiceCounts] = useState({
        4: 0,
        6: 0,
        8: 0,
        10: 0,
        12: 0,
        20: 0,
        100: 0,
    });
    const [preferences, setPreferences] = useState({
        sumatoria: false,
        comparador: "mayor",
        objetivo: 0,
        modificador: 0,
        multiples: false,
    });
    const [results, setResults] = useState([]);
    const [totalSumResult, setTotalSumResult] = useState(null);
    const resultRef = useRef(null);
    useEffect(() => {
        if ((results.length > 0 || totalSumResult) && resultRef.current) {
            setTimeout(() => {
                resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 0);
        }
    }, [results, totalSumResult]);
    const updateDiceCount = (faces, value) => {
        setDiceCounts(prev => ({ ...prev, [faces]: value }));
    };
    const updatePreferences = (field, value) => {
        setPreferences(prev => ({ ...prev, [field]: value }));
    };
    const handleReset = () => {
        setDiceCounts({
            4: 0,
            6: 0,
            8: 0,
            10: 0,
            12: 0,
            20: 0,
            100: 0,
        });
        setPreferences({
            sumatoria: false,
            comparador: "mayor",
            objetivo: 0,
            modificador: 0,
            multiples: false,
        });
        setResults([]);
        setTotalSumResult(null);
    };
    const handleSingleRoll = (faces) => {
        const base = Math.floor(Math.random() * faces) + 1;
        const tirada = base + preferences.modificador;
        const validarCondiciones = preferences.objetivo > 0 && (preferences.comparador === "mayor" || preferences.comparador === "menor");
        const exito = validarCondiciones ? (preferences.comparador === "mayor" ? tirada >= preferences.objetivo : tirada <= preferences.objetivo) : null;
        const resultado = {
            caras: faces,
            tiradas: [{ base, tirada, modificador: preferences.modificador }],
            suma: tirada,
            exitoTotal: exito
        };
        setResults([resultado]);
        setTotalSumResult(null);
    };
    const handleMultiRoll = () => {
        const results = [];
        let totalSuma = 0;
        const validarCondiciones = preferences.objetivo > 0 && (preferences.comparador === "mayor" || preferences.comparador === "menor");
        Object.entries(diceCounts).forEach(([facesStr, cantidadStr]) => {
            const faces = parseInt(facesStr);
            const cantidad = parseInt(String(cantidadStr));
            if (cantidad <= 0)
                return;
            const tiradas = [];
            let sumaParcial = 0;
            for (let i = 0; i < cantidad; i++) {
                const base = Math.floor(Math.random() * faces) + 1;
                const tirada = base + preferences.modificador;
                tiradas.push({ base, tirada, modificador: preferences.modificador });
                sumaParcial += tirada;
            }
            totalSuma += sumaParcial;
            const exitos = validarCondiciones && !preferences.sumatoria
                ? tiradas.map(({ tirada }) => preferences.comparador === "mayor"
                    ? tirada >= preferences.objetivo
                    : tirada <= preferences.objetivo)
                : undefined;
            const exitoTotal = validarCondiciones && preferences.sumatoria
                ? preferences.comparador === "mayor"
                    ? totalSuma >= preferences.objetivo
                    : totalSuma <= preferences.objetivo
                : null;
            results.push({ caras: faces, tiradas, suma: sumaParcial, exitoTotal, exitos });
        });
        if (preferences.sumatoria) {
            const exitoTotal = validarCondiciones ?
                preferences.comparador === "mayor"
                    ? totalSuma >= preferences.objetivo
                    : totalSuma <= preferences.objetivo
                : null;
            setTotalSumResult({ suma: totalSuma, exitoTotal });
        }
        else {
            setTotalSumResult(null);
        }
        setResults(results);
    };
    return (_jsxs("div", { className: "App", children: [_jsxs("div", { className: "intro_container", children: [_jsx(Logo, {}), _jsxs("div", { className: "intro_texto", children: [_jsx("h1", { className: 'titulo', children: "Dice-Roll App" }), _jsx("h2", { className: 'subtitulo', children: "Customiz\u00E1 tus tiradas" })] })] }), _jsxs("div", { className: "app_container", children: [_jsx("div", { className: 'dados', children: DICE_TYPES.map(faces => (_jsx(DiceCard, { faces: faces, count: diceCounts[faces], onCountChange: updateDiceCount, showInput: preferences.multiples, onSingleRoll: handleSingleRoll }, faces))) }), _jsxs("div", { className: "menu", children: [_jsx(DicePreferences, { preferences: preferences, onChange: updatePreferences }), _jsx(DiceRollButton, { diceCounts: diceCounts, preferences: preferences, onRoll: handleMultiRoll })] }), _jsxs("div", { className: "botones", children: [_jsx(ResultDisplay, { results: results, totalSumResult: totalSumResult, resultRef: resultRef }), _jsx(ResetButton, { onReset: handleReset })] })] })] }));
};
export default App;
