KnowledgEase.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  followedTopics: function () {
    if (!this._followedTopics) {
      this._followedTopics = new KnowledgEase.Collections.Topics
    }
    return this._followedTopics
  },

  knownTopics: function () {
    if (!this._knownTopics) {
      this._knownTopics = new KnowledgEase.Collections.Topics
    }
    return this._knownTopics
  },

  followers: function () {
    if (!this._followers) {
      this._followers = new KnowledgEase.Collections.Users
    }
    return this._followers
  },

  following: function () {
    if (!this._following) {
      this._following = new KnowledgEase.Collections.Users
    }
    return this._following
  },

  comments: function () {
    if (!this._comments) {
      this._comments = new KnowledgEase.Collections.Comments
    }
    return this._comments
  },

  questions: function () {
    if (!this._questions) {
      this._questions = new KnowledgEase.Collections.UserQuestions({
        user: this
      })
    }

    return this._questions
  },

  answers: function () {
    if (!this._answers) {
      this._answers = new KnowledgEase.Collections.Answers()
    }

    return this._answers
  },


  answerRequests: function () {
    if (!this._answerRequests) {
      this._answerRequests = new KnowledgEase.Collections.UserQuestions({
        user: this
      })
    }
    return this._answerRequests
  },



  parse: function (payload) {

    if (payload.followed_topics) {
      this.followedTopics().set(payload.followed_topics, {parse: true})
      delete payload.followed_topics
    }

    if (payload.known_topics) {
      this.knownTopics().set(payload.known_topics, {parse: true})
      delete payload.known_topics
    }

    if (payload.followers) {
      this.followers().set(payload.followers, {parse: true})
      delete payload.followers
    }

    if (payload.following) {
      this.following().set(payload.following, {parse: true})
      delete payload.following
    }

    if (payload.comments) {
      this.comments().set(payload.comments, {parse: true})
      delete payload.comments
    }


    if (payload.questions) {
      this.questions().set(payload.questions, {parse: true})
      delete payload.questions
    }

    if (payload.answers) {
      this.answers().set(payload.answers, {parse: true})
      delete payload.answers
    }

    if (payload.answer_requests) {
      this.answerRequests().set(payload.answer_requests, {parse: true})
      delete payload.answer_requests
    }

    return payload
  },

  toJSON: function (options) {
    return {user: _.clone(this.attributes)}
  }
})
