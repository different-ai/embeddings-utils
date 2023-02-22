export const example1 = `Prompt Engineering
Learn how to use AI models with prompt engineering
How to get Codex to produce the code you want!
Have you seen AI models that can generate code for you? Well, if you haven’t, you’re going to see them a lot more soon thanks to models like OpenAI’s Codex models. Codex is a family of AI models from Open AI that translates between natural language and code in more than a dozen programming languages. The power of these AI models is that you can quickly develop and iterate on your ideas and build products that help people do more. Here is an example how you can have a conversation with a Minecraft character and have it follow your instructions by generating Minecraft API commands behind the scenes.

Minecraft intro

This article will show you how to get models like Codex to generate code you want using a technique called Prompt Engineering. Prompt engineering is the practice of using prompts to get the output you want. A prompt is a sequence of text like a sentence or a block of code. The practice of using prompts to elicit output originates with people. Just as you can prompt people with things like a topic for writing an essay, amazingly you can use prompts to elicit an AI model to generate target output based on a task that you have in mind.

Prompt Completion

Like a person writing an essay, an AI model takes a prompt and continues writing based on the text in the prompt. The new text that the model outputs is called the completion. An example task might be to write a Python program to add two numbers. If you write out the task as a Python comment like so:

# Write a function that adds two numbers and returns the result.
And give it that comment as a prompt to Codex, it will generate the code as the completion for you like this:

def add(a, b):
    return a + b
The easiest way to get started with OpenAI is to use the OpenAI Playground. This picture shows the Playground after Codex has generated the completion for the prompt in the comment.

OpenAI Playground

The best way to learn how to use OpenAI models is to try them out. Check out the Getting Access section below to learn how you can get started. OpenAI has a number of examples for how to use their models including code examples. For Codex, the best practices documentation is a great resource for understanding how use to it.

Codex also powers GitHub Copilot, an AI pair programmer available in Visual Studio and Visual Studio Code. Copilot draws context from code and comments you’ve written, and then suggests new lines or whole functions. I wrote this article in VS Code, and as I wrote the above Python example, Copilot automatically used Codex to suggest the code. Below is a screenshot of Copilot in action. The grey text including the Python function is Copilot’s suggested completion. Note that it even suggests the close quote for the Markdown code section.

Copilot completion example

So how can you apply the power of models like Codex in your applications? An example like the one above is simple and easy for Codex to generate. For custom applications, you may need to craft the prompt to better describe your problem. This includes giving Codex examples to help tell it what you are looking for. The rest of this article shows you examples and techniques in prompt engineering to help you get the code you want.

Tell It: Guide the Model with a High Level Task Description
You saw above how you can tell Codex what you want and it will generate it. Codex is amazingly capable at generating code. The quality of its completions depends a lot on what you tell it to do.

For starters, it is usually a good idea to start your prompt with a high-level description of what you are asking Codex to do. As an example, let’s say you want Codex to generate some Python code to plot data from a standard dataset. We could describe our task like this:

# Load iris data from scikit-learn datasets and plot the training data.
Codex is likely to respond with something like the following. Note that it generates code that assumes the scikit-learn datasets package is imported as datasets.

Raw prompt

To fix this, you can tell Codex a bit more detail about what you want it to do. You can tell it that you want Python output and give it additional instructions as well, such as loading libraries first before using them.

# Generate a Python program following user's instructions.  
# Be helpful and import any needed libraries first.
Now the output is more reasonable! It loads the expected libraries first before using them. Adding import into the prompt also helps Codex know that you want to import libraries first.

Completion with high level task description

This pattern combines a high level task description with a more specific user instruction. Together these are passed to the model as the prompt, which returns a completion.

High evel task description and input

Show It: Guide the Model with Examples
Prompts are the input sequences given to an AI model, which generates the output word by word. For a given model, the exact sequence of text that you provide to the model in the prompt influences all of the subsequent output.

Suppose that you prefer a slightly different style of Python code from what Codex generates. For example, to add two numbers, you like to name your arguments differently like this:

Function example

The general principle in working with models like Codex is that you tell it what you want it to do. A highly effective way of telling Codex what you want is to show it examples. Then it will work hard to match its output to the way you like. If you give Codex a longer prompt including the above example, then its completion names the arguments exactly as with the example you gave.

Basic prompt engineering

Zero-shot, one-shot, and few-shot learning
As you work with large AI models, you may hear terms like zero-shot learning. Zero-shot learning is a prompt that has no examples - for example just a task description. One-shot has one example, and few-shot has more than one example.

Below is a diagram capturing the general pattern for few-shot learning:

Basic with examples

Describe It: Guide the Model with High Level Contextual Information
Codex is trained on a large amount of open source code. As you saw in the example with scikit-learn for Python, it knows about many libraries and packages in a variety of languages.

What if you want to use a library that Codex doesn’t know about? You know by now that the way to get Codex to do something is … to tell it or show it! Specfiically, you can describe the API library to Codex before you use it.

The Minecraft Codex sample uses Minecraft’s Simulated Player API to control a character in the game. The Simulated Player API is a TypeScript library that lets you issue commands to move, chat, look at inventory, mine, and craft items. It’s a newer API that Codex doesn’t know about yet. Let’s see how Codex does generating code for it for the following prompt:

/* Minecraft bot commands using the Simulated Player API. When the comment is
conversational, the bot will respond as a helpful Minecraft bot. Otherwise,
 it will do as asked.*/

// Move forward a bit
Codex tries to make an educated guess using ‘bot’ and ‘Simulated Player’ as cues:

Minecraft code with raw Codex

But it’s not correct Simulated Player code. We can show Codex what the Simulated Player API looks like using function signatures for the library. Below is a subset of the API definiition.

// API REFERENCE:
// moveRelative(leftRight: number, backwardForward: number, speed?: number): void - Orders the simulated player to walk in the given direction relative to the player's current rotation.
// stopMoving(): void - Stops moving/walking/following if the simulated player is moving.
// lookAtEntity(entity: Entity): void - Rotates the simulated player's head/body to look at the given entity.
// jumpUp(): boolean - Causes the simulated player to jump.
// chat(message: string): void - Sends a chat message from the simulated player.
// listInventory(object: Block | SimulatedPlayer | Player): InventoryComponentContainer - returns a container enumerating all the items a player or treasure chest has
With the above API definition and some examples, you can get Codex to generate code that follows the API. Here are some examples using the API to control a Minecraft character.

/* Include some example usage of the API */
// Move left
bot.moveRelative(1, 0, 1);
// Stop!
bot.stopMoving();
// Move backwards for half a second
bot.moveRelative(0, -1, 1);
await setTimeout(() => bot.stopMoving(), 500);
Notice how the first example makes explicit what values to use for the moveRelative function signature. Once you have done that, we can ask Codex an instruction to move the character forward a bit. It will then generate the correct code.

Minecraft completion

This pattern adds high level context in the form of the API definition, as well as examples to help Codex understand what you want it to do. It also allows you to use the API to generate code that is more correct.

Context + Examples

Remind It: Guide the Model with Conversational History
For real application use cases with natural language input, it is important to be able to carry the context of a conversation. Consider the following instructions:

User: I want to order a 12oz coffee
User: Oh and can you put it in a 20oz cup?
The AI model would need to know that “it” refers to the 12oz coffee. This is easy for humans, but Codex is a fixed model: it doesn’t change based on the user’s input. Codex doesn’t remember from API call to API call what the last prompt was or what it returned as the completion. How do we get Codex to know that “it” refers to the 12oz coffee? That’s right - we tell it what the user said before. What you can do is add the last input+completion pair as an additional example in the prompt. That gives Codex enough context to give better completions.

Conversational context

Let’s see this in action in another sample application: Codex Babylon. Codex Babylon is a Typescript application that uses BabylonJS to render a 3D scene. BabylonJS is a popular framework for 3D rendering. Codex Babylon provides a web interface to enter natural language commands to place and manipulate objects in a 3D scene. The commands are sent to Codex to generate code that places the objects in the scene. The code is then executed by the app in the browser.

In the animation below, you see the natural language input to make and manipulate cubes, the BabylonJS code that Codex generates, and then the output being rendered right in the browser. You can see that it correctly interprets the user’s instruction to “make them spin”.

Babylon Codex 2

As you might expect, it is not practical to keep adding to the input / output history indefinitely. The context has a limited size. So we keep a rolling window of the user input history in the prompt. This allows Codex to be able to deference things like ‘it’. We call this the session buffer. The Codex Babylon sample includes an implementation of a session buffer.

Putting it all together
Now we are ready to put all of this together. For a given application, you can provide Codex with a prompt consisting of the following:

High level task description: Tell the model to use a helpful tone when outputting natural language
High level context: Describe background information like API hints and database schema to help the model understand the task
Examples: Show the model examples of what you want
User input: Remind the model what the user has said before
The boxes in the diagram below are to help you think about what goes into a prompt. The OpenAI models are very flexible and there are no rules that the prompt must follow a specific structure. You can intermix any of the parts (which may get you different results) and you can add or remove parts as you see fit. We hope to cover variations of these patterns in the future. Experiment and see what works for you!

Prompt context

Beyond the Basics
I hope you have enjoyed this introduction to prompt engineering. Prompt engineering is a great way to get started and learn if Codex is a good fit for your application. You can use these same techniques with the other OpenAI models like GPT-3, as well as other foundation models or large language models. As you work to put your application toward production usage, there are a few things you may want to think about.

Hyperparameters
You can tune the behavior of OpenAI models with various hyperparameters such as number of tokens, temperature, and others. The hyperparameters are the parameters that define the behavior of the model. The hyperparameter temperature influences how the model completion may change each time, even with the same input. Setting the temperature to 0 should give you the same output each time, at least within the same session. The stop sequence is useful with Codex to stop it from generating variations of similar code. You can do that by setting the stop sequence to the comment sequence for the programming language you are working with. For example # for Python and // for JavaScript. Other hyperparameters are described in the OpenAI documentation.

Fine Tuning
Fine tuning is the process of using a dataset of curated prompt-completion pairs to customize a model’s behavior for your use case. Fine tuning can increase the accuracy of the completions for your prompts. We won’t cover fine tuning in detail here as it is not available yet for Codex. Here are links to general documentation for fine tuning on OpenAI and Azure.

User Experience
User preception can make or break the experience of what you build. Here are a few areas to keep in mind as you welcome users to your application.

Performance: Prompt engineering as we have discussed here can increase your prompt size, which in turn increases the latency of the completion responses from Codex. For production applications, you may need to decrease your prompt size to improve the perceived latency of your application. One way to do this is to fine tune your model. In addition to improving accuracy of the model completions, fine tuning has the added benefit that it may improve performance by making it possible to have good results with shorter context in the prompt.
Interaction Design: How you guide users in their interaction with Codex can have a significant impact on their success with using the model. This is especially true because the output of the model is not always reliable. For example, Copilot makes it easy for users to reject Codex’s suggestions because a user has to actively accept Codex’s output. Because VS Code is an IDE, it’s easy for users to edit Codex’s output if it needs fixing.
Responsible Use: Large models such as OpenAI are trained on internet data, and can reflect the biases in the training data. To use Codex or other OpenAI models in production, you need to do things like content filtering. Both OpenAI and Azure OpenAI Service offer capabilities to do this. The OpenAI content filter is described here.
Prompt Engineering as “Software 3.0”
Writing prompts is a new skill in how to build software. Andrej Karpathy, the head of AI at Tesla, shared this picture that designing prompts is “Software 3.0” in a Twitter exchange with Chris Olah.

Software 3.0

With what you learned in this article, you can take your first steps to become a Software 3.0 wizard :D!

Getting Access to Codex, Copilot, and OpenAI
Signing up for OpenAI is easy. Codex is currently in limited preview: registered Microsot Build 2022 attendees can sign up to use Codex and other OpenAI models for free. See the details here. They can also sign up to use Copilot from the same page.

Microsoft also offers OpenAI models in the Azure OpenAI Service with Azure’s enterprise capabilities of security, compliance, and global reach. Azure OpenAI Service follows Microsoft’s principles for responsible AI use and offers tools to help you offer these models responsibliy to customers. You can learn more about Azure OpenAI Service and sign up here.

Next Steps
There is no substitute for playing with the models yourself to learn how to use this exciting new technology. You can also look at these samples to learn about building Codex based applications in more detail, including prompt engineering.

Codex for Minecraft Non-Player Characters
Codex Babylon
Codex Command Line Interface
We can’t wait to see what you build with Codex to help people achieve new things or to do things more quickly! If you have any questions or comments, feel free to reach out.

Contributions
Keiji Kanazawa (GitHub, Twitter) wrote this article. Ryan Volum helped me and many others understand prompt engineering and implemented many of these techniques in the sample applications. Dom Divakaruni, Seth Juarez, Brian Krabach, Jon Malsan, Jennifer Marsman, Adam Zukor and others reviewed this blog post and provided valuable feedback.

Prompt Engineering maintained by microsoft

Published with GitHub Pages`;

