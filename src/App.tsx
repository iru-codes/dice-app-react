import React, { useRef, useEffect, useState } from "react"
import DiceCard from "./components/DiceCard/DiceCard"
import DicePreferences from "./components/DicePreferences/DicePreferences"
import type { Preferences } from "./components/DicePreferences/DicePreferences.tsx"
import DiceRollButton from "./components/DiceRollButton/DiceRollButton"
import ResultDisplay from "./components/ResultDisplay/ResultDisplay"
import ResetButton from "./components/ResetButton/ResetButton"
import type { FullDiceResult } from "./components/ResultDisplay/ResultDisplay.tsx"
import type { DiceCounts } from "./components/DiceRollButton/DiceRollButton.tsx"
import Logo from "./components/AnimatedLogo/AnimatedLogo"
import "./App.css"

const DICE_TYPES = [4, 6, 8, 10, 12, 20, 100]

const App: React.FC = () => {
  const [diceCounts, setDiceCounts] = useState<DiceCounts>({
    4: 0,
    6: 0,
    8: 0,
    10: 0,
    12: 0,
    20: 0,
    100: 0,
  })

  const [preferences, setPreferences] = useState<Preferences>({
    sumatoria: false,
    comparador: "mayor",
    objetivo: 0,
    modificador: 0,
    multiples: false,
  })

  const [results, setResults] = useState<FullDiceResult[]>([])
  const [totalSumResult, setTotalSumResult] = useState<{ suma: number; exitoTotal: boolean | null } | null>(null)

  const resultRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if ((results.length > 0 || totalSumResult) && resultRef.current) {
      setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      }, 0)
    }
  }, [results, totalSumResult])

  const updateDiceCount = (faces: number, value: number) => {
    setDiceCounts(prev => ({ ...prev, [faces]: value }))
  }

  const updatePreferences = (field: string, value: boolean | string | number) => {
    setPreferences(prev => ({ ...prev, [field]: value }))
  }

  const handleReset = () => {
    setDiceCounts({
      4: 0,
      6: 0,
      8: 0,
      10: 0,
      12: 0,
      20: 0,
      100: 0,
    })
    setPreferences({
      sumatoria: false,
      comparador: "mayor",
      objetivo: 0,
      modificador: 0,
      multiples: false,
    })
    setResults([])
    setTotalSumResult(null)
  }

  const handleSingleRoll = (faces: number) => {
    const base = Math.floor(Math.random() * faces) + 1
    const tirada = base + preferences.modificador

    const validarCondiciones = preferences.objetivo > 0 && (preferences.comparador === "mayor" || preferences.comparador === "menor")
    const exito = validarCondiciones ? (preferences.comparador === "mayor" ? tirada >= preferences.objetivo : tirada <= preferences.objetivo) : null

    const resultado: FullDiceResult = {
      caras: faces,
      tiradas: [{ base, tirada, modificador: preferences.modificador }],
      suma: tirada,
      exitoTotal: exito
    }
    setResults([resultado])
    setTotalSumResult(null)
  }

  const handleMultiRoll = () => {
    const results: FullDiceResult[] = []
    let totalSuma = 0

    const validarCondiciones = preferences.objetivo > 0 && (preferences.comparador === "mayor" || preferences.comparador === "menor")

    Object.entries(diceCounts).forEach(([facesStr, cantidadStr]) => {
      const faces = parseInt(facesStr)
      const cantidad = parseInt(String(cantidadStr))
      if (cantidad <= 0) return

      const tiradas: FullDiceResult[`tiradas`] = []
      let sumaParcial = 0

      for (let i = 0; i < cantidad; i++) {
        const base = Math.floor(Math.random() * faces) + 1
        const tirada = base + preferences.modificador
        tiradas.push({ base, tirada, modificador: preferences.modificador })
        sumaParcial += tirada
      }

      totalSuma += sumaParcial

      const exitos = validarCondiciones && !preferences.sumatoria
        ? tiradas.map(({ tirada }) =>
            preferences.comparador === "mayor"
              ? tirada >= preferences.objetivo
              : tirada <= preferences.objetivo)
        : undefined

      const exitoTotal = validarCondiciones && preferences.sumatoria
        ? preferences.comparador === "mayor"
          ? totalSuma >= preferences.objetivo
          : totalSuma <= preferences.objetivo
        : null

      results.push({ caras: faces, tiradas, suma: sumaParcial, exitoTotal, exitos })
    })

    if (preferences.sumatoria) {
      const exitoTotal = validarCondiciones ?
        preferences.comparador === "mayor"
          ? totalSuma >= preferences.objetivo
          : totalSuma <= preferences.objetivo
        : null
      setTotalSumResult({ suma: totalSuma, exitoTotal })
    } else {
      setTotalSumResult(null)
    }

    setResults(results)
  }

  return (
    <div className="App">
      <div className="intro_container">
        <Logo />
        <div className="intro_texto">
          <h1 className='titulo'>Dice-Roll App</h1>
          <h2 className='subtitulo'>Customizá tus tiradas</h2>
        </div>
      </div>

      <div className="app_container">
          <div className='dados'>
            {DICE_TYPES.map(faces => (
              <DiceCard
                key={faces}
                faces={faces}
                count={diceCounts[faces]}
                onCountChange={updateDiceCount}
                showInput={preferences.multiples}
                onSingleRoll={handleSingleRoll}
              />
            ))}
          </div>

          <div className="menu">
            <DicePreferences
              preferences={preferences}
              onChange={updatePreferences}
            />

            <DiceRollButton
              diceCounts={diceCounts}
              preferences={preferences}
              onRoll={handleMultiRoll}
            />

          </div>
            <div className="botones">
              <ResultDisplay 
              results={results} 
              totalSumResult={totalSumResult}
              resultRef={resultRef}/>  

              <ResetButton onReset={handleReset} />
            </div>
        </div>
      </div>
  )
}
export default App