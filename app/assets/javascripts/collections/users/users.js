QuestionEase.Collections.Users = Backbone.Collection.extend({
  url: "/api/users",

  model: QuestionEase.Models.User,

  getOrFetch: function (id) {
    var model = this.get(id)

    if (!model) {
      model = new this.model({id: id})
    }

    model.fetch({
      success: function () {
        this.add(model, {merge: true})
      }.bind(this)
    })

    return model
  },
})
