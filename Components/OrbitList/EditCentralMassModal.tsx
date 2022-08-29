import { Modal } from "antd"
import { useContext } from "react";
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

  return (
    <Modal
      visible={isVisible}
      title="Edit Cental Mass"
      // onOk={addOrbitFn}
      okButtonProps={{}}
      onCancel={closeModalFn}
    >

      <p> {centralMass.name} </p>
      <p> {centralMass.mass} </p>

    </Modal>
  )
}

export default EditCentralMassModal