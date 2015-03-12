KnowledgEase.Collections.WithRequestedAnswers = KnowledgEase.PaginatedCollection.extend({
  url: "api/want_answers",

  specificRequests: function () {
    if (!this._specific) {
      this._specific = new KnowledgEase.Collections.specificRequests
    }
    return this._specific
  },

  answerRequests: function () {
    if (!this._requests) {
      this._requests = new KnowledgEase.Collections.mostRequested
    }
    return this._requests
  },

  parse: function (payload) {
    this.specificRequests().set(payload.specific, {parse: true})
    this.answerRequests().set(payload.all_questions, {parse: true})
  }
})
