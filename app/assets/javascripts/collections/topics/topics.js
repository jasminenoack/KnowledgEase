KnowledgEase.Collections.Topics = Backbone.Collection.extend({
  model: KnowledgEase.Models.Topic,

  url: "api/topics",

  getOrFetch: function (id) {
    var model = this.get(id)

    if (!model) {
      model = new this.model({id: id})
      this.add(model)
    }

    model.fetch()
    return model
  },

  comparator: "title"
})

KnowledgEase.topics = new KnowledgEase.Collections.Topics
KnowledgEase.topics.url = "api/topics?query=all"
KnowledgEase.topics.fetch()
