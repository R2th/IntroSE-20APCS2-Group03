Hash is similar to arrays, and it different to each other by array  is indexed with integers, and hash you can indexed it by string, expressions. formula, object ..... When you store a value in the hash you must provide 2 objects that are key (key) and value (value). 
For example:
```
hash = {a: 1, b: 2, c: 3, d: 4}   // => {a: 1, b: 2, c: 3, d: 4}
```

The powerfull of hash is that: they can use any object as an index. It has default value and will return nil when the key value does not exist in the hash.

### Create a Hash
We have some different ways to generate a hash. Below you can see you can create an empty hash by:

```
months = Hash.new
```

And you also can create the new hash with the default as below:

```
hash = Hash.new( "default" )
hash[0] // default
hash[1] // default
```
If the key does not exist, the hash returns the default value

Another ways to create  a hash in Ruby:
```
hash = {}
hash[:a]  = 1
hash[:b] = 2
// {a: 1, b: 2, c: 3}

hash = {a: 1, b: 2, c: 3}
```

### Add data into the hash
```
hash = {a: 1, b: 2}
hash[:c] = 3 // => {:a=>1, :b=>2, :c=>3}
```

### Delete data in hash

```
hash.delete(:a) // {:b=>2, :c=>3}
h.clear // => hash = {}
```

### Other operations
Use eachthe loop of each attribute in the hash

```
hash = {a: 1, b: 2, c: 3}
hash.each do |key, val|
  puts "#{key}"  # => a b c
end
```
Use `each_key` if only needed `key` by the hash

```
hash.each_key do |key|
  puts "#{key}"  # => a b c
end
```
Use `each_value` if only needed `value` by the hash

```
hash.each_value do |val|
  puts "#{val}" # 1 2 3
end
```
Check `key` exists in hash

```
hash = {a: 1, b: 2, c: 3}
hash.has_key?(:a)  # => true
hash.include?(:b) # => true
hash.key?(:c) # => true
hash.member?(:d) # => false
```

Check for empty hashes `empty?`

```
hash = {a: 1, b: 2, c: 3}
hash.empty? // true
```

**Hash length**

```
hash = {a: 1, b: 2, c: 3}
hash.length  // => 3
```

**Merge 2 hashes**

```
hash1 = {a: 1, b: 2, c: 3}
hash2 = {a: 5, d: 4}
hash1.update(hash2) // {:a=>5, :b=>2, :c=>3, :d=>4}
hash1.merge(hash2) // {:a=>5, :b=>2, :c=>3, :d=>4}
```

**has_key?(key)**

The result will return true if the hash has a value equal to the key
```
hash = { a: 100, b:> 200 }
hash.has_value?(100)   #=> true
hash.has_value?(999)   #=> false
```

**include?(key)**

The result will return true if the key exists in the hash
```
hash = { a: 100, b:> 200 }
hash.has_key?("a")   #=> true
hash.has_key?("z")   #=> false
```

**key(value)**

Get the key key via value
```
hash = { a: 100, b: 200, c: 300, d: 300 }
hash.key(200)   #=> "b"
hash.key(300)   #=> "c"
hash.key(999)   #=> nil
```

**keys**

Returns an array containing the hash keys:
```
hash = { a: 100, b: 200, c: 300, d: 400 }
hash.keys   #=> ["a", "b", "c", "d"]
```

**values**

Returns an array containing hash values
```
hash = { a: 100, b: 200, c: 300, d: 400 }
hash.values   #=> [100, 200, 300, 400]
```

**merge(other_hash) **

Returns a new hash including other_hash. If the key is duplicated then the value will be specified in other_hash
```
hash1 = { a: 100, b: 200 }
hash2 = { b: 254, c: 300 }
hash1.merge(hash2)   #=> {"a"=>100, "b"=>254, "c"=>300}
```

**select {|key, value| block}** 

Returns a new hash containing matching pairs (block returns true)
```
hash = { a: 100, b: 200, c: 300 }
hash.select {|k,v| k > "a"}  #=> {"b" => 200, "c" => 300}
hash.select {|k,v| v < 200}  #=> {"a" => 100}
```