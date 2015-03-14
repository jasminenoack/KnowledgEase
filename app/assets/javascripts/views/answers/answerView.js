KnowledgEase.Views.answerView = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  template: JST['answers/answerCard'],

  events: {
    "click .answer-header":"expandAnswer",
    "click .answer-body":"shrinkAnswer"
  },

  tagName: 'li',

  render: function () {
    this.$el.html(this.template({answer: this.model}))

    var commentIndex = new KnowledgEase.Views.CommentIndex({
      collection: this.model.comments()
    })
    this.addSubview("p.answer-comments", commentIndex)

    return this
  },

  expandAnswer: function (event) {
    this.$el.find(".answer-body").addClass("active")
    this.$el.find(".answer-header").removeClass("active")
  },

  shrinkAnswer: function (event) {
    this.$el.find(".answer-body").removeClass("active")
    this.$el.find(".answer-header").addClass("active")
  },

})
