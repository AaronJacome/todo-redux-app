import * as fromFiltro from './filter.actions';
import { actiones } from './filter.actions';

const estadoInicial: fromFiltro.filtrosValidos = "todos";

export function filtroReducer(state = estadoInicial, action: fromFiltro.actiones): fromFiltro.filtrosValidos {
    switch (action.type) {
        case fromFiltro.SET_FILTER:
            return action.filtro;
        default:
            return state;
    }
}