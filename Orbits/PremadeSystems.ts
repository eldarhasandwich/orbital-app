import { Orbit } from "./Orbit";

interface OrbitalSystem {
  id: string
  orbits: Orbit[]
}

export const SolarSystem: OrbitalSystem = {
  id: 'solar_system',
  orbits: [
    {
      name: 'Mercury',
      eccentricity: 1,
      semimajorAxis: 2,
      inclination: 3,
      longitudeOfAscendingNode: 4,
      argumentOfPeriapsis: 5,
      trueAnomaly: 6
    }
  ]
}

export const KerbolSystem: OrbitalSystem = {
  id: 'kerbol_system',
  orbits: [

  ]
}

export const PremadeSystems: { [id: string]: OrbitalSystem } = {
  [SolarSystem.id]: SolarSystem,
  [KerbolSystem.id]: KerbolSystem
}