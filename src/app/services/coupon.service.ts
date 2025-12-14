import { Injectable } from '@angular/core';
import { CouponData } from '../models/coupon.model';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  getCouponDiscount(): Promise<CouponData[]> {
    return fetch('./assets/data/coupons.json').then(async (res) => {
      const data = await res.json();
      return data;
    });
  }
}
