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
    this.addFeed()

    return this
  },

  addFeed: function () {
    var feedItems = new KnowledgEase.Collections.Feed
    feedItems.fetch()
    var feedIndex = new KnowledgEase.Views.Feed({
      collection: feedItems
    })

    this.addSubview(".tab-pane.feed", feedIndex)
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
