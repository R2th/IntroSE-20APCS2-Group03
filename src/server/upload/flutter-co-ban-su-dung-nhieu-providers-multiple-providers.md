![image.png](https://images.viblo.asia/7904510e-5638-46f3-9925-c0aa80c3ab07.png)

Trong phần trước của seri Flutter cơ bản, chúng ta đã có một cái nhìn sâu hơn về cách provider dùng để xử lý state management. Nhưng điều gì sẽ xảy ra nếu chúng ta phải triển khai nhiều providers trong ứng dụng của mình và listen chúng trong các widget khác nhau ở những vị trí khác nhau và theo những cách khác nhau.

Trong bài viết này, chúng ta có thể triển khai nhiều providers trong ứng dụng, lắng nghe chúng trong các widget khác nhau ở các vị trí khác nhau trong ứng dụng. Hãy bắt đầu nhé.

Bạn có thể xem bài viết đầy đủ tại [200Lab Education](https://200lab.io/blog/flutter-co-ban-su-dung-nhieu-provider/)

## Tìm hiểu vấn đề

Giả sử bạn đang xây dựng một ứng dụng Thương mại điện tử. Nó sẽ có nhiều loại dữ liệu như sản phẩm, giỏ hàng, danh mục, dữ liệu người dùng, v.v. Bạn có thể xử lý tất cả dữ liệu bên trong một provider duy nhất và kết nối nó với ứng dụng của bạn. Tất cả dữ liệu đó sẽ quá lộn xộn, khó gỡ lỗi và khó bảo trì hơn.

Đây là lý do tại sao mình muốn chia tất cả dữ liệu ứng dụng thành nhiều providers (multiple providers). Vấn đề đối với cách tiếp cận này là việc phải kết nối tất cả các provider này với nhiều widget khác nhau ở các vị trí khác nhau trong ứng dụng của chúng ta. Đây là những gì chúng ta sẽ làm rõ trong bài viết này.

## App ví dụ trong bài viết

Ở đây chúng ta sẽ có hai providers là RecipeProvider và CategoryProvider, nơi chúng ta sẽ xử lý tất cả các recipe và category. Bạn sẽ thấy tất cả các thiết lập và code liên quan đến RecipeProvider trong bài viết trước của seri này.

https://200lab.io/blog/flutter-advanced-elegant-state-management-gioi-thieu-ve-provider/

Vì vậy, hãy bắt đầu thiết lập một provider khác, tức là CategoryProvider, trong đó chúng ta sẽ lưu trữ tất cả categories data.

## Thiết lập Category Provider‌‌

### REST API endpoint‌‌

Nếu bạn muốn tự chạy thử endpoint thì đây là URL, dùng method GET:

```
https://bakeology-alpha-stage.herokuapp.com/user/categories
```

Dữ liệu JSON sẽ trông như thế này:

```
{
    "message": "Categories Fetched Successfully.",
    "categories": [
        {
            "recipes": [
                "5fa77fc6bc146402c599efb8",
                "5ff70302369bf30004e1d802"
            ],
            "_id": "5fa56a86240c6d54b32f5663",
            "title": "Baking",
            "colorA": "#F7FBD5",
            "colorB": "#43C6AC",
            "iconImageUrl": "images/2020-11-06T15:23:50.518Z-cupcake.png",
            "__v": 4
        },
        {
            "recipes": [],
            "_id": "5fa56bd4240c6d54b32f5665",
            "title": "Salads",
            "colorA": "#F4D0D4",
            "colorB": "#EE9CA7",
            "iconImageUrl": "images/2020-11-06T15:29:24.207Z-food.png",
            "__v": 0
        },
        {
            "recipes": [],
            "_id": "5fa56cdf240c6d54b32f5666",
            "title": "Appetizers",
            "colorA": "#86fde8",
            "colorB": "#acb6e5",
            "iconImageUrl": "images/2020-11-06T15:33:51.172Z-appetizers.png",
            "__v": 0
        },
        {
            "recipes": [
                "5fa77fc6bc146402c599efb8"
            ],
            "_id": "5fa56e3c240c6d54b32f5667",
            "title": "Breakfast",
            "colorA": "#E4E5E6",
            "colorB": "#00416A",
            "iconImageUrl": "images/2020-11-06T15:39:40.357Z-breakfast.png",
            "__v": 3
        },
        {
            "recipes": [],
            "_id": "5fa77d81bc146402c599efb5",
            "title": "Lunch",
            "colorA": "#ffa751",
            "colorB": "#ffe259",
            "iconImageUrl": "images/2020-11-08T05:09:21.830Z-lunch.png",
            "__v": 0
        },
        {
            "recipes": [
                "5fa77fc6bc146402c599efb8",
                "5ff70302369bf30004e1d802"
            ],
            "_id": "5fa77dc3bc146402c599efb6",
            "title": "Dinner",
            "colorA": "#2c3e50",
            "colorB": "#bdc3c7",
            "iconImageUrl": "images/2020-11-08T05:10:27.294Z-dinner.png",
            "__v": 2
        }
    ],
    "totalItems": 6
}
```

### Tạo model Category

Chúng ta sẽ dùng MVC, vì vậy hãy tạo một file category.dart trong models folder. Tệp category.dart của chúng ta sẽ trông giống như thế này:

```
import 'package:flutter/foundation.dart';

class Category {
  final String id;
  final String title;
  final String colorA;
  final String colorB;
  final String iconImageUrl;
  final List<dynamic> recipes;

  Category(
      {@required this.id,
      @required this.title,
      @required this.colorA,
      @required this.colorB,
      @required this.iconImageUrl,
      @required this.recipes});
}
```

Chúng ta sẽ sử dụng category model này để map tất cả dữ liệu đến từ backend tới provider của chúng ta.

### Tạo CategoryProvider‌‌

Mình đặt tên provider cho các category là category_provider.dart. Chúng ta sẽ tạo provider này trong providers folder. Code sẽ trông như thế này:

```
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import '../models/category.dart';

class CategoryProvider with ChangeNotifier {
  List<Category> _categories = [];

  List<Category> get categories {
    return _categories;
  }

  Future<Category> fetchAndSetCategories() async {
    var url = 'https://bakeology-alpha-stage.herokuapp.com/user/categories';
    try {
      final response = await http.get(url);
      final extractedData = json.decode(response.body) as Map<String, dynamic>;
      if (extractedData == null) {
        return null;
      }
      final List<Category> loadedCategories = [];
      extractedData["categories"].forEach((categoryData) {
        loadedCategories.add(
          Category(
            id: categoryData["_id"],
            title: categoryData["title"],
            colorA: categoryData["colorA"],
            colorB: categoryData["colorB"],
            iconImageUrl: categoryData["iconImageUrl"],
            recipes: categoryData["recipes"],
          ),
        );
      });
      _categories = loadedCategories;
      notifyListeners();
    } catch (error) {
      print(error);
      throw error;
    }
  }
}
```

Category provider trông giống như Recipe provider. Ở đây, chúng ta map tất cả dữ liệu liên quan đến category mà chúng ta nhận được từ backend vào provider. Để biết thêm thông tin chi tiết về cách dữ liệu được map và về `ChangeNotifier`, hãy xem lại bài trước nhé các bạn.‌‌

Tính đến nay, chúng ta có hai provider là `RecipeProvider` và `CategoryProvider`. Bây giờ hãy xem bằng cách nào để có thể kết nối hai provider này trong file `main.dart`.‌‌

### Liên kết các Provider ở đầu Widget Tree của chúng ta‌‌

Chúng ta sẽ liên kết tất cả các provider của chúng ta với điểm cao nhất có thể trong widget tree. Do đó, file main.dart của chúng ta sẽ trông giống như thế này:

```
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import './providers/recipe_provider.dart';
import './providers/category_provider.dart';

import './screens/home_screen.dart';

void main() => runApp(MyApp());


class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (ctx) => RecipeProvider(),
        ),
        ChangeNotifierProvider(
          create: (ctx) => CategoryProvider(),
        ),
      ],
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Multi Provider Demo App',
        theme: ThemeData(
          primarySwatch: Colors.blueGrey,
          accentColor: Colors.blueGrey[300],
          fontFamily: 'Poppins',
          visualDensity: VisualDensity.adaptivePlatformDensity,
        ),
        home: HomeScreen(),
      ),
    );
  }
}
```

### ❖ MultiProvider‌‌

MultiProvider được sử dụng để đính kèm nhiều provider vào ứng dụng cùng một lúc. Như bạn có thể thấy trong đoạn code trên, cả `RecipeProvider` và `CategoryProvider` đều được sử dụng. Nó có thể thêm được nhiều provider hơn tuỳ theo yêu cầu của bạn.‌‌

### HomeScreen - widget chính của chúng ta‌‌

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
          CategoryList(),
          SizedBox(height: 20),
          RecipeList(),
        ],
      ),
    );
  }
}
```

Tại đây, bạn có thể thấy rằng chúng ta có các `RecipeList()` widget và `CategoryList()` widget.‌‌

Bản thân HomeScreen là một stateless widget và sẽ không rebuild ngay cả khi các RecipeList() widget hoặc CategoryList() widget sẽ rebuild do thay đổi dữ liệu của provider liên quan.‌‌

## Các cách khác nhau để listen dữ liệu trong Provider

### Listen data từ provider sử dụng `Provider.of<...>(context)‌‌`

Trong RecipeList widget, chúng ta sẽ sử dụng `Provider.of<..>(context)` để kết nối widget của chúng ta với provider. Vì vậy, RecipeList widget `recipe_list.dart` của chúng ta sẽ trông như thế này:

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

Đây khá giống với code mà chúng ta đã viết và thảo luận trong bài viết trước. Bây giờ chúng ta hãy xem thử một cách tiếp cận khác để sử dụng dữ liệu từ provider.‌‌

Sử dụng Consumer để kết nối dữ liệu với widget của chúng ta‌‌

Bây giờ chúng ta hãy xem thử CategoryList widget. Tệp `category_list.dart` của chúng ta sẽ trông giống như thế này:

```
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import './category_list_item.dart';

