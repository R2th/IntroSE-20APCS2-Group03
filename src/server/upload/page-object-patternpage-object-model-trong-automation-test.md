# Page Object Pattern là gì?
Page Object Pattern hay còn được gọi là POM (Page object model). Ở đây chúng ta gọi nó là Page Object Pattern bởi vì POM có trùng với một từ khóa khác ở trong maven cũng là POM (Project Object Model) vì vậy trong bài viết này mình sẽ đề cập đến nó dưới keyword **POP**.

Page Object Pattern(POP) là 1 design pattern hỗ trợ trong mảng automation testing. Trong **Selenium**  POP đóng vai trò tạo ra 1 kho lưu trữ tất cả **element** của trang web, POP hữu ích trong việc giảm trùng lặp code và  cải thiện khả năng bảo trì(maintain) đối với test case.
Trong POP, hãy coi mỗi trang web của một ứng dụng là 1 **class file**. Mỗi **class file** sẽ chỉ chứa các **elements** của trang web tương ứng. Sử dụng các yếu tố này, Tester có thể thực hiện các thao tác trên trang web được test.

![image.png](https://images.viblo.asia/aac4582e-faa1-4b0a-989c-11455fd59949.png)

*Ngoài ra chúng ta sẽ có những framework khác sẽ tìm hiểu trong bài sau là: Singleton Pattern, Strategy Pattern, Factory Pattern.*

# Ưu điểm của Page Object Pattern.
####  Giảm thiểu việc trùng lặp code:
* Với **Selenium API** chúng ta sẽ code như sau:
        *`WebElement element = driver.findElement(By.xxx(""))` 
        *`element.sendKeys()/click()/getText()` 
![image.png](https://images.viblo.asia/bd53b4b9-1810-4797-bafa-f10dd05aa6c5.png)
    Việc sử dụng trực tiếp Selenium API gây ra sự trùng lặp code và rất khó khăn khi bảo trì(maintain) bởi vì khi có thay đổi ở 1 element sẽ phải đi tìm từng dòng chứa element đó để sửa chữa.
* Với **Page Object Pattern** Chúng ta sẽ tối ưu nhược điểm trên bằng cách tạo ra các Hàm có thể sử dụng cho nhiều Test Case khác nhau. 
    ![Untitled Diagram.drawio.png](https://images.viblo.asia/a0924c1b-49af-4ac3-ac67-4fff917107a8.png)
**Chỉ cần truyền vào các tham số là tạo ra được những test case khác nhau.**
    ![image.png](https://images.viblo.asia/e8307fab-4535-4359-833c-d961860970f2.png)
    
####  Dễ dàng cho việc bảo trì, mở rộng code về sau:
    * UI thay đổi **chỉ cần update ở pageUIs**
    * Logic thay đổi **chỉ cần update ở pageObjects**
    * Data Test thay đổi **chỉ cần update ở tần testcases**
    * Thư viện Selenium thay đổi (đổi cách dùng hoặc đổi version mới) **thì chỉ cần update ở class AbtractPage** (Selenium Wrapper/ Function). Không sửa ở tầng testcase/pageObject
    
####  Testcase ngắn, dễ đọc, các method tương ứng với các hành động manual trên từng page.

# Nhược điểm của Page Object Pattern.
#### Yếu tố con người rất quan trọng:
* Cần Kỹ năng code, technical, backgroud về automation testing.
* Không phù hợp với người/ team không biết code, không biết technical.
* Biết viết common function
* Biết chia page
* Biết định nghĩa locator và tối ưu hóa locator
* Biết contructor là gì
* Biết biến toàn cục/ biến cục bộ
* Biết khi nào khởi tạo page/ khởi tạo ở vị trí nào/ page này gọi qua page kia
* Biết cách kế thừa class/ phạm vi truy cập
* Biết sắp xếp testcase đi đúng luồng
#### Mất nhiều thời gian để xây dựng framework
* Với người có kinh nghiệm thì mất khoảng 3 ngày đẻ clone + viết 5 - 10 testcase
* Build từ đầu tầm 1 tuần - 10 ngày - 1 tháng tùy level
#### Số lượng action của từng page quá nhiều khi testcase và chức năng tăng lên.
* Khai báo và implement rất nhiều hàm cho các fields
* Khai báo rất nhiều locator cho các fields
![screenshot-tiemchungcovid19.gov.vn-2022.09.03-10_55_33.png](https://images.viblo.asia/b79baadb-eab1-43ab-847b-f3d5a4f7cd6b.png)
# Giải Pháp
**Sử dụng dynamic để xử lý (Page/ Action/ Component)**
* Sử dụng \[Framework] Page Element Component để design lại page object, page UI - Viết hàm theo dạng component không viết theo action
![image.png](https://images.viblo.asia/31df44ad-6f40-4add-9805-6fb8ebfe49d8.png)

# Lưu ý
* Tầng testcase không nên có API code (TestNG, Webdriver API) hoặc code như *if else/ do/ while...* chỉ nên nằm trong tầng page object
* Tầng page object không nên có các hame Assert và Verify => chỉ dùng ở tầng testcase
    * Tầng action có trả về thì nên trả về các giá trị để cho tầng testcase verify.
    ![2.png](https://images.viblo.asia/009f11e1-5017-496e-ad62-90d564a32219.png)
* Mỗi page object chỉ viết action của chính page đó.
* Làm đến đâu viết action/UI đến đó không viết tất cả action/UI của 1 page.
![image.png](https://images.viblo.asia/a03820c0-c2e4-4e2f-8726-9a1adb9e7767.png)
    * **[Nguyên tắc YAGNI: You Aren't Gonna Need It](https://www.techtarget.com/whatis/definition/You-arent-gonna-need-it#:~:text=TechTarget%20Contributor-,YAGNI%20principle%20(%22You%20Aren't%20Gonna%20Need%20It%22,desired%20increased%20frequency%20of%20releases.)** - *Không implement các tính năng chưa cần thiết ở hiện tại. Nguyên tắc này là dự án của bạn đang làm gì thì chỉ tập trung giải quyết và xây dựng các chức năng và vấn để ở thời điểm hiện tại mà khách hàng cần. **Không lãng phí thời gian vào một chức năng "Có thể sử dụng đến TRONG TƯƠNG LAI"**.*
    Tập trung giải quyết phần nổi của tảng băng không đi sâu vào phần chìm. Nổi đến đâu làm đến đấy :D.
    ![iceberg_header_0-521x405.png](https://images.viblo.asia/b23bb441-c2a7-4080-9fac-cbc5dc2b22b6.png)
* Từ 1 page A khi chuyển qua page B cần phải khởi tạo page B đó lên rồi mới thao tác tiếp các step của page B nếu không sẽ dẫn đến lỗi **NullPointerException**.
* Để đảm bảo đi đúng luồng như manual test thì khi đi đến page nào nên return lại page đó.
* Nắm rõ vòng đời, cách tương tác, chuyển driver giữa các page
    * **Driver => AbtractTest => TestCase => Page Object => AbtractPage **

Trong bài viết lần sau, mình sẽ trình bày tiếp về Singleton Pattern. Thanks!