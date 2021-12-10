<template>
  <v-container class="wrapper">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="12" md="12">
        <h1 class="mb-5">Users</h1>
        <v-row justify="start" no-gutters>
          <v-col cols="4" sm="2" md="1">
            <v-btn
              block
              class="blue-grey darken-2 mb-5"
              @click="$refs.UsersEditDialog.open()"
            >
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
            <v-icon
              small
              class="mr-2"
              @click="$refs.UsersDetailsDialog.open(item.id)"
            >
              mdi-account
            </v-icon>
            <v-icon
              small
              class="mr-2"
              @click="$refs.UsersEditDialog.open(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-col>
      <UsersEditDialog ref="UsersEditDialog" @save="saveChanges" />
      <UsersDetailsDialog ref="UsersDetailsDialog" />
    </v-row>
  </v-container>
</template>

<script>
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
    };
  },
  async fetch() {
    this.items = await this.$api.users.find();
  },
  methods: {
    async deleteItem(item) {
      //If local array has <10 items, the item.id will differ from the remote array.
      //Passing item as parameter to sync local & remote deleting.
      let deleteStatus = await this.$api.users.remove(item.id);
      deleteStatus === 200
        ? this.items.splice(this.items.indexOf(item), 1)
        : alert("There's some problem with deleting on server!");
    },
    saveChanges(item) {
      const editedItemIndex = this.items.findIndex(
        (currentItem) => currentItem.id === item.id
      );
      if (editedItemIndex === -1) {
        // New item always has id === 101 i.e. it never exists in the local array initially.
        // Next new item always overwrites the old one.
        this.items.push(item);
      } else {
        this.items.splice(editedItemIndex, 1, item);
      }
    },
  },
};
</script>
