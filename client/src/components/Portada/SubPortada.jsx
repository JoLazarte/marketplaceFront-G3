import './SubPortada.css'

const SubPortada = () =>{
    return(
        <div className="cta-glass ">
         <h2 className="mb-4">
        <span>Como un elefante, recuerda los mejores momentos:</span>
        <br/>
        <span>lee y escucha con nosotros.</span>
        </h2>
        <p className="mb-3">¡Regístrate hoy mismo para explorar los mejores libros y álbumes al mejor precio!</p>
        <p className="mb-4">Utilizando el código de referido de un amigo, tenés un <b>20% de descuento</b> en tu primer compra</p>
        <a href="#" className="btn btn-lg btn-light px-5 py-2 fw-bold shadow" id='btnReg'>¡Registrate!</a>
       </div>
    )
}

export default SubPortada