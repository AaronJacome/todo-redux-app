import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ToggleTodoAction, EditarTodoAction, BorrarTodoAction } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  chkField: FormControl;
  txtInput: FormControl;
  editando: boolean;
  @ViewChild('txtInputFisico') txtInputFisico: ElementRef;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.chkField = new FormControl(this.todo.completado)
    this.txtInput = new FormControl(this.todo.texto, Validators.required)
    this.chkField.valueChanges.subscribe(() => {
      this.store.dispatch(new ToggleTodoAction(this.todo.id))
    })
  }

  edit() {
    this.editando = true;
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    })
  }

  endEdit() {
    this.editando = false;
    if (this.txtInput.invalid)
      return;

    if (this.txtInput.value === this.todo.texto)
      return;

    this.store.dispatch(new EditarTodoAction(this.todo.id, this.txtInput.value))
  }

  deleteTodo(){
    this.store.dispatch(new BorrarTodoAction(this.todo.id))
  }

}
