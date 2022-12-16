Xin chào các bạn, Có thể trong quá trình làm việc với người thông minh chú ý quan sát thì chỉ cần vài tháng, nhưng với những người kém thông minh hơn hay lười hơn thì phải mất cả năm để nhận ra code mình có vấn đề và `Bốc mùi` đến như thế nào, rõ ràng việc code sạch đẹp, dễ maintain nó cũng như cách sống vậy, có người gọn gàng ngăn nắp, người thì bừa bộn, luộm thuộm (Mình không nói những bạn code không sạch là bừa bộn nhé :D cái này chỉ là ví dụ). Mình tự nhận là người khá ngăn nắp nhưng code thì không sạch (chán). Và mình nghĩ cũng đã đến lúc chúng ta cần tự trau chuốt lại cả cách sống và cách code nếu chúng ta còn tiếp tục muốn sống sót được trong cái nghề mà mỗi ngày càng có nhiều người giỏi hơn, thông minh hơn chúng ta xuất hiện. Chúng ta không thể thông minh, nhanh nhẹn hơn họ được nhưng bù lại chúng ta có sự chỉn chu và những kinh nghiệm xương máu. Để tự thanh lọc mình trong việc code mình bắt đầu lang thang đi tìm những design patterns, Principles ... thứ mà những anh hùng đi trước để lại cho hậu thế. Mình đã tìm hiểu DDD, DI ...tuy nhiên thấy chúng khá khó hiểu và gây lú (vì mình già rồi chăng). Và nguyên lý SOLID xuất hiện trong quá trình tìm kiếm, đọc ... ồ mình nên bắt đầu từ đây, nó khá dễ hiểu, có nhiều người đã áp dụng và chia sẻ trước đây rồi. Tại sao mình lại không chứ. Đầu tiên hãy cùng bắt đầu thanh lọc cơ thể bằng những khái niệm cơ bản nào.

