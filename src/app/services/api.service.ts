import { Injectable } from '@angular/core';
import { environment } from '../environment/environement';
import { HttpClient } from '@angular/common/http';
import { Programme } from '../model/programme';
import { catchError, Observable, throwError } from 'rxjs';
import { Exercice } from '../model/exercice';
import { SeanceEntrainement } from '../model/seanceEntrainement';
import { PlanEntrainement } from '../model/planEntrainement';
import { CategoryExercice } from '../model/categoryExercice';
import { Objectif } from '../model/Objectif';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  urlserveur = environment.apiUrl;

  constructor(private http: HttpClient) {}

  urlUser = this.urlserveur + 'users';
  urlProgramme = this.urlserveur + 'programmes';
  urlUpload = this.urlserveur + 'upload';
  urlExercice = this.urlserveur + 'exercices';
  urlPlan = this.urlserveur + 'plan';
  urlSeance = this.urlserveur + 'seance';
  urlprogramme = this.urlserveur + 'Programme/';
  urlcategory = this.urlserveur + 'category';
  urlObjectif = this.urlserveur + 'objectifs';

  uploadFile(formData: FormData): Observable<any> {
    return this.http
      .post(this.urlUpload, formData, { responseType: 'text' })
      .pipe(
        catchError((error) => {
          console.error("Erreur lors de l'upload", error);
          return throwError(error); // Relancer l'erreur pour la gestion ultérieure
        })
      );
  }

  public userGet(id: string): Observable<any> {
    return this.http.get(this.urlUser + '/' + id);
  }

  public userList(): Observable<any> {
    return this.http.get(this.urlUser);
  }

  public programmeInsert(program: Programme): Observable<any> {
    return this.http.post(this.urlProgramme, program);
  }

  public programmeUpdate(id: number, programme: Programme): Observable<any> {
    return this.http.put(this.urlProgramme + '/' + id, programme);
  }

  public programmeDelete(id: string): Observable<any> {
    return this.http.delete(this.urlProgramme + '/' + id);
  }

  public programmeGet(id: string): Observable<any> {
    return this.http.get(this.urlProgramme + '/' + id);
  }

  public programmeList(): Observable<any> {
    return this.http.get(this.urlProgramme);
  }

  // exercie

  public exerciceInsert(data: FormData): Observable<any> {
    return this.http.post(this.urlExercice, data);
  }
  public exerciceUpdate(id: number, data: FormData): Observable<any> {
    return this.http.put(this.urlExercice + '/' + id, data);
  }

  public exerciceDelete(id: string): Observable<any> {
    return this.http.delete(this.urlExercice + '/' + id);
  }

  public exerciceGet(id: string): Observable<any> {
    return this.http.get(this.urlExercice + '/' + id);
  }

  public exerciceList(): Observable<any> {
    return this.http.get(this.urlExercice);
  }

  // seance

  public seanceInsert(seance: SeanceEntrainement): Observable<any> {
    return this.http.post(this.urlSeance, seance);
  }

  public seanceUpdate(id: number, seance: SeanceEntrainement): Observable<any> {
    return this.http.put(this.urlSeance + '/' + id, seance);
  }

  public seanceDelete(id: string): Observable<any> {
    return this.http.delete(this.urlSeance + '/' + id);
  }

  public seanceGet(id: string): Observable<any> {
    return this.http.get(this.urlSeance + '/' + id);
  }

  public seanceList(): Observable<any> {
    return this.http.get(this.urlSeance);
  }

  // plan d'entrainement
  public planInsert(plan: PlanEntrainement): Observable<any> {
    return this.http.post(this.urlPlan, plan);
  }

  public planUpdate(id: number, plan: PlanEntrainement): Observable<any> {
    return this.http.put(this.urlPlan + '/' + id, plan);
  }

  public planDelete(id: string): Observable<any> {
    return this.http.delete(this.urlPlan + '/' + id);
  }

  public planGet(id: string): Observable<any> {
    return this.http.get(this.urlPlan + '/' + id);
  }

  public planList(): Observable<any> {
    return this.http.get(this.urlPlan);
  }

  // categorie

  public categoryInsert(category: CategoryExercice): Observable<any> {
    return this.http.post(this.urlcategory, category);
  }
  public categoryUpdate(
    id: number,
    category: CategoryExercice
  ): Observable<any> {
    return this.http.put(this.urlcategory + '/' + id, category);
  }

  public categoryDelete(id: number): Observable<any> {
    return this.http.delete(this.urlcategory + '/' + id);
  }

  public categoryGet(id: number): Observable<any> {
    return this.http.get(this.urlcategory + '/' + id);
  }

  public categoryList(): Observable<any> {
    return this.http.get(this.urlcategory);
  }

  // objectif
  public objectifInsert(objectif: Objectif): Observable<any> {
    return this.http.post(this.urlObjectif, objectif);
  }
  public objectifUpdate(id: number, objectif: Objectif): Observable<any> {
    return this.http.put(this.urlObjectif + '/' + id, objectif);
  }

  public objectifDelete(id: number): Observable<any> {
    return this.http.delete(this.urlObjectif + '/' + id);
  }

  public objectifGet(id: number): Observable<any> {
    return this.http.get(this.urlObjectif + '/' + id);
  }

  public objectifList(): Observable<any> {
    return this.http.get(this.urlObjectif);
  }
}
