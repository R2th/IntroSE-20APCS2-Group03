# I. Dẫn nhập
* Có bao giờ bạn phải lướt vài trăm dòng trong *strings.xml* để tìm một đoạn text phù hợp? Hay mỗi khi cần một icon, bạn phải đi dò từng cái có sẵn trong *drawable* để tránh trùng lặp? Mỗi khi chúng ta bắt đầu một dự án mới, chúng ta thường quan tâm đến việc xây dựng struct, cài đặt môi trường, CI/CD ... nhưng bạn đã từng nghĩ đến việc làm sao để đặt tên resource một cách khoa học chưa? Việc Google không đưa ra một quy chuẩn chung cho việc đặt tên file xml đã làm cho việc quản lý Android Resource trở nên khó khăn và nhàm chán, đặc biệt đối với những dự án lớn.
* Trong bài viết này, mình sẽ giới thiệu một quy tắc đặt tên đơn giản nhưng có thể phần nào giúp ích được cho bạn. Nội dung của bài viết được lược dịch từ bài gốc [A successful XML naming convention](https://jeroenmols.com/blog/2016/03/07/resourcenaming/)

# II. Nội dung chính
Những lợi ích có được khi chúng ta áp dụng quy tắc này:
- Dễ dàng tìm kiếm bất kỳ resource nào bằng autocomplete.
- Tên được đặt một cách logic và dễ suy đoán.
- Sắp xếp resource một cách khoa học.
- Phân chia các loại resource một cách rõ ràng.
## 1. Nguyên tắc cơ bản:
Tên của các loại resource sẽ dựa theo quy ước sau:
![](https://images.viblo.asia/5e169772-d4d4-4729-9b87-81f1ef20c3b8.jpg)
Đầu tiên, chúng ta hãy xem mỗi thành phần trong cấu trúc này có ý nghĩa ra sao:
* *<WHAT>*: Chỉ ra thứ mà resource này đại điện, thường là một class view của Android. Chỉ áp dụng cho một vài loại resource. Ví dụ: *MainActivity => activity*
* *<WHERE>*: Chỉ ra vị trí logic của resource trong app. Resource nào được sử dụng ở nhiều màn hình thì sẽ sử dụng từ khóa all, còn những cái khác thì sử dụng phần mà chúng ta tự đặt tên cho view đó. Ví dụ: *MainActivity => main* hoặc *DetailFragment => detail*.
* *<DESCRIPTION>*: Dùng để phân biệt những thành phần khác nhau trong một màn hình. Ví dụ: *title*.
* *<SIZE>* (optional): Định nghĩa kích thước cho resource, thường được sử dụng với drawable và dimen. Ví dụ: *24dp* hoặc *small*.

Dưới đây là cheat sheet để bạn dễ tham khảo:

![](https://images.viblo.asia/0969ebf2-4b3d-47b0-beb5-eea8b684448b.png)

**Ưu điểm:**
* Sắp xếp resource theo màn hình

Thành phần *WHERE* chỉ ra việc resource này thuộc về màn hình nào, vì vậy nó sẽ làm cho việc xác định các id, dimen, drawables… trở nên dễ dàng cho một màn hình cụ thể nào đó.

* Dễ dàng xác định kiểu resource

Đối với id của resource, thành phần *WHAT* sẽ miêu tả kiểu của resource đó (ví dụ *LinearLayout*) giúp ích cho việc gán và ép kiểu bằng *findViewById()*.

* Tổ chức resource hiệu quả

Các trình duyệt file thường sắp xếp file theo thử tự bảng chữ cái. Điều này có nghĩa là layout và drawable sẽ được sắp đặt bằng tiền tố *WHAT* hay *WHERE* tương ứng.

* Autocomplete hiệu quả

Bởi vì tên resource đã trở nên rất dễ đoán đồng nghĩa với việc sử dụng autocomplete cũng trở nên dễ dàng hơn rất nhiều. Thường thì bạn chỉ cần gõ tiền tố *WHAT* hoặc *WHERE* là đã đủ để tìm ra resource mà mình cần.

* Không còn sợ việc trùng tên

Resource giống nhau ở những màn hình khác nhau sẽ có thành phần *all* hoặc *WHERE* trong tên. 1 cấu trúc đặt tên cố định sẽ giúp bạn tránh việc đặt trùng tên.

* Tên được đặt rõ ràng

Về cơ bản thì tên resource sẽ được đặt một cách logic và hợp lý hơn, góp phần làm cho dự án trở nên súc tích hơn.

* Công cụ hỗ trợ

Cấu trúc đặt tên này có thể được hỗ trợ một cách dễ dàng bởi Android Studio cung cấp những chức năng như: *lint rules* để bắt buộc cấu trúc này, hỗ trợ refactor khi bạn muốn thay đổi *WHAT* hay *WHERE*, sắp xếp resource một cách dễ nhìn hơn…
## 2. LAYOUT
Cấu trúc đặt tên sẽ như sau:
![](https://images.viblo.asia/b415cf43-27c1-424a-ac5f-46bbb35b96fc.png)
Trong đó *<WHAT>* có thể là:

| Prefix | Sử dụng |
| -------- | -------- |
| activity     | Nội dung view của activity     |
| fragment     | View của một fragment     |
| view     | Inflate bởi một custom view     |
| item     | Layout sử dụng trong list/recycler/gridview      |
| layout     | Layout được tái sử dụng bằng tag *<include>*     |
  
Ví dụ:
- *activitymain*: Layout content của MainActivity
- *fragmentdetail*: layout content của DetailFragment
- *viewgraph*: layout được inflate bởi class custom view GraphView
- *itembook*: list item trong BookRecyclerView
- *layoutactionbarbackbutton*: layout chứa 1 action bar và 1 nút back.
## 3. STRING
Thành phần *<WHAT>* trong một String là không cần thiết và không có tác dụng, nên hoặc là chúng ta sử dụng tiền tố *<WHERE>* để chỉ ra nơi mà String sẽ được sử dụng:
![](https://images.viblo.asia/ea74dcf0-570e-4e78-9286-b87d05662053.png)
hoặc tiền tố all nếu string được sử dụng ở nhiều nơi trong app:
![](https://images.viblo.asia/597124f7-4bf4-422a-98fb-6996d0b8f4b9.png)

Ví dụ:
- *detailtitle*: Tiêu đề của DetailFragment
- *feedbackexplanation*: feedback explanation trong FeedbackFragment
- *feedbacknamehint*: gợi ý của trường đặt tên trong FeedbackFragment
- *allok*: có thể được tái sử dụng trong toàn app.
## 4. DRAWABLE
Tương tự với String, việc đặt tên drawable sử dụng tiền tố *<WHERE>* để chỉ ra vị trí mà drawable này sẽ được sử dụng:
![](https://images.viblo.asia/197cfb86-5e25-490e-8814-9bad338e07b1.png)
hoặc tiền tố all nếu drawable được tái sử dụng ở nhiều nơi trong app:
![](https://images.viblo.asia/125c0adb-1465-4490-88d9-f4b105983ab9.png)
Chúng ta còn có thể thêm thành phần size vào cuối của tên nếu resource có nhiều phiên bản với size khác nhau.
Ví dụ:
- *detailplaceholder*: placeholder trong DetailFragment.
- *allinfoicon*: info icon có thể tái sử dụng ở nhiều nơi.
- *allinfoiconlarge*: phiên bản có kích thước lớn của info icon.
- *allinfoicon24dp*: phiên bản 24dp của info icon.
## 5. ID
Đối với id, *<WHAT>* là tên class của thành phần có id này. *<WHERE>* là màn hình mà id này được sử dụng. *<DESCRIPTION>* có thể được sử dụng để phân biệt những thành phần giống nhau trong một screen.
![](https://images.viblo.asia/fd41347e-05e4-4493-bf76-b660b79547e7.png)
Ví dụ:
- *tablayoutmain* -> TabLayout trong MainActivity
- *imageviewmenuprofile* -> Ảnh profile trong MenuView
- *textviewdetailtitle* -> tiêu đề TextView trong DetailFragment
## 6. DIMENSION
App chỉ nên định nghĩa một tập hợp có giới hạn các dimen để tái sử dụng lại liên tục. Điều này làm cho hầu hết các dimen mặc định có thành phần *all*.
Vì thế thường thì chúng ta nên dùng:
![](https://images.viblo.asia/ff0de5b2-e130-4fb3-95cf-3b01b2dc0737.png)
Và trong 1 số trường hợp có dimen dành riêng cho 1 màn hình thì:
![](https://images.viblo.asia/c2038e7d-ce74-4c83-a711-dfcf51911262.png)
Trong đó *<WHAT>* có thể là:

| Prefix | Sử dụng |
| -------- | -------- | 
| width     | chiều rộng bằng dp     |
| height     | chiều cao bằng dp     |
| size     | nếu chiều rộng = chiều cao     |
| margin     | margin bằng dp     |
| padding     | padding bằng dp     |
| elevation     | elevation bằng dp     |
| keyline     | absolute keyline measured from view edge in dp     |
| textsize     | kích cỡ của text bằng sp     |
Chú ý là list này chỉ chứa những thành phần *<WHAT>* thông dụng nhất. Những qualifier khác như rotation, scale ... thường chỉ được sử dụng với drawable nên sẽ hiếm khi được tái sử dụng.
Ví dụ:
- *heighttoolbar*: Chiều cao của tất cả các toolbar
- *textsizemedium*: Kích cỡ medium cho tất cả các text
- *sizemenuicon*: Kích cỡ của icon trên menu
- *heightmenuprofileimage*: Chiều cao của ảnh đại diện ở menu
## 7. Các hạn chế:
* Mỗi màn hình cần có tên độc nhất

Để tránh việc đặt trùng tên trong thành phần *<WHERE>*, các class view cần có tên độc nhất. Vì thế chúng ta không thể cùng có *MainActivity* và *MainFragment* vì tiền tố main sẽ không còn để chỉ 1 màn hình duy nhất.

* Không hỗ trợ refactor

Thay đổi tên class không làm cho tên resource thay đổi theo. Nên nếu chúng ta đổi tên MainActivity thành *ContentActivity*, tên của layout *activitymain* sẽ không được tự cập nhật và chúng ta sẽ phải đổi tên nó bằng tay. Hi vọng trong tương lai Android Studio sẽ hỗ trợ điều này.

* Chưa hỗ trợ tất cả các loại resource

Quy tắc đặt tên này tạm thời chưa hỗ trợ tất cả các loại resource. Đối với vài loại resource thì đó là do chúng thường ít được sử dụng hay rất đa dạng (như raw hay assets). Một số loại khác thì rất khó để khái quát hóa (như themes/styles/colors/animations).

# III> Kết
Hy vọng với bài viết này, các bạn sẽ có thêm những kinh nghiệm hữu ích khi làm việc với Androi Resource. Hẹn gặp các bạn trong bài viết sau!