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
    selector = '.tab-pane.specific-requests'
    this.collection.specificRequests().each(function (request) {
      var content = JST["questions/answerRequestIndex"]({
        question: request.get("asker").question
      })
      this.$el.find(selector).append(content)

    }.bind(this))

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
