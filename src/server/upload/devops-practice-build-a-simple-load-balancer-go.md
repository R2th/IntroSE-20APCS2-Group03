## Giới thiệu!
Đối với các bạn Senior Developer hoặc DevOps và Cloud Engineer thì khái niệm Load Balancer khá quen thuộc, nó là một thành phần không thể thiếu trong một hệ thống website lớn. Để tìm hiểu rõ hơn về cách hoạt động của Load Balancer thì ở bài này chúng ta sẽ tự xây dựng một Load Balancer đơn giản bằng Go.

![](https://images.viblo.asia/f249010f-b30c-4ce5-829f-d78fd672949a.png)

Bài này mình tham khảo từ bài [Let's Create a Simple Load Balancer With Go](https://kasvith.me/posts/lets-create-a-simple-lb-go/) của Kasun Vithanage.

## Load Balancers
Load Balancers là một cân bằng tải đóng vai trò thực hiện điều hướng yêu cầu của người dùng tới một trong các máy chủ phía sau nó.

Trong một hệ thống website lớn với hàng triệu người dùng thì chỉ một máy chủ không thể nào xử lý được toàn bộ yêu cầu của người dùng, do đó ta cần phải chạy nhiều máy chủ cùng một lúc, và load balancers sẽ đứng ở đằng trước các máy chủ này để hứng yêu cầu của người dùng và điều hướng yêu cầu đó tới các máy chủ phía sau nó. Load Balancers sẽ dùng một trong các thuật toán sau để điều hướng một yêu cầu:
+ Round Robin: gửi yêu cầu tới các máy chủ phía sau theo một cách tuần tự, sau đó lập lại từ đầu.
+ Least Connections: gửi yêu cầu tới máy chủ có ít kết nối nhất.
+ Least Time: gửi yêu cầu tới máy chủ trả lời nhanh nhất.
+ IP Hash: gửi yêu cầu tới máy chủ theo IP của người dùng.

Ở bài này ta sẽ viết lại load balancers với thuật toán *round robin*.

## Round Robin
Ở thuật toán này thì yêu cầu của người dùng sẽ được gửi lần lượt tới từng máy chủ, ví dụ như hình minh họa bên dưới. Từ giờ mình sẽ gọi yêu cầu là request và máy chủ là server cho dễ nhé.

![image.png](https://images.viblo.asia/f82ba46b-8aaf-4534-b716-c4085989d9c7.png)
*<div align="center">Image by [Jscape](https://www.jscape.com/blog/load-balancing-algorithms)</div>*

Ta có hai server, khi có request thứ nhất thì LB sẽ điều hướng request tới server thứ nhất, khi có request thứ hai thì LB sẽ điều hướng tới server thứ hai, sau đó có request thứ ba thì quay lại ban đầu là LB sẽ điều hướng tới server thứ nhất, đây là cách làm việc của *round robin*.

Thì lý thuyết chỉ đơn giản vậy thôi, tiếp theo ta sẽ bắt tay vào viết code.

## Implement
Tạo một file tên là `main.go` với đoạn code như sau:

```main.go
package main

import (
	"net/http/httputil"
	"net/url"
)

type Backend struct {
	URL          *url.URL
	Alive        bool
	ReverseProxy *httputil.ReverseProxy
}

type ServerPool struct {
	backends []*Backend
	current  uint64
}

func main() {

}
```

Ta khai báo hai kiểu dữ liệu struct là `Backend` và `ServerPool`.

Backend struct dùng để định nghĩa các server của ta, bao gồm ba thuộc tính:
+ URL để định nghĩa địa chỉ của server, ví dụ `localhost:8080`.
+ Alive để đánh đấu server còn sống hay không.
+ ReverseProxy (sẽ giải thích sau).

ServerPool struct dùng để lưu trữ các server mà Load Balancer sẽ điều hướng tới, bao gồm hai thuộc tính backends dùng để lưu server và current dùng để định nghĩa thứ tự server mà LB sẽ gửi request tới.

### ReverseProxy
Tài liệu của Go định nghĩa ReverseProxy như sau:

> ReverseProxy is an HTTP Handler that takes an incoming request and sends it to another server, proxying the response back to the client.

Dịch ra tiếng việt đơn giản thì ReverseProxy sẽ nhận request của người dùng và gửi nó tới một server khác, sau đó nó sẽ điều hướng kết quả trả từ server đó về cho người dùng, ví dụ:

```go
func main() {
	u, _ := url.Parse("http://localhost:8080")
	rp := httputil.NewSingleHostReverseProxy(u)

	// initialize your server and add this as handler
	http.ListenAndServe(":3000", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		rp.ServeHTTP(w, r)
	}))
}
```

Ở đoạn code trên ta chạy một server ở port 3000, và khi ta gọi vào `localhost:3000` thì request sẽ được dẫn tới `localhost:8080`, đây là thành phần chính để ta có thể xây dựng được load balancers bằng Go.

### Add server to Load Balancers
Quay lại file `main.go`, ta cập nhật thêm hàm để thêm server vào trong LB.

```main.go
package main

...
type ServerPool struct {
	backends []*Backend
	current  int64
}

// AddBackend to the server pool
func (s *ServerPool) AddBackend(backend *Backend) {
	s.backends = append(s.backends, backend)
}

...
```

Hàm `AddBackend()` đơn giản ta chỉ cần dùng hàm append của Go để thêm một server vào thuộc tính backends của ServerPool.

Tiếp theo ta thêm vào đoạn code sau ở `main()` để ta có thể chọn những server mà ta muốn LB sẽ điều hướng request tới.

```main.go
package main

...

func main() {
	var serverList string
	var port int
	flag.StringVar(&serverList, "backends", "", "Load balanced backends, use commas to separate")
	flag.IntVar(&port, "port", 3000, "Port to serve")
	flag.Parse()

	if len(serverList) == 0 {
		log.Fatal("Please provide one or more backends to load balance")
	}

	servers := strings.Split(serverList, ",")
}
```

Ta dùng `flag.StringVar` để đọc các biến truyền vào từ terminal khi ta chạy chương trình Go và gán nó vào biến `serverList`, sau đó ta dùng hàm `strings.Split()` để tách biến serverList từ chuỗi thành một mảng các server, ví dụ khi ta chạy chương trình như sau.

```
go run main.go --backends=http://localhost:3031,http://localhost:3032,http://localhost:3033
```

Biến serverList sẽ là.

```bash
http://localhost:3031,http://localhost:3032,http://localhost:3033
```

Chuyển nó thành mảng.

```
[http://localhost:3031, http://localhost:3032, http://localhost:3033]
```

Tiếp theo ta thêm các server này vào ServerPool.

```main.go
func main() {
	...

	serverPool := ServerPool{current: -1}
	for _, s := range servers {
		serverUrl, err := url.Parse(s)

		if err != nil {
			log.Fatal(err)
		}

		proxy := httputil.NewSingleHostReverseProxy(serverUrl)
		serverPool.AddBackend(&Backend{
			URL:          serverUrl,
			Alive:        true,
			ReverseProxy: proxy,
		})
	}
}
```

Lúc này thì ta đã thêm được các server vào load balancers, bây giờ ta cần phải thực hiện gửi request lần lượt tới các server theo thứ tự.

### Distribute traffic
Để gửi request lần lượt tới từng server, ta cần có hàm lấy được server hiện tại và gửi request tới nó.

```main.go
package main

...

func (s *ServerPool) AddBackend(backend *Backend) {
	s.backends = append(s.backends, backend)
}

func (s *ServerPool) NextIndex() int64 {
	s.current++
	return s.current % int64(len(s.backends))
}

func (s *ServerPool) GetNextBackend() *Backend {
	next := s.NextIndex()
	return s.backends[next]
}

...
```

Ta dùng hàm `GetNextBackend()` để lấy ra server mà ta muốn LB gửi request tới nó, ở trong hàm GetNextBackend ta sẽ dùng `s.NextIndex()` để lấy ra thứ tự của server tiếp theo và trả về server với thứ tự tương ứng nằm trong thuộc tính `backends`.

Ở hàm `NextIndex()` thì để lấy được thứ tự của server thì đầu tiên là sẽ tăng thuộc tính current lên 1 và tiếp đó ta sẽ lấy kết quả của phép chia dư `s.current % int64(len(s.backends))`. Ở trên ta đã nói là thuật toán *round robin* sẽ lần lượt gửi request tới từng server và sau đó quay lại từ đầu, ta có thể thực hiện việc đó với phép chia dư, ví dụ ở trên thuộc tính  backends có 3 server.

```
[http://localhost:3031, http://localhost:3032, http://localhost:3033]
```

Và ta khai báo serverPool với giá trị current là -1.

```
serverPool := ServerPool{current: -1}
```

Thì khi ta gọi hàm NextIndex sẽ như sau.

```go
// len(s.backends) is 3

s.current++ // current is 0
current % len(s.backends) // 0

s.current++ // current is 1
current % len(s.backends) // 1

s.current++ // current is 2
current % len(s.backends) // 2

s.current++ // current is 3
current % len(s.backends) // 0

s.current++ // current is 4
current % len(s.backends) // 1

s.current++ // current is 5
current % len(s.backends) // 2

s.current++ // current is 6
current % len(s.backends) // 0
```

Với chia lấy phần dư thì kết quả thứ tự của ta luôn đi từ 0 tới 2 sau đó quay lại 0, ta sẽ thực hiện *round robin* bằng cách chia lấy phần dư như trên.

Sau khi có được hàm lấy được thứ tự của server mà LB sẽ gửi request tới, ta cập nhật lại hàm `main()` như sau.

```main.go
func main() {
	...

	server := http.Server{
		Addr: fmt.Sprintf(":%d", port),
		Handler: http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			peer := serverPool.GetNextBackend()

			if peer != nil {
				peer.ReverseProxy.ServeHTTP(w, r)
                return
			}

			http.Error(w, "Service not available", http.StatusServiceUnavailable)
		}),
	}

	log.Printf("Load Balancer started at :%d\n", port)
	if err := server.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}
```

Ở hàm để xử lý request, thì ta sẽ dùng `serverPool.GetNextBackend()` để lấy ra server ta muốn gửi request tới, sau đó ta sẽ dùng `peer.ReverseProxy.ServeHTTP(w, r)` để điều hướng request từ người dùng tới server của ta.

Code hoàn chỉnh.

```main.go
package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"strings"
)

type Backend struct {
	URL          *url.URL
	Alive        bool
	ReverseProxy *httputil.ReverseProxy
}

type ServerPool struct {
	backends []*Backend
	current  int64
}

// AddBackend to the server pool
func (s *ServerPool) AddBackend(backend *Backend) {
	s.backends = append(s.backends, backend)
}

func (s *ServerPool) NextIndex() int64 {
	s.current++
	return s.current % int64(len(s.backends))
}

func (s *ServerPool) GetNextBackend() *Backend {
	next := s.NextIndex()
	return s.backends[next]
}

func main() {
	var serverList string
	var port int
	flag.StringVar(&serverList, "backends", "", "Load balanced backends, use commas to separate")
	flag.IntVar(&port, "port", 3000, "Port to serve")
	flag.Parse()

	if len(serverList) == 0 {
		log.Fatal("Please provide one or more backends to load balance")
	}

	servers := strings.Split(serverList, ",")

	serverPool := ServerPool{current: -1}
	for _, s := range servers {
		serverUrl, err := url.Parse(s)

		if err != nil {
			log.Fatal(err)
		}

		proxy := httputil.NewSingleHostReverseProxy(serverUrl)
		serverPool.AddBackend(&Backend{
			URL:          serverUrl,
			Alive:        true,
			ReverseProxy: proxy,
		})
	}

	server := http.Server{
		Addr: fmt.Sprintf(":%d", port),
		Handler: http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			peer := serverPool.GetNextBackend()

			if peer != nil {
				peer.ReverseProxy.ServeHTTP(w, r)
                return
			}

			http.Error(w, "Service not available", http.StatusServiceUnavailable)
		}),
	}

	log.Printf("Load Balancer started at :%d\n", port)
	if err := server.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}
```

Giờ ta kiểm tra thử nào, 

```bash
go run main.go --backends=https://grafana.com:443,http://info.cern.ch:80
```

Bạn gọi thử vào `localhost:3000` thì sẽ thấy request của ta lần lượt được gửi tới trang `grafana.com` và `info.cern.ch`, vậy là ta đã thành công xây dựng một load balancers đơn giản 😁.

Các bạn like page [DevOps VN](https://www.facebook.com/profile.php?id=100085570585155) để nhận thông báo về bài viết sớm nhất nhé 😁.

## Kết luận
Ta đã tìm hiểu xong cách hoạt động của load balancers với thuật toán *round robin*, tuy nhiên nó rất đơn giản và cần còn rất nhiều thứ phải cải thiện, như là:
+ Nếu một server đã chết thì ta sẽ không gửi request tới nó.
+ Thực hiện kiểm tra health check cho server và đánh dấu server là unhealth để load balancers không gửi request tới đó.

Ta sẽ thực hiện những công việc trên ở bài tiếp theo **Build a advanced Load Balancer with health check**.

## Mục tìm kiếm đồng đội

![](https://images.viblo.asia/9fbde6d9-5e57-4429-a903-10a961e1c96c.png)

Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 70 điểm, và mục tiêu là trên 90 điểm.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tham gia với bọn mình nhé. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Đồng đội [Backend Engineer (Magento - PHP)](https://tuyendung.hoang-phuc.com/job/backend-engineer-magento-php-1538).

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).