[Link phần 1](https://viblo.asia/p/demo-su-dung-cac-elements-cua-jmeter-de-send-unipos-cho-nhieu-nguoi-cung-1-luc-p1-yMnKMJmaZ7P)

Nhắc lại các step mà ta đã làm được ở P1 một chút:

+ Khai báo các configs cần thiết
+ Tạo danh sách các members muốn tặng unipos
+ Tạo danh sách các lời chúc ngẫu nhiên muốn gởi
+ Tạo danh sách các tags 7 core value
+ Xử lý số lần lặp của request dựa vào số lượng members cần tặng điểm
+ Login account unipos

Chúng ta sẽ sang các bước tiếp theo để hoàn thiện scenario.

## 4. Lấy thông tin profile của account login : 

Sau khi login thành công thì ta cần lấy thông tin của account đang login và thông tin quan trọng nhất chính là trích xuất được số point hiện có của account.

Tạo 1 HTTP request như bên dưới :

```
# JMeter generated Header file
accept	*/*
accept-encoding	gzip, deflate, br
accept-language	en-US,en;q=0.9,ja;q=0.8
cache-control	no-cache
content-length	83
content-type	application/json
originhttps	//unipos.me
pragma	no-cache
refererhttps	//unipos.me/all
user-agent	Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36
x-unipos-token	${TOKEN} 

POST https://unipos.me/a/jsonrpc

POST data:
{"jsonrpc":"2.0","method":"Unipos.GetProfile","params":[],"id":"Unipos.GetProfile"}
```
Có một lưu ý ở đây là request này có khai báo HTTP Header riêng, trong đó sử dụng x-unipos-token ta trích xuất được sau khi login ở step 3 và lưu vào biến `${TOKEN}` . Các bạn khai báo header như sau

![](https://images.viblo.asia/468e4880-4be9-4652-8102-5c15dfffa8c5.png)

Response trả về sẽ có nội dung như bên dưới:

```
{"jsonrpc":"2.0","result":{"team":{"id":"framgia","name":"Framgia","full_name":"株式会社フランジア・ジャパン","picture_url":"https://unipos.me/q/image/logo","plan":3,"use_unipos_letter":false,"use_prologue":true,"use_unipos_best_practices":true,"use_personal_interview":true,"created_at":1513738704627,"integrated_external_service_ids":[]},"member":{"id":"804bd67b-2bc6-4c3b-8090-ba990e24f5da","display_name":"Dinh Ba Tung","uname":"dinh.ba.tung","email_address":"dinh.ba.tung@framgia.com","lang":"en","employee_code":"","employment_type":0,"picture_url":"https://unipos.me/q/image/a5067e9a-4dd3-4ea3-9b78-1e768b335bf9","pocket":{"available_point":400,"received_point_of_this_month":569,"received_point":6048},"role":2,"status":2,"created_at":1519184745120,"personal_interview":[],"involving":[{"id":"2dc992b6-6a13-4df8-8bac-d9291064bbfe","uname":"luu.thi.hoai.thuong","display_name":"Luu Thi Hoai Thuong","picture_url":"https://unipos.me/q/image/9f14a5b8-7045-4cff-8370-2fa78735b088"},{"id":"ba442566-5033-4fcc-9c30-2c2330b4e5c7","uname":"nguyen.thi.tuyet.oanh","display_name":"Nguyen Thi Tuyet Oanh","picture_url":"https://unipos.me/q/image/36148c7d-cf82-40cb-81e3-02ca5849b0a9"},{"id":"b5f5e42f-68cb-4c5c-9072-1419b7e3c9a9","uname":"nguyen.ngoc.trung","display_name":"Nguyen Ngoc Trung","picture_url":"https://unipos.me/q/image/219f6d84-227e-47e5-96b6-9247c2d3aaed"},{"id":"4c3a8783-c75a-4ebe-a281-89fd60c605b0","uname":"nguyen.thi.thuy.duongb","display_name":"Nguyen Thi Thuy Duong B","picture_url":"https://unipos.me/q/image/3cbe8a58-278f-4210-a1c4-c9b61fb7e48d"},{"id":"a00456ec-4d16-49b9-97de-759a03cc4415","uname":"do.thi.minh.hoa","display_name":"Do Thi Minh Hoa","picture_url":"https://unipos.me/q/image/baa3c601-46a0-4336-a33f-b2ede7036c14"},{"id":"9f2126f8-54bf-45d6-85f8-f43780121fcc","uname":"nguyen.duc.truong.an","display_name":"Nguyen Duc Truong An","picture_url":"https://unipos.me/q/image/default"}],"notificationSetting":{"browser_notification":false,"mail_notification":true,"external_service_notifications":[]}},"groups":[{"id":"0c521582-168b-44b3-8b8b-3567fdd5768f","name":"Software Development 2","created_at":1516260189615}]},"id":"Unipos.GetProfile"}
```

Response này là toàn bộ thông tin của account đang login, trong đó bạn chú ý đến đoạn này : "available_point":400  <<< đây chính là số point của account . Muốn trích xuất số point này thì ta làm tương tự như trích xuất token khi login bằng Regular Expression Extractor như bên dưới:

![](https://images.viblo.asia/e570e402-d1dd-4c97-9b8d-92947273f426.png)
Lưu ý, số point trích xuất được đưa vào biến `${POINT`

### 5. Lấy danh sách members muốn tặng Unipos

Để thực hiện phần này, chúng ta cần 1 biến đã khởi tạo trong step 1. Khai báo các configs cần thiết . Đó chính là `${memberID2}` 

```
# JMeter generated Header file
accept	*/*
accept-encoding	gzip, deflate, br
accept-language	en-US,en;q=0.9,ja;q=0.8
cache-control	no-cache
content-length	83
content-type	application/json
originhttps	//unipos.me
pragma	no-cache
refererhttps	//unipos.me/all
user-agent	Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36
x-unipos-token	${TOKEN} 

POST https://unipos.me/a/jsonrpc

POST data:
{"jsonrpc":"2.0","method":"Unipos.FindSuggestMembers","params":{"term":"${memberID2}","limit":100},"id":"Unipos.FindSuggestMembers"}
```
![](https://images.viblo.asia/958c9d33-f98c-4ac6-bb93-e20e54bb3296.png)

Request trên chính là action tìm kiếm member muốn tặng điểm , sau khi tìm kiếm thành công sẽ trả về thông tin member tìm thấy được như bên dưới:

```
{"jsonrpc":"2.0","result":[{"id":"2dc992b6-6a13-4df8-8bac-d9291064bbfe","display_name":"[namexxx]","uname":"[username]","picture_url":"https://unipos.me/q/image/9f14a5b8-7045-4cff-8370-2fa78735b088","group_ids":["0c521582-168b-44b3-8b8b-3567fdd5768f"]}],"id":"Unipos.FindSuggestMembers"}

```

Cái ta cần tiếp theo chính là ID của member tìm được : "id":"2dc992b6-6a13-4df8-8bac-d9291064bbfe" . Chúc ta tiếp tục sử dụng Regular Expression Extractor để trích xuất ID như bên dưới

![](https://images.viblo.asia/c996e3b2-4f1b-4305-a2af-9fe56622ce5a.png)
Lưu ý ID của member được lưu trữ vào biến `${MemberIDname}`

### 6. Gởi điểm đến các members

Chúc mừng các bạn đã đến bước cuối cùng, một lần nữa mình nhắc lại các steps mình đã làm đến tới được đây, thêm phần các kết quả cần lấy ở mỗi step

+ Khai báo các configs cần thiết
+ Tạo danh sách các members muốn tặng unipos => khai báo biến `${memberID2}`
+ Tạo danh sách các lời chúc ngẫu nhiên muốn gởi => khai báo biến `${messages}`
+ Tạo danh sách các tags 7 core value => khai báo biến `${tags}`
+ Xử lý số lần lặp của request dựa vào số lượng members cần tặng điểm
+ Login account unipos => trích xuất giá trị token và khai báo biến `${TOKEN}`
+ Lấy thông tin profile => trích xuất giá trị point hiện có và khai báo biến `${POINT}`
+ Tìm kiếm thông tin các members cần gởi point => trích xuất được ID và khai báo biến `${MemberIDname}`

```
# JMeter generated Header file
accept	*/*
accept-encoding	gzip, deflate, br
accept-language	en-US,en;q=0.9,ja;q=0.8
cache-control	no-cache
content-length	83
content-type	application/json
originhttps	//unipos.me
pragma	no-cache
refererhttps	//unipos.me/all
user-agent	Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36
x-unipos-token	${TOKEN} 

POST https://unipos.me/a/jsonrpc

POST data:
{"jsonrpc":"2.0","method":"Unipos.SendCard","params":{"from_member_id":"804bd67b-2bc6-4c3b-8090-ba990e24f5da","to_member_id":"${MemberIDname}","point":${__groovy((${POINT})/8)},"message":"${tags} ${messages}"},"id":"Unipos.SendCard"}
```

![](https://images.viblo.asia/61c0f79d-b802-4082-852a-aad30a93eb9b.png)

Đây là một request bình thường , sử dụng các parameters mà ta lấy được và đưa vào các biến ở các steps trước.

Bonus: Tạo file bat tự động thực thi command gởi unipos chỉ với 1 click chuột:

Bạn cần tạo file bat bằng notepad với nội dung như bên dưới:

```
@echo off
D:
cd D:\ToolsQA\apache-jmeter-5.0\bin
jmeter -n -t D:\ToolsQA\apache-jmeter-5.0\bin\checkUnipos.jmx
```

Trong đó:
+ Các bạn chỉ cần thay `D:\ToolsQA\apache-jmeter-5.0\bin` thành đường dẫn cài đặt Jmeter trên máy mình
+ `D:\ToolsQA\apache-jmeter-5.0\bin\checkUnipos.jmx` là đường dẫn file Jmeter trên máy bạn

OK, hưởng thành quả thôi ^^

Các bạn có thể down source code [ở đây](https://drive.google.com/file/d/18zE2Cgv1POuBzT2_c87ymhbqkQRLbkeK/view?usp=sharing)  để tiện nghiên cứu. Chỉ cần thay email/pass account của bạn ở request Login là chạy được rồi.