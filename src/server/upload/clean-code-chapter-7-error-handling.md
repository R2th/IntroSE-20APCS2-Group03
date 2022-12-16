Trong chương này, một số tips có thể giúp bạn xử lý các error tốt hơn, làm code đẹp hơn :D
# 1. Use Exceptions Rather Than Return Codes (Sử dụng Exceptions hơn là trả về giá trị trong code)

Trở lại quá khứ xa xôi có nhiều ngôn ngữ không có ngoại lệ. Trong những ngôn ngữ các kỹ thuật xử lý và báo cáo lỗi bị hạn chế. Bạn có thể đặt lỗi cờ hoặc trả lại mã lỗi mà người gọi có thể kiểm tra
Vấn đề với các phương pháp này là chúng gây lộn xộn, khó xử lý cho người đọc. Người gọi hàm phải check lỗi ngay lập tức sau khi gọi nó. Không may, nó quá dễ để quên. Cách tốt hơn là bạn bắn ra một ngoại lệ khi bạn gặp một lỗi. Mã sẽ sạch đẹp hơn và code logic không bị che khuất đi bởi việc xử lý lỗi

Ví dụ như:
```java
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
Nên tách thành code như sau:
```Java
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
Ta xét trong Laravel, chẳng hạn repository bạn xử lý hàm update một model:
```php
public function updateBook($id, $attribute)
{
    $boook = Book::find($id);
    if (!empty($book)) {
        $book->update($attribute);
        return true;
    } else {
        return false;
    }
}
```
Đoạn code trên trả về true, false đồng nghĩa việc sinh thêm việc cho phần code nào gọi nó lại phải check `true`, `false`, đặc biệt là khi trả về false lớp gọi hàm này lại phải xem vì sao `false`? Thay vào đó hãy để hàm đó tự xử để lớp gọi nó đỡ phải kiểm tra
```php
public function updateBook($id, $attribute)
{
    $boook = Book::find($id);
    if (!empty($book)) {
        $book->update($attribute);
    } else {
        throw new Exception('404');
    }
}
```
Như vậy hàm đó đã tự xử lý lỗi mà không đẩy trách nhiệm cho ai gọi nó nữa. Nếu không tìm thấy nó sẽ bắn ra exception 404

# 2. Write Your Try-Catch-Finally Statement First

Một trong những thứ quan trọng về ngoại lệ là chúng được "define a scope" (định nghĩa các phạm vi) với chương trình của bạn. Khi bạn thực thi code trong khối try, trong khối `try-cactch-finally`. Bạn đang nói rõ hơn là đoạn code thực thi này có thể bị gián đoạn ở một vài chỗ, cái sẽ được xử lý trong catch

Trong cách này, khối try giống như một transactions (phiên giao dịch). Catch của bạn sẽ không được thực thi nếu không có vấn đề gì với try. Với lý do này, thật là một good practice để bắt đầu một khối `try-catch-finally` khi bạn viết code có thể xảy ra ngoại lệ. có thể khiển người dùng định nghĩa được cái mong muốn, không vấn đề gì phát sinh nếu như sai đoạn code trong `try`

```php
public static function createModel($request)
{
    try {
        $book = Book::forge();
        $book->title = $request['title'];
        $book->author = $request['author'];
        $book->price = $request['price'];
        $book->cover_img = $request['cover_img'];
        $book->save();
    } catch (Exception $ex) {
        throw new Exception($ex->getCode());
    }
}
```

# 3. Provide Context with Exceptions (Cung cấp "ngữ cảnh" với các ngoại lệ)
Mỗi ngoại lệ mà bạn "ném ra" phải cung cấp đủ ngữ cảnh để xác định nguồn và vị trí của một lỗi.
tạo ra các thông báo lỗi và truyền nó cùng với ngoại lệ của bạn. Đề cập đến hoạt động đó, lỗi gì và vì sau lại lỗi. Ví dụ nếu bạn đăng nhập vào ứng dụng của mình, truyền đủ thông tin nhất có thể để bạn có thể log lại các lỗi mỗi khi bạn bắt được
Ý tưởng chung là hãy ghi lỗi ra log một cách chi tiết nhất có thể để dễ dàng debug

```php
public function store(CategoryRequest $request)
{
    $this->authorize('create', Category::class);
    try {
        $data = $request->only('name');
        $this->cateRepository->create($data);
        
        return redirect()->route('categories.index')
            ->with('message', trans('admin.category.success_add'));
    } catch (Exception $ex) {
        Log::useDailyFiles(config('app.file_log'));
        Log::error($ex->getMessage());
        
        return redirect()->route('categories.index')
            ->with('error', trans('admin.category.error'));
    }
}
```

