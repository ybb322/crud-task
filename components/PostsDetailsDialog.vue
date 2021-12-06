<template>
  <v-dialog
    v-model="isDetailsDialogOpen"
    @click:outside="$emit('dialogClosed')"
  >
    <v-card>
      <v-card-title>{{ item.title }}</v-card-title>
      <v-card-text>{{ item.body }}</v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    item: Object,
    isDetailsDialogOpen: Boolean,
  },
  methods: {
    closeDialog() {
      this.$emit("dialogClosed");
    },
  },
};
</script>
