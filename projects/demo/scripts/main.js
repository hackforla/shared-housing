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

    _ids();

}

////
//
// Render
//
////

function render() {
    let inputTextSize = 10;
    let app = elementById("app");
    let table = element("TABLE");
    app.appendChild(table);
    let tr = element("TR");
    table.appendChild(tr);
    tr.appendChild(element("TD"));
    data.makersTags.concat(data.takersTags).forEach(x => {
        let td = element("TD");
        let input = element("INPUT", {type: "text", size: inputTextSize, value: x.attributes.name});
        td.appendChild(input);
        tr.appendChild(td);
    });
    table.appendChild(tr);
    data.makers.forEach(x => {
        let tr = element("TR");
        let td = element("TD");
        let input = element("INPUT", {type: "text", size: inputTextSize, value: x.attributes.freeform0});
        td.appendChild(input);
        tr.appendChild(td);
        data.makersTags.forEach(tag => {
            let td = element("TD");
            let input = element("INPUT", {type: "checkbox"});
            td.appendChild(input);
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
    data.takers.forEach(x => {
        let tr = element("TR");
        let td = element("TD");
        let input = element("INPUT", {type: "text", size: inputTextSize, value: x.attributes.freeform0});
        td.appendChild(input);
        tr.appendChild(td);
        data.makersTags.forEach(tag => {
            let td = element("TD");
            let input = element("INPUT", {type: "checkbox"});
            td.appendChild(input);
            tr.appendChild(td);
        });
        data.takersTags.forEach(tag => {
            let td = element("TD");
            let input = element("INPUT", {type: "checkbox"});
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
