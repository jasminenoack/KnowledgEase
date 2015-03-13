KnowledgEase.Views.IndexBase = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.collection, "add", this.add);
    this.buttons = false
  },

  template: JST['questions/index'],



  render: function () {
    this.createContent()
    setTimeout(this.addCardEvents.bind(this), 0)
    return this
  },

  createContent: function () {
    this.$el.html(this.template({buttons: this.buttons}))
    this.addCurrentCollection()
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

  addCardEvents: function () {
    this.$el.unbind("click")
    this.$el.paperCollapse()
  },
})
