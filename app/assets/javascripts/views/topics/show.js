KnowledgEase.Views.TopicShow = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
    this.collection = this.model.questions()
    this.page()
  },

  template: JST['topics/show'],

  render: function () {
    this.$el.html(this.template({topic: this.model}))
    this.addQuestions()
    return this
  },

  addQuestions: function () {
    var questionIndexView = new KnowledgEase.Views.QuestionIndex({
      collection: this.collection
    })

    this.addSubview("section.questions", questionIndexView)
  },
})


_.extend(
  KnowledgEase.Views.TopicShow.prototype,
  KnowledgEase.PaginationUtils)
