/* import { Component, ElementRef, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Curso } from 'src/app/interfaces/cursos.interface';
import { CursosService } from 'src/app/services/cursos.service';
import KeenSlider, { KeenSliderInstance, KeenSliderPlugin } from "keen-slider";

function ThumbnailPlugin(main: KeenSliderInstance): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      console.log(slider)
      slider.slides.forEach((slide) => {
        slide.classList.remove("active")
      })
    }
    function addActive(idx: number) {
      slider.slides[idx].classList.add("active")
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          main.moveToIdx(idx)
        })
      })
    }

    slider.on("created", () => {
      addActive(slider.track.details.rel)
      addClickEvents()
      main.on("animationStarted", (main) => {
        removeActive()
        const next = main.animator.targetIdx || 0
        addActive(main.track.absToRel(next))
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
      })
    })
  }
}
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css', "../../../../node_modules/keen-slider/keen-slider.min.css"]
})
export class InicioComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>;
  @ViewChild("thumbnailRef") thumbnailRef!: ElementRef<HTMLElement>;

  @ViewChild('sliderRef2') sliderRef2!: ElementRef<HTMLElement>;
  @ViewChild('thumbnailRef2') thumbnailRef2!: ElementRef;


  cursos: Curso | undefined | any;
  cursosFiltrados: Curso | undefined | any;
  //selectedCourseId!: string; // Variable para almacenar el ID del curso seleccionado en el formulario
  selectedCourseId: string = 'Selecciona el curso';
  curso: any;

  constructor(private cursoService: CursosService, private router: Router) {}


  slider: KeenSliderInstance | null = null;
  slider2: KeenSliderInstance | null = null;
  thumbnailSlider: KeenSliderInstance | null = null;
  thumbnailSlider2: KeenSliderInstance | null = null;

  ngAfterViewInit() {
    setTimeout(() => {
      this.slider = new KeenSlider(this.sliderRef.nativeElement);
      console.log(this.slider)
      this.thumbnailSlider = new KeenSlider(this.thumbnailRef.nativeElement, {
        initial: 0,
        slides: {
          perView: 4,
          spacing: 10,
        },
      });

      setTimeout(() => {
        this.slider2 = new KeenSlider(this.sliderRef2.nativeElement);
        console.log(this.slider2)
        this.thumbnailSlider2 = new KeenSlider(this.thumbnailRef2.nativeElement, {
          initial: 0,
          slides: {
            perView: 4,
            spacing: 10,
          },
        }, [ThumbnailPlugin(this.slider2)]);
      }, 0);
    }, 0);
  }

  /* ngAfterViewInit() {
    setTimeout(() => {
      this.slider = new KeenSlider(this.sliderRef.nativeElement);
      console.log(this.slider)
      this.thumbnailSlider = new KeenSlider(this.thumbnailRef.nativeElement, {
        initial: 0,
        slides: {
          perView: 4,
          spacing: 10,
        },
      });
      // console.log(this.thumbnailSlider)

      // Obtener las diapositivas generadas dinámicamente para el segundo carrusel
      const slider2Slides = Array.from(this.sliderRef2.nativeElement.children);

      const thumbnail2Slides = Array.from(this.thumbnailRef2.nativeElement.children);

      // Inicializar el segundo carrusel
      this.slider2 = new KeenSlider(this.sliderRef2.nativeElement, {
        initial: 0,
        slides: slider2Slides.length, // Devolver el número de diapositivas
      });
      console.log(this.slider2)

      this.thumbnailSlider2 = new KeenSlider(this.thumbnailRef2.nativeElement, {
        initial: 0,
        slides: thumbnail2Slides.length, // Devolver el número de diapositivas
      }, [ThumbnailPlugin(this.slider2)]);
    }, 0);
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
    if (this.thumbnailSlider) this.thumbnailSlider.destroy()
  }

  ngOnInit(): void {
    this.obtenerCursos(); // Llama a la función para obtener los cursos al inicializar el componente
  }

  obtenerCursos(): void {
    this.cursoService.getCursos().subscribe(cursos => {
      this.cursos = cursos;
      console.log(this.cursos);
      this.filtrarCursos();
    });
  }

  irADetalles(cursoId: string): void {
    this.router.navigate(['cursos/details', cursoId]);
  }

  filtrarCursos(): void {
    this.cursosFiltrados = this.cursos.slice(0, 6);
    console.log(this.cursosFiltrados)
  }

  actualizarSelectedCourseId(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCourseId = target.value;
  }

  comprarAhora(): void {
    console.log(this.selectedCourseId)
    if (this.selectedCourseId) {
      this.router.navigate(['cursos/details', this.selectedCourseId]);
    }
  }
} */


import { Component, ElementRef, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Curso } from 'src/app/interfaces/cursos.interface';
import { CursosService } from 'src/app/services/cursos.service';
import KeenSlider, { KeenSliderInstance } from "keen-slider";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ["../../../../node_modules/keen-slider/keen-slider.min.css", './inicio.component.css']
})
export class InicioComponent implements OnInit, OnDestroy {
  @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>

  cursos: Curso | undefined | any;
  cursosFiltrados: Curso | undefined | any;
  //selectedCourseId!: string; // Variable para almacenar el ID del curso seleccionado en el formulario
  selectedCourseId: string = 'Selecciona el curso';
  curso: any;

  constructor(private cursoService: CursosService, private router: Router) {}


  slider: KeenSliderInstance | null = null

  ngOnDestroy() {
    if (this.slider) {
      this.slider.destroy();
    }
  }

  ngOnInit(): void {
    this.obtenerCursos();
  }

  obtenerCursos(): void {
    this.cursoService.getCursos().subscribe(cursos => {
      this.cursos = cursos;
      this.filtrarCursos();
      this.inicializarCarrusel();
    });
  }

  inicializarCarrusel(): void {
    if (this.sliderRef && this.sliderRef.nativeElement) {
      setTimeout(() => {
        this.slider = new KeenSlider(this.sliderRef.nativeElement, {
          loop: true,
          mode: "free",
          slides: {
            perView: 3,
            spacing: 15,
          },
        });
      }, 0);
    }
  }

  irADetalles(cursoId: string): void {
    this.router.navigate(['cursos/details', cursoId]);
  }

  filtrarCursos(): void {
    this.cursosFiltrados = this.cursos.slice(0, 6);
    console.log(this.cursosFiltrados)
  }

  actualizarSelectedCourseId(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCourseId = target.value;
  }

  comprarAhora(): void {
    console.log(this.selectedCourseId)
    if (this.selectedCourseId) {
      this.router.navigate(['cursos/details', this.selectedCourseId]);
    }
  }
}
