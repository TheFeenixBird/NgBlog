import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Article } from './article';
import { Observable } from 'rxjs';

@Injectable()
export class ArticleService {
  idCount: number;

  constructor(private httpClient: HttpClient) {

    this.idCount = 100;

  }

  public create(article: Article): Observable<Article> {
    // Utilisation de JSON pour sérialiser puis déserialiser l'article afin de'obtenir une nouvelle instance d'objet utilisant une autre adresse mémoire
    let newArticle = JSON.parse(JSON.stringify(article));
    newArticle.id = this.idCount++;
    return Observable.of(newArticle);
  }

  public update(article: Article): Observable<Article> {
    return Observable.of(JSON.parse(JSON.stringify(article)))
  }

  public list(): Observable<Article[]> {
    // Instructions HTTP  // les données sont automatiquement envoyées par HTTP // renvoie le résultat du get puis appelle le service dans app.component
    return this.httpClient.get<Array<Article>>('/assets/articles.json');


  }
}
