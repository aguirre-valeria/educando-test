import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { Curso } from 'src/app/interfaces/cursos.interface';
import { CheckoutService } from 'src/app/services/checkout.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public sendContainer = false;

  cursos!: Curso[];

  public sendEmail(e: Event): void {
    this.sendContainer = true;
    e.preventDefault();
    emailjs.sendForm('service_s2i6tdl', 'template_3nwt1ms', e.target as HTMLFormElement, 'sV9Ajqlig0lkp_0dX')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }

  // traigo variable de service
  quantity$ = this.checkoutService.quantityAction$;
  total$ = this.checkoutService.totalAction$;
  cart$ = this.checkoutService.cartAction$;

  discount!: number;
  // traigo el service
  constructor(private checkoutService: CheckoutService, private router: Router) {}


  ngOnInit(): void {
    // console.log('Inicializando CheckoutComponent');
    // scroll hacia el top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.discount = this.checkoutService.getDiscount();
    this.checkoutService.loadCartFromLocalStorage();
    this.cursos = this.checkoutService.cursos; // Asigna los cursos a this.cursos
    // console.log('Cursos en el componente:', this.cursos);
    this.cart$ = this.checkoutService.cartAction$;

    this.cart$.subscribe((cart) => {
      // console.log('Cursos en el componente:', cart);
    });
  }

  showLoginPopup() {
    Swal.fire({
      title: 'Finalizar compra',
      html: 'Inicia sesión o regístrate para finalizar la compra.',
      showCloseButton: true,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Iniciar sesión',
      cancelButtonText: 'Registrarse',
    }).then((result) => {
      // Verificar qué botón se hizo clic
      if (result.isConfirmed) {
        // Botón de inicio de sesión
        this.router.navigate(['/login']);
      } else  {
        // Botón de registro
        this.router.navigate(['/registro']);
      }
    });
  }


}

