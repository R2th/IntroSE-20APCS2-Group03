Trước khi vào bài, tớ xin giới thiệu nhân vật chị Hìn béo – QA của một công ty công nghệ A (sau này gọi là Hìn cho ngắn).
Nếu không bị inbox dọa dẫm thì chị Hìn sẽ cùng chúng ta đi hết 4 part về concurrency.

Bài viết gồm 2 phần:

* **TL; DR**: phần tóm tắt các kiến thức trong bài. Dành cho các anh em thích tàu nhanh, không thích nghe Phong xàm 
* **Chém**: phần này chúng ta cùng chị Hìn béo học các kiến thức trong bài thông qua các ví dụ thực tế, giúp anh em dễ đọc, đỡ khô khan hơn.

## TL; DR
* Concurrency là đồng thời có nhiều công việc cần xử lý. Chỉ xử lý được 1 việc duy nhất 1 thời điểm, switch giữa các việc sao cho hạn chế có thời gian ngồi chơi nhất.
* Parallel là xử lý song song các công việc. Có thể xử lý được nhiều việc cùng 1 lúc.
* Parallel chưa chắc đã nhanh hơn concurrency, do sau khi xử lý xong, cần communicate với luồng chính. Thao tác communicate này có thể tốn nhiều thời gian
* Golang là ngôn ngữ concurrency, hỗ trợ thông qua Goroutines (có thể đọc là “Gâu rao tin”)

## Chém gió về concurrency
Cùng chị Hìn béo tìm hiểu về concurrency và paraellism. Các ví dụ được hư cấu dựa trên một nhân vật có thật =))

### Concurrency
Thứ 2 hàng tuần, Hìn thường có task test môi trường staging để chuẩn bị cho ngày thứ 3 build production. Đang test ngon thì Hìn gặp lỗi hệ thống, không call được API:
* Phonggg!!! mày check cho chị cái API get review sao nó 500 thế nàyyy! 

Do môi trường staging thường không được stable lắm (merge, chạy query vô tội vạ; resource hạn chế), Hìn thường phải chờ dev check trước rồi mới test tiếp được. Trong lúc chờ, Hìn chuyển qua 1 số task bug khác để test trước.


![image.png](https://images.viblo.asia/0e9ef1ba-6aef-4753-b8a6-da1fbfde16cc.png)
Trong ví dụ trên, Hìn đang thực hiện theo mô hình concurrency. Hìn có nhiều task phải hoàn thành. Nếu 1 task đang làm bị pending, cần chờ mới xử lý tiếp được, Hìn sẽ chuyển qua làm task khác trước.

### Parallel
Việc xử lý task theo mô hình concurrency giúp Hìn xử lý được task một cách nhịp nhàng, đúng tiến độ. Tuy nhiên, do phải làm việc liên tục nên Hìn bị hao hụt năng lượng nhanh chóng. Hai cái bánh mì size XXL Hìn ăn lúc sáng đã không cánh mà bay. Hìn ra pantry lấy mấy cái bánh và ít hoa quả về, vừa ăn vừa test 


![image.png](https://images.viblo.asia/9282ddda-a5c5-47d1-8eab-43674b65ce1a.png)
Ở ví dụ này, Hìn có nhiều công việc: test task, ăn vặt, nghe nhạc… Các công việc được thực hiện một cách đồng thời.

## Concurrency hay parallelism nhanh hơn?
Nhìn sơ qua thì tưởng như parallelism sẽ luôn nhanh hơn concurrency (do xử lý đồng thời được nhiều việc). Tuy nhiên sự thực không phải thế.


![image.png](https://images.viblo.asia/94823ca3-5401-4491-80e2-bbc272ef2ece.png)
Parallelism thường được thực hiện trên nhiều core của CPU. Sau khi thực hiện xong các task, kết quả sẽ được đẩy về core đang xử lý chương trình chính.
Việc truyền dữ liệu giữa các core này khá tốn kém resource, thậm chí có thể tốn hơn cả thời gian làm trên 1 core.

Chính vì thế mà không phải lúc nào parallelism cũng chiến thắng về mặt thời gian.

## Go là ngôn ngữ concurrency
Golang là ngôn ngữ hỗ trợ concurrency thông qua Goroutines. Chúng ta sẽ cùng Hìn béo tìm hiểu về goroutine trong bài tới 

Cảm ơn bạn đã bỏ thời gian để đọc bài viết của tớ. Nếu trong bài có gì sai sót, hãy comment cho tớ biết nhé ^^

Bài viết được trích từ blog của mình: [Link](https://minhphong306.wordpress.com/2020/03/28/tim-hieu-ve-concurrency-cung-chi-hin-beo/)