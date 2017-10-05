import * as _ from 'underscore';
import {Deck} from './deck';
import {Pos} from './pos';
import {Interact, Then} from './interact';

export class Table {
    width: number;
    height: number;
    deck: Deck[] = [];
    interact: Interact[] = [];
    highlight: Pos[] = [];

    static readonly possibleDeckContain: string[] = ['empty', 'full'];
    static readonly possibleDeckOrder: string[] = ['order', 'shuffle'];
    static readonly possibleDeckVisibility: string[] = ['visible', 'hidden'];

    static readonly fullDeck: string[] = ((): string[] => {
        let prod: string[] = [];
        _.each(['c', 'd', 's', 'h'], (suit: string): void => {
            _.each(_.range(13), (num: number): void => {
                prod.push(suit + num);
            });
        });
        return prod;
    })();

    setSize(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }

    addDeck(deck: Deck): void {
        this.deck.push(deck);
    }

    addInteract(interact: Interact): void {
        this.interact.push(interact);
    }

    handleClick(coord: Pos): void {
        _.each(this.interact, (interact): void => {
            if (interact.whenX === coord.x && interact.whenY === coord.y)
                this.handleIntersection(interact);
        })
    }

    handleMouse(coord: Pos): void {
        this.highlight = [];
        _.each(this.interact, (interact): void => {
            if (interact.whenX === coord.x && interact.whenY === coord.y)
                this.highlight.push(coord);
        })
    }

    private handleIntersection(interact: Interact): void {
        _.each(interact.then, (then: Then): void => {
            let fromDeck: Deck = this.findDeck(then.fromX, then.fromY);
            let toDeck: Deck = this.findDeck(then.toX, then.toY);
            let fromCard: string = fromDeck.removeCard(then.fromOrder);
            toDeck.addCard(fromCard, then.toOrder);
        });
    }

    private findDeck(x: number, y: number): Deck {
        return _.find(this.deck, (deck: Deck): boolean => {
            return deck.x === x && deck.y === y;
        });
    }
}