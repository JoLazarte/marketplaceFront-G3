import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

// Enum de géneros según tu backend (ajusta si es necesario)
const GENRE_BOOKS = [
  "FANTASY", "FAIRY_TALE", "FICCION", "FABLE", "VERSE", "FOLKLORE", "HISTORICAL", "THRILLER", "HORROR",
  "ADVENTURE", "ROMANCE", "DRAMA", "LGBTQ", "ADULT", "CHILDREN", "YOUNG", "CLASSIC", "EPIC", "METAFICTION",
  "PHILOSOPHICAL", "POSTMODERN", "RELIGIOUS", "MAGICALREALISM", "SATIRE", "POLITICAL", "EROTIC", "WESTERN",
  "URBAN", "COMEDY", "PARODY", "DARK_COMEDY", "DYSTOPIA", "SCI_FI", "SURREAL", "TALE", "TRAGICOMEDY", "CRIME",
  "MANGA", "COMIC", "SUPERNATURAL", "PSYCHOLOGICAL", "ACADEMIC", "BIOGRAPHY", "BIBLIOGRAPHY", "COOKBOOK",
  "JOURNALISTIC", "ART", "ANTINOVEL"
];

const API_URL = 'http://localhost:8080/books';

const EditBookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(true);

  const refs = {
    title: useRef(null),
    author: useRef(null),
    editorial: useRef(null),
    description: useRef(null),
    isbn: useRef(null),
    genreBooks: useRef(null),
    price: useRef(null),
    stock: useRef(null),
    urlImage: useRef(null)
  };

  // --- GET: Cargar datos del libro ---
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        const responseText = await res.text();
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}\nResponse: ${responseText}`);
        }
        let data;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          throw new Error(`Invalid JSON response: ${responseText}`);
        }
        if (!data.ok) {
          throw new Error(data.error || 'No se encontró el libro');
        }
        const book = data.data;
        if (!book) {
          throw new Error('No hay datos del libro en la respuesta');
        }
        setForm({
          id: book.id,
          title: book.title || '',
          author: book.author || '',
          editorial: book.editorial || '',
          description: book.description || '',
          isbn: book.isbn || '',
          genreBooks: book.genreBooks || [],
          price: book.price || '',
          stock: book.stock || '',
          urlImage: book.urlImage || ''
        });
        setLoading(false);
      } catch (err) {
        setForm(null);
        setLoading(false);
      }
    };
    if (id) fetchBook();
    else {
      setLoading(false);
      setForm(null);
    }
  }, [id]);

  // --- Validación ---
  const validate = (fields = form) => {
    const newErrors = {};
    if (!fields.title?.trim()) newErrors.title = 'El título es obligatorio';
    if (!fields.author?.trim()) newErrors.author = 'El autor es obligatorio';
    if (!fields.editorial?.trim()) newErrors.editorial = 'La editorial es obligatoria';
    if (!fields.description?.trim()) newErrors.description = 'La descripción es obligatoria';
    if (!fields.isbn?.trim()) newErrors.isbn = 'El ISBN es obligatorio';
    if (!fields.genreBooks?.length) newErrors.genreBooks = 'Selecciona al menos un género';
    if (!fields.price || isNaN(fields.price) || Number(fields.price) <= 0) newErrors.price = 'Precio inválido';
    if (!fields.stock || isNaN(fields.stock) || Number(fields.stock) < 0) newErrors.stock = 'Stock inválido';
    if (!fields.urlImage?.trim() || !/^https?:\/\/.+\..+/.test(fields.urlImage)) newErrors.urlImage = 'URL de imagen inválida';
    return newErrors;
  };

  // --- Handlers ---
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(validate({ ...form, [name]: value }));
  };

  const handleGenreCheckbox = (e) => {
    const { value, checked } = e.target;
    let newGenres;
    if (checked) {
      newGenres = [...(form.genreBooks || []), value];
    } else {
      newGenres = (form.genreBooks || []).filter(g => g !== value);
    }
    setForm(prev => ({ ...prev, genreBooks: newGenres }));
    setTouched(prev => ({ ...prev, genreBooks: true }));
    setErrors(validate({ ...form, genreBooks: newGenres }));
  };

  const handleBlur = e => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
    setErrors(validate(form));
  };

  // --- PUT: Enviar datos editados al backend ---
  const handleSubmit = async e => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setTouched({
      title: true, author: true, editorial: true, description: true,
      isbn: true, genreBooks: true, price: true, stock: true, urlImage: true
    });

    if (Object.keys(validationErrors).length === 0) {
      try {
        const dto = {
          id: form.id,
          title: form.title.trim(),
          author: form.author.trim(),
          editorial: form.editorial.trim(),
          description: form.description.trim(),
          isbn: form.isbn.trim(),
          genreBooks: form.genreBooks, // Array de strings exactos del enum
          price: Number(form.price),
          stock: Number(form.stock),
          urlImage: form.urlImage.trim()
        };

        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
          },
          body: JSON.stringify(dto),
        });

        const text = await res.text();
        let data = {};
        if (text) {
          data = JSON.parse(text);
        }

        if (!res.ok || (data.ok === false)) {
          throw new Error((data && (data.message || data.error)) || `Error ${res.status}: ${res.statusText}`);
        }

        alert('Libro editado correctamente');
        navigate('/books');
      } catch (err) {
        alert(`Error al editar el libro: ${err.message}`);
      }
    } else {
      setShake(true);
      const firstErrorField = [
        'title', 'author', 'editorial', 'description', 'isbn', 'genreBooks', 'price', 'stock', 'urlImage'
      ].find(field => validationErrors[field]);
      if (firstErrorField && refs[firstErrorField].current) {
        refs[firstErrorField].current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        refs[firstErrorField].current.focus?.();
      }
      setTimeout(() => setShake(false), 600);
    }
  };

  if (loading) return (
    <Bg>
      <Wrapper>
        <div style={{color: "#333", textAlign: "center", padding: "20px"}}>
          <h2>Cargando libro...</h2>
          <p>Obteniendo datos del servidor...</p>
        </div>
      </Wrapper>
    </Bg>
  );

  if (!form) return (
    <Bg>
      <Wrapper>
        <div style={{color: "#333", textAlign: "center", padding: "20px"}}>
          <h2>❌ Libro no encontrado</h2>
          <p>No se pudo cargar el libro con ID: {id}</p>
          <button 
            onClick={() => navigate('/books')}
            style={{
              padding: '10px 20px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            Volver a la lista
          </button>
        </div>
      </Wrapper>
    </Bg>
  );

  return (
    <Bg>
      <Wrapper>
        <Title>Editar Libro</Title>
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
              placeholder="Título del libro"
            />
            {touched.title && errors.title && <ErrorMsg>{errors.title}</ErrorMsg>}
          </InputGroup>
          <InputGroup ref={refs.author}>
            <Label>Autor</Label>
            <Input
              name="author"
              value={form.author}
              onChange={handleChange}
              onBlur={handleBlur}
              $active={touched.author && form.author}
              $error={errors.author}
              required
              placeholder="Nombre del autor"
            />
            {touched.author && errors.author && <ErrorMsg>{errors.author}</ErrorMsg>}
          </InputGroup>
          <InputGroup ref={refs.editorial}>
            <Label>Editorial</Label>
            <Input
              name="editorial"
              value={form.editorial}
              onChange={handleChange}
              onBlur={handleBlur}
              $active={touched.editorial && form.editorial}
              $error={errors.editorial}
              required
              placeholder="Editorial"
            />
            {touched.editorial && errors.editorial && <ErrorMsg>{errors.editorial}</ErrorMsg>}
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
              placeholder="Descripción del libro"
              rows={3}
            />
            {touched.description && errors.description && <ErrorMsg>{errors.description}</ErrorMsg>}
          </InputGroup>
          <InputGroup ref={refs.isbn}>
            <Label>ISBN</Label>
            <Input
              name="isbn"
              value={form.isbn}
              onChange={handleChange}
              onBlur={handleBlur}
              $active={touched.isbn && form.isbn}
              $error={errors.isbn}
              required
              placeholder="Código ISBN"
            />
            {touched.isbn && errors.isbn && <ErrorMsg>{errors.isbn}</ErrorMsg>}
          </InputGroup>
          <InputGroup ref={refs.genreBooks}>
            <Label>Géneros</Label>
            <GenresBox $error={errors.genreBooks}>
              {GENRE_BOOKS.map(g => (
                <GenreCheckbox key={g}>
                  <input
                    type="checkbox"
                    value={g}
                    checked={form.genreBooks.includes(g)}
                    onChange={handleGenreCheckbox}
                  />
                  <span>{g}</span>
                </GenreCheckbox>
              ))}
            </GenresBox>
            {touched.genreBooks && errors.genreBooks && <ErrorMsg>{errors.genreBooks}</ErrorMsg>}
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
          <Button type="submit">Guardar Cambios</Button>
        </Form>
      </Wrapper>
    </Bg>
  );
};

export default EditBookForm;

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