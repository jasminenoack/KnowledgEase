KnowledgEase.Views.Feed = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
    this.page()
  },

  template: JST['feed/feed'],
  templateItem: JST['feed/feedItem'],

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
    this.$el.html(this.template())
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
    this.$el.find("ul.feed").append(this.templateItem({question: model}))
  },

  addCurrentCollection: function () {
    this.$el.find("ul.feed").empty()
    this.collection.each( function (question) {
      this.add(question)
    }.bind(this))
  },
})

_.extend(
  KnowledgEase.Views.Feed.prototype,
  KnowledgEase.PaginationUtils)
