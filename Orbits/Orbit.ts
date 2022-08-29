
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
