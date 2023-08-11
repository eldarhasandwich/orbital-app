import { CentralMass, Orbit } from "./Orbit";

interface OrbitalSystem {
  id: string
  centralMass: CentralMass
  orbits: Orbit[]
}

const SolarSystemDwarfPlanets: Orbit[] = [
  {
    name: 'Ceres',
    eccentricity: 0.0758,
    semimajorAxis: 413_700_000_000,
    inclination: 10.593,
    longitudeOfAscendingNode: 80.3293,
    argumentOfPeriapsis: 73.5977,
    meanAnomaly: 95.9891
  },
  {
    name: 'Haumea',
    eccentricity: 0.19126,
    semimajorAxis: 6_484_000_000_000,
    inclination: 28.22,
    longitudeOfAscendingNode: 121.8886,
    argumentOfPeriapsis: 241.935,
    meanAnomaly: 302.181
  },
  {
    name: 'Makemake',
    eccentricity: 0.1594,
    semimajorAxis: 6_850_000_000_000,
    inclination: 29.00685,
    longitudeOfAscendingNode: 79.36588,
    argumentOfPeriapsis: 297.365,
    meanAnomaly: 72.7485
  },
  {
    name: 'Eris',
    eccentricity: 0.44177,
    semimajorAxis: 10_120_000_000_000,
    inclination: 44.0445,
    longitudeOfAscendingNode: 35.8779,
    argumentOfPeriapsis: 151.7048,
    meanAnomaly: 32.2443
  },
  {
    name: 'Pallas',
    eccentricity: 0.231,
    semimajorAxis: 414_000_000_000,
    inclination: 34.84,
    longitudeOfAscendingNode: 173.08,
    argumentOfPeriapsis: 310.155,
    meanAnomaly: 103.807
  },
  {
    name: 'Vesta',
    eccentricity: 0.08874,
    semimajorAxis: 353_316_000_000,
    inclination: 7.1354,
    longitudeOfAscendingNode: 103.8117,
    argumentOfPeriapsis: 151.1986,
    meanAnomaly: 20.8632
  }
];

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
    mass: 1.98847 * Math.pow(10, 30) // this is REALLY BOTHERING ME, BUT ACCURATE VALUES SEEM TO APPEAR IF YOU USE 1.98e21 instead of 1.98e30
    // mass: 1.98847 * Math.pow(10, 21)
  },
  orbits: [
    {
      name: 'Mercury',
      eccentricity: 0.205630,
      semimajorAxis: 57_909_050_000,
      inclination: 6.35,
      longitudeOfAscendingNode: 48.331,
      argumentOfPeriapsis: 29.124,
      meanAnomaly: 174.796
    },
    {
      name: 'Venus',
      eccentricity: 0.006772,
      semimajorAxis: 108_208_000_000,
      inclination: 2.15,
      longitudeOfAscendingNode: 76.680,
      argumentOfPeriapsis: 54.884,
      meanAnomaly: 50.115
    },
    {
      name: 'Earth',
      eccentricity: 0.0167086,
      semimajorAxis: 149_598_023_000,
      inclination: 1.57869,
      longitudeOfAscendingNode: -11.26064,
      argumentOfPeriapsis: 114.20783,
      meanAnomaly: 358.617
    },
    {
      name: 'Mars',
      eccentricity: 0.0934,
      semimajorAxis: 227_939_366_000,
      inclination: 1.63,
      longitudeOfAscendingNode: 49.57854,
      argumentOfPeriapsis: 286.5,
      meanAnomaly: 19.412
    },
    {
      name: 'Jupiter',
      eccentricity: 0.0489,
      semimajorAxis: 778_547_200_000,
      inclination: 1.304,
      longitudeOfAscendingNode: 100.464,
      argumentOfPeriapsis: 275.066,
      meanAnomaly: 18.818
    },
    {
      name: 'Saturn',
      eccentricity: 0.0565,
      semimajorAxis: 1_426_725_400_000,
      inclination: 2.485,
      longitudeOfAscendingNode: 113.665,
      argumentOfPeriapsis: 339.392,
      meanAnomaly: 318.063
    },
    {
      name: 'Uranus',
      eccentricity: 0.046381,
      semimajorAxis: 2_872_972_200_000,
      inclination: 0.772,
      longitudeOfAscendingNode: 74.006,
      argumentOfPeriapsis: 96.998857,
      meanAnomaly: 142.238600
    },
    {
      name: 'Neptune',
      eccentricity: 0.009456,
      semimajorAxis: 4_498_252_900_000,
      inclination: 1.769,
      longitudeOfAscendingNode: 131.784,
      argumentOfPeriapsis: 272.8461,
      meanAnomaly: 260.2471
    },
    {
      name: 'Pluto', // Although not a planet, let's include for completeness
      eccentricity: 0.2488,
      semimajorAxis: 5_906_376_273_000,
      inclination: 17.16,
      longitudeOfAscendingNode: 110.303,
      argumentOfPeriapsis: 113.763,
      meanAnomaly: 14.53
    },
    ...SolarSystemDwarfPlanets
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
      name: 'Moho',
      eccentricity: 0.2,
      semimajorAxis: 5_263_138_304,
      inclination: 7.005,
      longitudeOfAscendingNode: 70.0,
      argumentOfPeriapsis: 15.0,
      meanAnomaly: 3.14
    },
    {
      name: 'Eve',
      eccentricity: 0.01,
      semimajorAxis: 9_832_684_544,
      inclination: 2.1,
      longitudeOfAscendingNode: 15.0,
      argumentOfPeriapsis: 0.0,
      meanAnomaly: 3.14
    },
    {
      name: 'Kerbin',
      eccentricity: 0.0,
      semimajorAxis: 13_599_840_256,
      inclination: 0.0,
      longitudeOfAscendingNode: 0.0,
      argumentOfPeriapsis: 0.0,
      meanAnomaly: 3.14
    },
    {
      name: 'Duna',
      eccentricity: 0.051,
      semimajorAxis: 20_726_155_264,
      inclination: 0.06,
      longitudeOfAscendingNode: 135.5,
      argumentOfPeriapsis: 0.0,
      meanAnomaly: 3.14
    },
    {
      name: 'Dres',
      eccentricity: 0.145,
      semimajorAxis: 40_839_348_203,
      inclination: 5.0,
      longitudeOfAscendingNode: 280.0,
      argumentOfPeriapsis: 90.0,
      meanAnomaly: 3.14
    },
    {
      name: 'Jool',
      eccentricity: 0.05,
      semimajorAxis: 68_773_560_320,
      inclination: 1.304,
      longitudeOfAscendingNode: 52.0,
      argumentOfPeriapsis: 0.0,
      meanAnomaly: 0.1
    },
    {
      name: 'Eeloo',
      eccentricity: 0.26,
      semimajorAxis: 90_118_820_000,
      inclination: 6.15,
      longitudeOfAscendingNode: 50.0,
      argumentOfPeriapsis: 260.0,
      meanAnomaly: 3.14
    }
  ]
}

export const PremadeSystems: { [id: string]: OrbitalSystem } = {
  [SolarSystem.id]: SolarSystem,
  [KerbolSystem.id]: KerbolSystem
}