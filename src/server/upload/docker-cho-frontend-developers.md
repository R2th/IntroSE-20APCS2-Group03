## Tại sao phải dùng docker? 

Từ lâu khi doanh nghiệp cần ứng dụng khác nhau, team DevOps sẽ mua một server mà không cần biết yêu cầu về performance của những ứng dụng mới. Điều này sẽ làm lãng phí tài nguyên được sử dụng cho các ứng dụng khác.

Enter Virtual machines hoặc Virtual machines, cho phép chúng ta chạy nhiều ứng dụng trên cùng một server. Nhưng có một nhược điểm: mỗi Virtual machines cần toàn bộ OS để chạy. Mỗi OS lại cần đến CPU, RAM... để chạy. Nó cần những phiên bản patching và licensing, điều này làm tăng thêm chi phí và khả năng phục hồi.

Google đã bắt đầu sử dụng mô hình **Container** từ lâu để giải quyết những thiếu sót của mô hình Virtual machines. Về cơ bản , mô hình Container là nhiều Container trên cùng một server sử dụng cùng một server và giải phóng CPU, RAM có thể được sử dụng ở nơi khác.

> Nhưng Docker giúp gì cho developer? 

Nó đảm bảo môi trường làm việc giống nhau cho tất cả developers và tất cả các servers, môi trường staging, produciton, testing.

Mọi người có thể dễ dàng setup project nhanh hơn, mà không cần config, install libraries, setup dependencies etc.

> Nói một cách đơn giản: Docker là một platform cho phép chúng ta develop, deploy và run ứng dụng với Containers.

Hãy cũng xem sự khác nhau giữa Docker và Virtual machines:

