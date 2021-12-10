<template>
  <v-dialog width="400" v-model="isDialogOpen" @click:outside="close()">
    <v-card v-if="item.name">
      <v-card-title>{{ "Name: " + item.name }}</v-card-title>
      <v-card-text>{{ "Username: " + item.username }}</v-card-text>
      <v-card-text> {{ "Email: " + item.email }}</v-card-text>
      <v-card-text>{{ "Phone number: " + item.phone }}</v-card-text>
      <v-card-text>{{ "City: " + item.address.city }}</v-card-text>
      <v-card-text>{{ "Street: " + item.address.street }}</v-card-text>
      <v-card-text>{{ "Zipcode: " + item.address.zipcode }}</v-card-text>
      <v-card-text> {{ "Suite / Apt: " + item.address.suite }}</v-card-text>
    </v-card>
    <v-card v-else>
      <v-card-title>This user doesn't exist on the server</v-card-title>
    </v-card>
    <v-btn block @click="close()"> Close </v-btn>
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
      item: {},
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
    this.item = JSON.parse(JSON.stringify(this.defaultItem));
  },
  methods: {
    async open(id) {
      if (id <= 10) {
        // Items with id < 10 are actual items, that exist on the server.
        await this.findOne(id);
      } else {
        // Items with id > 100 don't actually exist on the server.
        // Clear the object properties > Display v-card with an error.
        this.item = this.defaultItem;
      }
      this.isDialogOpen = true;
    },
  },
};
</script>
