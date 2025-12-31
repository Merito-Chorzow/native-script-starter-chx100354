import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { ProductsComponent } from "./products.component";

@NgModule({
  imports: [
    NativeScriptRouterModule.forChild([
      { path: "", component: ProductsComponent },
    ]),
    ProductsComponent,
  ],
})
export class ProductsModule {}
