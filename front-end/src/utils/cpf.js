export function validateCPF(value) {
  if (!value) return false
  const str = String(value).replace(/\D/g, '')
  if (str.length !== 11) return false
  if (/^(\d)\1{10}$/.test(str)) return false

  const calc = (arr, factor) => {
    let total = 0
    for (let i = 0; i < arr.length; i++) total += Number(arr[i]) * factor--
    const res = total % 11
    return res < 2 ? 0 : 11 - res
  }

  const num = str.split('')
  const d1 = calc(num.slice(0, 9), 10)
  const d2 = calc(num.slice(0, 10), 11)
  return d1 === Number(num[9]) && d2 === Number(num[10])
}
