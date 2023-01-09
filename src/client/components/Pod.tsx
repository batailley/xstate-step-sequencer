import React from "react"
import './pod.scss'
import cn from 'classnames'

export const Pod = ({ playing=false, selectedToPlay=false, position=0 }: {
   playing:boolean, selectedToPlay:boolean, position: number 
}) => {
  return <div className={cn('pod',
    playing ? 'playing' : '',
    selectedToPlay ? 'selectedToPlay' : '',
  )}>
    <span>{position}</span>
  </div>
}