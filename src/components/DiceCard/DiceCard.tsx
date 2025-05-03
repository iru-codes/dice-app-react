import React from "react";
import "./DiceCard.css";

type Props = {
    faces: number
    count: number
    onCountChange: (faces: number, value: number) => void
    showInput: boolean
}

export default function DiceCard({ faces, count, onCountChange, showInput }: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0;
        onCountChange(faces, value);
    }
    return (
        <div className="tarjeta_dado" id={`D${faces}`}>
            <img src={require(`/src/assets/D${faces}.png`)} alt={`dado de ${faces} caras`} id={`d_${faces}`} />
            <button className="boton_elegir" >D{faces}</button>
            {showInput && (
                <p className="input_veces">
                    Cantidad: <input type="number" id={`veces_D${faces}`} min="0" value={count} onChange={handleChange} />
                </p>
            )}
        </div>
    );
};
