KnowledgEase.Views.QuestionIndex = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
    this.page()
  },

  template: JST['questions/index'],

  events: {
   "click .last.questions":"lastPage",
   "click .next.questions":"nextPage",
  },

  render: function () {
    this.createContent()
    this.handleButtons()
    return this
  },

  createContent: function () {
    this.$el.html(this.template({buttons: this.buttons}))
    this.addCurrentCollection()
  },

  handleButtons: function () {
    if (this.page() === 1) {
      this.$el.find(".last.questions").prop("disabled", true)
    } else {
      this.$el.find(".last.questions").prop("disabled", false)
    }

    if (this.collection.length < 25) {
      this.$el.find(".next.questions").prop("disabled", true)
    } else {
      this.$el.find(".next.questions").prop("disabled", false)
    }
  },

  add: function (model) {
    var IndexItem = new KnowledgEase.Views.QuestionIndexItem({
      model: model
    })
    this.addSubview("ul.questions", IndexItem)
  },

  addCurrentCollection: function () {
    this.collection.each( function (question) {
      this.add(question)
    }.bind(this))
  },
})

_.extend(
  KnowledgEase.Views.QuestionIndex.prototype,
  KnowledgEase.PaginationUtils)
