KnowledgEase.Views.SignIn = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.$userEl = options.$userEl
    this.$modal = options.$modal

  },

  template: JST['auth/signin'],

  events: {
    "submit .sign-in": "signIn",
    "click .close": "closeView"
  },

  render: function () {
    this.$el.html(this.template())

    return this
  },

  signIn: function (event) {
    event.preventDefault()
    $.ajax({
      url: "api/sessions",
      method: "post",
      data: $(event.target).serializeJSON(),
      success: function (json) {
        var user = new KnowledgEase.Models.User(json)
        var user = this.collection.getOrFetch(json.id)
        user.set(json)

        this.$userEl.html(JST['navbar/signedIn']({user: user}))
        this.remove()
      }.bind(this),
      error: function (xhr) {
        this.$el.find('.failure').html(JST['errors']({errors: xhr.responseJSON}))
        setTimeout(function () {
          $('.failure').empty()
        }, 5000)
      }.bind(this)
    })
  },

  closeView: function () {
    this.$el.remove()
    this.$modal.removeClass("active")
  },
})
