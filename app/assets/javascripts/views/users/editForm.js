QuestionEase.Views.UserEdit = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  events: {
    "submit form.edit-user": 'update'
  },

  template: JST['users/editform'],

  render: function () {
    this.$el.html(this.template({user: this.model}));

    return this;
  },

  update: function (event) {
    event.preventDefault()
    var attrs = $(event.currentTarget).serializeJSON();
    this.model.save(attrs);
    Backbone.history.navigate("#/users/" + this.model.id, {trigger: true})
  },
})
