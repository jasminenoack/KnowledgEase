KnowledgEase.Views.TopicIndexItem = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render)
    this.parent = options.parent
  },

  template: JST['topics/indexItem'],

  tagName: 'li class="group"',

  events: {
    "click .remove":"removeTopic",
  },

  render: function () {
    this.$el.html(this.template({
      topic: this.model,
      parent: this.parent
      }))
    return this
  },

  removeTopic: function () {
    console.log("remove")
    if (this.parent instanceof KnowledgEase.Models.Question) {
      $.ajax({
        url: "/api/questions/remove_topic",
        method: "delete",
        data: {question_id: this.parent.id, topic_id: this.model.id},
        success: function () {
          this.remove()
        }.bind(this),
      })
    }
  }

})
