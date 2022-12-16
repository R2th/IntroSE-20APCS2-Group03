## Mounting Volumes: Sharing Host & Container Files.
- Tiếp nối bài viết trước, chúng ta đã cùng khởi chạy web app với database. Bài viết naỳ chúng ta sẽ cùng nhau chia sẻ host và container file.
- Chúng ta thường muốn chia sẻ files hoặc các directory giữa các host machine và container. Data trong database không nên bị xoá khi bạn dừng và xoá các container - phục vụ cho việc chia sẻ database giữa các version của app. Có thẻ chúng ta muốn hỗ trợ việc chỉnh sửa các file trong database app hoặc muốn trainning data cho machine learning, khi chúng ta khởi chạy trong container. Tất cả vấn đề trên chúng ta sẽ đề cập trong bài viết cuối của series bài viết docker này.
#### **1.Persisting Databases After the Container Exits.**
- Để lưu trữ database trong local host system để nó có thể được sử dụng bởi các container khác, bạn sẽ khởi tạo volume trong Docker's storage directory khi chúng ta khởi chạy CouchDB container.
- Trong terminal chúng ta gõ lệnh sau:
```
docker run --mount source=couchdbVolume,target=/opt/couchdb/data --network emoji-net -d --name couchdb couchdb
```
- Câu lệnh có vẻ xa lạ với chúng ta, nó khởi tạo `couchdbVolume` trong nơi lưu giữ Docker directory ở local host system, sau đó copy content của container đó `/opt/couchdb/data` đến `couchVolume`.
- Trong **EmojiJournalServer** terminal window, chúng ta khởi chạy **EmojiJournalServer** container ở cùng 1 network:
```
docker run --network emoji-net --name emojijournal -it -p 8090:8080 -v $PWD:/root/project -w /root/project emojijournal-run sh -c .build-ubuntu/release/EmojiJournalServer
```
- Cùng refresh và mở **localhost:8090/client**, thêm emoji và trong Docker cleanup terminal - stop và xoá tất cả các container:
```
docker rm $(docker stop $(docker ps -q))
```
- Các volume được gợi nhớ là mặc dù bạn đã xoá CouchDB container thì các volume đã lưu giữ chúng.

