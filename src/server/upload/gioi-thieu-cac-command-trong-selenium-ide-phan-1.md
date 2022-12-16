# 1. Selenium IDE
Selenium IDE (**Integrated Development Environment**) là một add-on của trình duyệt, dùng để tạo ra các Testcase 1 cách nhanh chóng thông qua chức năng record-playback của IDE

Sau khi cài đặt, Selenium có giao diện như bên dưới:
![](https://images.viblo.asia/8e43eb53-d7da-4502-8132-7ae0e15515e2.png)
# 2.Giới thiệu về Selenium Commands
Các lệnh Selenium Command gồm có tối đa 2 tham số: 
* Target(Locator: vị trí của element) 
* Value ( giá trị check với kết quả thực tế)

Các tham số có thể có hoặc không, phụ  thuộc vào Command


   ## 2.1 Các loại Selenium commands:
* **Action**

    Gồm các lệnh thao tác trực tiếp với các phần tử : click, type,...
* **Accessors**

     Gồm các lệnh để lưu giá trị vào một biến: storeTitle, store,...
* **Assertions**

     Gồm các lệnh để kiểm tra diều kiện được thỏa mãn: assert, verify và WaitFor
 
## 2.2 Một số lệnh Command thông dụng
* **open**: Mở một ứng dụng bằng URL -> Phải nhập thông tin trường Target 
* **click**: Click vào bất kì element nào trong ứng dụng ->  Phải nhập thông tin trường Target 
* **type**: Nhập giá trị text vào trường text trong ứng dụng -> Phải nhập thông tin trường Target, Value
* **assert text/ verify text**: Kiểm tra UI của element thực tế với giá trị text mong muốn        
 -> Phải nhập thông tin trường Target, Value
    ### Note: Khi nào dùng assert/ verify 
1.  **assert**: Khi câu lệnh đó sai thì kịch bản test sẽ dừng lại luôn mà không chạy những case sau đấy
1.  **verify**: Khi câu lệnh đó sai thì Selenium sẽ bỏ qua nó và chạy những case sau đấy

* **edit content**: Thay đổi UI của  element -> Phải nhập thông tin trường Target, Value
* **pause:** Dừng việc thực thi test trong khoảng thời gian nhất định -> Phải nhập thông tin trường Target
* 
**VD**: Sử dụng **pause, edit content** ![](https://images.viblo.asia/1ab6b9ed-ee6d-40ae-bec6-3b3b4f2df0e7.png)
* **wait for element visible**: Chờ thực hiện thao tác tiếp trong thời gian đã định
    ### Note: Sự khác nhau giữa pause với wait for element visible
1.  **pause**: khi đã setting thời gian (x) thì dù thao tác tiếp đã được tìm thấy thì vãn tiếp tực chờ hết (x) thời gian mới chuyển sang bước tiếp theo
2.  **wait for element visible**: mặc dù đã setting thời gian (x), nhưng khi thao tác tiếp đã được tìm thấy thì sẽ chuyển qua bước tiếp theo dù thời gian (x)vẫn còn

### 2.3. Demo

* Viết kịch bản test tìm kiếm trên https://www.guru99.com/ trên SElenium IDE

* Step: 
1. Mở  website https://www.guru99.com/
2. Check website được mở đã chính xác chưa
3. Click trường tìm kiếm
5. Nhập thông tin càn tìm kiếm: VD IDE
6. Click icon

![](https://images.viblo.asia/2b954b4a-7f43-4bb4-a3f0-e3720a392049.png)

Sau khi viết xong kịch bản test click vào icon Run curent test ( hoặc ấn Ctrl R) để chạy. 
![](https://images.viblo.asia/7128a5ea-6376-4f63-af8e-47afb0dda02d.png)

Selenium sẽ chạy và báo kết quả cho từng step
![](https://images.viblo.asia/5fa1d0c7-e42e-4b12-9b8b-67b3a329abfd.png)

## Tài liệu tham khảo
https://www.seleniumhq.org/selenium-ide/docs/en/api/commands/#click
https://www.academia.edu/24386662/Day_la_t%E1%BA%ADp_h%E1%BB%A3p_cac_l%E1%BB%87nh_th%C6%B0%E1%BB%9Dng_g%E1%BA%B7p_trong_Selenium_ide