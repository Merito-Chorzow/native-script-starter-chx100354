import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { AddProductComponent } from "./add-product.component";

@NgModule({
  imports: [
    NativeScriptRouterModule.forChild([
      { path: "", component: AddProductComponent },
    ]),
    AddProductComponent,
  ],
})
export class AddProductModule {}
