function add(x, y) {
    return (((x) + (y)) % 2**32) >>> 0;
}

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

/**
 * Osmobitni brojevi su brojevi od 0 - 255
 * 00000000 -> 0
 * 11111111 -> 255
 * 
 * 1 -> 1
 * 1 -> 2
 * 1 -> 4 
 * 1 -> 8
 * 1 -> 16
 * 1 -> 32
 * 1 -> 64
 * 1 -> 128
 * TOTAL: 255
 * 
 * U ASCII kodiranju, svako slovo (veliko ili malo slovo), 
 * broj, simbol ili kontrolni karakter predstavljeni su jednim BAJTOM, odnosno 8 BITOVA.
 */


const message = "iguana wombat dog kangaroo llama turkey yak unicorn sheep xenoce";

/**
 * @param {string} message 
 * @returns {int[]} Array where each element has 8 bits.
 */
function charToUnicodeValue(message) {
    outputArray = [];
    for (let i = 0; i < message.length; i++) {
        outputArray[i] = message[i].charCodeAt(0);
    }
    return outputArray;
}

// Array of 64 elements. Each element is 8 bits.
// const listOfUnicodeValues = charToUnicodeValue(message);
const listOfUnicodeValues = new TextEncoder().encode(message);

/**
 * @param {int[]} listOfUnicodeValues 
 * @returns {int[]} Array where each element has 32bits.
 */
function convertToArrayOf32bits(input) {
    const outputArray = [];
    for (let i = 0; i < input.length; i=i+4) {
        const element = input[i] << 24 | input[i+1] << 16 | input[i+2] << 8 | input[i+3];
        outputArray.push(element);
    }
    return outputArray;
}

// M is array of 16 elements. Each element has 32 bits
const M = convertToArrayOf32bits(listOfUnicodeValues);

/**
 * @param {int[]} M is an array where each element has 32 bits
 * @returns {int[]} array of 64 elements. Each element is unsigned 32 bits number
 */
function messageSchedule(M) {
    const W = [...M];
    for(let i = 16; i < 64; i ++) {
        W[i] = add(add(little_sigma1(W[i - 2]), W[i - 7]), add(little_sigma0(W[i - 15]), W[i - 16]));
    }
    return W;
}

/**
 * Expected output:
 *  [
 *      1768387937, 1851859063, 1869439585, 1948279919, 1730177889, 1852268914, 1869553772, 1818324321,
 *      544503154, 1801812256, 2036427552, 1970170211, 1869770272, 1936221541, 1881176165, 1852793701,
 *      3002878561, 3711121932, 1520676164, 3002441970, 2935068969, 1610329529, 1904580351, 3219988740,
 *      2337695268,  263015313, 2120931855,  131203777, 3818546915,   19163115, 3479924161, 2154860703,
 *      1790169326,  516580487, 2414737634,  909025701, 2241053595, 1237268359, 3797503938, 1773623028,
 *      2840671725, 2299292186, 1933596460, 2279513616,  514132674, 3245155609, 1753922983, 2241450350,
 *      2449659630,  262239956,  773552098, 3253131632, 3863807927,  879696536, 3143654396, 3973063648,
 *      509015903,  270850193, 1893431553,  719566283, 2310657204,  365781698, 3761063438, 1007484868
 *   ]
 * 
 */

console.log(messageSchedule(M));