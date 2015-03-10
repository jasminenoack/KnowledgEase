QuestionEase.Routers.AppRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.$modal = this.$rootEl.find(".modal");
    this.$questionForm = this.$rootEl.find(".question-form");
    this.$content = this.$rootEl.find("content")
  },

  routes: {
    "":"home"
  },

  home: function () {
    console.log("home")
  },

  _swapContent: function (view) {
    if (this.content) {
      this.content.remove()
    }
    this.content = view
    this.$content.html(this.content.render().$el)
  }
})
