import { Component, OnInit, NO_ERRORS_SCHEMA } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService, Product } from "../../services/product.service";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { alert, confirm } from "@nativescript/core";

@Component({
  selector: "app-product-detail",
  standalone: true,
  imports: [NativeScriptCommonModule],
  template: `
    <ActionBar [title]="product?.name || 'Product'" class="action-bar">
      <NavigationButton (tap)="onBack()" text="Back"></NavigationButton>
    </ActionBar>
    <ScrollView class="page">
      <StackLayout class="detail-container" *ngIf="product">
        <Image [src]="product.imageUrl" class="product-image"></Image>
        <Label [text]="product.name" class="detail-title"></Label>
        <Label [text]="'Code: ' + product.code" class="detail-code"></Label>
        <Label
          [text]="product.description"
          class="detail-description"
          textWrap="true"
        ></Label>
        <StackLayout class="status-container">
          <Label text="Status:" class="label-bold"></Label>
          <Label
            [text]="product.status"
            [ngClass]="'status-' + product.status"
            class="status-badge"
          ></Label>
        </StackLayout>
        <StackLayout class="action-buttons">
          <Button text="✎ Edit" (tap)="onEdit()" class="btn-edit"></Button>
          <Button
            text="🗑️ Delete"
            (tap)="onDelete()"
            class="btn-delete"
          ></Button>
        </StackLayout>
      </StackLayout>
    </ScrollView>
  `,
  styleUrls: ["./product-detail.component.css"],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  private productId: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.productId = params["id"];
      this.loadProduct();
    });
  }

  loadProduct() {
    this.productService.getProductById(this.productId).subscribe({
      next: (data: any) => {
        this.product = {
          id: data.id.toString(),
          name: `Product ${data.id}`,
          code: `CODE-${String(data.id).padStart(3, "0")}`,
          description: data.title || data.body,
          imageUrl: `https://via.placeholder.com/300?text=Product${data.id}`,
          status: "available",
          createdAt: new Date(),
        };
      },
      error: (err) => console.error("Error:", err),
    });
  }

  onEdit() {
    alert({
      title: "Edit",
      message: "Edit functionality coming soon",
      okButtonText: "OK",
    });
  }

  onDelete() {
    confirm({
      title: "Delete Product",
      message: "Are you sure?",
      okButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result) {
        this.productService.deleteProduct(this.productId).subscribe({
          next: () => this.router.navigate(["/products"]),
          error: () => console.error("Error deleting"),
        });
      }
    });
  }

  onBack() {
    this.router.navigate(["/products"]);
  }
}
