QuestionEase.Routers.AppRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.$modal = this.$rootEl.find(".modal");
    this.$questionForm = this.$rootEl.find(".question-form");
    this.$content = this.$rootEl.find(".content")
    this.$navbar = this.$rootEl.find(".navbar")

    this.users = new QuestionEase.Collections.Users
    this.users.fetch()

    this.startNavbar()
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

  startNavbar: function () {
    var navbar = new QuestionEase.Views.Navbar({
      el: this.$navbar,
      $modal: this.$modal,
      collection: this.users
      })
  },

  _swapContent: function (view) {
    if (this.content) {
      this.content.remove()
    }

    this.content = view
    this.$content.html(this.content.render().$el)
  }
})
