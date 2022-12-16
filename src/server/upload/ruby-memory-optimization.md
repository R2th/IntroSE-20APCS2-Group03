# Mở đầu 
  Nhiều người thường nói đến nhược điểm của ruby, đặc biệt là rails framework là những ứng dụng web xây dựng trên nền tảng này ngốn rất nhiều RAM (bộ nhớ). Nguyên nhân tại sao lại có tình trạng này thì hãy cùng đi vào tìm hiểu bài viết dưới đây để làm rõ các một khía cạnh về bộ nhớ trong ngôn ngữ lập trình ruby 
  
# Garbage collector trong ruby

   Khi tạo một object trong ruby thì máy tính sẽ sử dụng bộ nhớ để lưu trữ object đó. Nếu như bạn tạo ra nhiều object cùng một lúc thì máy tính sẽ phải sử dụng rất nhiều memory. Do dung lượng RAM của bạn có giới hạn (tùy vào cấu hình sẵn có) nên đến một lúc nào đó bạn sẽ hết RAM để lưu trữ các object/sử dụng cho các công việc khác. Khi đó bạn sẽ phải "xả" (**free**) những vùng trong memory space không còn sử dụng đến, để có thể có dư memory cho các công việc khác.
   

   Trong C, thường có những lúc phải sử dụng hai hàm có sẵn là **"malloc()"** và **"free()"** để quản lý memory khi chương trình chạy. Developer sẽ phải đặt hai hàm này bằng tay vào bên trong code của function để lấy bộ nhớ cho biến (malloc() ) và xả bộ nhớ khi không còn thao tác với biến đó nữa (free() ). Tuy nhiên, việc allocate memory và free memory bằng tay như vậy tốn rất nhiều effort của lập trình viên, đặc biệt là trong lập trình hướng đói tượng, vì các object được sử dụng và gọi đi gọi lại nhiều lần nên không xác định rõ khi nào thì nên xả memory, vì vậy phải có một tiến trình tự động thu thập những phần memory đã sử dụng xong và giải phóng phần đó. 
   
   
   Ruby cũng như một số ngôn ngữ lập trình khác đã có sẵn thư viện/module để xử lý việc này, gọi là "**garbage collector**". Trong ruby thì là module "GC". Tính năng garbage collector sẽ tự động phát hiện và giải phóng phần bộ nhớ không "vô dụng" - nghĩa là đang lưu trữ một biến hay object gì đó, nhưng biến và object này không còn được sử dụng nữa. Bạn sẽ không phải lo lắng đến việc allocate và free memory trong lúc code nữa khi đã có sự hỗ trợ của GC. Nhiệm vụ của GC trong ruby chính là *garbage collector*, giải phóng những phần memory đang không bị chiếm mà không có nhiệm vụ gì. 
   
     
   Điều đặc biệt ở đây là để tự động chạy garbage collection, ruby cũng phải sử dụng một phần bộ nhớ. Trong những phiên bản ruby trước đây, chẳng hạn như từ 2.1 đổ về trước, việc enable garbage collector để giải phóng bộ nhớ cho RAM còn tốn nhiều dung lượng RAM hơn cả việc chỉ thực hiện chương trình. Đến những phiên bản ruby gần đây như 2.3, 2.4 thi tốc độ của module GC mới được cải thiện, làm hạn chế việc tốn quá nhiều thời gian cho việc "dọn dẹp rác" khi chương trình ruby được chạy. Vì vậy, khuyến cáo bạn nên dùng phiên bản ruby >= 2.3 để không phải đau đầu khi thỉnh thoảng lại thấy dung lượng RAM sử dụng tăng lên đột biến.
   
   
   Ngoài ra, chắc hẳn bạn cũng đã biết thì trong lập trình ruby "Everything is an object" - Tất cả mọi thứ đều được coi như một object, và để có thể sử dụng mọi thứ như một object thì chương trình ruby cần thêm bộ nhớ để biểu diễn các loại dữ liệu dưới dạng một ruby object. Bạn nên cẩn thận khi xử lý bất cứ một thứ gì đó vì nó đang thao tác với một object. Khi bạn gọi một method vào một object nào đó, ruby tạo ra một bản copy của object đó, tức là lại phải allocate thêm memory cho một object mới. Trong một đoạn code nếu không để ý bạn có thể tạo ra rất nhiều object thừa thãi mà không hề sử dụng lại. Khi đó GC sẽ phải làm việc nhiều hơn để dọn dẹp bộ nhớ cho bạn, khiến cho thời gian process nhiều hơn so với bình thường. Đây là một trong những lý do mà người ta thường nói "Ruby khá là chậm". 
   Để giải quyết vấn đề này, có hai cách để tăng tốc ứng dụng ruby của bạn:
   
   
   ### GC.disable
   
   Đây là một cách để chương trình của bạn bỏ qua quá trình garbage collector, khi đó chương trình chỉ mất thời gian chạy code chứ không thực hiện "dọn rác". Đương nhiên cách làm này khá là nguy hiểm và không được recommend. Khi bạn không thực hiện dọn dẹp rác, toàn bộ object tạo ra và sử dụng trong quá trình chạy chương trình sẽ không mất đi mà vẫn lưu trong bộ nhớ, chiếm hữu dung lượng bộ nhớ, cho đến khi tiến trình kết thúc hoặc bạn chủ động kill tiến trình đó đi. Đến một thời điểm bộ nhớ của bạn không còn chỗ chứa (hết RAM) và dẫn dến tình trạng **memory leak**. RAM không còn đủ dung lượng để lưu trữ các object khác, nên quá trình thực hiện sẽ không thể tiếp tục, gây ra lỗi chương trình, hoạt động không đúng mong muốn hoặc hệ thống chạy chậm hơn rất nhiều. 
   
   
   ### Optimize memory at the source code level
   
   
   Đây là cách thức chủ động hơn từ phía developer. Thay vì "code làm sao cho nó chạy được" thì với một vài thay đổi nhỏ trong lúc code, bạn có thể giảm thiểu lượng RAM tiêu thụ của ứng dụng ruby, đặc biệt là ứng dụng web xây dựng trên nền ruby on rails. 
   
   
