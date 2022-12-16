![](https://miro.medium.com/max/1400/1*qcDQVAR-z3caEs00fpUehg.png)
## Introduction & What is Redis?
> An in-memory database stored by key-value, usually use as a database to cache, is very quick access.

A comment on the video:

>Redis is an in-memory but persistent on disk database, so it represents a different trade off where very high write and read speed is achieved with the limitation of data sets that can’t be larger than memory.
>
>Which means it’s not like it’s being stored only in memory and is not persistent. It stores everything in memory and write on disk is optional but still there for use

Ref video: https://youtu.be/jgpVdJB2sKQ

Below is the note content I learn from the above video. So, feel free to take a quick look and practice along with the video.

## Redis Installation
**On Mac:**

Install by Homebrew: `brew install redis`

Run server Redis: `redis-server`

Open a new tab/window to access Redis CLI by `redis-cli`, type `quit` to quit.

## Basic Commands
Setting a value for a key: `SET key value` , the value will store as string

Getting a value for a key: `GET key`

Check if the key exists: `EXISTS key`

Check key match a pattern: all keys with `KEY *`

Clear all cache: `FLUSHALL`

Clear all input on the terminal: `CLEAR`

**Note:** Please note that you could use both `set` or `SET`

```
127.0.0.1:6379> SET age 16
OK
127.0.0.1:6379> GET age
"16"
127.0.0.1:6379> EXISTS age
(integer) 1
127.0.0.1:6379> EXISTS name
(integer) 0
127.0.0.1:6379> KEYS *
1) "age"
127.0.0.1:6379> flushall
OK
127.0.0.1:6379> KEYS *
(empty list or set)
```

## Handling Expirations
If no expiration, key-value will live forever.

Expire age in 10 seconds: `EXPIRE key timevalue`

- Ex: expire age 10

Check time key live(time to live — `TTL`): `TTL key`

after out of time, the key will be deleted and the value is `nil`

Set expire key-value at the same time: `SETEX age 10 16` that means we set age has a value is 16 in 10 seconds

**Example code:**

```
127.0.0.1:6379> SET age 16
OK

127.0.0.1:6379> EXPIRE age 10
(integer) 1
127.0.0.1:6379> TTL age
(integer) 4
127.0.0.1:6379> TTL age
(integer) 1
127.0.0.1:6379> TTL age
(integer) -2
127.0.0.1:6379> GET age
(nil)

127.0.0.1:6379> SETEX age 10 16
OK
127.0.0.1:6379> GET age
"16"
127.0.0.1:6379> TTL age
(integer) -2
127.0.0.1:6379> GET age
(nil)
```

## Lists
Add item to a list is the value: `LPUSH key value`

Get the list value of a key: `LRANGE key startRange endRange`

by `GET` key WILL NOT work because this only works for string, and this is a list

Push value to the left of the list: `LPUSH key value`

Push value to the right of the list: `RPUSHKEY value`

Pop an item out of the list from the left: `LPOP key`, similar have `RPOP key`

**Example code:**

```
127.0.0.1:6379> KEYS *
1) "friends"

127.0.0.1:6379> LRANGE friends 0 -1
1) "thanh"

127.0.0.1:6379> LPUSH friends nga
(integer) 2

127.0.0.1:6379> LRANGE friends 0 -1
1) "nga"
2) "thanh"

127.0.0.1:6379> RPUSH friends xuan
(integer) 3

127.0.0.1:6379> LRANGE friends 0 -1
1) "nga"
2) "thanh"
3) "xuan"

127.0.0.1:6379> LPOP friends
"nga"
127.0.0.1:6379> LRANGE friends 0 -1
1) "thanh"
2) "xuan"
```

## Sets
Add a key with value to a set: `SADD key value`

Get all members in a set: `SMEMBERS key`

Remove a value out of a set: `SREM key value`

**Example code:**

```
// Add "running" to set
127.0.0.1:6379> SADD hobbies running
(integer) 1
127.0.0.1:6379> SMEMBERS hobbies
1) "running"

// Add again, will not duplicate value
127.0.0.1:6379> SADD hobbies running
(integer) 0

// Check all members in a set
127.0.0.1:6379> SMEMBERS hobbies
1) "running"
127.0.0.1:6379> SADD hobbies tennis
(integer) 1
127.0.0.1:6379> SMEMBERS hobbies
1) "tennis"
2) "running"
127.0.0.1:6379> SMEMBERS hobbies
1) "tennis"
2) "running"

// Remove a member in a set
127.0.0.1:6379> srem hobbies tennis
(integer) 1
127.0.0.1:6379> SMEMBERS hobbies
1) "running"
```

## Hashes
`key-value` pair inside `key-value` pair

Set to a hash one key and its field’s value: `HSET key field value`

Get a value of a field: `HGET key field`

Get all value of a field: `HGETALL key field`

Delete field in a key: `HDEL key field1 field2`

Check a field in the key exists: `HEXISTS key field`

```
127.0.0.1:6379> HSET person name thanh 
(integer) 1 
127.0.0.1:6379> HGET person name 
"thanh" 

127.0.0.1:6379> HGETALL person 
1) "name" 
2) "thanh"
127.0.0.1:6379> HSET person age 30 
(integer) 1
127.0.0.1:6379> HGETALL person 
1) "name" 
2) "thanh" 
3) "age" 
4) "30"

127.0.0.1:6379> HDEL person age 
(integer) 1 
127.0.0.1:6379> HGETALL person 
1) "name" 
2) "thanh"
```

## NodeJS Examples
[Link demo](https://www.youtube.com/watch?v=jgpVdJB2sKQ&t=796s), my short summary:

### Step 1: Install and create Redis instance, run Redis server

Install Redis to project: npm i redis

In code, get Redis by: const Redis = require("redis")

Create an instance of Redis: const redisClient = Redis.createClient()

### Step 2: set a key-value with an expiration

Use redisClient as normal Redis(as practice). For example:

Set a key value with expiration time for data response to cache:

`redisClient.setex(photos, 3600, JSON.stringify(data))`

### Step 3: Check the key and its value in Redis CLI

After running the app again, we could access Redis CLI to check if the key photos with value in the cache, use key *

### Step 4: Use cache value from keys for the response data

Then we check the cache in Redis and use it to replace the data response:

(If want to remove all the cache, use flushall)

```js
api.get("/photos", async(req, res) => {
  const albumId = req.query.albumId

  redisClient.get(`photos/?ablumId=${albumId}`, async(errors, photos) => {  
    if (errors) console.log(errors)
    if (photos !== null) {
      return res.json(JSON.parse(photos))
    } else {
      const { data } = await axios.get(url)
      res.json(data)
    }
  })
})
```
### Step 5: Create function for re-use logic of getting or set cache

function `getOrSetCache` will take a key and a callback

```js
function getOrSetCache(key, callback) {
  return new Promise(resolve, reject) {
    redisClient.get(key, async (error, data) => {
      if (error) return reject(error)
      if (data !== null) return resolve(JSON.parse(data))
      
      const freshData = await callback()
      redisClient.setex(key, 3600, JSON.stringify(freshData))
      resolve(freshData)
    })
  }
}
```

Then we will use this function in the get and use similar for other requests if want to cache:

```js
api.get("/photos", async(req, res) => {
  const albumId = req.query.albumId
  const photos = await getOrSetCache(`photos/?ablumId=${albumId}`, async () => {
    const { data } = await axios.get(url)
    return data
  }) 
  res.json(photos)
})
```

That’s some basic knowledge about Redis, thank you for reading.

[The origin post](https://beautyoncode.com/basic-knowledges-about-redis/) is on my blog, welcome you to visit.

---

If you think these contents are helpful, you could send me an encouraging by:
- Support me
  - [☕️ Buy me a coffee](https://ko-fi.com/beautyoncode)
  - [😇 Send a hi on Momo](https://me.momo.vn/beautyoncode)
  - [👀 Visit support page](beautyoncode.com/support/)
- Visit my blog at [beautyoncode.com](beautyoncode.com)
- Follow me on:
  - [Careerly](https://careerly.vn/profiles/1140)
  - [fanpage](facebook.com/beautyoncode)
  - [linkedin](https://www.linkedin.com/in/graphicdthanh/)

🤘 Chat with me 🤘 

See you around, friends!