json.array! @results  do |result|
  url = "#/#{result.searchable_type.pluralize.downcase}/#{result.searchable_id}"
  if result.searchable_type == "Question"
    link_text = "Question: #{clip_item(result.searchable.question)}"
  elsif result.searchable_type == "Topic"
    link_text = "Topic: #{clip_item(result.searchable.title)}"
  elsif result.searchable_type == "Answer"
    link_text = "Answer: #{clip_item(result.searchable.body)}"
    url = "#/questions/#{result.searchable.question.id}"
  elsif result.searchable_type == "User"
    link_text = "User: #{clip_item(result.searchable.name)}"
  else
    raise "wtf"
  end

  json.link "<a href=\"#{url}\">#{link_text}</a>"
end
