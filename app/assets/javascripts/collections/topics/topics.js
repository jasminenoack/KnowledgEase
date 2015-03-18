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

KnowledgEase.Collections.All_Topics = Backbone.Collection.extend({
  model: KnowledgEase.Models.Topic,

  url: "api/topics?query=all",

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


KnowledgEase.topics = new KnowledgEase.Collections.All_Topics
KnowledgEase.topics.fetch()
