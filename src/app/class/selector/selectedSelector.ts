import {Table} from "../table/table";
import {Pos} from "./pos";
import {Selector} from "./selector";

export class SelectedSelector extends Selector {
    constructor(words: string[]) {
        super(1);
    }

    select(table: Table): Pos[] {
        return [table.select];
    }
}