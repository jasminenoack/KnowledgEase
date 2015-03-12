KnowledgEase.Views.UserShow = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, "sync change:current_user", this.render)
  },

  template: JST['users/show'],

  render: function () {
    this.$el.html(this.template({user: this.model}))

    this.addQuestions()

    return this
  },

  addQuestions: function () {
    var questionIndexView = new KnowledgEase.Views.QuestionIndex({
      collection: this.model.questions()
    })

    this.addSubview("section.questions", questionIndexView)
  },
})
