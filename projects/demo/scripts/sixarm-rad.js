////
//
// SixArm.com Rapid App Development (RAD) functions in JavaScript.
//
//   * These are intentionally simple, to be easy to learn and adjust.
//
//   * These are intentionally generic, to be easy to use with any project.
//
//   * These do not check for conflicts, and do not do any error handling.
//
//   * These use current vanilla JavaScript, and not any other library.
//
////

////
//
// Node prototypes
//
////

// Set id.
Node.prototype.setId = function(id) {
    this.id = id;
    return this;
};

// Set innerHTML.
Node.prototype.setInnerHTML = function(innerHTML) {
    this.innerHTML = innerHTML;
    return this;
};

// Set checked.
Node.prototype.setChecked = function(boolean) {
    this.checked = boolean;
    return this;
};

// Set selected.
Node.prototype.setSelected = function(boolean) {
    this.selected = boolean;
    return this;
};

// Toogle node style display to show the node or hide the node.
Node.prototype.toggle = function() {
    this.style.display = (this.style.display == "none") ? "block" : "none";
    return this;
}

////
//
// Node prototypes for element children
//
////

// Append all child elements
Node.prototype.appendChildren = function(children) {
    children.forEach(child => this.appendChild(child));
    return this;
};

// Remove all child elements.
Node.prototype.removeChildren = function() {
    while (this.lastChild) this.removeChild(this.lastChild);
    return this;
};

// Replace all child elements.
Node.prototype.replaceChildren = function(children) {
    return this.removeChildren().appendChildren(children);
};

////
//
// Storage prototypes
//
////

// Save an object via local storage.
Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

// Load an object via local storage.
Storage.prototype.getObject = function(key) {
    return JSON.parse(this.getItem(key));
}

////
//
// Element convenience functions
//
////

// Create an element with a type, optional props, and optional children.
function element(type, props, ...children) {
    let e = document.createElement(type);
    if (typeof props != "undefined" && props != null) {
        Object.keys(props).forEach(key => e.setAttribute(key, props[key]));
    }
    if (typeof children != "undefined" && children != null) {
        children.forEach(child => e.appendChild(child));
    }
    return e;
}

// Get element by id.
function elementById(id) {
    return document.getElementById(id);
}

// Get element by class name.
function elementsByClassName(className) {
    return document.getElementsByClassName(className);
}
