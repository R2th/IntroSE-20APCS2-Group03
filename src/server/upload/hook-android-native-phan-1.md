![](https://images.viblo.asia/4464baa5-9d3b-4a8f-9375-e0b6125f46c1.png)

Lâu lắm rồi mình mới tiếp tục được series các bài viết về pentest Android. Cách đây khoảng hơn 2 năm, mình đã viết một bài [write up challenge UnCrackable Level 1 của OWASP](https://viblo.asia/p/write-up-owasp-uncrackable-level-1-luyen-tap-co-ban-ve-hooking-functions-bang-frida-va-chen-smali-code-LzD5dgb4ljY), trong bài viết này mình đã đề cập đến việc sử dụng kỹ thuật hook để làm 2 việc:
- Bỏ qua cơ chế kiểm tra thiết bị root, ngăn ứng dụng tự ngừng hoạt động khi phát hiện được chạy trên thiết bị root.
- Hook vào chương trình và thực thi lại hàm giải mã để nhận được kết quả sau khi giải mã.

Có thể nói rằng: nếu như đã làm CTF dạng bài mobile/android hoặc làm pentest mobile thì chắc chắn không thể thiếu kỹ năng hook được. Chúng ta có thể dùng kỹ năng hook khi muốn bypass một số cơ chế bảo mật của ứng dụng, ví dụ như: kiểm tra thiết bị root, kiểm tra môi trường giả lập, kiểm tra mã OTP, kiểm tra ID thiết bị,... Các lập trình viên Android có thể sẽ sử dụng những thư viện "native" để làm những việc trên, mà cách hook vào các hàm Native này lại có chút khác biệt so với việc hook vào những hàm được viết bằng Java.

Vì vậy, trong bài viết này chúng ta sẽ cùng thảo luận về những cách để có thể hook vào được thư viện Native trong một ứng dụng Android bằng công cụ quen thuộc: Frida.

# 1. Android Native Library
Đầu tiên chúng ta cần biết thư viện Native là gì, tại sao người ta lại sử dụng nó, và cơ chế hoạt động của nó ra sao.

Hiện nay khi nói đến việc tạo ra một ứng dụng Android thì người ta thường nghĩ đến sử dụng ngôn ngữ lập trình Java, Kotlin, Flutter, React Native. Nhưng bên cạnh các ngôn ngữ trên, một ứng dụng Android vẫn có những phần có thể viết bằng C/C++. Những phần này được gọi là Native code.

Một ứng dụng Android có thể được tạo thành từ 2 ngôn ngữ lập trình khác nhau, ví dụ như Java và Native code. Các ngôn ngữ khác như Kotlin, Flutter theo mình tìm hiểu thì cũng có thể làm được tương tự như Java. Java, Kotlin, Flutter sẽ đảm nhiệm phần chính trong việc tạo ra giao diện của ứng dụng, còn phần code Native C/C++ sẽ làm các phần xử lý tầng thấp hơn, giao tiếp với phần cứng và hệ điều hành nhiều hơn.

![](https://images.viblo.asia/da573000-f3c6-4cd1-a7ba-0952e64c5bfb.png)

Để liên kết được phần code Native và phần code còn lại cần có một thành phần chuyên biệt. Mình không biết với các ngôn ngữ khác thì thành phần này là gì, vì mình không phải lập trình viên Android, chủ yếu mình tìm hiểu về Java để hiểu cách ứng dụng Android hoạt động thôi. Với Java thì thành phần này được gọi là JNI - Java Native Interface. 

![](https://images.viblo.asia/d8a500fb-9150-40d1-9788-ed357005f39f.jpg)

Khi ứng dụng hoạt động, những phần code bằng Java vẫn sẽ được chạy trong Dalvik VM. Còn phần code Native sẽ hoạt động như một thư viện độc lập, sẽ làm những công việc xử lý của riêng nó và trả lại kết quả về Dalvik VM thông qua JNI.

![](https://images.viblo.asia/28c5418c-71f1-4013-b193-038d3ce33cd8.png)

Cả 2 phần mã nguồn đều có thể tương tác được với hệ thống Android, do đó một ứng dụng Android không cần phải sử dụng Native code. Nhưng nếu sử dụng thì sẽ có lợi hơn về cả mặt hiệu năng xử lý và bảo mật mã nguồn (do code C/C++ khó dịch ngược hơn Dalvik Bytecode).

# 2. Đơn giản hoá khái niệm Hook
Để đỡ tốn nơ-ron thần kinh thì chắc chúng ta nên đơn giản hoá nhất có thể khái niệm về kỹ thuật hook. Khi một chương trình khởi động thì các biến, hằng, chuỗi ký tự, hàm,... sẽ được tải vào bộ nhớ của thiết bị. 

![](https://images.viblo.asia/eea00b35-2369-441e-b93b-0b0f371ecc04.jpg)

Khi đọc được lời gọi hàm hoặc đọc dữ liệu từ một biến, hệ thống sẽ tìm đến địa chỉ của hàm hoặc biến đó trong bộ nhớ để lấy dữ liệu ra. Kỹ thuật hook sẽ nhắm vào khoảng thời gian trước khi hệ thống đọc được dữ liệu thành công. Thư viện hook sẽ khiến cho hệ thống đọc sai địa chỉ lưu dữ liệu và các chỉ thị của hàm, từ đó khiến cho chương trình hoạt động sai so với thiết kế.

![](https://images.viblo.asia/a4f2c709-6932-4e42-8651-4439fc8af4fa.png)

![](https://images.viblo.asia/505a86b5-62e6-494e-a549-0f16b6dd85a8.png)

Về cơ bản thì kỹ thuật hook hoạt động như vậy. Nắm được cơ bản vậy rồi thì chúng ta có thể chuyển sang phần chính của bài viết này, đó là về cách hook vào các hàm Native của ứng dụng Android.

# 3. Hook Android Native bằng Frida
Trong phần này mình đã chuẩn bị cho mọi người một ứng dụng demo để thử những gì học được qua bài viết. Và tất nhiên, để hook được bằng Frida thì chúng ta phải cài đủ môi trường giả lập Android và cài Frida. Mình đã có 1 series gồm 3 bài viết về cài đặt môi trường pentest Android, nên nếu ai chưa cài đủ thì có thể xem và cài lại.
- App demo: https://drive.google.com/file/d/1Oqdb0HOmm9QrAD_Hoq5cZdSKxBbfgHp_/view?usp=sharing
- Hướng dẫn cài môi trường: https://viblo.asia/p/cai-dat-moi-truong-pentest-android-tren-windows-phan-1-aWj53jpwl6m

Dựa trên cách hoạt động như "người đưa thư" của JNI, mình chia cách hook thành 2 cấp độ:
- Cấp độ 1: bản chất vẫn là hook vào mã nguồn Java.
- Cấp độ 2: hook thẳng vào phần mã nguồn Native.

Bên cạnh 2 cấp độ trên mình còn chia thêm ra 3 kỹ thuật gồm:
- Tìm địa chỉ của hàm Native.
- Hook thẳng vào địa chỉ của hàm Native.
- Thay đổi đối số truyền vào hàm Native.

Sau đây chúng ta sẽ lần lượt đi qua tất cả các nội dung kể trên.

### Chú thích: giải thích mã nguồn ứng dụng
"Talk is cheap, show me the code" - Linus Torvalds

Thế nên là mọi người chịu khó đọc mã nguồn nhé, đọc để hiểu rõ hơn nếu như mọi người chưa code Native app lần nào.

#### Code Native
```C
#include <jni.h>
#include <string>
#include <android/log.h>
#include <stdlib.h>
#include <time.h>

#define TAG "TEST_HOOK_NATIVE"

#define LOGI(...) __android_log_print(ANDROID_LOG_INFO, TAG, __VA_ARGS__)

int testInt(int i) {
    srand(time(NULL));
    int r = rand();
    LOGI("testInt: %d", r);
    return r + i;
}

char* testString(std::string var1) {
    std::string str = std::to_string(testInt(1)) + " - " + var1;
    LOGI("testString: %s", &str);
    return &str[0];
}

extern "C" JNIEXPORT jstring JNICALL
Java_cyber_sunasterisk_demo_1hook_1native_MainActivity_stringFromJNI(
        JNIEnv* env,
        jobject /* this */) {
    std::string hello = testString("Hello from C++");
    return env->NewStringUTF(hello.c_str());
}
```


#### Code Java
```java
package cyber.sunasterisk.demo_hook_native;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import cyber.sunasterisk.demo_hook_native.databinding.ActivityMainBinding;

public class MainActivity extends AppCompatActivity {

    // Used to load the 'demo_hook_native' library on application startup.
    static {
        System.loadLibrary("demo_hook_native");
    }

    private ActivityMainBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        TextView tv = binding.sampleText;
        Button btn = binding.button;

        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Example of a call to a native method
                tv.setText(stringFromJNI());
            }
        });
    }

    // MainActivity.java
    /**
     * A native method that is implemented by the 'demo_hook_native' native library,
     * which is packaged with this application.
     */
    public native String stringFromJNI();
}
```

Ở phần code Native có 1 hàm tên là **Java_cyber_sunasterisk_demo_1hook_1native_MainActivity_stringFromJNI**, sang bên code Java lại có hàm được khai báo là **public native String stringFromJNI();** nhưng không có thân hàm. Đây chính là quy ước để JNI có thể kết nối phần code Java và code Native. Nếu không khai báo hàm đúng cách thì  JNI không thể biết được phần code Java đang cần sử dụng hàm Native nào. Cụ thể như sau:

![](https://images.viblo.asia/328851b6-dbfe-4d19-b35d-28e305577b37.png)

Vì trong tên package gốc mình có chứa ký tự gạch dưới, nên khi chuyển thành hàm Native thì Android Studio đã tự thêm số "1" đằng sau những vị trí ban đầu có dấu gạch dưới, còn các vị trí có dấu chấm vẫn được chuyển thành dấu gạch dưới như bình thường. Trong số 3 hàm ở file code Native thì 2 hàm **testInt** và **testString** không thể trực tiếp gọi được từ phần code Java.

## 3.1. Cấp độ 1: hook vào phần mã nguồn Java
Ở cấp độ 1 thì cách chúng ta hook không khác gì khi hook các hàm Java thông thường. Chúng ta vẫn sẽ sử dụng các API như Java.use() và Java.choose() 

```javascript
Java.perform(function () {
    var Activity = Java.use('cyber.sunasterisk.demo_hook_native.MainActivity');
    Activity.stringFromJNI.implementation = function () {
        console.log("Inside stringFromJNI...");
        return "Hooked";
    };
});
```

{@embed: https://www.youtube.com/watch?v=r0Vgf2VvLjI}

Với cấp độ này, chúng ta có thể reverse file apk bằng các công cụ như BytecodeViewer để tìm hàm liên kết với code Native. Và thường thì chúng ta chỉ cần thay đổi kết quả trả về của hàm là chính.

## 3.2. Cấp độ 2: hook vào phần mã nguồn Native
Ở cấp độ 2 chúng ta sẽ thực sự tác động vào phần mã nguồn Native. Cách hook này sẽ toàn diện hơn so với cách hook ở cấp độ 1. Lí do là vì có thể hàm chúng ta cần hook lại không được liên kết với phần mã nguồn Java qua JNI, trong khi đó mã nguồn Java và mã nguồn Native vẫn luôn chạy độc lập với nhau. Khi không có JNI làm cầu nối thì chúng ta bắt buộc phải tác động trực tiếp vào mã nguồn Native thì mới có tác dụng.

Để hook được vào mã nguồn Native thì Frida cung cấp những API khác hoàn toàn, và còn có nhiều API thú vị hơn nữa cơ. Sau đây là đoạn mã để hook vào phần mã nguồn Native:

```javascript
var stringFromJNI = Module.getExportByName('libdemo_hook_native.so', 
                    'Java_cyber_sunasterisk_demo_1hook_1native_MainActivity_stringFromJNI');
Interceptor.attach(stringFromJNI, {
    onEnter: function(args) {
        console.log('Inside stringFromJNI...');
    },
    onLeave: function(retval) {
        const retStr = Java.vm.getEnv().newStringUtf("Hooked");
        retval.replace(retStr);
    }
});
```

Hàm **Module.getExportByName** nhận vào 2 tham số: tên thư viện và tên hàm cần tìm. Hàm này sẽ tìm trong thư viện chỉ định xem có thấy hàm cần tìm không. Nếu có sẽ trả về địa chỉ của hàm trong bộ nhớ, nếu không tìm thấy thì sẽ báo exception. Phần tên thư viện nếu để trống thì Frida sẽ tìm kiếm trong toàn bộ chương trình.

API **Interceptor.attach** có 2 event là: onEnter và onLeave
- **onEnter** sẽ thực thi khi hook vào hàm thành công. Chúng ta có thể đọc được các tham số truyền vào hàm tại đây luôn.
- **onLeave** sẽ thực thi khi kết thúc quá trình hook vào hàm. Tại đây chúng ta có thể đọc và thay đổi kết quả trả về của hàm theo cú pháp ```retval.replace(giá-trị-trả-về-mới)```.
  Tuy nhiên, để có thể thay được giá trị trả về của hàm, chúng ta cần đưa vào chính xác kiểu dữ liệu trả về. Trong mã nguồn ví dụ ở trên, để có thể thay thế giá trị trả về là kiểu String, chúng ta cần khởi tạo giá trị trả về mới bằng hàm ```Java.vm.getEnv().newStringUtf("String-mới")```.
  
**Lưu ý:** Frida có thể báo lỗi ngay sau khi chạy script nhưng thực ra là không sao. Lý do là vì Frida chạy script trước cả khi chương trình kịp khởi động và tải thư viện. Để khắc phục rất đơn giản: đầu tiên là mặc kệ nó, sau khi ứng dụng khởi động thành công thì quay lại file script đã viết và tiến hành lưu lại một lần nữa. Lúc này sẽ không còn lỗi (nếu vẫn có tức là script viết sai).
  
{@embed: https://www.youtube.com/watch?v=8J-Y7U5piEA}
  
-----

Bài viết cũng đã dài, mình xin tạm dừng lại bài viết này tại đây. Với 2 cấp độ hook theo ví dụ đi kèm, các bạn đã có thể hook được vào các hàm Native cơ bản rồi. Mọi người có thể thử qua ứng dụng demo mình đã gửi link trong bài viết, sau đó comment kết quả cho mình nhé.

Trong phần tiếp theo, mình sẽ giới thiệu thêm 3 kỹ thuật gồm:
- Tìm địa chỉ của hàm Native.
- Hook thẳng vào địa chỉ của hàm Native.
- Thay đổi đối số truyền vào hàm Native.