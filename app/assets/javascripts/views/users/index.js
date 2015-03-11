KnowledgEase.Views.UserIndex = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.collection, "add sync", this.render)
  },

  template: JST['users/index'],

  render: function () {
    this.$el.html(this.template({users: this.collection}))

    return this
  },
})
