# Assignment 2

What do you think happens to the first element here? Does it throw an error?
```js
let uint8Arr = new Uint8Array([0, 255, 127, 128]);
uint8Arr[0] = 300;
```

- Uint8Array is an array of `8-bit` unsigned integers, which means each element can only hold values between `0` and `255`.
- When you try to assign a value outside this range, JavaScript will perform modulo `256` arithmetic to fit the value into the allowed range.
- `300 % 256 = 44` (since `300` divided by `256` leaves a remainder of `44`)