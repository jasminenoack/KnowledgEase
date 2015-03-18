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
    this.addSubview("section.follow-button-topic", followButton)
  },

  editForm: function () {
    var TopicForm = new KnowledgEase.Views.Topicform({
      model: this.model
    })
    this.addSubview(".topic-form", TopicForm)
  }
})


_.extend(
  KnowledgEase.Views.TopicShow.prototype,
  KnowledgEase.PaginationUtils)
