Rất lâu sau bài [Những lý do để chọn GoLang là ngôn ngữ lập trình tiếp theo bạn nên tìm hiểu?](https://daothaison.me/go-1-nhung-ly-do-de-chon-go-lang-la-ngon-ngu-lap-trinh-tiep-theo-ban-nen-tim-hieu-daothaison1560763324), mình mới có cơ hội quay lại tiếp tục tìm hiểu về Golang, Golang là một ứng viên xuất sắc cho việc xây dựng và phát triển các ứng dụng Server-side, có thể handle một lượng lớn request. Mình sẽ chia sẻ từng bước để tiếp cận với Go nhé. 
## Cài đặt môi trường phát triển Go

Mình sẽ sử dụng môi trường Linux cho việc dev. Mình không ghét Windows nhưng mà cài đặt môi trường dev trên win rất tốn thời gian và phiền phức.

Nếu không có điều kiện sử dụng các môi trường Unix, các bạn có thể dùng Docker hoặc Vagrant, sẽ tiện hơn là cài trực tiếp trên môi trường Windows.

### Cài đặt Go runtime
Đầu tiên hãy đảm bảo bạn bạn đã update và upgrade các bản sửa lỗi trên Ubuntu:
``` bash
➜  ~ sudo apt-get update
➜  ~ sudo apt-get -y upgrade
```
Sau đó, hãy download bản cài mới nhât của Go bằng command sau :
``` bash
➜  ~ curl -O https://storage.googleapis.com/golang/go1.12.6.linux-amd64.tar.gz

```
command này sẽ pull các package của Go về và lưu nó ở thư mục hiện tại của bạn, bạn có thể dùng `pwd` để kiểm tra đường dẫn.
Sau đó, hãy giải nén package 
``` bash
➜  ~ sudo tar -C /usr/local -xzf go1.12.6.linux-amd64.tar.gz
➜  ~ export PATH=$PATH:/usr/local/go/bin
```
Kiểm tra thử version Go hiện tại
```
➜  ~ go version
go version go1.12.6 linux/amd64
```
như vậy là bạn đã cài đặt thành công
### Hello word!
Để chắc chắn Go đã được cài đặt chính xác, cùng tạo 1 workspace và viết 1 chương trình Go đơn giản thôi.

Đầu tiên hãy thêm giá trị GOPATH để Go biết có thể tìm thấy code của chúng ta ở đâu:
``` bash 
➜  ~ sudo nano ~/.profile
# Thêm vào cuối file 2 dòng
export GOPATH=$HOME/work
export PATH=$PATH:/usr/local/go/bin:$GOPATH/bin
```

`$HOME/work` có thể chỏ đến bất kỳ thư mục nào, `go get` sẽ lấy tất cả các file ở bên trong nó. Refresh lại để profile nhận config mới `source ~/.profile`.



Đầu tiên hãy tạo thư mục `work/src/hello`, và thêm 1 file `hello.go` với nội dung
```Go:~/work/src/hello/hello.go
package main

import "fmt"

func main() {
	fmt.Printf("hello, world\n")
}
```

Sau đó hãy build đoạn code vừa rồi với `go` tool:

```
cd ~/work/src/hello
➜  ~  go build
```
Command trên sẽ build 1 executable file tên là hello trong thư mục đó. Chạy file đó ta sẽ có output:

``` bash
➜ ./hello     
hello, world
```

## Điều khiển Docker từ Go lang =))
Có thể bạn sẽ thắc mắc tại sao trong bài viết Bắt đầu với ngôn ngữ lập trình Go lại nhắc tới Docker làm gì, chẳng có lý do sâu xa gì đâu. Đơn giản, Go được dùng để xây dựng nên Docker, và mình cũng đang cần điều khiển Docker bằng việc gọi qua Docker API từ Go, nên tiện chia sẻ luôn. Mọi người đều quen thuộc với các bài viết hướng dẫn tạo biến, rồi viết hàm con rồi mà =)) 
### Tạo một Docker Container chạy Nginx
Đầu tiên chúng ta cần tạo 1 object `cli`  để tương tác với Docker Engine API:
``` Go
cli, err := client.NewEnvClient() 
if err != nil {      
    fmt.Println("Unable to create docker client")  
    panic(err) 
}
```
`NewEnvClient() ` là cách đơn giản nhất để tạo ra 1 Docker client mà không cần truyền bất kỳ tham số nào cả. 

