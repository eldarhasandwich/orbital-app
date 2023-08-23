import { Button, Slider } from "antd"
import type { SliderMarks } from 'antd/es/slider';
import Input from "antd/lib/input/Input"
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react"

import AppContext from "../../Contexts/AppContext"
import { TICK_RATE } from "../../utils/constants"
import { isValidNumber } from "../../utils/math"

const useInterval = (callback: Function, delay: number) => {
  const savedCallback = useRef<Function>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() { 
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const markToSecondValueMap = {
  1: 1, // 1 second
  2: 86400, // 1 day
  3: 604800, // 1 week
  4: 2628000, // 1 month
  5: 15768000, // 6 months 
  6: 31536000 // 1 year
}

const markToNameValueMap = {
  1: 'Second',
  2: 'Day',
  3: 'Week',
  4: 'Month',
  5: '6 Months',
  6: 'Year'
}

const TimeControls = () => {

  const { time, setSimulationTime, isGenerateTransferOrbitPanelOpen } = useContext(AppContext)
  
  const [ simulationRate, setSimulationRate ] = useState(1)
  const [ timeIsRunning, setTimeIsRunning ] = useState(false)

  const handleChangeTime = (e: ChangeEvent<HTMLInputElement>) => {

    if (!isValidNumber(e.target.value)) {
      return
    }

    const t: number = parseFloat(e.target.value)

    setSimulationTime(t)
  }

  useInterval(() => {
    if (!timeIsRunning) return
    if (isGenerateTransferOrbitPanelOpen) return

    setSimulationTime(time + (simulationRate / TICK_RATE))
  }, (1000 / TICK_RATE))

  return (
    <>
      <Input 
        disabled={timeIsRunning || isGenerateTransferOrbitPanelOpen}
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
        disabled={isGenerateTransferOrbitPanelOpen}
        danger={timeIsRunning}
        onClick={() => { setTimeIsRunning(!timeIsRunning) }}
        style={{ marginLeft: '10px', width: '65px' }}
      >
        { timeIsRunning ? 'Stop' : 'Start' }
      </Button>

      <span         
        style={{ marginLeft: '10px' }}
      > 
        {`Simulation running at ${simulationRate} seconds/s`}
      </span>

      <br
        style={{
          height:'5px'
        }}
      />

      {
        [1, 2, 3, 4, 5, 6].map(i => {
          return (
            <Button
              onClick={() => {
                setSimulationRate(markToSecondValueMap[i])
              }}
              disabled={markToSecondValueMap[i] === simulationRate}
              type='primary'
            >
              {markToNameValueMap[i]}
            </Button>
          )
        })
      }

    </>
  )
}

export default TimeControls