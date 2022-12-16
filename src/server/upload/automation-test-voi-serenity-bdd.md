## 1)Giới thiệu về serenity BDD
Serenity BDD là một thư viện mã nguồn mở được tạo ra nhằm mục đích biến ý tưởng trong tài liệu thành hiện thực. Serenity BDD giúp bạn viết các script test cho  acceptance test và regression tests nhanh, sạch, rõ ràng và dễ bảo trì hơn. Serenity cũng sử dụng các kết quả test để tạo ra các báo cáo tường thuật, minh họa tài liệu và mô tả những gì ứng dụng của bạn làm và cách thức hoạt động. Serenity cho bạn biết không chỉ những thử nghiệm đã được thực hiện, mà quan trọng hơn, những yêu cầu nào đã được thử nghiệm và trạng thái của chúng.
Một lợi thế chính của việc sử dụng Serenity BDD là bạn không phải đầu tư quá 
nhiều thời gian vào việc xây dựng và duy trì khung tự động hóa của riêng bạn.
Serenity BDD cung cấp các thư viện hỗ trợ mạnh mẽ cho các loại thử nghiệm chấp nhận tự động khác nhau, bao gồm:

-Test web với Selenium.

-Test API REST với RestAssured.

Các Testcase có thể đọc, duy trì và mở rộng cao với mẫu Kịch bản.

Mục đích của Serenity là giúp bạn dễ dàng viết nhanh các tiêu chí test chấp nhận có cấu trúc tốt. bạn có thể duy trì, sử dụng thư viện test thông thường hoặc sử dụng các thư viện yêu thích của bạn. Bạn có thể làm việc với các công cụ Phát triển Hành vi như Cucumber hoặc JBehave, hoặc đơn giản là sử dụng JUnit. Bạn có thể tích hợp với các yêu cầu được lưu trữ trong một nguồn bên ngoài (chẳng hạn như JIRA hoặc bất kỳ công cụ quản lý trường hợp thử nghiệm nào khác) hoặc chỉ sử dụng một cách tiếp cận dựa trên thư mục đơn giản để sắp xếp các yêu cầu của bạn.
Lý thuyết là vậy, tuy nhiên để có thể hiểu rõ hơn về cách thức hoạt động và hiệu quả của Serenity BDD thì chúng ta sẽ viết thử những test scripts (steps) đầu tiên.

## 2)Viết các Step đầu tiên
* Cài đặt môi trường: Để bắt đầu sử dụng Serenity chúng ta cần cài đặt những thứ như sau:
    * JDK8 hoặc phiên bản mới hơn ( nên sử dụng JDK8)
    * Gradle hoặc Maven để quản lý các thư viện 1 cách dễ dàng (trong bài này tôi sẽ sử dụng maven)
    * Cuối cùng là IDE để code Java. Bạn có thể sử dụng IntelliJ, Netbean, hoặc Eclipse.

* OK. Bắt đầu thôi
    * Đầu tiên bạn có thể clone repository này về máy
    ```
    $ git clone https://github.com/serenity-bdd/serenity-junit-starter.git
    $ cd serenity-junit-starter
    ```


    * Chạy thử với command line
    ```
        $ mvn verify
    ```

