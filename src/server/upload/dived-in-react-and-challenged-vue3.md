# The opportunity to challenge Vue3
As wrritten in the title, I mainly used to use React

Meanwhile, I decided to renew the jQuery system that I made as part of my studies in my first year of graduation.

I was in a situation where I could use anything, so when I thought about what to remake,

*  This time I want to try something other than React. 
*  The document seems to be easy to understand
*  If you google, there will be a lot of useful things
* Supports TypeScript

From these four points, I decided to challenge Vue just when Vue3 came out,

It is said that TypeScript support is becoming more generous, so i decided to use it together because I thought, "OK, I'll try it together ... !!"

Now that the development is over, I would like to summarize the feeling of Vue compared to React below.

# Good points of `Vue`
## 1. Apply HTML / CSS / Javascript to a single file
In React, CSS files are basically placed separately, whereas with Vue, you can write CSS in one file.

Even if you check the class name you wrote yourself, it is easy to see because you can check it in one single file.

CSS metalanguages (scss, less, etc.)
```
<style lang="scss">
...
</style>
```

That was the first point

## 2. You can put multiple elements in the root

This seems to be a new point in Vue3.

You can put multiple elements in the root
```
<template>
  <header>...</header>
  <main>...</main>
  <footer>...</footer>
</template>
```

Until now, I had to wrap it in a div or something similar, The above writing method is now accepted, and there is no need to write.

With React, it is necessary to wrap in div, so there is no needless element when compared.

It seems that you can write in React as well!  (I didn't study enough, but thanks to that, I strengthened my final conclusion that I like React ... lol)

## 3. Easy to define reactive value (state in React)

Compared to React, Vue is definitely more concise when it comes to writing reactive values.
First of all, React.

Definition of state in React
```
const [loading, setLoading] = useState <boolean> (true);
```

Next is Vue.
Defining reactive values in Vue
```
const loading = ref (true);
```
It's obvious that with Vue, you don't have to define a function to update the value with it, so it's simple to write.

The same applies to the type definition.

Even if you don't bother to specify it, it will judge that it is a Boolean.

By the way, if you want to update the value with Vue

Reactive value updates in Vue
```
loading.value = false;
```

That's it. It's really easy.

# `Vue`'s not so good points
## 1. You can't use it unless you return the function or variable you want to use in the template tag
```
setup() {
    const loading = ref(true);
    // If you don't include loading in return, you can't use it in template tag
    return { loading }
  }
```

As mentioned above, the variable (or function) once defined cannot be used in the template tag unless it is returned.

Variables once defined as React can be used immediately in jsx without the need to return.

## 2. The type does not work in the template tag
For example, define a book object as follows:

Object definition
```
   setup () {
     const book = {
         title:'aaa',
         author:'bbb',
     };
     return {book};
   }
```
If you try to use it in the template tag as below,

Type does not work in template tag
```
<template>
   <div> {book.} </ div>
</ template>
```

When writing book and I want the title and author to be suggested

This does not come out.

With React, I didn't have this problem at all, so I felt that React would be better compatible with TypeScript.

# 3. Complementation is not good even if extended functions are included (I felt)
I was developing using VScode, a complement that I didn't care about when I was developing with React

It's a pretty fluffy point that I didn't feel like `Vue`. (There seems to be a complaint that you should not include things that can not be verbalized, but please forgive me because it is an individual opinion ...)

By the way, the extension included `vetur`.

# Results of comparing React and Vue
Personally, I conclude that React is better. I was particularly concerned about the compatibility between completion and typescript.

Maybe it's because the part I mentioned as a good point in Vue wasn't enough to say "I can't live without it ...!".