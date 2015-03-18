KnowledgEase.Collections.Comments = Backbone.Collection.extend({
  model: KnowledgEase.Models.Comment,

  comparator: function (model1, model2) {
    if (model1.get("updated_at") < model2.get("updated_at") ) {
      return 1
    } else {
      return -1
    }
  },
})
