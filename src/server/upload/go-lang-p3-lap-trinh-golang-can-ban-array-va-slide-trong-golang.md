Xin chào các bạn, ở bài biết trước mình đã giới thiệu về các kiểu dữ liệu trong golang[](https://viblo.asia/p/go-lang-p2-lap-trinh-golang-can-ban-kieu-du-lieu-bien-1Je5EXnLlnL), bài này chúng ta cũng nhau tìm hiều về Array và Slide trong golang nhé<br>
# Arrays trong golang
Mảng là tập hợp của các phần tử có cùng một loại. Ví dụ: tập hợp các số nguyên 3, 5, 2, 8 tạo thành một mảng. nó có kích thước cố định và các phần tử bên trong phải cùng loại dữ liệu.
## Mảng 1 chiều
```
func main() {
	var x [5]int // khai báo mảng kiểu int 5 phần tử
	fmt.Println(x)

	var a [2]string // khai báo mảng kiểu string 2 phần tử
    a[0] = "Hello"
    a[1] = "World"
	fmt.Println(a)

	var z [3]complex128 // khai báo mảng kiểu complex128 3 phần tử
	fmt.Println(z)
    
    // Khởi tạo một mảng gồm 6 số kiểu int và gán luôn giá trị cho nó
    number := [6]int{2, 3, 5, 7, 11, 13}
    fmt.Println(number)
    
    // khai báo mảng nhưng không ghi rõ kích thước, 
    // trình biên dịch sẽ tự hiểu dựa vào số phần tử đã khai báo
    ar := [...]int{12, 78, 50}
    fmt.Println(ar)
}
```
ví dụ: tính tổng các phần tử trong mảng
```
package main

import "fmt"

func main()  {
	a := [4]float64{3.5, 7.2, 4.8, 9.5}
	sum := float64(0)

	for i := 0; i < len(a); i++ {
		sum = sum + a[i]
	}
	fmt.Printf("Sum of all the elements in array  %v = %f\n", a, sum)
}
```
## Mảng 2 chiều
```
package main

import "fmt"

func main() {
	a := [2][2]int{
		{3, 5},
		{7, 9},
	}
	fmt.Println(a)
    
	b := [5][4]float64{
		{1, 3},
		{4.5, -3, 7.4, 2},
		{6, 2, 11},
	}
	fmt.Println(b)
}
```

# Slices trong golang
Slices không có bất kì dữ liệu nào. Chúng là các tham chiếu đến mảng hiện có, nó mô tả một phần (hoặc toàn bộ) Array. Nó có kích thước động nên thường được sử dụng nhiều hơn Array.

Slices có thể tạo ra từ một Array bằng cách lấy từ vị trí phần tử bắt đầu và kết thúc trong Array. <br>
Ví dụ:
```
package main

import (  
    "fmt"
)

func main() {  
    number := [6]int{2, 4, 5, 7, 8, 10, 13}

    // Khởi tạo Slice s bằng cách cắt từ phần tử ở vị trí 2 đến phần tử ở vị trí 5 của Array number
    var s []int = number[2:5]

    // In ra giá trị của Slice s
    fmt.Println(s)   // Giá trị của s là [5, 7, 8]
}
```
* sắp xếp Slices theo thuật toán bubblesoft
```
package main

import (
	"fmt"
	"sort"
)

func main(){
	var slide = []int{}
	fmt.Print("Enter n: ")
	var n int
	fmt.Scanf("%d",&n)
	var input int
	for i := 0;i < n ;i++{
		fmt.Printf("slide[%d] = ", i)

		fmt.Scanf("%d", &input)
		slide = append(slide, input)
	}
	bubbleSoft(slide)
	fmt.Println(slide)
}

    func bubbleSoft(slide sort.IntSlice){
        for j := 0; j < len(slide)-1; j++ {
            for i := len(slide)-2; i >= j; i-- {
                if slide[i] < slide[i+1] {
                    tg := slide[i]
                    slide[i] = slide[i+1]
                    slide[i+1] = tg
                }
            }
        }
    }
}
```
# kết bài
Bài này mình đã giới thiệu những kiến thức cơ bản về Array và Slide trong golang, cùng theo dõi phần tiếp theo nhé.