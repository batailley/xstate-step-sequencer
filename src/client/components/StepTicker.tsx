import { useState } from "react"

export const useTicker = (totalTicks: number) => {
  const [playing, setPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const tick = () => {
    setCurrentStep((currentStep + 1) > totalTicks ? 1 : (currentStep + 1))
  }
  //return step to play
  return {currentStep}
}