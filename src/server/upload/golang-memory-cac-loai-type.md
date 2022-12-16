Hiện tại hầu hết lập trình viên *golang* thường sẽ ít quan tâm đến việc sử dụng *memory* của nó, ai cũng cho rằng *golang* rất tốt cho việc tối ưu tài nguyên, nhưng khi bạn thực sự quan tâm thì đó là một sự lãng phí. 

-----

* Khi ứng dụng được chạy thì tất cả các biến, method điều được tạo ra và được allocate trên memory, khi memory bị cạn kiệt đồng nghĩa ứng dụng **chết**, do đó memory là vô cùng quan trọng nhé.
* Trong bài viết này tìm hiểu một số loại type cũng như byte của nó trên memory của *golang*, sau khi biết số byte thì việc tối ưu momery là cần thiết thế nào, ta sẽ dùng [SizeOf](https://pkg.go.dev/unsafe#Sizeof) 

### **Vidụ:**
Các type và byte của nó trong golang:
```
package main
import (
	"fmt"
	"unsafe"
)
type Information struct {
	ValueString string
	ValueBool   bool
	ValueUint8  uint8
	ValueUint16 uint16
	ValueUint32 uint32
	ValueUint64 uint64
	ValueUint   uint
	Valueint8   int8
	Valueint16  int16
	Valueint32  int32
	Valueint64  int64
	Valueint    int
}
func main() {
	item := Information{}
	fmt.Printf("string: %+v byte \n", unsafe.Sizeof(item.ValueString))
	fmt.Printf("bool: %+v byte \n", unsafe.Sizeof(item.ValueBool))
	fmt.Println()
	fmt.Printf("uint8: %+v byte \n", unsafe.Sizeof(item.ValueUint8))
	fmt.Printf("uint16: %+v byte \n", unsafe.Sizeof(item.ValueUint16))
	fmt.Printf("uint32: %+v byte \n", unsafe.Sizeof(item.ValueUint32))
	fmt.Printf("uint64: %+v byte \n", unsafe.Sizeof(item.ValueUint64))
	fmt.Printf("uint: %+v byte \n", unsafe.Sizeof(item.ValueUint))
	fmt.Println()
	fmt.Printf("int8: %+v byte \n", unsafe.Sizeof(item.Valueint8))
	fmt.Printf("int16: %+v byte \n", unsafe.Sizeof(item.Valueint16))
	fmt.Printf("int32: %+v byte \n", unsafe.Sizeof(item.Valueint32))
	fmt.Printf("int64: %+v byte \n", unsafe.Sizeof(item.Valueint64))
	fmt.Printf("int: %+v byte \n", unsafe.Sizeof(item.Valueint))
}
```
=> Kết quả:
> string: 16 byte 

> bool: 1 byte 

> uint8: 1 byte 

> uint16: 2 byte 

> uint32: 4 byte 

> uint64: 8 byte 

> uint: 8 byte 

> int8: 1 byte  

> int16: 2 byte 

> int32: 4 byte 

> int64: 8 byte 

> int: 8 byte

[RUN](https://go.dev/play/p/hPnBy2LdNZV)

  Với kết quả trên thì khi define các field trong golang cần quan tâm để giá trị của nó, tránh lãng phí tài nguyên.

-----

Tối ưu khi define struct: sẽ có 2 struct và đặt vị trí field khác nhau thì sẽ có tổng số byte khác nhau:
```
package main

import (
	"fmt"
	"unsafe"
)

type Information struct {
	ValueUint32 uint32 // 4 byte
	ValueBool   bool   // 1 byte
	ValueUint64 uint64 // 8 byte
	ValueBool2  bool   // 1 byte
}

type Information2 struct {
	ValueUint64 uint64 // 8 byte
	ValueUint32 uint32 // 4 byte
	ValueBool   bool   // 1 byte
	ValueBool2  bool   // 1 byte
}

func main() {
	item := Information{}
	item2 := Information2{}
	fmt.Println("tong 1: ", unsafe.Sizeof(item))
	fmt.Println("tong 2: ", unsafe.Sizeof(item2))
}
```

> tong 1:  24
> tong 2:  16
=> tại sao khi field là như nhau nhưng số byte lại khác nhau.

**Giải Thích**
* Mặc định đối với 1 type thì cần 4byte nếu type tiếp theo cộng lại hơn 4byte.
* Đối với struct *Information*; khi uint32 đứng đầu thì cần 4byte, tiếp đến là bool thì cần 1 byte nhưng cũng cần 4byte(bao gồm xử lý), uint64 thì cần 8byte, và cuối là bool thì cũng 4byte => tổng cộng là 24byte
* Đối với struct *Information2*; khi uint64 đứng đầu sẽ cần 8byte, tiếp là uint32 thì cần 4byte, sau đó là 2 biến bool mỗi biến là 1 byte tổng cũng là 4byte => tổng là 16byte

### **Tóm Lại:**
 Kinh nghiệm rút ra là khi khai báo 1 struct, thì ta nên để giá trị field có byte lớn lên phía trên, còn filed byte nhỏ xuống dưới.
 
 Tks anh,em: 
 
 **Contact**
* facebook: https://www.facebook.com/phucducdev/
* gmail: ducnp09081998@gmail.com or phucducktpm@gmail.com
* linkedin: https://www.linkedin.com/in/phucducktpm/
* hashnode: https://hashnode.com/@OpenDev
* telegram: https://t.me/OpenDevGolang