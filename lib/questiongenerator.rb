require 'yaml'

# Generates some questions.
module QuestionGenerator
  # Version of QuestionGenerator
  VERSION = "0.1.0"

  class << self
    # The base path to the questions (e.g. +'/home/nilsding/questions'+).
    attr_accessor :question_base_path
    # The default locale, as a symbol.
    attr_accessor :default_locale
  end

  # Generates a new question.
  # @param options [Hash] A customizable set of options.
  # @option options [Symbol] :locale (@default_locale) The target locale
  # @option options [String] :prefix Prefix of the question, e.g. +'¿'+
  # @option options [String] :suffix ('?') Suffix of the question, e.g. +' ?'+
  # @option options [Boolean] :use_compiled (true) Use compiled questions
  #   instead of generating it.  See also {compile}
  # @return [String] String containing the generated question.
  def self.generate(options = {})
    opts = {
      locale: @default_locale,
      prefix: '',
      suffix: '?',
      use_compiled: true
    }.merge!(options)
    if opts[:use_compiled] and !@compiled[opts[:locale]].nil?
      opts[:prefix] + @compiled[opts[:locale]].sample + opts[:suffix]
    else
      questions = YAML.load_file(File.expand_path("#{opts[:locale].to_s}.yml", @question_base_path))
      opts[:prefix] + get_question(questions).strip + opts[:suffix]
    end
  end
  
  # Compiles all the questions and stores it into the +@compiled+ hash.
  # @param options [Hash] A customizable set of options.
  # @option options [Symbol] :locale (@default_locale) The target locale
  def self.compile(options = {})
    opts = { 
      locale: @default_locale
    }.merge!(options)
    questions = YAML.load_file(File.expand_path("#{opts[:locale].to_s}.yml", @question_base_path))
    @compiled[@default_locale] = build(questions)
  end

  private

    def self.get_question questions
      question = ""
      if questions.is_a? Hash
        key = questions.keys.sample
        value = questions[key]
        question = "#{key} #{get_question(value)}"
      elsif questions.is_a? Array
        question = get_question questions.sample
      elsif questions.is_a? String
        question = questions
      end
      question
    end
    
    def self.build(questions, q = "")
      ary = []
      if questions.is_a? Hash
        questions.each do |k, v|
          ary << build(v, "#{q}#{k} ")
        end
      elsif questions.is_a? Array
        questions.each do |v|
          ary << build(v, q)
        end
      elsif questions.is_a? String
        return "#{q}#{questions}".strip
      end
      ary.flatten
    end

    @question_base_path = File.expand_path("../questions/", __FILE__)
    @default_locale = :en
    @compiled = {}
end
