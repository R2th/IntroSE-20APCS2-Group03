### Bắt đầu
Việc thêm hỗ trợ Gradle build vào IntelliJ Platform Plugin yêu cầu phân phối gần đây cho hệ thống xây dựng Gradle và IntelliJ IDEA (Cộng đồng hoặc Cuối cùng).

### 1.0. Tải xuống và cài đặt IntelliJ IDEA 
Tải xuống và cài đặt IntelliJ IDEA Ultimate hoặc IntelliJ IDEA Community Edition.

### 1.1. Đảm bảo plugin Gradle và plugin 'Plugin DevKit' được bật 
Bạn có thể xác minh rằng các plugin được bật bằng cách truy cập Cài đặt | Plugin .
![](https://images.viblo.asia/04662761-f1fc-4e75-89f7-1f9a4b768ad3.png)
Đảm bảo plugin Gradle được bật

### 1.2. Tạo dự án plugin từ đầu 
IntelliJ IDEA hỗ trợ tự động tạo các dự án plugin mới bằng Gradle, với tất cả các thiết lập build.gradle cần thiết được thực hiện tự động. Điều này cũng có thể được sử dụng để chuyển đổi một plugin hiện có thành Gradle, nếu Gradle không thể chuyển đổi dự án hiện tại - trong trường hợp này, bạn cần sao chép các nguồn vào dự án mới.

Để thực hiện điều này, hãy tạo một dự án mới trong IntelliJ IDEA bằng cách mở **File | New… | Project** , và chọn Gradle từ hộp thoại. Trong "Libraries and Frameworks", hãy kiểm tra "IntelliJ Platform Plugin".
![](https://www.jetbrains.org/intellij/sdk/docs/tutorials/build_system/img/step1_new_gradle_project.png)
Chọn phần tử Gradle trong Trình hướng dẫn tạo dự án

Trình hướng dẫn tạo dự án bây giờ sẽ hướng dẫn bạn thông qua quá trình tạo dự án Gradle. Bạn sẽ cần chỉ định Group ID, Artifact ID và version:
![](https://www.jetbrains.org/intellij/sdk/docs/tutorials/build_system/img/step2_group_artifact_version.png)


Bạn nên chọn tùy chọn Use default gradle wrapper , theo cách đó IntelliJ IDEA sẽ cài đặt mọi thứ bạn cần để chạy các tác vụ Gradle.

Cuối cùng, chỉ định một JVM Gradle sẽ sử dụng, nó có thể là Project JDK. Bạn cũng định cấu hình đường dẫn này khi dự án được tạo thông qua **Settings | Build, Execution, Deployment | Build Tools | Gradle.**
![](https://www.jetbrains.org/intellij/sdk/docs/tutorials/build_system/img/step3_gradle_config.png)
### 1.3. Thêm hỗ trợ Gradle vào một plugin hiện có 
Để thêm hỗ trợ Gradle vào một dự án plugin hiện có, hãy tạo một tệp build.gradle trong thư mục gốc, với ít nhất các nội dung sau:

```
buildscript {
    repositories {
        mavenCentral()
    }
}

plugins {
    id "org.jetbrains.intellij" version "0.3.0"
}

apply plugin: 'idea'
apply plugin: 'org.jetbrains.intellij'
apply plugin: 'java'

intellij {
    version 'IC-2016.3' //IntelliJ IDEA 2016.3 dependency; for a full list of IntelliJ IDEA releases please see https://www.jetbrains.com/intellij-repository/releases
    plugins 'coverage' //Bundled plugin dependencies
    pluginName 'plugin_name_goes_here'
}

group 'org.jetbrains'
version '1.2' // Plugin version
```

Sau đó, với Gradle thực thi trên hệ thống PATH của bạn, thực hiện các lệnh sau trên dòng lệnh của hệ thống của bạn:

`gradle cleanIdea idea`

Thao tác này sẽ xóa mọi tệp cấu hình IntelliJ IDEA hiện có và tạo cấu hình Gradle mới được công nhận bởi IntelliJ IDEA. Khi dự án của bạn làm mới, bạn sẽ có thể xem cửa sổ công cụ Gradle được hiển thị trong Xem | Công cụ Windows | Gradle . Điều này cho thấy IntelliJ IDEA công nhận khía cạnh Gradle.

### 1.4. Chạy một plugin đơn giản 
Bây giờ thêm một lớp HelloAction và plugin.xml vào thư mục META-INF :

```
import com.intellij.openapi.actionSystem.*;
import com.intellij.openapi.project.Project;
import com.intellij.openapi.ui.Messages;

public class HelloAction extends AnAction {
  public HelloAction() {
    super("Hello");
  }

  public void actionPerformed(AnActionEvent event) {
    Project project = event.getProject();
    Messages.showMessageDialog(project, "Hello world!", "Greeting", Messages.getInformationIcon());
  }
}
```

```
<idea-plugin>
  <id>org.jetbrains</id>
  <name>my_plugin</name>
  <version>0.0.1</version>
  <vendor email="dummy" url="dummy">dummy</vendor>

  <description><![CDATA[
      Sample plugin.<br>
    ]]></description>

  <change-notes><![CDATA[
      Release 0.0.1: Initial release.<br>
    ]]>
  </change-notes>

  <!-- please see http://www.jetbrains.org/intellij/sdk/docs/basics/getting_started/build_number_ranges.html for description -->
  <idea-version since-build="162"/>

  <!-- please see http://www.jetbrains.org/intellij/sdk/docs/basics/getting_started/plugin_compatibility.html
       on how to target different products -->
  <!-- uncomment to enable plugin in all products
  <depends>com.intellij.modules.lang</depends>
  -->

  <extensions defaultExtensionNs="com.intellij">
  </extensions>

  <actions>
    <group id="MyPlugin.SampleMenu" text="Greeting" description="Greeting menu">
      <add-to-group group-id="MainMenu" anchor="last"/>
      <action id="Myplugin.Textboxes" class="HelloAction" text="Hello" description="Says hello"/>
    </group>
  </actions>

</idea-plugin>
```
Mở cửa sổ công cụ Gradle và tìm kiếm nhiệm vụ runIde . Nếu nó không có trong danh sách, vui lòng nhấn nút Refresh ở trên cùng. Bấm đúp vào nó để chạy nó.

![](https://www.jetbrains.org/intellij/sdk/docs/tutorials/build_system/img/gradle_tasks_in_tool_window.png)

Hoặc thêm một Gradle Run Configuration mới, được cấu hình như sau:

![](https://www.jetbrains.org/intellij/sdk/docs/tutorials/build_system/img/gradle_run_config.png)

Khởi chạy Cấu hình chạy Gradle mới. Từ cửa sổ Run, đầu ra sau sẽ được hiển thị.

![](https://www.jetbrains.org/intellij/sdk/docs/tutorials/build_system/img/launched.png)

Cuối cùng, khi IDE khởi chạy, sẽ có một menu mới ở bên phải của menu Trợ giúp . Plugin của bạn hiện được định cấu hình trên Gradle.