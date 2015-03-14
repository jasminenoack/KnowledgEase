KnowledgEase.Views.Home = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.questions = options.questions
    this.users = options.users
    this.topics = options.topics
  },

  template: JST["home/home"],

  render: function () {
    this.$el.html(this.template())

    this.addQuestionIndex()
    this.addUserIndex()
    this.addTopicIndex()

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
  },

  addTopicIndex: function () {
    var topicIndexView = new KnowledgEase.Views.TopicIndex({
      collection: this.topics
    })

    this.addSubview(".tab-pane.topics", topicIndexView)
  }
})
