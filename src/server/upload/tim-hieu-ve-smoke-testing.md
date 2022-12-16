## 1. Smoke testing là gì?
Smoke testing- Kiểm thử khói là một loại kiểm thử phần mềm thường được thực hiện trên các bản build  phần mềm ban đầu để đảm bảo rằng các chức năng quan trọng của phần mềm đang hoạt động một cách ổn định.
![](https://images.viblo.asia/20eb7fe0-9e4f-4eee-9d31-99c6726307df.png)<br>
*Smoke Testing*

Bản build phần mềm ban đầu là gì là gì? Xây dựng phần mềm là một quá trình trong đó mã nguồn được chuyển đổi thành dạng độc lập có thể chạy trên bất kỳ hệ thống nào. Luôn luôn có một rủi ro là bản build không hoạt động đúng với môi trường. Bởi vì các lý do như vấn đề cấu hình, vấn đề về mã nguồn, vấn đề hồi quy hoặc vấn đề môi trường kiểm thử. Vì vậy, một bản build phần mềm ban đầu phải cần được thực hiện smoke testing trước khi được chuyển sang các cấp độ kiểm thử khác. Quá trình smole testing nhắm vào tất cả các chức năng chính. Nếu các chức năng chính không hoạt động, hoặc các lỗi lớn vẫn chưa được sửa thì không có lý do gì để lãng phí thời gian vào việc thử nghiệm thêm ở các mức độ tiếp theo.
## 2. Khi nào thực hiện smoke testing?
![](https://images.viblo.asia/ead7a019-ae14-40ad-91bf-5949717cc589.png)<br>
*When do we do smoke testing*

Smoke testing thường được thực hiện bất cứ khi nào các chức năng mới của phần mềm được phát triển và tích hợp với bản build hiện có được triển khai trong môi trường QA / staging. Điều này đảm bảo rằng tất cả các chức năng quan trọng có hoạt động chính xác hay không. Nó được thực hiện bởi các nhà phát triển trong môi trường phát triển để đảm bảo tính chính xác của ứng dụng trước khi phát hành bản build chính thức cho QA. Sau khi bản dựng được gửi đến môi trường QA, smoke testing được thực hiện bởi các kỹ sư QA. Bất cứ khi nào có bản build mới, nhóm QA sẽ xác định chức năng chính trong ứng dụng để thực hiện smoke testing.<br>

Trong phương pháp kiểm thử này, nhóm phát triển triển khai bản build trong môi trường QA. Các tập hợp con của các trường hợp thử nghiệm được lấy, và sau đó người kiểm thửa chạy các trường hợp kiểm thử này trên bản build để kiểm tra hoạt động của các chức năng quan trọng.
Bất kỳ lỗi nào được phát hiện thì cần phản hồi lại nhóm phát triển để xử lý. Bất cứ khi nào có sự thay đổi trong bản build, chúng ta sẽ thực hiện smoke testing để đảm bảo sự ổn định của hệ thống trước khi thực hiện các bước kiểm thử tiếp theo.

## 3. Ai sẽ thực hiện smoke testing?
Sau khi bàn giao bản build ở trên môi trường QA, smoke testing sẽ được thực hiện bởi QA leader hoặc các kỹ sư kiểm thử phần mềm/ QA.  Bất cứ khi nào có bản build mới, QA team sẽ xác định các chức năng chính và bắt tay vào việc smoke testing.

Toàn bộ nhóm QA ngồi lại với nhau và thảo luận về các tính năng chính của phần mềm và smoke testing sẽ được thực hiện để tìm hiểu tình trạng của nó.

Nói tóm lại, thử nghiệm khói được thực hiện trong môi trường phát triển để đảm bảo rằng sản phẩm phần mềm đáp ứng đủ yêu cầu cần thiết tối thiểu cho các vòng kiểm thử tiếp theo.
## 4. Tại sao cần thực hiện smoke testing
Chỉ cần tưởng tượng một tình huống mà dự án của bạn có một nhóm kiểm thử bao gồm 5 thành viên.

Bây giờ khi bản build đã sẵn sàng, tất cả đều bắt đầu kiểm thử. Có thể có một tình huống là các thay đổi code dự kiến không có trong bản build này hoặc thậm chí một số chức năng chính bị lỗi nghiêm trọng.

Không biết thực tế này, tất cả 5 người kiểm thử bắt đầu test ứng dụng và nêu ra các lỗi mà họ tìm thấy. Nhưng vào cuối ngày, nhóm phát triển có thể quay lại nói, xin lỗi, đây không phải là bản build chuẩn hoặc nhóm QA có thể dừng kiểm thử và nói rằng có quá nhiều vấn đề.

Như vậy có nghĩa là 80 giờ làm việc đã bị mất một cách lãng phí. Ngoài ra nếu vấn đề được phát hiện sớm hơn, nhóm deverlop có thể đã bắt đầu làm việc với nó và cũng giải quyết nó sớm hơn.

Đây là lý do tại sao chúng ta cần phải thực hiện một thử nghiệm khói, trước khi bắt tay vào một chu kỳ kiểm thử chính thức

Smoke testing đóng vai trò quan trọng trong phát triển phần mềm vì nó đảm bảo tính chính xác của hệ thống trong các giai đoạn ban đầu. Bằng cách này, chúng ta có thể tiết kiệm effort kiểm thử về sau. Do đó, smoke testing mang lại một hệ thống có trạng thái tốt về mặt cơ bản. Chỉ khi hoàn thành smoke testing thì mới bắt đầu kiểm thử chức năng.

* Smoke testing được thực hiện sau khi bản build được phát hành cho QA. Với sự trợ giúp của smoke testing, hầu hết các lỗi được xác định sớm ở giai đoạn đầu phát triển phần mềm.
* Với smoke testing, chúng ta sẽ đơn giản hóa việc phát hiện và sửa chữa các lỗi lớn.
* Bằng cách smoke testing, team QA có thể tìm thấy các lỗi đối với chức năng ứng dụng có thể đã phát sinh bởi code mới.
* Smoke testing giúp tìm thấy các lỗi nghiêm trọng.
Ví dụ 1: Cửa sổ đăng nhập: Có thể di chuyển sang cửa sổ tiếp theo với tên người dùng và mật khẩu hợp lệ khi nhấp vào nút gửi.
## 5. Thực hiện smoke testing như thế nào?

### 5.1 Smoke testing cycle
![](https://images.viblo.asia/74ec1c22-395d-4384-bc57-e4d2d7fc249b.png)
*Smoke testing cycle*

Dưới đây biểu đồ scenarios  cho thấy cách smoke testing được thực hiện. Khi quá trình xây dựng được triển khai trong QA và smoke testing thành công, chúng ta tiến hành kiểm thử chức năng. Nếu smoke testing thất bại, chúng ta thoát khỏi chu trình kiểm thử smoke testing cho đến khi sự cố trong bản dựng được khắc phục.

### 5.2 Các kịch bản cần được đưa vào như là một phần của smoke testing:

1. **Xác minh bản dựng:** Bước đầu tiên và quan trọng nhất trong smoke testing là xác minh bản dựng, số bản dựng và tính khả dụng của môi trường test. Toàn bộ nỗ lực kiểm thử sẽ bị lãng phí nếu xây dựng không đúng môi trường.

1. **Tạo tài khoản**: Nếu ứng dụng của bạn liên quan đến việc tạo tài khoản người dùng, thì bạn nên thử tạo một người dùng mới và kiểm tra xem hệ thống có thành công cho phép bạn làm điều đó không. Đây là một điểm quan trọng bị bỏ lỡ nhiều lần vì người kiểm tra tiếp tục sử dụng thông tin đăng nhập cũ mà không kiểm tra cho người dùng mới.

3. **Đăng nhập Đăng xuất**: Bạn nên thử đăng nhập thành công với thông tin đăng nhập cũ và mới được tạo. Ngoài ra, xác minh rằng bạn có thể đăng xuất thành công khỏi hệ thống mà không có bất kỳ lỗi nào.
4. **Tính năng quan trọng trong business cửa dự án**: Điều này rất quan trọng. Đối với tất cả các tính năng chính hoặc quan trọng trong kinh doanh, chúng ta nên thực hiện kiểm thử cơ bản để đảm bảo rằng các chức năng được sử dụng phổ biến nhất không bị lỗi.
5. **Kịch bản tích hợp**: Đây là phần quan trọng nhất của smoke testing. Hiệu quả của phần này phụ thuộc vào sự hiểu biết về tích hợp hệ thống của người kiểm thử.

**Ví dụ:** nếu người kiểm thử biết rằng có một số dữ liệu liên quan từ hệ thống A sang hệ thống B, thì phải biến nó thành một điểm để kiểm tra xem đó là một phần của smoke testing. Điều này cũng được thực hiện để đảm bảo rằng hệ thống không bị lỗi trong bất kỳ điểm tích hợp nào.

6. **Thêm / Chỉnh sửa / Xóa**: Dữ liệu luôn được lưu trong cơ sở dữ liệu. Ba thao tác cơ bản trong cơ sở dữ liệu được thêm vào bản ghi, chỉnh sửa bản ghi và xóa bản ghi. Vì vậy, để đảm bảo kết nối cơ sở dữ liệu phù hợp, là một phần của smoke testing, người kiểm thử phải cố gắng tạo, chỉnh sửa và xóa một mục nhập có thể áp dụng trong hệ thống đang kiểm tra.

7. **Điều hướng tổng thể**: Phần cuối cùng là điều hướng tổng thể. Đó là một trong những ứng dụng nên được thông qua để thực hiện các chức năng và trang được sử dụng thường xuyên để đảm bảo tất cả các điều hướng đang hoạt động như mong đợi.

### 5.3 Thực hiện smoke testing như thế nào?
### 5.3.1 Manual testing

Thông thường, smoke testing được thực hiện thủ công để xác minh điều hướng đang diễn ra suôn sẻ mà không có bất kỳ cản trở nào đối với chức năng.

Khi quá trình xây dựng phần mềm hoàn tất, nó sẽ chuyển đến QA để thực hiện kiểm thử các chức năng quan trọng. Nếu nó không thành công, phần mềm sẽ được gửi lại nhóm phát triển để có thể thực hiện các chỉnh sửa cần thiết cho phần mềm.

Sau khi được cải thiện, phần mềm sẽ được thực hiện lại smoke testing và sẽ được so sánh với bản dựng cũ.

### 5.3.2 Automation testing

Khi thời gian ít hơn và bản dựng mới đã sẵn sàng để triển khai, automation testing có thể được sử dụng để thực hiện smoke testing.

Kiểm thử tự động được sử dụng để kiểm thử hồi quy. Tuy nhiên, chúng ta cũng có thể sử dụng một bộ các trường hợp kiểm tra tự động để chạy với smoke testing. Với sự trợ giúp của công  cụ kiểm thử tự động, các nhà phát triển có thể kiểm tra bản build ngay lập tức, bất cứ khi nào có bản bild mới sẵn sàng để triển khai.

Thay vì kiểm tra lặp lại thủ công bất cứ khi nào bản build phần mềm mới được triển khai, các trường hợp kiểm thử khói được thực hiện đối với bản build mới. Nó xác minh xem các chức năng chính vẫn hoạt động đúng. Nếu kiểm thử thất bại, sau đó họ có thể sửa bản build và triển khai lại bản build mới ngay lập tức. Bằng cách này, chúng ta có thể tiết kiệm thời gian và đảm bảo xây dựng chất lượng cho môi trường QA.

### 5.3.3 How to Run Smoke Testing?
1. **Chuẩn bị** - Chuẩn bị một trạng thái tốt cho mọi thứ cần thiết trước khi kiểm thử, chẳng hạn như sao chép tệp, thiết lập máy chủ, cài đặt giấy phép, v.v.

1. **Hoàn thành chuẩn bị các tài liệu cần thiết** - Đảm bảo rằng tất cả các tệp cần thiết được yêu cầu để chạy smoke testing  đều có sẵn ở chỗ bạn.

1. **Script test** - Đảm bảo rằng bạn sử dụng một tập lệnh duy nhất để chạy kiểm thử. Khi tập lệnh được thực thi, hãy đảm bảo rằng báo cáo đã được lưu để nếu quá trình xây dựng thất bại, nó có thể được dùng để làm kết quả báo cáo cho bên phát triển.

1. **Đảm bảo môi trường test chuẩn** - Dừng máy chủ, xóa tệp hoặc thậm chí làm trống các bảng cơ sở dữ liệu, v.v. Đảm bảo rằng tất cả các bước cần thiết đã được thực hiện để đảm bảo kiểm thử được chạy trên môi trường sạch.
## 6. Lợi thế khi thực hiện smoke testing
**Đây là một vài lợi thế khi thực hiện smoke testing:**

* Giúp tìm ra lỗi sớm hơn trong vòng đời sản phẩm.
* Tiết kiệm thời gian của người kiểm tra bằng cách tránh kiểm tra bản dựng không ổn định hoặc sai
* Cung cấp sự tự tin cho người thử nghiệm để tiến hành thử nghiệm
* Giúp tìm các vấn đề tích hợp nhanh hơn
* Khiếm khuyết nghiêm trọng có thể được tìm ra
* Phát hiện và cải chính sẽ là một quá trình dễ dàng
* Việc xây dựng không ổn định là một quả bom hẹn giờ. Kiểm tra khói khuếch tán nó
* Có thể được thực hiện trong vòng vài phút
* Vì việc thực hiện diễn ra nhanh chóng, nên sẽ có phản hồi nhanh hơn
* Bảo mật, chính sách bảo mật, hiệu suất, vv cũng có thể được kiểm tra

**Điều gì xảy ra nếu chúng ta không thực hiện smoke testing:**

Nếu chúng ta không thực hiện smoke testing ở giai đoạn đầu, các khiếm khuyết có thể gặp phải ở các giai đoạn sau, nơi nó có thể có hiệu quả về chi phí. Và khiếm khuyết được tìm thấy trong các giai đoạn sau có thể là các nút chặn hiển thị nơi nó có thể ảnh hưởng đến việc phát hành các sản phẩm giao.


## Kết luận

Trong Kỹ thuật phần mềm, smoke testing nên được thực hiện trên mỗi bản dựng mà không thất bại vì nó giúp tìm ra lỗi trong giai đoạn đầu. Hoạt động smoke testing là bước cuối cùng trước khi xây dựng phần mềm bước vào giai đoạn hệ thống.

Trước khi thực hiện smoke tesing, nhóm QA phải đảm bảo phiên bản xây dựng chính xác của ứng dụng đang được thử nghiệm. Đây là một quy trình đơn giản, cần một thời gian tối thiểu để kiểm tra tính ổn định của ứng dụng.

Smoke tesing có thể giảm thiểu nỗ lực kiểm thử và có thể cải thiện chất lượng của ứng dụng. Smoke testing có thể được thực hiện bằng tay hoặc bằng cách tự động hóa tùy thuộc vào khách hàng và tổ chức.

**Tham khảo:**<br>
https://www.testbytes.net/blog/smoke-testing-explanation-example/#2
https://www.edureka.co/blog/what-is-smoke-testing/