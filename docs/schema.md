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

## session
column name | data type | details
------------|-----------|--------------------
id          | integer   | not null, primary key
token       | string    | not null, unique true
location    | string    |
browser     | string    |
user_id     | integer   | foreign key (references users)

## questions
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references user)
question    | string    | not null
description | text      |

## want answers
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
asker_id    | integer   | not null, foreign key (references users)
answerer_id | integer   | not null, foreign key (references users)
question_id | integer   | not null, foreign key (references questions)

## answers
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
question_id | integer   | not null, foreign key (references question)
user_id     | integer   | not null, foreign key (references users)
body        | string    | not null

## comments
column name      | data type | details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
user_id          | integer   | not null, foreign key (references users)
commentable_type | string    | not null, foreign key (references commented on object)
commentable_id   | integer   | not null, foreign key (references commented on object)
body             | text      | not null

commentable: users, questions, answers

## topics
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
description | text      |

## topicing
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
question_id | integer   | not null, foreign key (references question)
topic_id    | integer   | not null, foreign key (references topic)

## knows about
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references user)
topic_id    | integer   | not null, foreign key (references topic)

## followings
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
follower_id     | integer   | not null, foreign key (references users)
followable_id   | integer   | not null, foreign key (references followed item)
followable_type | string    | not null, foreign key (references followed item)

followed items(users, questions, topics)

## votes
column name      | data type | details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
user_id          | integer   | not null, foreign key (references users)
voteable_type    | string    | not null, foreign key (references voted on object)
voteable_id      | integer   | not null, foreign key (references voted on object)

voteable: questions, answers

## messages
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
sender_id   | integer   | not null, foreign key (references users)
recipient_id| integer   | not null, foreign key (references users)
body        | text      | not null
subject     | string    | not null

## reading list
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
title       | string    | not null

## listing
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
list_id     | integer   | not null, foreign key (references reading list)
user_id     | integer   | not null, foreign key (references users)

## edits
column name      | data type | details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
user_id          | integer   | not null, foreign key (references users)
changes          | string    | serialized
question_id      | integer   | not null, foreign key (references question)
answer_id        | integer   | not null, foreign key (references answer)
