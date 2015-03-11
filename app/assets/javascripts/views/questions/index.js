KnowledgEase.Views.QuestionIndex = KnowledgEase.Views.IndexBase.extend({
  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.add);
  },

  events: {
   "click .last.questions":"lastPage",
   "click .next.questions":"nextPage"
  },

  render: function () {
    KnowledgEase.Views.IndexBase.prototype.render.apply(this)
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

  lastPage: function () {
    this.collection.lastPage()
    this.collection.refresh()
  },

  nextPage: function () {
    this.collection.nextPage()
    this.collection.refresh()
  }
})
