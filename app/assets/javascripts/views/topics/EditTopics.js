KnowledgEase.Views.EditTopics = Backbone.CompositeView.extend({
  initialize: function(options) {
    this.parent = options.parent
  },

  events: {
    "click .more":"addNewDropdown"
  },

  template: JST['topics/editTopics'],

  render: function() {
    this.$el.html(this.template({ topic: this.model}))
    this.addDropdowns()
    return this
  },

  addDropdowns: function() {
    this.collection.each(function(topic) {
      var dropdown = new KnowledgEase.Views.TopicsDropDown({
        parent: this.parent,
        model: topic
      })
    this.addSubview(".dropdowns", dropdown)
    }.bind(this))
    this.addNewDropdown()
  },

  addNewDropdown: function() {
    var dropdown = new KnowledgEase.Views.TopicsDropDown({
      parent: this.parent
    })
    this.addSubview(".dropdowns", dropdown)
  }

})
