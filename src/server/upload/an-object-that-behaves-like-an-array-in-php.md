In this post, I want to introduce a rarely used feature in PHP which allows our PHP objects to have the behaviors of an array. That is possible by making a class to implement the `ArrayAccess` interface. In fact, this feature can be seen quite often in many PHP frameworks, especially Laravel. Before getting into the details of this feature, let's review our very basic knowledge about PHP objects and arrays.

-----

### 1. Array

To create an array, use the `array()` language construct.
```php
array(
    key => value,
    key2 => value2,
    ...
)
```
As of PHP 5.4, we can use a short version  `[]` as an alternative.

**Example #1 Create a simple array**

```php
<?php
$array = array(
    "foo" => "bar",
    "bar" => "foo",
);

// as of PHP 5.4
$array = [
    "foo" => "bar",
    "bar" => "foo",
]

//The comma after the last array element is optional and can be omitted. 
```

For most people coming from another OO language, a quite interesting thing about array in PHP is that there is no distinction between indexed array and associative array. You use the same syntax for creating both array types. If you don't pass a key-value pair into the construct, PHP will use the increment of the largest previously used integer key. Moreover, you can specify the key for only some elements.

**Example #2 Unique behaviour of array in PHP**
```php
<?php
$array = array(
         "a",
         "b",
    6 => "c",
         "d",
);
var_dump($array);
```

The above example will output:
```
array(4) {
  [0]=>
  string(1) "a"
  [1]=>
  string(1) "b"
  [6]=>
  string(1) "c"
  [7]=>
  string(1) "d"
}
```

At this point, an array is like a box of elements, so as the `[]` syntax looks really like a box. In order to access things that are stored in that box, we use the square bracket syntax `array[key]`. 

**Example #3 Access array elements**

```php
<?php
$array = array(
    "foo" => "bar",
    42    => 24,
    "multi" => array(
         "dimensional" => array(
             "array" => "foo"
         )
    )
);

var_dump($array["foo"]);
var_dump($array[42]);
var_dump($array["multi"]["dimensional"]["array"]);
?>
```

The above example will output

```
string(3) "bar"
int(24)
string(3) "foo"
```

If you come from Javascript world, you might know a feature called destructuring which allow us to *break* the array into variables which store corresponding values. In PHP, we can use the `list()` language construct.

**Example #4 Destructuring**
```php
$info = array('coffee', 'brown', 'caffeine');
// Listing all the variables
list($drink, $color, $power) = $info;
[$drink, $color, $power] = $info; // as of PHP 7.1
// Listing some of them
list($drink, , $power) = $info;
// Nested
list($a, list($b, $c)) = array(1, array(2, 3));
// Using with array indices
list($a[0], $a[1], $a[2]) = $info;
// list() with keys
$array = ['locality' => 'Tunis', 'postal_code' => '1110'];
list('postal_code' => $zipCode, 'locality' => $locality) = $array;

$data = [
    ["id" => 1, "name" => 'Tom'],
    ["id" => 2, "name" => 'Fred'],
];
foreach ($data as ["id" => $id, "name" => $name]) {
    echo "id: $id, name: $name\n";
}
list(1 => $second, 3 => $fourth) = [1, 2, 3, 4];
echo "$second, $fourth\n";
```
Finally, how do we modify the existing array? This is done by assigning values to the array, specifying the key in brackets. 
```
$arr[key] = value;
$arr[] = value;
```
if `$arr` doesn't exist yet, it will be created, so this is also an alternative way to create an array (but this is [discouraged](https://www.php.net/manual/en/language.types.array.php)).
To change a certain value, assign a new value to that element using its key. To remove a key/value pair, call the `unset()` function on it.

**Example #5 Modify existing array**
```php
<?php
$arr = array(5 => 1, 12 => 2);

$arr[] = 56;    // This is the same as $arr[13] = 56;
                // at this point of the script

$arr["x"] = 42; // This adds a new element to
                // the array with key "x"
                
unset($arr[5]); // This removes the element from the array

unset($arr);    // This deletes the whole array
?>
```
As mentioned above, if no key is specified, the maximum of the existing integer indices is taken, and the new key will be that maximum value plus 1 (but at least 0). If no integer indices exist yet, the key will be 0 (zero).

----
### 2. Object
Like array, object is just another way to group data, but more than that, object can contain functions (array can too, but we rarely do that). 

To create an object, we first must define a class definition and use the `new` keyword.

**Example #6 Create an object**
```php
<?php
class SimpleClass
{
    // property declaration
    public $var = 'a default value';

    // method declaration
    public function displayVar() {
        echo $this->var;
    }
}

$object = new SimpleClass();
?>
```
Unlike array, there is no short-cut for that, in Javascript we can do thing like `$object = {}`, but that's not possible in PHP.
To access the class members (properties, methods), we use the `->` syntax.

**Example #7 Access class members**
```php
$object = new SimpleClass();
echo $object->var;
$object->displayVar();
```
---
### 3. ArrayAccess
After skimming through some basic knowledge about array and object in PHP, let's jump into our main focus of this post, the `ArrayAccess` interface. This is where the magic happens. By implement all the methods defined in this interface, our object will has the behaviors of an array. The interface has 4 methods need to be implemented:
```php
ArrayAccess {
    abstract public offsetExists ( mixed $offset ) : bool
    abstract public offsetGet ( mixed $offset ) : mixed
    abstract public offsetSet ( mixed $offset , mixed $value ) : void
    abstract public offsetUnset ( mixed $offset ) : void
}
```
Let's see an example of implementing that interface

**Example #8 Implementation**
```php
<?php

class Foo implements ArrayAccess
{
    protected $container = [];

    public function offsetExists($offset)
    {
        return isset($this->container[$offset]);
    }

    public function offsetGet($offset)
    {
        return isset($this->container[$offset]) ? $this->container[$offset] : null;
    }

    public function offsetSet($offset, $value)
    {
        if (is_null($offset)) {
            $this->container[] = $value;
        } else {
            $this->container[$offset] = $value;
        }
    }

    public function offsetUnset($offset)
    {
        unset($this->container[$offset]);
    }
}
```
Now let's see how we're gonna use it

**Example #9 Usage**
```php
<?php
$object = new Foo;
$object[] = 'bar'; //offsetSet called
echo $object[0] ; //offsetGet called
isset($object[0]); //offsetExists called
unset($object[0]); //offsetUnset called
```
---
### 4. Conclusion

To me, this `ArrayAccess` feature is a really cool thing. This is the first time I have seen something like this, maybe this feature already exist in other languages too. In a normal day-to-day programming, I think we rarely have a situation in which we need to utilize this feature. To me, I encountered this feature when reading the Laravel sourcecode, the `Container` class, to be more specific. 

For now, our object just behave like an array when it comes to access and add/remove things. Maybe in the next post, I'm gonna write about how to iterate through an object just like with array. Thanks for reading.

---
### 5. References

[1]. https://www.php.net/manual/en/language.types.array.php

[2]. https://www.php.net/manual/en/language.oop5.basic.php

[3]. https://www.php.net/manual/en/class.arrayaccess.php