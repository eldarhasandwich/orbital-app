import { CentralMass, Orbit } from "./Orbit";

interface OrbitalSystem {
  id: string
  centralMass: CentralMass
  orbits: Orbit[]
}

/**
 * For the solar system, J2000 is t=0
 * @see https://en.wikipedia.org/wiki/Epoch_(astronomy)#J2000
 * 
 * Inclination is relative to the invariable plane
 * @see https://en.wikipedia.org/wiki/Invariable_plane
 */
export const SolarSystem: OrbitalSystem = {
  id: 'solar_system',
  centralMass: {
    name: 'Sol',
    // mass: 1.98847 * Math.pow(10, 30) // this is REALLY BOTHERING ME, BUT ACCURATE VALUES SEEM TO APPEAR IF YOU USE 1.98e21 instead of 1.98e30
    mass: 1.98847 * Math.pow(10, 21)
  },
  orbits: [
    {
      name: 'Mercury',
      eccentricity: 0.205630,
      semimajorAxis: 57_909_050,
      inclination: 6.35,
      longitudeOfAscendingNode: 48.331,
      argumentOfPeriapsis: 29.124,
      meanAnomaly: 174.796
    },
    {
      name: 'Venus',
      eccentricity: 0.006772,
      semimajorAxis: 108_208_000,
      inclination: 2.15,
      longitudeOfAscendingNode: 76.680,
      argumentOfPeriapsis: 54.884,
      meanAnomaly: 50.115
    },
    {
      name: 'Earth',
      eccentricity: 0.0167086,
      semimajorAxis: 149_598_023,
      inclination: 1.57869,
      longitudeOfAscendingNode: -11.26064,
      argumentOfPeriapsis: 114.20783,
      meanAnomaly: 358.617
    },
    {
      name: 'Mars',
      eccentricity: 0.0934,
      semimajorAxis: 227_939_366,
      inclination: 1.63,
      longitudeOfAscendingNode: 49.57854,
      argumentOfPeriapsis: 286.5,
      meanAnomaly: 19.412
    }
  ]
}

/**
 * For the kerbol system, assume start of game is t=0.
 */
export const KerbolSystem: OrbitalSystem = {
  id: 'kerbol_system',
  centralMass: {
    name: 'Kerbol',
    mass: 1.7565459 * Math.pow(10, 28)
  },
  orbits: [
    {
      name: 'Nothing here yet!',
      eccentricity: 0,
      semimajorAxis: 0,
      inclination: 0,
      longitudeOfAscendingNode: 0,
      argumentOfPeriapsis: 0,
      meanAnomaly: 0
    }
  ]
}

export const PremadeSystems: { [id: string]: OrbitalSystem } = {
  [SolarSystem.id]: SolarSystem,
  [KerbolSystem.id]: KerbolSystem
}