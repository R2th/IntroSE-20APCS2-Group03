Một mẫu thiết kế thuộc top thịnh hành đối với các lập trình viên. Adapter là một mẫu thiết kế được sinh ra để đáp ứng một nhu cầu, tính năng nào đó mà ta không biết trước. Cùng tìm hiểu nhé.

![](https://images.viblo.asia/8cbe3821-f49d-4735-a0f4-e1aa4a210085.png)

## I. Adapter - Structural Pattern

Trong những trường hợp thường gặp nhất, khi interface của chúng ta bắt đầu có những sự điều chỉnh để đáp ứng một yêu cầu mới - chẳng hạn, nhưng quá khó để sửa đổi cũng như lấy đi rất nhiều thời gian. Lúc này Adapter Pattern sẽ có ích. Đơn giản hơn là, cũng là interface với các tính chất tương tự, nhưng được sinh ra để đáp ứng nhu cầu mới này, thay vì phải sửa đổi mọi thứ trên interface cũ.

## II. Adapter mang lại cho developers những gì?
Adapter design pattern giúp chúng ta không vi phạm nguyên tắc thứ hai trong nguyên lý **SOLID** khi gặp một vấn đề cùng bản chất, nhưng khác cách triển khai buộc chúng ta phải tách thành nhiều interface riêng biệt nhưng hoạt động gần như tương tự nhau.

## III. Ví dụ thực tế
Lấy một ví dụ cụ thể, chúng ta cần triển khai một module có thể thực thi Http request, bao gồm FetchModule và AxiosModule. Những user sử dụng FetchModule sẽ không cần quan tâm những thứ mà AxiosModule sẽ làm, nhưng trong trường hợp cần sử dụng axios, user vẫn có thể sử dụng thông qua AixosModule. Lúc này áp dụng Adapter pattern sẽ đem lại hiệu quả. Sơ qua thì chúng ta có các công việc cần phải làm:
- Tạo một đối tượng adapter chứa instance FetchModule
- Tạo một đối tượng adapter chưa instance AxiosModule
- Khi dùng các module ở trên để thực thi http request qua ClientModule, chúng ta đều thông qua hình hài của đối tưởng adapter

## IV. Implementation
Để đơn giản, mình chỉ triển khai Http module với duy nhất method Get. Đầu tiên tạo package Http
```http.go
package adapter

type Http interface {
	Get(url string) (interface{}, error)
}

```



Tiếp đến, chúng ta tạo 2 module Fetch và Axios. Cả hai cùng có method Get
```fetch.go
package adapter

import "fmt"

type Fetch struct {
}

func (m *Fetch) Get(url string) (interface{}, error) {
	fmt.Printf("Http Get with Fetch: %s\n", url)
	return nil, nil
}
```

```axios.go
package adapter

import "fmt"

type Axios struct {
}

func (m *Axios) Get(url string) (interface{}, error) {
	fmt.Printf("Http Get with Axios: %s\n", url)
	return nil, nil
}
```

Client module hiểu đơn giản là một module chúng ta dùng để thực thi một http request, bao gồm như sau:
```client.go
package adapter

type Client struc
}

func (c *Client) Get(http Http, url string) (interface{}, error) {
	return http.Get(url)
}
```

Phương thức Get trong module Client, nhận vào đối số là instance muốn sử dụng (Fetch hoặc Axios) cùng với url. Như phần 3 có đề cập, chúng ta không gọi trực tiếp đến module cụ thể là Axios hay Fetch, mà thông qua adapter dành cho nó. 

Cùng triển khai adapter cho chúng như sau

```fetchadapter.go
package adapter

type FetchAdapter struct {
	Instance *Fetch
}

func (m *FetchAdapter) Get(url string) (interface{}, error) {
	return m.Instance.Get(url)
}
```


```axiosadapter.go
package adapter

type AxiosAdapter struct {
	Instance *Axios
}

func (m *AxiosAdapter) Get(url string) (interface{}, error) {
	return m.Instance.Get(url)
}

```

Vậy là xong phần triển khai, tiếp theo chúng ta cùng run đoạn code thực thi và xem kết quả phía bên dưới nhé
```main.go
/*
	Example Adapter
*/
fmt.Println("*** Example Adapter ***")
client := &adapter.Client{}

fetchAdapter := &adapter.FetchAdapter{
	Instance: &adapter.Fetch{},
}
client.Get(fetchAdapter, "https://www.google.com")

axiosAdapter := &adapter.AxiosAdapter{
	Instance: &adapter.Axios{},
}
client.Get(axiosAdapter, "https://www.bornhup.com")

fmt.Print("*** End of Adapter ***\n\n\n")
```

Kết quả:

![image.png](https://images.viblo.asia/11d59a09-5e4f-4015-9470-e447274a04dd.png)

Với Adapter design pattern, chúng ta hoàn toàn linh động trong việc Client có thể chủ động sử dụng http module mà nó mong muốn. Phần triển khai cho từng module cũng được tách bạch, không xảy ra tình trạng khó khăn khi modify module này nhưng làm ảnh hưởng đến module khác, cũng như dễ dàng thêm vào các module nếu có, cái bạn cần là thêm triển khai và adapter cho nó mà thôi 😄

## V. Lời kết
Với mẫu thiết kế adapter, chúng ta được minh hoạ rõ nét nhất về tính chất Open/Close trong nguyên lý SOLID áp dụng vào chính sản phẩm của chúng ta. Thay vì phải khó khăn sửa đổi để thích nghi khi có yêu cầu mới, chúng ta chỉ đơn giản triển khai thêm cho nó mà thôi.

Cảm ơn các bạn đã xem bài viết.