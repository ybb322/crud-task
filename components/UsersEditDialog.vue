<template>
  <v-dialog
    v-model="isDialogOpen"
    width="400"
    class="item-dialog"
    @click:outside="close()"
  >
    <v-card max-width="400" class="dialog-card">
      <v-row justify="center">
        <v-card-title class="mt-3">{{
          this.editedItem.id ? "Edit Item" : "New Item"
        }}</v-card-title>
        <v-col cols="10">
          <v-text-field v-model="editedItem.name" label="Name" />
          <v-text-field v-model="editedItem.username" label="Username" />
          <v-text-field v-model="editedItem.email" label="Email" />
          <v-text-field v-model="editedItem.address.city" label="City" />
          <v-text-field v-model="editedItem.address.street" label="Street" />
          <v-text-field v-model="editedItem.address.suite" label="Suite">
          </v-text-field>
          <v-row justify="center" class="mb-3">
            <v-col cols="12">
              <v-btn
                class="mb-3"
                block
                color="blue-grey darken-1"
                @click="saveChanges()"
                >Save</v-btn
              >
              <v-btn
                plain
                block
                color="grey--text text--lighten-1 blue-grey darken-4"
                @click="close()"
                >Cancel</v-btn
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import { dialogsMixins } from "~/mixins/dialogsMixins";
export default {
  mixins: [dialogsMixins],
  data() {
    return {
      entity: "users",
      isDialogOpen: false,
      editedItem: {},
      defaultItem: {
        id: "",
        name: "",
        username: "",
        email: "",
        address: {
          city: "",
          street: "",
          suite: "",
        },
      },
    };
  },
  created() {
    this.editedItem = JSON.parse(JSON.stringify(this.defaultItem));
  },
  methods: {
    close() {
      this.isDialogOpen = false;
    },
  },
};
</script>

<style>
.dialog-card {
  overflow: hidden;
}
</style>
