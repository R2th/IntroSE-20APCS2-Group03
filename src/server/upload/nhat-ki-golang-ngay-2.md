# Bắt đầu
Hôm nay mình định thử array, slice, map với cách khai báo hàm, code vài thuật toán đơn giản. Vẫn như cũ, tự code nên không tối ưu, nhưng thôi cứ code cho quen tay đã.
Vài thứ nghĩ ra lúc học:
- Slice nó cho phép mở rộng, không biết có giống ArrayList trong java không, có thời gian tìm hiểu sau vậy.
- Cái range nó là keyword à? Khó hiểu nhỉ, thế muốn tự định nghĩa iteration như java thì làm sao nhỉ?
- Cái `[:]` của slice nó tạo ra slice mới hay refer cái cũ nhỉ? Tí sẽ thử.
# Thôi đọc đủ rồi code thôi
## Thử cái fibonaci hôm qua bằng slice đã
```go
package main

import "fmt"

func main() {
	slice1 := []int{1,2}
	n := 20
	for i := 2; i <= n; i++ {
		slice1 = append(slice1, slice1[i-1] + slice1[i-2])
	}
	fmt.Println(slice1[n])
}
```
Ez! Có cách nào đo thời gian chạy code không nhỉ, cái này không có cái chạy trong bao lâu như C, hay tại IDE. Mình mới cài Goland, vì để học trong 30 ngày thôi mà vừa đúng nó cho 30 ngày free trial. Vừa khít, mấy ông trên mạng bảo cài cái này đỡ lo mấy cái vớ vẩn vì môi trường, học gì muốn nhanh phải làm sao pass qua được mấy cái setup môi trường, mấy cái đấy học thì ít mà đi sửa mấy cái vớ vẩn thì nhiều.
Thử code bằng mảng xem.
```go
package main

import "fmt"

func main() {
	arr1 := make([]int, 21)
	n := 20
	arr1[0], arr1[1] = 1, 2
	for i := 2; i <= n; i++ {
		arr1[i] = arr1[i-1] + arr1[i-2]
	}
	fmt.Println(arr1[n])
}
```
Mai có thời gian sẽ tìm cách đo thời gian chạy để trả lời câu hỏi thứ nhất lúc nãy.
## Thử câu hỏi thứ 3: `[:]`
```go
package main

import "fmt"

func main() {
	slice1 := []int{1,2,3,4,5}
	fmt.Println("SL1:", slice1)
	slice2 := slice1[2:5]
	slice2[1] = 10
	fmt.Println("SL2:", slice2)
	fmt.Println("SL1:", slice1)
}
```
Output
```
SL1: [1 2 3 4 5]
SL2: [3 10 5]
SL1: [1 2 3 10 5]
```
Thế là toán tử `[:]` nó chỉ tạo ra con trỏ thôi, thế truy cập ngoài khoảng có sao không nhỉ?
```go
package main

import "fmt"

func main() {
	slice1 := []int{1,2,3,4,5,6,7,8,9,10}
	fmt.Println("SL1:", slice1)
	slice2 := slice1[2:5]
	slice2[1] = 10
	fmt.Println("SL2:", slice2[6])
	fmt.Println("SL1:", slice1)
}
```

Output
```
SL1: [1 2 3 4 5 6 7 8 9 10]
panic: runtime error: index out of range [6] with length 3

goroutine 1 [running]:
main.main()
	C:/Users/duongtnhat/go/src/awesomeProject/simple.go:10 +0x10b
```
Thế là không được, đúng hàng đời mới có khác, nó check hết mấy cái này rồi, tưởng truy cập thoải mái như C.
## Viết thử hàm Ước chung lớn nhất xem
```go
package main

import "fmt"

func LCD(x, y int) int {
	if y == 0 {
		return x
	} else {
		return LCD(y, x % y)
	}
}

func main() {
	fmt.Println(LCD(2*3*5*7*47, 3*7*11*17))
}
```
Kiểu khai báo này nó cứ tù tù, như C thì cứ `int LCD(int x, int y)`, thừa cái `func` quá, cá nhân tí thôi. Thêm một cái nữa là cái `if` lúc nào cũng phải có `{}` hay sao ấy, viết không có cái đấy nó không nhận. Nhiều khi có mỗi 1 lệnh cũng phải viết.
## Viết hẳn cái quicksort xem nào.
```go
package main

import "fmt"

func sort(arr []int, l, r int) {
	if l <= r {
		pivot, left, right := arr[l], l, r
		for ;left <= right; {
			for ; left <= right && arr[left] < pivot; left++ {}
			for ; right >= left && arr[right] > pivot; right-- {}
			if left <= right {
				t := arr[left]
				arr[left] = arr[right]
				arr[right] = t
				left++
				right--
			}
		}
		sort(arr, l, right)
		sort(arr, left, r)
	}
}

func main() {
	arr := []int{4,66,4,54,8,31,7,96,1,87,9,13,45,46,7,9,131,9,879,1,621,65,74}
	fmt.Println("Before:", arr)
	sort(arr, 0, len(arr)-1)
	fmt.Println("After:", arr)
}
```
Lâu rồi không code mất thời gian phết.
Thử xem trên mạng có code nào tốt hơn không copy về để học cú pháp nào.
```go
package main

import "fmt"

func quicksort(a []int) []int {
	if len(a) < 2 {return a}
	left, right, pivot := 0, len(a)-1, a[0]
	a[pivot], a[right] = a[right], a[pivot]

	for i, _ := range a {
		if a[i] < a[right] {
			a[left], a[i] = a[i], a[left] // Quên mất là đổi chỗ được kiểu này, Xấu hổ quá
			left++
		}
	}

	a[left], a[right] = a[right], a[left]

	quicksort(a[:left])
	quicksort(a[left+1:])

	return a
}

func main() {
	arr := []int{4,66,4,54,8,31,7,96,1,87,9,13,45,46,7,9,131,9,879,1,621,65,74}
	fmt.Println("Before:", arr)
	quicksort(arr)
	fmt.Println("After:", arr)
}

```

# Tổng kết
Nay thế đã, biết cách dùng array với slice, biết cách gọi hàm. Cái map thì chưa nghĩ ra gì để code, thôi để dùng sau vậy.