import { Component, inject } from '@angular/core';

import { CouponData } from 'src/app/models/coupon.model';
import { CouponService } from 'src/app/services/coupon.service';
import { plugins } from './plugins';
import { FilterCouponCategoryPipe } from 'src/app/pipes/filter-coupon-category-pipe';

import {} from '@ionic/angular/standalone';
import { CouponCardComponent } from './coupon-card/coupon-card.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [...plugins, FilterCouponCategoryPipe, CouponCardComponent],
})
export class Tab1Page {
  public coupons: CouponData[] = [];
  private couponService = inject(CouponService);
  async ionViewWillEnter() {
    this.coupons = await this.couponService.getCouponDiscount();
  }

  async toggleCouponStatus(coupon: CouponData) {
    coupon.active = !coupon.active;
    await this.couponService.saveCoupons(this.coupons);
  }
}
