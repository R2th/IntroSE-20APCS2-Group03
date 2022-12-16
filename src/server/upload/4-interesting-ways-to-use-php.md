PHP is quite unique language. Even though it started as a language for websites only and it had been criticised for many years by many developers, it is still a descent language with huge community and many serious enterprise solutions built with it.
And as with any language there have been many experiments with it attempting to use the language in various ways and areas. Some of them, like using PHP to build CLI tools, were successful, while others, like Hack language by Facebook eventually got overthrown by other solutions.
This artice is inspired by a fragment of code I faced recently. It was actually a file named `meal-plan.js`

```javascript
// meal-plan.js
const MealPlan = {  
    data: function () {
        return MealPlanVueData
    },
    template: `<div> 
    <?php include("inc/page-nav-meals.php") ?>
    <section id="meal-plan">

    <div v-for="(day, day_index) in content"  class="day">  
    <div v-bind:class="'widget-'+day.day_number">
    <h1><?=$_L['Day']?> {{ day.day_number }} <span class="tag" v-if="day.today"><?=$_L['today']?></span></h1>
    ...
    `,
    // ...
}
```

So... what is this? a Javascript file containing a Vue component... with template as a string, which uses PHP include and renders PHP variables! WTF?
This is obviously an example of very bad code, but it gave me idea to examine proper examples of PHP combitations and new solutions.

## Running Javascript inside PHP

This goal can be achieved by simply using `exec` function or any other way to spawn a process. But much more interesting solution is an actual integration of V8 engine inside PHP with `v8js` extension.
The extension was published in 2015 and latest 2.x major version was released in the end of 2017.
So the idea is to run JS parts directly inside PHP like this:
```php
$v8 = new V8Js();
$result = $v8->executeString($javaScriptCode);
```

What benefits it might bring is up to you to decide, but there are many good examples of using it for SSR apps with React and Vue frameworks.

It might be critical if you want to have SPA with server-side rendering, but don't have opportunity to launch a node.js app on your server (or shared hosting).

**Use cases:**
* Running Javascript SSR application on limited hosting solutions.
* Integrating existing Javascript code into applications.


## PHP inside AWS Lambda

Another interesting solution is the opposite thing. AWS Lambda currently supports several languages, but does not include PHP for some reason.
However the whole workflow of PHP scripts would fit Lambda concept ideally (on the opposite to Javascript). Moreover, its synchronous nature would allow to control functions flow much better.

Although running such functions in most cases is slower than JS and requires more memory, there still might be cases when such features might be required.

Currently there are 2 descent solutions:
* https://github.com/mnapoli/bref
* https://github.com/araines/serverless-php

While the second is quite simple, bref, on the other hand, provides some interesting solutions, including good-looking shortcuts.
```
<?php
<?php

require __DIR__.'/vendor/autoload.php';

λ(function (array $event) {
    return [
        'hello' => $event['name'] ?? 'world',
    ];
});
```

Both are wrappers for handler functions and provide a way to deploy php code with serverless framework.

**Use cases:**

* Quick adaptation of existing PHP API to Serverless architecture.

## Event-driven PHP apps

In continue to the previous topic, by default all PHP scripts are single-run scripts. All dependencies have to be loaded on each run (of course, there is some runtime cache, but still). For many cases this is a sutiable way, but sometimes more performance is requried.
Instead of that there is a way to launch a PHP app in "node.js-style" or like in any other event-driven solution: load the process into memory and make it handle triggered events. This gives quite many benefits, considering that it significantly decreases time for dependencies loading, but also broughts new approach to PHP development, which might require changes in app logic.

So there are 2 extensions for PHP which appeared in 2015/2016 and got their popularity in last year: Swole and Workerman. I have already described these in one of my articles. As well as trending ReactPHP.

Since that time these solutions got their followers and there are quite many implementations of bridges for popular frameworks.

**Use cases:**

* Almost any PHP applications which can be written in a new way.

## PHP as strictly-typed language

Many people criticise PHP for its loose type checks and not efficient type hints.

There are many RFC under discussion including implemeting [Generics](https://wiki.php.net/rfc/generics) and [Typed Properties](https://wiki.php.net/rfc/typed-properties), but these might take a long time to implement. So some developers decided to it it themselves using native constructions provided by PHP.

One of them is [typed](https://github.com/spatie/typed) library, which provides several improvements to typing system in PHP.

You need a collection of strict type? simple!
```php
// RFC proposal: $postList = new Collection<Post>();
// Implementation with typed:
$postList[] = new Collection(T::generic(Post::class));
```
or maybe a struct with typed properties?
```php
// RFC proposal
// class Developer {
//   public string $name;
//   public int $age;
// }

// Implementation with typed:
$developer = new Struct([
    'name' => T::string(),
    'age' => T::int(),
]);
```

**Use cases:**

* Preventing incompatibilites and increasing code consistency in various applications.

## Conclusion

As of 2018 PHP is still one of the most used languages and it is still being extended by both maintainers and developers community.
Comment below if you know any other non-standard PHP examples.