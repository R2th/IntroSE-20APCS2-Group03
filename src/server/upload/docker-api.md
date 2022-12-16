### Cơ sở lý thuyết và phương pháp nghiên cứu
![](https://i.imgur.com/FAw737s.gif)
Nghe cứ như đang làm khóa luận ấy. Mệt mỏi...

### Docker CLI
Trước hết, hãy nói từ docker CLI trước. Để người dùng thông thường thao tác với docker, như build một docker image, start một container, pull image..v.v.. docker cung cấp cho chúng ta một Command Line Interface (CLI). CLI tool này cung cấp cho chúng ta các lệnh với cú pháp định sẵn như `docker pull somethings, docker push somethings...` (Bạn có thể [tham khảo bài viết trước](https://viblo.asia/p/tao-cli-tool-nghe-nhac-tu-terminal-bang-golang-gAm5yjxDKdb) của mình nếu muốn tự tạo một CLI tool cho riêng mình). 

Lớp CLI này cũng giống như một app di động hay một trang web vậy. Chúng ta - những người dùng cuối, hoàn toàn có thể thao tác với các chức năng của hệ thống, mà không cần quan tâm đến việc đằng sau nó là gì. Ứng dụng đã gọi đến những API nào, update những bảng nào, response data ra làm sao... Những việc này thuộc về phía server backend.

Trường hợp của docker cũng vậy, chúng ta chỉ cần gõ `docker pull abc` thì sẽ pull image abc, chứ chả cần quan tâm quá trình xử lý để pull được một image abc ra làm sao cả. CLI chỉ đóng vai trò cung cấp một lớp tương tác cho người dùng, còn việc xử lý thuộc về phần lõi sâu bên thuộc về docker server daemon.  Docker server sẽ là nơi lắng nghe và xử lý các yêu cầu từ phía docker client thông qua các Docker API, và xử lý chúng.

Nôm na thì cũng y hệt như cách mà một ứng dụng di động hay trang web (SPA) lấy thông tin và tương tác với server backend vậy. Muốn lấy thông tin người dùng thì gọi đến endpoint A, xóa một item nào đó thì gọi đến endpoint B...v.v
Các CLI command chỉ là một phần của docker thôi nhé... bạn có thể tham khảo rõ hơn tại trang Docker overview này https://docs.docker.com/engine/docker-overview/

![](https://images.viblo.asia/7b8c4347-eb23-4392-977d-1926cf909769.png)

Hình trên minh họa kiến trúc của docker, phía ngoài cùng là docker CLI, tương tác với docker server qua các rest API...

Dài dòng như vậy, nhưng chốt lại là vì có thể tương tác với docker server thông qua việc gọi các API đã được cung cấp. Nên không bó buộc chúng ta phải dùng CLI có sẵn, mà miễn là chúng  ta biết được các endpoints là có thể gọi đến chúng và tương tác với docker rồi. Từ đây, chúng ta có thể dễ dàng tùy biến và tạo ra những công cụ mới mẻ bằng cách gọi và tương tác với docker server qua việc gọi các API của docker.... 

### Docker API
Nhân vật cốt cán trong bài viết của mình đây rồi. Docker cung cấp sẵn API document, danh sách cách endpoint và cách gọi cũng như những tham số cần thiết một cách rất cụ thể tại đây : https://docs.docker.com/engine/api/v1.39/ 

Bạn hãy giành thời gian xem qua một chút, rất nhiều API được cũng cấp sẵn, thừa sức cho chúng ta xây một `docker-compose` theo cách riêng đấy nhé  https://docs.docker.com/engine/api/v1.39/

Trước tiên, hãy dùng thử xem đã. Để pull một image, thông thường chúng ta cần lệnh `docker pull`, nhưng thay vì gõ docker pull như thế. Chúng ta có thể dùng `WGET` hay `CURL` để gọi đến api pull image xem thử. Endpoind này được ghi trong document tại đây: 

https://docs.docker.com/engine/api/v1.39/#operation/ImageCreate

Ta pull thử theo đó mà image alpine với default xem nhé
```
curl --unix-socket /var/run/docker.sock \
  -X POST "http:/v1.24/images/create?fromImage=alpine:latest"
```
Sau khi chạy chạy lệnh trên, kiểm tra lại bằng lệnh `docker images` chúng ta sẽ thấy  pull về được image alpine rồi đúng không nào, hoàn toàn tương đương với việc gõ `docker pull alpine:latest`. 

Giờ hãy nhìn vào lệnh bên trên và lưu ý một chút. Docker server có thể lắng nghe qua `unix socket, TCP và UDP`. Nhưng mặc định, docker server sẽ lắng nghe qua unix socket. Gọi qua `unix socket` thì phù hợp với việc gọi local. Tức là gọi đến docker server trên cùng một máy, còn nếu muốn gọi qua từ bên ngoài thì phải thì buộc phải expose và cấu hình lại đôi chút để có thể gọi qua `TCP ip`. Việc này tương đối vất vả, ngoài expose qua TCP ra còn phải cấu hình tls cho nó nếu không muốn bị người khác dùng chùa server và phá hoại nữa... bạn có thể xem qua cấu hình tại đây https://docs.docker.com/engine/security/https/

Ngoài ra trong trường hợp bị lỗi `permission denied docker.sock`  thì bạn cần cấp quyền đọc ghi cho file `docker.sock` này là được nhé...
Cuối cùng, bạn có thể thử gọi đến các API khác hiếm gặp hơn một chút xem thử nhé. Ví dụ tạo một container và cấp cho nó chạy ở chế độ [privilege](https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities) thử xem:
```
curl --unix-socket /var/run/docker.sock -H "Content-Type: application/json" \
  -d '{"Image": "ubuntu:16.04","Tty": true, "HostConfig": {"Privileged" : true}}' \
  -X POST http:/v1.35/containers/create?name=truongdang
```

### Docker SDK
Ngoài việc cũng cấp sẵn các API, docker còn cung cấp thêm cho lập trình viên các bộ SDK hỗ trợ các lập trình viên dễ dàng phát triển thêm các ứng dụng bên thứ ba nếu muốn. Trong đó nổi bật chất là hai bộ SDK dành cho hai ngôn ngữ Python Và Golang, đây là hai bộ SDK official được docker cung cấp. Bạn có thể xem qua một chút document của hai bộ SDK này tại đây:


 - Python SDK: https://godoc.org/github.com/docker/docker/client
 - Golang SDK: https://godoc.org/github.com/docker/docker/client

Ngoài ra còn có các Unofficial libraries không chính thức mà được cộng đồng developer phát triển và cung cấp. Tuy không đầy đủ như đồ chính hãng, nhưng nhìn chung thì có đủ cho mọi  ngôn ngữ lập trình phổ biến hiện nay. Từ C/C++ đến Nodejs, Scala..v..v

Bạn có thể xem danh sách tại đây:

https://docs.docker.com/develop/sdk/

và đây là một ví dụ đơn giản dử dụng Go SDK để pull image bên trên thay vì sử dụng `curl` như bên trên.
```
package main

import (
	"io"
	"os"

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

	out, err := cli.ImagePull(ctx, "alpine", types.ImagePullOptions{})
	if err != nil {
		panic(err)
	}

	defer out.Close()

	io.Copy(os.Stdout, out)
}
```
Ta có thể build đoạn code này [thành một cái CLI tool mang tên mình](https://viblo.asia/p/tao-cli-tool-nghe-nhac-tu-terminal-bang-golang-gAm5yjxDKdb) rồi từ nay chạy `my-docker-tool pull blabla` cho nó ngầu chẳng hạn - Cái này chắc chỉ phù hợp cho mấy đứa dở hơi như mình, chứ thực tế chẳng ai lại ngốc đến nỗi đi phát triển một cái tool như vậy cả. Ai lại đi đẽo lại cái bánh xe, nhất là khi nó đã quá tròn và đàn hồi bao giờ  

![](https://i.imgur.com/2XnAJVE.gif)

### Kết luận
Docker có cũng cấp sẵn các APIs để tương tác với docker server. Tuy chẳng có gì khó cả. Nhưng nhiều khi ở mức sử dụng docker bình thường chúng ta không để ý đến việc này cho lắm. 
Vậy nên, qua bài viết trên, mình hy vọng có thể giới thiệu qua một chút về bộ API của docker, hy vọng việc có được hiểu biết về các API được này khiến bạn bắt đầu tò mò hơn và có thể sử dụng chúng để phát triển thêm những công cụ tùy biến trên nền tảng docker cho riêng mình chẳng hạn...

Cám ơn bạn đã dành thời gian cho bài viết của mình nhé ^^ 
![](https://i.imgur.com/3Q686p3.gif)