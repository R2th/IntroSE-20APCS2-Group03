Chào mọi người :)
Lâu lâu ta lại gặp nhau 1 lần, để tiếp tục series chia sẻ kiến thức về tech, hôm nay mình sẽ tìm hiểu và chia sẻ về 1 ngôn ngữ đang khá hot trong cộng đồng IT đó là `Golang`.

Như mọi người đã biết `Golang` là một ngôn ngữ do Google thiết kế và phát triển. Nó được kỳ vọng sẽ giúp ngành công nghiệp phần mềm khai thác nền tảng đa lõi của bộ vi xử lý và hoạt động đa nhiệm tốt hơn. Chính vì vậy nó có tốc độ xử lý cực nhanh và được ưa dùng trong những dự án lớn, đòi hỏi tốc độ xử lý cao trong xu hướng công nghệ hóa 4.0.

Hôm nay mình có làm ví dụ nhỏ về clone data của bing để xem cách `Golang` hoạt động và độ khó như thế nào, mời mọi người cùng đọc và thực hành nhé.
## I. Setup golang
### 1.1 Tải golang
Mở terminal lên và download golang bằng lệnh sau:
```
tar -C /usr/local -xzf go1.15.7.linux-amd64.tar.gz
```
Lệnh này sẽ download file cài đặt golang dưới dạng tar.gz và cài đặt luôn.

### 1.2. Thêm PATH
Thêm biến PATH cho golang mục đích là để khi ta gõ lệnh `go` sẽ tự động run được `golang`
Mở file `.bashrc` bằng lệnh:
```
nano ~/.bashrc
``` 
và thêm vào dưới cùng của file lệnh export PATH:
```
export PATH=$PATH:/usr/local/go/bin
```
Sau đó chạy lệnh dưới để load lại bashrc
```
source ~/.bashrc
```
Như vậy biến PATH của mình đã được thêm vào thành công.

### 1.3 Kiểm tra
Để kiểm tra xem quá trình cài đặt có thành công hay không? và version golang đang sử dụng là bao nhiêu? các bạn chạy lệnh dưới đây:
```
go version
```

Sau khi chạy lệnh kiểm tra, bạn sẽ thấy được version của mình
```
go version go1.15.7 linux/amd64
```

Như vậy đã xong bước đầu tiên là cài đặt `golang`, tiếp đến mình sẽ khởi tạo project và cài đặt các `package`

