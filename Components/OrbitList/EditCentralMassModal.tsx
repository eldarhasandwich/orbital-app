import { Input, Modal } from "antd"
import { useContext, useEffect, useState } from "react";
import AppContext from "../../Contexts/AppContext";


const EditCentralMassModal = (props: {
  isVisible: boolean
  closeModalFn: () => void
}) => {

  const { isVisible, closeModalFn } = props;

  const { 
    centralMass,
    editCentralMassName,
    editCentralMassMass,
  } = useContext(AppContext)

  const [ name, setName ] = useState(centralMass.name)
  const [ mass, setMass ] = useState(centralMass.mass)

  useEffect(() => {
    setName(centralMass.name)
    setMass(centralMass.mass)
  }, [isVisible, centralMass.name, centralMass.mass])

  const editMassFn = () => {

    editCentralMassName(name)
    editCentralMassMass(mass)
    closeModalFn()

  }

  const cancelModalFn = () => {
    setName(centralMass.name)
    setMass(centralMass.mass)
    closeModalFn()
  }

  return (
    <Modal
      visible={isVisible}
      title="Edit Cental Mass"
      onOk={editMassFn}
      okButtonProps={{ disabled: false }}
      onCancel={cancelModalFn}
    >

      <Input addonBefore={'Name'} value={name} onChange={e => setName(e.target.value)} style={{marginBottom: "4px"}} />
      <Input addonBefore={'Mass'} addonAfter={'kg'} value={mass} onChange={e => setMass(parseFloat(e.target.value))} style={{marginBottom: "4px"}} />

    </Modal>
  )
}

export default EditCentralMassModal