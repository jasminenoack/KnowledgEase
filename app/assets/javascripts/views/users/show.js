KnowledgEase.Views.UserShow = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, "sync change:current_user", this.render)
    this.listenTo(this.model.comments(), "add sync", this.addComments)

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

  addIndexItemsSidebar: function (collection, viewConstructor, selector) {
    if (collection.length) {
      _(_.sample(collection.models, 20)).each(function (item) {
        var topicItem = new viewConstructor({ model: item })

        this.addSubview(selector, topicItem)
      }.bind(this));
    }
  },

  addIndexItemsTabs: function (collection, viewConstructor, selector) {
    if (collection.length) {
      _(collection.models.slice(0,20)).each(function (item) {
        var topicItem = new viewConstructor({ model: item })

        this.addSubview(selector, topicItem)
      }.bind(this));
    }
  },

  addFollowedTopics: function () {
    this.addIndexItemsSidebar(
      this.model.followedTopics(),
      KnowledgEase.Views.TopicIndexItem,
      ".following-topics-list"
    );
  },

  addKnownAbout: function () {
    this.addIndexItemsSidebar(
      this.model.knownTopics(),
      KnowledgEase.Views.TopicIndexItem,
      ".knows-about-list"
    );
  },

  addFollowers: function () {
    this.addIndexItemsSidebar(
      this.model.followers(),
      KnowledgEase.Views.UserIndexItem,
      ".following-users-list"
    );
  },

  addFollowing: function () {
    this.addIndexItemsSidebar(
      this.model.following(),
      KnowledgEase.Views.UserIndexItem,
      ".users-following-list"
    );
  },

  addComments: function () {
    this.$el.find(".tab-pane.comments").empty()

    this.addCommentform();
    this.addIndexItemsTabs(
      this.model.comments().sort(),
      KnowledgEase.Views.CommentView,
      ".tab-pane.comments"
    );
  },

  addCommentform: function () {
    var commentForm = new KnowledgEase.Views.NewComment({
      parent: this.model,
      collection: this.model.comments()
    })
    this.addSubview(".tab-pane.comments", commentForm)
  },

  addQuestions: function () {
    this.addIndexItemsTabs(
      this.model.questions(),
      KnowledgEase.Views.QuestionIndexItem,
      ".tab-pane.questions"
    );
  },

  addAnswers: function () {
    this.addIndexItemsTabs(
      this.model.answers(),
      KnowledgEase.Views.AnswerIndexItem,
      ".tab-pane.answers"
    );
  },

  addAnswerRequests: function () {
    this.addIndexItemsTabs(
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
