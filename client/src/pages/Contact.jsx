import React from "react";
const Contact = () => {
  return (
    <div
      style={{
        maxWidth: 900,
        margin: "80px auto 0",
        padding: 24,
        minHeight: "calc(100vh - 160px)", // Ajusta según el alto de tu header+footer
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <h2>Contacto</h2>
      <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
        {/* Información de contacto */}
        <div style={{ flex: 1, minWidth: 280 }}>
          <h4>Datos de contacto</h4>
          <p><strong>Email:</strong> contacto@dumbo.com</p>
          <p><strong>Teléfono:</strong> +54 11 1234-5678</p>
          <p><strong>Dirección:</strong> Av. Siempre Viva 123, Buenos Aires</p>
          <form>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input type="text" className="form-control" placeholder="Tu nombre" />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" placeholder="tu@email.com" />
            </div>
            <div className="mb-3">
              <label className="form-label">Mensaje</label>
              <textarea className="form-control" rows={3} placeholder="Escribe tu mensaje..." />
            </div>
            <button type="submit" className="btn btn-success">Enviar</button>
          </form>
        </div>
        {/* Mapa de Google */}
        <div style={{ flex: 1, minWidth: 320 }}>
          <h4>Ubicación</h4>
          <iframe
            title="Google Maps"
            src="https://www.google.com/maps?q=Av.+Siempre+Viva+123,+Buenos+Aires&output=embed"
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: 8 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;