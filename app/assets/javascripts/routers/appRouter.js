KnowledgEase.Routers.AppRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.$modal = this.$rootEl.find(".modal");
    this.$questionForm = this.$rootEl.find(".question-form");
    this.$content = this.$rootEl.find(".content")
    this.$navbar = this.$rootEl.find(".navbar")

    this.users = KnowledgEase.users
    this.topics = new KnowledgEase.Collections.Topics
    this.questions = new KnowledgEase.Collections.Questions

    this.startNavbar()
    this.questionNew()
  },

  routes: {
    "":"home",
    "users":"userIndex",
    "users/:id":"userShow",
    "users/:id/edit":'userEdit',
    'questions': "questionIndex",
    "questions/new": "questionNew",
    'questions/:id': "questionShow",
    'questions/:id/edit':"questionEdit",
    'answer_questions':"answerQuestions"
  },

  home: function () {
    var homeView = new KnowledgEase.Views.Home({
      questions: this.questions,
      users: this.users,
      topics: this.topics,
    })

    this.questions.refresh()
    this.users.fetch()
    this.topics.fetch()

    this._swapContent(homeView)
  },

  userIndex: function () {
    var userIndexView = new KnowledgEase.Views.UserIndex({collection: this.users})

    this._swapContent(userIndexView)
    this.users.fetch()
  },

  userShow: function (id) {

    var user = this.users.getOrFetch(id)
    var userShowView = new KnowledgEase.Views.UserShow({model: user})

    this._swapContent(userShowView)
  },

  userEdit: function (id) {
    var user = this.users.getOrFetch(id)
    var userEditView = new KnowledgEase.Views.UserEdit({model: user})
    this._swapContent(userEditView)
  },

  startNavbar: function () {
    var navbar = new KnowledgEase.Views.Navbar({
      el: this.$navbar,
      $modal: this.$modal,
      collection: this.users
      })
  },

  questionIndex: function () {
    var questionIndexView = new KnowledgEase.Views.QuestionIndex({
      collection: this.questions
    })

    this._swapContent(questionIndexView)
    this.questions.refresh()
  },

  questionShow: function (id) {
    var question = this.questions.getOrFetch(id)
    var questionShowView = new KnowledgEase.Views.QuestionShow({model: question})

    this._swapContent(questionShowView)
  },

  questionNew: function () {
    var newQuestionView = new KnowledgEase.Views.NewQuestion({
      model: new KnowledgEase.Models.Question,
      collection: this.questions
    })

    this.$questionForm.html(newQuestionView.render().$el)
  },

  questionEdit: function (id) {
    var question = this.questions.getOrFetch(id)
    var editQuestionView = new KnowledgEase.Views.EditQuestion({
      model: question,
    })

    this.$content.html(editQuestionView.render().$el)
  },

  answerQuestions: function () {
    var answerIndexView = new KnowledgEase.Views.AnswerIndex()

    this._swapContent(answerIndexView)
  },

  _swapContent: function (view) {
    if (this.content) {
      this.content.remove()
    }

    this.content = view
    this.$content.html(this.content.render().$el)
  },
})
