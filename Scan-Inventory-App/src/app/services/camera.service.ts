import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class CameraService {
  async captureImage(): Promise<string | null> {
    try {
      return "https://via.placeholder.com/300?text=CapturedPhoto";
    } catch (err) {
      console.error("Camera capture error:", err);
      return null;
    }
  }

  async pickFromGallery(): Promise<string | null> {
    try {
      return "https://via.placeholder.com/300?text=GalleryPhoto";
    } catch (err) {
      console.error("Gallery pick error:", err);
      return null;
    }
  }
}
