import http from '../http-common';
const API = 'http://localhost:3000/data/apoteker';

class DataObatService {
  getAll() {
    return http.get(`${API}/obat`);
  }

  create(data) {
    return http.post(`${API}/obat`, data);
  }

  update(data) {
    return http.put(`${API}/obat/`, data);
  }

  delete(id) {
    return http.delete(`${API}/obat/${id}`);
  }
}

export default new DataObatService();
