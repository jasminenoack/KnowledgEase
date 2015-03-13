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
    this.addAnswers()
    return this
  },

  addAnswers: function () {
    this.model.answers().each(function (answer) {
      var answerView = new KnowledgEase.Views.answerView({model: answer})
      this.addSubview(".answers", answerView)
    }.bind(this))
  },
})
