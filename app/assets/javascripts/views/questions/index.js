KnowledgEase.Views.QuestionIndex = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.collection, "add", this.add);
    this.first = true

  },

  template: JST['questions/index'],

  render: function () {
    // debugger
    this.$el.html(this.template())

    this.handleSubviews()

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
      var IndexItem = new KnowledgEase.Views.QuestionIndexItem({
        model: question
      })
      this.addSubview("ul.questions", IndexItem)
    }.bind(this))
  },

  handleSubviews: function () {
    if (this.first) {
      this.addCurrentCollection()
      this.first = false
    } else {
      this.attachSubviews()
    }
  },
})