# Một số cách optimize ruby memory của bạn:


   Như đã nói ở trên thì một cách để tối ưu hoá dung lượng bộ nhớ là sửa source code của bạn. Cụ thể là có những cách sau:
   
  
### Thực hiện sự thay đổi trên chính object đang sử dụng 

 
 Đối với String, Hash, Array, bạn được hỗ trợ rất nhiều method để trả về giá trị đã thay đổi của những object đó, như `dơwncase`, `gsub`, `reverse`,... Ruby hỗ trợ nhiều hàm có chức năng tương tự nhưng thêm một dấu "!" đằng sau tên method, với mục đính là modify chính object gọi đến method đó. Như đã nói ở trên, giả sử như khi gọi `"Name".downcase` thì ruby sẽ tạo ra một bản copy của string "Name", và thực hiện hàm `downcase` đối với object copy đó, trả về một object mới là "name", còn object string "Name" vẫn tồn tại trong bộ nhớ. Tương tự với hash và array, những method như `map`, `select`, `reject` sẽ tạo ra một array/hash   VÌ thế khuyến khích bạn sử dụng "bang" method (thêm dấu "!" sau tên method) nếu bạn không cần sử dụng object cho một chỗ nào khác trong hệ thống của mình. 
 
   Ví dụ về một hàm có nhiệm vụ bỏ các phần chữ match với regex trong một mảng gồm các string như sau:
 ```
def remove_prefix(arr)
  array.map do |str|
    str.downcase.gsub(/\A(prefix_)/, "")
  end 
end 
 ```
 
 Trong đoạn code trên, hàm `remove_prefix` nhận một array làm argument và tạo ra một array mới với các string đã downcase và bỏ đi phần "prefix_" ở đầu. Khi gọi method này trên một array với hàng triệu phần tử thì tương ứng  có hàng triệu string object được tạo ra, là một bản modified copy của một string gốc trong array đó. Khi dó RAM sẽ bị ngốn rất nhiều bởi đống copied objects đó, trong khi bạn không cần thiết phải sử dụng bản original làm gì. Vì thế, chúng ta có thể tối ưu bằng cách sửa lại như sau:
  
