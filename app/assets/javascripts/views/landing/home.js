QuestionEase.Views.Home = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.users = options.users;
  },

  template: JST["home/home"],

  render: function () {
    this.$el.html(this.template())

    this.addUserIndex()

    return this
  },

  addUserIndex: function () {
    var userIndex = new QuestionEase.Views.UserIndex({collection: this.users});
    this.addSubview('.user-list', userIndex);
  }
})
