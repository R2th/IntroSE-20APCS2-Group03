### 1. Background Jobs
To understand clearly about Sidekiq gem and how important it is in Rails's background jobs handling, First we need know clearly about background job:
Background jobs , are jobs or tasks that are processed outside of the normal request-response flow in web applications. If the task takes a lot of processing time or the display of processing results to the screen doesn't matter, it should be considered as a job background for the web to respond faster. So which jobs should use background jobs? Consider when your web app has the following functions: image processing, emailing, posting to social sites, scheduled jobs.
###  2. What is Sidekiq?
* This is a commonly used gem for processing background jobs in the Rails framework.
* The difference between Sidekiq and other gems handle background jobs (Resque, Delayed Jobs)  is Sidekiq using multi-threaded and Redis to handle multiple jobs with the same time.
* Redis is used to store jobs. By default, sidekiq connects to the Redis server with the address localhost:6379in the development environment
### 3. Basic installation and use
* Add gem to Gemfile: `gem "sidekiq"`
* Create a worker / thread in the folder` app/worker.rb`
* Create jobs to handle asynchronous methods `perform_async`
* Run the sidekiq server: `bundle exec sidekiq`
### 4. Structure
Sidekiq consists of 3 main parts: `Sidekiq Client`,` Sidekiq Server` and `Redis`.

**Sidekiq Client:**
* Responsible for pushing jobs into the queue.
* Use the function `JSON.dump` to convert the data of a job into a hash (How is a job pushed into Redis formatted? Can you refer to the Sidekiq wiki page: https://github.com/mperham/sidekiq/wiki/Job-Format )
* Use Redis commands like `LPUSH` to push jobs into queues in Redis.
* Note: worker parameters must be simple JSON data types such as numbers, string, boolean, array, hash. Complex Ruby objects like Date and Time, models in ActiveRecord will not be serialized correctly.

**Sidekiq Server:**
* Responsible for taking jobs from the queue in Redis for processing
* Use Redis's `BRPOP` command to get jobs: when there is a job in the queue, get it, the empty queue will wait until the job is available. ( https://redis.io/commands/brpop )
* The server will start worker and call the method performwith the parameters passed.

**Redis**

There are a lots of articles explaining about Redis is, and they alson talk about comparison between Redis and other famous NoSQL Database like MongoDB, you can find and understand it by yourself. Here I only summarize some points of Redis when using with Sidekiq.
* This is the place to store jobs using Sidekiq (Sidekiq's important difference compared to Delayed Job).
* Is an in-memory database and can also be considered as a NoSQL database
* Storing data in RAM should be fast.
* Note that when using Sidekiq with Redis, Redis should be considered a fixed data storage, not a cache. => Reconfigure maxmemory-policy noevictionRedis to not delete Sidekiq's data
### 5. Advanced settings
File ` config/sidekiq.yml`
* Queue: By default Sidekiq uses a unique queue for jobs processing named default => which can be customized to use multiple queues with different priority levels.
* Some available queues of Sidekiq:
    * Scheduled: This queue includes jobs scheduled in chronological order.
    * Retry: When a job fails, Sidekiq will switch this job to the Retry queue.
    * Dead: This queue includes jobs that are considered "dead". Sidekiq will not retry any jobs in this queue.
* Workers: You can treat a worker as a thread processing jobs. You can customize the options for queue, retry, and backtrace for a worker.
* Concurrent processing: By default, a Sidekiq process creates 25 threads.

### 6. Processing jobs

* General mechanism
    * Use method `performin(interval, args)` or `performat(timestamp, args)`
    * Default sidekiq scheduler will check scheduled jobs 15s once => can be customized.
* Detail mechanism:
    * There is a scheduled queue consisting of scheduled jobs in Redis
    * The next job to be retrieved is the job with the execution time <= the current time
    * Get the job from the scheduled queue and push the current working queue
    * When starting a Sidekiq process will create a thread with Poller performing Redis's scheduled queue check after about 15 seconds to retrieve the scheduled job to be executed (scheduled job will be pushed into the current working queue).