KnowledgEase.PaginatedCollection = Backbone.Collection.extend({
  page: function () {
    if (!this._page) {
      this._page = 1
    }
    return this._page
  },

  nextPage: function () {
    return (this._page += 1)
  },

  lastPage: function () {
    if (this.page() === 1) {
      return
    }
    return (this._page -= 1)
  },

  url: function () {
    return this.rootUrl + "?page=" + this.page()
  },

  resetPage: function () {
    return (this._page = 1)
  },

  refresh: function () {
    this.reset()
    this.fetch()
  }
})
