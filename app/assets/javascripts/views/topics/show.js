KnowledgEase.Views.TopicShow = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
    this.collection = this.model.questions()
    this.page()
  },

  template: JST['topics/show'],

  events: {
    "click .edit-topic": 'editForm'
  },

  render: function () {
    this.$el.html(this.template({topic: this.model}))
    this.addQuestions()
    this.addFollowers()
    this.addFollowButton()
    return this
  },

  addQuestions: function () {
    var questionIndexView = new KnowledgEase.Views.QuestionIndex({
      collection: this.collection
    })

    this.addSubview("section.questions", questionIndexView)
  },

  addFollowButton: function () {
    var followButton = new KnowledgEase.Views.FollowButton({
      model: this.model
    })
    this.addSubview("section.follow-button", followButton)
  },

  editForm: function () {
    var TopicForm = new KnowledgEase.Views.Topicform({
      model: this.model
    })
    this.addSubview(".topic-form", TopicForm)
  },

  addIndexItemsSidebar: function (collection, viewConstructor, selector) {
    if (collection.length) {
      _(_.sample(collection.models, 20)).each(function (item) {
        var topicItem = new viewConstructor({
          model: item,
        })

        this.addSubview(selector, topicItem)
      }.bind(this));
    }
  },

  addFollowers: function () {
    this.addIndexItemsSidebar(
      this.model.followers(),
      KnowledgEase.Views.UserIndexItem,
      ".following"
    );
  },

  
})


_.extend(
  KnowledgEase.Views.TopicShow.prototype,
  KnowledgEase.PaginationUtils)
