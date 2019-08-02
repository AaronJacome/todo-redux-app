import { Component, OnInit } from '@angular/core';
import * as fromFiltro from '../../filter/filter.actions';
import * as fromTodo from '../todo.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {
  filtrosValidos: fromFiltro.filtrosValidos[] = ['todos','pendientes','completados']
  filtroActual:fromFiltro.filtrosValidos
  pendientes:number;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.subscribe(state =>{
      this.filtroActual = state.filtro;
      this.contarPendientes(state.todos);
    })
  }


  cambiarFiltro(filtro:fromFiltro.filtrosValidos){
    this.store.dispatch(new fromFiltro.SetFiltroAction(filtro));
  }

  contarPendientes(todos:Todo[]){
    this.pendientes = todos.filter(todo => !todo.completado).length;
  }

  limpiarCompletados(){
    this.store.dispatch(new fromTodo.BorrarAllTodoAction())
  }
}
