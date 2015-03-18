KnowledgEase.Views.AnswerIndexItem = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
    console.log(this.model, this.model.question(), this.model.question().escape("question"))
  },

  template: JST['answers/indexItem'],

  tagName: 'li',

  events: {
    "click .collapse-card__heading": function (event) {
      $(event.currentTarget).paperCollapse()
    }
  },

  render: function () {
    this.$el.html(this.template({answer: this.model}))
    return this
  },

})
