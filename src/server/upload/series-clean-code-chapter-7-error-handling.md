Nghe có vẻ kỳ lạ khi nói về xử lý lỗi trong cuốn sách về clean code. Chỉ là xử lý lỗi là một trong những điều mà tất cả chúng ta phải làm khi chúng ta lập trình. Xử lý lỗi là quan trọng nhưng nếu nó che lấp đi logic thì nó là sai lầm.
# 1. Use Exceptions Rather Than Return Codes (Sử dụng ngoại lệ hơn là trả về Codes)
Bạn có thể thiết lập một error flag hoặc trả về một mã lỗi mà người gọi có thể kiểm tra.

```javascript
public class DeviceController {
   ...
   public void sendShutDown() {
      DeviceHandle handle = getHandle(DEV1);
     // Check the state of the device
      if (handle != DeviceHandle.INVALID) {
         // Save the device status to the record field
         retrieveDeviceRecord(handle);
         // If not suspended, shut down
         if (record.getStatus() != DEVICE_SUSPENDED) {
            pauseDevice(handle);
            clearDeviceWorkQueue(handle);
            closeDevice(handle);
         } else {
            logger.log("Device suspended. Unable to shut down");
         }
      } else {
         logger.log("Invalid handle for: " + DEV1.toString());
      }
   }
   ...
}
```
Vấn đề ở đây là nó lộn xộn với người gọi. Người gọi phải kiểm tra trực tiếp sau khi gọi. Không may, nó rất dễ bị quên lãng. Vì lý do đó, tốt hơn là cho nó ra một exception khi bạn gặp phải lỗi. Nó làm mã được sạch hơn và logic không bị che khuất bởi xử lý lỗi.
```java
public class DeviceController {
   ...
   public void sendShutDown() {
      try {
         tryToShutDown();
      } catch (DeviceShutDownError e) {
         logger.log(e);
      }
   }

   private void tryToShutDown() throws DeviceShutDownError {
      DeviceHandle handle = getHandle(DEV1);
      DeviceRecord record = retrieveDeviceRecord(handle);

      pauseDevice(handle);
      clearDeviceWorkQueue(handle);
      closeDevice(handle);
   }

   private DeviceHandle getHandle(DeviceID id) {
      ...
      throw new DeviceShutDownError("Invalid handle for: " + id.toString());
      ...
   }
   ...
}
```

Code tốt hơn bởi vì có hai quan hệ lộn xộn ở đây, thuật toán cho thiết bị tắt máy và xử lý lỗi, và bây giờ nó đã được tách ra.
# 2. Write Your Try-Catch-Finally Statement First

**Try** - Như transactions.

**Catch** - Rời khỏi chương trình và không vấn đề xảy ra trong try.

Sử dụng try-catch-finally là một cách tốt để bắt đầu viết code khi bạn đang viết code và ném đi những ngoại lệ. Điều này giúp chúng ta định nghĩa được những gì mà người dùng nên mong đợi, không vấn đề gì xảy ra đối với các đoạn code ở trong try.

Ví dụ: Viết một đoạn code với mục đích truy cập file và đọc một số đối tượng theo sắp xếp theo thứ tự.

Chúng ta bắt đầu với Unit Test cho chúng ta biết ngoại lệ khi file không tồn tại:
```java
@Test(expected = StorageException.class)
public void retrieveSectionShouldThrowOnInvalidFileName() {
   sectionStore.retrieveSection("invalid - file");
}
```

Test này thúc đẩy chúng ta viết bản sơ khai:
```java
public List<RecordedGrip> retrieveSection(String sectionName) {
   // dummy return until we have a real implementation
   return new ArrayList<RecordedGrip>();
}
```
Test này thất bại nó chưa ném ra ngoại lệ. Tiếp theo chúng ta thay đổi hiện thực, do đó mà nó cố gắng truy cập vào một tập tin không hợp lệ. Thao tác này thows một exception:

```java
public List<RecordedGrip> retrieveSection(String sectionName) {
   try {
      FileInputStream stream = new FileInputStream(sectionName)
   } catch (Exception e) {
      throw new StorageException("retrieval error", e);
   }
   return new ArrayList<RecordedGrip>();
}
```

Test passes bởi vì nó đã bắt lấy một exception. Tái cấu trúc lại:

```java
public List<RecordedGrip> retrieveSection(String sectionName) {
   try {
      FileInputStream stream = new FileInputStream(sectionName);
      stream.close();
   } catch (FileNotFoundException e) 
      throw new StorageException("retrieval error”, e);
   }
   return new ArrayList<RecordedGrip>();
}
```

### Use Unchecked Exceptions (Sử dụng ngoại lệ không được kiểm tra)
**Checked**: là các ngoại lệ được kiểm tra tại thời điểm biên dịch.

**Unchecked**: là những ngoại lệ không được kiểm tra tại thời điểm biên dịch. C # không có ngoại lệ được kiểm tra.

Các ngoại lệ được kiểm tra đôi khi có thể hữu ích nếu bạn đang viết một thư viện quan trọng: Bạn phải nắm bắt chúng. Nhưng trong phát triển ứng dụng nói chung, chi phí phụ thuộc lớn hơn lợi ích.

