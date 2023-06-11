import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../interfaces/cursos.interface';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../interfaces/categoria.interface';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  // private apiUrl = 'http://127.0.0.1:8000/';
   apiUrl: String= "https://educando-test.onrender.com/";

  constructor(private http:HttpClient) { }

  public getCursos(): Observable<Curso> {
     return this.http.get<Curso>(`${this.apiUrl}curso/`);
    // return this.http.get<Curso>(`api/curso`);
  }

  public getCategorias(): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}categoria/`);
  }

  public getCursosPorCategoria(idCategoria: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.apiUrl}por_categoria/${idCategoria}/`);
  }
}
