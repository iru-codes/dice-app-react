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
  faces: number
  count: number
  onCountChange: (faces: number, value: number) => void
  showInput: boolean
  onSingleRoll?: (faces: number) => void
}

const DiceCard: React.FC<DiceCardProps> = ({ faces, count, onCountChange, showInput, onSingleRoll }) => {
  const images: Record<number, string> = {
    4: d4,
    6: d6,
    8: d8,
    10: d10,
    12: d12,
    20: d20,
    100: d100,
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0
    onCountChange(faces, value)
  }

  const handleSingleRoll = () => {
    if (onSingleRoll) {
      onSingleRoll(faces)
    }
  }

  return (
    <div className="tarjeta_dado_contenedor">
      <div className="tarjeta_dado" id={`D${faces}`} onClick={handleSingleRoll}>
        <img src={images[faces]} alt={`dado de ${faces} caras`} id={`d_${faces}`} />
      </div>
        {showInput && (
          <p className="input_veces">
            Cantidad: <input type="number" min="0" value={count} onChange={handleChange} id={`veces_D${faces}`} />
          </p>
        )}
    </div>
  )
}

export default DiceCard