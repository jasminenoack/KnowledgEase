KnowledgEase.Views.CommentIndex = Backbone.CompositeView.extend({
  initialize: function (options) {
    // this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addComments)
    this.parent = options.parent
  },

  template: JST['comments/commentIndex'],

  events: {
    "submit .new-comment": "createComment",
    "click .new-comment": "stop",
    "click .comment-button button": 'toggleComments',

  },

  stop: function (event) {
    event.stopPropagation()
  },

  createComment: function (event) {
    event.preventDefault()
    if (this.parent instanceof KnowledgEase.Models.User) {
      attrs = {commentable_type: "User", commentable_id: this.parent.id}
    } else if (this.parent instanceof KnowledgEase.Models.Question) {
      attrs = {commentable_type: "Question", commentable_id: this.parent.id}
    } else {
      attrs = {commentable_type: "Answer", commentable_id: this.parent.id}
    }

    _.extend(attrs, $(event.currentTarget).serializeJSON())
    this.collection.create(attrs, {
      success: function () {
        $(event.currentTarget).find("textarea").val("")
      }
    })
  },

  toggleComments: function (event) {
    event.stopPropagation()
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
    this.$el.find("ul.comments").empty()
    this.collection.each(function (comment) {
      var commentView = new KnowledgEase.Views.CommentView({model: comment})
      this.addSubview("ul.comments", commentView)
    }.bind(this))
  }
})
