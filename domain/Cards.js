const uuid = require("uuid")

class Cards {
    constructor(props) {
        this.type = props.type;
        this.value = props.value;
        this.solved = false;
        this.id = uuid.v4();
        this.cardId = this.type + "" + this.value;
    }

}

class RandUniqueCards {
    constructor(props) {
        this.level = props.level > 20 ? 20 : props.level;
        this.cards = [];
    }

    addToCards(newCard) {
        // If new card is not in this.cards push and return true else return false;
        let exists = this.cards.some(c => c.cardId === newCard.cardId);
        if (!exists) {
            this.cards.push(newCard);
            return true;
        }
        return false;
    }


    randGenerator() {
        let added = this.addToCards(new Cards(
            {
                type: randomIntFromInterval(1, 4),
                value: randomIntFromInterval(1, 13),
            }));
        if (!added) {
            this.randGenerator()
        } else {
            return;
        }
    }

    generate() {
        for (let i = 0; i < this.level; i++) {
            this.randGenerator();
        }
    }

}


const Shuffle = (cards) => {
    let array = [...cards];
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

exports.RandUniqueCards = RandUniqueCards;
exports.Shuffle = Shuffle;
exports.Cards = Cards;