export const parseBool = (
  value: boolean | string | number | undefined
): boolean =>
  !!(value === "true" || value === "1" || value === true || value === 1)

export const isEmail = (val: string): boolean =>
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val)
