KnowledgEase.Views.AnswerForm = Backbone.CompositeView.extend({
  initialize: function () {
  },

  events: {
    "click  button": "generateForm",
    "click form.create-answer button": "createAnswer"
  },

  template: JST['answers/answerButton'],
  formTemplate: JST['answers/answerForm'],

  render: function () {
    this.$el.html(this.template())
    return this
  },

  generateForm: function (event) {
    this.$el.html(this.formTemplate())
  },

  createAnswer: function (event) {
    event.preventDefault()

    var form = $(event.currentTarget).parent()
    var attrs = form.serializeJSON()
    var answer = new KnowledgEase.Models.Answer({
      question_id: this.model.id,
    })

    answer.save(attrs, {
      success: function () {
        this.model.answers().add(answer)
        this.$el.html(this.template())
        this.$el.prepend("<p>Request Successful</p>")
      }.bind(this),
      error: function (event, xhr) {
        this.$el.find("form").prepend("<p>There was an error</p>")
      }.bind(this)
    })
  }
})
