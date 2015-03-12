KnowledgEase.Views.AnswerIndex = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.collection.specificRequests(), "add", this.render);
  },

  events: {
  },

  template: JST["answerspage/answerspage"],

  render: function () {
    this.$el.html(this.template())
    this.attachSpecific()
    this.attachRequested()
    return this
  },

  attachSpecific: function () {
    // debugger
    this.addQuestions(this.collection.specificRequests(), '.tab-pane.specific-requests')
  },

  attachRequested: function () {
    this.addQuestions(this.collection.answerRequests(), '.tab-pane.most-requested')
  },

  addQuestions: function (collection, selector) {
    var questionIndexView = new KnowledgEase.Views.QuestionIndex({
      collection: collection
    })

    this.addSubview(selector, questionIndexView)
  },

})
