import React from "react";
import styled from "styled-components";

const Contact = () => {

  return (
    
    <ContactContainer>
      <ContactTitle>Contacto</ContactTitle>
      <ContactContent>
        <ContactInfo>
          <h4>Datos de contacto</h4>
          <p><strong>Email:</strong> contacto@dumbo.com</p>
          <p><strong>Teléfono:</strong> +54 11 1234-5678</p>
          <p><strong>Dirección:</strong> Av. Siempre Viva 123, Buenos Aires</p>
          <ContactForm>
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
          </ContactForm>
        </ContactInfo>
        <ContactMap>
          <h4>Ubicación</h4>
          <iframe
            title="Google Maps"
            src="https://www.google.com/maps?q=Av.+Siempre+Viva+123,+Buenos+Aires&output=embed"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </ContactMap>
      </ContactContent>
    </ContactContainer>
    
  );
  
};

export default Contact;

// --- Estilos ---
const ContactContainer = styled.div`
  max-width: 900px;
  margin: 80px auto 0;
  padding: 24px;
  min-height: calc(100vh - 160px);
  display: flex;
  flex-direction: column;
  justify-content: center;

  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.07);
`;

const ContactTitle = styled.h2`
  color: #7A4A27;
  text-align: center;
  margin-bottom: 32px;
`;

const ContactContent = styled.div`
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
`;

const ContactInfo = styled.div`
  flex: 1;
  min-width: 280px;
  background: #c5e2f6;
  border-radius: 12px;
  padding: 24px;
  color: #242424;
  margin-bottom: 16px;
`;

const ContactForm = styled.form`
  background: #fff;
  border: 1px solid #BDB5D5;
  border-radius: 12px;
  padding: 16px;
  margin-top: 16px;

  .form-label {
    color: #7A4A27;
  }

  .btn-success {
    background: #7A4A27;
    border: none;
    color: #fff;
    transition: background 0.2s;

    &:hover {
      background: #BDB5D5;
      color: #7A4A27;
    }
  }
`;

const ContactMap = styled.div`
  flex: 1;
  min-width: auto;
  background:  #c5e2f6;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;

  h4 {
    color: #7A4A27;
    margin-bottom: 16px;
  }

  iframe {
    border: 0;
    border-radius: 8px;
    width: 100%;
    height: 300px;
  }
`;