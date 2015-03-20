KnowledgEase.Views.Guests = Backbone.View.extend ({
  initialize: function (options) {
    this.$modal = options.$modal
    this.$userEl = options.$userEl
    this.$userEl = $('.userNav')
  },

  template: JST['guests'],

  events: {
    "click button": "signIn",
    "click .close": "closeView",
  },

  render: function () {
    this.$el.html(this.template())

    return this
  },

  signIn: function (event) {
    username = $(event.target).data("username")
    event.preventDefault()
    $.ajax({
      url: "api/sessions",
      method: "post",
      data: {username: username, password: "password1"},
      success: function (json) {
        var user = new KnowledgEase.Models.User(json)
        var user = KnowledgEase.users.getOrFetch(json.id)
        user.set(json)

        this.$userEl.html(JST['navbar/signedIn']({user: user}))
        this.closeView()
      }.bind(this),
    })
  },

  closeView: function () {
    this.$el.remove()
    this.$modal.removeClass("active")
  },
})
