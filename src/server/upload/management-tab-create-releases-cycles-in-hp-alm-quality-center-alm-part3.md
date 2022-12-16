Ở các bài trước chúng ta đã biết về ALM giới thiệu và cách tạo domain, Project, user qua bài
https://viblo.asia/p/introduction-to-hp-almquality-center-Do754j10ZM6

Ở bài này chúng ta sẽ biết cách tạo và quản lý release, cycle trong ALM

Management Tab giúp người dùng sắp xếp và theo dõi quá trình release

Một lần release có xác định ngày bắt đầu và ngày kết thúc tương ứng với một nhóm các thay đổi sẽ được triển khai cho người dùng cuối trong khoảng thời gian đó

Một chu trình trong một lần release là phát triển và kiểm thử để đạt được mục tiêu chung

Người dùng ALM có thể theo dõi tiến độ của dự án trong thời gian thực bằng cách phân tích cây release để đảm bảo rằng nó phù hợp với mục tiêu release

Nó cho phép người dùng xem được nhanh chóng về chất lượng của mỗi lần release cùng với việc xem hiển thị defect và phần trăm defect đang mở
![](https://images.viblo.asia/64da09a9-da2d-462b-896c-a8895a6daeba.PNG)

## 1. Tại sao chúng ta cần quản lý release và chu trình trong ALM
Trong thực tế điều xảy ra khi phát triển một sản phẩm đó là có nhiều phiên bản realese cho một sản phẩm cụ thể

Mỗi một bản release được chia nhỏ thành một số chu trình. Giả sử chúng ta có 2 lần release với mỗi lần đều có 2 chu trình phát triển và kiểm thử cho một application

Mỗi một lần release đều có phạm vi và thước đo xác định trước khi liên kết với chính nó

Mỗi một chu trình có một số yêu cầu cụ thể

Mỗi một yêu cầu được xác định bằng một số các test case cụ thể

Khi thực hiện kiểm thử các defects được ghi lại và ánh xạ tới các trường hợp kiểm thử tương ứng sau đó chúng ta có thể theo dõi yêu cầu và các defects

![](https://images.viblo.asia/eb05921d-1393-49e4-8130-486362d46e7a.PNG)

## 2. Tab quản lý ##
Module này giúp chúng ta tạo và quản lý release là bước đầu tiên trước khi tiếp tục tạo bất kỳ mục công việc nào như yêu cầu / kiểm tra / lỗi.
Nó giúp chúng ta làm việc theo kế hoạch và theo dõi được dự án. theo dõi chức năng rất quan trọng trong tab này:
+ Tạo releases
+ Tạo Cycles
+ Tạo release scope
+ Tạo Milestone
## 3. làm thế nào để tạo 1 release ##
Tạo release là bước đầu tien trong ALM  và tất cả các mục công việc khác như requirements, test cases và defects được theo dõi dựa trên release/cycles.
![](https://images.viblo.asia/99c3d14d-a780-4a6a-942d-037e8b4dc161.PNG)

'Bước 1' Bước đầu tiên là di chuyển tới tab Management và click vào " Releases" Tab. Trang đích sẽ xuất hiện như dưới đây
![](https://images.viblo.asia/d673b182-779a-4aad-a245-0dd4d5ec704c.PNG)
' Bước 2' Trước khi tạo một release, chúng ta có thể tạo Containter/folder bằng cách click vào một icon " New folder' trong modules release được hiển thị như dưới
![](https://images.viblo.asia/7da83bf2-c5ee-4e10-be02-f26c3fa45991.PNG)

'Bước 3' Bước tiếp theo là tạo một releases mới. Để tạo một release mới ta thực hiện click vào " new release" button sau đó dialog new release được mở ta phải nhập các trường bắt buộc sau:
* Release Name
* Start Date of the Release
* End Date of the Release
* Description (Mô tả ngắn gọn về release)
![](https://images.viblo.asia/ca5e84bc-e623-4918-9763-4dc0d66a3e82.PNG)

'Bước 4' Sau khi nhập các thông tin chi tiết trên thì click vào "OK" Release mới sẽ được tạo như sau
![](https://images.viblo.asia/9e3a0072-d996-48c1-9f88-b4ac4770de2e.PNG)

Tương tự như vậy bạn có thể tạo một release R2 khác

'Bước 5' Khi chọn một bản release cụ thể, người dùng có thể thấy các tab có liên quan đến bản release này
![](https://images.viblo.asia/c03fb5c1-883b-41ac-bf9c-635e4ab4c5d0.PNG)

'Bước 6' Bây giờ chúng ta sẽ hiểu các tabs quan trọng dưới "Release" Module. Chọn tab Details để truy xuất thông tin chi tiết được cung cấp trong khi release được tạo
![](https://images.viblo.asia/ae60e3b5-b929-4a09-8d8d-d20a9da33679.PNG)

' Bước 7' Chọn Release scope tab, tab này cung cấp chi tiết về phạm vi của lần release. Như ảnh dưới đây là chưa tạo scope cho lần release này do đó phạm vi trong danh sách dưới đây bị trống. Việc tạo các cột mốc và phạm vi sẽ được  chi tiết trong một mô-đun riêng biệt.
![](https://images.viblo.asia/d1b77776-82bc-444d-97e1-241300fb5570.PNG)

' Bước 8' Dưới đây là chi tiết cho tab Master Plan. Nếu Cycles được tạo thì master plan sẽ bao gồm cycle timelines cho lần release đó
![](https://images.viblo.asia/41ae147f-9ba1-4e96-abd1-f2523c828955.PNG)

' Bước 9' Status tab hiển thị chi tiết liên quan đến tổng thể quá trình release. Khi bản phát hành được tạo ra mà không có bất kỳ mục công việc nào như requirements / Testing / Defect được thêm vào nó, trạng thái sẽ được hiển thị như hình dưới đây.
![](https://images.viblo.asia/217440b0-10ba-436f-8f50-0eea92f1c158.PNG)

Trạng thái sẽ hiển thị như dưới khi người dùng maps các mục công việc như requirements/tests/defects đối với release
![](https://images.viblo.asia/629aba12-cf00-4c04-b1d7-651e720f96fb.PNG)

## 4. Làm thế nào để tạo Cycle ##
Trong thực tế, mỗi một lần release được chia nhỏ trong các cycles để chúng ta hiểu hơn làm thế nào để tạo một cycles trong ALM thì trong trường hợp dưới đây có 2 cycles trong 1 lần release
![](https://images.viblo.asia/3f3edfb4-92bc-48b4-9315-b7941198335a.PNG)

' Bước 1' Chọn Release mà bạn muốn tạo và click vào "New Cycles" button sau đó New cycles dialogs sẽ mở ra khi thời hạn release được chuẩn bị sẵn vì chu kỳ này được tạo trong bản release đã chọn. Người dùng phải nhập các chi tiết bắt buộc sau trong cửa sổ 'New cycles':

* Name of the Cycle
* Start Date of the Cycle
* End Date of the Cycle
* Description (Optional)
![](https://images.viblo.asia/fcd82115-909a-4260-9a98-709d9588ca7f.PNG)

' Bước 2' Khi tất cả các cycle được tạo, user có thể truy cập giống như release được hiển thị dưới đây
![](https://images.viblo.asia/837072c2-614e-47ac-b370-6a2f1c1dc6a8.PNG)

' Bước 3' Chọn một cycle để truy cập vào detail
![](https://images.viblo.asia/94f6121c-2a34-403c-ab9b-fc667221e7de.PNG)

' Bước 4' Nào bây giờ chúng ta sẽ hiểu tầm quan trọng của tabs Cycles, người dùng có thể đính kèm bất kỳ file nào ở 'attachments' tab. Trong đó Progress tab cung cấp trạng thái cycle của lần release đang được chọn
Progress sẽ được hiển thị như dưới đây khi người dùng tạo cycle mà không có bất kỳ mục công việc nào (requirements/tests/defects) ánh xạ với nó
![](https://images.viblo.asia/9f324fe9-e0a2-4e21-9ecf-69ee66be97ca.PNG)

Progress sẽ được hiển thị như dưới đây khi user đã mapped đầu mục công việc (requirements/tests/defects) tới cycle

' Bước 5' Quality tab cung cấp thông tin như phần trăm Defect được mở và số lượng defects nổi bật đó là thông tin sơ bộ về chất lượng của cycle hiện tại

Khi người dùng đã tạo cycle trong 'Quality' Tab sẽ được hiển thị như dưới đây 
![](https://images.viblo.asia/263c0e74-b10d-49e7-8dfa-0ee428e32ba4.PNG)

Quality tab sẽ hiển thị như dưới đây khi người dùng đã ánh xạ các mục công việc đối với lần release này
![](https://images.viblo.asia/b3efbe3f-e02c-4645-8cf2-eb477371e11e.PNG)

The 'Quality' Tab will be displayed as shown below once the user has mapped work items against that release.

## 5. Làm thế nào để tạo release Scope
Mỗi lần release thì đều có phạm vi và thước đo tương ứng với nó và nó có thể được thêm vào "Release Scope" Tab

' Bước 1' Click vào "+" icon trong release scope tab của module release, New Scope dialog được mở
![](https://images.viblo.asia/e58b1a61-eecd-43b5-8612-bb2e87210727.PNG)

Nhập chi tiết thông tin sau
* Tên scope 
* Độ ưu tiên của scope
* Người sở hữu của scope
* Mô tả về scope
![](https://images.viblo.asia/51681376-7e4f-4430-a181-91f09b34b1c8.PNG)

' Bước 2' Click vào " OK" Button thì tất cả những scope đã được thêm sẽ hiển thị trong " Release scope" tab như dưới đây
![](https://images.viblo.asia/9010687d-a359-48c5-abf4-bccb7ba8e7f8.PNG)