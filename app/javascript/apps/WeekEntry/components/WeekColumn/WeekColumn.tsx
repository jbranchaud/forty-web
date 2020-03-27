import React, { useState } from "react"
import { FortyTime } from "forty-time"

export interface WorkDayData {
  adjustAmount: string
  dayOfWeek: string
  id: number
  inTime: string
  outTime: string
  ptoAmount: string
}

export interface WeekColumnProps {
  handleWorkDayUpdate: (id, key, value) => void
  workDay: WorkDayData
}

const computeTotalTime = (
  inTime: string,
  outTime: string,
  ptoAmount: string,
  adjustAmount: string
): number => {
  const start = Number.parseInt(inTime)
  const end = Number.parseInt(outTime)
  const pto = Number.parseInt(ptoAmount)
  const adjust = Number.parseInt(adjustAmount)
  const total = end - start + pto + adjust
  return total || 0
}

export const WeekColumn: React.FC<WeekColumnProps> = props => {
  const { workDay } = props
  const day = workDay.dayOfWeek

  const [inTime, setInTime] = useState(workDay.inTime)
  const [outTime, setOutTime] = useState(workDay.outTime)
  const [ptoAmount, setPtoAmount] = useState(workDay.ptoAmount)
  const [adjustAmount, setAdjustAmount] = useState(workDay.adjustAmount)
  const [totalTime, setTotalTime] = useState(0)

  const handleInTimeChange = (e): void => {
    const newInTime = e.target.value
    setInTime(newInTime)
    const newTotal = computeTotalTime(
      newInTime,
      outTime,
      ptoAmount,
      adjustAmount
    )
    setTotalTime(newTotal)
    const inMinutes = FortyTime.parse(newInTime).minutes
    props.handleWorkDayUpdate(workDay.id, "in_minutes", inMinutes)
  }

  const handleOutTimeChange = (e): void => {
    const newOutTime = e.target.value
    setOutTime(newOutTime)
    const newTotal = computeTotalTime(
      inTime,
      newOutTime,
      ptoAmount,
      adjustAmount
    )
    setTotalTime(newTotal)
    const outMinutes = FortyTime.parse(newOutTime).minutes
    props.handleWorkDayUpdate(workDay.id, "out_minutes", outMinutes)
  }

  const handlePtoAmountChange = (e): void => {
    const newPtoAmount = e.target.value
    setPtoAmount(newPtoAmount)
    const newTotal = computeTotalTime(
      inTime,
      outTime,
      newPtoAmount,
      adjustAmount
    )
    setTotalTime(newTotal)
    const ptoMinutes = FortyTime.parse(newPtoAmount).minutes
    props.handleWorkDayUpdate(workDay.id, "pto_minutes", ptoMinutes)
  }

  const handleAdjustAmountChange = (e): void => {
    const newAdjustAmount = e.target.value
    setAdjustAmount(newAdjustAmount)
    const newTotal = computeTotalTime(
      inTime,
      outTime,
      ptoAmount,
      newAdjustAmount
    )
    setTotalTime(newTotal)
    const adjustMinutes = FortyTime.parse(newAdjustAmount).minutes
    props.handleWorkDayUpdate(workDay.id, "adjust_minutes", adjustMinutes)
  }

  return (
    <section>
      <p>{day.substring(0, 3)}</p>
      <input
        onChange={handleInTimeChange}
        name={`${day.toLowerCase()}_in`}
        placeholder="in"
        type="text"
        value={inTime}
      />
      <input
        onChange={handleOutTimeChange}
        name={`${day.toLowerCase()}_out`}
        placeholder="out"
        type="text"
        value={outTime}
      />
      <input
        onChange={handlePtoAmountChange}
        name={`${day.toLowerCase()}_pto`}
        placeholder="pto"
        type="text"
        value={ptoAmount}
      />
      <input
        onChange={handleAdjustAmountChange}
        name={`${day.toLowerCase()}_adjust`}
        placeholder="adjust"
        type="text"
        value={adjustAmount}
      />
      <p className={`${day.toLowerCase()}_total total`}>{`${totalTime}:00`}</p>
    </section>
  )
}
