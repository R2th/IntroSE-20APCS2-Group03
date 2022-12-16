![](https://images.viblo.asia/7afc1265-ad66-46ee-9492-44f22cbbe2bd.gif)

Last month, we started our Feathers journey with [Intro to Feathers](https://viblo.asia/p/intro-to-feathersjs-Qbq5QpnJlD8) post. Today we will continue from there, with **Feathers Hooks**.

*While not as extremely satisfying as landing a successful Pudge Hook,  Feathers Hooks are extremely useful in it's own merit. It will make your development procedure a lot simpler, let you offload common methods out of services, thus making the code DRY by design, also making the code extremely to debug. Also, you won't get reported unlike when you miss landing your hooks as Pudge. So, It's a win win for all.*

## What are hooks
If you're coming from a Ruby on Rails background, or are familiar with Aspect Oriented Programming in Java, C#, C++ then you are already familiar with the concept of it. Hooks are pluggable middleware functions that can be registered **before**, **after**, **errors** of a Feathers Service method. We can choose to use one or chain multiple of them to fit our need. Using hooks aren't mandatory, meaning, you can just implement your desired functionality just by using Services. But, just like landing a successful hook by pudge brings your opponent carry in middle of your team, using Feathers Hooks will make your life a hell of a lot easier.


In RoR, we're familier with the *before* and *after* fileters. Let's think on how Viblo or Medium articles work when you're writing one. We don't want anyone else but us to see our post when it's still in draft stage. To achieve that, we'll use the **before_filter** call the **draft_or_private?** method and grant access to the appropriate person only.

```ruby
class Admin::ArticlesController < ApplicationController
  before_filter :deny_access, :unless => :draft_or_private?

  def show
    @article = Article.find(params[:id])
  end

  protected

    def draft_or_private?
        article = Article.find(params[:id])
        current_user.is_owner? ||  (article.draft? || article.private?)
    end
end
```

This is in a nutshell, what Feathers Hooks are. We use before / after / error calls to chain offloaded methods, thus making our App more modular.

Example: We want to set a creation timestamp on our messages when they're created.
The code for that will be like this.
```js
const createdAt = async context => {
  context.data.createdAt = new Date();

  return context;
};

app.service('messages').hooks({
  before: {
    create: [ createdAt ]
  }
});

```

Feathers Hooks are:
1. Transport independent
2. Service agnostic (most of the time)

This pattern helps us keep our App DRY, flexible, composable and much easier to debug.

## Hook Flow
This is best explained in the [FeathersPlus](https://feathersjs.gitbooks.io/feathers-docs/guides/step-by-step/basic-feathers/all-about-hooks.html) book.


( *So, it's better if you read this part from there rather than reading my post. Because Viblo doesn't allow us to show `iframe` from another website, I'll post their explanation and examples here. But, all credit goes to the FeathersPlus book.* )

#### Method Hooks
We can add one or a chain of hooks to each service methods we need. Every method can have a different hook. Just as an example, after a Message is created, we want to call the `sendNotificationHook` after that. Or, when we search for list of messages, we want to add the `verifyAuthenticatedUserHook` before we allow to search.

```js
const messagesHooks = {
  before: {
    find: hook11(),
    get: hook21(),
    create: [ hook31(), hook32() ],
    update: hook41(),
    patch: hook51(),
    remove: hook61(),
  },
  after: {
    find: [ hook15(), hook16() ],
    create: hook35(),
    update: hook45(),
    patch: hook55(),
    remove: hook65(),
  }
};
const messages = app.service('messages');
messages.hooks(messagesHooks);
```

![](https://images.viblo.asia/8e5d859b-cc5a-44e7-a6bb-0fc163102abe.jpg)


#### Service Hooks
Some hooks, such as authentication, may need to be run for every method. We can specify them once rather than repeating them for every method.

For that, we just need to define the hook call with `all:`

```js
const messagesHooks = {
  before: {
    all: hook01(),
  },
  after: {
    all: hook05(),
  }
};
```

![](https://images.viblo.asia/dfe9ce32-d060-4f82-aa45-3d7ee134227a.jpg)


#### App Hooks
There are the hooks we want to run for all the Services in our Apps.
We can use the [Feathers Profiler](https://github.com/feathers-plus/feathers-profiler) to find out which of our Hooks are getting called for every Services in App.

```js
app.hooks({
  before: {
    create: hook30a
  },
  after: {
    create: hook39a
  },
});
```

![](https://images.viblo.asia/7c9483ba-068c-4e7f-a7bb-e5618907ec10.jpg)

#### Error Hooks
Whenever we face an error inside our app (like a promise getting rejected), all the subsequent hooks or service method that hasn't run yet, will be rejected.

```js
// On server
const errors = require('feathers-errors');
throw new errors.BadRequest('Invalid request', {errors: {email: 'Invalid Email'} }); // inside hook

// On client
messages.create(...)
  .then(data => ...)
  .catch(err => {
    console.log(err.messages); // Invalid request
    console.log(err.errors.email); // Invalid Email
  });

// and our App.hook
app.hooks({
  error: {
    all: hook00e,
    create: hook30e
  }
});
```

![](https://images.viblo.asia/6eb3759e-35f4-4a4a-a9eb-adf854d149c2.jpg)

## Registering a Hook
To register hook functions to a service, we need to use the `app.service(service_name).hooks(hooks)` method.
Here is an example:

```js
// The standard all at once way (also used by the generator)
// an array of functions per service method name (and for `all` methods)
app.service('servicename').hooks({
  before: {
    all: [
      // Use normal functions
      function(context) { console.log('before all hook ran'); }
    ],
    find: [
      // Use ES6 arrow functions
      context => console.log('before find hook 1 ran'),
      context => console.log('before find hook 2 ran')
    ],
    get: [ /* other hook functions here */ ],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
});

// Register a single hook before, after and on error for all methods
app.service('servicename').hooks({
  before(context) {
    console.log('before all hook ran');
  },
  after(context) {
    console.log('after all hook ran');
  },
  error(context) {
    console.log('error all hook ran');
  }
});
```

[example taken from here](https://docs.feathersjs.com/api/hooks.html#registering-hooks)

## When to use Hooks instead of Extending Services
Hooks give us the enormous flexibility to make our app modular, to offload common functions out of our methods, and makes our developement process a lot more easier. But, there are some times, when we could just extend our existing service to get our desired result.

##### When to use:
1. The functionality can be used in more than one place (e.g. validation, permissions etc.)

2. It is not a core responsibility of the service and the service can work without it (e.g. sending an email after a user has been created)

##### When not to use:
1. The functionality is only needed in this one place.

    Suppose, we have a function that is only used in one place. In that case we could, just extend our Service to make the functionality builtin with it. But, it's still better to offload the functionality to a Hook, if it might be extended later.

2. The service could not function without it.
   There is no point moving the saving to db logic out of a service. Basically, we don't create a hook that will result in crippling the service.
   
## Learning Materials

[Feathers.js Guide#Hooks](https://docs.feathersjs.com/guides/basics/hooks.html#quick-example)

[Hooks API](https://docs.feathersjs.com/api/hooks.html#quick-example)

[Codepen example](https://codesandbox.io/s/feathers-hooks-common-test-9e0st)

[FeathersPlus - All about Hooks](https://feathersjs.gitbooks.io/feathers-docs/guides/step-by-step/basic-feathers/all-about-hooks.html)

[Design Pattern for Modern Web API](https://blog.feathersjs.com/design-patterns-for-modern-web-apis-1f046635215)

[AOP: Aspect Oriented Programming](https://en.wikipedia.org/wiki/Aspect-oriented_programming)

## What's Next

On our next post, we will focus on learning about handling different database connections with feathers, and handling Authentication.
**Happy Chop.. err. Coding**

![](https://images.viblo.asia/2ff4c90d-27ee-4595-a134-1fcced6e497a.gif)