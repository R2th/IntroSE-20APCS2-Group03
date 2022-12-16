# Giới thiệu
Trong quá trình phát triển phần mềm nói chung và ứng dụng mobile nói riêng, việc config cho từng môi trường phát triển là điều bắt buộc phải có. Trong lập trình Flutter thì việc config flavor cũng có nhiều cách. Có thể config riêng cho từng platform hoặc có thể config chung cho tất cả. Việc config cho từng platform mình sẽ không nhắt đến trong bài này.
# Tiến hành
Việc đầu tiên là tạo một file config Flavor. Có thể bỏ file này ở trong package config
Nội dung file flavor_config.dart như sau
```
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

enum Flavor {
  DEV,
  STG,
  PRODUCTION
}

class FlavorValues {
  FlavorValues({@required this.baseUrl});
  final String baseUrl;
//Add other flavor specific values, e.g database name
}

class FlavorConfig {
  final Flavor flavor;
  final String name;
  final FlavorValues values;
  static FlavorConfig _instance;

  factory FlavorConfig({
    @required Flavor flavor,
    @required String name,
    @required FlavorValues values}) {
    _instance ??= FlavorConfig._internal(
        flavor, name, values);
    return _instance;
  }

  FlavorConfig._internal(this.flavor, this.name, this.values);
  static FlavorConfig get instance { return _instance;}
  static bool isProduction() => _instance.flavor == Flavor.PRODUCTION;
  static bool isDevelopment() => _instance.flavor == Flavor.DEV;
  static bool isStaging() => _instance.flavor == Flavor.STG;
}

void setFlavorDevelopment(){
  FlavorConfig(flavor: Flavor.DEV, name: "DemoFlavor-Dev",
      values: FlavorValues(baseUrl: "http://xxxxxDEV.yx/api/""));
}

void setFlavorStaging(){
  FlavorConfig(flavor: Flavor.STG, name: "DemoFlavor-Stg",
      values: FlavorValues(baseUrl: "http://xxxxxSTG.yx/api/""));
}

void setFlavorProduction(){
  FlavorConfig(flavor: Flavor.PRODUCTION, name: "DemoFlavor-Production",
      values: FlavorValues(baseUrl: "http://xxxxxPRODUCTION.yx/api/"));
}
```

Ở đây mình sẽ config cho 3 môi trường phát triển : Staging(STG), Development(DEV) và Production(PRODUCTION). Ba môi trường này sẽ khác nhau về base api url. Ngoài ra các bạn cũng có thể thêm các thuộc tính khác như key, database name... 

Một lưu ý nhỏ nếu sử dụng FIrebase hoặc các service tương tự các bạn cần phải config môi trường cho từng Platform nhé

Việc tiếp theo đó là tạo file thực thi cho mỗi môi trường, đó là hàm main()

Tạo file **main_dev.dart**
```
void main() {
  setFlavorDevelopment();
  runApp(MyApp());
}
```

Tạo file **main_stg.dart**
```
void main() {
  setFlavorStaging();
  runApp(MyApp());
}
```

Tạo file **main_production.dart**
```
void main() {
  setFlavorProduction();
  runApp(MyApp());
}
```

Để sử dụng flavor thì chỉ cần gọi : **FlavorConfig.instance.values.baseUrl**

Cuối cùng là tạo build config cho mỗi môi trường để tiện cho lúc run app nhé

![](https://images.viblo.asia/b5ab39f4-26e3-4371-9f3d-45eb1ee68f60.png)

### Chúc các bạn thành công với Flutter