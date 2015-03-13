KnowledgEase.Views.QuestionIndexItem = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  template: JST['questions/questionIndexItem'],

  tagName: 'li',

  events: {
    "click .collapse-card__heading": function (event) {
      $(event.currentTarget).paperCollapse()
    }
  },

  render: function () {
    this.$el.html(this.template({question: this.model}))

    var requestAnswer = new KnowledgEase.Views.RequestAnswer({
      model: this.model
    })
    this.addSubview(".request-answer", requestAnswer)
    return this
  },

})
