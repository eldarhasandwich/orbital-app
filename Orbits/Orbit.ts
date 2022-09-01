
const GRAVITATIONAL_CONSTANT = 6.67408 * Math.pow(10,-11)

const pi = 3.14159265358979;

// const arctan2 = (Ey: number, Ex: number): number => {
//    let u: number;

//    if (Ex != 0) {
//       u = Math.atan(Ey / Ex);
//       if (Ex < 0) {u = u + pi}
//       if (Ex > 0 && Ey < 0) {u = u + 2 * pi}
//    } else {
//       if (Ey < 0) {u = -pi / 2}
//       if (Ey == 0) {u = 0}
//       if (Ey > 0) {u = pi / 2}
//    }
//    return u;
// }

// const toDegrees = (theta: number): number => {
//   return 180*theta/pi;
// }

const toRadians = (theta: number): number => {
  return pi*theta/180;
}

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
   * Mean anomaly, measured in degrees.
   */
  meanAnomaly: number
}

/**
 * Find the cartesian position of a given orbiting body at a given time.
 * @param centralBodyMass 
 * @param orbit 
 * @param timeFromEpoch 
 * @returns 3 dimensional position of the body of the given orbit
 * 
 * @see https://orbital-mechanics.space/classical-orbital-elements/orbital-elements-and-the-state-vector.html#orbital-elements-state-vector
 * @see https://space.stackexchange.com/questions/8911/determining-orbital-position-at-a-future-point-in-time
 */

interface StateVectors {
  position: number[],
  velocity: number[]
}

export const GetOrbitStateVectors = (
  centralBodyMass: number,
  orbit: Orbit,
  timeFromEpoch: number
): StateVectors => {

  const { semimajorAxis, eccentricity } = orbit;

  const inclination_radians = toRadians(orbit.inclination)
  const longitudeOfAscendingNode_radians = toRadians(orbit.longitudeOfAscendingNode)
  const argumentOfPeriapsis_radians = toRadians(orbit.argumentOfPeriapsis)
  const meanAnomaly_radians = toRadians(orbit.meanAnomaly)

  let eccentricAnomaly_radians =  meanAnomaly_radians;
  while(true) {
    var dE = (eccentricAnomaly_radians - eccentricity * Math.sin(eccentricAnomaly_radians) - meanAnomaly_radians)/(1 - eccentricity * Math.cos(eccentricAnomaly_radians));
    eccentricAnomaly_radians -= dE;
    if (Math.abs(dE) < 1e-6) break;
  }

  var P = semimajorAxis * (Math.cos(eccentricAnomaly_radians) - eccentricity);
  var Q = semimajorAxis * Math.sin(eccentricAnomaly_radians) * Math.sqrt(1 - Math.pow(eccentricity, 2));

  // rotate by argument of periapsis
  let x = Math.cos(argumentOfPeriapsis_radians) * P - Math.sin(argumentOfPeriapsis_radians) * Q;
  let y = Math.sin(argumentOfPeriapsis_radians) * P + Math.cos(argumentOfPeriapsis_radians) * Q;
  // rotate by inclination
  let z = Math.sin(inclination_radians) * y;
      y = Math.cos(inclination_radians) * y;
  // rotate by longitude of ascending node
  var xtemp = x;
  x = Math.cos(longitudeOfAscendingNode_radians) * xtemp - Math.sin(longitudeOfAscendingNode_radians) * y;
  y = Math.sin(longitudeOfAscendingNode_radians) * xtemp + Math.cos(longitudeOfAscendingNode_radians) * y;

  const position = [x,y,z];
  const velocity = [0,0,0];
  return {
    position,
    velocity
  }
}
