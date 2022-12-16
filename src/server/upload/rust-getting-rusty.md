![title](https://images.viblo.asia/f70ea291-8155-4ba3-9515-93bdcfe269fd.png)

Rust is a relatively new system programming language.
This article will attempt to cover some of the basic features of Rust that are common to languages of identical paradigms.

### A "hello world"

A Rust `hello world` can be as simple as,

```rust
fn main() {
  println!("Hello world");
}
```

Like many other languages that use `def` or `function`, Rust uses `fn` to indicate a function definition.
The function name follows `fn`, then empty parenthesis pair `()` indicates that the function doesn't accept any argument.
The region enclosed by brace pair `{}` is function body, as usual.
But, probably you noticed something weird in the line `println!("Hello world");`, there's an exclamation sign (`!`) following by the function name.
This is one of Rust's many unique features, and interestingly this is a macro rather than a function.

### Fire it up

In order to work with Rust in our local machine, we need Rust installed. This can be achieved by running a ready made script,
```bash
curl https://sh.rustup.rs -sSf | sh
```
Although this is a one time step you will have to take, but if you're not feeling like investing that time, then you may use the online editor available [here](https://play.rust-lang.org/).

Remember, Rust is a compiled language, so we have to face the same painful process of compilation before running the code. Let's do that.
First, create a project directory and `cd` into it.
```bash
$ mkdir rusty
$ cd rusty
```
Now create a source File with `rs` extension (all the rust sources have any of `rs`, `rlib`, `rafto` extension),
```bash
touch main.rs
```
and insert our little *hello world* program in it. Save it.
And, now the part we are waiting for. Let's compile it.
```bash
rustc main.rs
```
`rustc` is the rust compiler which, as usual, generates an executable (with the same name as the source, but excluding any extension).
Now run the executable
```bash
./main
```

### Basics

Rust is like a king in it's own domain. There are too much Rust specific unique features that are to be honest, overwhelming.
So, let's discuss the basic features we are generally used to and has wide cross language availability.

#### Variable

Variables are interesting in Rust. Let's see it through.
A variable can be declared like this,
```rust
let x = 777;
```
But, don't be deceived by it's naive look. If you try something like this,
```rust
let x = 777;
x = 44;
```
this will fail. And, that is because variable bindings are immutable by default. In order to define a mutable variable binding we will some something like
```rust
let mut x = 777;
```
Since, it's a statically typed language, you may be wondering, shouldn't I declare a data type?
Rust can infer data types and so far we are using the inference feature of Rust. Now, let's define the same variable but, this time, like C/C++ we'll explicitly mention the type.
```rust
let x: i32 = 777;
```
Here we declared x as an immutable 32-bit integer. Now let's have a quick peek to some basic (primitive) types that we may use,
Signed integer: `i8`, `i16`, `i32`, `i64`
Unsigned integer: `u8`, `u16`, `u32`, `u64`
Float: `f32`, `f64`
Boolean: `bool`
Character: `char`

An important thing to note here, `char` is by default, four bytes.

Rust has it's referencing mechanism that can be used like,
```rust
let x = 777;
let y = &x;
```
The `&` here implying that y is indicating to the reference of x. It's more complicated than it appears here.
In order to explain it all we'll have to cover several Rust specific concepts like *Ownership*, *Borrowing* and *Lifetime*.
We are safe leaving those concepts untouched as long as we are not modifying the referenced variable. So, let's skip it for now.

Let's get familiar with another type which handles sequential data. Yeah, I'm talking about array.
An array declaration is made like this,
```rust
let x = [666, 777, 888];
```
Where some basic operations like selection by index and slicing is performed by doing this,
```rust
let x = [666, 777, 888];

// Selection by index
x[1]  // returns second entry

// Slicing
let y = &x[..]; // Returns the entire array
```
The new operator here `..` is to indicate range. We could write,
```rust
let y = &x[2..];
```
which would have returned an array with only the last element of x in it.

#### Code units
Rust's coding units are functions. Functions have following structure.
```rust
fn function_name(arg1, arg2, ...) -> return_type {

}
```
Interesting, isn't it?
Let's take a look at a function that takes an integer and returns it's square
```rust
fn square(x: i32) -> i32 {
  x*x
}
```
How about some string?
```rust
fn print_merged_str(x: &str, y: &str) {
  println!("{}{}", x, y);
}
```
Did you notice something? In our string example, there is no return type specified. This, is a default. Functions that doesn't return any value doesn't need the return section. Only exceptions are divergents, but they are whole different things. :)

#### Flow control
Rust got it's own version of `if`.
```rust
if expression {
  // ...
} else if expression {

} else {
  // ...
}
```
The only distinguishable thing here from a `C` `if`, is that, it has got not parenthesis to enclose the switching expression.
There is no other significant differences.

