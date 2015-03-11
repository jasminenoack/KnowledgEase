KnowledgEase.Routers.AppRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.$modal = this.$rootEl.find(".modal");
    this.$questionForm = this.$rootEl.find(".question-form");
    this.$content = this.$rootEl.find(".content")
    this.$navbar = this.$rootEl.find(".navbar")

    this.users = new KnowledgEase.Collections.Users
    this.users.fetch()

    this.startNavbar()
  },

  routes: {
    "":"home",
    "users":"userIndex",
    "users/:id":"userShow",
    "users/:id/edit":'userEdit'
  },

  home: function () {
    var homeView = new KnowledgEase.Views.Home()

    this._swapContent(homeView)
  },

  userIndex: function () {
    var userIndexView = new KnowledgEase.Views.UserIndex({collection: this.users})

    this._swapContent(userIndexView)
  },

  userShow: function (id) {

    var user = this.users.getOrFetch(id)
    var userShowView = new KnowledgEase.Views.UserShow({model: user})

    this._swapContent(userShowView)
  },

  userEdit: function (id) {
    var user = this.users.getOrFetch(id)
    var userEditView = new KnowledgEase.Views.UserEdit({model: user})
    this._swapContent(userEditView)
  },

  startNavbar: function () {
    var navbar = new KnowledgEase.Views.Navbar({
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
