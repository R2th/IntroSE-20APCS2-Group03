Trong bài viết hôm này, tôi sẽ giới thiệu các bạn một React Hook tiếp theo, đó là **useDebugValue**.


Vậy **useDebugValue** là gì và cách sử dụng ra sao thì chúng ta hãy cùng tìm hiểu nhé.


### **useDebugValue là gì ?**

Nếu ai đang viết Custom hook thì useDebugValue có thể nói là một "công cụ" hữu ích, giúp chúng ta có thể dễ dàng debug được hook đó bằng việc nó sẽ hiển thị thông tin ta cần kiểm chứng trong React DevTools.

### Sử dụng useDebugValue trong Custom Hook
Ví dụ chúng ta có custom hook useExampleHook và **không** sử dụng **useDebugValue** như sau :

![](https://images.viblo.asia/133d6b59-ba56-46d7-8aef-c626a2b3e4d3.png)


 Khi mở React Devtool bạn sẽ thấy thông tin được hiển thị thế này: 

![](https://images.viblo.asia/0a316aa2-7132-4b6a-bc54-997266f2cb96.png)


![](https://images.viblo.asia/c35bede2-ad30-451e-8838-1e5aa4e08510.png)


Giờ ta sẽ sử dụng **useDebugValue** cho hook useExample như sau:

![](https://images.viblo.asia/eaace779-cb94-4cb3-8633-cf8c0541904b.png)

Hoặc ta có thể viết thế này: 
![](https://images.viblo.asia/2bedcc00-4c69-492a-a067-85fac7ebcfd9.png)



Và tất nhiên, cùng xem trong React Devtool hiển thị ra sao:
![](https://images.viblo.asia/6be6cb5d-83ee-4ae5-a301-7c9cef250a80.png)

Như vậy, với việc sử dụng thêm  **useDebugValue** đã giúp ta có thể debbug dễ dàng hơn.


**Lưu ý** rằng là **useDebugValue** ta chỉ sử dụng được trong custom hook để giúp thuận tiện trong việc đọc và debbug hơn nhé.