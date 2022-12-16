Một trong những thứ mà người sử dụng smart phone hiện nay mong muốn thực hiện được với chiếc điện thoại smart phone trên tay đó là kết nối không dây. Rất nhiều thiết bị IOT (internet of thing) không có bàn phím hay màn hình, nên cách hữu hiệu nhất để kết nối và điều khiển các thiết bị đó là kết nối ngang hàng (pair) từ chiếc smart phone đến thiết bị IOT đó. Và đây là cách mà Nest và Google Home thực hiện điều đó: Nearby Connections 2.0 API


![](https://images.viblo.asia/6a62db08-db90-4130-acb2-ad606a79359a.png)


Trong bài viết này mình sẽ giới thiệu cơ bản về Nearby Connection 2.0 API và cách sử dụng nó để kết nối ngang hàng với các thiết bị Android Things.

# 1. Nearby Connections API là gì?

Nearby connections Api cho phép 2 thiết bị giao tiếp với nhau trực tiếp thông qua bluetooth, hoặc cách mạng không dây thông qua điểm truy cập trung gian. Có 2 vai trò mà 1 thiết bị có thể đảm nhiệm: **Advertister** – cho phép thiết bị khác tìm thấy và kết nối đến, và **Discoverer** – Tìm kiếm các Advertister ở gần và thực hiện kết nối đến. Khi các thiết bị (gọi là các endpoints) được kết nói với nhau thành công, chúng có thể trao đổi dữ liệu với nhau thông quan mạng lưới Nearby Connections Api.

Có 2 cách để NCA (Nearby Connections Api) có thể sử dụng để kết nỗi giữa các thiết bị. Cách đầu tiên là **P2P_STARS** – cách đơn giản nhất để thực hiện. Nó bao gồm 1 advetister và hỗ trợ nhiều discoverers có thể kết nối tới nó. Dạng thứ 2 là **P2P_CLUSTER**, cho phép 1 thiết bị có thể là advetister và discoverer đồng thời. Phương tuhwcs này tạo ra mạng lưới rộng rãi với khả năng thất bại thấp, tuy nhiên lại tốn băng thông hơn. Cách thức này phù hợp với các hệ thông nhỏ mà không cần thông qua thiết bị trung gian, như chơi game chẳng hạn.

Bài viết này sẽ tập trung vào P2P_STAR để kết nối đến các thiết bị IOT – là một adversister và sử dụng smartphone của người dùng là 1 discoverer. Tuy nhiên đến cuối bài viết bạn sẽ có đủ các kiến thức cơ bản để thực hiện P2P_CLUSTER.

# 2. Bắt đầu
Có 2 moduke: andoid app và android things app. Tạo 2 module này bằng Android Studio. Sau đó thêm thư viện dependence trong module-level **build.gradle** cho cả 2 app:


```
1 | compile ‘com.google.android.gms:play-services-nearby:11.6.2’
```


Sau khi chạy gradle sync, mở file **AndroidManifest.xml** của cả 2 app ra và thêm các quyền sau:

```
01 | <uses-permission
02 |    android:name="android.permission.BLUETOOTH"/>    
03 | <uses-permission
04 |    android:name="android.permission.BLUETOOTH_ADMIN"/>    
05 | <uses-permission
06 |    android:name="android.permission.ACCESS_WIFI_STATE"  />
07 | <uses-permission
08 |    android:name="android.permission.CHANGE_WIFI_STATE" />    
09 | <uses-permission  
10 |    android:name="android.permission.ACCESS_COARSE_LOCATION" />
```


Các thiết bị Android Things sẽ được cấp quyền sau khi khởi động lại. 
Class MainActivity.class của cả 2 app cần thêm interface của Google Play services như sau:

```
01 public class MainActivity extends FragmentActivity implements GoogleApiClient.ConnectionCallbacks, GoogleApiClient.OnConnectionFailedListener {
02    @Override
03    public void onConnected(@Nullable Bundle bundle) {}
04
05    @Override
06    public void onConnectionSuspended(int i) {}
07
08    @Override
09    public void onConnectionFailed(@NonNull ConnectionResult connectionResult) {}
10
11 }

```

Kiểm tra bằng code và xác nhận user đã cấp quyền cho biết vị trí trong hàm **onCreate()**, sau đó thực hiện kết nối đến Google Play Service để sử dụng NCA:

```
1 mGoogleApiClient = new GoogleApiClient
2    .Builder(this, this, this)
3    .addApi(Nearby.CONNECTIONS_API)
4    .enableAutoManage(this, this)
5    .build();
```
Sau khi **GoogleApiClient** kết nối xong, hàm **onConnected()** sẽ được gọi đến. Đây là nơi bạn thực hiện bắt đầu advertister hoặc discoverer cho thiết bị của mình. Cả 2 module này cần có service_id

```
1 | private static final String SERVICE_ID = "UNIQUE_SERVICE_ID";
```

# 3. Thực hiện advertissting với các thiết bị ở gần

Bạn cần tạo một **ConnectionLifecycleCallback** để nhận biết các sự kiện của NCA. Trong demo này mình dùng phương thức **onConnectedInitiated();**

Tham chiếu đến endpoint đầu tiên kết nối đến nó, chấp nhận kết nối và sau đó dừng advertisting. Nếu kết nối thất bại thì thực hiện lại từ đầu.

```
01 private final ConnectionLifecycleCallback mConnectionLifecycleCallback =
02    new ConnectionLifecycleCallback() {
03       @Override
04       public void onConnectionInitiated(String endpointId, ConnectionInfo connectionInfo) {
05          endpoint = endpointId;
06 
07          Nearby.Connections.acceptConnection(mGoogleApiClient, endpointId, mPayloadCallback)
08               .setResultCallback(new ResultCallback<com.google.android.gms.common.api.Status>() {
09                    @Override
10                    public void onResult(@NonNull com.google.android.gms.common.api.Status status) {
11                       if( status.isSuccess() ) {
12                           //Connection accepted
13                        }
14                    }
15               });
16         
17          Nearby.Connections.stopAdvertising(mGoogleApiClient);
18       }
19
20       @Override
21       public void onConnectionResult(String endpointId, ConnectionResolution result) {}
22
23       @Override
24       public void onDisconnected(String endpointId) {}
25    };
```

Trong đoạn code trên sử dụng **PayLoadCallback**. Object này có các phương thức được gọi đến khi payload data được gửi đi từ advertister đến các endpoints. Hàm **onPayloadReceived()** là nơi xử lý những data được gửi đến các thiết bị Android Things. Hàm này chứa các đối tượng **Payload** có thể chuyển hóa sang mảng byte, và 1 đoạn **String** đại diện cho địa chỉ của endpoints gửi đi.

```
1  private PayloadCallback mPayloadCallback = new PayloadCallback() {
2      @Override
3      public void onPayloadReceived(String endpoint, Payload payload) {
4          Log.e("Tuts+", new String(payload.asBytes()));
5      }
6
7      @Override
8      public void onPayloadTransferUpdate(String endpoint, PayloadTransferUpdate payloadTransferUpdate) {}
9  };
```


Thực hiện advertisting trên thiết bị IOT bằng phương thức sau:

```
1  Nearby.Connections.startAdvertising(
2       mGoogleApiClient,
3       "Device Name",
4       SERVICE_ID,
5       mConnectionLifecycleCallback,
6       new AdvertisingOptions(Strategy.P2P_STAR));
```

Khi gửi payload đến thiết bị khác, bạn có thể dùng **Nearby.Connection.sendPayload()** với tham số gồm Google Api client, tên của endpoint và byte dữ liệu bạn muốn gửi đi

```
1 | Nearby.Connections.sendPayload(mGoogleApiClient, endpoint, Payload.fromBytes("Message".getBytes()));
```

**Tip: Mở wifi khi khởi động thiết bị.**

Một thủ thuật nhỏ mình thấy hữu ích khi làm việc với NCA hay các thiết bị Android Things là luôn bật lại wifi khi khởi động lại, vì thiết bị khi đó có thể bị tắt wifi nếu thiết bị đó tắt đi hay sập nguồn khi thực hiện advertisting. Ta có thể thực hiện nó bằng cách dùng wifi manager service.

```
1  wifiManager = (WifiManager) getSystemService(Context.WIFI_SERVICE);
2  wifiManager.setWifiEnabled(true);
```

# 4. Thực hiện Discovering với các thiết bị ở gần 


Discovering thực hiện với các bước tương tự như advertisting. Ta cần kết nối đến Google Api client và bắt đầu discovering. Khi tìm thấy 1 advertister discoverer gửi yêu cầu kết nối đến advertister. Nếu advertister chấp nhận yêu cầu, khi đó 2 thiết bị sẵn sàng kết nối và truyền dữ liệu qua lại.Discoverer sử dụng **payloadCallback** giống như advertister.

```
1  private PayloadCallback mPayloadCallback = new PayloadCallback() {
2      @Override
3      public void onPayloadReceived(String s, Payload payload) {
4         Log.e("Tuts+", new String(payload.asBytes()));
5      }
6
7      @Override
8      public void onPayloadTransferUpdate(String s, PayloadTransferUpdate payloadTransferUpdate) {}
9 };
```

Sử dụng **ConnectionLifeCycleCallback**:

```
01 private final ConnectionLifecycleCallback mConnectionLifecycleCallback =
02         new ConnectionLifecycleCallback() {
03            @Override
04            public void onConnectionInitiated(String endpointId, ConnectionInfo connectionInfo) {
05                Nearby.Connections.acceptConnection(mGoogleApiClient, endpointId, mPayloadCallback);
06                mEndpoint = endpointId;
07                Nearby.Connections.stopDiscovery(mGoogleApiClient);
08           }
09
10           @Override
11           public void onConnectionResult(String endpointId, ConnectionResolution result) {}
12
13           @Override
14           public void onDisconnected(String endpointId) {}
15        };
```

Và cần thêm **EndpointDuiscoveryCallback** sử dụng khi phát hiện thấy 1 advertiter nhưng chưa connect đến. Trong đó ta sẽ khởi tạo request kết nối đến advertister này.

```
01 private final EndpointDiscoveryCallback mEndpointDiscoveryCallback =
02     new EndpointDiscoveryCallback() {
03         @Override
04         public void onEndpointFound(
05                String endpointId, DiscoveredEndpointInfo discoveredEndpointInfo) {
06           if( discoveredEndpointInfo.getServiceId().equalsIgnoreCase(SERVICE_ID)) {
07              Nearby.Connections.requestConnection(
08                      mGoogleApiClient,
09                      "Name",
10                      endpointId,
11                      mConnectionLifecycleCallback);
12           }
13         }
14
15         @Override
16         public void onEndpointLost(String endpointId) {
17            Log.e("Tuts+", "Disconnected");
18         }
19    };
```

Sau khi discoverer kết nối đến google play service. Thực hiện chạy discorverer bằng câu lệnh sau:

```
1 Nearby.Connections.startDiscovery(
2         mGoogleApiClient,
3         SERVICE_ID,
4         mEndpointDiscoveryCallback,
5         new DiscoveryOptions(Strategy.P2P_STAR));
```

Cuối cùng, khi bạn cần thực hiện ngắt kết nối với advertister, sử dụng **disonnectFromEndpoint**. Hàm này nên gọi trong phương thức **onDestroy** của **Activity**.

```
1 | Nearby.Connections.disconnectFromEndpoint(mGoogleApiClient, mEndpoint);
```

# 5. Tổng kết
Trong bài viết này mình đã giới thiệu cơ bản về NCA cho android để kết nối giữa một ứng dụng trên smart phone và thiết bị IOT Android Things.
Api này cung cấp 1 cách kết nối đơn giản mà hiệu quả và kết nối giữa các thiết bị không dây, không cần internet hay thiết bị kết nối trung gian nào cả, và cung cấp cho bạn một nền tảng thú vị để áp dụng vào các dự án của mình.



Nguồn dịch: https://code.tutsplus.com/tutorials/connect-android-things-to-a-smartphone-with-nearby-connections-20--cms-28269