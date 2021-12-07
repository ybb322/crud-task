import BaseCrud from "~/services/basecrud";
export default ({ $axios }, inject) => {
  inject("api", {
    users: new BaseCrud($axios, "/users"),
    posts: new BaseCrud($axios, "/posts"),
  });
};
