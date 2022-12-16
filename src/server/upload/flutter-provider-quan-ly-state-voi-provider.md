# Vấn đề của quản lý state ở Flutter

Giả sử bạn xây dựng 1 project có rất nhiều widget. Ở cây widget của bạn, nếu có bất kì widget con nào cần dữ liệu, bạn cần cung cấp nó thông qua constructor của chúng.

Nếu dữ liệu đó nằm ở đầu của cây widget của bạn và nó cần cung cấp xuống widget con, bạn cần phải chuyển nó xuống tất cả các widget thông qua các constructor của chúng. Điều đó dẫn đến việc code của bạn sẽ rất lộn xộn và constructor của widget cần phải truyền rất nhiều dữ liệu kể cả khi dữ liệu đó là không thực sự cần thiết với widget nhưng tất cả dữ liệu đó lại thực sự cần thiết ở widget dưới nó.

Cách này sẽ khiến cho việc rebuild các widget không cần thiết. Và nó sẽ khiến code của bạn lộn xộn, dễ xảy ra lỗi và khó khăn trong việc bảo trì. Đó là lý do tại sao `Provider` được ra đời.

# Tại sao lại chọn `Provider`?

- Hoàn toàn tách biệt logic khỏi các widget.
- Dễ nắm bắt và làm quen với người mới bắt đầu.
- Cấu trúc của dự án sẽ gọn gàng hơn.
- Nó được chính Google và Flutter khuyến khích sử dụng cho tới thời điểm hiện tại.

# Vậy `Provider` là gì?

> *A wrapper around InheritedWidget to make them easier to use and more reusable.*

Đó là những gì mà tài liệu chính thức của `Provider` nói với bạn. `Provider` là một thư viện cung cấp cho bạn một đường dẫn để bạn có thể kết nối với các widget của bạn. Bạn hãy coi `Provider` như là các trạm xăng, còn các widget của bạn là phương tiện đi lại sử dụng xăng vậy. Xăng ở đây chính là dữ liệu!

Tất cả các widget cần dữ liệu (có thể hiểu là xe cộ cần đổ xăng) sẽ tới `Provider` (có thể hiểu là trạm xăng) và kết nối với 1 đường ống để đổ xăng và những widget nào (xe cộ) nào mà không cần dữ liệu (đổ xăng) thì có thể bỏ qua nó.

Đây là cách là `Provider` đang làm! Nó chỉ đơn giản là cung cấp dữ liệu cho những widget nào cần, và không quan tâm đến những widget mà không cần cung cấp dữ liệu.

Để làm rõ hơn, hãy xem ví dụ phía dưới đây

