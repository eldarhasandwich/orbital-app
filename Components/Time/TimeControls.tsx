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

const marks: SliderMarks = {
  1: {
    style: {
      color: '#f50',
    },
    label: <strong>Second</strong>,
  },
  2: {
    style: {
      color: '#f50',
    },
    label: <strong>Day</strong>,
  },
  3: {
    style: {
      color: '#f50',
    },
    label: <strong>Week</strong>,
  },
  4: {
    style: {
      color: '#f50',
    },
    label: <strong>Month</strong>,
  },
  5: {
    style: {
      color: '#f50',
    },
    label: <strong>6 Months</strong>,
  },
  6: {
    style: {
      color: '#f50',
    },
    label: <strong>Year</strong>,
  },
}

const TimeControls = () => {

  const { time, setSimulationTime } = useContext(AppContext)
  
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

    setSimulationTime(time + (simulationRate / TICK_RATE))
  }, (1000 / TICK_RATE))

  const handleSliderInput = (newValue: number) => {
    console.log({newValue})

    setSimulationRate(markToSecondValueMap[newValue])
  }

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
        style={{ marginLeft: '10px', width: '65px' }}
      >
        { timeIsRunning ? 'Stop' : 'Start' }
      </Button>

      <span         
        style={{ marginLeft: '10px' }}
      > 
        {`Simulation running at ${simulationRate} seconds/s`}
      </span>

      <Slider 
        min={1} 
        max={6} 
        onChange={handleSliderInput}
        tooltip={{ open: false }}
        marks={marks} 
        step={null} 
        defaultValue={86400} 
      />
    </>
  )
}

export default TimeControls