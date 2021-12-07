<template>
  <v-dialog v-model="isDialogOpen" @click:outside="close()">
    <v-card>
      <v-card-title>{{ item.title }}</v-card-title>
      <v-card-text>{{ item.body }}</v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      item: {},
      isDialogOpen: false,
      defaultItem: {
        id: "",
        userId: "",
        title: "",
        body: "",
      },
    };
  },
  methods: {
    async open(id) {
      if (id <= 100) {
        //If true - get it.
        const response = await this.$api.posts.findOne(id);
        //Put its data into the modal
        this.item = JSON.parse(JSON.stringify(response));
      } else {
        //If false - clear the text
        this.item = JSON.parse(JSON.stringify(this.defaultItem));
        // Show the error
        this.item.title = "This item doesn't exist on the server";
      }
      this.isDialogOpen = true;
    },
    close() {
      this.isDialogOpen = false;
    },
  },
};
</script>
