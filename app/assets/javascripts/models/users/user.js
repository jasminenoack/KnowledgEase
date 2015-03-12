KnowledgEase.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  questions: function () {
    if (!this._questions) {
      this._questions = new KnowledgEase.Collections.UserQuestions({
        user: this
      })
    }

    return this._questions
  },

  parse: function (payload) {
    if (payload.questions) {
      this.questions().set(payload.questions, {parse: true})
      delete payload.questions
    }
    
    return payload
  },
})
