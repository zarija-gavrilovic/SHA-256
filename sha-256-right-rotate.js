function rightrotate32(x, n) {
    
    // Normalizacija n na raspon od 0 do 31
    n = n % 32;
  
    console.log(`number: ${x.toString(2)}(${x.toString(2).length}), decmial: ${x}`)
    // Rotiranje udesno
    const shiftedBits = (x >>> n);
    console.log(`shiftedBits: ${shiftedBits.toString(2)}(${shiftedBits.toString(2).length}) decimal: ${shiftedBits}`)
    const movedBits = ((x << (32 - n)) >>> 0);
    console.log(`movedBits: ${movedBits.toString(2)}(${movedBits.toString(2).length}) decimal: ${movedBits}`)
    
    // IMPORTANT: Convert to unsinged number!
    return (shiftedBits | movedBits) >>> 0;
}

// Tests
// Primer 1
const rotatedNumber1 = rightrotate32(2, 1);
console.log(`RESULT1 binary: ${rotatedNumber1.toString(2)}(${rotatedNumber1.toString(2).length}) decimal: ${rotatedNumber1}`)
console.log('EXPECTED', 1);

// Primer 2
const rotatedNumber2 = rightrotate32(1, 1);
console.log(`RESULT2 binary: ${rotatedNumber2.toString(2)}(${rotatedNumber2.toString(2).length}) decimal: ${rotatedNumber2}`)
console.log('EXPECTED', 2147483648);

// Primer 3
const rotatedNumber3 = rightrotate32(2919882184, 31);
console.log(`RESULT3 binary: ${rotatedNumber3.toString(2)}(${rotatedNumber3.toString(2).length}) decimal: ${rotatedNumber3}`)
console.log('EXPECTED', 1544797073);

// Primer 4 (max unsigned int 4294967295)
const rotatedNumber4 = rightrotate32(4294967295, 1);
console.log('RESULT4 ','binary: ',(rotatedNumber4).toString(2), ' decmial: ', rotatedNumber4);
console.log('EXPECTED ???');

// Primer 5 (max unsigned int 4294967295)
const rotatedNumber5 = rightrotate32(17, 1);
console.log(`RESULT5 binary: ${rotatedNumber5.toString(2)}(${rotatedNumber5.toString(2).length}) decimal: ${rotatedNumber5}`)
console.log('EXPECTED ???');
