import * as todoActions from './todo.actions';
import { Todo } from './models/todo.model';

const todo1 = new Todo('Vencer a thanos');
const todo2 = new Todo('Salvar al mundo');

const estadoInicial: Todo[] = [todo1, todo2]

export function todoReducer(state = estadoInicial, action: todoActions.Acciones): Todo[] {
    switch (action.type) {
        case todoActions.AGREGAR_TODO:
            const todo = new Todo(action.text);
            return [...state, todo];
        case todoActions.TOGGLE_TODO:
            return state.map(todoEdit => {
                if (todoEdit.id === action.id) {
                    return {
                        ...todoEdit,
                        completado: !todoEdit.completado
                    }
                } else {
                    return todoEdit;
                }
            });
        case todoActions.EDITAR_TODO:
            return state.map(todoEdit => {
                if (todoEdit.id === action.id) {
                    return {
                        ...todoEdit,
                        texto: action.text
                    }
                } else {
                    return todoEdit;
                }
            });

        case todoActions.BORRAR_TODO:
            return state.filter(todoEdit => todoEdit.id !== action.id)

        case todoActions.TOGGLE_ALL_TODO:
            return state.map(todoEdit => {
                return {
                    ...todoEdit,
                    completado: action.completado
                }
            });

        case todoActions.BORRAR_ALL_TODO:
            return state.filter(todo => !todo.completado)
        default:
            return state;
    }
}