import styled from 'styled-components'
import { NonStopWatch } from './components/NonStopWatch'
import type { StyledFC } from './types'

const App: StyledFC = (props) => {
  const { className } = props

  return (
    <div className={className} data-testid="App">
      <p>{'Hang in there, @Buddy...! :")'}</p>
      <NonStopWatch startAt={new Date('2021-08-11T20:49:00.000Z').getTime()} />
      <h4>{'Of #NFC'}</h4>
    </div>
  )
}

const StyledApp = styled(App)`
  font-family: 'Courier New', Courier, monospace;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(background.jpg);
  background-size: cover;

  h4 {
    font-size: xx-large;
  }
  h4, p {
    font-weight: bold;
    text-align: center;
  }
`

export default StyledApp
