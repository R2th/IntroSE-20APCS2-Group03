## Mở đầu
Khi chúng ta xây dựng một ứng dụng Android, khả năng rất cao là chúng ta sẽ sử dụng RecyclerView trong dự án của mình.
Ở trong bài viết này, chúng ta sẽ tìm hiểu cách mà RecyclerView hoạt động, bản chất thực bên trong nó đã được xử lý thế nào trong hệ thống của Android.
Chúng ta sẽ tìm hiểu theo từng mục sau:
* RecyclerView là gì?
* Các thành phần tạo nên RecyclerView
* Cách mà RecyclerView hoạt động
* Cách sử dụng ViewHolder
* Kết luận

Nào hãy cùng đến với phần đầu tiên...
## RecyclerView là gì?

RecyclerView là một ViewGroup, cho phép chứa một danh sách trên một bộ sưu tập dữ liệu được cung cấp với sự hỗ trợ của ViewHolder và đưa chúng lên màn hình hiển thị của người dùng.
## Các thành phần tạo nên RecyclerView

Các thành phần chính của RecyclerView bao gồm:
* Adapter
* ViewHolder
* LayoutManager
### Adapter
Là một class kế thừa từ class RecyclerView.Adapter. Nó nhận vào một tập dữ liệu để hiển thị lên màn hình người dùng thông qua RecyclerView. Nó giống như một lớp chịu trách nhiệm chính để bind dữ liệu lên views và hiển thị chúng.
Hầu hết các tác vụ xảy ra bên trong lớp Adapter của RecyclerView.
### ViewHolder
ViewHolder là một lớp kiểu helper class, giúp chúng ta vẽ UI cho từng item mà chúng ta muốn lên trên màn hình.
Tất cả các tác vụ binding views của từng item diễn ra trong class này. Nó là một subclass của lớp of RecyclerView.ViewHolder.
### LayoutManager
LayoutManager trong RecyclerView giúp chúng ta chỉ rõ làm cách nào để chúng ta hiển thị danh sách item lên trên màn hình. Nó có thể là dạng Linear( tuyến tính) hoặc Grid(lưới). Theo mặc định, RecyclerView cung cấp một số triển khai layoutManager sẵn có.
Nó giống như bộ phận quản lý của RecyclerView sẽ thông báo cho adapter của RecyclerView khi nào nên tạo view mới.
![image.png](https://images.viblo.asia/c03de106-7b5d-49f8-b948-3834860d9caa.png)

## Cách mà RecyclerView hoạt động
Bây giờ chúng ta sẽ tìm hiểu về cơ chế hoạt động của RecyclerView. Khi chúng ta bàn về RecyclerView, có lẽ bạn đã từng nghe ai nói nói rằng nó hoạt động bằng cách tái sử dụng views. Vậy thực chất điều này có nghĩa là gì? 


Giả sử bạn có một list gồm 50 items và màn hình chỉ hiển thị được max là 5 items một lúc. Như hình bên dưới.
![image.png](https://images.viblo.asia/6ff90ae7-a821-454b-b364-ddbc488d7ba3.png)
Chúng ta bắt đầu cuộn danh sách này. Ở đây, item 1 đến item 5 là những item đang hiển thị trên màn hình, item x là cái sẽ được load tiếp theo trên màn hình khi chúng ta cuộn xuống.

Tất cả items ở đây đều sở hữu riêng từng instance của ViewHolder và ViewHolder ở đây rất hữu ích cho việc lưu vào bộ nhớ đệm từng item view cụ thể.

Vậy, hoạt động recycling ở đây như thế nào? 


Hãy để cùng chia nhỏ điều này theo từng bước để hiểu rõ hơn.
### Step 01.
Đầu tiên item x đến item 4 sẽ được hiển thị lên màn hình trong lần khởi chạy đầu tiên. Vậy chúng ta có 5 items đang trong chế độ được hiển thị . Hãy gọi chúng là một **visible view**.

Và item 5 là item mới sẽ được load tiếp theo khi chúng ta cuộn lên.
### Step 02.
Khi chúng cuộn một item lên trên, item x sẽ bị trượt lên và một item mới chính là item 5 sẽ được hiển thị.

Bây giờ, item 6 là item nằm trong waiting view. Item x trượt khỏi phía trên của màn hình, giờ nó gọi là một **scrapped view**.
> ScrapView is the view in RecyclerView which was once visible and now are not visible on the phone's screen to the user.
### Step 03.
Bây giờ, hãy cùng cuộn lên thêm một bước nữa. Nó sẽ di chuyển item 1 ra khỏi màn hình và item 6 được di chuyển vào và hiển thị.


Lúc này, item 1 một cũng trở thành một **scrapped view**. Chúng ta đang có 2 **scrapped view** là item x và item 1. Chúng đang được lưu trữ trong một tập hợp **scrapped views**.


Tiếp theo khi chúng ta load thêm một view vào để hiển thị, giả sử gọi nó là item 7, thì view từ trong tập hợp **scrapped view** sẽ được sử dụng.
### Step 04.
Bước này, khi chúng ta load item 7, chúng ta đã lấy view có sẵn từ tập hợp **scrapped views**. View được load từ **scrapped view** được gọi là **dirty view**. 


Tại đây, **dirty view** sẽ được tái sử dụng và được chuyển đến new item trong hàng đợi phải được hiển thị trên màn hình, tức là item 7.
> The views which we take from scrap view collection and then after re-bound happens by the recyclerView adapter before it is drawn to the screen are called dirty views.

![image.png](https://images.viblo.asia/c24927c0-8f55-412d-a39d-38a434be97fb.png)

Đây chính là cách mà view được tái sử dụng xảy ra bên trong RecyclerView, chính là một trong những lý do chính khiến RecyclerView được coi là một cải tiến tốt hơn so với ListView cũ. Ở trong quy trình này, view được sử dụng bởi item cũ đã được tái sử dụng để vẽ ra item mới trên màn hình.
##  Cách sử dụng ViewHolder
Một mặt khác nữa cách mà views được optimized đó là nhờ vào cơ chế của ViewHolder trong RecyclerView.


Giả sử chúng ta có 100 items cần được hiển trong một danh sách và chỉ mỗi 5 items xuất hiện vừa trên màn hình trong mỗi lần hiển thị. Mỗi item view lại có 1 TextView và 1 ImageView bên trong. Vậy nên, để map tất cả các view sử dụng findViewById sẽ phải trả một cái giá rất lớn, hãy tưởng tượng số lần gọi findViewByIds chúng ta có thể thực hiện để map tất cả TextViews và ImageViews của 100 items là 200 lần.


Nhưng trong trường hợp trên, nếu chúng ta sử dụng RecyclerView, thì chỉ có 6 items được khởi tạo ban đầu với 5 items được load cùng lúc để hiển thị trên màn hình, một item còn lại đang đợi để load.
Bây giờ nếu chúng ta cuộn danh sách thì chúng ta sẽ có 7 ViewHolders. Một cái nằm trong scrapped view , một đang đợi để được load và 5 cái đang hiển thị.


Thế nên, trong cùng một lúc, tối đa lời gọi findViewById. mà chúng ta sử dụng chỉ là 14 và chúng ta có tối đa 7 ViewHolders.
## Kết luận
Nhờ vào ViewHolder và việc tái sử dụng views, chúng ta đã thấy được việc cải thiện hiệu năng tuyệt vời của RecyclerViews.

Nhìn chung, nếu chúng ta có multiple view types, ví dụ ViewType1 và ViewType2 khi có chúng ta sẽ có 2 bộ sưu tập tách biệt của scrapped view của từng type tương ứng là ViewType1 và ViewType2.


Và trong khi tái sử dụng views, view thuộc ViewType1 sẽ được phân bổ cho các views thuộc ViewType1 và tương tự với ViewType2.


Trên đây là cơ chế hoạt động bên trong của RecyclerView và lý giải vì sao nó mang lại hiệu quả.


Cảm ơn mọi người đã đọc đến đây, Happy learning.  ^ - ^ !


-----

Tham khảo: https://blog.mindorks.com/how-does-recyclerview-work-internally