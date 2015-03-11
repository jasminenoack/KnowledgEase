KnowledgEase.Views.IndexBase = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.collection, "add", this.add);
  },

  template: JST['questions/index'],

  render: function () {
    this.$el.html(this.template({buttons: false}))
    this.addCurrentCollection()

    return this
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
