Ở bài viết trước tôi đã giới thiệu tới các bạn cách tạo các case kiểm thử dựa vào checklist đã liệt kê ra được. Bài này, tôi sẽ hướng dẫn các bạn các cách export kết quả sau khi đã chạy kiểm thử tự động các trường hợp trong danh sách Checklist
> Link để xem lại bài viết trước là: https://viblo.asia/p/kiem-thu-tu-dong-tren-form-dang-nhap-su-dung-python-924lJxBbKPM
>
# 1. Cách Export đem lại hiệu quả nhất
Có 2 cách đơn giản và hiệu quả nhất để export kết quả sau khi chạy hết các trường hợp kiểm thử, đó là:

1. Cần thông tin gì thì chỉ export thông tin đó trực tiếp ra file
2. Có danh sách checklist và Export cột kết quả ra chính file đó
# 2. Ưu/ nhược điểm của từng kiểu Export
Sau một thời gian quan sát và thực hiện, từ quan điểm và kinh nghiệm của cá nhân, tôi thấy 2 loại export sẽ phù hợp cho 2 đối tượng khác nhau, có ưu và nhược điểm riêng. 

- Đối với kiểu 1, thông thường developer sẽ sử dụng trong giai đoạn Unit Test và thông tin cần export ra file chỉ đơn giản bao gồm: ID- Case, Viewpoint, Kết quả. Ví dụ như hình bên dưới file Export kết quả:
![](https://images.viblo.asia/016aac86-9ebc-4cba-bedf-f6954e6d04d0.png)

  **Ưu điểm:** Mục đích giúp dev không bị bỏ lỡ các trường hợp, đảm bảo ít bug xảy ra nhất có thể. Đồng thời gửi kết quả tới cho leader hoặc khách hàng khi có yêu cầu.
  
  **Nhược điểm:** Nếu Teser kế thừa các case kiểm thử tự động của dev và muốn điền kết quả vào file CheckList thì phải fill thủ công bằng tay

- Đối với kiểu 2, thông thường Tester sẽ thực hiện việc viết kiểm thử tự động lần lượt theo checklist. Sau đó export kết quả vào thẳng file này.

  **Ưu điểm:** 
  
  + Giúp Tester tối ưu được thời gian fill kết quả, cover được từ phía backend lẫn end user. 
  
  + Dev cũng có thể tận dụng danh sách CheckList từ phía bên Tester để thực hiện kiểm thử giai đoạn UnitTest nhanh chóng và hiệu quả
 
  **Nhược điểm:** Khi có thay đổi bất ký vị trí từng dòng trong checklist thì Tester hay Dev cũng phải thay đổi code. Tránh trường hợp fill kết quả không đúng vào từng trường hợp
#   3. Hướng dẫn export
## 3.1. Export trực tiếp kết quả không theo Checklist
```python
results = [["ID- Case", "Check Viewpoint", "Actual Result"]]

browser = click_button(browser)
case_1 = validate_with_username_and_not_password(browser)
results.append(["Case 1", u"Username or Email hợp lệ", "Pass" if case_1 else "Fail"])

```
- `results = [["ID- Case", "Check Viewpoint", "Actual Result"]]`: Định nghĩa dòng đầu tiên của file export. Muốn export thông tin gì, chỉ cần thay đổi và thêm vào mảng này là được
- `case_1 = validate_with_username_and_not_password(browser)`: Truyền giá trị của hàm đã khai báo vào biến có tên là case_1
- `results.append(["Case 1", u"Username or Email hợp lệ", "Pass" if case_1 else "Fail"])`: Đẩy dữ liệu cho trường hợp kiểm thử đầu tiên. Sử dụng *u""* khi muốn viết tiếng việt

Tương tự cho các case kiểm thử tiếp theo

```python
myFile = open('result.csv', 'w')
writer = csv.writer(myFile)
writer.writerows(results)

browser.close()

```
- `myFile = open('result.csv', 'w')`: Mở file có tên là result.csv và cấp quyền ghi file
- `writer = csv.writer(myFile); writer.writerows(results)`: Sử dụng thư viện csv để ghi file

**Noted:** Để sử dụng cần import thư viện csv. Đây là thư viện mặc định, sau khi cài đặt Python

Link demo: 

## 3.2. Export kết quả vào thẳng file Checklist
Lưu ý: Do việc xử lý file .xlsm khó hơn so với file .csv. Do vậy, cần chuyển file Checklist về định đạng .csv và utf8 để đọc được với tiếng việt.

-  Đây là file checklist:
![](https://images.viblo.asia/4a0ddb3c-d2fd-4a56-b362-eed97ab01dc2.jpg)

- First, ta sẽ viết đoạn code như sau:
```python
results = []

browser = click_button(browser)
case_1 = "Pass" if validate_with_username_and_not_password(browser) else "Fail"
results.append(case_1)

```
 - Đoạn code này, ý tưởng ở đây là đẩy kết quả mỗi case test vào mảng `results`. Kết quả mong muốn sẽ kiểu như là: `results = ["Pass", "Fail", "Pass"...]`. Bạn có thể hiểu là case test 1 kết quả là "Pass", case test 2 kết quả là "Fail",...
 - Sau khi có kết qua test, mình sẽ ghi vào file check list. Ý tưởng ở đây là: đọc mỗi line của file checklist, sau đó gán kết quả vào line đó. Đơn giản phải không nào. Cụ thể về code
 ```python
bottle_list = []
with open('checklist.csv', newline='', encoding='utf-8') as f:
    reader = csv.reader(f)
    for index, row in enumerate(reader):
        if index == 0:
            bottle_list.append(row)
        else:
            row.append(results[index - 1])
            bottle_list.append(row)
 ```
 
 Giải thích một chút về đoạn code trên:
 
 `with open('checklist.csv', newline='', encoding='utf-8') as f`: Đọc file `checklist.csv` với định dạng `encode="utf-8"`.
 ```python
 for index, row in enumerate(reader):
    if index == 0:
        bottle_list.append(row)
    else:
        row.append(results[index - 1])
        bottle_list.append(row)
 ```
 `bottle_list` là mảng kết quả cuối cùng để ghi vào file check list. Nó sẽ tương ứng với `results` của phần 2.
 Đoạn này, bạn có thể hiểu là mình sẽ for loop từng dòng của file checklist, sau đó ghi dữ liệu kết quả test vào.
 
 Do dòng đầu tiên là dòng tiêu đề, mình đơn giản chỉ sử dụng `bottle_list` append tiêu đề vào. Những dòng kế tiếp, dựa vào index của `results` - kết quả test, mình sẽ đẩy kết quả vào tương ứng. `row` bản chất là một mảng cụ thế như trong checklist vừa rồi, ví dụ:
 
 - Trước:
 ```python
 row = ["1", u"Username or Email hợp lệ ", u"Login thành công. Tự động chuyển tới màn hình trang chủ"] 
 ```
 - Sau khi append kết quả test vào, row sẽ là: 
 ```python
 row=["1", u"Username or Email hợp lệ ", u"Login thành công. Tự động chuyển tới màn hình trang chủ", "Pass"]
 ```
 
 Sau khi chạy hết vòng for loop biến `bottle_list` của mình sẽ là:
 ```python
[
["STT", u"Check Viewpoint", u"Kết quả mong muốn", u"Kết quả thực tế"],
["1", u"Username or Email hợp lệ ", u"Login thành công. Tự động chuyển tới màn hình trang chủ", "Pass"],
["2", u"Bỏ trống trường Username or email, Password đúng", u"Đăng nhập không thành công. Hiển thị message: Username or Email is required", "Pass"],
["3", u"Username or Email đúng, Bỏ trống trường Password", u"Đăng nhập không thành công. Hiển thị message: Password is required", "Pass"],
["4", u"Username or Email sai khi sử dụng ký tự thông thường, Password đúng", u"Đăng nhập không thành công. Hiển thị message: The user credentials were incorrect.", "Pass"],
["5", u"Username or Email đúng, Password sai", u"Đăng nhập không thành công. Hiển thị message: The user credentials were incorrect.", "Pass"],
...
]
 ```
 
Thế là xong, Sau khi có mảng này rồi. Mình sẽ ghi đè lên file `checklist.csv` giống như đoạn code ở phần 2:
```python
with open('checklist.csv', "w") as myFile:
    writer = csv.writer(myFile)
    writer.writerows(bottle_list)
```
> Link code demo: https://github.com/ntvan/viblo

Như vậy, tôi đã hướng dẫn xong cách viết case kiểm thử và export ra csv. Đừng quên nhấn follow hoặc like nếu thấy hữu ích :) 

Trân trọng cảm ơn!