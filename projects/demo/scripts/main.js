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
                maker.attributes[tag.id] = randomIntMinMax(-1, 1);
            });
        });
        data.takers.forEach(taker => {
            data.makersTags.concat(data.takersTags).forEach(tag => { 
                taker.attributes[tag.id] = randomIntMinMax(-1, 1);
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

    function _input_select(id, value) {
        let sel = element("SELECT", {id: id});
        let neutral = element("OPTION", {value: 0}).setInnerHTML("😐").setSelected(value == 0);
        let positive = element("OPTION", {value: 1}).setInnerHTML("✅").setSelected(value == 1);
        let negative = element("OPTION", {value: -1}).setInnerHTML("🚫").setSelected(value == -1);
        sel.appendChild(neutral);
        sel.appendChild(positive);
        sel.appendChild(negative);
        return sel;
    }

    function _gather_area() {
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
                let input = _input_select(maker.id + "." + tag.id, maker.attributes[tag.id]);
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
                let input = _input_select(taker.id + "." + tag.id, taker.attributes[tag.id]);
                td.appendChild(input);
                tr.appendChild(td);
            });
            data.takersTags.forEach(tag => {
                let td = element("TD");
                let input = _input_select(taker.id + "." + tag.id, taker.attributes[tag.id]);
                td.appendChild(input);
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });
    }

    function _person_grouping_area() {
        let area = elementById("personGroupingArea");
        let ul = element("UL");
        area.appendChild(ul);
        data.takers.forEach(taker => {
            html = taker.attributes.freeform0 + ": ";
            data.takers.forEach(other => {
                if (taker != other) {
                    let score = ScoreCalculator.byTakers(taker, other);
                    if (score >=0) {
                        html += other.attributes.freeform0 + " ";
                    }
                }
            });
            let li = element("LI").setInnerHTML(html);
            ul.appendChild(li);
        });
    }

    function _place_grouping_area() {
        let area = elementById("placeGroupingArea");
        let ul = element("UL");
        area.appendChild(ul);
        data.makers.forEach(maker => {
            html = maker.attributes.freeform0 + ": ";
            data.takers.forEach(taker => {
                let score = ScoreCalculator.byMakerTaker(maker, taker);
                if (score >= 0) {
                    html += taker.attributes.freeform0 + " ";
                }
            });
            let li = element("LI").setInnerHTML(html);
            ul.appendChild(li);
        });
    }

    _gather_area();
    _person_grouping_area();
    _place_grouping_area();

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
