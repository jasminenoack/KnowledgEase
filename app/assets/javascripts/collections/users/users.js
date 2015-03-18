KnowledgEase.Collections.Users = Backbone.Collection.extend({
  url: "/api/users",

  model: KnowledgEase.Models.User,

  comparator: "name",

  getOrFetch: function (id) {
    var model = this.get(id)

    if (!model) {
      model = new this.model({id: id})
      this.add(model)
    }

    model.fetch()
    return model
  },
})

KnowledgEase.users = new KnowledgEase.Collections.Users;
