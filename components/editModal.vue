<template>
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
          <v-text-field v-model="editedItem.address.street" label="Street" />
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
</template>
