KnowledgeEase.PaginationUtils ({
  page: function () {
    if (!this.collection._page) {
      this.collection_page = 1
    }
    return this.collection._page
  },

  nextPage: function () {
    return (this.collection._page += 1)
  },

  lastPage: function () {
    if (this.collection.page() === 1) {
      return
    }
    return (this.collection._page -= 1)
  },

  url: function () {
    return this.collection.rootUrl + "?page=" + this.page()
  },

  resetPage: function () {
    return (this.collection._page = 1)
  },

  refresh: function () {
    this.collection.reset()
    this.collection.fetch()
  }
})
