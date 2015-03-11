KnowledgEase.Views.QuestionShow = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  template: JST['questions/show'],

  render: function () {
    debugger
    this.$el.html(this.template({question: this.model}))
    return this
  },
})
