KnowledgEase.Models.Answer = Backbone.Model.extend({
  urlRoot: "/api/answers",

  author: function () {
    if (!this._author) {
      this._author = new KnowledgEase.Models.User
    }

    return this._author
  },

  comments: function () {
    if (!this._comments) {
      this._comments = new KnowledgEase.Collections.Comments
    }
    return this._comments
  },

  question: function () {
    if (!this._question) {
      this._question = new KnowledgEase.Models.Question
    }
    return this._question
  },

  parse: function (payload) {
    if (payload.author) {
      this.author().set(payload.author, {parse: true})
      delete payload.author
    }

    if (payload.comments) {
      this.comments().set(payload.comments, {parse: true})
      delete payload.comments
    }

    if (payload.question) {
      this.question().set(payload.question, {parse: true})
      delete payload.question
    }

    return payload
  },

  header: function () {
    if (this.get("body").length < 100) {
      return this.escape("body")
    } else {
      return this.escape("body").substring(0,98) + "..."
    }
  }
})
