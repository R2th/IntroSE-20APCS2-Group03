![](https://images.viblo.asia/d19e7069-6ab6-485a-bf9f-404f5646eefd.jpg)
### Lời nói đầu

Một trong những điều mình thính nhất ở Golang, đó là chúng ta có thể dễ dàng sử dụng Go để tạo nên các `CLI` tools. Build ra file binary và chạy chúng ở bấy kỳ đâu. <br/>
Tha hồ tạo nên các command chạy trên terminal một cách độc đáo và không đụng hàng với ai cả ^^
<br/>
Trong bài viết ngày hôm nay, mình xin phép giới thiệu viết một CLI tool đơn giản để nghe nhạc từ terminal như đã nói ở trên.<br/> 
Ứng dụng chúng ta sẽ tạo có dạng như dưới đây: <br/>  
![](https://images.viblo.asia/cb845802-73a5-449f-b5f6-de508fa3ef1e.gif)

### Tạo command hello đơn giản
Các ứng dụng viết bằng Golang được build thành file binary và đem chạy ở bất cứ đâu một cách dễ dàng. Ta hãy nhìn một chương trình hello world nhỏ dưới đây 

```go
package main 

import "fmt"

func main(){
	fmt.Println("Hello Viblo")
}
```

Ta build chương trình trên thành file binary bằng lệnh
```bash
go build -o hello main.go
```
Sau lệnh trên, trong thư mục chứa file `main.go` ta sẽ thấy xuất hiện một file binary `hello`
Cũng trong thư mục đó, thực thi file này, ta sẽ xuất ra được dòng chữ `Hello Viblo` như kỳ vọng.
```shell
./hello 
```
Nếu bạn dùng Ubuntu, để có thể thực thi file binary này ở bất cứ đâu (mà không cần phải cd vào folder chứa nó và chạy `./hello` như trên). Ta chỉ cần chuyển file binary này vào `/usr/local/bin` hoặc `/usr/bin` . Nhưng theo mình thì nên chuyển vào `/usr/local/bin` hơn:
```bash
sudo mv ~/dung_dan_toi_file_binary /usr/local/bin
// Cấp quyền thực thi cho file
sudo chmod +x /usr/local/bin/hello
```
là chúng ta đã có thể mở terminal lên và chạy lệnh `hello` từ bất kỳ đâu.

![](https://chatpp-stickers.firebaseapp.com/memes/content.png)
### Tạo command nghe nhạc
Bây giờ chúng ta đã có thể hình dung một cách cơ bản làm thế nào để tạo một command với Go rồi nhỉ ?

*1. Viết chương trình*

*2. Build ra file binary*

*3. Chuyển vào /usr/local/bin*

*4. Cấp quyền thực thi cho nó*
<br/>
<br/>

**Dưới đây là một số packages mà mình sẽ sử dụng**

![GitHub Logo](https://i.imgur.com/2XnAJVE.gif)
1. [github.com/hajimehoshi/oto](https://github.com/tosone/minimp3) - Package này để Decode mp3
2. [github.com/dimiro1/banner](https://github.com/dimiro1/banner) - Package này để tạo banner show ra mỗi khi chương trình bạn thực thi (Chữ TRUONGDANG như ảnh gif ở đầu bài viết)
3. [github.com/janeczku/go-spinner](https://github.com/janeczku/go-spinner) - Package này để tạo spinner (Là cái que quay tròn ở trên hình, hay lúc chạy npm, yarn, composer..v.v cũng hay có các thanh hiệu ứng chạy chạy đó)
4. [flag](https://golang.org/pkg/flag/) Package này để tạo các commad - flag mình sẽ ví dụ ở dưới
5. Và một số package buid-in cơ bản của Go 

**flag**

[flag](https://golang.org/pkg/flag/) là một package hết sức nổi tiếng của Golang. Package này hỗ trợ chúng ta tạo các flags ở command. Ví dụ như thế này:

```
--song=havana
--path=/home/balbla
--name=truongdang
----shuffle=on
```
Chúng ta sẽ sử dụng `flag` để tạo những commad flags như ví dụ trên. Mặc dù chúng ta có thể sử dụng `os.Args[]` từ `os` package. Nhưng dùng flag tiện hơn nhiều. Trường hợp CLI bé chỉ có khoảng 1-2 key word thì dùng `os.Args[]` rồi check. Còn không dùng flag cho tiện. Vì khi tạo flags, `flag` hỗ trợ tạo sẵn luôn `-h` cho chúng ta. Nghĩa là, khi người dùng gõ `your_cli -h` thì show ra các flag keywords và ý nghĩa của chúng. 
Ví dụng dưới đây tạo các flag `--shuffle` và `--song`. 
* `--song` khi gõ `-h` sẽ cho người dùng biết là `Song name` - tên bài hát
* `--shuffle` - Turn on shuffle mode. Bật tắt chế độ shuffle
* ..v..v
```go
    var song string
	var shuffle string

	flag.StringVar(&song, "song", "", "Song name")
	flag.StringVar(&shuffle, "shuffle", "off", "Turn on shuffle mode")
	flag.Parse()
```

**Tạo banner**

Ta cần tạo một file (tên là gì cũng được) ví dụ `banner.txt`. Có nội dung là dòng banner ta cần hiển thị ra ở định dạng ASCII.
Bạn có thể dễ dàng tạo một dòng chữ như thế ở trang này:
[http://patorjk.com](http://patorjk.com/software/taag/#p=display&f=Big&t=Banner)

Nhập vào dòng banner của bạn, và copy dòng text đã chuyển sang ASCII về file banner.txt của chúng ta. <br/>Sau đó sử dụng package `github.com/dimiro1/banner` - như đã nói ở trên (bạn nên xem qua package này chút nhé ). Đọc và in nội dung file banner này ra màn hình. Nếu bạn muốn xem qua đoạn code show banner thì nó đại khái như dưới đây:
```go
func displayBanner() {
	if _, fileErr := os.Stat("/tmp/banner.txt"); os.IsNotExist(fileErr) {
		bannerTxtBytes := MustAsset("banner.txt")
		errRewrite := ioutil.WriteFile("/tmp/banner.txt", bannerTxtBytes, 0777)
		if errRewrite != nil {
			fmt.Println(errRewrite)
		}
	}
	in, _ := os.Open("/tmp/banner.txt")
	fmt.Println()
	banner.Init(colorable.NewColorableStdout(), true, true, in)
	fmt.Println()
}
```

Tuy nhiên, việc đọc và xuất banner mới chỉ là một phần. Trường hợp người dùng tải về và sử dụng ứng dụng của chúng ta. Họ chỉ cần mang một file binary duy nhất về chạy, không thể nào bắt họ phải tự tạo lấy một file `banner.txt` rồi điền nội dung banner của chúng ta vào đấy được. Hoặc không, kể cả khi tải về ứng dụng. Ngoài việc tải tải file binary họ tải thêm một file banner thôi cũng quả là khó chịu. <br/>
Về việc này, giải pháp của mình là người dùng tải về và chạy ứng dụng lần đầu tiên. Mình sẽ tạo ra file `banner.txt` vào folder `tmp` các lần chạy sau đó chỉ cần lấy ra dùng. Folder `tmp` thì các dữ liệu sinh ra trong đó sẽ bị reset mỗi lần người dùng khởi động lại máy. Nên mỗi lần chạy ta kiểm tra xem có file đấy chưa, chưa có thì tạo. Có rồi thì lấy ra dùng... 

Tuy có hơi phức tạp hơn một chút vì các lần chạy sau vẫn phải check file tồn tại. Nhưng mình thấy là để vào `tmp` tốt hơn là để vào các folder khác. Trường hợp họ vào `/usr/local/bin` xóa mất file binary của chúng ta, thì khi khởi động lại file `banner.txt` cũng tự mất. Đỡ mắc công họ bị giữ lại một file không đáng có mà họ cũng không biết đến.<br/>

<br/>**Đọc file .mp3 và chơi nhạc**

<br/>Thực ra phần này, phần công việc của mình chẳng có gì đáng kể. Mình chỉ dùng package, truyền đường dẫn file nhạc vào và...tiếng nhạc phát ra (yaoming)(khoc2)<br/>
Mặc định mình quét nhạc trong folder `Music `ra phát nên mọi thứ rất đơn giản. Chứ không phải là người dùng gõ tên bài hát rồi mình crawl bài hát trên mạng về phát nhé. Như thế thì bá hơn nhiều rồi ![monion](https://chatpp.thangtd.com/img/emoticons/facepalm.gif)

Đoạn code phát nhạc như dưới đây:

```go

func playSong(song, songPath string) {
	if _, err := os.Stat(songPath); err == nil {
		s := spinner.StartNew(song + " now playing... ♪ ♫ ♬ ")
		var file, _ = ioutil.ReadFile(songPath)
		dec, data, _ := minimp3.DecodeFull(file)
		player, _ := oto.NewPlayer(dec.SampleRate, dec.Channels, 2, 2048)
		player.Write(data)
		s.Stop()
	} else {
		fmt.Println(song + "\033[0;0H song could not be found !")
	}
}
```
À, có thể bạn chú ý đến lệnh `fmt.Println` ở trên có dòng `033[0;0H ` nó là mã ANSI colors để  khi ta in chữ ra terminal có màu cho đẹp. Mã trên là màu xanh thì phải...

**go-bindata**

Vậy là ta đã đi qua tìm hiểu một số bước quan trọng. Từ tạo banner đến tạo command flags và rồi phát nhạc. Còn một vấn đề nữa là bind-data... Golang chỉ hỗ trợ chúng ta build các file có định dang `.go` thành file binary. Ứng dụng của chúng ta còn một file nữa đó là file `banner.txt` không thể build như file `.go` được. Vì vậy ta phải sử dụng một package tên là [go-bindata](https://github.com/jteeuwen/go-bindata). Package này đại khái sẽ đọc file `banner.txt` của chúng ta. Sau đó chuyển đổi vào một `slice` trong một file nếu không chỉ định tên thì mặc định là `bindata.go`...
Ở ứng dụng của chúng ta, ta sẽ sữ dụng go-bindata để mang file banner.txt gốc vào commplie thành một file binnary duy nhất. Khi người dùng chạy thì ta sử dụng dữ liệu đã build để ghi nó ra thành file banner.txt trong folder `tmp` của người dùng như đã nói ở trên...

### Kết bài
Qua bài viết trên, mình muốn giới thiệu cách build một command đơn giản với GO. Cụ thể là một command để chơi nhạc từ terminal. Và các package, công đoạn cần thiết. Code nếu copy hết vào bài viết thì sẽ rất dài nên mình chỉ có thể giới thiệu qua một số package cần sử dụng cũng như một số công đoạn cần làm...<br/>
Hy vọng có thể hữu ích cho bạn nào cần build một CLI tool bằng Go mà chưa biết bắt đầu từ đâu. Source code nếu bạn muốn lấy xem qua thì vào profile của mình rồi đến trang github ý.

Cám ơn bạn vì đã giành thời gian xem bài viết của mình ^^

![minions](https://i.imgur.com/3Q686p3.gif)