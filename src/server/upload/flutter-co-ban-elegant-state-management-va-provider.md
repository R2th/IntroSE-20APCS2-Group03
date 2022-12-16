![image.png](https://images.viblo.asia/6036d974-3dbc-4bca-a1d4-612ff2c16b28.png)

Cho đến bài viết này trong seri, chúng ta chỉ thấy các state ở trong một hoặc hai widget. Bây giờ, chúng ta sẽ dùng state cho toàn app, tức là chúng ta sẽ xử lý state trên toàn ứng dụng và quản lý nó một cách hợp lý (elegant) nhất có thể. Để làm được điều này, mình sẽ giới thiệu bạn về **Provider**.

Bạn có thể xem bài viết đầy đủ tại [200Lab Education](https://200lab.io/blog/flutter-advanced-elegant-state-management-gioi-thieu-ve-provider/)

## Vấn đề cần giải quyết

Hãy tưởng tượng bạn đang xây dựng một dự án Flutter có số lượng widget đáng kể. Trong Widget Tree của bạn, nếu bất kỳ child widget nào cần dữ liệu, bạn cần truyền vào thông qua các constructor của nó.

Điều đó sẽ dẫn đến các constructor gặp nhiều hạn chế và có khả năng sẽ cần nhiều dữ liệu hơn ngay cả khi dữ liệu đó chưa được dùng ngay. Nhưng constructor vẫn phải nhận hết để chuyển cho child của nó.

Cách tiếp cận này sẽ dẫn đến việc rebuild không cần thiết vì một số dữ liệu sẽ thay đổi mà chúng ta đã thảo luận trong các bài trước.

Điều này làm cho code bị lộn xộn, dễ bị lỗi và không thể bảo trì.  Đây là lúc **Provider** phát huy tác dụng. Nhưng trước khi bắt đầu, chúng ta hãy xem còn những lý do nào khác để chúng ta nên chọn **Provider** làm công cụ quản lý state (state management) thay vì các lựa chọn khác.

## Vì sao cần Provider?

* Provider không cần setup những đoạn code dư thừa và vô nghĩa.
* Hoàn toàn tách biệt logic khỏi các widget.
* Dễ hiểu và thân thiện với người mới bắt đầu. Ngay cả một người mới bắt đầu sử dụng Flutter cũng có thể hiểu được những gì đang xảy ra đằng sau chúng.
* Cấu trúc thư mục dự án rõ ràng.
* Nó được Google và Flutter đề xuất chính thức. Điều này có lẽ đã đủ thuyết phục.

Bạn sẽ thấy cái hay của **Provider** trong bài viết này cũng như những bài sắp tới. Vì vậy, hãy làm quen với **Provider**.

## Provider là gì?

> Provider là một wrapper (vỏ bọc) cho InheritedWidget để giúp chúng dễ sử dụng hơn và có thể tái sử dụng nhiều hơn.

Đây là định nghĩa chính thức. Mình sẽ giải thích chi tiết hơn:

**Provider** là một package cung cấp cho chúng ta một pipeline để chúng ta có thể kết nối đến cách widget của mình. Hãy coi các provider như máy bơm nhiên liệu / ở trạm xăng và các widget như phương tiện đi lại. Nhiên liệu chính là dữ liệu cho Widget.

Tất cả các widget đều cần dữ liệu (xe cần nạp nhiên liệu) sẽ được chuyển đến provider (trạm xăng) và kết nối với một vòi bơm để refill và các widget (xe) không cần nhiên liệu (dữ liệu) sẽ đơn giản bỏ qua chúng.

Đây chính là cách hoạt động của provider. Nó chỉ đơn giản là cung cấp dữ liệu cho các widget nhất định cần nó và thậm chí không quan tâm đến những widget không cần dữ liệu cụ thể.

Đó là lý do tại sao định nghĩa nói rằng nó là vỏ bọc (wrapper) bao quanh widget của bạn như một pipeline và cung cấp dữ liệu cần thiết.

Để hiểu rõ hơn, bạn hãy xem thử ví dụ dưới đây

![image.png](https://images.viblo.asia/0c3f664e-874d-4883-94d1-1c031f2047f4.png)

* Ở đây, chúng ta có một widget tree với widget MyApp ở trên cùng là parent của tất cả các child widget.
* Provider chỉ bao gồm data/state và chúng ta đính kèm provider vào một widget mà trong trường hợp này là ở trên cùng của widget tree, tức là MyApp.
* Ngay sau khi provider được đính kèm vào bất kỳ widget nào, tất cả các child widget có thể lắng nghe data/state của từ provider.
* Ở đây chúng ta có thể thấy rằng child widget thứ nhất và thứ ba đang lắng nghe provider trong khi widget thứ hai thì không.
* Ngay sau khi có bất kỳ thay đổi nào về data/state trong provider, phương thức `build(){...}` của child widget thứ nhất và thứ ba sẽ được thực thi và những widget đó sẽ được rebuild.
* Child widget thứ hai sẽ không rebuild một cách không cần thiết trong quá trình rebuild child widget thứ nhất và thứ ba.
* Các child widget có thể **Stateful** hoặc **Stateless**, điều đó không quan trọng vì dữ liệu được cung cấp bên ngoài bởi provider nên chúng sẽ rebuild ngay khi dữ liệu thay đổi.

> Dữ liệu được truyền từ provider tới các widget không phải bởi các constructor trong widget tree mà bằng cách biến các widget đó trở thành `active listener` hoặc `consumer` của **provider**.

Đó cách mà Provider hoạt động, vì vậy hãy xem họ hoạt động như thế nào nhé.

### Cài đặt Provider

Cài đặt **Provider** chỉ là thêm phần sau vào file pubspec.yaml của bạn và chạy `flutter pub get`:

```
dependencies:
  provider: ^4.3.3
```

### Sử dụng Provider

Bây giờ chúng ta sẽ triển khai **provider** trong ứng dụng Flutter nhưng trước đó hãy xem cấu trúc file mà chúng ta đang sử dụng:

```
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

Hãy tạo một thư mục riêng cho tất cả các provider mà bạn cần để tất cả logic cho xử lý state và dữ liệu sẽ nằm trong một thư mục duy nhất tách biệt với các widget khác của chúng ta. Tất cả các widget trả về `Scaffold Widget` là một màn hình riêng biệt trong Flutter, do đó chúng ta tách các widget đó khỏi các widget khác. Tất cả các widget còn lại sẽ nằm trong thư mục widgets.

Có thể có nhiều thư mục lồng nhau hơn nếu chúng ta muốn có một ứng dụng lớn hơn và phức tạp hơn. Ví dụ: tất cả các provider xử lý xác thực người dùng có thể nằm trong một thư mục riêng biệt bên trong thư mục providers, v.v.

Đó là ví dụ cơ bản về cấu trúc thư mục được sử dụng nhiều trong các ứng dụng production-level để dễ đọc và bảo trì code hơn.

### Tạo Provider đầu tiên

Tạo file dart bên trong thư mục provider với tên liên quan đến loại dữ liệu mà provider của bạn đang lưu trữ. Trong trường hợp của mình, mình đang lưu trữ tất cả các recipe được lấy từ REST API

### Tạo model

Ngoài ra, chúng ta sẽ sử dụng kiến trúc MVC ở đây. Vì vậy, mình đã tạo một `Recipe` model trong thư mục model có tên là recipe.dart. Model `recipe.dart` sẽ trông như thế này:

```
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

Code ở trên bạn có thể thấy rằng chúng ta đã khai báo một recipe model chứa tất cả các biến mà chúng ta cần. Ngoài ra, chúng ta có một phương thức khởi tạo với các thông tin bắt buộc thông qua `@required decorator`. Decorator cung cấp cho chúng ta bởi `foundation.dart` package. Nó cũng có sẵn trong `material.dart` nhưng chúng ta không cần bất kỳ **StatelessWidget** hoặc **StatefulWidget** class nào do đó chúng ta sử dụng gói foundation.dart này là đủ rồi.

Có thể bạn sẽ thắc mắc tại sao model lại được tạo như thế?! Đây là snapshot dữ liệu đến từ REST API:

```
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

Trong trường hợp bạn muốn tự mình thử REST API, đây là URL:

```
https://bakeology-alpha-stage.herokuapp.com/user/recipes
```

Đây là cách dữ liệu từ API được mapping vào model! Bây giờ chúng ta hãy tạo một **provider** để lưu trữ tất cả dữ liệu trên.

### Tạo provider

Mình đang đặt tên provider của mình là `recipe_provider.dart`. Đây là code của nó:

```
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

Bây giờ chúng ta hãy xem điều gì đang xảy ra bên trong **RecipeProvider** này.

### ❖ Imports

Chúng ta import `material.dart` package để cung cấp `ChangeNotifier` mixin. Ngoài ra, chúng ta cần `dart:convert` là một tiện ích chuyển đổi package có chứa bộ mã hoá (encoders) và bộ giải mã (decoders) để chuyển đổi giữa dữ liệu (data representations) khác nhau, ví dụ ở đây là chuyển đổi dữ liệu JSON.

Ngoài ra, hãy cài đặt `http` package bằng cách đưa package này vào pubspec.yaml của bạn:

```
 http: ^0.12.2
```

Chúng ta cần package này để thực hiện gọi **REST API** đã cung cấp ở trên.

### ❖ Thêm ChangeNotifier

`ChangeNotifier` là một **mixin** (khái niệm trong **Flutter**) cung cấp cho chúng ta bởi `material.dart` package. Một **mixin** giống như việc mở rộng một class nhưng sự khác biệt là thay vì kế thừa từ class, một số thuộc tính của mixin được hợp nhất vào class đã xác định của chúng ta, khiến class sẽ giống như sở hữu luôn các thuộc tính mà mixin mang lại. Do đó, chúng ta sử dụng từ khóa with để thêm mixin `ChangeNotifier` vào `RecipeProvider` class.

### ❖ Instance Variables và Getter Methods

Để đảm bảo rằng danh sách các recipe mà chúng ta lầy từ **REST API** là immutable từ bên ngoài `RecipeProvider` class này, chúng ta sẽ khai báo danh sách các recipe (class do chúng ta xác định) chỉ là một mảng rỗng và là một **private** variable do đó là dấu `_` (dấu gạch dưới ) được sử dụng.

Mảng rỗng này sẽ chấp nhận các giá trị đáp ứng các tiêu chí của một Recipe. `Recipe` class được định nghĩa bởi chúng ta. Mỗi element trong danh sách này sẽ có kiểu là `Recipe`.

Vì variable `_recipe` là private, chúng ta khai báo một hàm `getter` để có thể truy xuất tất cả các recipe. Getter này trích xuất `_recipes` variable, copy trả về một mảng mới giống hệt mảng Recipe private, do đó làm cho mảng ban đầu trở nên **immutable**.

### ❖ Hàm lấy data từ REST API

Bây giờ chúng ta đến với hàm `fetchAndSetRecipes() async {...}` sẽ trả về `Future`. Là một generic type, chúng ta chỉ định chức năng này sẽ trả về Recipe trong tương lai, do đó sẽ là `Future<Recipe>`.

Tất cả logic lấy dữ liệu đều được đặt trong khối `try{...} catch(error){...}` để xử lý các lỗi từ backend - REST API.

Bên trong khối `try{...}`, trước tiên chúng ta tìm các recipe ban đầu ở định dạng **JSON**. Sau đó, chúng ta sử dụng phương thức `json.decode(response.body)` để decode phần body rồi cuối cùng chuyển đổi nó thành một Map cũng là một generic type. Các key trong Map là `string` và values là `dynamic` vì values có thể là bất kỳ kiểu dữ liệu nào, tức là mảng, chuỗi, số, v.v. Do đó, chúng ta decode response body dưới dạng `Map<String, dynamic>`.

Một khi dữ liệu đã được decode và chuyển đổi thành Map, thì chúng ta khai báo một `List<Recipe>` rỗng. Ban đầu, chúng ta sẽ lưu trữ các recipe đã tìm thấy trong danh sách này trước và sau đó khi mảng này được hoàn thiện, chúng ta chuyển nó sang biến private `_recipes`.

Chúng ta thêm từng Recipe bằng cách lặp lại từng recipe chuyển đổi nó thành type Recipe của riêng chúng ta. Khi quá trình này hoàn tất và `loadedRecipes` variable sẽ dầy. Chúng ta gán tất cả dữ liệu bên trong nó cho private variable `_recipes`.

### ❖ notifyListeners() function

Sau khi hoàn thành tất cả việc **fetching** và **mapping** dữ liệu, chúng ta sử dụng `InformListists()` để thông báo cho tất cả các widget là consumers hoặc listeners của provider này. Điều này đảm bảo rằng một khi dữ liệu bên trong private variable `_recipes` của chúng ta thay đổi, tất cả các widget là consumers/listeners cũng sẽ rebuild phản ánh sự thay đổi trong dữ liệu.

Đó là tất cả những gì chúng ta cần để set up Provider.  Tuy nhiên, chúng ta vẫn chưa hoàn thành đâu. Bây giờ chúng ta hãy xem cách để chúng ta có thể kết nối các widget với provider của chúng ta.

### Liên kết các widget với Provider

Trước hết, chúng ta cần gắn provider với một widget là parent của các widget mà chúng ta cần dữ liệu của provider. Bạn có thể dùng provider ở bất cứ đâu nhưng hãy nhớ rằng widget nhận phải là điểm cao nhất có thể trong widget tree của các Wiget có liên quan! Trong trường hợp này, chúng ta dùng `RecipeProvider` trong `MyApp` widget. Đây là parent cho tất cả các widget. Vì vậy, file main.dart sẽ như sau:

```
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

Đây là cách chúng ta gắn provider trong widget tree thông qua `ChangeNotifierProvider`. Chúng ta sẽ thảo luận nhiều hơn về vấn đề này trong các bài viết sắp tới nhưng hiện tại, chúng ta hãy chuyển sang các `HomeScreen` và `RecipeList` widget.

Hãy xem HomeScreen widget là một stateless widget nhưng chứa một widget RecipeList tùy chỉnh khác. `Home_screen.dart` sẽ trông như thế này:

```
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

và `recipe_list.dart` sẽ trông như thế này:

```
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

### Làm thế nào để RecipeList widget được liên kết với RecipeProvider?

* Trước hết `RecipeList` là một **StatefulWidget**. Ngoài provider, widget này còn có state bên trong của riêng nó. State bên trong này xác định những gì cuối cùng được hiển thị trên màn hình. Nếu các recipe đang được tìm nạp từ REST API thì `_isLoading` là `true`. Do đó, một `CircularProgressIndicator()` được hiển thị và nếu quá trình tải các recipe đã hoàn tất thì recipe list sẽ được hiển thị.
* Bây giờ, phương thức `initState(){...}` sẽ thực thi bất cứ khi nào RecipeList widget sắp được hiển thị trên màn hình. Nó thực thi ngay trước khi render và sau khi phương thức `build(){...}` được thực thi. Do đó, phương pháp này là hoàn hảo để thực thi hàm `fetchAndSetRecipes() async {...}` của chúng ta để tìm nạp tất cả các recipe từ REST API.
* Để đính kèm **active listener**, chúng ta sử dụng:

```
Provider.of<RecipeProvider>(context)....
```

Hàm này sẽ gắn một **active listener** vào **provider** và sẽ kích hoạt phương thức `build(){...}` của widget bất cứ khi nào dữ liệu bên trong provider thay đổi.

> Hãy lưu ý rằng bên trong phương thức `initState(){...}`, chúng ta có một Provider nhưng chúng ta đã khai báo `listen: false` vì chúng ta không thể gán vào một active listener bên trong phương thức này.
> 
> Ngoài ra, chúng ta cũng không cần một active listener bên trong phương thức `initState(){...}` vì chúng ta chỉ cần call hàm `fetchAndSetRecipes() async {...}`.

* Active listener trong widget của chúng ta là recipeData được khai báo là `final`. Vì biến này nằm bên trong phương thức `build(){...}` của widget, bất kỳ thay đổi nào về dữ liệu bên trong provider cũng sẽ kích hoạt phương thức `build(){...}` của widget của chúng ta.
* Tiếp theo, chúng ta sử dụng phương thức getter đã khai báo trong provider để có được tất cả các recipe. Các phương thức getter trong Dart có thể được gọi đơn giản bằng tên của chúng, do đó, `recipeData.recipes` chính là dùng phương thức getter ấy.
* Khi dữ liệu đã có sẵn bên trong widget, bạn có thể hiển thị hoặc chuyển dữ liệu cùng với một widget khác theo yêu cầu của bạn. Trong trường hợp của mình, mình đã chuyển dữ liệu cho một widget `RecipeListItem` khác. Nó sẽ hiển thị các recipe riêng lẻ một cách đẹp mắt.

Đây là tất cả những gì bạn cần làm để thêm **provider** làm **state manager** trong ứng dụng của mình. Trong trường hợp dữ liệu bên trong **RecipeProvider** chỉ thay đổi **RecipeList** widget và child của nó, tức là **RecipeListItem** sẽ rebuild. Ở **HomeScreen** cụ thể là **AppBar** và các **SizedBox** widget thì sẽ không rebuild.

## Kết

Mình hy vọng rằng bạn có thể thấy được những lợi ích của việc sử dụng **provider** về lâu dài. Không bị nhiều **boilerplate code** và nó cũng ngăn việc widget rebuild không cần thiết. Tóm lại, nó sẽ giúp đôi bên cùng có lợi. Mình mong là điều này sẽ làm cho provider trở thành người bạn đồng hành khi giải quyết các vấn đề state management trong Flutter.

Bài viết được lược dịch từ [Shashank Biplav](https://shashankbiplav.me/flutter-advanced-elegant-state-management-introduction-to-provider).