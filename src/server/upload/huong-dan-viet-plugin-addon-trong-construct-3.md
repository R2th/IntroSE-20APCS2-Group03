Để viết plugin trong Construct 3 sử dụng các framework native (android /ios) thì sẽ làm như thế nào ?

## Các bước làm plugin (Addon) Construct 3:

* Tạo Addon Cơ bản với các function cần thiết để phía Construct 3 sẽ gọi. ( Ở đây sẽ gọi tới plugin ngoài được tạo ra từ plugin Cordova)
* Config để khi export proj sang Cordova thì tự động thêm plugin Cordova.
* Tạo plugin bên Cordova để giao tiếp với các framework native ( android & ios)
* Trong khi tạo plugin thì tạo proj Cordova để test các function chạy ở native ( android / ios)
* Sau khi các function hoạt động thì mới chạy trên proj Cordova được export từ plugin Construct 3.

## CẤU TRÚC THƯ MỤC ĐỂ TẠO NÊN PLUGIN LÀ NTN?
```sql
-- _config.yml
-- package.json
-- plugin.xml
-- scripts
    -- after_prepare.js
    -- ios
        -- after_plugin_install.js
        -- before_plugin_install.js
        -- before_plugin_uninstall.js
        -- helper.js
    -- lib
        -- utilities.js
-- types
-- www
    -- firebase.js
```

### Android:
```sql
-- src
    -- android
        -- build.gradle
        -- color.xml
        -- cordova-plugin-firebase-strings.xml
        -- FirebasePlugin.java
        -- FirebasePluginMessageReceiver.java
        -- FirebasePluginMessageReceiverManager.java
        -- FirebasePluginMessagingService.java
        -- JavaScriptException.java
        -- OnNotificationOpenReceiver.java
```
CÁCH THỨC ĐỂ OVERRIDE CONFIG: BẰNG CODE JS TỪ CÁC CONFIG.XML
Thêm permission vào mainifest file:
```html
<config-file target="AndroidManifest.xml" parent="/*">
    <uses-permission android:name="android.permission.READ_CONTACTS" />
</config-file>
```
Bật tắt permission runtime:
```csharp
cordova.requestPermission(CordovaPlugin plugin, int requestCode, String permission);
```
Ví dụ với Permission READ CONTACTS như sau:
```java
public static final String READ = Manifest.permission.READ_CONTACTS;

public static final int SEARCH_REQ_CODE = 0;

// Khi thực hiện code logic cần permission thì check:
if(cordova.hasPermission(READ))
{
    search(executeArgs);
}
else
{
    getReadPermission(SEARCH_REQ_CODE);
}

// Code để xin cấp quyền permission như sau:
protected void getReadPermission(int requestCode)
{
    cordova.requestPermission(this, requestCode, READ);
}
```
Sau khi người dùng cấp quyền permisson thì sẽ có callback trả về & mỗi plugin Cordova phải implement nó:
```cpp
public void onRequestPermissionResult(int requestCode, String[] permissions,
                                         int[] grantResults) throws JSONException
{
    for(int r:grantResults)
    {
        if(r == PackageManager.PERMISSION_DENIED)
        {
            this.callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, PERMISSION_DENIED_ERROR));
            return;
        }
    }
    switch(requestCode)
    {
        case SEARCH_REQ_CODE:
            search(executeArgs);
            break;
        case SAVE_REQ_CODE:
            save(executeArgs);
            break;
        case REMOVE_REQ_CODE:
            remove(executeArgs);
            break;
    }
}
```

Có thể xin cấp permission cho 1 group permission:
```javascript
String [] permissions = { Manifest.permission.ACCESS_COARSE_LOCATION, Manifest.permission.ACCESS_FINE_LOCATION };
```

Khi đó sẽ gửi request để cấp group permission như sau:
```javascript
cordova.requestPermissions(this, 0, permissions);
```

#### Cách thức add Framework để hoạt động trong codorva. ( Nghiên cứu về Firebase Plugin)

Trực tiếp thông qua framework đến bundled library:
```xml
	<platform name="android">
    ...
    	<config-file parent="/*" target="res/xml/config.xml">
			<feature name="FirebasePlugin"><param name="android-package" value="org.apache.cordova.firebase.FirebasePlugin" /></feature>
		</config-file>
		<config-file parent="/*" target="AndroidManifest.xml"></config-file>
		<source-file src="src/android/FirebasePlugin.java" target-dir="src/cordova-plugin-firebase/FirebasePlugin" />
		<framework src="com.google.firebase:firebase-messaging:9.0.+"/>

    ...
	</platform>
```
Hoặc cấu hình framework thông qua việc tùy chỉnh `.gradle` file như sau:
```go
<framework src="relative/path/rules.gradle" custom="true" type="gradleReference" />
```
Xem thêm ở đây : link : cordova.apache.org/docs/en/latest/plugin_ref/spec.html#framework

### Nghiên cứu Plugin trong Construct3:

#### Các chú ý khi làm việc với addon:

- property variable : https://www.construct.net/en/make-games/manuals/addon-sdk/reference/pluginproperty

