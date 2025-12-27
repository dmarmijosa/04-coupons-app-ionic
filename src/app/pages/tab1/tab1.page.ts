import {
  CapacitorBarcodeScannerTypeHint,
  CapacitorBarcodeScannerScanResult,
} from '@capacitor/barcode-scanner';
import { Component, inject } from '@angular/core';

import { CouponData } from 'src/app/models/coupon.model';
import { CouponService } from 'src/app/services/coupon.service';
import { plugins } from './plugins';
import { FilterCouponCategoryPipe } from 'src/app/pipes/filter-coupon-category-pipe';

import { CouponCardComponent } from './coupon-card/coupon-card.component';
import { addIcons } from 'ionicons';
import { cameraOutline } from 'ionicons/icons';
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [...plugins, FilterCouponCategoryPipe, CouponCardComponent],
})
export class Tab1Page {
  public coupons: CouponData[] = [];
  private couponService = inject(CouponService);
  constructor() {
    addIcons({
      cameraOutline,
    });
  }
  async ionViewWillEnter() {
    this.coupons = await this.couponService.getCouponDiscount();
  }

  async toggleCouponStatus(coupon: CouponData) {
    coupon.active = !coupon.active;
    await this.couponService.saveCoupons(this.coupons);
  }

  startCameraScan() {
    // Lógica para iniciar la cámara y escanear códigos QR
    CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.QR_CODE,
    }).then((result: CapacitorBarcodeScannerScanResult) => {
      if (result.ScanResult) {
        const couponData = JSON.parse(result.ScanResult) as CouponData[];
        couponData.forEach((scannedCoupon) => {
          const existingCoupon = this.coupons.find(
            (c) => c.idProduct === scannedCoupon.idProduct
          );
          if (existingCoupon) {
            existingCoupon.active = true;
          }
        });
        this.couponService.saveCoupons(this.coupons);
      }
    });
  }
}
