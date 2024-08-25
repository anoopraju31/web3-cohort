// const str = 'h'
// const binaryRepresentation = new TextEncoder().encode(str)

// console.log(binaryRepresentation)

// const arr = new Uint8Array([1919])

// console.log(arr)

const arrayToHex = (array) =>
	array.map((x) => x.toString(16).padStart(2, '0')).join('')

const str = 'Hello'
const byteArray = new TextEncoder().encode(str)
console.log(byteArray)
console.log(arrayToHex(byteArray))

// * Base 64
const base64Ecoded = Buffer.from(byteArray).toString('base64')
console.log(base64Ecoded)
