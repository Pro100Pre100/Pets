export const encodeBase64 = (arr: string[]) => {
  return arr.map((item) => btoa(encodeURIComponent(item)))
}

export const decodeBase64 = (arr: string[]) => {
  return arr.map((item) => (decodeURIComponent(atob(item))))
}