![](https://images.viblo.asia/d1b7f368-5143-4664-ae75-c2f872f674e5.jpeg)

## 1. Single responsibility principle
Nguyên lý đầu tiên có nghĩa là:
> Một Class chỉ nên có một chức năng duy nhất, chỉ sửa đổi với một lý do duy nhất. Giúp dễ dàng quản lý code và bảo trì hơn.

Hãy cùng xem ví dụ sau:
``` PHP
class QuanLySinhVien {
    
    public function getListSV() {}

    public function getDSLopHoc() {}
    
    public function getDSMonHoc() {}

    public function saveSV() {}

    Public function editSV() {}

    public function deleteSV() {}
}
```
Trước giờ khi học ở trường chúng ta thường viết code theo kiểu 3 trong 1, tức là có gì cũng tống chung vào một class, đôi khi chúng ta lại nghĩ class này thật đa năng nhưng nó chỉ đa năng khi chúng ta đi học ở trường, làm mấy cái project nho nhỏ, và đương nhiên cũng chẳng thầy cô nào phàn nàn về vấn đề đó. Kể cả khi đi làm nhiều lúc chúng ta vẫn thường thấy có những function nghe tên thì đã thấy ngay nó thuộc class B nhưng vẫn có người cố nhét nó vào class A. Nguyên nhân là bởi trong class A đó đang có một số biến mà function này muốn sử dụng mà họ lười khai báo lại ở class B. Điều này là hoàn toàn sai lầm cho sự maintain sau này.

Vậy theo nguyên lý 1, chúng ta sẽ tách class trên ra thành những class con, mà mỗi class thể hiện một đối tượng cụ thể, giữ những chức năng của riêng nó.
```php
class LopHoc {
    public function getDSLopHoc() {}
}

class MonHoc {
    public function getDSMonHoc() {}
}

class SinhVien {
    public function getListSV() {}

    public function saveSV() {}

    Public function editSV() {}

    public function deleteSV() {}
}
```

Khi đã có những class với những chức năng cụ thể của riêng nó, chúng ta sẽ gặp tình huống trong khi làm việc là spec thay đổi vậy nên chúng ta bắt buộc phải sửa lại code. Chúng ta cùng xem nguyên lý thứ 2.

## 2. Open/closed principle
Nội dung của nguyên lý này là :
> Chúng ta có thể mở rộng một class, nhưng `hạn chế` thay đổi bên trong class đó.

Thoạt nghe thì thấy không đúng cho lắm, nhưng nghe lại thì thấy không đúng thật (haha) . Các bạn để ý mình đã tô đậm từ `Hạn chế` bởi lẽ với nguyên lý này chũng ta không nên áp dụng một cách máy móc là cứ có tính năng mới là tôi lại tạo ra một class con kế thừa class cha. Điều này  làm cho code các bạn không dễ hiểu mà còn loằng ngoằng hơn. Mà theo mình class mới chỉ nên sinh ra khi nó là một thực thể riêng biệt, không có nó thì thực thể khác vẫn không ảnh hưởng gì, còn nếu sau khi phân tích chúng ta thấy rằng thiếu đi chức năng này sẽ làm ảnh hưởng đến tất cả thì đương nhiên là code cũ đang thiếu, ta nên bổ sung thêm vào cho class đó. Nếu là framework hay plugin thì chúng ta nên tạo commit để contribute cho framework/plugin đó. Giả sử như trong ví dụ về quản lý sinh viên trên, chúng ta muốn tạo chức năng `thêm môn học` thì thay vì máy móc ta viết class con kế thừa class `MonHoc` chỉ để thêm tính năng `addMonHoc` thì ta nên thêm luôn nó vào class MonHoc vì việc thêm môn học là tính năng mà bắt buộc môn học nào cũng cần có.

Hoặc cùng xem class `SinhVien`, nếu muốn thêm tính năng `đăng ký nội trú` thì chúng ta nên tách riêng class con kế thừa từ class SinhVien, bởi lẽ không phải tất cả sinh viên đều muốn đăng ký ở nội trú, ví dụ thích ra ở trọ chẳng hạn.
```php
class NoiTru extends SinhVien {
    public function DangKyNoiTru(SinhVien $id) {}
}
```

## 3. Liskov Substitution Principle
Nguyên lý này có nội dung như sau:
> Các đối tượng thuộc loại con có thể thay thế các đối tượng thuộc loại cha mà không làm thay đổi tính đúng đắn của chương trình.
> 
Nguyên lý này rất trừu tượng và khó hiểu, nên các bạn hãy cố gắng tiêu hóa nhé. Đã có rất nhiều tranh cãi đúng sai về nguyên lý này. Chúng ta có thể hình dung ví dụ:
Các đối tượng HinhVuong đều có thể xem là các đối tượng HinhChuNhat.

Bởi vì chúng ta đều biết hình vuông là hình chữ nhật có 2 cạnh kề bằng nhau, vì thế hình vuông sẽ kế thừa hết các thuộc tính của hình chữ nhật.
## 4. Interface Segregation Principle
Nội dung của nguyên lý này là :
> Thay vì dùng 1 interface lớn, ta nên tách thành nhiều interface nhỏ, với nhiều mục đích cụ thể
> 
Nguyên lý này khá đơn giản  đó là chúng ta không nên có một interface quá lớn vài trăm method, mà chúng ta nên tách chúng ra thành từng loại nhỏ, mỗi loại thể hiện một mục đích cụ thể nào đó.

Ví dụ thay vì viết tất cả các thuộc tính của class DongVat như bên dưới

```php
interface DongVat {
    public function chay();
    
    public function boi();
    
    public function bay();
}
```

Chúng ta có thể tách ra thành class cha và các interface như sau:
```php
interface DongVatTrenCan {
    public function chay();
}

interface Chim {
    public function bay();
}

interface Ca {
    public function boi();
}
```

Mỗi loại tách riêng theo từng đặc tính, như vậy sẽ giúp chúng ta dễ dàng quản lý và maintain sau này cũng như dễ dàng đọc hiểu và sửa code.

## 5. Dependency inversion principle
Nội dung của nguyên lý này là:
> 1. Các module cấp cao không nên phụ thuộc vào các module cấp thấp. Cả 2 nên phụ thuộc vào abstraction.
> 2. Abstraction không nên phụ thuộc vào detail. Detail nên phụ thuộc vào abstraction. (Các class giao tiếp với nhau thông qua interface, không phải thông qua implementation.)
> 
Trước tiên chúng ta nên hiểu Interface là một chuẩn kết nối giữ class cấp cao hơn và class cấp thấp, để thiết bị A có thể kết nối được với thiết bị B chúng cần giáo tiếp thông qua 1 chuẩn riêng, chỉ cần một thiết bị có chuẩn như vậy là có thể giao tiếp được với thiết bị A. Ví dụ thường thấy đó là chân sạc điện thoại, Iphone và SAMSUNG có một chân cắm riêng và chỉ cần cái sạc nào có rắc cắm phù hợp là có thể cắm vào sạc được.
```php
class Backend {
    public function codeJava() {
        // code here
    }
}

class Frontend {

    public function codeJS() {
        // code
    }

}

class Project {

    public function build() {
        $backend = new Backend();
        $frontend = new Frontend();
        $backend->codeJava();
        $frontend->codeJS();
    }

}
```
Như chúng ta có thể thấy qua ví dụ trên class Project đang phụ thuộc vào 2 class Backend và Frontend, Nếu sau này công nghệ thay đổi back end không còn là java nữa, hay frontend không còn là js nữa thì chúng ta phải thay đổi cả code của class cấp thấp và cấp cao. Chúng ta sẽ tạo ra một interface Develop để cho các modules trên phụ thuộc vào:
```php
interface Develop {
    public function develop();
}

class Backend implements Develop {
    public function develop()
    {
        $this->codeJava();
    }

    private function codeJava() {
        // code here
    }
}

class Frontend implements Develop {

    public function develop()
    {
        $this->codeJS();
    }

    private function codeJS() {
        // code
    }

}

class Project {

    protected $develop;

    public function __construct(Develop $develop)
    {
        $this->develop = $develop;
    }

    public function build() {
        $this->develop->develop();
    }

}
```

## 6. Kết luận
Vậy là mình đã giới thiệu cho các bạn về nguyên lý SOLID, việc vận dùng như thế nào trong quá trình code còn là cả quá trình dài, vì không dễ dàng gì để thay đổi một thói quen đã ăn sâu vào tính cách trong một khoảng thời gian dài. Hy vọng bài viết này sẽ phần nào giúp các bạn có cái nhìn sâu sắc hơn và tự nhìn lại code của chính mình xem đã đủ sạch sẽ chưa. Ngoài có còn có bao nhiêu nguyên lý khác sinh ra với mục đích làm cho code sạch đẹp hơn, các bạn cũng có thể áp dụng để tự nâng cao chất lượng sản phẩm của chính mình tạo ra. Một lần nữa cảm ơn các bạn đã đón đọc, trong quá trình viết bài mình có tham khảo nhiều nguồn, dùng nhiều ví dụ trên mạng, có thể đúng hoặc sai hy vọng các bạn thông cảm (bow).

## 7. Tham khảo
https://dzone.com/articles/solid-principles-dependency-inversion-principle

https://kipalog.com/posts/Tim-hieu-nhanh-SOLID-than-thanh