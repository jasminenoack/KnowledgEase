KnowledgEase.Views.QuestionIndexItem = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, "change sync", this.render)
  },

  template: JST['questions/questionIndexItem'],

  tagName: 'li',

  render: function () {
    console.log(this.model.author().get("current_user"))
    this.$el.html(this.template({question: this.model}))
    return this
  },
})
