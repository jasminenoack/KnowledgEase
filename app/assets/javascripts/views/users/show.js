KnowledgEase.Views.UserShow = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, "sync change:current_user", this.render)
  },

  template: JST['users/show'],

  render: function () {
    this.$el.html(this.template({user: this.model}))

    this.addQuestions()
    this.addComments()
    this.addTopics()
    this.addFollowButton()

    return this
  },

  addQuestions: function () {
    var questionIndexView = new KnowledgEase.Views.QuestionIndex({
      collection: this.model.questions()
    })

    this.addSubview("section.questions", questionIndexView)
  },

  addComments: function () {
    var commentIndex = new KnowledgEase.Views.CommentIndex({
      collection: this.model.comments(),
      parent: this.model
    })
    this.addSubview("ul.commentIndex", commentIndex)
  },

  addTopics: function () {
    var topicIndex = new KnowledgEase.Views.TopicIndex({
      collection: this.model.topics(),
      parent: this.model
    })
    this.addSubview("section.topics", topicIndex)
  },

  addFollowButton: function () {
    var followButton = new KnowledgEase.Views.FollowButton({
      model: this.model
    })
    this.addSubview("section.follow-button", followButton)
  }
})
