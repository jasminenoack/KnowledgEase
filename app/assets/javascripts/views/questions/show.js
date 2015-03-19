KnowledgEase.Views.QuestionShow = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
    this.listenTo(this.model.answers(), "add", this.render)
  },

  template: JST['questions/show'],

  events: {
    "click #set-topics": "clear",
    "keypress input#set-topics":"addTopic",
    "click .topic-item button":"removeTopic",
  },

  render: function () {
    this.$el.html(this.template({question: this.model}))
    this.addTopics()
    this.addFollowers()
    this.addFollowButton()
    this.addComments()
    this.addAnswerRequest()
    this.addAnswerForm()
    this.addAnswers()
    return this
  },

  addAnswerForm: function () {
    var answerForm = new KnowledgEase.Views.AnswerForm({
      model: this.model
    })
    this.addSubview(".answer-form", answerForm)
  },

  addAnswerRequest: function () {
    var requestAnswer = new KnowledgEase.Views.RequestAnswer({
      model: this.model
    })
    this.addSubview(".request", requestAnswer)
  },

  addComments: function () {
    var commentIndex = new KnowledgEase.Views.CommentIndex({
      collection: this.model.comments(),
      parent: this.model
    })
    this.addSubview("p.comments", commentIndex)
  },

  addFollowButton: function () {
     var followButton = new KnowledgEase.Views.FollowButton({
       model: this.model
     })
     this.addSubview("section.follow-button", followButton)
   },

  addIndexItemsSidebar: function (collection, viewConstructor, selector) {
    if (collection.length) {
      _(_.sample(collection.models, 20)).each(function (item) {
        var topicItem = new viewConstructor({
          model: item,
          parent: this.model 
        })

        this.addSubview(selector, topicItem)
      }.bind(this));
    }
  },

  addTopics: function () {
    this.$el.find()
    this.addIndexItemsSidebar(
      this.model.topics(),
      KnowledgEase.Views.TopicIndexItem,
      ".topics-list"
    );
    this.addTopicsField()
  },

  addTopicToList: function (topic) {
    var topicItem = new KnowledgEase.Views.TopicIndexItem({
      model: topic,
      parent: this.model,
    })
    this.addSubview(".topics-list", topicItem)
  },

  addTopicsField: function () {
    var topics = _.map(KnowledgEase.topics.models, function (topic) {
      return topic.get("title")
    })

    this.$el.find("#set-topics").typeahead({
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

  addFollowers: function () {
    this.addIndexItemsSidebar(
      this.model.askers(),
      KnowledgEase.Views.UserIndexItem,
      ".want-answers"
    );
  },

  addAnswers: function () {
    this.model.answers().each(function (answer) {
      var answerView = new KnowledgEase.Views.answerView({model: answer})
      this.addSubview(".answers", answerView)
    }.bind(this))
  },

  clear: function (event) {
    $(event.currentTarget).val("")
  },

  addTopic: function () {
    if(event.which == 13) {
      var newTopic = $(event.target).val()
      event.preventDefault()
      event.stopPropagation()

      if (!_(this.model.topics()).contains(newTopic)) {
        $.ajax({
          url: "/api/questions/add_topic",
          method: "post",
          data: {
            question_id: this.model.id,
            title: newTopic
          },
          success: function (topic) {
            topic = new KnowledgEase.Models.Topic(topic)
            this.model.topics().add(topic)
            this.addTopicToList(topic)
            KnowledgEase.topics.add(topic)
          }.bind(this)
        })
      }
      $(event.target).val("")
    }
  },

})
