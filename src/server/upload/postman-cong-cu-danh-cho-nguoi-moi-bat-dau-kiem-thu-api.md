## Postman là gì?

Postman hiện là một trong những công cụ phổ biến nhất được sử dụng trong kiểm thử API. Nó bắt đầu vào năm 2012 như một dự án phụ của Abhinav Asthana để đơn giản hóa quy trình làm việc API trong kiểm thử và phát triển. API là viết tắt của giao diện lập trình ứng dụng cho phép các ứng dụng phần mềm giao tiếp với nhau thông qua các lệnh gọi API.

## Tại sao lại sử dụng Postman?

Với hơn 4 triệu người dùng hiện nay, Postman đã trở thành một công cụ được lựa chọn vì những lý do sau:

1. Khả năng truy cập - Để sử dụng Postman, người ta chỉ cần đăng nhập vào tài khoản của chính họ để dễ dàng truy cập các tệp mọi lúc, mọi nơi miễn là ứng dụng Postman được cài đặt trên máy tính.
2. Sử dụng Collection - Postman cho phép người dùng tạo collection cho các lệnh gọi API của họ. Mỗi collection có thể tạo các thư mục con và nhiều yêu cầu. Điều này giúp tổ chức lại các bộ kiểm thử của bạn.
3. Cộng tác - Collection và môi trường có thể được nhập hoặc xuất để dễ dàng chia sẻ tệp. Một liên kết trực tiếp cũng có thể được sử dụng để chia sẻ collection.
4. Tạo môi trường - Có nhiều môi trường hỗ trợ ít lặp lại các bài kiểm tra vì người ta có thể sử dụng cùng một collection nhưng cho một môi trường khác. Đây là nơi tham số hóa sẽ diễn ra mà chúng ta sẽ thảo luận trong các bài học tiếp theo.
5. Tạo các kiểm thử - Các điểm checkpoint như xác minh trạng thái phản hồi HTTP thành công có thể được thêm vào mỗi lệnh gọi API giúp đảm bảo phạm vi kiểm tra.
6. Kiểm thử tự động hóa - Thông qua việc sử dụng Collection Runner hoặc Newman, các bài kiểm thử có thể được chạy trong nhiều lần lặp lại tiết kiệm thời gian cho các bài kiểm thử lặp đi lặp lại.
7. Gỡ lỗi - Bảng điều khiển Postman giúp kiểm tra dữ liệu nào đã được truy xuất giúp dễ dàng gỡ lỗi kiểm thử.
8. Tích hợp liên tục - Với khả năng hỗ trợ tích hợp liên tục, các hoạt động phát triển được duy trì.

## Làm thể nào để tải và cài đặt Postman?
**Bước 1**: Truy cập https://www.getpostman.com/downloads/ và chọn nền tảng mong muốn của bạn trong số Mac, Windows hoặc Linux. Nhấp vào Download.

