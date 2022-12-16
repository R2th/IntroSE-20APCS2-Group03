![](https://images.viblo.asia/76d3d9c6-f6f0-4ce8-b892-c342f96a029f.png)

   Trong mọi ngôn ngữ lập trình đều tồn tại những thuộc tính có thể được thay đổi (mutable) và những thuộc tính không thể thay đổi (immutable). Trong **Kotlin** có 2 từ khoá để ta khai báo một thuộc tính immutable là **const** và **val**. Những người mới băt đầu lập trình di động bằng ngôn ngữ Kotlin chắc hẳn sẽ có chút bối rối trong việc không biết khi nào sẽ sử dụng chúng. Điều tưởng chừng như đơn giản vậy nhưng nhiều lúc trong những cuộc phỏng vấn xin việc vẫn được các nhà tuyển dụng nhắc đến.
	 Vậy hôm nay chúng ta sẽ cùng nhau đi tìm hiểu sự khác biệt giữa const và val trong Koltin để hiểu sâu về nó nào.
     
##      1. Const trong Kotlin:
Chúng ta sử dụng từ khoá const để khai báo những thuộc tính không thay đổi. Những thuộc tính này chỉ cho phép chúng ta đọc mà thôi.  

Những thuộc tính này phải được gán hoặc khởi tạo tại thời điểm biên dịch (compile-time) để dễ hiểu là lúc chúng ta đang soạn thảo mã lệnh (coding) và đó cũng chính là lý do mà **const** được gọi là hằng số tại thời điểm biên dịch. Vì vậy, trong thời gian ứng dụng chạy (runtime) thì không một giá trị mới nào có thể thay thế cho giá trị của biến **const**. 

Một thuộc tính const có những đặc điểm như sau: 
- Phải được đặt ở top-level hoặc là thành viên của một Object hoặc là thành viên nằm trong companion object.
- Phải được khởi tạo với kiểu String hoặc là kiểu nguyên thuỷ.    
- Không thể custom lại phương thức getter.

Vì vậy, chúng ta không thể nào gán một biến const cho một function hoặc là một class được, bởi vì trong trường hợp này biến của chúng ta sẽ được khởi tạo tại thời điểm runtime (ứng dụng chạy) chứ không phải trong thời gian biên dịch.

Ví dụ: `const val TAG = "NameFragment"`
## 2. Val in Kotkin:
Điểm chung của **val** và **const** là đều được sử dụng để khai báo những thuộc tính chỉ đọc. Nhưng điều khác biệt lớn nhất giữa chúng là thuộc tính val có thể được khởi tạo tại thời điểm chạy ứng dụng. Vì vậy, chúng ta có thể gán một biến val cho một function hoặc class bất kỳ.

Ví dụ: `val name  = "dongbin05"`

Kết thúc phần lý thuyết chúng ta chuyển qua phần ví dụ để vận dụng những kiến thức của phần lý thuyết để hiểu rõ hơn nhé.

## 3. Tìm hiểu ví dụ:
```
    const val city = "Da Nang" // ok 

    class Profile {
        val district = “Hai Chau“ // ok
        
        fun getCityName(): String {
               return city
        }
   }
```

```
    val profile = Profile()
    const val cityName = profile.getCityName() // it not work
	val cityName = profile.getCityName() // it work
```

Ở ví dụ trên, chúng ta sử dụng cityName như là một biến immutable (không thay đổi). Khi sử dụng const, chúng ta phải gán giá trị trực tiếp cho nó nhưng nếu cố gán giá trị cho nó là một function getCityName, thì trình biên dịch sẽ báo lỗi bởi vì biến sẽ được gán giá trị tại thời điểm runtime chứ không phải lúc compile-time. Với val thì cả hai trường hợp trên đều đúng.

## 4. Tại sao lại sử dụng const khi chúng ta có thể sử dụng val ?
Trong ví dụ ở trên, chúng ta thấy biến val được khởi tạo tại thời điểm runtime và const tại thời điểm biên dịch. Vậy tại sao chúng ta lại sử dụng const nếu chúng ta có thể sử dụng val ?

Chúng ta hãy cùng nhau đi tìm hiểu một trường hợp cụ thể bằng ví dụ thực dưới đây:

```
class Profile {

    companion object {
       const val FILE_EXTENSION = ".png"
        val FILENAME: String
        get() = "Img_" + System.currentTimeMillis() + FILE_EXTENSION
    }
}
```

Ở ví dụ ở trên, trong companion object chúng ta đã khai báo một biến const có tên là FILE_EXTENSION và một biến val có tên FILENAME kèm theo một custom phương thức getter.

Với mọi file thì nó đều có phần mở rộng là “.png” nên chúng ta khai báo phần mở rộng nó là một const. Nhưng mỗi file phải được phân biệt nhau bởi những cái tên khác nhau, cụ thể ở đây chúng ta dựa theo thời gian hiện tại của hệ thống. Vì vậy giá trị của file sẽ được đặt trong quá trình runtime nên tại đây chúng ta sử dụng val.

Điều sẽ xảy ra sau quá trình biên dịch là bất kể nơi nào sử dụng biến const ở trên, những biến đó sẽ được thay thế bởi giá trị của nó. Trong trường hợp của biến val, những biến này được giữ nguyên bởi vì chúng ta không biết giá trị của biến val tại thời điểm biên dịch.

Nếu bạn decode đoạn code trên thành Java bạn sẽ thấy :

```
    public final String getFILENAME() {
        return "Img_" + System.currentTimeMillis() + ".png";
    }
```

Ở đây biến FILE_EXTENSION đã được thay đổi bởi chính giá trị của nó “.png” và vì vậy nên chúng ta không tốn chi phí để truy cập vào biến đó trong quá trình runtime. Đây chính là những lợi ích của việc sử dụng const so với val.

Mong qua bài viết này các bạn sẽ hiểu rõ về hai từ khoá const và val trong Kotlin. Cảm ơn các bạn đã theo dõi bài viết này. Nếu có thắc mắc hoặc đóng góp gì mong bạn hãy để lại bình luận phía dưới.

Tham khảo: 
https://blog.mindorks.com/what-is-the-difference-between-const-and-val