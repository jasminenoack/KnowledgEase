KnowledgEase.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  questions: function () {
    if (!this._questions) {
      this._questions = new KnowledgEase.Collections.Questions
    }

    return this._questions
  },

  parse: function (payload) {
    if (payload.questions) {
      this.questions().set(payload.questions)
      delete payload.questions
    }
    return payload
  },
})
