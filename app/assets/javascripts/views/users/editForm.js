KnowledgEase.Views.UserEdit = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render)
    this.$modal = options.$modal
    this.model.set("set_known_topics", [])
  },

  events: {
    "submit form.edit-user": 'update',
    "click .close": "closeView",
    "keypress input#set_topics":"addTopic",
    "click .topic-item button":"removeTopic",
  },

  template: JST['users/editform'],

  render: function () {
    this.$el.html(this.template({user: this.model}));
    this.addTopicsToList();
    this.setupTopicField();

    return this;
  },

  update: function (event) {
    event.preventDefault()
    var attrs = $(event.currentTarget).serializeJSON();
    this.model.save(attrs);
    this.closeView();
    Backbone.history.navigate("#/users/" + this.model.id, {trigger: true})
  },

  closeView: function () {
    this.$el.remove()
    this.$modal.removeClass("active")
    Backbone.history.navigate("users/"+ this.model.id)
  },

  addTopicsToList: function () {
    this.model.knownTopics().each(function (topic) {
      var topicItem =
        "<li class='topic-item'>" +
        topic.escape("title") +
        "<button type='button'> remove</button>, </li>"
      this.$el.find(".known-topics").append(topicItem)
    }.bind(this))
  },

  setupTopicField: function () {
    var topics = _.map(KnowledgEase.topics.models, function (topic) {
      return topic.get("title")
    })

    this.$el.find("#set_topics").typeahead({
        hint: false,
        highlight: true,
        minLength: 1
      },
      {
        name: 'topics',
        displayKey: 'value',
        source: this.substringMatcher(topics)
    })

  },

  substringMatcher: function(strs) {
    return function findMatches(q, cb) {
      var matches, substrRegex;
      matches = [];
      substrRegex = new RegExp(q, 'i');
      $.each(strs, function(i, str) {
        if (substrRegex.test(str)) {
          matches.push({ value: str });
        }
      });
      cb(matches);
    };
  },

  addTopic: function (event) {
    console.log("event")
    if(event.which == 13) {
      var current_topics = this.model.get("set_known_topics")
      var newTopic = $(event.target).val()
      event.preventDefault()
      event.stopPropagation()

      if (!_(current_topics).contains(newTopic)) {
        this.model.get("set_known_topics").push(newTopic)

        var topicItem =
          "<li class='topic-item'>" +
          newTopic +
          "<button type='button'> remove</button>, </li>"
        this.$el.find(".known-topics").append(topicItem)
      }
      $(event.target).val("")
    }
  },

  removeTopic: function (event) {
    var current_topics = this.model.get("set_topics")
    var text = $(event.target).parent().text()
    var topic = text.substring(0, text.length - 9)
    this.model.set("set_know_topics", _.without(current_topics, topic))
    $(event.target).parent().remove()

    console.log("remove")
    $.ajax({
      url: "/api/users/remove_knows_about",
      method: "delete",
      data: {title: topic}
    })
  }
})
