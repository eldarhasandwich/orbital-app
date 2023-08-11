
import { Button, Card, Collapse} from 'antd';
import { useContext, useState } from 'react';

import AddOrbitModal from './AddOrbitModal'
import { Orbit } from '../../Orbits/Orbit'
import AppContext from '../../Contexts/AppContext';
import EditCentralMassModal from './EditCentralMassModal';

const { Panel } = Collapse;

const itemStyle = {
  width: 'calc(100% - 8px)',
  marginLeft: '4px',
  marginTop: '4px'
}

const OrbitListItem = (props: {
  id: string
  orbit: Orbit
}) => {

  const { id, orbit } = props

  const { deleteOrbitById, selectedOrbitA, selectedOrbitB } = useContext(AppContext);

  const askNicelyToConfirmDeleteOrbit = () => {
    const answer = confirm('Are you sure you want to delete this?')
    if (answer) {
      deleteOrbitById(id)
    }
  }

  const formatBigNumberWithCommas = (n: number) => {
    return n
  }

  const currentCardIsSelected = (id === selectedOrbitA || id === selectedOrbitB)

  return (
    <Card
      size="small"
      title="Orbit"
      headStyle={{
        color: currentCardIsSelected ? 'white' : undefined
      }}
      extra={<a onClick={() => askNicelyToConfirmDeleteOrbit()} style={{ color: "red" }}>Delete</a>}
      style={{
        ...itemStyle,
        backgroundColor: currentCardIsSelected ? '#1890ff' : undefined
      }}
      // onClick={() => { console.log('click on card') }}
    >
      <Collapse bordered={false}>
        <Panel header={ orbit.name } key="1">

          <p> Eccentricity: {orbit.eccentricity} </p>
          <p> Semimajor Axis: {formatBigNumberWithCommas(orbit.semimajorAxis)} metres </p>
          <p> Inclination: {orbit.inclination} degrees </p>
          <p> Longitude of Ascending Node: {orbit.longitudeOfAscendingNode} degrees </p>
          <p> Argument of Periapsis: {orbit.argumentOfPeriapsis} degrees </p>
          <p> Mean Anomaly: {orbit.meanAnomaly} degrees </p>
        
        </Panel>

      </Collapse>
    </Card>
  )
}

const OrbitList = () => {

  const [ addOrbitModalVisible, setAddOrbitModalVisible ] = useState(false);
  const [ editCentralMassModalVisible, setEditCentralMassModalVisible ] = useState(false);
  
  const { orbitList } = useContext(AppContext)

  return (
    <div>
      <Button
        disabled={editCentralMassModalVisible}
        type='primary'
        onClick={() => { setEditCentralMassModalVisible(true) }}
        style={itemStyle}
      >
        Edit Cental Mass
      </Button>

      {
        orbitList
          .sort((a,b) => a.orbit.semimajorAxis - b.orbit.semimajorAxis)
          .map(o =>
            <OrbitListItem
              key={o.id}
              id={o.id}
              orbit={o.orbit}
            />
          )
      }

      <Button
        disabled={addOrbitModalVisible}
        type='primary'
        onClick={() => setAddOrbitModalVisible(true)}
        style={{
          ...itemStyle,
          marginBottom: '4px'
        }}
      >
        New Orbit
      </Button>

      <EditCentralMassModal
        isVisible={editCentralMassModalVisible}
        closeModalFn={() => setEditCentralMassModalVisible(false)}
      />

      <AddOrbitModal
        isVisible={addOrbitModalVisible}
        closeModalFn={() => setAddOrbitModalVisible(false)}
      />
    </div>
  )
}

export default OrbitList