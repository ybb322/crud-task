export default class BaseCrud {
  constructor(axios, path) {
    this.axios = axios;
    this.path = path;
  }
  url = "https://jsonplaceholder.typicode.com";
  async find() {
    const response = await this.axios.get(`${this.url}${this.path}`);
    return response.data;
  }
  async findOne(id) {
    const response = await this.axios.get(`${this.url}${this.path}/${id}`);
    return response.data;
  }
  async remove(id) {
    const response = await this.axios.delete(`${this.url}${this.path}/${id}`);
    return response.status;
  }
  async store(data, id = null) {
    const response = id
      ? await this.axios.patch(`${this.url}${this.path}/${id}`, data)
      : await this.axios.post(`${this.url}${this.path}`, data);
    return response.data;
  }
}
