### **Tại sao phải dùng context dealine**
Một vài trường hợp là khi lập trình các service cần đến deadline mà cần sử dụng phổ biến nhất:
* Connect đến các loại database như Mysql, Oracle,... Không thể để connect kết nối một thời gian dài, chúng ta cần set đến time để cancel connect .
* Trường hợp khác đó là connect đến các service bên ngoài thông qua http. Chúng ta cần set time out cũng như deadline cho nó.


-----


### **Khái niệm**
* Context Dealine được hiểu cách đơn giản là một tính hiệu để huỷ các sự kiện search, query đến cơ sở dữ liệu hoặc các dịch vụ bên ngoài. Ở đây mình sẽ giải thích với *deadline* còn timeout thực chất cũng là một deadline mà thôi.
* Khi user nhập */search?q=golang&timeout=1s* param timeout 1s là muốn chỉ định server là cancel request sau 1s.


-----

### *Demo*
* Đầu tiên bạn viết một function dùng để call service bên ngoài, và tốn *1second* để xử lý và trả về kết quả.
```
func callExternalService(w http.ResponseWriter, r *http.Request) {
	time.Sleep(1 * time.Second)
	fmt.Println("response hello")
}
```

* Tiếp theo bạn viết func call service bên ngoài và set timeout là *2second* cho việc call đó.
```
func execCall() error {
	client := &http.Client{}
	req, err := http.NewRequest(http.MethodGet, "http://localhost:8080", nil)
	if err != nil {
		return err
	}
	ctx, cancel := context.WithTimeout(req.Context(), 2*time.Second)
	defer cancel()
	req = req.WithContext(ctx)
	_, err = client.Do(req)
	return err
}
```
Ở đây, khi *execCall* thực thi thì sẽ set timeout cho nó là là *2second*, nghĩa là nếu waiting response quá *2second* thì sẽ không nhận được kết quả là trả về error luôn.

* Tiếp đến là hàm main.
```
func main() {
	go func() {
		http.HandleFunc("/", callExternalService)
		if err := http.ListenAndServe(":8080", nil); err != nil {
			log.Fatal(err)
		}
	}()
	time.Sleep(1 * time.Second) // wait for server to run
	// call server
	err := execCall()
	if errors.Is(err, context.DeadlineExceeded) {
		log.Println("ContextDeadlineExceeded: true")
	}
	if os.IsTimeout(err) {
		log.Println("IsTimeoutError: true")
	}
	if err != nil {
		log.Fatal(err)
	}
}
```

Sau khi run *go run main.go* sẽ nhận được kết quả vì  *callExternalService* chỉ thực thi tốn *1second* còn *timeout* là *2second*
> response hello

**TimeOut**
Bây giờ chúng ta sẽ thay đổi func *callExternalService* và set timout là *3second*
```
func callExternalService(w http.ResponseWriter, r *http.Request) {
	time.Sleep(3 * time.Second)
	fmt.Println("response hello")
}
```
=> điều này đồng nhiều là timeout của chúng ta sẽ được thực hiện vì hiện tại chỉ có *2second*. Kết quả:
> ContextDeadlineExceeded: true

> IsTimeoutError: true

> Get "http://localhost:8080": context deadline exceeded

[Full Code](https://go.dev/play/p/odN1A1Qe7NS)