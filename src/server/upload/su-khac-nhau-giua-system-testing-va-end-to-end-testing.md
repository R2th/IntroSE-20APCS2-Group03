# Tổng quan về System Testing và End-to-end testing
End-to-end testing và System testing luôn được thực hiện cùng nhau, tuy nhiên, ngay cả một Tester có kinh nghiệm cũng có thể nhần lẫn về những lợi ích to lớn mà mỗi loại kiểm thử mang lại và thường chỉ chọn một. Trong bài này, chúng ta sẽ cố gắng làm rõ giữa sự khác biệt giữa End-to-end testing và System testing. Trước tiên, để hiểu rõ về sự khác biệt giữa 2 loại kiểm thử này, chúng ta cần hiểu rõ về các giai đoạn kiểm thử mà khi phát triển bất kỳ một sản phẩm nào cũng đều phải trải qua.


![](https://images.viblo.asia/b0ff890d-df66-4c3e-99b3-852794974320.jpg)


Trong ngành công nghiệp phần mềm, chúng ta luôn luôn phải chọn lựa giữa việc phải release sớm sản phẩm hay release một sản phẩm phần mềm đạt chất lượng tốt. Nhưng chúng ta luôn cần sự cân bằng giữa hai yếu tố. Tất cả chúng ta đều mong đợi một sản phẩm phần mềm được release sớm nhưng đồng thời cũng phải đạt chất lượng tốt, để đạt được điều này là rất khó khăn.

## Các giai đoạn kiểm thử phần mềm


Vòng đời phát triển của phần mềm bắt đầu khi nhận được yêu cầu phần từ khách hàng. Team phát triển sẽ chịu trách nhiệm phân tích kỹ lưỡng yêu cầu & thiết kế đặc tả yêu cầu. Những yêu cầu đặc tả phần mềm sẽ giúp đội kỹ thuật và đội phát triển bắt đầu công việc phát triển phần mềm của họ. Các bước liên quan ở đây được giải thích dưới đây để bạn dễ hiểu.

**Step #1:**

Dựa vào mô tả sản phẩm ở mức high-level, sản phẩm phần mềm được phân chia thành các module khác nhau, tiếp đó thành các component hoặc thành các đơn vị. Những đơn vị này được phát triển độc lập, sau khi được phát triển, các đơn vị này sẽ được thực hiện kiểm thử riêng lẻ gọi là Unit Testing.


**Step #2:**


Sau khi đảm bảo tất cả các đơn vị được thực hiện như mọng đợi về mặt chức năng cũng như tính khả thi. Các components, modules hoặc sub-system được tích hợp lại với nhau và đượcc tiến hành Intergration testing.


**Step #3:** 

System Testing được thực hiện sau khi kiểm thử tích hợp được thực hiện lần đầu tiên trên môi trường giống như môi trường thực tế. Giai đoạn này được thực hiện để kiểm tra lại các chức năng và phi chức năng có đúng với yêu cầu nghiệp vụ đề ra hay không.


**Step #4:**


Đây là bước thực hiện kiểm thử được thực hiện bởi khách hàng. Giai đoạn này được thực hiện để chứng minh sản phẩm thoả mãn tất cả các yêu cầu của khách hàng và khách hàng chấp nhận sản phẩm.

![](https://images.viblo.asia/d628e202-fdf6-45fa-b855-5cd42c628c47.jpg)

## System testing là gì?

System testing được thực hiện sau giai đoạn Integration Testing & trước giai đoạn Acceptance Testing.
System testing được thực hiện để kiểm thử sự kết hợp giữa các components lại với nhau thành một hệ thống có đảm bảo đúng chất lượng sản phẩm theo yêu cầu đề ra hay không. Mục đích chính của System testing là bằng việc thực hiện các phương pháp kiểm thử chức năng và phi chức năng để phát hiện các defects tiềm ẩn bên trong phần mềm sau khi đã được tích hợp.

Kiểm thử phi chức năng được thực hiện để đảm bảo sản phẩm đang phát triển có thể đáp ứng được yêu cầu hay không. Chúng được thực hiện nhằm xác định thời gian phản hồi của một ứng dụng hoặc để kiểm tra tính tương thích hoặc xử lý cài đặt, hiệu suất, khả năng chịu tải, bảo mật,…

Do đó, một ứng dụng cần phải được thực hiện kiểm thử cả chức năng và phi chức năng để đảm bảo đạt tiêu chuẩn chất lượng để có thể đưa ra thị trường. 

![](https://images.viblo.asia/90194ab7-1f12-49f5-be26-aa470e85b710.jpg)


## Tầm quan trọng của System Testing

System testing là giai đoạn bắt buộc phải thực hiện trước khi sang giai đoạn tiếp theo. Dưới đây là một vài yêu cầu cần phải thực hiện kiểm tra trong giai đoạn này:

*  Cần đảm bảo hoạt động của phần mềm là một khối thống nhất .
*  Cần kiểm tra xem sản phẩm không bỏ qua bất kỳ yêu cầu về chức năng cũng như phi chức năng.
*  Cần thực hiện kiểm tra sản phẩm trên môi trường giống như môi trường thực tế của sản phẩm.
*  Cần thực hiện kiểm tra sản phẩm với dữ liệu giống như dữ liệu thực tế của sản phẩm.

System Testing bao gồm các scenarios dựa trên use cases hoặc các mô tả ở mức high-level về hành vi của sản phẩm. Các trường hợp liên quan đến tương tác với tài nguyên hệ thống cũng là một phần của system testing.

Do đó, system testing nên được thực hiện bởi những người có hiểu biết rõ về sản phẩm cả ở mức độ kiến trúc hệ thống cũng như về nghiệp vụ của sản phẩm. Kiến thức về việc coding là không yêu cầu ở giai đoạn này nhưng kiến thức về hệ thống là bắt buộc đối với một Tester.

## System testing được bắt đầu thực hiện khi nào?

* Unit testing là được thực hiện xong cho tất cả các đơn vị mà không còn bất kì defects nào.
* Tất cả các component đã thực hiện unit test đượcc tích hợp lại  với nhau và được integration testing thành công.
* Môi trường giống như môi trường thực tế là sẵn sàng để thực hiện kiểm thử hệ thống sản phẩm.

## End-to-End Testing là gì?

Kiểm thử phần mềm là giai đoạn quan trọng để đảm bảo chất lượng phần mềm. Sản phẩm chất lượng tốt luôn mang đến sự hài lòng cao hơn cho cả người tạo ra sản phẩm và người dùng. Nói cách khác, một sản phẩm chất lượng là cố gắng loại bỏ defect ở mọi mức độ.
Thuật ngữ "End to End Testing" được định nghĩa như một phương pháp test nhằm xác định liệu việc thực hiện các ứng dụng có theo yêu cầu hay không. Nó được thực hiện từ đầu đến cuối theo các kịch bản như trong thế giới thực ví dụ như: thông tin liên lạc của các ứng dụng với phần cứng, mạng, cơ sở dữ liệu và các ứng dụng khác.

Lý do chính của việc thực hiện test này là để xác định sự phụ thuộc khác nhau của ứng dụng cũng như đảm bảo rằng thông tin chính xác được trao đổi giữa các thành phần khác nhau của hệ thống. Nó thường được thực hiện sau khi hoàn thành giai đoạn function test và system test của bất kỳ ứng dụng nào.

![](https://images.viblo.asia/a3d0f324-e779-4885-9aa3-4a418ea6ebd6.jpg)

## Tại sao End to End Testing lại quan trọng?

Mục đích chính của end-to-end testing bao gồm:
*  Đảm bảo sản phẩm được phát triển là phối hợp tốt với bất kỳ hệ thống con nào của nó.
*  Để kiểm tra tất cả luồng của hệ thống từ đầu đến cuối hệ thống.
*  Để xác thực các yêu cầu từ góc nhìn người dùng cuối.
*  Để xác định các vấn đề trong các môi trường không đồng nhất.

## Khi nào thực hiện End to End Testing?

End to End testing thường được thực hiện khi:

* Một sản phẩm đã đủ điều kiện kiểm thử hệ thống trong đó tất cả các chức năng đã được bao phủ.
* Khi môi trường phụ thuộc được xác định và có sẵn để tiến hành thực hiện theo flow.
* Khi Tester được trang bị kiến thức cần thiết và thử nghiệm hiện vật.
* Khi Tester có các công cụ thích hợp để phân tích luồng dữ liệu.

## Sự khác nhau giữa System Testing và End to End Testing

Dưới đây là một vài điểm khác biệt giữa System Testing và End to End Testing


| System Testing | End to End Testing |
| -------- | -------- | 
| Bảo đảm kiểm thử cả chức năng và phi chức năng của hệ thống    | Bao gồm cả việc kiểm thử giao diện xem xét tất cả các hệ thống nguồn & đích     | 
| Thực hiện sau khi đã hoàn thành kiêm thử tích hợp    | Thực hiện sau khi hoàn thành kiểm thử hệ thống cho bất kỳ sản phẩm phần mềm nào| 
| Tất cả các tính năng được thực hiện cho sản phẩm sẽ được xem xét kỹ lưỡng để khám phá các kết quả không mong muốn.    | Các luồng quy trình sẽ được kiểm tra cùng với front end & back end.| 
| Tester phải hiểu rõ chức năng của hệ thống     | Tester phải hiểu rõ về luồng dữ liệu và luồng nghiệp vụ của hệ thống   | 


## System Testing hay End-to-End Testing or Cả hai?

System Testing & End-to-End Testing thường được xem là giống nhau nhưng điều đó là không đúng. Chúng là 2 loại kiểm thử khác nhau với phạm vi test là khác nhau.
Trong khi End-to-End kiểm tra luông hoạt động từ đầu đến cuối hệ thống bao gồm tất cả các hệ thống phục thuộc, thì System Testing sẽ kiểm tra cùng một chức năng với tập hợp các bộ dữ liệu đầu vào khác nhau để đánh giá phản hồi. Do đó, phạm vi kiểm thử của hai loại này là khác nhau.

# Kết luận
Kiểm thử hệ thống cần phải có tư duy của người dùng thực tế trong khi người thực hiện end-to-end cần phải hiểu luồng thực hiện của hệ thống.
Như đã giải thích ở trên, cả 2 loại kiểm thử đều có tầm quan  trọng như nhau trong vòng đời phát triển sản phẩm, để nhằm phát hiện ra các defects khác nhau.
Hi vọng qua bài viết này các  bạn sẽ hiểu rõ về hai loại kiểm thử trên.

Nguồn: http://www.softwaretestinghelp.com/system-vs-end-to-end-testing/#comments