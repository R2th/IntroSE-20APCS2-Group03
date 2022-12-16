Bài viết này sẽ đề cập đến những điều sau:

* Sử dụng Docker để khởi động 1 app
* Sử dụng các GitHub Action để tích hợp liên tục (CI) ứng dụng của bạn
* Sử dụng các GitHub Action để triển khai liên tục (CD) bằng cách đẩy image Docker vào Docker registry (Docker Hub)

Flow sẽ đại loại như này

![](https://images.viblo.asia/25ef678b-f2ef-49f0-a027-c3db79645835.png)

Code đầy đủ sẽ có ở [trong này](https://github.com/abhinavdhasmana/github-action-example-node)

## Sử dụng Docker để khởi động 1 app

Thiết lập docker cho 1 ứng dụng khá đơn giản. Điều bạn cần là 1 file `Dockerfile` và thêm option `.dockerignore`

Đây là 1 ví dụ

{@embed: https://gist.github.com/abhinavdhasmana/a05eb743a484b104804e7b0db0b1fc1a#file-dockerfile}

Nó sẽ copy package.json, chạy npm install và start server.
Để đảm bảo tệp là chính xác, bạn có thể chạy `docker build -t abhinavdhasmana/github-action-example-node .` từ thư root. Nếu bạn chạy `docker images`, bạn sẽ thấy image bản lastest. Bạn cũng có thể chạy container bằng lệnh `docker run -d -p 3000:3000 abhinavdhasmana/github-action-example-node`. Truy cập trình duyệt đến `http://localhost:3000/` và có 1 đoạn text sẽ xuất hiện.

## Github Action là gì, và nó hoạt động như thế nào

‘GitHub Actions’ là một API có thể phản ứng với bất kỳ sự kiện nào, sự kiện của GitHub hoặc của chính chúng ta. Ví dụ: khi có sự kiện **push** lên repository, thì chúng ta muốn unit test được chạy

Để Github Action hoạt động, chúng ta cần tạo 1 folder `.github/workflows` và chúng ta sẽ tạo các workflow trong này. Hãy tạo file `push.yml`

Đây là những gì chúng ta sẽ thực hiện trong flow

1. git clone the repo
2. run npm install
3. run npm lint
4. run npm test
5. build the docker image
6 login to docker hub
7. Push the image to docker hub

File `push.yml` sẽ trông như thế này

{@embed: https://gist.github.com/abhinavdhasmana/78dc8a5c42ec93129006c7e290451f6b#file-push-yml}

Giải thích qua 1 chút về file

dòng 1: Sự kiện mà chúng mà muốn trigger, **push**

dòng 3–6: Chúng ta đang xác định một job build-and-publish chạy trên ubuntu mới nhất. Mỗi job chạy trong một phiên khác nhau của môi trường ảo. Một job có thể chứa một hoặc nhiều bước.

dòng 8: Đây là bước 1 trong ứng dụng của chúng ta. Ở đây chúng ta sẽ lấy source code. Bạn cũng có thể viết ra 1 đoạn script của riêng mình để pull code hoặc sử 
dụng lại một mã nguồn mở.  https://github.com/actions/checkout

dòng 9-12: Đây là bước 2 trong workerflow của chúng ta, nơi chúng ta chạy npm install trên source code. Một lần nữa, chúng ta sử dụng một action nguồn mở tại https://github.com/actions/npm và chuyển đối số.

dòng 13–20: Đây là bước chạy test, kiểm tra convention.

dòng 21–24: Chúng ta tạo docker image cho source code với sự trợ giúp của docker cli và gắn tag cho image là abhinavdhasmana/github-action-example-node

dòng 25-29: Dòng này là đăng nhập vào Docker hub. Ở đây chúng ta sử dụng các secrest key được chuyển dưới dạng biến env cho bản biuld. Chúng ta có thể đặt các biến env này theo nhiều cách. Để thiết lập điều này qua GitHub, hãy đi tới `Settings-> Secrets` và tạo key mới

![](https://images.viblo.asia/16005134-765b-434a-bc3b-dde4c7e3cbfe.png)

dòng 30-33: Chúng ta đẩy image vào docker hub với thẻ mà chúng ta đã tạo ở dòng 24.

Nếu chúng ta push code, và comit thay đổi, GitHub Actions sẽ hoạt động và bắt đầu chạy tất cả các bước trong workflow của chúng ta. Chúng ta sẽ thấy một cái gì đó như thế này

![](https://images.viblo.asia/caab822e-b48c-4216-9566-d7f8ac7e27c3.png)

Và chúng ta có thể lên DockerHub để thấy image được đây lên

![](https://images.viblo.asia/c25989e0-6179-40f9-84bf-b80249dac97e.png)

Full code được đặt tại [Github](https://github.com/abhinavdhasmana/github-action-example-node)

Nguồn: [https://blog.bitsrc.io/](https://blog.bitsrc.io/)