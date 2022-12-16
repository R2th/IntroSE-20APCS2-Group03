std::condition_variable  là một loại sự kiện được sử dụng để báo hiệu giữa hai hoặc nhiều luồng. Một hoặc nhiều luồng có thể đợi trên đó để nhận tín hiệu, trong khi một luồng khác có thể báo hiệu điều này.

Tệp tiêu đề bắt buộc cho Biến điều kiện trong C ++ 11 là `#include <condition_variable>` Một mutex là bắt buộc cùng với biến điều kiện.

**Cách mọi thứ thực sự hoạt động với biến điều kiện,**

* Luồng 1 gọi biến chờ với điều kiện, biến này thu nhận nội bộ mutex và kiểm tra xem điều kiện bắt buộc có được đáp ứng hay không.
* Nếu không, nó sẽ nhả khóa và đợi Biến điều kiện nhận tín hiệu (luồng bị chặn). Hàm wait () của Biến điều kiện cung cấp cả hai hoạt động này theo cách nguyên tử.
* Một luồng khác, tức là như luồng thứ 2 báo hiệu Biến điều kiện khi điều kiện được đáp ứng.
* Khi biến điều kiện nhận được tín hiệu thì luồng 1 đang chờ nó tiếp tục. Sau đó, nó có được khóa mutex một lần nữa và kiểm tra xem điều kiện liên quan đến Biến điều kiện có thực sự được đáp ứng hay không hoặc nếu cấp trên gọi. Nếu có nhiều hơn một luồng đang chờ thì hàm notify_one() sẽ chỉ bỏ chặn một luồng.
* Nếu đó là cuộc gọi của cấp trên thì nó lại gọi hàm wait ().

**Các hàm thành viên chính của std :: condition_variable là,**

**Wait()**

Nó làm cho luồng hiện tại bị chặn cho đến khi biến điều kiện được báo hiệu hoặc một sự đánh thức giả xảy ra.

Nó giải phóng mutex được đính kèm, chặn luồng hiện tại và thêm nó vào danh sách các luồng đang chờ trên đối tượng biến điều kiện hiện tại. Luồng sẽ được bỏ chặn khi một số cuộc gọi luồng notify_one () hoặc notify_all() trên cùng một đối tượng biến điều kiện. Nó cũng có thể được bỏ chặn một cách ngẫu nhiên, do đó, sau mỗi lần mở khóa, nó cần phải kiểm tra lại tình trạng.

Một lệnh gọi lại được truyền dưới dạng tham số cho hàm này, hàm này sẽ được gọi để kiểm tra xem nó có phải là lệnh gọi giả hay điều kiện thực sự được đáp ứng hay không.

Khi luồng được mở khóa,

Hàm wait() yêu cầu lại khóa mutex và kiểm tra xem điều kiện thực sự có được đáp ứng hay không. Nếu điều kiện không được đáp ứng thì một lần nữa nó giải phóng mutex được đính kèm, chặn luồng hiện tại và thêm nó vào danh sách các luồng đang chờ trên đối tượng biến điều kiện hiện tại.

**notify_one()**

Nếu có bất kỳ luồng nào đang chờ trên cùng một đối tượng biến có điều kiện thì notify_one() bỏ chặn một trong các luồng đang chờ.

**notify_all()**

Nếu có bất kỳ luồng nào đang chờ trên cùng một đối tượng biến có điều kiện thì notify_all() bỏ chặn tất cả các luồng đang chờ.

Hãy xem cách chúng ta có thể xử lý kịch bản đa luồng với biến điều kiện, tức là

Giả sử chúng ta đang xây dựng một ứng dụng dựa trên mạng. Ứng dụng này thực hiện các tác vụ sau,

1. Thực hiện một số thao tác với máy chủ
2. Tải dữ liệu từ các tệp XML.
3. Thực hiện xử lý dữ liệu được tải từ XML.

Như chúng ta có thể thấy rằng Nhiệm vụ 1 không phụ thuộc vào bất kỳ Nhiệm vụ nào khác nhưng Nhiệm vụ 3 phụ thuộc vào Nhiệm vụ 2. Vì vậy, có nghĩa là Nhiệm vụ 1 và Nhiệm vụ 2 có thể được chạy song song bởi các luồng khác nhau để cải thiện hiệu suất của ứng dụng. Vì vậy, hãy phân tích ứng dụng này thành một ứng dụng đa luồng,

Phản hồi của luồng 1 là,

Thực hiện một số thao tác bắt tay với máy chủ.
Chờ dữ liệu được tải từ XML bởi Luồng 2
Thực hiện xử lý dữ liệu được tải từ XML.

Phản hồi của luồng 2 là,

Tải dữ liệu từ XML
Thông báo cho một Chủ đề khác, tức là đang đợi tin nhắn.
Mã để đạt được điều này với biến điều kiện như sau,

```
#include <iostream>
#include <thread>
#include <functional>
#include <mutex>
#include <condition_variable>
using namespace std::placeholders;
class Application
{
  std::mutex m_mutex;
  std::condition_variable m_condVar;
  bool m_bDataLoaded;
public:
  Application()
  {
    m_bDataLoaded = false;
  }
  void loadData()
  {
   // Make This Thread sleep for 1 Second
   std::this_thread::sleep_for(std::chrono::milliseconds(1000));
   std::cout<<"Loading Data from XML"<<std::endl;
   // Lock The Data structure
   std::lock_guard<std::mutex> guard(m_mutex);
   // Set the flag to true, means data is loaded
   m_bDataLoaded = true;
   // Notify the condition variable
   m_condVar.notify_one();
  }
  bool isDataLoaded()
  {
    return m_bDataLoaded;
  }
  void mainTask()
  {
    std::cout<<"Do Some Handshaking"<<std::endl;
    // Acquire the lock
    std::unique_lock<std::mutex> mlock(m_mutex);
    // Start waiting for the Condition Variable to get signaled
    // Wait() will internally release the lock and make the thread to block
    // As soon as condition variable get signaled, resume the thread and
    // again acquire the lock. Then check if condition is met or not
    // If condition is met then continue else again go in wait.
    m_condVar.wait(mlock, std::bind(&Application::isDataLoaded, this));
    std::cout<<"Do Processing On loaded Data"<<std::endl;
  }
};
int main()
{
   Application app;
   std::thread thread_1(&Application::mainTask, &app);
   std::thread thread_2(&Application::loadData, &app);
   thread_2.join();
   thread_1.join();
   return 0;
}
```
nguồn : https://thispointer.com/c11-multithreading-part-7-condition-variables-explained/