export const arrShuffle = (arr: any[]) => {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const randomNum = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[randomNum]] = [newArr[randomNum], newArr[i]]
  }
  return newArr
}