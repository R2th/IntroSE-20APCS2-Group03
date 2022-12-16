## Bắt đầu
Hàng đợi là một danh sách mà bạn chỉ có thể thêm các phần tử mới vào cuối danh sách và xóa các phần tử từ đầu danh sách. Điều này đảm bảo rằng phần tử đầu tiên của bạn là phần tử được thêm vào đầu tiên, cũng là phần tử được lấy ra đầu tiên. Đến trước thì phục vụ trước!

Tại sao bạn cần điều này? Trong nhiều thuật toán, bạn muốn thêm các phần tử tới một danh sách tạm thời và sau đó lấy chúng ra khỏi danh sách này vào một thời gian sau. Thông thường, thứ tự bạn thêm và xóa các phần tử này sẽ gặp vấn đề.

Một hàng đợi cung cấp cho bạn một cơ chế FIFO: first-in, first-out. Phần tử bạn thêm vào đầu tiên cũng là phần tử bạn lấy ra đầu tiên. 

**Ví dụ**

Cách đơn giản nhất để hiểu hàng đợi được sử dụng như thế nào, hãy tưởng tượng bạn có 1 hàng đợi, bạn enqueue một số như sau:
![](https://images.viblo.asia/ae8f4843-87cc-4fc2-957e-1d5b8c356f43.jpg)

Hàng đợi bây giờ sẽ là [10]. Sau đó, bạn có thể thêm số tiếp theo vào hàng đợi:

![](https://images.viblo.asia/4d682871-1393-4a06-b631-8809ad525188.jpg)

Hàng đợi bây giờ sẽ là [10, 3]. Bạn có thể thêm một số nữa:

![](https://images.viblo.asia/7e6dfee4-eb3a-40f8-adbf-e33d7010e28a.jpg)

Hàng đợi bây giờ sẽ là [10, 3, 57]. Bạn có thể dequeue để lấy phần tử đầu tiên ra khỏi hàng đợi:

![](https://images.viblo.asia/c2ad260f-650d-407d-9883-7a3cf3fc6747.jpg)

Sẽ trả về 10 vì đó là số đầu tiên bạn thêm vào. Hàng đợi bây giờ sẽ là [3, 57].

![](https://images.viblo.asia/c2ad260f-650d-407d-9883-7a3cf3fc6747.jpg)

Sẽ trả về 3, bạn dequeue tiếp sẽ trả về 57, ... Nếu hàng đợi rỗng, dequeue sẽ trả về nil

## Triển khai Hàng đợi
Trong phần này, bạn sẽ triển khai một hàng đợi đơn giản mục đích là lưu các giá trị Int

Dowload project start: [queue starter project](https://koenig-media.raywenderlich.com/uploads/2016/11/SwiftQueue.Starter.playground.zip)File playground sẽ chứa một hàng đợi rỗng:

![](https://images.viblo.asia/61c894ee-277a-4be6-8bd5-a1497230ea02.jpg)

File playground cũng chứa code của một LinkedList (bạn có thể thấy bằng cách vào **View\Project Navigators\Show Project Navigator** và mở **Sources\LinkedList.**)

## Enqueue
Một hàng đợi cần có một phương thức enqueue. Bạn sẽ sử dụng LinkedList đã bao gồm trong project start để triển khai hàng đợi của bạn. Thêm vào đoạn code sau:

![](https://images.viblo.asia/fbfba5d4-fcaf-4e62-a319-7a1060703178.jpg)

1. Thêm một biến private LinkedList sẽ được sử dụng để lưu trữ các phần tử trong hàng đợi của bạn
2. Thêm một phương thức để enqueue phần tử. Phương thức này sẽ làm biến đổi LinkedList, do đó, bạn xác định rõ ràng rằng bằng cách thêm từ khóa mutaing vào đầu phương thức.

## Dequeue
Một hàng đợi cũng cần một phương thức dequeue:

![](https://images.viblo.asia/2cd8b22b-5d8e-4af1-9606-bdd88038cc36.jpg)

1. Thêm 1 phương thức dequeue trả về phần tử đầu tiên của hàng đợi, trả về nil nếu hàng đợi đang rỗng. Phương thức này sẽ biến đổi LinkedList nên bạn cần thêm từ khóa mutating ở đầu phương thức.
2. Sử dụng câu lệnh guard để xử lý hàng đợi đang rỗng. Nếu hàng đợi rỗng, guard sẽ thực hiện khối lệnh else

## Peek
Một hàng đợi cũng cần một phương thức peek, phương thức này trả về phần tử đầu tiên của hàng đợi mà không cần xóa nó:

![](https://images.viblo.asia/83502d02-cbc8-4e1f-9ac7-667a731e1718.jpg)

## IsEmpty
Hàng đợi có thể rỗng:

![](https://images.viblo.asia/4351d27a-ebcb-44c4-aae9-9ad870cfb8cd.jpg)

## In hàng đợi của bạn
Thêm đoạn code sau vào file playground của bạn:

![](https://images.viblo.asia/2752c7b8-45c8-46bd-97b5-ca9af43d91a5.jpg)

In hàng đợi lên console:

![](https://images.viblo.asia/405ffcb5-72bc-4845-b5ac-d3e809700696.jpg)

Để hiển thị chuỗi đầu ra dễ đọc hơn, bạn có thể làm cho queue chấp nhận giao thức CustomStringConvertable như sau: 

![](https://images.viblo.asia/6c0dd144-e51b-4e07-a909-5ed6c18e8a9e.jpg)

1. Khai báo một extension cho class Queue, và adopted protocol CustomStringConvertible
2. Định nghĩa thuộc tính description. Đây là thuộc tính computed, thuộc tính chỉ đọc và trả về 1 String

Bây giờ, khi bạn in hàng đợi ra, bạn sẽ nhận được một danh sách như thế này: 

![](https://images.viblo.asia/514bf16b-adbf-40aa-b5a2-082d5af65e05.jpg)