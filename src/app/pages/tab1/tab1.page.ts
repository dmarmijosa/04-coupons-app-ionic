import { Component, inject } from '@angular/core';

import { CouponData } from 'src/app/models/coupon.model';
import { CouponService } from 'src/app/services/coupon.service';
import { plugins } from './plugins';
import { FilterCouponCategoryPipe } from 'src/app/pipes/filter-coupon-category-pipe';
import { JsonPipe } from '@angular/common';
import {} from '@ionic/angular/standalone';
import { CouponCardComponent } from './coupon-card/coupon-card.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    ...plugins,
    FilterCouponCategoryPipe,
    JsonPipe,
    CouponCardComponent,
  ],
})
export class Tab1Page {
  public coupons: CouponData[] = [];
  private couponService = inject(CouponService);
  async ionViewWillEnter() {
    this.coupons = await this.couponService.getCouponDiscount();
    console.log(this.coupons);
  }

  toggleCouponStatus(coupon: CouponData) {
    coupon.active = !coupon.active;

    console.log(coupon.active);
  }
}