# 3. Provide Context with Exceptions (Cung cấp bối cảnh cho ngoại lệ)
Mỗi trường hợp ngoại lệ bạn nên cung cấp ngữ cảnh để xác định nguồn gốc và vị trí của lỗi. Trong Java, bạn sẽ nhận được một stack truy tìm (trace) từ bất kỳ ngoại lệ nào. Tuy nhiên stack đó không cho bạn biết ý nghĩ của các ngoại lệ không thành công.

Tạo một thông điệp báo lỗi và truyền cho chúng với ngoại lệ của bạn. Đề cập đến các hành động gây ra lỗi và loại lỗi.

# 4. Define Exception Classes in Terms of a Caller's Needs the Normal Flow
Có nhiều cách để phân loại lỗi. Chúng ta có thể phân loại theo nguồn gốc: Chúng đến từ thành phần hay những gì khác? Loại của chúng: Lỗi thiết bị, lỗi mạng, hay lỗi lập trình? Tuy nhiên khi chúng ta định nghĩa các lớp ngoại lệ ở trong ứng dụng, mối quan tâm lớn nhất của chúng ta là làm cách nào chúng bắt được.

```java
ACMEPort port = new ACMEPort(12);

try {
   port.open();
} catch (DeviceResponseException e) {
   reportPortError(e);
   logger.log("Device response exception", e);
} catch (ATM1212UnlockedException e) {
   reportPortError(e);
   logger.log("Unlock exception", e);
} catch (GMXError e) {
   reportPortError(e);
   logger.log("Device response exception");
} finally {
   …
}
```

Bạn đừng ngạc nhiên có rất nhiều sự trùng lặp ở đây. Chúng ta ghi lại mỗi lỗi ở đây và đảm bảo rằng có thể tiến hành. Trong trường hợp này, chúng ta biết công việc chúng ta đang làm  gần như là giống nhau bất kể ngoại lệ nào, chúng ta có thể đơn giản code bằng wrapping API mà chúng ta gọi và đảm bảo rằng nó sẽ trả về một ngoại lệ chung.

```java
LocalPort port = new LocalPort(12);
try {
   port.open();
} catch (PortDeviceFailure e) {
   reportError(e);
   logger.log(e.getMessage(), e);
} finally {
   …
}
```

Class LocalPort chỉ là một wrapper đơn giản, catch và translates ngoại lệ thown bởi class ACMEPort:

```java
public class LocalPort {
   private ACMEPort innerPort;

   public LocalPort(int portNumber) {
      innerPort = new ACMEPort(portNumber);
   }

   public void open() {
      try {
         innerPort.open();
      } catch (DeviceResponseException e) {
         throw new PortDeviceFailure(e);
      } catch (ATM1212UnlockedException e) {
         throw new PortDeviceFailure(e);
      } catch (GMXError e) {
         throw new PortDeviceFailure(e);
      }
   }
   …
}
```

Wrapper giống như những gì chúng ta định nghĩa cho ACMEPort có thể rất dễ sử dụng. Thực tế, wrapping từ một bên API thứ ba là một thực hành tốt nhất. Khi bạn làm điều đó, bạn sẽ giảm thiểu sự phụ thuộc, hoặc di chuyển nó đến một thư viện khác trong tương lai mà ko có nhiều vấn đề. Nó cũng rất dễ dàng để gọi mock (thử nghiệm) khi kiểm thử Code.

Thông thường một class ngoại lệ duy nhất là tốt cho một khu vực cụ thể của code. Giúp các thông tin được gửi với mã ngoại lệ có thể phân biệt được các lỗi. Sử dụng các class khác nhau chỉ khi có lúc bạn muốn bắt một ngoại lệ và cho phép những cái khác đi qua.

# 5. Define the Normal Flow
Những điều ở trên giúp bạn tách biệt Business logic và xử lý lỗi. Phần lớn code của bạn sẽ trông giống như không được sạch sẽ. Tuy nhiên quá trình thực hiện điều này thúc đẩy việc phát hiện lỗi trên các khía cạnh của chương trình bạn. Bạn wrap bên ngoài API nên bạn có thể throw ngoại lệ của chính bạn, định nghĩa một hàm xử lý trên code, vậy nên bạn có thể đối phó với bất kỳ tính toán bị phá bỏ nào. Hầu hết thời gian đó là một cách tiếp cận tuyệt vời, nhưng thỉnh thoảng bạn có thể không muốn phá bỏ.

Dưới đây là một mã vụng về tính tổng chi phí trong một ứng dụng thanh toán.

```java
try {
   MealExpenses expenses = expenseReportDAO.getMeals(employee.getID());
   m_total += expenses.getTotal();
} catch(MealExpensesNotFound e) {
   m_total += getMealPerDiem();
}
```

Logic ở đây có tình trạng lộn xộn. Nếu chúng ta không có ngoại lệ Code của chúng ta sẽ đơn giản hơn nhiều.

```java
MealExpenses expenses = expenseReportDAO.getMeals(employee.getID());
m_total += expenses.getTotal();

public class PerDiemMealExpenses implements MealExpenses {
   public int getTotal() {
      // return the per diem default
   }
}
```

