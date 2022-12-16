## 1. Context
Nếu bạn phát triển ứng dụng Android theo mô hình MVP hay MVVM bạn sẽ thấy. Khi tạo một Activity hay fragment bạn sẽ cần phải tạo Contract Class, Presenter class và Dagger module cho nó đa số các đoạn code này tương tự nhau và có một form cố định.
Đây là những gì bạn cần để tạo một activity khi sử dụng MVP + Dagger



-----

**Activity**
```java
public class DemoActivity extends DemoBaseActivity<DemoContract.Presenter> implements DemoContract.View {
  
    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_demo);
    }
  
}
```


-----


**Dagger Module**
```java
@Module
public abstract class DemoActivityModule {
    @Binds
    @PerActivity
    abstract DemoContract.Presenter providesPresenter(DemoPresenter demoPresenter);

    @Binds
    @PerActivity
    abstract DemoContract.View providesView(DemoActivity demoActivity);
}
```


-----


**Contract**
```java
public interface DemoContract {
    interface View extends DemoBaseContract.ActivityView {
      
    }

    interface Presenter extends DemoBaseContract.Presenter {
    
    }
}
```


-----


**Presenter**
```java
public class DemoPresenter extends DemoBasePresenter<DemoContract.View> implements DemoContract.Presenter {

    @Inject
    public DemoPresenter(DemoContract.View view) {
        super(view);
    }

    @Override
    public void unSubscribe() {

    }

    @Override
    public void subscribe() {

    }
}
```
Đây là một mô hình phổ biến trong Android và nhiều developer cũng đang sử dụng một cách tương tự. Ở bài viết này mình sẽ hướng dẫn các bạn tạo tất cả các file này chỉ bằng một vài lần click :v: 
## 2.Template in Android Studio
Theo IntelliJ thì:
> File templates are specifications of the default contents to be generated when creating a new file. Depending on the type of file you are creating, templates provide initial code and formatting that is expected to be in all files of that type (according to industry standards, your corporate policy, or for other reasons).

Tạm dịch là file template là một số thông số của nội dung mặc định sẽ được tạo khi tạo ra một file mới. Tùy thuộc vào loại file bạn tạo, các mẫu cung cấp code và định dạng ban đầu dự kiến sẽ có trong tất cả các file thuộc loại đó (theo chuẩn convention nào đó)

Hiểu đơn giản thì, template được dùng để tạo các file có nội dung có sẵn cho bạn. Hầu hết khi ta tạo activity, fragment, service từ tập hợp các tùy chọn được xác định trước, rất nhiều đoạn code có sẵn được gen cho ta, về cơ bản nó được tạo ra từ tập hợp các mẫu được viết sẵn bởi nhóm phát triển AndroidStudio team. Ví dụ, một empty activity khi ta tạo từ menu hiển thị sẽ gen cho chúng ta bao gồm file java, file xml và một đoạn trong file manifest
```java
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

public class EmptyActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main2);
    }
}
```
### Những loại file mà template có thể tạo?
1. Ta có thể tạo .file .java, .xml, .cpp...
2. Ta có thể tạo cho mình một live templates. Nếu bạn đã sử dụng **Toats** template hay **psfi** cho **public static final int**, chúng được tạo ra từ live template
3. Ta có thể tạo một nhóm các file template. Ví dụ như cách mà Android Studio tạo file xml với .java khi tạo một Activity default

## Example 1:
Ví dụ 1 sẽ hướng dẫn bạn tạo một file template cơ bản để taọ một recyclerview adapter cũng  với ViewHolder class, vì đây là một class thường xuyên được tạo nhất

