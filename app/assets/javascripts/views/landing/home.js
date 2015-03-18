KnowledgEase.Views.Home = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.questions = options.questions
    this.users = options.users
    this.topics = options.topics
  },

  template: JST["home/home"],

  events: {
    "click .tab.topics":"addTopicCloud",
    "click .tab.questions":"addQuestionIndex",
    "click .tab.feed":"addFeed",
    "click .tab.users":"addUserIndex",
  },


  render: function () {
    this.$el.html(this.template())
    this.addFeed()
    return this
  },



  addTopicCloud: function () {
    $.ajax({
      url: "api/topics?query=cloud",
      success: function (json) {
        this.$el.find("#cloud").jQCloud(json);
      }.bind(this)
    })
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


})
