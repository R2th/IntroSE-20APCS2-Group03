Ruby interpreter uses a single process by design. This means on your modern 8 core cpu, your script is going to use only 1/8th of your processing power at best. In this article, we'll see more about multi-threaded and multi-process ruby.

# Using multiple threads
Matz ruby interpreter uses GIL (Global Interpreter Lock), thus it only lets one thread to run at a time. So, in cpu bound tasks, there is no benefit of using multi thread, and it'll yield no benefit for you (in ruby).
First, let's take this example to calculate Fibonacci number.  It's totally a cpu bound task.
 
   ```ruby
    def fib(n)
      return n if [0,1].include?(n)
      fib(n-1) + fib(n-2)
    end
   ```

```ruby
Benchmark.measure { 10.times { fib(35) } }
```

```sh
(CPU time|system CPU time|user and system CPU times|real time)
38.243695 0.647830 38.891525 ( 41.074481)
36.667084 0.550266 37.217350 ( 38.464907)
38.844508 0.711785 39.556293 ( 42.610056)

=>AVG: 40.72s
```

Let's run it now using 10 threads.

```ruby
Benchmark.measure do
  threads = []
  10.times do
    threads << Thread.new { Thread.current[:output] = fib(35) }
  end
  threads.each { |thread| thread.join }
end
```

On an ideal world, we'd hope tenfold performance increase. But,

```sh
38.623686 0.611559 39.235245 ( 40.751415)
38.077194 0.579472 38.656666 ( 39.956344)
38.445872 0.603536 39.049408 ( 40.273643)

=>AVG: 40.33s
```

So, what's the benefit of using threads then? 
The answer is, None (if you're trying to solve a cpu bound problem).
But, if you're trying to solve an IO bound issue, then threads will speedup your performance a lot.

#### Example: Performing HTTP requests with multiple threads
Imagine a scenario, where we have a method that checks if it can access some websites and responds back with HTTP status code.

```ruby
require 'benchmark'
require 'net/http'

def check servers 
    servers.each do |server| 
        response = Net::HTTP.get_response(server, '/')
        puts server, response.code
    end
end

SERVERS = Array.new(100, "www.google.com")

puts Benchmark.measure {check(SERVERS)}
```

```sh
ruby thread.rb 
0.078843   0.046223   0.125066 ( 27.263542)
```

Now, let's rewrite the code to use multiple threads to do the job

```ruby
def check servers 
    threads = []

    servers.each do |server| 
        threads << Thread.new {
            response = Net::HTTP.get_response(server, '/')
            puts server, response.code
        }
    end

    threads.each { |thread| thread.join }
end
```

```sh
0.094302   0.038597   0.132899 (  1.383422)
```

That is a huge improvement over our single threaded implementation. On the plus side, running multiple threads don't increase memory usage exponentialy like using multi-process.
![](https://images.viblo.asia/8c87d882-f90f-4bd7-a6a0-f3d748000594.gif)


#### Benefits
1. Speedup for blocking operations
2. Variables can be shared/modified (beaware of deadlocks)
3. No extra memory used

#### Cons
1. Much harder to debug

# Using multiple processes
   Remember our fibonacci implementation from #threads section.
   
  ```ruby
    def fib(n)
      return n if [0,1].include?(n)
      fib(n-1) + fib(n-2)
    end
   ```
```ruby
Benchmark.measure { 10.times { fib(35) } }
```

```sh
(CPU time|system CPU time|user and system CPU times|real time)
38.243695 0.647830 38.891525 ( 41.074481)
36.667084 0.550266 37.217350 ( 38.464907)
38.844508 0.711785 39.556293 ( 42.610056)

=>AVG: 40.72s
```

We'll now try to run this with multiple process instead of threads.
The re-written function will be

```ruby
Benchmark.measure {
  read_stream, write_stream = IO.pipe
  10.times do
    Process.fork do
      write_stream.puts fib(35)
    end
  end
  Process.waitall
  write_stream.close
  results = read_stream.read
  read_stream.close
}
```

now, let's see the benchmark.
```sh
0.001240 0.005190 63.827237 ( 17.158324)
0.001579 0.007635 65.032995 ( 19.821757)
0.001433 0.006900 64.022068 ( 18.152649)

=>AVG: 18.38s
```

So, compared to 40 sec, it's using 18 sec. Which is a great improvement.  Note the memory usage 
    
   ![](https://images.viblo.asia/6eda36a3-95af-4134-93d5-2debf9c3179d.gif)
   
   This implementation is using 10 times higher memory. Which is the tradeoff. 
   
   ####  Benefits
   1. Speedup through multiple CPUs
    2. Speedup for blocking operations
    3. Variables are protected from change
    4. Child processes are killed when your main process is killed through Ctrl+c or kill -2
    
   #### Cons
   1. Memory usage will be higher.

# Summary 
It's best described in this [excellent article from Eqbal Quran](https://www.toptal.com/ruby/ruby-concurrency-and-parallelism-a-practical-primer) .

![](https://images.viblo.asia/e8ac9e28-f67a-4f73-8eff-070749929513.png)

In conclusion, we can say, there is not end all be all solution on which is best. We have to understand the workload and choose the best solution for our problem.


# Things to study

[Async Horror](https://github.com/froesecom/async_horror)

[Asynchronous Ruby -by Samuel Williams](https://www.codeotaku.com/journal/2018-06/asynchronous-ruby/index)

[Reactor Pattern](https://en.wikipedia.org/wiki/Reactor_pattern)

[Parallel Gem](https://github.com/grosser/parallel)

[GIL - Global Interpreter Lock](https://en.wikipedia.org/wiki/Global_interpreter_lock)

[Nobody understands GIL](https://www.jstorimer.com/blogs/workingwithcode/8085491-nobody-understands-the-gil)

[Multiprocessing in ruby](https://naturaily.com/blog/multiprocessing-in-ruby)

[Working with threads in ruby](https://medium.com/@kopilov.vlad/working-with-thread-in-ruby-948cd7e5f1a8)

[Async Gem](https://github.com/socketry/async)

[Parallel Gem](https://github.com/grosser/parallel)