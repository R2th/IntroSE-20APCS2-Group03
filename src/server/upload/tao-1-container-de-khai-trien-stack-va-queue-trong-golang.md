# Helloworld
Xin Chào các bạn hôm nay mình sẽ trình bày về các mình tạo 1 package Container có thể chứa được nhiều kiểu dữ liệu mà mình tạo ra để sử dụng trong golang. Lần đầu viết blog còn nhiều sai sót các bạn góp ý thêm cho mình nha!
<br>

>Thứ nhất:  Trong golang không có generic type, không có class
><br>
>Thứ hai: Thao tác với slice trong golang khá là phiền khi cứ phải gán lại dữ liệu kiểu này:
><br> Thêm phần tử:` data = append(data,e)`
><br>Xóa phần tử:`data = append(data[:id], data[id+1:]...)`
><br>Cái này mà triển khai Stack, Queue thì mệt quá nhỉ
><br>Nên cần 1 kiểu dữ liệu trừu tượng như để sử dụng cho nó tiện 

Ok xong phần trình bày bắt tay vào code thôi

# ContainerBase
đầu tiên chúng ta sẽ định nghĩa 1 kiểu là slice interface để có thể chứa mọi loại giá trị mà mình muốn lưu ý là chúng ta phải dùng con trỏ để lưu trữ giá trị nhé:
```
type containerbase []interface{}
```
sau đó viết thêm các method PopBack và PushBack cho nó, về phần cú pháp thì nó là basic của go rồi nên mình không nói nữa. Hàm pop sẽ return về 1 giá trị là interface nên chúng ta phải ép kiểu cho nó sau khi pop để sử dụng 
```
func (c *containerbase) PushBack(element interface{}) {
	*c = append(*c, element)
}

func (c *containerbase) PopBack() interface{} {
	element := (*c)[len(*c)-1]
	*c = (*c)[:len(*c)-1]
	return element
}
```
Tương tự với phần Front
```
func (c *containerbase) PushFront(element interface{}) {
	*c = append(containerbase{element}, *c...)
}

func (c *containerbase) PopFront() interface{} {
	element := (*c)[0]
	*c = (*c)[1:]
	return element
}
```
thêm tí tính năng remove
```
func (c *containerbase) Remove(id int) {
	if id < 0 || len(*c) == 0 {
		return
	}
	*c = append((*c)[:id], (*c)[id+1:]...)
}
```
như vậy là ta có thể triển khai Stack và Queue cho Container này rồi :D 
khi nào lấy dữ liệu ra ta chỉ cần ép kiểu cho nó là được 
<br>Stack : `data.PushBack(123)` và `data.PopBack()`
<br>Queue: `data.PushBack("helloword!")` and `data.PopFront()`
<br>Khoan đã thấy thiếu thiếu, giờ ta chỉ muốn container dài tối đa 1000 phần tử thì sao?
<br>Rồi nếu như tràn rồi thì mình muốn remove cái phần tử cuối đi để thêm vào nữa!
Ok chúng ta sẽ tạo thêm một cái struct nữa để định nghĩa mấy cái này
# My Container
Chúng ta tạo một struct như này:
```
type container struct {
	data     *containerbase
	max      int
	override bool
}
```
rồi viết hàm để khởi tạo nó
```
func NewContainer(max int, override bool) container {
	return container{&containerbase{}, max, override}
}
```
viết method check max size và override lại dữ liệu, nếu như thêm vào đằng sau thì remove đằng trước và ngược lại PopFront và PushFront
```
func (s container) PushBack(e interface{}) {
	if s.max > UNLIMIT && s.max <= len(*s.data) {
		if s.override {
			(*s.data).PopFront()
		} else {
			return
		}
	}
	(*s.data).PushBack(e)
}

func (s container) PopBack() interface{} {
	if len(*s.data) == 0 {
		return nil
	}
	return (*s.data).PopBack()
}
```
Ok giờ chúng ta sử dụng `data.PushBack("gnoahdz")` rồi :D
<br>
Trong package của mình còn viết thêm mấy method nữa để get, set, remove...
các bạn có thể xem và đóng góp thêm tại link github dưới đây:
https://github.com/gnoah1379/algorithm/tree/master/Golang/GnoahData