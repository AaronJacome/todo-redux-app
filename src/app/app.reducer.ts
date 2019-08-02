import { Todo } from './todo/models/todo.model';
import { ActionReducerMap } from '@ngrx/store';
import * as fromTodo from './todo/todo.reducer';
import * as fromFiltro from './filter/filter.reducer';
import * as fromFiltroAction from './filter/filter.actions';
export interface AppState {
    todos: Todo[];
    filtro: fromFiltroAction.filtrosValidos;
}

export const reducers: ActionReducerMap<AppState> = {
    todos: fromTodo.todoReducer,
    filtro: fromFiltro.filtroReducer
};