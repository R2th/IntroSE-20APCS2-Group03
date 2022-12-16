## **1. Khởi chạy Web App với Database.**
- Trong bài viết lần này, chúng ta sẽ cùng chạy một web app có database chạy trên host system. Chúng ta sẽ cần publish database port của web app để chúng ta có thể truy cập vào đó.
- Nếu bạn muốn chạy web app trên nhiều port thì việc sử dụng container sẽ làm điều đó dễ dàng hơn nhưng bạn sẽ phải làm thêm nhiều công đoạn để cấp quyền truy cập web app cho database app.
- Để cụ thể hoá bài viết, chúng ta sẽ chạy CouchDB trong Docker Container
    * Web app thường lưu data trong database app như là PostgresSQL hoặc CouchDB . Chạy database app trong Docker container sẽ giúp bạn tránh những rắc tối hoặc việc phải test nhiều version cuả app.
    * Trong terminal, cùng gõ lệnh:

 `docker run --name couchdb -p 5984:5984 -d couchdb `

-  CouchDB image luôn được gán trên port 5984. Chúng ta sẽ publish port này tới địa chỉ của local host port để web server app có thể truy cập nó.
- **CHÚ Ý**: Để sử dụng user và password khi chạy CouchDB trong container chúng ta cần thêm:

`docker run -e COUCHDB_USER=admin -e COUCHDB_PASSWORD=password --name couchdb -p 5984:5984 -d couchdb` 
  
- Cùng mở một cửa sổ terminal nữa, chúng ta sẽ chạy lệnh cho **EmojiJournalServer** directory. Trong **Finder** , nơi chứa **EmojiJournalServer** folder và gõ dòng command sau:

`cd <drag the EmojiJournalServer folder from Finder to the terminal window> `

` swift build `

`.build/debug/EmojiJournalServer`

-  Đầu tiên, chúng ta đã truy cập đến **EmojiJournalServer** directory, nơi chứa Package.swift file. Command thứ 2 chúng ta đã build web server app và command thứ 3 chúng ta chạy server app , output trên terminal sẽ trông như sau:
![](https://images.viblo.asia/f1c5c776-7e52-419d-85f4-ebda4f2b8c0c.png)

- Dòng cuối cùng của output là "listening on port 8080", do đó cùng mở localhost:8080 trong browser để thấy Kiture welcome page.
![](https://images.viblo.asia/52561e6a-6295-45e9-b920-b9ab23720b7c.png)
 - Journal entry route là client, do đó chúng ta hãy add /client tới location URL để thấy Emoji Journal app:
![](https://images.viblo.asia/efadd935-0218-4b9e-90c5-683f9aab3a9e.png)
- Ấn vào biểu tượng mặt cười để mở emoji menu. Chọn emoji sau đó ấn vào dấu + to đùng bạn sẽ add thêm một emoji vào journal:
![](https://images.viblo.asia/961fcc77-b1eb-4f2c-8efd-42e43fd6d529.png)
- Web app này chạy trên host system cá nhân của chúng tata, không phải trong Docker container. Để chạy lại server lại, chúng ta phải edit và rebuild Xcode project để chạy trên port khác - hoặc chạy trong Docker container. 
- Ấn Ctrl+ C để stop tiến trình server đang chạy lại. Chúng ta sẽ thực hiện chạy server trong Docker container ở chương sau
## **2. Khởi chạy CouchDB và Server trong Docker container.**
- Trong EmojiJournalServer folder có **Dockerfile**, **Dockerfile-tools**. Chúng ta sẽ chạy runDocker.sh ở đây:
`cat Dockerfile`
`cat runDocker.sh `

- Chúng ta đã kiểm tra các file trên đảm bảo có trong folder project, tiếp đó chúng ta sẽ chạy runDocker.sh. Đảm bảo rằng bạn đã đổi #!bin/bash trong file runDocker.sh thành #!/usr/bin/env bash.
`./runDocker.sh`
![](https://images.viblo.asia/6817c82f-d7ce-4583-bcb5-8caa890f8ac9.png)
- Output sẽ cho ta giống với `.build/debug/EmojiJournalServer`  command nhưng ta thấy dòng thông báo sau "Database does not exist". > Chúng ta đã publish port từ 8080 sang 8090-> Ở câu lệnh cuối `runDocker.sh`, các containers đang chạy trên bridge mặc định. Để tra thông tin chúng ta gõ command sau:
`docker network inspect bridge`
- Chúng ta tra được thông tin về emojijournal và couchdb containers:
![](https://images.viblo.asia/2069b2c9-f083-43ed-bb8e-86bf0ce87a55.png)
- Ta thấy IP address của couchdb là 172.17.0.2/16. Đây là out put của máy cá nhân tôi, địa chỉ sẽ khác tuỳ vào máy tính của người sử dụng. Nếu bạn muốn web app tự động cập nhật địa chỉ CouchDB IP address thì bạn nên sử dụng cách tạo định danh cho bridge network, sau đó kết nối tất cả conatiners với network này.
- Mở một terminal window nữa để sử dụng các câu lệnh clean up, gõ lệnh sau:
`docker rm $(docker stop $(docker ps -q))`
- Trở lại EmojiJournalServer terminal window, chạy lệnh sau:
`docker network create emoji-net`
- Chúng ta vừa tọ ra Docker network tên emoji-net.
`docker run --network emoji-net -d --name couchdb couchdb
- Chúng ta vừa khởi chạy CouchDB container trong container này. Bạn không cần publish local port cho CouchDB- web app sẽ chạy cùng một network, do đó sẽ tiện dụng cho việc theo dõi port CouchDB show ra:
`docker run --network emoji-net --name emojijournal -it -p 8090:8080 -v $PWD:/root/project -w /root/project emojijournal-run sh -c .build-ubuntu/release/EmojiJournalServer`

- Đây là điều chúng ta vừa thực hiện:
    - `--name emojijournal`  - tên container
    - `-it ... sh -c .build-ubuntu/release/EmojiJournalServer` tạo một terminal command tương tác và thực thi shell command để chạy EmojiJournalServer.
    - `-p 8090:8080` publish container từ port 8080 -> 8090/
    - `-v $PWD:/root/project` khởi chạy directory trong containers như `/root/project` - nó kết nối directory đến `/root/project`.
    - `-w /root/project` gán container directory cho `/root/project`. `-w` viết tắt cho `--workdir`.
    - Bây giờ là lúc chúng ta kiểm tra thành quả:
    `docker network inspect emoji-net`
    ![](https://images.viblo.asia/c680a863-b131-4277-8efb-ca990db6a8c3.png)
    - Trong browsẻ, hãy load lại và mở `localhost:8090/client` và thêm một emoji. Sau đó chúng ta sẽ đánh dấu emojijournal2 và publish nó lên port 8070 -> Kiểm tra trên port 8090 chúng ta cũng sẽ thu được kết quả tương tự. 
    - Chúng ta vừa thực hiện kết nối database trên port 8090 và 8070 do đó chỉ cần thay đổi 1 bên thì bên kia sẽ nhận được kết quả tượng tự ở lần reload sau.
    - Ở chương sau chúng ta sẽ cùng kết nối các Volumes và share host cũng như containers file.