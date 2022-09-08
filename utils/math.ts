

export const isValidNumber = (n: string): boolean => {
  return (/^[0-9][0-9]*(\.[0-9][0-9]*)?$/).test(n)
}
