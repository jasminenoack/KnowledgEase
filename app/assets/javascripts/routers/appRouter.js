KnowledgEase.Routers.AppRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.$modal = this.$rootEl.find(".modal");
    this.$questionForm = this.$rootEl.find(".question-form");
    this.$content = this.$rootEl.find(".content")
    this.$navbar = this.$rootEl.find(".navbar")

    this.users = KnowledgEase.users
    this.users.fetch()

    this.topics = KnowledgEase.topics
    this.questions = new KnowledgEase.Collections.Questions

    this.startNavbar()
    this.questionNew()
    this.bind( "all", function () {
      $(".flash").addClass("active")
      setTimeout(function () {
        $(".flash").removeClass("active")
        $(".flash").empty()
      }, 5000)
    })
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
    'answer_questions':"answerQuestions",
    'topics/:id':'showTopic',
    'topics/:id/edit':'editTopic',
    'guests':'guest'
  },

  home: function () {
    var homeView = new KnowledgEase.Views.Home({
      questions: this.questions,
      users: this.users,
    })

    this.questions.refresh()

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
    var userEditView = new KnowledgEase.Views.UserEdit({
      model: user,
      $modal: this.$modal
    })
    this.$modal.html(userEditView.render().$el)
    this.$modal.addClass("active")
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
    var editQuestion = new KnowledgEase.Views.EditQuestion({
      model: question,
    })
    this.$modal.html(editQuestion.render().$el)
    this.$modal.addClass("active")
  },

  answerQuestions: function () {
    var answerIndexView = new KnowledgEase.Views.AnswerIndex()

    this._swapContent(answerIndexView)
  },

  showTopic: function (id) {
    var topic = this.topics.getOrFetch(id)
    var topicShowView = new KnowledgEase.Views.TopicShow({model: topic})

    this._swapContent(topicShowView)
  },

  editTopic: function (id) {
    var topic = this.topics.getOrFetch(id)
    var topicEditView = new KnowledgEase.Views.Topicform({model: topic})

    this.$modal.html(topicEditView.render().$el)
    this.$modal.addClass("active")
  },

  guest: function () {
    var chooseGuest = new KnowledgEase.Views.Guests({$modal: this.$modal})

    this.$modal.html(chooseGuest.render().$el)
    this.$modal.addClass("active")
  },

  _swapContent: function (view) {
    if (this.content) {
      this.content.remove()
    }

    this.content = view
    this.$content.html(this.content.render().$el)
  },
})
