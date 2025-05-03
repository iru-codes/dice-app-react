import './App.css';
import { useState } from 'react';
import React from 'react';
import DiceCard from './components/DiceCard/DiceCard.tsx';
import DicePreferences from './components/DicePreferences/DicePreferences.tsx';
import  DiceRollButton from './components/DiceRollButton/DiceRollButton.tsx';
import ResultDisplay from "./components/ResultDisplay/ResultDisplay.tsx"
import ResetButton from './components/ResetButton/ResetButton.tsx';

const DICE_TYPES = [4, 6, 8, 10, 12, 20, 100];

export default function App() {
  const [diceCounts, setDiceCounts] = useState<Record<number, number>>({
    4: 0,
    6: 0,
    8: 0,
    10: 0,
    12: 0,
    20: 0,
    100: 0
  });

  const [preferences, setPreferences] = useState({
    sumatoria: false,
    comparador: "",
    objetivo: 0,
    modificador: 0,
    multiples: false
  });

  const [results, setResults] = useState<any[]>([])

  const updateDiceCount = (faces: number, value: number) => {
    setDiceCounts(prev => ({ ...prev, [faces]: value }))
  }


  const updatePreferences = (field: string, value: any) => {
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
      100: 0
    });

    setPreferences({
      sumatoria: false,
      comparador: "",
      objetivo: 0,
      modificador: 0,
      multiples: false
    });
    setResults([]);
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
          />
        ))}
    </div>

    <DicePreferences 
      preferences = {preferences}
      onChange = {updatePreferences}
    />

    <DiceRollButton
      diceCounts  = {diceCounts}
      preferences = {preferences}
      onRoll = {setResults} 
    />

    <ResultDisplay results={results} preferences={preferences} />

    <ResetButton onReset={handleReset} 
    />
  </div>
  );
}