![](https://images.viblo.asia/a8e4a4af-d43c-4b7a-b11b-9226c3726eff.png)

Như bạn có thể thấy resource của nó được chia sẻ trong container nhưng không được chia sẻ trong Virtual machines.

## Sử dụng Docker như thế nào?

Một số thuật ngữ cơ bản:

![](https://images.viblo.asia/3855c818-7d65-484d-b3a1-43060bba30bf.png)

Docker image là một file chứa các source code, libraries, dependencies, tools và các files khác cần thiết cho một ứng dụng để chạy.

Do tính chất read-only của chúng, những images này đôi khi được gọi là snapshots. Chúng đại diện cho một application và virtual environment của nó tại một thời điểm cụ thể. Tính nhất quán này là một trong những tính năng tuyệt vời của Docker. Nó cho phép các developers test và thử nghiệm phần mềm trong điều kiện ổn định, thống nhất.

Docker image có thể bao gồm nhiều layer xếp chồng lên nhau, mỗi layer khác nhau nhưng cũng có nguồn gốc từ layer trước. Docker Image được tạo từ  Docker File.

Docker Container: Là một phiên bản đang chạy của Docker Image. Có thể có nhiều Container từ một Docker Image.

Docker Container hoạt động độc lập nên đảm bảo không ảnh hưởng đến Container khác, giúp tránh xung đột cho ứng dụng. Nó có thể dùng 1 máy, chia sẻ kernel và giả lập môi trường để chạy process độc lập. Điều này làm cho container cực kì nhẹ, không chiếm nhiều tài nguyên của máy.

## Tạo Container đơn giản cho Node.js App
### Tạo Node.js App

Hãy tạo một folder my-node-app:

```
mkdir my-node-app  
cd my-node-app
```

Tiếp tục tạo một node server trong index.js và thêm code sau:

```
//Load express module with `require` directive

var express = require('express')

var app = express()

//Define request response in root URL (/)  
app.get('/', function (req, res) {  
 res.send('Hello World!')  
})

//Launch listening server on port 8081  
app.listen(8081, function () {  
  console.log('app listening on port 8081!')  
})
```

Save file này trong folder my-node-app

Bây giờ chúng ta tạo một file package.json như sau:
```
 {

    "name": "helloworld",  
    "version": "1.0.0",  
    "description": "Dockerized node.js app",  
    "main": "index.js",  
    "author": "",  
    "license": "ISC",  
    "dependencies": {  
      "express": "^4.16.4"  
    }

 }
```
Lúc này chưa cần thiết phải cài express hoặc npm installed trong máy chủ, bởi vì dockerfile xử lý việc thiết lập tất cả các dependencies, lib và configurations.

### DockerFile
Bây giờ ta tạo dockerfile và save lại trong folder my-node-app. File này không có extension và cần đặt tên là: Dockerfile.

```
    # Dockerfile  
    FROM node:8  
    WORKDIR /app  
    COPY package.json /app  
    RUN npm install  
    COPY . /app  
    EXPOSE 8081  
    CMD node index.js
```

Với:

`FROM node:8` — kéo node.js docker image từ docker hub, bạn có thể tìm thấy Image tại đây:  https://hub.docker.com/_/node/

`WORKDIR /app` -thiết lập thư mục cho phép làm việc với image, nó được sử dụng bởi tất cả các lệnh tiếp theo như: COPY , RUN và CMD

`COPY package.json /app` -copy package.json từ folder my-node-app đến image trong /app folder.

`RUN npm install `—Chạy lệnh này trong image để install dependencies (node_modules) cho app.

`COPY . /app` — yêu cầu docker copy files từ folder my-node-app và paste vào /app trong docker image.

`EXPOSE 8081` — hiển thị port trên container. Tại sao lại hiện port ? Bởi vì trong server đang lắng nghe cổng 8081. Mà mặt định containers được tạo từ image sẽ bỏ qua tất cả các yêu cầu được request với nó.

### Build Docker Image
Mở terminal đến folder my-node-app và chạy lệnh:
```
 # Build a image docker build -t <image-name> <relative-path-to-your-dockerfile>

docker build -t hello-world .
```

Lệnh này tạo hello-world image trong máy chủ, với:

`-t` đặt tên cho image, như trên là đặt image tên: `hello-world`

`.` là đường dẫn tương đối đến tệp docker, vì chúng ta đang ở trong thư mục my-node-app, chúng ta đã sử dụng dấu chấm để biểu thị đường dẫn đến tệp docker.

Bạn sẽ thấy output trên command như này:

![](https://images.viblo.asia/16f04789-ff55-4de5-815c-8054ef9f222b.png)

Như bạn có thể thấy, nó đã chạy các bước trong tệp docker và xuất ra docker image. Khi bạn thử lần đầu tiên sẽ mất vài phút, nhưng từ lần sau nó sẽ bắt đầu sử dụng bộ nhớ cache và build nhanh hơn nhiều và đầu ra sẽ giống như hình trên. Bây giờ, hãy thử lệnh sau trong terminal để xem image của bạn có ở đó hay không:

```
# Get a list of images on your host 
docker images
```
    
Lệnh này sẽ hiển thị list Image đang up trong máy:

![](https://images.viblo.asia/5914210d-ced4-42e8-b489-cd544ef6e911.png)

### Run Docker Container

Chúng ta tiếp tục tạo được Container từ Image này:

```
# Default command for this is docker container run <image-name>  
docker container run -p 4000:8081  hello-world
```
    
Command create và run a docker container.

`-p 4000:8081`— đây là publish flag, nó map cổng 4000 của máy chủ với cổng 8081 của Container mà khi nãy ta đã thiết lập trong Dockerfile. Bây giờ tất cả các request đến cổng 4000 sẽ được cổng 8081 của Container lắng nghe.

`hello-world` — đây là tên của image mà trước đó ta chạy lệnh `docker-build`.

Bây giờ ouput sẽ như sau:

![](https://images.viblo.asia/995cff16-63e4-4cb3-a548-25d3c6fdaaf5.png)

Hiển thị các Container đang chạy hoặc không chạy thì dùng lệnh

```
docker ps
```

Bạn sẽ thấy được status của các Container:

![](https://images.viblo.asia/0ee8f3cc-4a6b-4636-bea3-9aec02280580.png)

Nó có nghĩa là Container với id là <container id> được tạo từ image hello-world, đang hoạt động và lắng nghe cổng 8081.

Nếu bạn muốn đi đến workspace của Container thì ta chạy lệnh:
    
```
docker exec -ti <container id> /bin/bash
```

Giờ đây, ứng dụng Node.js đã được hoàn toàn. Bạn có thể chạy http: // localhost: 4000 / trên trình duyệt của mình:
    
 ![](https://images.viblo.asia/74b364c7-803c-4daa-8bb9-bfa320d4794f.png)
    
## Kết bài
Bài viết này hướng dẫn cơ bản để tạo một app với Docker, hy vọng sẽ giúp ích cho các bạn dễ dàng buid project hơn. Bài viết được mình tham khảo từ [Docker For Frontend Developers](https://dev.to/akanksha_9560/docker-for-frontend-developers-1dk5) của Akanksha Sharma.