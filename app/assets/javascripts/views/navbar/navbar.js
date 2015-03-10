QuestionEase.Views.Navbar = Backbone.CompositeView.extend({
  initialize: function (options) {
    // console.log(this.$el)
    this.$modal = options.$modal
    this.$userEl = this.$el.find('.userNav')
  },

  events: {
    "click .sign-in":'signIn',
    "click .sign-out":'signOut',
    "click .sign-up":'signUp'
  },

  signIn: function () {
    var signIn = new QuestionEase.Views.SignIn({
      el: this.$modal,
      $userEl: this.$userEl,
    })
    signIn.render()
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
    // console.log(this.collection)
    var signUp = new QuestionEase.Views.SignUp({
      el: this.$modal,
      $userEl: this.$userEl,
      collection: this.collection
    })
    signUp.render()
  },

})
