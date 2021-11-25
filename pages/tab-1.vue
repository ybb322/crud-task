<template>
  <v-container class="wrapper">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="12" md="12">
        <h1 class="mb-5">Users</h1>
        <v-row justify="start" no-gutters>
          <v-col cols="4" sm="2" md="1">
            <v-btn block class="blue-grey darken-2 mb-5" @click="showDialog()">
              New item
            </v-btn>
          </v-col>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="-1"
          class="elevation-15"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="getOneItem(item)">
              mdi-account
            </v-icon>
            <v-icon small class="mr-2" @click="showDialog(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-col>
      <v-dialog
        @click:outside="cancelChanges"
        v-model="isDialogOpen"
        width="400"
        class="item-dialog"
      >
        <v-card max-width="400" class="edit-dialog-card dialog-card">
          <v-row justify="center">
            <v-card-title class="mt-3">{{
              this.editedIndex === -1 ? "New Item" : "Edit Item"
            }}</v-card-title>
            <v-col cols="10">
              <v-text-field v-model="editedItem.name" label="Name" />
              <v-text-field v-model="editedItem.username" label="Username" />
              <v-text-field v-model="editedItem.email" label="Email" />
              <v-text-field v-model="editedItem.address.city" label="City" />
              <v-text-field
                v-model="editedItem.address.street"
                label="Street"
              />
              <v-text-field v-model="editedItem.address.suite" label="Suite">
              </v-text-field>
              <v-row justify="center" class="mb-3">
                <v-col cols="12">
                  <v-btn
                    class="mb-3"
                    block
                    color="blue-grey darken-1"
                    @click="saveChanges"
                    >Save</v-btn
                  >
                  <v-btn
                    plain
                    block
                    color="grey--text text--lighten-1 blue-grey darken-4"
                    @click="cancelChanges"
                    >Cancel</v-btn
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import Vue from "vue";

export default {
  data() {
    return {
      headers: [
        {
          text: "ID",
          value: "id",
        },
        {
          text: "Name",
          value: "name",
        },
        {
          text: "Username",
          value: "username",
        },
        {
          text: "Email",
          value: "email",
        },
        {
          text: "City",
          value: "address.city",
        },
        {
          text: "Street",
          value: "address.street",
        },
        {
          text: "Suite",
          value: "address.suite",
        },
        {
          text: "Actions",
          value: "actions",
        },
      ],
      items: [],
      editedIndex: -1,
      isDialogOpen: false,
      editedItem: {
        address: {},
      },
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
  async fetch() {
    // Getting data from remote server
    this.items = await this.$api.users.find();
  },
  methods: {
    //Getting one item from remote server
    async getOneItem(item) {
      await this.$api.users.findOne(item.id);
    },
    //Show modal window for New Item / Edit Item
    showDialog(item = null) {
      this.editedIndex = this.items.indexOf(item);
      //Check if item doesn't have any values
      this.editedItem =
        item == null
          ? JSON.parse(JSON.stringify(this.defaultItem)) //If true == it's a new item == clear the inputs
          : JSON.parse(JSON.stringify(item)); //If false == the item already exists == editing
      this.isDialogOpen = true;
    },
    async deleteItem(item) {
      //If it's a 'new' item (> 10th) == asign the a fake id for it
      if (this.items.indexOf(item) > 9) {
        item.id = this.items.indexOf(item) + 1;
      }
      // Deleting the item on server, checking if it's deleted
      (await this.$api.users.remove(item.id)) == 200
        ? this.items.splice(this.items.indexOf(item), 1) // If true == delete it locally
        : console.log("There's some problem with deleting on server!"); // If false == console.log the error message
    },
    async saveChanges() {
      // Saving edited data on server
      let userId;
      // Check if the item already existed
      if (this.editedIndex > -1) {
        //If true == Pass the index of the item as a parameter to store() in api.js
        userId = this.items.indexOf(this.items[this.editedIndex + 1]);
        //Updating the item on server, checking if it's updated
        (await this.$api.users.store(userId, this.editedItem)) == 200
          ? this.items.splice(
              this.editedIndex,
              1,
              JSON.parse(JSON.stringify(this.editedItem)) // If true == update it locally
            )
          : console.log("There's some problem with editing on server!"); // If false == console.log the error message
      }
      //If the item didn't exist (=creating)
      else {
        userId = null; //Passing null userId as a parameter to store() in api.js
        //Creating the item on server, checking if it's created
        (await this.$api.users.store(userId, this.editedItem)) == 201
          ? this.items.push(this.editedItem) // If true == create it locally
          : console.log(
              "There's some problem with creating the item on server!"
            ); // If false == console.log the error message
      }
      this.isDialogOpen = false;
      this.editedIndex = -1;
    },
    cancelChanges() {
      this.isDialogOpen = false;
      this.editedItem = JSON.parse(JSON.stringify(this.defaultItem));
      this.editedIndex = -1;
    },
  },
};
</script>

<style scoped>
.dialog-card {
  overflow: hidden;
}
</style>
