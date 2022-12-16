* Đối với một bất kỳ lập trình viên Web nào **console.log()** là quá quen thuộc để debug nhanh chóng một số vẫn đề trong code, nó giống như một liều thuốc cho hầu hết các bệnh.
* Nhưng ngoài thông báo console.log () được sử dụng phổ biến nhất để in message trong trình duyệt, có rất nhiều cách khác nhau để làm cho quá trình debug của bạn dễ dàng hơn rất nhiều. Hãy xem ở phía dưới nhé !!!
# Một số console cơ bản
## console.log( ) | info( ) | debug( ) | warn( ) | error( )
* Chúng ta sẽ trực tiếp in ra string cùng với màu sắc phù hợp dựa trên loại console được cung cấp

![](https://images.viblo.asia/36de504d-54b9-47c8-a634-8cd08238ac49.png)
## Use placeholders
* Có các placeholders khác nhau có thể được sử dụng như:
    *  **% o** - trong đó có một đối tượng
    * **% s** - trong đó có một chuỗi
    *  **% d** - dành cho số thập phân hoặc số nguyên
* Ví dụ:

![](https://images.viblo.asia/10a13e85-0e57-4b0a-8a1d-6abd5a25026e.png)
##  Add CSS to console messages
* Ngoài việc chỉ hiển thị một kiểu chữ ra màn hình, bạn cũng có thể thêm css vào trong console để nó trở nên thú vị, sinh động hơn, như ví dụ ở phía dưới:

![](https://images.viblo.asia/2ac89039-f7e3-450a-9fb1-3abc40d2e3a7.png)

* Hoặc highlighting từ đặc biệt:

![](https://images.viblo.asia/ee2d4684-ce0f-4bb0-a8f2-fbd4766f8425.png)
## console.dir( )
* Sử dụng  console.dir( ) để in ra một chuỗi JSON

![](https://images.viblo.asia/7a6918bc-0e29-4789-915b-1d8116699bcf.png)

## HTML elements in console
* Get the HTML elements in the console just like inspecting elements

![](https://images.viblo.asia/96a1fed9-a6c7-443c-a752-28b57bbef481.png)
 để đếm số lần mà cụ thể là số lần count() đã được gọi 
## console.table ( )
* Một cái khá thú vị của console nữa là bạn có thể in ra một bảng từ một mảng JSON, xem ví dụ sau để thấy sự hay ho đó:

![](https://images.viblo.asia/a9750064-4700-4497-9e71-1b01398e3122.png)

## console.group( ) & console.groupEnd( )
* Có thể nhóm message thành một group với console 

![](https://images.viblo.asia/273d4509-a34c-4374-ac4f-213efa5da54a.png)
## console.count( )
* console.count( ) để đếm số lần mà cụ thể là số lần count() đã được gọi 

![](https://images.viblo.asia/ac921586-2853-4ae0-a852-bbb469f29ca0.png)
* Hàm này có một **label** đối số tùy chọn.
* Nếu **label** được cung cấp, hàm này sẽ ghi lại số lần count() đã được gọi với **label** cụ thể đó.

![](https://images.viblo.asia/23d5e2ea-e165-4370-a2b2-4bba6025bdd1.png)
## console.assert( )
* Điều này khá tiện lợi khi bạn chỉ muốn in logs đã chọn, tức là nó sẽ chỉ in đối số sai. Nó không làm gì cả nếu đối số đầu tiên là đúng.

![](https://images.viblo.asia/3252c26b-85d0-47a7-9df3-0b44bfa77d1a.png)
## console.trace( )
* This method displays a trace that shows how the code ended up at a certain point

![](https://images.viblo.asia/d53819db-c371-4a8d-afa7-c5e321f08861.png)

## console.time( )
* Một function chuyên dụng để theo dõi thời gian thực hiện action, console.time () là cách tốt hơn để theo dõi microtime được thực hiện cho các lần thực thi JavaScript.
![](https://images.viblo.asia/9b99005c-967b-4d01-a3e3-4e73928c9f81.png)

## console.memory( )
* Một cách hay ho để bạn kiểm tra sử dụng bộ nhớ của trình duyệt như thế nào?

![](https://images.viblo.asia/35fd3f2b-b743-4304-8be1-c7da1ff72c43.png)
## console.clear( )
* Để xóa tất cả console messages trước đó, sử dụng console.clear( )
# Tham khảo
* Bạn có thể xem tất cả code phía trên tại [Đây](https://gist.github.com/Harshmakadia/fc25e56cb8f49145f4c9b3528f04215f)
* https://bit.ly/2PJ8k8y