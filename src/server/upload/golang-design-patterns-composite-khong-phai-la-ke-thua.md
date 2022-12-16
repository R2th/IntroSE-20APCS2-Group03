Sau series về nhóm mẫu thiết kế khởi tạo, chúng ta cùng đến với nhóm mẫu thiết kế thứ hai là structural design patterns (nhóm cấu trúc), một mẫu thiết kế thể hiện cách mà các object hay class được liên kết với nhau tạo nên một cấu trúc lớn hơn để có thể đáp ứng nhiều yêu cầu hơn nhưng không kém phần linh hoạt. Chúng ta cùng đến với design pattern đầu tiên: **Composite Design Pattern**

![](https://images.viblo.asia/b369284e-2502-40f5-83f9-ffa3517189ca.jpg)

## I. Composite - Structural Pattern

Khi gặp các bài toán có yêu cầu thiết kế cấu trúc phân cấp hay dạng cây, nơi mà một đối tượng chứa rất nhiều đối tượng bên trong nó, cũng như có các thuộc tính và phương thức theo riêng từng đối tượng, chúng ta thường nghĩ ngay đến Composite. Mẫu thiết kế này giúp chúng ta giải quyết rất nhiều vấn đề về kế thừa và đa kế thừa. 

Composite vận dụng mối quan hệ `has-a`, thay vì `is-a` như kế thừa. Nói thêm một ít về 2 loại relationship này, `is-a` relationship là kế thừa, nghĩa là các đối tượng kế thừa được xem là `sub` hoặc `child` từ đối tượng cha. Mặc khác `has-a` tạo ra một đối tượng có tham chiếu đến đối tượng khác. Có thể nói **Apple** is-a **Fruit**, nhưng chỉ có thể nói **School** has-a **Student**, composite được dùng khi bạn muốn tái sự dụng code cho hai đối tượng không cùng loại với nhau, và ngược lại với kế thừa.

## II. Composite mang lại cho developers những gì?
Composite giúp chúng ta làm việc với cấu trúc dữ liệu dạng cây một cách dễ dàng hơn khi tận dụng được tính đa hình và đệ quy để xử lý các bài toán của nó. Hơn nữa, với nguyên tắc đóng/mở, bạn có thể thêm những loại đối tượng mới vào cấu trúc cây này mà không làm ảnh hưởng đến cấu trúc hiện tại.

## III. Ví dụ thực tế
Chúng ta sẽ đến với bài toán đơn giản nhất là tổ chức cây thư mục cho hệ điều hành, yêu cầu bài toán như sau:
-  Cấu trúc thư mục bao gồm `Folder` và `File` gọi chung là component
-  Một folder có thể bao gồm nhiều folders và files khác
-  Folder và File bao gồm field name và method getName, setName và print (in cấu trúc thư mục từ vị trí component hiện tại) 
-  Folder có thêm method add (có thể thêm folder và file khác)

Testcase mẫu
```
Root
|--FolderA
   |--FileA
   |--FileB
   |--FolderX
      |--FileY
      |--FolderZ
         |--FileW
|--FolderB
   |--FileC
```

Với yêu cầu bài toán như trên, chúng ta cần đáp ứng những yêu cầu sau với Composite design pattern:
- Folder gồm field là name và các method getName, setName, print và add.
- File gồm field name và các method getName, setName, print
- Folder và File không có mối quan hệ kế thừa với nhau, dù có các field và method giống nhau

## IV. Implementation
Trước tiên chúng ta bắt đầu định nghĩa struct File và Folder, như sau:
```file.go
package composite

import (
	"fmt"
)

type File struct {
	name string
}

func (m *File) GetName() string {
	return m.name
}

func (m *File) SetName(name string) {
	m.name = name
}

func (m *File) Print(args ...interface{}) {
	fmt.Println(m.GetName())
}
```


```folder.go
package composite

import (
	"fmt"
	"log"
	"strings"
)

type Folder struct {
	name       string
	components []Component
}

func (m *Folder) GetName() string {
	return m.name
}

func (m *Folder) SetName(name string) {
	m.name = name
}

func (m *Folder) Print(args ...interface{}) {
	fmt.Println(m.name)
	nested := 0
	if len(args) > 0 {
		var ok bool
		nested, ok = args[0].(int)
		if !ok {
			log.Fatal("first argument must be a number")
		}
	}
	for _, s := range m.components {
		fmt.Printf("%s%s%s", strings.Repeat("  ", nested), strings.Repeat(" ", nested), "|--")
		s.Print(nested + 1)
	}
}

func (m *Folder) Add(c ...Component) {
	m.components = append(m.components, c...)
}

```

Vậy là xong bước định nghĩa struct cho File và Folder, ở đây chúng ta thấy method `Add` của Folder nhận vào đối số là một danh sách Component. Như yêu cầu đặt ra, chúng ta dùng Component như một đối tượng chung cho File và Folder, vì hai đối tượng này không có quan hệ kế thừa với nhau. 

Component struct định nghĩa như sau: 
```component.go
package composite

type Component interface {
	GetName() string
	Print(args ...interface{})
}

```

Đến bước chạy chương trình, chúng ta cùng khai báo các files và folders theo như test case phía trên (test case hơi dài nên code cũng như thế 😤)

```main.go
package main

import (
	"fmt"

	composite "github.com/structural-patterns/composite"
)

func main() {
	/*
		Example Composite
	*/
	fmt.Println("*** Example Composite ***")
	root := &composite.Folder{}
	root.SetName("Root")

	folderA := &composite.Folder{}
	folderA.SetName("FolderA")

	fileA := &composite.File{}
	fileA.SetName("FileA")

	fileB := &composite.File{}
	fileB.SetName("FileB")

	folderX := &composite.Folder{}
	folderX.SetName("FolderX")

	fileY := &composite.File{}
	fileY.SetName("FileY")
	folderZ := &composite.Folder{}
	folderZ.SetName("FolderZ")

	fileW := &composite.File{}
	fileW.SetName("FileW")

	folderZ.Add(fileW)
	folderX.Add(fileY, folderZ)
	folderA.Add(fileA, fileB, folderX)

	folderB := &composite.Folder{}
	folderB.SetName("FolderB")

	fileC := &composite.File{}
	fileC.SetName("FileC")

	folderB.Add(fileC)

	root.Add(folderA, folderB)

	root.Print()

	fmt.Print("*** End of Composite ***\n\n\n")
}

```


Chạy chương trình và kết quả thu được:
![image.png](https://images.viblo.asia/63d0b7e0-3d69-4ed8-8726-2e8c35575ab7.png)

## V. Lời kết

Sử dụng Composite khi chúng ta nhận thấy rằng chúng ta đang sử dụng chức năng của các đối tượng theo cùng một cách, và mã nguồn của chúng gần giống như nhau. Tuy nhiên, một khi sự khác nhau giữa các đối tượng là quá nhiều, thì việc vận dụng mẫu thiết kế này sẽ trở nên phức tạp hơn, khó hiểu hơn. Tất cả là phụ thuộc vào lựa chọn của chúng ta nhé 😄

Cảm ơn các bạn đã xem bài viết.