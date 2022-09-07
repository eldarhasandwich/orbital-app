
import React, { ReactElement, ReactNode, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Orbit, CentralMass } from '../Orbits/Orbit'

interface UuidOrbit {
  id: string
  orbit: Orbit
}

type ClickType = 'left' | 'right'

export interface AppContextType {
  time: number

  centralMass: CentralMass
  orbitList: UuidOrbit[]
  selectedOrbitA?: string
  selectedOrbitB?: string

  setSimulationTime: (newTime: number) => void

  editCentralMassName: (newName: string) => void
  editCentralMassMass: (newMass: number) => void

  addOrbitToList: (newOrbit: Orbit) => void
  deleteOrbitById: (id: string) => void
  overwriteOrbitList: (newOrbits: Orbit[]) => void
  selectOrbitInteraction: (id: string, clickType: ClickType) => void
}

const defaultAppContext: AppContextType = {
  time: 0,
  centralMass: {
    name: 'Unnamed',
    mass: 1
  },
  orbitList: [],
  setSimulationTime: () => {},
  editCentralMassName: () => {},
  editCentralMassMass: () => {},
  addOrbitToList: () => {},
  deleteOrbitById: () => {},
  overwriteOrbitList: () => {},
  selectOrbitInteraction: () => {}
}

const AppContext = React.createContext<AppContextType>(defaultAppContext);

export const AppContextContainer: React.FC<{children: ReactElement}> = ({children}) => {

  const [ time, setTime ] = useState<number>(0);

  const [ orbitList, setOrbitList ] = useState<UuidOrbit[]>([]);

  const [ centralMassName, setCentralMassName ] = useState<string>(defaultAppContext.centralMass.name);
  const [ centralMassMass, setCentralMassMass ] = useState<number>(defaultAppContext.centralMass.mass);

  const [ selectedOrbitA, setSelectedOrbitA ] = useState<string | undefined>(undefined);
  const [ selectedOrbitB, setSelectedOrbitB ] = useState<string | undefined>(undefined);

  const setSimulationTime = (newTime: number): void => {
    setTime(newTime);
  }

  const editCentralMassName = (newName: string): void => {
    setCentralMassName(newName);
  }

  const editCentralMassMass = (newMass: number): void => {
    setCentralMassMass(newMass);
  }

  const addOrbitToList = (newOrbit: Orbit): void => {
    setOrbitList( [ ...orbitList, { id: uuidv4(), orbit: newOrbit} ] )
  }

  const deleteOrbitById = (id: string): void => {
    setOrbitList( orbitList.filter(o => o.id !== id) )
  }

  const overwriteOrbitList = (newOrbits: Orbit[]): void => {
    setOrbitList(
      newOrbits.map(orbit => {
        return {
          id: uuidv4(),
          orbit
        }
      })
    )
  }

  const selectOrbitInteraction = (id: string, clickType: ClickType): void => {

    if (clickType === 'left') {

      if (id === selectedOrbitA) {
        setSelectedOrbitA(undefined)
        setSelectedOrbitB(undefined)
        return
      }

      setSelectedOrbitA(id)
      setSelectedOrbitB(undefined)
      return
    }

    if (clickType === 'right') {
      if (!selectedOrbitA) {
        return
      }

      if (id === selectedOrbitA) {
        return
      }

      if (id === selectedOrbitB) {
        setSelectedOrbitB(undefined)
        return
      }

      setSelectedOrbitB(id)
      return
    }
    
  }

  return (
    <>
      <AppContext.Provider
        value={{
          time,
          centralMass: {
            name: centralMassName,
            mass: centralMassMass
          },
          orbitList,
          setSimulationTime,
          editCentralMassName,
          editCentralMassMass,
          selectedOrbitA,
          selectedOrbitB,        
          addOrbitToList,
          deleteOrbitById,
          overwriteOrbitList,
          selectOrbitInteraction
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  ) 
}


export default AppContext