# 4. Define Exception Classes in Terms of a Caller’s Needs: Định nghĩa các lớp Exception cần thiết

Phần này để cập đến việc xử lý lỗi đến từ bên thứ 3 (Có thể là API hoặc các dịch vụ bên thứ 3). Có rất nhiều cách để phân loại lỗi. Bạn có thể phân loại lỗi theo nguồn gốc của chúng: chúng đến từ thành phần nào, loại lỗi gì, thiết bị hay mạng hay lỗi do lập trình. Tuy nhiên, khi chúng ta nên định nghĩa các lớp ngoại lệ trong một ứng dụng, mối quan tâm quan trọng nhất của chúng ta nên là chúng bị bắt như thế nào.
Xem xét về một ví dụ về try catch cơ bản, có gọi thư viện bên thứ 3:

```Java
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
...
}
```
Chúng ta có thể thấy đoạn code chỉ thực hiện mở 1 port từ bên thứ 3 mà xử lý nhiều ngoại lệ quá :D. Có quá nhiều đoạn mã xử lý lỗi giống nhau được lặp lại và bạn không thể theo dõi. Trong hầu hết các trường hợp xử lý ngoại lệ, công việc chúng tôi làm là tương đối chuẩn bất kể nguyên nhân thực sự. Chúng tôi phải ghi lại lỗi và đảm bảo rằng chúng tôi có thể xử lý.
Để giải quyết nó, ta sẽ tạo một lớp mới chuyên dụng xử lý riêng cho bên thứ 3. Đoạn code viết lại như sau:
```php
LocalPort port = new LocalPort(12);
try {
    port.open();
} catch (PortDeviceFailure e) {
    reportError(e);
    logger.log(e.getMessage(), e);
} finally {
...
}
```
Với lớp LocalPort là lớp chuyên dụng xử lý các ngoại lệ có thể xảy ra khi mở port ACMEPort
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
    ...
}
```

# 5. Define the Normal Flow: Định nghĩa một luồng bình thường (khi ngoại lệ lẫn lộn với code logic)

Nếu như bạn theo dõi các lời khuyên từ phần trước, bạn sẽ kết thúc với ý niệm tách biệt code logic nghiệp vụ và code xử lý lỗi. Phần lớn code của bạn sẽ bắt đầu trông giống như một thuật toán chưa được sắp xếp. Tuy nhiên, quá trình thực hiện điều này đẩy phát hiện lỗi đến các cạnh của chương trình của bạn (kiểu đẩy các phần xử lý error xuống dưới). Bạn bọc các "external API" để ném vào các error và định nghĩa các xử lý nó. 

Nhưng đôi khi bạn không muốn bỏ qua hẳn nó mà vẫn muốn xử lý thêm thì sao? Xem xét ví dụ sau:
```java
try {
    MealExpenses expenses = expenseReportDAO.getMeals(employee.getID());
    m_total += expenses.getTotal();
} catch(MealExpensesNotFound e) {
    m_total += getMealPerDiem();
}
```

Trong ví dụ này, nếu bữa ăn được mở rộng, nó trở thành một phần của tổng số. Exception lại hỗn độn với code logic. Nó sẽ tốt hơn nếu bạn không có giao dịch nào với trường hợp đặc biệt ở đây, code của bạn có thể trông đơn giản hơn, như thế này

```java
MealExpenses expenses = expenseReportDAO.getMeals(employee.getID());
m_total += expenses.getTotal();
```
Chúng ta có thể làm code trở nên đơn giản như vậy? Chúng ta có thể thay đổi ExpenseReportDAO để nó luôn trả về một đối tượng MealExpense. Nếu không có bữa ăn chi phí, nó trả về một đối tượng MealExpense trả về cho mỗi diem như tổng số của nó:

```java
public class PerDiemMealExpenses implements MealExpenses {
    public int getTotal() {
        // return the per diem default
    }
}
```
Cái này gọi là **SPECIAL CASE PATTERN** [Fowler]. Bạn tạo 1 lớp hoặc config 1 object để nó xử lý các trường hợp đặc biệt cho bạn. Khi bạn làm vậy, client code không có giao dịch nào với hành động ngọai lệ. Hành động đó được đóng gói trong lớp đặc biệt

# 6. Đừng trả về null
Xem xét ví dụ sau:
```Java
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

