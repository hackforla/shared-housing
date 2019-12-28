////
//
// Initialize
//
////

// Parse the JSON data object, which was loaded by the HTML head script tag.
function ini() {
    
    // Initialize array items by setting the id attribute.
    //
    // Example outcome:
    //
    //     data.partnersToMakers[0].id = "makers0";
    //
    function _id(items, name) {
        for (var i = 0; i < items.length; i++) items[i].id = name + i; // TODO change to zid
        return items;
    }

    function _ids() {
        _id(data.makers, "makers");
        _id(data.takers, "takers");
        _id(data.makersTags, "makersTags");
        _id(data.takersTags, "takersTags");
    }

    // Initialize tag slots where we'll store user-input values.
    function _slots() {
        data.makers.forEach(maker => {
            data.makersTags.forEach(tag => { 
                maker.attributes[tag.id] = Math.round(Math.random());
            });
        });
        data.takers.forEach(taker => {
            data.makersTags.concat(data.takersTags).forEach(tag => { 
                taker.attributes[tag.id] = Math.round(Math.random());
            });
        });
    }

    _ids();
    _slots();

}

////
//
// Render
//
////

function render() {

    function _input_text(id, value) {
        return element("INPUT", {id: id, type: "text", size: 10, value: value});
    }

    function _input_checkbox(id, value) {
        return element("INPUT", {id: id, type: "checkbox"}).setChecked([false, true][value]);
    }

    let inputTextSize = 10;
    let app = elementById("app");
    let table = element("TABLE");
    app.appendChild(table);
    let tr = element("TR");
    table.appendChild(tr);
    tr.appendChild(element("TD"));
    data.makersTags.concat(data.takersTags).forEach(tag => {
        let td = element("TD");
        let input = _input_text(tag.id + ".name", tag.attributes.name);
        td.appendChild(input);
        tr.appendChild(td);
    });
    table.appendChild(tr);
    data.makers.forEach(maker => {
        let tr = element("TR");
        let td = element("TD");
        let input = _input_text(maker.id + ".name", maker.attributes.freeform0);
        td.appendChild(input);
        tr.appendChild(td);
        data.makersTags.forEach(tag => {
            let td = element("TD");
            let input = _input_checkbox(maker.id + "." + tag.id, maker.attributes[tag.id]);
            td.appendChild(input);
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
    data.takers.forEach(taker => {
        let tr = element("TR");
        let td = element("TD");
        let input = _input_text(taker.id + ".name", taker.attributes.freeform0);
        td.appendChild(input);
        tr.appendChild(td);
        data.makersTags.forEach(tag => {
            let td = element("TD");
            let input = _input_checkbox(taker.id + "." + tag.id, taker.attributes[tag.id]);
            td.appendChild(input);
            tr.appendChild(td);
        });
        data.takersTags.forEach(tag => {
            let td = element("TD");
            let input = _input_checkbox(taker.id + "." + tag.id, taker.attributes[tag.id]);
            td.appendChild(input);
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
}

////
//
// Main
//
////

function main() {
    ini();
    render();
}
