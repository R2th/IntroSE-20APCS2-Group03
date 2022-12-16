## Mở đầu.
Tiếp nối phần phần sử dụng Go để dựng Docker Container ở  [Điều khiển Docker từ Go](https://viblo.asia/p/bat-dau-voi-ngon-ngu-lap-trinh-go-bWrZnw9mlxw#_dieu-khien-docker-tu-go-lang--3), hôm nay mình sẽ chia sẻ về cách thao tác khác tới Docker Engine.

## Pull image 
Về logic thì cũng khá đơn giản, chúng ta tạo 1 docker client bằng hàm `NewEnvClient()`, và gọi tới func `ImagePull` hàm này sẽ pull image về từ Docker Hub. Hàm `ImagePull` nhận params là giá trị image cần pull và  `types.ImagePullOptions`.

```go
package main

import (
	"io"
	"os"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"golang.org/x/net/context"
)

func pullImage(image string) {
	ctx := context.Background()
	cli, err := client.NewEnvClient()
	if err != nil {
		panic(err)
	}

	out, err := cli.ImagePull(ctx, image, types.ImagePullOptions{})
	if err != nil {
		panic(err)
	}

	defer out.Close()

	io.Copy(os.Stdout, out)
    return nil
}
```

Ngoài ra, để pull được các Docker image private thì bạn cần pass thêm param chứa thông tin authentication vào `ImagePull`.

``` go
authConfig := types.AuthConfig{
    Username: "username",
    Password: "password",
}
encodedJSON, err := json.Marshal(authConfig)
if err != nil {
    panic(err)
}
authStr := base64.URLEncoding.EncodeToString(encodedJSON)
out, err := cli.ImagePull(ctx, image, types.ImagePullOptions{RegistryAuth: authStr})
```
## Liệt kê các containers
Mình sẽ implement hàm tương tự với command: 
``` shell
docker container ps
```

Về logic thì cũng khá đơn giản, chúng ta tạo 1 docker client bằng hàm `NewEnvClient()`, và gọi tới func `ContainerList` hàm này sẽ trả về danh sách containers. Hàm `ContainerList` nhận vào 1 vài option để limit, filter thông qua `types.ContainerListOptions`.

``` go
import (
	"context"
	"fmt"
    
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
)

func ListContainer() error {
	cli, err := client.NewEnvClient()
	if err != nil {
		panic(err)
	}
  
	containers, err := cli.ContainerList(context.Background(), types.ContainerListOptions{})
	if err != nil {
		panic(err)
	}
  
	if len(containers) > 0 {
		for _, container := range containers {
			fmt.Printf("Container ID: %s", container.ID)
		}
	} else {
		fmt.Println("There are no containers running")
	}
	return nil
}
```

## Tắt Docker container
Hàm này tương tự với command `$ docker container stop <container-id>`

``` go
import (
	"context"

	"github.com/docker/docker/client"
)

func StopContainer(containerID string) error {
	cli, err := client.NewEnvClient()
	if err != nil {
		panic(err)
	}
	
	err = cli.ContainerStop(context.Background(), containerID, nil)
	if err != nil {
		panic(err)
	}
	return err
}
```

Từ object được tạo ra bởi hàm `NewEnvClient`, chúng ta sử dụng hàm `ContainerStop` để tắt container đang chạy, hàm `ContainerStop()` nhận vào tham số timeout ở cuối. Nhưng mình không sử dụng đến nó, nên mình đang pass vào giá trị `nil`.

 ## Tắt toàn bộ các containers
 
 Để tắt toàn bộ các containers, mình sẽ lấy danh sách các container đang chạy, và sự đến hàm `StopContainer` mà mình vừa implement ở trên.
 
 ``` Go
 package main

import (
	"fmt"
    
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"golang.org/x/net/context"
)

func main() {
	ctx := context.Background()
	cli, err := client.NewEnvClient()
	if err != nil {
		panic(err)
	}

	containers, err := cli.ContainerList(ctx, types.ContainerListOptions{})
	if err != nil {
		panic(err)
	}

	for _, container := range containers {
		fmt.Print("Stopping container ", container.ID[:10], "... ")
		if err := StopContainer(container.ID); err != nil {
			panic(err)
		}
		fmt.Println("Success")
	}
}
 ```

## Đọc logs từ trong container

Để đọc logs từ trong container, mình sử dụng func `ContainerLogs`, tham số truyền vào hàm gồm container id và `types.ContainerLogsOptions`.

`out` được trả về từ func ContainerLogs mình sẽ copy qua os.Stdout để hiện thị ra.

``` go
package main

import (
	"io"
	"os"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"golang.org/x/net/context"
)

func logging(containerId string) error {
    ctx := context.Background()
    cli, err := client.NewEnvClient()
    if err != nil {
        panic(err)
    }

    options := types.ContainerLogsOptions{ShowStdout: true}
    out, err := cli.ContainerLogs(ctx, containerId, options)
    if err != nil {
        panic(err)
    }

    io.Copy(os.Stdout, out)
}
```

## Tạm kết
Vậy là mình đã cùng các bạn thực hiện implement các thao tác cơ bản với Docker bằng Go. Trong bài viết tới, hy vọng mình sẽ cùng các bạn implement 1 ứng dụng nho nhỏ sử dụng Go và Docker, như 1 service CI chẳng hạn :D