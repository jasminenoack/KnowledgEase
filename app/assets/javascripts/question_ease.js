window.QuestionEase = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new QuestionEase.Routers.AppRouter({$rootEl: $('.backbone-content')})
    Backbone.history.start()
  }
};





$(document).ready(function(){
  QuestionEase.initialize();
});
