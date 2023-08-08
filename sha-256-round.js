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

// Big Sigma 0 function
function big_sigma_0(x) {
    return (ROTR(x, 2) ^ ROTR(x, 13) ^ ROTR(x, 22)) >>> 0;
}

// Big Sigma 1 function
function big_sigma_1(x) {
    return (ROTR(x, 6) ^ ROTR(x, 11) ^ ROTR(x, 25)) >>> 0;
}

// Choice function
function choice(x, y, z) {
    return ((x & y) ^ (~x & z)) >>> 0;
}

// Test expect 1783753340
console.log(choice(2749825547, 776049372, 1213590135) === 1783753340);

// Majority function
function majority(x, y, z) {
    return ((x & y) ^ (x & z) ^ (y & z)) >>> 0;
}

// Test expect 3893039714
console.log(majority(3758166654, 2821345890, 1850678816) === 3893039714);

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
    h = g >>> 0;
    g = f >>> 0;
    f = e >>> 0;
    e = add(d, T1);
    d = c >>> 0;
    c = b >>> 0;
    b = a >>> 0;
    a = add(T1, T2);
    return [a,b,c,d,e,f,g,h];
}


const state = [
    2739944672, 3126690193, 4191866847, 1163785745,
    3714074692, 1172792371, 283469062,   826169706
];                                
const K = 961987163;
const W = 3221900128;
const output = round(state, K, W);
const testArray = [
    1724514418, 2739944672, 3126690193, 4191866847,
    1638715774, 3714074692, 1172792371, 283469062
];
console.log(JSON.stringify(output) === JSON.stringify(testArray));
