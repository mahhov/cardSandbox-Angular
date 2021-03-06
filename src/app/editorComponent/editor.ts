import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {Script} from "../class/script";
import {AuthenticationService} from "../service/authenticationService";
import {ScriptEditorService} from "../service/scriptEditorService";
import {TableCreatorService} from "../service/tableCreatorService";

@Component({
    selector: 'editor',
    templateUrl: './editor.html',
    styleUrls: ['../style/editor.scss']
})

export class Editor {
    scriptList: Script[];
    selectedScript: number;
    editingScriptName: string;
    editingScriptBody: string;

    constructor(private router: Router, private authenticationService: AuthenticationService, private scriptEditorService: ScriptEditorService, private tableCreatorService: TableCreatorService) {
        if (!this.authenticationService.getToken())
            this.router.navigate(['/login']);

        this.scriptList = this.scriptEditorService.getScriptList();
        this.selectedScript = 0;
    }

    newScript(): void {
        this.scriptEditorService.add(this.editingScriptName);
    }

    editScript(): void {
        this.editingScriptName = this.scriptList[this.selectedScript].name;
        this.editingScriptBody = this.scriptList[this.selectedScript].getScriptString();
    }

    saveScript(): void {
        this.scriptEditorService.update(this.editingScriptName, this.editingScriptBody);
    }

    deleteScript(): void {
        this.scriptEditorService.remove(this.editingScriptName);
    }

    demoScript(): void {
        let demoScript: Script;
        if (this.editingScriptBody) {
            demoScript = new Script(this.editingScriptName, null, null);
            demoScript.setScriptString(this.editingScriptBody);
        } else
            demoScript = this.scriptList[this.selectedScript];

        this.tableCreatorService.setDemoScript(demoScript);
        this.router.navigate(['/table']);
    }
}