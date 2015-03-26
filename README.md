# Question Ease

A question app inspired by Quora.

[Live][link]

[link]: https://www.knowledgease.com

## Features
* User accounts. 
* Users can ask questions.
* Users can answer questions.
* Users can comment on questions, answers, or other users.
* Users can know about topics. 
* Questions can have many topics. 
* Users can follow topics, questions, and other users. 
* Users can search questions, users, answers, and topics. 
* Uses action mailer to confirm a users email address.
* Allows OmniAuth sign in through GitHub. 
* Includes a feed of question activity associated with the questions, users and topics the user is following. 
* Includes notifications of recent activity. 
* Allows users to upload photos.
 
# TODO

* Text can be entered in markdown.
* Tool tips.
* Votes.
* User statistics.
* Tracking Edits.

# Technology

* Backbone.js frontend consumes a RESTful JSON API served by Rails backend, to create a single-page app.
* File upload and storage with Paperclip and Amazon AWS
* Uses pg_search gem to create a search.
* Implements a CompositeView class in Backbone to better modularize view code and avoid unnecessary re-renders.
* Implements Pagination with kaminari in rails.
* Implements PaginationUtils module in Backbone to DRY up code and avoid rewriting pagination methods.
* Overrides Backbone parse to allow models to be sent up with all associated data. 
* Implements a typeahead search with typeahead.js.
* Implements a word cloud for topics using jCloud.
* Uses custom ActiveRecord queries to create a news feed. 
* Custom AJAX requests to DRY up Backbone code, by not creating models for join tables.
