export const dialogsMixins = {
  methods: {
    open(item = null) {
      this.editedItem = item
        ? JSON.parse(JSON.stringify(item))
        : JSON.parse(JSON.stringify(this.defaultItem));
      this.isDialogOpen = true;
    },
    async findOne(id) {
      this.item = await this.$api[this.entity].findOne(id);
    },
    async saveChanges() {
      let item;
      if (this.editedItem.id) {
        item = await this.$api[this.entity].store(
          this.editedItem,
          this.editedItem.id
        );
      } else {
        item = await this.$api[this.entity].store(this.editedItem);
      }
      this.$emit("save", item);
      this.close();
    },
    close() {
      this.isDialogOpen = false;
    },
  },
};
