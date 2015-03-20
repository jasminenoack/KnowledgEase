KnowledgEase.Views.Navbar = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.$modal = options.$modal
    this.$userEl = this.$el.find('.userNav')
    this.searchResults = new KnowledgEase.Collections.SearchResults
    this.notifs = new KnowledgEase.Collections.Feed
    this.notifs.url = "/api/notifications"
    this.notifs.comparator = "updated_at"
    this.updateNotifications()
    $(document).click(this.emptySearch.bind(this))
    setInterval(this.updateNotifications.bind(this), 1000)
  },

  events: {
    "click button.sign-in":'signIn',
    "click button.sign-out":'signOut',
    "click button.sign-up":'signUp',
    "keyup #search":'search',
    "click .search-bar": function (event) { event.stopPropagation() },
    "mouseenter .notifs":"showNotifications",
    "click .notifs li a":"updateRead",
  },

  templateItem: JST['feed/feedItem'],

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
  },

  updateNotifications: function (event) {
    var that = this
    this.notifs.fetch({
      success: function () {
        that.$el.find("badge").text(that.notifs.length)
      }
    })
  },

  showNotifications: function () {
    this.$el.find(".notifications").empty()

    this.notifs.each(function (question) {
      this.$el.find(".notifications").append(
        '<li>' +
        question.get("follow_message") +
        '<a href="#/questions/' + question.escape("question_id") +
        '">' +
        question.escape("question") +
        '</a></li>'
      )
    }.bind(this));
    this.$el.find(".notifications").append("<li><a href='#'>All</a></li>")
  },

  updateRead: function (event) {
    var index = $(event.currentTarget).parent().index()
    var time = this.notifs.models[index].get("updated_at")
    console.log(time)

    $.ajax({
      url: "/api/update_checked",
      data: {time_checked: time},
      method: 'post',
      success: function () {
        this.updateNotifications()
      }.bind(this)
    })

    this.$el.find(".notifications").empty()
  }

})
