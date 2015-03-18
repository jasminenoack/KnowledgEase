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

  addIndexItems: function (collection, viewConstructor, selector) {
    if (collection.length) {
      _(_.sample(collection.models, 5)).each(function (item) {
        var topicItem = new viewConstructor({ model: item })

        this.addSubview(selector, topicItem)
      }.bind(this));
    }
  },

  addFollowedTopics: function () {
    this.addIndexItems(
      this.model.followedTopics(),
      KnowledgEase.Views.TopicIndexItem,
      ".following-topics-list"
    );
  },

  addKnownAbout: function () {
    this.addIndexItems(
      this.model.knownTopics(),
      KnowledgEase.Views.TopicIndexItem,
      ".knows-about-list"
    );
  },

  addFollowers: function () {
    this.addIndexItems(
      this.model.followers(),
      KnowledgEase.Views.UserIndexItem,
      ".following-users-list"
    );
  },

  addFollowing: function () {
    this.addIndexItems(
      this.model.following(),
      KnowledgEase.Views.UserIndexItem,
      ".users-following-list"
    );
  },

  addComments: function () {
    this.addIndexItems(
      this.model.comments(),
      KnowledgEase.Views.CommentView,
      ".commentIndex"
    );
  },

  addQuestions: function () {
    this.addIndexItems(
      this.model.questions(),
      KnowledgEase.Views.QuestionIndexItem,
      ".questions"
    );
  },

  addAnswers: function () {
    this.addIndexItems(
      this.model.answers(),
      KnowledgEase.Views.AnswerIndexItem,
      ".tab-pane.answers"
    );
  },

  addAnswerRequests: function () {
    this.addIndexItems(
      this.model.answerRequests(),
      KnowledgEase.Views.QuestionIndexItem,
      ".tab-pane.answer-requests"
    );
  },

  addFollowButton: function () {
    var followButton = new KnowledgEase.Views.FollowButton({
      model: this.model
    })
    this.addSubview("section.follow-button", followButton)
  }
})
