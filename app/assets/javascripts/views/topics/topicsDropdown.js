KnowledgEase.Views.TopicsDropDown = Backbone.CompositeView.extend({
  initialize: function(options) {
    this.parent = options.parent
    this.collection = KnowledgEase.topics
    this.listenTo(this.collection, "sync", this.render)
  },

  events: {
    "click button": "removeTopic",
    "change select": "changeTopic"
  },

  template: JST['topics/addTopicDropDown'],

  render: function() {
    this.$el.html(this.template({
      topic: this.model,
      topics: this.collection
    }))
    return this
  },

  tagName: "li",

  removeTopic: function () {
    if (this.parent instanceof KnowledgEase.Models.Question) {
      this.removeFromQuestion()
    } else if (this.parent instanceof KnowledgEase.Models.User) {
      this.removeFromKnowsAbout()
    }
  },

  removeFromKnowsAbout: function () {
    $.ajax({
      url: "/api/users/remove_knows_about",
      method: "delete",
      data: {user_id: this.parent.id, topic_id: this.model.id},
      success: function () {
        this.remove()
      }.bind(this)
    })
  },

  removeFromQuestion: function () {
    $.ajax({
      url: "/api/questions/remove_topic",
      method: "delete",
      data: {question_id: this.parent.id, topic_id: this.model.id},
      success: function () {
        this.remove()
      }.bind(this)
    })
  },

  changeTopic: function (event) {
    if (this.parent instanceof KnowledgEase.Models.Question) {
      this.changeOnQuestion(event)
    } else if (this.parent instanceof KnowledgEase.Models.User) {
      this.changeKnowsAbout(event)
    }
  },

  changeKnowsAbout: function (event) {
    $.ajax({
      url: "/api/users/add_knows_about",
      method: "post",
      data: {user_id: this.parent.id, topic_id: $(event.currentTarget).val()},
      success: function () {
        if (this.model) {
          $.ajax({
            url: "/api/users/remove_knows_about",
            method: "delete",
            data: {user_id: this.parent.id, topic_id: this.model.id},
          })
        }
        this.model = this.collection.get($(event.currentTarget).val())
        this.render.bind(this)
      }.bind(this),
      error: this.render.bind(this)
    })
  },

  changeOnQuestion: function (event) {
    $.ajax({
      url: "/api/questions/add_topic",
      method: "post",
      data: {question_id: this.parent.id, topic_id: $(event.currentTarget).val()},
      success: function () {
        if (this.model) {
          $.ajax({
            url: "/api/questions/remove_topic",
            method: "delete",
            data: {question_id: this.parent.id, topic_id: this.model.id},
          })
        }
        this.model = this.collection.get($(event.currentTarget).val())
        this.render.bind(this)
      }.bind(this),
      error: this.render.bind(this)
    })
  },


})
