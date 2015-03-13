KnowledgEase.Views.QuestionShow = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  template: JST['questions/show'],

  render: function () {
    this.$el.html(this.template({question: this.model}))

    var requestAnswer = new KnowledgEase.Views.RequestAnswer({
      model: this.model
    })
    this.addSubview(".request", requestAnswer)
    return this
  },
})
