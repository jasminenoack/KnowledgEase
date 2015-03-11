


KnowledgEase.Collections.Questions = KnowledgEase.PaginatedCollection.extend({
  rootUrl: "/api/questions",

  model: KnowledgEase.Models.Question,

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
