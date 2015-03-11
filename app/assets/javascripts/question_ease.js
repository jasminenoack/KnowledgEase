window.KnowledgEase = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new KnowledgEase.Routers.AppRouter({$rootEl: $('.backbone-content')})
    Backbone.history.start()
  }
};





$(document).ready(function(){
  KnowledgEase.initialize();
});
