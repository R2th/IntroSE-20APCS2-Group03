Sau đây  mình sẽ tìm hiểu cách tạo nên một ứng dụng trong thực tế để giúp bảo vệ trẻ em, bảo vệ người dùng trước những thông tin tiêu cực, để giúp cha mẹ quản lí bảo vệ con em  khi cho phép trẻ dùng máy tính để tìm kiếm thông tin hình ảnh trên internet nói chung và mạng xã hội nói riêng. Chúng ta sẽ xây dựng 1 tiện ích cho trình duyệt giúp quản lý thông tin sẽ ảnh hưởng đến người dùng đặc biệt là trẻ em.
## Thuật toán và thư viện Nude.js
### Thuật toán
Mình sẽ sử dụng thuật toán Nudity Detection của [Rigan Ap-apid](https://be82ac79-a-aff4c786-s-sites.googlegroups.com/a/dcs.upd.edu.ph/csp-proceedings/Home/pcsc-2005/AI4.pdf?attachauth=ANoY7colJmDtFtlYZFhZ5baGwRI-1-xonBAOvLa8TQDVvUA1BrVELNDl_lEDiOZX_Axfs8iQsem7scfQaCbEX-CUCuseO6mFWHFQDHkQ6Puynohi8lec3gv-eVs195c17OAuK2eAjTWkfzVEvlQFx-KRtLYEpmjUtaCDVMwsTux9lJAKOEXFSXBy8vQWEqvh32LpehY_xh8xM-UObJfD6c5g0Zk9AAaipA9Enc7TxHE1mymhk0E2lN0%3D&attredirects=0) - thuật toán phát hiện ảnh nhạy cảm dựa trên phân tích màu da.
Các bước xây dựng thuật toán:
1. Quét hình ảnh bắt đầu từ góc trên bên trái đến góc dưới bên phải.
2. Đối với mỗi pixel, thu được các giá trị thành phần RGB.
3. Tính toán các giá trị RGB và HSV được chuẩn hóa tương ứng từ các giá trị RGB.
4. Xác định xem màu pixel có thỏa mãn các tham số cho da được thiết lập bởi mô hình phân phối màu da hay không.
5. Dán nhãn cho từng pixel là da hoặc không da.
6. Tính tỷ lệ phần trăm pixel da so với kích thước của hình ảnh.
7. Xác định các pixel da được kết nối để tạo thành các vùng da.
8. Đếm số lượng vùng da.
9. Xác định các pixel thuộc ba vùng da lớn nhất.
10. Tính tỷ lệ phần trăm của vùng da lớn nhất so với kích thước hình ảnh.
11. Xác định các pixel ngoài cùng bên trái, trên cùng, ngoài cùng bên phải và dưới cùng của ba pixel lớn nhất
vùng da. Sử dụng các điểm này làm điểm góc của đa giác giới hạn.
12. Tính diện tích của đa giác giới hạn.
13. Đếm số lượng pixel da trong đa giác giới hạn.
14. Tính tỷ lệ phần trăm của các pixel da trong đa giác giới hạn so với diện tích của đa giác.
15. Tính cường độ trung bình của các pixel bên trong đa giác giới hạn.
16. Phân loại một hình ảnh như sau:
    * a. Nếu tỷ lệ phần trăm pixel da so với kích thước hình ảnh nhỏ hơn 15 phần trăm, hình ảnh không phải là màu nude. Nếu không, đi đến bước tiếp theo.
    * b. Nếu số lượng pixel da ở vùng da lớn nhất ít hơn 35% tổng số vùng lớn thứ hai ít hơn 30% tổng số da và số pixel da ở vùng lớn thứ ba là ít hơn 30% tổng số da, pháp sư không khỏa thân.
    * c. Nếu số lượng pixel da ở vùng da lớn nhất ít hơn 45% tổng số da, hình ảnh không phải là màu nude.
    * d. Nếu tổng số da nhỏ hơn 30% tổng số pixel trong ảnh và số pixel da trong
    * đa giác giới hạn nhỏ hơn 55 phần trăm kích thước của đa giác, hình ảnh không phải là khỏa thân.
    * e. Nếu số vùng da lớn hơn 60 và cường độ trung bình trong đa giác nhỏ hơn 0,25, hình ảnh không phải là màu nude.
    * f. Nếu không, hình ảnh là khỏa thân.
Hiệu suất của thuật toán phát hiện khỏa thân trên các hình ảnh thử nghiệm tốt hơn bất ngờ so với hiệu suất của nó trên các hình ảnh đào tạo. Trên tập huấn luyện, thuật toán hoạt động với mức thu hồi 92,80% và tỷ lệ dương tính giả là 8,67%.

###  Thư viện Nude.js
Thư viện Nude.js được viết bởi Patrick Wied dựa trên thuật toán detect của Rigan Ap-apid  mà mình đã trình bày ở trên.

Tài liệu tham khảo về thư viện được Patrick Wied public source code trên github: https://github.com/phuongpham167/nude.js
## Tiến hành cài đặt extension với thư viện Nude.js
Một extension gồm các file:
* Manifest.json: File này dùng để cấu hình extension của chúng ta gồm các thông số chính như : 
    * a. Name: Định nghĩa tên của extension
    * b. Description: dùng để mô tả về chức năng, tác dụng của nó
    * c. Version: tphieen bản hiện tại của extension
    * d. Content_scripts: Ở trong đây gồm có thuộc tính : 
    * i. JS:  là tên của các file JS mà bạn muốn sử dụng khi khởi chạy extension
    * ii. Matches: dùng để giớ hạn những trang web mà extession có thể chạy
    * iii. Run_at: quy định thời gian bắt đầu chạy của extension
* Một thư mục chứa các file ảnh để làm icon của extension
* Và các file Html đi kèm theo extension (ví dụ như khi click vào icon extension trên toolbar thì sẽ sổ ra 1 dialog,…)


Tìm hiểu rõ hơn về cách cài đặt extension thì bạn có thể tham khảo các link mình sẽ để ở bên dưới. Sau đây mình sẽ cài đặt thư viện Nude.js vào extension.

Thư viện sử dụng file worker.nude.js và nhúng vào trang web thông qua thẻ <scripts> của Html. Chúng ta phải dùng src của file worker để cắm vào extension không thông qua Html.
    
* Bước đầu chúng ta khởi tạo canvas để vẽ lại các ảnh thông qua câu lệnh document.createElement(“canvas”).
* Tiếp đó chúng ta set hiển thị cho canvas thông qua các thuộc tính display trong thẻ style.
* Thực hiện gán canvas vào trong body thông qua các lệnh appendChild.
* Ở lệnh tiếp theo chúng ta lấy biến context của canvas ra.
* Sau đó tiến hành get tất cả các ảnh trong page ra và lưu chúng vào mảng.
* Sau khi lấy được data thành công chúng ta tiến hành gọi ảnh ra và quét
```
var canvas = document.createElement("canvas");  
canvas.style.display = "none";  
var b = document.getElementsByTagName("body")[0];  
b.appendChild(canvas);  
var ctx = canvas.getContext("2d");  
var imgs = document.getElementsByTagName('img');  
var imageData;  
```
* Dùng vòng for để duyệt tất cả các ảnh trong page. Dùng dòng tiếp theo để clear context của canvas.
* Sau đó set các thuộc tính của ảnh và gán thuộc tính cho canvas.
* Tiến hành vẽ ảnh thông qua lệnh drawImage.
* Sau đó get data của ảnh để san thông qua getImageData.
* Ở dòng cuối cùng chúng ta tiến hành gọi hàm để check ảnh với 3 tham số truyền vào.
```
for(var i=0; i< imgs.length;i++) {  
    ctx.clearRect(0, 0, canvas.width, canvas.height);  
    img = imgs[i];  
    img.setAttribute('crossOrigin', '');  
    img.crossOrigin="Anonymous";  
    canvas.width = img.width;  
    canvas.height = img.height;  
    ctx.drawImage(img, 0, 0);  
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;  
    checkImage(canvas.width, canvas.height, imageData);  
} 
function makeVisible(img){  
    img.style.setProperty('visibility', 'visible', 'important');          
}  
  
function makeInVisible(img){  
    img.style.setProperty('visibility', 'hidden', 'important');  
}  
function checkImage(width, height, imageData){  
    canvas.width = width;  
    canvas.height = height;  
    scanImage(imageData);  
    console.log(isNude);  
    if(isNude) {  
        makeInVisible(img);  
    }
     return isNude;  
};
```
* Ta triển khai hàm checkImage với 1 biến bool isNude để đánh dấu ảnh đó là nude hay không thông qua gọi hàm scanImage. Nếu là ảnh nude thì chúng ta sẽ gọi hàm makeInVisiable để ẩn ảnh đó đi.
* Và kết quả

Khi chưa cắm extension vào trình duyệt
![](https://images.viblo.asia/c974ead4-5793-4bad-b883-850025201a51.png)

Và sau khi cắm extension thì ảnh được nhận dạng là ảnh phản cảm sẽ bị ẩn đi khỏi trang web như sau:

![](https://images.viblo.asia/017599ee-5e79-4fac-805c-6e07e3b74259.png)

Trên đây mình đã giới thiệu xong cách cài đặt 1 extension để phân tích phát hiện và ẩn đi các ảnh nhạy cảm trên trình duyệt giúp bảo vệ người dùng. Tuy nhiên có thể do thuật toán chưa được chính xác hiệu quả cao nên trong một số trường hợp phát hiện còn chưa chính xác. Mình sẽ tìm hiểu các thuật toán khác hiệu suất cao hơn. 

Cảm ơn các bạn đã đọc đến đây.

Tham khảo

[1] https://www.patrick-wied.at/static/nudejs/

[2] https://github.com/pa7/nude.js

[3] https://medium.freecodecamp.org/how-to-create-and-publish-a-chrome-extension-in-20-minutes-6dc8395d7153?gi=98d643452052