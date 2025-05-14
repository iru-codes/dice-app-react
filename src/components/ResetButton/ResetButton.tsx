import React from "react";
import "./ResetButton.css";

type ResetButtonProps = {
  onReset: () => void
}

const ResetButton: React.FC<ResetButtonProps> = ({ onReset }) => {
  return <button onClick={onReset}>Resetear</button>
}

export default ResetButton