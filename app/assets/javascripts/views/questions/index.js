KnowledgEase.Views.QuestionIndex = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.add);
    this.first = true
  },

  events: {
   "click .last.questions":"lastPage",
   "click .next.questions":"nextPage"
  },

  template: JST['questions/index'],

  render: function () {
    this.$el.html(this.template())
    this.addCurrentCollection()
    this.handleButtons()

    return this
  },

  handleButtons: function () {
    if (this.collection.page() === 1) {
      $(".last.questions").prop("disabled", true)
    } else {
      $(".last.questions").prop("disabled", false)
    }

    if (this.collection.length < 25) {
      $(".next.questions").prop("disabled", true)
    } else {
      $(".next.questions").prop("disabled", false)
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

  lastPage: function () {
    this.collection.lastPage()
    this.collection.refresh()
  },

  nextPage: function () {
    this.collection.nextPage()
    this.collection.refresh()
  }
})
