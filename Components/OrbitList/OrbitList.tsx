
import { Button, Card, Collapse} from 'antd';
import { useContext, useState } from 'react';

import AddOrbitModal from './AddOrbitModal'
import { Orbit } from '../../Orbits/Orbit'
import AppContext from '../../Contexts/AppContext';
import EditCentralMassModal from './EditCentralMassModal';

const itemStyle = {
  width: 'calc(100% - 8px)',
  marginLeft: '4px',
  marginTop: '4px'
}

const DisableClickPropagation = {
  onClick: e => { 
    e.stopPropagation()
  },
  onContextMenu: e => {
    e.stopPropagation()
  }
}

const OrbitListItem = (props: {
  id: string
  orbit: Orbit
}) => {

  const [ isDetailsVisible, setIsDetailsVisible ] = useState<boolean>(false);

  const { id, orbit } = props

  const { 
    deleteOrbitById,
    selectedOrbitA,
    selectedOrbitB,
    selectOrbitInteraction
  } = useContext(AppContext);

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
      title={orbit.name}
      headStyle={{
        color: currentCardIsSelected ? 'white' : undefined
      }}
      extra={
        <a 
          {...DisableClickPropagation}
          onClick={e =>{
            e.stopPropagation()
            askNicelyToConfirmDeleteOrbit()
          }}
          style={{ color: "red" }}
        >
          Delete
        </a>
      }
      style={{
        ...itemStyle,
        backgroundColor: currentCardIsSelected ? '#1890ff' : undefined
      }}
      onClick={ _ => { 
        selectOrbitInteraction(id, 'left')
      }}
      onContextMenu={ e => {
        e.preventDefault()
        selectOrbitInteraction(id, 'right')
      }}
    >
        <Button
          {...DisableClickPropagation}
          onClick={e => {
            e.stopPropagation()
            setIsDetailsVisible(!isDetailsVisible)
          }}
          style={{
            marginBottom: '5px'
          }}
        >
          Show Details
        </Button>

        { isDetailsVisible && (
          <Card
            {...DisableClickPropagation}
          >
              <p> Eccentricity: {orbit.eccentricity} </p>
              <p> Semimajor Axis: {formatBigNumberWithCommas(orbit.semimajorAxis)} metres </p>
              <p> Inclination: {orbit.inclination} degrees </p>
              <p> Longitude of Ascending Node: {orbit.longitudeOfAscendingNode} degrees </p>
              <p> Argument of Periapsis: {orbit.argumentOfPeriapsis} degrees </p>
              <p> Mean Anomaly: {orbit.meanAnomaly} degrees </p>
          </Card>
        )}
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