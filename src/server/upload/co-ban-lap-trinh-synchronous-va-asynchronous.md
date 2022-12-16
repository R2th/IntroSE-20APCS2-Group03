Xin chào mọi người!

Hôm nay mình sẽ giới thiệu cơ bản về lập trình đồng bộ (Synchronous ) và lập trình bất đồng bộ (Asynchronous).
Bài viết chỉ mang tính chất giới thiệu các khái niệm căn bản.

Hy vọng sẽ được thảo luận cùng anh em

### 1. Lập trình synchronous là gì :
 
 Lập trình đồng bộ (synchronous) là cách lập trình mà các hoạt động của chương trình sẽ được thực hiện tuần tự.
 
 ![image.png](https://images.viblo.asia/f749bf61-bf16-43dd-b45f-6da82e661c76.png)
 
 Như ở hình minh họa trên nói về việc chuẩn bị bữa sáng. Có tất cả 7 hoạt động --> nếu ta quy định mỗi hoạt động là 1 function thì ta có 7 functions sẽ chạy tuần tự từ trên xuống dưới.
 Hành động 1 xong rồi hành động 2 mới thực hiện, tuần tự cho tới hành động thứ 7 cuối cùng.
 
 ```js
function PourCoffee(){ //Rót cà phê
	console.log('Rót cà phê');
}
function FryEggsAsync(){ //chiên trứng
	console.log('Chiên trứng');
}
PourCoffee(); //hành động 1 rót cà phê
FryEggsAsync(); //hành động 2 chiên trứng
....
//hành động 3
//hành động 4
//hành động 5
//hành động 6
//hành động 7
```

**Ưu điểm của lập trình đồng bộ:** Các hoạt động xảy ra tuần tự nên có thể dễ quản lý, dễ debug và phát hiện vấn đề khi xảy ra lỗi.

**Vấn đề** :Nếu thời gian chạy các hoạt động đồng bộ xảy ra quá dài thì UI sẽ bị lock (đứng chương trình) do UI và các hoạt động đồng bộ cùng thuộc về 1 thread.

**Ví dụ:** Đơn giản nhất là khi ta làm việc với api lấy danh sách users từ database hay từ file. Trong trường hợp data quá lớn thì việc api này sẽ trả về rất lâu(thời gian chờ lâu). Nếu ta lập trình đồng bộ (synchronous) thì chương trình sẽ bị đứng (block UI) do ta phải đợi gọi xong api thì khi đó thread duy nhất UI mới được giải phóng và làm việc khác.

![image.png](https://images.viblo.asia/e141711b-7f43-496d-b67f-129afb9763d3.png)

**Giải thích về thread cho các bạn chưa rõ khái niệm này.**

**Vậy thread là gì:** như hình minh họa ở trên 1 process(hay còn được hiểu là 1 chương trình) sẽ bao gồm nhiều threads. Mỗi thread có thể thực hiện các hoạt động khác nhau.

**Ví dụ:** Khi ta mở 1 ứng dụng web nghe nhạc. Ta vừa có thể play nhạc, vừa có thể làm các hành động khác: pause, next, back, view list songs… bởi vì mỗi hành động là một thread(một luồng riêng biệt).

### 2. Lập trình asynchronous là gì: 

Lập trình bất đồng bộ là cách lập trình cho phép các hoạt động thực hiện không theo tuần tự. Có thể các đoạn code ở dưới có thể chạy trước đoạn code viết ở phía trên(bất đồng bộ), các hoạt động không phải đợi lẫn nhau. Bởi vì có nhiều threads nên khi xử lý các hoạt động có thời gian dài thì main thread(UI) vẫn có thể hoạt động do các thread là riêng biệt.

**Ưu điểm của lập trình bất đồng bộ**: Bởi vì không bị block thread và các hoạt động có thể không phải đợi nhau nên khi xử lý các tác vụ có thời gian thực hiện lâu không bị đứng chương trình, đem lại trải nghiệm người dùng tốt.

**Vấn đề:** Bởi vì các hoạt động thực hiện không theo thứ tự nên ta phải quản lý các hành động này một cách cẩn thận. Ví dụ như khi bạn xử lý hành động submit 1 form, đầu tiên phải validate dữ liệu, sau đó mới tới phần xử lý. Nếu như quản lý không tốt phần bất đồng bộ có thể dẫn tới: Phần xử lý chạy trước cả phần validate dữ liệu —> có thể gây ra lỗi nghiêm trọng.

Lập trình asynchronous thích hợp cho các hoạt động I/0:
![image.png](https://images.viblo.asia/aaf7dff6-2cdc-4c95-8bab-0bab915f2ba5.png)

Tiếp theo mình sẽ lấy ví dụ về Asynchronous. Phần ví dụ này bằng ngôn ngữ c# nên nếu bạn nào chưa có kiến thức cơ bản c# sẽ khó hiểu 1 tí.

**Before:** Sử dụng Synchronous
  ```js
  public class Program
    {
        public static async Task Main()
        {
            string url = "https://github.com/TechMarDay/Cache/blob/master/Cache/MemoryCache/Startup.cs";
            var file = DownloadFileSynchronous(url);
            Console.WriteLine("Làm gì đó khi file đang tải");
            Console.WriteLine($"File có độ dài {file?.Length}");
            Console.WriteLine("Làm gì đó khi file tải xong");

        }

        public static string DownloadFileSynchronous(string url)
        {
            WebClient webClient = new WebClient();
            var file = webClient.DownloadString(url); //Phương thức này là Synchronous được cung cấp bởi WebClient của .net
            Thread.Sleep(9000); //Giả sử việc download file sẽ mất 9000 miliseconds 

            Console.WriteLine("Đã hoàn thành tải file");
            return file;
        }
    }
```
Ta thấy function DownloadFileSynchronous sẽ tốn khá nhiều thời gian và main thread sẽ bị lock. Ta phải đợi sau khi hoàn thành việc download file mới có thể làm tác vụ khác. Kết quả in ra là:

> Đã hoàn thành tải file
> 
> Làm gì đó khi file đang tải
> 
> File có độ dài {file?.Length}
> 
> Làm gì đó khi file tải xong

Dòng ‘làm gì đó khi file đang tải’ đã chạy sau khi download file xong. Mặc dù hành động ‘làm gì đó khi file đang tải’ độc lập và không phụ thuộc vào việc tải file. Ta phải chờ cho tải file xong, rất tốn thời gian.

**After:** sử dụng Asynchronous
```js
    public class Program
    {
        public static async Task Main()
        {
            string url = "https://github.com/TechMarDay/Cache/blob/master/Cache/MemoryCache/Startup.cs";
            var fileTask =  DownloadFileASynchronous(url);
            Console.WriteLine("Làm gì đó khi file đang tải");
            var file = await fileTask;
            Console.WriteLine($"File có độ dài {file?.Length}");
            Console.WriteLine("Làm gì đó khi file tải xong");
            Console.ReadLine();
        }
     
        public static async Task<string> DownloadFileASynchronous(string url)
        {
            HttpClient client = new HttpClient();
            var fileTask = await client.GetStringAsync(url); //Phương thức này là Synchronous được cung cấp bởi WebClient của .net
            Thread.Sleep(9000); //Giả sử việc download file sẽ mất 9000 miliseconds 
            Console.WriteLine("Đã hoàn thành tải file");
            return fileTask;
        }
    }

```



Nhờ lập trình asynchronous mà ta có 1 thread X chạy function DownloadFile. Trong khi đó main thread không bị lock do việc Download file này có khả năng rất lâu.

Như ở ví dụ dưới thì khi chạy qua dòng var taskdonload = DownloadAsync.DownloadFile(url); thì việc download file đang diễn ra.
Tiếp đến bên dưới ta có thể làm các hành động tác vụ khác (cụ thể ở đây mình write ra câu “Làm gì đó khi file đang tải”) ở main thread

Tham khảo: https://topdev.vn/blog/lap-trinh-da-luong-trong-java-java-multi-threading/’