Click vào một folder package bất kì, sau đó click **New -> Edit File Templates**![](https://images.viblo.asia/4ce1e7d1-0979-4e33-b3a2-a8426d4b26f7.png)

Click vào button **+** để tạo một template và đặt tên cho chúng.

Paste đoạn code vào phần bên dưới, mình sẽ giải thích từng phần trong nó:

```java
#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import java.util.List;

#parse("File Header.java")
public class ${NAME} extends RecyclerView.Adapter<${VIEWHOLDER_CLASS}> {
    private final Context context;
    private List<${ITEM_CLASS}> items;
   
    public ${NAME}(List<${ITEM_CLASS}> items, Context context) {
        this.items = items;
        this.context = context;
    }

    @Override
    public ${VIEWHOLDER_CLASS} onCreateViewHolder(ViewGroup parent,
                                             int viewType) {
        View v = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.${LAYOUT_RES_ID}, parent, false);
        return new ${VIEWHOLDER_CLASS}(v);
    }

    @Override
    public void onBindViewHolder(${VIEWHOLDER_CLASS} holder, int position) {
        ${ITEM_CLASS} item = items.get(position);
        holder.set(item);
    }

    @Override
    public int getItemCount() {
        if (items == null){
            return 0;
        }
        return items.size();
    }
    
    public class ${VIEWHOLDER_CLASS} extends RecyclerView.ViewHolder {

        public ${VIEWHOLDER_CLASS}(View itemView) {
            super(itemView);
        }

        public void set(${ITEM_CLASS} item) {
            //UI setting code
        }
    }
 }
```

**${<VARIABLE_NAME>}**: được sử dụng để tạo các biến mà được sử dụng trong toàn bộ mẫu và bạn được nhắc nhập giá trị cho chúng khi bạn sử dụng template để gen code. Ngoài ra có một số biến được xác định trước như ${PACKAGE_NAME}, ${DATE},...

**#if** được sử dụng để kiểm tra xem tên package có trống hay không, nếu trống thì thêm tên vào câu lệnh package truyền qua dưới dạng biến ${PACKAGE_NAME}

**#parse** được sử dụng để chèn nội dung của một template khác có tên file là Header.java mà ta có thể tìm thấy trong tab:
![](https://images.viblo.asia/d66272f4-fdb6-4ad8-b8ab-f2ffff5e1711.png)
Phần còn lại của đoạn code các biến và static text, code và comment để tạo file. Khi click vào một folder bất kì, sau đó click new sẽ hiện lên các template có sẵn. Click vào template vừa tạo ở trên sẽ mở ra một dialog hiển thị các tham số cần truyền vào
![](https://images.viblo.asia/05ae5a19-fa84-4192-a314-d2ccbc581118.png)
![](https://images.viblo.asia/cb192574-26dc-4667-bb93-d135a5881caa.png)

Sau đó ta sẽ tự động gen ra đoạn code như thế này :))
```java 
package io.github.rajdeep1008.templatedemo;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import java.util.List;

public class SchoolData extends RecyclerView.Adapter<SchoolData> {
    private final Context context;
    private List<SchoolItem> items;

    public SchoolData(List<SchoolItem> items, Context context) {
        this.items = items;
        this.context = context;
    }

    @Override
    public SchoolData onCreateViewHolder(ViewGroup parent,
                                         int viewType) {
        View v = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.R.layout.item_school, parent, false);
        return new SchoolData(v);
    }

    @Override
    public void onBindViewHolder(SchoolData holder, int position) {
        SchoolItem item = items.get(position);
        holder.set(item);
    }

    @Override
    public int getItemCount() {
        if (items == null) {
            return 0;
        }
        return items.size();
    }

    public class SchoolData extends RecyclerView.ViewHolder {

        public SchoolData(View itemView) {
            super(itemView);
        }

        public void set(SchoolItem item) {
            //UI setting code
        }
    }
}
```
## Example 2
Ví dụ này không liên quan đến việc tạo template cho mô hình MVP, nhưng nó thật sự rất tuyệt vời mà Android Studio đã tạo ra cho chúng ta

 Live Templates là tập hợp shortcut để hoàn thành những đoạn code mẫu. Khi được chọn, bạn có thể thay đổi những argument cần thiết của hàm gọi bằng cách dùng phím Tab.
 
 ![](https://images.viblo.asia/d7d43906-21be-4a69-bc22-15c99ba6295b.gif)
  Với Win vào **File > Settings > Editor > Live Templates**, click vào Android 
  
 Với Mac, Vào **Android Studio -> Preferences -> Editor -> Live Template**. Ở đây bạn sẽ hiện thấy tất cả các live template có sẵn, như fbc cho findViewById cast, foreach cho việc tạo vòng lặp... 
 
 Sau đó Click vào button **+**  -> **LiveTemplate**. Bạn sẽ có một tùy chọn để thêm chữ viết tắt để sử dụng mẫu, mô tả về những gì mẫu của bạn làm và text mẫu cho template của mình 
 
![](https://images.viblo.asia/302bb766-6925-4476-b046-e6b0cbc23a52.png)

Giờ chỉ cần save lại và sử dụng chúng.
![](https://images.viblo.asia/7447bb2c-ccd6-45b2-97a5-17d69e27c33f.gif)
## Example 3
Ví dụ cuối cùng mình sẽ hướng dẫn tạo một template MVP + Dagger như miêu tả ở đầu bài viết này:

Mở Android Studio folder. Vào **plugins -> android -> lib -> templates -> other**. Tạo một file trống với tên MVP Template. Hãy xem thử các activity folder khác như Empty Activity, Basic Activity để xem họ tạo template như thế nào.

Trong MVP Template folder, tạo các file **template.xml**, **recipe.xml.ftl** và **globals.xml.ftl**. Ngoài ra tạo một thư mục root để chứa chúng.

1. **template.xml** : Nó xử lý phần UI của configscreen(dialog hiển thị các trường cần điền khi tạo template). Nó xác định các trường nhập của của người dùng như input field, checkboxes, dropdown, .. mà người dùng nhìn thấy khi tạo template
```xml
<template format="4"
        revision="1"
        name="MVP Template Activity"
        description="Creates a new MVP classes - Presenter, View, Contract and Dagger Module.">

    <category value="Other"/>

    <parameter id="className"
        name="Functionality Name"
        type="string"
        constraints="class|unique|nonempty"
        default="MvpDemo"
        help="The name of the functionality that requires MVP views"/>

    <globals file="globals.xml.ftl" />
    <execute file="recipe.xml.ftl" />

</template>
```
template.xml mô tả các tham số được hỏi người dùng khi tạo 1 template

id : là duy nhất của phần tử đó

name : không có gì chỉ có một gợi ý để hiển thị cho người dùng nhập

type: xác định xem người dùng sẽ hiển thị kiểu nhập text hay spinner

default: là giá trị default khi người dùng không nhập gì


2.**recipe.xml** : File này sử dụng những thứ mà, template bạn tạo từ thư mục root được chuyển đổi thành file java trong Android Studio. Nó sẽ bao gồm các thông tin được tạo từ template
```xml
<?xml version="1.0"?>
<recipe>

    <instantiate from="src/app_package/Contract.java.ftl"
                   to="${escapeXmlAttribute(srcOut)}/${className}Contract.java" />
    <instantiate from="src/app_package/Activity.java.ftl"
                   to="${escapeXmlAttribute(srcOut)}/${className}Activity.java" />
    <instantiate from="src/app_package/Presenter.java.ftl"
                   to="${escapeXmlAttribute(srcOut)}/${className}Presenter.java" />
    <instantiate from="src/app_package/ActivityModule.java.ftl"
                   to="${escapeXmlAttribute(srcOut)}/${className}ActivityModule.java" />


    <open file="${srcOut}/${className}Presenter.java"/>
    <open file="${srcOut}/${className}Contract.java"/>
    <open file="${srcOut}/${className}Activity.java"/>
    <open file="${srcOut}/${className}ActivityModule.java"/>
</recipe>
```
 **recipe.xml.ftl** định nghĩa các file nào sẽ được tạo từ template nào và file nào sẽ được mở sau khi tạo. Nó cũng có thể copy code từ các template của ta vào các file hiện có như manifest.xml hoặc string.xml, v.v. Hãy chắc chắn kiểm tra các ví dụ mẫu mặc định để tạo các activity
 
3. **globals.xml.ftl**  : File này bao gồm tất cả các biến global. Nó định nghĩa các biến trong src và res

```xml
<?xml version="1.0"?>
<globals>
 <global id="resOut" value="${resDir}" />
 <global id="srcOut" value="${srcDir}/${slashedPackageName(packageName)}" />
</globals>
```
Trong thư mục root, tạo src/app_package/ folder và cho 4 file java này vào đó tương ứng với Activity,ActivityModule, Contract, Presenter

```java
package ${packageName};

public class ${className}Activity extends DemoBaseActivity<${className}Contract.Presenter> implements ${className}Contract.View {
    
    @Override
    protected void onCreate(final Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_demo);
    }

}
```
```java
package ${packageName};

@Module
public abstract class ${className}ActivityModule {
    @Binds
    @PerActivity
    abstract ${className}Contract.Presenter providesPresenter(${className}Presenter presenter);

    @Binds
    @PerActivity
    abstract ${className}Contract.View providesView(${className}Activity activity);
}
```
```java
package ${packageName};

public interface ${className}Contract{
    
    interface View extends DemoBaseContract.ActivityView {

    }

    interface Presenter extends DemoBaseContract.Presenter {

    }
}
```
```java
package ${packageName};

public class ${className}Presenter extends DemoBasePresenter<${className}Contract.View> implements ${className}Contract.Presenter {

    @Inject
    public ${className}Presenter(${className}Contract.View view){
        super(view);
    } 

    @Override
    public void subscribe() {

    }

    @Override
    public void unSubscribe() {

    }
}
```
Các file này chứa các mẫu sẽ được chuyển đổi chính xác thành code java hoặc xml và các đối số sẽ được thay thế bằng các giá trị thực của chúng.

Sau đó khởi động lại Android Studio và ta có được kết quả:

![](https://images.viblo.asia/54235edf-3106-463c-ab4c-b4ccc710a104.png)
![](https://images.viblo.asia/1485d4c7-80f5-46e5-9983-390395d434f7.png)

## References
> https://android.jlelse.eu/supercharging-your-app-development-speed-with-custom-file-templates-3e6acb6db6c3