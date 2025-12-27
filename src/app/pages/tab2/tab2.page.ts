import {
  Component,
  inject,
  signal,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonText,
  IonNote,
  IonSpinner,
} from '@ionic/angular/standalone';
import { CouponService } from '../../services/coupon.service';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    QRCodeComponent,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonText,
    IonNote,
    IonSpinner,
  ],
})
export class Tab2Page {
  private couponService = inject(CouponService);

  // Estado reactivo con signal
  private coupons = signal<any[]>([]);
  isLoading = signal(false);

  // Derivado: cupones activos
  activeCoupons = computed(() =>
    this.coupons().filter((coupon) => coupon.active)
  );

  // Derivado: QR code (solo genera si hay cupones activos)
  QrCode = computed(() => {
    const active = this.activeCoupons();
    return active.length > 0 ? JSON.stringify(active) : '';
  });

  // Derivado: conteo de cupones activos
  activeCount = computed(() => this.activeCoupons().length);

  async ionViewWillEnter() {
    // Recarga cada vez que entras a la página (sincronización en tiempo real)
    await this.loadCoupons();
  }

  private async loadCoupons() {
    this.isLoading.set(true);
    try {
      const allCoupons = await this.couponService.getCouponDiscount();
      this.coupons.set(allCoupons); // Actualiza el signal
    } catch (error) {
      console.error('Error loading coupons:', error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
