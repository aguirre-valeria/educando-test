import { Component } from '@angular/core';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { Curso } from 'src/app/interfaces/cursos.interface';
import { CheckoutService } from 'src/app/services/checkout.service';
import { CursosService } from 'src/app/services/cursos.service';

const bootstrapColors = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'light',
  'dark'
];

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent {
  total$ = this.checkoutService.totalAction$;
  categorias: Categoria | any | null;
  cursos: Curso | any | null;
  cursosFiltrados: Curso | any | null;
  sinCursos: boolean = false;
  tituloCursos: string = 'Todos nuestros cursos';

  constructor(private checkoutService: CheckoutService, private cursosService: CursosService) {}

  ngOnInit(): void {
    this.getCategorias();
    this.getCursos();
  }

  getCategorias(): void {
    this.cursosService.getCategorias().subscribe(
      (categorias: Categoria) => {
        const categoriasArray = Object.values(categorias);
        this.categorias = categoriasArray.map((categoria:any, index:number) => ({
          ...categoria,
          colorClass: 'btn-' + bootstrapColors[index % bootstrapColors.length]
        }));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCursos(): void {
    this.cursosService.getCursos().subscribe(
      (cursos: Curso) => {
        const cursosArray = Object.values(cursos);
        this.cursos = cursosArray;
        this.cursosFiltrados = cursos;
      },
      (error) => {
        console.log(error);
      }
    );
  }

   filtrarCursosPorCategoria(idCategoria: number): void {
    if (idCategoria === 0) {
      console.log(idCategoria);
      // Si se selecciona la opción "Todas las categorías", mostrar todos los cursos
      this.cursosFiltrados = this.cursos;
      this.tituloCursos = 'Todos nuestros cursos';
      this.sinCursos = false;
    } else {
      console.log(idCategoria);
      // Filtrar los cursos por la categoría seleccionada
      this.cursosService.getCursosPorCategoria(idCategoria).subscribe(
        (cursos: Curso) => {
          this.cursosFiltrados = cursos;
          console.log(this.cursosFiltrados);
          this.sinCursos = this.cursosFiltrados.length === 0;
          console.log(this.sinCursos)
          const categoriaSeleccionada = this.categorias.find((categoria: Categoria) => categoria.id_categoria === idCategoria);
          if (categoriaSeleccionada) {
            this.tituloCursos = `Nuestros cursos de ${categoriaSeleccionada.nombre}`;
          } else {
            this.tituloCursos = 'Nuestros cursos';
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  mostrarTodosLosCursos(): void {
    this.cursosFiltrados = this.cursos;
    this.tituloCursos = 'Todos nuestros cursos';
  }


  /* filtrarCursosPorCategoria(idCategoria: number | null): void {
    if (idCategoria) {
      console.log(this.cursos.id_categoria)
      this.cursosFiltrados = this.cursos.filter((curso: Curso) => curso.id_categoria === idCategoria);
    } else {
      this.cursosFiltrados = this.cursos;
    }
    console.log('Cursos filtrados:', this.cursosFiltrados);
  } */


}
