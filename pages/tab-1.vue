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
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template></v-data-table>
    </v-col>
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
        }
    },
    mounted() {
    axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then(response => (this.apiData = response.data))
  },
  methods: {
    deleteItem (item) {
      axios
      .delete(`https://jsonplaceholder.typicode.com/users/${item.id}`)
      .then(response => {
        console.log(response)
        if (response.status == 200) {
          this.apiData.splice(this.apiData.indexOf(item),1)
          console.log (`Item ${item.id} was deleted from the remote storage!`)
        }
      })
    }
  },
}
</script>