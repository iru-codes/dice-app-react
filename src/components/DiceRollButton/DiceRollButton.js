import { jsx as _jsx } from "react/jsx-runtime";
const DiceRollButton = ({ diceCounts, preferences, onRoll }) => {
    const rollDice = () => {
        const results = [];
        const { sumatoria, comparador, objetivo, modificador } = preferences;
        const validarCondiciones = objetivo > 0 && (comparador === "mayor" || comparador === "menor");
        Object.entries(diceCounts).forEach(([faces, veces]) => {
            const caras = parseInt(faces);
            const n = parseInt(String(veces));
            if (n <= 0)
                return;
            const tiradas = [];
            let suma = 0;
            for (let i = 0; i < n; i++) {
                const base = Math.floor(Math.random() * caras) + 1;
                const tirada = base + modificador;
                tiradas.push({ base, tirada, modificador });
                suma += tirada;
            }
            const resultado = {
                caras,
                tiradas,
                suma,
                exitos: validarCondiciones && !sumatoria
                    ? tiradas.map(({ tirada }) => comparador === "mayor" ? tirada >= objetivo : tirada <= objetivo)
                    : undefined,
                exitoTotal: validarCondiciones && sumatoria
                    ? comparador === "mayor"
                        ? suma >= objetivo
                        : suma <= objetivo
                    : null
            };
            results.push(resultado);
        });
        onRoll(results);
    };
    return (_jsx("button", { onClick: rollDice, id: "dice_roll", children: "\u00A1Roll!" }));
};
export default DiceRollButton;
