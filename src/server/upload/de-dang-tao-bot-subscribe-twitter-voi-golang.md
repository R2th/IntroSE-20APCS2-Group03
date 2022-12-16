![](https://images.viblo.asia/432596ca-d2d9-4331-994f-726a54467f34.png)

Chẳng là đợt này mình đang định làm một con bot follow các trang tin nối tiếng trên Twitter. Nên cũng có vọc vạch tìm hiểu các API về thằng Twitter này tiện thể làm quen với Golang luôn. Thì hôm nay mình sẽ xin được chia sẻ với mọi người những gì mình mới tìm hiểu được...Let's go

# Giới Thiệu
Sau khi đọc qua đống API của Twitter thì mình đã tìm ra cách để follow real-time các trang tin mong muốn. Đó là Twitter có cung cấp cho chúng ta một cái gọi là `Stream` để ta có thể subscribe liên tục và có thể set điều kiện filter cho thằng stream này. Mình sẽ thử demo nhẹ một cái stream thả cửa như sau :D :D :D 

![](https://images.viblo.asia/15f8a775-dc2f-4fca-9099-cc3b43e9e3d3.png)

Đây là khi chúng ta không đặt điều kiện filter gì cho connect stream, nên nó sẽ get tất cả các tweet, retweet, quote public mà nó nghe được.

Khi tìm hiểu về các ví dụ và các tutorial trong docs của Twitter thì mình cũng tìm thấy một thư viện khá hay và tiện dụng được viết bằng golang. Nó hỗ trợ rất nhiều trong API của Twitter sẽ giúp chúng ta tiết kiếm được thời gian phát triển. Đó **[go-twitter](https://github.com/dghubble/go-twitter)** do một tech lead của Twitter phát triển **[Dalton Hubble](https://github.com/dghubble)**, thư viện thì hỗ trợ rất nhiều tính năng như sau


![](https://images.viblo.asia/31d58c0a-ae62-4034-b7ce-012c9cac4540.png)

Trên đây là phần giới thiệu qua về thư viện mà chúng ta sẽ sử dụng và bây giờ hãy cùng bắt tay xây dựng con bot nha

# Triển khai 

Trước khi có thể thực hiện được các tác vụ với Twitter thì bạn cần phải tạo một tài khoản developer trên Twitter bằng cách truy cập đường link sau https://developer.twitter.com/en/apply-for-access và thực hiện các bước như bên dưới :

1. 
![](https://images.viblo.asia/ae1a5f15-4514-455c-95b0-02f6cb25ccce.png)

2.
![](https://images.viblo.asia/3c1daa7b-0118-4961-8b7f-471a8266d849.png)

3.
![](https://images.viblo.asia/89f491e7-828a-4bb5-b845-77e5aa809d5a.png)

4.
![](https://images.viblo.asia/28598d24-bffb-49dd-ac85-efb8e029840a.png)

5.
![](https://images.viblo.asia/0e104a0e-2f57-4c69-957a-08cfe0147b12.png)

6.
![](https://images.viblo.asia/105adf1b-e30d-42d8-9d06-fee765bf5733.png)

7.
![](https://images.viblo.asia/0e926bf8-908d-4e2e-947c-35feb86235e2.png)

Xong bước này rồi thì phải ăn xôi đứng chờ bên Twitter họ duyệt cho thôi, à tầm mấy hôm mới được duyệt đấy nên anh cứ vừa ăn xôi vừa thư giãn thoải mái mà đợi :sweat_smile::sweat_smile::sweat_smile:

&nbsp;

#### Khởi tạo project

 Nếu bạn nào đã có tài khoản developer trước đó rồi thì ta đi vào triển thôi. Đầu tiên là khởi tạo một project golang tạo một thư mục `bot-twitter` sau đó khởi tạo một module path và tạo một file `main.go`
 
 ```shell
    go mod init nghia/botnews
 ```

 
 ```go
// main.go

    package main

    import "fmt"

    func main() {
        fmt.Println("Hello, world.")
    }
 ```
 
 Test thử kết quả : ![](https://images.viblo.asia/b8b7ce1a-423f-4212-90dd-e986ec12a616.png)
 
&nbsp;

#### Thiết lập Stream 

Bây giờ cần cài đặt thư viện để sử dụng 

```shell
    go get github.com/dghubble/go-twitter/twitter
```

Setup stream giống với example của `go-twitter`

```go
    package main

    import (
        "flag"
        "fmt"
        "log"
        "os"
        "os/signal"
        "syscall"

        "github.com/coreos/pkg/flagutil"
        "github.com/dghubble/go-twitter/twitter"
        "github.com/dghubble/oauth1"
        "github.com/joho/godotenv"
    )

    func main() {

        //Load env
        err := godotenv.Load()
        if err != nil {
            log.Fatal("Error loading .env file")
            fmt.Println("Error loading .env file")
        }

        flags := flag.NewFlagSet("user-auth", flag.ExitOnError)
        consumerKey := flags.String("consumer-key", os.Getenv("CONSUMER_KEY"), "Twitter Consumer Key")
        consumerSecret := flags.String("consumer-secret", os.Getenv("CONSUMER_SECRET"), "Twitter Consumer Secret")
        accessToken := flags.String("access-token", os.Getenv("ACCESS_TOKEN_KEY"), "Twitter Access Token")
        accessSecret := flags.String("access-secret", os.Getenv("ACCESS_TOKEN_SECRET"), "Twitter Access Secret")
        flags.Parse(os.Args[1:])
        flagutil.SetFlagsFromEnv(flags, "TWITTER")

        if *consumerKey == "" || *consumerSecret == "" || *accessToken == "" || *accessSecret == "" {
            log.Fatal("Consumer key/secret and Access token/secret required")
        }

        config := oauth1.NewConfig(*consumerKey, *consumerSecret)
        token := oauth1.NewToken(*accessToken, *accessSecret)
        // OAuth1 http.Client will automatically authorize Requests
        httpClient := config.Client(oauth1.NoContext, token)

        // Twitter Client
        client := twitter.NewClient(httpClient)

        // Convenience Demux demultiplexed stream messages
        demux := twitter.NewSwitchDemux()
        demux.Tweet = func(tweet *twitter.Tweet) {
            fmt.Println("+-----------------------------------------------------------------------------------+")
            fmt.Println("| ")
            fmt.Println(tweet.Text)
            fmt.Println("| ")
            fmt.Println("+-----------------------------------------------------------------------------------+")
            fmt.Println("\n")
        }
        demux.DM = func(dm *twitter.DirectMessage) {
            fmt.Println(dm.SenderID)
        }
        demux.Event = func(event *twitter.Event) {
            fmt.Printf("%#v\n", event)
        }

        fmt.Println("Starting Stream...")

        // FILTER
        filterParams := &twitter.StreamFilterParams{
            Track:         []string{"cat"},
            StallWarnings: twitter.Bool(true),
        }
        stream, err := client.Streams.Filter(filterParams)
        if err != nil {
            log.Fatal(err)
        }

        // USER (quick test: auth'd user likes a tweet -> event)
        // userParams := &twitter.StreamUserParams{
        // 	StallWarnings: twitter.Bool(true),
        // 	With:          "followings",
        // 	Language:      []string{"en"},
        // }
        // stream, err := client.Streams.User(userParams)
        // if err != nil {
        // 	log.Fatal(err)
        // }

        // SAMPLE
        // sampleParams := &twitter.StreamSampleParams{
        // 	StallWarnings: twitter.Bool(true),
        // }
        // stream, err := client.Streams.Sample(sampleParams)
        // if err != nil {
        // 	log.Fatal(err)
        // }

        // Receive messages until stopped or stream quits
        go demux.HandleChan(stream.Messages)

        // Wait for SIGINT and SIGTERM (HIT CTRL-C)
        ch := make(chan os.Signal)
        signal.Notify(ch, syscall.SIGINT, syscall.SIGTERM)
        log.Println(<-ch)

        fmt.Println("Stopping Stream...")
        stream.Stop()
    }

```

Đặt các biến môi trường

```json
// .env

CONSUMER_KEY= <App Key === API Key === Consumer API Key === Consumer Key === Customer Key === oauth_consumer_key>
CONSUMER_SECRET= <App Key Secret === API Secret Key === Consumer Secret === Consumer Key === Customer Key === oauth_consumer_secret>
ACCESS_TOKEN_KEY= <Access token === Token === resulting oauth_token>
ACCESS_TOKEN_SECRET= <Access token secret === Token Secret === resulting oauth_token_secret>
BEARER_TOKEN= < $BEARER_TOKEN > 
```

Chạy thử cái coi sao

![](https://images.viblo.asia/c51425f8-f177-44cb-b1c3-e5152a034334.png)

ok chạy rồi dù chưa có bộ lọc nên chạy hơi tung tóe

&nbsp;

#### Tạo bộ lọc

Phần này chúng ta sẽ tìm hiểu một chút về bộ lọc của stream. Đầu tiên ta sẽ thử xem bộ lọc `StreamFilterParams` xem sao nha

![](https://images.viblo.asia/a4e024f9-4396-47b0-8602-f4de83bce6bd.png)

Nó có các tham số như `FilterLevel`, `Follow`, `Language`, `Locations`, `StallWarnings`, `Track` thì ta sẽ tìm hiểu xem vậy các tham số nay có tác dụng gì

**Parameters** 
| Name | Required | Description |
| -------- | -------- | -------- |
| follow     | optional     | Là danh sách các id người dùng sẽ theo dõi, sẽ được phân tách bằng dấu phẩy |
| track     | optional     | Là các từ khóa sẽ theo dõi, các từ khóa cũng sẽ được phân tách bởi dấu phấy |
| locations     | optional     | Ví trị của tin |
| stall_warnings     | optional     | Chỉ định xem có nên gửi cảnh báo ngừng hoạt động hay không |
| language     | optional     | Là ngôn ngữ sử dụng |
https://sal.vn/v0jg4b

Và để xem chi tiết các thông số này chung ta có thể truy cập vào đường link này: https://sal.vn/DwDSNy

Sau khi tìm hiểu và sử dụng cho ứng dụng thì mình có một số chú ý cho các tham số mà chúng ta hay dùng như sau

- Tham số **Follow** thì nó sẽ theo dõi các tweet:
    - Tweets created by the user - Các tweet do chính ta đang theo dõi đăng
    - Tweets which are retweeted by the user - Các tweet được người dùng này tweet lại
    - Replies to any Tweet created by the user - Bất kỳ Replies tới tweet do người dùng này tạo
    - Retweets of any Tweet created by the user - Bất kỳ Retweets lại Tweet do người dùng này tạo
    - Manual replies, created without pressing a reply button - Bất Kỳ trả lời thủ công nào mà không cần tag `@`

- **Track** cần cẩn thận lọc sau khi truyền tham số này vào thì nó sẽ bắt tất cả các tweet, retweet, quote public mà thỏa mãn điều kiện nên nếu không lọc cẩn thận sau khi truyền tham số này server nhận rất nhiều spam
- Điều quan trọng hơn nữa đó là khi ta đưa các tham số  **Follow** và **Track** hoặc có thể nhiều tham số hơn thì chúng sẽ là phép "HOẶC - OR" chứ không phải là phép "VÀ - AND" đâu nha. Nên cũng cẩn thận lại nhận message liên hoàn cước :D :D :D ở phần sau đây mình sẽ hướng dẫn cách sử dụng công cụ trong `go-twitter` để lọc.

Trong `Go-Twitter` có một công cụ gọi là `Demux` nó được sử dụng để xử lý các message nhận về mình sẽ show ra cho mọi người nhìn nhá


```go
    // Convenience Demux demultiplexed stream messages
	demux := twitter.NewSwitchDemux()
	demux.Tweet = func(tweet *twitter.Tweet) {
		fmt.Println("+-----------------------------------------------------------------------------------+")
		fmt.Println("| ")
		fmt.Println("|---Coordinates:  ", tweet.Coordinates)
		fmt.Println("|---CreatedAt:  ", tweet.CreatedAt)
		fmt.Println("|---CurrentUserRetweet:  ", tweet.CurrentUserRetweet)
		fmt.Println("|---DisplayTextRange:  ", tweet.DisplayTextRange)
		fmt.Println("|---Entities:  ", tweet.Entities)
		fmt.Println("|---ExtendedEntities:   ", tweet.ExtendedEntities)
		fmt.Println("|---ExtendedTweet:   ", tweet.ExtendedTweet)
		...
		fmt.Println("|---Source:   ", tweet.Source)
		fmt.Println("|---Text:   ", tweet.Text)
		fmt.Println("|---Truncated:   ", tweet.Truncated)
		fmt.Println("|---User:   ", tweet.User)
		fmt.Println("|---WithheldCopyright:   ", tweet.WithheldCopyright)
		fmt.Println("|---WithheldInCountries:   ", tweet.WithheldInCountries)
		fmt.Println("|---WithheldScope:    ", tweet.WithheldScope)
		fmt.Println("| ")
		fmt.Println("+-----------------------------------------------------------------------------------+")
		fmt.Println("\n")
	}
	demux.DM = func(dm *twitter.DirectMessage) {
		fmt.Println(dm.SenderID)
	}
	demux.Event = func(event *twitter.Event) {
		fmt.Printf("%#v\n", event)
	}
    
	.....
    
```

![](https://images.viblo.asia/277fe9a0-81dd-440e-afc0-aecc611c04ef.png)


Khi đã có thể biết được những thông tin nào sẽ có thể nhận về, để biết rõ hơn về tên thuộc tính hay kiểu dữ liệu các bạn có thể dùng `vscode` tìm ra các `struct` của đối tượng trả về. Từ đó ta sẽ có thể thiết lập điều kiện lọc cho việc hiển thị hay bắn thông báo đến các nền tảng khác. Mình sẽ làm mẫu qua với bộ lọc của bot này nhá :

Chẳng hạn như ở đây tôi đang chỉ muốn lọc lấy các bài Tweet do người tôi đang theo dõi đăng hay các Retweet, Quote của người khác đăng lại bài viết của người mà đang được theo dõi thì điều kiện sẽ như sau. `InReplyToStatusID` = 0 là để loại bỏ các câu Reply, phần phân định `RetweetedStatus` khác `nil` có nghĩa đây là một bài Retweet lại, `tweet.RetweetedStatus` == `nil` và `tweet.QuotedStatus` != `nil` có nghĩa đây sẽ là một bài Quote, còn điệu kiện cuối cùng có nghĩa đây là một bài Tweet.

```go
    ...
   
    // Convenience Demux demultiplexed stream messages
	demux := twitter.NewSwitchDemux()
	demux.Tweet = func(tweet *twitter.Tweet) {
		if tweet.InReplyToStatusID == 0 { // Không phải Reply
        
			if tweet.RetweetedStatus != nil {
                // Đây là một Retweet
			} else if tweet.RetweetedStatus == nil && tweet.QuotedStatus != nil {
                // Đây là một bài Quote
			} else if tweet.RetweetedStatus == nil && tweet.QuotedStatus == nil && {
                // Đây là một bài Tweet
			}
		}
	}

    ...
```

Vậy là ta đã  thiết lập xong bộ lọc bây giờ sẽ biến tấu đi một chút bằng cách tạo thêm các route để thêm hoặc xóa các following và sau đó restart lại stream để nhận các kết quả mới. Nào chúng ta sẽ đi sang phần tạo route thay đổi stream nha

&nbsp;

#### Tạo route và thiết lập restart stream

Phần nay mình sẽ không sử dụng database mà sử dụng file để lưu trữ cho nó gọn nhẹ. Nên đầu tiên ta sẽ chuyển hóa phần filter fix cứng thành load từ file.

```go
    ...
    
    listFollowing, err := ioutil.ReadFile(".following")
	fmt.Println("listFollowing: ", strings.Split(string(listFollowing), ","))
	if err != nil {
		fmt.Println(err)
	}
    
    // FILTER
	filterParams := &twitter.StreamFilterParams{
		Follow:        strings.Split(string(listFollowing), ","),
		StallWarnings: twitter.Bool(true),
	}
	stream, err := client.Streams.Filter(filterParams)
	if err != nil {
		log.Fatal(err)
	}
    
    ...
```

Bây giờ để có thể restart lại stream mình sẽ thay vì để khởi tạo stream ở  hàm `main()` thành biến thành một hàm  riêng để có thể gọi lại việc khởi tạo stream.


https://sal.vn/IkGfMP

```go
    ...

    var StreamTwitter *twitter.Stream
    var Demux twitter.SwitchDemux
    
    ...

    func CreateStreamTwitter() {
        flags := flag.NewFlagSet("user-auth", flag.ExitOnError)
        consumerKey := flags.String("consumer-key", os.Getenv("CONSUMER_KEY"), "Twitter Consumer Key")
        consumerSecret := flags.String("consumer-secret", os.Getenv("CONSUMER_SECRET"), "Twitter Consumer Secret")
        
        ...
        // Convenience Demux demultiplexed stream messages
        Demux = twitter.NewSwitchDemux()
        
        ...
        // FILTER
        filterParams := &twitter.StreamFilterParams{
            Follow:        strings.Split(string(listFollowing), ","),
            StallWarnings: twitter.Bool(true),
        }
        StreamTwitter, err = client.Streams.Filter(filterParams)
        if err != nil {
            log.Fatal(err)
        }
    }

    ...
```

Phần restart stream sẽ chỉ cần gọi lại gàm `CreateStreamTwitter` thì stream mới sẽ được khởi tạo và lưu vào biến toàn cục `StreamTwitter`

Tiếp theo sẽ viết thêm 2 route thêm và xóa following. Trước tiên là cần khởi tạo một server http để nhận về các request sau đó viết các route thực hiện add/remove. Ở đây mình sẽ sử dụng `GET` để dễ dàng cho việc test trên trình duyệt

```go

    ...
    
    // Create stream twitter
	createStreamTwitter()
	go Demux.HandleChan(StreamTwitter.Messages)
    
	// Create server http
	fmt.Println("Starting Server")
	router := httprouter.New()
	router.GET("/", func(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
		fmt.Fprint(w, "Welcome!\n")
	})
	router.GET("/AddFollwing/:username", handleAddFollowing)
	router.GET("/RemoveFollwing/:username", handleRemoveFollowing)
	log.Fatal(http.ListenAndServe(":6868", router))
   
    ...
    
    //+-------------------------------------- Handle Request ----------------------------------------------+
    //|																									   |
    func handleAddFollowing(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
        username := p.ByName("username")
        userId := getUserIdFromUsernameTwitter(username)
        addToFile(userId, ".following")
    }
    func handleRemoveFollowing(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
        username := p.ByName("username")
        userId := getUserIdFromUsernameTwitter(username)
        removbeToFile(userId, ".following")
    }
    //|																									   |
    //+----------------------------------------------------------------------------------------------------+
    
    ...

    // Convenience Demux demultiplexed stream messages
	Demux = twitter.NewSwitchDemux()
	Demux.Tweet = func(tweet *twitter.Tweet) {
		if tweet.InReplyToStatusID == 0 {
			if tweet.RetweetedStatus != nil {
				println("\n")
				println("+---------------------------------- Retweet -------------------------------------------+")
				println("|																						|")
				println("|", tweet.RetweetedStatus.Text)
				println("|																						|")
				println("+--------------------------------------------------------------------------------------+")
				println("\n")
			} else if tweet.RetweetedStatus == nil && tweet.QuotedStatus != nil {
				println("\n")
				println("+----------------------------------- Quote --------------------------------------------+")
				println("|																						|")
				println("|", tweet.Text)
				println("|")
				println("|  +---------------------------------------------------------------------------------+ |")
				println("|  |                                                                                 | |")
				println("|  |", tweet.QuotedStatus.Text)
				println("|  |                                                                                 | |")
				println("|	+---------------------------------------------------------------------------------+ |")
				println("|																						|")
				println("+--------------------------------------------------------------------------------------+")
				println("\n")
			} else if tweet.RetweetedStatus == nil && tweet.QuotedStatus == nil {
				println("\n")
				println("+----------------------------------- Tweet --------------------------------------------+")
				println("|																						|")
				println("|", tweet.Text)
				println("|																						|")
				println("+--------------------------------------------------------------------------------------+")
				println("\n")
			}
		}

	}
```

Mình có thêm hàm sử dụng api để có thể từ `username` của người dùng Twitter mà tìm ra `userId` của người dùng và rồi đặt bộ lọc theo danh sách `userId` trong file `.following`.

```go
    ...

    func getUserIdFromUsernameTwitter(_username string) string {
        // URL request
        reqURL := "https://api.twitter.com/2/users/by/username/" + _username

        token := os.Getenv("BEARER_TOKEN")

        client := &http.Client{}

        request, err := http.NewRequest("GET", reqURL, nil)
        if err != nil {
            log.Fatalln(err)
        }

        request.Header.Set("Authorization", "Bearer "+token)

        resp, err := client.Do(request)
        if err != nil {
            log.Fatalln(err)
        }

        body, _ := ioutil.ReadAll(resp.Body)
        var info InfoUser
        error := json.Unmarshal(body, &info)
        if error != nil {
            return ""
        }
        return info.Data.Id
    }

    ...
```

Bây giờ chúng ta sẽ test thử bằng cách start server và gọi route từ trình duyệt 

- Add following

![](https://images.viblo.asia/14150544-c320-49c5-bbe2-7f0bb82d1da9.png)

![](https://images.viblo.asia/16468b01-57fa-4cc6-afc0-f759eac5e7a6.png)

-  Remove following

![](https://images.viblo.asia/46ffd664-5f71-4534-9a40-b1da91e096e2.png)

![](https://images.viblo.asia/aaaac83f-6a4d-4311-af2c-e01103ae3956.png)


# Tổng kết
Như vậy là chúng ta đã tạo ra được một con bot có khả năng subscribe Twitter những người ta muốn. Bài viết này mình mới chỉ dừng lại ở mức hiện thị ra màn hình console. Các bạn có thể cải tiến để thay vì hiển thị như thế nó có thể gửi message đến telegram, discord hay chatwork,... Ở bài viết sau mình cùng sẽ hướng dẫn cách mọi người kết hợp webhook của chatwork để bắt message cũng như nhân mệnh lệnh từ người dùng.


Code thì mình đã đẩy lên repo trên github mọi người có thể truy cập đường link sau để tham khảo, rất vui và hẹn gặp lại mọi người ở những bài viết tiếp theo : **https://github.com/ngovannghia1997kma/bot-twitter-golang**