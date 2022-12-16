## Giới thiệu
Chào các bạn tiếp tục với series về Golang, ở bài trước chúng ta đã tìm hiểu về Slice. Ở bài này chúng ta sẽ tìm hiểu tiếp về một loại loại dữ liệu mà được sử dụng khá nhiều trong Go là Map.

![image.png](https://images.viblo.asia/22416ea1-4b34-4c6b-bb53-e7389d57d812.png)

Ta đã học về array và biết nó là một dạng data structure dành cho ordered collection. Map sẽ khác biệt với array khá nhiều.

## Map
Map là một dạng data structure dành cho unordered collection, dữ liệu trong Map sẽ được lưu trữ ở dưới dạng key/value. Ta sẽ lưu trữ value vào trong map với một key nào đó, ví dụ:

```go
colors := map[string]string{"red": "#FF5733", "yellow": "#FFC300"}
```

Biến ở trên sẽ được lưu trữ như sau bên trong Map.

![image.png](https://images.viblo.asia/f2172fdd-377b-4adc-9c9b-4bedce5ba88a.png)

Điểm mạnh của Map so với Array hoặc Slice là nó cho phép ta truy cập giá trị nhanh chóng bằng key.

### Map Internals
Map là một collections, và bạn có thể dùng câu lệnh for để duyệt qua nó giống như array và slice. Nhưng vì nó là một unordered collections, nên mỗi lần duyệt thì thứ tự key/value trả về sẽ khác nhau, cho dù bạn có lưu trữ giá trị key/value theo thứ tự thì mỗi lần duyệt nó vẫn trả về thứ tự khác nhau. Dó là vì Map được xây dựng dựa theo Hash Table.

Map's hash table là một tập họp của nhiều bucket, với mỗi bucket sẽ có giá trị key/value mà ta cần. Khi bạn truy cập map bằng key, việc đầu tiên nó làm là kiểm bucket mà chứa key đó thông qua việc thực hiện hash function. Như hình minh họa bên dưới.

![image.png](https://images.viblo.asia/7c7f451a-7a39-4c1e-86e9-b8780e7f98d5.png)

Như bạn thấy ở trên, khi ta truy cập vào map bằng key, giá trị key đó sẽ được hash function chuyển thành một index tương ứng nằm trong array bucket. Từ đó ta có thể nhanh chóng lấy được giá trị mà ta muốn.

### Creating and initializing
Trong Go để khai báo Map thì ta có hai cách như sau, cách đầu tiên là ta dùng hàm `make`.

```go
colors := make(map[string]int)
```

Với giá trị nằm trong dấu `[]` là kiểu dữ liệu của key, và sau đó là kiểu dữ liệu của value. Ví dụ như ở trên map có key với kiểu dữ liệu là string và giá trị có kiểu dữ liệu là int.

Cách thứ hai để khai báo map là ta dùng map literal.

```go
numbers := map[string]int{"1": 1, "2": 2}
```

Lưu ý là ta không thể dùng  slices, functions, và struct types mà chứa slices để làm key cho map, vì nó sẽ báo lỗi. Ví dụ:

```go
dict := map[[]string]int{}
```

Ở trên ta khai báo dữ liệu của key là slice of string, và nó sẽ báo lỗi khi bạn chạy.

```go
Compiler Exception:
invalid map key type []string
```

### Working with maps
Cách ta sử dụng map thì cũng tương tự như array, để gán giá trị cho map ta làm như sau.

```go
// Create an empty map to store numers and their number codes
numbers := map[string]int{}

numbers["1"] = 1
numbers["2"] = 2
```

Để truy cập giá trị của map thì ta chỉ cần chỉ định key của nó.

```go
fmt.Println(numbers["1"])
```

Tuy nhiên sẽ có vài trường hợp ta truy cập key không có tồn tại, để kiểm tra key đó có tồn tại trước khi sử dụng ta có thể làm như sau.

```go
value, exists := numbers["3"]

// Did this key exist?
if exists {
    fmt.Println(value)
}
```

Giá trị thứ hai ta lấy về từ map là một biến boolean, và ta có thể dùng nó để kiểm tra key có tồn tại hay không.

Để duyệt qua một biến với kiểu dữ liệu là map, ta sẽ dùng cú pháp `for range`.

```go
colors := map[string]string{
    "AliceBlue":   "#f0f8ff",
    "Coral":       "#ff7F50",
    "DarkGray":    "#a9a9a9",
    "ForestGreen": "#228b22",
}

// Display all the colors in the map.
for key, value := range colors {
    fmt.Printf("Key: %s Value: %s\n", key, value)
}
```

Để xóa key bên trong map thì rất đơn giản, ta sẽ dùng hàm delete.

```go
delete(colors, "Coral")
```

### Passing maps between functions
Khi ta truyền map vào trong function thì nó cũng giống khi ta truyền slice, nó sẽ truyền theo kiểu reference. Có nghĩa là nếu trong hàm ta thay đổi giá trị của map thì nó sẽ ảnh hưởng tới map bên ngoài.

```go
func main() {
	// Create a map of colors and color hex codes.
	colors := map[string]string{
		"AliceBlue":   "#f0f8ff",
		"Coral":       "#ff7F50",
		"DarkGray":    "#a9a9a9",
		"ForestGreen": "#228b22",
	}

	// Display all the colors in the map.
	for key, value := range colors {
		fmt.Printf("Key: %s Value: %s\n", key, value)
	}

	// Call the function to remove the specified key.
	removeColor(colors, "Coral")

	// Display all the colors in the map.
	for key, value := range colors {
		fmt.Printf("Key: %s Value: %s\n", key, value)
	}
}

// removeColor removes keys from the specified map.
func removeColor(colors map[string]string, key string) {
	delete(colors, key)
}
```

Kết quả.

```bash
Key: AliceBlue Value: #F0F8FF
Key: Coral Value: #FF7F50
Key: DarkGray Value: #A9A9A9
Key: ForestGreen Value: #228B22

Key: AliceBlue Value: #F0F8FF
Key: DarkGray Value: #A9A9A9
Key: ForestGreen Value: #228B22
```

## Maximum element of occurrences in an array
Giờ ta sẽ ứng dụng Map để làm một bài toán giải thuật đơn giản, là tìm thành phần xuất hiện nhiều nhất bên trong một array (với điều kiện là sẽ không có thành phần nào có số lần xuất hiện cao nhất giống nhau). Tạo một file tên là `main.go`

```main.go
package main

import "fmt"

func main() {
	persons := []string{
		"Ronaldo", "Messi", "Pogba", "Hazard", "Hazard",
		"Messi", "Ronaldo", "Pogba", "Ronaldo", "Messi",
		"Hazard", "Ronaldo", "Ronaldo", "Messi",
	}
	countPerson := map[string]int{}

	for _, p := range persons {
		_, exist := countPerson[p]

		if exist {
			countPerson[p]++
		} else {
			countPerson[p] = 1
		}
	}

	fmt.Printf("%+v\n", countPerson)

	var max int
	var person string

	for key, value := range countPerson {
		if value > max {
			max = value
			person = key
		}
	}

	fmt.Println(person)
}
```

Ở đoạn code trên, ta sẽ có một biến `persons` chứa tên của các cầu thủ và ta cần tìm tên cầu thủ xuất hiện nhiều nhất trong slice ở trên.

Đầu tiên ta tạo một biến `countPerson` để lưu số lượng tên cầu thủ xuất hiện trong mảng persons. Ta khai báo biến countPerson là map vì ta muốn tận dụng các đặt tính của map.

Ở dưới ta sẽ duyệt qua biến persons, cú pháp `for range` sẽ trả về cho ta hai giá trị là index và value của biến persons, vì ta không xài index nên ta dùng dấu `_` để ignore nó.

Tiếp theo ở trong vòng lập, giá trị `p` sẽ là tên của từng cầu thủ, ta sẽ kiểm tra xem trong biến countPerson đã có tên của cầu thủ đó chưa, bằng cách truy cập biến countPerson với key là tên của cầu thủ.

```go
_, exist := countPerson[p]
```

Sau đó ta kiểm tra như sau: nếu đã có cầu thủ đó trong biến countPerson thì ta sẽ tăng số lần xuất hiện của cầu thủ đó lên, còn nếu cầu thủ đó chưa được lưu trong biến countPerson thì ta gán số lần xuất hiện của cầu thủ đó là 1.

```go
if exist {
    countPerson[p]++
} else {
    countPerson[p] = 1
}
```

Sau khi vòng for chạy xong ta thì biến countPerson của ta sẽ như sau.

```bash
map[Hazard:3 Messi:4 Pogba:2 Ronaldo:5]
```

Tiếp theo thì đơn giản, ta dùng vòng for để lấy ra giá trị max thôi.

```go
var max int
var person string

for key, value := range countPerson {
    if value > max {
        max = value
        person = key
    }
}
```

Chạy thử để kiểm tra kết quả.

```
go run main.go
```

Kết quả.

```bash
map[Hazard:3 Messi:4 Pogba:2 Ronaldo:5]
Ronaldo
```

## Kết luận
Vậy là ta đã tìm hiểu xong về Map, đây là kiểu dữ liệu ta sẽ xài nhiều nhất nếu ta làm REST API với Go. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

## Mục tìm kiếm đồng đội

![](https://images.viblo.asia/17647fc7-67d1-44a8-aae1-a8a1f2266351.jpg)

Hiện tại thì công ty bên mình, là Hoàng Phúc International, với hơn 30 năm kinh nghiệm trong lĩnh vực thời trang. Và sở hữu trang thương mại điện tử về thời trang lớn nhất Việt Nam. Team công nghệ của HPI đang tìm kiếm đồng đội cho các vị trí như:
+ Senior Backend Engineer (Java, Go). Link JD: https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022
+ Senior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021
+ Junior Backend Engineer (Java, Go). https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067
+ Junior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/careers/job/1068
+ App (Flutter). https://tuyendung.hoang-phuc.com/job/mobile-app-engineer-flutter-1239
+ Senior Data Engineer. https://tuyendung.hoang-phuc.com/job/seniorjunior-data-engineer-1221
+ Manual QC. https://tuyendung.hoang-phuc.com/job/seniorjunior-manual-qc-1039

Với mục tiêu trong vòng 5 năm tới về mảng công nghệ là:
+ Sẽ có trang web nằm trong top 10 trang web nhanh nhất VN với 20 triệu lượt truy cập mỗi tháng.
+ 5 triệu loyal customers và có hơn 10 triệu transactions mỗi năm.

Team đang xây dựng một hệ thống rất lớn với rất nhiều vấn đề cần giải quyết, và sẽ có rất nhiều bài toán thú vị cho các bạn. Nếu các bạn có hứng thú trong việc xây dựng một hệ thống lớn, linh hoạt, dễ dàng mở rộng, và performance cao với kiến trúc microservices thì hãy tham gia với tụi mình.

Nếu các bạn quan tâm hãy gửi CV ở trong trang tuyển dụng của Hoàng Phúc International hoặc qua email của mình nha `hmquan08011996@gmail.com`. Cảm ơn các bạn đã đọc.