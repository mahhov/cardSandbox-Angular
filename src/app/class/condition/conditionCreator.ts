import {ColorSame} from "./colorSame";
import {Condition} from "./condition";
import {Empty} from "./empty";
import {IsTop} from "./isTop";
import {NumericDif} from "./numericDif";
import {NumericEqual} from "./numericEqual";
import {ProperSolitaireStack} from "./properSolitaireStack";
import {SuitEqual} from "./suitEqual";
import {SuitSame} from "./suitSame";

export class ConditionCreator {
    static create(words: string[], not: boolean): Condition {
        switch (words[0]) {
            case 'empty':
                return new Empty(words, not);
            case 'suitsame':
                return new SuitSame(words, not);
            case 'suitequal':
                return new SuitEqual(words, not);
            case 'numericequal':
                return new NumericEqual(words, not);
            case 'numericdif':
                return new NumericDif(words, not);
            case 'colorsame':
                return new ColorSame(words, not);
            case 'istop':
                return new IsTop(words, not);
            case 'propersolitairestack':
                return new ProperSolitaireStack(words, not);
            default:
                return null;
        }
    }
}