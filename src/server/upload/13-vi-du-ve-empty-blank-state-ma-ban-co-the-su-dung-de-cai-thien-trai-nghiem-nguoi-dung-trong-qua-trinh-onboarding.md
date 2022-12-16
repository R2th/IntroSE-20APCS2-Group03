Đã có bao giờ bạn đăng ký tài khoản của một sản phẩm mới và sau khi đăng nhập vào, bạn cảm thấy thật bối rối do không biết phải làm gì tiếp theo vì trước mắt bạn là một màn hình trắng toác, hoàn toàn không có bất kì dữ liệu hay hướng dẫn nào ngoại trừ thanh điều hướng, menu.
**Empty state** là tên gọi dành cho màn hình không có bất kỳ hoạt động, lịch sử hoặc dữ liệu nào vì đó là lần tương tác đầu tiên của người dùng với sản phẩm.

> Khi thiết kế Empty state, đầu tiên tôi cố gắng đưa ra một danh sách các tình huống và personas. Điều quan trọng là phải hiểu những gì người dùng có khả năng muốn làm đầu tiên khi họ đăng nhập vào một ứng dụng hoặc trang web mới. Nếu bạn có dữ liệu để chuẩn bị cho các tình huống đó hoặc nếu người dùng cần thực hiện một số bước cần thiết - như thiết lập hồ sơ tài khoản - thì thật tuyệt. Sau đó, có thể bắt đầu tập trung vào thiết kế và nội dung. Tốt hơn hết là đưa ra quyết định dựa trên các dữ liệu thực tế. Nếu bạn không có nhiều dữ liệu - như khi thiết kế giao diện hoặc sản phẩm hoàn toàn mới - hãy xem liệu bạn có thể tìm thấy dữ liệu từ các ứng dụng tương tự, các dự án trước đây hoặc các thử nghiệm khác không, sau đó thiết kế và viết lại nội dung cho phù hợp. Tôi tin rằng mục tiêu cuối là theo dõi việc sử dụng và điều chỉnh các Empty state đó để hướng dẫn người dùng sử dụng sản phẩm đúng cách. Empty state không phải là một thứ để "đặt đó và lãng quên". Chúng luôn cần được tinh chỉnh để đảm bảo luôn được cập nhật và phù hợp với hành vi của người dùng.
> Jon Phillips - UI designer, Developer @ UX Booth

Sau khi tác giả bài viết đã phân tích khoảng 100 sản phẩm SaaS của các cty khác nhau, và đúc kết ra được 13 ví dụ tiêu biểu đại diện cho 8 thể loại chính về Empty state dưới đây:
1. **Dashboard filled with default data**: Hubspot CRM, Acuity Scheduling
2. **Dashboard filled with sample data**: Trello, Helpscout
3. **Tutorial**: Mixpanel
4. **Call to action**: Campaign Monitor
5. **No blank state**: Kissmetrics
6. **Hybrid**: Basecamp, InvisionApp
7. **Empty dashboard**: Mailchimp, Fastspring
8. **Everything laid out**: Xero, TalentLMS

