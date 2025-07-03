// Utility functions for better error handling and API communication
export const apiUtils = {
  // Enhanced fetch with better error handling
  async fetchWithErrorHandling(url, options = {}) {
    console.log(`=== API CALL ===`);
    console.log(`URL: ${url}`);
    console.log(`Method: ${options.method || 'GET'}`);
    console.log(`Headers:`, options.headers);
    if (options.body) {
      console.log(`Body:`, options.body);
    }
    
    try {
      const response = await fetch(url, options);
      
      console.log(`=== API RESPONSE ===`);
      console.log(`Status: ${response.status}`);
      console.log(`Status Text: ${response.statusText}`);
      console.log(`OK: ${response.ok}`);
      
      // Clone the response to read it multiple times
      const responseClone = response.clone();
      
      // Try to read as text first
      const responseText = await responseClone.text();
      console.log(`Response Text: ${responseText}`);
      
      // If there's no content, handle appropriately
      if (!responseText) {
        if (response.ok) {
          return { ok: true, data: null, status: response.status };
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      }
      
      // Try to parse as JSON
      let data;
      try {
        data = JSON.parse(responseText);
        console.log(`Parsed Data:`, data);
      } catch (parseError) {
        console.warn(`Failed to parse JSON:`, parseError);
        // If it's not JSON but the response is OK, return the text
        if (response.ok) {
          return { ok: true, data: responseText, status: response.status };
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}\nResponse: ${responseText}`);
        }
      }
      
      // Check if the response indicates success
      if (!response.ok) {
        const errorMessage = data?.message || data?.error || `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }
      
      return { ok: true, data, status: response.status };
      
    } catch (error) {
      console.error(`=== API ERROR ===`);
      console.error(`Error:`, error);
      throw error;
    }
  },

  // Get all books (with filtering)
  async getBooks(options = {}) {
    const { 
      isAdmin = false, 
      activeOnly = true, 
      author = null, 
      page = 0, 
      size = 10 
    } = options;
    
    let url;
    if (isAdmin) {
      url = 'http://localhost:8080/admin/books';
    } else {
      url = `http://localhost:8080/books?activeOnly=${activeOnly}`;
      if (author) url += `&author=${encodeURIComponent(author)}`;
      url += `&page=${page}&size=${size}`;
    }
    
    const token = localStorage.getItem('token');
    const result = await this.fetchWithErrorHandling(url, {
      headers: {
        'Accept': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    });
    
    // Handle paginated response from backend
    if (result.data && result.data.content && Array.isArray(result.data.content)) {
      return result.data.content;
    }
    
    return result.data;
  },

  // Get all albums (with filtering)
  async getAlbums(options = {}) {
    const { 
      isAdmin = false, 
      activeOnly = true, 
      author = null, 
      page = 0, 
      size = 10 
    } = options;
    
    let url;
    if (isAdmin) {
      url = 'http://localhost:8080/admin/musicAlbums';
    } else {
      url = `http://localhost:8080/musicAlbums?activeOnly=${activeOnly}`;
      if (author) url += `&author=${encodeURIComponent(author)}`;
      url += `&page=${page}&size=${size}`;
    }
    
    const token = localStorage.getItem('token');
    const result = await this.fetchWithErrorHandling(url, {
      headers: {
        'Accept': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    });
    
    // Handle paginated response from backend
    if (result.data && result.data.content && Array.isArray(result.data.content)) {
      return result.data.content;
    }
    
    return result.data;
  },

  // Create a book
  async createBook(bookData) {
    const token = localStorage.getItem('token');
    
    const result = await this.fetchWithErrorHandling('http://localhost:8080/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify(bookData)
    });
    
    return result.data;
  },

  // Update a book
  async updateBook(bookData) {
    const token = localStorage.getItem('token');
    
    const result = await this.fetchWithErrorHandling('http://localhost:8080/books', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify(bookData)
    });
    
    // Handle wrapped response (update returns {ok: true, data: book})
    if (result.data && typeof result.data === 'object' && 'data' in result.data) {
      return result.data.data;
    }
    
    return result.data;
  },

  // Toggle book active status (using new endpoint)
  async toggleBookStatus(bookId, newStatus) {
    const token = localStorage.getItem('token');
    
    try {
      const result = await this.fetchWithErrorHandling(`http://localhost:8080/admin/books/${bookId}/toggle-status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({ active: newStatus })
      });
      
      return { success: true, data: result.data };
    } catch (error) {
      console.error('Error toggling book status:', error);
      return { success: false, error: error.message };
    }
  },

  // Get a book by ID
  async getBook(bookId, isAdmin = false) {
    let url;
    if (isAdmin) {
      url = `http://localhost:8080/books/${bookId}?activeOnly=false`;
    } else {
      url = `http://localhost:8080/books/${bookId}?activeOnly=true`;
    }
    
    const token = localStorage.getItem('token');
    const result = await this.fetchWithErrorHandling(url, {
      headers: {
        'Accept': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    });
    
    // Handle both direct and wrapped responses
    if (result.data && typeof result.data === 'object') {
      // If response has nested data structure like {ok: true, data: book}
      if ('data' in result.data) {
        return result.data.data;
      }
      // If response is direct book data
      return result.data;
    }
    
    return result.data;
  },

  // Create an album
  async createAlbum(albumData) {
    const token = localStorage.getItem('token');
    
    const result = await this.fetchWithErrorHandling('http://localhost:8080/musicAlbums', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify(albumData)
    });
    
    return result.data;
  },

  // Update an album
  async updateAlbum(albumData) {
    const token = localStorage.getItem('token');
    
    const result = await this.fetchWithErrorHandling('http://localhost:8080/musicAlbums', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify(albumData)
    });
    
    // Handle wrapped response (update returns {ok: true, data: album})
    if (result.data && typeof result.data === 'object' && 'data' in result.data) {
      return result.data.data;
    }
    
    return result.data;
  },

  // Toggle album active status (using new endpoint)
  async toggleAlbumStatus(albumId, newStatus) {
    const token = localStorage.getItem('token');
    
    try {
      const result = await this.fetchWithErrorHandling(`http://localhost:8080/admin/musicAlbums/${albumId}/toggle-status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({ active: newStatus })
      });
      
      return { success: true, data: result.data };
    } catch (error) {
      console.error('Error toggling album status:', error);
      return { success: false, error: error.message };
    }
  },

  // Get an album by ID
  async getAlbum(albumId, isAdmin = false) {
    let url;
    if (isAdmin) {
      url = `http://localhost:8080/musicAlbums/${albumId}?activeOnly=false`;
    } else {
      url = `http://localhost:8080/musicAlbums/${albumId}?activeOnly=true`;
    }
    
    const token = localStorage.getItem('token');
    const result = await this.fetchWithErrorHandling(url, {
      headers: {
        'Accept': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    });
    
    // Handle both direct and wrapped responses
    if (result.data && typeof result.data === 'object') {
      // If response has nested data structure like {ok: true, data: album}
      if ('data' in result.data) {
        return result.data.data;
      }
      // If response is direct album data
      return result.data;
    }
    
    return result.data;
  },

  // Get admin statistics
  async getAdminStats() {
    const token = localStorage.getItem('token');
    
    const result = await this.fetchWithErrorHandling('http://localhost:8080/admin/stats', {
      headers: {
        'Accept': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    });
    
    return result.data;
  },

  // Validate book data before sending
  validateBookData(bookData) {
    const errors = {};
    
    if (!bookData.title?.trim()) errors.title = 'El título es obligatorio';
    if (!bookData.author?.trim()) errors.author = 'El autor es obligatorio';
    if (!bookData.editorial?.trim()) errors.editorial = 'La editorial es obligatoria';
    if (!bookData.description?.trim()) errors.description = 'La descripción es obligatoria';
    if (!bookData.isbn?.trim()) errors.isbn = 'El ISBN es obligatorio';
    if (!bookData.genreBooks?.length) errors.genreBooks = 'Selecciona al menos un género';
    if (!bookData.price || isNaN(bookData.price) || Number(bookData.price) <= 0) errors.price = 'Precio inválido';
    if (bookData.stock === undefined || bookData.stock === null || isNaN(bookData.stock) || Number(bookData.stock) < 0) errors.stock = 'Stock inválido';
    if (!bookData.urlImage?.trim() || !/^https?:\/\/.+\..+/.test(bookData.urlImage)) errors.urlImage = 'URL de imagen inválida';
    
    return errors;
  },

  // Validate album data before sending
  validateAlbumData(albumData) {
    const errors = {};
    
    if (!albumData.title?.trim()) errors.title = 'El título es obligatorio';
    if (!albumData.author?.trim()) errors.author = 'El artista es obligatorio';
    if (!albumData.recordLabel?.trim()) errors.recordLabel = 'La discográfica es obligatoria';
    if (!albumData.description?.trim()) errors.description = 'La descripción es obligatoria';
    if (!albumData.isrc?.trim()) errors.isrc = 'El ISRC es obligatorio';
    if (!albumData.genres?.length) errors.genres = 'Selecciona al menos un género';
    if (!albumData.price || isNaN(albumData.price) || Number(albumData.price) <= 0) errors.price = 'Precio inválido';
    if (albumData.stock === undefined || albumData.stock === null || isNaN(albumData.stock) || Number(albumData.stock) < 0) errors.stock = 'Stock inválido';
    if (!albumData.urlImage?.trim() || !/^https?:\/\/.+\..+/.test(albumData.urlImage)) errors.urlImage = 'URL de imagen inválida';
    if (!albumData.year || isNaN(albumData.year) || Number(albumData.year) < 1000 || Number(albumData.year) > new Date().getFullYear() + 1) errors.year = 'Año inválido';
    
    return errors;
  },

  // Format book data for API
  formatBookData(formData) {
    return {
      ...(formData.id && { id: formData.id }),
      title: formData.title.trim(),
      author: formData.author.trim(),
      editorial: formData.editorial.trim(),
      description: formData.description.trim(),
      isbn: formData.isbn.trim(),
      genreBooks: formData.genreBooks,
      price: Number(formData.price),
      stock: Number(formData.stock),
      urlImage: formData.urlImage.trim(),
      ...(formData.active !== undefined && { active: formData.active })
    };
  },

  // Format album data for API
  formatAlbumData(formData) {
    return {
      ...(formData.id && { id: formData.id }),
      title: formData.title.trim(),
      author: formData.author.trim(),
      recordLabel: formData.recordLabel.trim(),
      year: Number(formData.year),
      description: formData.description.trim(),
      isrc: formData.isrc.trim(),
      genres: formData.genres,
      price: Number(formData.price),
      stock: Number(formData.stock),
      urlImage: formData.urlImage.trim(),
      ...(formData.active !== undefined && { active: formData.active })
    };
  }
};

export default apiUtils;

// Export specific functions for easier import
export const fetchWithErrorHandling = apiUtils.fetchWithErrorHandling.bind(apiUtils);
export const getBooks = apiUtils.getBooks.bind(apiUtils);
export const getAlbums = apiUtils.getAlbums.bind(apiUtils);
export const getBook = apiUtils.getBook.bind(apiUtils);
export const getAlbum = apiUtils.getAlbum.bind(apiUtils);
export const createBook = apiUtils.createBook.bind(apiUtils);
export const updateBook = apiUtils.updateBook.bind(apiUtils);
export const createAlbum = apiUtils.createAlbum.bind(apiUtils);
export const updateAlbum = apiUtils.updateAlbum.bind(apiUtils);
export const toggleBookStatus = apiUtils.toggleBookStatus.bind(apiUtils);
export const toggleAlbumStatus = apiUtils.toggleAlbumStatus.bind(apiUtils);
export const getAdminStats = apiUtils.getAdminStats.bind(apiUtils);
export const validateBookData = apiUtils.validateBookData.bind(apiUtils);
export const validateAlbumData = apiUtils.validateAlbumData.bind(apiUtils);
export const formatBookData = apiUtils.formatBookData.bind(apiUtils);
export const formatAlbumData = apiUtils.formatAlbumData.bind(apiUtils);
