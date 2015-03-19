# Question Ease

[Heroku link][heroku]

[heroku]: https://KnowledgEase.herokuapp.com/

## Minimum Viable Product
KnowledgEase is a clone of Quora, which focuses on create a simple and intuitive user interface.

Users
- [X] Create accounts
- [X] Create sessions (log in)
- [X] Create questions
- [X] Create answers
- [X] Comment on Questions and answers
- [X] Follow users topics and questions

Questions
- [X] View questions
- [X] Have answers and comments

Answers
- [X] Can have comments
- [X] Are accessed nested under questions

Comments
- [X] Can be on users, questions, or answers

Topics
- [X] Users can now about topics
- [X] Questions have many topics

Following
- [X] Users can follow topics, questions or other users

Search
- [X] Users can search by topic
- [X] Users can search by user
- [X] Users can search by question content

## Bonus Features

Improvements
- [ ] Text can be inputed in markdown with a preview
- [ ] Pages show tips indicating additional features
- [ ] Users can post links and pictures
- [ ] Can be listed as anonomous
- [ ] Creates seperate user feeds for trending, following, etc.

Votes
- [ ] Users can vote on questions or answers
- [ ] Users have credits based on the number of votes they get
- [ ] Users user credits to request answers from other users
- [ ] Users have stats based on votes
- [ ] User can choose the best answer

Views
- [ ] Users have stats based on when their pages are viewed.

Messaging
- [ ] Users can message other users

Reading List/Answer Later
- [ ] Users can move questions to their reading list
- [ ] Users can mark a question as to answer later

Edits
- [ ] Question edits are tracked.

Notification
- [ ] Users are notified of answers to their questions
- [ ] Users are notified of their new followers
- [ ] Users are notified of votes for their content

Action Mailer
- [ ] Users confirm their accounts through email.
- [ ] Users can reset their password through email

Settings
- [ ] Users can change their privacy settings
- [ ] Users can change their notification settings

Mentions
- [ ] Users can mention another user in their posts

Blog
- [ ] Users can create blogs
- [ ] Users can post on blogs


## Design Docs
* MVP Wireframes drawn by hand
* [Bonus Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Auth --complete
I will implement user authentication in Backbone and Rails. By the end of this phase, users will be able to create an account, sign in, edit their profile and view an index of other users and view other users profiles. I will create a modal view for sign up. I will also implement very basic CSS (background color margins) and ensure that I can push a working app to heroku with working assets.

[Details][phase-one]

### Phase 2: Questions --complete
I will implement API CRUD routes for questions. These will allow users to create, edit and view questions. <!-- A user will also be able to list his question as anonymous. -->The user landing page at the end of this phase will list a pagination of the most recent questions instead of the user index made in the previous phase. A user will be able to view and edit his own questions.

[Details][phase-two]

### Phase 3: User/Question Join Tables --complete

I plan to create a few different ways for users to interact with questions. I will create a table to implement two primary relationships of wanting an answer and asking another user to answer. A user will be able to indicate that we wants an answer to a question by clicking a button on the question page. A user will also be able to ask another user on the site to answer his question.

[Details][phase-three]

### Phase 4: answers --complete
In this phase I will add the ability for users to answer questions. I will create api routes that allow the user to find questions. I will make it possible for a user to view all answers to questions and add his own.

[Details][phase-four]

### Phase 5: comments --complete
I will need to develop a polymorphic relationship to implement comments. Users will be able to post comments on questions, answers, and other users.

[Details][phase-five]


## Phase 6 topics --complete
I will implement topics which will include both a topic table and a join table allowing for a many to many relationship with questions. I will also create a join table that will let users indicate topics they know about. With this information I will implement the answer page which will list questions that a user has stated he knows about. I will also implement a topic page which will show topics that a user knows about.

[Details][phase-six]

## phase 7 following
I will implelement a polymorphic join table that will connect users to topics, users, and questions which they want to follow. I will use this data to create the base views that will be used on the landing page of a signed in user designed to show topics which the user has indicated that he has an interest in.

[Details][phase-seven]


[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
[phase-seven]: ./docs/phases/phase7.md
