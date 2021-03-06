KnowledgEase.Views.Topicform = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render)
  },

  template: JST['topics/topic_form'],

  events: {
    "submit form": "saveTopic",
    "click .close": "closeView",
  },

  render: function () {
    this.$el.html(this.template({topic: this.model}));

    return this;
  },

  saveTopic: function (event) {
    event.preventDefault();

    var attrs = $(event.currentTarget).serializeJSON()
    this.model.save(attrs, {
      success: function () {
        Backbone.history.navigate("#topics/" + this.model.id, { trigger: true })
        this.closeView()
      }.bind(this),
      error: function (event, xhr) {
        this.$el.find('.failure').html(JST['errors']({errors: xhr.responseJSON}))
      }.bind(this)
    })
  },

  closeView: function () {
    this.$el.remove()
    $(".modal").removeClass("active")
    Backbone.history.navigate("topics/"+ this.model.id)
  },
})
