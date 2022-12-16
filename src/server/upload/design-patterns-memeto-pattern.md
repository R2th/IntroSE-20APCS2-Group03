Memento là pattern được thiết kế dựa trên phương thức hoạt động của cỗ máy thời gian cất trong ngăn kéo bàn học của Nobita hậu đậu. Memento thể hiện ước vọng muốn làm chủ định mệnh và chữa lành những ký ức đã qua bằng phần mềm Photoshop.

Trong Memento, một object MainStream đại diện cho dòng chảy chính của chương trình có trạng thái được cập nhật thay đổi liên tục sẽ được theo dõi và đôi khi được lưu lại các `snapshot` trạng thái quan trọng có thể cần được phục hồi. Object này thường được gọi với một cái tên khác là Originator (bản nguyên).

Mỗi một `snapshot` hay trạng thái được lưu lại sẽ được gọi là 1 `Memento`, được hiểu nôm na là một mảnh ký ức của dòng chảy chính. Các mảnh ký ức này được lưu lại trong một kho ký ức `Memory` nhưng thường được nhân cách hóa thành người giữ ký ức `CareTaker` và có thể sẵn sàng được truy xuất bất kỳ thời điểm nào cần sử dụng.

## Áp dụng triển khai

![sơ đồ các class](https://images.viblo.asia/74557a48-d64c-45ed-82cb-9a85b0c57399.png)

Chẳng hạn bạn sử dụng GIMP (một phần mềm mã nguồn mở và miễn phí thay thế cho Photoshop) để manip (cách nói khác của tổ hợp, phối cảnh) một khung cảnh yên bình với rất nhiều bước. Đâu đó đến bước thứ 1001 thì bạn cảm thấy dường như đã thêm quá nhiều chi tiết khiến bối cảnh bị mất đi phong thái muốn tạo ra ban đầu. Lúc này bạn muốn khôi phục lại tiến trình manip tới bước thứ 101 khi mới chỉ có hình nền landscape và một vài bạn pet đang nô đùa. Đó là lúc 1 `Memento` cần được lấy ra từ  kho ký ức `Memory` và khôi phục thay vào trạng thái hiện tại của khung hình.

### Bước 1

Tạo `class Originator` đại diện cho dòng chảy chính của chương trình.

`mementopattern/Originator.java`
```java
package mementopattern;

public class Originator {
   private String state = "";

   public void setState(String state) {
      this.state = state;
   }

   public String getState() {
      return state;
   }
}

```

### Bước 2

Tạo `class Memento` để đóng khung và lưu lại các `snapshot` trạng thái khi cần thiết.

`mementopattern/Memento.java`
```java
package mementopattern;

public class Memento {
   private String state;

   public Memento(String state) {
      this.state = state;
   }

   public String getState() {
      return state;
   }
}
```

### Bước 3

Thêm tính năng lưu `snapshot` và khôi phục `restore` từ một `snapshot` cho chương trình `Originator`.

`mementopattern.java`
```java
package mementopattern;

public class Originator {
   private String state = "";

   public void setState(String state) {
      this.state = state;
   }

   public String getState() {
      return state;
   }

   public Memento saveState() {
      return new Memento(state);
   }

   public void restore(Memento m) {
      state = m.getState();
   }
}
```

### Bước 4

Tạo kho ký ức `Memory` để lưu trữ tập trung các `snapshot` và truy xuất khi cần dùng.

`mementopattern/Memory.java`
```java
package mementopattern;

import java.util.ArrayList;
import java.util.List;

public class Memory {
   private List<Memento> mementoList = new ArrayList<Memento>();

   public void add(Memento m) {
      mementoList.add(m);
   }

   public Memento get(int index) {
      return mementoList.get(index);
   }
}
```

### Bước 5

Viết code `main` để dùng thử tính năng của `Memento`.

`PatternDemo.java`
```java
import mementopattern.Memento;
import mementopattern.Originator;
import mementopattern.Memory;

public class PatternDemo {
   public static void main(String[] args) {
      Originator mainStream = new Originator();
      Memory memory = new Memory();

      mainStream.setState("Trạng thái #1");
      mainStream.setState("Trạng thái #2");
      memory.add( mainStream.saveState() );

      mainStream.setState("Trạng thái #3");
      memory.add( mainStream.saveState() );

      mainStream.setState("Trạng thái #4");
      System.out.println("Trạng thái hiện tại: " + mainStream.getState());

      Memento firstSaved = memory.get(0);
      System.out.println("Trạng thái đã lưu đầu tiên: " + firstSaved.getState());

      Memento secondSaved = memory.get(1);
      System.out.println("Trạng thái đã lưu thứ hai: " + secondSaved.getState());

      mainStream.restore(firstSaved);
      System.out.println("=== Khôi phục trạng thái đã lưu đầu tiên...");
      System.out.println("Trạng thái hiện tại: " + mainStream.getState());
   }
}
```

### Bước 6

Kiểm chứng lại kết quả được in ra tại `console`.

`console`
```java
Trạng thái hiện tại: Trạng thái #4
Trạng thái đã lưu đầu tiên: Trạng thái #2
Trạng thái đã lưu thứ hai: Trạng thái #3
=== Khôi phục trạng thái đã lưu đầu tiên...
Trạng thái hiện tại: Trạng thái #2
```