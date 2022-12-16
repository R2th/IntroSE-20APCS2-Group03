Lại là mình đây anh em, hôm nay chúng ta cùng tìm hiểu lại một chút về SQL Joins nha, cũng coi như là ôn tập lại một chút :+1::+1::+1:

Vậy thì chúng ta sẽ thảo luận về các vấn đề nào nhỉ ?

* Joins là gì ?
* Có bao nhiêu kiểu joins ?
* Tìm hiểu về các kiểu joins và ví dụ

Bắt đầu thôi :

# 1. Joins là gì ?
Nói một cách đơn giản thì Join = Combine

Joins được sử dụng để truy xuất dữ liệu từ hai hoặc nhiều table dựa trên một số các columns liên quan. Nói một cách dễ hiểu, các table này luôn một sự  liên kết với nhau bằng cách nào đó.

# 2. Có bao nhiêu kiểu joins ?

Nhìn chúng thì chúng ta đang có 5 kiểu joins :

1.  Inner Join
2.  Left Join
3.  Right Join
4.  Full Join
5.  Cross Join

Và để tìm hiểu về các kiểu Joins này, chúng ta tạo ra hai bảng là Category và Product :
![](https://images.viblo.asia/aa649e69-04b9-4394-9e0b-f0d546625dfb.png)


# Inner Join![image.png](https://images.viblo.asia/409ab1fd-8e4a-4739-8d52-6b367d9615cd.png)

Sau khi chạy thì chắc hẳn chúng ta cũng thấy là Inner Join sẽ trả về những data từ các bảng mà chỉ có giá trị phù hợp với nó mới có thể tìm thấy.

Ví dụ : Chúng ta muốn lấy list các product và tên category từ bàng Product với các category_id tương ứng của nó. Nếu category id có xuất hiện trong cả hai bảng thì toàn bộ product đó sẽ được chọn và ngược lại.

![image-20210617182655-1.png](https://images.viblo.asia/cb54ed12-8ed2-47a7-9092-3332290d8670.png)

**Syntax**

```
SELECT table1.column, table1.column, table2.column, table2.column
From table1
Inner Join table2 ON table1.column = table2.column
```

# Left Join :
Để dễ tưởng tượng thì mình có hai tập hợp như sau:

![image-20210617175115-10.png](https://images.viblo.asia/1ad99d9d-8485-4390-9161-5005c315fff2.png)


Left Join sẽ trả về tất cả các kết quả từ bảng bên trái ngay cả khi không tìm thấy kết quả phù hợp nào từ bảng bên phải. Trường hợp không tìm thấy kêt quả phù hợp nào trên bảng bên phải, kết quả trả về là NULL.

Ví dụ : Chúng ta muốn lấy tất cả các category mà có product tương ứng :

![image-20210617175115-11.png](https://images.viblo.asia/97dc46f1-63d0-4123-888e-d0b8f010d431.png)

# Right Join :

![image-20210617175115-12.png](https://images.viblo.asia/6f2a92d2-ec10-481d-acaf-cae2a3d9b282.png)

Đơn giản thì Right Join đối lập với Left Join thôi =))

Right Join sẽ trả về tất cả các kết quả từ bảng bên phải ngay cà khi không tìm được kết quả tương ừng từ bảng bên trái. Nếu không tìm thấy kết quả tương ứng từ bảng bên trái thì kết quả sẽ là NULL.

Ví dụ : Chúng ta muốn lấy tất cả list products và các category tương ứng :

![image-20210617175115-13.png](https://images.viblo.asia/8d788205-1cca-4881-ba91-29e03a5c3773.png)

# Full Join :

![image-20210617175115-14.png](https://images.viblo.asia/4a2dd3eb-2f5e-4de8-91c4-a1ec1d5d2232.png)

FULL JOIN trong SQL trả về tất cả bản ghi ở bảng trái và bảng phải kết hợp lại. Nói cách khác,nó là kết hợp kết quả của cả hai loại LEFT và RIGHT JOIN.

Bảng được kết hợp sẽ chứa tất cả bản ghi từ cả hai bảng và điền vào đó giá trị NULL cho các giá trị không khớp nhau.

Ví dụ : Chúng ta muốn kiểm tra xem liệu bảng của chúng ta có tất cả dữ liệu cân thiết cho khách hàng hay không category có được gắn phù hợp với product hay không ? trong trường hợp đó thức ta sẽ thực hiện full join để kiểm tra xem là có giá trị nào đang NULL hay không.

![image-20210617175115-15 (1).png](https://images.viblo.asia/83ce5e6e-e331-4ab0-a245-c29436f51c52.png)

# Cross Join :
![image-20210617175115-16.png](https://images.viblo.asia/a073a91d-e9e0-44bb-941d-82779459cafb.png)

Trong Cross Join thì mỗi row của bảng đầu tiên sẽ kết hợp với mọi row khác ở bảng thứ hai.
Ví dụ :


![image-20210617175115-17.png](https://images.viblo.asia/8a646212-1b3c-454d-a0a7-1e7613422638.png)

# Kết luận
Vậy thì chúng ta sẽ có những gì nhỉ ?

* JOINS cho phép kết hợp dữ liệu từ nhiều bảng thành một kết quả duy nhất giúp giảm thiểu chi phí máy chủ.
* Có các kiểu join sau : Inner, Left, Right, Full và Cross Join.
* Inner Joins chỉ trả về các rows đáp ứng điều kiện phù hợp.
* Full Join là sự kết hợp của Left và Right Join.

Vậy là bài viết của mình đã kết thúc rồi.

Nếu thấy hay, hãy cho mình một **like**, **share** và **upvote** nha

Cảm ơn mọi người.