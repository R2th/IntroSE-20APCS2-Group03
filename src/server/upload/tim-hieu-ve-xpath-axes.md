Xpath nhiều lúc sẽ không thể truy cập được theo cách thông thường, mà đòi hỏi chúng ta phải khéo léo kết hợp các nodes lại với nhau 

XPath Axes là tập hợp rất nhiều cú pháp hỗ trợ truy vấn đến các mối quan hệ trong Nodes. Và mục đích cuối là tìm đến element mà ta đang tìm kiếm. 

Vậy XPath Axes sẽ có những cú pháp nào, tác dụng của nó là gì. Thì bài sau đây mình sẽ chia sẻ để mọi người hiểu thêm về XPath Axes. 
# 1. Following
``Xpath=//div[@class='mobile']//following::span`` cho phép lấy ra tất cả các thẻ span trong mã nguồn nằm sau một thẻ div có class  là ‘mobile’.

![](https://images.viblo.asia/62e18143-ea52-47bb-be69-4553c3ffaf3f.png)
# 2. Preceding
``Xpath=//div[@class='mobile']//preceding::span``  cho phép lấy ra tất cả các thẻ span trong mã nguồn nằm trước một thẻ div có class  là ‘mobile’.

![](https://images.viblo.asia/28ebeaf2-8d79-4223-989d-d91c9adfcc6e.png)
# 3. Descendant
``Xpath=//div[@class='mobile']//descendant::span`` cho phép lấy ra tất cả các thẻ span trong mã nguồn là con cháu của một thẻ div có class  là ‘mobile’.

![](https://images.viblo.asia/564fa9a6-1ea6-41da-8be9-371f7a5fe7f2.png)

** Cách dùng của Following-sibling, Preceding-sibling cũng giống với Descendant, khi sử dụng 1 trong 3 cái này thì đều cho kết quả xpath trả về giống nhau. 
# 4. Ancestor
``Xpath=//div[@class='mobile']//ancestor::div`` cho phép lấy ra tất cả các thẻ div trong mã nguồn là cha mẹ, tổ tiên của một thẻ div có class  là ‘mobile’.

![](https://images.viblo.asia/d045dd29-1e3d-48e3-8752-a973cdd04dc2.png)
# 5. Parent
``Xpath=//div[@class='mobile']//parent::span`` cho phép lấy ra tất cả các thẻ span là thẻ cha trong thẻ div có class  là ‘mobile’.

![](https://images.viblo.asia/a3b7e509-e63d-44ce-af47-2a5cd99729f0.png)
# 6. Child
``Xpath=//div[@class='mobile']//child::span`` cho phép lấy ra tất cả các thẻ span là thẻ con trong thẻ div có class  là ‘mobile’.

![](https://images.viblo.asia/2537e7b9-e30c-44f3-8ae1-18318542aa95.png)

Tham khảo thêm bảng đầy đủ của XPath Axes: 

|AxisName | 	Định nghĩa | 
| -------- | -------- | 
| ancestor     | Chọn tất cả tổ tiên (cha mẹ, ông bà, v.v.) của phần tử chỉ định     |
|ancestor-or-self  |Chọn tất cả tổ tiên (cha mẹ, ông bà, v.v.) của phần tử chỉ định và  chính nó|
|attribute  |Chọn tất cả các thuộc tính của phần tử chỉ định|
|child|Chọn phần tử con của phần tử chỉ định|
|descendant|Chọn tất cả các phần tử con, cháu của phần tử chỉ định|
|descendant-or-self  |Chọn tất cả các phần tử con, cháu của phần tử chỉ định và chính nó|
|following|Chọn tất cả các phần tử nằm sau phần tử chỉ định|
|following-sibling  |Chọn tất cả anh chị em sau phần tử chỉ định|
|namespace|Chọn tất cả namespace của phần tử chỉ định|
|parent|Chọn tất cả phần tử cha của phần tử chỉ định|
|preceding|Chọn tất cả các phần tử nằm trước phần tử chỉ định|
|preceding-sibling  |Chọn tất cả anh chị em trước phần tử chỉ định|
|self|Chọn phần tử chỉ định|