KnowledgEase.Collections.specificRequests = KnowledgEase.PaginatedCollection.extend({
  url: "api/want_answers/specific",
  model: KnowledgEase.Models.Question,

  comparator: function (model) {
    return model.askers().length * -1
  }
})
