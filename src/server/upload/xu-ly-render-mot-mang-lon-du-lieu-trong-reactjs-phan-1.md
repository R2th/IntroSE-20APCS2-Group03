## Vấn đề gặp phải
Khi bạn làm trong các dự án ReactJS, việc phải lấy data từ server để hiển thị dưới dạng danh sách như bảng, list là không hiếm. Nhưng sẽ có lúc dữ liệu trả về rất nhiều, khiến cho việc React render ra list/table đó bị chậm lại khá lâu. 

Lý do là khi react nhận được props hay state mới, nó sẽ add tất cả chúng lên Visual Dom và so sánh với DOM xem liệu phần nào của DOM cần update, rồi sau đó update phần đó. Ở đây là 1 danh sách rất lớn cần được update.

Mình đi vào ví dụ cụ thể để các bạn biết được nó trông như thế nào nhé:
1. Cài đặt môi trường:
    * Bạn có thể dùng “create-react-app” cho đơn giản hoặc luyện tập tự xây dựng React Boilerplate đơn giản theo hướng dẫn của mình nhé:
     [](https://viblo.asia/p/cac-dependencies-can-thiet-va-cach-tao-project-ractjs-boilerplate-don-gian-3Q75waN7ZWb)
    *  Sau đó bạn cài đặt “***lorem-ipsum***” với câu lệnh: `npm i lorem-ipsum`.
    * Cuối cùng, bạn thêm vào file “index.js” với nội dung như sau:

    ![](https://images.viblo.asia/17f6b13b-3a56-4bcf-a377-06ae66069717.png)

    Trong đoạn code trên, mình tạo ra 1 mảng có 10.000 phần tử, trong đó mỗi phần tử có id, name, image, text (text được tạo ra bởi **lorem-ipsum**) và sau đó mình hiển thị mảng đó dưới dạng danh sách* ul - li*.
    Sau khi chạy ứng dụng lên, kết quả sẽ được như thế này:

    ![](https://images.viblo.asia/5d62bdb8-380b-4e08-8c2a-5d29bd6dc339.png)

    Nhưng chờ đã, bạn có thấy thời gian để hiển thị danh sách trên có lâu không ạ, nếu bạn chưa kịp kiểm tra, vậy thử f5 lại xem sao. Vâng, nó phải mất đến gần 4s để hiển thị phải không ạ. Lý do là mình nói rồi đó, ReactJS tốn khá nhiều thời gian để React xử lý việc render rất nhiều hạng mục cùng 1 lúc như vậy. 
    
Thử tưởng tượng dữ liệu không phải là 10.000 nữa mà là 50.000 hay thậm chí 100.000 thì sao, thời gian chờ còn lâu hơn rất nhiều mà trên máy của mình không hiển thị gì luôn nếu dữ liệu là 100.000. Vậy hướng giải quyết như thế nào, chúng ta đi đến phần sau nhé.
## Hướng giải quyết
Cái chúng ta muốn bây giờ là hiển thị những item 1 cách nhanh nhất có thể trong khi đó chờ các item khác load và render tiếp trên DOM.

Vậy nên thay vì hiển thị 10.000 phần tử 1 lúc, ta thử hiển thị 10 phần tử lúc ban đầu xem như thế nào:

![](https://images.viblo.asia/c7109e12-2b63-4b16-baf0-d8f32e4ca020.png)

Đương nhiên là rất nhanh rồi.

Nhưng sau đó ta phải tìm cách nào đó để nó có thể hiển thị từ từ 9990 phần tử còn lại từng cái một vào **“this.state.sublist"**. Với phương pháp này, việc rerender sẽ diễn ra liên tục, và React khi map VisualDOM với DOM chỉ việc map phần tử vừa mới add vào **“this.state.sublist"**.

![](https://images.viblo.asia/97c4bb5e-5684-4289-979e-041f59280fe6.png)

Đây là hàm đệ quy, luôn gọi đến chính nó cho đến khi chiều dài của “sublist” = chiều dài của “list” ban đầu. Ta dùng setTimeout để đặt nó ở cuối cùng của ngăn xếp thực thi, do đó ứng dụng của chúng ta chỉ update state khi sau khi render xong. Vâỵ nên, việc cuối cùng là gọi hàm này khi ứng dụng của chúng ta đã render xong, ta đặt nó vào trong componentDidMount(). 

Sau khi hoàn thành, files “index.js" của bạn sẽ trông như thế này:

![](https://images.viblo.asia/f294957b-695d-4f89-a4f1-dc93fa1c9979.png)

Rồi, thử qua bên trình duyệt xem thử xem như thế nào nào, khá nhanh phải không ạ.

## Những điểm cần chú ý
* Việc setState sẽ xảy ra rất nhiều(ở đây là 9990 lần) 
* setTimeout sẽ đặt function thực thi trong nó ở cuối cùng trong ngăn xếp thực thi, vậy nên khi list của bạn chưa render xong mà bạn thực thi 1 action nào đó (ví dụ như xử lý sự kiện nhấn vào ảnh) thì sự kiện đó sẽ ưu tiên hơn.
* Chỉ hữu dụng nếu bạn chỉ đơn thuần là hiển thị 1 lượng lớn item đã có mà không phải fetch từ API.
* Việc sử dụng vòng lặp đệ quy này chỉ giúp bạn cải thiện UI, chứ không giúp bạn tăng performance nhé.

## Tổng kết và tài liệu tham khảo
Đây là cách mà các bạn có thể tham khảo trong việc không được sử dụng các thư viện thứ 3 mà vẫn có thể đảm bảo việc tăng trải nghiệm của người dùng, nhưng vẫn không làm tăng performance của ứng dụng. 
Và trong bài sau mình sẽ giới thiệu với các bạn 1 thư viện để giải quyết các vấn đề trên, đồng thời tăng performance App của bạn.

Tài liệu tham khảo: 
https://itnext.io/handling-large-lists-and-tables-in-react-238397854625