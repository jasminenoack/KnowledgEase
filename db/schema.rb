# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150313130728) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answers", force: :cascade do |t|
    t.integer  "question_id", null: false
    t.integer  "user_id",     null: false
    t.text     "body",        null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "answers", ["question_id"], name: "index_answers_on_question_id", using: :btree
  add_index "answers", ["user_id"], name: "index_answers_on_user_id", using: :btree

  create_table "questions", force: :cascade do |t|
    t.integer  "user_id",     null: false
    t.string   "question",    null: false
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "questions", ["question"], name: "index_questions_on_question", unique: true, using: :btree
  add_index "questions", ["user_id"], name: "index_questions_on_user_id", using: :btree

  create_table "sessions", force: :cascade do |t|
    t.string   "session_token", null: false
    t.integer  "user_id",       null: false
    t.string   "location"
    t.string   "browser"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "sessions", ["session_token"], name: "index_sessions_on_session_token", unique: true, using: :btree
  add_index "sessions", ["user_id"], name: "index_sessions_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "first_name"
    t.string   "last_name"
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "location"
    t.text     "biography"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

  create_table "want_answers", force: :cascade do |t|
    t.integer  "asker_id",    null: false
    t.integer  "answerer_id"
    t.integer  "question_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "want_answers", ["answerer_id"], name: "index_want_answers_on_answerer_id", using: :btree
  add_index "want_answers", ["asker_id"], name: "index_want_answers_on_asker_id", using: :btree
  add_index "want_answers", ["question_id"], name: "index_want_answers_on_question_id", using: :btree

end
