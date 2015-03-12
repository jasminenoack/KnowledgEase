KnowledgEase.Collections.WithRequestedAnswers = Backbone.Collection.extend({
  url: "api/want_answers",

  specificRequests: function () {
    if (!this._specific) {
      this._specific = new KnowledgEase.Collections.questionsNoURL
    }
    return this._specific
  },

  answerRequests: function () {
    if (!this._requests) {
      this._requests = new KnowledgEase.Collections.questionsNoURL
    }
    return this._requests
  },

  parse: function (payload) {
    this.specificRequests().set(payload.specific)
    this.answerRequests().set(payload.all_questions)
  }
})
