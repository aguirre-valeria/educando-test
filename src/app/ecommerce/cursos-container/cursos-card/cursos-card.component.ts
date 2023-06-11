import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Curso } from 'src/app/interfaces/cursos.interface';
import { CheckoutService } from 'src/app/services/checkout.service';
import { CursosService } from 'src/app/services/cursos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cursos-card',
  templateUrl: './cursos-card.component.html',
  styleUrls: ['./cursos-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CursosCardComponent {
  @Input() curso!: Curso;

  @Output() addToCartClick = new EventEmitter<Curso>();

  constructor(private cursosService: CursosService, private checkoutService: CheckoutService, private router: Router) {}

  onClick(): void {
    const addedToCart = this.checkoutService.isCourseInCart(this.curso);
    if (addedToCart) {
      Swal.fire({
        icon: 'warning',
        title: 'Curso ya agregado',
        html: `
          <div>${this.curso.nombre_curso}</div>
          <div class="text-muted">El curso ya está en el carrito de compra</div>
        `,
        showConfirmButton: true,
        confirmButtonText: 'Finalizar compra',
        showCancelButton: true,
        cancelButtonText: 'Volver'
      }).then((result) => {
        if (result.isConfirmed) {
          // Redireccionar al carrito de compras
          this.router.navigate(['/cursos/checkout']);
        }});
    } else {
      Swal.fire({
        icon: 'success',
        title: '¡Curso agregado!',
        html: `
          <div class="text-center">
            <img src="${this.curso.imagen_url}" alt="${this.curso.nombre_curso}" width="100">
            <p>${this.curso.nombre_curso}</p>
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Ir al carrito',
        cancelButtonText: 'Seguir comprando',
      }).then((result) => {
        if (result.isConfirmed) {
          // Redireccionar al carrito de compras
          this.router.navigate(['/cursos/checkout']);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Continuar comprando
        }
      });
      this.addToCartClick.emit(this.curso);
    }
  }

  /* onClick(): void {

    // Llamo al evento y emito enviandole el producto
    this.addToCartClick.emit(this.curso);

    Swal.fire({
      icon: 'success',
      title: '¡Curso agregado!',
      html: `
        <div class="text-center">
          <img src="${this.curso.imagen_url}" alt="${this.curso.nombre_curso}" width="100">
          <p>${this.curso.nombre_curso}</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Ir al carrito',
      cancelButtonText: 'Seguir comprando',
    }).then((result) => {
      if (result.isConfirmed) {
        // Redireccionar al carrito de compras
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Continuar comprando
      }
    });
  } */
}
