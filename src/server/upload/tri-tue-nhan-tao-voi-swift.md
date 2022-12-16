Khi chúng ta nói về AI và Swift, Mọi người cơ bản đều đặt ra câu hỏi "Tại sao không phải là Python ?" 

**Swift** không chỉ là một ngôn ngữ lập trình cơ bản mà mục đích sinh ra còn sùng để phục vụ khoa học dữ liệu được phát triển từ Apple . Nó được thiết kế để tạo ra một ngôn ngữ mạnh mẽ, đơn giản, dễ học, an toàn, có thể tương tác, phù hợp từ lập trình cấp thấp đến bậc cao. Swift  ngày càng là một ngôn ngữ phổ biến với ước tính hơn một triệu lập trình viên hiện đang sử dụng nó.  Swift chiếm ưu thế trong sự phát triển của Apple Apple iOS, macOS, tvOS và watchOS.  Swift có nhiều đặc tính tuyệt vời , đây là một lựa chọn tuyệt vời để học cách phát triển phần mềm và giải quyết các vấn đề cuộc sống bao gồm:
* Design
* Teachability
* Productive
* Safety
* Performance
* Deployment/Runtime

## Why AI?
Mặc dù nhiều người coi Swift là ngôn ngữ sinh ra để sử dụng trong hệ sinh thái Apple và đặc biệt chỉ dành cho phát triển ứng dụng. Nhưng đó là một sự sai lầm Swift đã phát triển thành một ngôn ngữ hiện đại mạnh mẽ và mạnh mẽ với một bộ tính năng mở rộng cho việc thực hiện học máy và education. Apple đã phát hành hai công cụ chính trong những năm gần đây :
* CoreML  : Một framework và kiểu định dạng mô hình tương ứng sử dụng các mô hình được đào tạo sẵn tiện lợi và hiệu quả cao. Hiện tại đang là phiên bản thứ hai, các tính năng đang được tập trung vào vision và các ứng dụng xử lý  ngôn ngữ tự nhiên.

* CreateML: Một framework và một ứng dụng được thiết kế để tạo và đánh giá các mô hình CoreML. CreateML giúp cho quá trình tạo ra các mô hình đơn giản và trực quan.

CoreML và CreatML đều là các frameworks Swift cho phép bạn thực hiện mọi thứ với AI. Bạn có thể hiểu đơn giản CoreML là để sử dụng các mô hình và CreatML dành cho việc tạo các mô hình.
![](https://images.viblo.asia/4e875e67-f85a-4efe-9a69-d3181368a8c8.png)


## CoreML
![](https://images.viblo.asia/b1f23ff1-d3b3-448a-b4ae-5a18666c9315.png)
CoreML là framework để sử dụng các mô hình học máy trong các ứng dụng của bạn. CoreML được nhúng vào các ứng dụng qua ngôn ngữ Swift, để truy cập và sử dụng các mô hình học máy cung cấp các tính năng AI.

Cách tiếp cận chung cho học máy với CoreML cơ bản theo các bước: 
1.  Thêm mô hình vào dự án.
2.  Tải tệp mô hình trong ứng dụng của bạn. 
3.  Cung cấp đầu vào cần thiết cho mô hình để đưa ra dự đoán. 
4.  Sử dụng đầu ra dự đoán giải quyết bài toán cho ứng dụng

## CreateML
“CreateML” là bộ công cụ của Apple dựa trên Swift để tạo và đào tạo các mô hình học máy. Nó có hai thành phần chính: framework và ứng dụng . 
![](https://images.viblo.asia/facd9bad-aca2-49e1-bb18-e21eb8d031de.png)

CreatML làm cho quá trình train dữ liệu trở nên đơn giản nhất có thể bởi vì nó thậm chí còn phân chia dữ liệu đào tạo bạn cung cấp thành tập huấn luyện và tập xác thực.
![](https://images.viblo.asia/f1565ae8-0a54-46ed-bd85-946319c30249.png)

Ứng dụng CreatML hỗ trợ đào tạo các loại mô hình sau: 
* phân loại hình ảnh 
* phân loại âm thanh 
* phân loại đối tượng 
* phân loại hoạt động 
* phân loại văn bản

# Tổng kết
Phần trên mình đã giới thiệu về Core ML và CreateML framework tại sao nên kết hợp AI với Swift. Phần tiếp theo chúng ta sẽ đi sâu hơn tìm hiểu cách thức dùng CreateML để tạo mô hình của riêng mình và làm sao để ném vào cài đặt trên ứng dụng của bạn.