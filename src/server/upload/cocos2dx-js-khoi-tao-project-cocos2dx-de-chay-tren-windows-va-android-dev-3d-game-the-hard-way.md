# Intro
![](https://images.viblo.asia/1bbeee9d-155a-4e15-8cf2-e0f870646bb6.png)

Cocos2dx là một engine game khá thông dụng tuy đã ra đời từ rất lâu. Bài này không chi tiết về engine để không dài dòng, dành cho các bạn "mình dùng nó vì mình thích nó" :D 
Tuy vậy cũng nên liệt kê ra một số ưu nhược điểm của bạn này:
### Ưu điểm
* **Nhẹ**: Tool build và mọi thư viện của engine này chỉ nặng chưa đến 300MB.
* **Nhanh**: Cả về thời gian tải engine :joy: lẫn tốc độ phát triển ra một game và tốc độ chạy. Do nhẹ mà, làm cái gì cũng nhanh. Hỗ trợ code bằng JS nên gõ ít được nhiều, có thể tập trung nhiều hơn vào nội dung hơn syntax.
* **Khá đủ**: Có hỗ trợ hầu hết các thành phần mà 1 game engine cần có. Hỗ trợ 2D, 3D (hơi dởm nhưng đủ dùng), call GL để tuỳ biến sâu hơn (nhưng cũng cần tìm hiểu khá nhiều), physics, collider vân vân và mây mây.
* **Đa nền tảng**: Cái này khá quan trọng, 1 code dùng cho cả win, android và ios thì tiện khỏi bàn để các bạn share game của mình đến toàn thế giới. Nhưng lợi ích thiết thực hơn là bạn không lo không có thiết bị để test.
* **Nhiều nữa**: Thôi thì nhiêu đây cũng đủ tốt rồi nên nếu bạn thích sự gọn nhẹ và muốn làm game mì ăn liền (vẫn ngon nhá) thì nên chọn cocos để bắt đầu.
### Nhược điểm
* **Document**: Tìm kiếm hỗ trợ và tài liệu cho cocos giai đoạn đầu có lẽ khá dễ với bất kì ai biết cách dùng google. Tuy nhiên hầu hết các discuss bạn tìm thấy ở [Cocos Forum](https://discuss.cocos2d-x.org/) hay [Cocos2DX Reference](https://docs.cocos2d-x.org/api-ref/js/v3x/) đều đã được tạo từ ít nhất là 3 năm về trước và thậm chí một số hàm còn chả có gợi ý là nó sẽ làm gì. ![Useful Documents](https://images.viblo.asia/6528a40d-bea0-4937-8500-7cf389540870.png)Các tài liệu xịn xò hơn chủ yếu là dành cho Cocos Creator, dùng gần như cùng 1 API nhưng cũng là một công cụ không hẳn là cocos2dx.
* **Giao diện**: Nếu bạn dùng cocos2dx đồng nghĩa với việc bạn sẽ không có giao diện người dùng. Điều này sẽ cản trở khá nhiều người mới làm quen. Tuy nhiên với một số thủ thuật thì người căm ghét giao diện dòng lệnh như mình cũng có thể thao tác khá nhanh.
* **Ít cập nhật**: Nghĩa là bạn phải dùng công nghệ cũ và sẽ có một số trò mới mẻ hay ho mà bạn phải mò mẫm mất mấy ngày để làm được trong khi engine khác chỉ cần dùng 1 dòng lệnh

# Mục tiêu
Sau bài này (mình hy vọng) các bạn có thể demo ra được một project 3D nhỏ bằng cocos2dx. Và cũng dành cho các bạn muốn tập tành học engine này vì "nghe nhiều người nói" nhưng làm theo bất kì hướng dẫn nào trên mạng cũng không chạy được Hello World :cry: vì đủ kiểu lỗi lầm và thông báo ngớ ngẩn của cocos. Cuối cùng cũng là một cách để mình ~~test bàn phím mới~~ có thể ghi nhớ, vì quả thật setup cái cocos này trên các máy tính của năm 2020 quá là khó khăn. Tuy nhiên sau khi vượt qua thì bạn sẽ thấy cocos là một engine khá hay và "mạnh mẽ" bất chấp sự nhỏ gọn của nó.
Đặt cái demo lấy tinh thần nhé: {@embed: https://www.youtube.com/watch?v=9xzpeUs5V2o}
# Chuẩn bị
Tuỳ vào bạn muốn build hướng đến nền tảng nào mà có thể lược bỏ một số phần ở đây. Mình sẽ hướng dẫn cách build trên Windows 10 và Android vì đây cũng gần như là 2 nền tảng thông dụng nhất khi bạn muốn release một con game. Web sẽ được hướng dẫn ở một bài sau (mong thế :D).

* Cocos2dx-JS 3.17.2: https://www.cocos2d-x.org/download# là bản stable mới nhất của cocos 3. Cocos 4.0 đã có nhưng hơi hạn chế về ngôn ngữ và platform release nên tốt nhất cứ chơi với 3.17 đã.
* Python 2.7 (phải là bản 2.7 nhé, Python 3 không chạy được script của cocos): [Trang download python 2.7](https://www.python.org/download/releases/2.7/)
* Visual Studio Code: https://code.visualstudio.com/ hoặc bất kì edit nào bạn thích.
* [Android] Android SDK, NDK: Download Android Studio tại [đây](https://developer.android.com/studio). 
    * Cài đặt như bình thường
    * Vào Tools->SDK Manager và tích chọn + cài đặt các tool sau: 
        * SDK Platform: Chọn phiên bản android máy bạn dùng
        * SDK Tools: Android SDK Command-line Tools, Android SDK Build-Tools, CMake, NDK (Side-by-side).
* [Android] JDK: Bản nào cũng được, download ở [đây](https://www.oracle.com/java/technologies/javase-downloads.html)
* [Android] Ninja: 1 cái tool build mà cocos dùng cho Cmake. Download ở [đây](https://github.com/ninja-build/ninja/releases). 
    * Bạn cần thêm nó vào path của windows để nó có thể được gọi từ cocos.
    * Control Panel -> System -> Advance system settings -> Chọn tab Advance -> Environment Variables.
    * Ở phần System Variables tìm đến dòng Path, chọn Edit
    * New -> Chép đường dẫn đã giải nén Ninja vào  ![](https://images.viblo.asia/c1e53505-4ed7-47e5-bf51-7efb8ba1ea7a.png)

* [Win32] Visual Studio 2017 (Các bản mới hơn không build được). Cái này các bạn tự tìm tải nhé, mình không post link crack đâu :D. Nếu dùng Visual Studio Installer thì tick vào mục: Desktop development with C++. Phần Installation Details các bạn đảm bảo có tick vào các tools sau, các phần có sẵn thì để đấy:
    * Windows 10 SDK (<phiên bản nào cũng được, càng mới càng tốt>)
    * VC++ 2017 version 15.9 .... v141 tools

# Cài đặt
* Cài đặt python 2.7, nhớ tick tuỳ chọn cho nó tạo PATH trên windows. Cài đặt Android Studio, Visual Studio theo chuẩn bị ở trên
* Tạo một thư mục để chứa toàn bộ source của cocos và project của bạn trên máy. Trong ví dụ mình để là `E:\GameDev`, các bạn để đường dẫn khác thì tự thay vào nhé.
* Giải nén cocos2d-x-3.17.2 vào đó
* Ấn Win+R -> "cmd" -> Enter để sử dụng dòng lệnh.
``` cd E:/GameDev/cocos2d-x-3.17.2
python setup.py 
```

Đến đây nó có hỏi hoặc báo sai đường dẫn gì thì mặc kệ nó, đảm bảo các PATH sau được cài đặt thành công là được: COCOS_CONSOLE_ROOT, COCOS_X_ROOT, COCOS_TEMPLATES_ROOT ![Setting up cocos](https://images.viblo.asia/56ecb99c-bef3-4f09-917c-2ca26024d992.png)

Tắt màn hình console cũ đi để windows cập nhật đường dẫn mới, sau đó có thể bắt đầu vào công việc chính: code ra con game đầu tiên.

# Chạy test
À mình đi hơi nhanh rồi, trước tiên các bạn nên xem một số ví dụ mẫu tuyệt vời mà cocos đính kèm trong framework. Để xem cocos có thể làm gì và hỗ trợ được những gì. Đây cũng là code mẫu để các bạn đọc và tham khảo khi muốn làm một tính năng gì đó. Trong đây có đầy đủ code để tạo ra một game xịn xò, tuy nhiên không phải ai cũng đủ kiên nhẫn để đọc hết tất cả các test trong đó.

Các bạn dùng VS Studio mở file `E:\GameDev\cocos2d-x-3.17.2\build\cocos2d-win32.sln`. Tìm đến bấm F5 để chạy thử. Giao diện test của cocos khi build thành công sẽ như sau
![cpp-test](https://images.viblo.asia/e5a65bd4-0d51-4a2b-ae81-8aeb3748bccf.png)

Tuy nhiên có thể các bạn sẽ gặp lỗi này lúc chạy: `Compile error Cannot open libcurl.lib`

Để fix các bạn tiến hành build từng project trong solution theo thứ tự sau (cái nào không có thì bỏ qua)
1. libbox2d
2. libbullet
3. librecast
4. libSpine
5. libcocos2d
6. libluacocos2d
7. libjscocos2d

Sau đó ấn F5 để chạy lại. Test mặc định khi chạy project này là cpp-test, các bạn có thể chạy thử js-test bằng cách chuột phải project js-tests->Set as StartUp Project
![js-test](https://images.viblo.asia/ebd5a18e-c8c2-4fdf-9cd8-7585730f86fb.png)

Các bạn chơi thoải mái trong test này trước khi bắt tay vào tự tạo một project cho mình.
# Tạo project
Trong thư mục `E:\GameDev\` bật cửa sổ console nhanh bằng cách ấn vào thanh địa chỉ của Windows Explorer và gõ cmd -> Enter
```
cocos new First3DProject -l js -p com.chikido.myfirstproject
```
Chú thích: 
* `First3DProject` là tên project bạn tạo. Cocos sẽ tạo một thư mục cùng tên trong GameDev và chứa toàn bộ mã nguồn cũng như tài nguyên của game bạn trong đấy
* `-l js` chỉ định ngôn ngữ của project bạn là Javascript
* `-p com.chikido.myfirstproject` là tên package khi bạn build ra apk cho Android. Nếu không quan tâm thì bỏ trống cũng được

Đợi một tẹo cho cocos copy các thư viện cần thiết, bạn sẽ được một thư mục tương tự hình. Bao gồm các thư mục:
* `framework` chứa các mã nguồn + thư viện của cocos để dịch ra các platform khác nhau
* `src` chứa mã nguồn javascript của game bạn
* `res` chứa tài nguyên (hình ảnh, model, âm thanh...) của bạn
![Cocos Project](https://images.viblo.asia/b7a2993d-2495-4d57-a994-954e59a00f79.png)

Để chạy thử, bạn có các cách sau:
* Ở thư mục gốc project, bật commandline và chạy lệnh `cocos run -p win32` hoặc `cocos run -p android`. *(Không khuyến khích cách này do nó không hiện log cũng như có một số lỗi mình chưa biết cách fix :cry: )*
* Dùng VS Studio mở project ở đường dẫn `framework/runtime-src/proj.win32` và ấn F5
* Dùng Android Studio mở project ở đường dẫn `framework/runtime-src/proj.android` và cắm điện thoại, ấn Shift+F10
![](https://images.viblo.asia/31d10835-4f3f-4083-9108-a0f42c20915a.png)

## Một số lỗi có thể gặp phải 

Lần đầu chạy cocos của mình cực kì gian nan do nó báo lỗi tùm lum cả. Sau đây là một số lỗi có thể gặp trong quá trình chạy Hello World
### ` 'C:\Program' is not recognized as an internal or external command, operable program or batch file. `
Lỗi này do tool parse của cocos không tương thích với kiểu dòng lệnh trên windows command line. 
Tìm file `E:/GameDev/cocos2d-x-3.17.2/tools/cocos2d-console/plugins/plugin_compile/project_compile.py`, tìm đến dòng 1113 và sửa 2 block code thành 
```
            # upgrade projects
            if needUpgrade:
                commandUpgrade = ' '.join([
                    "\"\"%s\"" % commandPath,
                    "\"%s\"" % sln_file,
                    "/Upgrade\""
                ])
                self._run_cmd(commandUpgrade)

            # build the project
            commands = ' '.join([
                "\"\"%s\"" % commandPath,
                "\"%s\"" % sln_file,
                "/Build \"%s\"" % build_mode,
                "/Project \"%s\"\"" % project_name
            ])

            self._run_cmd(commands)
```
![](https://images.viblo.asia/3bd860cc-ff20-41c6-bc39-a2aa186e6236.png)
### CMake was unable to find a build program corresponding to "Ninja"
Khi mở project bằng Android studio có thể các bạn gặp lỗi này, cài Ninja như phần chuẩn bị là ổn.

Còn nữa nhưng mình quên mất rồi thì các bạn có thể contact với mình để mình update thêm nhé
## Xây dựng một Scene 3D
Cuối cùng cũng đến với phần "chính" của bài viết này. Chúng ta sẽ thêm một bé gái (wjbu intensifies) dễ thương vào cảnh và dùng camera của cocos để soi mọi góc độ :D

Resource: download ở [đây](https://drive.google.com/file/d/1V0We0URHMSZi_grW86E7kRJwHD7U7L94/view?usp=sharing)
Giải nén và chép vào thư mục res là resource của các bạn có thể sẵn sàng để dùng rồi.

Các mã nguồn của game đều nằm trong thư mục `src` (trừ file main.js, nhưng trước tiên cứ kệ nó đi đã).

Đầu tiên các bạn mở file resource.js và thêm tài nguyên chúng ta vừa add vào đối tượng `res`
```
var res = {
    HelloWorld_png : "res/HelloWorld.png",
    girl : "res/girl.c3b"
};
```
res là đối tượng global trong project chúng ta, sau này, mỗi cảnh cần khởi tạo bé gái chúng ta cứ việc dùng đến biến `res.girl` là xong.

### Layer và Scene
Sau đó các bạn vào file app.js và tìm hiểu xem nó có gì trong đấy. Đọc hết file (nhanh mà) sẽ thấy có hai class chính là HelloWorldScene và HelloWorldLayer. 

Đúng như tên gọi của nó, HelloWorldScene thuộc class Scene và HelloWorldLayer thuộc class Layer. Một game có thể có nhiều Scene (các bàn chơi khác nhau) nhưng chỉ có thể có 1 bàn chơi được chơi vào 1 thời điểm. Trái lại trên 1 Scene ta có thể chia thành nhiều Layer khác nhau để dễ quản lý (Layer UI, Layer nhân vật, Layer Popup, v.v.). Bé gái của chúng ta sẽ được đặt vào Layer (chứ không phải Scene). 

Chúng ta không cần đến cái logo và dòng hello world nữa nên hãy xoá hết mọi dòng trong hàm của HelloWorldLayer đi và đổi tên lại tuỳ thích (nhớ đổi lại lời khởi tạo ở HelloWorldScene cho đồng nhất luôn nhé, không là không chạy được đâu). Chỉ để lại cái khung như sau:
```
var GameLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
    }
});
```

### Sprite 3D
Đây là phần tối thiểu một layer cần có để nó khởi tạo được không lỗi. Bây giờ bắt đầu thêm Sprite3D. Sau `this._super();` các bạn thêm vào các dòng sau
```
let girl = new jsb.Sprite3D(res.girl);
girl.setPosition3D(cc.math.vec3(0,0,0));
this.addChild(girl);
```
Sau khi chạy các bạn sẽ thấy một màn hình đen thui. Tuy nhiên nhìn kĩ sẽ thấy bé gái đứng chênh vênh ở góc (như hình). Đó là do Cocos đặt gốc toạ độ của mọi đối tượng ở góc trái dưới của chúng. Dòng `this.addChild(girl)` sẽ thêm bé gái là một đối tượng con của GameLayer. GameLayer có thể hiểu là một hình chữ nhật trong suốt nằm phủ lên toàn bộ màn hình game, do đó ta thấy bé gái với toạ độ (0, 0, 0) sẽ nằm ở góc trái dưới. Các bạn thay toạ độ bằng số khác sẽ thấy bé gái dịch chuyển tương ứng. Dưới là 2 hình khi set toạ độ tương ứng là (0, 0, 0) và (100, 100, 0).
![](https://images.viblo.asia/aa080486-0d5d-4911-8336-5ea6098bfd4e.png)
![](https://images.viblo.asia/00e4475d-8fae-4b4c-a5e7-7265b89584ab.png)

### Camera
Để có thể nhìn bé gái rõ hơn, các bạn cần điều chỉnh camera (vị trí, góc nhìn) lại. Lưu ý là kể từ khi điều chỉnh camera thì toạ độ trên màn hình sẽ không còn là toạ độ 2 chiều nữa mà sẽ là toạ độ 3 chiều. Các bạn có thể tạm hiểu qua hình minh hoạ vẽ bằng Paint :D. Với toạ độ đen là toạ độ 3D thực và toạ độ màu xanh là hệ toạ độ của màn hình. Ta có thể thấy bé gái vẫn ở gốc toạ độ, nhưng khi thay đổi vị trí camera sẽ đưa bé vào giữa màn hình.
![](https://images.viblo.asia/7a355a98-911c-4b72-bd7a-18eb05661a85.png)

Thêm các dòng sau vào sau phần trên:
```
        let camera = cc.director.getRunningScene().getDefaultCamera();
        camera.setPosition3D(cc.math.vec3(0, 200, 500));
        camera.lookAt(cc.math.vec3(0, 0, 0));
```

Chúng ta lấy camera của cảnh bằng hàm getDefaultCamera(). Vì bản thân camera cũng là một đối tượng 3D nên chúng ta có thể đặt vị trí cho nó. Vị trí (0, 200, 500) sẽ là vị trí chếch lên trên và lùi ra xa so với bé gái. Hàm lookAt sẽ tự động xoay camera hướng về điểm đã định. Đến đây thì bạn có thể thấy bé ở một góc khác hơn so với góc nhìn "phẳng" lúc trước.

![](https://images.viblo.asia/74e6e650-7bc1-4d19-a58b-659090d5e13b.png)

OKAY! Đến đây coi như đã xong cảnh rồi. Tuy nhiên kết thúc demo như này có vẻ hơi chán nên chúng ta hãy cùng vọc thêm cách để soi được nhiều góc hơn nhé :D

### Bonus

Vì bé gái đang ở toạ độ gốc (0, 0, 0), do đó để nhìn được từ nhiều hướng ta chỉ việc cho camera di chuyển trên 1 hình tròn xung quanh bé gái. Hình tròn đó có tâm là (0, 200, 0). Tại sao? Vì chúng ta cần giữ camera ở một độ cao >= 200 để bài hướng dẫn này giữ được mục đích chia sẻ kinh nghiệm của nó :D

Mình dùng hàm schedule() để chạy một đoạn mã nào đó mỗi khung hình. Ở đây chúng ta sẽ cập nhật toạ độ của camera và hướng nó về phía bé gái.

Các bạn thêm đoạn mã sau phần trên 
```
        camera._totalTime = 0;
        let updateFunction = function(dt){
            let x = 500 * Math.sin(this._totalTime);
            let z = 500 * Math.cos(this._totalTime);
            this.setPosition3D(cc.math.vec3(x, 200, z));
            this.lookAt(cc.math.vec3(0, 0, 0));
            this._totalTime += dt;
        };
        camera.schedule(updateFunction.bind(camera));
 ```
 
 Nhìn có vẻ kinh khủng!! Nhưng khoan, hãy phân tích từ từ từng dòng code.
 
 Chúng ta lưu thời gian đã trôi qua bằng thuộc tính \_totalTime của camera. Mỗi khung hình hàm updateFunction sẽ tăng giá trị này lên theo tham số dt (chính là thời gian của khung hình đó). Nghĩa là, ví dụ bạn đạt 60FPS (mỗi khung hình 0.013s), ta sẽ có sau khung hình 1: camera.\_totalTime = 0.013, sau khung hình 2: camera.\_totalTime = 0.026... và cứ thế.
 
 Ta đã có một giá trị tăng dần theo thời gian, việc còn lại là đặt vị trí của camera theo giá trị đó. Và cách cổ điển nhất là dùng đến hình tròn lượng giác thần thánh. Toạ độ của một điểm trên đường tròn có tâm (0, 0) bán kính r với góc $\alpha$ chính là $(r * cos(\alpha), r * sin(\alpha))$. Góc x ở đây tăng dần sẽ tạo được một dãy điểm chạy trên đường tròn, và góc $\alpha$ đó chính là camera.\_totalTime chúng ta đã chuẩn bị!
 ![](https://images.viblo.asia/6b834ac8-18ef-4185-be48-3e98214ad3dd.png)
 
 Có thể các bạn sẽ thắc mắc tại sao lại là `this.setPosition3D(...)`, `this.lookAt(...)`. Đây là một "tính năng" của javascript. Khi bạn gọi một hàm với hàm bind(objectA), hàm đó sẽ được gọi trong ngữ cảnh của objectA (chính là camera của chúng ta).
 
 Tóm gọn lại, đoạn code trên sẽ tạo một thuộc tính mang tên \_totalTime cho camera. Tạo một hàm được gọi mỗi khung hình và cho camera gọi nó, hàm đó sử dụng thời gian được lưu để chuyển thành toạ độ trong không gian cho camera. Hết :D
 
 Thành phẩm đây (thêm quả bóng bên cạnh để bé gái không giống tự quay tại chỗ): {@embed: https://www.youtube.com/watch?v=_NjR2Z8B7DM}
 
Đến đây có lẽ bài đã khá dài rồi nhưng mình vẫn thấy có thể khiến bé gái sinh động hơn xíu nữa. Do đó chúng ta dùng tới Animation3D.

File resource girl.c3b của chúng ta có sẵn trong đấy một cái animation. Thêm đoạn code này vào dưới dòng `this.addChild(girl)`

```
        var animation = new jsb.Animation3D(res.girl);
        if(animation){
            var animate = new jsb.Animate3D(animation);
            girl.runAction(cc.repeatForever(animate));
        }
```

Đoạn code này làm gì? Load một animation từ file girl.c3b, kiểm tra nó có tồn tại không, nếu có thì để Sprite3D (là đối tượng 3D cô bé) chạy animation đó lặp đi lặp lại liên tục bằng hàm cc.repeatForever.
Và kết quả cuối cùng sẽ là: {@embed: https://www.youtube.com/watch?v=9xzpeUs5V2o}

Chúc các bạn thành công! Bài sau (nếu có) sẽ nói về cách đổ bóng cho mọi thứ trông thật hơn.