class Topic < ActiveRecord::Base
   validates :title, presence: true

   include PgSearch
   multisearchable :against => [:title, :description]

   has_many :knows_abouts, inverse_of: :topic
   has_many :knowledgable_users, through: :knows_abouts, source: :user
   has_many :topicings, inverse_of: :topic
   has_many :questions, through: :topicings

   has_many :followers, class_name: "Follow", as: :followable
   has_many :users_following, through: :followers, source: :follower

   def update_search_documents
     questions.each { |question| question.update(question: question.question) }
   end

   def self.word_cloud_array
     word_cloud = Hash.new {|h,k| h[k] = {text: false, weight: 0, link: ""} }

     Topic.joins(:topicings).each do |topic|
       if word_cloud[topic][:text]
         word_cloud[topic][:weight] += 1
       else
         word_cloud[topic][:weight] += 1
         word_cloud[topic][:link] = "topics/#{topic.id}"
         word_cloud[topic][:text] = topic.title
       end
     end

     word_cloud.values
   end

end
