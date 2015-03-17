KnowledgEase.Views.NewQuestion = Backbone.CompositeView.extend({
  initialize: function (options) {
  },

  template: JST['questions/AddQuestionStart'],
  expandTemplate: JST['questions/expandform'],
  descriptionTemplate: JST['questions/descriptionField'],

  events: {
    "focus .add-question-input":"expandForm",
    "click .close": "closeView",
    "submit": "createQuestion",
    "click button.add-description":"addDescriptionField",
  },

  render: function () {
    this.$el.html(this.template({question: this.model}));

    return this;
  },

  tagName: "form",

  expandForm: function () {
    if (!this.in_use) {
      this.in_use = true,
      this.$el.find(".ask-question").append(this.expandTemplate())
    }
  },

  createQuestion: function (event) {
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON()

    this.model.save(attrs, {
      success: function (json) {
        this.collection.add(this.model)
        this.model = new KnowledgEase.Models.Question
        this.render()
        this.in_use = false
        Backbone.history.navigate("questions/" + json.id, {trigger: true})
      }.bind(this),
      error: function (object, xhr) {
        this.$el.find('.failure').html(JST['errors']({errors: xhr.responseJSON}))
        setTimeout(function () {
          $('.failure').empty()
        }, 5000)
      }.bind(this)
    })
  },

  closeView: function () {
    this.in_use = false
    this.render()
  },

  addDescriptionField: function (event) {
    console.log(this.currentTarget)
    $(event.currentTarget).replaceWith(this.descriptionTemplate())
  },
})
