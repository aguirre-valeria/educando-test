import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private autenticacionService: AuthService, private router: Router) {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]+$')]],
      passwordConfirmation: ['', Validators.required],
      id_rol_id: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  get control() {
    return this.registroForm.controls;
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const passwordConfirmation = control.get('passwordConfirmation')?.value;
    return password === passwordConfirmation ? null : { validateEqual: true };
  }

  onSubmit() {
    if (this.registroForm.invalid) {
      return;
    }

    const formData = { ...this.registroForm.value };
    console.log(formData)
    delete formData.passwordConfirmation;

    this.autenticacionService.registrarUsuario(formData).subscribe(
      (response) => {
        console.log('Registro exitoso');
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
            text: '¡Ya puedes iniciar sesión!',
          });
        // localStorage.setItem('accessToken', response.token);
        // Realizar acciones adicionales, como redirigir al usuario a la página de inicio de sesión
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error en el registro:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Error en el registro!',
        })
      }
    );
  }
}
