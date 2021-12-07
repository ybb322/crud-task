<template>
  <v-dialog width="600" v-model="isDialogOpen" @click:outside="close()">
    <v-card>
      <v-card-title>{{ item.title }}</v-card-title>
      <v-card-text>{{ item.body }}</v-card-text>
      <v-card-text>User ID: {{ item.userId }}</v-card-text>
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
        const response = await this.$api.posts.findOne(id);
        this.item = JSON.parse(JSON.stringify(response));
      } else {
        this.item = JSON.parse(JSON.stringify(this.defaultItem));
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
