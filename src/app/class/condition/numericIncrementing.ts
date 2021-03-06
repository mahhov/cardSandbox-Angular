import * as _ from "underscore";
import {Pos} from "../selector/pos";
import {Selector} from "../selector/selector";
import {SelectorCreator} from "../selector/selectorCreator";
import {Card} from "../table/card";
import {Deck} from "../table/deck";
import {Table} from "../table/table";
import {Condition} from "./condition";

export class NumericIncrementing extends Condition {
    selector: Selector;
    delta: number;

    constructor(words: string[], not: boolean) {
        super(not);
        this.selector = SelectorCreator.create(_.rest(words));
        this.delta = parseInt(words[this.selector.consumed + 1]);
    }

    verifyValue(table: Table): boolean {
        let poss: Pos[] = this.selector.select(table);
        let deck: Deck = table.findDeck(poss[0].x, poss[0].y);

        let prevCard: Card;
        return _.every(poss, (pos: Pos, index: number): boolean => {
            let curCard = deck.getCard(pos.order);
            if (prevCard && prevCard.num - curCard.num !== this.delta)
                return false;
            prevCard = curCard;
            return true;
        });
    }
}