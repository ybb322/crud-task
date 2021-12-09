<template>
  <v-dialog width="400" v-model="isDialogOpen" @click:outside="close()">
    <v-card max-width="400" class="pa-4">
      <h2 class="text-center mb-6">
        {{ this.editedItem.id ? "Edit Item" : "New Item" }}
      </h2>
      <v-textarea
        auto-grow
        no-resize
        label="Title"
        v-model="editedItem.title"
      ></v-textarea>
      <v-textarea
        auto-grow
        no-resize
        label="Body"
        v-model="editedItem.body"
      ></v-textarea>
      <v-btn block class="mb-4" @click="saveChanges()">Save</v-btn>
      <v-btn block @click="close()">Cancel</v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      editedItem: {},
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
    open(item = null) {
      this.editedItem = item
        ? JSON.parse(JSON.stringify(item))
        : JSON.parse(JSON.stringify(this.defaultItem));
      this.isDialogOpen = true;
    },
    async saveChanges() {
      let item;
      if (this.editedItem.id) {
        item = await this.$api.posts.store(this.editedItem, this.editedItem.id);
      } else {
        item = await this.$api.posts.store(this.editedItem);
      }
      this.$emit("save", item);
      this.close();
    },
    close() {
      this.isDialogOpen = false;
    },
  },
};
</script>
