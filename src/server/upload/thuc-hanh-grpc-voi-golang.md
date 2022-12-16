### gRPC
Chúng ta có thể tìm hiểu về gRPC và Golang ở những topic trước của mình hoặc bàng các từ khóa trên mạng(gRPC thì nên search trên mạng để có góc nhìn sâu hơn nhe, mình ko chuyên gRPC cho lắm).
![image.png](https://images.viblo.asia/03bc8d75-87ef-4787-87fe-aca5bead1100.png)
Hôm nay chúng ta sẽ cùng thực hành gRPC với Golang nhé. Bài viết được dựa theo khóa học của anh [FunzyDev](https://www.youtube.com/watch?v=x8dybRs5q_g&list=PLC4c48H3oDRzLAn-YsHzY306qhuEvjhmh&index=1) các bạn có thể tham khảo chi tiết hơn ở đấy nhé, còn mình chỉ thực hành đơn giản với client server và 4 api của gRPC thôi.
**Cài đặt**
Tất nhiên là phải chuẩn bị cài đặt những công cụ cần thiết trước đã :D. Nếu các bạn sử dụng windows có cài đặt Protocol Buffers qua link này nhé: https://www.geeksforgeeks.org/how-to-install-protocol-buffers-on-windows/

Tiếp theo là các package của Go dành cho grpc và protocol.
```
go get -u github.com/golang/protobuf/protoc-gen-go
go get -u google.golang.org/grpc
```
Được rồi giờ vào setup code nào. Ở đây mình sẽ setup 1 chương trình chạy các tính toán đơn giản nhé:

Các bạn tạo cho mình file .proto với đường dẫn như sau
```
calculator/calculatorpb/calculator.proto
```
Sau đó trong file .proto ta có:
![image.png](https://images.viblo.asia/944f01ad-8771-4f03-a61e-8520c62f1716.png)
Ở đây mình có define sẵn một service Calculator. Sau đó chúng ta sẽ generate code với 2 dòng terminal như sau:
```
protoc calculator/calculatorpb/calculator.proto --go-grpc_out=.
protoc calculator/calculatorpb/calculator.proto --go_out=.
```
Sau đó ta sẽ thấy một thư mục mới với 2 file là calculator_grpc.pb.go và calculator.pb.go
![image.png](https://images.viblo.asia/f96c516f-f482-4453-9c43-ee9551e38d62.png)
Tiếp đó ta sẽ tạo Server và Client nhé. Đầu tiên là Server với đường dẫn server/server.go:
![image.png](https://images.viblo.asia/a12c5ee8-b6a9-4fdf-9a69-9c1ffc589f48.png)

Và Client với đường dẫn là client/client.go:
![image.png](https://images.viblo.asia/4203388d-1cae-4e0d-8cb3-21a4c4b72b94.png)
Sau khi setup xong hết cả Server và Client ta sẽ đi vào triển khai cả 4 API nhé:
**Unary API**
Mình sẽ setup một API SUM nhé: đầu tiên là khai báo API SUM trong service và tạo ra 2 message để có thể request và response nhé.
![image.png](https://images.viblo.asia/3f4a4be6-7072-4b79-9739-180b4ffa5a41.png)
Sau đó ta sẽ chạy lại 2 dòng protoc trên( ở đây mình có sử dụng makefile để làm ngắn câu lệnh hơn các bạn có thể tham khảo)
![image.png](https://images.viblo.asia/f1af26c2-808a-4469-8c11-dada5dd4368f.png)
Tiếp đến là Server và Client:
![image.png](https://images.viblo.asia/37d5f464-2130-499f-94db-3010a679b9af.png)
server.go
![image.png](https://images.viblo.asia/1521d974-9870-4d68-bbb1-eb8100f46b6f.png)
client.go
Sau đó ta callSum(client) ở hàm main file client.go rồi run cả Server và Client để thấy kết quả nhé
![image.png](https://images.viblo.asia/ea32ea7c-4a42-4ff7-8a19-e5958003a3c7.png)

![image.png](https://images.viblo.asia/440d83a4-5fac-4200-815a-cf3e704bdf9b.png)
**Server Streaming API**
Chúng ta sẽ lặp lại các bước trên nhưng sẽ có thay đổi một chút ở phần cài đặt protoc để generate code nhé. Ở đây mình sẽ tiếp tục với API phân tích thừa số nguyên tố:
![image.png](https://images.viblo.asia/fb87f676-cd6e-4a3f-8214-87f2924af772.png)
Và make gen-cal thôi hehe. Tiếp đến là Server và Client như cũ nhé:
![image.png](https://images.viblo.asia/579edd60-f890-4ae9-95ad-5d636b34fdac.png)
server.go
![image.png](https://images.viblo.asia/7e6a90f3-0bf9-441d-8237-1c17e53b7007.png)
client.go
Các kết quả mà ta nhận được ở cả Server và Client:
![image.png](https://images.viblo.asia/cddcfda5-d9d3-4d85-a6a4-3f89139bf0ef.png)
![image.png](https://images.viblo.asia/17ed9ea7-9ae1-40e8-99ad-c80a21f04366.png)
**Client Streaming API**
Cố lên nào gần xong rồi, sự khác biệt giữa 4 API là không quá lơn nhưng tác dụng thì lại rất nhiều để các bạn có thể sử dụng vào nhiều solution khác nhau.
![image.png](https://images.viblo.asia/bd3bc2f1-ca0a-42ab-b9ce-e3286f6452d5.png)
calculator.proto
![image.png](https://images.viblo.asia/8cb120bd-fb72-4988-aba7-d4b938e7d512.png)
server.go
![image.png](https://images.viblo.asia/56a9a84d-2774-4614-bbab-10961d6519d3.png)
client.go
Ta có kết quả:
![image.png](https://images.viblo.asia/64c6f665-44dd-45d4-b2d5-3799c85e8874.png)
![image.png](https://images.viblo.asia/a143fb74-d02a-41ca-9401-48d4f55fd4ff.png)
**Bi-Directional Streaming API**
Phương thức cuối cùng rồi, ở đây mình sẽ làm một API tìm max nhé:
![image.png](https://images.viblo.asia/8124ac32-04ca-4e39-bd4c-5379efc9b838.png)
calculator.proto
![image.png](https://images.viblo.asia/5db71abb-ce1d-48be-a80e-8dfd68cc8606.png)
server.go
Ở file client.go function khá dài nên mình sẽ để ở đây luôn nhá:
```
func callMax(c calculatorpb.CalculatorServiceClient) {
	log.Println("callMax is running")
	stream, err := c.Max(context.Background())
	if err != nil {
		log.Fatalf("call max err %v", err)
	}
	waitc := make(chan struct{})

	go func() {
		////send requests
		listReq := []calculatorpb.MaxRequest{
			{
				Num: 5,
			},
			{
				Num: 10,
			},
			{
				Num: 15,
			},
			{
				Num: 20,
			},
			{
				Num: 50,
			},
		}
		for _, req := range listReq {
			err := stream.Send(&req)
			if err != nil {
				log.Fatalf("sned find max request err %v", err)
			}
			time.Sleep(1000 * time.Millisecond)
		}
		stream.CloseSend()
	}()

	go func() {
		for {
			resp, err := stream.Recv()
			if err == io.EOF {
				log.Println("ending find max api...")
				break
			}
			if err != nil {
				log.Fatalf("recv find max err %v", err)
				break
			}

			log.Printf("max: %v\n", resp.GetMax())
		}
		close(waitc)
	}()

	<-waitc
}

```
Kết quả đây nè:
![image.png](https://images.viblo.asia/9a09809e-bcf7-4dfa-ae9f-9a5a7f0eb84b.png)
![image.png](https://images.viblo.asia/4fcabe2d-465b-4be2-b8e0-dc5367f87591.png)
### Kết
Vậy là mình đã giới thiệu được 4 API của gRPC tuy nhiên phần giải thích khá ít, các bạn có thể tham khảo chi tiết hơn ở youtube của anh FunzyDev nhé [FunzyDev](https://www.youtube.com/watch?v=x8dybRs5q_g&list=PLC4c48H3oDRzLAn-YsHzY306qhuEvjhmh&index=1). Sau khi tiếp xúc với gRPC thì cá nhân mình thấy gRPC thật sự tuyệt vời và giúp chúng ta rút gọn thời gian cho những function phải implement, mình hy vọng bài viết sẽ có ích cho các bạn trong viết tiếp cận với golang cũng như gRPC. Đây chỉ là chia sẻ kiến thức cá nhân cũng như là topic để mình tự củng cố kiến thức lại nên nếu các bạn có góp ý cũng như chỉ dẫn hãy góp ý cho mình biết nhé. Cảm ơn các bạn đã đọc bài viết này, have a nice day <3.

Bài viết đã tham khảo
* Tổng quan về gRPC: https://medium.com/@duynam_63755/t%E1%BB%95ng-quan-v%E1%BB%81-grpc-8b342dc9add7
* gRPC Golang của The Funzy Dev: https://www.youtube.com/watch?v=x8dybRs5q_g&list=PLC4c48H3oDRzLAn-YsHzY306qhuEvjhmh&index=1