Khi chúng ta trả về null, chúng ta chủ yếu tạo ra công việc cho chính chúng ta và đẩy vấn đề khi người gọi. Tất cả phải mất là một mất kiểm tra null để gửi một ứng dụng quay ra khỏi tầm kiểm soát.
Bạn có để ý là trên thực tế khi có một check null, bạn lại phải tạo 1 block lồng bên trong 1 khối if? Điều gì sẽ xảy ra nếu persistentStore là null? Nó sẽ sinh ra một NullPointerException trong khi chạy và ai đó có thể bắt trên cùng hoặc là không? Đúng là tồi tệ

Thật dễ dàng để nói rằng vấn đề với đoạn code ở trên là thiếu check null nhưng trong thực tế vấn đề này có rất nhiều. Hãy xem xét ném ra một ngoại lên hoặc trả về một SPECIAL CASE object thay thế. Nếu bạn nhận một giá trị null trả về từ API của bên thứ 3, cân nhắc đóng nó vào với một phương thức, cái mà thay vì trả về một ngoại lệ nó sẽ trả về một **SPECIAL CASE OBJECT**.

Xem xét đoạn code sau:

```java
List<Employee> employees = getEmployees();
if (employees != null) {
    for(Employee e : employees) {
        totalPay += e.getPay();
    }
}
```
Nêu được sửa thành:
```java
List<Employee> employees = getEmployees();
for(Employee e : employees) {
    totalPay += e.getPay();
}
```
và (trả về danh sách trống hơn là null)
```java
public List<Employee> getEmployees() {
    if( .. there are no employees .. )
        return Collections.emptyList();
}
```
Nếu bạn code theo cách này, bạn sẽ giảm thiểu cơ hội cho **NullPointerExceptions** và code của bạn sẽ rõ ràng hơn

# 7. Đừng truyền vào null
Phương thức trả về null là tồi nhưng truyền null vào 1 phương thức còn tệ hại hơn. Trừ khi bạn đang làm việc với API, cái mà yêu cầu bạn truyền null, bằng không bạn nên tránh truyền null vào code của bạn
Xem xét ví dụ dưới đây để hiểu vì sao? Phương thức tính toán số liệu cho 2 điểm:

```java
public class MetricsCalculator
{
    public double xProjection(Point p1, Point p2) {
        return (p2.x – p1.x) * 1.5;
    }
    ...
}
```
Chuyện gì sẽ xảy ta nếu truyền null vào như 1 đối số

``` calculator.xProjection(null, new Point(12, 13)); ```

Chúng ta nhận được một NullPointerException tất nhiên. Làm sao đến fix nó
```java
public class MetricsCalculator
{
    public double xProjection(Point p1, Point p2) {
        if (p1 == null || p2 == null) {
            throw InvalidArgumentException("Invalid argument for MetricsCalculator.xProjection");
        }
        return (p2.x – p1.x) * 1.5;
    }
}
```
Liệu nó có ngon hơn không? nó có thể tốt hơn một chút là nhận về exception null nhưng hãy nhớ rằng chúng ta lại phải sinh ra một thứ xử lý cho InvalidArgumentException? Hàm xử lý đó nên làm gì? Nó có bất kì hành động nào tốt không?

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
Đó là một tài liệu tốt nhưng vẫn chưa giải quyết được vấn đề. Nếu có ai dó truyền vào null, chúng ta vẫn bị lỗi runtime error
Trong hầu hết các ngôn ngữ lập trình, chưa có cách tốt nhất để deal với null, cái mà có thể gây ra một "tai nạn" cho người gọi :v. Bởi vì trong trường hợp này, cách tiếp cận tốt nhất là cấm truyền null như là mặc định :v. Khi bạn làm, bạn có thể viết mã với kiến thức rằng một null trong một
danh sách đối số là dấu hiệu của sự cố và kết thúc với ít sai sót bất cẩn hơn rất nhiều
# Tóm lại
* Sử dụng các exception thay vì trả về giá trị để các lớp gọi nó đỡ phải xử lý tiếp.
* Viết các đoạn code thành **Try-Catch-Finally** để dễ quan sát các xử lý code và ngoại lệ.
* Cung cấp đầy đủ thông tin ngoại lệ nhất (có thể ghi log) để dễ dàng debug :D.
* Nếu exception có code logic hoặc các exception gây ra bởi bên thứ 3, cân nhắc "wrapping"- đóng gọi lại trong một lớp ngoại lệ mới ta xây dựng.
* Chưa có cách hoàn hảo nhất để xử lý với null, hạn chế truyền và nhận nó vào các hàm.

Hi vọng một vài tips trên giúp bạn xử lý lỗi tốt hơn trong code của mình <3
# Tài liệu tham khảo
Chapter 7: [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)