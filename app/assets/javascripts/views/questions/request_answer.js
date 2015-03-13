KnowledgEase.Views.RequestAnswer = Backbone.CompositeView.extend({
  initialize: function () {
  },

  events: {
    "click  button": "generateForm",
    "click form.submit-answer-request button": "createRequest"
  },

  template: JST['questions/requestAnswerButton'],
  formTemplate: JST['questions/requestAnswerForm'],

  render: function () {
    this.$el.html(this.template())
    return this
  },

  generateForm: function (event) {
    this.$el.html(this.formTemplate())
    console.log(this.$el)
  },

  createRequest: function (event) {
    event.preventDefault()
    var form = $(event.currentTarget).parent()
    var answer_request = new KnowledgEase.Models.AnswerRequests
    var attrs = form.serializeJSON()
    answer_request.save(attrs, {
      success: function () {
        console.log("success")
      }
    })
  }
})