import '../providers/category_provider.dart';

class CategoryList extends StatefulWidget {
  @override
  _CategoryListState createState() => _CategoryListState();
}

class _CategoryListState extends State<CategoryList> {
  bool _isLoading = false;
  @override
  void initState() {
    setState(() {
      _isLoading = true;
    });
    Provider.of<CategoryProvider>(context, listen: false)
        .fetchAndSetCategories()
        .then((_) {
      setState(() {
        _isLoading = false;
      });
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return  _isLoading
        ? Center(
            child: CircularProgressIndicator(),
            ),
          )
        : Consumer<CategoryProvider>(
      builder: (context, categoryData, _) =>  Container(
            child: ListView.builder(
              shrinkWrap: true,
              scrollDirection: Axis.horizontal,
              itemCount: categoryData.categories.length,
              itemBuilder: (context, index) => Padding(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 10),
                child: CategoryListItem(
                  categoryId: categoryData.categories[index].id,
                  colorA: categoryData.categories[index].colorA,
                  colorB: categoryData.categories[index].colorB,
                  iconImageUrl: categoryData.categories[index].iconImageUrl,
                  title: categoryData.categories[index].title,
                ),
              ),
            ),
          ),
        );
  }
}
```

Widget này cũng tương tự như RecipeList widget. Nó cũng có state riêng bên trong để cho biết quá trình tìm nạp dữ liệu đã kết thúc hay đang diễn ra bằng cách hiển thị một `CircularProgressIndicator().‌‌`

❖ Sự khác biệt chính ở đây là chúng ta không sử dụng `Provider.of(context)` nữa. Thay vào đó, chúng ta đang sử dụng `Consumer`. Consumer sẽ wrap widget tree quan tâm đến dữ liệu có thay đổi để thực hiện update widget .‌‌

### Cách thức hoạt động của Consumer?‌‌

* Consumer sẽ dùng method builder thay vì chỉ là object child. Builder cần chính xác 3 tham số là `BuildContext`,  category data và sau đó là một Widget.‌‌
* Consumer là generic type vì vậy chúng ta phải chỉ định loại dữ liệu nào chúng ta muốn sử dụng. Trong trường hợp của này, ta đang sử dụng dữ liệu từ CategoryProvider do đó chúng mình sẽ viết `Consumer<CategoryProvider>(...).‌‌`
* Bạn có thể so sánh điều này với `Provider.of<...>(context)` vì cả hai đều thiết lập active listener đối với provider và kích hoạt hàm build khi dữ liệu thay đổi.‌‌
* Builder sẽ nhận BuildContext mà chúng ta cung cấp bằng cách sử dụng context có sẵn bên trong widget của chúng ta.‌‌
* Nó cũng nhận được instance dữ liệu. Giống như trong trường hợp trên, chúng ta nhận được snapshot dữ liệu mới nhất từ ​​CategoryProvider có tên biến là categoryData.‌‌

>Ở tham số thứ ba, nó là một Widget. Nếu chúng ta chuyển một phần nhất định của widget tree của mình làm tham số thứ ba cho Consumer, tức là widget không cần dữ liệu của provider nhưng vẫn là một phần của widget phụ thuộc vào provider, thì Consumer sẽ ngăn không để widget đó bị rebuild, từ đó tăng hiệu năng hơn nữa.‌‌

Từ đó, cả `Provider.of<...>(context)` và `Consumer<...>` đều giống nhau, ngoại trừ sự khác biệt là trong Consumer, bạn thậm chí có thể tối ưu hóa hàm build được hơn nữa bằng cách cung cấp các child widget đó cho Consumer. Vì vậy, chỉ cần build lại những Widget thực sự cần mà thôi!‌‌

## Các cách khác nhau lấy dữ liệu của Provider‌‌

Bên cạnh dùng `Provider.of<...>(context)` và `Consumer<...>` để cung cấp dữ liệu cho các widget, chúng ta cũng có những cách khác để gắn các Provider ở điểm cao nhất có thể trong widget tree của chúng ta ngoài ChangeNotifierProvider.‌‌

### ❖ ChangeNotifierProvider.value()‌‌

Ngoài ChangeNotifierProvider, chúng ta cũng có thể sử dụng `ChangeNotifierProvider.value()`. `value()` constructor có một use case quan trọng.‌‌

* Trong trường hợp bạn đang sử dụng Provider ở đâu đó trong widget tree và cung cấp dữ liệu vào một List hoặc Grid. Một lúc nào đó, bạn sẽ chuyển màn hình (navigate) đến một số phần khác của ứng dụng, sau đó Flutter sẽ dùng lại các widget bạn đang đính kèm provider mà không phải là trường hợp trong ChangeNotifierProvider trước đó.‌‌
* Khi sử dụng `value() constructor`, bạn phải đảm bảo rằng Provider hoạt động ngay cả khi dữ liệu thay đổi cho widget. Nếu bạn có một builder function không hoạt động chính xác và nếu các widget không được dùng lại, nó có thể dẫn đến rò rỉ bộ nhớ (memory leaks) vào một thời điểm nào đó sau này.‌‌

Điều này xảy ra do các widget được Flutter re-use nhưng dữ liệu được đính kèm vào widget thay đổi. Trong trường hợp value() constructor này, chúng ta cần phải đảm bảo rằng provider hoạt động ngay cả khi dữ liệu thay đổi cho widget và sẽ hoạt động bình thường vì nó không còn bị ràng buộc với widget.‌‌

Cách tiếp cận này đảm bảo rằng provider được liên kết với dữ liệu của nó hơn là widget. Ngoài ra, nếu chúng ta sử dụng nó, provider có thể bắt kịp sự thay đổi thường xuyên của dữ liệu và do đó nó được đề xuất sử dụng trong trường hợp dữ liệu thay đổi quá nhiều. Trong trường hợp list/grid mà chúng ta phân trang dữ liệu từ backend và nhận theo từng trang (nhiều items), đây là cách tiếp cận được đề xuất.‌‌

> Lưu ý thêm: hãy sử dụng `value() constructor` nếu bạn đang đính kèm provider của mình ở đâu đó bên dưới trong widget tree. Không sử dụng phương pháp tiếp cận `value() constructor` này nếu bạn đang đính kèm các provider của mình trong  `main.dart`.‌‌
> 
> Đây không phải vì provider của bạn sẽ không hoạt động nhưng đó là best practice.‌‌

❖ ChangeNotifierProvider‌‌

* ✅ Nếu bạn đang sử dụng các provider của mình ở đầu widget tree (tức là main.dart) thì việc sử dụng ChangeNotifierProvider này rất tốt.
* Cách tiếp cận này đảm bảo rằng provider liên kết chặt chẽ với widget.
* Không sử dụng value() constructor nếu bạn đang đính kèm provider của mình vào tệp main.dart.‌‌

## Kết luận‌‌

Đây là những cách tiếp cận để bạn có thể cung cấp dữ liệu từ provider cho các phần khác nhau của ứng dụng và tùy theo tình huống sử dụng của bạn. Mình hy vọng bạn đã hiểu rõ hơn về cách sử dụng dữ liệu và cung cấp dữ liệu cho các phần khác nhau trong ứng dụng của bạn bằng cách sử dụng các cú pháp khác nhau do provider package mang lại.

‌‌Bài viết được lược dịch từ [Shashank Biplav](https://shashankbiplav.me/flutter-advanced-using-multiple-providers).