* Khi chạy bạn có thể thấy 1 số hình ảnh sau:
![](https://images.viblo.asia/33a74444-0a29-4568-922b-33f08232b0be.png)

* Khi máy báo BUILD SUCCESS bạn có thể vào thư mục chứa code. Tìm đến target/site/serenity, mở file index.html lên và bạn sẽ nhìn thấy test report của serenity. Hình ảnh báo cáo rất trực quan, bạn có thể thấy số lượng testcase pass, fail, pending, tổng số testcase.

![](https://images.viblo.asia/8247000a-0e3e-4699-b8a7-f10d5afc2131.png)

   * Kết quả phía trên là do chúng ta chưa định nghĩa các phương thức bên trong của steps. Chúng ta sẽ viết lại 1 ví dụ hoàn toàn mới. Tôi vào thư mục src/test/java và xóa toàn bộ thư mục và file trong đó đi.
   
   ![](https://images.viblo.asia/c6f8e8aa-8652-47f3-ad43-b6dc910b9506.png)
   
*  Để bắt đầu thì trong thư mục src/test/java . Tôi sẽ tạo một class mới đặt tên là TestRunner.java. Trước dòng khai báo class chúng ta đặt vào 1 annotation như sau:

![](https://images.viblo.asia/35e9f4ba-6357-45b1-b18b-83728c1daafc.png)

* Điều này có ý nghĩa, khi bạn gõ lệnh mvn verify. File TestRunner.java sẽ được chạy với SerenityRunner và thực thi các mã lệnh trong đó.
Kế tiếp, giả sử chúng ta có 1 chương trình tính tổng và hiệu các số. Việc của chúng ta là kiểm tra xem chương trình có trả về kết quả đúng như mong đợi hay không. Mã nguồn chương trình như sau.

![](https://images.viblo.asia/b72fab32-d29c-4385-ad73-1655d9a55df0.png)

* Ở bước tiếp theo chúng ta sẽ định nghĩa các step libraries để mô tả các hành động kiểm thử. Trong ví dụ này thì có hành động như sau:
    * Nhập số thứ nhất
    * Nhập số thứ hai
    * Tính tổng và kiểm tra
    * Tính hiệu và kiểm tra
* Tôi sẽ viết 1 class có tên StepLibraries như sau:

     ![](https://images.viblo.asia/641b20be-d5c7-4f21-a3e7-2c59c06792a7.png)

* Trước mỗi hành động các bạn phải thêm vào annonation @Step
* Cuối cùng chúng ta phải dựng các testcase để kiểm tra chương trình. Trong khuôn khổ bài viết, tôi sẽ chỉ tạo ra 2 testcase. 1 cái là để kiểm tra tính tổng đúng hay không, 1 cái là kiểm tra  tính hiệu đúng hay không. Mỗi testcase sẽ bao gồm đầy đủ luồng nghiệp vụ của chương trình. Tôi thêm vào file TestRunner nội dung như sau:

![](https://images.viblo.asia/dc44c727-00e6-47cd-a392-853fce77fa45.png)

* Ok. Đã xong. Bắt đầu chạy test nào. Để xóa hết các báo cáo cũ. Trong cmd các bạn gõ lệnh
```
$ mvn clean
```
* Sau đó chạy test
```
$ mvn verify
```

* Mở báo cáo lên xem như thế nào

![](https://images.viblo.asia/ac21e3b8-14d4-4456-badf-4ebcfc2332b6.png)

* Tổng 2 testcase, 1 cái pass, 1 cái fail. Sao fail nhỉ? Kiểm tra coi. Bạn bấm vào Test Results > Bấm tiếp vào case checkhieu đang báo fail. Các bạn có thể thấy. Kết quả mong muốn là 9 nhưng thực tế trả về 10. Chính vì vây nên serenity báo fail.

![](https://images.viblo.asia/68cc3ea8-4f56-4d08-975c-fc6fc335e2d9.png)

* Nhập 11 và 2 thì hiệu mong muốn là 9 đúng rồi. Nhưng kết quả thực tế lại là 10. Suy ra có thể chương trình của chúng ta viết sai. Quay lại file TinhToan.java các bạn có thể thấy phương thức tính hiệu tôi đã cố tình viết sai đi.

```
public int tinh_hieu(){
    return num1 - num2 + 1;
}
```

* Sửa lại phương thức cho chính xác và chạy lại test, các bạn sẽ thấy kết quả là 100% pass.

* Hy vọng qua bài viết này các bạn có thể hình dung được Serenity 1 cách tổng quát nhất. Serenity còn rất là nhiều thứ hay ho và tôi dám chắc bạn sẽ thích và áp dụng vào dự án của mình. Chúc các bạn thành công.

## Tài liệu tham khảo: 
https://serenity-bdd.github.io/theserenitybook/latest/index.html