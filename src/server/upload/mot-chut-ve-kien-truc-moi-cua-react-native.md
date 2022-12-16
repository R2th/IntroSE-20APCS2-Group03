Bài viết gốc: https://vir.vn/mot-chut-ve-kien-truc-moi-cua-react-native/

*Đầu năm nay, đội dev của React Native đã tóm tắt lại những gì đã đạt được trong năm 2021 và roadmap của năm 2022, trong đó có nhắc tới việc triển khai kiến trúc mới của React Native vào năm nay. Bạn có thể đọc toàn bộ blog ở đây.*
> 2022 is going to be the year of the New Architecture in open source.
> 
![](https://images.viblo.asia/e73fa2d1-a29a-48dc-a719-37f34a30b5a4.jpeg)

# I. Kiến trúc hiện tại
Trước khi bắt đầu với cái mới, ta nên ngó qua cái hiện tại đang dùng một chút. Trong bài viết này thì mình chỉ nói sơ qua, nếu muốn tìm hiểu chi tiết hơn thì các bạn có thể đọc ở đây.

### Tổng quan cách hoạt động
Khi bạn khởi chạy một React Native app, thì xin lưu ý là phần code JS của bạn sẽ được **package** (được gọi là JS Bundle) và được tách riêng ra với phần Native Code (Android/IOS)

Lúc này, app của bạn sẽ được thực thi bởi 3 threads sau:
1. JS thread (Javascript thread/ Main thread): Được sử dụng bởi JS Engine, dùng để chạy JS bundle
2. Native/UI thread: Được sử dụng để khởi chạy các native module, các tiến trình render UI, animations, gesture handle, ...
3. Shadow thread: Được sử dụng để tính toán Layout của element trước khi render ra màn hình.

![1_0LTWA_egTnRLRlqXoRUymg](https://vir.vn/content/images/2022/02/1_0LTWA_egTnRLRlqXoRUymg.png)

**Chú thích:**

* JavaScriptCore: Tên của JS Engine, dùng để thực thi JS bundle
* Yoga: Tên của Layout engine, được sử dụng để tính toán vị trí layout của element trên màn hình.*

### Vậy thì vấn đề của kiến trúc hiện tại là gì?

Ta đều biết rằng, JavaScript chạy không đồng bộ nên các tương tác của chúng ta với React component cũng được xử lý không đồng bộ. JS thread listens các events, như scroll, touch các kiểu... sau đó thực hiện kết xuất DOM phù hợp và toàn bộ quá trình này đều diễn ra không đồng bộ từ JS thread cho tới UI. Chúng được gửi tiếp đến Shadow thread cho DOM và các refinements khác sẽ được gửi tiếp đến main thread queue. Yoga sẽ được sử dụng để chuyển đổi (transform) các response của shadow thread. Và trong khi JS thread queue đang được thực hiện thì những thay đổi sẽ được reflected trên UI

Vậy thì ngay cả đối với một tương tác bất kì lớn nhỏ nào, nó sẽ phải đi qua tất cả các luồng trên, thực tế thì điều này không quá tệ nhưng performance hoặc đặc biệt là một vài frames sẽ bị drop vì responses không được đồng bộ với main thread trừ khi đây là những thao tác thực sự được đồng bộ hóa.

Trông có vẻ như chỉ là một vấn đề nhỏ, nhưng vấn đề nhỏ sẽ dẫn tới vấn đề lớn, và những vấn đề lớn sẽ mang cho ta những vấn đề siêu to khổng lồ. Ví dụ như khi type vào Text Input bị giật giật này, mấy cái animations bị tụt frame này, hoặc list dài quá thì render bị dính delay này, rồi lag rồi giật vân vân và mây mây...

# II. Kiến trúc mới
Để tránh loãng, mình sẽ chỉ focus vào 4 thành phần chính của kiến trúc mới:
1. JSI
2. Fabric
3. Turbo Module
4. CodeGen

## JSI:
Quay lại với kiến trúc hiện tại, bạn có thể thấy là JS Thread giao tiếp với Native/UI Thread qua một thứ gọi là Bridge, dữ liệu được gửi từ thread này qua bridge sẽ được seralized thành JSON và được decode ở thread bên kia.

Cũng có thể hiểu là JS thread không biết Native thread đang làm gì và ngược lại, tất cả đều phải đợi data từ Bridge trả về. ( Điều này nghĩa là 2 thread không thể gọi trực tiếp nhau )

Vì tồn tại side effect như thế, nên các message gửi từ các thread đến Bridge đều là bất đồng bộ (asynchronus), đa số trường hợp thì điều này không vấn đề gì cả, nhưng có một số lúc nếu nó là đồng bộ (synchronus) thì tốt hơn.

### Ví dụ về cách Bridge hoạt động
Khi JS thread cần access/excute vào một native module nào đó (Camera, bluetooh,...), thì nó cần gửi một message đến Native thread thông báo về việc đó. Đầu tiên JS thread sẽ gửi một message đã serialized thành JSON qua Bridge. Bridge lúc này có nhiệm vụ optimize cái message JSON đó và ship về cho Native thread. Lúc này khi Native thread nhận được message sẽ tiến hành decode và thực thi yêu cầu.
![1_R23YGUmEok50UR77u_UZAw](https://vir.vn/content/images/2022/02/1_R23YGUmEok50UR77u_UZAw.png)

Tóm gọn lại thì có 4 bước chính:
1. JS Thread chuẩn bị một message đến Native thread
2. JS Thread seralized message đó và gửi đến Bridge
3. Bridge thực hiện optimize và gửi đến Native thread
4. Native thread nhận được message, decode và thực thi yêu cầu


***Dù sao đi nữa thì Bridge sẽ được thay thế bằng JSI (Javascript Interface) ở kiến trúc mới, nhẹ hơn, đa dụng hơn***, được viết bằng C++ và có thể cho phép JS Engines gọi trực tiếp đến Native modules bên Native side.

#### Tại sao lại nói JSI có tính đa dụng?
Ở kiến trúc hiện tại, React Native sử dụng JavascriptCore Engine và Bridge chỉ tương thích với nó. Nhưng với JSI sẽ được tách riêng khỏi JS Engine, điều này có nghĩa là JSI có thể được sử dụng bởi các JS Engines khác như V8, Chakra, Hermes, ...

### Vậy thì JSI hoạt động như nào?
Nhờ JSI, các Native method sẽ được tiếp xúc với JS qua C++ Host Objects. Lúc này JS có thể giữ các tham chiếu (reference) đến các objects này và gọi trực tiếp đến các method qua các tham chiếu.
Dễ hình dung hơn thì tương tự trên web, JS code có thể giữ một tham chiếu đến bất kỳ DOM element nào, và gọi phương thức qua nó. Ví dụ, khi bạn viết:
> const container = document.createElement(‘div’);
> 
Như trên, *container* là một biến JS, NHƯNG nó giữ một tham chiếu đến một DOM element có thể được khởi tạo bằng C++. Nếu chúng ta gọi bất kỳ phương thức nào qua "container", nó sẽ gọi method của DOM element đó. Cách JSI hoạt động giống như vậy.

Không như Bridge, JSI cho phép Javascript giữ tham chiếu đến Native Modules. Nhờ JSI, Javascript có thể gọi trực tiếp các method thông qua tham chiếu này.
![1_EZqdD2LVpbGrNdJZ0WqY5A](https://vir.vn/content/images/2022/02/1_EZqdD2LVpbGrNdJZ0WqY5A.png)

**Tóm lại:**
1. JSI giúp sử dụng các Javascript Engines khác nhau
2. Tạo kết nối hoàn chỉnh giữa JS Thread và Native Thread
3. Loại bỏ Bridge, không cần phải serialize JSON messages và cũng như giải quyết các vấn đề quá tải async message khi dùng Bridge.
4. Viết bằng C++, cung cấp performance cao giúp giải quyết các bài toán tương lai trên các thiết bị khác.

Note: JSI đã có từ phiên bản 0.59 nhưng vẫn đang phát triển và chưa được đưa vào sử dụng chính thức. Hiện đã có 1 số lib ứng dụng JSI vào sản phẩm của mình, tiêu biểu là RN [reanimated 2]([https://blog.swmansion.com/introducing-reanimated-2-752b913af8b3])

## Fabric
Fabric là một rendering system, thứ sẽ thay thế cho UI manager hiện tại.

Để hiểu ưu điểm của Fabric, bạn cần hiểu được cách UI được render.(Mình có nhắc đến bên trên phần ưu nhược điểm của Bridge, nhưng giờ mình sẽ giải thích kỹ hơn).

Khi app chạy, React sẽ thực thi code của bạn và JS và tạo ra ReactElementTree bằng JavaScript. Dựa trên tree này, Renderer sẽ tạo ra ReactShadowTree bằng C++.

Lúc này, Layout Engine (Yoga) sẽ dùng ReactShadowTree này để tính toán vị trí layout trên màn hình chính. Và khi công việc tính toán có kết quả, ShadowTree sẽ được chuyển đổi thành HostViewTree, bao gồm cả các Native element *( Ví dụ trong ReactNative <View /> sẽ được chuyển đổi thành ViewGroup của Android & UIView của iOS )*
![1_5a-rvja1slxMZH1_Zunxtg](https://vir.vn/content/images/2022/02/1_5a-rvja1slxMZH1_Zunxtg.png)
ReactElementTree (JavaScript) -> ReactShadowTree(C++) -> HostViewTree(Native)

### Nhược điểm
Như chúng ta đều biết, tất cả các giao tiếp giữa 2 bên JS thread và Native thread đều phải thông qua Bridge, điều này có nghĩa nó có tốc độ truyền tải dữ liệu không cao và dữ liệu bị duplicated không cần thiết.

Ví dụ: Nếu một Node ReactElementTree là <Image />, thì ở phía đối diện ReactShadowTree cũng phải là một image. Vậy thì dữ liệu sẽ bị duplicated vì được lưu trữ ở cả 2 node.

Không chỉ có thế, vì JS và UI thread không đồng bộ và mọi giao tiếp đều phải thông qua Bridge, sẽ có một số trường hợp app sẽ bị drop frames, tiêu biểu là ở các cases hiển thị lượng data lớn, lúc này có thể nó sẽ gây "tắc đường" Bridge. (Scoll một FlatList với số lượng data lớn chẳng hạn)

### Vậy Fabric để làm gì?
Hiện tại thì trên [ReactNative Document](https://reactnative.dev/docs/fabric-renderer) đã có riêng một trang nói về Fabric.
> Fabric is React Native's new rendering system, a conceptual evolution of the legacy render system.

Nhờ JSI loại bỏ Bridge, nên các hành vi người dùng như cuộn, kéo thả,... sẽ được Fabric ưu tiên thực hiện sync (Đồng bộ) trên JS thread hoặc Native thread, trong khi những tasks khác như gọi API sẽ được thực thi async (bất đồng bộ).

Không chỉ có thế, Shadow Tree giờ đây sẽ là immutable, và được chia sẻ cho cả 2 bên JS thread và UI thread và có thể được tương tác từ cả 2 đầu.
Ngoài ra còn nhiều ưu điểm khác, bạn có thể truy cập vào document để tìm hiểu thêm.

## Turbo Modules
Trong kiến trúc hiện tại, tất cả Native Modules được sử dụng bởi JavaScript (Bluetooth, Camera, Location, ... ) phải được khởi tạo trước khi app khởi động xong. Điều này có nghĩa là kể cả khi người dùng không có nhu cầu sử dụng những module này thì nó vẫn được khởi tạo lúc app khởi động.

Với Turbo Modules, giờ đây các Native Modules được lazy-loaded ( Nghĩa là khi nào cần mới dùng tới) thay vì load tất cả trong khi khởi động. Ngoài ra, chúng cũng được exposed bằng JSI, nhờ thế JS sẽ giữ một tham chiếu đến chúng, nghĩa là không cần phải truyền JSON messages theo từng đợt như ở bridge của kiến trúc cũ nữa. Kết quả là thời gian khởi động sẽ nhanh hơn đáng kể.

## CodeGen

Tất cả những điều trên nghe đều có vẻ rất hứa hẹn, nhưng JavaScript vẫn là một ngôn ngữ kiểu động (Dynamically typed language), còn JSI thì lại được viết bằng C++, một ngôn ngữ kiểu tĩnh (Statically Typed Language).Vấn đề giờ là cần phải đảm bảo giao tiếp thông suốt giữa cả hai.

Đó là lí do kiến trúc mới cũng bao gồm luôn một static type checker gọi là CodeGen.

CodeGen sẽ sử dụng TypeScript/Flow để generate nhiều native code ở build time hơn thay vì ở run time.
Tóm lại thì Codegen giúp:
code size nhỏ hơn, thực thi nhanh hơn, ít lỗi hơn.


## Tổng kết
Dựa vào các điều trên, ta có sơ đồ hoàn chỉnh của kiến trúc mới trông như sau:

![1_FSQREEbL1-alhSP-fH4Nxg](https://vir.vn/content/images/2022/02/1_FSQREEbL1-alhSP-fH4Nxg.png)

- Bridge sẽ được thay thế bằng JSI
- Giờ có thể sử dụng các JS Engine khác nhau
- Các thread có thể tương tác hoàn chỉnh với nhau
- Rendering system giống như Web
- Các tác vụ cần thời gian nhanh sẽ được thực thi đồng bộ
- Lazy Loading của Turbo Modules
- Static Type Checking để đảm bảo giao tiếp cho JS và Native Side

## Nguồn tham khảo:
https://reactnative.dev/docs/fabric-renderer
https://medium.com/coox-tech/deep-dive-into-react-natives-new-architecture-fb67ae615ccd
https://vir.vn/react-native-tra-chanh-gio-mua-ve-kien-truc-moi/
https://www.youtube.com/watch?v=7fiqh84VtpM