QuestionEase.Views.Navbar = Backbone.CompositeView.extend({
  initialize: function (options) {
    // console.log(this.$el)
    this.$modal = options.$modal
    this.$userEl = this.$el.find('.userNav')
  },

  events: {
    "click button.sign-in":'signIn',
    "click button.sign-out":'signOut',
    "click button.sign-up":'signUp'
  },

  signIn: function () {
    var signIn = new QuestionEase.Views.SignIn({
      $userEl: this.$userEl,
    })
    this.$modal.html(signIn.render().$el)
  },

  signOut: function () {
    $.ajax({
      url: "api/sessions/1",
      method: "delete",
      success: function () {
        this.$userEl.html(JST['navbar/signedOut'])
      }.bind(this)
    })
  },

  signUp: function () {
    var signUp = new QuestionEase.Views.SignUp({
      $userEl: this.$userEl,
      collection: this.collection
    })
    this.$modal.html(signUp.render().$el)
  },

})
