////
//
// SixArm.com JavaScript functions:
// Math-related functionality.
//
////

/** 
 * Generate all pairs of array items.
 *
 * https://stackoverflow.com/questions/43241174/javascript-generating-all-combinations-of-elements-in-a-single-array-in-pairs/43241295
 */
function pairs(items) {
    return items.flatMap((v, i) => items.slice(i+1).map(w => [v, w]));
}

/**
 * Generate all combinations of array items.
 *
 * https://codereview.stackexchange.com/questions/7001/generating-all-combinations-of-an-array
 */
function combinations(items) {
    var fn = function(active, rest, a) {
        if (active.length == 0 && rest.length == 0)
            return;
        if (rest.length == 0) {
            a.push(active);
        } else {
            fn(active.concat([rest[0]]), rest.slice(1), a);
            fn(active, rest.slice(1), a);
        }
        return a;
    }
    return fn([], items, []);
}