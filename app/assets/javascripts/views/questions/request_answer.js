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
  },

  createRequest: function (event) {
    event.preventDefault()
    var form = $(event.currentTarget).parent()
    var select_val = form.find("select").val()
    var answerer_id = select_val === "No One" ? null : select_val
    var answer_request = new KnowledgEase.Models.AnswerRequests({
      question_id: this.model.id,
      answerer_id: answerer_id
    })

    answer_request.save({}, {
      success: function () {
        this.$el.html(this.template())
        this.$el.prepend("<p>Request Successful</p>")

        var button = this.$el.parent().parent().parent().find(".follow")
        var text = button.text("UnFollow")

        this.model.set("followed", !this.model.get("followed"))
      }.bind(this),
      error: function (event, xhr) {
        this.$el.find("form").prepend("<p>You have already made this<br> request pick a different user!</p>")
      }.bind(this)
    })
  }
})
