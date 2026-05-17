import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-filme-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './filme-form.html',
  styleUrl: './filme-form.css',
})
export class FilmeForm {
  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    titulo: ['', [Validators.required, Validators.minLength(3)]],
    descricao: ['', [Validators.required, Validators.minLength(10)]],
    genero: ['', [Validators.required]],
    duracao: ['', [Validators.required]],
    miniatura: ['', [Validators.required]],
    url: ['', [Validators.required]],
    dataLancamento: ['', Validators.required],
    emCartaz: [false]
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log('Dados do formulario:', this.form.getRawValue());
  }
}
