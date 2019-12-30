////
//
// Vet functions a.k.a. validation functions.
//
////

// Vet an object is typical.
//
// Example:
//
//     let object = null;
//     vet(object);
//     => console error "vet: x == null"
//
// Return:
//
//   * true if the object is vetted.
//   * false if the object is undefined, or null, or NaN.
//
function vet(object) {
    if (typeof object == "undefined") {
        console.error("vet: object is undefined.");
        return false;
    }
    if (object == null) {
        console.error("vet: object == null.");
        return false;
    }
    if (object == NaN) {
        console.error("vet: object == NaN.");
        return false;
    }    
    return true;
}

// Vet an object list is typical.
//
// Example:
//
//     let objects = [123, null, NaN];
//     vets(objects);
//     => console error "vet: object == null"
//
// Return:
//
//   * true if each object is vetted.
//   * false if any object is undefined, or null, or NaN.
//
function vets(...objects) {
    objects.forEach(object => {
        if (!vet(object)) return false;
    });
    return true;
}

// Vet an object attribute is typical.
//
// Example:
//
//     let object = {"hello": "world"};
//     vetAttribute(object, "goodbye");
//     => console error "vetAttribute: attribute goodbye == null"
//
// Return:
//
//   * true if the object and attribute are vetted.
//   * false if the object is undefined, or null, or NaN.
//   * false if the attributeName is undefined, or null, or NaN.
//   * false if the attribute is undefined, or null, or NaN.
//
function vetAttribute(object, attributeName) {
    if (typeof object == "undefined") {
        console.error("vetAttribute: object is undefined.");
        return false;
    }
    if (object == null) {
        console.error("vetAttribute: object == null.");
        return false;
    }
    if (object == NaN) {
        console.error("vet: object == NaN.");
        return false;
    }    
    if (typeof attributeName == "undefined") {
        console.error("vetAttribute: attributeName is undefined.");
        return false;
    }
    if (attributeName == null) {
        console.error("vetAttribute: attributeName == null.");
        return false;
    }
    if (attributeName == NaN) {
        console.error("vetAttribute: attributeName == NaN.");
        return false;
    }
    let a = x.getAttribute(attributeName);
    if (typeof a == "undefined") {
        console.error("vetAttribute: attribute ${attributeName} is undefined.");
        return false;
    }
    if (a == null) {
        console.error("vetAttribute: attribute ${attributeName} == null.");
        return false;
    }
    if (a == NaN) {
        console.error("vetAttribute: attribute ${attributeName} == NaN.");
        return false;
    }
    return true;
}

// Vet an object attribute list is typical.
//
// Example:
//
//     let object = {"alpha": "bravo", "charlie": "delta"};
//     vetAttributes(object, "alpha", "echo");
//     => console error "vetAttribute: attribute echo == null"
//
// Return:
//
//   * false if the object is undefined, or null, or NaN.
//   * false if any attributeName is undefined, or null, or NaN.
//   * false if any attribute is undefined, or null, or NaN.
//
function vetAttributes(x, ...attributeNames) {
    attributeNames.forEach(attributeName => {
        if (!vetAttribute(x, attributeName)) return false;
    });
    return true;
}
