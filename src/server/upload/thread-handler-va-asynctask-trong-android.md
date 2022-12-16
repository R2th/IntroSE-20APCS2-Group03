Trong bài viết này mình sẽ trình bày về Thread, Handler và AsyncTask trong Android. Mong là bài viết này sẽ giúp được các bạn, đặc biệt là những người mới học Android có một cái hiểu tổng quan về ba đối tượng này cùng với mối liên quan giữa chúng.
# 1.Thread.
Phần này chúng ta tìm hiểu về *mối quan hệ giữa Process và Thread*, *Thread*, *Mutiple Thread*, rồi *Main Thread*, *UI Thread*, *Worker Thread* và tình huống *ANR* trong Android.
## 1.1 Process và Thread.
Khi một ứng dụng Android được khởi chạy, thì hệ thống Android sẽ start một New Linux Process cho ứng dụng đó cùng với một Thread duy nhất để thực thi. Vậy là có cả Process và Thread đều được sinh ra phải không nào. Ta đã nghe về Process nhưng lại thường không nhớ nó là gì, có nhiệm vụ gì, và với Thread thì giữa chúng có mối quan hệ gì, chúng giống và khác nhau như thế nào. Chúng ta hay xem nhé! 
* Mỗi Process cung cấp tài nguyên cần thiết để thực thi chương trình. Mỗi Process có một không gian địa chỉ ảo, có các mã thực thi, có các lệnh xử lý các đối tượng hệ thống, một ngữ cảnh bảo mật, kích thước làm việc tối thiểu và tối đa, ... và phải có ít nhất một Thread thực thi.
* Một Thread là một thực thể trong một Process, là đối tượng được lên kế hoạc để thực thi. Trong Process thường sẽ có nhiều Thread và tất cả các Thread này sẽ chia sẽ không gian địa chỉ ảo và tài nguyên hệ thống trong Process. Ngoài ra mỗi Thread lại có công việc riêng của nó đó là: duy trì xử lý ngoại lệ, ưu tiên lập lịch trình, lưu dữ cục bộ luồng,... Môi trường Thread có thể bao gồm: phần đăng kí Thread với máy chủ, nhân stack, ... quan trọng là có một môi trường (Thread cũng có ngữ cảnh riêng của nó). ![](https://images.viblo.asia/5ea15a11-b2e7-456c-a42a-641bdeb08538.png)
* Kể ra thì sẽ thấy chúng rất trừu tượng, và khó hiểu. Tóm lại bạn chỉ cần nhớ một công thức này cho mình ***Process = Program + State of all Threads executing in Program*** .Hay là Process bao gồm chương trình cùng với tất cả trạng thái thực thi của các Thread trong chương trình đó.
## 1.2 Thread và Multiple Thread.
Vậy **Thread** là gì? Thread được định nghĩa là một luồng dùng để thực thi một chương trình. Java Virtual Machine cho phép một chương trình có thể có nhiều Thread thực thi đồng thời. Mỗi Thread đều có độ ưu tiên của nó. Rồi mỗi Thread có thể được đánh dấu là *daemon* . Daemon Thread là một loại Thread có độ ưu tiên thấp, cung cấp dịch vụ cho người dùng, là Thread duy trì hoạt động cho đến khi tất cả các Threads khác hoàn thành công việc hay chết đi thì nó cũng mới chết theo. Ví dụ cụ thể là trình dọn rác trong Java là một Daemon Thread.
Để tạo mới Thread ta có hai cách. Cách thứ nhất là kế thừa (extends) từ class Thread:
```java
        private class MyThread extends Thread{
                @Override
                public void run() {
                    //TODO
                }
         }
        ...
        new MyThread().start();
```
Cách thứ 2 là thực thi (implements) interface Runnable:
```java
        private class MyRunnable implements Runnable{
                @Override
                public void run() {
                    //TODO
                }
        }
        ...
        new Thread(new MyRunnable()).start();
```
Trong Java chỉ có đơn kế thừa nên cách thứ hai sẽ linh động hơn. Tùy vào bài toán mà bạn có thể chọn cách sử dụng cho thích hợp nhé.
Multiple Thread dịch ra tiếng việt là đa luồng, hay nhiều Thread. Tức là trong một chương trình, có thể có đồng thời nhiều Thread được thực thi. Khi một chương trình nhiều công việc mà chỉ có một Thread thực thi thì sẽ không hiệu quả, như vậy nhiều Thread làm việc thì sẽ hiệu quả hơn, và chúng chạy đồng thời. Các Thread này chia sẽ cùng một không gian tài nguyên, số lượng Thread càng nhiều thì độ phức tạp sẽ càng tăng, nên phải sử dụng cho hợp lý không thì chương trình sẽ xung đột, quá trình thực thi sẽ sai, thậm chí có thể chết chương trình.
## 1.3 Main Thread và UI Thread, Worker Thread.
Trong Android, khi chương trình được khởi chạy, hệ thống sẽ start một Thread ban đầu cùng với một Process. Thì Thread đó chính là **Main Thread**. Vậy vì sao Main Thread lại thường được gọi là **UI Thread** thì có 2 lý do chính đáng sau đây.
1. Thread này có nhiệm vụ gửi các sự kiện đến widget, tức là đến các view ở giao diện điện thoại, thậm chí cả các sự kiện vẽ.
2. Ngoài ra Thread này cũng phải tương tác với bộ công cụ Android UI (Android UI toolkit) gồm hai gói thư viện là *android.widget* và *android.view*.

Có khi nào Main Thread lại không được gọi là UI Thread không? Đó là khi một chương trình có nhiều hơn một Thread phụ trách việc xử lý giao diện.

Còn một trường hợp nữa là **Worker Thread**, chính là Thread mà bạn tạo thêm cho chương trình để nó thực thi một công việc nào đó không liên quan đến giao diện, Thread này cũng được gọi là Background Thread.
## 1.4 Hiện tượng ANR trong Android.
Có khi nào bạn dùng điện thoại Android mà thấy xuất hiện Dialog tương tự như hình sau đây không?
![](https://images.viblo.asia/9bf9fde2-452e-4f7c-9a82-1caef8b66729.png)
* Khi có nhiều thứ thực thi trên UI Thread, và có một công việc gì đó cần phải thực hiện lâu như kết nối mạng hay truy vấn cơ sở dữ liệu, khi đó UI sẽ bị block. Người dùng cảm thấy như ứng dụng đang bị treo, nhưng thực ra nó đang thực thi công việc của mình trên UI Thread. Nếu UI bị block hơn vài giây (trung bình là 5 giây) thì hệ thống Android sẽ xuất hiện hộp thoại như trên, cho phép người dùng có thể đóng chương trình hoặc chờ đợi. Nếu như ứng dụng thường xuyên có những hiện tượng như vậy thì sẽ bất tiện cho người dùng. Chính vì vậy, để không xảy ra hiện tượng trên thì Android là đề ra 2 rules sau đây yêu cầu lập trình viên phải tuân theo:
1. Không được block UI Thread.
2. Không được kết nối tới bộ công cụ Android UI (Android UI toolkit) từ một Thread không phải là UI Thread.
* Giờ mình sẽ đưa ra một ví dụ các bạn xem code thế này có vấn đề gì không nhé?
```java
            public void onClick(View view) {
                new Thread(new Runnable() {
                    @Override
                    public void run() {
                        Bitmap b = loadImageFromNetwork("http://example.com/img.png");
                        mImageView.setImageBitmap(b);
                    }
                }).start();
            }
```
Ta thấy việc kết nối internet để load hình ảnh được thực hiện một Thread khác (Worker Thread hay Background Thread) nên sẽ không block UI, thỏa mãn rule thứ nhất. Nhưng ở trong Thread này nó đã trực tiếp tác động đến UI bằng câu lệnh *mImageView.setImageBitmap(b)* và không thỏa mãn rule thứ 2 nên code sẽ không chạy được. Từ Worker Thread ta không thể update UI. Từ đó Android đã cung cấp cho Worker Thread một số phương thức sau để làm điều đó.
```java
1. *Activity.runOnUiThread(Runnable)*
2. *View.post(Runnable)*
3. *View.postDelayed(Runnable, long)*
```
NaNundefinedSau đây ta xem ví dụ tiếp theo.
```java
            public void onClick(View view) {
                new Thread(new Runnable() {
                    @Override
                    public void run() {
                        final Bitmap b = loadImageFromNetwork("http://example.com/img.png");
                        mImageView.post(new Runnable() {
                            @Override
                            public void run() {
                                mImageView.setImageBitmap(b);
                            }
                        });
                    }
                }).start();
            }
```
Bây giờ thì code hoàn toàn có thể chạy được đúng không nào. Nhưng ba phương thức trên chỉ phù hợp với một số  bài toán. Nếu phương thức trên không có tham số là một View hay Activity truyền vào thì nó không thể update UI được, hoặc một số bài toán với dữ liệu lớn thì cũng không thể cập nhật giao diện bằng cách này được. Vậy giải pháp là gì? Chúng ta có hai cách đó là dùng **Handler**, hoặc là **AsyncTask**.
# 2.Handler
Handler là gì? Là một đối Android cung cấp dùng để liên kết, trao đổi giữa các Thread với nhau, là trao đổi giữa Thread sinh ra Handler và các Thread khác. Thường là Main Thread (UI Thread) với  các Worker Thread (Background Thread). Handler có nhiệm vụ gửi và thực thi các Message hoặc Runnable tới Message Queue của Thread sinh ra nó (Handler). Handler luôn được gắn kết với một Thread (Thread sinh ra nó) cũng với Message Queue (của Thread đó). Các Message và Runnable sẽ được thực thi khi đi ra khỏi Message Queue. Có 2 nhiệm vụ mà Handler thường làm đó là:
1. Lên lịch thực thi các Message và Runnable ở các thời điểm trong tương lai.
2. Sắp xếp một hành động được thực hiện trong một Thread khác.
![](https://images.viblo.asia/3f7fda6c-f87b-4829-8a9b-279c8b75025e.png)
Mesage Queue có thể xem là một hàng đợi, nó năm giữ một list các Message được gửi tới bởi đối tương Looper. Các Message không được add ngay lập tức vào Message Queue này mà phải thông qua Handler kết hợp với Looper.
Looper là một đối tượng dùng để chạy vòng lặp trong Message trong Thread. Các bạn có thể hiểu Message Queue là một đường hầm, còn tập hợp các Task (Message or Runnable) là một con tàu, mỗi Task là một toa tàu. Còn Looper là người lái tàu, và người lái tàu này lại lái tàu qua khỏi hầm rồi lại vòng lại đi vào hầm tiếp, nó duy trùy công việc liên tục trong Main Thread.
Nếu Handler sinh ra ở Main Thread thì đã có mặc định một Looper sinh ra, nhưng nếu nó sinh ra một Thread không phải là Main Thread thì phải tạo Handler trong cặp lệnh *Looper.prepare()* và *Looper.loop()*.
```java
                    class LooperThread extends Thread {
                        public Handler mHandler;

                        @Override
                        public void run() {
                            Looper.prepare();
                            mHandler = new Handler() {
                                @Override
                                public void handleMessage(Message msg) {
                                    // process incoming messages here
                                }
                            };
                            Looper.loop();
                        }
                    }
```
Có rất nhiều cách để sử dụng Handler, các bạn có thể thể xem một ví dụ nhỏ ở [bài viết này](https://viblo.asia/p/small-examples-about-handler-and-asynctask-Do754jGLZM6).

Khi dùng Handler để giao tiếp giữa Worker Thread với UI thì có một số bất tiện là phải code nhiều, dài dòng thì AsyncTask là một giải pháp thích hợp hơn.
# 3.AsyncTask
AsyncTask là một đối tượng thích hợp dùng để giao tiếp giữa một Thread với UI Thread, nó rất dễ dùng. Nó cho phép bạn thực hiện công việc ở background và sau đó cập nhật giao diện ở UI Thread. AsyncTask chính là sự tổ hợp của một Thread và một Handler.
![](https://images.viblo.asia/7541adc2-08f6-4fb8-9e54-42a5e8edf18b.png)
* AsyncTask là một đối tượng có 3 tham số Generic Type truyền vào là *Params*, *Progress*, *Result* và 4 phương thức *onPreExecute()*, *doInBackground()*, *onProgressUpdate()* và *onPostExecute()*.  3 tham số đều phải là kiểu Object, nếu không có thì để là Void. Trên hình vẽ bạn có thể thấy chỉ có doInBackground() chạy ở background, còn 3 phương thức còn lại chạy trên UI Thread. Khi bạn cho một lớp kế thừa từ AsyncTask bắt buộc bản phải override phương thức doInBackground(). 
![](https://images.viblo.asia/e83118d5-9378-4376-88be-f9ee315c539f.png)
* Params là tham số có thể được nhận từ execute(), có thể là một mảng các tham số con. và Params sẽ là input của doInBackground(), Process là input của onProgressUpdate(), đầu ra này nhận từ doInBackground() thông qua phương thức publishProgress(). onProgressUpdate() có thể cập nhật giao diện lúc runtime. Result là đầu ra của doInBackground() và chính là kết quả trả về ở onPostExecute().
AsyncTask chạy trên Worker Thread còn Handler chạy trên Main Thread (hay Thread sinh ra nó).

Mình cũng đã có một ví dụ đơn giản về sử dụng AsyncTask ở [bài viết tiếp theo](https://viblo.asia/p/small-examples-about-handler-and-asynctask-Do754jGLZM6), bạn có thể theo dõi.

Mình nhắc lại là AsyncTask là một tổ hợp của Handler và Worker Thread. Cả AsyncTask và Handler lý tưởng là nên sử dụng cho các hoạt động ngắn (tối đa là vài giây). Nếu bạn muốn giữ luồng chạy trong một thời gian dài thì bạn nên sử dụng ***Executor***, ***ThreadPoolExecutor*** và ***FutureTask***.
# 4.Tổng Kết.
Qua bài viết mình đã tổng hợp được một cách tổng quan lý thuyết về Thread, Handler và AsyncTask và mối quan hệ mật thiết giữa chúng. Mong sẽ giúp đỡ được phần nào cho các bạn mới học Android. Sắp tới mình sẽ cố gắng demo một số ví dụ về sử dụng Handler và AsyncTask để các các bạn hiểu rõ hơn. Cám ơn đã đọc bài bài viết !
Bài viết này mình đã tham khảo thông qua một số tài liệu sau đây.
1. https://developer.android.com/reference/java/lang/Thread.html
2. https://developer.android.com/guide/components/processes-and-threads.html?hl=en
3. https://developer.android.com/reference/android/os/Handler.html
4. https://developer.android.com/reference/android/os/AsyncTask.html
5. https://medium.com/@ankit.sinhal/handler-in-android-d138c1f4980e
6. https://github.com/trantronghien/component_in_android/wiki/%C4%90a-Ti%E1%BA%BFn-Tr%C3%ACnh-Trong-Android