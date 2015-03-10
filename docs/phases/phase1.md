# Phase 1: Auth

## Rails
### Models
* User

### Controllers
* UsersController (create, destroy, index, show, update)
* SessionsController (create, destroy)

### Views
* users/index.json.jbuilder
* users/show.json.jbuilder
* users/current.json.jbuilder
* static/index

## Backbone
### Models
* user

### Collections

### Views
* UserShow
* UserForm
* UserNew
* UserEdit
* UserIndex
* SessionNew
* NavBar

## Gems/Libraries
* BCrypt
* Underscore.js
* serializeJSON
* shoulda-matchers
