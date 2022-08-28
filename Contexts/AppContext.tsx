
import React, { ReactElement, ReactNode, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Orbit } from '../Orbits/Orbit'

interface UuidOrbit {
  id: string
  orbit: Orbit
}

interface AppContextType {
  orbitList: UuidOrbit[];
  selectedOrbitA?: string
  selectedOrbitB?: string

  addOrbitToList: (newOrbit: Orbit) => void
  deleteOrbitById: (id: string) => void
  overwriteOrbitList: (newOrbits: Orbit[]) => void
  selectOrbitInteraction: (id: string) => void
}

const defaultAppContext: AppContextType = {
  orbitList: [],
  addOrbitToList: () => {},
  deleteOrbitById: () => {},
  overwriteOrbitList: () => {},
  selectOrbitInteraction: () => {}
}

const AppContext = React.createContext<AppContextType>(defaultAppContext);

export const AppContextContainer: React.FC<{children: ReactElement}> = ({children}) => {

  const [ orbitList, setOrbitList ] = useState<UuidOrbit[]>([]);

  const [ selectedOrbitA, setSelectedOrbitA ] = useState<string | undefined>(undefined);
  const [ selectedOrbitB, setSelectedOrbitB ] = useState<string | undefined>(undefined);

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

  const selectOrbitInteraction = (id: string): void => {
    if (selectedOrbitA === "") {
      setSelectedOrbitA(id)
      setSelectedOrbitB(undefined)
      return
    }

    if (selectedOrbitB === "") {
      setSelectedOrbitA(undefined)
      return
    }

    // if we de-select orbit A, we want to push orbit B to A.
    if (id === selectedOrbitA) {
      const tmp = selectedOrbitB
      setSelectedOrbitB(undefined)
      setSelectedOrbitA(tmp)
      return
    }

    if (id === selectedOrbitB) {
      setSelectedOrbitB(undefined)
      return
    }

    setSelectedOrbitB(id)
  }

  return (
    <>
      <AppContext.Provider
        value={{
          orbitList,
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