export const example2 = `let's talk about cupid thanks lovely introduction gentlemen um
i will i will try to make this make sense
so yes as um as as as uh dan was saying
this this whole idea started uh with some critique of solid and it was in a
place called pubconf which is a it's a kind of fun after party
conference um from ndc so ndc.net developer conference is now much broader
than net but that's kind of its roots in oslo and it travels around the world
and i was in i think i was in london and pubcomp is a kind of it's a little mini event that happens afterwards and
they take a load of the speakers and you have these five-minute lightning talks so the idea is you have it's called an ignite style talk so they
have 20 slides in um in five minutes and they run 15 seconds per slide and it just auto
advances okay and i thought well i'm going to talk about solid
and the reason i want to talk about solid is i'm lazy and it has so solid is five um
principles of software and i figured what i would do is i would spend one 15
second slide describing the principle another 15 second slide critiquing it and a third one saying what i'd do
instead and that's 15 slides and then you top and tail and that's 20 slides so basically the the talk wrote itself
so i figured i figured that would be fun and then as i was writing the talk i realized that my advice for each of
these five principles was the same which is don't overthink things and just try and write simple
code and keep things simple and and during the talk i describe what i what i mean by simple
but anyway so um and it went across well it was received well and then i made the crazy mistake of
posting my slides online and lots of people got very cross because they had no context for the talk and they just
saw me on the internet saying something about solid which they cherish as a religious totem and so
they came for me with pitchforks just very briefly then solid is
five um principles of software that robert martin put together in the 90s
he actually has loads of these you've got well over 100 of these and the first five um it turns out you can arrange them to
to spell the acronym solid so you have s single responsibility principle which is that code should have one
reason to change o is open and closed principle which is about when when and how you should
change source code l is list substitutability
principle which is about type systems but oo people think it's about objects and class hierarchies
i is interface segregation which is when you have a massive bloated interface you
should turn it into smaller interfaces and d is dependency inversion which is
how you should um construct things and so for each of these i
i kind of proposed a a a critique and some of them were more uh
pointed than others if you like more opinionated than others and in each case i was saying let's just
do something different so this was 2017 i think so then last year uh 2021
beginning of 2021 there was there's a meet-up called the extreme tuesday club
and it's the i i think i'm right it's the oldest xp meet-up in the world
um and it started in 2001 or something and they've been meeting every week in a
pub in london during the pandemic of course they were meeting virtually and they still meet virtually
or occasionally they have hybrid meetups and the xtc the extreme tuesday club
uh they contacted me and said look we're doing a session on on solid it would be great if you came along
so i said yeah sure i know there's some folks there that i know and it's a lovely group so i so i said okay i'll come along and
and do that and just before the event one of the organizers phil nash he said um
okay so you clearly you're not a fan of solid what would you replace it with and then there's kind of like the
broader question of are there universal principles of software are there universal things that you would
replace um that you could describe uh or or is it just all a bit nebulous
and that doesn't work and so i did i came up with an acronym and it was it's actually a backroom
so um so a backroom is where you start with the word and then you you make up
the things to fit and it was it was february it was near valentine's day
and so i i decided i was going to use the word cupid because it has five letters and because it's like the
opposite of you know solid macho cupid is like romance and and hearts and
flowers and and i figured that the the software craftsman bros would really
not like a thing where cupid is the center of it so so now i had to come up with five things
that were that made the acronym cupid so i did this and then and it went
across really well i got some really good feedback and really encouraging feedback and then what happened is because most of my work
i've discovered is based on other people's deadlines right so i i wouldn't have come up with cupid but
someone challenged me to i wouldn't have then started talking about it except that i agreed to speak at a conference a
few weeks later and thought i should talk about this so cupid had a very
uh humble uh yeah and i didn't sit there you know mulling on this thing for months and
months and fairly simple beginnings but then what happened is it kind of picked up some momentum and
people started talking about it and i was going to multiple conferences at all virtual conferences during last year
and speaking about cupid and and it got picked up and it was really it it's it's got some crazy momentum so
about a year later so this is now early 2022 um it appears on on on hacker news
so it's down here on the front page of hacker news is my article about um about cupid and
really frustratingly it happens on the 15th of february so it's one day after valentine's day that it appeared on the
front page of hacker news because that would have just been perfect um but so suddenly people are taking
notice and then i discovered that cupid is now on the thoughtworks radar
so the thoughts radar you've probably come across it's published every i think quarter
and they talk about things that you should adopt which is they say this is a good idea
you should do this assess which is this is a good idea but it's new so you should at least take a look at it
hold i think which is their their language for stop doing this because it doesn't work
and cupid appeared as assess so we think it's a good idea and you should take a look which is really exciting
and then i um i i looked at my website analytics and it turned out that
um so my website kind of flat lines like this then it just goes bang because i'm not very good at
publishing content i do it very infrequently but it seems to be popular when i do so so i suddenly had in like a handful
of days i had like 50 000 um hits on the website and uh
you know as you can see uh this is what happens when you appear on the y combinator on
hacker news is that 10 000 people hit your website um twitter was kind of there's a lot of
twitter activity and then thoughtworks these are all the click-throughs from the thoughtworks radar
and so it was quite fun um so i discovered a that my static website
i'm using hugo now i've moved away from wordpress and my static website hosted on github pages can handle spikes yes
and also that my um my analytics software um fathom
is is very good at handling spiky traffic and telling me about it so um so there we go so this is like a
year i guess a year and a bit now after i started talking about it and and it seems to be picking up
momentum this is really exciting because i love talking about good software so
what do i mean by good software let's set the scene let's set the scene by asking who we are
writing code for now this is one of my absolute favorite quotes and i came across this probably
late 90s um in martin fowler's book uh refactoring
uh which he published in 96 uh he has he in the opening preface maybe or certainly in the
opening chapters he says this he says any fool can write code that a computer can understand
good programmers write code that humans could understand and i had this
epiphany it was wonderful i had this moment where i thought wow you know i'm not hacking words into a
computer to make it do stuff i'm writing code for other people
to work with and other people might be future me right so this is about self-care as well
and so in the context of this i'm looking at this i thought understand is an interesting word but it's a pretty
low bar you know someone can understand this code if they stare at it for long enough can we do
better than understand and then a few years ago uh i was at a
kevin henney talk and kevin henney does brilliant talks where he really researches things you know and he
so he has lots of references and he started talking about habitability of code and he said habitability um
and he uses dick gabriel quote so richard gabriel and one of the great software thinkers
he wrote a series of of essays and he published them in a book called
patterns of software in 1996 96 apparently was a good year for software writing
so patterns of software series of essays please please go and read this they're all in the public domain they're all
hosted on his website and this one is called habitability and
piecemeal growth and it's just a beautiful piece of writing so do yourself a favor go and read habitability of impeachment growth
and just take a moment to appreciate that there are people out there who really care about how human beings
interact with software and he says this habit of habitability is the characteristic of source code
that enables and then he says a whole bunch of different roles enables people to understand its construction
and intentions and to change it comfortably and confidently i thought oh comfortably and confidently
when's the last time i felt comfortable and confident in someone else's code he says habitability makes a place
livable like home and i thought that's great so habitable sounds better
and i thought what habitable again is kind of it's it's you can get by day to day what about joyful
right is there have you experienced joyful code so i just want you to take a moment now
and ask yourself have you worked on a code base that is joyful to
work with that just you you crack open the code and you smile you look at it and you say
i'm going to be okay here this is going to be today is going to be a good day right you're going especially
into an unfamiliar code base you've got trepidation you're nervous you're oh no this is going to be such a nightmare and
pop it open and oh wow this all makes sense this all just fits in my head this i get this
so what makes it joyful can we describe what makes it joyful
and then in particular what kinds of properties does joyful code have i'm being very
deliberate with my language here so solid is based on principles it's a
set of five principles out of a as i said a collection of well over a hundred
software development principles design principles um
i i found that as i was thinking about principles they didn't really work for me so i found that i ended up looking at
properties and the reason for that is this is that principles are kind of rules
right so they define the condition the conditions or the boundaries for something
so they say what's inside and outside so your code conforms to to the conditions or it is wrong and you see this a lot or
i see this a lot with particularly young male programmers
fresh out of college coming into their first or second job and they look at a code base and they go
oh this is all wrong and say what what's wrong with that oh this violates the single responsibility principle this
violates the principle of least surprise this violates the digital and and so all you know they're going
around policing the code and you're just thinking honestly there's must be better things to do with your time
so yeah your code conforms or it's wrong right and those are your options
so properties are more like qualities or characteristics so they define a center
so the idea is that your any code is like nearer to or further from that center
but it's never like wrong right so you could say well based on these three if we think about what this characteristic
of this code this code expresses this characteristic a lot or not very much and it gives us a sense of direction as
well it says if i want to change this code to exhibit more of this property to be closer to the center what do i need
to do so i'm going to get a bit meta from the moment
i want to talk about the properties that properties should have or at least when i was formulating cupid
what did i want how did i want to describe each of these properties and i came up with three things that i
figured if i were hearing these things for the first time how i would want someone to describe them to me
so the first thing is i want them to be practical right i don't want abstract things i don't want deep philosophy i don't want
semiotics i don't want any crazy i want things that are easy to articulate so they're easy for someone to describe to
me and they're easy for me to describe to you easy to assess so i can look at some
code and say does it exhibit to what extent does it exhibit this property
how close is it to the center and also easy to adopt i didn't want like a
hard and fast set of rules that are all or nothing i want to be able to look at some code
look at these properties and say right let's start shifting this piece of code in this direction and that is
a piecemeal easy local set of changes
so i don't need to convince everyone to come on this big adventurous journey with me i can just make small changes to
make the code more habitable more joyful the second thing is i want them
human what i mean by that is and if and so that again solid is a
great example of this solid it is principles written from the perspective of code it's what code should be and what code
should have whereas these properties are from the perspective of the human beings working
with the code so when you look at code the extent to which it makes you joyful
is a subjective experience right so so the properties that i want to describe are human they're about you and
about your interaction with code and the third thing is i i like the idea
that they're layered so they're nuanced so when you're first describing some of these properties to
people they're going to go okay that that seems familiar that seems to make sense but
then as you get more experience as you get deeper into software as you look at more and more code bases you work on
more code you gain more experience you can revisit these properties and see more and more texture to them more and
more nuance to them so that said here's cupid so i'm going to
give you my five properties my five characteristics of joyful code and then i'm going to spend
a bit of time unpacking each one okay so composable i like code that's
composable that plays well with other code i like code that follows the unix philosophy of doing one thing well
so it's comprehensive and it's single it's single purpose it's focused
i like code that does what i think it's going to do i like code that's predictable and i'm describing predictable as a
generalization of testable so predictable is code that does what you think it does
idiomatic idiomatic code looks like code everyone else writes idiomatic code is
list code so i'm not going to write code and have people go ah that must have been written by daniel because that's daniel's code
style i want to write code where people look at it and say that was written by someone who is an
experienced kotlin programmer or an experienced c-sharp programmer or an experienced uh rust programmer
that they've they understand the idioms of this language and they are writing idiomatic code they're not trying to
write and you'll see this in dot net all the time when people move when people first start using f sharp for instance from c
sharp they will write c sharp in f sharp they'll write they'll try to write you
know fun um method type things and object type things and class type things in f sharp
while they're getting the hang of thinking functionally they'll want variables because they don't they're not
used yet to the idea of immutable values and transformations
they will want to iterate over things where you might have a map reduce or a
recursive function or a closure because those concepts are new so you tend to find i did this when i
was learning python my background was in java and i was i had java class or java style classes and objects all over the
place and it turns out the idiomatic python is much much more lightweight than that and
what i found over time is i was just deleting most of the code i'd written and just leaving what i needed and i ended up with much much less code and it
looked like python code now instead of looking like someone trying to write java in python and finally domain based
so this is code that uses both the language of the domain and is structured for the problem i'm solving
so let's take a look at each of these in turn then uh composable
so code that's composable it code that's easy to use gets used and
used and used okay so i want code that's easy to pick up easy
to use what makes code composable having a small surface area makes code composable
so if i look at n unit or j unit or any of those kind of
unit testing things in order to write a test um i need a test case and a fixture and
a test class and the class has methods on it and
the methods have to have an attribute on them to say that it's a test method and so on right so there's a bunch of
stuff i need to do to use to use this and that there's a there's a learning curve ahead
associated with that in python there's a lovely little test framework called pi test
and literally the way you write a test is you write a function whose name starts test underscore
and it will run as a test you don't even have a certain you don't have a cert equals
right um because the word assert the keyword assert is baked into the language and so what pi test does
is you just use the keyword assert with like just double equals or doesn't equal or whatever your comparison is and if
that assert fails it prints you out this very very readable error message it says this is a
line of code these were the two values this is why it didn't work and also this is where these values were assigned so
you can go straight into the code to where the problem probably is and once you've used something as
lightweight and powerful as pie test you look back at the things you've been using all the time and say
wow you know i've gotten so used to all this other stuff that i had to drag in
small surface area less for me to learn less for me to get wrong
um and also less to conflict one of my very first um uh
open source projects back in 2003 i reckon it was
was um some code that uh it tests a really horrible enterprise java thing
called enterprise java bean if you've never heard of enterprise java beans you are living your best life okay
so this code tested enterprise java means particularly for a thing called ibm websphere which again if you've
never come across it thank me um but the um
so the the idea that there was um less to conflict so i had some logging in there
okay and the problem with the logging is i was using a logging library and that means that if you wanted to use my thing
you had to use the same logging library at the same version and so now that was a barrier to entry and so
a my colleague pointed out that i had this dependency and i was like so what is just logging but then i remove that dependency and
suddenly people started using this um as open source code because they could now
and the reason they hadn't been was because they got stuck so composable code is has an intention
revealing name i can find it right there's no point you writing a brilliant brilliant lovely little
small surface area library for me to use in c sharp and putting it out there on nougat
or and and um and i can't find it because you gave it a really clever fancy name instead of
just describing what it does and there's a lot of fancy names out there so give me an intention revealing name
make it easy for me to find and make it easy for me to evaluate let me make let
it be very easy for me to determine if this isn't what i want if it's if i can find out within two minutes that this is
not what i want you just saved me a load of time and i will thank you and again what minimal dependencies so
we don't want it to drag in everything there's a lovely lovely web framework um called htmx and htmx is saying we've
massively over engineered things and over complicated things with javascript and all these heavy heavy javascript frameworks and
your reacts and reduxes and views and embers and
uh angulars and all of these things right these big heavy frameworks just use html just use html it made a
tiny extension to html so that you can have basically you can add behavior to let to
any uh html tag rather than just two forms and buttons anchors
um really minimal the entire library is like 12k or something it's really tiny and it has
zero dependencies so guess what it's really easy for you to pick up and use there's this wonderful quote from the
late joe armstrong who designed the erlang language and he's talking about oh here object-oriented languages here
he said you wanted a banana but you've got a whole gorilla you know i want to use some tiny little bit of behavior in
one of the methods on your class and so in order to get that i need to pull in your object its class definition
all the superclass definitions all the interface definitions there's this ton of stuff that i get just so i can get
this one bit of behavior he said and that makes it really hard well that makes the decision to use your
stuff much harder so there's composable we want small surface area intention revealing code
and we want minimal dependencies so unix philosophy then unix has been
around about as long as me right we're both in our early 50s unix started in
at a university at uh no sorry i started in a telco
in this in the late 60s and then it was adopted by university and then it went back out to the telco
and it's been around a bit and then the the eunuchs you will most likely have come across started as a hobby
project by a finnish programmer who wanted to build a his own running
kernel on uh on windows on ms-dos sorry at the time
and that became linux and so unix has been around a long time and part of its longevity
is it has this very very simple design philosophy so in unix everything is a file
and files contain text or not text that's it right so when i say everything is a file
a file is a file a directory is a file a tape system if you're putting stuff onto
onto tapes back in the day as a file hard drive's a file network device is a file the memory is a file
anything so what that means is i can use file type semantics basically hierarchies of stuff and at the leaf
nodes they contain things to describe anything on a running unix
system and they had this philosophy they say make each program do one thing
well and there's two parts to that there's one thing and there's well so doing one thing means it's got a
single purpose and doing it well means it's comprehensive i don't need to look anywhere else
and that along with composability is is pretty powerful so
let's take a look at the ls command the ls command um lists file details that's what it does
it's like i think it's a get object um in in powershell
ls list files content but here's the fun thing ls doesn't know anything about
files okay all it knows about is the output of a command called stat and stat is the
thing that knows about files so stats goes and looks at files or directories or whatever ls tells it to look at
and it comes back with a bunch of structured records that tell you what those files contain
and ls's command is to format those structured records into something on the screen
so you see how these are very separate things stat just returns these structured records but they're really hard tons and tons of stuff in there and
they're hard for humans to interpret ls takes that and says i'm going to give you something that you can read as a human being
so at ls if you look at the manual page for ns ls has a lot of parameters right a lot
of switches because there's lots of ways you might want to look up details about files
and so what that means is you don't need to go anywhere else to learn about um file content to learn about your
file listings you just use the ls command and yeah so together with composability
then there's really nothing you can't do so the idea that files are text and then
everything is text is you can take this then to composability to say the output of any command should be text which i
can use as the input to any other command so unix gave us the pipe operator
which is how we sequence things together so for instance i cat gives me the contents of a file and i can pipe that
into grep which is a filter so that filters things i can pipe that into said which transforms patterns it finds a
pattern and replaces it with something else i can then sort the results so now i get alphabetical output
and then of that alphabetical output i can use unique which removes any duplicate rows
and so on and so on and again powershell sort of adopted this idea
but it i i think it got it annoyingly badly wrong in that it tried to use well
i did it introduced an object-oriented language into the command line instead of a
pipe oriented language so something so basically you can think of all of these as functions these are all transformational functions
and so if you had a functional type of thing in powershell i think it would be a lot less difficult on the brain so we
have you know objects with methods and all this kind of stuff and there's this huge huge
complexity to powershell that you simply don't have to a regular unix shell that has commands and the commands by
and large use text and they manipulate text and pass text onto the next thing
so but surely doing one thing well is the same as single responsibility principle i hear you say
not really so srp is about how the code changes the canonical description of srp is
code should have one reason to change and in my original talk i was saying that that's completely insane because
any code could have many reasons to change it could have functional reasons it could have legal reasons it can have security reasons it can have operational
reasons it can have many many reasons why it might need to change you know for any single line of code so
that's a bit of a non statement to me anyway but when you unpack it what they're really
saying which kind of makes sense at the time again solid is not a bad idea it's
a bad idea now in the 90s it was it was what we thought about object-oriented programming so it
was good advice for 30 years ago okay and 30 years ago you would often have
different people often completely different teams working on the same code and so
what single responsibility said was please please don't have people from different teams hitting the same source
files that's crazy right so break it out so that there's only one type of person who's going to
go in there and change this code so if i have a form on a screen then the ui
part of that form uh the the the client part of that form is probably one team
the data access part of that form is another team over here with the dbas and data access and whatever else and then
there's a bunch of business logic probably involved in this form that a some business team would
would work on so srp makes sense in that context as soon as you have the same team all responsible for all of that and
often the same person it's completely insane to say code should have one reason to change code
should have be changed by one person or the same people who are going to understand all of that great but you can
do all of that in one source file which will come to you later so srp is about how the code changes
about people of people changing the code not what the code does so it's an inside out perspective not an outside in
perspective unix philosophy says don't care don't care how it got there it does one job and it does that one job
comprehensively and i thought i don't look anywhere else okay so
p predictability let's look at predictability of code one of my
favorite uh descriptions of predictability is kembek in amongst his his four rules of of good
programming um is that it passes all tests right it works yeah
so behaves as expected with no surprises it passes all tests i'm kind of broadening that definition i'm
generalizing that definition to say even when there are no tests okay so it behaves as expected
what i mean by that let me give an example of this um and this is one of the first code bases
i ever worked on this is back in probably 91 i think and it was uh image processing software
so digital image processing which is you take in a huge at that time huge digital
images and the images are made up of uh pixels that have four color
components so basically four four digits four numbers and the numbers stand for printing ink
color so you have cyan magenta yellow and black cmyk and simon yellow and black are the
colors that you use when you are printing uh printed color printed uh newspapers
magazines using massive print rollers so i was working on software that made it
easy to test the image that you were going to print before you printed it because once
you're printing it is very expensive to find out you've got all the colors wrong so what we had was basically a 4d color
cube so it was a mapping of these sets of four colors you put this into this cube and it would come back out with the
four colors transformed and you did that for every single pixel in the exam in the image and then you
now have the color corrected image somewhere deep in this morass of very complex image manipulation code
or image color manipulation code was a bug and that bug was assigned to me
dan fresh out of college go and fit to the heart of this really big complicated system written in
probably hundreds of thousands of lines of sea maybe millions of lines of sea it was a big program and it's all written
in c and find the bug and i was i'm not kidding i was
terrified right so i crack open the code base i'm like where are we and i had that joyful moment
i looked at the code and i was thinking this makes sense i get this i can navigate this
and there was a brilliant tool open source tool around at that time called c tags and c tags was a way of basically
being able to click through yeah it's kind of like um when you do control click now on on source code and you can go to references
and go to definitions and find usages and all of that this was in vi in the early 90s and it was pretty
groundbreaking stuff so i could navigate the code through my editor
and very quickly i got to where i thought the bug probably was no tests right just
in very very simple well laid out well
structured code that i could navigate so i find out where i think this bug is and it really was one of these logic errors like a
less than instead of a greater than or a missing equals or something like that and so i then fixed the bug
and i was pretty confident that i fixed the bug i was pretty confident that i hadn't broken anything else i then rebuilt the code
and took again no tests right no automated test we didn't do that then and i took a big image and i
put it through the the now fixed code and it came out looking exactly like the original image
but the bug wasn't there anymore and i was like yes and i can't take credit for that right
that wasn't me that was a guy i'll tell you his name his name's phil davis and i learned a lot about programming from
phil davis in the early 90s i don't know where he is now i'm sure he's somewhere on linkedin
but he he had this mindset of i'm going to write code that other people are going to want to work in
and so it doesn't need tests to behave as expected
okay and conversely some of the worst code i've seen was completely test driven you know tdd is a fantastic way of doing
design in the small it leads to very good clean local implementation it
doesn't have an opinion about designing the large you can't tdd your way to good architecture you can't tdd your way to a
good cohesive overall system you have to have that in your head your team has to have decided what the big picture
architecture is going to be and then you tdd the parts so i've been worked in i've worked in
teams where very experienced tdd people didn't do that and so the code was
completely hard to navigate but had tests all over so even when there are no tests
deterministic predictable code does the same thing every time okay
um even if it's something like a random number generator or something that has non-deterministic behaviors it's
programmatically non-deterministic it's predictively non-deterministic so and it has well understood operating
characteristics i can look at this uh look at this code and i can see that
it um it uses this much memory it uses as much cpu it tends to run for this long
requests take about this much this much time to come back and so i can now make
predictions based on that and i can make assumptions based on that and i can start once i have predictable pieces
like predictable pieces compose better and you start to see that these properties now all interplay with each
other so composable and unix-like doing one thing well unpredictable suddenly gives me
pieces that i can put together into much more complex systems
whose characteristics whose behavior i have much more of a handle on
and it's observable and observable in the um in the mipsy tipsy charity majors observability sense in the technical
sense of control theory which is that i can in i can infer
internal state entirely from outputs so i can look at what something's doing and it tells me how it's going inside
and for most software that's not true and for most software if you don't if you
don't design this in from the get go adding it later is generally painful
so i bake in instrumentation i bake in telemetry as part of my design as part of my um
core you know core coding uh habits if you like
and once i have something that behaves as expected is deterministic in its runtime characteristics
and is observable so like it tells me when something surprising is going on or when something surprising is going on
i can very easily determine why what the likely cause is then that code
is much more predictable idiomatic then so idiomatic code there's a couple of
parts to this the first part is that it uses the language idioms so that means that i use standard language
features and constructs i use standard libraries i use standard where there are multiple tools and frameworks i go into the i go
and find out what the ones other people use so that code
feels natural and goes with the grain right so you have i i've often done this as i said when i was learning python in
from java i was trying to use java style tooling and javastar whatever and and it turns
out python's a much much lighter simpler language than python java
or c-sharp because it's dynamically typed that you you can fall into a lot of traps
that a compiler will help you with in in statically type languages
but by and large you write less code so if so so understanding the the idioms of the
language you're working in i remember i spent some time learning clojure and clojure is a modern lisp
designed to run on the jvm so it has good interoperability with java but it's basically a lisp it's
parentheses and some other stuff and i'd never really learned lisp so i found that i was writing very um
imperative kind of procedural style code in clojure or reinventing a bunch of things that
are in the core library and my programming experience with clojure was write a bunch of code discover something
in the standard library that makes it go away and then something else and then something else and end up with like the three lines of code i should have
written in the first place so an awful lot of my my short-lived uh clojure programming career was deleting
things i'd written but again this is how you learn the idioms is you you make all the mistakes
and you try things out as well as like the core idioms that you'll find in the in the large in the
language um your organization your team your code base your product will have its own
house style right there'll be coding or design standards they may well not be written right they
may not exist in any formal way so they may just be de facto what's already there
and one of my favorite quotes about consistency comes from sam newman he said on a project we're on he said
we were busy making everything use i think it might have been maven which is a java build tool
um and is you know it's it's widely considered a form of self-harm and we were migrating a bunch of java
code to use maven and i was like why are we doing this to ourselves and he said to me
i would rather everything is consistently wrong than inconsistently anything
and that really landed for me so you know it doesn't matter that we're using a tool that we don't like although
we're not happy with if everything is now pointing in the same direction we can now make all of
that code be what we want if it's all over the place then trying to bring any of it
under control is really hard so whatever the house style is however you
might much you might disagree with it when you're writing new code or when you're changing existing code make it
look like that code don't make it look like code that you think it should look like right that's that's not fair on other people because now you cause them
cognitive load you cause them to shift how they read code because of your code style versus everyone else's
and this is what i was talking about with the um the humility the ego list part of programming with idiomatic style
that doesn't mean nothing ever changes it means that when you do decide to change you do that as a team you say let's adopt this these idioms let's
change the way we're doing this thing and then you have a deliberate way to do that
so you might say okay all new code we'll use our new idiomatic style and we'll leave all the old code for now
every time you go into change something also bring it up to stay up to date
so the idea is then over time only the code that we've touched recently looks like the new stuff and over time there's
the old stuff we haven't touched then we might make a decision to go and just
refresh all of the old code as a separate piece of work sometime but these are choices these are team
choices and team decisions um so
uh and this is the important thing you can only write idiomatic code if you bother
to learn the idioms right you can try and enforce a c-sharp imperative style on f-sharp code it will
let you but you want your future you won't thank you yeah and no other f-sharp programmers
will thank you um likewise you know as you move to say.net core
there is a you'll see that there's a different there are different idioms.net core team has adopted different programming idioms
and and uh and idiosyncrasies than
traditional.net code and again it's about understanding why they made those decisions and then adopting those for
yourselves you can only write idiomatic code if you can if um if you if you bother to learn
the idioms so then finally domain based so look at domain based code so what does this mean
it means obviously it means coding the language of the domain so this is domain driven design 101 you
know if you're writing about patients and healthcare and hospital visits then your code should have patients in the
healthcare and hospital visits as first-class constructs right if you're writing about trading systems and
futures and options then your code should have trading systems and futures and options in it
i've i contributed to a lovely anthology called 97 things every programmer should know and that was my one contribution
was code in the language of the domain and also to point out there's multiple domains
so again um eric evans who came up with the idea of domain driven design he mostly works or has worked in um
shipping and logistics systems and so in that context for instance a
ship from the finance department is a depreciable asset it has an insurance value it has a scrap value and so on
right the same ship from a logistics perspective has a manifest a cargo an itinerary
and so on from a uh crew perspective from a from a
navigation perspective it has a crew it has a heading it has weather conditions and each of these things are very
different ways of modeling the same concept which is a ship and they're necessarily different and they're necessarily not terribly useful
to the other sub domains so understanding there's multiple domains going on and being aware that
when your code is in each of those domains but also and this i find a lot more in
the wild is a lack of domain structure
so and ruby on rails i think was the the biggest um
contributor to this not because it's necessarily a bad framework just because it was so insanely popular
and what rails did it was one of the first frameworks to do this was to give you a complete skeleton
project so you say rail's new your project and it would give you all of the directories and a bunch of stub
files and whatever else at last count i looked at it sometime last year
and it would generate you in excess of 50 directories with like many many many many files like
this insane amount of craft just to start working on a project but apparently that's okay
anyway at the top level it has things like models views controllers helpers a bunch
of other things i don't even know and so that means that if i look in any rails code base i see models use
controllers i don't know what it does i know what it's made of it's made of rails because it has models used controllers
instead when i look in the code base what i want to see at the top level is the solution space i
want to see the code for the solution so i can see there's a payments
subsystem and there's a loan subsystem and there's a customer onboarding subsystem rather than you know the pieces that
make it up sure i've still got models using controllers but again this goes back to single responsibility principle
my responsibility isn't the view part of this thing like we used to do in the old silos world of the 1990s my
responsibility is add a new payment type and add a new payment type i'm going to
touch models i'm going to touch views i'm going to touch controllers i'm a grown up i'm a big boy i can do these things i've got my tests i'm feeling
confident and so i'll have all of that in the payment section and so i'll still have these these
framework artifacts but i have structure them where i want to
do the work rather than having to then do the work spread across multiple different places
and this brings me to the idea of domain boundaries so we want to use domain boundaries these subsystems i was talking about
like the the shipping versus logistics versus finance versus
i can use these as module boundaries i can use these as deployment boundaries so i can just deploy the new payment
subsystem i can just deploy an update to loans i can deploy an update to the customer onboarding rather than having
to push out a whole bunch of all my models go out together
or worse have one of these like super fragmented build systems that picks a little bit out of this folder a little bit out of here a little bit so it's not
obvious which things then get deployed together so especially when i shift to a
small components architecture like a microservices type architecture or a serverless kind of functional
architecture what i want is to see the units of things that i'm deploying
so there we have it so this is cupid so it's composable it's unix philosophy it's predictable it's idiomatic and it's
domain based so let's take a look
very briefly um at some applications of cupid just spent a couple of minutes
if i'm looking at a code base someone said to me on twitter they said i'm using cupid as a way of assessing some code we're
looking at we've got this legacy system you know we know we're going to do a load of work on it we're finding it a really useful lens
we're looking at which parts of it are you know the degree to which as a checklist how composable how idiomatic
how units like various parts of it are and then we're using that to come up
with a plan of which parts of this do we think will benefit from which characteristics you know moving towards
which of those properties so for instance we've got a particularly cryptic part of the code base that if we
make more domain based it'll help us make more sense of it and it'll also help us understand where we can separate
it out into subsystems so the idea for it so that it's an assessment tool is fun
code critique so i talk about code critique as it's like a code review but it's for the team to learn not to
critique not to review a piece of code so the goal is not looking at dan's code
and saying hey dan you know you got that wrong and this is out of pike and you should have done this
is to maybe look at two or three places in the code base where we're doing similar things and saying okay let's to get consistent
which of those things are we going to go with and then we'll change the other ones to fall into line or which combination of
things are we going to go with so using cupid as a basis for that kind of critique discussion and consistency
discussion can be powerful deciding where to start
with scary legacy code okay so i'm looking at a big um
a big ugly code base and i want to fix everything and i can't fix everything right so so i need to do something about
that and so so i'm stuck where do i start again i can use cupid
as an overlay on this and i can say right um if we were to make this more unix-like if we were to try and identify
boundaries here if we were to uh make this more predictable let's run this let's find
out where where it's not working mike feathers calls them characterization tests where you write tests for an existing legacy system
which capture your assumptions your understanding of what the code does
and i haven't done this but a number of people have have asked me to do this so like this may well be on the horizon
which is you could use it as a syllabus for a programming course we're going to take a bunch of code and we're going to gradually you know
iteratively apply these properties to it or introduce these properties into this code and just do it before and after and
see what we think or i could imagine uh cube could use on something like a code retreat where we try to build code
in multiple different ways let's take some code and try and build it in a composable way in a unix-like way in a drastic way
um and so recently i put out a website
called cupid.dev which is there now it's a static website built with hugo and what i did i broke out the original
article so i wrote the article of cupid after a year of giving talks about it and now i've broken that out so you can
go to cupid.dev that's if you're going to talk about this or tweet it or share it with your colleagues
this site i'm going to look after this site so you can permalink to anywhere in here every paragraph in here is a link
is permalinked so every heading in here is permalinked so you can go straight to the specific
content you want to share it with your colleagues use it as an assessment tool and see where you get on um
i've also started a um a group cio group called cupid joyful code so come along
and join that it'd be lovely to see you there or get in touch i'm on twitter as tastopod
i'd love to hear your stories with cupid so with that um i say thank you very much
thank you then i i found your your talk very very profound i mean uh
easily digestible but bad profound at the same time so yeah i loved it
um and by the way once we finished the conference like in
three hours we're having a call with a client to discuss about the code base and uh and i look at dan and and and i
think we're we're having the same thing in mind so we're going to use the cupid lens you know in the conversation that's
one practical thing that i i got from you from your talk thanks a lot
um fantastic please do let me know how you get on as well you know i'm so i'm very keen
or i don't want to just be me on transmit you know i want to hear people's case studies and
adventures and where it didn't work and what they would change or what they're struggling with
um is is absolutely what i'm what i'm keen to hear so yeah let me know how you get on with your client definitely we'll
do that absolutely we'll do we'll do and yes it was a really fun session for me also
because uh it takes me back to various points
in my work so even if when you set the domain based language and of course domains also change in time or
throughout the project but if you were i don't know 20 years ago where i don't know it didn't really work if you would
rename your files in source control in some systems or then
then you saw some people reluctant to change the names so it was legacy names that were used 10 years ago
yes yes yeah and yeah or or or a name that you've got in the code base
but um but then no one in the business uses it so it only exists it's just some quirky
name that someone came up with when they were first writing this thing and like no one apart from that one guy
has any idea what this thing does the other thing that i got from your
session is the way i'm gonna look uh from now on at the single responsibility principle definitely
um and then they have a question regarding the compassibility does that imply also
reusability i mean do they have anything in common in your way of thinking of it
um that's a great question so
where are we um
reusability so yes i mean yes but and this is a lovely quote from rod
johnson who who wrote the spring framework he says reuse is overrated code for use
i agree you know you can and my my riff on it is you can make something so simple
that it's really easy to reuse or so complicated that it can do
anything and one of these is much harder [Laughter]
resisting the temptation to make your thing do more is incredibly hard um one example from
the again from unfortunately most of my examples from the java world in the early 2000s a colleague of mine
came up with a a java xml serialization library
called x stream so xtreme and xtreme literally all it does it
takes java objects and pojos or structures of pojos and it just
traverses them and turns it into xml now there were already tools around that
did this but they were just really complicated and really over engineered and you ended
up this huge massive like you know xml and xslt and schemas and all this stuff
and he said literally all i want is some angle brackets and my data he was really doing was inventing jason
but 20 years before jason and so yeah so he wrote this library called xstream
and he tried to host it on a on one of these early hosting sites a long long before github it's called fresh meat
and they said he was rejected on the grounds that it was too simple
we're not going to host your project because it's too simple 20 years later
it's still being used xstream is being used on the international space station
right it's it's one of the very few open source java libraries that is trusted to run
code in space because it just does this thing incredibly well it's really really hard
to come up with a a java object structure that you can't
put into xstream and get some very sensible looking xml out of and the thing that he resisted again and
again and again over the years was adding more stuff it just does this and it does it
incredibly well and keep yes code will get reused but and again this is i think where we
got it wrong or not where we got it wrong where solid made an assumption in the 90s or rather solid was working off an
assumption in the 90s which is that we would reuse source code so
one one business model was going to be that we would have c plus source codes of
domain specific things so you'd have like a a healthcare code base or you have a
and you would buy you'd license one of these code bases and then extend it to do your thing and this is where the open close
principle came from was like if people are gonna if you're gonna give your source code to other people you need to be really clear which bits they're
allowed to muck around with and which bits they're not because they're gonna break stuff and so that's where open close principle came
from it turns out no one ever did that you know people said people licensed binaries now people licensed services
there's all sas but people would license a library invite you you use someone else's code library
so composability at that stage is an api level it's you would compose
a logging framework you'd compose a http library
and so all of these things and again this is why npm absolutely exploded and node.js absolutely exploded is you get
lots and lots of tiny little single purpose things and they get reused and reused and reused and no one ever goes in and looks
at the code unless they're debugging something they just use the apr they use the fact that this thing
emits json or this thing uh um converts text to emojis or whatever it does
and so you end up with this um this this explosion
of of of little single purpose libraries yeah definitely thanks a lot
um [Music] it looks like you you you you're mastering the words and then you're
playing the word with the word very i mean unexpectedly sometimes but very
well so i i love the the quote that you had in on uh your tweet uh from
probably last year it was with the i'm an architect oh my
anarchist max yes thank you
yeah an architect yeah brilliant um i think we've got time for one final
questions as we also have uh our next guest in the lobby by the way i'm going to
invite lima with us maybe you get the chance and take the opportunity to
meet each other hi dima fantastic hi dima hi everyone hi
so while in the lobby you had this very beautiful conversation i i promised one
final question so we discussed about joyful code and do you have a preferred
industry i mean an industry or the main industry where you you would like
really love to work in i i personally have one which it it relates to anything
in the healthcare space which is a broad thing but anyway
if i get the chance or the option to choose i choose that
that's a really interesting question i um so i i've i've practically never made a
career decision i'm 30 years in i think i've probably made two career
decisions in my life like joining thoughtworks was an accident it was a happy accident and i had a
you know a number of wonderful really fun-filled enjoyable years there but i never applied to thought work
someone someone sent them my cv and then told me after the fact that it
sent my cv um and you know and so and also being there i i
worked in a whole bunch of different industries like you know insurance telecoms healthcare
finance like banking investment banking retail banking um i'm sure there are many old streaming tv
uh entertainment lots and lots of different verticals and i i'm kind of industry agnostic i
think what what i like to work with is
i like to work with people like you who who are excited about a domain you know i want to work with someone who's
passionate about solving problems for healthcare because they've got a really personal reason that that's their thing
or they really want to fix finance you know but not in a pointless blockchain
web 3 hype bubble burning the planet sorry was that my out loud voice
yeah all right you can go like so yeah there's you know
there's a there's there's a lot of good that a lot of people want to do in the world and my i
i'm kind of a level of indirection if you like i i like to help people who want to do something do it better
so so i so for me like it's not necessarily the industry so much as the the context the situation i like to be
in a situation where i can really help and act as a differentiator
if you do these things you will do your healthcare thing or your finance thing
or your whatever it is thing um your entertainment thing so much better and you'll have so much
more fun doing it danielle thank you so much i mean we love you for for these words thank you
very much a really really good talk really good conversation feels really
exciting at code camp at least that's my my feeling um and of course we're looking forward
to i don't know maybe having you in yash or in cluj or in
bucharest or in or us in london uh i've not made it out there yet so so i've i've been to um
uh i've been to uh lithuania a few years ago actually probably quite a lot of years
of what i go now um and in fact i was in i was in kiev not so long ago you know
teaching a class um and so i've been out and and i've been
to italian a couple of times so i've been to kind of you know eastern europe i haven't made it to romania
uh i haven't made it to bulgaria so there they are parts of europe that i have yet to visit
well we should find the context

`;
