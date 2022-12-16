Trong sự kiện Google IO 2018, google ra mắt rất nhiều công cụ tuyệt vời giúp các nhà phát triển có thể tăng tốc quá trình phat triển của họ và giúp xây dựng ứng dụng tốt hơn. Một trong số chúng là Android Navigation Component - một thư viện trong bộ thư viện Android JetPack  
Trước khi tim hiểu về cách implement Navigation chúng ta cùng tìm hiểu những khái niệm chính trong thư viện này nhé  
## Introduction
### 1- Navigation Graph  
Navigation graph là một đồ thị mô tả một nhóm các Navigation destination và sự kết nối của chúng 
(ảnh mô tả bên dưới)

![](https://images.viblo.asia/6d2a5eb2-7e94-4156-968a-9e6cc734b517.png)

### 2- Navigation Destination  
Navigation Destination có thể là một màn hình hoặc là một vài view trong ứng dụng của bạn.
Trong Usecase Diagram trên thì ứng với mỗi use case tương ứng sẽ là một Navigation Destination  
### 3- Navigation Action   
Một Navigation action là một đường dẫn kết nối một destination với một destination khác. Một action sẽ cho biết destination nào nó đang kết nối và loại thông tin sẽ xảy ra giữa chúng  
### 4- Navigation Host
Navigation host Một container trống hiển thị một destination và action trong navigation graph
Nó thực hiện điều hướng các destination khác nhau 

##  Start with Navigation 
*Chú ý*: Nếu bạn muốn bắt đầu sử dụng Navigation Component trong Android studio thì android studio mà bạn sử dụng phải có version từ 3.3 trở lên  
Để Import Thư viện của navigation vào trong project, bạn phải khai báo dependency  

```javascript
dependencies {
    def nav_version = "2.1.0-alpha02"
    implementation "androidx.navigation:navigation-fragment:$nav_version" // For Kotlin use navigation-fragment-ktx
    implementation "androidx.navigation:navigation-ui:$nav_version" // For Kotlin use navigation-ui-ktx
}
```

### 1- Create Navigation Graph  
Navigation (điều hướng) xảy ra giữa các destination ở bât cứ nơi nào trong ứng dụng của bạn mà người dùng có thể điều hướng (destination là gì mình đã nói ở trên rồi nhé) 
Navigation graph là một resource file mà nó chứa tất cả các destination và sự kết nối của chúng trong ứng dụng của bạn. Quan sát hình bên dưới này nhé 
![](https://images.viblo.asia/fe29525e-44e7-405e-bb60-ebcd89d394d0.png)  
Figure 1. A navigation graph that shows previews of six different destinations that are connected via five actions.  

Xét một ứng dụng demo gồm có 6 màn hình như trên. Và các bạn có thể thấy đc rất rõ rằng Navigation graph đang mô tả một cách trực quan nhất cho ứng dụng đó với 6 destination đc kết nối với nhau bởi 5 action. Mỗi một destination đc thể hiện bằng một hình thu nhỏ xem trc như trên và các action đc thể hiện bằng các mũi tên cho biết cách mà người dùng có thể điều hướng từ destination này đến destination khác trong ứng dụng  
Và để thêm chúng vào trong project của bạn làm theo các bước sau   
step 1: Chọn new → Android Resource File  
step 2: fill name exp: “nav_graph”  
step 3: Select navigation và sau đó click Ok  

Khi bạn thêm Navigation Graph lần đầu tiên, Android studio sẽ tạo một thư mục Navigation trong res directory. Thư mục này chứa tệp tài nguyên Navigation Graph (ví dụ “nav_graph.xml”)  

* **Navigation Editor**  
Sau khi hoàn thành việc tạo Navigation Graph thì một biểu đồ khác sẽ đc hiện lên và nó đc gọi là Navigation Editor (như hình bên dưới)  
![](https://images.viblo.asia/14114a31-d984-49a0-ae12-9aa2c9894ba3.png)  
(1): Destination Panel: danh sách các Navigation Host (máy chủ điều hướng) và tất cả các destination hiện tại trong Navigation Editor  
(2): Graph Editor: là nơi hiển thị navigation graph.   
(3): Attributes : hiển thị các thuộc tính hiện tại đang đc chọn trong navigation graph  

Và nếu click vào tab “Text” thì file xml tương ứng hiện lên như sau: 
```javascript
<?xml version="1.0" encoding="utf-8"?>
<navigation xmlns:android="http://schemas.android.com/apk/res/android"
            xmlns:app="http://schemas.android.com/apk/res-auto"
            android:id="@+id/nav_graph">
</navigation>
```
phần tử <navigation> là một root element trong navigation graph.   
### 2- Add Navigation host vào một Activity
Một trong những phần cơ bản của Navigation Component chính là Navigation host (máy chủ điền hướng). Navigation host là một kho chứa rỗng nơi mà các destination có thể hoán đổi vị trí cho nhau khi người dùng điều hướng qua ứng dụng của bạn   
Một Navigation host phải xuất phát từ NavHost.   
***Chú ý***: Navigation Component đc thiết kế cho ứng dụng có một **main activity** với **nhiều fragment destination**. Main activity đc liên kết với mọt navigation graph và chứa một NavHostFragment và chịu trách nhiệm hoán đổi destination khi cần. Nhưng trong ứng dụng sẽ có thể có nhiều activity nên ứng với mỗi activity sẽ là một Navigation Graph  
    * **Add NavHostFragment trong XML**
    ![](https://images.viblo.asia/1e9c39e6-c9f7-4c31-ad92-b1a5e5ab7414.png)  
    file xml trên sẽ hiển thị một NavHostFragment là một phần của main activity trong ứng dụng  
    * **Chỉ định một screen là một điểm bắt đầu**  
Start destination là màn hình đầu tiên mà user nhìn thấy khi mở app và là màn hình cuối cùng user nhìn thấy khi thoat app 
Navigation editor là sử dụng icon ![](https://images.viblo.asia/080d0099-ec8e-491e-9833-5cdf4d878e71.png)
để xác định start destinations
* **Conenct destinations**

Action là sự kết nối giữa các destination.   
Action đc mô tả bằng hình ảnh mũi tên trong navigation graph  
Action thường connect một destination với một destination khác, mặc dù bạn hoàn toàn có thể tạo ra một global action đưa đến một destination cụ thể từ bất kì đâu trong ứng dụng của bạn  

* Điều hướng một destination  
Điều hướng đến đích đc thực hiện bằng NavController, 
NavController là một đối tượng quản lí điều hướng ứng dụng trong NavHost. Mỗi NavHost sẽ có một NavController tương ứng của riêng mình  
Để truy xuât NavController cho fragment, activity or view sử dụng một trong số các method sau:  
(1) NavHostFragment.findNavController(Fragment)  
(2) Navigation.findNavController(Activity, int viewId)  
(3) Navigation.findNavController(View)  

Khi bạn truy xuất NavController, sử dụng method navigate() để điều hướng đến một destination. Navigate() method chập nhận ID tài nguyên của một action hoặc một destinations  
**Navigation and Back Stack**    
    Android sẽ duy trì một ngăn xếp Back Stack chứa tất cả destination mà bạn đã ghé thăm (visited). Destination đầu tiên sẽ đc thêm vào trong stack khi người dùng mở app. Và với mỗi lời gọi hàm navigate() sẽ put một Destination khác vào đầu ngăn xếp  
    Và khi gọi hai method này NavController.navigateUp() và NavController.popBackStack thì destination sẽ bị remove khỏi đầu ngăn xếp   popUpTo and popUpToInclusive  
    khi điều hướng bằng cách sử dụng một action, bạn có thể tùy ý pop các destination bổ sung ra khỏi ngăn xếp. Ví dụ: nếu ứng dụng của bạn có luồng đăng nhập ban đầu, khi người dùng đã đăng nhập, bạn nên pop(bật) tất cả các destination liên quan đến đăng nhập ra khỏi ngăn xếp để khi người dùng click button back  sẽ không đưa người dùng quay lại luồng đăng nhập.

Để pop các destination khi điều hướng từ destination này đến destination khác bằng cách thêm thuộc tính app:popUpTo để liên kết phần tử <action>. Giá trị thuộc tính là ID của destination gần nhất sẽ vẫn còn trên ngăn xếp.  
## Tài liệu tham khảo  
    https://developer.android.com/guide/navigation/navigation-getting-started#Identify-destinations  
    https://medium.com/google-developer-experts/android-navigation-components-part-2-ca643eb301e3