![](https://images.viblo.asia/2cb31ebf-8580-4914-841a-f9ab273cc7d0.png)

```
docker volume inspect couchdbVolume
```
- Chúng ta sẽ có output sau:
```swift
[
  {
    "CreatedAt": "2019-01-08T02:59:32Z",
    "Driver": "local",
    "Labels": null,
    "Mountpoint": "/var/lib/docker/volumes/couchdbVolume/_data",
    "Name": "couchdbVolume",
    "Options": null,
    "Scope": "local"
  }
]
```
- Sử dụng **Finder ▸ Go ▸ Go to Folder…** để tìm thư mực đường dẫn mountpoint , chúng ta nhận thấy nó không ở đây. Việc lưu giữ của docker đã được quản lý bằng engine. Bạn sẽ không thể truy cập nó bằng đường dẫn thư mực được. Bạn chỉ có thể truy cập nó trong Docker container.
- Bây giờ, để truy câpk để emoji data đã được lưu giữ sau khi xoá CouchDB container. Trở lại CouchDB commain terminal và **EmojiJournalServer** terminal và refresh **localhost:8090/client** , lần này chúng ta sẽ không mất emoji.
![](https://images.viblo.asia/2cb31ebf-8580-4914-841a-f9ab273cc7d0.png)
- Đó là bởi vì `couchVolume` đã tồn tại, CouchDB container chỉ truy cập nó và dẫn nó đến database đã được lưu trữ ở EmojiJournalServer container.
#### **2.Sharing  Database với Another Docker Container.**
- Chúng ta đã tạo volume cho CouchDB chạy ở `emoji-net` network. Chúng ta đã dừng và xoá CouchDB container nhưng volume vẫn nhắc chúng ta. Chúng ta có thể tái sử dụng volume naỳ cho CouchDB container đang chạy ở network mặc định.
- Để triển khai công việc này, truy cập `couchdbVolume` trong CouchDB container đang chạy ở bridge network mặc định để EmojiJournalServer trên host có thể truy cập và lưu những entries database.
- Khởi chạy CouchDB container trên bridge network mặc định, truy câp `couchdbVolume` và publish nó lên port:
```
docker run --mount source=couchdbVolume,target=/opt/couchdb/data -p 5984:5984 -d --name couchdb couchdb
```
- Trong **EmojiJournalServer** terminal windowm chạy **EmojiJournalServer**  ở host:
```
.build/debug/EmojiJournalServer
```
- EmojiJournalServer đang chạy ở host system, cùng tìm và load journal entries database ở `couchdbVolume`, để stop chúng ta có thể ấn **Control-C**. Stop và xoá bỏ tất cả những volumes không sử dụng:
```
docker volume prune
```
#### **3.Cung cấp Local Files tới Docker Container.**
- Câu lệnh chạy EmojiJournalServer trong container có `-v $PWD:/root/project` để mount EmojiJournalServer ở `/root/project` trong container. 
- Trong **EmojiJournalServer** terminal window, khởi chạy **EmojiJournalServer** container trong background.
```
docker run --name emojijournal -itd -p 8090:8080 -v $PWD:/root/project -w /root/project emojijournal-run sh -c .build-ubuntu/release/EmojiJournalServer
```
- Sau đó chúng ta tiếp tục gõ lệnh:
```
docker exec -it emojijournal bash
```
- Câu lệnh này khởi tạo interactive terminal session đang chạy ở `bash` Unix shell. Để xem thư mục container của projeject chúng ta gõ `ls -l`
- Chúng ta sẽ có out put trong **Finder** như sau:
![](https://images.viblo.asia/2c77a298-21f3-4676-b488-616e581c535c.png)
- Sử dụng text editor của bạn để khởi tạo file mới trong folder này- ví dụ: `aloha.txt` bao gồm text `I was here`. Tại `/project#` , gõ `ls -l` lần nữa, để thấy file mới trong container. Để xoá file thì chúng ta gõ `rm killroy.txt`
#### **4.Chọn volume hay bind mount?**
- Bây giờ chúng ta có hai cách để truy cập thư mục host trong container: `couchdbVolume` là một **volume**, trong khi đó thư mục `EmojiJournalServer` là thư mục được gán liên kết. Điểm khác nhau chính giữa là một **volume** và một thư mục gán nẳm ở file host system.
- Bạn gán thư mục **(bind-mount)** thành một đường dẫn tuỳ chỉnh ở local system - như là EmojiJournalServer folder đến đường dẫn đặc biệt `\root\project`. Bạn có thể tương tác trực tiếp với thư mục local và thay đổi nó khi ở trong container.
- Bạn tạo một **volume** có đường dẫn với tên tuỳ chỉnh, như `couchdbVolume` bằng câu lệnh `docker run` hay `docker volume create`. **Volume** được lưu trong thư mực Docker, trong Docker engine ở local system. Bạn không thể tương tác thực tiếp với content trong thư mục. Bạn có thể truy cập nó trong container, có thể thêm sửa metadata hoặc xoá nó. Docker quản lý việc đọc và ghi file trong volume.
- Điểm khác biệt lớn có thể nhận thấy là khi bạn mở truy cập một container đã tồn tại.
- Nếu bạn gán thư mục (bind-mount) ở thư mục local tới đường dẫn container đã tồn tại, thì bạn đã hoàn toàn overwrite thư mực container. Đừng lo vì thư mục hiện tại vẫn chỉ ở chế độ read-only image.
- Nếu bạn truy cập thư mực container đã tồn tại như là một volume, content trong đó sẽ được copy nhờ CouchDB container.
- Việc sử dụng volume hay bind mount là tuỳ thuộc người sử dụng trong những điều kiện sử dụng khác nhau nhưng `--mount` là một lựa chọn mới được cập nhật và sử dụng hơn `--volume`. Nó sử dụng những `key` và `value` riêng biệt và nó phải được sử dụng với những command đầy đủ không có rút gọn nhu `volume`.
- Chúng ta đã cùng trải qua một loạt kiến thức mới về Docker, sẽ mất thời gian để chúng ta làm quen với cách sử dụng này nhưng đừng quên là không được lười update kiến thức mới. See you next time!