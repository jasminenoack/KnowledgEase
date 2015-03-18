KnowledgEase.Views.TopicIndex = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.listenTo(this.collection, "sync", this.render);
    this.page()
    this.parent = options.parent
  },

  template: JST['topics/index'],

  events: {
   "click .last.topics":"lastPage",
   "click .next.topics":"nextPage",
  },

  render: function () {
    this.createContent()
    this.handleButtons()
    return this
  },

  refresh: function () {
    this.parent.fetch()
    this.render()
  },

  createContent: function () {
    this.$el.html(this.template())
    this.addCurrentCollection()
  },

  handleButtons: function () {
    if (this.page() === 1) {
      this.$el.find(".last.topics").prop("disabled", true)
    } else {
      this.$el.find(".last.topics").prop("disabled", false)
    }

    if (this.collection.length < 25) {
      this.$el.find(".next.topics").prop("disabled", true)
    } else {
      this.$el.find(".next.topics").prop("disabled", false)
    }
  },

  add: function (model) {
    var IndexItem = new KnowledgEase.Views.TopicIndexItem({
      model: model
    })
    this.addSubview("ul.topics", IndexItem)
  },

  addCurrentCollection: function () {
    this.collection.each(function (topic) {
      this.add(topic)
    }.bind(this))
  },
})

_.extend(
  KnowledgEase.Views.TopicIndex.prototype,
  KnowledgEase.PaginationUtils)
