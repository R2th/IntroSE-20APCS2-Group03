Hi các bạn, dạo gần đây khi làm dự án thì mình rất hay phải bổ sung các thông tin khác vào các user story được viết bởi PO do nó khá là chung chung và thường anh em dev không hiểu hết được, kể cả có discuss trong sprint planning meeting thì vẫn khá là khó nhớ. Vậy nên mình quyết định tìm hiểu các cách để bổ sung chi tiết cho 1 user story, xin được phép chia sẻ với mọi người qua bài viết này.

# Chia nhỏ user story

Cách đầu tiên mình muốn nói đến đó là chia nhỏ user story ra thành nhiều user story con. Khi bạn tạo ra nhiều user story nhỏ hơn, bạn sẽ cung cấp nhiều thông tin chi tiết hơn, đó chính là 1 hiệu ứng phụ của việc "viết nhiều hơn". 

Một ví dụ cụ thể ta có thể đề cập đến như sau:

User story gốc:

*  As a user, I can log in through a social media account.

Ok, nhìn thì mọi người cũng hiểu được chức năng này sẽ chạy như nào đúng không, vì nó khá là phổ biến ở các hệ thống hiện thời. Người dùng đăng nhập vào, click chọn 1 cái social media mà họ muốn dùng để đăng nhập cho tiện, sau đó thì được đăng nhập vào hệ thống. Tuy nhiên, vấn đề ở user story này là người dùng sẽ được đăng nhập vào bằng những social media account nào? Hiện có ti tỉ loại social media mà cung cấp log in kiểu này, anh em dev sẽ tự chọn hay gì?

Lúc này, ta sẽ cần làm những bước như sau:
1. Tìm hiểu về người dùng của chúng ta thường dùng loại social media nào, mỗi tập người dùng cuối sẽ có những thói quen chung khác nhau, chứ không phải lúc nào cũng Facebook, Google, Twitter. Như người Việt Nam thì ít dùng Twitter lắm nên không phải cứ thế mà ốp vào
2. Sau khi tìm hiểu rồi thì chốt xem ta sẽ dùng loại social media nào để giúp người dùng đăng nhập
3. Và cuối cùng, tách nhỏ thành các user story để anh em dev triển khai.

Chẳng hạn ta đang xây dựng hệ thống giúp các startup founder gọi vốn đi, thì ta có thể thấy được rằng mấy ông này hay dùng Facebook, Google, LinkedIn nên ta chọn 3 loại này làm đăng nhập qua social media. Sau đó ta tách được user story trên thành như sau:
* As a user, I can log in through my Facebook account.
* As a user, I can log in through my Google account.
* As a user, I can log in through my LinkedIn account.

Đó, sau khi tách nhỏ ra thế thì anh em dev có thể hiểu được sẽ phải implement qua 3 loại social media này, khá là rõ ràng phải không nào? 

Thường cách này ta sẽ dùng cho những user story rất lớn, được coi là những Epic (tham khảo thêm ở [đây](https://www.atlassian.com/agile/project-management/epics#:~:text=Summary%3A%20An%20agile%20epic%20is,for%20agile%20and%20DevOps%20teams.&text=Epics%20are%20a%20helpful%20way,and%20to%20create%20a%20hierarchy.)), còn với những cái nhỏ nhỏ như ví dụ trên thì ta nên dùng một cách khác, đó là thêm note.

# Thêm note trực tiếp vào user story
Cách này là cách mình hay thực hiện hơn, vì kể cả có tách user story con thì nó cũng chưa thể hiện được hết những gì cần làm đâu, còn nhiều thứ phải thêm thắt vào lắm.

Thêm note thì ta có thể ghi thêm trực tiếp vào phần detail của user story, các dạng note thường có có thể kể đến như:
1. Acceptence criteria: Như thế nào thì chấp nhận là user story này được hoàn thành? Chỉ khi nó đáp ứng được hết các yêu cầu trong acceptence criteria
2. Validation cho các đối tượng được đề cập đến trong user story
3. Màn hình design chi tiết
4. Flowchart, state diagram,... những biểu đồ gì đó giúp cho anh em dev hiểu được luồng hoạt động
5. Vân vân và mây mây,...

Trước đây thì mình cứ nghĩ sẽ phải có một quy chuẩn nào đấy về mặt tài liệu khi tạo ra một user story, tuy nhiên giờ đã nhận ra là nó sẽ tùy thuộc vào user story mình đang cần xử lý. Mỗi user story sẽ cần thêm những loại note khác nhau, miễn sao nó đủ để cho team hiểu là được.

Một số ví dụ về các loại note trên như sau:

**User story**: As a user, I can log in through a social media account.
* Acceptence criteria:
    * Can log in through Facebook
    * Can log in through LinkedIn
    * Can log in through Twitter

**User story**: As a driver, I want to be able to register on food delivery system so that I can begin taking orders
* Validation cho driver account:
    * Must upload Driver's License
    * Must go through a manual check - verification
    * Must be approved by admin
    * Need to update hours they can work

Mình có kiếm được một ví dụ rất hay trên Trello về việc bổ sung các note cho user story, các bạn có thể tham khảo tại [đây](https://trello.com/b/9QILszio/food-delivery-app-step-2).

# Kết
Hy vọng rằng với 2 cách mình chia sẻ, các bạn sẽ có thêm những cách thức phù hợp trong việc trao đổi công việc trong team, để trở thành 1 BA tốt hơn

## Nguồn tham khảo:
1. https://medium.com/flowcap/how-to-write-detailed-user-stories-847d9df0b3d0
2. https://trello.com/b/9QILszio/food-delivery-app-step-2
3. https://www.mountaingoatsoftware.com/blog/the-two-ways-to-add-detail-to-user-stories#:~:text=The%20first%20approach%20to%20adding,using%20their%20social%20media%20accounts.
4. https://stormotion.io/blog/how-to-write-a-good-user-story-with-examples-templates/