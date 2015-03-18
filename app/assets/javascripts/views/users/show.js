KnowledgEase.Views.UserShow = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, "sync change:current_user", this.render)
  },

  template: JST['users/show'],
  topicSidebarTemplate: JST['users/topicSidebarItem'],

  render: function () {
    this.$el.html(this.template({user: this.model}));
    this.addFollowButton();
    this.addFollowedTopics();
    this.addKnownAbout();
    this.addFollowers();
    this.addFollowing();
    this.addComments();
    this.addQuestions();
    this.addAnswers();
    this.addAnswerRequests();
    return this;
  },

  addFollowedTopics: function () {
  },

  addKnownAbout: function () {
  },

  addFollowers: function () {
  },

  addFollowing: function () {
  },

  addComments: function () {
  },

  addQuestions: function () {
  },

  addAnswers: function () {
  },

  addAnswerRequests: function () {
  },

  // addQuestions: function () {
  //   var questionIndexView = new KnowledgEase.Views.QuestionIndex({
  //     collection: this.model.questions()
  //   })
  //
  //   this.addSubview("section.questions", questionIndexView)
  // },
  //
  // addComments: function () {
  //   var commentIndex = new KnowledgEase.Views.CommentIndex({
  //     collection: this.model.comments(),
  //     parent: this.model
  //   })
  //   this.addSubview("ul.commentIndex", commentIndex)
  // },

  // addTopics: function () {
  //   var topicIndex = new KnowledgEase.Views.TopicIndex({
  //     collection: this.model.topics(),
  //     parent: this.model
  //   })
  //   this.addSubview("section.topics", topicIndex)
  // },

  addFollowButton: function () {
    var followButton = new KnowledgEase.Views.FollowButton({
      model: this.model
    })
    this.addSubview("section.follow-button", followButton)
  }
})
