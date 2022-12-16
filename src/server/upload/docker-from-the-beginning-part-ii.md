Chào mừng bạn đã đến với phần hai của series về docker. Hi vọng các bạn đã đọc qua phần một và đã hiểu về core của docker, nếu các bạn chưa đọc thì có thể đọc [tại đây](https://viblo.asia/p/docker-from-the-beginning-part-i-Eb85oa74Z2G)  để hiểu về core của docker.
Trong phần tôi sẽ nói về volume trong docker. Bài viết sẽ được chia làm các phần sau: 

**Đặt vấn đề.**  Tóm tắt bài học rút ra ở phần một và sẽ thảo luận về những bất cập khi không sử dụng volume.

**Lưu trữ dữ liệu.**  Chung ta sẽ sử dụng volume để lưu trữ các file mà chúng ta tạo hoặc những database mà chúng ta thay đổi (ví dụ Sqllite).

**Biến workdir thành một volume.** Volume là cách rất tốt để chúng ta làm việc với ứng dụng mà không cần phải remove và build lại container khi có bất cứ thay đổi nào trong code.
## Đặt vấn đề
Ok! Chúng ta sẽ tiếp tục với source code ở phần một nhé, ở đây là một server Nodejs sử dụng Express framework. Trong phần nay chúng ta sẽ thực hiện hai bước:
* Chạy một container: Chúng ta sẽ start một container, bằng cách này sẽ giúp các bạn ôn lại những câu lệnh đã có ở phần một.
* Thay đổi code trong app: Ta sẽ chỉnh sữa code, stop và start một container để nhận ra rằng sẽ rất bất tiện khi không dụng volume.
### 1. Chạy một container.
Di chuyển vào thư mục gốc chứa source code của chúng ta ở phần một và hay tưởng tượng rong giai đoạn phát triển của dự án, source code sẽ luôn thay đổi.
Hiện tại source code của chung ta có ở phần 1 như sau:
```
// app.js

const express = require('express')

const app = express()

const port = process.env.PORT

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
```
Chạy câu lệnh sau để hiển thị tất cả các container đang được chạy.
```
docker ps
```
Sẽ có kết quả như sau:
![](https://images.viblo.asia/57523fc5-be3c-4ffa-9507-68b3de275f9f.png)
List trống, hiện tại không có container đang chạy cả bởi vì chúng ta đã chạy lệnh docker stop hoặc docker kill trước đó. Hẫy xem những image mà chúng ta đã có bằng cách chạy lệnh:
```
docker images
```
Kết quả như sau:
![](https://images.viblo.asia/3ae2642f-2dde-49cc-ac06-31ae3ab5bf16.png)
OK. Chúng ta có một image với tên là 'chrisnoring/node'. Bây giờ chúng ta sẽ tạo và chạy một container từ image này bằng lệnh sau:
```
docker run -d -p 8000:3000 chrisnoring/node
```
Câu lệnh trên sẽ tạo và chạy một container ở port 8000(-p) và ở chế độ detached(-d). Kết quả như sau:
![](https://images.viblo.asia/7960f895-1698-419b-8627-dc3c0fae1800.png)
Truy cập vào đường link http://localhost:8000 trên  browser thì sẽ được kết quả như sau:
![](https://images.viblo.asia/c841c3e8-4889-4436-b4c4-b5883fa7705a.png)
OK! Bây giờ chúng ta đã sẵn sàng để thay đổi source code.
### 2. Thay đổi code trong app.
Bây giờ chúng ta thay đổi router mặc đinh trong file app lại thành:
```
app.get('/', (req, res) => res.send('Hello Chris!'))
```
Lưu lại những thay đổi và refresh lại xem kết quả. Như các bạn thấy browser vẫn render ra text 'Hello World!'. Điều đó chứng tỏ những thay đổi của chúng ta docker không hề update lại. 
Để update lại những thay đổi trong docker thì chúng ta cần down, remove container, rebuild image và chạy lại container từ image mới build lại. Để thực hiện các bước mô tả ở trên chúng ta cần các câu lệnh sau:
```
docker stop my-container // this will stop the container, it can still be started if we want to

docker rm my-container // this will remove the container completely

docker build -t chrisnoring/node . // creates an image

docker run -d -p 8000:3000 --name my-container chrisnoring/node
```
WOW! Mỗi lần thay đổi code rồi thực hiện chừng đó câu lệnh thì thốn thật đấy nhỉ?
## Volume
Volumes là cách mà chúng ta có thể tạo địa chỉ trên máy, nơi chúng ta có thể tạo file và lưu trữ chúng. Tại sao chúng ta muốn điều đó? Hãy tưởng tượng khi chúng ta đang phát triển, chúng ta có thể cần phải đưa ứng dụng vào một trạng thái nhất định để chúng ta không phải bắt đầu lại từ đầu, Ví dụ, chúng ta muốn lưu trữ những thứ như file log, file JSON và thậm chí cả cơ sở dữ liệu (SQLite) trên một ổ đĩa. 
### 1. Creating and managing a volume
Để tạo một volume chúng ta chạy lệnh sau:
```
docker volume create [name of volume]
```
Chạy lệnh sau để hiển thị list các volume hiện có của chúng ta:
```
docker volume ls
```
![](https://images.viblo.asia/17c3cbb3-ce4e-4c0b-8330-e76ab3860041.png)
Để remove volume đã tồn tại ta có các câu lệnh sau:
```
docker volume prune // remove tất cả các volume đã được tạo.
docker volume rm [name of volume] //remove volume có thêm là [name of volume]
```
Để xem chi tiết các thông tin của một volume ta có câu lệnh sau:
```
docker inspect [name of volume]
```
![](https://images.viblo.asia/085921ed-b886-465d-9164-a3607b07c981.png)
Như bạn có thể thấy trường Mountpoint đang cho chúng tôi biết Docker đang duy trì các tệp của bạn ở đâu.
### 2. Gắn kết một volume trong application của chúng ta.
Trong giai đoạn phát triển, Chúng ta muốn có thể thay đổi hoặc tạo các tệp trong container và  khi down và khởi động lại các container đó thì các thay đổi của chúng ta sẽ vẫn ở đó.
Để làm được điều đó chúng ta có thể sử dụng một trong hai câu lệnh sau:
 1. -v, —-volume, cú pháp như sau -v [name of volume]:[directory in the container], ví dụ -v my-volume:/app
 2. --mount, cú pháp như sau --mount source=[name of volume],target=[directory in container] , ví dụ —-mount source=my-volume,target=/app
 Khi được sử dụng kết hợp với việc chạy một container, nó sẽ trông như thế sau:
```
docker run -d -p 8000:3000 --name my-container --volume my-volume:/logs chrisnoring/node
```
### Thao tác với application của chúng ta như một volume.
Do chúng ta sắp thay đổi source code và config trong docker nên trước tiên chúng ta phải xóa container mà chúng ta đã tạo trước đó.
```
docker kill my-container && docker rm my-container
```
Sau đó, chúng ta cần chạy lại container của mình lần này với một đối số volume khác là --volume $ (PWD): / app.
Câu lệnh đầy đủ như sau:
![](https://images.viblo.asia/9459e1b4-f27d-44dd-a21d-93fb7c3f1c41.png)
Bây giờ chúng ta thêm một route trong file app.js như sau:
```
app.get("/docker", (req, res) => {

  res.send("hello from docker");

});
```
Save và truy cập vào link http://localhost:8000/docker thì chúng ta sẽ thấy như sau:
![](https://images.viblo.asia/6b898aa7-f39d-4477-aa75-e153698a46be.png)
Ồ! Nó vẫn chưa apply thay đổi của chúng ta.
Vấn đề là đối với server node js khi chúng ta thay đổi code thì phải restart lại server để apply những thay đổi. Để làm điều đó một cách tự động chúng ta sẽ sử dụng nodemon.
Bên trong container ta chạy lệnh sau để cài đặt nodemone:
```
npm install --save-dev nodemon
```
Bên trong file package.json ta thêm scripts như sau:
```
"scripts": {
  "start": "nodemon app.js"
}
```
Để chạy tự động câu lênh npm start khi start container thì chúng ta thay đổi trong file Dockerfile từ:
```
ENTRYPOINT ["node", "app.js"]
```
thành 
```
ENTRYPOINT ["npm", "start"]
```
Bởi vì thay đổi Dockerfile nên chúng ta phải build lại image bằng lệnh sau:
```
docker build -t chrisnoring/node .
```
Tiếp theo tạo và start container từ image mới build lại bằng lệnh:
```
docker run -d -p 8000:3000 --name my-container --volume $(PWD):/app
```
Bây giơ chúng ta thêm route sau vào file app.js như sau:
```
app.get('/nodemon', (req, res) => res.send('hello from nodemon'))
```
Lưu lại và truy cập vào đường link  http://localhost:8000/nodemon thì sẽ cho kết quả như sau:
![](https://images.viblo.asia/4515cfd8-ddb5-4916-b725-c6369cca5c9b.png)
Như vậy chúng ta đã gắn kết một volume với application của chúng ta, kể từ bây giờ các thay đổi trong code của chúng ta sẽ được docker phản ánh tức thời.

Hi vọng bài viết có thể giúp các bạn hiểu về cách dùng của volume trong docker.