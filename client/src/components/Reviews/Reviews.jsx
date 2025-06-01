import './Reviews.css'

const Reviews = ()=>{
    return(
        <div className=" container-fluid my-5 ">
            
            <div className="row row-cols-1 row-cols-md-3 g-4">
                <div className="col">
                <div className="card testimonial-card h-100 text-white bg-dark p-3">
                    <div className="card-body">
                    <p className="card-text">"Una experiencia maravillosa. La variedad de libros es impresionante y el servicio al cliente excelente."</p>
                    <h5 className="card-title mt-3">- Lucía Fernández</h5>
                    </div>
                </div>
                </div>
                <div className="col">
                <div className="card testimonial-card h-100 text-white bg-dark p-3">
                    <div className="card-body">
                    <p className="card-text">"Compré un álbum de colección y llegó en perfectas condiciones. ¡Volveré a comprar sin dudas!"</p>
                    <h5 className="card-title mt-3">- Diego Martínez</h5>
                    </div>
                </div>
                </div>
                <div className="col">
                <div className="card testimonial-card h-100 text-white bg-dark p-3">
                    <div className="card-body">
                    <p className="card-text">"Gran selección y excelente atención. Me encantó el diseño de la página y lo fácil que es comprar."</p>
                    <h5 className="card-title mt-3">- Valentina Ríos</h5>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Reviews