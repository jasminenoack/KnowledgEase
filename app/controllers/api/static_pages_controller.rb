class Api::StaticPagesController < ApplicationController
  def search
    @results = PgSearch
      .multisearch(params[:query])
      .includes(:searchable)
  end
end
