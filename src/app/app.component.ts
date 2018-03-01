import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

// Importation locale
import { Article } from './article';
import { ArticleService } from './article.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// Variables
export class AppComponent {
  title: string;
  articles: Array<Article>;
  editing: boolean;
  editArticle: Article;
  // articleService: ArticleService;

  // Valeurs des variables
  //
  constructor(private articleService: ArticleService) { // Toutes les déclarations de 'articleService' doivent avoir des modificateurs identiques
    this.editing = false;
    this.editArticle = new Article(0, '');
    this.title = 'Blog';
    this.articles = new Array();
    this.articles.push(new Article(99, 'Mon 1er Article', " Purr when being pet slap owner's face at 5am until human fills food dish. Scamper scoot butt on the rug and your pillow is now my pet bed show belly cats go for world domination. Litter kitter kitty litty little kitten big roar roar feed me i shredded your linens for you, who's the baby stare at ceiling light the fat cat sat on the mat bat away with paws. Sit on the laptop purrr purr littel cat, little cat purr purr massacre a bird in the living room and then look like the cutest and most innocent animal on the planet weigh eight pounds but take up a full-size bed yet eat owner's food, i'm going to lap some water out of my master's cup meow poop in a handbag look delicious and drink the soapy mopping up water then puke giant foamy fur-balls. Give me some of your food give me some of your food give me some of your food meh, i don't want it bleghbleghvomit my furball really tie the room together or meowwww yet kitty poochy sun bathe, but toy mouse squeak roll over for throwup on your pillow. If it fits, i sits always hungry climb leg, for where is my slave? I'm getting hungry find a way to fit in tiny box purr while eating. Lick the plastic bag lick arm hair hide head under blanket so no one can see, so leave hair everywhere, so sweet beast. Asdflkjaertvlkjasntvkjn (sits on keyboard) rub whiskers on bare skin act innocent spill litter box, scratch at owner, destroy all furniture, especially couch love to play with owner's hair tie. Open the door, let me out, let me out, let me-out, let me-aow, let meaow, meaow! "));
  }

  ngOnInit() {

    this.articleService.list().subscribe({
      // Propriétés possibles : next, error, 
      // Les fonctions next et error ne font pas partie de la fonction list
      next: (articles) => {
        // Récupere le resultat de la réponse http
        this.articles = articles;
      },
      error: (response) => {
        //Si erreur..
        console.log('Impossible de récupérer les articles dans le fichier JSON', response);
      }
    });
  }

  addArticle() {
    this.editing = true;
  }

  backToList() {
    setTimeout(() => this.editing = false);
  }

  saveArticle(myForm: NgForm) {

    //this.articles.push(this.editArticle);
    //this.articles.push(JSON.parse(JSON.stringify(this.editArticle)));
    if (this.editArticle.id >= 0) {
      this.articleService.update(this.editArticle)
      .subscribe((article) => {
        // Remplacer l'article a jour dans la liste
        let index = this.articles.findIndex(
          (value: Article) => value.id === article.id);
        this.articles.splice(index, 1, article);
      });
    } else {
      this.articleService.create(this.editArticle)
        .subscribe((article) => this.articles.push(article));
    }
    this.editArticle.id = undefined;
    myForm.resetForm();

  }

  modifyArticle(id: number, index: number) {

    this.editArticle = this.articles[index];
    //Bascule vers l'affichage du formulaire
    this.addArticle();
  }

  deleteArticle(id: number, index: number) {
    // splice permet de supprimer une donnée d'un tableau
    this.articles.splice(index, 1);

  }

}
