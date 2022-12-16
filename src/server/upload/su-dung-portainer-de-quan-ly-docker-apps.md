### I. Giới thiệu
![](https://images.viblo.asia/7b1e781b-39ba-43d4-b36f-023279fb0b83.png)

Hiện nay, docker ngày càng được sử dụng trong các dự án nhờ những ưu điểm cực kỳ ưu việt của nó. Sau một thời gian sử dụng docker mình cũng sớm nhận ra và sử dụng nó ngày một nhiều.
Nếu các bạn chưa biết về docker hoặc chưa hiểu về nó có thể tham khảo tại đây :
- [Docker - những kiến thức cơ bản phần 1](https://viblo.asia/p/docker-nhung-kien-thuc-co-ban-phan-1-bJzKmM1kK9N)
- [Docker - những kiến thức cơ bản phần 2](https://viblo.asia/p/docker-nhung-kien-thuc-co-ban-phan-2-V3m5WyEvZO7)
- [Docker - những kiến thức cơ bản phần 3](https://viblo.asia/p/docker-nhung-kien-thuc-co-ban-phan-3-4dbZNoovlYM)

Tại sao lại sử dụng **portainer** để quản lý docker apps ?

- Có khá nhiều bạn khi sử dụng docker gặp vấn đề về câu lệnh có nó, mỗi khi kiểm tra danh sách của containers hay images, thậm chí việc xóa nó nữa rất rất nhiều câu lệnh đúng không ạ.
- Một vấn đề nữa là khi hệ thống của bạn cần sửa dụng quá nhiều services và containers, việc quản lý bằng command line trở nên khó khăn và khó nhìn.
Chính vì vậy portainer giải quyết cho chúng ta vấn đề về việc quản lý các docker apps và thao tác chúng được thuận tiện hơn trên giao diện UI.
### II. Cài đặt
**Deploy Portainer trên Linux:**
```bash
$ docker volume create portainer_data
$ docker run -d -p 8000:8000 -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer
```
**Deploy Portainer trên Windows:**
```bash
$ docker volume create portainer_data
$ docker run -d -p 8000:8000 -p 9000:9000 --name portainer --restart always -v \\.\pipe\docker_engine:\\.\pipe\docker_engine -v portainer_data:C:\data portainer/portainer
```

**Init Docker Swarm trên Linux:**

Portainer quản lý docker apps bằng docker swarm nên các bạn cần phải init docker swarm với ip của máy bạn (hoặc server) thì mới deploy stack được nhé.
```bash
$ docker swarm init --advertise-addr 192.168.1.34
Swarm initialized: current node (bvz81updecsj6wjz393c09vti) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join \
    --token SWMTKN-1-3pu6hszjas19xyp7ghgosyx9k8atbfcr8p2is99znpy26u2lkl-1awxwuwd3z9j1z3puu7rcgdbx \
    172.17.0.2:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
```

**Deploy docker stack trên Linux:**
```bash
$ curl -L https://downloads.portainer.io/portainer-agent-stack.yml -o portainer-agent-stack.yml
$ docker stack deploy --compose-file=portainer-agent-stack.yml portainer
```

**Deploy docker stack trên Windows:**
```bash
$ curl https://downloads.portainer.io/portainer_windows_stack.yml -o portainer_windows_stack.yml
$ docker stack deploy --compose-file=portainer_windows_stack.yml portainer
```
### III. Sử dụng
Sau khi cài đặt docker container cho portainer xong, chúng ra vào trình duyệt và gõ url: http://192.168.1.34:9000

Phía trên là ip của máy mình, các bạn hãy vào network setting để lấy ra ip rồi init với docker swarm như trên nhé. Thành công thì sẽ hiển thị màn hình đăng nhập như phía dưới. Các bạn nhập password cho mình rồi bấm create user.

![](https://images.viblo.asia/7b1e781b-39ba-43d4-b36f-023279fb0b83.png)

Sau khi đăng nhập thành công, chúng ta sẽ vào trong dashboard của portainer như dưới.
![](https://images.viblo.asia/ec66e24f-4452-496f-a38a-c7df71bf8d81.png)

Trong trang dashboard portainer đã tạo cho chúng ta một endpoint mặc định là ```primary``` các bạn có thể vào đổi tên hoặc tạo endpoint mới tùy ý.

![](https://images.viblo.asia/0da13813-03cb-4b7e-bb4e-062c51850139.png)

Sau khi update xong thì các bạn bấm vào update endpoint.
Trong endpoint bao gồm quản lý cho các stacks, services, container, images, networks,.. Bạn có thể add stack trực tiếp trong trang quản lý. Bằng việc add vào file docker-compose
![](https://images.viblo.asia/447a6989-2322-4d7c-be6c-0abb99d48ab4.png)

Hoặc bạn cũng có thể chạy bằng command sau đó xem và quản lý trên dashboard. Đó cũng là lý do của việc sinh ra portainer dashboard

![](https://images.viblo.asia/57f008f9-5457-480a-a2cf-7a72eb654490.png)

Và đây là stacks sau khi chúng ta đã chạy docker-compose.yml bằng command hay deploy trên dashboard

![](https://images.viblo.asia/c4a3aead-af3e-45db-9fbc-91a910bb80e1.png)

Như các bạn có thể thấy sau khi chạy xong docker-compose thì hiện tại stacks của mình gồm các containers như bên dưới

![](https://images.viblo.asia/4658d63a-9c65-4aa1-8739-2455ec312956.png)

Bây giờ các bạn có thể start, stop, hay thâm chí remove các container mà không phải gõ command line nữa.

**Màn hình quản lý services:**
![](https://images.viblo.asia/d02f9c38-11f5-4989-8135-2aa47ce65da1.png)

**Màn hình quản lý containers:** Chúng ta có thể thao tác tất cả các nhiệm vụ của containers

![](https://images.viblo.asia/73013fb3-15ee-4bd4-8d0c-f8fdcca495d1.png)

Thay vì trước đây chúng ta phải xem trên command line:
![](https://images.viblo.asia/58e3acd1-5382-4934-9efd-c054641c79ab.png)


**Màn hình quản lý Images:** Chúng ta có thể thao tác tất cả các nhiệm vụ của images

![](https://images.viblo.asia/a603e360-f6b3-4689-94b8-6ce87dd08f5c.png)

Thay vì trước đây chúng ta phải xem trên command line:
![](https://images.viblo.asia/69998873-8b51-470e-901c-b5cc21c7ab25.png)

.... Bây giờ các bạn hoàn toàn có thể kiểm soát được toàn bộ hệ thống docker cho dự án của mình ở đây.


### IV. Tạm kết
Với những dự án nhỏ không sử dụng quá nhiều services hay containers docker thì bạn không nhất thiết phải cài đặt portainer để quản lý, vẫn hoàn toàn có thể sử dụng command line để quản lý cho chuyên nghiệp. Hy vọng qua bài viết các bạn đã biết về một công cụ để quản lý docker apps. Mong được sự góp ý và bàn luận thật nhiều từ các bạn.
![](https://images.viblo.asia/c9a98922-9b9c-4ceb-9516-6c6b67a3cb01.gif)