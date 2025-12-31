import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { SettingsComponent } from "./settings.component";

@NgModule({
  imports: [
    NativeScriptRouterModule.forChild([
      { path: "", component: SettingsComponent },
    ]),
    SettingsComponent,
  ],
})
export class SettingsModule {}
