
const GRAVITATIONAL_CONSTANT = 6.67408 * Math.pow(10,-11)

/**
 * Central mass of the system.
 */
export interface CentralMass {
  /**
   * Human readable tag for the mass.
   */
  name: string;

  /**
   * Mass in kilograms.
   */
  mass: number;
}

/**
 * Orbits defined using Keplerian orbital elements.
 */
export interface Orbit {
  /**
   * Human readable tag for the orbit.
   */
  name: string;

  /**
   * Eccentricity, a dimensionless parameter.
   */
  eccentricity: number

  /**
   * Semi-major axis measured in metres.
   */
  semimajorAxis: number

  /**
   * Inclination measured in degrees.
   */
  inclination: number

  /**
   * Longitude of the ascending node, measured in degrees.
   */
  longitudeOfAscendingNode: number

  /**
   * Argument of periapsis, measured in degrees.
   */
  argumentOfPeriapsis: number

  /**
   * True anomaly, measured in degrees.
   */
  trueAnomaly: number
}

/**
 * Find the cartesian position of a given orbiting body at a given time.
 * @param centralBodyMass 
 * @param orbit 
 * @param timeFromEpoch 
 * @returns 3 dimensional position of the body of the given orbit
 */
export const GetPositionOfBody = (
  centralBodyMass: number,
  orbit: Orbit,
  timeFromEpoch: number
): number[] => {

  
  
  const position = [0,0,0];
  return position;
}