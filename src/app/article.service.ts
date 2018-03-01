import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Article } from './article';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ArticleService {

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Article[]> {
    // Instructions HTTP// les données sont automatiquement envoyées par HTTP // renvoie le résultat du get puis appelle le service dans app.component
    return this.httpClient.get<Array<Article>>('/assets/articles.json');


  }
}
