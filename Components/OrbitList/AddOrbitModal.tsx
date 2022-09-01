import { Orbit } from '../../Orbits/Orbit'
import { Card, Input, Button, Tooltip, Modal } from 'antd';
import { useContext, useState } from 'react';
import AppContext from '../../Contexts/AppContext';

const AddOrbitModal = (props: {
  isVisible: boolean
  closeModalFn: () => void
}) => {

  const { isVisible, closeModalFn } = props

  const { addOrbitToList } = useContext(AppContext);

  const [name, setName] = useState("Unnamed Orbit")
  const [e, setE] = useState("0")
  const [a, setA] = useState("0")
  const [i, setI] = useState("0")
  const [long, setLong] = useState("0")
  const [arg, setArg] = useState("0")
  const [m0, setM0] = useState("0")

  const isValidNumber = (n: string): boolean => {
    return (/^[0-9][0-9]*(\.[0-9][0-9]*)?$/).test(n)
  }

  const resetInput = () => {
    setE("0")
    setA("0")
    setI("0")
    setLong("0")
    setArg("0")
    setM0("0")
  }

  const inputContents = [
    {
      title: "Eccentricity",
      value: e,
      onChangeFn: setE,
      isValid: isValidNumber(e),
      unit: undefined
    },
    {
      title: "Semimajor Axis",
      value: a,
      onChangeFn: setA,
      isValid: isValidNumber(a),
      unit: 'metres'
    },
    {
      title: "Inclination",
      value: i,
      onChangeFn: setI,
      isValid: isValidNumber(i),
      unit: 'degrees'
    },
    {
      title: "Long. of Acend.",
      value: long,
      onChangeFn: setLong,
      isValid: isValidNumber(long),
      unit: 'degrees'
    },
    {
      title: "Arg. of Peri.",
      value: arg,
      onChangeFn: setArg,
      isValid: isValidNumber(arg),
      unit: 'degrees'
    },
    {
      title: "Mean Anomaly",
      value: m0,
      onChangeFn: setM0,
      isValid: isValidNumber(m0),
      unit: 'degrees'
    }
  ]

  const allValid = inputContents.length === inputContents.filter(i => i.isValid).length

  const addOrbitFn = () => {
    addOrbitToList({
      name,
      eccentricity: parseFloat(e),
      semimajorAxis: parseFloat(a),
      inclination: parseFloat(i),
      longitudeOfAscendingNode: parseFloat(long),
      argumentOfPeriapsis: parseFloat(arg),
      meanAnomaly: parseFloat(m0),
    })
    resetInput()
    closeModalFn()
  }

  const cancelModalFn = () => {
    resetInput()
    closeModalFn()
  }

  return (
    <Modal
      visible={isVisible}
      title="New Orbit"
      onOk={addOrbitFn}
      okButtonProps={{disabled: !allValid}}
      onCancel={cancelModalFn}
    >

      <Input addonBefore={'Name'} value={name} onChange={e => setName(e.target.value)} style={{marginBottom: "4px"}}/>

      {
        inputContents.map(field => (
          <Tooltip key={field.title} placement="right" title="Requires Number" visible={!field.isValid} color='orange'>
            <Input 
              addonBefore={field.title}
              addonAfter={field.unit}
              value={field.value} 
              onChange={e => field.onChangeFn(e.target.value)} 
              style={{marginBottom: "4px"}} 
            />
          </Tooltip>
        ))
      }

    </Modal>

  )
}

export default AddOrbitModal