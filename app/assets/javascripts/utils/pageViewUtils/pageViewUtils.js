KnowledgEase.PaginationUtils = {
  page: function () {
    if (!this.collection._page) {
      this.collection._page = 1
    }
    return this.collection._page
  },

  nextPage: function () {
    console.log("next")
    this.collection._page += 1
    this.collection.fetch({
      data: {
        page: this.collection._page
      }
    })
  },

  lastPage: function () {
    if (this.collection._page === 1) {
      return
    }
    this.collection._page -= 1
    console.log(this.collection._page)
    this.collection.fetch({
      data: {
        page: this.collection._page
      }
    })
  },

  url: function () {
    return this.collection.rootUrl + "?page=" + this.page()
  },

  resetPage: function () {
    return (this.collection._page = 1)
  },
}
