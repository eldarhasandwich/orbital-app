
import { useContext } from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { DownOutlined, StarTwoTone, RocketTwoTone } from '@ant-design/icons';

import { KerbolSystem, PremadeSystems, SolarSystem } from '../Orbits/PremadeSystems';
import AppContext from '../Contexts/AppContext';

const LoadPremadeSystem = () => {

  const { 
    editCentralMassName,
    editCentralMassMass,
    overwriteOrbitList,
    setSelectedOrbitA,
    setSelectedOrbitB,
    setGenerateTransferOrbitPanelOpen,
    setVisualisationScalingFactor
  } = useContext(AppContext);

  const handleMenuSelection = (item: { key: string }) => {
    const answer = confirm('Are you sure? This will overwrite the current state of the application.')
    if (!answer) {
      return
    }

    setSelectedOrbitA(undefined)
    setSelectedOrbitB(undefined)
    setGenerateTransferOrbitPanelOpen(false)
  
    const { key } = item;
  
    const selectedSystem = PremadeSystems[key]

    editCentralMassName(selectedSystem.centralMass.name)
    editCentralMassMass(selectedSystem.centralMass.mass)
    overwriteOrbitList(selectedSystem.orbits)
    setVisualisationScalingFactor(selectedSystem.visualisationScalingFactor)
  }

  const menu = (
    <Menu
      onClick={handleMenuSelection}
      items={[
        {
          label: 'Solar System',
          key: SolarSystem.id,
          icon: <StarTwoTone />,
        },
        {
          label: 'Kerbol System',
          key: KerbolSystem.id,
          icon: <RocketTwoTone />,
        }
      ]}
    />
  );

  return (
    <Dropdown overlay={menu}>
      <Button style={{ marginRight: "10px" }}>
        Load Premade System
        <DownOutlined />
      </Button>
    </Dropdown>
  )
}

export default LoadPremadeSystem