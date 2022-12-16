Bài này mình viết trên medium trước rồi re-up ở đây nên xin phép mình dùng tiếng anh luôn nhé, bạn nào có kinh nghiệm hay cách làm khác có thể chia sẻ luôn.
Bài viết gốc: [Link](https://medium.com/@yenle1112/sharding-in-golang-with-benchmarks-e72e1b061657)

# Sharding using golang with benchmark

### Quick recall about database sharding

Sharding db is a mechanism to speed up the time of query or update database by splitting them into multiple partitions (like DB Partition mechanism) and store them in several instances or servers.

The recommendation always be starting with other methods first before applying it, because it will add a lot of complexity in your db like connectivity, consistency and backward compatible.

The shard could be logical or physical. I draw diagram below to depict that

Logical vs Physical Shard

[https://viewer.diagrams.net/?border=0&tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=Untitled%20Diagram.drawio&open=Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1CXWCBxd0aQfT5GSx5waiOBHxwWSj2J36%26export%3Ddownload](https://viewer.diagrams.net/?border=0&tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=Untitled%20Diagram.drawio&open=Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1CXWCBxd0aQfT5GSx5waiOBHxwWSj2J36%26export%3Ddownload)

Due to its complexity, we can rely on a third party for handling that, it operates as a pool and App just connect to it and decision of choosing shard can be process by the pool. We called that’s dynamic sharding.

Another approach is that we can implement the sharding by ourselves, using some algorithms to decide for each request, which shard should be reach out. We called that’s algorithmic sharding.

Again, note that we need to ensure whatever method we used, it should be consistency and backward compatible, we cannot get the desirable result if each times for the same request, we reach out to a different shard. For backward compatibility, when we decide to change the sharding algorithm, old records remain to be accessible somehow.

This post I’ll use the same idea of sharding to implement an craft version to visualize this idea.

### Implementation example

Implement the algorithmic sharding which applied for writing to/reading form map[key]value concurrently, you might think it as a key-value DB

**Problem**

I quoted some suggestions in golang blogs:

> “Go’s concurrency primitives — goroutines and channels — provide an elegant and distinct means of structuring concurrent software. Instead of explicitly using locks to mediate access to shared data, Go encourages the use of channels to pass references to data between goroutines”. [[ref]](https://go.dev/blog/codelab-share)

And

>“Maps are not safe for concurrent use It’s not defined what happens when you read and write to them simultaneously. If you need to read from and write to a map from concurrently executing goroutines, the accesses must be mediated by some kind of synchronization mechanism. One common way to protect maps is with sync.RWMutex”. [[ref]](https://go.dev/blog/maps)

Indeed, it’s not always be possible to use goroutine and channel, map might be one of the cases.
And we know that we should use locking mechnism when using map in concurrency.

This mechanism works perfectly, but:

With RWMutex, any processes can acquire read lock as long as there’s no write lock, on the other hand, acquiring write lock is only possible when there’s no any existing ahead read and write locks, and attempt to acquiring additional lock will be blocked until any locks ahead are released.

Acquiring lock may become a bottleneck when the number of concurrent processes acting on that resource increase dramatically.

Vertical sharding would help to reduce lock contention by splitting underlying data structure (map) into multiple lockable maps.

**Idea**

The mechanism to split map should be **consitent, backward compatible and anti-collision**.
An approach could be we take the **hash of key (checksum)** input and mod by number of shards to form a shard key. For each request, we will calculate it and store data to according shard.

```go
hash := sha1.Sum([]byte(key))
shard_key := hash[17] % numberOfShards // 17 is just an arbitrary number
// Note that the size of checksum sha1 is 160 bits or 20 bytes, the arbitrary
// should be lower than 20
```

**Implementation**

```go
// Define shard is a lockable map
type Shard struct {
	m map[string]interface{}
	sync.RWMutex
}

// ShardMap is a collection of shards, an abstraction for read/write data
type ShardMap []*Shard

func makeShardMap(size int) ShardMap {
	m := make([]*Shard, size)
	for i := 0; i < size; i++ {
		s := Shard{m: make(map[string]interface{})}
		m[i] = &s
	}
	return m
}

func (m ShardMap) getShardKey(key string) int {
	hash := sha1.Sum([]byte(key))
	return int(hash[17]) % len(m)
}

func (m ShardMap) GetShard(key string) *Shard {
	shard_key := m.getShardKey(key)
	return m[shard_key]
}

func (m ShardMap) Get(key string) (interface{}, bool) {
	shard := m.GetShard(key)
	shard.RLock()
	defer shard.RUnlock()
	v, ok := shard.m[key]
	return v, ok
}

func (m ShardMap) Set(key string, val interface{}) {
	shard := m.GetShard(key)
	shard.Lock()
	defer shard.Unlock()
	shard.m[key] = val
}

func (m ShardMap) Delete(key string) {
	shard := m.GetShard(key)
	shard.Lock()
	defer shard.Unlock()
	if _, ok := shard.m[key]; ok {
		delete(shard.m, key)
	}
}
```

test_shard.go

```go
func TestGetSetShard(t *testing.T) {
	in := make(map[string]int)
	sm := makeShardMap(20)
	for i := 0; i < 1000; i += 1 {
		k := randomStr(10)
		v := randomInt(0, 1000000)
		in[k] = v
		fmt.Println("shard key: ", sm.getShardKey(k))
		sm.Set(k, v)
	}

	for k, v := range in {
		r, ok := sm.Get(k)
		require.Equal(t, true, ok)
		require.Equal(t, v, r)
	}
}

// Note that init() will always be called automatically before calling main()
func init() {
	rand.Seed(time.Now().UnixNano())
}
func randomStr(size int) string {
	//Random string of character in ASCII subrange ['A'...'z'] (including '/', '?'...)
	//Start index : 0
	//End index: 'z' - 'A'
	var str strings.Builder
	for size > 0 {
		idx := rand.Intn('z' - 'A')
		str.WriteRune(rune(idx + 'A'))
		size -= 1
	}
	return str.String()
}

func randomInt(min, max int) int {
	return min + rand.Intn(max-min) + 1
}
```

All good, no failure with 1000 keys. But how about its performance?
Let make some benchmarks.

**Benchmark**

We will write a simple program that writing 4000 keys associate with data size for each key around ~ 4kB (4000 bytes) into single map comparing with shards of map.
We will allow upto 8000 goroutines for reading/writing concurrently

Firstly, we create a version using single map

```go
var wg sync.WaitGroup

type SimpleMap struct {
	m map[string]interface{}
	sync.RWMutex
	sem chan int
	buf chan []byte
}

func makeSimpleMap() *SimpleMap {
	var sm SimpleMap
	sm = SimpleMap{
		m:   make(map[string]interface{}),
		sem: make(chan int, concurrentGoroutineLimit),
		buf: make(chan []byte, numberOfKeys),
	}
	return &sm
}

func (sm *SimpleMap) Write(k string) {
	sm.Lock()
	defer wg.Done()
	defer sm.Unlock()
	sm.sem <- 1
	sm.m[k] = randomBytes(dataSize)
	<-sm.sem
}

func (sm *SimpleMap) Read(k string) {
	sm.RLock()
	defer wg.Done()
	defer sm.RUnlock()
	sm.sem <- 1
	if v, ok := sm.m[k]; ok {
		sm.buf <- v.([]byte)
	} else {
		sm.buf <- make([]byte, dataSize)
	}
	<-sm.sem
}
```

Some helpers to generate key and index randomly. It uses time.Now().UnixNano as seed

```go
func randomString(size int) string {
	return randomBuffer(size).String()
}

func randomBytes(size int) []byte {
	return randomBuffer(size).Bytes()
}

func randomBuffer(size int) *bytes.Buffer {
	var buf bytes.Buffer
	for size > 0 {
		idx := rand.Intn('z' - 'A')
		buf.WriteRune(rune(idx + 'A'))
		size -= 1
	}
	return &buf
}
```

Execution functions with simple map

```go
func SimpleMapExecute(sm *SimpleMap) {
	var keys [numberOfKeys]string
	for i := 0; i < numberOfKeys; i += 1 {
		keys[i] = randomString(10)
	}
	start := time.Now()
	for i := 0; i < numberOfKeys; i += 1 {
		wg.Add(2)
		go func(key string) {
			sm.Write(key)
		}(keys[i])

		//Read from random key
		idx := rand.Intn(numberOfKeys)

		go func(key string) {
			sm.Read(key)
		}(keys[idx])
	}
	wg.Wait()
	elapsed := time.Since(start)
	fmt.Println("Took: ", elapsed)
}
```

Execution functions with shards of map

```go
func ShardMapExecute(sm *ShardMap) {
	var keys [numberOfKeys]string
	for i := 0; i < numberOfKeys; i += 1 {
		keys[i] = randomString(10)
	}
	start := time.Now()
	for i := 0; i < numberOfKeys; i += 1 {
		wg.Add(2)
		data := randomBytes(dataSize)
		go func(key string) {
			defer wg.Done()
			sm.Set(key, data)
		}(keys[rand.Intn(numberOfKeys)])

		go func(key string) {
			defer wg.Done()
			if v, ok := sm.Get(key); ok {
				Buf <- v.([]byte)
			} else {
				Buf <- make([]byte, dataSize)
			}
		}(keys[rand.Intn(numberOfKeys)])
	}
	wg.Wait()
	elapsed := time.Since(start)
	fmt.Println("Took: ", elapsed)
}
```

Prepare running parameters

```go
const (
	numberOfKeys             = 4000
	concurrentGoroutineLimit = 8000
	dataSize                 = 4000
)
```
and lastly, main function
```go
func main() {
	simpleMode := flag.Bool("simple", false, "Run with simple map")
	flag.Parse()

	if *simpleMode {
		fmt.Println("Run with simple map")
		sm := makeSimpleMap()
		SimpleMapExecute(sm)
	} else {
		fmt.Println("Run with shard map")
		shardMap := makeShardMap(20)
		ShardMapExecute(&shardMap)
	}

}
```

And let’s see the results:

```go
yenle@MacBook-Air-cua-Yen microservice_pattern % go run -race test2.go -simple
Run with simple map
Took:  9.01160475s

yenle@MacBook-Air-cua-Yen microservice_pattern % go run -race test2.go
Run with shard map
Took:  8.007320791s
```

Wow, enhancement can be seen oviously 😊 

Now trying with some other tests, I will run 12000 concurrent goroutines, in that, 6000 for writting and 6000 for reading. (Noted that I commented out the semaphore above to remove the limit of 8000). The number of keys will be down a bit to 3000 keys.

Modify executive functions a bit:

```go
func SimpleMapExecute(sm *SimpleMap) {
	var keys [numberOfKeys]string
	for i := 0; i < numberOfKeys; i += 1 {
		keys[i] = randomString(10)
	}
	start := time.Now()
	for i := 0; i < numberOfKeys; i += 1 {
		wg.Add(4) //create 4 goroutines for each iteration
		go func(key string) {
			sm.Write(key)
		}(keys[rand.Intn(numberOfKeys)])
		
		go func(key string) {
			sm.Write(key)
		}(keys[rand.Intn(numberOfKeys)])

		go func(key string) {
			sm.Read(key)
		}(keys[rand.Intn(numberOfKeys)])
		
		go func(key string) {
			sm.Read(key)
		}(keys[rand.Intn(numberOfKeys)])
	}
	wg.Wait()
	elapsed := time.Since(start)
	fmt.Println("Took: ", elapsed)
}
```
And
```go
func ShardMapExecute(sm *ShardMap) {
	var keys [numberOfKeys]string
	for i := 0; i < numberOfKeys; i += 1 {
		keys[i] = randomString(10)
	}
	start := time.Now()
	for i := 0; i < numberOfKeys; i += 1 {
		wg.Add(4)  //create 4 goroutines for each iteration
		data := randomBytes(dataSize)
		go func(key string) {
			defer wg.Done()
			sm.Set(key, data)
		}(keys[rand.Intn(numberOfKeys)])
		
		go func(key string) {
			defer wg.Done()
			sm.Set(key, data)
		}(keys[rand.Intn(numberOfKeys)])

		go func(key string) {
			defer wg.Done()
			if v, ok := sm.Get(key); ok {
				Buf <- v.([]byte)
			} else {
				Buf <- make([]byte, dataSize)
			}
		}(keys[rand.Intn(numberOfKeys)])
		
		go func(key string) {
			defer wg.Done()
			if v, ok := sm.Get(key); ok {
				Buf <- v.([]byte)
			} else {
				Buf <- make([]byte, dataSize)
			}
		}(keys[rand.Intn(numberOfKeys)])
	}
	wg.Wait()
	elapsed := time.Since(start)
	fmt.Println("Took: ", elapsed)
}
```

```go
const (
	numberOfKeys             = 3000
	concurrentGoroutineLimit = 8000
	dataSize                 = 4000
)
```

And results:

```go
yenle@MacBook-Air-cua-Yen microservice_pattern % go run -race test2.go -simple
Run with simple map
Took:  14.156822542s
yenle@MacBook-Air-cua-Yen microservice_pattern % go run -race test2.go        
Run with shard map
Took:  5.989326334s
```

**Voilà ! Huge different** 😀

Try with 4000 keys, again

```go
yenle@MacBook-Air-cua-Yen microservice_pattern % go run -race test2.go -simple
Run with simple map
Took:  19.437610875s
yenle@MacBook-Air-cua-Yen microservice_pattern % go run -race test2.go        
Run with shard map
Took:  8.30976475s
```

More than twice as fast.

Ok, for some last words, thanks if you still read up to here 😄 The post is quite long till now.

Using shards is quite interesting and effective as well, it doesn’t only apply for reading/updating map but any tasks which are requiring a lot of goroutines run concurrently, but the downside may be adding more complexity and may cause the deadlock somehow, we need to test it carefully before using.

Hopefully this post is useful for you somehow.🙌