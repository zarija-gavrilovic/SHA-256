//ROTR
function ROTR(x, n) {  
    const shiftedBits = x >>> n;
    const movedBits = (x << (32 - n)) >>> 0;
    return (shiftedBits | movedBits) >>> 0;
}

function big_sigma_0(x) {
    return (ROTR(x, 2) ^ ROTR(x, 13) ^ ROTR(x, 22)) >>> 0;
}

function big_sigma_1(x) {
    return (ROTR(x, 6) ^ ROTR(x, 11) ^ ROTR(x, 25)) >>> 0;
}

// Test
console.log(big_sigma_0(1114723206));
console.log(big_sigma_0(1232674167));
console.log(big_sigma_1(1232674167));