Đây là một trường hợp mẫu đặc biệt. Bạn tạo một lớp hoặc cấu hình một đối tượng để xử lý trường hợp đặc biệt cho bạn. Khi bạn làm, Client code sẽ không phải đối phó với những hành vi đặc biệt. Hành vi đó được đóng gói trong một đối tượng với trường hợp đặc biệt.
# 6. Don't Return Null
Kiểm tra null 

```java
public void registerItem(Item item) {
   if (item != null) {
      ItemRegistry registry = peristentStore.getItemRegistry();
      if (registry != null) {
         Item existing = registry.getItem(item.getID());
         if (existing.getBillingPeriod().hasRetailOwner()) {
            existing.register(item);
         }
      }
   }
}
```

Nếu bạn làm việc trong một cơ sở code với code giống như vậy, nó có thể không đánh giá hết tất cả những gì xấu là dành cho bạn, nhưng nó tệ! Khi chúng ta trả về null, chúng ta tự tạo công việc cho bản thân và thêm vấn đề cho người gọi nó. Tất cả vấn đề chính là thiếu mất một kiểm tra null để rồi gửi ứng dụng ra khỏi tầm kiểm soát.

Thực tế là kiểm tra null ở `if` lồng thứ hai có được kiểm tra chưa? Điều gì xảy ra trong thời gian chạy nếu `persistentStore` là `null`? Chúng ta sẽ có một `NullPointerException` trong thời gian chạy, và một ai đó đang bắt `NullPointerException` ở cấp cao nhất hoặc không. Và điều nào cũng tồi tệ.

Giải quyết vấn đề chúng ta lại sử dụng một API bên thứ ba, nó cân nhắc bao gói phương thức cùng với phương thức hoặc ném các ngoại lệ hoặc trả về các đối tượng đặc biệt.

Trong nhiều trường hợp, vấn đề các đối tượng đặc biệt có biện pháp khắc phục dễ dàng. Ví dụ bạn có đoạn code sau:

```java
List<Employee> employees = getEmployees();
if (employees != null) {
   for(Employee e : employees) {
      totalPay += e.getPay();
   }
}
```

Bây giờ getEmployees có thể trả về null, nhưng nó có cần thiết phải làm như vậy? Nếu chúng ta thay đổi getEmployees rằng nó trả về một danh sách rỗng, chúng ta có thể dọn dẹp code như sau:

```java
List<Employee> employees = getEmployees();
for(Employee e : employees) {
   totalPay += e.getPay();
}

public List<Employee> getEmployees() {
   if( .. there are no employees .. )
      return Collections.emptyList(); 
// Trả về một danh sách xác định trước không thay đổi trong Java
}
```

Nếu code như vậy sẽ giảm thiểu nguy cơ NullPointerExceptions và code sẽ sạch hơn.

# 7. Don't Pass Null
Trả về null từ phương thức đã xấu, nhưng vượt qua null còn tồi tệ hơn. Trừ khi bạn đang làm việc với một API hy vọng vượt qua null, bạn nên tránh passing null trong code bất cứ khi nào có thể,

```java
public class MetricsCalculator
{
   public double xProjection(Point p1, Point p2) {
      return (p2.x – p1.x) * 1.5;
   }
   …
}
```

Điều gì xảy ra nếu đi qua một tham số gán null? `calculator.xProjection(null, new Point(12, 13));`

Chúng ta sẽ có một NullPointerException. Sửa chữa lại:

```java
public class MetricsCalculator
{
   public double xProjection(Point p1, Point p2) {
      if (p1 == null || p2 == null) {
         throw InvalidArgumentException(
            "Invalid argument for MetricsCalculator.xProjection");
      }
      return (p2.x – p1.x) * 1.5;
   }
}
```

Có một thay thế khác tốt hơn:

```java
public class MetricsCalculator
{
   public double xProjection(Point p1, Point p2) {
      assert p1 != null : "p1 should not be null";
      assert p2 != null : "p2 should not be null";
      return (p2.x – p1.x) * 1.5;
   }
}
```

Trong hầu hết các ngôn ngữ lập trình không có cách nào đối phó với việc thông qua một Null với một lời gọi  vô tình. Bởi vì đây là trường hợp tiếp cận với cấm truyền Null theo mặc định. Khi bạn làm bạn có thể code với sự hiểu biết rằng một Null xuất hiện trong danh sách tham số là dấu hiệu của vấn đề và kết thúc nó với ít lỗi bất cẩn nhất,
# 8. Conclusion
Code sạch là code có thể đọc được, nhưng nó cũng cần phải mạnh mẽ. Đây không phải là điều mâu thuẫn. Chúng ta có thể viết code sạch và mạnh mẽ nếu chúng ta thấy được xử lý lỗi là một mối quan tâm riêng, đôi khi có thể xem nó như không phụ thuộc với logic cơ bản của chúng ta. Để đến mức độ chúng ta làm được điều đó, chúng ta cần lý giải về nó một cách độc lập, và chúng ta có thể tiến tới bước tiến lớn trong việc bảo trì code của chúng ta.