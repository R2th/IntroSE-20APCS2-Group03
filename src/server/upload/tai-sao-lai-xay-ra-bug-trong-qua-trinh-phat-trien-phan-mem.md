Có rất nhiều lý do gây ra lỗi (bug). Lý do phổ biến nhất là do con người tạo nên - trong quá trình design và coding. Sản phẩm càng có yêu cầu phức tạp thì  khả năng tồn tại nhiều bug càng cao. Và không thể tự tin để nói rằng sản phẩm của mình là Bug Free. 
![](https://images.viblo.asia/8134b8ea-293f-4ad1-8d79-e17e36dcde55.jpg)
Vậy câu hỏi đặt ra là: Những yếu tố nào dẫn đến bug trong sản phẩm?

### **Yếu tố con người:**
![](https://images.viblo.asia/9ae66d8a-b53f-489c-855e-9bdc5e31c12c.jpg)
Con người góp phần tạo nên sản phẩm, mà đã là con người thì không thể hoàn hảo.Con người sẽ tạo ra sai lầm và không thể khẳng định chắc chắn rằng sản phẩm phần mềm mình làm ra không có bất kì lỗi nào. Và rằng chúng ta chưa tìm ra bất kì công cụ - trí tuệ nhân tạo nào có thể tạo nên sản phẩm phần mềm tốt hơn con người. Đó là lý do vì sao bug xuất hiện. 

### **Thất bại trong việc trao đổi thông tin:**
![](https://images.viblo.asia/eec534bc-18bb-408e-b6cf-f92fdcd9c5b2.jpg)
Một lý do thường gặp khác là về việc thất bại trong quá trình trao đổi thông tin: hiểu sai, thiếu giao tiếp,... Sự thất bại này có thể xảy ra tại nhiều phases trong quá trình phát triển phần mềm: Thu thập yêu cầu, tổng hợp - giải thích yêu cầu, hiểu yêu cầu để thực hiện implement,... Nếu trong trường hợp yêu cầu mơ hồ, không rõ ràng, developer sẽ implement mà không thật sự hiểu rõ yêu cầu, vì vậy dẫn đến bug. VÀ một trường hợp khác, khi 1 developer cố gắng sửa một đoạn code của một người khác và thiếu đi sự trao đổi giữa hai bên.

### **Khung thời gian phát triển không thực tế:**
![](https://images.viblo.asia/8995244a-92c7-4d27-b201-5cd0f7660cad.jpg)
Sản phẩm thường được phát triển theo lịch trình gấp gáp, dồn dập, với nguồn lực hạn chế. Vì vậy, để đáp ứng kịp thời hạn release, đôi khi sẽ không có đủ thời gian để thiết kế, code và kiểm thử một cách cẩn thận. Một sự thay đổi yêu cầu nhỏ vào thời gian cuối sẽ dẫn đến sự thay đổi của code và có khả năng gây ra bug.

### **Logic design kém:**
![](https://images.viblo.asia/c175bc5a-fa2d-4e90-a49c-fc20897962e0.jpg)
Trong thời đại phát triển phức tạp của hệ thống phần mềm, đôi khi phần mềm phức tạp đến mức nó đòi hỏi  rất nhiều sự nghiên cứu, phát triển và động não để đạt được một giải pháp đáng tin cậy. Sự thiếu kiên nhẫn và mong muốn hoàn thành nó càng nhanh càng tốt có thể dẫn đến sai sót. Áp dụng sai công nghệ (linh kiện, sản phẩm, kỹ thuật), mong muốn/khao khát  sử dụng cách dễ nhất để thực hiện giải pháp, thiếu hiểu biết đúng đắn về tính khả thi của kỹ thuật trước khi thiết kế kiến trúc đều có thể gây ra lỗi. Thật không may, không phải là do chúng ta không thông minh; chỉ là chúng ta thường không-có-thời-gian/không-được-phép-nghĩ!

### **Thực hiện code kém hiệu quả:**
![](https://images.viblo.asia/3f8ad37e-3f5a-44cf-a87c-d28cd388f6b6.png)
Bug thường xuất hiện bởi code yếu kém. Code yếu kém thể hiện qua việc quên xử lý lỗi/ exception hoặc xử lý không hiệu quả, thiếu validate dữ liệu ( kiểu dữ liệu, phạm vi, điều kiện biên,…). Thêm vào đó, developers có thể phải làm việc với những tool, compilers, debuggers,…kém hiệu quả. 

### **Thiếu sự kiểm soát các build version:**
Nếu một function đã được test ở bản build trước và sau một vài lần build, bug hồi quy xảy ra thì rất khó để có thể phát hiện ra chúng. Vì vậy việc kiểm soát các bản build là rất quan trọng

### **Thiếu sót về kĩ năng kiểm thử:**
![](https://images.viblo.asia/53313a82-b272-445b-a6df-7eccea347a72.jpg)
Ở một vài công ty, quy trình kiểm thử thường bị xem nhẹ hoặc không xảy ra. Thêm vào đó, tester thiếu hiểu biết và kinh nghiệm về kiểm thử sẽ dẫn đến việc bỏ sót bug trong sản phẩm. Ngoài ra, nếu tester không cẩn thận, không chú ý trong quá trình thực hiện test, kết quả sẽ là sản phẩm với chất lượng yếu kém và tồn tại nhiều bug nghiêm trọng.

### **Tự tin thái quá:**
![](https://images.viblo.asia/6077f561-99e4-4d84-a9f4-89245d04df6a.jpg)
Một số người thường thích nói những câu như “ Quá đơn giản”, “Dễ như ăn bánh”, “ Xong ngay trong một nốt nhạc”. Những sự quá tự tin như thế này thường dẫn đến việc bỏ lỡ những điểm quan trọng.

### **Sử dụng tool của bên thứ ba:**
![](https://images.viblo.asia/c750ab92-6559-439c-9faa-4f75d9f8451f.jpg)
Trong quá trình phát triển phần mềm, chúng ta thường sử dụng ít nhất một tool của bên thứ ba, và chính trong các tool này có thể chứa lỗi. Các tool này có thể là công cụ hố trợ lập trình (class libraries, shared DLLs, compilers, HTML editors, debuggers etc.) Nhưng lỗi trong tool này sẽ dẫn đến lỗi trong phần mềm đang được phát triển.

### **Thay đổi trong phút chót:**
![](https://images.viblo.asia/088a15bc-c60b-4881-9ed6-7d19eb1f6f62.jpg)
Những thay đổi có thể xảy ra với requirement, cơ sở hạ tầng, tools, platform có thể rất nguy hiểm, nhất là khi sản phẩm chuẩn bị được release. Những thao tác như thay đổi cấu trúc cơ sở dữ liệu, làm cho sản phẩm có thể tương thích với nhiều hệ điều hành/trình duyệt khá phức tạp và nếu được làm trong thời gian ngắn sẽ dẫn đến việc xảy ra bug.

**References**

www.softwaretestinghelp.com

www.testingexcellence.com