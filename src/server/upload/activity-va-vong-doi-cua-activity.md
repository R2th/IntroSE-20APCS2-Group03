## **I.	Giới thiệu về activity trong android**
Lớp Activity là thành phần quan trọng nhất của ứng dụng Android, cách mà chúng hoạt động tạo thành nền tảng cơ bản của mô hình lập trình ứng dụng. Android khởi chạy một ứng dụng thông thường bằng kích hoạt một Activity tương ứng với vòng đời cụ thể của nó trong quá trình hoạt động.  
Thường một Activity cung cấp một của sổ, ở đó ứng dụng sẽ dựng các thành phần UI (User Interface - giao diện người dùng). Mặc định cửa sổ này có thể lấp đầy mà hình thiết bị, nhỏ hơn hoặc nổi phía trên các cửa sổ khác.
Hầu hết các ứng dụng đều sử dụng nhiều màn hình khác nhau, có nghĩa nó sẽ phải có nhiều Activity khác nhau. Khi một Activity chỉ định là Main Activity, nó sẽ là màn hình đầu tiên khi khởi chạy ứng dụng. Activity này có thể gọi và kích hoạt một Activity khác
## **II.	Vòng đời activity**    
### 1. Sơ đồ  

![](https://images.viblo.asia/4a53c8a8-f709-4153-925e-f1add8dccdb8.png)
    
### **2. Mô tả sơ đồ**   
Sơ đồ bắt đầu từ khi Activity launched, tức là khi Activity được kích hoạt, và được hệ thống đẩy vào BackStack. Sau khi kích hoạt, lần lượt các callback onCreate(), onStart(), onResume() sẽ được hệ thống gọi đến.  
Sau khi gọi đến các callback trên, thì Activity mới chính thức được xem là đang chạy (Activity running).  
Lúc này, nếu có bất kỳ Activity nào khác chiếm quyền hiển thị, thì Activity hiện tại sẽ rơi vào trạng thái onPause(). Nếu sự hiển thị của Activity khác làm cho Activity mà chúng ta đang nói đến không còn nhìn thấy nữa thì onStop() sẽ được gọi ngay sau đó 
Nếu Acvitity đã vào onPause() rồi, tức là đang bị Activity khác đè lên, mà người dùng sau đó quay về lại Activity cũ, thì onResume() được gọi. Còn nếu Activity đã vào onStop() rồi, mà người dùng quay về lại Activity cũ thì onRestart() được gọi.
Trong cả hai trường hợp Activity rơi vào onPause() hoặc onStop(), nó sẽ rất dễ bị hệ thống thu hồi (tức là bị hủy) để giải phóng tài nguyên, khi này nếu quay lại Activity cũ, onCreate() sẽ được gọi chứ không phải onResume() hay onRestart().
Và cuối cùng, nếu một Activity bị hủy một cách có chủ đích, chẳng hạn như người dùng nhấn nút Back ở System Bar, hay hàm finish() được gọi,… thì onDestroy() sẽ được kích hoạt và Activity kết thúc vòng đời của nó.  
### 	3. Các trạng thái chính trong vòng đời activity  
**Running**  
Khi Activity được kích hoạt, và được hệ thống để vào BackStack, nó sẽ bước vào trạng thái active. Với trạng thái active, người dùng hoàn toàn có thể nhìn thấy và tương tác với Activity của ứng dụng.  
**Pause**  
Trạng thái này khá đặc biệt. Trạng thái tạm dừng. Như bạn đã làm quen trên kia, trạng thái này xảy ra khi mà Activity của bạn vẫn đang chạy, người dùng vẫn nhìn thấy, nhưng Activity khi này lại bị che một phần bởi một thành phần nào đó. Chẳng hạn như khi bị một dialog đè lên. Cái sự che Activity này không phải hoàn toàn. Chính vì vậy mà Activity đó tuy được người dùng nhìn thấy nhưng không tương tác được.  
**Stop**  
Trạng thái này khá giống với trạng thái tạm dừng trên kia. Nhưng khi này Activity bị che khuất hoàn toàn bởi một thành phần giao diện nào đó, hoặc bởi một ứng dụng khác. Và tất nhiên lúc này người dùng không thể nhìn thấy Activity của bạn được nữa.  
Hành động mà khi người dùng nhấn nút Home ở System Bar để đưa ứng dụng của bạn về background, cũng khiến Activity đang hiển thị trong ứng dụng rơi vào trạng thái dừng này.   
**Dead**  
Nếu Activity được lấy ra khỏi BackStack, chúng sẽ bị hủy và rơi vào trạng thái này. Trường hợp này xảy ra khi user nhấn nút Back ở System Bar để thoát một Activity. Hoặc lời gọi hàm finish() từ một Activity để “kill chính nó”. Cũng có khi ứng dụng ở trạng thái background quá lâu, hệ thống có thể sẽ thu hồi tài nguyên bằng cách dừng hẳn các Activity trong ứng dụng, làm cho tất cả các Activity đều vào trạng thái này.  
Khi vào trạng thái dead, Activity sẽ kết thúc vòng đời của nó.  
Những ý trên giúp bạn nắm được tổng quan các trạng thái mà một Activity có thể trải qua.  
	**4. Làm quen với từng callback**  
**onCreate()**   
Hàm này được gọi khá sớm, ngay khi activity được kích hoạt và thầm chí người còn chưa thấy gì cả thì callback này đã đc gọi rồi. Ngoài ra thì bạn nên biết là callback này chỉ được gọi một lần duy nhất khi Activity được khởi tạo. Nó có thể được gọi lại nếu hệ thống xóa Activity này đi để lấy lại tài nguyên của hệ thống, nhưng rất hiếm khi xảy ra. Và nó còn có thể được gọi lại nếu bạn xoay màn hình (ngang/dọc).  
Do đặc tính được gọi khá sớm và chỉ được gọi một lần duy nhất trong vòng đời của nó như vậy, nên bạn sẽ tận dụng để load giao diện cho Activity ở giai đoạn này, thông qua phương thức setContentView().  
Ngoài giao diện ra, bạn có thể khởi tạo các logic nào đó chỉ chạy một lần ban đầu, như các lời gọi API, load database, tạo item list, tạo Navigation Drawer, và nhiều logic khác.
**onStart():**  
Sau khi gọi đến onCreate(), hệ thống sẽ gọi đến onStart(). Hoặc hệ thống cũng sẽ gọi lại onStart() sau khi gọi onRestart() nếu trước đó nó bị che khuất bởi Activity nào khác (một màn hình khác hoặc một ứng dụng khác) che hoàn toàn và rơi vào onStop().  
Khi hệ thống gọi đến callback này thì Activity được nhìn thấy bởi người dùng và nhưng chưa tương tác được. Bởi đặc tính này mà onStart() ít được dùng đến.  
**onResume()**  
Khi hệ thống gọi đến callback này thì bạn yên tâm rằng người dùng đã nhìn thấy và đã tương tác được với giao diện.  
onResume() được gọi khi Activity được khởi tạo rồi và bước qua onStart() trên kia. Hoặc khi Activity bị một giao diện nào khác che đi một phần (hoặc toàn phần), rồi sau đó quay lại Activity hiện tại. Bạn có thể thấy rằng callback này được gọi rất nhiều lần trong một vòng đời của nó.  
Chính đặc điểm này của onResume() mà bạn có thể tận dụng để quay lại tác vụ mà người dùng đang bị dang dở khi onPause() (được nói đến dưới đây) được gọi.  
Chẳng hạn như bạn đang soạn nội dung cho TourNote, mà có cuộc gọi đến, bạn sẽ lưu tạm nội dung này khi callback onPause(), để rồi khi onResume() được gọi lại sau đó khi người dùng kết thúc cuộc gọi và quay lại TourNote, bạn sẽ khôi phục nội dung đó để người dùng tiếp tục sử dụng TourNote như chưa có bất kỳ gián đoạn nào.  
**onPause()**  
Thông thường nếu có một thành phần nào đó che Activity hiện tại mà người dùng vẫn nhìn thấy Activity đó (nhìn thấy chứ không tương tác được). Chẳng hạn một popup hiện lên trên Activity. Thì onPause() của Activity sẽ được gọi. Sau này khi người dùng quay lại Activity thì onResume() sẽ được gọi.  
Bạn có thể tưởng tượng rằng onPause() cũng sẽ được gọi khá nhiều lần trong một vòng đời Activity. Theo như Google thì onPause() được gọi đến khá nhanh, nếu bạn muốn lưu trữ dữ liệu như mình nói trên kia, thì nên lưu những gì nhanh gọn lẹ thôi. Nếu bạn muốn lưu trữ các dữ liệu nặng, hoặc gọi API kết nối server chỗ này, nhiều khả năng ứng dụng sẽ không kịp thực hiện. Do đó, thay vì làm các thao tác nặng nề ở onPause(), bạn có thể cân nhắc gọi chúng ở onStop().  
**onStop()**   
Như mình có nói. onStop() được gọi khi Activity không còn được nhìn thấy nữa, có thể một màn hình nào khác che lên hoàn toàn, có thể một ứng dụng nào đó vào foreground, hoặc người dùng nhấn nút Home để về màn hình chính.  
Bạn có thể tận dụng onStop() để lưu trữ dữ liệu ứng dụng. Hoặc để giải phóng các tài nguyên đang dùng. Ngưng các API còn đang gọi dang dở.  
Tuy nhiên khi onStop() được gọi không phải là lúc chúng ta cũng nói lời tạm biệt Activity. Như mình đã nói, người dùng hoàn toàn có thể quay lại sử dụng Activity sau đó mà không cần phải khởi động lại Activity, khi này thì phương thức onRestart() và onStart() được gọi kế tiếp nhau.  
**onDestroy()**  
Bạn có thể tận dụng callback này để giải phóng các tài nguyên hệ thống mà ở onStop() bạn chưa gọi đến.  
Vòng đời của một Activity kết thúc ở đây.  
### III. Tài liệu tham khảo  
https://developer.android.com/guide/components/activities/activity-lifecycle