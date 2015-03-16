KnowledgEase.Views.TopicIndex = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.listenTo(this.collection, "sync", this.render);
    // this.listenTo(this.collection, "add", this.add);
    // this.listenTo(this.collection, "sync", this.render);
    this.page()
    this.parent = options.parent
  },

  template: JST['topics/index'],
  editTemplate: JST['topics/editTopicsButton'],
  doneTemplate: JST['topics/doneEditing'],

  events: {
   "click .edit-done":"refresh",
   "click .last.topics":"lastPage",
   "click .next.topics":"nextPage",
   "click .edit-topics":"editTopics"
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

  editTopics: function () {
    this.$el.find("ul.topics").html(this.doneTemplate())

    this.$el.find(".edit").empty()
    this.addCurrentCollectionEdits()
    this.handleButtons()

    var editView = new KnowledgEase.Views.EditTopics({
      collection: this.collection,
      parent: this.parent,
    })

    this.$el
  },

  addCurrentCollectionEdits: function () {
      var editView = new KnowledgEase.Views.EditTopics({
        collection: this.collection,
        parent: this.parent
      })
      this.addSubview(".edit", editView)
  },

  createContent: function () {
    this.$el.html(this.template())
    this.addCurrentCollection()
    this.addTopicForm()
    if (this.parent) {
      this.$el.find(".edit").html(this.editTemplate())
    }
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

  addTopicForm: function () {
    var TopicForm = new KnowledgEase.Views.Topicform({
      model: new KnowledgEase.Models.Topic
    })
    this.addSubview(".topic-form", TopicForm)
  },
})

_.extend(
  KnowledgEase.Views.TopicIndex.prototype,
  KnowledgEase.PaginationUtils)
