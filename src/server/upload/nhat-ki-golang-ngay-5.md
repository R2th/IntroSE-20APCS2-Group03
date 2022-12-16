# Mở đầu
Hôm qua sau khi làm xong mình có ngồi đọc thêm về concurrency của go thêm 1 chút. Cơ bản thì hiểu nhưng mà khả năng vận dụng vẫn kém. Chắc cách duy nhất là áp dụng thôi. Nhưng mà không có ví dụ thực tế, mình làm web rails cũng không cần lắm concurrency. Lên mạng search ít exercise vậy.

Nay hơi bận tận 11h đêm mới viết, chắc đọc lý thuyết thôi còn mai viết code sau vậy, tầm này chả biết đủ tỉnh táo không.

Search thử "golang concurrency exercise" trên github ra cả rổ [https://github.com/search?q=go+concurrency+exercise&ref=opensearch](https://github.com/search?q=go+concurrency+exercise&ref=opensearch). Chắc chọn cái đầu tiên thôi [https://github.com/loong/go-concurrency-exercises](https://github.com/loong/go-concurrency-exercises). Ù hù họ còn viết cả test cho mình nữa, đùa mấy anh tây lúc nào cũng tốt thôi rồi.
# Làm thử
## 0. Limit your crawler
Bài khởi động mà đã khoai vãi. Dịch đề chút nhỉ:

[https://github.com/loong/go-concurrency-exercises/tree/master/0-limit-crawler](https://github.com/loong/go-concurrency-exercises/tree/master/0-limit-crawler)

> Given is a crawler (modified from the Go tour) that requests pages excessively. However, we don't want to burden the webserver too much. Your task is to change the code to limit the crawler to at most one page per second, while maintaining concurrency (in other words, Crawl() must be called concurrently)

Đại loại là có 1 cái crawler nhưng bạn phải limit nó sao cho chỉ có nhiều nhất chỉ crawl 1 page/s thôi.

Họ có đưa 1 link hint: [https://github.com/golang/go/wiki/RateLimiting](https://github.com/golang/go/wiki/RateLimiting) 

Đọc đã rồi xem code được luôn không.
```go
package main

import (
	"fmt"
	"sync"
	"time"
)
func Crawl(url string, depth int, wg *sync.WaitGroup, throttle <-chan time.Time) {
	defer wg.Done()

	if depth <= 0 {
		return
	}

	body, urls, err := fetcher.Fetch(url)
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Printf("found: %s %q\n", url, body)

	wg.Add(len(urls))
	for _, u := range urls {
		// Do not remove the `go` keyword, as Crawl() must be
		// called concurrently
		<-throttle
		go Crawl(u, depth-1, wg, throttle)
	}
	return
}

func main() {
	var wg sync.WaitGroup
	rate := time.Second
	throttle := time.Tick(rate)

	wg.Add(1)
	Crawl("http://golang.org/", 4, &wg, throttle)
	wg.Wait()
}
```
## 1. Producer-Consumer Scenario
Vẫn như cũ đọc thử đề cái:

[https://github.com/loong/go-concurrency-exercises/tree/master/1-producer-consumer](https://github.com/loong/go-concurrency-exercises/tree/master/1-producer-consumer)

> The producer reads in tweets from a mockstream and a consumer is processing the data to find out whether someone has tweeted about golang or not. The task is to modify the code inside `main.go` so that producer and consumer can run concurrently to increase the throughput of this program.

Bài này về streaming, họ muốn mình dùng concurrency cho producer và consumer để tăng tốc độ xử lý, mấy cái vớ vẩn kiểu tweets bla bla cho vào cho đề nó dài thôi.
```go
package main

import (
	"fmt"
	"time"
)

func producer(stream Stream, tweets chan<- *Tweet) {
	for {
		tweet, err := stream.Next()
		if err == ErrEOF {
			close(tweets)
			return
		}
		tweets <- tweet
	}
}

func consumer(tweets <-chan *Tweet) {
	for {
		t, e := <- tweets
		if !e {
			break
		}
		if t.IsTalkingAboutGo() {
			fmt.Println(t.Username, "\ttweets about golang")
		} else {
			fmt.Println(t.Username, "\tdoes not tweet about golang")
		}
	}
}

func main() {
	start := time.Now()
	stream := GetMockStream()
	tweets := make(chan *Tweet)
	go producer(stream, tweets)
	consumer(tweets)
	fmt.Printf("Process took %s\n", time.Since(start))
}
```
Không chuẩn lắm, nhưng vẫn ra 1.9s như đề bài rồi.
# Kết

Than phiền chút vậy, thực sự mình đầu óc không thông minh lắm, tầm tầm thôi, làm mấy cái mới mới kiểu này thực sự khó, nhiều cái vớ vẩn nghĩ mãi không hiểu, mà người khác chốc chốc là làm được. Được cái nhớ tốt, cái gì trải qua rồi thì sẽ nhớ, thế nên chăm chỉ vẫn trụ được với nghề này. Lúc gặp cái gì khó có thể họ tìm ra nhanh hơn mình nhưng mình còn tìm ra cách giải quyết từ khi họ còn chưa biết đến vấn đề, HEHE.