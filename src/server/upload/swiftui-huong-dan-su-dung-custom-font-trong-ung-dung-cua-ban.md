Vọc vạch được SwiftUI một tí, mình nảy ra ý tưởng muốn thêm một Font nào đó để làm đẹp các Text hiện trên giao diện mà mình đã làm. Nhưng trời đã tối khuya, lúc đó mắt nhắm mắt mở rồi, nên sau khi set up xong các yêu cầu, Text vẫn không đổi. Mình đã phải mở thêm con mắt đã nhắm, mất vài chục phút để kiểm tra lại các bước để tìm ra nguyên nhân tại sao nó không work. Và sau khi nó work, mình quyết định viết bài này để hướng dẫn các bạn apply Custom Font vào project của bạn và chỉ ra chỗ khiến mình phải loay hoay nhiều lần(có thể thêm nhiều người khác nữa) mới phát hiện ra chỗ sai.

### 1. Khởi tạo Project (hoặc sử dụng project có sẵn): ### 
Đầu tiên, bạn mở XCode và chọn **“Create a new Xcode Project”**. Sau đó, chọn **“Single View App”**

![](https://images.viblo.asia/1591ef51-4bde-46bd-8871-3a37f8f4265f.jpg)

Nhấn “Next” và đặt tên cho Product của bạn. Ở đây, bạn chắc chắn phải chọn **Language** là **Swift** và **User Interface** là **SwiftUI**

![](https://images.viblo.asia/d68ccb8a-669b-4ba1-8ba2-c07ffae0592d.jpg)

Nhấn “Next” và chọn nơi lưu thư mục project, sau đó bạn nhấn “Create”. Sau khi tạo project xong, bạn nhấn “Review” ở bên góc phải màn hình để xem preview project hiện tại.

![](https://images.viblo.asia/c676e18d-f0ed-4564-9cb4-31e00d293586.jpg)

### 2. Thêm các Custom Font vào project của bạn: ### 

Đầu tiên, copy toàn bộ font mà bạn muốn sử dụng vào project của bạn. Hiện tại, SwiftUI đang support cho 2 loại format file là **“.otf”** và **“.ttf”** .

Tạo 1 group đặt tên là **“fonts”** và **“drag”** toàn bộ font bạn muốn sử dụng vào folder mới tạo

LƯU Ý!!!

Khi bạn kéo thả các item vào folder **“fonts”**, XCode sẽ hiện lên 1 dialog. Và bạn chắc chắn rằng mình phải check vào ô **“Add to targets”**, nếu không thì loay hoay mãi như mình tìm hoài không biết tại sao nó không hiện đúng font như mình mong muốn. Sau đó, bạn nhấn vào “Finish”.

![](https://images.viblo.asia/840f7f9d-fedb-45ff-a3d2-e0f98849ca18.jpg)

### 3. Thêm các Custom Font vào file Info.plist: ###
Toàn bộ font bạn muốn sử dụng đã được thêm vào project. Bây giờ, bạn phải khai báo chúng trong file **Info.plist** để sử dụng trong project của bạn.

Nhấn vào icon “+” và search key **“Fonts provided by application”** và nhấn “Enter”. Giá trị tương ứng của Key trên là một mảng chứa khai báo toàn bộ font được sử dụng.

![](https://images.viblo.asia/499fc188-b425-487c-9e82-ebae9fb8603e.jpg)

Việc tiếp theo của bạn chỉ là tạo ra các item tương ứng với số lượng các font bạn muốn sử dụng

![](https://images.viblo.asia/06b59c70-8f1a-4775-a811-61946bdda38a.jpg)

### 4. Sử dụng Custom Font trong app: ### 
Giờ đây bạn đã có thể sử dụng Font để hiện lên giao diện bằng cách gõ lại đúng chính xác font mà bạn muốn sử dụng.

TIME TO SHOW OFF!!!

![](https://images.viblo.asia/e7471365-1103-4aba-9789-6681f6430228.jpg)

Nếu bạn muốn xem được những bài viết chất lượng, hay thảo luận những kiến thức, chia sẻ hiểu biết của bạn đến mọi người, hãy tham gia group của bọn mình trên [Facebook](https://www.facebook.com/groups/2753546238005745/) nhé: ^^