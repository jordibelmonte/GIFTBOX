const initialState = {
  todosLosPaquetes: null,
  paquetesPorCategoria: [],
  paquetePorId: null,
  paquetesFiltrados: [],
  paquetesMasRegalados: []
}
const actualizar = (todosLosPaquetes, nuevoPaquete) => {
  return (todosLosPaquetes.map(paquete => {
    if (paquete._id === nuevoPaquete._id) {
      paquete = nuevoPaquete;
    }
    return paquete
  }
  ))
}
const paqueteReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'TODOS_PAQUETES':
      return {
        ...state,
        todosLosPaquetes: action.payload
      }
    case 'PAQUETES_CATEGORIA':
      return {
        ...state,
        paquetesPorCategoria: state.todosLosPaquetes.filter(paquete => paquete.categoria === action.payload)
      }
    case 'PAQUETE_ID':
      var aux1 = actualizar(state.todosLosPaquetes, action.payload)
      var paqueteAux = aux1.find(paquete => paquete._id === action.payload)
      var suma = 0;
      (paqueteAux.valoracion).map(valoracion => (suma += valoracion.valor))
      var promedio = suma / (paqueteAux.valoracion).length;
      /* console.log("-----------------------------------------------------------------")
      console.log("suma: "+suma +"/" +(paqueteAux.valoracion).length )
      console.log("promedio " + promedio) */
      return {
        ...state,
        todosLosPaquetes: aux1,
        paquetePorId: { ...paqueteAux, promedio }
      }
    case 'FILTRO':
      return {
        ...state,
        paquetesFiltrados: state.todosLosPaquetes.filter(paquete => paquete.nombre.toLowerCase().includes(action.payload.toLowerCase().trim()) || paquete.cantidadPersonas === action.payload.trim() || paquete.ubicacion.toLowerCase().includes(action.payload.toLowerCase().trim()) || paquete.categoria.toLowerCase().includes(action.payload.toLowerCase().trim()))
      }
    case 'PAQUETES_MAS_REF':
      return {
        ...state,
        paquetesMasRegalados: action.payload
      }
    case 'ENVIAR_VALORACION':
      const aux = actualizar(state.todosLosPaquetes, action.payload)
      return {
        ...state,
        todosLosPaquetes: aux
      }
    case 'ENVIAR_COMENTARIO':
      
      return {
        ...state,
        paquetePorId: {...action.payload,promedio:state.paquetePorId.promedio},
        todosLosPaquetes: state.todosLosPaquetes.map(paquete=>paquete._id===action.payload._id ? action.payload : paquete)
      }
    case 'ELIMINAR_COMENTARIO':
      console.log("promedio del paquete antes de eliminar"+state.paquetePorId.promedio)
      console.log("promedio del paquete despues de eliminar"+action.payload.promedio)
      return {
        ...state,
        paquetePorId: {...action.payload,promedio:state.paquetePorId.promedio},
        todosLosPaquetes: state.todosLosPaquetes.map(paquete=>paquete._id===action.payload._id ? action.payload : paquete)
      }
    case 'EDITAR_COMENTARIO':
      console.log(action.payload)
      return {
        ...state,
        paquetePorId: {...action.payload,promedio:state.paquetePorId.promedio},
        todosLosPaquetes: state.todosLosPaquetes.map(paquete=>paquete._id===action.payload._id ? action.payload : paquete)
      }
    default:
      return state;
  }

}
export default paqueteReducer;