In this post, I'll walk you through some concepts of PHP which are used as the fundamental building parts of the Laravel framework.

# \__get method

The [\__get()](https://www.php.net/manual/en/language.oop5.overloading.php#object.get) magic method is used in case you want to offer the the ability to access a non-existing property of an object. So the question is what will be returned? It depends on how we implement this \__get() method. In the [Container.php](https://github.com/laravel/framework/blob/1f163d471b973b237772bb11cdcb994aadd3d530/src/Illuminate/Container/Container.php#L1281-L1284) of the Laravel framework, we're using it to allow dynamically `make` an instance of a registered binding. The implementation of it is: 
```PHP
public function __get($key)
{
    return $this[$key];
}
```

The code can be read like so,  If I call `$container->config['providers'] `, the `$container` object doesn't have the `$config` property, so the `__get()` magic method will be called. 

Next, it is the `ArrayAccess` feature takes place, we're accessing an object as if it is an array. Which means the[ offsetGet](https://github.com/laravel/framework/blob/1f163d471b973b237772bb11cdcb994aadd3d530/src/Illuminate/Container/Container.php#L1245-L1248) method will be called. At the end of the functions call stack, what we will recieve is the instance of the registered `config` binding.

# __callStatic() method

The [\__callStatic()](https://www.php.net/manual/en/language.oop5.overloading.php#object.callstatic) method is called when we try to call a non-existing method in the static context (non-existing doesn't only mean undefined, but also mean un-visible due to visibility declaration such as private, protected).

This is one of the best examples for such thing is deserved to be called "Magic". For all Laravel developers out there, we all familiar with a kind of magic which heavily relies on this magic method. For instance: 

```php
$users = User::all()
```

We're calling the `all()` method through the `User` class which is a model, in other words, we're calling the `all()` method in a static context. And we also notice, the `User` class doesn't has the `all()` method, neither its parent class, `Model`. So, what exactly is being called here? That's the [\__callStaic()](https://github.com/laravel/framework/blob/7.x/src/Illuminate/Database/Eloquent/Model.php#L1672-L1675) method in the `Model` class.

```php
public static function __callStatic($method, $parameters)
{
    return (new static)->$method(...$parameters);
}
```

What this \__callStatic method do is instanciating a new instance of the `User` class via `new static` (not the `Model` class, you might want to look up to the `static` keyword to know more about how it works). And then, calling the `all()` method on that new instance.

So now, this is `__call()` method turns, let's see how it works.

# __call() method

The \__call() method is pretty much like the \__callStatic() method, the only difference is the calling context. This method is called in an object context. Don't be confused, _be called in an object context_ is just simply be called through an instance, **not** through a class name.

For example:

```php
$person = new Person;
$person->talk();
```

The `talk()` method is called in an object context because `$person`, in this example, is an object (or instance, the same).

Continue with the above example, when `User::all()` is handled by `__callStatic`, it starts to call `all()` on the newly created User instance. But the User instance doesn't have the `all()` method either. This is when the `__call` method takes place:
```php
public function __call($method, $parameters)
{
    if (in_array($method, ['increment', 'decrement'])) {
        return $this->$method(...$parameters);
    }
    return $this->forwardCallTo($this->newQuery(), $method, $parameters);
}
```

I will not get into details of this implementation of the `__call` method. Just to show you how we're chaining `__callStatic` and `__call` to perform the query functions that you might find very magic.

# Conclusion

Hopefully this post give you some more information about how these magic method work and how they ared used in practice. Also have some ideas on how some features of Laravel works under the hood. See you in the next post. Peace!