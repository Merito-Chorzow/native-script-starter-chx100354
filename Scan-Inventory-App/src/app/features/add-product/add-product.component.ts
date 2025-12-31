import { Component, NO_ERRORS_SCHEMA } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { CameraService } from "../../services/camera.service";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { alert } from "@nativescript/core";

@Component({
  selector: "app-add-product",
  standalone: true,
  imports: [NativeScriptCommonModule, ReactiveFormsModule],
  template: `
    <ActionBar title="Add Product" class="action-bar">
      <NavigationButton (tap)="onBack()" text="Back"></NavigationButton>
    </ActionBar>
    <ScrollView class="page">
      <StackLayout class="form-container" [formGroup]="form">
        <Image
          *ngIf="capturedImage"
          [src]="capturedImage"
          class="captured-image"
        ></Image>
        <StackLayout class="camera-buttons">
          <Button
            text="📷 Take Photo"
            (tap)="onTakePhoto()"
            class="btn-camera"
          ></Button>
          <Button
            text="🖼️ Pick from Gallery"
            (tap)="onPickGallery()"
            class="btn-camera"
          ></Button>
        </StackLayout>

        <TextField
          formControlName="name"
          hint="Product Name"
          class="input-field"
        ></TextField>
        <Label
          *ngIf="form.get('name')?.invalid && form.get('name')?.touched"
          text="Name required"
          class="error-message"
        ></Label>

        <TextField
          formControlName="code"
          hint="Product Code"
          class="input-field"
        ></TextField>
        <Label
          *ngIf="form.get('code')?.invalid && form.get('code')?.touched"
          text="Code required"
          class="error-message"
        ></Label>

        <TextView
          formControlName="description"
          hint="Description"
          rows="4"
          class="input-field"
        ></TextView>

        <Button
          text="Save Product"
          (tap)="onSave()"
          [isEnabled]="form.valid"
          class="btn-save"
        ></Button>
      </StackLayout>
    </ScrollView>
  `,
  styleUrls: ["./add-product.component.css"],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AddProductComponent {
  form: FormGroup;
  capturedImage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private cameraService: CameraService
  ) {
    this.form = this.fb.group({
      name: ["", Validators.required],
      code: ["", Validators.required],
      description: [""],
    });
  }

  async onTakePhoto() {
    const image = await this.cameraService.captureImage();
    if (image) {
      this.capturedImage = image;
      alert({
        title: "Success",
        message: "Photo captured",
        okButtonText: "OK",
      });
    }
  }

  async onPickGallery() {
    const image = await this.cameraService.pickFromGallery();
    if (image) {
      this.capturedImage = image;
      alert({
        title: "Success",
        message: "Image selected",
        okButtonText: "OK",
      });
    }
  }

  onSave() {
    if (this.form.valid) {
      const newProduct = {
        name: this.form.value.name,
        code: this.form.value.code,
        description: this.form.value.description,
        imageUrl:
          this.capturedImage || "https://via.placeholder.com/150?text=NoImage",
        status: "pending",
      };

      this.productService.addProduct(newProduct).subscribe({
        next: () => {
          alert({
            title: "Success",
            message: "Product added",
            okButtonText: "OK",
          });
          this.router.navigate(["/products"]);
        },
        error: () =>
          alert({
            title: "Error",
            message: "Failed to add",
            okButtonText: "OK",
          }),
      });
    }
  }

  onBack() {
    this.router.navigate(["/products"]);
  }
}
