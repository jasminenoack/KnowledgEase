;(function () {

$.Tabs = function (el) {
  this.$el = $(el);

  this.$tabs = this.$el.find(".tab")
  this.$activeTab = this.$tabs.eq(0).addClass("active")

  this.$tabPanes = this.$el.find(".tab-pane");
  this.$activeTabPane = this.$tabPanes.eq(0).addClass("active")

  this.$el.on("click", ".tab", this.clickTab.bind(this));
};

$.Tabs.prototype.clickTab = function (event) {
  event.preventDefault();

  this.$activeTab.removeClass("active");
  this.$activeTab = $(event.currentTarget)
  this.$activeTab.addClass("active");

  this.$activeTabPane.removeClass("active")
  this.$activeTabPane = this.$tabPanes.eq(this.$activeTab.index())
  this.$activeTabPane.addClass("active")
};


$.fn.Tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
}

})();
