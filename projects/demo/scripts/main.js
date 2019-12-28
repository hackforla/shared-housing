////
//
// Initialize
//
////

var cache = {};

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

    function _slot_value() {
        return [-1, 0, 0, 1][4 * Math.random() | 0];
    }

    // Initialize tag slots where we'll store user-input values.
    function _slots() {
        data.makers.forEach(maker => {
            data.makersTags.forEach(tag => { 
                maker.attributes[tag.id] = _slot_value();
            });
        });
        data.takers.forEach(taker => {
            data.makersTags.concat(data.takersTags).forEach(tag => { 
                taker.attributes[tag.id] = _slot_value();
            });
        });
    }

    _ids();
    _slots();
}

function calcScores() {
    var scores = {};
    data.takers.forEach(a => {
        scores[a.id] = {};
        data.takers.forEach(b => {
            if (a != b) {
                scores[a.id][b.id] = ScoreCalculator.byTakerTakerWithVeto(a, b);;
            }
        });
    });
    return scores;
}

function calcTakersCombinations() {
    return combinations(data.takers).filter(combo => {
        return combo.length < 2 || pairs(combo).every(pair => {
            let x = cache.scores[pair[0].id][pair[1].id];
            return x != null && x > 0;
        });
    });
}

////
//
// Refresh
//
////

function refresh() {
    console.log("refresh " +  this.id);
}

////
//
// Render
//
////

function render() {

    function _input_text(id, value) {
        return element("INPUT", {id: id, type: "text", size: 10, value: value}).withEventListener('change', refresh); // TODO optimize scope to table header rows
    }

    function _input_select(id, value) {
        let sel = element("SELECT", {id: id}).withEventListener('change', refresh); // TODO optimize scope to just this select change
        sel.appendChildren([
            _input_select_option(null, value,  1, "✅"),
            _input_select_option(null, value,  0, "😐"),
            _input_select_option(null, value, -1, "🚫"),
        ]);
        return sel;
    }

    function _input_select_option(id, value, optionValue, innerHTML) {
        return element("OPTION", {value: optionValue}).setSelected(value == optionValue).setInnerHTML(innerHTML);
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
        cache.takersCombinations.forEach(combo => {
            if (combo.length >= 2) {
                let html = combo.map(taker => taker.attributes.freeform0).join(", ");
                let score = ScoreCalculator.byTakersWithVeto(combo);
                if (score >= 0) {
                    let li = element("LI").setInnerHTML("Score:" + score + " " + html);
                    ul.appendChild(li);
                }
            }
        });
    }

    function _place_grouping_area() {
        let area = elementById("placeGroupingArea");
        let ul = element("UL");
        area.appendChild(ul);
        data.makers.forEach(maker => {
            cache.takersCombinations.forEach(takers => {
                let score = ScoreCalculator.byMakerTakersWithVeto(maker, takers);
                if (score >= 0) {
                    let html = "Score:" + score + " " + takers.map(taker => taker.attributes.freeform0).join(", ");
                    let li = element("LI").setInnerHTML(html);
                    ul.appendChild(li);
                }
            });
        });
    }

    _gather_area();
    cache.scores = calcScores();
    cache.takersCombinations = calcTakersCombinations();
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
