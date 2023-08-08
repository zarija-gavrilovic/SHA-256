// Add function
function add(x, y) {
    return ((x + y) % 2**32) >>> 0;
}

// ROTR function
function ROTR(x, n) {  
    const shiftedBits = x >>> n;
    const movedBits = (x << (32 - n)) >>> 0;
    return (shiftedBits | movedBits) >>> 0;
}

// Shift right
function SHR(x, n) {
    return x >>> n
}

// Little Sigma 0 function
const little_sigma0 = (x) => {
    return (ROTR(x, 7) ^ ROTR(x, 18) ^ SHR(x, 3)) >>> 0;
}

// Little Sigma 1 function
const little_sigma1 = (x) => {
    return (ROTR(x, 17) ^ ROTR(x, 19) ^ SHR(x, 10)) >>> 0;
}

/**
 * @param {int[]} listOfUnicodeValues 
 * @returns {int[]} Array where each element has 32bits.
 */
function convertToArrayOf32bits(input) {
    const outputArray = new Array(16);
    for (let i = 0, j = 0; i < input.length; i=i+4, j++) {
        outputArray[j] = input[i] << 24 | input[i+1] << 16 | input[i+2] << 8 | input[i+3];
    }
    return outputArray;
}

/**
 * @param {int[]} M is an array where each element has 32 bits
 * @returns {int[]} array of 64 elements. Each element is unsigned 32 bits number
 */
function messageSchedule(message) {
    const M = convertToArrayOf32bits(message);
    const W = [...M];
    for(let i = 16; i < 64; i ++) {
        W[i] = add(add(little_sigma1(W[i - 2]), W[i - 7]), add(little_sigma0(W[i - 15]), W[i - 16]));
    }
    return W;
}

// Big Sigma 0 function
function big_sigma_0(x) {
    return ROTR(x, 2) ^ ROTR(x, 13) ^ ROTR(x, 22);
}

// Big Sigma 1 function
function big_sigma_1(x) {
    return ROTR(x, 6) ^ ROTR(x, 11) ^ ROTR(x, 25);
}

// Choice function
function choice(x, y, z) {
    return (x & y) ^ (~x & z);
}

// Majority function
function majority(x, y, z) {
    return ((x & y) ^ (x & z) ^ (y & z)) >>> 0;
}

/**
 * Round function
 * @param {Array[number]} state - 8 x uint32 (a,b,c,d,e,f,g,h)
 * @param {number} K - round_constant - uint32
 * @param {number} W - schedule_word - uint32
 * @returns {Array[number]} 
 */
function round([a,b,c,d,e,f,g,h], K, W) {
    const T1 = add(add(h, big_sigma_1(e)), add(add(K, W), choice(e,f,g)));
    const T2 = add(big_sigma_0(a), majority(a,b,c));
    h = g;
    g = f;
    f = e;
    e = add(d, T1);
    d = c;
    c = b;
    b = a;
    a = add(T1, T2);
    return [a,b,c,d,e,f,g,h];
}


const K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
]
/**
 * 
 * @param {Array[number]} initial_state - array of 8 uint32 elements
 * @param {Array[number]} block - array of 64 uint8 elements
 * @return {Array[number]} - array of 8 unit32 elements
 */
function compress_block(initial_state, block) {
    const W = messageSchedule(block);
    let state = [...initial_state];
    for (let i = 0; i < 64; i++) {
        state = round(state, W[i], K[i])
    }
    const output = new Array(8);
    for (let i = 0; i < 8; i++) {
        output[i] = add(state[i], initial_state[i]);
    }

    return output;
}




// test case
const initial_state =  [
    2918946378, 1679978889, 1678006433,  650957219,
    379281712, 2112907926, 1775216060, 2152648190
]
  
// const block = "manatee fox unicorn octopus dog fox fox llama vulture jaguar xen"
block = [
    109,  97, 110,  97,  116, 101, 101,  32,
    102, 111, 120,  32,  117, 110, 105,  99,
    111, 114, 110,  32,  111,  99, 116, 111,
    112, 117, 115,  32,  100, 111, 103,  32,
    102, 111, 120,  32,  102, 111, 120,  32,
    108, 108,  97, 109,  97,   32, 118, 117,
    108, 116, 117, 114,  101,  32, 106,  97,
    103, 117,  97, 114,  32,  120, 101, 110
]

const expecttedOutput = [
    1251501988, 1663226031, 2877128394, 4050467288,
    2375501075, 1434687977, 2625842981, 650253644
]
console.log(compress_block(initial_state, block));
console.log(JSON.stringify(compress_block(initial_state, block)) === JSON.stringify(expecttedOutput));




