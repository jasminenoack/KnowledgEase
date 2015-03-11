user = User.find_by(email: "jasmine@example.com")
user.questions.create(question: "What is the meaning of life?", description: "We live our lives inside a bubble with an opaque surface.  Is there something bigger?  Were we put here for a purpose?  What happens next?  What is the end goal?  Is there an end goal?  If those answers exist they are likely outside of our perception.")
user.questions.create(question: "Why is there something rather than nothing?", description: "When predicting something that science will never do, it’s wise to recall the French philosopher Auguste Comte. In 1835 he asserted that science will never figure out what stars are made of. That seemed like a safe bet, but within decades astronomers started determining the chemical composition of the Sun and other stars by analyzing the spectrum of light they emitted.")
user.questions.create(question: "Is our universe real?", description: "Human senses are fallible. What people think they perceive is actually filtered and processed by the brain to construct a useful view of the world. Normally, this filtering is helpful, allowing people to sort out important information from the barrage of data that comes in every minute from their environment.")


user = User.find_by(email: "bono@example.com")
user.questions.create(question: "What is you favorite song?", description: "I really like the Real Slim Shady, but I would like to branch out.")

user = User.find_by(email: "mrFront@example.com")
user.questions.create(question: "How can I keep secrets from the future?", description: "Get your most closely kept personal thought:
put it in the Word .doc with a password lock.
Stock it deep in the .rar with extraction precluded
by the ludicrous length and the strength of a reputedly
dictionary-attack-proof string of characters
(this, imperative to thwart all the disparagers
of privacy: the NSA and Homeland S).
You better PGP the .rar because so far they ain’t impressed.
You better take the .pgp and print the hex of it out,
scan that into a TIFF. Then, if you seek redoubt
for your data, scramble up the order of the pixels
with a one-time pad that describes the fun time had by the thick-soled-
boot-wearing stomper who danced to produce random
claptrap, all the intervals in between which, set in tandem
with the stomps themselves, begat a seed of math unguessable.
Ain’t no complaint about this cipher that’s redressable!
Best of all, your secret: nothing extant could extract it.
By 2025 a children’s Speak & Spell could crack it." )

user = User.find_by(email: "fred@example.com")
user.questions.create(question: "Do we have free will?", description: "The desire for freedom of will in the superlative, metaphysical sense, such as still holds sway, unfortunately, in the minds of the half-educated, the desire to bear the entire and ultimate responsibility for one's actions oneself, and to absolve God, the world, ancestors, chance, and society therefrom, involves nothing less than to be precisely this causa sui, and, with more than Munchausen daring, to pull oneself up into existence by the hair, out of the slough of nothingness.")
user.questions.create(question: "Is there life after death?", description: 'The Christian moral worldview has urged people to treat the afterlife as more important than this one. Instead of urging self-improvement in earthly terms, the Christian moral vision emphasizes abstaining from "selfish" action. The person who does essentially nothing with his or her life but has avoided "sin" might merit heaven, in the Christian view, while a creative person will probably be deemed "immoral" because he or she refuses to follow "the herd." Thus the prohibitions of Judeo-Christian and Kantian ethics are in fact "leveling" devices that the weak and mediocre resentfully use to put more talented and stronger spirits at a disadvantage.')

user = User.find_by(email: "paul@example.com")
user.questions.create(question: "Does God exist?", description: "That God does not exist, I cannot deny, That my whole being cries out for God I cannot forget.")
user.questions.create(question: "Can you really experience anything objectively?", description: "In order to make myself recognized by the Other, I must risk my own life. To risk one's life, in fact, is to reveal oneself as not-bound to the objective form or to any determined existence — as not-bound to life.")
user.questions.create(question: "What is the best moral system?", description: "Is the first move to make every man aware of what he is and to make the full responsibility of his existence rest on him.")

user = User.find_by(email: "sennacy@example.com")
user.questions.create(question: "meow")
user.questions.create(question: "purr")
