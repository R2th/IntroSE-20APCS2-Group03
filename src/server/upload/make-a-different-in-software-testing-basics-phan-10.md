> **Phần 10 - System Testing and End-To-End Testing**

End-To-End Testing và System Testing luôn đi đôi với nhau, nhưng chúng dễ gây nhầm lẫn cho mỗi nhân viên kiểm thử.
Trong ngành công nghiệp phần mềm, chúng ta luôn trong tình huống khó xử khi lựa chọn giữa một phiên bản phát hành nhanh chóng hay một phiên bản phát hành chất lượng. Và tất cả chúng ta đều mong đợi tốc độ cũng như chất lượng cùng một lúc.
![](https://images.viblo.asia/7275d579-0000-4edd-8358-b191d1aea49c.png)

## System Testing là gì?


System testing là quá trình kiểm tra toàn bộ hệ thống, tất cả các mô-đun / chức năng đã hoàn chỉnh và tích hợp đầy đủ để xác minh xem hệ thống có hoạt động như mong đợi hay không. Được thực hiện sau Integration Testing, và trước khi Acceptance Testing của bất kỳ phần cứng hoặc phần mềm nào. Điều này đóng một vai trò quan trọng trong việc cung cấp một sản phẩm chất lượng cao.

System testing được thực hiện để phân tích sự phối hợp của các thành phần chức năng có mối quan hệ với nhau trong hệ thống để đảm bảo rằng nó đáp ứng các tiêu chuẩn chất lượng hay không. Cũng có thể là thử nghiệm hệ thống phần cứng và phần mềm tích hợp để xác minh rằng hệ thống đáp ứng các yêu cầu cụ thể của nó. Trọng tâm chính là phát hiện ra các lỗi bằng cách thực hiện kiểm thử chức năng và phi chức năng trên sản phẩm phần mềm đã được tích hợp.
![](https://images.viblo.asia/789d785e-ab70-474d-956e-6b4423aed457.jpg)
Kiểm thử phi chức năng được thực hiện để đảm bảo rằng sản phẩm đang phát triển có đáp ứng được các mong đợi của khách hàng hay không. Chúng được thực hiện để xác định thời gian phản hồi của ứng dụng hoặc kiểm tra tính tương thích hoặc cài đặt xử lý, hiệu suất, hồi quy, khả năng mở rộng,... Do đó, một ứng dụng cần phải rõ ràng trong cả kiểm thử chức năng và phi chức năng để đảm bảo chất lượng sản phẩm.

Nếu một ứng dụng có ba mô-đun A, B và C, thì việc kiểm thử được thực hiện bằng cách kết hợp các mô-đun A & B hoặc mô-đun B & C hoặc mô-đun A & C được gọi là kiểm thử tích hợp. Tích hợp tất cả ba mô-đun và kiểm thử nó như một hệ thống hoàn chỉnh được gọi là kiểm thử hệ thống.

Thông thường 1 sản phẩm phần mềm chỉ được test trên 1 vì môi trường demo, nhưng kiểm thử hệ thống đảm bảo cho hệ thống vận hành trên nhiều môi trường khác nhau hay tích hợp với nhiều phần mềm và hệ thống khác nhau.

### Tại sao System Testing là quan trọng?

System Testing là bắt buộc khi lập trình viên/ nhân viên kiểm thử cần kiểm tra một số khía cạnh trước khi chuyển sang cấp độ kiểm thử tiếp theo.

Vài khía cạnh bao gồm:
* Cần đảm bảo hoạt động của cả phần mềm giống như mỗi chức năng trong nó.
* Cần kiểm tra xem sản phẩm có thiếu sót bất kỳ yêu cầu chức năng và phi chức năng nào không.
* Cần kiểm tra sản phẩm trong môi trường tương tự như môi trường thực và do đó các bên liên quan có thể thu thập được ý kiến đóng góp dựa vào phản ứng của người dùng.
* Cần kiểm tra sản phẩm với dữ liệu giống như dữ liệu thực.

System Testing bao gồm các tình huống dựa trên nghiệp vụ, lĩnh vực, hành vi sản phẩm. Các trường hợp liên quan và tương tác với các tài nguyên hệ thống khác nhau cũng sẽ là một phần của System Testing. Do đó, nó phải được thực hiện bởi một người có kiến thức đầy đủ vể cả cấu trúc hệ thống và nghiệp vụ của sản phẩm vì nó đóng một vai trò quan trọng trong việc cung cấp một sản phẩm chất lượng cho khách hàng. Kiến thức về coding là không cần thiết nhưng kiến thức hệ thống là bắt buộc đối với người thử nghiệm.

### Khi nào bắt đầu thử nghiệm hệ thống?

Thử nghiệm hệ thống có thể được bắt đầu khi:
* Kiểm thử đơn vị đã được thực hiện và hoàn thành cho tất cả các đơn vị chức năng mà không có bất kỳ lỗi nào.
* Tất cả các thành phần được kiểm thử đơn vị, được tích hợp với nhau và được thử nghiệm tích hợp. Kết quả của thử nghiệm tích hợp này là OK.
* Một môi trường giống với môi trường thật nhất đã được chuẩn bị để bắt đầu thực hiện kiểm thử hệ thống.
* Nhân viên kiểm thử phải có kiến thức về toàn bộ trong/ ngoài hệ thống và đã sẵn sàng để thực hiện thử nghiệm hệ thống.

## End-to-End Testing là gì?

Kiểm thử phần mềm là đối số quan trọng trong đảm bảo chất lượng phần mềm. Sản phẩm chất lượng tốt luôn mang lại mức độ hài lòng cao cho cả nhà phát triển cũng như người dùng. 

Thuật ngữ "End to End testing" được định nghĩa là một phương pháp thử nghiệm để xác định xem hiệu suất của một ứng dụng có theo yêu cầu hay không. Nó được thực hiện từ đầu đến cuối trong các tình huống thực tế như truyền thông của ứng dụng với phần cứng, mạng, cơ sở dữ liệu và các ứng dụng khác.
![](https://images.viblo.asia/911717bb-7597-4f91-8be2-50e23599920a.jpg)

Như được giải thích bởi chính tên của nó, kiểm thử đầu cuối là một trong các mức thử nghiệm mà luồng xử lý của ứng dụng sẽ được kiểm tra cùng với các chức năng hay hệ thống khác liên quan. Điều này được thực hiện để đảm bảo tương tác mượt mà với các ứng dụng phụ trợ như cơ sở dữ liệu hoặc giao diện người dùng.

Lý do chính để thực hiện thử nghiệm này là xác định các phụ thuộc khác nhau của một ứng dụng cũng như đảm bảo rằng thông tin chính xác được truyền đạt giữa các thành phần hệ thống khác nhau.

Kiểm thử đầu cuối thường được thực hiện sau khi hoàn thành kiểm thử chức năng và kiểm thử hệ thống của bất kỳ ứng dụng nào.

### Tại sao End-to-End Testing là quan trọng?

Kiểm thử đầu cuối đóng một vai trò quan trọng khi sản phẩm được phát triển, cần phải là một hệ thống phân tán (có thể là gồm nhiều phần mềm, hệ thống phối hợp hoạt động với nhau) và được yêu cầu rằng phần mềm này hoạt động chung được với các hệ thống phần mềm khác trong các môi trường khác nhau, đảm bảo tương tác chính xác trên các nền tảng và môi trường khác nhau.

Mục tiêu chính của thử nghiệm đầu cuối bao gồm:
* Để đảm bảo rằng sản phẩm được phát triển và phối hợp tốt với bất kỳ hệ thống phụ nào của nó, có thể hoặc không thể thuộc cùng một sở hữu.
* Để kiểm tra tất cả các luồng hệ thống từ các hệ thống nguồn đến các hệ thống đích.
* Để xác thực các yêu cầu từ quan điểm của người dùng cuối.
* Để tìm ra và xác định các vấn đề trong các môi trường không đồng nhất.

### Khi nào bắt đầu thử nghiệm đầu cuối?
Thử nghiệm đầu cuối thường được thực hiện khi:
* Khi sản phẩm đủ điều kiện kiểm thử hệ thống trong đó tất cả các khía cạnh chức năng đều đã được kiểm thử và hoạt động tốt.
* Khi các môi trường phụ thuộc được xác định và chuẩn bị sẵn sàng để tiến hành thực hiện kiểm thử.
* Khi nhân viên kiểm thử được trang bị kiến thức cần thiết.
* Khi nhân viên kiểm thử có đầy đủ các công cụ thích hợp có thể phân tích luồng dữ liệu.

## Sự khác nhau giữa System Testing và End-to-End Testing

| System Testing | End to End Testing | 
| -------- | -------- | 
| Sản phẩm được thử nghiệm dựa trên các yêu cầu kỹ thuật cụ thể của nó, được xác định dựa trên các yêu cầu, nghiệp vụ.     | Xác nhận cả hệ thống phần mềm chính cũng như tất cả các hệ thống con được kết nối với nhau.    |
| Bao gồm các khía cạnh chức năng cũng như phi chức năng được xem xét để thử nghiệm.     | Trong khi thực hiện kiểm thử, bao gồm cả kiểm thử giao diện đến xem xét tất cả các hệ thống nguồn và đích.     |
| Thực hiện vào cuối vòng đời phát triển phần mềm.     | Được thực hiện một lần khi sản phẩm đủ điều kiện thử nghiệm tích hợp giữa các phần mềm/ hệ thống.     |
| Tất cả các tính năng được triển khai cho sản phẩm sẽ được xem xét kỹ lưỡng để tìm ra các kết quả không mong muốn.     | Luồng xử lý sẽ được kiểm thử cùng với giao diện người dùng, hệ thống trung gian cùng hay khác cấp.     |
| Nhân viên kiểm thử nên có sự hiểu biết nhất định về chức năng của sản phẩm được phát triển.     |  Nhân viên kiểm thử cần có sự hiểu biết cụ thể, rõ ràng về luồng dữ liệu và luồng công việc trong hệ thống.      |
| Nhân viên kiểm thử hệ thống không cần quan tâm đến các giai đoạn của vòng đời phát triển sản phẩm.     | Nhân viên kiểm thử đầu cuối cần phải hiểu tất cả các giai đoạn.    |
| Cả hai thử nghiệm thủ công và thử nghiệm tự động có thể được thực hiện như một phần của kiểm thử hệ thống. | Kiểm thử thủ công chủ yếu được ưu tiên để thực hiện trong kiểm thử đầu cuối vì hình thức thử nghiệm này liên quan đến việc kiểm tra các giao diện bên ngoài cũng có thể rất khó tự động hoá tại các thời điểm. | 

## System Testing or End-to-End Testing hay cả hai?

Thường thì kiểm thử hệ thống và kiểm thử đầu cuối được coi là giống nhau nhưng điều đó không đúng. Cả hai đều là các dạng thử nghiệm khác nhau với phạm vi kiểm tra khác nhau.

Trong khi kiểm thử đầu cuối sẽ kiểm tra luồng xử lý của các hoạt động từ đầu cho đến khi kết thúc của hệ thống bao gồm tất cả các hệ thống phụ thuộc, kiểm thử hệ thống sẽ kiểm tra cùng một chức năng với một bộ đầu vào bao gồm các giá trị khác nhau để đánh giá phản hồi.

Đối với bất kỳ bản phát hành phần mềm thương mại nào, kiểm thử đầu cuối đóng vai trò quan trọng vì nó kiểm tra toàn bộ ứng dụng trong môi trường mô phỏng chính xác môi trường người dùng thực tế như truyền thông mạng, tương tác cơ sở dữ liệu,...


>  Bài viết đươc tham khảo từ nguồn **[ Software Testing Help](https://www.softwaretestinghelp.com/system-vs-end-to-end-testing/)**


###
**Những phần trước cùng chủ đề "Make a Different in Software Testing Basics":**

>* Phần 1 - **[Functional Testing and Non-Functional Testing](https://viblo.asia/p/make-a-different-in-software-testing-basics-phan-1-djeZ1awQZWz)**
>* Phần 2 - **[Re-testing and Regression testing](https://viblo.asia/p/make-a-different-in-software-testing-basics-phan-2-1Je5EMg15nL)**
>* Phần 3 - **[Boundary value analysis and Equivalence partitioning](https://viblo.asia/p/make-a-different-in-software-testing-basics-phan-3-4P856XvRZY3)**
>* Phần 4 - **[Verification and Validation](https://viblo.asia/p/make-a-different-in-software-testing-basics-phan-4-oOVlYdXvZ8W)**
>* Phần 5 - **[Test Case and Test Scenario](https://viblo.asia/p/make-a-different-in-software-testing-basics-phan-5-6J3Zg2xEKmB)**
>* Phần 6 - **[Quality Assurance and Quality Control](https://viblo.asia/p/make-a-different-in-software-testing-basics-phan-6-oOVlY12yl8W)**
>* Phần 7 - **[User Story and Requirement](https://viblo.asia/p/make-a-different-in-software-testing-basics-phan-7-6J3ZgJyRKmB)**
>* Phần 8 - **[Unit, Integration and Functional Testing](https://viblo.asia/p/make-a-different-in-software-testing-basics-phan-8-63vKjaBA52R)**
>* Phần 9 - **[Installation and Uninstallation Testing](https://viblo.asia/p/make-a-different-in-software-testing-basics-phan-9-jvEla40YZkw)**