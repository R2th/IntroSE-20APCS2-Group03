Nội dung chính trong bài viết này bao gồm các phần:
- :flipper: Giới thiệu về RobotFramework
- :writing_hand: Tại sao lại sử dụng RobotFramework
- :seedling: Cấu hình và cài đặt trên máy Windows
- :unlock: Tạo robot project đầu tiên

Hẳn khi đọc đến bài viết này, bạn đã hơn 1 lần được nghe hoặc tìm hiểu về RobotFramwork. Mình cũng thế, cũng nghe đến nhiều rồi nhưng để đi sâu tìm hiểu nó thì cần nhiều thời gian và công sức. Vì thế mình viết bài này để giúp mình cũng như bạn nào muốn bắt đầu với RobotFramework sẽ có cái nhìn tổng quan và chi tiết nhất về nó, bạn cũng có thể áp dụng luôn trong dự án của mình :smiley: 

### 1. Giới thiệu về RobotFramework

- RobotFramework là 1 framework tự động mã nguồn mở. Nó có thể được sử dụng cho kiểm thử tự động và tự động hóa quy trình làm việc (Viết tắt là RPA)

- Vì là công cụ mã nguồn mở nên framework này được sử dụng miễn phí khi sử dụng, nó có thể tích hợp dễ dàng với các công cụ để lập trình một cách mạnh mẽ và linh hoạt 

- Cú pháp sử dụng dễ dàng, sử dụng các từ khóa mà bất kỳ ai cũng có thể hiểu được. Dù bạn là developer hay tester thì việc sử dụng đều dễ dàng, chỉ cần bạn bỏ chút thời gian mỗi ngày 1-2h là có thể sử dụng được thôi à :smile:

- RobotFramework sẽ được sử dụng hiệu quả hơn bởi các thư viện được triển khai bằng ngôn ngữ lập trình Python hoặc Java :green_apple: 


### 2. Tại sao lại sử dụng RobotFramework
Vậy tại sao lại dùng nó, tóm tắt lại có 2 từ: CLEAR & EASY
- :eye:  CLEAR

RobotFramework có kiến trúc modul được mở rộng với các thư viện đi kèm và tự tạo

Dữ liệu được định nghĩa trong các file sử dụng cú pháp rõ ràng. 1 file chứa bộ tests case hoặc test suite, việc đặt các files vào thư mục sẽ tạo thành cấu trúc lồng nhau rất rõ ràng.

- :lips: EASY

Khi bắt đầu thực hiện, framwork sẽ phân tích dữ liệu đầu tiên. Sau đó nó sử dụng các từ khóa do thư viện cung cấp để tương tác với hệ thống. Các thư viện có thể giao tiếp trực tiếp với hệ thống hoặc sử dụng các công cụ khác làm trình điều khiển.

Khi run project hoặc thực thi từng task thì bạn sẽ nhận được 1 báo cáo gồm 3 files Output/Log/Report. Các files này cung cấp 1 cái nhìn tổng quan về test case/ test suite của bạn 


### 3. Cấu hình và cài đặt trên máy Windows
Cài đặt Python trên Windown :secret: 

