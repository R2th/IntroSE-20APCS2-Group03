## Giới thiệu
Shell chắc rất quen thuộc đối với các anh em sử dụng Linux, và để hiểu rõ hơn về cách Shell hoạt động, thì ở bài này chúng ta sẽ tìm hiểu bằng cách tự viết lại một chương trình Shell đơn giản bằng Golang.

![](https://images.viblo.asia/2d1942ca-fe49-4925-998e-e7071ad5cdd2.jpg)

Bài này mình tham khảo từ bài [Writing a simple shell in Go](https://simjue.pages.dev/post/2018/07-01-go-unix-shell/) của Simon Jürgensmeyer.

Trước khi viết code thì ta sẽ tìm hiểu xem Shell là gì?

## Shell?
Khi ta làm việc với *terminal*, ta mở terminal lên và gõ các câu lệnh, sau đó nhấn enter để các câu lệnh được thực thi. Thì thứ mà đọc các câu lệnh từ terminal và thực thi các câu lệnh ta nhập vào, đó chính là **Shell**.

Shell là một *user interface* để ta có thể tương tác được với hệ điều hành (Operating System). Shell sẽ thu thập các câu lệnh đầu vào từ người dùng (thông qua terminal hoặc GUI), sau đó nó sẽ thực thi các câu lệnh đó. Sau khi các câu lệnh chạy xong kết quả của các câu lệnh đó sẽ được Shell hiển thị cho người dùng (thông qua terminal hoặc GUI).

Một vài ví dụ của Shell:
+ Bash
+ Zsh
+ Gnome Shell
+ Windows Shell

Ví dụ cách hoạt động của Shell, các bạn mở terminal lên và gõ ls.

```
ls -l
```

```
total 8
drwxr-xr-x 2 ubuntu ubuntu 4096 Sep 11 22:20 load-balancer
drwxr-xr-x 2 ubuntu ubuntu 4096 Sep 11 22:21 simple-shell
```

Shell sẽ đọc từ terminal câu lệnh `ls -l`, sau đó thực thi và in kết quả ra terminal. Vậy trong Golang ta sẽ đọc dữ liệu đầu vào của người dùng như thế nào?

## Read input from users
Để đọc được dữ liệu đầu vào từ người dùng, ta sẽ làm như sau:

```go
reader := bufio.NewReader(os.Stdin)
input, err := reader.ReadString('\n')
```

Bàn phím của ta là một thiết bị đầu vào, do đó ta có thể truy cập được nó thông qua `os.Stdin`, sau đó để đọc được dữ liệu từ nó ta sẽ dùng `bufio.NewReader` với thông số truyền vào là `os.Stdin`. Lúc này hàm `NewReader` sẽ trả cho ta về một `reader` để đọc dữ liệu từ bàn phím.

Ở dòng tiếp theo thì ta sẽ đọc dữ liệu nhập vào từ bàn phím cho tới khi nào người dùng gõ phím enter, tương ứng với kí tự `/n`. Bây giờ ta sẽ bắt đầu code nào.

## Write a Shell
Tạo một file tên là `main.go` với đoạn code đơn giản như sau:

```main.go
package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	for {
		// Read the keyboad input.
		input, err := reader.ReadString('\n')
		if err != nil {
			fmt.Fprintln(os.Stderr, err)
		}

	}
}
```

Ta sẽ dùng vòng lập để liên tục đọc dữ liệu nhập vào từ người dùng và thực thi, cho tới khi người dùng bấm `Crtl + C` để kết thúc.

### Executing Commands
Tiếp theo để thực thi câu lệnh người dùng nhập vào, ta sẽ dùng hàm `exec.Command` của Go. Ví dụ:

```go
cmd := exec.Command("ls")
cmd.Run()
```

Tạo một hàm tên là `execInput(input string)` với đoạn code như sau.

```go
func execInput(input string) error {
	input = strings.TrimSuffix(input, "\n")

	cmd := exec.Command(input)

	cmd.Stderr = os.Stderr
	cmd.Stdout = os.Stdout

	return cmd.Run()
}
```

Hàm `execInput` sẽ nhận tham số truyền vào là dữ liệu đọc từ người dùng, thay vì thực thi ngay thì trước tiên ta sẽ cắt kí tự `/n` của dữ liệu đầu vào đi, sau đó mới truyền vào `exec.Command` và thực thi.

Hàm `exec.Command()` sẽ trả về cho ta một `Cmd struct`, sau đó ta sẽ gán `Stderr` và `Stdout` cho nó. **Trong Go để truy cập được các thiết bị đầu ra ta sẽ dùng `os.Stdout`.**

Cuối cùng ta sẽ dùng hàm `cmd.Run()` để thực thi câu lệnh đầu vào. Tiếp theo ta cập nhật lại file `main.go`.

```main.go
package main

import (
	"bufio"
	"fmt"
	"os"
	"os/exec"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	for {
		fmt.Print("> ")

		// Read the keyboad input.
		input, err := reader.ReadString('\n')
		if err != nil {
			fmt.Fprintln(os.Stderr, err)
		}

		if err := execInput(input); err != nil {
			fmt.Fprintln(os.Stderr, err)
		}
	}
}

func execInput(input string) error {
	input = strings.TrimSuffix(input, "\n")

	cmd := exec.Command(input)

	cmd.Stderr = os.Stderr
	cmd.Stdout = os.Stdout

	return cmd.Run()
}
```

Ta kiểm tra thử nào.

```
go run main.go
```

```bash
> ls
main.go
> date
Sun Sep 11 23:21:16 +07 2022
>
```

Nhấn `Ctrl + C` để thoát, vậy là ta đã hoàn thành đoạn code Shell đơn giản thành công 😁.

### Arguments
Bạn gõ thử câu lệnh ls mà có truyền thêm tham số vào.

```bash
> ls -l
exec: "ls -l": executable file not found in $PATH
```

Ta sẽ thấy nó bị lỗi, vì hiện tại ta đang lấy toàn bộ dữ liệu đầu vào để thực thi, trong khi dữ liệu đầu vào chỉ có giá trị đầu tiên là chương trình được thực thi, các giá trị còn lại đều là tham số của chương trình đó.

Ta cập nhật lại code như sau để nó chạy đúng.

```main.go
...

func execInput(input string) error {
	input = strings.TrimSuffix(input, "\n")
	args := strings.Split(input, " ")

	cmd := exec.Command(args[0], args[1:]...)

	cmd.Stderr = os.Stderr
	cmd.Stdout = os.Stdout

	return cmd.Run()
}
```

Để lấy được tên của chương trình thực thi và các thông số của nó, ta sẽ tách chuỗi dữ liệu đầu vào của người dùng bằng hàm `strings.Split(input, " ")`. Ví dụ với chuỗi `ls -l -a` thì sau khi truyền vào hàm `Split` ta sẽ có được mảng như sau.

```go
args := strings.Split("ls -l -a", " ")

args[0] // ls
args[1] // -l
args[2] // -a
```

Với giá trị thứ 0 của mảng `args` sẽ là tên của chương trình sẽ được thực thi, còn các giá trị còn lại của mảng sẽ là thông số của chương trình đó. Hàm `exec.Command` sẽ nhận giá trị đầu tiên là tên của chương trình, còn các giá trị còn lại là thông số của nó, nên ta sẽ truyền vào hàm `exec.Command` như sau.

```go
cmd := exec.Command(args[0], args[1:]...)
```

Chạy thử lại code của ta.

```
go run main.go
> ls -l
total 4
-rw-r--r-- 1 hmquan hmquan 584 Sep 12 09:38 main.go
```

Giờ thì nó chạy đúng rồi đó 😁.

### The cd program?
Khi bạn mở terminal lên và muốn thay đổi thư mục làm việc, ta sẽ dùng câu lệnh `cd`, ví dụ nếu bạn muốn di chuyển tới một thưc mục `/etc` thì ta sẽ gõ `cd /etc`. Ta thử chạy chương trình Shell của ta và gõ câu lệnh cd xem nó có hoạt động đúng không.

```
go run main.go
> cd /etc
exec: "cd": executable file not found in $PATH
```

Nó bị lỗi? Tại sao nó lại báo là chương trình `cd` không có? Thì đây là một kiến thức mà mình đã học Linux rất lâu cũng không ngờ tới, đó là trong Linux không có cái gọi là chương trình `cd`, cd chỉ là một chức năng của Shell.

Để Shell có thể thực hiện được chức năng thay đổi thư mục bằng cd, ta cập nhật lại code như sau.

```main.go
...

func execInput(input string) error {
	input = strings.TrimSuffix(input, "\n")
	args := strings.Split(input, " ")

	cmd := exec.Command(args[0], args[1:]...)

	switch args[0] {
	case "cd":
		if len(args) < 2 {
			return errors.New("path required")
		}

		return os.Chdir(args[1])
	case "exit":
		os.Exit(0)
	}

	cmd.Stderr = os.Stderr
	cmd.Stdout = os.Stdout

	return cmd.Run()
}
```

Ta sẽ dùng cú pháp `switch case` để kiểm tra, nếu người dùng nhập vào là cd thì ta sẽ dùng hàm `os.Chdir` để thay đổi thư mục làm việc. Ta cũng kiểm tra thêm là nếu người dùng nhập vào exit thì ta sẽ thoát Shell, không cần phải nhấn `Ctrl + C`. Chạy thử nào.

```bash
go run main.go
> cd ..
> ls
load-balancer  simple-shell
> cd simple-shell
> ls
main.go
> exit
```

Ngon 😁.

### Improve the prompt
*prompt* là kí hiệu hiển thị của Shell để báo cho người dùng biết là ta có thể nhập dữ liệu vào terminal, hiện tại  *prompt* của ta hiển thị với kí hiệu `>`.

Một vài thứ ta cần cải thiện là cách hiển thị prompt, các bạn để ý ở đầu chương trình ta dùng `fmt.Print("> ")` để in ra prompt. Ta sẽ sửa lại prompt để nó hiển thị theo định dạng `<username>@<host>:<path>` giống với các chương trình Shell khác.

```main.go
package main

import (
	"bufio"
	"errors"
	"fmt"
	"os"
	"os/exec"
	"os/user"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	for {
		hostname, err := os.Hostname()
		if err != nil {
			fmt.Fprintln(os.Stderr, err)
		}

		currentUser, err := user.Current()
		if err != nil {
			fmt.Fprintln(os.Stderr, err)
		}
        
        path, err := os.Getwd()
		if err != nil {
			fmt.Fprintln(os.Stderr, err)
		}

		path = strings.Replace(path, "/home/"+currentUser.Username+"", "~", -1)

		fmt.Printf("%s@%s:%s$ ", currentUser.Username, hostname, path)

		...
	}
}

...
```

Đầu tiên, ta sẽ lấy ra giá trị của `hostname` và `username` bằng hàm `os.Hostname()` và `user.Current()`.

Tiếp theo ta sẽ lấy giá trị của thư mục làm việc bằng hàm `os.Getwd()`. Trong Linux thì thư mục của người dùng hiện tại sẽ tương ứng với kí tự `~`, nên ta dùng hàm `strings.Replace` để thay thế thư mục của người dùng hiện tại thành `~`, ví dụ đường dẫn `/home/hmquan/blog/devops-practice/simple-shell` sẽ thành `~/blog/devops-practice/simple-shell`.

Cuối cùng ta sẽ in ra  prompt theo định dạng `<username>@<host>:<path>` bằng hàm `fmt.Printf`.

```go
fmt.Printf("%s@%s:%s$ ", currentUser.Username, hostname, path)
```

Chạy thử nào.

```
go run main.go
hmquan@LAPTOP-2COB82RG:~/blog/devops-practice/simple-shell$ ls
main.go
```

Vậy là ta đã thành công xây dựng một chương trình Shell đơn giản bằng Go 😁. Code hoàn chỉnh.

```main.go
package main

import (
	"bufio"
	"errors"
	"fmt"
	"os"
	"os/exec"
	"os/user"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	for {
		hostname, err := os.Hostname()
		if err != nil {
			fmt.Fprintln(os.Stderr, err)
		}

		currentUser, err := user.Current()
		if err != nil {
			fmt.Fprintln(os.Stderr, err)
		}

		path, err := os.Getwd()
		if err != nil {
			fmt.Fprintln(os.Stderr, err)
		}

		path = strings.Replace(path, "/home/"+currentUser.Username+"", "~", -1)

		fmt.Printf("%s@%s:%s$ ", currentUser.Username, hostname, path)

		// Read the keyboad input.
		input, err := reader.ReadString('\n')
		if err != nil {
			fmt.Fprintln(os.Stderr, err)
		}

		if err := execInput(input); err != nil {
			fmt.Fprintln(os.Stderr, err)
		}
	}
}

func execInput(input string) error {
	input = strings.TrimSuffix(input, "\n")

	args := strings.Split(input, " ")

	switch args[0] {
	case "cd":
		if len(args) < 2 {
			return errors.New("path required")
		}

		return os.Chdir(args[1])
	case "exit":
		os.Exit(0)
	}

	cmd := exec.Command(args[0], args[1:]...)

	cmd.Stderr = os.Stderr
	cmd.Stdout = os.Stdout

	return cmd.Run()
}
```

Các bạn like page [DevOps VN](https://www.facebook.com/profile.php?id=100085570585155) để nhận thông báo về bài viết sớm nhất nhé 😁.

## Kết luận
Sau bài này thì chắc các bạn đã có cái nhìn rõ hơn một chút về cách Shell hoạt động, một vài thứ ta có thể cải thiện tiếp là:
+ Sử dụng phím lên và xuống để tìm kiếm lịch sử các câu lệnh ta đã nhập vào terminal.
+ Hiển thị màu.

Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

## Team mình đã cải thiện website Hoàng Phúc từ 1 điểm Google lên 90 điểm như thế nào?

![](https://images.viblo.asia/9fbde6d9-5e57-4429-a903-10a961e1c96c.png)

Đây là bài viết mà mình để tiêu đề trước và hy vọng sẽ viết được bài này trong tương lai. Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 40 điểm, và mục tiêu là 90 điểm, để đáp ứng được nhu cầu của nhiều khách hàng nhất có thể. Bọn mình làm được điều đó không phải vì kĩ thuật giỏi hay gì hết, mà là có những đồng đội mà sẵn sàng hỗ trợ nhau và sự dẫn dắt của hai sếp cực giỏi, những thành viên trong team bọn mình có thể không phải giỏi về chuyên môn kỹ thuật nhất nhưng chắc chắn là sẽ tạo ra được hiệu quả cao nhất. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tưởng tượng bạn là những người đầu tiên góp phần xây dựng cho một hệ thống lớn như thế. Hãy tham gia với bọn mình nhé.

Đồng đội [Backend Engineer (Magento - PHP)](https://tuyendung.hoang-phuc.com/job/backend-engineer-magento-php-1538).

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).