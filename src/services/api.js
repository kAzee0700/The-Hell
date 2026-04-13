const API_BASE = 'http://localhost:3001/api';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('hell_token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    },
    ...options
  };

  const response = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || '요청 실패');
  }

  return data;
}

export const api = {
  auth: {
    login: (email, password) =>
      request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      }),

    signupIndividual: (data) =>
      request('/auth/signup/individual', {
        method: 'POST',
        body: JSON.stringify(data)
      }),

    signupCompany: (data) =>
      request('/auth/signup/company', {
        method: 'POST',
        body: JSON.stringify(data)
      }),

    me: () => request('/auth/me'),

    logout: () =>
      request('/auth/logout', { method: 'POST' })
  },

  admin: {
    getUsers: () => request('/admin/users'),
    getCompanies: () => request('/admin/companies'),
    verifyCompany: (userId, status) =>
      request(`/admin/companies/${userId}/verify`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      })
  },

  viewHistory: {
    getMyHistory: () => request('/view-history')
  },

  company: {
    requestVerification: () =>
      request('/company/request-verification', { method: 'POST' })
  },

  profile: {
    getMyProfile: () => request('/profile/me'),
    updateVisibility: (visibility) =>
      request('/profile/visibility', {
        method: 'PATCH',
        body: JSON.stringify({ visibility })
      })
  }
};

export function setToken(token) {
  localStorage.setItem('hell_token', token);
}

export function getToken() {
  return localStorage.getItem('hell_token');
}

export function clearToken() {
  localStorage.removeItem('hell_token');
}
