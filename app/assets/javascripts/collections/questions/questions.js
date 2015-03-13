KnowledgEase.Collections.Questions = KnowledgEase.PaginatedCollection.extend({
  rootUrl: "/api/questions",

  model: KnowledgEase.Models.Question,

  comparator: function (model1, model2) {
    if (model1.id < model2.id) {
      return 1
    } else {
      return -1
    }
  },

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
