import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "/products", pathMatch: "full" },
  {
    path: "products",
    loadChildren: () =>
      import("./features/products/products.module").then(
        (m) => m.ProductsModule
      ),
  },
  {
    path: "product/:id",
    loadChildren: () =>
      import("./features/product-detail/product-detail.module").then(
        (m) => m.ProductDetailModule
      ),
  },
  {
    path: "add-product",
    loadChildren: () =>
      import("./features/add-product/add-product.module").then(
        (m) => m.AddProductModule
      ),
  },
  {
    path: "settings",
    loadChildren: () =>
      import("./features/settings/settings.module").then(
        (m) => m.SettingsModule
      ),
  },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
