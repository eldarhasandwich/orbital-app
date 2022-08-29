
import { Button, Card} from 'antd';
import { useContext, useEffect, useState } from 'react';

import AddOrbitModal from './AddOrbitModal'
import { Orbit } from '../Orbits/Orbit'
import AppContext from '../Contexts/AppContext';

const OrbitListItem = (props: {
  id: string
  orbit: Orbit
}) => {

  const { id, orbit } = props

  const { deleteOrbitById } = useContext(AppContext);

  const askNicelyToConfirmDeleteOrbit = () => {
    const answer = confirm('Are you sure you want to delete this?')
    if (answer) {
      deleteOrbitById(id)
    }
  }

  const formatBigNumberWithCommas = (n: number) => {
    return n
  }

  return (
    <Card
      size="small"
      title="Orbit"
      extra={<a onClick={() => askNicelyToConfirmDeleteOrbit()} style={{ color: "red" }}>Delete</a>}
      style={{
        width: 'calc(100% - 8px)',
        marginLeft: '4px',
        marginTop: '4px'
      }}
    >
      <p> Name: {orbit.name} </p>
      <p> Eccentricity: {orbit.eccentricity} </p>
      <p> Semimajor Axis: {formatBigNumberWithCommas(orbit.semimajorAxis)} metres </p>
      <p> Inclination: {orbit.inclination} degrees </p>
      <p> Longitude of Ascending Node: {orbit.longitudeOfAscendingNode} degrees </p>
      <p> Argument of Periapsis: {orbit.argumentOfPeriapsis} degrees </p>
      <p> True Anomaly: {orbit.trueAnomaly} degrees </p>
    </Card>
  )
}

const OrbitList = () => {

  const [ addOrbitModalVisible, setAddOrbitModalVisible ] = useState(false);
  
  const { orbitList } = useContext(AppContext)

  return (
    <div>
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
          width: 'calc(100% - 8px)',
          marginLeft: '4px',
          marginTop: '4px',
          marginBottom: '4px'
        }}
      >
        New Orbit
      </Button>

      <AddOrbitModal
        isVisible={addOrbitModalVisible}
        closeModalFn={() => setAddOrbitModalVisible(false)}
      />
    </div>
  )
}

export default OrbitList