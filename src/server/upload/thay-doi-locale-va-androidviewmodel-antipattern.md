Trong ViewModel, nếu bạn lấy dữ liệu từ resources (strings, drawable, colors...) bạn cần phải tính đến việc ViewModel sẽ bỏ qua các thay đổi như là thay đổi locale. Khi user đổi locale, các activities được tạo lại nhưng ViewModel sẽ không được tạo lại.

![](https://images.viblo.asia/63170815-07b8-40f8-a8ef-5fbe40d4fd58.png)

AndroidViewModel là một lớp con của ViewModel, nó nhận được Application context. Tuy nhiên việc truy cập đến context có thể gây nguy hiểm nếu bạn không observing hoặc phản hồi với lifecycle của context. Trong thực tế được khuyến nghị nên tránh xử lý các đối tượng có lifecycle trong ViewModels.

Hãy xem ví dụ dựa trên issue trên tracker [Updating ViewModel on system locale change.  ](https://issuetracker.google.com/issues/111961971)
```Java
// Don't do this
public class MyViewModel extends AndroidViewModel {
    public final MutableLiveData<String> statusLabel = new MutableLiveData<>();
    
    public SampleViewModel(Application context) {
        super(context);
        statusLabel.setValue(context.getString(R.string.labelString));
    }
}
```
Vấn đề là string được lấy ra trong constructor chỉ 1 lần duy nhất. Nếu có thay đổi locale, ViewModel sẽ không được tạo lại, điều này khiến cho ứng dụng sẽ hiển thị dữ liệu cũ và do đó chỉ 1 phần được localized.

Cách làm được khuyến cáo đó là chỉ gửi ID của resource bạn muốn load và thực hiện load resource trên view bởi vì view (activity, fragment, ...) có lifecycle sẽ được tạo lại sau khi thay đổi cấu hình vì vậy resource cũng được load lại một cách đúng đắn.

```Java
// Expose resource IDs instead
public class MyViewModel extends ViewModel {
    public final MutableLiveData<Int> statusLabel = new MutableLiveData<>();
    
    public SampleViewModel(Application context) {
        super(context);
        statusLabel.setValue(R.string.labelString);
    }
}
```

Thậm chí nếu bạn không có kế hoạch localize ứng dụng của bạn thì điều này cũng làm cho việc kiểm thử trở nên dễ dàng hơn rất nhiều và ViewModel sẽ gọn gàng hơn.

TL;DR
Bạn chỉ nên đưa ra resource IDs từ ViewModels để tránh việc data không được cập nhật.

[Tham khảo](https://medium.com/androiddevelopers/locale-changes-and-the-androidviewmodel-antipattern-84eb677660d9)