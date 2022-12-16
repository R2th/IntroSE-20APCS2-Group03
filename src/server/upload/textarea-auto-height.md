Nhắc  đến input trên nhiều dòng chúng ta sẽ nghĩ ngay đến việc sử dụng textarea để có thể nhập text trên nhiều dòng mà không bị giới hạn số dòng như input phải không nào, nhưng chúng ta phải xác định trước số rows và về mặt hiển thị cũng sẽ hiển thị sẵn số rows đó tương ứng với maxheight được nhập, như ví dụ dưới đây:


{@embed: https://codepen.io/nhungpt6/pen/yLLwRyX}

Như chúng ta đã thấy thì textarea mặc định khi chúng ta khởi tạo số rows chúng sẽ tạo ra một box có số rows và maxheight mặc định, khi nhập quá sẽ xuất hiện scroll như hình ảnh dưới đây:

![](https://images.viblo.asia/75b51b34-1fc1-4aa8-b321-8dfa9ab73dd7.PNG)

![](https://images.viblo.asia/515f21de-a2f1-44bb-8538-03eb2a09bad5.PNG)


Nhưng nếu chúng ta chỉ muốn hiển thị ban đầu 1 dòng như input nhưng vẫn có thể nhập nhiều dòng và còn có thể tự co dãn theo text nhập vào thì sao?
Hôm nay mình sẽ giới thiệu cho các bạn một số cách để chỉ khởi tạo một dòng mà vẫn có thể nhập được nhiều dòng co dãn theo số lượng text được nhập nhé!

### 1. Sử dụng contenteditable html
Thuộc tính contentedit xác định xem nội dung của một phần tử có thể chỉnh sửa được hay không, khi chúng được gán giá trị true, mặc định phần tử đó sẽ được chỉnh sửa như một ô input và vẫn có thể nhập được nhiều dòng mà không bị giới hạn số dòng, chúng ta cùng xem nhé...
     
 {@embed: https://codepen.io/nhungpt6/pen/MWWxzER}
     
   Hãy thử focus vào phần tử và thay đổi nội dung của chúng nhé!
       
### 2. Sử dụng jquery cho textarea
Một cách khác là chúng ta vẫn sử dụng textarea nhưng dùng jquery để có được thể hiện mà chúng ta mong muốn, hãy cùng xem ví dụ nhé!
    
 {@embed: https://codepen.io/nhungpt6/pen/dyyrQev}
    
Để sử dụng đoạn mã này chúng ta cần có jQuery và đã được thử nghiệm và đang hoạt động với phiên bản 1.7.2 - 3.3.1
    
Đoạn mã này sẽ hoạt động:
* On key input.
* Với văn bản được pasted (ctrl + v).
* Với văn bản cut (ctrl + x).
* Với văn bản được tải sẵn.
* Với tất cả các trang web của textarea (multiline textbox).
* Với Firefox (v31-67 đã thử nghiệm).
* Với Chrome (v37-74 đã thử nghiệm).
* Với IE (v9-v11 đã thử nghiệm).
* Với Edge (v14-v18 đã thử nghiệm).
* Với IOS Safari.
* Với trình duyệt Android.
* Với chế độ nghiêm ngặt JavaScript.
* Và được sắp xếp hợp lý và hiệu quả.


###     Kết luận:
  Mong là một vài cách trên của mình sẽ giúp các bạn có thêm hướng giải quyết cho vấn đề của mình.
    
   Cảm ơn các bạn đã đọc!