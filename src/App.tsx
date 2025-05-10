import React, { useState } from "react"
import DiceCard from "./components/DiceCard/DiceCard.tsx"
import DicePreferences, { Preferences } from "./components/DicePreferences/DicePreferences.tsx"
import DiceRollButton from "./components/DiceRollButton/DiceRollButton.tsx"
import ResultDisplay from "./components/ResultDisplay/ResultDisplay.tsx"
import ResetButton from "./components/ResetButton/ResetButton.tsx"
import type { FullDiceResult } from "./components/ResultDisplay/ResultDisplay.tsx"
import type { DiceCounts } from "./components/DiceRollButton/DiceRollButton.tsx"
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
  }

  const handleSingleRoll = (faces: number) => {
    const base = Math.floor(Math.random() * faces) + 1
    const tirada = base + preferences.modificador
    const resultado: FullDiceResult = {
      caras: faces,
      tiradas: [{ base, tirada, modificador: preferences.modificador }],
      suma: tirada,
      exitoTotal: null
    }
    setResults([resultado])
  }

  return (
    <div className="App">
      <h1 className='titulo'>Dice-Roll App</h1>
      <h2 className='subtitulo'>Customizá tu tirada!</h2>

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

      <DicePreferences
        preferences={preferences}
        onChange={updatePreferences}
      />

      <DiceRollButton
        diceCounts={diceCounts}
        preferences={preferences}
        onRoll={setResults}
      />

      <ResultDisplay results={results} />

      <ResetButton onReset={handleReset} />
    </div>
  )
}

export default App