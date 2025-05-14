import { jsx as _jsx } from "react/jsx-runtime";
import "./ResetButton.css";
const ResetButton = ({ onReset }) => {
    return _jsx("button", { onClick: onReset, children: "Resetear" });
};
export default ResetButton;
