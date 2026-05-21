import { Injectable } from '@angular/core';
import { Filme } from '../models/filme.model';

@Injectable({
  providedIn: 'root',
})
export class FilmeLocal {
  private storageKey = 'filmes';

  getAll(): Filme[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  saveAll(filmes: Filme[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(filmes));
  }

  add(filme: Filme): void {
    const filmes = this.getAll();
    filmes.push(filme);
    this.saveAll(filmes);
  }

  getById(id: number): Filme | undefined {
    return this.getAll().find((filme) => filme.id === id);
  }

  update(updatedFilme: Filme): void {
    const filmes = this.getAll().map((filme) =>
      filme.id === updatedFilme.id ? updatedFilme : filme,
    );

    this.saveAll(filmes);
  }

  delete(id: number): void {
    const filmes = this.getAll().filter((filme) => filme.id !== id);
    this.saveAll(filmes);
  }
}