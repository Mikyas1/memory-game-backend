const uuid = require("uuid")
const Cards = require("../domain/Cards");


const InMemoryDb = [];


const getCards = ((req, res, next) => {
    let results = [];
    const level = req.params.level;
    const cards = new Cards.RandUniqueCards({
        level
    })

    // this should be refactored to a service layer
    cards.generate();

    const fullArr = [...cards.cards, ...cards.cards];

    // let arr1 = Cards.Shuffle(cards.cards);
    // let arr2 = Cards.Shuffle(arr1);
    // results = [...arr1, ...arr2];
    results = Cards.Shuffle(fullArr);

    results = results.map(c => new Cards.Cards(c));

    res.send({cards: results, level: cards.level});
});

const saveGameStatus = (req, res, next) => {
    const game_status = req.body;
    const userId = uuid.v4();
    InMemoryDb.push({
        userId,
        game_status
    })
    res.send({status: "ok", userId})
}

const GetSavedGameStatus = (req, res, next) => {
    const userId = req.params.userId;
    const stat = InMemoryDb.find(d => d.userId === userId);
    if(stat) {
        res.send(stat.game_status)
    }
    res.status(404).send("");
}

exports.getCards = getCards;
exports.saveGameStatus = saveGameStatus;
exports.GetSavedGameStatus = GetSavedGameStatus;