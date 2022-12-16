Hiện tại đang rảnh nên mình kiếm mấy bài về `Dynamic Programming` trên `Leetcode` để giải khuây (hehe)

### Đề bài
https://leetcode.com/problems/arithmetic-slices/description/

Một dãy đựoc coi là `Arithmetic` (số học) khi mà dãy đó có 3 phần tử trở lên, và khoảng cách giữa 2 phần tử bất kì gần nhau trong dãy là giống nhau. Ví dụ các dãy được xem là `Arithmetic`:
```go
[1,2,3,4]
[-1,-3,-5,-7]
[7,7,7,7]
```
Dãy không được coi là `Arithmetic` như:
```go
[1,1,2,5,7]
```
Cho một dãy cho trước A gồm N số, tìm tổng số các dãy con là `Arithmetic`.
Ví dụ dãy
```go
A = [1,2,3,4]
```
thì chúng ta có tất cả 3 dãy con đảm bảo tính chất của đề bài:
```go
1. [1,2,3]
2. [2,3,4]
3. [1,2,3,4]
```
### Hướng giải quyết
Đọc đề bài, cái đầu tiên nhận thấy là nó có tính chất gối đầu, nghĩ ngay đến quy hoạch động liền (honho)
Ta sẽ dùng một mảng `dp` để lưu lại số  dãy con có thể tạo được của phần tử hiện tại và các phần tử đứng trước nó trong dãy `A`

Tất nhiên: `dp[0] == dp[1] == 0`, vì 2 phần tử đầu không thể tạo được bất kì dãy con hợp lệ nào với các phần tử đứng trước nó.

Bây giờ ta xét các vị trí tiếp theo, xét tại ví trí `i` (`i` > 2) chúng ta xét có các trường hợp sau xảy ra:

- `dp[i-1] = 0`, trường hợp này 2 phần tử đứng trước nó chưa tạo ra được dãy con hợp lệ nào, vậy nên ta sẽ check nếu `A[i]-A[i-1] == A[i-1]-A[i-2]` thì `A[i]` đã tạo ra được 1 dãy con hợp lệ với 2 phần tử đứng trước nó.
- `dp[i-1] != 0`, trường hợp này là có ít nhất 2 phần tử đứng liền trước `A[i]` đã tạo ra được dãy con hợp lệ, nếu ta check `A[i]-A[i-1] == A[i-1] - A[i-2]`, thì chúng ta sẽ cộng dồn giá trị của `dp[i-1]` lên giá trị `dp[i]`


### Coding 
Trên đây là phần hướng giải quyết theo quy hoạch động, phần implement được viết bằng `Golang` như sau:
```go
func numberOfArithmeticSlices(A []int) int {
	if len(A) <= 2 {
		return 0
	}

	sum := 0
	dp := make([]int, len(A))
	dp[0], dp[1] = 0, 0

	for i := 2; i < len(A); i++ {
		if dp[i-1] == 0 {
			if A[i]-A[i-1] == A[i-1]-A[i-2] {
				dp[i] = 1
				sum++
			}
		} else {
			if A[i]-A[i-1] == A[i-1]-A[i-2] {
				dp[i] = dp[i-1] + (i - 1)
				sum += i - 1
			} else {
				dp[i] = 0
			}
		}
	}
	return sum
}
```
Or github: 
https://github.com/namtx/leetcode/blob/master/DP/arithmetic-slices/main.go
### Kết luận
Trên đây là phần implement của mình, mong các bạn đóng góp giúp mình với nhé. (thankyou)
Hẹn gặp lại các bạn ở những bài toán thú vị hơn nhiều (hehe)