##### Ở chế độ developer:

xem thêm : https://www.construct.net/en/make-games/manuals/addon-sdk/guide/enabling-developer-mode

> Mở setting
> Click vào Settings nằm ở trên cùng 10 lần
> Kéo xuống list advance dưới cùng và chọn enable developer.
> Khởi động lại construct 3 là ok

##### Hướng dẫn làm việc với debug mode

Xem thêm: ( http local : https://www.construct.net/en/make-games/manuals/addon-sdk/guide/using-developer-mode)
Mục đích để test nhanh hơn.

Các Bước Thực hiện:

* 1. Bật Chế độ debug như trên
* 2. Tạo 1 web local server:

  * tạo ở địa chỉ localhost và port nên từ : 49152-65535
  * local web service phải truy cập được đến tất cả các file addon với CORS (Cross-Origin-Resource-Sharing) được bật lên cho Construct3 để load nó.

    * add HTTP header để server response: `Access-Control-Allow-Origin: *`
    * nếu dùng NginX: `add_header Access-Control-Allow-Origin *;`
  * kiểm tra để bỏ cache ở local server để luôn lấy về được addon mới nhất.
* 3. Sau khi config server xong: thì cập nhật content ở host theo cấu trúc thư mục của c3addon: xem thêm : https://www.construct.net/en/make-games/manuals/addon-sdk/guide/c3addon-file

  * vd với link sau : http://localhost:65432/myaddon/addon.json
  * > Note: Chrome may block access to localhost since it treats it as mixed content from editor.construct.net (which is on a secure origin). You can work around this by running a secure server on localhost instead, using a self-signed certificate.
* 4. update lại file addon.json để có đầy đủ list file

  * Bình thường các file được giải nén từ .c3addon thì Construct3 có thể nhận ra được các file trong đó
  * Khi loading thông qua web service thì cần phải cấu hình lại nên phải update lại addon.json. Xem ở đây: https://www.construct.net/en/make-games/manuals/addon-sdk/guide/addon-metadata
  * file-list có thể giữ lại khi release mode.
* 5. Nhấn vào add dev addon & gõ địa chỉ local host vào . `http://localhost:65432/myaddon/addon.json`
* 6. Khi muốn test lại feature mới nhất của addon, thì chỉ cần reload lại construct 3

#### Cấu truc folder plugin c3addon:

* c2runtime/ — subfolder for Construct 2 runtime files. thông thường chỉ chứa file: runtime.js. Dành cho construct 2.
* c3runtime/ — subfolder for Construct 3  file thực thi cho addon.
* lang/en-US.json — ngon ngữ để thể hiện ra trong addon.
* aces.json — JSON để định nghĩa các: actions, conditions & expressions.
* addon.json — JSON data file : chứa meta data của addon.
* icon.svg — addon icon.
* plugin.js hoặc behavior.js — class đại diện cho plugin hoặc behavior
* type.js — thể hiện các object type trong plugin / bahavior
* instance.js — lớp đại diện cho plugin / behavior ( instance)

###### Chú ý về các file:

* aces.json : nhiều phần quan trọng: https://www.construct.net/en/make-games/manuals/addon-sdk/guide/defining-aces
*

## Chú ý khi code plugin:

* thống nhất việc dùng `.` hay string để truy cập đến object json. như vd :

```javascript:js
const obj = {};
obj.myproperty = 1;
console.log(obj["myproperty"]); // This case is wrong after minification  , nen dung obj.myproperty luon
```

* trường hợp gọi tới API phía bên ngoài, thì function phải giữ nguyên, ko được minification nên sẽ dùng string để ko thay đổi function. vd 

```markdown:js
api["myFunctionCall"](); // gọi như thế này.
```

* dùng cách này để truy cập đến biến toàn cục: 

```rust:js
self["MyGlobalAPI"]
```

* Khi construct3 chạy bị crash bởi tool thì sử dụng SAFEMODE để remove tool ra: truy cập vào link: editor.construct.net/?safe-mode

## Chuyên sâu về plugin:

* https://www.construct.net/en/make-games/manuals/addon-sdk/guide/defining-aces

## NGINX

* trên mac nginx được lưu ở: `/usr/local/cellar/nginx`
* lệnh chạy nginx: `launchctl load /usr/local/cellar/nginx/1.19.1/homebrew.mxcl.nginx.plist` 
* lệnh stop nginx: `launchctl unload /usr/local/cellar/nginx/1.19.1/homebrew.mxcl.nginx.plist`
* nginx chạy default ở : `http://127.0.0.1:8080`

> Add configs in -> /usr/local/etc/nginx/servers/
> Default config -> /usr/local/etc/nginx/nginx.conf
> Logs will be in -> /usr/local/var/log/nginx/
> Default webroot is -> /usr/local/var/www/
> Default listen address -> http://localhost:8080
> Disable Cache nginx: http://ubiq.co/tech-blog/disable-nginx-cache/

https://cordova.apache.org/docs/en/latest/plugin_ref/plugman.html

## Tao plugin Cordova:

### Tao plugin

```shell
plugman create --name pluginName --plugin_id pluginID --plugin_version 0.0.1
```

### Để cài đặt vào proj cordova phải thêm package.json:

```ruby
plugman createpackagejson /path/to/your/plugin
```

### Tao proj cordova de test:

* 1. npm install -g cordova
* 2. cordova create hello com.example.hello HelloWorld
* 3. Add platform can : android / ios
     `cordova platform add android`
* 4. Kiem tra lai: `cordova platform ls`
* 5. Kiem tra cac yeu cau ve du an de build platform day du chua: cordova requirements
* 6. Build du an: `cordova build` hoac theo tung platform `cordova build android`..
* 7. test tren emu: `cordova emulate android` hoac chay truc tiep `cordova run android`
* 8. Add plugin: `cordova plugin search camera`: search ra cac plugin! De add & save vao package.json thi dung lenh `cordova plugin add cordova-plugin-camera`

### Test tren android:

* 1. Run emulator android: `Users/quile/Library/Android/sdk/emulator/emulator -list-avds` sau khi kiem tra co list device, dung lenh duoi de chay
     `/Users/quile/Library/Android/sdk/emulator/emulator -avd Pixel_2_API_29 -netdelay none -netspeed full`

### Kiem tra plugin & project test co ok ko:

`plugman install --platform ios --project /path/to/my/project/www --plugin /path/to/my/plugin` -> bi loi

### install plugin sau khi finish vao proj cordova:

`cordova plugin add cordova-plugin-camera`

### Quan trong nhat

* Tong quan ve Plugin trong voi cordova https://cordova.apache.org/docs/en/latest/guide/hybrid/plugins/index.html
* Android Plugin: https://cordova.apache.org/docs/en/latest/guide/hybrid/plugins/index.html

## Chu y khi tao proj voi cordova:

Co 2 cách tạo proj: 

1. Tạo proj với cross-platform : cordova cli ... ko thể sử dụng plugman
2. Tạo proj riêng tách biệt để có thể implement SDK & debug, chuyên sau về từng platform. Dùng plugman cli để tạo proj ...

   * https://cordova.apache.org/docs/en/3.5.0/guide/platforms/android/index.html

## Cách để add được params vào Action trong Plugin Construct 3

1. file aces.json định nghĩa param trong action:

```json
...
"action" :[
...
{
  "id": "do-action",
  "scriptName": "Action",
  "highlight": false,
  "params": [
      {
          "id": "number",
          "type": "number"
      }
  ]
}
]
...
```

2. Cấu hình file lang: lưu ý là phải có display-text : cấu hình như dưới mới ko bị lỗi khi add param number.

```json
...
"actions": {
"do-action": {
      "list-name": "Do Action",
      "display-text": "[i]{0}[/i] is a large number",
      "description": "Do Action ABCD",
      "params": {
          "number": {
              "name": "Number",
              "desc": "The number to double."
          }
      }
  }
}
...
```

3. c3runtime folder file: actions.js

```cpp:js
Action(number)

{

alert("Call Do Action Function = " + number);

},
```

## Cách để export build từ Construct 3 qua project dưới dạng Cordova có tích hợp SDK Cordova:

### Cấu hình Addon ( Plugin) trong Construct 3 như sau:

Ở file plugin.js: add như sau

```css:js
//constructor()
constructor(){
...
this._info.AddCordovaPluginReference({
    id: "cordova-plugin-device"
});
...
}
```

Trong đó `cordova-plugin-device` là tên plugin mà cordova support.

Ở dưới sẽ sử dụng plugin `cordova-plugin-gameanalytics` để demo code implement logic cho action.js

Define các actions cần thiết theo hướng dẫn của cordova plugin, và trong code của action sẽ gọi đến plugin của cordova như sau:

actions.js

```javascript
//Cần hàm khởi tạo sdk
init()
{
  if(typeof window["GameAnalytics"]["initialize"] == "function"){
    var ga = window["GameAnalytics"]
    // lúc này có thể sử dụng được biến ga...
  }
  else if(typeof window["gameanalytics"]["GameAnalytics"] != "undefined")
  {
    var ga = window["gameanalytics"]["GameAnalytics"];
    //...
    ga["initialize"](this._gameKeyBrowser, this._secretKeyBrowser);
  }
  else{
    console.log("initialize: GameAnalytics object not found");
    return;
  }
}
```

Các function được gọi từ api ngoài ko được minification, nên phải gọi thông qua : `ga["function"](var1,var2)`

### Các bước chạy proj ở dạng Cordova sau khi export từ Construct 3:

Khi đã build ra được proj dưới dạng cordova thì chạy lệnh:

```scala
cordova prepare
```
Lệnh này để khởi tạo & download các sdk cordova cần thiết theo cấu hình từ Construct3.

```python
cordova requirements
```

Kiểm tra các tools để sẵn sàng để tiến hành build android / ios chưa.

```markdown
cordova build android

// hoặc
cordova build ios
```

Để build ra từng platform.

More info: [https://blog.quilv.com/blog](https://blog.quilv.com/blog)