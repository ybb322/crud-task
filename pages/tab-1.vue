<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12">
        <h1>tab-1</h1>
        <v-data-table
        :headers="headers"
        :items="apiData"
        :items-per-page="10"
        class="elevation-1"
    >
      <template v-slot:[`item.actions`]="{item}">
        <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template></v-data-table>
    </v-col>
  <v-dialog v-model="editDialog" width="500" class="edit-dialog">
    <v-card>
      <v-card-title>Edit item</v-card-title>
      <v-text-field label="ID" v-model="editedItem.id"></v-text-field>
      <v-text-field label="Name" v-model="editedItem.name"></v-text-field>
      <v-text-field label="Username" v-model="editedItem.username"></v-text-field>
      <v-text-field label="Email" v-model="editedItem.email"></v-text-field>
      <v-text-field label="City" v-model="editedItem.address.city"></v-text-field>
      <v-text-field label="Street" v-model="editedItem.address.street"></v-text-field>
      <v-text-field label="Suite" v-model="editedItem.address.suite"></v-text-field>
    </v-card>
    <v-btn class="primary" @click="saveChanges">Save</v-btn>
  </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios'

export default {
    data () {
        return {
        headers: [
                {
                text: 'ID',
                value:'id'
                },
                {
                text: 'Name',
                value:'name'
                },
                {
                text: 'Username',
                value:'username'
                },
                {
                text: 'Email',
                value:'email'
                },
                {
                text: 'City',
                value:'address.city'
                },
                {
                text: 'Street',
                value:'address.street'
                },
                {
                text: 'Suite',
                value:'address.suite'
                },
                {
                text:'Actions',
                value:'actions'
                }
        ],
        apiData: [],
        editDialog: false,
        editedItem: {
          id: '',
          name: '',
          username:'',
          email:'',
          address: {
            city: '',
            street:'',
            suite:'',
          },
        },
        }
    },
    mounted() {
    // Getting data from remote server
    const vm = this;
    axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then(response => (this.apiData = response.data))
    .then (() => {
    })
  },
  methods: {
    deleteItem (item) {
      // Deleting data on server
      axios
      .delete(`https://jsonplaceholder.typicode.com/users/${item.id}`)
      .then(response => {
        console.log(response)
        if (response.status == 200) {
      // If successful => deleting data locally
          this.apiData.splice(this.apiData.indexOf(item),1)
          console.log (`Item ${item.id} was deleted from the remote storage!`)
        }
      })
    },
    editItem (item) {
      // Editing data locally
      this.editedIndex = this.apiData.indexOf(item)
      this.editedItem.id = item.id
      this.editedItem.name = item.name;
      this.editedItem.username = item.username;
      this.editedItem.email = item.email;
      this.editedItem.address.city = item.address.city
      this.editedItem.address.street = item.address.street
      this.editedItem.address.suite = item.address.suite
      this.editDialog = true
    },
    saveChanges () {
      // Saving edited data locally
      this.apiData[this.editedIndex].id = this.editedItem.id
      this.apiData[this.editedIndex].name = this.editedItem.name
      this.apiData[this.editedIndex].username = this.editedItem.username
      this.apiData[this.editedIndex].email = this.editedItem.email
      this.apiData[this.editedIndex].address.city = this.editedItem.address.city
      this.apiData[this.editedIndex].address.street = this.editedItem.address.street
      this.apiData[this.editedIndex].address.suite = this.editedItem.address.suite
      // Updating saved data on server
      axios
      .patch(`http://jsonplaceholder.typicode.com/users/${this.apiData.indexOf(this.apiData[this.editedIndex + 1])}`, {
        body: {
          id: `${this.editedItem.id}`,
          name: `${this.editedItem.name}`,
          username: `${this.editedItem.username}`,
          email: `${this.editedItem.id}`,
          address: {
            city: `${this.editedItem.address.city}`,
            street: `${this.editedItem.address.street}`,
            suite: `${this.editedItem.address.suite}`,
          }
        }
      })
      .then(response => console.log (response))
      this.editDialog = false;
    }
  },
}
</script>


<style>

</style>