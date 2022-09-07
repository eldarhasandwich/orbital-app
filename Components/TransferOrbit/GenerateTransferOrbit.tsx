import { useContext } from "react"
import { Button, message } from 'antd';

import AppContext from "../../Contexts/AppContext"

const GenerateTransferOrbit = () => {

  const { selectedOrbitA, selectedOrbitB } = useContext(AppContext)

  return (
    <>

      <Button 
        type='primary'
        disabled={!selectedOrbitA || !selectedOrbitB} 
        style={{ float: 'right', top: '15px' }}
        onClick={() => {
          message.warn('Nothing here yet!')
        }}
      >
        Generate Transfer Orbit
      </Button>

    </>
  )
}

export default GenerateTransferOrbit