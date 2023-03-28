import React from "react"
import './pod.scss'
import cn from 'classnames'
import { tickerMachine } from '../tickerMachine'
import { useMachine } from "@xstate/react"

export const Step = ({ playing=false, selectedToPlay=false, position=0, row=0 }: {
   playing:boolean, selectedToPlay:boolean, position: number, row: number
}) => {
  const [state, send] = useMachine(tickerMachine)
  return <div className={cn('pod',
    playing ? 'playing' : '',
    selectedToPlay ? 'selectedToPlay' : '',
  )}
    onClick={() => send({ type: 'ACTIVATE', value: { row, index: position } })}
  >
    <span>{position}</span>
  </div>
}