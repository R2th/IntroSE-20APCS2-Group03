Tiếp theo phần 1 [Services và WorkManager - Part 1 : Android memory](https://viblo.asia/p/services-va-workmanager-part-1-android-memory-RQqKLYwpZ7z)

Phần này chúng ta sẽ đi vào ví dụ cụ thể khi ứng dụng chạy nền, và ta sẽ làm gì nếu không sử dụng Services

Ứng dụng của chúng ta cần call API để login, download một vài KB. Đơn giản ta sẽ tạo 1 Thread để thực thi nó


```
int threads = Runtime.getRuntime().availableProcessors();
ExecutorService executor = Executors.newFixedThreadPool(threads);
executor.submit(myWork);
```


Nó sẽ có một màn hình đăng nhập, bao gồm Username, password và 1 button Sign in.

Mạng 3G của user yếu hoặc đang đi ở trong thang máy.

Ví dụ user đang sử dụng ứng dụng của bạn, họ đang ở màn hình login. User vừa mới điền username, password, ấn button Sign In thì có một cuộc gọi đến.

![](https://images.viblo.asia/e2eb8e02-b56e-4c7c-92cb-09a0c595f69a.gif)

`OkHttp` có default timeout khá lớn.
```
connectTimeout = 10_000;
readTimeout = 10_000;
writeTimeout = 10_000;
```

Thông thường chúng ta đặt mặc định là 3 lần cố gắng thử lại. 
Vậy trường hợp xấu nhất là 3 x 30000 = 90000 (90s)
### Vậy theo bạn người dùng đã login thành công chưa?
Bạn chưa thể biết được khi ứng dụng đang ở background. Bạn cũng không thể biết được có hay không khi process của bạn sẽ vẫn còn sống để kết thúc cuộc gọi mạng, xử lý phản hồi và lưu thông tin đăng nhập của người dùng. 
Chưa kể là thực tế là điện thoại của user có thể offline và mất kết nối internet. 

Từ góc độ người dùng : Tôi đã điền đầy đủ thông tin, tôi đã ấn vào nút "Đăng Nhập", có nghĩa là tôi đã đăng nhập. 
Nếu chưa đăng nhập được là UX của bạn không được tốt, và người dùng sẽ đánh giá kém app của bạn.
Nhưng đó không phải vấn đề về UX, nó là vấn đề về kỹ thuật.

Ok, vậy mỗi lần nhận được cuộc gọi tôi sẽ chuyển ứng dụng chạy background bằng một Service. Nhưng không may là bạn đang không sử dụng được Service, vậy bạn sẽ làm thế nào?
`JobScheduler` sẽ đến cứu bạn. 

```
ComponentName service = new ComponentName(this, MyJobService.class);
JobScheduler mJobScheduler = (JobScheduler)getSystemService(Context.JOB_SCHEDULER_SERVICE);
JobInfo.Builder builder = new JobInfo.Builder(jobId, serviceComponent)
 .setRequiredNetworkType(jobInfoNetworkType)
 .setRequiresCharging(false)
 .setRequiresDeviceIdle(false)
 .setExtras(extras).build();
mJobScheduler.schedule(jobInfo);
```

Khi `Job` được start, đến đúng thời điểm, hệ thống sẽ start `MyJobService` và thực thi bất cứ cái gì trong hàm `onStartJob()`.

Ý tưởng là tốt tuy nhiên có một vấn đề là `JobScheduler` chỉ có từ `min API 21` và `JobScheduler` trong API 21 & 22 lại có một số bug.

![](https://images.viblo.asia/a10bc604-5439-48ea-a5eb-6a410992a400.png)

![](https://images.viblo.asia/61db2bb8-c118-49e9-8418-d5396ac23bde.png)

![](https://images.viblo.asia/f5718b90-231f-47de-8759-4b0d5ad49b5b.png)

Như vậy có nghĩa là thực sự thì `minSDK` bạn có thể sử dụng nó là `23`


![](https://images.viblo.asia/2657b138-c19f-42c4-af01-9ff28d26af1b.png)

Nếu `minSDK < 23`, bạn có một tùy chọn là `JobDispatcher`

```
Job myJob = firebaseJobDispatcher.newJobBuilder()
 .setService(SmartService.class)
 .setTag(SmartService.LOCATION_SMART_JOB)
 .setReplaceCurrent(false)
 .setConstraints(ON_ANY_NETWORK)
 .build();
firebaseJobDispatcher.mustSchedule(myJob);
```


Nhưng lại yêu cầu version Google Play Services!

![](https://images.viblo.asia/e2d5d6aa-8045-4027-b50c-62108c7a7edd.png)

Nếu bạn sử dụng cách này, bạn sẽ bỏ lỡ mất hàng chục triệu người dùng từ  Amazon Fire, Amazon TV và hàng trăm nhà sản xuất Trung Quốc 
 
![](https://images.viblo.asia/4b6dc4b6-cf37-4e23-8104-0ce6c888ae6e.png)

Vậy, sử dụng `JobScheduler` cũng không phải là một cách tốt nhất. 
Điều gì sẽ xảy ra khi bạn vẫn muốn hưởng lợi từ các dịch vụ cũ trên các thiết bị trước O và chạy các dịch vụ để thực thi các lệnh call API.
`JobIntentService` là lựa chọn tốt nhất của bạn.

![](https://images.viblo.asia/496c51b7-015b-460c-8f66-831de51489c5.png)

`JobIntentService` cung cấp cho bạn khả năng thực thi các Job với IntentService thông thường trên SDK < 26, và `JobScheduler` trên SDK >=26. Nó cũng là một phần trong Support Library.

Chỉ có điều nó không hõ trợ call API theo  dạng “As soon as possible” trên các thiết bị chạy Android O. 

Vì vậy chúng ta lại trở lại câu hỏi ban đầu, quản lý phiên bản Android trên máy, thực thi call API ở background và lên lịch lại khi ứng dụng chạy nền với lịch trình thích hợp, dựa trên trạng thái thiết bị.

Thật khó để trở thành một dev giỏi, người sẵn lòng tiết kiệm thời lượng pin của người dùng và cung cấp UX tuyệt vời.

Vấn đề sẽ được giải quyết ở phần cuối của series này.