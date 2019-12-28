////
//
// Score calculator class
//
////

class ScoreCalculator {

    static byMakerTaker(maker, taker) {
        var score = 0;
        data.makersTags.forEach(tag => {
            score += (maker.attributes[tag.id] * taker.attributes[tag.id])
        });
        return score;
    }

    static byMakerTakerWithVeto(maker, taker) {
        let BreakException = {};
        try {
            var score = 0;
            data.makersTags.forEach(tag => {
                let x = (maker.attributes[tag.id] * taker.attributes[tag.id]);
                if (x < 0) throw BreakException;
                score += x;
            });
            return score;
        } catch (e) {
            if (e == BreakException) return Number.NEGATIVE_INFINITY;
            throw e;
        }
    }

    static byMakerTakers(maker, takers) {
        var score = 0;
        takers.forEach(taker => {
            score += ScoreCalculator.byMakerTaker(maker, taker)
        });
        return score;
    }

    static byMakerTakersWithVeto(maker, takers) {
        let BreakException = {};
        try {
            var score = 0;
            takers.forEach(taker => {
                let x = ScoreCalculator.byMakerTakerWithVeto(maker, taker);
                if (x < 0) throw BreakException;
                score += x;
            });
            return score;
        } catch (e) {
            if (e == BreakException) return Number.NEGATIVE_INFINITY;
            throw e;
        }
    }

    static byTakerTaker(a, b) {
        var score = 0;
        data.makersTags.concat(data.takersTags).forEach(tag => {
            score += (a.attributes[tag.id] * b.attributes[tag.id])
        });
        return score;
    }

    static byTakerTakerWithVeto(a, b) {
        let BreakException = {};
        try {
            var score = 0;
            data.makersTags.concat(data.takersTags).forEach(tag => {
                let x = (a.attributes[tag.id] * b.attributes[tag.id]);
                if (x < 0) throw BreakException;
                score += x;
            });
            return score;
        } catch (e) {
            if (e == BreakException) return Number.NEGATIVE_INFINITY;
            throw e;
        }
    }

    static byTakers(takers) {
        if (takers.length < 2) return 0;
        var score = 0;
        pairs(takers).forEach(pair => {
            score += ScoreCalculator.byTakerTaker(pair[0], pair[1])
        });
        return score;
    }

    static byTakersWithVeto(takers) {
        if (takers.length < 2) return 0;
        let BreakException = {};
        try {
            var score = 0;
            pairs(takers).forEach(pair => {
                let x = ScoreCalculator.byTakerTakerWithVeto(pair[0], pair[1]);
                if (x < 0) throw BreakException;
                score += x;
            });
            return score;
        } catch (e) {
            if (e == BreakException) return Number.NEGATIVE_INFINITY;
            throw e;
        }
    }

}
