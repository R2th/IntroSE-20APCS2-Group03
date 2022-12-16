### **1. Giới thiệu về mô hình MVC trong ASP.NET**
* MVC là viết tắt của Model-View-Controller. Trong ASP.NET, MVC là một dạng mô hình kiến trúc phân cách một ứng dụng web thành ba thành phần: Model, View và Controller.
    * Models: Tại đây chứa các models được hiểu đơn giản là những đối tượng liên quan trực tiếp đến dữ liệu. Giống như trong 1 cơ sở dữ liệu có những bảng khác nhau thì mỗi bảng sẽ được hiểu là 1 model, trong mỗi bảng có các fields thì tương tự trong mỗi model cũng có các thuộc tính. VD: trong cơ sở dữ liệu quản lý sản phẩm bán hàng có bảng lưu trữ các sản phẩm là bảng Product thì trên model cũng sẽ có Product để thể hiện và trong bảng Product này có những trường gì thì trên model Product cũng sẽ có các trường giống như vậy. Để thao tác với dữ liệu thì bạn sẽ thao tác trực tiếp với các models này.
    *  Views: Được hiểu là nơi chứa tất cả phần hiển thị lên một trang web, thường thì view sẽ được tạo ra dựa trên dữ liệu, tức là dữ liệu có cái gì thì ta hiển thị ra được cái đó, mà model là thể hiện của dữ liệu nên view được tạo ra dựa trên model. Ví dụ: muốn hiển thị thông tin của 1 sản phẩm bạn phải có dữ liệu của sản phẩm đó vì vậy view sẽ được tạo ra dựa trên những model mà bạn có.
    *  Controller: Được hiểu là phần để xử lý mọi tương tác trên view. Ví dụ: để hiển thị thông tin của 1 sản phẩm bạn cần chọn vào sản phẩm đó, thì cái hành động chọn sản phẩm để xem chi tiết sẽ được gọi là 1 action trong controller. Khi 1 action được gọi đến thì nó bắt đầy xử lý gọi về cơ sở dữ liệu thông qua model thực hiện các query để lấy dữ liệu, khi dữ liệu được lấy thành công thì controller đưa dữ liệu về view để hiển thị cho người dùng và kết thúc 1 quy trình hoạt động.
    
    ![](https://images.viblo.asia/4a8946ea-3242-4e80-a02c-e3178461f004.PNG)
        
* Mô hình MVC được đưa vào để thay thế cho Web Forms, dễ thấy rằng mô hình MVC có cái lợi là dễ hiểu (dễ hiểu ở đây là mô hình này có sự tách biệt giữa các thành phần chính để tạo lên 1 ứng dụng Web nói riêng), giúp bạn quản lý tốt hơn, phần nữa là về kỹ thuật kiểm thử, debugging,...
        
### **2. Tạo ứng dụng Web ASP.NET MVC 5 sử dụng Visual Studio 2017**
* **Bước 1:** Trên thanh Toolbars của VS chọn vào **File** => **New** => **Project**
    ![](https://images.viblo.asia/e49b608f-ee4e-43dd-a23f-40e70dc8c6b2.png)
* **Bước 2:** Trên **Dialog New Project** bạn tìm đến phần **Installed** chọn **Visual C#** => **Web** sau đó chọn **ASP.NET Web Application** hoặc có thể **Search trên thanh Search**. Ở đây bạn chú ý phần Framework sử dụng mình dùng là [.NET Framework 4.6.1](https://www.microsoft.com/en-us/download/details.aspx?id=49981), **Name** là tên của project bạn định tạo, **Solution name** là tên của solution bạn tạo (1 solution có thể chứa nhiều project ở đây VS sẽ mặc định đặt tên cho **Solution** giống với tên của project bạn tạo), **Location** là nơi mà bạn muốn lưu **Solution** đó. Sau đó chọn **OK** để tạo **Solution**.
    ![](https://images.viblo.asia/cd7ed8e6-7a61-45b3-9643-b25bd6b8fc9e.png)
*  **Bước 3:** Ở bước này bạn chọn MVC sau đó OK là xong, phần việc còn lại là của VS xử lý. Còn **Change Authentication** phần này mình sẽ nói sau.
    ![](https://images.viblo.asia/570c813f-988a-40b8-847a-477fe0cde2f7.PNG)
*  **Bước 4:** Chạy ứng dụng bằng cách nhấn F5(chạy với chế độ debugging) hoặc Ctrl+F5(Chạy với chế độ không debug) hoặc start trên VS. Chỗ khoanh đỏ là chọn trình duyệt để chạy.
![](https://images.viblo.asia/0173dd6e-d735-465a-a237-dc60e06af6a5.PNG)
* **Bước 5:** Đợi VS build project và sau khi chạy lên trình duyệt.
![](https://images.viblo.asia/70947787-9a51-4f3c-9c39-cbd58ae9358b.PNG)
### **3. Cấu trúc của project**
* Để cấu thành nên 1 project ASP.NET MVC thì không thể thiếu được Controllers, Models và Views như trên hình mình đã khoanh đỏ. Còn một số thành phần khác như:
    *   **Property** : là file chứa các cấu hình chung cho project.
            
    *   **References**: là nơi chứa các [DLL(Dynamic Link Library)](https://techterms.com/definition/dll) mà ứng dụng của bạn sử dụng.
            *  **App_Data**: là thư mục bạn có thể lưu dữ liệu dạng SQL, các files, file cache,...
    *  **App_Start**: có chứa các files cấu hình như:
    *  **BundleConfig** đúng nghĩa là đóng gói các files dạng **javascript** và **stylesheet** (các files cùng kiểu), ví dụ: bạn có 3 files **javascript** bạn có thể gói 3 files này lại thành 1 để khi gọi ra bạn chỉ cần gọi 1 lần và 2 files **stylesheet** cũng vậy.
    *  **FilterConfig** trên lý thuyết đó là nơi để cấu hình khi bạn muốn thực hiện logic nào đó trước khi thực hiện hành động. Ví dụ: 1 trang web cho phép comment nhưng người dùng phải đăng nhập, trong trường hợp này trước khi thực hiện truyền đi đoạn comment đó thì phải kiểm tra xem họ đã đăng nhập chưa, thì cái đó được hiểu là 1 dạng của **Filter** trong ASP.NET MVC.
    *  **RouteConfig** là file cấu hình Router được hiểu là cấu hình URL để gọi đến 1 hành động nào đó. Mặc định sẽ được cấu hình dạng **localhost:abcd/{controller}/{action}/{id}**, abcd là cổng mà mỗi project khi tạo sẽ có cổng khác nhau, controller là tên của controller, action là tên của action, id là tham biến truyền vào với những action cần tham biến(cái này tùy chọn có thể có hoặc không).
    *  **Content**: là thư mục chứa các files **stylesheet**.
    *  **Controllers**: là thư mục chứa các files controller. Trong mỗi controller bạn có thể định nghĩa các actions. Mặc định VS tạo file tên là **HomeController.cs** controller này là Home và có các action Index, About, Contact.
    *  **fonts**: là thư mục chứa các fonts chữ cho trang web của bạn.
    *  **Models**: là thư mục chứa các models.
    *  **Script**: là thưc mục chứa các files **javascript**.
    *  **Views**: là thư mục chứa các files [**razor**](https://docs.microsoft.com/en-us/aspnet/web-pages/overview/getting-started/introducing-razor-syntax-c), ở ASP.NET MVC các files view sẽ là dạng file **.cshtml** chứ không phải ở dạng thuần html nữa, vì ở views bạn có thể gọi trực tiếp đến model để binding data trực tiếp trên đó. Mỗi thư mục trong views thì sẽ tương ứng với 1 controller và các files view trong đó là 1 action nằm trong controller đó. Ví dụ: trong views có thư mục Home tương ứng với nó có HomeController và có các files view như **About.cshtml**, **Contact.cshtml**, **Index.cshtml** thì tương ứng trong HomeController cũng có các action **About, Contact, Index**. Ở đây được hiểu là mối quan hệ **Dependency** tức là bạn muốn gọi đến trang **Index** của trong **Home** thì chắc chắn bạn phải có **Controller** là **Home** và action là **Index** ngược lại cũng vậy. Trong thư mục này có **thư mục Shared** chứa các views dùng chung như **_Layout.cshtml**  được coi như file khung tương tự như trang **Master Page** trong **Web Forms** để cho các views khác kế thừa và muốn các trang khác kế thừa được từ trang này thì chúng ta phải dùng đến file **_ViewStart.cshmlt** nếu không có file này thì ở mỗi file view bạn file thêm 1 đoạn code để có thể kế thừa từ files **_Layout.cshtml**, khi bạn gọi đến 1 trang không tồn tại hoặc có lỗi thì sẽ hiển thị ra trang **Error.cshtml**. 
     *  **ApplicationInsights.config**: là file cấu hình để bạn có thể theo dõi hiệu suất của ứng dụng web của bạn từ đó bạn có thể biện pháp thiết kế tốt nhất cho ứng dụng.
     *  **favicon.icon**: nếu bạn để ý trên tab của trìnhh duyệt khi bạn truy cập đến 1 trang web sẽ có icon và phần title của trang web, thì icon đó là dạng file **.icon** mà được cấu hình trong file **_Layout.cshtml**.
     *  **Global.asax**: là file cấu hình chung cho project.
     *  **packages.config**: là file quản lý các packages mà bạn đang sử dụng cho ứng dung và phiên bản sử dụng của các packages đó.
     *  **Web.config**: là file cấu hình cho ứng dụng web ở dạng xml. Cho phép thiết lập các thông số về bảo mật, kết nối, debug,... Là file cấu hình có ảnh hướng đến ứng dụng web của bạn trên môi trường Server.
        ![](https://images.viblo.asia/4fc9d26c-f662-4fe5-bc23-adeef92a7c23.PNG)
        
        


Hãy comment suy nghĩ của các bạn sau khi xem bài viết của mình để tạo động lực làm tiếp series về ASP.NET này. Ở bài sau mình sẽ có bài viết về EF Code First.

Cảm ơn các bạn đã quan tâm bài viết của mình!