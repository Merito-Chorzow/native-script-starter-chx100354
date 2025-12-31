import { Component, OnInit, NO_ERRORS_SCHEMA } from "@angular/core";
import { Router } from "@angular/router";
import { ProductService, Product } from "../../services/product.service";
import { NativeScriptCommonModule } from "@nativescript/angular";

@Component({
  selector: "app-products",
  standalone: true,
  imports: [NativeScriptCommonModule],
  template: `
    <ActionBar title="Inventory" class="action-bar">
      <ActionItem (tap)="onSettings()" ios.position="right">
        <Label text="⚙️"></Label>
      </ActionItem>
    </ActionBar>
    <GridLayout rows="*, auto" class="page">
      <ScrollView row="0">
        <StackLayout class="products-list">
          <Label text="Loading..." *ngIf="loading" class="info-label"></Label>
          <Label
            text="No products found"
            *ngIf="!loading && products.length === 0"
            class="info-label"
          ></Label>
          <StackLayout
            *ngFor="let product of products"
            (tap)="onProductSelect(product.id)"
            class="product-item"
          >
            <Label [text]="product.name" class="product-name"></Label>
            <Label
              [text]="'Code: ' + product.code"
              class="product-code"
            ></Label>
            <Label
              [text]="product.status"
              [ngClass]="'status-' + product.status"
              class="product-status"
            ></Label>
          </StackLayout>
        </StackLayout>
      </ScrollView>
      <Button
        row="1"
        text="+ Add Product"
        (tap)="onAddProduct()"
        class="btn-add"
      ></Button>
    </GridLayout>
  `,
  styleUrls: ["./products.component.css"],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  loading = true;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data: any) => {
        this.products = data.slice(0, 5).map((item: any, index: number) => ({
          id: item.id.toString(),
          name: `Product ${item.id}`,
          code: `CODE-${String(item.id).padStart(3, "0")}`,
          description: item.title,
          imageUrl: `https://via.placeholder.com/150?text=Product${item.id}`,
          status: ["available", "pending", "archived"][index % 3],
          createdAt: new Date(),
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error("Error:", err);
        this.loading = false;
      },
    });
  }

  onProductSelect(id: string) {
    this.router.navigate(["/product", id]);
  }

  onAddProduct() {
    this.router.navigate(["/add-product"]);
  }

  onSettings() {
    this.router.navigate(["/settings"]);
  }
}