Các bạn có thể truy cập trang chủ của `golang` để xem chi tiết cách cài đặt: [https://golang.org/doc/install](https://golang.org/doc/install)
## II. Install package
Tạo thư mục project của bạn ở bất cứ đâu và chạy các lệnh dưới để cài đặt package:
```
go get -u github.com/gocolly/colly 
```
```
go get -u github.com/go-sql-driver/mysql
```

Trong phạm vi của project này mình cài đặt 2 package là `gocolly/colly`, `go-sql-driver/mysql`
- `colly`: bạn có thể dễ dàng bóc tách dữ liệu có cấu trúc từ các trang web, có thể được sử dụng cho nhiều loại ứng dụng, như khai thác dữ liệu, xử lý hoặc lưu trữ dữ liệu. [Link github](https://github.com/gocolly/colly)
- `mysql`: Trình điều khiển driver mysql để thao tác với DB một cách thuận tiện và dễ dàng. [Link github](https://github.com/go-sql-driver/mysql)
2 package này khá hot và được sử dụng nhiều trong `golang` vì đáp ứng được nhu cầu của người dùng và dễ sử dụng.

Sau khi cài đặt xong, trong thư mục project của bạn sẽ tạo ra 1 file `go.mod`. File này tương tự như composer của PHP hay package.json của nodejs. Nó dùng để chứa tên các package, version dùng trong project.

Ok, xong phần setting, install package, mình sẽ bắt tay vào việc craw data từ bing.
## III. Starting craw
### 3.1 Mục tiêu
Quét dữ liệu từ url Bing: `https://www.bing.com/search?q=test.com` và lưu vào DB các thông tin `title`, `link`, `description`

![https://www.bing.com/search?q=test.com](https://images.viblo.asia/6f9ae689-5404-4650-9509-4629dad87838.png)

### 3.2 Craw bing data
Vì `golang` có cơ chế hoạt động sẽ bắt đầu từ hàm `main()` trong 1 file run chính nên mình sẽ tạo file `main.go` để làm file run chính cho project và function `main()`.

```
package main

import (
	"fmt" //Thư viện để print ra màn hình
	"log" //Thư viện để log
	"github.com/gocolly/colly" //Import thư viện colly craw data
)

type Data struct { //Khởi tạo struct Data chứa dữ liệu craw
    title string
    link string
    description string
}

func main() {
    crawl()
}

func crawl() {
	c := colly.NewCollector()

	c.OnRequest(func(r *colly.Request) { //Đang gửi request get HTML 
		fmt.Printf("Visiting: %s\n", r.URL)
	})

	c.OnError(func(_ *colly.Response, err error) { //Handle error trong quá trình craw html
		log.Println("Something went wrong:", err)
	})

	c.OnResponse(func(r *colly.Response) { //Sau khi đã lấy được HTML
		fmt.Printf("Visited: %s\n", r.Request.URL)
	})

	c.OnHTML(".b_algo", func(e *colly.HTMLElement) { //Bóc tách dữ liệu từ HTML lấy được
        data := Data{}
        data.title = e.ChildText("h2") //Tìm đến thẻ con h2 và lấy nội dung
        data.link = e.ChildText(".b_caption cite") //tìm đến thẻ con cite và lấy nội dung
        data.description = e.ChildText(".b_caption p") //Tìm đến thẻ con p và lấy nội dung
        fmt.Printf("- Title: %s\n- Link: %s\n- Description: %s\n", data.title, data.link, data.description) //In ra màn hình giá trị đã lấy được
    })

	c.OnScraped(func(r *colly.Response) { //Hoàn thành job craw
		fmt.Println("Finished", r.Request.URL)
	})

	c.Visit("https://www.bing.com/search?q=test.com") //Trình thu thập truy cập URL đó
}
```

Trong đoạn code trên mình đã sử dụng package `colly` để craw data, và đã giải thích trong từng line rồi, nó thực sự không quá khó, nếu các bạn muốn xem chi tiết hơn về việc bóc tách dữ liệu hãy tham khảo doc tại trang chủ colly: [http://go-colly.org/](http://go-colly.org/)

Run lệnh để thực thi:
```
go run main.go 
```

Và đây là kết quả craw:
![Run craw bing data](https://images.viblo.asia/dc05a05b-92b7-4e67-b60c-9b8c56551add.png)

## IV. Khởi tạo DB
Sau khi đã lấy được dữ liệu từ bing, mình sẽ khởi tạo database để thao tác với DB.
```
import (
	"fmt"
	"log"
	"github.com/gocolly/colly"
    
    "database/sql" //Thao tác với SQL
    "time" //Xử lý thời gian
	_ "github.com/go-sql-driver/mysql" //Tạo driver kết nối mysql
)

func dbConnection() (*sql.DB, error) {
    db, err := sql.Open("mysql", "root:root@tcp(127.0.0.1:3306)/golang_demo")
    if err != nil {
        log.Printf("Error %s when opening DB\n", err)
        return nil, err
    }

    db.SetMaxOpenConns(20)
    db.SetMaxIdleConns(20)
    db.SetConnMaxLifetime(time.Minute * 5)

    return db, nil
}
```

Ở đây mình đã sửa lại phần import, thêm  3 package và 1 function để khởi tạo kết nối database. 
Như vậy việc khởi tạo kết nối database mình thấy khá giống với nodeJs, chỉ khác 1 chút về xử lý lỗi, cách khai báo biến thôi.

## V. Insert database
Tiếp theo mình sẽ insert dự liệu đã craw được vào database.

```
func main() {
	db, err := dbConnection() //Khởi tạo biến conection
    if err != nil { //Catch error trong quá trình thực thi
        log.Printf("Error %s when getting db connection", err)
        return
    }
    defer db.Close()
    log.Printf("Successfully connected to database")

    crawl(db) //Thực thi craw
}

func crawl(db *sql.DB) { //Truyền thêm biến db với kiểu sql.DB vào function
    //Các nội dung cũ vẫn giữ nguyên
    c.OnHTML(".b_algo", func(e *colly.HTMLElement) {
        data := Data{}
        data.title = e.ChildText("h2")
        data.link = e.ChildText(".b_caption cite")
        data.description = e.ChildText(".b_caption p")
        fmt.Printf("- Title: %s\n- Link: %s\n- Description: %s\n", data.title, data.link, data.description)

        stmt, err := db.Prepare("INSERT bing_data SET title=?,link=?,description=?") //Prepare SQL cho việc insert
        checkErr(err) //Handle error

        res, err := stmt.Exec(data.title, data.link, data.description) //Binding data vào câu query
        checkErr(err) //Handle error

        lastId, err := res.LastInsertId() //Lấy ra ID vừa được insert

        if err != nil {
            log.Fatal(err)
        }

        fmt.Printf("=>Insert ID: %d\n\n", lastId) //In ra màn hình ID vừa insert
    })
}

func checkErr(err error) { //Thêm function để handle error
    if err != nil {
        panic(err)
    }
}
```

Thực thi lại file `main.go` để kiểm tra kết quả:

![Craw and insert into DB](https://images.viblo.asia/50edeb80-cb8c-46e9-89bd-2bb508333410.png)

Kiểm tra trong database:
![Database result](https://images.viblo.asia/f5e54364-24ae-4f90-87b5-08aaddc01909.png)

Done!
## VI. Kết luận
Như vậy đã hoàn thành quy trình craw và insert vào database rồi đó, với kiến thức hạn hẹp của mình và những gì mình đã học được, đây là bài chia sẻ đầu tay của mình về `Golang`. 

Hy vọng qua bài viết này sẽ giúp các bạn hiểu và biết thêm 1 chút gì đó về craw data và insert dữ liệu với `golang` như thế nào.

Theo cá nhân mình thấy `golang` thực thi thực sự rất nhanh, cách viết cũng không quá cầu kỳ, và tạo project cũng very fastttt :D  Hãy cùng bắt tay vào và code thử xem nhé!

Thanks you!

### Tham khảo
1. https://medium.com/@hugo.bjarred/mysql-and-golang-ea0d620574d2
2. https://zetcode.com/golang/mysql/
3. https://astaxie.gitbooks.io/build-web-application-with-golang/content/en/05.2.html
4. https://golang.org/