Để tạo Docker container ta dùng func `cli.ContainerCreate`, nó require một số tham số và sẽ return 1 `ContainerCreateCreatedBody` struct gồm container ID. 

Hàm `ContainerCreate` được truyền những tham số sau :

``` go
ContainerCreate func(ctx context.Context, 
config *container.Config, 
hostConfig *container.HostConfig, 
networkingConfig *network.NetworkingConfig, 
containerName string) (container.ContainerCreateCreatedBody, error)
```

Bởi vì chúng ta chạy 1 Nginx container nên bạn cần expose cổng 80, ở đây mình expose cổng 80 của container đến cổng 8000 của máy mình. Cú pháp sẽ được khai báo trong thuộc tính PortBindings của struct hostConfig. Lưu ý là bạn cần import package `nat` để map port ra máy host trước nhé.

``` Go
hostBinding := nat.PortBinding{ 
    HostIP: "0.0.0.0", 
    HostPort: "8000", 
} 
containerPort, err := nat.NewPort("tcp", "80") 
if err != nil{  
    panic("Unable to get the port") 
}
```
và tạo Container 
``` Go

cont, err := cli.ContainerCreate( 
    context.Background(), 
    &container.Config{ Image: image, }, 
    &container.HostConfig { PortBindings: portBinding, }, nil, "") 
   
if err != nil { 
    panic(err)
}
```
Sau khi tạo xong container, chúng ta lấy container ID được trả về từ `ContainerCreateCreatedBody` và dùng nó để start container:
``` Go
cli.ContainerStart(context.Background(), cont.ID, types.ContainerStartOptions{})
```


Vậy là xong:
``` Go

import (
"context"
"fmt"

"github.com/docker/docker/api/types"
"github.com/docker/docker/api/types/container"
"github.com/docker/docker/client"
"github.com/docker/go-connections/nat"
)

func CreateNewContainer(image string) (string, error) {
	cli, err := client.NewEnvClient()
	if err != nil {
		fmt.Println("Unable to create docker client")
		panic(err)
	}

	hostBinding := nat.PortBinding{
		HostIP:   "0.0.0.0",
		HostPort: "8000",
	}
	containerPort, err := nat.NewPort("tcp", "80")
	if err != nil {
		panic("Unable to get the port")
	}

	portBinding := nat.PortMap{containerPort: []nat.PortBinding{hostBinding}}
	cont, err := cli.ContainerCreate(
		context.Background(),
		&container.Config{
			Image: image,
		},
		&container.HostConfig{
			PortBindings: portBinding,
		}, nil, "")
	if err != nil {
		panic(err)
	}
	
	cli.ContainerStart(context.Background(), cont.ID, types.ContainerStartOptions{})
	fmt.Printf("Container %s is started", cont.ID)
	return cont.ID, nil
}

func main() {
	CreateNewContainer('nginx:latest')
}
```

Tiến hành build tương tự như chương trình Hello World!, truy cập vào địa chỉ `localhost:8000`, bạn sẽ thấy message từ nginx chạy bên trong container.

![](https://images.viblo.asia/3f263f66-09ab-4ce5-8bf2-7b8298cf98be.png)

## Tạm kết 
Cuối cùng, cảm ơn bạn đã giành thời gian cho mình. Thú thực mình học Go kiểu tay ngang và ít có cơ hội đem ra dùng. Nên có điểm gì chưa được tốt, rất mong nhận được sự góp ý ở cuối bài viết ^^
## Mục lục
1. [Những lý do để chọn GoLang là ngôn ngữ lập trình tiếp theo bạn nên tìm hiểu?](https://daothaison.me/go-1-nhung-ly-do-de-chon-go-lang-la-ngon-ngu-lap-trinh-tiep-theo-ban-nen-tim-hieu-daothaison1560763324)
2. [Bắt đầu với ngôn ngữ lập trình Go](https://daothaison.me/go-2-bat-dau-voi-ngon-ngu-lap-trinh-go-daothaison1560763325)

---