# 1. Dashboard filled with default data
Đây là dạng trang tổng quan được hiển thị bằng các dữ liệu mặc định để thể hiện một số tính năng của sản phẩm. Điều quan trọng cần lưu ý là các dữ liệu này cần phải bám sát thực tế với sản phẩm và người dùng thực sự có thể sử dụng nó ngay lập tức, không nên dùng các dữ liệu giả, vô nghĩa.
## Hubspot CRM
![](https://images.viblo.asia/9cc05690-3e13-4edb-94a3-786e74378956.png)

*Với Hubspot CRM, bạn nhận được 2 địa chỉ liên hệ mặc định từ Nhóm Hubspot. Bạn có thể viết thư cho họ, xem chi tiết của họ và thay đổi chúng giống như cách bạn làm với các liên hệ của chính mình.*

## Acuity Scheduling
![](https://images.viblo.asia/a17a58ef-7b4b-4d5d-b538-551c268c31c6.png)

*Đối với Acuity Scheduling, bạn sẽ tự động điền lịch trình của một tuần để giúp bạn hiểu cách mà bạn có thể tổ chức tuần làm việc của mình. Nó cho bạn thấy rằng bạn có thể lên lịch nghỉ trưa hoặc cài đặt lịch nghỉ ngơi cho bản thân vào cuối tuần.*

# 2. Dashboards filled with sample data
Dạng này rất giống với loại **Dashboard filled with default data** ở trên nhưng có một điểm khác biệt chính: bạn không có mục đích sử dụng thực tế nào đối với dữ liệu mẫu có sẵn. Bạn nhìn thấy nó trên ứng dụng, bạn hình dung nó hoạt động trông như thế nào, và sau đó bạn chỉ cần xóa nó và tiếp tục hành trình của mình.
## Trello
![](https://images.viblo.asia/2a74e00b-e28a-4170-b41c-4ef221d4d897.png)

*Trello đã tạo Bảng chào mừng cho bạn được điền sẵn các thẻ và một số hoạt động cho phép bạn hiểu cách hoạt động của hệ thống quản lý task của họ. Bạn có thể xóa toàn bộ bảng và tạo một bảng mới từ đầu.*

## Groove
![](https://images.viblo.asia/43d6396b-4ab9-49ae-8f17-e902f389e05a.png)

*Đối với phần mềm Groove, bạn sẽ nhận được một số thông báo mẫu từ nhóm Groove để cho bạn biết giao diện của nó khi khách hàng tạo một tickets issues.*

# 3. Tutorial
Đối với loại Empty state này, điều đầu tiên bạn thấy sau khi đăng nhập là video hướng dẫn hiển thị cho bạn biết thêm thông tin về các tính năng của ứng dụng.
## Mixpanel
![](https://images.viblo.asia/5c7a3e68-48df-4d9c-bbbb-08657340d98e.png)

*Trong Mixpanel, bạn sẽ thấy video về mọi tính năng của ứng dụng. Khi bạn đăng nhập lần đầu tiên, bạn sẽ được chuyển hướng đến menu "Segmentation". Mỗi video giải thích cách hoạt động của tính năng này và chỉ cho bạn cách bạn có thể sử dụng nó như thế nào.*

# 4. Call to action
Trên loại màn hình này, người dùng sẽ được nhắc các bước thực hiện hành động cần thiết để có thể sử dụng sản phẩm.
## CampaignMonitor
![](https://images.viblo.asia/b516de6b-d4e8-40dd-978a-cceffe2975aa.png)

*Đối với CampaignMonitor, điều này có nghĩa là bạn phải thiết lập chiến dịch đầu tiên. Bạn được chuyển hướng đến trang này, trang này sẽ nhắc bạn các bước để tiếp tục và bắt đầu tạo mới một chiến dịch.*

# 5. No Blank State
Loại ứng dụng này không cho phép bạn nhìn thấy màn hình tiếp theo trừ khi bạn thực hiện một hành động bắt buộc từ hệ thống.
## Kissmetrics
![](https://images.viblo.asia/fa2bfe93-62ac-40fa-ba2a-17042d4e24ff.png)
*Tương tự là vd về Kissmetrics. Trừ khi bạn cài đặt đoạn mã này trên trang web của mình, nếu không bạn sẽ không thể vượt qua màn hình này và xem bất kỳ tính năng nào khác trong ứng dụng.*

# 6. Hybrid
Là loại Empty state nửa nạc nửa mỡ, có thể kết hợp chung các phương thức đã kể ở trên.
## Basecamp
![](https://images.viblo.asia/772bd8cb-078c-4a7f-abd5-3c7e157ae479.png)
*Basecamp nằm trong một danh mục của riêng nó. Hai tùy chọn được hiển thị sau khi luồng giới thiệu cho người dùng mới hoàn tất và đi vào trang tổng quan bao gồm cả kiểu sample data và call to action.*

## InVision
![](https://images.viblo.asia/b00dccb1-3821-4cf1-83ea-0a804a7c6055.png)
*InVision mời gọi bạn với việc dùng Call to action để bắt đầu tạo một dự án. Ngoài ra nó cũng cung cấp cho bạn khả năng trải nghiệm thử thông qua một số mẫu của các dự án có sẵn (Default data).*

# 7. Empty dashboard
Đây là trạng thái mà người dùng nhìn thấy trang tổng quan của họ với các số liệu hoàn toàn mới bắt đầu từ số 0. Bạn phải thực hiện một hành động nào đó từ hệ thống để có thể sinh ra các kết quả dữ liệu khác.
## Mailchimp
![](https://images.viblo.asia/a7971e3e-8d77-47d3-998a-dfba3651a936.png)
*Đối với ứng dụng Mailchimp, điều này có nghĩa là bạn sẽ phải bắt đầu tạo một chiến dịch mới và trang tổng quan sẽ chỉ hiển thị dữ liệu sau khi chiến dịch đầu tiên được gửi đi.*
## FastSpring
![](https://images.viblo.asia/77415e54-40c4-488c-a547-24907ee04137.png)
*Điều này cũng tương tự đối với FastSpring. Mặc dù bạn chỉ mới tạo một tài khoản và chưa làm bất cứ điều gì, nhưng điều đầu tiên bạn sẽ nhận được là một số thông báo cảnh báo về những gì bị đang thiếu trong tài khoản của bạn trước khi sử dụng.*

# 8. Everything laid out
Chúng tôi cũng đã tìm thấy một số sản phẩm hiển thị mọi tính năng ngay sau khi bạn đăng ký xong. Có thể bạn sẽ cảm thấy ngột ngạt trước quá nhiều lựa chọn.
Điều này có thể sẽ mang lại trải nghiệm không tốt cho những người dùng phổ thông, nhưng đây cũng là một phương pháp có thể hoạt động trong trường hợp người dùng sẽ được đào tạo hoặc xem người khác thao tác trước khi sử dụng sản phẩm. (Sản phẩm nội bộ)
## Xero
![](https://images.viblo.asia/48e9f2d0-935c-4bc6-8eab-8359c95c602b.png)
*Đây là màn hình của Xero mà bạn truy cập sau khi đăng nhập lần đầu tiên. Đối với người dùng không quen lắm với bảng lương và kế toán, cảm giác đầu tiên có vẻ là hơi quá sức vì bạn không biết mình nên nhấp vào đâu trước.*
## TalentLMS
![](https://images.viblo.asia/b48b66d4-0bc6-43f8-a855-424a20ae3949.png)
*Điều này cũng xảy ra với TalentLMS. Mặc dù các tính năng được giải thích ngắn gọn nhưng tôi không chắc mình nên nhấp vào tùy chọn nào trước.*

# Kết bài
Sau khi xem các công ty SaaS ở trên đang xử lý Empty state của họ như thế nào, bước tiếp theo là quay lại ứng dụng mà bạn đang thiết kế và đưa ra lựa chọn phù hợp nhất với sản phẩm và người dùng của bạn. Lưu ý: không có cách nào là rập khuôn, trải nghiệm khách hàng là trên hết nên hãy sáng tạo hơn để tối ưu chúng.

Credit:
> https://www.innertrends.com/blog/blank-state-examples