import React from "react";
import "./DiceCard.css";

export default function DiceCard({ faces, count, onCountChange }) {
    const handleChange = (e) => {
        const value = parseInt(e.target.value) || 0;
        onCountChange(faces, value);
    }
    return (
        <div className="tarjeta_dado" id={`D${faces}`}>
            <img src={require(`/src/assets/D${faces}.png`)} alt={`dado de ${faces} caras`} id={`d_${faces}`} />
            <button className="boton_elegir" >D{faces}</button>
            <p className="input_veces">
                Cantidad: <input type="number" min={0} value={count} onChange = {handleChange} />
            </p>
        </div>
    );
};