import React from "react";
import "./ResetButton.css";

export default function ResetButton({ onReset }) {
    return (
        <button onClick={onReset} className="reset">
            Reiniciar!
        </button>
    );
}