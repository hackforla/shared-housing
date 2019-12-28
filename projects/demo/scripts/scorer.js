////
//
// Score calculator class
//
////

class ScoreCalculator {

    static byMakerTaker(a, b) {
        var score = 0;
        data.makersTags.forEach(tag => {
            score += (a.attributes[tag.id] * b.attributes[tag.id]);
        });
        return score;
    }

    static byTakerTaker(a, b) {
        var score = 0;
        data.makersTags.concat(data.takersTags).forEach(tag => {
            score += (a.attributes[tag.id] * b.attributes[tag.id]);
        });
        return score;
    }

    static byTakers(takers) {
        if (takers.length < 2) return 0;
        var score = 0;
        pairs(takers).forEach(pair => {
            score += ScoreCalculator.byTakerTaker(pair[0], pair[1]);
        });
        return score;
    }

}
