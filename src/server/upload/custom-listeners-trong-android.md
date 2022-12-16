Listeners là một thành phần quan trong việc phát triển ứng dụng Android. Chúng là một cách thức phổ biến để tạo các asynchronous callbacks. Listeners thường được sử dụng để thực thi code khi có event xảy ra.

Một cách sử dụng phổ biến của Listeners mà bạn có thể đã gặp, nếu bạn có một chút kinh nghiệm trong việc phát triển ứng dụng Android, là built-in `onClickListener` của một button. Chúng ta thường set `onClickListener` cho một button, với một đoạn code sẽ chạy khi button được clicked, đây là event trong trường hợp này. Trong Java, nó thường trông như thế này:

```
Button button = findViewById(R.id.example);
button.setOnClickListener(new View.OnClickListener(){
    @Override
    public void onClick(View view) {
        //Do some work here
    }
});
```

Nhưng bên cạnh những gì tôi đã mô tả ở trên, chúng ta có thể tạo ra những custom listeners của mình với các callbacks được đính kèm với các events được kích hoạt từ các khu vực nhất định trong code của chúng ta.

#### Nhưng tại sao?

Dưới đây là một số trường hợp mà chúng ta có thể cần phải tạo một custom listeners:

* Khi chúng ta cần phát ra một event từ một fragment đến một activity
* Khi chúng ta cần phát ra một event từ adapter tới một fragment hoặc activity

Nói chung, một listener rất hữu ích khi bạn có một “child object” và một “parent object” hoặc handler, trong đó một parent object là một object được tạo ra một new instance của child object. Và chúng ta có một số công việc cần phải được thực hiện trong parent object, nhưng cũng chỉ cần được thực hiện khi một event nào đó xảy ra trong child object. Vì vậy, chúng ta phải tìm cách truyền đạt thực tế rằng event đang được đề cập xảy ra trong child object, đến parent object.

#### Vậy làm như thế nào để tạo một custom listener?


1.  Đầu tiên, định nghĩa một interface trong child object (adapter, fragment, POJO, ....). Rồi định nghĩa event sẽ xảy ra ảnh hưởng đến parent. Những event đó sẽ được đại diện bởi các methods trong interface. Một ví dụ làm chúng như thế nào trong Java:

```
public interface CustomListener{
    void onDataReady(Data data);
    void onSubmitForm();
}
```

Trong ví dụ trên, `onDataReady(Data data)` và `onSubmitForm()` là các method signatures/callbacks được đại diện cho các event mà có thể xảy ra trong child object.


2. Tiếp theo, thiết lập một biến listener để lưu một triển khai cụ thể của các callbacks trong interface của chúng ta. Việc implement các callbacks sẽ được định nghĩa bởi parent object. Vì vậy, bên trong child class, bạn có thể tạo biến cũng như phương thức setter công khai cho hàm  listener callbacks để định nghĩa từ parent, như sau:

```
private CustomListener mListener;
public void setCustomListener(CustomListener listener){
    mListener = listener;
}
```

Bạn không nhất thiết cần phải sử dụng phương thức setter, vì có một số phương thức để chuyển listener callback vào child object, chẳng hạn như chiueenr nó qua constructor hoặc chuyển qua lifecycle event ( như onAttach() event của fragment khi xử lý với giao tiếp activity/fragment)


3. Bây giờ, chúng ta đã tạo xong biến listener, chúng ta có thể implement interface trong parent class, override các phương thức, và cho code xử lý event vào trong các phương thức đó, sau đó set listener implementation trên child object.

```
public class Parent implements Child.CustomListener{
//Some code
...
@Override
    public void onDataReady(Data data){
        //some fancy implementation
    }
@Override
public void onSubmitForm(){
       //code we want to run when this event occurs
    }
childObject.setCustomListener(this);
}
```

Trên đây là một cách rất phổ biến để tạo ra một implementation của listener trong parent class. Một cách khác để làm điều tương tự mà chúng ta đã làm ở trên là tạo một thể hiện của custom listener bên trong parent class (thay vì làm cho parent class tự implement the interface) và đặt cài đặt đó làm custom listener cho child object của chúng ta, như vậy :

```
Child childObject = new Child();
Child.CustomListener listener = new Child.CustomListener(){
    @Override
    public void onDataReady(Data data){
        //some fancy implementation
    }
    public void onSubmitForm(){
       //code we want to run when this event occurs
    }
}
childObject.setCustomListener(listener);
```


4. Bây giờ, child object có thể truyền event tời parent sử dụng listener, khi chúng xảy ra, ta có thể truyền data bất kỳ tới parent object. Ví dụ, trong child object, có thể trông như:

```
//The event "onDataReady" has occurred in the child object and we 
//fire up the event to the parent using the listener 
public void OnSuccess(Response response){
    Data data = response.getData;
    listener.onDataReady(data);
}
```

Và đó, chúng ta đã hoàn tất việc setting custom listener! Tôi hy vọng bạn có thể bắt đầu thực hiện và sử dụng các custom listener của mình nếu bạn đã có được. Hoặc ít nhất đã đạt được một sự hiểu biết tốt hơn về nó.

Nguồn tham khảo: 
https://levelup.gitconnected.com/custom-listeners-in-android-89ebdefe3e99