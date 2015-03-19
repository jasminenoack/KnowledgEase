KnowledgEase.Views.QuestionShow = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
    this.listenTo(this.model.answers(), "add", this.render)
  },

  template: JST['questions/show'],

  render: function () {
    this.$el.html(this.template({question: this.model}))
    this.addTopics()
    this.addFollowers()
    this.addFollowButton()
    this.addComments()
    this.addAnswerRequest()
    this.addAnswerForm()
    this.addAnswers()
    return this
  },

  addAnswerForm: function () {
    var answerForm = new KnowledgEase.Views.AnswerForm({
      model: this.model
    })
    this.addSubview(".answer-form", answerForm)
  },

  addAnswerRequest: function () {
    var requestAnswer = new KnowledgEase.Views.RequestAnswer({
      model: this.model
    })
    this.addSubview(".request", requestAnswer)
  },

  addComments: function () {
    var commentIndex = new KnowledgEase.Views.CommentIndex({
      collection: this.model.comments(),
      parent: this.model
    })
    this.addSubview("p.comments", commentIndex)
  },

  addFollowButton: function () {
     var followButton = new KnowledgEase.Views.FollowButton({
       model: this.model
     })
     this.addSubview("section.follow-button", followButton)
   },

  addIndexItemsSidebar: function (collection, viewConstructor, selector) {
    if (collection.length) {
      _(_.sample(collection.models, 20)).each(function (item) {
        var topicItem = new viewConstructor({ model: item })

        this.addSubview(selector, topicItem)
      }.bind(this));
    }
  },

  addTopics: function () {
    this.addIndexItemsSidebar(
      this.model.topics(),
      KnowledgEase.Views.TopicIndexItem,
      ".topics-list"
    );
  },

  addFollowers: function () {
    this.addIndexItemsSidebar(
      this.model.askers(),
      KnowledgEase.Views.UserIndexItem,
      ".want-answers"
    );
  },

  addAnswers: function () {
    this.model.answers().each(function (answer) {
      var answerView = new KnowledgEase.Views.answerView({model: answer})
      this.addSubview(".answers", answerView)
    }.bind(this))
  },
})
