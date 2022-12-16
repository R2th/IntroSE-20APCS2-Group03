Nghe thì đơn giản nhở, ai là dev mà chả chạy được ứng dụng trên localhost rồi, sao phải hướng dẫn phức tạp loằng ngoằng làm gì?

Nhưng nếu bạn đã ở vào hoàn cảnh chạy trên máy mình được mà máy đồng nghiệp không được, hay là máy mình được mà lên server lại tịt ngóm,... thì bạn nên tiếp tục đọc hướng dẫn này, bởi vì sự khác biệt môi trường, phiên bản phần mềm, user permission,... là những thứ làm quá trình development của bạn rối tung lên mà chẳng hiểu tại sao.

## First things first

Một phút dành cho quảng cáo, mình là **Minh Monmen**, một developer còn rất non kinh nghiệm chỉ có một ước mong cuộc sống của bản thân cũng như đồng nghiệp dễ thở hơn, đã dành ra chút thời gian xem phim quý báu để xàm xí trong bài viết này, rất mong các bạn ủng hộ và đóng góp tích cực.

Bài viết này là phần 2 của loạt bài ***Developer hiện đại*** nói về việc tạo nên một môi trường phát triển ứng dụng thật chuyên nghiệp và nhanh chóng. Trong phần này, mình và các bạn sẽ bước vào một thế giới muôn hình vạn trạng với vô số vấn đề nhức não của một developer. Đó chính là việc làm thế nào để chạy được ứng dụng trên... localhost.

