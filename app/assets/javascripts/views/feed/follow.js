KnowledgEase.Views.FollowButton = Backbone.CompositeView.extend({
  initialize: function () {
    if (this.model instanceof KnowledgEase.Models.User) {
      this.type = "User"
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
        this.model.fetch()
      }.bind(this),
      error: function (xhr) {
        this.model.fetch()
      }.bind(this)
    })

    console.log("button")
  }
})
