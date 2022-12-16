# Lời nói đầu

Sự quan trọng của API trong các ứng dụng ngày nay là điều ko thể bàn cãi. Một ứng dụng mà ko có API thì như một cỗ máy tính không kết nối internet vậy.  Và như một điều hiển nhiên, mọi thứ sau khi phát triển một thời gian sẽ hình thành những chuẩn mực chung và đối với API, nó chính là RESTful. Dù hiện tại cũng có rất nhiều vài viết về RESTful API nhưng mình vẫn muốn viết về vấn đề này để đóng góp một phần ý kiến trong việc thiết kế RESTful API. Nếu mình có sai sót gì, mong các bạn hãy giúp mình chỉnh sửa nhé.


# Idempotency trong RESTful Design


Có một điều khá là buồn cười là cho đến bây giờ mình cũng chẳng biết nên dùng từ tiếng Việt nào để giải thích cho từ idempotent. Và mình cũng chẳng thấy ai dùng từ tiếng Việt nào cho nó cả. Ai biết thì chỉ mình nha. Idempotent là một trong các khái niệm dễ gây nhầm lẫn khi thiết kế API. Về định nghĩa thì như sau:

> An idempotent HTTP method is an HTTP method that can be called many times without different outcomes. It would not matter if the method is called only once, or ten times over. The result should be the same. It essentially means that the result of a successfully performed request is independent of the number of times it is executed. For example, in arithmetic, adding zero to a number is idempotent operation.

Vì sao nó dễ gây nhầm lẫn?  Bởi vì khái niệm “Một phương thức HTTP được xem là idempotent nếu sau nhiều lần gọi, nó vẫn trả về kết quả như nhau”. Nhiều người nghĩ rằng với phương thức update hay xóa thì kết quả cho mỗi lần gọi là khác nhau. Keyword cần nắm ở đây là "same outcome, not same response" để có thể phân tích các trường hợp. Cụ thể như sau:

HTTP POST
- Trong RESTful API, POST được sử dụng để tạo mới một resource. Vì vậy, khi gọi cùng một yêu cầu POST N lần, sẽ có N resource được tạo ra. Vì vậy, POST không phải là idempotent.



HTTP GET, HEAD, OPTIONS và TRACE
- GET, HEAD, OPTIONS và TRACE không bao giờ thay đổi trạng tái resource. Những method này chỉ dùng cho việc trích xuất thông tin của resource nên dù có yêu cầu N lần thì cũng sẽ trả về cùng một kết quả. Vì vậy GET, HEAD, OPTIONS và TRACE là idempotent.



HTTP PUT
- Trong RESTful API, PUT được sử dụng để update một resource. Nếu request PUT N lần, thì lần đầu tiên sẽ tiến hành update resource, những lần tiếp theo sẽ tiến hành ghi đè và điều chúng ta cần quan tâm là kết quả cho N lần này đều cho thấy resource đã được update. Mặc dù response có thể khác nhau giữa lần đầu tiên là lần tiếp theo nhưng kết quả thì không thay đổi đối với N lần gọi nên PUT là idempotent.


HTTP PATCH
- HTTP PATCH không phải là idempotent. Đừng vội ngạc nhiên. Mục địch sử dụng PATCH là để update một phần của resource, tức là nó tương tự với PUT. Thế nên nó có thể là idempotent chứ nhỉ. Tuy nhiên, điều này còn cần phải xét vào từng trường hợp. PATCH có phải là idempotent hay không phụ thuộc mạnh mẽ vào việc thế kế PATCH API như thế nào. 

- Ví dụ đối với `PATCH /products/1 {"name": "Dock"} ` thì với N lần request kết quả vẫn trả về là product có id = 1 sẽ có name là Dock nên trường hợp này nó là idempotent

- Còn đối với `PATCH /products/1 {change: "name" from: "Capble" to: "Dock"} ` thì lần request đầu tiên sẽ trả kết quả là success còn những lần sau thì là failure. Do đó nó không phải là idempotent.

- Việc xác định dựa vào từng trường hợp là lý do chính khiến PATCH không được xem là idempotent. (mình đã bị nhầm ở đoạn này và đã sửa lại)


HTTP DELETE
- Đối với trường hợp DELETE thực tế thì chúng ta sẽ hide resource chứ không xóa bỏ hoàn toàn. Tức là chúng ta sẽ tiến hành update resource. Hoặc rơi vào trường hợp xóa hẳn resource thì đối với N lần request, lần đầu tiên sẽ xóa resource và những request tiếp theo không còn gì để xóa, reponse lúc này sẽ là  404 (Not Found), tuy nhiên kết quả vẫn là resource đã được xóa. Không có gì nghĩa là đã được xóa. Vì thế DELETE là idempotent.


