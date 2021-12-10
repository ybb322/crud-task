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
import { dialogsMixins } from "~/mixins/dialogsMixins";
export default {
  mixins: [dialogsMixins],
  data() {
    return {
      entity: "posts",
      isDialogOpen: false,
      editedItem: {},
      defaultItem: {
        id: "",
        userId: "",
        title: "",
        body: "",
      },
    };
  },
};
</script>
