import { useContext, useState } from "react"
import { Button, Modal, Tooltip } from 'antd';

import AppContext from "../../Contexts/AppContext"

const GenerateTransferButton = () => {

  const { 
    selectedOrbitA, 
    selectedOrbitB, 
    orbitList,
    setGenerateTransferOrbitPanelOpen,
    isGenerateTransferOrbitPanelOpen
  } = useContext(AppContext)

  const fromOrbit = orbitList.find(o => o.id === selectedOrbitA)?.orbit
  const toOrbit = orbitList.find(o => o.id === selectedOrbitB)?.orbit

  const buttonTooltipText = (
    (selectedOrbitA) ? `From: ${fromOrbit.name}` : ''
  ) + (
    (selectedOrbitB) ? ` To: ${toOrbit.name}` : ''
  )

  if (selectedOrbitA && selectedOrbitB && isGenerateTransferOrbitPanelOpen) {
    return (
      <span style={{color: 'white', float: 'right', top: '15px'}}>
        {`Configuring Transfer from ${fromOrbit.name} to ${toOrbit.name}`}
      </span>
    )
  }

  return (
    <>

      <Button 
        type='primary'
        disabled={!selectedOrbitA || !selectedOrbitB || isGenerateTransferOrbitPanelOpen} 
        style={{ float: 'right', top: '15px' }}
        onClick={() => {
          setGenerateTransferOrbitPanelOpen(true)
        }}
      >
        <>
          Generate Transfer Orbit
        </>
        <Tooltip
          title={buttonTooltipText}
          open={(!!selectedOrbitA || !!selectedOrbitB) && !isGenerateTransferOrbitPanelOpen}
          placement="bottomRight"
        />
      </Button>

    </>
  )
}

export default GenerateTransferButton