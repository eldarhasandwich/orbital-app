import { Input, Tooltip, Modal } from 'antd';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import AppContext from '../../Contexts/AppContext';

type FieldValidator = (valueToValidate: string) => string | undefined

interface InputContent {
  title: string
  value: string
  onChangeFn: Dispatch<SetStateAction<string>>
  validationMethods: FieldValidator[]
  unit?: string
}

const validateField = (field: InputContent): string | undefined => {
  return field.validationMethods.reduce<string| undefined>(( existingValidationMessage, method ) => {
    if (existingValidationMessage) {
      return existingValidationMessage;
    }
    const validationOutput = method(field.value)
    return validationOutput
  }, undefined)
}

// const isValidNumber: FieldValidator = (n: string) => {
//   if ( !(/^[0-9][0-9]*(\.[0-9][0-9]*)?$/).test(n) ) {
//     return 'Requires Number'
//   }

//   return undefined
// }

const isValidNumber: FieldValidator = (n: string) => {
  if ( isNaN(parseFloat(n)) ) {
    return 'Requires Number'
  }

  return undefined
}


const isNotZero: FieldValidator = (n: string) => {
  if (parseFloat(n) === 0) {
    return 'Cannot be equal to Zero'
  }

  return undefined
}

const isNotLessThanZero: FieldValidator = (n: string) => {
  if (parseFloat(n) < 0) {
    return 'Cannot be less than Zero'
  }

  return undefined
}

const isNotApproachingOrMoreThanOne: FieldValidator = (n: string) => {
  if (parseFloat(n) >= 0.999) {
    return 'Values higher than 0.999 are unsupported'
  }
}

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

  const resetInput = () => {
    setE("0")
    setA("0")
    setI("0")
    setLong("0")
    setArg("0")
    setM0("0")
  }

  const inputContents: InputContent[] = [
    {
      title: "Eccentricity",
      value: e,
      onChangeFn: setE,
      validationMethods: [ isValidNumber, isNotLessThanZero, isNotApproachingOrMoreThanOne ]
    },
    {
      title: "Semimajor Axis",
      value: a,
      onChangeFn: setA,
      validationMethods: [ isValidNumber, isNotLessThanZero, isNotZero ],
      unit: 'metres'
    },
    {
      title: "Inclination",
      value: i,
      onChangeFn: setI,
      validationMethods: [ isValidNumber ],
      unit: 'degrees'
    },
    {
      title: "Long. of Acend.",
      value: long,
      onChangeFn: setLong,
      validationMethods: [ isValidNumber ],
      unit: 'degrees'
    },
    {
      title: "Arg. of Peri.",
      value: arg,
      onChangeFn: setArg,
      validationMethods: [ isValidNumber ],
      unit: 'degrees'
    },
    {
      title: "Mean Anomaly",
      value: m0,
      onChangeFn: setM0,
      validationMethods: [ isValidNumber ],
      unit: 'degrees'
    }
  ]

  const allValid = inputContents.length === inputContents.filter(field => !validateField(field)).length

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
        inputContents.map(field => {

          const isValid = validateField(field)
          
          return (
            <Tooltip key={field.title} placement="right" title={isValid} visible={!!isValid} color='orange'>
              <Input 
                addonBefore={field.title}
                addonAfter={field.unit}
                value={field.value} 
                onChange={e => field.onChangeFn(e.target.value)} 
                style={{marginBottom: "4px"}} 
              />
            </Tooltip>
          )
        })
      }

    </Modal>

  )
}

export default AddOrbitModal