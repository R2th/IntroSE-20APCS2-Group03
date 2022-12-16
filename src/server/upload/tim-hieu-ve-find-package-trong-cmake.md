Đây là phần mình tìm hiểu về find_package trong CMake. Hy vọng sẽ giúp mọi người hiểu hơn về một câu lệnh và cách sử dụng của nó trong quá trình cần phải thực hiện công việc với CMake.

Load cài đặt cho một external project.

```
find_package(<package> [version] [EXACT] [QUIET] [MODULE]
             [REQUIRED] [[COMPONENTS] [components...]]
             [OPTIONAL_COMPONENTS components...]
             [NO_POLICY_SCOPE])
```
Tìm và loads cài đặt từ một external project. <package>_FOUND sẽ được thiết lập để cho biết liệu gói đã được tìm thấy. Khi packet được tìm thấy thông tin dành riêng cho packet sẽ đc cung cấp thông qua các variable và thêm vào target được ghi lại bởi chính nó. 
    
QUIET là option vô hiệu quá messages nếu không tìm được.
    
MODULE là option vô hiệu hóa signature thứ 2 được ghi lại.
    
REQUIRED là option dừng quá trình với message lỗi nếu không tìm thấy package.
    
Một danh sách package cụ thể của các thành phần cần thiết được liệt kê sau COMPONENTS ( hoặc sau REQUIRED nếu có ). Các thành phần tùy chọn bổ sung OPTIONAL_COMPONENTS. Các thành phần sẵn có và ảnh hưởng của chúng đối với một package được coi là tìm thấy được xác định bởi target package.
   
   Đối số `[version]` yêu cầu một phiên bản mà package tìm thấy phải tương thích ( có định dạng : `major[.minor[.patch[.tweak]]] `). EXACT option yêu cầu một phiên bản khớp chính xác. Nếu không có `[version]` và / hoặc danh sách thành phần nào được đưa ra cho một lệnh gọi đệ quy trong một module tìm kiếm, các đối số sẽ được tự động chuyển cho cuộc gọi bên ngoài ( bao gồm cả cờ EXACT cho `[version]` ). Phiên bản hiện tại chỉ hỗ trợ cung cấp cho từng package cơ bản.


  Mã người dùng thường được tìm các packages bằng chữ ký đơn giản ở trên. Phần còn lại chỉ định chữ ký lệnh đầy đủ và chi tiết của quá trình tìm kiếm. Những người bảo trì dự án muốn cung cấp một gói được tìm thấy bởi lệnh này được khuyến khích đọc tiếp.
    

   Lệnh này có 2 chế độ để thực hiện tìm kiếm package: Chế độ "Module" và chế độ "Config". Chế độ Module có sẵn khi lệnh được gọi với chữ ký giảm ở trên. CMake tìm kiếm một tệp có tên là Find<package>. cmake trong CMAKE_MODULE_PATH, sau đó là cài đặt CMake. Nếu tập tin được tìm thấy, nó được đọc và xử lý bởi CMake. Nó chịu trách nhiệm tìm package, kiểm tra phiên bản và tạo ra bất kỳ thông điệp cần thiết nào. Nhiều module tìm kiếm cung cấp giới hạn hoặc không hỗ trợ cho version, kiểm tra tài liệu module. Nếu không tìm thấy module nào và tùy chọn MODULE không được đưa ra, lệnh sẽ chuyển sang chế độ cấu hình.
    

Dưới đây là cấu hình hoàn chỉnh của lệnh find_package:

