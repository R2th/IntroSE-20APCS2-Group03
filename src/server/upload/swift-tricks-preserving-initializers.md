**Làm thế nào để tạo custom initializer và vẫn giữ được default initializer của structure?**

Trong bài viết này, chúng ta cùng sẽ dùng 1 struct **Person** để làm ví dụ. Struct này có 2 constant property là *first* và *last*.

<img align="left" width="100" height="100" src="https://images.viblo.asia/8deba30a-0906-46ce-aea0-a242d371c706.png">

Swift sẽ tự động tạo cho chúng ta một *default initializer*, **init(first:last:)**, và tất nhiên chúng ta có thể sử dụng initializer này để tạo 1 instance của struct **Person**:

<img align="left" width="100" height="100" src="https://images.viblo.asia/b0d01f79-852f-49e7-9ee2-b6c9cda60e51.png">

Nhưng trong thực tế sẽ có lúc initializer được tạo tự động này không đủ để đáp ứng nhu cầu. Trong trường hợp đó chúng ta có thể tạo 1 *custom initializer*:

<img align="left" width="100" height="100" src="https://images.viblo.asia/1257e0cd-0364-4949-8865-64f0d29192d5.png">

Tuy nhiên, nếu chúng ta tạo 1 *custom initializer*, thì *default initializer* sẽ không còn dùng được nữa:

<img align="left" width="100" height="100" src="https://images.viblo.asia/c71f04e6-6c84-48d4-9e5a-d1a033bd995e.png">

Giả sử trong một số hoàn cảnh nhất định, việc sử dụng *default initializer* sẽ tiện hơn cho việc tạo ra 1 instance của struct **Person**, sẽ thật tốt nếu chúng ta có thể sử dụng cả 2 initializer trên cho struct **Person** đúng không.

Rất may, Swift cung cấp cho chúng ta một cách để đạt được điều này. Chúng ta chỉ cần tạo 1 *extension* cho struct **Person**, và đặt *custom initializer* của chúng ta vào đó.

<img align="left" width="100" height="100" src="https://images.viblo.asia/56fb5b06-35ce-43a4-a114-a20f8a935c3c.png">


Lúc này cả 2 initializer đều có thể được sử dụng để tạo instance của struct **Person** rồi.

<img align="left" width="100" height="100" src="https://images.viblo.asia/5c4db8ff-0996-4b36-9fc6-38e61d26a9fd.png">


Hi vọng bài viết của mình đã giúp các bạn có thêm 1 công cụ hữu ích khi code Swift.