## Giới thiệu
Chào các bạn tiếp tục với series về Golang, ở bài trước chúng ta đã tìm hiểu về [array](https://viblo.asia/p/go-by-example-bai-7-go-array-Az45bRBz5xY). Ở bài này chúng ta sẽ tìm hiểu tiếp về một loại loại dữ liệu mở rộng của array là Slice, hiểu rõ slice sẽ giúp ta dễ dàng hơn rất nhiều trong việc code.

![image.png](https://images.viblo.asia/cfd5a6c2-4f55-45d5-aad4-f0e179bfaa28.png)

Như ta đã nói thì array được dùng để lưu trữ  một tập họp các dữ liệu có tính chất giống nhau, nhưng nó có một vài hạn chế là một khi ta định nghĩa array với chiều dài của nó thì ta không thể thay đổi được nữa. Ví dụ khi ta khai báo array như sau.

```go
numbers := [3]{1, 2, 3}
```

Thì ta sẽ không thể thay đổi chiều dài của nó được, nên khi ta cần một mảng lưu trữ mà chiều dài của nó phụ thuộc vào dữ liệu của ta truyền vào, hoặc một mảng mà ta có thể dễ dàng thêm và xóa các thành phần trong nó, thì ta không thể sử dụng array được. Mà ta sẽ sử dụng một trong hai kiểu dữ liệu sau đây là slice và map.

## Slice
Slice được xây dựng dựa trên khái niệm của dynamic arrays, là một array có chiều dài phụ thuộc vào số lượng thành phần mà ta truyền vào và chiều dài của nó có thể tăng và giảm tùy ý được. Ví dụ ta khai báo slice như sau.

```go
numbers := []{1, 2, 3}
```

Lúc này thì ta không cần phải truyền vào chiều dài của slice mà chiều dài của nó phụ thuộc vào số lượng thành phần ta truyền vào. Với slice ở trên thì nó đang có chiều dài là 3, và ta có thể dễ dàng thêm item vào trong nó mà không cần phải tạo lại mảng mới với chiều dài là 4 như array, ta thêm item vào trong slice đơn giản chỉ bằng hàm `append`.

```go
numbers = append(numbers, 4)
```

### Slice internal

Trong Golang thì slice là một objects mà bên dưới nó sẽ là một array, và slice sẽ tương tác với array ở dưới nó để thay đổi chiều dài của array đó.

Để làm được việc đó thì slice được xây dựng với ba thành phần chính như sau:
+ Một con trỏ chỉa tới array bên dưới nó.
+ Một thuộc tính Length lưu giá trị chiều dài hiện tại của array bên dưới.
+ Một thuộc tính Capacity lưu giá trị chiều dài mà array có thể mở rộng ra.

![image.png](https://images.viblo.asia/89211908-b0ee-4be2-a5f5-238474ef412d.png)

*<div align="center">Image from [Go In Action](https://www.manning.com/books/go-in-action)</div>*

Có nghĩa là khi ta tạo slice, thì bên dưới nó sẽ tạo ra cho ta một array, sau khi slice tạo array xong thì sẽ lưu địa chỉ của array đó vào con trỏ của nó, và lấy giá trị chiều dài của array đó gán vào thuộc tính length và capacity của nó, ta sẽ tìm hiểu kĩ hơn về vấn đề này ngay sau đây.

### Creating and initializing
Trong Go để tạo một biến với kiểu dữ liệu slice thì ta có khá nhiều cách, đầu tiên là ta dùng hàm `make`, ví dụ như sau.

```
// Create a slice of strings.
// Contains a length and capacity of 5 elements.
slice := make([]string, 5)
```

Với tham số đầu tiên của hàm `make` sẽ là loại dữ liệu của toàn bộ slice, và tham số thứ hai sẽ là giá trị length của array bên dưới slice, nếu ta không truyền giá trị thứ ba thì giá trị capacity sẽ bằng với giá trị length.

Ta có thể định nghĩa length và capacity của slice riêng biệt, như sau.

```go
// Create a slice of integers.
// Contains a length of 3 and has a capacity of 5 elements
numbers := make([]int, 3, 5)
```

Hình minh họa của slice mà ta vừa tạo.

![image.png](https://images.viblo.asia/cf23292a-afca-4f16-8bfc-cf85c4bceef8.png)

Ta sẽ tìm hiểu về length và capacity ở dưới nhé, nên hiện tại các bạn chưa cần hiểu rõ lắm về hai giá trị này. Lưu ý là khi ta dùng hàm `make`, ta không thể truyền giá trị của length lớn hơn capacity được vì nó sẽ báo lỗi.

```go
// Create a slice of integers.
// Make the length larger than the capacity.
slice := make([]int, 5, 3)
```

```bash
Compiler Error:
len larger than cap in make([]int)
```

Một cách dễ dàng nhất để tạo slice là ta sẽ dùng slice literal, cú pháp giống như với array literal, chỉ khác là ta không cần phải truyền vào giá trị chiều dài của slice, ví dụ.

```go
// Create a slice of strings.
// Contains a length and capacity of 5 elements.
slice := []string{"Red", "Blue", "Green", "Yellow", "Pink"}

// Create a slice of integers.
// Contains a length and capacity of 3 elements.
slice := []int{10, 20, 30}
```

Ta cũng có thể tạo một slice rỗng hay còn gọi là `nil slice`.

```go
var slice []int
```

```go
// Use make to create an empty slice of integers.
slice := make([]int, 0)
```

```go
slice := []int{}
```

Khi ta tạo nil slice, ta sẽ không cần truyền vào giá trị length hoặc capacity gì cả, minh họa của nó như sau.

![image.png](https://images.viblo.asia/6676592e-ebc5-41ff-9dc4-9a6ee85e9902.png)

Khi ta tạo nil slice thì nó sẽ không có tạo ra một array bên dưới, ta thường dùng nil slice cho một empty collection, ví dụ là một câu query từ database mà trả về giá trị rỗng.

### Understand length and capacity
**Thuộc tính length** của slice sẽ định nghĩa chiều dài của các item mà slice có thể truy cập được của array bên dưới, ví dụ với biến slice sau đây.

```go
slice := make([]int, 3, 5)
```

Thì ta chỉ có thể truy cập và sử dụng được vị trị thứ 0, 1 và 2 của slice.

```go
slice[0] = 50

slice[1] = 10

slice[2] = 20

fmt.println(slice[1]) // 10
```

Nếu ta truy cập vị trị thứ 3, Go sẽ báo lỗi.

```go
slice[3] = 20
```

```bash
panic: runtime error: index out of range [3] with length 3
```

Vậy thì giá trị capacity sẽ có ý nghĩa gì? Thật ra khi ta tạo slice mà có capacity lớn hơn length thì ở bên dưới slice sẽ tạo cho ta một array với độ dài bằng với giá trị capacity của slice, nhưng các vị trí mà lớn hơn length của slice ta sẽ không truy cập được mà slice sẽ giữ những vị trí đó khi ta mở rộng slice.

Ví dụ với slice của ta ở trên khi ta khai báo nó với length 3 và capacity 5 và gán giá trị ở vị trí 0, 1 và 2 cho nó.

![image.png](https://images.viblo.asia/e5d8ac69-7e21-4dab-9b43-69c8aefcd9c7.png)

Sau đó, ta muốn thêm giá trị vào trong slice này, ta sẽ dùng hàm `append`.

```go
slice = append(slice, 30)
```

![image.png](https://images.viblo.asia/a5613c5f-5b2b-4620-9f48-8ca236ba1409.png)

```go
slice = append(slice, 40)
```

![image.png](https://images.viblo.asia/d4a152b4-5c8a-40cc-81df-86df3ef3dcfe.png)

Lúc này thì length đã bằng với capacity, nếu ta thêm giá trị vào slice thì chuyện gì sẽ xảy ra.

```go
slice = append(slice, 50)
```

Khi ta thêm một item vào slice mà khiến thuộc tính length vượt quá capacity, thì ở bên dưới slice sẽ tạo ra ra cho ta một array mới với giá trị length mới và copy giá trị của array cũ vào array mới, còn ở trên khi làm việc với slice thì sẽ không có gì thay đổi.

![image.png](https://images.viblo.asia/0d138f75-244b-4572-ad1d-8234c3786677.png)

Và từ bây giờ, mỗi khi ta thêm item vào trong slice thì bên dưới nó sẽ tạo ra một array mới và copy giá trị của array cũ qua, việc này sẽ khiến performance của ta chậm đi một lúc. Vì mỗi lần như vậy slice đều phải tạo array và copy giá trị array cũ qua array mới.

Nên ta sẽ thấy tầm quan trọng của thuộc tính capacity, khi slice còn đủ capacity thì nó chỉ việc tăng giá trị của thuộc tính length lên mà không cần phải tạo array mới rồi copy giá trị của array cũ qua.

Đây là những thứ cơ bản ta cần biết về Slice, giờ ta sẽ làm một mini game để áp dùng kiến thức đã học nào.

## Build random game
Random game ta sẽ xây dựng như sau, khi trò chơi bắt đầu ta sẽ yêu cầu người dùng nhập vào tên của từng player cho tới khi nào người dùng nhập vào `start` thì trò chơi sẽ bắt đầu, game của ta sẽ random lấy ra một trong những người được nhập vô như trò random ta thường thấy.

```bash
go run main.go
```

```
Please enter player's name or enter 'start' to starting game: Jax
Please enter player's name or enter 'start' to starting game: Ten
Please enter player's name or enter 'start' to starting game: Tom
Please enter player's name or enter 'start' to starting game: start
```

```
Have 3 players: Jax Ten Tom
```

```
Random player is Jax
```

Trước tiên ta tạo một file main.go và khai báo slice rỗng, vì lúc này ta chưa biết slice của ta sẽ chứa bao nhiêu phần tử.

```main.go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	var players []string
}
```

Tiếp theo ta sẽ dùng vòng lập do/while để lập đi lập lại việc cho người dùng nhập vào tên của player.

```main.go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	var players []string
    
    for {
		var player string
		fmt.Print("Please enter player's name or enter 'start' to starting game: ")
		fmt.Scan(&player)
		
        if player == "start" {
			break
		}
        
        players = append(players, player)
	}
}
```

Ở từng vòng lập ta sẽ dùng hàm `append` để thêm item vào slice, và ta kiểm tra nếu người dùng nhập vào `start` thì ta bắt đầu trò chơi.

```main.go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	var players []string

	for {
		var player string
		fmt.Print("Please enter player's name or enter 'start' to starting game: ")
		fmt.Scan(&player)
		
        if player == "start" {
			break
		}
        
        players = append(players, player)
	}

	fmt.Printf("Have %d players: ", len(players))
	for _, v := range players {
		fmt.Printf("%s ", v)
	}

	source := rand.NewSource(time.Now().UnixNano())
	r := rand.New(source)
	number := r.Intn(len(players))

	fmt.Printf("\nRandom player is %s\n", players[number])
}
```

Tiếp theo ta sẽ dùng hàm random để random ra một số từ 0 tới chiều dài của slice, sau đó ta sẽ dựa vào giá trị random đó để lấy ra vị trí của người dùng.

Giờ ta kiểm tra thử game nào.

```
go run main.go
```

```
Please enter player's name or enter 'start' to starting game: Alex
Please enter player's name or enter 'start' to starting game: John
Please enter player's name or enter 'start' to starting game: Tung
Please enter player's name or enter 'start' to starting game: start
```

```
Have 3 players: Alex John Tung 
Random player is Tung
```

Ok, ta đã code thành công 😁. Github của toàn bộ series https://github.com/hoalongnatsu/go-by-example.

## Kết luận
Vậy là ta đã tìm hiểu xong về Slice, nó là một dạng dynamic array và rất tiện cho ta, khi code thực thì ta sẽ ít dùng array mà sẽ sử dụng slice nhiều hơn, nắm được slice sẽ kiến công việc của ta trở nên dễ dàng hơn. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

## Mục tìm kiếm đồng đội

![](https://images.viblo.asia/17647fc7-67d1-44a8-aae1-a8a1f2266351.jpg)

Hiện tại thì công ty bên mình, là Hoàng Phúc International, với hơn 30 năm kinh nghiệm trong lĩnh vực thời trang. Và sở hữu trang thương mại điện tử về thời trang lớn nhất Việt Nam. Team công nghệ của HPI đang tìm kiếm đồng đội cho các vị trí như:
+ Senior Backend Engineer (Java, Go). Link JD: https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022
+ Senior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021
+ Junior Backend Engineer (Java, Go). https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067
+ Junior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/careers/job/1068
+ App (Flutter). https://tuyendung.hoang-phuc.com/job/mobile-app-engineer-flutter-1239
+ Senior Data Engineer. https://tuyendung.hoang-phuc.com/job/seniorjunior-data-engineer-1221

Với mục tiêu trong vòng 5 năm tới về mảng công nghệ là:
+ Sẽ có trang web nằm trong top 10 trang web nhanh nhất VN với 20 triệu lượt truy cập mỗi tháng.
+ 5 triệu loyal customers và có hơn 10 triệu transactions mỗi năm.

Team đang xây dựng một hệ thống rất lớn với rất nhiều vấn đề cần giải quyết, và sẽ có rất nhiều bài toán thú vị cho các bạn. Nếu các bạn có hứng thú trong việc xây dựng một hệ thống lớn, linh hoạt, dễ dàng mở rộng, và performance cao với kiến trúc microservices thì hãy tham gia với tụi mình.

Nếu các bạn quan tâm hãy gửi CV ở trong trang tuyển dụng của Hoàng Phúc International hoặc qua email của mình nha `hmquan08011996@gmail.com`. Cảm ơn các bạn đã đọc.