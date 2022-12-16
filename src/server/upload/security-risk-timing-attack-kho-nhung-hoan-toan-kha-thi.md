Timing Attack là một trong những kĩ thuật mà hacker lợi dụng việc tính toán ở phía server để điều chỉnh payload attack cho phù hợp. Trong bài viết này mình sẽ nêu một ví dụ phổ biến nhất về cách tấn công này cũng như cách phòng chống với Golang.

![](https://images.viblo.asia/579f76b4-4447-4fed-ba90-b10d1fe88951.png)

## I. Timing Attack
- Là một dạng tấn công thuộc loại side-channel mà hacker dựa vào thông tin phân tích được từ thời gian thực thi một đoạn logic từ hệ thống từ đó truy ra dần kết quả sau cùng, có thể xem Timing Attack là một dạng `manual brute force` cũng được, vì cùng một cách thức để truy ra kết quả, nhưng khác là hacker cần đầu tư nhiều hơn để phân tích dữ liệu đang có để cho ra input tiếp theo.
- Hacker luôn cố gắng lợi dụng sơ sẩy của lập trình viên ở những đoạn code logic phổ biến mà thường bị tầm thường hoá (mình sẽ nêu ví dụ ở bên dưới) hoặc những library (open source) mà chúng ta thường dùng, cũng không thoát khỏi việc chứa lỗ hổng này

## II. Ví dụ thực tế

Đối với lập trình viên, chúng ta sẽ phải gặp trường hợp cần xác thực request đến từ phía client, hay server to server. Có rất nhiều cách để triển khai, thông thường là sử dụng JWT, Oauth2, OpenID Connect hay sử dụng bên thứ 3 để authen như Google, Facebook, AWS Cognito...Một trong những cách phổ biến và dễ triển khai nhất là sử dụng API key.

Tuy nhiên APIKey vẫn có thể bị lộ bằng nhiều cách tấn công, một trong số đó là `Timing attack`

## III. Cách phòng chống Timing Attack

Có một người Thầy ở trường của mình đã truyền bí kíp cho sinh viên cách chống hoàn toàn việc hệ thống, ứng dụng của mình bị hack. Bằng cách ngắt internet đi, hay ứng dụng đó "xịn" đến nỗi mà hacker không thèm tấn công hoặc.. cách cuối cùng là thắp nhang cầu xin 😂

Nói đùa một chút thôi, chúng ta không thể nào ngăn chặn hoàn toàn rủi ro hệ thống bị tấn công, nhưng khi hiểu về nó, chúng ta sẽ làm con đường mà hacker đang tìm trở nên khó khăn hơn.

Mình sẽ sử dụng Golang cho ví dụ ở trên, khi sử dụng API key, chắc chắn sẽ có đoạn logic cần thực hiện để thực hiện so sánh API key được gửi kèm từ request với key được lưu trữ ở phía server. Chúng ta thường sử dụng thuật toán mặc định (toán tử `==`) để thực hiện so sánh, đơn giản như thế thôi, nhưng thực tế điều này có thể được hacker lợi dụng.

```go
var (
	a      []byte
	length int = 1e8
	bound  int = length / 10
)

func init() {
	a = make([]byte, length)
	rand.Read(a)
}

func copyStr(changedIndex int) []byte {
	b := make([]byte, length)
	copy(b, a)

	if b[changedIndex] == 0 {
		b[changedIndex] = 1
	} else {
		b[changedIndex] = 0
	}

	return b
}

func formatString(s int) string {
	str := strconv.Itoa(s)
	var result string
	for i := len(str) - 1; i >= 0; i-- {
		if (len(str)-1-i)%3 == 0 && i != len(str)-1 {
			result = "." + result
		}
		result = string(str[i]) + result
	}
	return result
}

func execute(fn func(a, b []byte) bool) {
	for i := length - 1; i > 0; i -= bound {
		b := copyStr(i)

		startTime := time.Now()
		fn(a, b)
		endTime := time.Since(startTime)

		fmt.Printf("Differences at Index: %s, time execute: %s\n", formatString(i), endTime.String())
	}
}

func Compare(a, b []byte) bool {
	return string(a) == string(b)
}

func CompareConstantTime(a, b []byte) bool {
	return subtle.ConstantTimeCompare(a, b) == 1
}
```

- Đoạn code trên sẽ so sánh 2 chuỗi có độ dài như nhau nhưng tại một index nào đó sẽ khác nhau. Với toán tử `==`, chương trình sẽ ngay lập tức dừng thực hiện so sánh phần còn lại và trả về kết quả..hmmm bạn hiểu rồi chứ 😄. Nếu API key của bạn là "abc", hacker sẽ thử với chuỗi "aaa" và "aba", dễ nhận thấy thời gian thực hiện chuỗi "aba" lâu hơn, nên có thể đoán được "aba" là chuỗi có độ chính xác cao hơn, và cứ thế tiếp tục...

Chính vì thế trong đoạn code trên mình có sử dụng `subtle.ConstantTimeCompare`, function trả về `1` nếu hai chuỗi bằng nhau,`0` nếu khác nhau và ngay lập tức trả về 0 nếu độ dài hai chuỗi không giống nhau. Nhưng khác với so sánh chuỗi thông thường như thế nào thì chúng ta sẽ chạy đoạn code trên và quan sát kết quả:

```go
func main() {
	fmt.Printf("Length of chars: %s\n\n", formatString(length))

	fmt.Println("Normal comparison: using equal operator")
	execute(Compare)

	fmt.Println("\n" + strings.Repeat("*", 50) + "\n")

	fmt.Println("Constant time comparison: using subtle.ConstantTimeCompare")
	execute(CompareConstantTime)
}
```

![image.png](https://images.viblo.asia/01d3b164-4c4d-41f8-81c1-704e3e539a86.png)


- Đối với so sánh thông thường, vị trí khác nhau của chuỗi càng về sau, thời gian thực thi sẽ càng lâu nhưng với `ConstantTimeCompare`, kết quả thực thi luôn đảm bảo gần như giống nhau

## IV. Kết luận
- Trên thực tế thời gian thực thi sẽ ảnh hưởng bởi rất nhiều yếu tố như network latency, thead khác,...có thể phải thực hiện rất nhiều mẫu thử để cho ra sai số nhỏ nhất. Cách tấn công này thực sự rất khó để đạt được mục đích nhưng hoàn toàn có thể xảy ra
- Bên cạnh đó việc sử dụng `ConstantTimeCompare` sẽ tốn thời gian hơn, chúng ta hãy sử dụng khi thật sự cần thiết nhé ^^

Cảm ơn các bạn đã xem bài viết.