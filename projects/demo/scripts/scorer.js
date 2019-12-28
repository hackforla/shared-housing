////
//
// Score calculator class
//
////

class ScoreCalculator {

    static byMakerTaker(maker, taker) {
        var score = 0;
        data.makersTags.forEach(tag => score += (maker.attributes[tag.id] * taker.attributes[tag.id]));
        return score;
    }

    static byMakerTakers(maker, takers) {
        var score = 0;
        takers.forEach(taker => score += ScoreCalculator.byMakerTaker(maker, taker));
        return score;
    }

    static byTakerTaker(a, b) {
        var score = 0;
        data.makersTags.concat(data.takersTags).forEach(tag => score += (a.attributes[tag.id] * b.attributes[tag.id]));
        return score;
    }

    static byTakers(takers) {
        if (takers.length < 2) return 0;
        var score = 0;
        pairs(takers).forEach(pair => score += ScoreCalculator.byTakerTaker(pair[0], pair[1]));
        return score;
    }

}
