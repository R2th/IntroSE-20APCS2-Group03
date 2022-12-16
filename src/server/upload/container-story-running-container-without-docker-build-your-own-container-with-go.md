Link bài viết gốc - [Tự xây dựng Container với Go](https://devopsvn.tech/devops/tu-xay-dung-container-voi-go)

## Giới thiệu
Chào các bạn, tiếp tục với chuỗi series tìm hiểu sâu hơn về container. Chúng ta đã biết container được xây dựng từ Linux Namespaces và Cgroups, ở bài này chúng ta sẽ tìm hiểu kĩ hơn về container nữa bằng cách tự build một container sử dụng ngôn ngữ Golang.

![image.png](https://images.viblo.asia/c7831a86-d9ad-4855-b57b-a6b05e7b0a85.png)

Các bạn nên đọc 3 bài trước đó để hiểu rõ hơn về container và cách Kubernetes tương tác với nó như thế nào nhé:
1. [Linux namespaces and Cgroups: What are containers made from?](https://medium.com/@hmquan08011996/kubernetes-story-linux-namespaces-and-cgroups-what-are-containers-made-from-d544ac9bd622)
2. [Deep into Container Runtime](https://medium.com/@hmquan08011996/kubernetes-story-deep-into-container-runtime-db1a41ed2132).
3. [How Kubernetes works with Container Runtime](https://faun.pub/kubernetes-story-how-kubernetes-works-with-container-runtime-ce618a306f64).

## Building a Container
Ta tạo một file tên là `container.go` và viết cho nó một số đoạn code đơn giản như sau.

```container.go
package main

import (
	"os"
)

func main() {
	
}

func must(err error) {
	if err != nil {
		panic(err)
	}
}
```

Nếu bạn có xài Docker thì ta sẽ biết câu lệnh để chạy container là `docker run <container> <command>`, ví dụ ta chạy câu lệnh sau:

```bash
docker run busybox echo "A"
```

Bạn sẽ thấy container chạy và in ra chữ "A", còn ví dụ bạn chạy câu lệnh sau:

```bash
docker run -it busybox sh
```

```bash
/ #
```

Bạn sẽ thấy nó chạy container và gán sh vào container đó, nếu lúc này ta gõ command thì command đó đang chạy trong container.

```bash
/ # hostname
d12ccc0e00a0
```

```
/ # ps
PID   USER     TIME  COMMAND
1     root      0:00 sh
9     root      0:00 ps
```

Khi bạn chạy câu lệnh `hostname` thì sẽ thấy nó in ra hostname của container chứ không phải của server. Và khi ta chạy câu lệnh `ps` thì ta sẽ thấy trong container nó chỉ có hai process là `sh` lúc ta chạy container `busybox` với command là `sh` và `ps` mà ta vữa gõ.

Giờ ta sẽ xây dựng một container tương tự như trên bằng Go, cập nhật lại file `container.go` như sau.

```container.go
package main

import (
	"os"
)

// docker run <image> <command>
// go run container.go run <command>
func main() {
	switch os.Args[1] {
	case "run":
		run()
	default:
		panic("Error")
	}
}

func run() {

}

func must(err error) {
	if err != nil {
		panic(err)
	}
}
```

Ta thêm vào một hàm tên là `run()` và ở trong hàm main, ta dùng switch case để kiểm tra khi ta chạy chương trình với flag là run thì nó sẽ chạy hàm `run()`. Lúc này khi ta chạy câu lệnh `go run container.go run` thì nó sẽ tương tự như khi ta chạy `docker run`.

Tiếp theo ta cập nhật hàm `run()` như sau.

```container.go
package main

import (
	"os"
	"os/exec"
)

...

func run() {
	cmd := exec.Command(os.Args[2], os.Args[3:]...)
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	must(cmd.Run())
}

...
```

Ta sẽ dùng package `os/exec` để thực thi câu lệnh của người dùng nhập vào mà được lưu trong mảng `os.Args`, ví dụ khi ta gõ `go run container.go run echo "A"`, thì mảng Args sẽ có giá trị là:

```bash
Args[0] = "container.go"
Args[1] = "run"
Args[2] = "echo"
Args[3] = "A"
```

Với giá trị ta cần truyền vào hàm `exec.Command()` thì ta sẽ lấy từ index thứ 2 trở đi, hàm `exec.Command()` sẽ nhận tham số thứ nhất là câu lệnh mà nó sẽ thực thi, và các giá trị còn lại là args của câu lệnh đó.

```go
exec.Command(name string, arg ...string)
```

Ở cuối hàm ta dùng `cmd.Run()` để thực thi câu lệnh mà ta truyền vào `go run container.go run`. Ok, giờ bạn thử chạy câu lệnh giống với `docker run -it busybox sh` bằng chương trình của ta, nhớ chuyển sang **root user để chạy nếu bạn chạy bằng linux**.

```bash
go run container.go run sh
```

```
#
```

Ta sẽ thấy là nó đã chạy được y change khi ta chạy câu lệnh docker, ta đã thành công bước đầu tiên 😁, nhưng khi bạn gõ hostname thì nó sẽ lấy hostname của server của ta chứ không phải của container ta vừa tạo bằng file `container.go`.

```
# hostname
LAPTOP-2COB82RG
```

Khi bạn gõ câu lệnh để thay đổi hostname trong chương trình của ta thì nó cũng sẽ ảnh hưởng tới bên ngoài server luôn.

```
# hostnamectl set-hostname container
```

Gõ exit để thoát, và giờ ở ngoài server ta gõ lại `hostname` ta sẽ thấy nó đã bị thay đổi. Chương trình của ta hiện tại chỉ là chạy câu lệnh `sh` thôi, chứ không phải container gì cả, tiếp theo ta sẽ đi qua từng bước để xây container nào.

Như ta đã biết container được xây dựng từ Linux Namespaces và Cgroups, đầu tiên ta sẽ sử dụng tính năng Namespaces của Linux để xây container.

### Namespaces
Namespaces sẽ giúp ta chạy một process độc lập hoàn toàn với các process khác trên cùng một server, tại thời điểm mình viết có 6 namespaces như sau:
+ PID: giúp ta tạo process với PID tách biệt với các process khác trên server.
+ MNT: giúp ta có thể mount và unmount file mà không ảnh hưởng gì tới file trên server.
+ NET: giúp ta tạo một network namepsace độc lập.
+ UTS: giúp process có hostname và domain name riêng biệt.
+ USER: giúp ta tạo user namespace tách biệt với server.

Ta sẽ dùng các namespaces ở trên để chương trình chạy bằng Go của ta có process độc lập giống như container vậy.

### UTS namespace
Thứ đầu tiên ta cần tách biệt là hostname, để chương trình của ta có hostname riêng. Ta sẽ dùng UTS namespace, cập nhật file `container.go` như sau:

```container.go
package main

import (
	"os"
	"os/exec"
	"syscall"
)

...

func run() {
	cmd := exec.Command(os.Args[2], os.Args[3:]...)
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	cmd.SysProcAttr = &syscall.SysProcAttr{
		Cloneflags: syscall.CLONE_NEWUTS,
	}

	must(cmd.Run())
}

...
```

Để sử dụng Linux namespaces ở trong Go, ta chỉ đơn giản truyền tên namespace mà ta muốn xài vào `cmd.SysProcAttr`.

```go
cmd.SysProcAttr = &syscall.SysProcAttr{
    Cloneflags: syscall.CLONE_NEWUTS,
}
```

ở đây tên namespace của UTS là `syscall.CLONE_NEWUTS`. Giờ ta chạy lại thử.

```bash
go run container.go run sh
```

Giờ bạn chạy câu lệnh thay đổi hostname.

```bash
# hostnamectl set-hostname wsl
# hostname
wsl
```

Sau khi thay đổi hostname xong bạn chạy lại `hostname` ta sẽ thấy nó đã đổi, tuy nhiên nếu ta gõ `exit` và thoát ra khỏi chương trình, gõ lại `hostname` ở server ta sẽ thấy nó vẫn như cũ chứ không hề bị thay đổi.

Vậy là ta đã thành công bước tiếp theo trong việc xây dựng container 😁. Tuy nhiên để chương trình của ta giống với container hơn tương tự như ta chạy `docker run`, ta cần làm thêm một số thứ nho nhỏ.

Như bạn thấy khi ta chạy `docker run -it busybox sh` rồi gõ `hostname` nó sẽ tự có hostname riêng, chứ không phải giống ta chạy chương trình xong, ta phải tự gõ câu lệnh để thay đổi hostname. Cập nhật lại file `container.go`.

```container.go
package main

import (
	"os"
	"os/exec"
	"syscall"
)

// docker run <image> <command>
// ./container run <command>
func main() {
	switch os.Args[1] {
	case "run":
		run()
	case "child":
		child()
	default:
		panic("Error")
	}
}

func run() {
	cmd := exec.Command("/proc/self/exe", append([]string{"child"}, os.Args[2:]...)...)
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	cmd.SysProcAttr = &syscall.SysProcAttr{
		Cloneflags: syscall.CLONE_NEWUTS,
	}

	must(cmd.Run())
}

func child() {
	syscall.Sethostname([]byte("container"))

	cmd := exec.Command(os.Args[2], os.Args[3:]...)
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	must(cmd.Run())
}

func must(err error) {
	if err != nil {
		panic(err)
	}
}
```

Thay đổi khá nhiều phải không `:)))`, mình sẽ giải thích từ từ. Điểm đầu tiên ta thay đổi là ta thêm vào một hàm nữa là `child()`, và ở trong hàm run ta sẽ thực thi hàm child này bằng cách update lại `exec.Command`

```go
exec.Command("/proc/self/exe", append([]string{"child"}, os.Args[2:]...)...)
```

Ta thay parameter đầu tiên thành `/proc/self/exe`, có nghĩa là `exec` sẽ thực thi lệnh `/proc/self/exe`. Lệnh này có chức năng là tự thực thi lại chương trình, có nghĩa là chương trình `container.go` của ta sẽ tự thực thi lại và truyền vào args là child.

Ở trong hàm child, lúc này nó đã chạy ở một process mà có UTS namespace độc lập, ta set lại hostname cho nó bằng hàm `syscall.Sethostname([]byte("container"))`, lúc này chương trình của ta sẽ có hostname riêng mà không ảnh hưởng gì tới server.

Sau đó, ở trong chương trình child này ta thực thi args mà ban đầu ta đã truyền vào. Tiến trình như sau.

`go run container.go run sh` -> `/proc/self/exe child sh` -> `syscall.Sethostname([]byte("container"))` -> `exec.Command("sh")`.

Giờ chạy thử nào.

```bash
go run container.go run sh
```

```bash
# hostname
container
```

Ngon lành, vậy là ta đã thành công bước tiếp theo 😁. Bạn gõ thử `ps` để liệt kê process ra nào, xem nó có giống với lúc ta chạy `docker run` không.

```bash
# ps
PID   TTY      TIME     CMD
11254 pts/3    00:00:00 sudo
11255 pts/3    00:00:00 bash
17530 pts/3    00:00:00 go
17626 pts/3    00:00:00 container
17631 pts/3    00:00:00 exe
17636 pts/3    00:00:00 sh
17637 pts/3    00:00:00 ps
```

Bạn sẽ thấy nó có rất nhiều process, và đây là những process ở bên ngoài server của ta luôn, bạn gõ `exit` để thoát và gõ lại `ps` bên ngoài server, bạn sẽ thấy nó liệt kê ra những process giống lúc ta gõ `ps` trong chương trình.

### PID namespace
Như ta đã nói ở trên, PID namespace sẽ giúp ta tạo một process có PID hoàn toàn độc lập với server bên ngoài, để sử dụng PID namespace ta cập nhật code như sau.

```container.go
...
func run() {
	cmd := exec.Command("/proc/self/exe", append([]string{"child"}, os.Args[2:]...)...)
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	cmd.SysProcAttr = &syscall.SysProcAttr{
		Cloneflags: syscall.CLONE_NEWUTS | syscall.CLONE_NEWPID,
	}

	must(cmd.Run())
}
...
```

Ta chỉ việc thêm `syscall.CLONE_NEWPID` vào, giờ chạy lại nào.

```bash
go run container.go run sh
```

```bash
# ps
PID   TTY      TIME     CMD
11254 pts/3    00:00:00 sudo
11255 pts/3    00:00:00 bash
17530 pts/3    00:00:00 go
17626 pts/3    00:00:00 container
17631 pts/3    00:00:00 exe
17636 pts/3    00:00:00 sh
17637 pts/3    00:00:00 ps
```

Ta sẽ thấy là nó vẫn giống y chang hồi nãy, PID namespace không chạy hả? Thực chất PID namespace sẽ giúp ta chạy các process trong chương trình ở một namespace tách biệt, tuy nhiên nó vẫn có thể liệt kê các process ở dưới server.

Vì bản chất khi ta chạy câu lệnh `ps` thì nó sẽ lấy thông tin process ở folder `/proc` trong linux, bạn chạy thử sẽ thấy.

```bash
ls /proc
```

Khi ta tạo một process với namespace, filesystem của nó sẽ được kế thừa từ server hiện tại. Do đó, nếu ta muốn process không truy cập được filesystem của server thì ta phải làm mới filesystem của process. Nhưng chương trình ta đang chạy ở trên server, nếu ta làm gì bậy bạ thì filesystem trên server của ta sẽ bị ảnh hưởng. Do đó, ta cần tạo namespace mà khi ta mount filesystem cho nó sẽ không ảnh hưởng gì tới server hết, ta sẽ dùng MNT namespace.

### MNT namespace
Ta cập nhật file `container.go` như sau để sử dụng MNT namespace.

```container.go
...

func run() {
	cmd := exec.Command("/proc/self/exe", append([]string{"child"}, os.Args[2:]...)...)
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	cmd.SysProcAttr = &syscall.SysProcAttr{
		Cloneflags: syscall.CLONE_NEWUTS | syscall.CLONE_NEWPID | syscall.CLONE_NEWNS,
	}

	must(cmd.Run())
}

func child() {
	syscall.Sethostname([]byte("container"))
	must(syscall.Chdir("/"))
	must(syscall.Mount("proc", "proc", "proc", 0, ""))

	cmd := exec.Command(os.Args[2], os.Args[3:]...)
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	must(cmd.Run())
}

...
```

Ta sẽ dùng biến `syscall.CLONE_NEWNS` để tạo MNT namespace, sau đó ta sẽ làm mới `/proc` folder bằng hai hàm.

```go
syscall.Chdir("/")
syscall.Mount("proc", "proc", "proc", 0, "")
```

Giờ ta chạy lại nào.

```bash
go run container.go run sh
```

```bash
# ps
PID TTY      TIME     CMD
1   pts/3    00:00:00 exe
7   pts/3    00:00:00 sh
8   pts/3    00:00:00 ps
# ls
1          cgroups    devices      fs          kcore        kpageflags  mounts        schedstat  sysvipc      vmallocinfo
6          cmdline    diskstats    interrupts  key-users    loadavg     mtrr          self       thread-self  vmstat
9          config.gz  dma          iomem       keys         locks       net           softirqs   timer_list   zoneinfo
acpi       consoles   driver       ioports     kmsg         meminfo     pagetypeinfo  stat       tty
buddyinfo  cpuinfo    execdomains  irq         kpagecgroup  misc        partitions    swaps      uptime
bus        crypto     filesystems  kallsyms    kpagecount   modules     sched_debug   sys        version
```

Ta sẽ thấy process bây giờ chỉ có 1 vài thằng và `proc/self/exe` của ta đang chạy với PID là 1. Ngon lành cành đào 😁, ta đã xây dựng container thành công.

English version [Deep into Container — Build your own container with Golang](https://medium.com/@hmquan08011996/deep-into-container-build-your-own-container-with-golang-98ef93f42923). Please follow me on the Medium .

## Kết luận
Vậy là ta đã biết cách xây dựng một container đơn giản bằng Golang, tuy trong thực tế container sẽ còn nhiều thứ khác nữa, như là Cgroups để limit resources của process, tạo USER namespaces, mount file từ container ra bên ngoài, v ... v ...

Nhưng cơ bản thì tính năng chính để container có thể tạo được một môi trường độc lập là Linux namespaces. Hiểu rõ về container sẽ giúp ta rất nhiều trong việc thao tác với nó. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

## Team mình đã cải thiện website Hoàng Phúc từ 1 điểm Google lên 90 điểm như thế nào?

![](https://images.viblo.asia/17647fc7-67d1-44a8-aae1-a8a1f2266351.jpg)

Đây là bài viết mà mình để tiêu đề trước và hy vọng sẽ viết được bài này trong tương lai. Team công nghệ Hoàng Phúc của bọn mình được thành lập từ tháng 8 năm 2021, ban đầu chỉ có hai sếp, một bạn Backend và một bạn Front-end, mình là thành viên thứ 5 và sau đó team từ từ đã có nhiều thành viên hơn. Với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 40 điểm, và mục tiêu là 90 điểm, để đáp ứng được nhu cầu của nhiều khách hàng nhất có thể. Bọn mình làm được điều đó không phải vì kĩ thuật giỏi hay gì hết, mà là có những đồng đội mà sẵn sàng hỗ trợ nhau và sự dẫn dắt của hai sếp cực giỏi, những thành viên trong team bọn mình có thể không phải giỏi về chuyên môn kỹ thuật nhất nhưng chắc chắn là sẽ tạo ra được hiệu quả cao nhất. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tưởng tượng bạn là những người đầu tiên góp phần xây dựng cho một hệ thống lớn như thế. Hãy tham gia với bọn mình nhé.

Đồng đội [Backend Engineer (Magento - PHP)](https://tuyendung.hoang-phuc.com/job/backend-engineer-magento-php-1538).

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).