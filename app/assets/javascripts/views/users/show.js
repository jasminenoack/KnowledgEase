KnowledgEase.Views.UserShow = Backbone.CompositeView.extend({
  initialize: function () {
    this.first = true
    this.listenTo(this.model, "sync change:current_user", this.render)
  },

  template: JST['users/show'],

  render: function () {
    this.$el.html(this.template({user: this.model}))

    this.handleSubviews()

    return this
  },

  addQuestions: function () {
    var questionIndexView = new KnowledgEase.Views.QuestionIndex({
      collection: this.model.questions()
    })

    this.addSubview("section.questions", questionIndexView)
  },

  handleSubviews: function () {
    if (this.first) {
      this.addQuestions()
      this.first = false
    } else {
      this.attachSubviews()
    }
  },
})
