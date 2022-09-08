import { Button } from "antd"
import Input from "antd/lib/input/Input"
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react"

import AppContext from "../../Contexts/AppContext"
import { isValidNumber } from "../../utils/math"

function useInterval(callback, delay) {
  // const savedCallback = useRef();

  // // Remember the latest callback.
  // useEffect(() => {
  //   savedCallback.current = callback;
  // }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() { 
      callback()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const TimeControls = () => {

  const { time, setSimulationTime } = useContext(AppContext)
  
  const [ timeIsRunning, setTimeIsRunning ] = useState(false)

  const handleChangeTime = (e: ChangeEvent<HTMLInputElement>) => {

    if (!isValidNumber(e.target.value)) {
      return
    }

    setSimulationTime(parseFloat(e.target.value))

  }

  useInterval(() => {

    if (timeIsRunning) {
      setSimulationTime(time + (86400 / 60))
    }

  }, 1000 / 60)

  return (
    <>
      <Input 
        disabled={timeIsRunning}
        addonBefore={'time'} 
        addonAfter={'seconds since epoch'}
        value={time.toString()}
        onChange={handleChangeTime}
        style={{
          width: '500px'
        }}
      />

      <Button
        type='primary'
        danger={timeIsRunning}
        onClick={() => { setTimeIsRunning(!timeIsRunning) }}
        style={{ marginLeft: '10px' }}
      >
        { timeIsRunning ? 'Stop' : 'Start' }
      </Button>

      <span         
        style={{ marginLeft: '10px' }}
      > 
        Simulation runs at 86400 seconds/s
      </span>
    </>
  )
}

export default TimeControls