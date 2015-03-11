KnowledgEase.Views.Home = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.questions = options.questions
    this.users = options.users
  },

  template: JST["home/home"],

  render: function () {
    this.$el.html(this.template())

    this.addQuestionIndex()
    this.addUserIndex()

    return this
  },

  addQuestionIndex: function () {
    var questionIndexView = new KnowledgEase.Views.QuestionIndex({
      collection: this.questions
    })

    this.addSubview(".tab-pane.questions", questionIndexView)
  },

  addUserIndex: function () {
    var userIndexView = new KnowledgEase.Views.UserIndex({
      collection: this.users
    })

    this.addSubview(".tab-pane.users", userIndexView)
  }
})
