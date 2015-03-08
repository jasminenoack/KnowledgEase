# Schema Information

## user
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
email       | string    | not null, unique true, regex check, action mailer
fname       | string    |
lname       | string    |
username    | string    | not null, unique true
pass_digest | string    | not null, password min 6, require number
<!-- privacy     | boolean   | not null -->
credits     | integer   |
location    | string    |
biography   | text      |

index:
* email,
* username

is referenced by:
* sessions,
* messages(sender, receiver)
* followers(followee, follower)
* want answers
* ask to answer(asker, answerer)
* topics
* knows about
* reading list
* answers
* comments
* votes
* edits

## session
column name | data type | details
------------|-----------|--------------------
id          | integer   | not null, primary key
token       | string    | not null, unique true
location    | string    |
browser     | string    |
user_id     | integer   | foreign key (references users)

index:
* user_id,
* token

## messages
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
sender_id   | integer   | not null, foreign key (references users)
recipient_id| integer   | not null, foreign key (references users)
body        | text      | not null
subject     | string    | not null

index:
* sender_id
* recipient_id
* subject

## followings
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
follower_id     | integer   | not null, foreign key (references users)
followable_id   | integer   | not null, foreign key (references followed item)
followable_type | string    | not null, foreign key (references followed item)

followed items(users, questions, topics)

index:
* follower_id
* followable_id, followable_type

## questions
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references user)
question    | string    | not null
description | text      |

is referenced by:
* followings
* want answers
* topicing
* listing
* answers
* comments
* votes
* edits

index:
* question
* user_id
* question

## want answers
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)

index:
* user_id

## ask to answer
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
asker_id    | integer   | not null, foreign key (references users)
answerer_id | integer   | not null, foreign key (references users)

index:
* asker_id
* answerer_id

## topics
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references user)
name        | string    | not null
description | text      |

is referenced by:
* follows
* knows about
* topicing

index:
* user_id
* name

## knows about

column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references user)
topic_id    | integer   | not null, foreign key (references topic)

index:
* user_id
* topic_id

## topicing

column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
question_id | integer   | not null, foreign key (references question)
topic_id    | integer   | not null, foreign key (references topic)

index:
* question_id
* topic_id

## reading list
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
title       | string    | not null

is referenced by:
* listing

index:
* user_id
* title

## listing

column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
list_id     | integer   | not null, foreign key (references reading list)
user_id     | integer   | not null, foreign key (references users)

index:
* list_id
* user_id

## answers

column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
question_id | integer   | not null, foreign key (references question)
user_id     | integer   | not null, foreign key (references users)
body        | string    | not null

is referenced by:
* comments
* votes
* edits

index:
* user_id
* question_id

## comments

column name      | data type | details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
user_id          | integer   | not null, foreign key (references users)
commentable_type | string    | not null, foreign key (references commented on object)
commentable_id   | integer   | not null, foreign key (references commented on object)

commentable: users, questions, answers

index:
* user_id
* commentable_id
* commentable_type

## votes

column name      | data type | details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
user_id          | integer   | not null, foreign key (references users)
voteable_type    | string    | not null, foreign key (references voted on object)
voteable_id      | integer   | not null, foreign key (references voted on object)

voteable: users, questions, answers

index:
* user_id
* voteable_id
* voteable_type


## edits

column name      | data type | details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
user_id          | integer   | not null, foreign key (references users)
changes          | string    | serialized
question_id      | integer   | not null, foreign key (references question)
answer_id        | integer   | not null, foreign key (references answer)

index:
* user_id
* answer_id
* question_id
