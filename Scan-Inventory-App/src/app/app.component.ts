import { Component, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "@nativescript/angular";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [NativeScriptRouterModule],
  template: `<page-router-outlet></page-router-outlet>`,
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppComponent {}
