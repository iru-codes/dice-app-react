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
  totalSumResult?: { suma: number; exitoTotal: boolean | null } | null
  resultRef?: React.RefObject<HTMLDivElement | null> 
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ results, totalSumResult, resultRef }) => {
  if (results.length === 0 && !totalSumResult) return null

const isMultiple = results.length > 1 || results.some(r => r.tiradas.length > 1)
const isSumatoria = !!totalSumResult

  return (
    <div className="resultado_container" ref={resultRef}>
      <div className="resultado">
        <h3>Resultado</h3>
        <div id="resultado_total">
          {results.map(res => (           
              res.tiradas.map((t, i) => (
                <div key={`${res.caras}-${i}`} className="resultado_dado">
                  <p className="resultado_header"><strong>D{res.caras}</strong></p>
                  <p className="resultado_valores">
                    {isMultiple ? `Roll ${i + 1}: ` : ""}
                    {t.modificador !== 0
                        ? `${t.base} ${t.modificador > 0 ? "+" : "-"} ${Math.abs(t.modificador)} = ${t.tirada}`
                        : `${t.base}`}
                  </p>
                  
                  {!isSumatoria && isMultiple && res.exitos && res.exitos[i] !== undefined && (
                    <p className="resultado_estado">{res.exitos[i] ? "¡Exitosa!" : "¡Fallida!"}</p>
                  )}

                  {!isMultiple && res.exitoTotal !== null && (
                    <p className="resultado_estado">{res.exitoTotal ? "¡Exitosa!" : "¡Fallida!"}</p>
                  )}
                </div>
            ))
        ))}

          {totalSumResult && (
            <div className="resultado_dado total_resumen">
              <p className="resultado_suma"> Total: {totalSumResult.suma}
              </p>
              {totalSumResult.exitoTotal !== null && (
                <p className="resultado_estado">
                  {totalSumResult.exitoTotal ? "¡Tirada exitosa!" : "¡Tirada fallida!"}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResultDisplay