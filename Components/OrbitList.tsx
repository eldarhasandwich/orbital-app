
import { Orbit } from '../Orbits/Orbit'
import { Card} from 'antd';

import AddOrbitModal from './AddOrbitModal'

const OrbitListItem = (props: {
  id: string
  orbit: Orbit
  rmOrbitFn: (id: string) => void
}) => {

  const { id, orbit, rmOrbitFn } = props

  return (
    <Card
      size="small"
      title="Orbit"
      extra={<a onClick={() => { rmOrbitFn(id) }} style={{ color: "red" }}>Delete</a>}
    >
      <p> Eccentricity {orbit.eccentricity} </p>
      <p> Semimajor Axis {orbit.semimajorAxis} </p>
      <p> Inclination {orbit.inclination} </p>
      <p> Longitude of Ascending Node {orbit.longitudeOfAscendingNode} </p>
      <p> Argument of Periapsis {orbit.argumentOfPeriapsis} </p>
      <p> True Anomaly {orbit.trueAnomaly} </p>
    </Card>
  )
}

const OrbitList = (props: {
  orbits: { id: string, orbit: Orbit }[]
  addOrbitFn: (orbit: Orbit) => void
  rmOrbitFn: (id: string) => void
}) => {

  const { orbits, addOrbitFn, rmOrbitFn } = props

  return (
    <div>
      {
        orbits.map(o =>
          <OrbitListItem
            key={o.id}
            id={o.id}
            orbit={o.orbit}
            rmOrbitFn={rmOrbitFn}
          />
        )
      }

      <AddOrbitModal
        addOrbitFn={addOrbitFn}
      />

    </div>
  )
}

export default OrbitList