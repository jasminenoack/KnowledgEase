KnowledgEase.Views.CommentView = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  template: JST['comments/CommentView'],

  events: {
  },

  tagName: 'li class="group comment"',

  render: function () {
    this.$el.html(this.template({comment: this.model}))
    return this
  },

})
