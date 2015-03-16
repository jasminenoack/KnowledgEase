KnowledgEase.Views.FollowButton = Backbone.CompositeView.extend({
  initialize: function () {
    if (this.model instanceof KnowledgEase.Models.User) {
      this.type = "User"
    } else if (this.model instanceof KnowledgEase.Models.Question) {
      this.type = "Question"
    } else {
      this.type = "Topic"
    }
  },

  events: {
    "click  .follow": "toggleFollow",
  },

  template: JST['feed/follow'],

  render: function () {
    this.$el.html(this.template({object: this.model}))
    return this
  },

  toggleFollow: function (event) {
    event.stopPropagation()
    event.preventDefault()

    $.ajax({
      url: "/api/toggle_follow",
      method: "post",
      data: {followable_id: this.model.id, followable_type: this.type},
      success: function (json) {
        this.model.set("followed", !this.model.get("followed"))
        this.render()
      }.bind(this),
      error: function (xhr) {
        this.render()
      }.bind(this)
    })
  }
})
