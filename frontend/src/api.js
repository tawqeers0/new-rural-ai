const BASE_URL = 'http://localhost:8000/api/v1';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'API Request Failed');
  }
  return response.json();
};

export const api = {
  // Student Endpoints
  fetchLessons: async (grade = 3) => {
    try {
      const response = await fetch(`${BASE_URL}/lessons/${grade}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('fetchLessons Error:', error);
      throw error;
    }
  },
  askTutor: async (query, grade = 3) => {
    try {
      const response = await fetch(`${BASE_URL}/ai_tutor/ask?query=${encodeURIComponent(query)}&grade=${grade}`, {
        method: 'POST',
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('askTutor Error:', error);
      throw error;
    }
  },

  // Admin Endpoints
  getSyncStatus: async () => {
    try {
      const response = await fetch(`${BASE_URL}/sync/status`);
      return await handleResponse(response);
    } catch (error) {
      console.error('getSyncStatus Error:', error);
      throw error;
    }
  },
  getCacheStatus: async () => {
    try {
      const response = await fetch(`${BASE_URL}/connectivity/cache/status`);
      return await handleResponse(response);
    } catch (error) {
      console.error('getCacheStatus Error:', error);
      throw error;
    }
  },
  getTeacherMatching: async () => {
    try {
      const response = await fetch(`${BASE_URL}/matching/demo`);
      return await handleResponse(response);
    } catch (error) {
      console.error('getTeacherMatching Error:', error);
      throw error;
    }
  }
};
