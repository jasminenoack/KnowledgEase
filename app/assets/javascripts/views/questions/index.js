KnowledgEase.Views.QuestionIndex = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.collection, "sync", this.render)
  },

  template: JST['questions/index'],

  render: function () {
    this.$el.html(this.template({questions: this.collection}))

    return this
  },
})
