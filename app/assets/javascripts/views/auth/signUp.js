KnowledgEase.Views.SignUp = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.$userEl = options.$userEl
    this.$modal = options.$modal

  },

  events: {
    "submit .sign-up": "signUp",
    "click .close": "closeView"
  },

  template: JST['auth/signup'],

  render: function () {
    this.$el.html(this.template())

    return this
  },

  signUp: function (event) {
    event.preventDefault()
    $.ajax({
      url: "api/users",
      method: "post",
      data: $(event.target).serializeJSON(),
      success: function (json) {
        var user = new KnowledgEase.Models.User(json)
        this.collection.add(user)
        this.$userEl.html(JST['navbar/signedIn']({user: user}))
        this.closeView()

        fragment = Backbone.history.fragment
        Backbone.history.fragment = null
        Backbone.history.navigate(fragment, {trigger: true})
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
    this.remove()
    this.$modal.removeClass("active")
  },
})
