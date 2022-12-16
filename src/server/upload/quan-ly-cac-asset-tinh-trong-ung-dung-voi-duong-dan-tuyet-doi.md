![absolute](https://images.viblo.asia/b7ea8f2c-bbde-4dd8-a70a-4d4e2e9f5e47.png)
# Đường dẫn tuyệt đối và tương đối

React Native Packager có một số cách thú vị để quản lí image và docs tĩnh. Đây cũng là một cách tuyệt vời khi bắt đầu với các ứng dụng nhỏ. Tuy nhiên khi các dự án quy mô lớn lên,  các hệ thống phân cấp lồng nhau thì việc phát triển và tái cấu trúc trở nên cần thiết  để duy trì một clean code base. Đến lúc đó các local assets requied qua đường dẫn tương đối sẽ trở thành cồng kềnh và khó theo kịp quy mô của app.

Hãy xem một cấu trúc cơ bản của một ứng dụng với một simple menu và các static image kèm theo nó:

```javascript
app  
   |--components
      |--img
         |--menu-icon@1x.ios.png
         |--menu-icon@1x.android.png
         |--profile-icon@1x.ios.png
         |--profile-icon@1x.android.png
         |--settings-icon@1x.ios.png
         |--settings-icon@1x.android.png
      |--menu.js
      |--menuStyles.js
```

Với các gợi ý trong doc của React Native các static image có thể được import trực tiếp vào trong source atribute của Image componet. Image componet sẽ nhìn giống thế này khi được import vào Image trong file menu.js.

```ruby
<Image source={require(‘./img/menu-icon.png’) />
```

Packager sẽ đơn giản là đi theo đường dẫn tương đối vào thư mục img và chọn image tương ứng và phù hợp với nền tảng(IOS hoặc Android) và mật độ điểm ảnh chính xác cho thiết bị đang chạy ứng dụng. Mô hình này sẽ phù hợp với giai đoạn đầu của dự án, nhưng có thể sẽ không còn phù hợp khi ứng dụng mở rộng quy mô vì một số lí do.

Đầu tiên, khi các ứng dụng lớn lên việc tổ chức các component thành các nhóm theo tính năng hoặc theo kiểu sẽ thuận tiện hơn. Khi bạn bắt đầu di chuyển các component và lồng chúng trong ứng dụng, các static assets giờ phải đi theo các component vì chúng phục vụ các component đó. Hoặc đường dẫn tương đối phải đượng cập nhật, nhưng tùy chọn thứ hai này làm cho cấu trúc của app thêm chút không ổn định. Mục đích chính của tái cấu trúc là tao ra trật tự, không phải làm nó bất ổn định.

Ngoài ra, nếu nhu cầu tái sử dụng các assets cho các component thứ 2 hoặc thứ 3 trở nên cần thiết. Bản sao của các assets phải được đi theo thành phần mới hoặc một lần nữa phải sử dụng đường dẫn tương đối tới một thư mục hoàn toàn khác so với lúc ban đầu. Cả 2 lựa chọn đều không hấp dẫn. 

May mắn thay, có một cách tốt hơn để quản lí các static assets với một thứ giống như một đường dẫn tuyệt đối. Hãy xem xét với cùng tính năng nhưng lần này một thư mục assets đã được đặt riêng và với cấu trúc lồng nhau nhiều hơn ở trên một chút. Nó là một ví dụ hơi khó hiểu một chút nhưng sẽ giúp bạn có được ý tưởng trong vấn đề ở bài viết này.

```javascript
app  
   |--assets
      |--img
         |--menu-icon@1x.ios.png
         |--menu-icon@1x.android.png
         |--profile-icon@1x.ios.png
         |--profile-icon@1x.android.png
         |--settings-icon@1x.ios.png
         |--settings-icon@1x.android.png
      |--images.js
      |--package.json
   |--components
      |--nav
         |--menu.js
```

Trong file image.js chúng ta chỉ đơn giản duy trì mỗi đối tượng có một tham chiếu duy nhất đến đường dẫn asset tương ứng.

```javascript
const images = {
	menuIcon: require(‘./img/menu-icon.png’),
	profileIcon: require(‘/img/profile-icon.png’),
	settingsIcon: require(‘./img/settings-icon.png’),
};


export default images;
```

Tất cả những gì cần thiết bây giờ là hiển thị các tham chiếu của chúng ta tới phần còn lại của ứng dụng. Điều này làm bằng cách thêm vào file package.json tên cho module mới. {"name": "@assets"}. Bây giờ bất cứ đâu chúng ta cần sử dụng một asset thì chúng ta có thể import thư mục image như một module và chỉ cần truy cập vào bất kì key nào mà chúng ta cần làm source của Image.

```javascript
Import Images from ‘@assets/images’;

<Image source={Images.menuIcon} />
```

Điều đạt được ở đây cho quá trình bảo trì code là rất giá trị. Vì các đường dẫn tương đối duy nhất mà chúng ta sử dụng nằm ở trong images.js nên chúng ta sẽ không bao giờ phải thay đổi. Ngay cả trong trường hợp thêm cấp lồng vào thư mục image, chỉ cần cập nhật một lần trong images.js và sự thay đổi này sẽ không ảnh hưởng đến tất cả các chỗ mà nó được import. Như một thành quả của việc này, các image component sẽ dễ đọc hơn và loại bỏ các local image folder vào trong một asset folder.

Chào tạm biết và chúc bạn tái cấu trúc đạt nhiều thành cộng!


# Nguồn tham khảo
[willowtreeapps](https://willowtreeapps.com/ideas/react-native-tips-and-tricks-2-0-managing-static-assets-with-absolute-paths/)