#### Iteration
It has the basic `while`,
```rust
while expression {
  // ...
}
```
and a wonderful `for`, which is very much like the python's `in`.
```rust
for iterated_value in expression {
  // ...
}
```
There is also an infinite looping support through
```rust
loop {
  // ..
}
```
which eliminates the need for modifying `while` or `for` to achieve this.

A premature escape can be performed through a `break` statement. I guess you already presumed the existence of a `continue` statement? Yeah, it exists and functions as expected. Additionally, Rust supports loop labeling that can be used with `while` or `for` to achieve controlled loop escaping. For details, see [[#link](https://doc.rust-lang.org/book/loops.html#loop-labels)]

#### Lambda

In Rust, lambda's are called *Closures*.
A *closure* can be defined as follows,
```rust
let x = |p: i32| p*p;
```
Here, x is the variable binding. The region enclosed by vertical bars contains arguments, the region succeeded by the vertical bars is the lambda definition.
It is quite easy, isn't it? :)

### Modularization

![modularization](https://images.viblo.asia/26721b58-2647-438b-af2b-bee4449b3b52.png)

So far we worked on a single file source, and didn't use any libraries, but nearly all of the projects will require many dependency libraries. Also, when the project will get bigger, a single file based model will soon become unrealistic. Let's deal with these issues.

#### Dependency management

Rust provides a tool named `cargo` that deals with the dependency. All the libraries are called `crate`s.
Let's build a cargo enabled binary project (project that can be utilized as an executable).
```bash
cargo new rusty --bin
```
This creates a project folder structure where `rusty` is the root folder. Let's explore inside,
```text
  rusty
  ├── Cargo.toml
  └── src
      └── main.rs
```
Cargo.toml is the configuration file that `cargo` uses during dependency management and compilation operations.
If we need to add a dependency, we'll append the `crate`name and it's associated semantic versioning that we want to use in the `[dependencies]` section of Cargo.toml like this,
```ini
...

[dependencies]
package_name = "1.0.0"
```

#### Crate generation
Crate building is very much identical to binary project generation that we mentioned in the previous section. In order to build a `crate` skeleton,
```bash
cargo new rusty_crate
```
This will generate,
```text
  rusty_crate
  ├── Cargo.toml
  └── src
      └── lib.rs
```
The only difference in a crate is that it doesn't have a `fn main()` entry point.

In order to utilize a crate, in the consumer rust source file, we'll prepend the following line
```rust
extern crate crate_name;
```
Then we can utilize the crate contents (with the consideration that, it contains a `square` function) as follows,
```rust
println!("Square of four: {}", crate_name::square(4));
```
Or, we could import the function names into our consumer source's scope by utilizing `use` like this,
```rust
extern crate rusty;

use rusty::square;

println!("Square of four: {}", square(4));
```
Let's consider another scenario, where `rusty` crate has a submodule `math`, which contains `square` function. We could handle this scenario like this,
```rust
extern crate rusty;

use rusty::math::square;

println!("Square of four: {}", square(4));
```

### Performance
Rust performance is very much identical to the performance of C. In some cases it outperforms `C` and in some other cases it's slower than C. But this should not be considered a bad thing, since Rust is relatively very new and the issues are getting resolved fast and the community is pretty strong.

A tour to the github repository for Rust compiler and standard libraries show that, there's about ~450 issues tagged for it's slow performance, where about ~350 issues are already closed [[#link](https://github.com/rust-lang/rust/labels/I-slow)]. The issue reporting and resolving frequency suggests that, we can expect an exactly equivalent performance to C very soon.

### Cross platform support

Rust is supported across most of the major platforms. The platform wise support in Rust is divided into three different tiers. A tier indicates the *support*, *reliability* and *build and execution guarantee*.

***Tier 1*** can be summarized as fully supported platforms.

***Tier 2*** platform codes will build reliably but test are not always available.

***Tier 3*** platform support is mostly unofficial and reliability is a big concern here.

### Usage

Since Rust is a system programming language, not to mention, it is used mostly in cases where critical performance is required, like *embedded applications*, *game engine development*, *sophisticated algorithm implementation* and many more.
Organizations like Mozilla, Dropbox, Samsung, Skylight are contributing and/or consuming Rust in their products. A good example could be Mozilla's Servo browser engine. Rust has over 1200 contributors. Pretty strong, nah?

### Possibilities

Many considers Rust as a modern alternative to C. While it is still lacking behind in terms of performance, but the margins are expected to converge soon enough.

### References

- https://www.rust-lang.org/learn