```
find_package(<package> [version] [EXACT] [QUIET]
             [REQUIRED] [[COMPONENTS] [components...]]
             [CONFIG|NO_MODULE]
             [NO_POLICY_SCOPE]
             [NAMES name1 [name2 ...]]
             [CONFIGS config1 [config2 ...]]
             [HINTS path1 [path2 ... ]]
             [PATHS path1 [path2 ... ]]
             [PATH_SUFFIXES suffix1 [suffix2 ...]]
             [NO_DEFAULT_PATH]
             [NO_CMAKE_ENVIRONMENT_PATH]
             [NO_CMAKE_PATH]
             [NO_SYSTEM_ENVIRONMENT_PATH]
             [NO_CMAKE_PACKAGE_REGISTRY]
             [NO_CMAKE_BUILDS_PATH] # Deprecated; does nothing.
             [NO_CMAKE_SYSTEM_PATH]
             [NO_CMAKE_SYSTEM_PACKAGE_REGISTRY]
             [CMAKE_FIND_ROOT_PATH_BOTH |
              ONLY_CMAKE_FIND_ROOT_PATH |
              NO_CMAKE_FIND_ROOT_PATH])
```


  Tùy chọn CONFIG có thể được sử dụng để bỏ qua chế độ module một cách rõ ràng và chuyển sang chế độ config. Nó đồng nghĩa với việc sử dụng NO_MODULE. Chế độ config cũng được ngụ ý bằng cách sử dụng các tùy chọn không được chỉ định trong lệnh.
    
  Chế độ config cố gắng xác định vị trí tệp config được cung cấp bởi gói cần tìm. Một mục lưu trữ có tên <package>_DIR được tạo để lưu thư mục chứa tệp. Theo mặc định, lệnh tìm kiếm một gói có tên <package>. Nếu tùy chọn NAMES được cung cấp các tên theo sau thì nó được sử dụng thay vì <package>. Lệnh tìm kiếm một tệp có tên <name> Config.cmake hoặc <lower-case-name>config.cmake cho mỗi tên được chỉ định. Một tập hợp thay thế của tên tệp cấu hình có thể được cung cấp bằng tùy chọn CONFIGS. Thủ tục tìm kiếm được chỉ định dưới đây. Khi tìm thấy, tệp cấu hình được đọc và xử lý bởi CMake. Vì tệp được cung cấp bởi package nên nó đã biết vị trí của nội dung package. Đường dẫn đầy đủ đến tệp nếu cấu hình được lưu trữ trong biến cmake <package>_CONFIG.
    
  Tất cả các tệp cấu hình đã được CMake xem xét trong khi tìm kiếm bản cài đặt package với phiên bản phù hợp được lưu trữ trong biến cmake<package>_CONSIDERED_CONFIGS, các phiên bản được liên kiết trong <package>_CONSIDERED_VERSION.

 Nếu không thể tìm thấy tệp cấu hình package, CMake sẽ tạo ra lỗi mô tả sự cố trừ khi đối số QUIET được chỉ định. Nếu REQUIRED được chỉ định và gói không được tìm thấy, lỗi nghiêm trọng sẽ được tạo và bước cấu hình dừng thực thi. Nếu <package>_DIR đã được đặt thành thư mục không chứa tệp cấu hình, CMake sẽ bỏ qua nó và tìm kiếm từ đầu.

   Khi đối số [version] được cung cấp, chế độ config sẽ chỉ tìm thấy một phiên bản của package yêu cầu tương thích với phiên bản của package yêu cầu ( định dạng chính major[.minor[.patch[.tweak]]] ). Nếu tùy chọn EXACT chỉ được cung cấp một phiên bản của package yêu cầu một kết quả khớp chính xác của phiên bản được yêu cầu. CMake không thiết lập bất kỳ quy ước nào cho ý nghĩa của số version. Số version của package được kiểm tra bởi các phiên bản của các tập tin của các nhóm được cung cấp bởi các package. Đối với tệp cấu hình package ứng viên <config-file>.cmake, tệp version tương ứng được đặt bên cạnh và được đặt tên là <config-file>-version.cmake hoặc <config-file>Version.cmake. Nếu không có tệp version nào như vậy thì tệp config được coi là không tương thích với bất kỳ version được yêu cầu nào. Có thể tạo tệp version cơ bản chứa mã khớp version chung bằng module CMakePackageConfigHelpers. Khi tìm thấy tệp phiên bản, nó được tải để kiểm tra số phiên bản được yêu cầu. Tệp phiên bản được tải trong một phạm vi lồng nhau trong đó các biến sau đã được xác định:
    
`PACKAGE_FIND_NAME`
    
the <package> name
    
`PACKAGE_FIND_VERSION`
    
full requested version string
    
`PACKAGE_FIND_VERSION_MAJOR`
    
major version if requested, else 0
    
`PACKAGE_FIND_VERSION_MINOR`
    
minor version if requested, else 0
    
`PACKAGE_FIND_VERSION_PATCH`
    
patch version if requested, else 0
    
`PACKAGE_FIND_VERSION_TWEAK`
    
tweak version if requested, else 0
    
`PACKAGE_FIND_VERSION_COUNT`
    
number of version components, 0 to 4
    
Links tham khảo: https://cmake.org/cmake/help/v3.8/command/find_package.html?highlight=i