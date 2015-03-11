KnowledgEase.PaginatedCollection = Backbone.Collection.extend({
  page: function () {
    if (!this._page) {
      this._page = 1
    }
    return this._page
  },

  add_page: function () {
    return this._page += 1
  },

  subtract_page: function () {
    if (this._page === 1) {
      return
    }
    return this._page -= 1
  },

  url: function () {
    return this.rootUrl + "?page=" + this.page()
  },
})
