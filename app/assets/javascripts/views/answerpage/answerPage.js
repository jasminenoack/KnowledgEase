KnowledgEase.Views.AnswerIndex = Backbone.CompositeView.extend({
  initialize: function () {
    this.specific = new KnowledgEase.Collections.specificRequests
    this.specific.fetch()
    this.all = new KnowledgEase.Collections.mostRequested
    this.all.fetch()
    this.listenTo(this.specific, "sync", this.render);
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
    this.addQuestions(this.specific, '.tab-pane.specific-requests')
  },

  attachRequested: function () {
    console.log(this.all)
    this.addQuestions(this.all, '.tab-pane.most-requested')
  },

  addQuestions: function (collection, selector) {
    var questionIndexView = new KnowledgEase.Views.QuestionIndex({
      collection: collection
    })

    this.addSubview(selector, questionIndexView)
  },

})