* Đầu tiên Check xem máy tính của bạn đã được cài Python chưa?
Mở cmd trên máy tính và thực hiện command: `python --version`
![](https://images.viblo.asia/fb43a759-e6d2-4d7b-b2f2-d79c273da0c7.png)
Nếu bạn đã cài đặt Python thì sẽ hiển thị như ảnh trên
Nếu chưa cài đặt thì bạn thực hiện theo cách sau nhé:

**Step 1: Cài đặt Python**

Đầu tiên bạn truy cập link: https://www.python.org/downloads/ và download version mới nhất, sau khi tải về bạn chỉ cần chạy file .exe và cài đặt bình thường thôi :sweat_smile: 
Sau khi cài đặt xong, bạn thực hiện lại câu lệnh `python --version` trên cmd => nếu hiển thị version như ảnh trên thì bạn đã cài đặt thành công rồi :flushed: 

Kiểm tra xem máy đã cài đặt pip chưa: mở cmd và gõ câu lệnh: `pip --version`

**Step 2: Cài đặt và cấu hình Eclipse**

Mình search Google thấy khá nhiều bài viết về sử dụng RobotFrameWork trên RIDE.  Ngoài RIDE ra, bạn có thể thay thế bằng SublimeText, IntelliJ, Visual Studio hay Eclipse, ... 

Bài viết này của mình sẽ sử dụng Eclipse - đơn giản vì để tránh trùng lặp khi bạn search trên mạng và mình cũng thích dùng Eclipse hơn thôi  :smile: 

Bạn dùng trên công cụ nào cũng được vì cấu trúc của robot framework đều tương đương nhau thôi hehe

- Download Eclipse tại link https://www.eclipse.org/downloads/
Sau khi download bạn cũng chỉ cần chạy file .exe rồi cài đặt bình thường là được :herb: 

**Step 3: Cài đặt RED trên Eclipse**

Mở Eclipse >> Goto Help >> Eclipse Marketplace >> Search từ khóa RED và install là được :headphones: 

Để kiểm tra xem việc bạn cài RED Editor đã thành công hay chưa thì làm như sau: Mở Eclipse >> Goto Window >> Perspective >> Open Perspective >> Other...
![](https://images.viblo.asia/dd39b6f0-f723-4f85-9a54-ee578e6ce71f.png)

Ta thấy có Robot ở mục Other nghĩa là việc cài đặt đã thành công
Hoặc dùng câu lệnh `robot --version` trên cmd

**Step 4: Cài đặt RobotFramework**

Mở Eclipse >> Windows >> Preferences >> RobotFramework >> Installed RobotFramework :fishing_pole_and_fish: 


### 4. Tạo robot project đầu tiên :sunflower: 

Bây giờ hãy cùng mình tạo project robot đầu tiên nhé :flipper:, bạn tạo new project theo cách sau:

***Step 1 : Eclipse - Windows - Perspective - Open Perspective - Robot***

***Step 2 : New - Robot project***

Đặt tên cho project của bạn là RobotFW_Beginner
![](https://images.viblo.asia/f1622246-902d-4900-814d-dab10991cf6c.png)

Project tạo thành công sẽ có 2 thư mục mặc định là: Robot Standard libraries và Robot Referenced libraries

***Step 3 : Create new TestSuites***
- Tạo new folder có tên là test (là nơi chứa test case của bạn)
   Trong thư mục test tạo 1 file Test suite có đuôi .robot
   ![](https://images.viblo.asia/a29a7353-acb2-4983-9536-28d50ae32c81.png)
   
Bây giờ hãy thử 1 case đơn giản để thử xem có chạy được không nhé :lion: 
- Đặt tên test case là: MyFirstTest
- Thực hiện log ra text Hello World...
![](https://images.viblo.asia/654f5bc1-e185-4689-8a5d-3201b2894172.png)

- Run và kiểm tra kết quả >> Khi chạy xong Console sẽ xuất ra kết quả Test case là pass/fail, đồng thời kèm theo 3 link Output/Log/Report bạn có thể mở link và xem kết quả dễ dàng hơn của test case/ test suite vừa chạy :blush: 

![](https://images.viblo.asia/97e0d1bc-1f9c-4cc5-8e8f-53723b536c3b.gif)


**=>** Bạn thấy bài viết trên thế nào, khá đơn giản phải không :seedling: . Phần 2 mình sẽ viết về việc tích hợp Selenium với RobotFrameWork sẽ hay ho và thực tế hơn nhiều. Hy vọng bạn chú ý đón đọc :love_letter: 










Tham khảo:
http://anything2automate.over-blog.com/2018/06/robotframework-with-eclipse-for-beginner.html