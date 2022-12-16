![](https://images.viblo.asia/4e86d7f2-f75d-466f-b9bc-40384e730662.jpeg)
Trong thực tế khi bạn làm việc với việc tạo mới một API Call. Vấn để xử lý server lỗi và API lỗi thường tương tự nhau và lặp đi lặp lại nhiều lần cho mỗi lần bạn tạo. Việc xử lý lặp lại một tác vụ có thể dẫn đến sai sót , boilerplate...

Để giải quyết vấn đề này, hôm nay chúng ta sẽ cùng nhau clean lại API call và tạo lại model để nhận dữ liệu từ server trả về.

Trong bài này mình sẽ clean lại API call của Retrofit. Một  thư viện sử dụng rộng rãi nhất trong Android khi xử lý việc request tới server. Đồng thời dùng generic để viết lại model nhận data từ server trả về.

Một API Call điển hình thường thấy:
```
public void requestRandomDogImage(final NetworkResponseListener<BreedRandomImage> listener, DogAPI api) {

  api.requestRandomDogImage().call.enqueue(new Callback<BreedRandomImage>() {
    @Override
    public void onResponse(@NonNull Call<BreedRandomImage> call, @NonNull Response<BreedRandomImage> response) {
      if (listener != null) {
        listener.onResponseReceived(response.body());
      }
    }

    @Override
    public void onFailure(@NonNull Call<BreedRandomImage> call, @NonNull Throwable t) {
      if (listener != null) {
        listener.onError();
      }
    }
  });
}
```
```
public interface NetworkResponseListener<Response> {

  void onResponseReceived(Response response);

  void onError();
}
```
Mỗi API call Retrofit khi gọi sẽ trả về cho chúng ta một  ` Callback<T>` object. T ở đây là generic type chính là đối tượng chứa data mà ta nhận được khi thực hiện xong request.
```
public interface Callback<T> {

  void onResponse(Call<T> call, Response<T> response);
  
  void onFailure(Call<T> call, Throwable t);
}
```
```
public interface Call<T> extends Cloneable {

  void enqueue(Callback<T> callback);
  
  Response<T> execute() throws IOException;

  ...
}
```
Như bạn thấy ở code phía trên `Callback<T>` là một interface cái mà sẽ được truyền vào mỗi API Call

Bây giờ, thay vì sử dụng Callback ban đầu mà Retrofit cung cấp chúng ta sẽ tiến hành viết lại bằng cách thừa kế nó, refactor lại thành chính callback mà chúng ta mong muốn.
```
public abstract class SimpleCallback<T> implements Callback<T> {

    public abstract void onSuccess(T respone);

    public abstract void onError(String message);

    @Override
    public void onResponse(Call<T> call, Response<T> response) {
        if (response.isSuccessful() && response.body() != null) {
            onSuccess(response.body());
        } else {
            onError(response.message());
        }
    }

    @Override
    public void onFailure(Call<T> call, Throwable t) {
       onError(t.getMessage());
    }
}

```
Như vậy, bây giờ nếu chúng ta cần request thì chúng ta sẽ sử dụng `SimpleCallback<T>` thay cho `Callback<T>`
```
public void requestRandomDogImage(final NetworkResponseListener<BreedRandomImage> listener, DogAPI api) {

  api.requestRandomDogImage().enqueue(new SimpleCallback<BreedRandomImage>() {
            @Override
            public void onSuccess(BreedRandomImage respone) {
                
            }

            @Override
            public void onError(String message) {

            }
        });
}
```
Vừa rồi chúng ta đã tiến hành viết lại `Callback<T>` .  Bây giờ chúng ta sẽ tiếp tục viết lại model cho data nhận về của chúng ta.

Thông thường khi respone từ server trả về thì object lỗi sẽ giống nhau, còn đối tượng data trả về sẽ khác nhau tùy thuộc vào từng request. Nhận thấy điều này chúng ta sẽ sử dụng generic type để viết gọn lại model.

Status: chung cho tất cả respone
```
public class Status {
    
    private String error;
    private String message;

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
```
Respone class sẽ nhận data tùy thuộc vào từng request nên ta sẽ sử dụng generic type ở đây:
```
package com.example.cleanapi;

public class Respone<T> {

    private T data;
    private Status status;

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}

```
Sau khi kết hợp cả `SimpleCallback<T>` và  `Respone<T>` thì request của chúng ta bây giờ sẽ trở thành như sau:
```
public void requestRandomDogImage(final NetworkResponseListener<BreedRandomImage> listener, DogAPI api) {

  api.requestRandomDogImage().enqueue(new SimpleCallback<Respone<BreedRandomImage>>() {
            @Override
            public void onSuccess(Respone<BreedRandomImage> respone) {

            }

            @Override
            public void onError(String message) {

            }
        });
}
```
Như vậy vừa rồi mình đã trình bày cách clean API Retrofit trong Android:
1.  implement lại `Callback<T>`
2.  Viết lại model nhận dữ liệu.

Happy coding!

Bài viết có tham khảo tại: https://android.jlelse.eu/clean-your-api-calls-79d67098d258