![https://cdn.hashnode.com/res/hashnode/image/upload/v1614168291770/mqu0H85-R.gif?auto=format,compress&gif-q=60&format=webm](https://cdn.hashnode.com/res/hashnode/image/upload/v1614168291770/mqu0H85-R.gif?auto=format,compress&gif-q=60&format=webm)

- Ở đây, bạn có 1 cây widget với widget `MyApp` ở trên cùng là widget cha của tất cả các widget con.
- `Provider` chỉ bao gồm dữ liệu hoặc trạng thái và bạn đính kèm `Provider` với 1 widget trong trường hợp này là phía trên cùng của cây widget - `MyApp`.
- Ngay sau khi `Provider` được đính kèm với bất kì widget nào, tất cả các widget con của nó có thể lắng nghe dữ liệu hoặc trạng thái ở trong `Provider`.
- Ở đây bạn thấy được là widget con đầu tiên và widget con thứ 3 đang lắng nghe `Provider` trong khi widget con thứ 2 thì không.
- Ngay khi có sự thay đổi về dữ liệu hoặc trạng thái ở trong `Provider`, phương thức `build() { ... }` của widget con thứ nhất và thứ 3 sẽ được thực thi và được rebuild lại.
- Widget con thứ 2 sẽ không cần phải rebuild trong quá trình lắng nghe thay đổi của widget con thứ nhất và thứ ba.
- Widget con có thể là `Stateful` hoặc `Stateless`, nó không quá quan trọng vì dữ liệu được cung cấp bên ngoài bởi `Provider` nên chúng sẽ rebuild ngay khi có dữ liệu thay đổi.

> "*Dữ liệu được truyền từ `Provider` tới widget không được truyền bằng constructor của cây widget mà nó được truyền bằng cách biến những widget con trở thành người lắng nghe (listener) hoặc người tiêu thụ (consumer) của `Provider`."*

# Cài đặt

Cài đặt `Provider` vào dự án của bạn chỉ cần thêm đoạn code dưới vào `pubspec.yaml` và chạy lệnh `flutter pub get` ở termial là xong.

```yaml
dependencies:
  provider: ^6.0.0
```

## Sử dụng `Provider`

Bây giờ bạn có thể triển khai 1 `Provider` trong Flutter app nhưng trước hết hãy xem cấu trúc file sẽ có trong hướng dẫn này.

```markdown
>android
>build
>ios
>lib 
   -> helpers
   -> controllers
   -> providers
         -> authentication_provider.dart
         -> recipes_provider.dart
         -> chef_provider.dart
   -> screens
         -> home_screen.dart
         -> authentication_screen.dart
   -> widgets
   -> models
   -> main.dart
>test
>.gitignore
>pubspec.lock
>pubspec.yaml
>README.md
```

Ở đây, thư mục `providers` để chứa tất cả các `providers` mà bạn sẽ tạo ra để chứa tất cả những logic để xử lý trạng thái hoặc dữ liệu sẽ nằm bên trong một thư mục duy nhất tách biệt với các widget con khác. 

## Tạo `Provider` đầu tiên của bạn

Đầu tiên, tạo 1 `dart` file bên trong thư mục `providers` với tên liên quan đến loại dữ liệu mà `Provider` của bạn lưu trữ. Trong trường hợp của tôi, tôi lưu trữ tất cả các công thức món ăn được nạp bởi **REST API**.

### Tạo model

Tạo 1 model công thức nấu ăn trong thư mục `models` với tên là `recipe.dart`. 

```dart
import 'package:flutter/foundation.dart';

class Recipe {
  final String id;
  final String title;
  final String imageUrl;
  final int duration;
  final List<dynamic> ingredients;
  final List<dynamic> categories;
  final List<dynamic> steps;
  final String chef;
  final String chefName;
  final String chefImageUrl;
  final String complexity;
  final String affordability;
  final bool isVegetarian;

  Recipe(
      {@required this.id,
      @required this.title,
      @required this.imageUrl,
      @required this.duration,
      @required this.ingredients,
      @required this.categories,
      @required this.steps,
      @required this.chef,
      @required this.chefName,
      @required this.chefImageUrl,
      @required this.complexity,
      @required this.affordability,
      @required this.isVegetarian});
}
```

Bạn có thể thấy là ở đây xác định model công thức nấu ăn mà sẽ giữ tất cả các instance của các biến mà bạn cần. Bạn có 1 constructor với chú thích `@require`. Chú thích này được cung cấp cho bạn bởi gói `foundation.dart`. Nó cũng có sẵn trong `material.dart` nhưng bạn sẽ không cần bất kì lớp `StatelessWidget` hoặc `StatefulWidget` nào do đó bạn nên sử dụng gói `foundation.dart`.

Dưới đây là 1 bản ghi dữ liệu mà sẽ được **REST API** trả về.

```json
{
    "message": "Recipes Fetched Successfully.",
    "recipes": [
        {
            "ingredients": [
                "Milk: 180 ml",
                "Sugar: 2 Tbsp",
                "Instant Yeast: 2 Tsp",
                "Plain Flour/Maida: 2 Cups",
                "Salt: 1/2 Tsp",
                "Room-temp Butter: 5tbsp",
                "Milk & Butter: For Brushing",
                "Oil: For greasing"
            ],
            "categories": [
                "5fa56a86240c6d54b32f5663",
                "5fa56e3c240c6d54b32f5667",
                "5fa77dc3bc146402c599efb6"
            ],
            "steps": [
                "Pour a lukewarm milk to a cup and, add and sugar, yeast.",
                "Mix well and keep aside for 10-15 minutes.",
                "Add the flour and salt in a bowl.",
                "After 10 minutes yeast mixture should look frothy.",
                "Add this mix to flour mixture and make a dough.",
                "It would be on the sticky paste side. Its absolutely perfect.",
                "Now add the butter to the dough and keep kneading for 15-20 mins.",
                "Do not add extra flour to the dough.",
                "After that transfer the dough to a big greased bowl and cover the bowl.",
                "Keep it aside for 60-90 mins until it is double in size.",
                "After the dough is fermented, take some maida dust your hands and punch down the dough.",
                "ake out and knead for 5 mins.",
                "Now divide the dough in equal potions and shape the dough.",
                "Now grease the pan and place the shaped dough.",
                "Cover the tin with damp cloth and keep aside for another 40-45 mins.",
                "Carefully remove the damp cloth after 30 minutes so that they don’t stick to the cloth. After 45 minutes.",
                "Brush the pav gently with milk.",
                "Gently place the cake tin in the oven and bake for 15 minutes at 200 C.",
                "Take them out immediately and brush the top part with butter.",
                "Wallah! Have it plain in your breakfast or with bhaji in your dinner."
            ],
            "_id": "5fa77fc6bc146402c599efb8",
            "title": "Dinner Roll / Pav",
            "imageUrl": "images/2020-11-08T05:19:01.845Z-pav.jpg",
            "duration": 250,
            "chef": {
                "_id": "5fa77f33bc146402c599efb7",
                "name": "Nidhi Saha",
                "profileImageUrl": "images/2020-11-08T05:16:35.202Z-nidhisaha.jpg"
            },
            "complexity": "SIMPLE",
            "affordability": "AFFORDABLE",
            "isVegetarian": true,
            "createdAt": "2020-11-08T05:19:02.158Z",
            "updatedAt": "2020-11-08T05:19:02.158Z",
            "__v": 0
        }
    ],
    "totalItems": 1
}
```

### Tạo provider

Dưới đây là đoạn mã của `recipe_provider.dart`.

```dart
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import '../models/recipe.dart';

class RecipeProvider with ChangeNotifier {
  List<Recipe> _recipes = [];

  List<Recipe> get recipes {
    return [..._recipes];
  }

  Future<Recipe> fetchAndSetRecipes() async {
    const url = 'https://bakeology-alpha-stage.herokuapp.com/user/recipes';
    try {
      final response = await http.get(url);
      final extractedData = json.decode(response.body) as Map<String, dynamic>;
      if (extractedData == null) {
        return null;
      }
      final List<Recipe> loadedRecipes = [];
      extractedData["recipes"].forEach((recipeData) {
        loadedRecipes.add(
          Recipe(
              id: recipeData["_id"],
              title: recipeData["title"],
              duration: recipeData["duration"],
              imageUrl: recipeData["imageUrl"],
              affordability: recipeData["affordability"],
              isVegetarian: recipeData["isVegetarian"],
              steps: recipeData["steps"],
              categories: recipeData["categories"],
              chef: recipeData["chef"]["_id"],
              chefName: recipeData["chef"]["name"],
              chefImageUrl: recipeData["chef"]["profileImageUrl"],
              complexity: recipeData["complexity"],
              ingredients: recipeData["ingredients"]),
        );
      });
      _recipes = loadedRecipes;
      notifyListeners();
    } catch (error) {
      print(error);
      throw error;
    }
  }
}
```

Bây giờ hãy cùng phân tích chút về `RecipeProvider`.

**Imports**

Bạn cần import gói `material.dart` để có thể có được `ChangeNotifier`. Ngoài ra, bạn cần `dart:convert` là một gói tiện ích chuyển đổi có chứa bộ mã hóa và giải mã để chuyển đổi các cách biểu diễn dữ liệu khác nhau, ở ví dụ này là chuyển đổi dữ liệu JSON.

Ngoài ra, bạn nên cài thêm gói `http` bằng việc thêm vào `pubspec.yaml` như dưới:

```yaml
dependencies:
  http: ^0.13.3
```

Bạn cần gói này để có thể lấy được dữ liệu từ REST API. Và bạn cũng nên import model công thức nấu ăn mà bạn đã tạo vào đây.

**Thêm `ChangeNotifier`**

`ChangeNotifier` được cung cấp bởi gói `material.dart`. `ChangeNotifier` có thể cho các lớp khác kế thừa nhưng thay vì kế thừa từ lớp, một số thuộc tính sẽ được hợp nhất với lớp đã xác định. Ở đây bạn sử dụng keyword `with` để thêm `ChangeNotifier` với lớp `RecipeProvider`.

**Khởi tạo các biến và phương thức getter**

Để chắc chắn rằng danh sách công thức nấu ăn mà bạn lấy được từ **REST API** là bất biến từ phía bên ngoài lớp `RecipeProvider`, bạn khai báo 1 danh sách các công thức nấu ăn là một mảng rỗng và là biến **private** do đó dấu _ được sử dụng.

Dãy rỗng này sẽ chấp nhận các giá trị đáp ứng các tiêu chí của `Recipe`. Lớp `Recipe` đã được xác định nên các phần tử trong danh sách này sẽ thuộc kiểu `Recipe`.

Cùng với danh sách đó, biến `_recipe` là private nên bạn cần xác định 1 phương thức getter để có thể lấy tất cả các danh sách nấu ăn. Getter này trả về 1 array mới với các phần tử `Recipe` được tạo bởi danh sách bất biến.

**Phương thức lấy dữ liệu từ REST API**

Bây giờ đến với phương thức `fetchAndSetRecipes() async { ... }` với kiểu trả về là `Future`. 

Tất cả các logic liên quan đến việc lấy dự liệu nằm trong khối `try { ... } catch(error) { ... }` để xử lý bất kì lỗi từ phía REST API.

Trong khối `try { ... }`, đầu tiên bạn lấy tất cả công thức nấu ăn từ JSON. Sau đó bạn sử dụng `json.decode(response.body)` để giải mã body response. Và cuối cùng là chuyển đổi nó thành `Map<String, dynamic>`. Kiểu giá trị trả về của value là `dynamic` vì value có thể là bất kì kiểu gì, chuỗi, dãy, số, ....

 Sau khi dữ liệu được giải mã và chuyển đổi thành `Map`, bạn xác định 1 `List<Recipe>` được khai báo với từ khóa `final` và khởi tạo rỗng. Bạn sẽ lưu trữ các công thức mà được lấy về từ **REST API** vào danh sách này và sau khi hoàn tất việc lưu trữ, bạn sẽ chuyển đổi nó sang biến **private** `_recipes`.

Cuối cùng là bạn thêm các phần tử với kiểu `Recipe` bởi vòng lặp và chuyển đổi nó sang kiểu `Recipe` của bạn. Sau khi quá trình hoàn tất và biến `loadedRecipes` hoàn thành thì ta sẽ chuyển tất cả dữ liệu ở trong nó sang biến `_recipes`.

**Phương thức `notifyListeners()`**

Sau khi bạn hoàn thành tất cả việc lấy và chuyển đổi dữ liệu, bạn sử dụng `notifyListeners()` để thông báo với tất cả các widget là consumer hoặc listeners của provider này. Điều này đảm bảo rằng dữ liệu nằm trong biến private `_recipes` thay đổi tất cả các widget là consumers / listeners sẽ rebuild để hiển thị thay đổi của dữ liệu.

Đó là tất cả những gì bạn cần làm để set up 1 `Provider` nhưng bạn vẫn chưa xong được. Bây giờ hãy xem cách bạn có thể kết nối các widget với `Provider` bạn vừa tạo.

### Kết nối Provider với Widget

Trước hết, bạn cần attach provider vào widget cha mà bạn cần cung cấp dữ liệu. Bạn có thể attach provider tại bất kì đâu nhưng hãy nhớ rằng widget được attach phải ở điểm cao nhất trong cây widget mà các widget con cần cung cấp data. Trong trường hợp này, bạn attach `RecipeProvider` vào widget cha của tất cả các widget là `MyApp`.

```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import './providers/recipe_provider.dart';

import './screens/home_screen.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
          create: (ctx) => RecipeProvider(),
          child: MaterialApp(
          debugShowCheckedModeBanner: false,
          title: 'Provider App Demo',
          theme: ThemeData(
            primarySwatch: Colors.blueGrey,
            accentColor: Colors.blueGrey[300],
            visualDensity: VisualDensity.adaptivePlatformDensity,
          ),
          home: HomeScreen(),
         ),
      ),
    );
  }
}
```

Sử dụng `ChangeNotifierProvider` là cách mà bạn attach provider tới điểm cao nhất trong cây widget của các widget con mà cần cung cấp dữ liệu. 

Widget `HomeScreen` là 1 widget stateless nhưng đang giữ 1 custom widget khác là `RecipeLisst`.  Và đây là mã của `home_screen.dart`:

```dart
import 'package:flutter/material.dart';

import '../widgets/recipe_list.dart';

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar:AppBar(
        title:Text('All Recipes'),
        centerTitle: true,
      ),
      body: Column(
        children: [
          SizedBox(height: 20),
          RecipeList(),
        ],
      ),
    );
  }
}
```

Còn đây là `recipe_list.dart`:

```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import './recipe_list_item.dart';

import '../providers/recipe_provider.dart';

class RecipeList extends StatefulWidget {
  @override
  _RecipeListState createState() => _RecipeListState();
}

class _RecipeListState extends State<RecipeList> {
  bool _isLoading = false;
  @override
  void initState() {
    setState(() {
      _isLoading = true;
    });
    Provider.of<RecipeProvider>(context, listen: false)
        .fetchAndSetRecipes()
        .then((_) {
      setState(() {
        _isLoading = false;
      });
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final recipeData = Provider.of<RecipeProvider>(context);
    final fetchedRecipes = recipeData.recipes;
    return _isLoading
        ? Center(
            child: CircularProgressIndicator(),
          )
        : Container(
            child: ListView.builder(
              shrinkWrap: true,
              itemCount: fetchedRecipes.length,
              itemBuilder: (context, index) => Padding(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 10),
                child: RecipeListItem(
                  recipeId: fetchedRecipes[i].id,
                  recipeTitle: fetchedRecipes[i].title,
                  recipeImageUrl: fetchedRecipes[i].imageUrl,
                  chefName: fetchedRecipes[i].chefName,
                  chefImageUrl: fetchedRecipes[i].chefImageUrl,
                  isVegetarian: fetchedRecipes[i].isVegetarian,
                  duration: fetchedRecipes[i].duration,
                ),
              ),
            ),
          );
  }
}
```

**Làm thế nào để widget `RecipeList` liên kết với `RecipeProvider`?**

- Trước hết, `RecipeList` là `StatefulWidget`. Ngoài provider, widget này có trạng thái riêng của nó. Trạng thái này xác định những gì sẽ được hiển thị trên màn hình. Nếu `recipes` đang được lấy từ REST API thì `_isLoading` là true, và lúc đó `CircularProgressIndicator()` được hiển thị. Khi `recipes` hoàn tất việc lấy dữ liệu thì danh sách công thức sẽ được hiển thị.
- Bây giờ, phương thức `initState() { ... }` thực thi khi widget `RecipeList` sắp được hiển thị trên màn hình. Nó chỉ thực thi trước khi được hiển thị và sau khi phương thức `build() { ... }` được thực thi. Đây là nơi thích hợp để thực thi phương thức `fetchAndSetRecipes() async { ... }` để lấy tất cả các công thức từ REST API.
- Để attach một listener, bạn sử dụng:

```dart
Provider.of<RecipeProvider>(context)...
```

Lúc này, code này giúp bạn attach tới listener từ provider và sẽ trigger tới phương thức `build() { ... }` của widget mỗi khi dữ liệu ở trong provider thay đổi.

> *"Lưu ý rằng ở trong phương thức `initState() { ... }`, bạn có một `Provider` nhưng bạn set `listen: false` vì bạn không attach với 1 listener ở trong phương thức này. Ngoài ra, bạn không cần một listener bên trong phương thức `initState() { ... }` vì bạn chỉ cần gọi tới hàm `fetchAndSetRecipes() async { ... }`."*

- `recipeData` là một listener bên trong widget với kiểu `final`. Vì biến này nằm trong phương thức `build() { ... }`, nên bất kì thay đổi của dữ liệu bên trong provider sẽ trigger phương thức `build() { ... }`.
- Tiếp theo, bạn sử dụng phương thức `getter` mà bạn đã xác định ở trong provider của bạn để lấy tất cả các công thức.
- Ngay sau khi dữ liệu có sẵn trong widget, bạn có thể hiển thị hoặc truyền dữ liệu vào widget khác theo cách của bạn. Trong trường hợp ví dụ trên, bạn truyền dữ liệu tới 1 widget khác là `RecipeListItem`, nơi hiển thị công thức nấu ăn trong danh sách công thức của bạn.

Đây là tất cả những gì bạn cần để thêm `Provider` vào trong ứng dụng của bạn. Và đây là điều cho bạn.

> "Trong trường hợp dữ liệu nằm trong `RecipeProvider` chỉ thay đổi `RecipeList` và widget con của nó, `RecipeListItem` sẽ rebuild. `HomeScreen` với `AppBar` và `SizedBox` sẽ không rebuild lại."
# Tài liệu tham khảo
1. [Flutter Advanced - Elegant State Management | Introduction to Provider](https://shashankbiplav.me/flutter-advanced-elegant-state-management-introduction-to-provider)
2. [Package Provider](https://pub.dev/packages/provider)
3. [Flutter Provider document](https://pub.dev/documentation/provider/latest/)