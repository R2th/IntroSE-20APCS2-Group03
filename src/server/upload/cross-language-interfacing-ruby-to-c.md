Majority of the tasks these days can be accomplished using one of the many available dynamic languages. But, some non-trivial task (performance critical developments like cryptographic algorithm, game engine, driver) requires compiled languages. Fine-grained control over low-level interfaces is also another reason. Ruby is one of the most popular dynamic languages, the popularity of which, is mostly web development centric. But, it's rich feature-set makes it equally usable to other kind of developments too. Considering an application that requires a lot of processing power, can not be served well using procedural Ruby (cause there's too much processing overhead that the language itself will generate). But, if it is interfaced with C, we can expose our very dynamic Ruby application to the performance centric world of C.

### Setup

Let's create a project directory,
```bash
$ mkdir ruby_c
$ cd ruby_c
```
Now, create a configuration file for our `C` extension.
```bash
touch extconf.rb
```
and put the following lines in it.
```ruby
require 'mkmf'

create_header
create_makefile 'c_math'
```
We are using `makefile` for our extension and the ruby module `mkmf` generates it for us. `create_header` creates `extconf.h`, and like the syntax suggests, `create_makefile 'c_math'` creates makefile `Makefile`.

Now, running the `extconf.rb` will generate makefile and header. And, it is ready to compile. Compilation is performed using `make` command.
```bash
$ ruby extconf.rb
$ make
```

But, this actually does nothing, since we don't have the actual C extension yet. Let's create it.
```bash
touch c_math.c
```
And put in,
```c
#include <ruby.h>
#include "extconf.h"

void Init_c_math() {
}
```

This file is the entry point of our C extension. The odd looking method `Init_c_math` is called when the extension is `require`d.

### Example 1

```c
#include <ruby.h>
#include <time.h>
#include <stdlib.h>
#include "extconf.h"

VALUE random_number(VALUE);

void Init_c_math()
{
  VALUE CMath;

  CMath = rb_define_class("CMath", rb_cObject);
  rb_define_method(CMath, "random_number", random_number, 0);
}

VALUE random_number(VALUE self) {
  srand(time(NULL));
  return rand();
}
```

In this example we created a class `CMath` containing a method `random_number`, in our extension.

We declared a prototype for our method of the `CMath` class,
```c
VALUE random_number(VALUE);
```
Then, declared the method,
```c
VALUE random_number(VALUE self) {
  srand(time(NULL));
  return rand();
}
```
which is nothing special but a random number generator.
And, we make our extension entry-point `Init_c_math` aware of the existence of a class
```c
CMath = rb_define_class("CMath", rb_cObject);
```
and a method,
```c
rb_define_method(CMath, "random_number", random_number, 0);
```
in our extension.

The class definition is provided by `rb_define_class` which accepts the class name, and class as a parameter. And, `rb_define_method` defines method which accepts container class, method name, method and number of arguments respectively.

Pretty easy, nah? Let's see another example,

### Example 2

```c
#include <ruby.h>
#include <time.h>
#include <stdlib.h>
#include "extconf.h"

VALUE square(VALUE, VALUE);

void Init_c_math()
{
  VALUE CMath;

  CMath = rb_define_class("CMath", rb_cObject);
  rb_define_method(CMath, "square", square, 1);
}

VALUE square(VALUE self, VALUE number) {
  long translated_number;
  translated_number = FIX2LONG(number);
  return LONG2FIX(translated_number * translated_number);
}
```

This is the same class as before with a different math method `square` which accepts a number and returns the squared value (as always :)). Found something odd yet? Yeah, the `VALUE`. So, what the heck is this? Let's get to know our API a bit better. The C API doesn't provide direct access to Ruby objects due to the dangers that it may incur. It provides access via pointers. `VALUE` is that pointer, which is a API defined C type.

Now, since everything you receive is `VALUE`, how are you gonna know, which `VALUE` indicates to what type? This is done by checking the `VALUE` via dedicated macros. There are different ways. One such way is,
```c
Check_Type(obj, type);
```
where, `obj` is the Ruby object and `type` is the type, the object is being checked against. Types are prefixed with `T_` following by the type name in full caps (e.g. `T_FIXNUM`, `T_FLOAT`, `T_STRING`).

We'll frequently need to translate the objects from one type to another. This can be done using the type translators with the following syntax,
```c
TYPEA2TYPEB(obj)
```
For an example, `FIX2LONG(number)` converts `fixnum` to `long` integer. A point to note here is that, *Numbers in Ruby are long integers in C*. If conversion is failed due to overflow or incompatibility, an error is thrown.

Let's wrap it up. Our `c_math.c` now looks like this,
```c
#include <ruby.h>
#include <time.h>
#include <stdlib.h>
#include "extconf.h"

VALUE random_number(VALUE);
VALUE square(VALUE, VALUE);

void Init_c_math()
{
  VALUE CMath;

  CMath = rb_define_class("CMath", rb_cObject);
  rb_define_method(CMath, "random_number", random_number, 0);
  rb_define_method(CMath, "square", square, 1);
}

VALUE random_number(VALUE self) {
  srand(time(NULL));
  return rand();
}

VALUE square(VALUE self, VALUE number) {
  long translated_number;
  translated_number = FIX2LONG(number);
  return LONG2FIX(translated_number * translated_number);
}
```

Now, let's compile it using the same set of commands we used before.
```bash
$ ruby extconf.rb
$ make
```

This compiles our module and yields it as `c_math.so`.

So far, we prepared and studied the extension, but never utilized it. Let's do that.

We'll create `testscript.rb` that looks like this,
```ruby
#!/usr/bin/env ruby
require './c_math'

puts CMath.new.random_number
puts CMath.new.square(7)
```

See! How better could it be (actually it could be better, cause still there are issues like allowing to create invalid names, but we'll leave it for now). So, that's the basic. String is a bit tricky though. If you want to be comfortable with the API, you should be comfortable with C pointers, referencing, data structures and C best practices, otherwise, it's gonna take some time.

That's all for now. Happy hacking. :)