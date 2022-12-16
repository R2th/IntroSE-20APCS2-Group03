Trong bài trước mình có hướng dẫn cơ bản để cài đặt môi trường phát triển ứng dụng React Native. Tiếp theo với bài viết này, mình sẽ gửi tới mọi người một chút kiến thức khởi đầu với React Native. Đấy là **Core Component** và **Native Component** của React Native. Với những lập trình viên Javascript (React, Vue, ...) Component chắc hẳn là một khái niệm rất quen thuộc với chúng ta. Component giúp chúng ta tái sử dụng và lồng ghép những đoạn code tái sử dụng lại vào với nhau, và còn có nhiều lợi ích khác nữa. Vậy trong khi phát triển mobile với React Native có gì khác biệt so với khi chúng ta sử dụng Reactjs để phát triển Website: 
# 1 . Views

Khi phát triển website, chúng ta đã quá quen thuộc với thẻ ```<div>```, một thẻ giúp phân chia bố cục các phần trong trang web như header, body, footer rõ ràng và tiện lợi cho việc lên màu cho trang web. Còn với trong phát triển di động, chúng ta có view , một **view** được hiểu như  một thành phần cơ bản nhất để xây dựng một khối giao diện , kể cả một phần nhỏ nhất của màn hình giúp hiển thị chữ, màu hoặc phản hồi khi người dùng thao tác với màn hình. Bất kì một thành phần nào trên màn hình , kể cả rất nhỏ như button, ... đều là **view**. Và views có thể bao gồm các view khác bên trong. Tương tự như div. 
![image.png](https://images.viblo.asia/9c70490d-10e6-40dd-9a47-05925cae93a3.png)

# 2. Native Components: 

Với mỗi nền tảng như Android hay IOS, chúng ta đều có những ngôn ngữ riêng để phát triển. IOS không thể sử dụng code android để chạy được và chúng sẽ sử dụng ngôn ngữ khác nhau để xây dựng nên ứng dụng hay các views trong ứng dụng của riêng nền tảng đó. Nhưng với **React Native**, sau khi biên dịch các thành phần component sẽ được tương thích với từng nền tảng. Chúng ta gọi là native components. 
Ngoài ra React Native có  sẵn những thành phần thiết yếu nhất để phát triển ứng dụng, các **Core Components**, chúng ta cùng so sánh với các nền tảng như dưới:
# 3. Core Components:
| React Native Component      | Android view | IOS view      | web analog | Mô tả      |
| ----------- | ----------- |----------- |----------- |----------- |
| <View>	      | <ViewGroup>	       | <UIView>	       | A non-scrollling <div>	       | Một khối để phân chia giao diện, chứa các thành phần khác  có thể xử lý cảm ứng, ... điều khiển trợ năng       |
| <Text>	   | <TextView>	        | <UITextView>	       | <p>	       | Hiển thị văn bản, kiểu văn bản, cũng có thể xử lý sự kiện cảm ứng       |
| <Image>	   | <ImageView>	        | <UIImageView>	       | <img>	       | Hiển thị  ảnh với các định dạng khác nhau       |
| <ScrollView>   | <ScrollView>	        | <UIScrollView>	       | <div>       | Tương tự View nhưng có thể thao tác scroll        |
| <TextInput>	   | <EditText>	        | <UITextField>       | <input type="text">	       | Cho phép người dùng nhập ký tự vào       |
    
![](https://images.viblo.asia/6e28129b-94e0-4773-8bda-cf6b279263eb.gif)


Ngoài ra chúng ta còn có các core component khác, chi tiết xem trong trang https://reactnative.dev/docs/components-and-apis  nhé.
    
 # 3. Tổng kết: 
   Với kiến thức non như cái lốp xe của mình. Bài viết hôm nay chỉ giới thiệu cơ bản về các thành phần, components của react native. Nếu có hứng thú mọi người hãy nhấn vào theo dõi và upvote cho mình nhé. Đừng quên để lại comment để mình cải thiện các bài viết. Cảm ơn mọi người và hẹn gặp lại !