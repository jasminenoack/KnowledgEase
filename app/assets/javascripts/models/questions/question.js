KnowledgEase.Models.Question = Backbone.Model.extend({
  urlRoot: "/api/questions",

  author: function () {
    if (!this._author) {
      this._author = new KnowledgEase.Models.User
    }

    return this._author
  },

  askers: function () {
    if (!this._askers) {
      this._askers = new KnowledgEase.Collections.Users
    }

    return this._askers
  },

  parse: function (payload) {
    if (payload.author) {
      this.author().set(payload.author, {parse: true})
      delete payload.author
    }

    if (payload.askers) {
      this.askers().set(payload.askers, {parse: true})
      delete payload.askers
    }

    return payload
  },

  toJSON: function (options) {
    return {question: _.clone(this.attributes)}
  }
})
