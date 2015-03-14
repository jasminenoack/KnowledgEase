KnowledgEase.Views.TopicIndexItem = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  template: JST['topics/indexItem'],

  tagName: 'li',

  render: function () {
    this.$el.html(this.template({topic: this.model}))
    return this
  },

})
