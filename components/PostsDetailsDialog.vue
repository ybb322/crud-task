<template>
  <v-dialog width="600" v-model="isDialogOpen" @click:outside="close()">
    <v-card v-if="item.title">
      <v-card-title>{{ item.title }}</v-card-title>
      <v-card-text>{{ item.body }}</v-card-text>
      <v-card-text>User ID: {{ item.userId }}</v-card-text>
    </v-card>
    <v-card v-else>
      <v-card-title>This item doesn't exist on the server</v-card-title>
    </v-card>
    <v-btn @click="close()">Close</v-btn>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      isDialogOpen: false,
      item: {},
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
        // Clear the object properties > Display v-card with an error.
        this.item = this.defaultItem;
      }
      this.isDialogOpen = true;
    },
    close() {
      this.isDialogOpen = false;
    },
  },
};
</script>
