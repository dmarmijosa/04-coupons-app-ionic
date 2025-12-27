import { Component, inject } from '@angular/core';

import { CouponData } from 'src/app/models/coupon.model';
import { CouponService } from 'src/app/services/coupon.service';
import { plugins } from './plugins';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [...plugins],
})
export class Tab1Page {
  public coupons: CouponData[] = [];
  private couponService = inject(CouponService);
  async ionViewWillEnter() {
    this.coupons = await this.couponService.getCouponDiscount();
    console.log(this.coupons);
  }
  constructor() {}
}
