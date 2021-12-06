<template>
  <v-dialog
    width="400"
    v-model="isEditDialogOpen"
    @click:outside="$emit('dialogClosed')"
  >
    <v-card max-width="400" class="pa-4">
      <h2 class="text-center mb-6">
        {{ this.editedItem.id ? "Edit Item" : "New Item" }}
      </h2>
      <v-textarea
        auto-grow
        no-resize
        :value="editedItem.title"
        @input="updateInput('title', $event)"
        label="Title"
      ></v-textarea>
      <v-textarea
        auto-grow
        no-resize
        :value="editedItem.body"
        @input="updateInput('body', $event)"
        label="Body"
      ></v-textarea>
      <v-btn block class="mb-4" @click="$emit('changesSaved')">Save</v-btn>
      <v-btn block @click="closeDialog()">Cancel</v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    editedItem: Object,
    isEditDialogOpen: Boolean,
  },
  methods: {
    updateInput(key, value) {
      this.$emit("inputUpdated", { ...this.editedItem, [key]: value });
    },
    closeDialog() {
      this.$emit("dialogClosed");
    },
  },
};
</script>
