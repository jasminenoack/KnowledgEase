KnowledgEase.Collections.UserQuestions = KnowledgEase.Collections.Questions.extend({
  initialize: function (options) {
    this.user = options.user
  },

  rootUrl: "/api/questions",

  model: KnowledgEase.Models.Question,

  url: function () {
    return this.rootUrl + "?page=" + this.page() + "&user_id=" + this.user.id
  },
})
