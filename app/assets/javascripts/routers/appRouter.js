QuestionEase.Routers.AppRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.$modal = this.$rootEl.find(".modal");
    this.$questionForm = this.$rootEl.find(".question-form");
    this.$content = this.$rootEl.find(".content")

    this.users = new QuestionEase.Collections.Users
    this.users.fetch()
  },

  routes: {
    "":"home",
    "users/:id":"userShow"
  },

  home: function () {
    var homeView = new QuestionEase.Views.Home({users: this.users})

    this._swapContent(homeView)
  },

  userShow: function (id) {
    var user = this.users.getOrFetch(id)
    var userShowView = new QuestionEase.Views.UserShow({model: user})

    this._swapContent(userShowView)
  },

  _swapContent: function (view) {
    if (this.content) {
      this.content.remove()
    }

    this.content = view
    this.$content.html(this.content.render().$el)
  }
})
