KnowledgEase.Views.NewQuestion = Backbone.CompositeView.extend({
  initialize: function (options) {
  },

  template: JST['questions/form'],

  events: {
    "submit .question-form": "createQuestion"
  },

  render: function () {
    this.$el.html(this.template({question: this.model}));

    return this;
  },

  createQuestion: function (event) {
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON()
    this.model.save(attrs, {
      success: function (json) {
        this.collection.add(this.model)
        console.log (this.model)
        this.model = new KnowledgEase.Models.Question
        this.render()
        Backbone.history.navigate("questions/" + json.id, {trigger: true})
      }.bind(this)
    })
  }
})
