import { Component, Input, OnInit } from '@angular/core';
import { Curso } from 'src/app/interfaces/cursos.interface';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-checkout-card',
  templateUrl: './checkout-card.component.html',
  styleUrls: ['./checkout-card.component.css']
})
export class CheckoutCardComponent {
  @Input() cart!: Curso[];

  public sendContainer = false;

  constructor(private checkoutService: CheckoutService) {}

  ngOnInit(): void {
    // Obtener el carrito del servicio
    this.checkoutService.cartAction$.subscribe((cart) => {
      this.cart = cart;
    });
  }

  public removeFromCart(item: Curso): void {
    this.checkoutService.removeFromCart(item);
  }

}

