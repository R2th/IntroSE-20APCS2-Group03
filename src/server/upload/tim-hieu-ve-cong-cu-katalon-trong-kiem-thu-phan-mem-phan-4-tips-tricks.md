Thực hiện tự động thường không chính xác như kịch bản do nhiều yếu tố liên quan trong quá trình thực thi như độ ổn định mạng, băng thông internet, hiệu suất của AUT và hiệu suất của máy tính thực thi. Bài viết này sẽ hướng dẫn người dùng thông qua việc tận dụng thời gian trễ **delayed time** để xử lý các tình huống như vậy. Sau đây là một số mẹo để giải quyết các issue thường gặp trong quá trình sử dụng Katalon với Katalon Studio.

**Trong phần này chúng ta sẽ tìm hiểu về việc giải quyết vấn đề Wait-time và phát hiện các yếu tố thông qua XPath trong Katalon**

## I. Giải quyết vấn đề Wait-time  với Katalon Studio

### 1. Wait trong Katalon là gì?
Sử dụng **delayed time** là một thực tế phổ biến trong các kịch bản kiểm thử tự động hóa để tạo tạm dừng ở giữa các bước tự động hóa khi bạn đợi các phần tử web load xong hoặc cho AUT trả lời.
Dưới đây là một số ví dụ về lỗi kiểm tra do không đủ thời gian chờ đợi:

a) **False Fail:** 
* Một trong những thất bại phổ biến nhất là khi một script không thành công do hết thời gian chờ trên ứng dụng. Nó thường được gây ra bởi độ trễ mạng, yêu cầu cơ sở dữ liệu bị trì hoãn hoặc đơn giản vì hệ thống cần thêm thời gian để xử lý và phản hồi yêu cầu.

b) **Targeted element không có trên trang:**
* Loại lỗi này xảy ra khi chờ hiển thị hoặc hiển thị các phần tử trong trình duyệt. Ứng dụng có thể đang hoạt động nhưng một số thành phần nhất định có thể không được tải, do đó làm cho các test scripts thất bại.

### 2. Làm thế nào để giải quyết những thất bại liên quan đến Wait?
Katalon cung cấp các từ khóa dành riêng để trì hoãn một cách rõ ràng. Bạn có thể sử dụng các tùy chọn sau để giải quyết tình huống mình gặp phải một cách linh động.

a)  **Wait For Page Load** - Logic này sẽ đợi một trang tải hoàn toàn trước khi chạy một bước khác trong tập lệnh của bạn.

b)   **Wait For Element Present** - Đôi khi các yếu tố web mất nhiều thời gian hơn để xuất hiện trên trang. Từ khóa này tạm dừng thực thi cho đến khi **targeted element** xuất hiện trên trang. Khi phần tử xuất hiện thì việc test mới tiếp tục thực hiện hành động tiếp theo.

c)   **Global variable** - Biến này có phạm vi toàn cầu, có nghĩa là nó có thể nhìn thấy trong suốt chương trình. Do đó, bạn có thể sử dụng biến này trong các test scripts của mình theo thời gian phản hồi của ứng dụng web của bạn. Bạn có thể xem xét việc xác định 3 loại biến toàn cầu trong các test scripts của bạn, có các options như cho chờ đợi ngắn, trung bình và dài.

***Ví dụ:*** Kịch bản dưới đây cho thấy việc sử dụng biến toàn cầu Global variable và việc sử dụng từ khóa được xây dựng trong Katalon Studio **Wait For Element Present** để cố ý chờ một phần tử thử nghiệm cụ thể.

