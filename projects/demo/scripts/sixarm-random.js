////
//
// SixArm.com JavaScript functions:
// table sorter functionality.
//
// https://github.com/sixarm/sixarm_javascript_functions
//
// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
//
////

/**
 * Return a random number between min (inclusive) and max (exclusive).
 */
function randomMinMan(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Return a random integer between min (inclusive) and max (inclusive).
 *
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 *
 * Using Math.round() will give you a non-uniform distribution!
 */
function randomIntMinMax(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}