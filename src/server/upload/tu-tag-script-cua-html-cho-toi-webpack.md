> Từ ngày xưa, việc import các thư viện Javascript bên ngoài vào một trang web nhìn chung chỉ có 2 cách:
> 1. Import từng cái một, tức dùng một đống các lệnh <script src="link_to_your_script">
> 2. Nhồi tất tần tật vào một file hổ lốn, rồi sau đó chỉ chạy <script src="link_to_your_script"> một lần thôi.
> 
> Với cách thứ nhất, quá nhiều network request được tạo ra => Chậm!
> 
> Với cách thứ hai, tuy chỉ có 1 network request nhưng file lại to vl => Nhanh hơn tí nhưng lag!
> 

### IIFE và các build tools

IIFE là:
 
```
    (() => {
       const inside = "i'm alive!"
       ....
    })
    
    console.log(inside)     // undefined
```
Gói code vào scope riêng!
    
Như vậy, ta có thể an toàn cắt ghép các file script mà chẳng phải quan tâm xung đột tên tuổi. Từ đây, cơ số các build tool được sinh ra và đấu đá với nhau: Gulp, Grunt, ...
    
Dù khác nhau ở cách vận hành nhưng bản chất vẫn là sử dụng IIFE, và đồng nghĩa với việc các tools này có chung yếu điểm:
    
1. Dù chỉ 1 file thay đổi thì toàn bộ quá trình build phải chạy lại từ đầu.
2. Dù chỉ dùng 1 function trong 1 thư viện nào đó, thì ta vẫn phải nhồi tất cả cái thư viện đó vào.
3. Code dù chưa chạy nhưng vẫn sẽ được load tất tần tật vào.

### Webpack

Giải quyết tất cả các bài toán trên (+ thêm vài tính năng hay ho nữa), Webpack trở thành 1 all-in-one solution và thành tiêu chuẩn của việc phát triển Frontend
    
 1. Tree handshake:
    Giống như ta rung lắc 1 cái cây cho những chiếc là thừa thãi rụng xuống. Webpack có thể tìm ra hết tất cả các code "được sử dụng"
    và loại bỏ các phần thừa thãi không dùng đến, khiến kích thước của file script giảm đi 1 cách kinh ngạc. Từ đây, ta có thể thoải mái import các thư viện vào mà không lo bị quá tải.
    
  2. Hot reloading:
    Webpack có khả năng phân biệt code đã bị chỉnh sửa với code giữ nguyên. Nên thay vì load lại cả trang, ta sẽ chỉ thấy nguyên phần thay đổi bị reload. Điều này khiến việc phát triển
    trở nên vô cùng nhanh chóng, thay vì sửa code - lưu lại - F5 - chờ thì ta chỉ việc lưu lại và ngắm nhìn thay đổi thôi.
    
 3. Code transpling:
    Convert TypeScript sang Javascript, thiết lập alias cho import, minify code, ... Và còn vô vàn tính năng nữa, đều không đến từ Webpack. Tuy nhiên, Webpack có thể lắp các plugin nhỏ như con thỏ vào để xử lí các tác vụ đó. Tức: Webpack không hề có giới hạn cho việc mở rộng tính năng.
    
    "Mấy build tools như Grunt, Gulp cũng làm thế đc chứ có gì mà ghê". Ngoài việc nén code, một tính năng khá thông dụng nửa của Webpack là gộp và nén ảnh. Như t đã nói: "nó không hề có giới hạn"!

### Kết

Bạn có thực sự cần Webpack?
    
Webpack là một công cụ tuyệt vời. Nhưng để thạo được nó lại vô cùng khó và sự "tối ưu" nó mang lại chưa chắc ta đã cảm nhận được nhiều. Với những project nho nhỏ, hay đặc thù có thể chứa nhiều asset ở máy client (như desktop app (Electron) hay mobile app (React Native) thì chắc ta chỉ cần khi muốn dùng tính năng hot reloading mà thôi, không thì cứ build tools mà triển cho đỡ đau đầu :v