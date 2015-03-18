KnowledgEase.Views.AnswerIndexItem = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
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
