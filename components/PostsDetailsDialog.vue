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
        // Items with id < 100 are actual items, that exist on the server.
        this.item = await this.$api.posts.findOne(id);
      } else {
        // Items with id > 100 don't actually exist on the server.
        this.item = this.defaultItem;
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
