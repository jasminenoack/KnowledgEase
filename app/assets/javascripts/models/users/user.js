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

  comments: function () {
    if (!this._comments) {
      this._comments = new KnowledgEase.Collections.Comments
    }
    return this._comments
  },

  topics: function () {
    if (!this._topics) {
      this._topics = new KnowledgEase.Collections.Topics
    }
    return this._topics
  },

  parse: function (payload) {
    if (payload.topics) {
      this.topics().set(payload.topics, {parse: true})
      delete payload.topics
    }
    if (payload.questions) {
      this.questions().set(payload.questions, {parse: true})
      delete payload.questions
    }

    if (payload.comments) {
      this.comments().set(payload.comments, {parse: true})
      delete payload.comments
    }

    return payload
  },
})
