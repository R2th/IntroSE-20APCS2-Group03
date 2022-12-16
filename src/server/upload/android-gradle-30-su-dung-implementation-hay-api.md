Chào mọi người, nếu các bạn từng sử dụng Android Gradle plugin ở các phiên bản cũ khi nâng cấp lên phiên bản 3.0 thì bạn đều biết rằng từ khoá `compile` đã bị thay đổi thành `implementation` và `api`. Vậy `implementation` và `api` có gì khác nhau mà phải tách ra như vậy, hãy cùng tìm hiểu trong bài viết sau nhé:

Giả sử ta có một project với 4 module sau:

- LibraryA
- LibraryB
- LibraryC
- LibraryD

Với mỗi module thì được liên kết như hình:

![](https://cdn-images-1.medium.com/max/1600/1*mC48Yf8QvH62155Q9d4aDw.png)

Mỗi một module chưa một class đơn giản như sau:

**LibraryD:**
```
class ClassD {

    fun tellMeAJoke():String{
        return "You are funny :D"
    }
}
```

**LibraryC:** 
```
class ClassC {
    fun tellMeAJoke(): String {
        return "You are funny :C"
    }
}
```
**LibraryB:**
```
class ClassB {

    val b = ClassD()

    fun whereIsMyJoke(): String {
        return b.tellMeAJoke()
    }
}
```
**LibraryA:**
```
class ClassA {

    val c = ClassC()

    fun whereIsMyJoke(): String {
        return c.tellMeAJoke()
    }
}
```

Từ các class trên, ta có thể thấy **LibraryA** phụ thuộc vào **LibraryC** và **LibraryB** phụ thuộc vào  và **LibraryD**. Vì vậy, các thư viện này phải được thêm vào file `build.gradle`.

## Compile (2.0) hay Api(3.0):
Nói một cách ngắn gọn thì từ khoá `api` chính xác là giống với từ khoá `compile`. Vì vậy, nếu ta thay tất cả `compile` thành `api` thì mọi thứ sẽ hoạt động bình thường.

Giờ ta hãy thử thêm dependency  **LibraryD** sử dụng từ khoá `api` trong **LibraryB** (thêm vào trong file build.gradle của LibraryB)
```
dependencies {
          . . . . 
          api project(path: ':libraryD')
}
```

Tương tự, thì **LibraryB** sẽ được thêm vào module app (thêm vào trong file build.gradle của module app):

```
dependencies {
          . . . . 
          api project(path: ':libraryB')
}
```

Giờ đây, cả **LibraryB** và **LibraryD** đều có thể được truy xuất từ app module. Ví dụ như:

![](https://cdn-images-1.medium.com/max/800/1*NPw6NXM8l6eMq8jUD86RNw.png)

## Implementation (3.0):
Như phần trên bạn đã biết từ khoá `api` sẽ giống với `compile` của bản trước, giờ ta thử xem từ khoá `implementation` khác gì so với `api` nhé.

Quay lại phần ví dụ trước, giờ ta hãy thử import thư viện **LibraryC** vào **LibraryA** sử dụng từ khoá `implementation` xem sao.

```
dependencies {
          . . . . 
          implementation project(path: ':libraryC')
}
```

Tương tự với app module: 
```
dependencies {
          . . . . 
          implementation project(path: ':libraryA')
}
```
Giờ hãy thử truy xuất tới **LibraryC** từ bên App Module. Ồ, bạn có thấy gì khác biệt không? Android studio ném ra một cái lỗi như sau:

![](https://cdn-images-1.medium.com/max/800/1*cy_TZPrbcpngrjnGC1pTSQ.png)

Điều này có nghĩa là **LibraryC** không thể được truy xuất trực tiếp từ module App được nếu ta sử dụng `implementation` thay vì `api`. Vậy, cái này đem lại lợi ích gì?

## `Implementation` vs `api`
Trong phần ví dụ đầu tiên, **LibraryD** được biên dịch bằng cách sử dụng `api`. Nếu bất cứ thay đổi nào ở **LibraryD**, gradle sẽ cần phải biên dịch lại **LibraryD**, **LibraryB** và tất cả các module đã import **LibraryB** cũng như các module khác mà có implement đến **LibraryD**.

![](https://cdn-images-1.medium.com/max/800/1*WGFbkIccHZRJs3rDpQsFRA.png)

Nhưng ở phần ví dụ thứ 2, nếu bất cứ thay đổi nào ở **LibraryC** xảy ra, Gradle chỉ cần compile lại **LibraryC** và **LibraryA**. 

![](https://cdn-images-1.medium.com/max/800/1*oFJWUsL7FFMETVFBNkkL2Q.png)

Nếu bạn làm việc với một project rất nhiều module, điều này có thể làm tăng tốc độ build rất nhiều, tác giả đã sử dụng sample project này và đã build thử, kết quả là có cải thiện được một vài giây (bạn đừng nghĩ vài giây là ít nhé, vì phần sample app này code rất ít và chỉ có một vài module, nếu với một dự án có thể sẽ sử dụng nhiều module và lượng code lớn hơn rất nhiều nên có thể kết quả sẽ khá kinh ngạc đó ^^)

Nào ta hãy xem kết quả nhé:

**Build toàn bộ** (1p51s)

![](https://cdn-images-1.medium.com/max/800/1*ihaFEa8AF1xzuRoeOEXg3Q.png)

**Khi thử thay đổi ở LibraryD** (1p20s)

![](https://cdn-images-1.medium.com/max/800/1*ihaFEa8AF1xzuRoeOEXg3Q.png)

**Khi thử thay đổi ở LibraryC** (1p14s - nhanh hơn khoảng 6s)

![](https://cdn-images-1.medium.com/max/800/1*2CaNBOd7yi_akrg6PAO6Ag.png)

## Tổng kết:
> Hãy thử thay thế tất cả `compile` thành `implementation` và thử build project. Nếu build thành công thì thôi, còn không được thì tìm những dependency nào cần dùng chung và thay bằng từ khoá `api`

Nếu bạn thấy bài viết bổ ích, hãy cho mình một vote và ủng hộ cả tác giả bài viết tại đây nhé ^^

https://medium.com/mindorks/implementation-vs-api-in-gradle-3-0-494c817a6fa