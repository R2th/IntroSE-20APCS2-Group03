### Mở đầu
Trước mình có viết một bài nhỏ về việc ứng dụng Google AMP cho trang web. Do mình làm trang web trước, có đầy đủ các dữ liệu ngon lành, chạy một thời gian rồi mới tìm đến việc tích hợp AMP vào. Thành ra sau một thời phiên bản AMP đi vào hoạt động và được google đánh index thì nảy ra một vấn đề nhỏ như hình dưới đây
![](https://images.viblo.asia/3a9a1cfd-5d91-4086-9281-7d5de4a1da2d.png)
Theo quy định của google AMp thì kích thước hình ảnh trên trang, chiều rộng không được nhỏ hơn 1200px (bạn có thể xem lỗi này tại đây https://support.google.com/webmasters/answer/7478053 ). 

Mặc dù đây chỉ là warning thôi, các trang AMP bị warning này vẫn sẽ được tính và hiển thị như bình thường. Nhưng rõ ràng nó không phải là một trang AMP hoàn hảo. Và vì thế khiến mình hơi bứt rứt, nên mình quyết định resize các ảnh hiện tại về kích thước tối thiểu như quy định của Google là 1200px. 

Nhưng việc này tương đối mất thời gian, tại lúc đầu mình làm bằng tay cơ, tải ảnh về xong chỉnh lại kích thước ảnh xong lại upload lên lại. Mà có cả trăm bài viết, mỗi bài viết có 2-3 cái ảnh chứ phải ít đâu. Làm như vậy mất thời gian quá. Nên mình đành viết một cái tool hàng loạt cho khỏe...

### awesome-go

Mục đích là để sử dụng lại một cái tool cho nhiều hơn một trang web trên các server khác nhau, nên mình nghĩ cách tốt nhất là ngồi viết một cái tool CLI - như vậy trên các server khác nhau chỉ cần dùng curl để tải nó về và chạy thôi. Chứ nếu viết bằng PHP vào trong source mỗi trang riêng rẽ thì không hay lắm. Vì như vậy mỗi trang lại update source code riêng biệt mắc công, trong khi trang tuy khác nhau nhiều nhưng hình ảnh vẫn được lưu trong `public/storage/images` và có đường dẫn ảnh được lưu bởi một trường có tên giống nhau trong DB. Vậy nên dùng một cái tool độc lập chỉ xài đến đường dẫn ảnh trong DB là hay nhất. Với cả sử dụng go thì có thể tiết kiệm thời gian hơn bởi khả năng thực hiện resize ảnh đa luồng thì với khoảng 2000 - 3000 bức ảnh rõ ràng là có nhiều lợi thế hơn nếu viết bằng PHP... 

Tiếp theo là lựa chọn một package, cái này cũng không khó lắm. Chỉ cần vào [awesome-go](https://github.com/avelino/awesome-go#images) - Một repository trên github tổng hợp tất cả nhưng package hay ho nhất của Go. Và được phân loại theo từng nhóm chức năng rất hữu dụng. Chỉ cần kéo xuống phần [images](https://github.com/avelino/awesome-go#images) và dạo qua một vòng các package trong đó. Mình chọn được [imaging](https://github.com/disintegration/imaging) - package này được nhiều start nhất và sau khi chạy thử mình thấy cách sử dụng cũng rất đơn giản và phù hợp với mục đích của mình. Và dưới đây là đoạn code chính của chương trình thực hiện resize ảnh của mình:


```go
package main

import (
	"database/sql"
	"fmt"

	"github.com/disintegration/imaging"
	_ "github.com/go-sql-driver/mysql"
)

type Post struct {
	Id    int
	Image string
}

type Resut struct {
	Message string
	Error   error
}

func main() {
	images := GetImageFromDB()
	c := make(chan Resut)

	for _, image := range images {
		go Resize(image.Image, c)
		fmt.Println("%v", <-c)
	}

}

// Connect DB
func DBConn() (db *sql.DB) {
	dbDriver := "mysql"
	dbUser := "root"
	dbPass := "789852"
	dbName := "viblo_resize"
	db, err := sql.Open(dbDriver, dbUser+":"+dbPass+"@/"+dbName)
	if err != nil {
		panic(err.Error())
	}
	return db
}

// Query tat car bai viet va lay ra truong img
func GetImageFromDB() (images []Post) {

	db := DBConn()
	defer db.Close()
	rows, err := db.Query("SELECT id, img FROM posts")
	if err != nil {
		fmt.Println("There is no image found!")
		panic(err.Error())
	}

	post := Post{}

	for rows.Next() {
		var id int
		var img string

		err = rows.Scan(&id, &img)
		if err != nil {
			panic(err.Error())
		}

		post.Id = id
		post.Image = img

		images = append(images, post)
	}

	return
}

func Resize(image string, c chan Resut) {

	r := Resut{}

	src, err := imaging.Open(image)

	if err != nil {
		r.Message = "failed to open image: " + image
		r.Error = err
		c <- r
	}

	// resize sang kích thước 1200px chiều rộng và chiều cao tự động
	src = imaging.Resize(src, 1200, 0, imaging.Lanczos)

	// Lưu đè luôn bằng tên file cũ
	err = imaging.Save(src, image)
	if err != nil {
		r.Message = "failed to save image:" + image
		r.Error = err
		c <- r
	} else {
		r.Message = "Success resize image: " + image
		r.Error = err
		c <- r
	}
}

```

Như chúng ta có thể thấy, đoạn chương trình trên khá ngắn gọn và đơn giản, nhưng nhìn chung đáp ứng được nhu cầu của mình. Hơn nữa, việc resize các ảnh được thực hiện song song (vì server của mình có 2 core, có thể thực hiện cùng lúc nhiều ảnh hơn nữa nếu server có nhiều core hơn)... Như vậy càng nhiều ảnh thì thời gian chênh lệch và tiết kiệm càng rõ ràng so với phương án viết thành artisan command ban đầu.

Cuối cùng chỉ cần build nó thành binary và chuyển vào `/usr/local/bin` nữa là chạy CLI này một cách ngon lành (Bạn có thể muốn xem qua bài viết tạo một CLI nghe nhạc này của mình https://viblo.asia/p/tao-cli-tool-nghe-nhac-tu-terminal-bang-golang-gAm5yjxDKdb có chi tiết hơn một chút phần tạo một CLI)

### Kết luận

Vậy là chỉ với một đoạn code ngắn, mình đã có thể giải quyết vấn đề mà nếu làm thủ công thì rất mất thời gian. Bằng việc sử dụng thêm [Flag](https://golang.org/pkg/flag/) để custom tham số đầu vào cho tool như các thông số connect db, hay lựa chọn resize một hay nhiều ảnh tùy ý. Ví dụ như `resize --once=avata.jpg` hay `resize --all --dbname=red --dbpass=blue` chẳng hạn... Thì việc viết tool một lần và chạy ở nhiều nơi là rất tiện và thuật lợi.

Cuối cùng, cảm ơn bạn đã giành thời gian cho mình. Thú thực mình học Go kiểu tay ngang và ít có cơ hội đem ra dùng. Nên có điểm gì chưa được tốt, rất mong nhận được sự góp ý ở cuối bài viết ^^


![](https://i.imgur.com/3Q686p3.gif)