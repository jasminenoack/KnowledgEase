KnowledgEase.Views.CommentIndex = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
  },

  template: JST['comments/commentIndex'],

  events: {
    "click .comment-button button": 'toggleComments'
  },

  toggleComments: function (event) {
    if ($(event.currentTarget).text() === ("See Comments")) {
      this.addComments()
      $(event.currentTarget).text("Hide Comments")
    } else {
      this.$el.html(this.template())
    }
  },

  render: function () {
    this.$el.html(this.template())

    return this
  },

  addComments: function () {
    this.collection.each(function (comment) {
      var commentView = new KnowledgEase.Views.CommentView({model: comment})
      this.addSubview("ul.comments", commentView)
    }.bind(this))
  }
})
