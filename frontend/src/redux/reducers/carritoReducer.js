const initialState={
    carrito:[],
    total:0
}
const carritoReducer=(state=initialState,action)=>{
    switch (action.type) {
        case ("AGREGAR_AL_CARRITO"):
            let paqueteEnCarrito=false;
            const carritoAux= state.carrito.map(paquete=>{
                if(paquete._id===action.payload._id){
                    paquete.cantidad+=1;
                    paqueteEnCarrito=true;
                }
                return paquete
            })

            if(paqueteEnCarrito){
                var nuevoTotal=0;
                carritoAux.map(paquete=>nuevoTotal+=paquete.precio*paquete.cantidad)
                return {
                    ...state,
                    carrito:carritoAux,
                    total:nuevoTotal
                }
            }
            return {
                ...state,
                carrito:[...state.carrito,{...action.payload,cantidad:1}],
                total: state.total+action.payload.precio

            }
        case ("ELIMINAR_DEL_CARRITO"):
            return{
                ...state,
                carrito: state.carrito.filter(paquete=>paquete._id!==action.payload._id),
                total: state.total-(action.payload.precio*action.payload.cantidad)                
            }
        case ("ACTUALIZAR_CARRITO"):    
            const carritoAux2=state.carrito.filter(paquete=>{
                if(paquete._id===action.payload._id && action.payload.numero==="1"){
                    paquete.cantidad+=1
                }else if(paquete._id===action.payload._id && action.payload.numero==="-1"){
                    paquete.cantidad-=1
                }
                if(paquete.cantidad!==0){return paquete;}
                
            })
            var nuevoTotal1=0;
            carritoAux2.map(paquete=>
                (action.payload.numero==="1") 
                ? nuevoTotal1+=paquete.precio*paquete.cantidad
                : nuevoTotal1-=paquete.precio*paquete.cantidad)
            return{
                ...state,
                carrito: carritoAux2,
                total: nuevoTotal1
            }
        default:
            return state;
    }

}
export default carritoReducer;