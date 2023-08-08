//ROTR
function ROTR(x, n) {  
    const shiftedBits = x >>> n;
    const movedBits = (x << (32 - n)) >>> 0;
    return (shiftedBits | movedBits) >>> 0;
}

function SHR(x, n) {
    return x >>> n
}

const little_sigma0 = (x) => {
    return (ROTR(x, 7) ^ ROTR(x, 18) ^ SHR(x, 3)) >>> 0;
}

const little_sigma1 = (x) => {
    return (ROTR(x, 17) ^ ROTR(x, 19) ^ SHR(x, 10)) >>> 0;
}

const result1 = little_sigma0(1114723206);

// Test
const result2 = little_sigma1(1232674167)
console.log(result2);
// expected output: 2902922196
