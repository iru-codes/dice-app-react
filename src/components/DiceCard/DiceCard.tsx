import React from "react";

import d4 from "../../assets/D4.png";
import d6 from "../../assets/D6.png";
import d8 from "../../assets/D8.png";
import d10 from "../../assets/D10.png";
import d12 from "../../assets/D12.png";
import d20 from "../../assets/D20.png";
import d100 from "../../assets/D100.png";

import "./DiceCard.css";

type DiceCardProps = {
    id: string;
    value: number;
    onChange: (value: number) => void;
}

const DiceCard: React.FC<DiceCardProps> = ({ id, value, onChange }) => {
    const images: Record<string, string> = {
        d4,
        d6,
        d8,
        d10,
        d12,
        d20,
        d100,
    }

    return (
        <div className="tarjeta_dado" id={id}>
            <img src={images[id]} alt={id} id={id} />
            <button className="boton_elegir" >{id}</button>
            {value > 0 && <p className="input_veces">{value}</p>}
            <input 
                type="number"
                min={0}
                value={value}
                onChange = {(e) => onChange(Number(e.target.value))}    
            />      
        </div>
    );
};

export default DiceCard;