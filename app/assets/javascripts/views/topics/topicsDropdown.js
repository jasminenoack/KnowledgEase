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
