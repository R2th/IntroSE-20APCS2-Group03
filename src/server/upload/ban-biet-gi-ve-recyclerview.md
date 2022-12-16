## I. Tổng quan về RecyclerView
-   RecyclerView là phiên bản ListView nâng cao và linh hoạt hơn.
-	Trong mô hình RecyclerView, một số thành phần khác nhau làm việc cùng nhau để hiển thị dữ liệu của bạn
-	RecyclerView lấp đầy chính nó bằng các chế độ xem do trình quản lý layout cung cấp.(chẳng hạn như LinearLayoutManager, GridLayoutManager)
-	Các view trong list được đại diện bởi các đối tượng ViewHolder. Đói tượng này là một thể hiện của một lớp mà bạn định nghĩa bằng cách extend RecyclerView.ViewHolder
-	Mỗi ViewHolder chịu trách nhiệm hiển thị một single item trong một view. 
-	RecyclerView chỉ tạo ra nhiều ViewHolder khi cần để hiển thị phần trên màn hình của nội dung động, cộng thêm một vài phần bổ sung
-	Khi người dùng cuộn qua danh sách, recyclerview lấy các view nằm ngoài màn hình và kết nối chúng với dữ liệu đang cuộn lên màn hình
-	Các đối tượng ViewHolder được quản lý bởi Adapter mà bạn tạo ra bằng cách kế thừa RecyclerView.Adapter. Adapter tạo ra các view khi cần thiết. Adapter cũng liên kết ViewHolder với dữ liệu của chúng. Nó thực hiện điều này bằng cách chỉ ViewHolder cho một vị trí và gọi phương thức onBindViewHolder () của adapter. Phương thức đó sử dụng vị trí của ViewHolder để xác định nội dung nên dựa trên vị trí danh sách của nó.
-	Mô hình RecyclerView này thực hiện rất nhiều công việc tối ưu hóa. Khi danh sách được điền lần đầu tiên, nó sẽ tạo và liên kết một số ViewHolder ở hai bên của danh sách. Ví dụ, nếu View hiển thị các vị trí danh sách từ 0 đến 9, RecyclerView tạo và liên kết các trình xem đó, và cũng có thể tạo và ràng buộc với ViewHolder cho vị trí 10. Bằng cách đó, nếu người dùng cuộn danh sách, phần tử tiếp theo là sẵn sàng để hiển thị.
![](https://images.viblo.asia/eaf9c3b6-cd8f-4caa-a475-f807b4d9c058.jpeg)
-	Các hộp màu vàng là các khung nhìn hoặc các hàng trong RecyclerView. Giả sử có 30 mục trong mảng hoặc cơ sở dữ liệu hoặc bất kỳ tập dữ liệu nào khác và trong phần hiển thị của màn hình (chế độ xem), bạn chỉ có thể xem 4 hàng hoặc lượt xem (views) tại một thời điểm. Một ListView thường sẽ tạo ra 30 khung nhìn, một cho mỗi mục dữ liệu và sau đó kết nối dữ liệu với nó. Việc tạo Chế độ xem này là một tác vụ đòi hỏi nhiều CPU. Và một listView bình thường sẽ chậm vì nó thường xảy ra. 
-	RecyclerView là gì, nó chỉ tạo ra 4 khung nhìn đầu tiên được hiển thị trên màn hình và bất cứ khi nào chúng ta bắt đầu cuộn, nó tạo ra nhiều khung nhìn hơn (trong ví dụ này, nó sẽ tạo tổng cộng 8 khung nhìn (4 + 4)) và các khung nhìn ra khỏi vùng hiển thị được lưu trữ. Vì vậy, số chu kỳ CPU được giảm khi các lượt xem được giảm từ 30 xuống 8. Các khung nhìn được lưu giữ để tái chế được gọi là các khung nhìn được cạo.

## II. Sự khác nhau giữa ListView và RecyclerView  
Như các bạn đã biết RecyclerView là một ViewGroup mới được giới thiệu trong Android L (Android API 21). Đây là một ViewGroup có chức năng tương tự ListView nhưng nó tỏ ra mạnh mẽ, linh hoạt hơn rất nhiều. ListView chỉ hỗ trợ bạn scroll các item trong ListView theo chiều dọc (vertical) mà không hỗ trợ scroll theo chiều ngang (horizontal) . RecyclerView support được tất cả những thứ đó và hơn thế nữa.  
**Nhắc qua một chút về ListView nhé**  
ListView là một view group, hiển thị các thành phần (elements) theo một danh sách, có thể cuộn được theo chiều thẳng đứng. ListView là một view quan trọng, nó được sử dụng rộng rãi trong các ứng dụng Android. 
•	Mặc dù vậy nhưng so với ListView thì RecyclerView lại có những điểm mạnh mẽ vượt trội hơn
-	Yêu cầu sử dụng ViewHolder pattern trong Adapter : với listView thì có hoặc không sử dụng ViewHolder để cải thiện hiệu năng nhưng đối với recyclerview thì bắt buộc phải sử dụng ViewHolder để cải thiện hiệu suất. Và mục đích sử dụng ViewHolder để tái sử dụng View nhằm tránh việc tạo View mới và findViewById quá nhiều
-	ListView chỉ support cho chúng ta danh sách dạng scroll dọc. Nhưng với RecylerView cung cấp cho chúng ta RecyclerView.LayoutManager cho phép Layout các item trong listView theo các kiểu khác nhau (ngang, dọc, dạng grid, dạng staggered grid).
-	Với ListView việc sử dụng divider không được linh hoạt nhưng với RecylerView có hỗ trợ ItemDecoration cho phép chúng ta draw divider một cách tuỳ thích.
-	ListView có support các phương thức phương thức setOnItemClickListener và setOnLongItemListener để chọn 1 item trong ListView. Nhưng RecylerView chỉ support một phương thức đó là onItemTouchListener.
*** Khi nào chúng ta nên sử dụng ListView**
   Bất cứ khi nào bạn cần danh sách các mục.
Bất cứ khi nào các mục này không giống nhau. Ví dụ, một hàng có thể chứa 3 TextView và hàng còn lại chứa 5 ImageViews.
Bất cứ khi nào các phần tử có thể thay đổi trong thời gian chạy, do sự kiện nhấp chuột của người dùng hoặc sự kiện mạng.
## III. Các component chính trong RecyclerView
 RecyclerView có 4 component 
 -	RecyclerView.Adapter
-	RecyclerView.LayoutManager
-	RecyclerView.ItemAnimator
-	RecyclerView.ViewHolder  
### **1. Adapter**  
Trước đó trong Widget ListView,đã được trang bị adapter khác nhau cho các mục đích khác nhau như ArrayAdapter và SimpleCursorAdapter. Và bây giờ hãy nói tạm biệt với họ vì Google đã giới thiệu một RecyclerView.Adapter mới cho RecyclerView. Điều này RecyclerView.Adapter thingy là gì?
Adapter là một thành viên trong RecyclerView Family có nhiệm vụ được giao để lấy dữ liệu từ một tập dữ liệu (ví dụ: một cơ sở dữ liệu hoặc mảng) và chuyển nó vào một cái gì đó gọi là LayoutManager, người có nhiệm vụ trình bày nó cho Người dùng.
Cũng giống như listview thì đây là thành phần xử lí data collection (dữ liệu kiểu danh sách) và bind(gắn) những dữ liệu này lên các item của Recyclerview
Khi tạo custom adapter chúng ta phải override lại hai phương thức là 
onCreateViewHolder : phương thức dùng để tạo view mới cho recyclerview
onBindViewHolder : dùng để gắn data vào view
![](https://images.viblo.asia/82dd6093-e211-4e8e-bbc4-4e9dca62b019.png)  
### **2. Layout Manager**  
Là thành phần có chức năng sắp xếp các item trong RecylerView. Các item scroll dọc hay ngang phụ thuộc chúng ta set LayoutManager này cho RecyclerView.
Các class con của LayoutManager: 
- LinenarLayoutManager: Hỗ trợ scroll các item theo chiều ngang hay chiều dọc.
- GridLayoutManager: Layout các item trong RecyclerView dưới dạng Grid giống như khi chúng ta sử dụng GridView.
- StaggerdGridLayoutManager: Layout các item trong ListView dưới dạng Grid so le.
![](https://images.viblo.asia/3015ec76-4ebe-483c-95eb-089cada8eb89.png)
không giống như ListView chúng ta chỉ có thể hiển thị các item theo chiều dọc  
### **3. ItemAnimator**  
Nói qua một chút về ItemAnimator trong ListView nhé. Itemanimator trong ListView hoàn toàn là một nhiệm vụ khó khăn khác. Phải mất rất nhiều thời gian cho việc này và chính vì vậy Google đã làm cho việc sử dụng ảnh động một cách dễ dàng hơn đó là tích hợp Itemanimator vào RecyclerView. RecyclerView đi kèm với hình ảnh động mặc định mà bạn có thể ghi đè và thay đổi theo nhu cầu
![](https://images.viblo.asia/dc55dfa8-c275-4359-8de5-af7554c7016d.png)
Về khái niệm ItemAnimator: Là thành phần hỗ trợ animation khi chúng ta add hay remove một item ra khỏi RecyclerView. Để tìm hiểu rõ phần này tôi gọi ý cho các bạn là nên tìm hiểu các class sau
ItemAnimator: Là class đại diện, khung sườn của animation trong RecyclerView.
SimpleItemAnimator: class wrapper lại ItemAnimator.
DefaultItemAnimtor: class xử lý animtion mặc định sử dụng trong RecyclerView.  
### **4. ViewHolder**  
Và cuối cùng một component vô cùng quan trọng của RecyclerView đó là ViewHolder
![](https://images.viblo.asia/13e7d422-905e-4fc6-a486-1b6b823f1a44.png)
Nhìn vào hình ảnh này các bạn cũng có thể hình dung ra được nhiệm vụ của ViewHolder trong RecyclerView rồi chứ.  
ViewHolder là nền tảng cho RecyclerView và Adapter, mô tả một item view và meta data về vị trí của nó trong RecyclerView.
Hay nói một cách dễ hiểu dữ liệu được lấy từ tập data set (nhờ adapter) không đưa trực tiếp lên View mà sẽ thông qua ViewHolder để sắp xếp dữ liệu vào từng item view hiển thị lên màn hình  
## IV. Tài liệu tham khảo  
https://developer.android.com/  
https://android.jlelse.eu/understanding-recyclerview-components-part-2-1fd43001a98f