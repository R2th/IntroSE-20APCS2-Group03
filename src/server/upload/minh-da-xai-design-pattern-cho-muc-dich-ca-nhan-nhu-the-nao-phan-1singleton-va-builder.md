## 1. Lời Mở Đầu 

xin chào các bạn đã đến với bài viết của mình . Bài viết này được mình ấp ủ từ rất lâu rồi . hôm nay, mình muốn giới thiệu một chút về cách mình làm việc với Design Pattern, mình không biết đây có được gọi là kinh nghiệm hay không nữa (thực ra là mình cũng chưa đi làm bao giờ nên chả biết trong mấy cái dự án thực tế như thế nào nữa :rofl:), còn một vấn đề nữa là mình chỉ mới tìm ra được cách áp dụng Singleton và Builder  nên mình chỉ xin giới thiệu về 2 cái đó thôi, mấy cái khác thì chưa có cơ duyên (chừng nào đi làm có cơ duyên thì chắc sẽ lĩnh hội được thôi ha :sunglasses:) 

phần đầu của bài viết, mình sẽ tổng hợp một số kiến thức để các bạn nào chưa biết về nó có thể có cái nhìn tổng quan nhất về Design Pattern cũng như 2 Design Pattern là Singleton và Builder, tiếp theo mình sẽ chia sẻ cách mình làm việc với những Design pattern, cuối cung mình sẽ tổng kết lại một xíu, 

Lưu ý: mình sẽ code bằng java, những kinh nghiệm được viết ở phần 3 đều là mình làm trong dự án cá nhân cả (nên mình cũng chả dám chắc nó có đúng hay không:innocent: ?!) nên tóm chung lại thì bài viết này chỉ mang tính tham khảo thôi nha , bạn nào lấy đem triển khai đồ án nhóm thầy la mình không chịu trách nhiệm đâu:triumph:

## 2. Ôn tập lại kiến thức cơ bản
### A. Sơ khởi về Design Pattern
design pattern đơn giản là một giải pháp chung để giải quyết vấn đề trong lập trình OOP, nó được các bậc tiền nhân đi trước đúc kết lại qua quá trình làm dự án (kiểu như kinh nghiệm vậy đó )(để dễ hiểu các bạn cứ tưởng tượng nó như 1 cuốn bí kíp võ công đó , các bạn đã học được cách xây dựng lớp, OOP, static class, interface, abstract các thứ ,... và bây giờ các bạn phải kết hợp đám đó vào thêm 1 chút muối tiêu nữa là chấm ăn :smile: - ý lộn là thành design pattern thế thôi)