Vậy tại sao phải cần idempotent và vì sao mình nhắc đến idempotent đầu tiên? Điều này là dễ đoán vì đối với thiết kế API, việc đầu tiên cần làm là xác định request sẽ dùng phương thức HTTP nào.  Việc xác định sử dụng phương thức HTTP nào, kết quả trả về và response bao nhiêu hẳn là khiến nhiều bạn đâu đầu và idempotent là cách giảm bớt sự khó khăn. Vậy nên hãy nắm rõ idempotent và áp dụng nó trong thiết kế RESTful API nhé.


# Hypermedia

Đầy đủ thì nó sẽ là Hypermedia As The Engine Of Application State (HATEOAS), cái tên dài dòng và không được ưa thích cho lắm nên hầu như tất cả mọi người đều gọi nó là hypermedia. Vậy tại sao phải cần chú ý về hypermedia? Vì sao hypermedia lại được khuyến nghị trong thiết kế RESTful API?

Đầu tiên hãy đến với định nghĩa của hypermedia:

> Hypermedia As The Engine Of Application State (HATEOAS) is a component of the REST application architecture that distinguishes it from other network application architectures.
> With HATEOAS, a client interacts with a network application whose application servers provide information dynamically through hypermedia. A REST client needs little to no prior knowledge about how to interact with an application or server beyond a generic understanding of hypermedia.

Định nghĩa nói rằng client không cần nắm nhiều kiến thức về ứng dụng hay server mà chỉ cần hiểu biết về hypermedia. Tức là hypermedia hỗ trợ cho việc khám phá ứng dụng cũng như giúp việc sử dụng API trở nên dễ dàng hơn. Tất cả những gì client cần là root link của API và hypermedia sẽ cung cấp tất cả những thứ còn lại. Để dễ hình dung, chúng ta hãy xem một ví dụ. 

Đầu tiên là GET với root URL: GET http://localhost/ và kết quả như sau

```
{
    "_links": {
        "self": {
            "href": "/"
        },
        "swagger": {
            "href": "/swagger"
        },
        "product": {
            "href": "/Products"
        },
        " suppliers": {
            "href": "/Suppliers"
        }
    }
}
```

Dễ dàng nhận thấy là từ root chúng ta có thể đi tiếp đến các resource về swagger, product, supplier. Tuy nhiên chúng ta chưa biết rõ những URL chấp nhận phương thức HTTP nào. Liệu đây có phải là thiếu xót của hypermedia? Câu trả lời là không, bạn hoàn toàn có thể đưa thông tin method vào trong hypermedia, ngay dưới href. Tuy nhiên nó không hẳn là một ý tưởng tốt. Việc thêm mô tả về method chỉ cần thiết đối với một số hành vi nhất định. Còn các trường hợp còn lại chúng ta hoàn toàn có thể xác định bằng phương thức OPTION. Mình biết hiện tại chưa nhiều bạn thực sự dùng đến OPTION và cũng không quan tâm đến nó. Với API chỉ cần GET, POST, PUT, DELETE là đủ. Nhiều bài viết về API mình tìm hiểu hầu như đều thiếu phần dành cho OPTION. Đối với mình đây là một phương thức cực kì quan trọng trong việc khám phá API. OPTION và hypermedia là cặp đôi hoàn hảo cho việc khám phá API. Trở lại với ví dụ, bạn chỉ cần sử dụng phương thức OPTION là có thể xác định được các phương thức cho phép sử dụng:

