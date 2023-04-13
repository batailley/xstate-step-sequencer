import React from "react"
import './pod.scss'
import cn from 'classnames'
import { tickerMachine } from '../tickerMachine'
import { useInterpret } from "@xstate/react"

export const Step = ({ playing=false, selectedToPlay=false, position=0, row=0 }: {
   playing:boolean, selectedToPlay:boolean, position: number, row: number
}) => {
  const service = useInterpret(tickerMachine)
  const {send} = service
  //console.log('ser', service)
  return <div className={cn('pod',
    playing ? 'playing' : '',
    selectedToPlay ? 'selectedToPlay' : '',
  )}
    onClick={() => send({ type: 'ACTIVATE', value: { row, index: position } })}
  >
    <span>{position}</span>
  </div>
}