![](https://images.viblo.asia/f83f1a6f-c76a-4a88-ac88-15be06759bcd.jpg)

Design pattern được chia làm 3 nhóm chính: 
#### 1. Creation Pattern (Các mẫu khởi tạo) 
![Creation](https://images.viblo.asia/33315e5e-41e4-4ce2-a0cc-89f9b52592f4.png)

Creation pattern (Nhóm khởi tạo) : Liên quan đến Khởi tạo đối tượng (các bạn cứ tưởng tượng nó cung cấp cho mình các cách tạo ra 1 đối tượng mà làm được nhiều thứ hơn mấy cái đối tượng mà các bạn từng tạo trước đây á:triumph:)
Nhóm này gồm 5 mẫu thông dụng: 

- Factory Method
- Abstract Factory
- Builder
- Prototype
- Singleton

#### 2. Structural Pattern (các mẫu cấu trúc)

![Structual Pattern](https://images.viblo.asia/7fff389b-1d30-47c6-8b65-adaa360f0d2b.png)

Structual Pattern (Nhóm cấu trúc) : cung cấp giải pháp liên kết các đối tượng

Nhóm này gồm 7 mẫu thông dụng: 

- Adapter
- Bridge (nghe cầu đường là biết kết nối rồi chứ gì nữa:innocent:)
- Composite
- Decorator
- Facade
- Flyweight
- Proxy

#### 3. Behavioral Pattern (Nhóm hành vi)

![Behavior Pattern](https://images.viblo.asia/e05cb58f-5a7e-45cb-9c70-d9bc58303b53.png)

Behavioral Pattern (Nhóm hành vi) :  giải pháp liên quan đến các hành vi của đối tượng và giao tiếp giữa các đối tượng khác nhau

Nhóm này gồm 11 mẫu thông dụng: 

- Interpreter
- Template Method
- Chain of Responsibility
- Command
- Iterator
- Mediator
- Memento
- Observer (kẻ quan sát nè)
- State
- Strategy
- Visitor
 
### B. Giới thiệu về 2 mẫu Creation pattern được đề cập trong bài này
#### 1. Singleton
Định nghĩa cơ bản:  Singleton đảm bảo chỉ `duy nhất một thể hiện (instance)` được tạo ra và nó sẽ cung cấp cho bạn một method để có thể truy xuất được thể hiện duy nhất đó mọi lúc `mọi nơi` trong chương trình (để bài này được dễ hiểu nhất mình sẽ không nói quá nhiều)

Note 2: thực ra bạn không cần đọc hết cái định nghĩa sặc mùi gg dịch ở trên đâu :kissing_heart:, các bạn chỉ cần quan tâm đến mấy đoạn mình mark là được: 
-  `mọi nơi`=>nghe quen quen đúng không ??? => thằng static đó 
-  `duy nhất 1 instance`=>chắc chắn là phải tạo instance rồi (mà vẫn phải thỏa mãn điều trên đó :sunglasses:) => tự nó tạo nó luôn 

Note 3: Phòng các bạn méo biết instance thì nó đây  :  ```HocSinh hocSinh = [new HocSinh()] <= tui đây;``` 

tổng hợp hết đống trên là và Voila => Lớp Singleton có 1 thằng thuộc tính static khởi tạo luôn lớp đó => sau đó cho truy cập thuộc tính đó thông qua phương thức Getter(Tính đóng gói đó - nhớ không) (cũng static luôn , thế là xong ), phòng các bạn chưa hiểu thì mình có chôm cái hình với đoạn code để xem thêm

![](https://images.viblo.asia/d517fdf4-a5f5-4813-8c57-454d60cba16f.png)

```

package com.singleton;
// kiểu này giang hồ gọi là Eager initialization đó
public class EagerInitializedSingleton {
     // thằng thuộc tính khởi tạo nó luôn này
     private static final EagerInitializedSingleton INSTANCE = new EagerInitializedSingleton();
 
    // Private constructor to avoid client applications to use constructor
    private EagerInitializedSingleton() {}
    
    // thấy getter không ae
    public static EagerInitializedSingleton getInstance() {
        return INSTANCE;
    }
}

```
####  2. Builder

định nghĩa cơ bản: Builder pattern là một trong những Creational pattern. Builder pattern là mẫu thiết kế đối tượng được tạo ra để xây dựng một `đối tượng phức tạp` bằng cách sử dụng các `đối tượng đơn giản` và sử dụng tiếp cận từng bước, việc xây dựng các đối tượng đôc lập với các đối tượng khác. => khó hiểu lắm đúng không, đừng đọc nhé :clown_face:

- cách mình hiểu: vì một số mục đích cá nhân (các bạn nên đọc phần 3 để thấy mục đích của mình),  mà bạn tạo ra 1 đối tượng clone của thằng sẵn có. Không giống như thằng cha nó, thằng này chỉ được cấp trước 1 vài bộ phận thôi (chẳng có gì cũng được), sau đó bạn tạo một số hàm để biến nó cho gần giống ba nó là được => vẫn khó hiểu lắm đúng không :cowboy_hat_face:, vậy thì ngày xưa bạn có một bộ lắp ráp robot, bạn sẽ lắp lại cho giống như hình người ta cho trước và chuyện lắp hết hay bỏ chân hay tay đi là quyền của bạn (ở đây là mấy ông lập trình viên á), tất nhiên bạn hoàn toàn hiểu rằng bản mình lắp là bản clone (bản thật phải ở nhà máy bên tàu chứ đâu)

- mình cung cấp thêm mô hình cho mấy bạn muốn tìm hiểu thêm

![](https://images.viblo.asia/74068adf-9e6e-4aa9-a6b3-40f76a484d8c.png)

Một builder gồm các thành phần cơ bản sau:

- Product : đại diện cho đối tượng cần tạo, đối tượng này phức tạp, có nhiều thuộc tính.
- Builder : là abstract class hoặc interface khai báo phương thức tạo đối tượng.
- ConcreteBuilder : kế thừa Builder và cài đặt chi tiết cách tạo ra đối tượng. Nó sẽ xác định và nắm giữ các thể hiện mà nó tạo ra, đồng thời nó cũng cung cấp phương thức để trả các các thể hiện mà nó đã tạo ra trước đó.
- Director/ Client: là nơi sẽ gọi tới Builder để tạo ra đối tượng.

Trường hợp đơn giản, chúng ta có thể gộp Builder và ConcreteBuilder thành static nested class bên trong Product.
## 3. Những kinh nghiệm mà mình đã đạt được

phần này là mình hoàn toàn dựa vào kinh nghiệm từ project cá nhân nên có thể nó hoàn toàn không dựa lắm vào thực tế, các bạn coi với tinh thần tham khảo thui :laughing:, một số thông tin thêm là project của mình thuộc về project web MVC và các vấn đề tiếp theo sẽ thuộc về lớp Model (lớp chuyên xử lí)

=> bật mí lí do chính là mình nông nổi sinh rảnh rỗi và muốn one-line code (cứ chấm, chấm nữa chấm mãi thôi), 2 ông singleton và builder cũng đều nhằm mục đích đó

### A. Singletion
#### 1. Vấn Đề 

đầu tiên, hẳn các bạn đã biết khi làm web chúng ta thường có các lớp chuyên xử lí CRUD (thêm, sửa, xóa) và các bạn thường tạo thành một bộ xử lí (giống như lên database lấy thông tin, cộng trừ nhân chia gì đó, cuối cùng là ghi lại) kiểu nó như thế này:
```

// kệ thằng autowired đi ha
@Autowired
private NguoiDungDao nguoiDungDao;
//.. something here or not
//.. trong hàm như thế này
NguoiDung n=nguoiDungDao.findByMa(ma, NguoiDung.class);
n.setVaitro(new VaiTro(VaiTroEnum.ADMIN));
nguoiDungDao.edit( n ,true);

```
trước đây khi mình làm các đồ án ở trường mình thường:
- tạo hàm xử lí luôn trong lớp xử lí chính (mình không thích phải làm như vậy, lớp xử lí chính chỉ nên làm mấy cái tác vụ tìm kiếm, thêm xóa sửa chính thôi,nội mấy cái tìm kiếm mình cũng thấy nó nhiều rồi )
- tạo lớp mới (mỗi lần tạo lớp mới cũng nghe chừng rắc rối vì mình cũng ghét phải nghĩ ngợi đến tên lớp - kiểu như: `nguoiDungDao_1` vậy đó, lúc muốn sài lại phải lọ mọ xem thử nó tên gì,hoặc phải nhớ => nghe chừng hơi cực nhỉ )

lúc này mình hay viết các hàm trong lớp `Utils` (lớp chứa hàm static) - chỉ cần gọi tên lớp -> ra 1 đống tên hàm -> gọi tên hàm mình thích -> thế là xong và mình rất muốn cái vấn đề trên được làm theo kiểu đó (khổ nổi thằng "nguoiDungDao" nó có chịu static đâu=>phải tìm cách khác thôi với lại mình muốn cái hàm của mình phải ít tham số thôi, lúc nào cũng kè kè thằng "dao" như thế thì chết dở) =>cuối cùng xài Singleton thôi

#### 2. Cách Mình Giải Quyết

- đầu tiên mình tạo một lớp có tên là `NguoiDungUtils` (cho giống với đống anh em one-line code của chúng)

```
public class NguoiDungUtils {
        // cho thuộc tính dao vào trong luôn
        @Autowired
        private NguoiDungDao nguoiDungDao;
  }
```

- hơi khác so với mô hình ở trên một xíu, thể hiện của lớp sẽ được đặt bên trong một `private static class` (đây là 1 inner class) sau đó cho truy cập vào thuộc tính đó thông qua phương thức getter (getInstance)
```
    private static class SingletonHolder {    
         public static final NguoiDungUtils instance = new NguoiDungUtils(); // 1 lần duy nhất
    }
    public static NguoiDungUtils getInstance() {    
        return SingletonHolder.instance;    
    }
```

- tiếp theo sau đó là thêm hàm thôi
```
public void promoteUser(String ma) {
		NguoiDung n=nguoiDungDao.findByMa(ma, NguoiDung.class);	
        n.setVaitro(new VaiTro(VaiTroEnum.ADMIN)); //mình sài enum - các bạn nào thích enum và mấy bài liên quan dơ tay
        nguoiDungDao.edit( n ,true);
	}

```
- gọi nào Voila
```

NguoiDungUtils.getInstance().promoteUser(ma); //one - line nhé

```
và thế là chúng ta đã có 1 project tích hợp design pattern rồi , dễ đúng không nào, tiếp theo thì tới Builder (aka thanh niên thích xếp hình thôi nào)

### B. Builder
#### 1. Vấn đề

mình đang làm một trang web về truyện và mọi chuyện sẽ vẫn suôn sẻ cho tới khi mình làm với mấy cái API (mục đích chính là thực hành cho biết) tới đây thì có 2 vấn đề xảy ra

- Vấn đê 1: nếu bạn nào có biết API của google sau khi được auth xong sẽ đòi hỏi mấy cái quyền được xem các thông tin( ông dev web yêu cầu xem thêm cái gì từ người dùng thì nó sẽ cho cái đó , hỏi bao nhiêu cho bấy nhiêu nêu không hỏi thì ông dev chỉ được mấy thông tin cơ bản thôi) => MÌNH MUỐN LÀM CÁI ĐÓ ( Thực hành + project cá nhân mà !!! thích cái gì thì gắn cái đó vào thôi, chả sợ bố con thằng nào ) 

- Vấn đề 2: Object của mình có trăm mấy dòng toàn thuộc tính và annonation(mình có add lombok vào rồi) ,có mấy thuộc tính dạng như thế này nữa:
```
    // đây là thuộc tính join bảng trong hibernate thôi=>đừng quan tâm nhiều, chỉ cần biết là nó có List Object nghĩa là nó khá nhiều thôi
    @Getter
    @Setter
    @OneToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "NguoiDung_YeuThich",
            joinColumns = @JoinColumn(name = "MaNguoiDung"),
            inverseJoinColumns = @JoinColumn(name = "MaTruyen")
	)
    protected List<Truyen> truyens;
``` 
với các bạn chỉ muốn xem thông tin email thôi mà bê nguyên cái danh sách vào thì hơi sai sai

====> giải pháp cũ: 
-  giải pháp là tạo thật nhiều constructor với cac loại tham số khác nhau => siêu siêu mệt mỏi như dưới đây
```
    public NguoiDung(int ma){...}
    public NguoiDung(int ma, String name) {..}
    // khá nhiều phía sau
```
- hoặc là bạn tạo ra một đối tượng rỗng rồi set thật nhiều vào => nhiều set quá + không one-line code như dưới đây
```
    NguoiDung nd = new NguoiDung();
    nd.setMa(ma);
    nd.setTen(ten);
    ...(dài vl)
    // tiếp theo đến vô cực luôn
```
=> cuối cùng mình cũng đã tìm ra Builder - chàng công nhân chăm chỉ (nghe giống quảng cáo bột giặt ghê:triumph:)
#### 2. Cách Mình Giải Quyết Vấn Đề

đầu tiên mình tạo một interface (đóng vai trò Buider) định nghĩa các hàm lắp ráp, đặt tên là "NguoiDungBuilder"
```
    public interface NguoiDungBuilder {
        NguoiDungBuilder requireVaiTro(NguoiDung nd);
        NguoiDungBuilder requireToken(String secrectCode);
    }
```

tiếp theo mình sẽ tạo một lớp hiện thực Builder, lớp này được mình đặt tên là lớp "NguoiDungBuild" nó kế thừa lớp "NguoiDung" và implements interface Builder
```public class NguoiDungBuild extends NguoiDung implements NguoiDungBuilder { }```


kế đó là kế thừa lại constructor từ lớp cha (nhập OOP tùy tục mà):
```
// đây đóng vai trò như những dòng thông tin API mặc định(vấn đề phía trên)
public NguoiDungBuild(String username, String email,Date ngaytg, Date ngaytd) {
		super(username, email, ngaytg, ngaytd);
}
```
tiếp đến là viết hàm được ghi đè thôi thôi
```
@Override
	public NguoiDungBuilder requireVaiTro(NguoiDung nd) {
		// làm gì bạn thích
		return this;
	}
    
    @Override
	public NguoiDungBuilder requireToken(String secrectCode) {
       // làm gì bạn thích
       return this
	}
```
cuối cùng còn mỗi việc gọi thôi
```
new NguoiDungBuild(nd)
            .requireVaiTro(nd)
            .requireToken(secretcode) // mỗi cái chấm là thêm 1 thuộc tính mới rồi đó=>nhanh gọn lẹ
```
## 4. Lời sau cùng

hello các bạn, ttdat desu-yo, nếu các bạn đọc tới dòng này, thì mình hi vọng các bạn đọc xong bài viết trên, hi vọng các bạn không cảm thấy ghét mấy câu nội tâm của mình, bài viết này hoàn toàn dựa vào những suy nghĩ và đúc kết của riêng mình nên không tránh khỏi sai sót nên mình rất mong nhận được 1 COMMENT, 1 VOTE, 1 CLIP TỪ CÁC BẠN

Note: do chỉ biết về singleton và builder nhờ cơ duyên nên mình nghĩ ít có cơ hội có phần 2 lắm, mong là trong tương lai sẽ có, nói chung là cứ follow mình thôi

Note: còn 1 bài nữa thôi, cố lên tôi ơi, vì MAY-FEST nào

## 5. Nguồn Tham khảo
design pattern và hình tham khảo - https://itviec.com/blog/design-pattern/
mô hình và code tham khảo Builder, Singleton - https://gpcoder.com/4434-huong-dan-java-design-pattern-builder/