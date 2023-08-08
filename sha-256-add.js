function add(x, y) {
    return (((x) + (y)) % 2**32) >>> 0;
}

// test
console.log(add(1,2),' === ', 3);
console.log(add(4294967295,1),' === ', 0);
console.log(add(3050487260,3710144918),' === ', 2465664882);