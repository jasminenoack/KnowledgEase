QuestionEase.Views.SignIn = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.$userEl = options.$userEl
  },

  template: JST['auth/signin'],

  events: {
    "submit .sign-in": "signIn"
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
        var user = new QuestionEase.Models.User(json)
        this.$userEl.html(JST['navbar/signedIn']({user: user}))
        this.remove()
      }.bind(this)
    })
  }
})
