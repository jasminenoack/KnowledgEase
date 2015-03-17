class Api::StaticPagesController < ApplicationController
  def search
    @results = PgSearch
      .multisearch(params[:query])
      .order("updated_at DESC")
      .includes(:searchable)
  end
end