![](https://images.viblo.asia/8e42960a-58c7-46d8-a10a-b5cdee08f5a1.png)

***Katalon Studio test script***

import static com.kms.katalon.core.checkpoint.CheckpointFactory.findCheckpoint

import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase

import static com.kms.katalon.core.testdata.TestDataFactory.findTestData

import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject

import com.kms.katalon.core.checkpoint.Checkpoint as Checkpoint

import com.kms.katalon.core.checkpoint.CheckpointFactory as CheckpointFactory

import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as MobileBuiltInKeywords

import com.kms.katalon.core.model.FailureHandling as FailureHandling

import com.kms.katalon.core.testcase.TestCase as TestCase

import com.kms.katalon.core.testcase.TestCaseFactory as TestCaseFactory

import com.kms.katalon.core.testdata.TestData as TestData

import com.kms.katalon.core.testdata.TestDataFactory as TestDataFactory

import com.kms.katalon.core.testobject.ObjectRepository as ObjectRepository

import com.kms.katalon.core.testobject.TestObject as TestObject

import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WSBuiltInKeywords

import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUiBuiltInKeywords

import internal.GlobalVariable as GlobalVariable

import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI

import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as Mobile

import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WS

'Open browser and navigate to Katalon site'
WebUI.openBrowser("https://katalon.com")

'Wait for Katalon Studio page to load with wait used as Global Variable'
WebUI.waitForPageLoad(GlobalVariable.G_Timeout_Small)

'Click on \'Login\'  button to navigate to Login page'
WebUI.click(findTestObject('Page_KatalonHomepage/btn_Login'))

'Input username'
WebUI.setText(findTestObject('Page_Login/txt_UserName'), Username)

'Input password'
WebUI.setText(findTestObject('Page_Login/txt_Password'), Password)

'Click on \'Login\'  button to login'
WebUI.click(findTestObject('Page_KatalonHomepage/btn_Submit'))

'Wait for failed message to be present'
WebUI.waitForElementPresent(findTestObject('Page_KataloLogin/div_LoginMessage'), GlobalVariable.G_Timeout_Small)

WebUI.closeBrowser()

### 3. Khi nào nên sử dụng lệnh Wait?
Việc thực hiện kiểm thử khá thường xuyên không thành công do các ngoại lệ như ' NoSuchElementException ' , ' ElementNotFoundException ' , ' ElementNotVisibleException ' . 
Để xử lý các ngoại lệ này, việc đồng bộ hóa có điều kiện phải được thực hiện. Katalon Studio hỗ trợ nhiều tính năng tích hợp sẵn trong “ Wait for…. ” Từ khóa để đối phó với các ngoại lệ như vậy. 

*Ví dụ:*
| Từ khóa | Miêu tả |
| -------- | -------- |
| Wait For Element Present     | Đợi phần tử đã cho xuất hiện (xuất hiện) trong khoảng thời gian đã cho bằng giây.     |
| Wait For Element Visible    | Đợi đến khi phần tử web cụ thể hiển thị trong thời gian chờ.     |
| Wait For Alert     | Chờ cảnh báo của trình duyệt xuất hiện.     |
| Wait for Element Clickable     | Đợi phần tử đã cho có thể nhấp vào trong thời gian đã cho bằng giây.     |

# II. Phát hiện các yếu tố với  Xpath trong Katalon Studio

Phát hiện các phần tử giao diện người dùng của ứng dụng đang kiểm thử (AUT) là rất quan trọng để kiểm thử tự động hóa vì chúng là các đối tượng chính trong các trường hợp kiểm thử và các test scripts. Tuy nhiên, việc xác định chúng theo cách thủ công đòi hỏi nhiều thời gian và kinh nghiệm trong HTML. Nhiệm vụ này trở nên khó khăn hơn đối với các đối tượng không thể được xác định bởi các thuộc tính chung của chúng hoặc được đặt sâu trong một phần tử khác (các đối tượng lồng nhau). Bài viết này cho bạn thấy cách Katalon Studio cung cấp hỗ trợ để xử lý các trường hợp như vậy.

### 1. XPath là gì?
Biểu thức XPath là một cơ chế để điều hướng và chọn một nút trong tài liệu XML. Nó cũng có thể được sử dụng để định vị một phần tử HTML.

***Ví dụ***: liên kết Tải xuống trong tập lệnh bên dưới là phần tử được lồng trong phần tử khác.

<div class="container">
 <div class="navbar-collapse navbar-right" aria-expanded="true">
   <div class = "nav-bar-decorated"
     <ul class="nav navbar-nav">
       <Li>
         <a class="pbtn-download" href="#katalon-download">Download</a> <!-- Deeply nested element  -->
       </li>
   </div>
 </div>
</div>

***Vấn đề trong việc xác định các phần tử lồng nhau**

Rất khó để xác định phần tử lồng nhau, chẳng hạn như phần tử <a> trong tập lệnh ở trên. Để xác định XPath theo cách thủ công, chúng tôi cần có kiến thức vững chắc về cấu trúc DOM của trang web.
    
### 2. Làm thế nào để xác định các yếu tố lồng nhau?

Việc xác định XPath là một cách hiệu quả để tìm các phần tử lồng nhau mà các thuộc tính phổ biến như ID, Tên hoặc Lớp không thể nhận dạng được. Có hai cách để tìm XPath:

a) ***Phát hiện XPath bằng các công cụ khác:***  Trình duyệt web thường có Adds-on hỗ trợ người dùng để xác định XPath. Tuy nhiên, nó có thể là một thách thức vì nó phụ thuộc vào rất nhiều công cụ.
b) ***Phát hiện XPath bằng Katalon Studio:***  Katalon Studio có thể tạo và tối ưu hóa XPath cho các phần tử HTML, bất kể chúng lồng nhau như thế nào. Bạn có thể sử dụng các XPath này để xác định các phần tử mà không phải tìm kiếm thông qua cây DOM.