![](https://images.viblo.asia/44c3492b-a8d4-47ad-b413-db70be26156a.png)

Ở mục allow cho thấy chúng ta có thể dùng GET và OPTION. Bây giờ hãy thừ GET http://localhost/products
```
{
    "_links": {
        "self": {
            "href": "/Products?page=1"
        },
        "next": {
            "href": "/Products?page=2"
        },
        "Products:create": {
            "href": "/Products",
            "method": "POST"
        }
    },
    "_embedded": {
        "Products": [
            {
                "price": 49.00,
                "description": "Dock for iPhone/iPad",
                "name": "Dock",
                "supplierId": 1,
                "id": 1,
                "_links": {
                    "self": {
                        "href": "/Products/1"
                    },
                    " supplier": {
                        "href": "/Suppliers/1"
                    }
            }, 
            {
                "price": 499.00,
                "description": "Apple tablet device",
                "name": "iPad",
                "supplierId": 1,
                "id": 2,
                "_links": {
                    "self": {
                        "href": "/Products/2"
                    },
                    " supplier": {
                        "href": "/Suppliers/1"
                    }
            }
       }
}
```

 Ở ví dụ trên, ngoài thông tin sản phẩm và giá được hiển thị, nó còn bao gồm cả URL truy cập đến các sản phẩm đó. Không những thế nó còn hỗ trợ việc phân trang và mô tả rõ rành việc tạo mới sản phẩm bằng cách nào. Đây cũng là ví dụ đơn giản về hypermedia. Mình cũng muốn viết nhiều hơn về hypermedia nhưng trong khuôn khổ bài viết này mình nghĩ chỉ nên nói gọn một số điều cần lưu ý về nó.
Lợi ích khi sử dụng hypermedia
-	Giúp client dễ dàng khám phá API mà không cần phải nắm hết tất cả kiến thức vể ứng dụng.
-	Linh hoạt trong việc thay đổi cấu trúc. Vì client không cần biết tất cả các URL endpoint và các response chỉ chứa các URL liên quan đến endpoint hiện tại nên việc thay đổi các endpoint mà không gây trở ngại đến client.


Tuy nhiên không hẳn là việc sử dụng hypermedia luôn là ý tưởng tốt. Sử dụng hypermedia khiến cho REST đã khó nay còn khó hơn. Nó cũng có một số nhược điểm nhất định. Chẳng hạn như:
-	Bigger Response Payload: đây là điều hiển nhiên khi response có thêm thông tin.
-	Chưa có một tiêu chuẩn nhất định cho hypermedia. Việc đưa thông tin nào, không đưa thông tin nào vào hypermedia cũng chưa có một quy chuẩn nhất định.
-	Hypermedia là bậc cao nhất của REST ([REST Maturity Model -  Leonard Richardson](https://www.crummy.com/writing/speaking/2008-QCon/act3.html)) nên việc áp dụng hypermedia sẽ khiến REST đã khó nay còn khó hơn. Vì thế hãy cân nhắc dự án của bạn có cần hypermedia không nhé.


# Cacheable 

Một trong số điều cần lưu ý và phải lưu ý đó chính là caching. Bao nhiêu lỗi mê tín dị đoan các kiểu đều có liên quan đến caching. Có thể nói caching mang đến trải nghiệm tuyệt vời nhưng bên cạnh đó, nó có thể mang đến ác mộng nếu không xử lý tốt. Và với caching, bạn cần nắm rõ những vấn đề sau:

Vai trò của caching là gì? 
Đa số mọi câu trả lời đều là cải thiện performance, tăng tốc độ. Một câu trả lời rất phổ biển và chưa nói lên hết vai trò của caching. Chính xác thì vai trò của caching là
- giảm băng thông
- giảm độ trễ
- giảm tải cho server
- ẩn lỗi network.



Chúng ta nên caching dữ liệu như thế nào?
Dữ liệu tĩnh (ít thay đổi) hay dữ liệu động (thường xuyên thay đổi)? Dữ liệu ít truy cập hay dữ liệu thường xuyên truy cập? Hẳn là không ít người đau đầu về vấn đề này. Đa số thường nghĩ rằng đối với dữ liệu thường xuyên thay đổi, hay dữ liệu ít truy cập thì việc caching không mang lại nhiều ý nghĩa. Dữ liệu có thể đã thay đổi và chúng ta cần fetch lại để đảm bảo tính đúng đắn. Suy nghĩ này là không phải là sai nhưng không có nghĩa là chúng ta sẽ không xử lý cache cho các trường hợp này. 


Đối với trường hợp dữ liệu thường xuyên thay đổi, thậm chí thay đổi trong thời gian ngắn. Chúng ta cũng cần caching để giảm tải cho server. Quá nhiều request update cùng lúc có thể sẽ gây ra lỗi khi xử lý không tốt. Việc sử dụng cahing có thể giúp cho chúng ta có thể loại bỏ những update không hợp lệ từ phiên bản caching đang làm việc. Điều này giúp tăng khả năng xử lý đồng thời của ứng dụng. Điều cần làm là kiểm soát thời gian sống của caching. xác định đâu là bản update mới nhất dựa vào eTag hoặc Last-Modified. Caching sẽ là một trợ thủ đắc lực trong việc xử lý đồng thời.


Còn đối với dữ liệu ít truy cập, việc tạo ra một phiên bản cache giúp cho chúng ta tăng khả năng ứng biến khi có sự thay đổi mức độ truy cập. Việc thay đổi hành vi của người dùng cần phải được lường trước và luôn có kế hoạch dự phòng để tránh trường hợp lỗi server. Giả sử một resource có lượt truy cập 1 lần/ ngày bỗng nhiên tăng đột biến lên tới hàng trăm lần request/ phút. VIệc có một bản cache với thời gian sống lâu hơn so với dữ liệu động là một ý tưởng không tồi cho trường hợp này.


# Lời kết

Trên đây là những ý kiến của mình trong việc thiết kế RESTful API hy họng có thể giúp mình cho các bạn ban đầu tiếp xúc và làm việc với RESTful API.
Bài viết ở mức độ basic trên phương diện hiểu biết cá nhân trong quá trình học và làm cũng như vọc vạch đọc thêm các kiểu nên vẫn còn nhiều sai sót. Rất mong các bạn có thể góp ý thêm.


# Tham khảo

REST API turtorial https://restfulapi.net/