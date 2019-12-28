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

    static byTakers(a, b) {
        var score = 0;
        data.makersTags.concat(data.takersTags).forEach(tag => {
            score += (a.attributes[tag.id] * b.attributes[tag.id]);
        });
        return score;
    }

}
