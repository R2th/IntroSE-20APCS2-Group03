Từ lúc bắt đầu học Java đến giờ, mình cứ nghĩ đã hiểu được tính chất thừa kế trong Java là gì và nó hoạt động như thế nào. Nhưng thực sự trong quá trình làm việc, mình mới nhận ra rằng còn rất nhiều thứ đằng sau tính chất thừa kế mà mình chưa biết. Sau đây là một số điều thú vị mình mới phát hiện ra, nếu bạn đọc muốn bổ sung hoặc sửa sai ở đâu thì cứ thoải mái comment ở bên dưới nhé. Let's get into this!.
## this và super có khác nhau?
Trong thừa kế, lớp con sẽ lấy các thuộc tính của lớp cha. Một lưu ý quan trọng là khi đối tượng của lớp con được khởi tạo, thì một đối tượng riêng biệt của lớp cha sẽ không được khởi tạo. Chỉ có một đối tượng của lớp con được khởi tạo, đối tượng đó sẽ chứa các biến của lớp cha. Lấy ví dụ:
```
// chương trình chỉ ra bản chất của this và super trong Java
public class Main {

    public static void main(String[] args) {
        new Dog();
    }
}

// lớp cha Animal
class Animal {

    public Animal() {
        System.out.println("Animal hash code: " + this.hashCode());
    }
}

// lớp con Dog
class Dog extends Animal {

    public Dog() {
        System.out.println("Dog hash code: " + this.hashCode());
        System.out.println("Dog's super hash code: " + super.hashCode());
    }
}

```

kết quả in ra console:
```
Animal hash code: 1735600054
Dog hash code: 1735600054
Dog's super hash code: 1735600054

Process finished with exit code 0
```
Như các bạn đã thấy, this trong lớp Animal, super trong lớp Dog hay this trong lớp Dog đều trỏ đến một đối tượng có hash code là 1735600054. Do đó this hay super bản chất chỉ là một đối tượng.

## Thừa kế tại compile time
Kế thừa là một cơ chế trong Java cho phép copy các phương thức và thuộc tính từ lớp cha sang lớp con, quá trình copy này hoàn toàn xảy ra tại compile time. Lấy ví dụ sau:

```
// chương trình chỉ ra thừa kế là quá trình xảy tại compile time
public class Main {

    public static void main(String[] args) {
        new MainActivity();
    }
}

// interface này chỉ ra công việc cần thực hiện của MainActivity
interface MainNavigator {

    void showLoading();

    void hideLoading();

    void dataLoaded(String data);
}

// lớp Base của MainActivity chứa hai phương thức showLoading() và hideLoading()
// tương tự với hai phương thức của interface MainNavigator
class BaseActivity {

    public void showLoading() {
        System.out.println("Loading");
    }

    public void hideLoading() {
        System.out.println("Hide Loading");
    }
}

// oops!! Lớp MainActivity implements phương thức MainNavigator và extends lớp BaseActivity.
// let's see what happend!
class MainActivity extends BaseActivity implements MainNavigator  {

    public MainActivity() {
        showLoading();
        dataLoaded("world war 2 occurs from 1939 to 1945");
        hideLoading();
    }

    @Override
    public void dataLoaded(String data) {
        System.out.println(data);
    }
}

```
Kết quả in ra console:

```
Loading
world war 2 occurs from 1939 to 1945
Hide Loading

Process finished with exit code 0

```

Trong chương trình trên, lớp MainActivity implements interface MainNavigator, interface đó chứa 3 phương thức cần được khai triển, trong khi lớp MainActivity chỉ khai triển có một phương thức dataLoaded(), vậy tại sao quá trình compile chương trình lại không báo lỗi, mà lại chạy được và in ra kết quả một cách thần kỳ. Tất cả là do MainActivity extends từ BaseActivity, lớp BaseActivity đã chứa hai phương thức showLoading() và hideLoading() rồi, trong quá trình extend, lớp MainActivity đã copy hai phương thức đó tại compile time, khi đó compiler sẽ hiểu rằng lớp MainActivity đã chứa hai triển khai của hai phương thức showLoading() và hideLoading() rồi nên mới không báo lỗi. Từ ví dụ đơn giản này, nếu bạn nào đã làm quen với mô hình như MVVM khi code ứng dụng Android thì có thể áp dụng vào việc code base để việc sử dụng base được tiện lợi hơn, khi đó, đoạn code trên sẽ trở thành như ví dụ bên dưới đây:

```

public class Main {

    public static void main(String[] args) {
        new MainActivity();
    }
}

interface BaseNavigator {

    void showLoading();

    void hideLoading();
}

interface MainNavigator extends BaseNavigator{

    void dataLoaded(String data);
}


class BaseActivity implements BaseNavigator{

    @Override
    public void showLoading() {
        System.out.println("Loading");
    }

    @Override
    public void hideLoading() {
        System.out.println("Hide Loading");
    }
}

class MainViewModel {

    MainNavigator mainNavigator;

    public MainViewModel(MainNavigator navigator) {
        mainNavigator = navigator;
    }

    public void loadData() {
        mainNavigator.showLoading();
        mainNavigator.dataLoaded("world war 2 occurs from 1939 to 1945");
        mainNavigator.hideLoading();
    }
}

class MainActivity extends BaseActivity implements MainNavigator  {

    MainViewModel mainViewModel;
    public MainActivity() {
        mainViewModel = new MainViewModel(this);
        mainViewModel.loadData();
    }

    @Override
    public void dataLoaded(String data) {
        System.out.println(data);
    }
}

```
Kết quả in ra console cũng tương tự:

```
Loading
world war 2 occurs from 1939 to 1945
Hide Loading

Process finished with exit code 0

```

Khi viết base (for Android Developer), các bạn có thể triển khai luôn các phương thức chung nhất của các Activity vào lớp BaseActivity bằng cách dùng BaseActivty implements BaseNavigator. Và trong các lớp ViewModel ví dụ như MainViewModel sẽ không ngần ngại gọi đến phương thức có trong BaseNavigator, các phương thức đó được mong đợi triển khai trong MainActivity.

Thử đọc lại ví dụ bên trên và chạy để see the magic nhé ^^ Happy coding!