import BaseCrud from "~/services/basecrud.js";
export default ({ $axios }, inject) => {
  inject("api", {
    users: new BaseCrud($axios, "/users"),
    posts: new BaseCrud($axios, "/posts"),
  });
};
