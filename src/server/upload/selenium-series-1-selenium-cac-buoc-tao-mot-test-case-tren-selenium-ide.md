#### Ở đây mình giới thiệu qua một số kiến thức cơ bản và hoạt động của Selenium IDE, một số bước cơ bản khi sử dụng Selenium IDE trên browsers.

### 1. Selenium IDE.

Selenium IDE là một Chrome và Firefox extension để dễ ghi lại(record) và phát lại(playback) test trong browser.

- Record
- Generate (Selenese)
- Play

#### 1.1. Record
  - Lưu từng bước hoạt động tương tác trên website.

#### 1.2. Generate (Selenese)
  - Các lên chạy trong Selenium IDE, tập lệnh kiểm thử của bạn.

#### 1.3. Play
  - Thực hiện chạy từng bước tương tác trên website và thực hiện assert và verify.

#### 1.4. Test
  - Test case là mô tả một dữ liệu 
    1. Input (dữ liệu đầu vào).
    2. Action, Event (hành động, sự kiện).
    3. Output (kết quả đầu ra).
  - Test case nhằm kiểm tra từng chức năng của ứng dụng phần mềm hoạt động có đúng hay không.

#### 1.5. Assert và Verify.
  - Assert là thực hiện kiểm tra kết quả, nếu sai (False, Faluire) lập tức kết thúc thực thi (abort). 
  - Verify là thực hiện kiểm tra kết quả, nếu sai (False, Faluire) vẫn tiếp tục thực thi.

### 2. Practices

#### 2.1. Install extension trên Chrome.
  - Link cài đặt [Extension Selenium IDE](https://chrome.google.com/webstore/detail/selenium-ide/mooikfkahbdckldjjndioackbalphokd).
   ![](https://images.viblo.asia/22eeb797-1bf1-480e-ad2e-10a52b1c0996.PNG)
   
   - Open tool
    ![](https://images.viblo.asia/da09d454-40dc-4c9d-a7b7-6c5925f9f102.PNG)
    
#### 2.2. Tạo một Selenese.
#### 2.2.1. Record: REC

   ![](https://images.viblo.asia/b2d6d409-b612-4335-a96c-84186ac14291.PNG)


  - URL cho việc chạy đầu tiên.
 
     link : https://www.selenium.dev/selenium-ide/docs/en/introduction/getting-started

![](https://images.viblo.asia/b44626ee-11f9-48d8-ba80-da7c97698c4a.PNG)

  - Tạo selenese.

![Các bước tạo selenese](https://images.viblo.asia/eeec95f2-bdbd-4c21-a7f5-133660625f11.gif)


  - Command được tạo ra như sau:

![](https://images.viblo.asia/aacefe91-3f99-49fe-aeb9-6f4c2703ab7c.PNG)

  - Save record
  
![](https://images.viblo.asia/321adc10-4982-47af-a375-5d6451d6b01d.PNG)


  - Thực run test:

![](https://images.viblo.asia/a8c440a3-6614-4418-b32a-ec704fe159c8.PNG)

  
  - Kết thúc test:

![](https://images.viblo.asia/ee99b3b8-e8dd-4f42-9c77-cf381a077687.png)

Bạn đã thực hiện xong các bước cơ bản của Selenium IDE. Ở phần tiếp theo mình sẽ đi sâu vào thành phần của command của Selenium IDE.