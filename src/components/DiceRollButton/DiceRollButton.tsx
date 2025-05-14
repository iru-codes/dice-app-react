import React from "react";
import type { FullDiceResult } from "../ResultDisplay/ResultDisplay"
import type { Preferences } from "../DicePreferences/DicePreferences"

export type DiceCounts = Record<number, number>

type DiceRollButtonProps = {
  diceCounts: DiceCounts
  preferences: Preferences
  onRoll: (results: FullDiceResult[]) => void
}

type Tirada = { base: number; tirada: number; modificador: number };

const DiceRollButton: React.FC<DiceRollButtonProps> = ({ diceCounts, preferences, onRoll }) => {
  const rollDice = () => {
    const results: FullDiceResult[] = []
    const { sumatoria, comparador, objetivo, modificador } = preferences

    const validarCondiciones = objetivo > 0 && (comparador === "mayor" || comparador === "menor")

    Object.entries(diceCounts).forEach(([faces, veces]) => {
      const caras = parseInt(faces)
      const n = parseInt(String(veces))
      if (n <= 0) return

      const tiradas: Tirada[] = []
      let suma = 0

      for (let i = 0; i < n; i++) {
        const base = Math.floor(Math.random() * caras) + 1
        const tirada = base + modificador
        tiradas.push({ base, tirada, modificador })
        suma += tirada
      }

      const resultado: FullDiceResult = {
        caras,
        tiradas,
        suma,
        exitos:
          validarCondiciones && !sumatoria
            ? tiradas.map(({ tirada }) =>
                comparador === "mayor" ? tirada >= objetivo : tirada <= objetivo
              )
            : undefined,
        exitoTotal:
          validarCondiciones && sumatoria
            ? comparador === "mayor"
              ? suma >= objetivo
              : suma <= objetivo
            : null
      }

      results.push(resultado)
    })

    onRoll(results)
  }

  return (
    <button onClick={rollDice} id="dice_roll">
      ¡Roll!
    </button>
  )
}

export default DiceRollButton