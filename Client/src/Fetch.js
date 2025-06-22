// class Fetch {
//   constructor(baseURL = 'http://localhost:3000/api') {
//     this.baseURL = baseURL;
//   }

//   async request(method, endpoint, data = null) {
//     const url = `${this.baseURL}${endpoint}`;
//     const options = {
//       method,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include', // הכרחי לסשנים
//     };

//     if (data) {
//       options.body = JSON.stringify(data);
//     }

//     try {
//       const res = await fetch(url, options);

//       if (!res.ok) {
//         const errorData = await res.json().catch(() => ({}));
//         const message = errorData.message || `Request failed with status ${res.status}`;
//         throw new Error(message);
//       }

//       // אם אין גוף (204), אל תנסי לפרסר
//       if (res.status === 204) return null;

//       return await res.json();
//     } catch (error) {
//       console.error(`[${method}] ${url} error:`, error.message);
//       throw error;
//     }
//   }

//   get(endpoint) {
//     return this.request('GET', endpoint);
//   }

//   post(endpoint, data) {
//     return this.request('POST', endpoint, data);
//   }

//   put(endpoint, data) {
//     return this.request('PUT', endpoint, data);
//   }

//   delete(endpoint) {
//     return this.request('DELETE', endpoint);
//   }
// }

// export default Fetch;

class Fetch {
  constructor(baseURL = 'http://localhost:3000') {
    this.baseURL = baseURL;
  }

  async request(method, endpoint, data = null) {
    const url = `${this.baseURL}${endpoint}`;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // הכרחי לסשנים
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const res = await fetch(url, options);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const message = errorData.message || `Request failed with status ${res.status}`;
        throw new Error(message);
      }

      if (res.status === 204) return null;

      return await res.json();
    } catch (error) {
      console.error(`[${method}] ${url} error:`, error.message);
      throw error;
    }
  }

  get(endpoint) {
    return this.request('GET', endpoint);
  }

  post(endpoint, data) {
    return this.request('POST', endpoint, data);
  }

  put(endpoint, data) {
    return this.request('PUT', endpoint, data);
  }

  delete(endpoint) {
    return this.request('DELETE', endpoint);
  }
}

export default Fetch;
