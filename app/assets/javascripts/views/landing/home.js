KnowledgEase.Views.Home = Backbone.CompositeView.extend({
  initialize: function (options) {
  },

  template: JST["home/home"],

  render: function () {
    this.$el.html(this.template())

    return this
  },
})
