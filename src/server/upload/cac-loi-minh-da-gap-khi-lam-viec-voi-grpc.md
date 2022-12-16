## Chủ đề: Các lỗi mình đã gặp khi làm việc với gRPC ( Part 1 )
### Giới Thiệu
 Mình là một newbie làm việc với gRPC. Các kinh nghiệm hầu như là con số 0. Đây là chuỗi bài viết mình sẽ viết về các lỗi mình gặp phải khi bắt đầu tìm hiểu về gRPC. Hi vọng các bạn khác mới như mình nếu có gặp lỗi tương tự có thể đỡ tốn thời gian hơn.
### Nội Dung 
**1. Lỗi ghi generate code từ file .proto**<br>
   Khi mình sinh file client/server stubs sử dụng lệnh protoc như sau :
```
   protoc --go_out=. --go_opt=paths=source_relative \
        --go-grpc_out=. --go-grpc_opt=paths=source_relative \
        ecommerce/product_info.proto 
```
Dòng cuối cùng chính là path của file proto ta muốn generate code từ nó. Flag "go_out" mình để là "." mục đích để cho code sinh ra nằm trong thư mục với file proto luôn. Ngoài ra ta có thể đặt là  `:name_directory` nhằm mục đích đưa code tạo ra vào đúng thư mục có tên đã đặt, lúc này chú ý ở option trong proto file cần đặt đường dẫn go package có đuôi là `./;name_directory`<br> 
Ở  trên mình dùng thêm flag **--go_opt=paths=source_relative** tức là khi code sinh ra ta có thể import package của code này ở trong file main.go theo path đã khai báo ở trên. Ở đây mình dùng source_relative thì nó sẽ ngầm hiểu là đường dẫn của file .proto luôn. Kết quả sau khi chạy lệnh trên thì mình gặp lỗi sau: <br>
`protoc-gen-go: unable to determine Go import path for "ecommerce/product_info.proto"`
  **Nguyên nhân** là do đâu? <br>
  Như ta đã làm việc với golang thì Gopath cực kì quan trọng để xác định path của các package. Ở đây ta có thể dùng **go.mod** để có thể làm việc ở bất cứ thư mục nào nằm ngoài Gopath. Lỗi trên nghĩa là khi ta sinh code từ file product_info.proto thì ta cần import thêm một số package hay là dependency của file cần import vào để sinh ra file. Vậy nó cần xác định Gopath của chúng ta trong máy local. <br>
  **Khắc phục** ta thêm đoạn <br>
      `option go_package = "Your Gopath";` <br>
     Vào file .proto là xong. <br>
Sau khi generate code thành công thì có thể gặp lỗi package could not import trong file .go vừa sinh ra thì các bạn sẽ fix bằng cách gọi "go get name_package" nhé.  

### Kết Luận 
Ok hôm nay xong một lỗi.
Đây là một lỗi rất cơ bản nhưng sẽ tốn rất nhiều thời gian nếu như đó là 1 con gà mờ golang và gRPC như mình. Chúc các bạn học tốt :grinning::sweat_smile: