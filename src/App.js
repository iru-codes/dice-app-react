import './App.css';
import { useState } from 'react';
import React from 'react';
import DiceCard from './components/DiceCard/DiceCard';
import DicePreferences from './components/DicePreferences/DicePreferences';

const DICE_TYPES = [4, 6, 8, 10, 12, 20, 100];

export default function App() {
  const [diceCounts, setDiceCounts] = useState({
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

  const updateDiceCount = (faces, value) => {
    setDiceCounts(prev => ({ ...prev, [faces]: value }));
  }

  const updatePreferences = (name, value) => {
    setPreferences(prev => ({ ...prev, [name]: value }));
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
          />
        ))}
    </div>

    <DicePreferences 
      preferences = {preferences}
      onChange = {updatePreferences}
    />
  </div>
  );
}
