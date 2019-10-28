db.questionSets.save({
    name: "default",
    questions: [
        {
            id: "1",
            text: "How are you?",
            responseValues: [
                "good",
                "bad"
            ]
        }
    ]
});