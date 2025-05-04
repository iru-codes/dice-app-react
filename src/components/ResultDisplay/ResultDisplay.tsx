import React from "react"
import  "./ResultDisplay.css"


export type FullDiceResult = {
  caras: number
  tiradas: { base: number; modificador: number; tirada: number }[]
  suma?: number
  exitoTotal?: boolean | null
  exitos?: boolean[]
}

type ResultDisplayProps = {
  results: FullDiceResult[]
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ results }) => {
  if (results.length === 0) return null

  return (
    <div className="resultado">
      <h3>Tirada:</h3>
      <div id="resultado_total">
        {results.map((res, idx) => (
          <div key={idx} className="resultado_dado">
            <p className="resultado_header">D{res.caras}:</p>
            <p className="resultado_valores">
              {res.tiradas.map((t, i) => (
                <span key={i}>
                    {t.modificador !== 0
                    ? `${t.base} ${t.modificador > 0 ? "+" : "-"} ${Math.abs(t.modificador)} = ${t.tirada}`
                    : `${t.base}`}
                </span>
              )).reduce((prev, curr) => <>
              {prev}
              <br />
              {curr}
            </>
          )}
            </p>
            {res.suma && <p className="resultado_suma">Total: {res.suma}</p>}
            {res.exitoTotal !== null && (
              <p className="resultado_estado">{res.exitoTotal ? "¡Exitosa!" : "¡Fallida!"}</p>
              )}
            {res.exitos && (
              <p className="resultado_exitos">
                {res.exitos.map((ok, i) => (
                  <span key={i}>{`Tirada ${i + 1}: ${ok ? "¡Exitosa!" : "Fallida!"}`}</span>
                )).reduce((prev, curr) => <>
                {prev}
                <br />
                {curr}
              </>
              )}
            </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResultDisplay