# Callback là điệp viên nằm vùng.

Được cài cắm vào các function, có tác dụng mấu chốt trong việc báo cáo kết quả về cho ông chủ.

Không như PHP, **đặc thù của javascript là không chờ đợi** , cho dù là đợi gái đẹp. Khi js gọi 1 function, nó ko chờ function này trả về kết quả, mà tiếp tục chạy vì JS còn trẻ JS muốn đi chơi.

Do đó mà chúng ta cần có callback nằm vùng, để khi gái đẹp trang điểm xong, nằm vùng sẽ gọi ta phi xe đến đón.

Lấy ví dụ con thỏ ăn cỏ chui vào hang.

```
// con thỏ cần 3s mới ăn cỏ và uống nước xong.
function con_tho_an_co() {
  setTimeout(function() {
    console.log('con thỏ ăn cỏ, uống nước');
  }, 3000);
}

// con thỏ chui vô hang
function hotel() {
  console.log('chui vô hotel');
}

con_tho_an_co();
hotel();
```

Các bạn sẽ thấy là **con thỏ chui ngay vô hotel luôn...**

Để đảm bảo con thỏ **"làm"** việc theo thứ tự, tức là chỉ vào hotel khi đã cơm no rượu say, chúng ta cần **con_tho_an_co** báo cho chúng ta biết chính xác khi nào nó ăn xong, bằng cách cài điệp viên nằm vùng có mật danh là callback 007.

```
function con_tho_an_co(callback007) {
  setTimeout(function() {
    console.log('con thỏ ăn cỏ, uống nước');
    callback007(); // đây là lúc điệp viên báo cáo cho sếp !
  }, 3000);
}

// con thỏ chui vô hang
function hotel() {
  console.log('chui vô hotel');
}

// điệp viên nằm vùng callback sẽ gọi hotel luôn dùm con thỏ.
var callback = function() {
  hotel();
}
con_tho_an_co(callback);
```

hoặc chúng ta có thể viết gọn lại thành

```
con_tho_an_co(function() {
  hotel();
});
```

Làm sao chắc rằng điệp viên callback trên kia sẽ báo cáo đúng cho ta biết về **con_tho_an_co**. Rất đơn giản là thuê thêm 1 điệp viên callback mới theo dõi thằng callback kia. Rồi làm sao chắc callback mới. Vậy thì lại thuê thêm callback mới mới theo dõi callback mới.

# Welcome to callback hell.

Để giải quyết callback hell, anh em chỉ cần code đẹp một tí, chứ cần quái gì Promise. Bọn mẻo chỉ giỏi vẽ chuyện, đẻ hết cái này đến cái khác bắt bố mày học máu mồm.

Anh em nhớ là, khi gặp callback hell thì chúng ta phải giải quyết nó bằng kiến thức và đôi tay tài hoa của một lập trình viên sáng ngủ đêm xem pỏn, chứ cứ nhảy ngay vào học Promise chỉ vì nghe đồn nó giúp tránh callback hell thì anh em sẽ gặp Promise hell, khi đấy thì thôi rồi !

Lấy cái ví dụ chúng ta cần làm việc A, rồi đến việc B rồi việc C, theo thứ tự

```
function doA(cb) {
  cb();
}

function doB(cb) {
  cb();
}

function doC(cb) {
  cb();
};


// đây là code ko kotex
function main() {
  doA(function(){
    doB(function(){
      doC(function(){
        console.log('mệt vl'); 
      });
    });
  });
}
```

Code như đấm vào mồm như trên gọi là **callback hell**.

![](https://images.viblo.asia/92d79a3a-6ee4-4614-8e68-77538a5c81fc.jpg)

# Kotexcode

Kotexcode nói : code là phải khô thoáng và sạch sẽ.

```
function kotexcode() {
  doA(thenB); // làm A xong làm B
}

// sau đó viết 
function thenB() {
  doB(thenC)
}

// cuối cùng
function thenC() {
  doC(function(){
    // đến đây là xong
    console.log('ahihi đồ ngốc !'); 
  });
}
```

Các anh em hãy nhớ đừng code theo kiểu callback hell nhé, bởi vì code là phải khô thoáng và sạch sẽ mà.