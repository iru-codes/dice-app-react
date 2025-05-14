import React from 'react';
import "./DicePreferences.css";


export type Preferences = {
    sumatoria: boolean
    comparador: "mayor" | "menor"
    objetivo: number
    modificador: number
    multiples: boolean
}

type DicePreferencesProps = {
    preferences: Preferences
    onChange: (name: string, value: boolean | number | string) => void
}

const DicePreferences: React.FC<DicePreferencesProps> = ({ preferences, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, checked, value } = e.target;
        const newValue = type === "checkbox" ? checked : value;
        onChange(name, type === "number" ? parseInt(String(newValue)) || 0 : newValue);
    }

    return (
        <div className="menu_resultados">
            <h4 className="subtitulo">Preferencias</h4>

            <div className="menu">
                <p className="mod">
                Modificadores:
                <input
                    type="number"
                    name="modificador"
                    value={preferences.modificador}
                    onChange={handleChange}
                />
                </p>

                <div id="num_objetivo">
                <p>
                    <span>
                    <input
                        type="radio"
                        name="comparador"
                        value="mayor"
                        checked={preferences.comparador === "mayor"}
                        onChange={handleChange}
                    />
                    Mayor que...
                    </span>
                    <span>
                    <input
                        type="radio"
                        name="comparador"
                        value="menor"
                        checked={preferences.comparador === "menor"}
                        onChange={handleChange}
                    />
                    Menor que...
                    </span>
                </p>

                <p id="check_mod">
                    Ingresá el valor:
                    <input
                    type="number"
                    name="objetivo"
                    min="0"
                    value={preferences.objetivo}
                    onChange={handleChange}
                    />
                </p>
                </div>

                <p id="check_suma">
                <input
                    type="checkbox"
                    name="sumatoria"
                    checked={preferences.sumatoria}
                    onChange={handleChange}
                    disabled={!preferences.multiples}
                    className={!preferences.multiples ? "disabled-checkbox" : ""}
                />
                Sumar resultados
                </p>
            </div>

            <p className="check_multi">
                <input
                type="checkbox"
                name="multiples"
                checked={preferences.multiples}
                onChange={handleChange}
                />
                Tirar varios dados
            </p>
    </div>
    )
}

export default DicePreferences