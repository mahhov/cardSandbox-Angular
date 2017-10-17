import * as _ from "underscore";
import {Pos} from "../selector/pos";
import {Selector} from "../selector/selector";
import {SelectorCreator} from "../selector/selectorCreator";
import {Card} from "../table/card";
import {Deck} from "../table/deck";
import {Table} from "../table/table";
import {Condition} from "./condition";

export class ProperSolitaireStack extends Condition {
    selector: Selector;

    constructor(words: string[], not: boolean) {
        super(not);
        this.selector = SelectorCreator.create(_.rest(words));
    }

    verifyValue(table: Table): boolean {
        let poss: Pos[] = this.selector.select(table);
        let deck: Deck = table.findDeck(poss[0].x, poss[0].y);

        let prevCard: Card;
        console.log('begin', poss);
        return _.every(poss, (pos: Pos, index: number): boolean => {
            let curCard = deck.getCard(pos.order);
            console.log('checking ', curCard);
            if (prevCard && (curCard.isRed() === prevCard.isRed() || prevCard.num - curCard.num !== 1))
                return false;
            prevCard = curCard;
            return true;
        });
    }
}