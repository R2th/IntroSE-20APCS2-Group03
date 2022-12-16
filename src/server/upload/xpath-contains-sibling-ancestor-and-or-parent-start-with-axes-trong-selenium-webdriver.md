Nếu một Xpath đơn giản không thể tìm thấy những phần tử phức tạp trên web, chúng ta cần sử dụng các chức năng từ thư viện Xpath 1.0, Với sự kết hợp của các chức năng này, chúng ta có thể tạo XPath cụ thể hơn. Hãy thảo luận về 3 chức năng này : 


1. Contains
2. Sibling
3. Ancestor
4. And OR
5. Parent
6. Starts with
7. XPath Axes

Hãy cùng nghiên cứu chúng một cách chi tiết nhé: 
## Contains

sử dụng hàm contains trong Xpath , chúng ta có thể trích xuất ra tất cả các phần tử khớp với  trị text trong contains

ví dụ : 
![](https://images.viblo.asia/998b16f8-b55e-41a1-b1ea-832355b22ae0.png)

## Sibling

Chúng ra có thể sử dụng sibling để tìm phần tử có liên quan đến phần tử khác

 ví dụ : 
```
"//div[@class='canvas- graph']//a[@href='/accounting.html'][i[@class='icon-usd']]/following-sibling::h4"
```

![](https://images.viblo.asia/16a33954-1b80-454f-b077-71653514db63.png)

## Ancestor:
Tìm phần tử dựa vào phần tử cha, chúng ta có thể sử dụng tổ tiên của xpath

ví dụ : 
![](https://images.viblo.asia/5bd048bf-bdee-4162-bf8e-735c7443fb03.png)

## SỬ DỤNG AND and OR

bằng việc sử dụng AND and OR chúng ta có thể đặt 2 điều kiện trong một biểu thức Xpath
* Trường hợp AND : cả hai điều kiện phải đúng thì mới tìm được element
* Trường hợp dùng OR : chỉ cần một trong 2 điều kiện đúng thì có thể tìm được element

ví dụ :
```
Xpath=//*[@type='submit' OR @name='btnReset']
```
```
Xpath=//input[@type='submit' and @name='btnLogin']
```
![](https://images.viblo.asia/7d624b9a-2fe5-4f46-bfc9-9c2f7422b612.png)

## Parent

bằng việc sử dụng Parent bạn có thể tìm node cha của node hiện tại

![](https://images.viblo.asia/2cf405e6-1261-4fed-8bd3-28939e22ab6e.png)

## Starts-with
Sử dụng chức năng Starts-with, bạn có thể tìm thấy phần tử có thuộc tính thay đổi động khi làm mới hoặc các hoạt động khác như nhấp, gửi, v.v.

ví dụ : 
```
Xpath=//label[starts-with(@id,'message')]
```

![](https://images.viblo.asia/e191adef-564f-4b18-b491-4e240dd2f8cf.png)
## Xpath axes
Bằng cách sử dụng XPath axes , bạn có thể tìm thấy các element động và rất phức tạp trên một trang web. XPath axes chứa một số phương thức để tìm một phần tử. Ở đây,  chúng ta sẽ thảo luận về một vài phương pháp.

### Following
hàm này sẽ trả về phần tử tiếp theo của phần tử hiện tại

ví dụ : 
```
//*[starts-with(@name,'first')]//following::div
```

![](https://images.viblo.asia/3faeaa8c-44d8-4442-b6e5-96a59c56d020.png)

### Preceding
 Hàm này sẽ trả về những phần tử ở trước phần tử hiện tại
 
ví dụ : 
```
Xpath= //*[@type='submit']//preceding::input
```

![](https://images.viblo.asia/09ad2519-ada5-4b26-9fc8-7518b0cfe554.png)

### Descendant

Trả về phần tử là con cháu

ví dụ : 
```
Xpath= //*[@id='rt-feature']//descendant::a
```

![](https://images.viblo.asia/23b5a9f8-3ab2-4273-9c17-1e9443717e52.png)

Link tham khảo: 
https://www.guru99.com/using-contains-sbiling-ancestor-to-find-element-in-selenium.html