```
def remove_prefix(arr)
  array.map do |str|
    str.downcase!
    str.gsub!(/\A(prefix_)/, "".freeze)
  end 
end 
```
 
Chúng ta chỉ nên sử dụng cách này khi các string bên trong array không cần thiết phải dùng ở đâu khác nên có thể trực tiếp sửa  đổi chúng. Việc modify trực tiếp như vậy không gây ảnh hưởng đến các phần khác trong hệ thống nên sẽ không gây ra tác động gì nhiều.
 
### Đọc file theo từng hàng một

  Để đọc được hết một file thì chúng ta cũng cần phải allocate nhiều bộ nhớ sử dụng cho việc đó. Đôi khi để đảm bảo dữ liệu đầy đủ thì nhiều người cũng lựa chọn đọc hết toàn bộ nội dung của một file khi code. Tuy nhiên việc đọc file như vậy khiến cho bộ nhớ phải chịu sức nặng rất lớn. Đọc một file csv nặng 20MB cũng mất đúng 20MB bộ nhớ. 
  
  Giả sử, trong file csv này có 100_000 dòng và 10 cột, để đọc hết file này thì bạn sẽ phải dượt qua tất cả các dòng và cột, số lượng object trong một file như vậy là 1_000_000, tương đương với việc phải allocate memory cho toàn bộ 1 triệu object đó. Nếu như đọc nguyên một file như vậy, hoặc sử dụng CSV để parse cả một file như vậy thì các object trong quá trình chạy code sẽ không được xả khỏi bộ nhớ, khiến cho lượng RAM sử dụng là rất lớn 
  Tuy nhiên, với việc đọc từng dòng một trong file csv, các dòng đã qua xử lý sẽ được ruby GC dọn dẹp, xử lý và "xả" khỏi bộ nhớ giúp cho RAM còn nhiều dung lượng sử dụng hơn.
  
### Tối ưu hoá các vòng lặp 
   Vòng lặp (iterators) là công cụ hữu ích cho dev để thực viết các đoạn code cần loop. Về bản chất thì đây chỉ là các hàm được gọi vào lớp *Array, Hash, Range,...* và nhận một block làm argument. Như vậy iterator sẽ có các đặc điểm sau:
   - Ruby GC không dọn dẹp bộ nhớ cho những object được tạo ra khi vòng lặp đang diễn ra. Chúng chỉ được dọn dẹp khi vòng lặp kết thúc. Vì thế nếu bạn dùng iterator cho một danh sách dài các dữ liệu thì toàn bộ bộ nhớ mà vòng lặp sử dụng cho những object đã lặp qua đều không được giải phóng, dù các object đó không hề được sử dụng đến nữa 
   - Iterator vốn dĩ cũng là những method gọi vào một object, vì thế cũng sẽ tạo ra những bản copy của object đó khiến cho bộ nhớ của bạn phải sử dụng nhiều hơn 
  Chính vì thế, để tối ưu hoá các vòng lặp này, bạn nên chú ý hơn khi viết ra những dòng code sử dụng iterator để tránh gây ra việc sử dụng bộ nhớ thừa thãi: thu
   - Giải phóng object sau khi kết thúc vòng lặp 
   - Sử dụng each! 
   - Tránh tạo ra object trong mỗi lần lặp 
# Kết luận
   Trên đây là một số lý thuyết cũng như thủ thuật giúp bạn hiểu rõ hơn về cách ruby sử dụng RAM, tại sao ruby được cho là chậm. Với việc phần tích và tìm ra nguyên nhân đến từ source code, bạn có cải thiện để giảm bớt lượng tiêu thụ RAM của một chương trình/ứng dụng ruby giúp bạn an tâm hơn về vấn đề bộ nhớ của mình.
   Cảm ơn đã theo dõi!