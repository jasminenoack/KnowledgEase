QuestionEase.Views.UserShow = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  template: JST['users/show'],

  render: function () {
    this.$el.html(this.template({user: this.model}))
    return this
  },
})
