export default function (min: number, max: number): number {
  const randomNumber = Math.random() * (max - min) + min
  return Math.round(randomNumber)
}
