Tiếp nối series phần trước, như đã nói bài này mình sẽ viết về việc tích hợp Selenium vào project RobotFramework để có thể thực hiện automation với các ứng dụng web

Trình tự thực hiện trong bài này gồm:
- :flipper: Download & add thư viện Selenium vào Project 
- :green_salad: Bài toán tìm kiếm trên Google 
- :blossom: Bài toán Login 

### 1. Download và add thư viện Selenium vào Project 

**Step 1**: Đầu tiên bạn mở cmd trên máy windows và cài đặt thư viện SeleniumLibrary theo các câu lệnh sau:

`pip install robotframework-seleniumlibrary`

Để kiểm tra việc cài đặt đã thành công chưa, bạn dùng câu lệnh: `pip list`
![](https://images.viblo.asia/f845c2f5-9c7d-411b-a3e2-e366dc5734e9.png)

Tại đây sẽ hiển thị danh sách các thư viện bạn đã cài đặt. Nếu thấy dòng `robotframework-seleniumlibrary` như ảnh trên nghĩa là bạn đã cài đặt thư viện thành công

**Step 2**: Mở project của bạn ra và add thư viện vào thôi :smile: 

Bạn chọn vào file red.xml => double click vào "... add new library file" => chọn thư viện 'seleniumlibrary'
![](https://images.viblo.asia/01d28082-8246-48aa-a94d-8eba2f9ecfb7.png)

### 2. Bài toán tìm kiếm trên Google - Tìm kiếm từ khóa "Sun Asterisk" trên Google    

   Tiếp nối bài toán ở [Phần 1](https://viblo.asia/p/automation-test-voi-robotframework-su-dung-eclipse-phan-1-cau-hinh-va-cai-dat-3P0lPDavlox)
    - Đầu tiên phải add thư viện Selenium vào trong TestSuite
    
```
*** Setting ***
Library    SeleniumLibrary  
```

- Tạo tên Testcase mới => đặt tên tùy thích (mình đặt là **FirstSeleliumTest**) 
- Để giải quyết bài toán tìm kiếm trên Google ta cần các bước như sau:

**+ Step 1**: Mở trình duyệt => mở url     
                Để mở 1 trình duyệt ta sử dụng từ khóa `Open Browser   url  {browser}`    
                Trong đó browser là name tương ứng trong bảng sau:
   
| Browser | Name(s)|
| -------- | -------- | 
| Firefox     | firefox, ff      | 
| Google Chrome | googlechrome, chrome, gc  | 
| Headless Firefox | headlessfirefox  | 
| Headless Chrome | headlesschrome  | 
| Internet Explorer  | internetexplorer, ie  | 
| Edge | edge | 
| Safari | safari | 
| Opera | opera | 
| Android | android | 
| Iphone | iphone | 
| PhantomJS | phantomjs | 
| HTMLUnit | htmlunit |
| HTMLUnit with Javascript | htmlunitwithjs |

Ví dụ: Bạn muốn mở link google bằng Chrome thì dùng:

`Open Browser    https://www.google.com    chrome`
  
**+ Step 2**: Nhập từ khóa vào ô tìm kiếm    
                Như các bài viết trước của mình cũng đã hướng dẫn cách lấy phần tử trên trình duyệt, nên bài này mình sẽ không hướng dẫn chi tiết nữa   
                
   Inspect element vào phần tử cần lấy thuộc tính và lấy điểm đặc trưng của nó. Như ô tìm kiếm trên google điểm đặc trưng là `name=q`
                ![](https://images.viblo.asia/6c0ba6f3-b3de-4dbf-a80a-fb164789480a.png)
               
  Câu lệnh dùng trong bước này sẽ là: `Input Text    name=q    Sun Asterisk` 
                  với 'Input Text' là từ khóa 
                        'name=q' là phần tử cần nhập text
                        'Sun Asterisk' là value cần tìm
                        
**+ Step 3**: Click vào button Tìm kiếm và xem hiển thị kết quả

   Đầu tiên là lấy phần tử của button Tìm kiếm và lấy điểm đặc trưng của button `name=btnK`
                   ![](https://images.viblo.asia/efd10c4b-4841-4f9e-a0c3-495a4e6e0a24.png)
                   
  Click vào button ta dùng câu lệnh: `Click Button    name=btnK`


**=>** Từ 3 bước trên ta sẽ có đoạn code như sau:
```
*** Setting ***
Library    SeleniumLibrary    
*** Test Cases ***

FirstSeleliumTest
    Open Browser    https://www.google.com    chrome
    Set Browser Implicit Wait    5
    Input Text    name=q    Sun Asterisk  
    Click Button    name=btnK 
    Sleep     2   
```

Trong đó câu lệnh `Set Browser Implicit Wait    5` là đặt thời gian chạy ngầm cho trình duyệt load xong là 5s      
                câu lệnh `Sleep     2` là đợi hiển thị load kết quả sau khi click vào button 2s
  
  
  Chạy bài toán trên ta được kết quả như sau:
  ![](https://images.viblo.asia/3e43c8ea-19ac-429f-93dc-ad16a49a88b6.gif)


### 3. Bài toán Login :blossom: - Login trang Viblo

Tương tự với bài toán tìm kiếm trên ta cũng liệt kê các bước cần phải làm như sau:

**+ Step 1**: Open trang Viblo => Open link Login

  Đầu tiên mở url trang Viblo: https://viblo.asia/    
      Sau đó tìm phần tử của hyperlink:   **Sign In/Sign up** như ảnh dưới. Để cho nhanh và chính xác thì bạn có thể dụng tool hỗ trợ lấy phần tử ChroPath (trước đây mình cũng có viết bài này rồi, bạn có thể đọc lại)
     
![](https://images.viblo.asia/8608bfe3-1da2-4ae6-8c69-18c0503e51eb.png)

Mã lệnh cho Step 1 là như sau: 
```
Open Browser    https://viblo.asia/    chrome
Click Element    XPath=//span[contains(text(),'Sign In/Sign up')] 
```
Kết quả Step 1 là mở được trang Login như sau:
![](https://images.viblo.asia/44b366a4-f6b4-4b5a-986f-fd60906337a4.gif)

**+ Step 2**: Input username & password

Lấy phần tử username bằng tool ChroPath như ảnh dưới
               
               
 ![](https://images.viblo.asia/e305c8bd-2095-4cb3-b4dd-4dd06912f033.png)
               
Lấy phần tử password bằng tool ChroPath như ảnh dưới
![](https://images.viblo.asia/1b54dc6a-9c2f-4d5f-ab13-487699e8eed2.png)
Mã lệnh cho Step 2 là như sau:
```
Input Text    XPath=//body/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[3]/form[1]/div[1]/div[1]/div[1]/input[1]    phamhangxxx@gmail.com
Input Password    XPath=//body/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[3]/form[1]/div[2]/div[1]/div[1]/input[1]    12345678
```

Để test thử mình đang sử dụng email và password invalid. Bạn có thể thử với trường hợp valid nhé 😂

**+ Step 3**: Click button Login và kiểm tra kết quả

 Lấy phần tử button Login bằng tool ChroPath như ảnh dưới
              ![](https://images.viblo.asia/d70c65e7-e93a-41a5-8058-fd0176694cec.png)

=> Mã lệnh của bài toán này là như sau:
```
LoginSelenium
    Open Browser    https://viblo.asia/    chrome
    Click Element    XPath=//span[contains(text(),'Sign In/Sign up')]    
    Input Text    XPath=//body/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[3]/form[1]/div[1]/div[1]/div[1]/input[1]    phamhangxxx@gmail.com
    Input Password    XPath=//body/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[3]/form[1]/div[2]/div[1]/div[1]/input[1]    12345678
    Click Button    XPath=//body/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[3]/button[1]   
```
Kết quả sau khi login với acc & password invalid sẽ như sau:
![](https://images.viblo.asia/6f0edd41-407a-402f-848f-6c59761c0d05.gif)

**note**: nếu bạn muốn đóng trình duyệt sau mỗi lần chạy thì dùng từ khóa  `Close Browser` ở cuối Testcase là được

=> Trên đây là bài viết về việc tích hợp Selenium và project RobotFramework, kèm 2 bài toán đơn giản  để bạn thực hành. Hy vọng bài viết sẽ có ích cho bạn. Bài sau mình sẽ hướng dẫn làm 1 bài toán với nhiều loại items khác nhau hơn :D . Cảm ơn bạn đã đọc bài