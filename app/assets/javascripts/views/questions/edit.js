KnowledgEase.Views.EditQuestion = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render)
  },

  template: JST['questions/form'],

  events: {
    "submit .question-form-edit": "createQuestion"
  },

  render: function () {
    this.$el.html(this.template({question: this.model}));

    return this;
  },

  createQuestion: function (event) {
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON()
    this.model.save(attrs, {
      success: function () {
        Backbone.history.navigate(
          "questions/" + this.model.id, {trigger: true}
        )
      }.bind(this)
    })
  }
})
