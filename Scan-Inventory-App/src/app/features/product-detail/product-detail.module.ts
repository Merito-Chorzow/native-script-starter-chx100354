import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { ProductDetailComponent } from "./product-detail.component";

@NgModule({
  imports: [
    NativeScriptRouterModule.forChild([
      { path: "", component: ProductDetailComponent },
    ]),
    ProductDetailComponent,
  ],
})
export class ProductDetailModule {}
