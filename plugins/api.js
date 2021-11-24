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
        console.log(response);
        return response.data;
      },
      async remove(id) {
        const response = await $axios.delete(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        console.log(response);
      },
      async update(userId, updatedItem) {
        const response = await $axios.patch(
          `https://jsonplaceholder.typicode.com/users/${userId}`,
          updatedItem
        );
        console.log(response);
        return response;
      },
      async create(newItem) {
        const response = await $axios.post(
          `https://jsonplaceholder.typicode.com/users`,
          newItem
        );
        console.log(response);
      },
    },
  });
};
