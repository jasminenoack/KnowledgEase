KnowledgEase.Views.QuestionIndex = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.collection, "add sync change", this.render)
  },

  template: JST['questions/index'],

  render: function () {
    console.log("render")
    this.$el.html(this.template({questions: this.collection}))

    return this
  },
})
