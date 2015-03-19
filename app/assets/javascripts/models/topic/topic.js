KnowledgEase.Models.Topic = Backbone.Model.extend({
  urlRoot: "/api/topics",

  questions: function () {
    if (!this._questions) {
      this._questions = new KnowledgEase.Collections.UserQuestions({
        user: this
      })
    }
    return this._questions
  },

  followers: function () {
    if (!this._followers) {
      this._followers = new KnowledgEase.Collections.Users
    }
    return this._followers
  },

  knowledgableUsers: function () {
    if (!this._knowledgable) {
      this._knowledgable = new KnowledgEase.Collections.Users
    }
    return this._knowledgable
  },

  parse: function (payload) {
    if (payload.questions) {
      this.questions().set(payload.questions, {parse: true})
      delete payload.questions
    }

    if (payload.followers) {
      this.followers().set(payload.followers, {parse: true})
      delete payload.followers
    }

    if (payload.knowledgable_users) {
      this.knowledgableUsers().set(payload.knowledgable_users, {parse: true})
      delete payload.knowledgable_users
    }

    return payload
  },
})
