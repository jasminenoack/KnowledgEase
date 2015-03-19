KnowledgEase.Views.KnowsAboutButton = Backbone.CompositeView.extend({
  initialize: function () {
  },

  events: {
    "click  .known": "toggleFollow",
  },

  template: JST['topics/knowAboutButton'],

  render: function () {
    this.$el.html(this.template({topic: this.model}))
    return this
  },

  toggleFollow: function (event) {
    event.stopPropagation()
    event.preventDefault()

    if (this.model.get("knowledgable")) {
      url = "/api/users/remove_knows_about"
      method = "delete"
      newText = "Mark UnKnown"
    } else {
      url = "/api/users/add_knows_about"
      method = "post"
      newText = "Mark Known"
    }

    $.ajax({
      url: url,
      method: method,
      data: {topic_id: this.model.id},
      success: function (json) {
        this.model.set("knowledgable", !this.model.get("knowledgable"))
        this.render()
      }.bind(this),
      error: function (xhr) {
        this.render()
      }.bind(this)
    })
  }
})
