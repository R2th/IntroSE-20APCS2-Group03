**Nguồn bài viết:** https://android.jlelse.eu/quick-tip-network-profiler-in-android-studio-3-1-491e530ac8f2

Android Studio 3.1 đã phát hành bản beta. Nó có thêm nhiều tính năng như kotlin lint check, D8 complier và Network Profiler cũng được sửa lại.
Từ những ngày đầu của DDMS, chúng ra luôn có thể kiểm tra network data được sử dụng như thế nào, nhưng ở thời điểm hiện tại, Network Profier đã được thêm vào rất nhiều những tính năng mới. Hãy cùng nhau xem xét chúng.

Đầu tiên, network graph trông khá gọn gàng: 
![](https://images.viblo.asia/9b6c81fc-9a90-4297-8f4d-090747a4be81.png)

### Request Debugging

Click vào một request bất kì trong graph, profier sẽ đưa cho bạn chi tiết của request đó, chẳng hạn như Reques type. Response data

![](https://images.viblo.asia/70b1fc8a-6a9d-4d90-b815-72e41ff14244.png)

Bạn cũng có thể kiểm tra Request và Response headers

![](https://images.viblo.asia/b6eda7ed-48ee-4a0c-a640-7b1695f5c185.png)

![](https://images.viblo.asia/fbb4e162-42bf-42dd-9b41-f109f881ce7d.png)

Nếu là một POST request, bạn có thể thấy được request body rất rõ ràng 

![](https://images.viblo.asia/64539925-9be6-4a8b-922f-4c0bb3d7f26d.png)

Tôi nhận thấy điều này rất hữu dụng. Trước đây tôi phải sử dụng các tool như Charles để chặn và tìm chi tiết của các request/response , đặc biệt là khi làm việc với third party APIs. Network Profier cho phép chúng ra hoàn toàn loại bỏ, không cần sử dụng các tool nữa và có thể kiểm tra trực tiếp từ Android Studio.

### Bonus Point 
Nếu bạn sử dụng third party SDKs, bạn luôn luôn có thể kiểm tra mọi request đi ra từ app của bạn và có được thông tin chi tiết như server url ... Bên dưới là một ví dụ về một request được sent từ Crashlytics được bắt bởi Network Profier

![](https://images.viblo.asia/2be6ea1b-18b0-40f9-a548-e8669e45ec33.png)
### And one last thing
Profier cũng có thể giúp bạn bắt được những radio burst tiêu thụ nhiều năng lượng khi bạn sử dụng mobile network
![](https://images.viblo.asia/d7cfab20-d79d-47d3-86a3-9729bdd2677f.png)
Biểu đồ trên có một đường timeline khi ứng dụng của bạn tạo ra những radio trong high power mode, điều đó sẽ khiến pin nhanh cạn kiệu hơn. Bạn có thể sử dụng điều này để kiểm tra các network calll và giúp ứng dụng của bạn tiêu thụ ít năng lượng hơn.

Để hiểu thêm về Radio state machine, có thể tham khảo tại https://developer.android.com/training/efficient-downloads/efficient-network-access#RadioStateMachine
### That’s all. Thanks for reading!