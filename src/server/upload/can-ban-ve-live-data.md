## Tổng quan về LiveData
Live Data là một observable data holder class. hay hiểu theo nghĩa của mình thì Live Data là một lớp nắm giữ dữ liệu và cho phép dữ liệu đó có thể quan sát đc   
Không giống như một observable thông thường, LiveData tôn trọng vòng đời của các component khác trong ứng dụng chẳng hạn như activity, fragment hay service   
## Làm việc với đối tượng LiveData
Để làm việc với LiveData bạn thực hiện theo các bước sau: 
- khởi tao một instance của LiveData với kiểu dữ liệu nhất định. Và nó thường đc tạo trong class ViewModel
- khởi tạo đối tượng Observer để xác định method onChange() nằm bên trong nó. Method onChange() đc dùng ở đây với tác dụng điều khiển tất cả những gì sẽ xảy ra khi dữ liệu đc lưu trữ trong LiveData thay đổi. các đôi tượng Observer thường đc tạo trong UI Controller như activity hoặc fragment
- và cuối cùng đính kèm đối tượng Observer với đối tượng LiveData sử dụng method observe(). (method observe() sẽ lấy ra đc đối tượng LifecycleOwner là vòng đời của activity hay fragment nơi mà bạn khai báo đối tượng Observer). Những subscribers đăng kí đối tượng observer vào đối tượng LiveData sẽ nhận đc thông báo khi có bất cứ thay đổi gì xảy ra.
thường thì sẽ đính kèm đối tượng Observer vào trong UI Controller 

Note: như mình đã nói bên trên thì LiveData tôn trọng vòng đời của các component khác trong ứng dụng nên khi lắng nghe LiveData bạn cần thông qua LifeCycleOwner. thế nhưng cũng có trường hợp ngoại lệ, bạn có thể lắng nghe LiveData mà không cần liên kết vs LifecycleOwner bằng cách sử dụng method observeForever(observer). Trong trường hợp này LifecycleOwner đc xem là luôn họat động. Nếu không muốn lắng nghe nữa hãy gọi method removeObserve()


Khi bạn update giá trị được lưu trữ trong LiveData, nó sẽ kích hoạt tất cả những observer đã đăng kí miễn là LifecycleOwner đc đăng kí đang ở trạng thái hoạt động
LiveData cho phép UI controller observers có thể đăng kí update, nói dễ hiểu thì có nghĩa là khi dữ liệu đc lưu trữ bởi đối tượng LiveData thay đổi thì UI sẽ tự động cập nhật theo những thay đổi đó  
### 1) Create LiveData Object
LiveData có thể đc sử dụng với bất kì kiểu dữ liệu nào, bao gồm những đối tượng implement Clollections chẳng hạn như List, Set,… LiveData<String> LiveData<Object> LiveData<List<Object>>...
Một đôi tượng LiveData thường đc lưu trữ trong ViewModel và sẽ đc truy cập thông qua method getter  
    ![](https://images.viblo.asia/0dd7f971-e0d7-4233-8a97-8584a8d25a34.png)  
    Trong ví dụ trên mình khai báo đối tượng LiveData với kiểu Integer ( mScoreTeamA và mScoreTeamB) và để truy cập vào chúng mình sử dụng method getScoreTeamA() và getScoreTeamB()  
      Tại sao nên update UI Controller khi đối tượng LiveData thay đổi trong ViewModel mà không phải trong activity hay fragment 
    Giải thích :   
 - tránh activity hoặc fragment bị phình to ra. Lúc này UI controller sẽ chịu trách nhiệm cho việc hiển thị data chứ không lưu trữ trạng thái (vì lưu trữ trạng thái nằm trong activity hoặc fragment)  
- việc tách instance của LiveData ra khỏi activity hoặc fragment cho phép đối tượng LiveData sống sót khi cấu hình thay đổi
    
###  2) Lắng nghe LiveData Object 
  Trong hầu hết các trường hợp onCreate() là nơi thích hợp nhất để bạn lắng nghe đối tượng LiveData vì 
- tránh tình trạng hệ thống gọi nhiều lần lắng nghe từ activity hoặc fragment thông qua hàm onResume()
- Đảm bảo rằng Data được lấy từ ViewModel đc hiển thị lên giao diện càng sớm càng tốt ngay sau khi activity hoặc fragment active  
    Example:   
    ![](https://images.viblo.asia/bb05d33c-a486-4e2c-b555-fb94d5461065.png)  
###     3) Update LiveData Object 
LiveData không public method để update dữ liệu lưu trữ trong LiveData tuy nhiên MutableLiveData thì có. Nó kế thừa từ LiveData public thêm 2 method là setValue(T) và PostValue(T) vì vậy nếu bạn muốn update Data thì nên sử dụng MutableLiveData
MultableLiveData được sử dụng trong ViewModel   
Chi tiết hơn về 2 method setValue() và postValue()
hai method đó đều có thể update data nhưng đc dùng trong hai trường hợp 
update LiveData trong main thread sử dụng **setValue()**  
update LiveData trong worker thread sử dụng **postValue()**
##     Tài liệu tham khảo  
https://developer.android.com/topic/libraries/architecture/livedata#java