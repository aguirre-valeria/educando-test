import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Curso } from 'src/app/interfaces/cursos.interface';
import { CursosService } from '../../../services/cursos.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Categoria } from 'src/app/interfaces/categoria.interface';


interface RouteParams {
  //category: string;
  idCategoria: string;
  idCurso: string;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnInit {
  routeParams!: RouteParams;
  idDetail!: string;
  curso!: Curso;
  categoriaDetalle!: Categoria;
  idCategoria!: number;
  nombreCategoria!: string

  onClick(): void {
    this.checkoutService.updateCart(this.curso);
  }

  constructor(
    private route: ActivatedRoute,
    private cursosService: CursosService,
    private checkoutService: CheckoutService
  ) {  }

  ngOnInit(): void {
    console.log("arrasandooooo")
    this.route.params.subscribe(params => {
      const idCategoria = params['idCategoria'];
      console.log(idCategoria)
      const idCurso = params['idCurso'];
      console.log(idCurso)

      this.idCategoria = Number(idCategoria);
      this.idDetail = idCurso;

      this.cursosService.getCursos().subscribe({
        next: (cursos: any) => {
          this.curso = cursos.find(
            (curso: Curso) =>
              curso.id_curso.toString() === this.idDetail &&
              curso.id_categoria === this.idCategoria
          );
          console.log('Datos del curso:', this.curso);
        },
        error: (errorData) => {
          console.error(errorData);
        }
      });

      this.cursosService.getCategorias().subscribe({
        next: (categorias: any) => {
          const categoriaEncontrada = categorias.find(
            (categoria: Categoria) => categoria.id_categoria === this.idCategoria
          );
          if (categoriaEncontrada) {
            this.nombreCategoria = categoriaEncontrada.nombre;
            console.log('Nombre de la categoría:', this.nombreCategoria);
          }
        },
        error: (errorData) => {
          console.error(errorData);
        }
      });
  })
}
}


    /* this.idDetail = this.route.snapshot.paramMap.get('idCurso')!;
    // console.log(this.idDetail)
    this.cursosService.getCursos().subscribe({
      next: (cursos: any) => {
      this.curso = cursos;
      console.log(this.curso)

      this.curso = cursos.find((curso: Curso) => curso.id_curso.toString() === this.idDetail,
        //console.log(this.idDetail)
      );
      if (this.curso) {
        this.idCategoria = this.curso.id_categoria;
        console.log(this.idCategoria);
        this.cursosService.getCategorias().subscribe({
          next: (categorias: any) => {
            const categoriaEncontrada = categorias.find((categoria: Categoria) => categoria.id_categoria === this.idCategoria);
            console.log(categoriaEncontrada)
            if (categoriaEncontrada) {
              const nombreCategoria = categoriaEncontrada.nombre;
              this.nombreCategoria = nombreCategoria;
              console.log(this.nombreCategoria);
            }
          },
          error: (errorData) => {
            console.error(errorData);
          }
        });
      }


      // console.log(this.curso.name)
    },
    error: (errorData) => {
      console.error(errorData);
    }});
  } */



/* this.idDetail = this.route.snapshot.paramMap.get('id')!;
// console.log(this.idDetail)
this.cursosService.getCursos().subscribe({
  next: (cursos: any) => {
  this.curso = cursos;
  // console.log(this.curso)
  // this.idCategoria = cursos.id_categoria;

  // console.log(this.idCategoria)
  this.curso = cursos.find(
    (curso: Curso) =>
    curso.id_curso.toString() === this.idDetail &&
    curso.id_categoria === this.idCategoria,
    console.log(this.idDetail && this.idCategoria)
  );
  // console.log(this.curso.name)
},
error: (errorData) => {
  console.error(errorData);
}});
} */
