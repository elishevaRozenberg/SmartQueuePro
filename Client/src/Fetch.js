// class Fetch {
//   constructor(baseURL = '/api') {
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
  constructor() {
    this.baseUrl = ''; // ניתן להגדיר כתובת בסיס אם צריך
  }

  async request(method, url, data) {
    const headers = {};
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = 'Bearer ' + token;
    }
    if (data) {
      headers['Content-Type'] = 'application/json';
    }

    const res = await fetch(this.baseUrl + url, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined
    });
    if (!res.ok) {
      // במקרה שגיאה מצד השרת, נזרוק שגיאה עם ההודעה שהתקבלה
      const errorMsg = (await res.json()).message || 'Request failed';
      throw new Error(errorMsg);
    }
    return res.json();
  }

  get(url) {
    return this.request('GET', url);
  }

  post(url, data) {
    return this.request('POST', url, data);
  }

  put(url, data) {
    return this.request('PUT', url, data);
  }

  patch(url, data) {
    return this.request('PATCH', url, data);
  }

  delete(url) {
    return this.request('DELETE', url);
  }
}

export default Fetch;
