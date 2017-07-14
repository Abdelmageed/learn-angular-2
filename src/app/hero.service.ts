import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {

  private heroesUrl = 'api/heroes';

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getHero(id: number): Promise<Hero> {
    return this.http.get(`${this.heroesUrl}/${id}`)
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError);
  }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(response => response.json().data as Hero[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log('An error has occured', error);
    return Promise.reject(error.message | error);
  }

  // See the "Take it slow" appendix
  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getHeroes()), 2000);
    });
  }

  updateHero(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;

    return this.http.put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    const url = `${this.heroesUrl}`;

    return this.http.post(url, JSON.stringify({name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Hero)
      .catch(this.handleError);
  }

  delete(hero: Hero): Promise<void> {
    const url = `${this.heroesUrl}/${hero.id}`;

    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}
