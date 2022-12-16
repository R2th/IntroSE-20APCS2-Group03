Redis is a fast in-memory store that design to work with rapid read or write operation that makes it a perfect tool to work with temporary data. Like most thing there are always down sides to it so today lets look at the things that we should avoid when using redis.

### Fast But Not Fast Enough
It is true that redis was designed for fast IO operation, but no matter how fast it is if you, a programmer, doesn't optimize it then things will go horribly wrong really fast.

### Expensive Command
Remember that redis is single threaded so making a lot of expensive command like **keys**, **scan**, **smembers**, **zrangebyscore** or other group of **O(n)** time complexity family will block off your server process and consume insantly amount of your CPU time.

If possible avoid making thoses command as much as possible. If you really can find a way to optimize that use case then don't worry all hopes are not lost.

### Using Pipeline
Something thing just work really fast and there is no issue when you are working on it in your development machine, but it is just not work in production environment. The thing is you are facing with **latency** issue.

In your local machine most of the time your application and redis server live in the same machine so the time it took to request to and get response back from redis server is really short result in really fast operation. This time that took to completed a whole operation is called **Round Trip Time** a.k.a **RTT**. But thing are different in production env so to reduce this latency issue make uses of redis pipeline feature.

When you need to make a lot of requests to the server at the same times and you don't really need to get each response back immediately, instead of issuing those command separately, you can queue those commands and send them in bulk in one go. This will significantly cuts down **RTT**. To use pipeline lets look at the following example code in ruby.

```Ruby
redis.pipelined do
  # doing rapid write or read ops
end
```

### Something Wrong With My Data
Redis is single threaded but that doesn't mean your code is race condition free. All it guarantees is that each command will be processed by the server one at a time in an atomic manner so anything that need multiple operations to complete has a potential bug with race condition, you still need to make your code thread safe. Consider the following code snippet (Did some of you say **incr**?).

```Ruby
count = redis.get(key)
redis.set(key, count.to_i + 1)
```

This code has a problem in that other redis client might modify value at that key after we've read that value. You might be tempted to fix it with this, but hold your horse, you are not out of the wood yet. This might have been fixed if you only deploy your application to one server, but will fail miserably when you increase to multiple instances because each instance have their own memory pool.

```Ruby
mux = Mutex.new
mux.synchronize do
  count = redis.get(key)
  redis.set(key, count.to_i + 1)
end
```

So how do we solve this problem? Don't worry my friend **transaction** got you cover; yes you heard me right.

### Entering Watch, Multi & Exec
The concept of **watch**, **mutil** & **exec** is realy simple. You begin a transaction by watching one or multple keys using **watch** command and then you enter **muti** session. After that every command that you issued in this session will be **queued** up and send back to server in one big **sequence** when you execute **exec** command. The redis server guarantees that your commands will be processed without interupted by other client command in between. If during your multi session any of the watched key value has been modified then execute **exec** will fail and all the operations are cancel. This gives you a simple form of **optimistic locking** that you can do a **read-check-write**. To illustrate this lets consider the following code snippet that merge two sets and delete one from data store. Should any client modified **key1** or **key2** then the transaction will never take place. It is up to you to implement retry mechanism should the transaction failed.

```Ruby
redis.watch('key1', 'key2')
val1 = redis.smembers('key1')
val2 = redis.smembers('key2')

redis.multi do |m|
  m.sadd(val1 + val2)
  m.del('key2')
end
```

### Conclusion
I hope this little tour will help you understand redis a little bit better and hopefully it will be useful in your future project.