Bạn có thể truy cập lại phần 1 nói về việc setup persistent stack của mình tại đây: [Dev hiện đại phần 1: Setup môi trường dev với docker](https://viblo.asia/p/dev-hien-dai-phan-1-setup-moi-truong-dev-voi-docker-djeZ1RpQlWz)

Do tính chất phức tạp và độ áp dụng cao trong cả quá trình development và tối ưu cho việc deploy, vậy nên trong khuôn khổ bài viết này mình sẽ chỉ đi lướt qua 1 số thứ cơ bản để các bạn dễ hiểu. Trong các bài viết phía sau mình có thể sẽ đi sâu hơn vào việc tối ưu image cho các stack công nghệ (php, nodejs) phục vụ cả quá trình deploy nữa.

## Bắt đầu với việc phát triển ứng dụng web

Trước khi có thể nói tới vấn đề công nghệ thì chúng ta hãy điểm qua việc bạn sẽ kiến trúc project của bạn như thế nào.

### Khởi tạo project

Đây là bước giống như việc bạn quy hoạch ngôi nhà sắp xây của bạn, đâu là cột nhà, đâu là móng nhà, đâu là tường,... Bạn quy hoạch càng tốt bao nhiêu, sau này project của bạn càng dễ thở và dễ thao tác bấy nhiêu. Trước tiên hãy tạo mới 1 project với 3 file cơ bản:

```
├── .gitignore
├── .dockerignore
├── README.md
```

Theo ý kiến cá nhân của mình, đây là 3 file rất quan trọng nhưng thường bị các bạn bỏ qua. 

**Thứ nhất** là file `README.md` giúp cho bạn, đồng nghiệp của bạn hay là các bộ phận khác (ví dụ sysadmin) hiểu được cách chạy project của bạn. Đừng tiếc thời gian để tạo ra nó.

**Thứ hai** là file `.gitignore`, đây là thứ bạn rất cần đầu tư nếu làm việc với git, nó giúp git nhận biết đâu là thư mục log, đâu là file config, environment,... của các bạn. Cái này mình sẽ không nói ở đây vì nó thuộc về phần làm việc với git rồi. Tuy nhiên 1 file `.gitignore` được kiến trúc chuẩn là khi dù chạy project trên máy bạn, trên máy đồng nghiệp, hay server thì khi bạn gọi `git status` thì các bạn phải thấy `working tree clean`.

**Thứ ba**, vì chúng ta làm việc với docker, nên file `.dockerignore` cũng nên được coi trọng. File này giúp docker biết phải loại bỏ file nào ra khi build image. Điều này 1 là giúp các bạn loại trừ được file chứa dữ liệu (logs, config local,...) ra khỏi image, 2 là giúp giảm nhẹ dung lượng image khi docker chỉ build image bằng các file cần thiết. File này có nội dung gần giống như `.gitignore` vì những file dc ignore bởi git thì cũng thường nên được ignore bởi docker. Dưới đây là 1 ví dụ file `.dockerignore` với project nodejs:

```bash
# Environment variables
.env

# Logs
logs
*.log
npm-debug.log*

# Documentation
docs

# Coverage directory used by tools like istanbul
coverage

# nyc test coverage
.nyc_output

# Grunt intermediate storage (http://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# node-waf configuration
.lock-wscript

# Dependency directories
node_modules
jspm_packages

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Dist folder
dist

# Project file
*.sublime-project
*.sublime-workspace

# Git file
.git

# Docker file
*Dockerfile*
*docker-compose*

# Deploy folder and file
deploy
.gitlab-ci.yml

# Documentation file
*.md
```

File `.dockerignore` phía trên đã loại bỏ tất cả những file ***không liên quan*** hoặc ***sẽ được sinh ra*** trong quá trình build/run ứng dụng của bạn. Điều này giúp docker khi build chỉ chú ý tới code application của bạn, còn việc cài thư viện, build file, environment sẽ là việc của docker.

### Đặt code ở đâu

Qua quá trình làm việc với rất nhiều dự án, một kinh nghiệm khi xây dựng cấu trúc project của mình đó là nên ***giữ mọi thứ tách biệt***, đặc biệt là phần ***code*** và ***phần build/deploy***. Điều này sẽ giúp ích rất nhiều bởi đa số các công ty hiện tại có phần dev và phần ops riêng biệt, do đó để cho 2 bộ phận này có thể làm tốt việc của mình, chúng ta nên tách mọi thứ ra cho họ. Dưới đây là cấu trúc thư mục mà mình hay dùng:

```
├── deploy
│   └── Toàn bộ script liên quan tới deploy (helm chart, script) để ở đây
├── script
│   └── Toàn bộ script liên quan tới development (chạy dev, chạy test) để ở đây
├── src
│   ├── package.json
│   └── bạn cho toàn bộ code application của bạn vô đây
├── docker-compose.yml
├── Dockerfile
├── .gitignore
├── .dockerignore
└── README.md
```

***Đây là cấu trúc cho 1 ứng dụng web, nếu bạn xây dựng library/package thì kiến trúc có thể khác***

## Hello world with nodejs and mongodb

Để phần thực hành được như 1 dự án mang tầm vĩ mô thực thụ, mình sẽ bỏ qua mấy cái trò hello world đơn giản mà tạo 1 ứng dụng có kết nối tới DB. Nodejs là ứng cử viên sáng giá vì tính dễ cài đặt và đơn giản, qua đó thể hiện được rõ phần **môi trường** mà chúng ta đang luyện tập.

Thông thường các tut khác về tạo môi trường với docker sẽ cho các bạn code trước rồi bắt đầu đóng gói sau. Nhưng vì mình đang là tạo môi trường phát triển, nên bạn làm gì đã có code đúng không? Chúng ta sẽ bắt đầu với việc chạy được `yarn` (hay `npm`) ở localhost ***mà quan trọng là không cài node***.

### Khởi tạo môi trường

Hãy bắt đầu với `Dockerfile` sau:

```Dockerfile
FROM node:8-alpine

WORKDIR /app
```

Và một file `docker-compose.yml` cũng đơn giản không kém

```yaml
version: "2"
services:
    docker-app-demo:
        container_name: docker_app_demo
        build: .
        user: "1000:1000"
        volumes:
            - ./src:/app
```

Ở trên mình chỉ định nghĩa một image chạy trên `node:8-alpine` có thư mục làm việc là `/app`, kế đó là nhét nó vào `docker-compose.yml` rồi mount volume y hệt như mình đã làm với các loại db trong bài viết trước. Tèn ten và mình đã có khả năng chạy được lệnh `yarn` (or `npm`) trong thư mục `./src` chính là thư mục `/app` được mount. Cú pháp để chạy như sau:

```bash
# Syntax: docker-compose run --rm <service-name> <command>
$ docker-compose run --rm docker-app-demo yarn init 
```

Về bản chất thì `docker-compose run` không khác gì so với chạy `docker run` bình thường, nhưng ở đây mình dùng là để tận dụng các config của file `docker-compose.yml`. Thật đơn giản phải không? Sau khi chạy thì mình đã có ngay 1 file `package.json` trong thư mục `src/` như sau:

![yarn init](https://images.viblo.asia/b3c11945-368e-4524-b91a-7f45ac444478.png)

### Cài đặt thư viện

Để cho nhanh hãy bắt đầu với 1 ứng dụng nodejs duy nhất 1 file là `index.js` với chức năng cơ bản là tạo 1 document trong database và lấy danh sách document đó từ database ra. Giờ cài thêm `express` để tạo api và `mongoose` để kết nối db nào:

```bash
$ docker-compose run --rm docker-app-demo yarn add express mongoose 
```

![yarn](https://images.viblo.asia/ab0ae885-ec98-4374-be46-cc476370a4cb.png)

### Bắt tay vào code

Và đây là file `index.js`:

```javascript
// index.js
const mongoose = require('mongoose');
const express = require('express');

// DEFINE VARIABLE
const port = process.env.PORT;
const uri = process.env.MONGO_URI;

// Define test model
const Test = mongoose.model(
    'Test',
    new mongoose.Schema({}, { timestamps: true })
);

// Connect to db
mongoose.connect(uri,  { useNewUrlParser: true, keepAlive: 1 });

// Define express server
const app = express();

app.get('/list', async (req, res) => {
    const tests = await Test.find({}).exec();
    return res.json(tests);
});

app.get('/create', async (req, res) => {
    const test = new Test();
    const savedTest = await test.save();
    return res.json(savedTest);
});

// listen to requests
app.listen(port, () => console.info(`server started on port ${port}`));
```

Đoạn code này chắc hẳn các bạn đều có thể hiểu được một cách dễ dàng. Tuy nhiên nó lại phản ánh chính xác những gì các bạn cần làm để có thể có 1 ứng dụng chuẩn có thể chạy trên bất kỳ môi trường nào.

Các bạn chú ý cho mình tới phần **DEFINE VARIABLE** được mình comment ở trên. Thay vì mình fix cứng việc application của mình lắng nghe trên 1 cổng nào đó (ví dụ 3000) và đưa đường dẫn tới database vào file `index.js` này, mình đã biến toàn bộ ứng dụng của mình thành 1 function lớn có đầu vào là `port` và `mongo_uri`. Để ứng dụng này có thể chạy được mình chỉ cần truyền vào tham số `port` và 1 đường dẫn tới database `mongo_uri` là được.

Để làm được điều này thì mình sử dụng 1 thứ gọi là **environment variable**, tức là biến môi trường. Biến môi trường đơn giản là 1 biến được môi trường (hệ điều hành) ném vào ứng dụng của bạn. Nó cho ứng dụng của bạn biết mình đang chạy ở đâu, xung quanh có gì, có chỉ thị gì từ thằng chạy (là mình) hay không,... Trong nodejs thì thằng `process.env` chính là thằng chứa những biến môi trường đó.

Tạm thời vậy đã, giờ ta quay trở lại với docker.

### Kết nối tới persistent stack

Đầu tiên, muốn dùng được **environment variable** thì ta phải định nghĩa nó. Mình sẽ thêm phần này vào `docker-compose.yml`. Thêm luôn cả expose port 3000 ra ngoài host để mình có thể truy cập bằng trình duyệt:

```yaml
version: "2"
services:
    docker-app-demo:
        container_name: docker_app_demo
        build: .
        user: "1000:1000"
        volumes:
            - ./src:/app
        # Expose container port 3000 to host port 3000
        ports:
            - "3000:3000"
        environment:
            - PORT=3000
            - MONGO_URI=mongodb://localhost:27017/test
```

Ơ mà khoan đã, hình như có gì đó sai sai. Vì file `docker-compose.yml` này sẽ tự tạo cho mình 1 mạng tên là `dockerappdemo_default` (phần prefix mình đã nói ở bài trước). Vậy là mình chạy mongodb và app trên 2 mạng khác nhau, vậy sao chúng kết nối được? Nếu kết nối được, thì app sẽ gọi mongo qua địa chỉ nào? Localhost của docker-app-demo đâu có chạy mongodb đâu?

![before network](https://images.viblo.asia/d0be3f0e-778a-4ddc-ae20-6cd0b3d44cd9.jpg)

Thế là mình nghĩ tới việc làm sao để chúng chạy chung 1 mạng, và câu trả lời chính là định nghĩa **external network** trong `docker-compose.yml`. Nhét chung 1 mạng là từ container app có thể gọi qua container chạy mongodb bằng **tên service** định nghĩa trong file `docker-compose.yml` của persistent stack. 

```yaml
version: "2"
services:
    docker-app-demo:
        container_name: docker_app_demo
        build: .
        user: "1000:1000"
        volumes:
            - ./src:/app
        ports:
            - "3000:3000"
        environment:
            - PORT=3000
            # `mongo` is the `service name` defined in persistent stack
            - MONGO_URI=mongodb://mongo:27017/test 
        networks:
            - persistentstack_common
networks:
    persistentstack_common:
        external: true
```

Đây là tình hình sau khi thay đổi:

![after network](https://images.viblo.asia/4748cc3e-18f2-45b6-9977-ef86ca9494ef.jpg)

Chắc các bạn còn nhớ ở bài viết trước mình có lưu ý các bạn về **cái tên của network** do docker-compose tạo ra có chứa phần tiền tố là tên thư mục và bảo các bạn ghi nhớ đúng không? Đây chính là lúc sử dụng nó đó. Để kết nối được vào mạng của persistent stack, mình cần các bạn điền đầy đủ và chính xác tên của network đó tại đây.

### Và chạy thử 

Edit `Dockerfile` để image của các bạn expose cổng 3000 và có 1 command để chạy nào.

```Dockerfile
FROM node:8-alpine

EXPOSE 3000
WORKDIR /app

CMD ["node", "index.js"]
```

Nên nhớ, sau khi edit `Dockerfile` thì bạn hãy chạy `docker-compose build` để rebuild image nha. Nếu không nó sẽ giữ nguyên image cũ để chạy đó.

```bash
$ docker-compose build
$ docker-compose up

Creating docker_app_demo ... 
Creating docker_app_demo ... done
Attaching to docker_app_demo
docker_app_demo    | server started on port 3000
```

Tada, thử vào trình duyệt tại địa chỉ `http://localhost:3000/create` và `http://localhost:3000/list` bạn sẽ thấy điều kì diệu.

![curl](https://images.viblo.asia/6d8ebdfd-25ec-410c-a224-79d4710577c9.png)

### Nhưng nó có gì đó sai sai

Vâng, mặc dù ứng dụng đã chạy được, khi mình sửa code thì mình cũng chỉ cần chạy `docker-compose up` lại là thay đổi đã được chạy. Nhưng có điều gì đó sai sai trong `Dockerfile` phía trên thì phải. Image sinh ra **KHÔNG CÓ CODE** mà code và cả dependencies (thư mục `node_modules`) lại được mount từ ngoài host vào. Tức là project này mình chỉ chạy được khi làm 2 việc sau:

- Mount thư mục code vào `/app`
- Chạy cài đặt dependencies (npm install, yarn) **bằng tay** như mình làm phía trên

Đây là vấn đề liên quan tới việc đóng gói 1 ứng dụng bằng docker nữa nên mình sẽ đề cập và hoàn thiện phần này ở bài viết tiếp theo, tránh việc đưa quá nhiều thông tin gây loãng cho các bạn.

## Tổng kết

Đây là 1 số gạch đầu dòng cho các bạn nhớ:

- Kiến trúc project rõ ràng
- Chuyển config ứng dụng liên quan tới môi trường ra **environment variable**
- Tạo môi trường chạy code bằng `docker-compose`
- Chạy package manager qua `docker-compose run`
- Kết nối tới **persistent stack** qua **external network**

Link Github code trong bài: [Docker-app-demo](https://github.com/minhpq331/docker-app-demo)

Tuy nhiên đây mới chỉ là bước đầu trong việc phát triển ứng dụng của mình. Mình muốn nhiều hơn thế, ứng dụng của mình phải được đóng gói hẳn hoi và sẵn sàng cho việc build và lên production cơ. Ngoài ra quá trình phát triển ứng dụng không chỉ là chạy được ứng dụng mà còn phải debug và test được. Chính vì vậy rất nhiều khía cạnh như **hot reloading**, **multi service** hay **multi environment** chi tiết sẽ được mình đề cập trong các bài viết sắp tới: 
- ***Từ phát triển tới triển khai P1: Backend, NodeJS, API***
- ***Từ phát triển tới triển khai P2: Frontend, VueJS, SPA - SSR***
- ***Từ phát triển tới triển khai P3: PHP Laravel***

Nếu các bạn không sử dụng NodeJS, đừng buồn bởi vì những lý thuyết được mình sử dụng đều có thể áp dụng với các ngôn ngữ khác như php, python,... chứ không chỉ nodejs. Bạn chỉ cần sửa lại chi tiết các bước cho hợp với ngôn ngữ của bạn là được.

Cám ơn các bạn đã theo dõi. Mọi ý kiến hay câu hỏi vui lòng comment nhé.