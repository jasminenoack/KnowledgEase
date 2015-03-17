class Api::StaticPagesController < ApplicationController
  def search
    all_results = PgSearch
      .multisearch(params[:query])
      .order("updated_at DESC")
    answer_results = all_results.where(searchable_type: "Answer").includes(searchable: :question)
    other_results = all_results.where.not(searchable_type: "Answer").includes(:searchable)

    @results = (answer_results + other_results).sort{ |x, y| y.updated_at <=> x.updated_at}
  end
end
