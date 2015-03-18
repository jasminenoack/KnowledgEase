module ApplicationHelper
  def clip_item(string)
    string.length > 140 ? "#{string[0..136]}..." : string
  end
end
