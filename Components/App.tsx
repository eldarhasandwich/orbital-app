import { useState } from 'react';
import OrbitList from './OrbitList';
import { v4 as uuidv4 } from 'uuid';

import { Orbit } from '../Orbits/Orbit'

import { Button, Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

interface UuidOrbit {
  id: string
  orbit: Orbit
}

const App = () => {

  // console.log({
  //   msg: 'WOWEE!!!'
  // })

  const [ orbitList, updateOrbitList ] = useState<UuidOrbit[]>([])

  const [ selectedOrbitA, setSelectedOrbitA ] = useState("")
  const [ selectedOrbitB, setSelectedOrbitB ] = useState("")

  const addOrbitToList = (newOrbit: Orbit): void => {
    updateOrbitList( [ ...orbitList, { id: uuidv4(), orbit: newOrbit} ] )
  }

  const deleteOrbitById = (id: string): void => {
    updateOrbitList( orbitList.filter(o => o.id !== id) )
  }

  const selectOrbitInteraction = (id: string): void => {
    if (selectedOrbitA === "") {
      setSelectedOrbitA(id)
      setSelectedOrbitB("")
      return
    }

    if (selectedOrbitB === "") {
      setSelectedOrbitA("")
      return
    }

    // if we de-select orbit A, we want to push orbit B to A.
    if (id === selectedOrbitA) {
      const tmp = selectedOrbitB
      setSelectedOrbitB("")
      setSelectedOrbitA(tmp)
      return
    }

    if (id === selectedOrbitB) {
      setSelectedOrbitB("")
      return
    }

    setSelectedOrbitB(id)
  }

  return (
    <>
      <Layout>

        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            left: 0
          }}
          width={280}
        >
          <OrbitList
            orbits={orbitList}
            addOrbitFn={addOrbitToList}
            rmOrbitFn={deleteOrbitById}
          />
        </Sider>

        <Layout>
          <Header style={{ overflow: 'hidden' }}>
            <Button disabled style={{ marginRight: "10px" }}>
              Import List
            </Button>
            <Button disabled style={{ marginRight: "10px" }}>
              Export List
            </Button>
            <Button disabled style={{ float: 'right', top: '15px' }}>
              Generate Transfer Orbit
            </Button>
          </Header>
          <Content>Draw orbits here at some point</Content>
          {/* <Footer>Footer</Footer> */}
        </Layout>

      </Layout>
    </>
  );
}

export default App;
