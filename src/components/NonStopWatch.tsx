import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { StyledFC } from '../types'

const padTimePart = (time: number) => time.toString().padStart(2, '0')
const parseTimePassed = (timePassedMs: number) => {
  const MS_PER_MIN = 60 * 1000
  const MS_PER_HOUR = 60 * MS_PER_MIN
  const MS_PER_DAY = 24 * MS_PER_HOUR
  const days = Math.floor(timePassedMs / MS_PER_DAY)
  const hours = Math.floor((timePassedMs - days * MS_PER_DAY) / MS_PER_HOUR)
  const mins = Math.floor((timePassedMs - days * MS_PER_DAY - hours * MS_PER_HOUR) / MS_PER_MIN)
  const secs = Math.floor(timePassedMs / 1000) % 60

  return [
    days,
    hours,
    mins,
    secs
  ]
}

const TimePartBox: StyledFC<{
  timePart: number,
  title: string | number,
  size?: string
}> = (props) => {
  const { timePart, title, className } = props

  return (
    <div className={className}>
      <span className="content">{padTimePart(timePart)}</span>
      <span className="title">{title}</span>
    </div>
  )
}

const StyledTimePartBox = styled(TimePartBox)`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  text-align: center;
  border-radius: 0.4rem;
  background-color: rgba(211, 211, 211, 0.35);
  width: ${props => props.size ?? '6rem'};
  height: ${props => props.size ?? '6rem'};
  border: 1px solid rgba(211, 211, 211, 0.85);

  .content {
    font-size: xx-large;
    font-weight: bolder;
    flex-basis: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .title {
    border-top: 1px solid rgba(211, 211, 211, 0.85);
  }
`

const NonStopWatch: StyledFC<{
  startAt: number,
  size?: string
}> = (props) => {
  const { className, startAt } = props
  const [timePassedMs, setTimePassedMs] = useState(Date.now() - startAt)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimePassedMs(Date.now() - startAt)
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  const [days, hours, mins, secs] = parseTimePassed(timePassedMs)

  return (
    <div className={className}>
      <StyledTimePartBox timePart={days} title={`day${days > 1 ? 's' : ''}`} />
      <StyledTimePartBox timePart={hours} title={`hour${hours > 1 ? 's' : ''}`} />
      <StyledTimePartBox timePart={mins} title={`min${mins > 1 ? 's' : ''}`} />
      <StyledTimePartBox timePart={secs} title={`sec${secs > 1 ? 's' : ''}`} />
    </div>
  )
}

const StyledNonStopWatch = styled(NonStopWatch)`
  display: flex;
  justify-content: center;
  gap: 0.4rem;

  @media only screen and (max-width: 600px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;

    & > * {
      border-radius: 0;

      :nth-child(1) {
        border-top-left-radius: 0.4rem;
      }
      :nth-child(2) {
        border-top-right-radius: 0.4rem;
      }
      :nth-child(3) {
        border-bottom-left-radius: 0.4rem;
      }
      :nth-child(4) {
        border-bottom-right-radius: 0.4rem;
      }
    }
  }
`

export { StyledNonStopWatch as NonStopWatch }
