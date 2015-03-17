KnowledgEase.Views.NewQuestion = Backbone.CompositeView.extend({
  initialize: function (options) {
    KnowledgEase.topics.fetch()
    // this.model.set("set_topics", ["philsophy","boats"])

    this.model.set("set_topics", [])
  },

  template: JST['questions/AddQuestionStart'],
  expandTemplate: JST['questions/expandform'],
  descriptionTemplate: JST['questions/descriptionField'],
  topicTemplate: JST['questions/topics'],

  events: {
    "focus .add-question-input":"expandForm",
    "click .close": "closeView",
    "submit": "createQuestion",
    "click button.add-description":"addDescriptionField",
    "click button.add-topics":"addTopicsField",
    "keypress input#topics":"addTopic",
    "click .topic-item button":"removeTopic",
  },

  render: function () {
    this.$el.html(this.template({question: this.model}));

    return this;
  },

  tagName: "form",

  expandForm: function () {
    if (!this.in_use) {
      this.in_use = true,
      this.$el.find(".ask-question").append(this.expandTemplate())
    }
  },

  createQuestion: function (event) {
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON()
    console.log(this.model)

    this.model.save(attrs, {
      success: function (json) {
        this.collection.add(this.model)
        this.model = new KnowledgEase.Models.Question
        this.model.set("set_topics", [])
        KnowledgEase.topics.fetch()
        this.render()
        this.in_use = false
        Backbone.history.navigate("questions/" + json.id, {trigger: true})
      }.bind(this),
      error: function (object, xhr) {
        this.$el.find('.failure').html(JST['errors']({errors: xhr.responseJSON}))
        setTimeout(function () {
          $('.failure').empty()
        }, 5000)
      }.bind(this)
    })
  },

  closeView: function () {
    this.in_use = false
    this.render()
  },

  addDescriptionField: function (event) {
    $(event.currentTarget).replaceWith(this.descriptionTemplate())
  },

  addTopicsField: function (event) {
    $(event.currentTarget).replaceWith(this.topicTemplate())

    var topics = _.map(KnowledgEase.topics.models, function (topic) {
      return topic.get("title")
    })


    this.$el.find("#topics").typeahead({
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
    if(event.which == 13) {
      event.preventDefault()
      event.stopPropagation()

      this.model.get("set_topics").push($(event.target).val())

      var topicItem =
        "<li class='topic-item'>" +
        $(event.target).val() +
        "<button type='button'> remove</button>, </li>"
      this.$el.find(".topic-list").append(topicItem)
      $(event.target).val("")
    }
  },

  removeTopic: function (event) {
    var current_topics = this.model.get("set_topics")
    var text = $(event.target).parent().text()
    var topic = text.substring(0, text.length - 9)
    this.model.set("set_topics", _.without(current_topics, topic))
    $(event.target).parent().remove()
  }
})
