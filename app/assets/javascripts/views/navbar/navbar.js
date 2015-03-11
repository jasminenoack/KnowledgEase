KnowledgEase.Views.Navbar = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.$modal = options.$modal
    this.$userEl = this.$el.find('.userNav')
  },

  events: {
    "click button.sign-in":'signIn',
    "click button.sign-out":'signOut',
    "click button.sign-up":'signUp'
  },

  signIn: function () {
    var signIn = new KnowledgEase.Views.SignIn({
      $userEl: this.$userEl,
      collection: this.collection
    })
    this.$modal.html(signIn.render().$el)
  },

  signOut: function () {
    $.ajax({
      url: "api/sessions/1",
      method: "delete",
      success: function (json) {
        var user = new KnowledgEase.Models.User(json)
        this.collection.add(user, {merge: true})
        this.$userEl.html(JST['navbar/signedOut'])

      }.bind(this)
    })
  },

  signUp: function () {
    var signUp = new KnowledgEase.Views.SignUp({
      $userEl: this.$userEl,
      collection: this.collection
    })
    this.$modal.html(signUp.render().$el)
  },

})