Ví dụ dưới đây minh họa cách Katalon Studio tạo và tối ưu hóa XPath tự động khi bạn gián điệp đối tượng Đăng ký ngay bây giờ (một đối tượng lồng nhau).

![](https://images.viblo.asia/fd7acd65-21bf-4dba-b98e-52df6c822695.png)

**Đối phó với các yếu tố thay đổi động**
Một trong những nhiệm vụ khó khăn và tốn thời gian trong kiểm thử tự động hóa là sửa đổi các kịch bản thử nghiệm khi AUT được thay đổi, đặc biệt là trong các giai đoạn đầu của phát triển phần mềm. Nhà phát triển có thể thay đổi **identifiers** và **elements**  khá thường xuyên từ bản dựng này sang bản dựng khác. Ngoài ra, trong quá trình thực hiện, các thành phần của AUT có thể thay đổi động.

Để đối phó với những thách thức này, những người làm kiểm thử tự động không nên đặt XPath cố định cho các phần tử trong các trường hợp kiểm thử, nhưng thay vào đó, XPaths sẽ tự động dựa trên các mẫu nhất định. Katalon Studio hỗ trợ tất cả các trục Xpath  , chẳng hạn như
* following-sibling
* preceding-sibling
* contains
* descendant
* starts-with

*Sau đây là vài ví dụ:*

| Giá trị Xpath | Miêu tả |
| -------- | -------- |
| .//h2[text()=’Make Appointment’]  | Tìm phần tử thẻ h2 có văn bản khớp chính xác “Make Appointment”   |
|  //[contains(text(),’Login’)]     | Tìm bất kỳ phần tử nào chứa văn bản “Login”     |
| //a[starts-with(@id=’LoginPanel’)]     | Tìm phần tử thẻ có ID bắt đầu bằng “LoginPanel”     |

***Chúng ta sẽ đi tìm hiểu về việc thực thi kiểm thử Katalon từ comand line và xem test suite report trong Katalon Studio trong phần tiếp theo***

**Link tham khảo:**

http://toolsqa.com/katalon-studio/simple-mobile-automation-testing-katalon-studio/

http://toolsqa.com/katalon-studio/create-test-case-using-manual-mode/

**Các bài viết trước:**

https://viblo.asia/p/tim-hieu-ve-cong-cu-katalon-trong-kiem-thu-phan-mem-tong-quan-ve-katalon-phan-1-aWj532EYl6m

https://viblo.asia/p/tim-hieu-ve-cong-cu-katalon-trong-kiem-thu-phan-mem-tong-quan-ve-katalon-phan-2-GrLZDpeVZk0

https://viblo.asia/p/tim-hieu-ve-cong-cu-katalon-trong-kiem-thu-phan-mem-tong-quan-ve-katalon-phan-3-jvElaEyzlkw