import React, { useState, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiUtils from '../utils/apiUtils';

// URL base del backend
const API_URL = 'http://localhost:8080/musicAlbums';

// Géneros disponibles (ajusta según tu backend)
const AVAILABLE_GENRES = [
  'CLASSICAL',
  'ROCK',
  'PROGRESSIVE',
  'PSYCHODELIC',
  'POP',
  'FUNK',
  'RB',
  'HARDROCK',
  'GRUNGE'
];

const AlbumForm = () => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    recordLabel: '',
    description: '',
    isrc: '',
    genres: [],
    price: '',
    stock: '',
    urlImage: '',
    year: '',
    active: true
  });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  // Refs para scroll automático a errores
  const refs = {
    title: useRef(null),
    author: useRef(null),
    recordLabel: useRef(null),
    description: useRef(null),
    isrc: useRef(null),
    genres: useRef(null),
    price: useRef(null),
    stock: useRef(null),
    urlImage: useRef(null),
    year: useRef(null)
  };

  // Validación de campos
  const validate = (fields = form) => {
    const newErrors = {};
    if (!fields.title.trim()) newErrors.title = 'El título es obligatorio';
    if (!fields.author.trim()) newErrors.author = 'El artista es obligatorio';
    if (!fields.recordLabel.trim()) newErrors.recordLabel = 'La discográfica es obligatoria';
    if (!fields.description.trim()) newErrors.description = 'La descripción es obligatoria';
    if (!fields.isrc.trim()) newErrors.isrc = 'El ISRC es obligatorio';
    if (!fields.genres.length) newErrors.genres = 'Selecciona al menos un género';
    if (!fields.price || isNaN(fields.price) || Number(fields.price) <= 0) newErrors.price = 'Precio inválido';
    if (!fields.stock || isNaN(fields.stock) || Number(fields.stock) < 0) newErrors.stock = 'Stock inválido';
    if (!fields.year || isNaN(fields.year) || Number(fields.year) < 1900 || Number(fields.year) > new Date().getFullYear() + 1) {
      newErrors.year = 'Año inválido';
    }
    if (!fields.urlImage.trim() || !/^https?:\/\/.+\..+/.test(fields.urlImage)) newErrors.urlImage = 'URL de imagen inválida';
    return newErrors;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(validate({ ...form, [name]: value }));
  };

  // Manejo especial para géneros múltiples con checkboxes
  const handleGenreCheckbox = (e) => {
    const { value, checked } = e.target;
    let newGenres;
    if (checked) {
      newGenres = [...form.genres, value];
    } else {
      newGenres = form.genres.filter(g => g !== value);
    }
    setForm(prev => ({ ...prev, genres: newGenres }));
    setTouched(prev => ({ ...prev, genres: true }));
    setErrors(validate({ ...form, genres: newGenres }));
  };

  const handleBlur = e => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
    setErrors(validate(form));
  };

  // POST: Enviar álbum al backend
  const handleSubmit = async e => {
    e.preventDefault();
    
    const validationErrors = apiUtils.validateAlbumData(form);
    setErrors(validationErrors);
    setTouched({
      title: true, author: true, recordLabel: true, description: true,
      isrc: true, genres: true, price: true, stock: true, urlImage: true, year: true
    });

    if (Object.keys(validationErrors).length === 0) {
      try {
        const albumData = apiUtils.formatAlbumData(form);
        console.log('Creating album with data:', albumData);
        
        const result = await apiUtils.createAlbum(albumData);
        console.log('Create result:', result);

        toast.success('¡Álbum agregado correctamente! 🎵', {
          position: "top-right",
          autoClose: 3000,
        });
        navigate('/albums');
      } catch (err) {
        console.error('Error creating album:', err);
        toast.error(`Error al agregar el álbum: ${err.message}`, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } else {
      setShake(true);
      const firstErrorField = [
        'title', 'author', 'recordLabel', 'year', 'description', 'isrc', 'genres', 'price', 'stock', 'urlImage'
      ].find(field => validationErrors[field]);
      
      if (firstErrorField && refs[firstErrorField].current) {
        refs[firstErrorField].current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        refs[firstErrorField].current.focus?.();
      }
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <Bg>
      <Wrapper>
        <Title>Agregar Álbum</Title>
        <Form onSubmit={handleSubmit} noValidate $shake={shake}>
          <InputGroup ref={refs.title}>
            <Label>Título</Label>
            <Input
              name="title"
              value={form.title}
              onChange={handleChange}
              onBlur={handleBlur}
              $active={touched.title && form.title}
              $error={errors.title}
              required
              placeholder="Título del álbum"
            />
            {touched.title && errors.title && <ErrorMsg>{errors.title}</ErrorMsg>}
          </InputGroup>
          <InputGroup ref={refs.author}>
            <Label>Artista</Label>
            <Input
              name="author"
              value={form.author}
              onChange={handleChange}
              onBlur={handleBlur}
              $active={touched.author && form.author}
              $error={errors.author}
              required
              placeholder="Nombre del artista"
            />
            {touched.author && errors.author && <ErrorMsg>{errors.author}</ErrorMsg>}
          </InputGroup>
          <InputGroup ref={refs.recordLabel}>
            <Label>Discográfica</Label>
            <Input
              name="recordLabel"
              value={form.recordLabel}
              onChange={handleChange}
              onBlur={handleBlur}
              $active={touched.recordLabel && form.recordLabel}
              $error={errors.recordLabel}
              required
              placeholder="Discográfica"
            />
            {touched.recordLabel && errors.recordLabel && <ErrorMsg>{errors.recordLabel}</ErrorMsg>}
          </InputGroup>
          <InputGroup ref={refs.year}>
            <Label>Año</Label>
            <Input
              name="year"
              type="number"
              min="1900"
              max={new Date().getFullYear() + 1}
              value={form.year}
              onChange={handleChange}
              onBlur={handleBlur}
              $active={touched.year && form.year}
              $error={errors.year}
              required
              placeholder="Año de lanzamiento"
            />
            {touched.year && errors.year && <ErrorMsg>{errors.year}</ErrorMsg>}
          </InputGroup>
          <InputGroup ref={refs.description}>
            <Label>Descripción</Label>
            <TextArea
              name="description"
              value={form.description}
              onChange={handleChange}
              onBlur={handleBlur}
              $active={touched.description && form.description}
              $error={errors.description}
              required
              placeholder="Descripción del álbum"
              rows={3}
            />
            {touched.description && errors.description && <ErrorMsg>{errors.description}</ErrorMsg>}
          </InputGroup>
          <InputGroup ref={refs.isrc}>
            <Label>ISRC</Label>
            <Input
              name="isrc"
              value={form.isrc}
              onChange={handleChange}
              onBlur={handleBlur}
              $active={touched.isrc && form.isrc}
              $error={errors.isrc}
              required
              placeholder="Código ISRC"
            />
            {touched.isrc && errors.isrc && <ErrorMsg>{errors.isrc}</ErrorMsg>}
          </InputGroup>
          <InputGroup ref={refs.genres}>
            <Label>Géneros</Label>
            <GenresBox $error={errors.genres}>
              {AVAILABLE_GENRES.map(g => (
                <GenreCheckbox key={g}>
                  <input
                    type="checkbox"
                    value={g}
                    checked={form.genres.includes(g)}
                    onChange={handleGenreCheckbox}
                  />
                  <span>{g}</span>
                </GenreCheckbox>
              ))}
            </GenresBox>
            {touched.genres && errors.genres && <ErrorMsg>{errors.genres}</ErrorMsg>}
            <Hint>Puedes seleccionar más de un género</Hint>
          </InputGroup>
          <InputGroup ref={refs.price}>
            <Label>Precio</Label>
            <Input
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              onBlur={handleBlur}
              $active={touched.price && form.price}
              $error={errors.price}
              required
              placeholder="Precio"
            />
            {touched.price && errors.price && <ErrorMsg>{errors.price}</ErrorMsg>}
          </InputGroup>
          <InputGroup ref={refs.stock}>
            <Label>Stock</Label>
            <Input
              name="stock"
              type="number"
              min="0"
              value={form.stock}
              onChange={handleChange}
              onBlur={handleBlur}
              $active={touched.stock && form.stock}
              $error={errors.stock}
              required
              placeholder="Cantidad en stock"
            />
            {touched.stock && errors.stock && <ErrorMsg>{errors.stock}</ErrorMsg>}
          </InputGroup>
          <InputGroup ref={refs.urlImage}>
            <Label>URL de imagen</Label>
            <Input
              name="urlImage"
              value={form.urlImage}
              onChange={handleChange}
              onBlur={handleBlur}
              $active={touched.urlImage && form.urlImage}
              $error={errors.urlImage}
              required
              placeholder="https://..."
            />
            {touched.urlImage && errors.urlImage && <ErrorMsg>{errors.urlImage}</ErrorMsg>}
          </InputGroup>
          <Button type="submit">Agregar Álbum</Button>
        </Form>
      </Wrapper>
    </Bg>
  );
};

export default AlbumForm;

// --- Estilos ---
const shake = keyframes`
  0% { transform: translateX(0); }
  15% { transform: translateX(-8px); }
  30% { transform: translateX(8px); }
  45% { transform: translateX(-8px); }
  60% { transform: translateX(8px); }
  75% { transform: translateX(-8px); }
  90% { transform: translateX(8px); }
  100% { transform: translateX(0); }
`;

const Bg = styled.div`
  min-height: 100vh;
  background: #181818;
  color: #fff;
  padding-bottom: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  background: #222;
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.35);
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: 500px;
`;

const Title = styled.h1`
  color: #fff;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  ${({ $shake }) =>
    $shake &&
    css`
      animation: ${shake} 0.6s;
    `}
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #bdbdbd;
  font-size: 1rem;
`;

const ErrorMsg = styled.span`
  color: #ff3b3b;
  font-size: 0.95rem;
  margin-top: 0.2rem;
`;

const Hint = styled.span`
  color: #bdbdbd;
  font-size: 0.85rem;
  margin-top: 0.2rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border-radius: 8px;
  border: 2px solid
    ${({ $error, $active }) =>
      $error ? '#ff3b3b' : $active ? '#00ff00' : '#404040'};
  background-color: #333;
  color: #fff;
  font-size: 1rem;
  transition: border-color 0.2s;
  &:focus {
    outline: none;
    border-color: #00ff00;
    box-shadow: 0 0 0 2px rgba(0,255,0,0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border-radius: 8px;
  border: 2px solid
    ${({ $error, $active }) =>
      $error ? '#ff3b3b' : $active ? '#00ff00' : '#404040'};
  background-color: #333;
  color: #fff;
  font-size: 1rem;
  transition: border-color 0.2s;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: #00ff00;
    box-shadow: 0 0 0 2px rgba(0,255,0,0.1);
  }
`;

const GenresBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem 1.2rem;
  background: #292929;
  border-radius: 10px;
  padding: 1rem;
  border: 2px solid ${({ $error }) => $error ? '#ff3b3b' : '#404040'};
  margin-bottom: 0.2rem;
`;

const GenreCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #363636;
  border-radius: 6px;
  padding: 0.3rem 0.8rem;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  input[type="checkbox"] {
    accent-color: #00ff00;
    width: 1.1rem;
    height: 1.1rem;
    margin-right: 0.3rem;
  }
`;

const Button = styled.button`
  background: #181818;
  color: #fff;
  border: 2px solid #00ff00;
  border-radius: 2rem;
  padding: 0.7rem 1.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  box-shadow: 0 4px 16px rgba(0,255,0,0.08);
  transition: all 0.2s;
  cursor: pointer;
  margin-top: 1rem;
  &:hover {
    background: #00ff00;
    color: #181818;
    box-shadow: 0 6px 24px rgba(0,255,0,0.18);
    border-color: #00ff00;
  }
`;