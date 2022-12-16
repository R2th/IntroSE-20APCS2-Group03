# Intros

Theo Wikipedia, **Reverse Engineering** (dịch ngược, đảo ngược, thường viết tắt là **RE**) là quá trình tìm ra các nguyên lý kỹ thuật của một phần mềm ứng dụng hay thiết bị cơ khí qua việc phân tích cấu trúc, chức năng và hoạt động của nó. Trong quá trình này, người ta thường phải tháo dỡ đối tượng (ví dụ một thiết bị cơ khí, một thành phần điện tử, một phần mềm) thành từng phần và phân tích chi tiết hoạt động của nó, thường là với mục đích xây dựng một thiết bị hoặc phần mềm mới hoạt động giống hệt nhưng không sao chép bất cứ thứ gì từ đối tượng nguyên bản.

Trong lần tham gia thi CTF gần đây, mình có tiếp cận với một đề bài Reverse Engineering một game chạy bằng Unity, thông qua việc giải đề bài này có thu thập được thêm một số kiến thức mới đối với nên viết bài này để tổng hợp và làm tư liệu chia sẻ những gì đã tìm hiểu được. Đề bài là một game dò mìn (Mine Sweeping) quen thuộc, nhiệm vụ của chúng ta là phải thắng được game này chăng? (chắc vậy :satisfied:)
![](https://images.viblo.asia/full/edfd7479-e775-4a07-ae48-6443377ef86e.png)

# Disclaimer
Bài viết này hoàn toàn mang tính chất chia sẻ kiến thức, mình không khuyến khích việc RE các app và game cho mục đích xấu hoặc thương mại.
# Basics of Unity Engine
Trước khi bắt tay vào RE, chúng ta cần biết được một số kiến thức cơ bản. Vì mình không phải là một game developer chuyên nghiệp (nhưng rất có hứng thú với việc làm game :joy:, các game mà team mình làm được có ở đây: https://heasygame.com/) nên chỉ tóm tắt những cái cần thiết nhất để chúng ta có thể RE được nên không thể tránh khỏi sai sót, nếu có rất mong được feedback từ mọi người.

## The Engine

Về cấu trúc, Unity Engine tổ chức code trong các *Scripts* được gắn vào các *GameObjects*, sao đó các đối tượng này lại được tổ chức trong các *Scenes* theo mô hình "component based". Cụ thể như sau:
- **Scenes** về cơ bản là các level/maps (màn chơi) trong game. Chúng sẽ chứa các cảnh, các đối tượng hình học, các nguồn sáng và các GameObjects
- **GameObjects** là các thực thể trong màn chơi: thuộc tính, người chơi, cánh cửa, súng, đạn... Mỗi GameObject thường sẽ có 1 dạng body (kinetic: chuyển động, static: tĩnh, ...) và thông số *Transform*. *Update*: nếu sử dụng physics (vật lý) thì gameobject mới có body (dynamic: chuyển động hoàn toàn dựa trên vật lý, kinematic: chỉ chuyển động dựa trên ngoại tác động, không bị ảnh hưởng bởi trọng lực hay lực, static: tĩnh
- **Transforms** sẽ chứa các thông tin về Position (vị trí), Rotation (góc xoay), và Scale (tỉ lệ) của GameObject trong scence. Mỗi GameObject sẽ có một Transform tương ứng và ngược lại.
- **Scripts** là những đoạn code được gắn với các GameObject, nó là các components (thành phần). Các Scripts có gắn kèm các biến có thể cấu hình được, và được thực thi ở mỗi frame trong khi game chạy, qua đó các Script có thể tác động và thay đổi các GameObject cũng như tương tác với các Script khác theo logic của trò chơi.

## The Unity Editor

![](https://i.imgur.com/jq0Hdfe.png)

(Image Source: unknowncheats.me)

Phần này mình ko rõ lắm nên chỉ để 1 cái ảnh thôi. Cụ thể về docs của Unity thì đã có rất đầy đủ rồi, mọi người có thể tự tìm hiểu thêm.

## Scripts/Components

Như đã nói ở trên, Scripts được dùng để thêm vào logic cho các GameObject. Script trong Unity thường được viết bằng C# hoặc Javascript (đối với đề bài này, thì nó là C# và thường các game developer cũng viết code bằng C# nhiều hơn). Với .NET các Script đều kế thừa từ *MonoBehaviour* và có hàm constructors và destructors riêng nhưng Unity cũng có cung cấp riêng những hàm life-cycle được gọi vào từng thời điểm khác nhau trong suốt quá trình tồn tại của một GameObject:

- ***void Start()*** được gọi khi GameObject được enabled (bật)
- ***void Awake()***  được gọi trước hàm Start() (gọi ngay khi game object được attach vào scene)
- ***void Update()*** được gọi tại mỗi frame (khung hình) trong game, tuỳ vào logic mà hàm này có thể bị skip để tránh việc bị giảm FPS.
- ***void FixedUpdate()*** được gọi ở mỗi ~~frame, và không thể bị skip~~ physics frame, chuyên dùng cho các tương tác vật lý, nếu ko dùng vật lý thì cũng không cần (skip thoải mái) (kudos @kiendinang)
- **void LateUpdate()** được gọi sau khi tất cả các hàm update đã được gọi
- **void OnEnable()/OnDiable()** được gọi khi  GameObject bị enabled/disabled
- **void OnDestroy()** được gọi khi GameObject bị destroyed (bị loại khỏi màn, thông quan hàm *GameObject.Destroy*)
- **void OnGUI()**  được gọi khi màn chơi được vẽ (drawing) và  cho phép script sử dụng GUI-API (hmm, cũng chưa gặp hàm này trong thực tế mấy)

Tí nữa chúng ta sẽ thấy các hàm này bên trong code thật ngay sau đây thôi :v

# Static Analysis

## Folder Structure

Chúng ta cùng xem thử cấu trúc thư mục của 1 game Unity như thế nào. Đây là cấu trúc cho phiên bản Window, đối với các platform (Linux, Android, ...) khác thì  những thành phần cơ bản cũng cấu trúc hoàn toàn tương tự.

![](https://images.viblo.asia/full/6a99180c-2c40-4fb7-86ca-cb26a2b1fb84.png)

- **_Data** là thư mục chứa code và resources của game, thường sẽ có các file level và **.assets* (là dạng file tổng hợp các resources: ảnh, texture,... của game) và thư mục **Managed** chứa các file code ( đã được compile ra DLL), thư viện dùng trong game. Update: ở version Unity mới hơn, với target platform là Android đã không còn compile ra DLL nữa mà sử dụng *libil2cpp.so* để chạy, như vậy sẽ không còn thấy các file DLL nữa, cơ mà đây là 1 câu chuyện khác :v
- **MonoBleedingEdge** là thư mục chứa runtime của Unity (chạy trên nền Mono)
- File thực thi chính *Mine Sweeping.exe*
- Các file khác (hiện không cần quan tâm)

## Extract Resources

Để hiểu rõ thêm về game, ta có thể tiến hành extrac thử các resources của game ra và phân tích. Đã có rất nhiều công cụ hỗ trợ việc này. Ở đây mình sử dụng **UnityAssetsExplorer** để bung file assets ra và **uTinyRipper** để trích xuất từng resources riêng (các tool này bạn có thể tự google). Dưới đây là kết quả sau khi extract:

![](https://images.viblo.asia/full/7cbbf67a-a6f1-4c7b-9739-3e99b6692935.png)

Ngoài các ảnh (sprite) của các ô thể hiện số mìn xung quanh thì còn có thêm hai ảnh *black* và *white* :thinking:

## Decompile Codes

Source code của một game Unity sẽ được chứa chủ yếu trong file **Assembly-CSharp.dll** (ở một số game còn có thêm file **Assembly-CSharp-firstpass.dll**). 

Để dịch ngược được code C#, chúng ta có thể dùng các công cụ như [ILSpy](https://github.com/icsharpcode/ILSpy), hoặc [dotPeek](https://www.jetbrains.com/decompiler/) của JetBrains. Còn ở đây, mình sẽ dùng [dnSpy](https://github.com/0xd4d/dnSpy) vì có tích hợp sẵn cả dịch ngược và debugging vô cùng mạnh mẽ.

Load file *Assembly-CSharp.dll* chúng ta sẽ được kết quả như sau:

![](https://images.viblo.asia/full/46df548e-c3f0-4864-9939-871c924f2990.png)

Rất may mắn là code không bị obfucastor, rất clean và dễ đọc :kissing_heart:. Ta cũng có thể thấy các hàm life-cycle như *Start* hay *Awake* như đã nói ở trên. Việc còn lại là đọc code và RE thôi.


# Dynamic Analysis
Ta hoàn toàn có thể phân tích động với dnSpy. Đối với các app C# thông thường, ta có thể load file thực thi và DLL vào, chọn Debug engine là .NET, chỉ Assembly đến file exe và start debug như bình thường nhưng với Unity, ta cần làm thêm 1 số việc:

![](https://images.viblo.asia/full/57f3fc11-bd8d-4956-a309-0e72393acb94.png)

Thông tin chi tiết có đầy đủ ở: https://github.com/0xd4d/dnSpy/wiki/Debugging-Unity-Games. Ở đây mình sẽ tóm tắt các bước và áp dụng vào đề bài này:

- Chúng ta cần biết version của Unity để thay thế runtime engine đi kèm với game (release build) thành bản debug build để có thể debug được. Đầu tiên là lấy thông tin version Unity:
![](https://images.viblo.asia/66094e73-ed93-4854-b41e-a4a5373191db.png)

- Vậy là phiên bản Unity `2018.3.8`, chúng ta tải về file [Unity-debugging-2018.x.zip](https://github.com/0xd4d/dnSpy/releases) tương ứng và sử dụng thư mục `unity-2018.3.8`:
![](https://images.viblo.asia/full/8e76fce0-115f-439c-a57b-2815f4f72682.png)
- Trong này có file `mono-2.0-bdwgc.dll` (game 64-bit nên chúng ta dùng thư mục win64), ta sẽ dùng file này thay thế cho file tương tương ứng ở: *Mine Sweeping\MonoBleedingEdge\EmbedRuntime\mono-2.0-bdwgc.dll*. Nhớ run lại game để đảm bảo là mọi thứ vẫn chạy bình thường.
- Đến đây thì ta có thể tiến hành debug, đặt breakpoint rồi (nhớ chọn Engine là Unity hoặc Unity (Connect))
![](https://images.viblo.asia/full/ac610b98-8df2-405d-a3b8-727bb94240d8.png)

VD: đặt breakpoint tại điểm sau khi ấn vào 1 ô trên bàn, ta có thể theo dõi được toạ độ của điểm trên bàn (num tương ứng là 0x000_0007 là cột 7 và num2 là 0x000_001C là hàng 28 trong mảng)

# Solutions
Với đề bài này thì có rất nhiều cách giải:
- Cách 1 (trâu bò): Vì nội dung bàn là không đổi sau mỗi lần reset (mặc dù code có hàm random, cú lừa chăng, mình lười nên cũng chẳng đọc kĩ :sweat_smile:), ta có thể chơi như bình thường hết bàn 29x29 là ra :smiley:
- Cách 2 (thông minh hơn): Phân tích trích xuất mảng `eleGrids` của class `Grids` là nơi chứa thông tin các vị trí có mìn như kết quả dưới (▀ tương ứng là ô có mìn):
```
▀▀▀▀▀▀▀ ▀ ▀ ▀▀▀     ▀ ▀▀▀▀▀▀▀
▀     ▀  ▀▀  ▀     ▀▀ ▀     ▀
▀ ▀▀▀ ▀  ▀▀▀  ▀   ▀ ▀ ▀ ▀▀▀ ▀
▀ ▀▀▀ ▀ ▀   ▀▀  ▀  ▀▀ ▀ ▀▀▀ ▀
▀ ▀▀▀ ▀    ▀ ▀  ▀▀▀▀▀ ▀ ▀▀▀ ▀
▀     ▀  ▀▀   ▀   ▀▀  ▀     ▀
▀▀▀▀▀▀▀ ▀ ▀ ▀ ▀ ▀ ▀ ▀ ▀▀▀▀▀▀▀
           ▀▀  ▀   ▀         
  ▀ ▀▀▀ ▀▀ ▀ ▀▀     ▀▀   ▀  ▀
  ▀     ▀      ▀ ▀ ▀▀ ▀▀  ▀ ▀
▀▀ ▀ ▀▀  ▀   ▀▀ ▀▀▀▀▀▀     ▀▀
  ▀ ▀▀ ▀ ▀  ▀ ▀▀ ▀▀ ▀ ▀▀▀▀ ▀ 
▀▀▀▀  ▀ ▀ ▀▀▀  ▀▀  ▀  ▀     ▀
   ▀▀    ▀▀▀▀    ▀   ▀▀▀   ▀▀
 ▀▀▀▀ ▀ ▀▀▀▀▀  ▀  ▀ ▀▀▀   ▀▀▀
   ▀ ▀ ▀ ▀ ▀▀▀        ▀▀▀   ▀
 ▀  ▀ ▀▀ ▀▀   ▀▀ ▀▀ ▀▀▀ ▀▀  ▀
  ▀▀ ▀     ▀  ▀ ▀▀ ▀ ▀▀   ▀▀▀
▀  ▀▀ ▀▀ ▀▀▀ ▀   ▀   ▀ ▀▀▀ ▀▀
 ▀   ▀  ▀ ▀ ▀  ▀▀  ▀▀ ▀      
▀   ▀▀▀▀  ▀    ▀▀   ▀▀▀▀▀ ▀▀▀
        ▀ ▀▀ ▀▀▀▀   ▀   ▀  ▀▀
▀▀▀▀▀▀▀      ▀▀ ▀▀▀▀▀ ▀ ▀ ▀▀▀
▀     ▀ ▀  ▀ ▀▀ ▀ ▀ ▀   ▀  ▀▀
▀ ▀▀▀ ▀ ▀▀  ▀▀▀     ▀▀▀▀▀▀ ▀ 
▀ ▀▀▀ ▀    ▀ ▀  ▀▀▀     ▀    
▀ ▀▀▀ ▀ ▀▀ ▀▀   ▀   ▀▀  ▀   ▀
▀     ▀  ▀ ▀▀▀   ▀▀    ▀   ▀ 
▀▀▀▀▀▀▀    ▀▀  ▀   ▀▀ ▀ ▀  ▀▀
```

Nếu "lùi bước về sau, để thấy em rõ hơn", ta sẽ nhận ra ngay đây là QR code, việc còn lại là tạo ảnh QR code xịn từ thông tin này và quét thôi. Vậy ý tưởng bài này là: sau khi dò hết mìn, game sẽ thay các sprite bằng các ảnh black và white ở trên để cho ra 1 cái QR code, nghe vô lý vl mà lại hết sức thuyết phục nhỉ =))

- Cách 3 (trông khá nguy hiểm nhưng lại nửa mùa): Để tránh việc phải restart nhiều lần mỗi khi click phải mìn, ta có thể sửa thẳng code của game để bỏ qua trường hợp đó, rồi click tay =)). Trong dnSpy, bạn có thể right-click, chọn `Edit Class (C#)` sửa code, compile và sau đó `Save Module...` ghi đè vào file DLL gốc. Mình sửa hàm `OnMouseUpAsButton` ở trên thành thế này:

![](https://images.viblo.asia/full/687b5fb7-32f7-42cc-ae41-b7511bbd5931.png)

và chạy:

![](https://images.viblo.asia/full/c4e912d4-11aa-4621-abe9-4b2a64f10271.png)

hoá ra là bàn đã được quay 90 độ so với dữ liệu gốc, giờ thì:

![](https://images.viblo.asia/001893c7-a6a2-47a8-b2e7-6b0804aae8ce.gif)

# Outros

Hi vọng mọi người đã học thêm được chút gì đó từ bài viết này:
- Reverser: cách tiếp cận và RE một game bằng Unity. Có lẽ sẽ cần thêm 1 bài viết nữa về RE với trường hợp libil2cpp.so :smirk: 
- Game Developer: hiểu được cách thức RE để có biện pháp phòng vệ và ngăn chặn

See ya!
# References
- https://www.unknowncheats.me/forum/unity/285864-beginners-guide-hacking-unity-games.html
- https://github.com/Michidu/MonoInjector
- https://stackoverflow.com/questions/34447682/what-is-the-difference-between-update-fixedupdate-in-unity
- Official write-up: https://github.com/De1ta-team/De1CTF2019/tree/master/writeup/misc/Mine%20Sweeping