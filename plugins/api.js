export default ({ $axios }, inject) => {
  inject("api", {
    users: {
      path: "https://jsonplaceholder.typicode.com/users",
      async find() {
        const response = await $axios.get(this.path);
        return response.data;
      },
      async findOne(id) {
        const response = await $axios.get(`${this.path}/${id}`);
        return response.data;
      },
      async remove(id) {
        const response = await $axios.delete(`${this.path}/${id}`);
        console.log(response);
        return response.status;
      },
      async store(data, id = null) {
        const response =
          id == null
            ? await $axios.post(`${this.path}`, data)
            : await $axios.patch(`${this.path}/${id}`, data);
        return response.data;
      },
    },
  });
};
