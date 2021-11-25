export default ({ $axios }, inject) => {
  inject("api", {
    users: {
      async find() {
        const response = await $axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        return response.data;
      },
      async findOne(id) {
        const response = await $axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        return response.data;
      },
      async remove(id) {
        const response = await $axios.delete(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        return response.status;
      },
      async store(id = null, data) {
        const response =
          id == null
            ? await $axios.post(
                `https://jsonplaceholder.typicode.com/users`,
                data
              )
            : await $axios.patch(
                `https://jsonplaceholder.typicode.com/users/${id}`,
                data
              );
        return response.status;
      },
    },
  });
};
