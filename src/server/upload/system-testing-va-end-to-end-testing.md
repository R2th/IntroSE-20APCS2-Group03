## 1. Tổng quan về System testing và End-to-End testing

End-to-End testing và System testing luôn đi đôi với nhau, nhưng ngay cả 1 chuyên gia kiểm thử có kinh nghiệm cũng có thể bị nhầm lẫn về những lợi ích to lớn mà mỗi loại mang lại.

![](https://images.viblo.asia/256510da-826f-4e15-83a5-2d14522719eb.jpg)

Trong bài viết này, chúng ta sẽ thử tranh luận giữa End-to-End testing và System testing. Để hiểu được sự khác biệt giữa chúng, trước tiên chúng ta sẽ tìm hiểu các giai đoạn khác nhau mà bất kỳ sản phẩm đang phát triển nào cũng trải qua.

Trong ngành công nghiệp phần mềm, chúng ta luôn trong tình huống khó xử khi lựa chọn giữa 1 faster release và 1 quality release nhưng luôn có sự cân bằng giữa chúng. Tất cả chúng ta đều mong đợi tốc độ cũng như chất lượng cùng một lúc, điều này khá là khó khăn.

## Qúa trình của 1 sản phẩm phần mềm được test

Vòng đời của một sản phẩm bắt đầu khi các yêu cầu business được lấy từ khách hàng. Nhóm có liên quan chịu trách nhiệm về nó sẽ thực hiện phân tích kỹ lưỡng về các đặc điểm kỹ thuật của thiết kế hiện tại và tương lai.

Những thông số kỹ thuật này sẽ giúp các kỹ thuật viên hoặc các developer bắt đầu công việc của họ trong phát triển phần mềm. Các bước liên quan ở đây được giải thích dưới đây để bạn dễ hiểu.

Bước 1: Dựa trên các đặc tả high-level của sản phẩm, một sản phẩm phần mềm được phân loại thành các module khác nhau và sau đó vào các component hoặc unit. Các unit này được phát triển độc lập bởi vậy phát triển chúng có thể tiếp tục song song bằng cách thu hút nhiều developer.

Khi đã được phát triển, những unit này được test riêng lẻ.

Bước 2: Đảm bảo rằng tất cả các unit của một hệ thống đang hoạt động như mong đợi dựa trên các funtion cũng như các cơ sở có tính khả thi. Các component, mô-đun hoặc sub-system này được tích hợp với cấp độ tiếp theo và sau đó được test như một unit tích hợp trong integration testing.

Bước 3: System testing sẽ được thực hiện trong bước này, nơi mà các sản phẩm đã tích hợp sẽ được test tổng thể lần đầu tiên trong một môi trường pseudo-production. Cấp độ test này được thực hiện để kiểm tra việc tuân thủ đối với các yêu cầu nghiêp vụ về function cũng như các non-function.
 
Bước 4: Đây là cấp độ test được thực hiện cho sự chấp nhận của client và được gọi là Acceptance testing. Điều này sẽ được thực hiện ngay trước khi handling phần mềm tới các khách hàng, đó là môi trường production.

![](https://images.viblo.asia/0492df2a-31e5-4e45-abb4-866aac28e7cb.jpg)

## System testing là gì?

System testing được thực hiện ở liền sau Integration testing, và trước Acceptance testing của bất kỳ phần cứng hoặc phần mềm có sẵn nào.

System testing được thực hiện để phân tích sự sắp xếp của các thành phần đơn lẻ lại với nhau như một hệ thống để đảm bảo rằng nó có đáp ứng được các tiêu chuẩn chất lượng hay không. Trọng tâm chính là phát hiện các khiếm khuyết trong các nhóm bằng cách thực hiện các bài test functional và non-unctional trên các sản phẩm được tích hợp.

Các bài test non-functional được thực hiện để đảm bảo rằng các sản phẩm đang phát triển có phù hợp với các kỳ vọng business hay không. Chúng được thực hiện để xác định thời gian phản hồi của một ứng dụng hoặc để kiểm tra tính tương thích hoặc handling installation, performance, regression, khả năng mở rộng, bảo mật và một vài lĩnh vực khác.

Do đó, một ứng dụng cần phải rõ ràng cả cấp độ functional và non-functional để đảm bảo nếu nó đạt các tiêu chí hay nó có thể làm mất uy tín của công ty.

![](https://images.viblo.asia/01af777e-382b-4420-99eb-ae43e7e51503.jpg)

Chúng ta có thể lấy ví dụ về một ứng dụng di động đặt taxi như Uber:

Uber cung cấp sự tiện lợi của việc đặt xe taxi trực tuyến và nó có các mô-đun khác nhau như theo dõi vị trí, cổng thanh toán, giá vé taxi và hồ sơ tài xế cái mà có thể được kiểm tra độc lập như một phần của Unit testing.

Một khi các mô-đun này hoạt động độc lập, chúng được tích hợp để test và đảm bảo nếu chúng đang làm việc với nhau trong Integration testing.

Hơn nữa, những yêu cầu của khách hàng sẽ bắt đầu được xác nhận trong System testing như nào nếu khách hàng có thể tìm thấy taxi gần nhất với vị trí của mình hoặc nếu họ có thể thanh toán cho Uber bằng cách chọn phương thức thanh toán, v.v.

Việc xác thực các kịch bản này được bao gồm trong System testing.

## Tại sao System testing lại quan trọng?

System testing được yêu cầu khi các developer / tester cần kiểm tra một số khía cạnh trước khi chuyển sang cấp độ tiếp theo.

Một vài khía cạnh bao gồm:

* Cần phải chắc chắn về hoạt động của phần mềm như một unit.

* Cần kiểm tra xem sản phẩm có bỏ qua bất kỳ các yêu cầu function và non-function nào không.

* Cần kiểm tra sản phẩm trong môi trường giống như production.

* Cần kiểm tra sản phẩm với dữ liệu giống như production.
    
System testing bao gồm các tình huống dựa trên các rủi ro của các business, các case sử dụng hoặc đặc tả high-level  về hành vi của các sản phẩm. Các trường hợp liên quan đến tương tác với các tài nguyên hệ thống khác nhau cũng là một phần của System testing.

Do đó, nó cần được quản lý bởi người có kiến thức hoàn chỉnh về các sản phẩm được yêu cầu cả về architecture-level cũng như business level. Kiến thức coding level là không cần thiết nhưng kiến thức hệ thống là bắt buộc đối với tester.

Nói chung, một nhóm riêng biệt sẽ được chỉ định với các tác vụ của System testing và nhóm sẽ thiết kế các test-plan và các test case của hệ thống của riêng họ, sẽ khác với các trường hợp được thực hiện trước đó trong phạm vi test. Nếu được yêu cầu, nhiều bước lặp của System testing có thể được thực hiện trong một số môi trường.

## Khi nào kick off System testing?

System testing có thể được kick off khi:

* Unit testing đã được close cho tất cả các unit mà không có bất kỳ open defect nào.

* Tất cả các thành phần của unit-tested được tích hợp tốt và integration testing đã được thực hiện thành công.

*  Một môi trường pseudo-production là có sẵn để test các system product.

* System Tester cho phép tất cả in / out của hệ thống và sẵn sàng với các tạo phẩm test.
    
## End-to-End testing là gì?

Test 1 phần mềm là một phần quan trọng của đảm bảo chất lượng phần mềm. Một sản phẩm chất lượng tốt luôn mang lại mức độ hài lòng cao hơn cho cả người tạo ra nó cũng như người mua. Nói cách khác, một sản phẩm cao cấp hoặc đủ điều kiện là kết quả của sự hồi quy triệt để và loại bỏ khiếm khuyết ở mọi cấp độ.

Như được giải thích bởi chính tên của nó, End-to-End testing là một trong các cấp độ test nơi mà 1 luồng ứng dụng được test cùng với các hệ thống phụ. Điều này được thực hiện để đảm bảo tương tác mượt mà với các ứng dụng backend và Front-End như các cơ sở dữ liệu hoặc GUI sử dụng các network channel và do đó cũng được gọi là Chain testing.

End-to-End testing thường được thực hiện khi các sản phẩm vượt qua system tesing.

Tiếp tục Ví dụ của chúng ta về Uber trong giai đoạn End-to-End testing, chúng ta sẽ xác thực hoàn chỉnh các hành trình của khách hàng.

![](https://images.viblo.asia/6c1d43c7-b7df-4955-8e0d-bd7efaed3fd3.jpg)

Mở ứng dụng trên điện thoại di động của người dùng -> tìm 1 taxi cho điểm đến -> Theo dõi taxi trước hoặc trong chuyến đi-> hoàn thành chuyến đi và thanh toán bằng một trong các tùy chọn thanh toán -> cuối cùng credit setting được chuyển vào tài khoản của tài xế.

Trải qua luồng End-to-End này để đảm bảo rằng khách hàng có thể đáp ứng nhu cầu của họ. Bài test này là quan trọng để xác định các vấn đề trải nghiệm của khách hàng đặc biệt liên quan đến nhiều hệ thống với nhau.

## Tại sao End to End testing lại quan trọng?

End-to-End testing đóng một vai trò quan trọng khi sản phẩm được phát triển cần phải là một hệ thống phân tán và được yêu cầu hoạt động chung với các hệ thống khác trong các môi trường khác nhau. Trong các trường hợp như vậy, 1 sự kiểm tra 360 độ được yêu cầu để đảm bảo tương tác chính xác trên các nền tảng và môi trường khác nhau.
Mục tiêu chính của End-to-End testing bao gồm:
* Để đảm bảo rằng các sản phẩm được phát triển được phối hợp tốt với bất kỳ sub-system nào của nó, có thể hoặc không được sở hữu bởi chúng ta.

* Để kiểm tra tất cả các luồng hệ thống từ các hệ thống nguồn đến các hệ thống đích.

* Để xác nhận các yêu cầu từ phối cảnh của end-user.

* Để xác định các vấn đề trong các môi trường không đồng nhất.

Nếu được yêu cầu, các bài test lặp lại nên được tiến hành để kiểm tra tình trạng của các ứng dụng. Đôi khi, tình huống có thể phát sinh khi chúng ta thấy 1 sự xung đột giữa developer và tester trên cơ sở hiểu được các vùngc ứng dụng bị ảnh hưởng do những thay đổi nhỏ về code.

Các developer có thể nghĩ rằng sự thay đổi là tối thiểu nhưng sự phát triển đó khá quan trọng để tái thực hiện các kịch bản End-to-End test cho một hệ thống hoàn chỉnh. Tuy nhiên, điều này có thể đẩy ngày bàn giao sản phẩm và có thể tăng chi phí.

## Khi nào kick off End-to-End testing?

End-to-End testing thường được thực hiện

* Khi sản phẩm vượt qua System testing trong đó tất cả các khía cạnh function đều được đề cập đến.

* Khi các môi trường phụ thuộc được xác định và có sẵn để quản lý các thực thi của mức lưu lượng.

* Khi một người tester được trang bị kiến thức cần thiết.

* Khi người các tester có các công cụ thích hợp có thể phân tích luồng dữ liệu.
    
Sự khác biệt giữa System testing và End-to-End testing

Đưa ra dưới đây là một vài khác biệt giữa System testing và End-to-End testing:


| System Testing | End-to-End Testing |
| -------- | -------- | 
| Sản phẩm được test dựa trên các yêu cầu kỹ thuật cụ thể của các sản phẩm được xác định dựa trên các yêu cầu business.     | Sản phẩm được test cùng với các hệ thống phụ thuộc theo mỗi yêu cầu business.     | 
| Bao gồm các khía cạnh functional cũng như non-functional của việc test.     | Bao gồm các cấp độ giao diện của việc test xem xét tất cả các hệ thống nguồn và đích.     | 
| Thực hiện theo hướng kết thúc vòng đời phát triển phần mềm.     | Thực hiện khi sản phẩm đủ điều kiện Integration testing.     | 
| Tất cả các tính năng được triển khai cho sản phẩm sẽ được xem xét kỹ lưỡng để phát hiện các kết quả không mong muốn.     | Các luồng xử lý sẽ được kiểm tra cùng với các hệ thống front end và backend & middle-tier.    | 
| Tester nên có sự hiểu biết sâu sắc về funtional của sản phẩm được phát triển.     | Tester nên hiểu rõ về các luồng dữ liệu và luồng công việc trong hệ thống.     | 
| Tester của hệ thống không cần quan tâm đến các giai đoạn của vòng đời phát triển sản phẩm.     | End-to-end tester cần hiểu tất cả các giai đoạn.     | 

## System tesing hay end-to-end testing hay cả hai?

Thông thường System testing và End-to-End testing được coi là giống nhau nhưng điều đó không đúng. Cả hai đều là các dạng thử nghiệm khác nhau với phạm vi test khác nhau.

Trong khi End-to-End testing kiểm tra 1 luồng của các hoạt động từ đầu đến cuối hệ thống bao gồm tất cả các hệ thống phụ, System testing sẽ kiểm tra các chức năng giống nhau với một bộ đầu vào khác nhau để đánh giá phản hồi.

Do đó, phạm vi kiểm tra cho cả hai loại test sẽ khác nhau.

## Kết luận

1 System tester cần phải có suy nghĩ của người dùng thực trong khi 1 End-to-End tester cần phải hiểu cả các hệ thống upstream và downstream.

Như đã giải thích ở trên, cả hai loại test đều có tầm quan trọng như nhau trong chu kỳ phát triển sản phẩm và do đó, các khuyết điểm của các loại là khác nhau.

Tham Khảo: [http://www.softwaretestinghelp.com/system-vs-end-to-end-testing/](http://www.softwaretestinghelp.com/system-vs-end-to-end-testing/)