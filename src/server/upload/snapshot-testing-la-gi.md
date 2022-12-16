![](https://cdn-images-1.medium.com/max/1600/1*NPaHZ_UXbZ9-weU64onqBw.jpeg)
### Why test the UI?
Đơn giản thì bạn muốn giao diện ứng dụng của bạn không bị thay đổi ngoài ý muốn, chúng ta vào từng màng hình để kiểm tra thử bug UI nào xuất hiện không? Và hàng ngày, sau mỗi đoạn commit, chúng ta lại chạy 1 vòng kiểm tra xem có bug giao diện nào xuất hiện không, quả thật, làm một lần thì còn thú vị chứ làm lần 2 thì chẳng có gì vui nửa rồi.
Vậy **Snapshot Testing** sẽ hỗ trợ tester không cần phải thực hiện đi thực hiện lại công việc này nửa, nó còn kiểm tra giúp chúng ta tới từng pixel xem có lệch pixel nào không.
### How
Facebook đã hỗ trợ chúng ta một bộ thư viện là **[FBSnapshotTestCase](https://github.com/facebookarchive/ios-snapshot-test-case)**
> Thư viện này có nhiệm vụ chụp lại hình ảnh screen lúc hoàn hảo nhất (case đúng) để dành và sau đó, các lần kiểm tra khác nó lại chụp lại và kiểm tra xem thử 2 hình ảnh có giống nhau không, nếu sai thì sẽ lưu hình sai lại cho chúng ta xem về sau.
> 
Ở đây chúng ta sử dụng Cocoapod để get thư viện này về sử dụng:

![](https://cdn-images-1.medium.com/max/1600/1*BKH0iJgStIeAT7muOVzIkA.png)
Sau khi chúng ta **Pod Install**  thì cần set up môi trường trước khi chạy Test.

![](https://cdn-images-1.medium.com/max/1600/1*Z68KQjSRUaYFkOWlvr0pag.png)
Chúng ta vào Edit Scheme và thêm các **environment variables** (Biến môi trường) vào Scheme
```
 FB_REFERENCE_IMAGE_DIR = $(SOURCE_ROOT)/$(PROJECT_NAME)Tests/ReferenceImages
 IMAGE_DIFF_DIR = $(SOURCE_ROOT)/$(PROJECT_NAME)Tests/FailureDiffs
```
Nhìn sẽ như thế này:
![](https://cdn-images-1.medium.com/max/1600/1*6D5u3_0qgOw4XyOMhLUxGw.png)

Việc cài đặt đã xong, bây giờ chúng ta chỉ cần chỉ dẫn xem chúng ta cần test **View**, **Controller** nào nửa thôi.

### What to test?
Bây giờ chúng ta sẽ test với **GenericButton**:
![](https://cdn-images-1.medium.com/max/1600/1*Dm7qCx4LqsKr-NPgc4ZoWQ.png)
Trong trường hợp này, chúng ta sẽ test với các trạng thái của button xem thử hiển thị có đúng không.

Việc đầu tiên chúng ta cần thêm **unit test case** file:
![](https://cdn-images-1.medium.com/max/1600/1*h4R1IXLJtNuVg-DrvRNZkA.png)
Sau đó chúng ta cần thay đổi **XCTestCase** sang **FBSnapshotTestCase** như sau:
![](https://cdn-images-1.medium.com/max/1600/1*1q9fZddVwrIXsFhOxJ2rag.png)
Bây giờ chúng ta thay đổi hàm setUp một chút để thực hiện việc chụp lại hình ảnh button theo từng trạng thái.
```
override func setUp() {
    super.setUp()
    recordMode = true
}
```
![](https://cdn-images-1.medium.com/max/1600/1*ThUzPar5Hd4Xv1ZtUMMzWg.png)
Sau khi bạn chạy Test thì hầu hết các case đều Fail, đừng lo nó cũng chỉ là một bước trong việc thực hiện test thôi.
Nếu bạn cần kiểm tra các hình ảnh mà test case đã test thì bạn trỏ tới thư mục đã set up trong scheme như ở trên.
![](https://cdn-images-1.medium.com/max/1600/1*3ql3Y0c8U8daOzpbGMeVKA.png)
Sau khi kiểm tra thấy hình ảnh được chụp đúng với mong muốn của mình.
Chúng ta set lại **recordMode = fasle.**
Và chạy lại TestCase thêm một lần nửa. Và lần này chúng ta sẽ thấy các case đã được pass. Vậy nó làm, gì, đơn giản là nó render sẽ button mới sau đó capture hình ảnh lại, so sánh với hình ảnh đã được lưu trước đó.
Nếu đúng tới từng pixel, nó sẽ pass.
![](https://cdn-images-1.medium.com/max/1600/1*f932h1hl3LSPHtkdHumIUw.png)

### Ending notes
Ngoài ra chúng ta còn có các bộ thư viện Test UI khác như [KIF](https://github.com/kif-framework/KIF) và [EarlGrey](https://github.com/google/EarlGrey)  của Google. Nhưng nhìn vào FBSnapshotTestCase thì mình thấy khá là dễ maintain về sau hơn.