import { Component, OnInit, NO_ERRORS_SCHEMA } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { Router } from "@angular/router";
import { NativeScriptCommonModule } from "@nativescript/angular";

@Component({
  selector: "app-settings",
  standalone: true,
  imports: [NativeScriptCommonModule],
  template: `
    <ActionBar title="Settings" class="action-bar">
      <NavigationButton (tap)="onBack()" text="Back"></NavigationButton>
    </ActionBar>
    <ScrollView class="page">
      <StackLayout class="settings-container">
        <StackLayout class="setting-group">
          <Label text="Offline Mode" class="setting-label"></Label>
          <Switch
            [checked]="offlineMode$ | async"
            (checkedChange)="toggleOfflineMode($event)"
            class="setting-switch"
          ></Switch>
        </StackLayout>

        <StackLayout class="setting-group">
          <Label text="App Version: 1.0.0" class="setting-info"></Label>
          <Label text="© 2025 Scan Inventory" class="setting-info"></Label>
        </StackLayout>

        <Button
          text="Clear Cache"
          (tap)="onClearCache()"
          class="btn-secondary"
        ></Button>
      </StackLayout>
    </ScrollView>
  `,
  styleUrls: ["./settings.component.css"],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SettingsComponent implements OnInit {
  offlineMode$ = this.productService.getOfflineMode();

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {}

  toggleOfflineMode(value: boolean) {
    this.productService.toggleOfflineMode(value);
  }

  onClearCache() {
    console.log("Cache cleared");
  }

  onBack() {
    this.router.navigate(["/products"]);
  }
}
