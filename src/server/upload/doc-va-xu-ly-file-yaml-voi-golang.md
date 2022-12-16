### Mở đầu
YAML viết tắt của "YAML Ain't Markup Language" là định dạng phổ biến và thường được sử dụng rộng rãi để làm các file cấu hình mà ta thường bắt gặp ở các hệ thống như CI/CD, Ansible, Docker..v..v. 

Bởi tính trực quan, có cấu trúc và tương đối dễ đọc đối với người dùng, mà không cần bỏ ra nhiều thời gian để học và làm quen.  Nên định dạng yaml có phần dễ bắt gặp so với `.cnf, .conf, .cfg, .cf hay .ini` trong mảng dùng làm file cấu hình.

Vậy nên, trong quá trình làm việc chúng ta thường bắt gặp một số task phải xử lý file định dạng yaml này. Phần cũng mình thấy trên Viblo của chúng ta cũng chưa có bài nào viết về việc đọc và xử lý file yaml nhất là bằng ngôn ngữ khá mới như golang. Nên mình xin phép viết một bài về vấn đề này. Tuy cũng không quá khó hay có gì phức tạp cả, nhưng hy vọng có thể hữu ích cho những ai cần đến....

### yaml.v2
Việc đọc và xử lý file yaml với golang thì có phần phức tạp hơn thông thường một chút. Nhất là nếu đen so với PHP, nhìn chung đọc file yaml với PHP có các function có trong extension yam, hay cực dễ dùng với package [Symfony Yaml](https://symfony.com/doc/current/components/yaml.html). Chỉ cần đưa đường dẫn file vào và ta nhận được một mảng, sau đó cứ thế xử lý tiếp với mảng này thôi. 

Còn với golang thì rối hơn chút. Phần vì một bên là dynamic và một bên static language nên với go kiểu dữ liệu phải được xác định rõ trước. Nhất là với mỗi block trong file yml, nó có thể là một slice, một map hoặc một string nên việc parse một file yml thành ra tương đối khó. 
Thực tế thì việc đọc file yml không được go hỗ trợ một cách native. Tuy nhiên, hiện nay có một vài thư viện phần nào (chỉ phần nào thôi) cũng đã hỗ trợ chúng ta làm việc này. Nổi tiếng nhất là [go-yaml](https://github.com/go-yaml/yaml/tree/v2.2.2)  có tới hơn 3000 lượt start trên github. (Có package hỗ trợ, nhưng không dễ xơi chút nào nhé)

Ta hãy làm một ví dụ nhỏ dưới đây, sử dụng package trên để parse file yml đơn giản thử xem. Đầu tiên là một cấu trúc đơn giản thôi nhé :
```yaml
actions:
  - run
  - swim
  - kick
```

Đoạn này khá đơn giản, để lấy được các `actions`. Ta chỉ cần parse chúng vào một `slice of string` (có thể hiểu nôm na nó là một mảng các string ) như đoạn code mẫu sau:

```go
package main

import (
	"fmt"
	"io/ioutil"
	"log"
	yaml "gopkg.in/yaml.v2"
)

type Yml struct {
	Actions []string `yaml:"actions"`
}

func main() {
	yml := Yml{}
	yamlFile, err := ioutil.ReadFile("example.yml")
	HandleError("Read yml file error -> ", err)

	e := yaml.Unmarshal(yamlFile, &yml)
	HandleError("Unmarshal error -> ", e)

	fmt.Println(yml.Actions)
}

func HandleError(message string, e error) {
	if e != nil {
		log.Fatal(message, e)
	}
}
```
Để ý rằng ta khai báo một struct `Yml` sau đó convert cả file yml vào struct này. Trong struct có trường `Actions` tường ứng với key của khối `actions` trong file. `yaml:"actions"` để thông báo rằng struct fied này tường ứng với khối có key là `actions` trong file yml. 

Điểm thú vị là bạn không cần phải thêm `yaml:"actions"` nếu struc fied của chúng ta có tên đặt giống với key trong file yml. ` go-yaml ` sẽ tự động nhật biết key và parse vào struct file tương ứng. Thực thi chương trình trên ta được như sau:
```shell
[run swim kick]
```
Rồi, ví dụ trên khá đơn giản. Thực tế thì cũng chẳng có cái file yml nào lại đơn giản đến vậy cả, bây giờ ta thử với một mẫu yml có cấu trúc phức tạp hơn như sau:
```yaml
actions:
  - run
  - swim
  - kick
  
person:
  john:
    name: John
    info: 
      address: HaNoi
      age: 26
      phone: 777
    skills:
      - php
      - golang
      - nodejs
  trump:
    name: Trump
    info: 
      address: SF
      age: 27
      phone: 888
    skills:
      - html
      - javascript
      - css
```

Khá khó, phải không nào. Bên trong khối `person`, `john` và `trump` là có kiểu `map[string]???` với key có kiểu string thì chúng nhìn thôi ta biết rồi. Nhưng các khối bên trong thì lại có kiểu dữ liệu rất biến đổi khác nhau. 
* `name:john` có kiểu `map[string]string`
* `info` lại có kiểu `map[string]map[string]string`
* còn `skills` lại là `slice of string`

Trường hợp này làm mình rất bối rối, bởi không biết khai báo, định nghĩa struct `Yml` như đã nói ở trên như thế nào cho phù hợp. 
Tới đây, dẫn chúng ta đến khái niệm `interface` hay cụ thể hơn trong trường hợp của chúng ta là `empty interface - interface{}`

Nhắc lại khái niệm interface trong golang, thì interface có thể là `một tập các method` cũng đồng thời là một `kiểu` nên ta có thể khai báo một biến có kiểu interface. Hãy nhìn đoạn code mà mình lụm được trên mạng dưới đây:
```go
package main

import "fmt"

type Dog struct {
    Age interface{}
}

func main() {
    dog := Dog{}
    dog.Age = "3"
    fmt.Printf("%#v %T\n", dog.Age, dog.Age) // -> "3" string

    dog.Age = 3
    fmt.Printf("%#v %T\n", dog.Age, dog.Age) // 3 int

    dog.Age = "not really an age"
    fmt.Printf("%#v %T", dog.Age, dog.Age) // "not really an age" string
}
```
Tại thời điểm runtime, go sẽ convert kiểu dữ liệu của biến được khai báo có type empty interface này, thành kiểu dữ liệu thực sự mà biến đang nắm dữ. (Cái này hại não quá, mình cũng không biết gải thích thế nào cho dễ hiểu hơn. Nhìn đoạn code trên có khi còn dễ hình dung hơn là mình giả thích nữa :tired_face:)

Nói chung emty interface là một cách để golang mềm mỏng hóa việc khai báo kiểu dữ liệu của biến, một lối đi để chúng ta lách luật hà khắc trong việc khai báo biến và kiểu dữ của liệu biến, vốn có ở  các static programming language.

Thôi nhức đầu quá, quay lại vấn đề chính là đọc cái file yml ở trên đi. Bây giờ, vì không đoán định được kiểu dự liệu của các khối cha lẫn con bên trong person. Nên chúng ta cần dùng đến `empty interface` như đã nói ở trên. Cụ thể, ta khai báo struct `Yml` như sau:
```go
type Yml struct {
	Actions []string
	Person  map[string]map[string]interface{}
}
```
`john` và `trump` là có kiểu map với key là `string`, tương tự các khối con bên trong cũng là các map với key là string, nhưng value có kiểu `interface{}` và chúng ta không biết được cụ thể chúng có kiểu gì .Ở trong hàm main. Chúng ta thử in ra giá trị của trường Person như đã làm với Action xem sao:
```go
fmt.Println(yml.Person)
```
Kết quả
```
map[john:map[info:map[address:HaNoi age:26 phone:777] skills:[php golang nodejs] name:John] trump:map[name:Trump info:map[address:SF age:27 phone:888] skills:[html javascript css]]]
```
Nhìn thế thôi, nhưng cứ thử lặp qua cái map có key "info" trong kết quả bên trên mà xem:
```go
for k, v := range yml.Person["john"]["info"] {
		fmt.Println("k:", k, "v:", v)
}
```
Hoàn toàn không thể được, mặc dù rõ ràng lúc in giá trị ra chúng ta thấy nó có kiểu là `info:map[address:HaNoi age:26 phone:777]`. Và báo lỗi như sau:
```
cannot range over yml.Person["john"]["info"] (type interface {})
```
Bởi nhìn thi là map nhưng không phải map. Mà là kiểu interface, nên trước khi lặp hoặc lấy ra giá trị, ta cần phải xác định giá trị thực sự lúc này là gì rồi sử dụng [type switch](https://golang.org/doc/effective_go.html#type_switch) để chuyển đổi sang kiểu dữ liệu thực sự tương ứng. Hoặc để hỗ trợ việc này, ta sử dụng package `reflect` - một package giúp chúng ta xác định kiểu dữ liệu thực sự lại thời điểm runtime. Ta hãy nhìn đoạn code dưới đây:
```go
for _, v := range yml.Person {
		for k, j := range v {
			fmt.Print(k, " -> ")
			fmt.Println(reflect.TypeOf(j).String())
		}
	}
```
Kết quả
```
info -> map[interface {}]interface {}
skills -> []interface {}
name -> string
```
Hoặc cụ thể hơn, muốn lấy ra khối infor trong file yml ta làm như sau:
```go
for _, v := range yml.Person {
		for _, ps := range v {
			i := reflect.ValueOf(ps)

			if i.Kind() == reflect.Map {
				for _, key := range i.MapKeys() {
					strct := i.MapIndex(key)
					fmt.Println(key.Interface(), strct.Interface())
				}
			} else if i.Kind() == reflect.Slice {
				for t := 0; t < i.Len(); t++ {
					fmt.Println(i.Index(t))
				}
			} else if i.Kind() == reflect.String {
				fmt.Println(i)
			}

		}
	}
```
Dùng reflect để kiểu tra xem trường value tại điểm runtime là map, slice hay tring mà chúng ta xử lý, và lấy giá trị ra khác nhau.

### Kết luận

Bài rất dài, và khi kết bài thì mình vẫn còn nhiều điểm lăn tăn và muốn làm rõ hơn. Nhưng thực sự quá khó để điểm qua hết các khái niệm nhắc đến trong bài ![](https://chatpp.thangtd.com/img/emoticons/facepalm.gif) <br>Nhìn chung là khá rối, tuy nhiên thật sự hữu ích nếu bạn nào cần rơi vào trường hợp cần xử lý file yml như mình - hy vọng có ích đối với bạn nào đang đọc bài này.
Mình có để lại link một số lý thuyết và tham khảo bên dưới. Hy vọng bạn có thời gian xem qua và làm nắm rõ hơn. Code mẫu mình để tại đây https://gist.github.com/dangminhtruong/89f08843b58d54669099363843b6fec8. Cám ơn bạn nhiều vì đã giành thời gian cho bài viết của mình...
### Một số tài liệu tham khảo
https://jordanorelli.com/post/32665860244/how-to-use-interfaces-in-go
https://stackoverflow.com/questions/23148812/whats-the-meaning-of-interface
https://tour.golang.org/methods/16
https://research.swtch.com/interfaces