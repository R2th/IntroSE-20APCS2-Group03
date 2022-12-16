## Bạn sẽ nhận được gì sau bài viết này?
* Bạn có thể sử dụng code Swift trong dự án Unity của mình
* Bạn có thể gọi bất kỳ func Swift nào với kiểu trả về là Void hay bất kỳ kiểu khác
* Bạn biết cách để chuyển các biến từ func Swift sang func Unity
## Tạo swift framework để sử dụng trong unity
### Bước 1 : Tạo Cocoa Touch Framework
![](https://images.viblo.asia/3b2b8580-de67-4da4-99c4-eadc919ac946.png)

Mở XCode tạo 1 project mới và lựa chọn  “Cocoa Touch Framework”. Đặt tên cho project của bạn theo ý bạn muốn. Ở đây mình đặt tên là "SwiftPlugin". Và tất nhiên ngôn ngữ sẽ là Swift. 

Trong thư mục gốc “SwiftPlugin" tạo mới 1 thư mục và đặt tên là "Source".

![](https://images.viblo.asia/b69fb1b6-dba1-4cb5-ba3d-a9e64e4353e7.png)

### Bước 2 : Bắt đầu viết code Swift
Để bắt đầu chúng ta tạo mới 1 file Swift trong thư mục "Source" và đặt tên là "SwiftForUnity.swift".
Copy và parse đoạn code dưới đây vào file Swift vừa tạo :

```
import Foundation
import UIKit
@objc public class SwiftForUnity: UIViewController {
      @objc static let shared = SwiftForUnity()
      @objc func SayHiToUnity() -> String{
            return "Hi, I'm Swift"
      }
}
```

Tiền tố @objc được khai báo trước mỗi function và class để chỉ ra rằng các function và class này có thể được sử dụng trong objective C, điều này cần thiết để có thể gọi các function hay class đó trong C#.
Tất cả các class muốn sử dụng được trong objective C thì đều phải được kế thừa từ NSObject. Ở đây UIViewController đã được kế thừa từ NSObject nên SwiftForUnity không cần kế thừa từ NSObject nữa.

Sau khi chúng ta viết code Swift xong chúng ta cần tạo 1 file Objective C++ đặt tên là "SwiftForUnityBridge.mm"
![](https://images.viblo.asia/e113a845-bfb9-42b7-9d9d-90b271265717.png)
![](https://images.viblo.asia/ab507a6e-1e09-4a2b-b214-6c25464b4f2a.png)

Bây giờ thêm đoạn code sau vào file .mm vừa tạo:

```
#include "SwiftPlugin-Swift.h"
#pragma mark - C interface
extern "C" {
     char* _sayHiToUnity() {
          NSString *returnString = [[SwiftForUnity shared]       SayHiToUnity];
          char* cStringCopy(const char* string);
          return cStringCopy([returnString UTF8String]);
     }
}
char* cStringCopy(const char* string){
     if (string == NULL){
          return NULL;
     }
     char* res = (char*)malloc(strlen(string)+1);
     strcpy(res, string);
     return res;
}
```

Ở đoạn code trên trình biên dịch sẽ báo cho chúng ta 2 error đó là không tìm thấy file "SwiftPlugin-Swift.h" cũng như không tìm thấy [SwiftForUnity shared] . Nhưng bạn hãy cứ yên tâm, file "SwiftPlugin-Swift.h" sẽ được tự động tạo ra khi chúng ta build framework. Nếu bạn chỉ muốn kiểu trả về là Void thì có thể thay thế bằng đoạn code sau:
```
#include "SwiftPlugin-Swift.h"
#pragma mark - C interface
extern "C" {
     void _sayHiToUnity(){
          [[SwiftForUnity shared]SayHiToUnity];
     }
}
```
Function cStringCopy có nhiệm vụ chuyển đổi chuỗi string sang dạng mà C# có thể đọc được. Nếu bạn muốn truyền vào nhiều param từ Swift thì bạn có thể tham khảo đoạn code sau :

![](https://images.viblo.asia/dac04e5a-e7e2-49ab-8799-aa2d9f8538b2.png)

### Bước 3 : tạo bridging header
Trong thư mục "Source" tạo 1 file header có tên là “SwiftPlugin-Bridging-Header.h”
![](https://images.viblo.asia/9a6b10f3-7751-4b06-b5d2-26f9be07cb1b.png)
XCode yêu cầu file brigding luôn luôn phải có định dạng như sau : [PROJECTNAME-Bridging-Header].

Thêm đoạn code sau vào file header vừa tạo :
```
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
```

Khi chúng ta làm xong các bước trên chúng ta build framework ở chế độ cho devicesimulator. Quá trình build sẽ thất bại tuy nhiên trong thư mục product chúng ta vẫn có 1 file .framework. Chuột phải và chọn Show in finder :
![](https://images.viblo.asia/6a28e95c-a52a-4fed-8cca-972b131f2370.png)

Copy file đó vào 1 nơi nào đó mà bạn có thể dễ dàng tìm lại sau này bởi vì bạn sẽ không cần file này cho dự án unity của bạn mà bạn sẽ cần sử dụng nó cho dự án XCode được tạo ra bởi unity sau này.
### Bước 4 : Tạo dự án Unity
Tạo 1 dự án unity mới đặt tên theo ý muốn của bạn. Trong thư mục Asset chúng ta cần tạo 1 thư mực đặt tên là "Plugins", trong thư mục Plugins chúng ta cần tạo 1 thư mục mới có tên là "iOS". Và trong thư mục "iOS" chúng ta cần tạo 1 thư mục "SwiftPlugin" chứa 2 thư mục con là "Editor" và "Source".
![](https://images.viblo.asia/2834d436-2bbe-4b80-a7c0-cdf0c166628d.png) 

Chúng ta kéo các file code vừa tạo bên Xcode vào thư mục "Source" của unity và tạo thêm 1 file C# trong "Source" có tên là "SwiftForUnity.cs". 

```
using System;
using System.Runtime.InteropServices;
using UnityEngine;

public class SwiftForUnity : MonoBehaviour {

   #region Declare external C interface
   
   #if UNITY_IOS && !UNITY_EDITOR
        
    [DllImport("__Internal")]
    private static extern string _sayHiToUnity();
    
    #endif
   
   #endregion
   
   #region Wrapped methods and properties

   public static string HiFromSwift()
   {
#if UNITY_IOS && !UNITY_EDITOR
        return _sayHiToUnity();
   #else
      return "No Swift found!";
#endif
   }

   #endregion
   
   #region Singleton implementation

   private static SwiftForUnity _instance;
    
   public static SwiftForUnity Instance
   {
      get
      {
         if (_instance == null)
         {
            var obj = new GameObject("SwiftUnity");
            _instance = obj.AddComponent<SwiftForUnity>();
         }

         return _instance;
      }
   }

   private void Awake()
   {
      if (_instance != null)
      {
         Destroy(gameObject);
         return;
      }
        
      DontDestroyOnLoad(gameObject);
   }

   #endregion
}
```

[DllImport("__Internal")] để khai báo các function nằm trong file .mm. Nếu bạn làm sai thì nó sẽ không làm việc.

Bây giờ bạn có thể sử dụng “SwiftForUnity.HiFromSwift()” ở những nơi mà bạn muốn và nó sẽ trả về một chuỗi string bạn đã khai báo bên swift code.

Nếu bạn có nhiều function trả về nhiều loại khác nhau thì có thể tham khảo code dưới đây:

![](https://images.viblo.asia/3ebed85e-afbd-4dce-a95a-ff91cfaf7f74.png)

### Bước 5 : Phần quan trọng nhất
Được rồi, vì bạn đã triển khai một số chức năng Swift trong Unity và mong muốn thử nghiệm nó, vì vậy bạn xây dựng dự án Xcode của mình, mở nó lên và cố gắng build nó nhưng vẫn gặp rất nhiều lỗi! Phần quan trọng nhất vẫn chưa xảy ra. Bạn phải điều chỉnh một vài cài đặt trong Xcode.

Tạo 1 file "SwiftPostProcess.cs" trong thư mục "Editor" và thêm đoạn code dưới đây vào :
```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using UnityEditor.Callbacks;
using UnityEditor.iOS.Xcode;
using System.Diagnostics;

using System.IO;
using System.Linq;

public static class SwiftPostProcess {

    [PostProcessBuild]
    public static void OnPostProcessBuild(BuildTarget buildTarget, string buildPath)
    {
        if (buildTarget == BuildTarget.iOS)
        {
            var projPath = buildPath + "/Unity-Iphone.xcodeproj/project.pbxproj";
            var proj = new PBXProject();
            proj.ReadFromFile(projPath);

            var targetGuid = proj.TargetGuidByName(PBXProject.GetUnityTargetName());
            
            
            proj.SetBuildProperty(targetGuid, "ENABLE_BITCODE", "NO");
            proj.SetBuildProperty(targetGuid, "SWIFT_OBJC_BRIDGING_HEADER", "Libraries/Plugins/iOS/SwiftPlugin/Source/SwiftPlugin-Bridging-Header.h");
            proj.SetBuildProperty(targetGuid, "SWIFT_OBJC_INTERFACE_HEADER_NAME", "SwiftPlugin-Swift.h");
            proj.AddBuildProperty(targetGuid, "LD_RUNPATH_SEARCH_PATHS", "@executable_path/Frameworks $(PROJECT_DIR)/lib/$(CONFIGURATION) $(inherited)");
            proj.AddBuildProperty(targetGuid, "FRAMERWORK_SEARCH_PATHS",
                "$(inherited) $(PROJECT_DIR) $(PROJECT_DIR)/Frameworks");
            proj.AddBuildProperty(targetGuid, "ALWAYS_EMBED_SWIFT_STANDARD_LIBRARIES", "YES");
            proj.AddBuildProperty(targetGuid, "DYLIB_INSTALL_NAME_BASE", "@rpath");
            proj.AddBuildProperty(targetGuid, "LD_DYLIB_INSTALL_NAME",
                "@executable_path/../Frameworks/$(EXECUTABLE_PATH)");
            proj.AddBuildProperty(targetGuid, "DEFINES_MODULE", "YES");
            proj.AddBuildProperty(targetGuid, "SWIFT_VERSION", "4.0");
            proj.AddBuildProperty(targetGuid, "COREML_CODEGEN_LANGUAGE", "Swift");
            
            
            
            proj.WriteToFile(projPath);
        }
    }

}
```

Bạn thử build lại project unity và kéo Swiftplugins.framework vào trong dự án Xcode bạn vừa tạo ra :

![](https://images.viblo.asia/309516c5-27df-4647-9500-115f321f7344.png)

Và bây giờ bạn có thể build và dự dụng swift code trong unity.
## Tham khảo :
https://medium.com/@kevinhuyskens/implementing-swift-in-unity-53e0b668f895