![](https://images.viblo.asia/4c45bc5c-7ea3-4ad1-b41d-cdd6c8095bd5.png)

**Bước2**: Tải xuống của bạn đang trong tiến trình tải sẽ hiển thị trên trang web. Khi quá trình tải xuống hoàn tất, nhấp vào Run.

![](https://images.viblo.asia/086f8bda-7992-4677-a2e3-2d82166ea192.jpg)

**Bước3**: Bắt đầu cài đặt

![](https://images.viblo.asia/b15c6056-2c28-41ba-86b1-a82ab16fb3bf.png)

**Bước 4**: Trong cửa sổ tiếp theo, đăng ký tài khoản postman

![](https://images.viblo.asia/c5ca6277-fa08-4591-96b7-521ff2639c95.png)

***LƯU Ý***: Có hai cách để đăng ký tài khoản Postman. Một là tạo tài khoản Postman riêng và hai là sử dụng tài khoản Google. Mặc dù Postman cho phép người dùng sử dụng công cụ mà không cần đăng nhập, đăng ký đảm bảo rằng collection của bạn được lưu và có thể được truy cập để sử dụng sau này.

**Bước 5**: Chọn các workspace tools bạn cần và nhấp vào lưu tùy chọn của tôi.

![](https://images.viblo.asia/2dba7f74-d41c-4893-b7d1-0e4c6086fed6.png)

**Bước 6**: Bạn sẽ thấy màn hình bắt đầu.

![](https://images.viblo.asia/6b4db0bb-8f0d-4aa4-b5f6-52b79086804a.png)

## Làm thế nào để sử dụng Postman?

![](https://images.viblo.asia/d339eb7c-198f-495d-93b8-d33c10d1152c.png)

1.	New- Đây là nơi bạn sẽ tạo yêu cầu, collection hoặc môi trường mới.
2.	Import- Điều này được sử dụng để nhập một collection hoặc môi trường. Có các tùy chọn như nhập từ tệp, thư mục, liên kết hoặc dán văn bản thô.
3.	Runner - Kiểm tra tự động hóa có thể được thực hiện thông qua collection runner.
4.	Open new- Mở một tab mới, cửa sổ postman hoặc cửa sổ runner chạy bằng cách nhấp vào nút này.
5.	My workspace - Bạn có thể tạo một không gian làm việc mới riêng lẻ hoặc theo nhóm.
6.	Invite- Cộng tác trên một không gian làm việc bằng cách mời các thành viên trong nhóm.
7.	History- Các yêu cầu trong quá khứ mà bạn đã gửi sẽ được hiển thị trong History. Điều này giúp bạn dễ dàng theo dõi các hành động mà bạn đã thực hiện.
8.	Collections - Sắp xếp bộ kiểm thử của bạn bằng cách tạo collection. Mỗi collection có thể có các thư mục con và nhiều yêu cầu. Một yêu cầu hoặc thư mục cũng có thể được nhân đôi.
9.	Request tab- Điều này sẽ hiển thị tiêu đề của yêu cầu bạn đang làm việc. Theo mặc định, "Yêu cầu không có tiêu đề" sẽ được hiển thị cho các yêu cầu không có tiêu đề.
10.	HTTP request - Nhấp vào đây sẽ hiển thị danh sách sổ xuống của các yêu cầu khác nhau, chẳng hạn như GET, POST, COPY, DELETE, v.v. Trong kiểm thử, các yêu cầu được sử dụng phổ biến nhất là GET và POST.
11.	Request URL - Còn được gọi là điểm cuối, đây là nơi bạn sẽ xác định liên kết đến nơi API sẽ liên lạc.
12.	Save- Nếu có thay đổi đối với yêu cầu, nhấp vào lưu là bắt buộc để những thay đổi mới sẽ không bị mất hoặc ghi đè.
13.	Params - Đây là nơi bạn sẽ viết các tham số cần thiết cho một yêu cầu, chẳng hạn như các key value.
14.	Authorization- Để truy cập API, cần có sự cho phép thích hợp. Nó có thể ở dạng tên người dùng và mật khẩu, mã thông báo mang, v.v.
15.	Hearders- Bạn có thể đặt các tiêu đề như JSON loại nội dung tùy thuộc vào nhu cầu của tổ chức.
16.	Body- Đây là nơi người ta có thể tùy chỉnh chi tiết trong một yêu cầu thường được sử dụng trong yêu cầu POST.
17.	Pre-request Script- Đây là tập lệnh sẽ được thực thi trước yêu cầu. Thông thường, các tập lệnh yêu cầu trước cho môi trường cài đặt được sử dụng để đảm bảo các bài kiểm thử sẽ được chạy trong môi trường chính xác.
18.	Tests- Đây là các kịch bản được thực hiện trong khi yêu cầu. Điều quan trọng là phải có các kiểm thử vì nó thiết lập các điểm checkpoint để xác minh xem trạng thái phản hồi có ổn không, dữ liệu được truy xuất như mong đợi và các kiểm thử khác.

## Làm việc với GET request

Get request được sử dụng để lấy thông tin từ URL đã cho. Sẽ không có thay đổi được thực hiện đến cuối.

Chúng ta sẽ sử dụng URL sau cho tất cả các ví dụ trong hướng dẫn này

https://jsonplaceholder.typicode.com/users	

1.	Đặt yêu cầu HTTP của bạn thành GET.
2.	Trong trường URL yêu cầu nhập link
3.	Nhấp vào Gửi
4.	Bạn sẽ thấy trạng thái 200 OK
5.	Kết quả call API được trả về 

![](https://images.viblo.asia/e80a097e-308a-4d5e-8bf6-ebd8cc7eea5f.png)


* ***Lưu ý:*** Có thể có trường hợp Get request có thể không thành công. Nó có thể là do request URL không hợp lệ hoặc cần xác thực.

## Làm việc với POST request

Post request khác với Get request vì có thao tác dữ liệu với người dùng thêm dữ liệu vào điểm cuối. Sử dụng cùng một dữ liệu từ hướng dẫn trên trong Get request, bây giờ hãy thêm người dung.

**Bước 1**: Click new tab để tạo request mới

![](https://images.viblo.asia/0deec67a-343c-4580-9980-18f46eeae08d.png)

**Bước 2**: Ở trong tab mới

1.	HTTP request của bạn thành POST.
2.	Nhập cùng một liên kết trong url yêu cầu: https://jsonplaceholder.typicode.com/users
3.	chuyển sang tab Body

![](https://images.viblo.asia/f809a5c7-038b-4a2c-aa9b-701d394e8a0c.png)

**Bước 3**: Trong body
1.	Click vào raw
2.	Chọn JSON

![](https://images.viblo.asia/939e1a43-9059-42ed-a16c-f86dfbe91274.png)

**Bước 4**: 
Sao chép và dán chỉ một kết quả người dùng từ yêu cầu nhận trước đó như bên dưới. Đảm bảo rằng mã đã được sao chép chính xác với dấu ngoặc vuông và dấu ngoặc nhọn. Thay đổi id thành 11 và đặt tên thành bất kỳ tên nào bạn muốn. Bạn cũng có thể thay đổi các chi tiết khác như địa chỉ.

```
[
    {
        "id": 11,
        "name": "Krishna Rungta",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
                "lat": "-37.3159",
                "lng": "81.1496"
            }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
        }
    }
]
```

![](https://images.viblo.asia/76d7e2d1-39d9-41cd-add1-607e0a92c9f5.png)


***Lưu ý:*** Post request phải có định dạng chính xác để đảm bảo dữ liệu được request sẽ được tạo. Đó là một cách thực hành tốt để sử dụng GET trước để kiểm tra định dạng JSON của yêu cầu. Bạn có thể sử dụng các công cụ như  https://jsonformatter.cquilconcept.com/

![](https://images.viblo.asia/39fbad3b-ad85-416c-8569-74441dabaf4a.png)

**Bước 5**: Tiếp theo
1.	Click Send
2.	Trạng thái 201 Created được hiển thị
3.	Dán dữ liệu vào body

![](https://images.viblo.asia/bdd50718-f420-461c-99db-8907ab500968.png)


## Làm thế nào để tham số hóa các yêu cầu

Tham số hóa dữ liệu là một trong những tính năng hữu ích nhất của Postman. Thay vì tạo cùng một yêu cầu với dữ liệu khác nhau, bạn có thể sử dụng các biến có tham số. Những dữ liệu này có thể từ một tệp dữ liệu hoặc một biến môi trường. Tham số hóa giúp tránh lặp lại các kiểm thử tương tự và lặp lại có thể được sử dụng để kiểm thử tự động hóa.

Các tham số được tạo thông qua việc sử dụng dấu ngoặc kép: {{sample}}. Chúng ta hãy xem một ví dụ về việc sử dụng các tham số trong yêu cầu trước đây của chúng tôi:

![](https://images.viblo.asia/fd0d8ef9-97ed-47f3-8e02-8f114e999c28.png)


**Bước 1**: 

1.	Đặt HTTP request của bạn thành GET
2.	Nhập liên kết này: https://jsonplaceholder.typicode.com/users. Thay thế phần đầu tiên của liên kết bằng một tham số, chẳng hạn như {{url}}. Bây giờ url yêu cầu phải là {{url}} / người dùng.
3.	Bấm gửi.

![](https://images.viblo.asia/eb4606db-ad83-4c7d-9c4a-af1b65965233.png)


**Bước 2**:

1.	Nhấp vào biểu tượng con mắt
2.	Nhấp vào chỉnh sửa để đặt biến thành biến global có thể được sử dụng trong tất cả các collection.

![](https://images.viblo.asia/e25307ba-838a-466f-9d42-9f538add3129.png)

**Bước 3**:
1.	Đặt tên cho url là https://jsonplaceholder.typicode.com
2.	Click Save.

![](https://images.viblo.asia/25380812-6501-4a55-a661-5ae65147522b.png)

**Bước 4**: Click vào close nếu bạn thấy màn hình tiếp theo

![](https://images.viblo.asia/131a8db9-5952-4da5-8f9a-8dcb00130866.png)

**Bước 5**: Quay trở lại Get request của bạn sau đó nhấp vào Send. Bây giờ sẽ có kết quả cho yêu cầu của bạn.

![](https://images.viblo.asia/ab6e60f6-7c5a-4847-8109-63c4781c864f.png)

***Lưu ý***: Luôn đảm bảo rằng các tham số của bạn có nguồn như biến môi trường hoặc tệp dữ liệu để tránh lỗi.

## Làm thế nào để tạo Postman Test

Postman Tests là các mã JavaScript được thêm vào các yêu cầu giúp bạn xác minh các kết quả như trạng thái thành công hay thất bại, so sánh kết quả mong đợi, v.v. Nó thường bắt đầu bằng pm.test. Nó có thể được so sánh với các xác nhận, xác minh các lệnh có sẵn trong các công cụ khác.

Hãy tạo một số bài kiểm tra cơ bản cho các yêu cầu tham số hóa của chúng tôi từ bài học trước.

**Bước 1**: Chuyển đến mục GET request của bạn từ hướng dẫn trước.

1.	Chuyển sang tab Tests. Ở bên phải là các đoạn mã.
2.	Từ phần đoạn trích, nhấp vào " Status code: Code is 200".

Cửa sổ được tự động điền

![](https://images.viblo.asia/52814651-7e28-4767-b3f6-cdebb30fffc9.png)

**Bước 2**: Bây giờ bấm Send. Kết quả kiểm tra sẽ được hiển thị.

![](https://images.viblo.asia/e14c9472-33fe-48ba-bd64-adbd10c416d6.png)

**Bước 3**: Quay trở lại tab Tests và hãy thêm một bài kiểm tra khác. Lần này chúng ta sẽ so sánh kết quả dự kiến với kết quả thực tế.

Từ phần đoạn trích, nhấp vào " Response body:JSON value check". Chúng ta sẽ kiểm tra xem Leanne Graham có userid 1 hay không.

![](https://images.viblo.asia/337b039f-83a3-4e64-8429-7dae33c097fc.png)

**Bước 4**:

1.	Thay thế " Your Test Name" bằng " Check if user with id1 is Leanne Graham" để tên kiểm thử chỉ định chính xác những gì chúng ta muốn kiểm tra.
2.	Thay thế jsonData.value bằng jsonData [0] .name. Để có được đường dẫn, hãy kiểm tra phần thân trong kết quả Get trước đó. Vì Leanne Graham là userid 1, jsonData nằm trong kết quả đầu tiên sẽ bắt đầu bằng 0. Nếu bạn muốn nhận kết quả thứ hai, hãy sử dụng jsonData [1] và cứ thế để có kết quả thành công.
3.	Vào eql, nhập "Leanne Graham"

```
pm.test("Check if user with id1 is Leanne Graham", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData[0].name).to.eql("Leanne Graham");
});
```

![](https://images.viblo.asia/f4bbe15b-ec54-4569-8073-3163a45cd074.png)

Bước 5: Bấm Send. Bây giờ sẽ có hai kết quả kiểm tra thông qua cho yêu cầu của bạn.

![](https://images.viblo.asia/4e5d1a80-8d01-43e2-b798-4334381bb962.png)

***Lưu ý***: Có nhiều loại kiểm thử khác nhau có thể được tạo trong Postman. Hãy thử khám phá công cụ và xem kiểm thử nào sẽ phù hợp với nhu cầu của bạn.

## Cách tạo collection

Collection đóng một vai trò quan trọng trong việc tổ chức các bộ kiểm thử. Nó có thể được nhập và xuất giúp dễ dàng chia sẻ các collection giữa các nhóm. Trong hướng dẫn này, chúng ta sẽ tìm hiểu cách tạo và thực hiện một collection.

Hãy bắt đầu tạo một collection:

**Bước 1**: Nhấp vào nút New ở góc trên cùng bên trái của trang.

![](https://images.viblo.asia/001a7f3f-ad6d-47c6-ae83-20c2c4985154.png)

**Bước 2**: Chọn collection. Cửa sổ tạo collection sẽ bật lên.

![](https://images.viblo.asia/2e4e10ef-7f38-4510-a5c5-3896ab2e9c93.png)

**Bước 3**: Nhập tên và mô tả collection mong muốn, sau đó nhấp vào tạo.

![](https://images.viblo.asia/d6e7fc15-f629-414f-8fe6-e9e2058628c4.png)

**Bước 4**: Quay trở lại Get request trước đó. Nhấp vào Save để lưu

![](https://images.viblo.asia/56cf28da-75bb-4eef-a8d7-4d7f664f11b4.png)

**Bước 5**:
1.	Chọn Postman Test Collection.
2.	Nhấp vào Save to Postman Test Collection

![](https://images.viblo.asia/19029226-d9d3-4b1b-b78c-b5b5cbfc69c4.png)

**Bước 6**: Postman Test Collection sẽ chứa một yêu cầu.

![](https://images.viblo.asia/747d18ae-f806-4023-9321-cb7b764cc9c8.png)

**Bước 7**: Lặp lại các bước 4-5 cho Post request trước đó để collection sẽ có hai yêu cầu.

![](https://images.viblo.asia/757a6bf9-4b31-4f41-8e27-16dc9cbd8973.png)

## Cách chạy collection bằng Collection Runner

Có hai cách để chạy collection đó là Collection Runner và Newman. Hãy bắt đầu bằng cách thực hiện collection trong Collection Runner.

**Bước 1**: Nhấp vào nút Runner được tìm thấy ở đầu trang bên cạnh nút Import.

![](https://images.viblo.asia/d0a806a0-b32c-4a39-b726-b7ea71b034a0.png)

**Bước 2**: Trang Collection Runner sẽ xuất hiện như bên dưới. Sau đây là mô tả của các lĩnh vực khác nhau

![](https://images.viblo.asia/db0c551b-b001-4292-a0be-bb360b8ae273.png)

**Bước 3**: Chạy Postman Test Collection của bạn bằng cách thiết lập các mục sau:
•	Chọn collection kiểm tra Postman- Đặt số lần lặp là 3
•	Đặt độ trễ là 2500 ms
•	Nhấp vào nút Run Postman Test ...

![](https://images.viblo.asia/a2518ba3-dd62-4baa-aacd-b1a5f953ddef.png)

**Bước 4**: Trang Kết quả chạy sẽ được hiển thị sau khi nhấp vào nút Chạy. Tùy thuộc vào độ trễ, bạn sẽ thấy các bài kiểm tra khi chúng thực thi.
1.	Khi các bài kiểm tra kết thúc, bạn có thể thấy trạng thái kiểm tra nếu nó bị vượt qua hoặc thất bại và kết quả mỗi lần lặp.
2.	Bạn thấy trạng thái Pass cho các Get request
3.	Vì chúng ta không có bất kỳ bài kiểm tra nào cho Post, nên có một thông báo rằng yêu cầu không có bất kỳ bài kiểm tra nào.

![](https://images.viblo.asia/7af856f8-97bb-4c6e-a984-c25ab6c23003.png)

Bạn có thể thấy tầm quan trọng của việc có các kiểm tra trong các yêu cầu của bạn để bạn có thể xác minh trạng thái yêu cầu HTTP nếu thành công và dữ liệu được tạo hoặc truy xuất.

## Cách chạy Collection bằng Newman

Một cách khác để chạy collection là thông qua Newman. Sự khác biệt chính giữa Newman và Collection Runner là như sau:
1.	Newman là một tiện ích bổ sung cho Postman. Bạn sẽ cần cài đặt nó riêng biệt với Native app.
2.	Newman sử dụng dòng lệnh trong khi Collection Runner có GUI.
3.	Newman có thể được sử dụng để tích hợp liên tục.
Để cài đặt Newman và chạy collection từ nó, hãy làm như sau:

**Bước 1**: Cài đặt nodejs bằng liên kết này: http://nodejs.org/download/

**Bước 2**: Mở command line và nhập
 npm cài đặt -g newman 
Newman nên được cài đặt trên máy tính của bạn.

![](https://images.viblo.asia/d24d4a3f-123a-49e2-850b-0fb8ee2d7b34.png)

**Bước 3**: Khi Newman đã được cài đặt, hãy quay trở lại Postman. Trong Collection, nhấp vào ba dấu chấm. Tùy chọn sẽ xuất hiện. Chọn Export.

![](https://images.viblo.asia/6fa2173d-61fa-469e-be26-1ce23699bc42.png)

**Bước 4**: Chọn Export collection làm Collection v2.1 (Được khuyến nghị), sau đó bấm Export.

![](https://images.viblo.asia/af6d6a83-dc6a-43ee-be3d-cb408db19cc8.png)

**Bước 5**: Chọn vị trí mong muốn của bạn sau đó nhấp vào Save. Đó là khuyến khích để tạo một thư mục cụ thể cho các bài kiểm tra Postman của bạn. Một collection nên được xuất sang thư mục local đã chọn của bạn.

**Bước 6**: Chúng ta cũng sẽ cần export môi trường của chúng ta. Nhấp vào biểu tượng con mắt bên cạnh danh sách sổ xuống môi trường trong Global, chọn Download as JSON. Chọn vị trí mong muốn của bạn sau đó nhấp vào Save. Đó là lưu ý rằng môi trường nên nằm trong cùng thư mục với collection của bạn.

![](https://images.viblo.asia/7a1afd36-3e70-475c-8986-9326262b58d8.png)

**Bước 7**: Môi trường bây giờ sẽ được xuất sang cùng thư mục cục bộ như Collection.

**Bước 8**: Bây giờ quay trở lại command line và thay đổi thư mục thành nơi bạn đã lưu collection và môi trường.

 `cd C:\Users\Asus\Desktop\Postman Tutorial`

**Bước 9**: Chạy collection của bạn bằng lệnh này:

 `newman run PostmanTestCollection.postman_collection.json -e Testing.postman_globals.json`

 Chạy kết quả sẽ xuất hiện như dưới đây.
 
 ![](https://images.viblo.asia/f89afa7a-8137-4e64-8528-dfc8907a5c66.png)

Đối với hướng dẫn là một tham chiếu đến một số mã Newman cơ bản để thực thi:
1.	Chỉ chạy một collection. Điều này có thể được sử dụng nếu không có phụ thuộc tệp dữ liệu môi trường hoặc kiểm thử.

`newman run <tên collection> `

2.	Chạy một collection và môi trường. Chỉ báo -e dành cho môi trường.


`newman run <tên collection> -e <tên môi trường> `

3.	Chạy một collection với mong muốn không. lặp đi lặp lại.

`newman run <tên collection> -n <no.of lặp>`

4.	Chạy với tệp dữ liệu.

`newman run <tên collection> --data <tên tệp> -n <no.of lặp lại> -e <tên môi trường> `

5.	Đặt thời gian trễ. Điều này rất quan trọng vì các kiểm thử có thể thất bại nếu nó được chạy không chậm trễ do các yêu cầu được bắt đầu mà không yêu cầu trước đó hoàn thành xử lý trên máy chủ điểm cuối.


`newman run <tên collection> -d <thời gian trễ>`

## Tổng kết
•	Postman hiện là một trong những công cụ phổ biến nhất được sử dụng trong kiểm thử API

•	Khả năng truy cập, sử dụng collection, cộng tác, tích hợp liên tục, là một số tính năng chính cần tìm hiểu trong Postman

•	Bạn nên tạo một tài khoản trong Postman, để collection của bạn có sẵn trực tuyến

•	Bạn có thể tham số hóa yêu cầu trong Postman

•	Bạn có thể tạo Kiểm tra để xác minh yêu cầu postma

•	Collection có thể được chạy bằng Newman hoặc Collection Runner


*Nguồn*: *https://www.guru99.com/postman-tutorial.html*