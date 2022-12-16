#  1. Giới thiệu

Khi xây dựng ứng dụng thì hầu hết trong ứng dụng đó sẽ phải sử dụng các đoạn văn bản để giúp người dùng **dễ dàng sử dụng nhất** có thể:

![](https://images.viblo.asia/e664364b-fd74-4c70-b10d-82c6c6e14294.png)

Như hình trên có rất nhiều các đoạn văn bản được sử dụng để **hướng dẫn người dùng sử dụng ứng dụng**. Nhưng nếu 1 ngôn ngữ mà người dùng **không hiểu** thì sẽ ra sao?. Như vậy ứng dụng của bạn sẽ bị **giới hạn phạm vi người dùng**. Vì vậy đa ngôn ngữ sẽ trở thành 1 phần **không thể thiếu** phải không?

![](https://images.viblo.asia/c36e4fc3-fdbb-465f-b364-aa6c78d08382.png)

Do vậy bài viết mình sẽ hướng dẫn các bạn các làm **đa ngôn ngữ** trong **Xamarin.Form**.

# 2. Cách thức hoạt động

Khi mới code mọi người thường sẽ để luôn text ở **tại nơi set giá trị trên View** nên sẽ bị **phân tán** ra rất nhiều nơi. Nhưng khi code lâu thì đặt **tập trung** hết các text trong **1 file** và sẽ lấy ra qua **key**. Trong Xamarin.From file được gọi là **Resources File** và có đuôi **.resx**.
Khi làm với đa ngôn ngữ thì quy tắc này cũng không thay đổi, chỉ khác là khi **mỗi ngôn ngữ** sẽ được lưu vào **1 file**. Vì vậy nếu bạn muốn ứng dụng của bạn hỗ trợ 3 ngôn ngữ thì sẽ có 3 **Resources File** để tương ứng khi thay đổi theo ngôn ngữ máy. 

*Chú ý: Bạn cũng có thể chỉ định ngôn ngữ bạn muốn cho ứng dụng.*

![](https://images.viblo.asia/444d547a-9fad-4a41-98d5-4d49ac53763f.png)

# 3. Hướng dẫn sử dụng

- Tạo  **Resources File**: Như mình có nhắc tới trên chúng ta sẽ **Resources File** để chứa các text theo từng loại ngôn ngữ. Bạn click **chuột phải vào Resource folder > Add > New File > Misc**:

![](https://images.viblo.asia/be2087b0-22eb-4250-a328-5b19cf8b5b93.png)

- Thêm text vào **Resources File**, format như sau:

```
<data
    name     ="HELLO"
    xml:space="preserve">
    <value>Hello</value>
</data>
```

**Resources File** sẽ có tên cấu trúc:
```
{FileName}.resx
```
Khi bạn muốn thêm các **Resources File** cho ngôn ngữ khác thì sẽ có cấu trúc như sau: 
```
{FileName}.{CultureName}.resx
```
**CultureName** bạn có thể tham khảo ở [đây](https://msdn.microsoft.com/en-us/library/cc233982.aspx) theo cột **Language tag**, 

Ví dụ tiếng Việt: 

```
{FileName}.vi.resx
```

![](https://images.viblo.asia/9c4b93bc-ea46-4bd4-8db4-598779027631.png)

Để gọi đoạn text trong **Resources File** chúng ta có thể làm như sau:

```
public MainPage()
        {
            Label label = new Label
            {
                HorizontalOptions = LayoutOptions.CenterAndExpand,
                VerticalOptions = LayoutOptions.CenterAndExpand
            };
            //Đây là dòng gọi đoạn text thông qua key "HELLO"
            label.Text = Localize.Resources.HELLO;

            StackLayout layout = new StackLayout
            {
                HorizontalOptions = LayoutOptions.FillAndExpand,
                VerticalOptions = LayoutOptions.FillAndExpand,
                Children = { label }
            };

            Content = layout;
        }
```

Kết quả: 

![](https://images.viblo.asia/f2d6d334-a21f-4be7-8ee1-a6f4cc7629e8.png)

-> Khi bạn đặt ngôn ngữ máy là không phải Tiếng Việt

![](https://images.viblo.asia/78816082-04ce-4bda-9f11-fa4201663b6f.png)

-> Khi bạn đặt ngôn ngữ máy là Tiếng Việt

# 4.Phần Kết
Vậy là mình đã giới thiệu và làm ví dụ hướng dẫn với đa ngôn ngữ trong Xamarin.Form kết thúc tại đây.

Đây là đường dẫn tham khảo: https://mindofai.github.io/Implementing-Localization-with-Xamarin.Forms/

**Cảm ơn bạn đã dành thời gian để đọc bài viết này.**