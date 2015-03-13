KnowledgEase.Collections.mostRequested = KnowledgEase.PaginatedCollection.extend({
  url: "api/want_answers/all",
  model: KnowledgEase.Models.Question,

  comparator: function (model) {
    return model.askers().length * -1
  }
})
