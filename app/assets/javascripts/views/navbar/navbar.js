KnowledgEase.Views.Navbar = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.$modal = options.$modal
    this.$userEl = this.$el.find('.userNav')
    this.searchResults = new KnowledgEase.Collections.SearchResults
    $(document).click(this.emptySearch.bind(this))
  },

  events: {
    "click button.sign-in":'signIn',
    "click button.sign-out":'signOut',
    "click button.sign-up":'signUp',
    "keyup #search":'search',
    "click .search-bar": function (event) { event.stopPropagation() }

  },

  signIn: function () {
    this.$modal.addClass("active")
    var signIn = new KnowledgEase.Views.SignIn({
      $userEl: this.$userEl,
      collection: this.collection,
      $modal: this.$modal
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

        fragment = Backbone.history.fragment
        Backbone.history.fragment = null
        Backbone.history.navigate(fragment, {trigger: true})
      }.bind(this)
    })
  },

  signUp: function () {
    this.$modal.addClass("active")
    var signUp = new KnowledgEase.Views.SignUp({
      $userEl: this.$userEl,
      collection: this.collection,
      $modal: this.$modal
    })
    this.$modal.html(signUp.render().$el)
  },

  search: function (event) {
    this.searchResults.fetch({
      data: {query: $(event.currentTarget).val()},
      success: function (resp, results) {
        this.$el.find("ul.search-results").empty()
        _(results).each(function (result) {
          this.$el.find("ul.search-results").append("<li>"+ result.link +"</li>")
        }.bind(this))
      }.bind(this)
    })
  },

  emptySearch: function (event) {
    this.$el.find("ul.search-results").empty()
  }

})
