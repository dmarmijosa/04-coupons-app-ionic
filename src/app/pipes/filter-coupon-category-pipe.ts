import { Pipe, PipeTransform } from '@angular/core';
import { Coupon, CouponData } from '../models/coupon.model';

@Pipe({
  name: 'filterCouponCategory',
})
export class FilterCouponCategoryPipe implements PipeTransform {
  transform(coupons: CouponData[], category: string): CouponData[] {
    return coupons.filter((coupon) => coupon.category === category);
  }
}
