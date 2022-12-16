Hôm nay chúng ta sẽ khám phá một số khả năng sắp xếp bằng cách sử dụng Tuple. Thao tác sắp xếp khá đơn giản trong Swift và có thể được sử dụng tự động với các kiểu conforms comparable.

Các thao tác sắp xếp rất quan trọng để hiển thị dữ liệu theo cách chúng ta muốn, vì vậy nếu dữ liệu không theo đúng thứ tự, chúng ta có thể dễ dàng khắc phục điều đó bằng thao tác sắp xếp.
## Bối cảnh
A Trip to the Moon (French: Le Voyage dans la Lune) là một bộ phim ngắn phiêu lưu của Pháp năm 1902 của đạo diễn Georges Méliès.
Đây là bức vẽ của Georges Méliès về con tàu hạ cánh trên mắt trăng trong bộ phim Le voyage dans la lune.
Bộ phim này được lấy cảm hứng từ nhiều nguồn khác nhau, bao gồm cuốn tiểu thuyết Năm 1865 Từ Trái đất đến Mặt trăng của Jules Verne và phần tiếp theo năm 1870 của nó Xung quanh Mặt trăng, 
bộ phim theo chân một nhóm các nhà thiên văn du hành lên Mặt trăng trong một viên đạn pháo, khám phá bề mặt Mặt trăng

Tôi chọn bản vẽ này vì ví dụ về struct Movie mà tôi đã sử dụng. Và đây là một bộ phim rất cũ (1902) với hình vẽ do chính đạo diễn thực hiện.
## Vấn đề
*Bạn muốn sắp xếp danh sách các bộ phim theo tiêu đề, năm và đạo diễn.*
Trước hết, hãy mở tệp Playground của Xcode  và nhập vào:

``` swift
struct Movie {
    let title: String
    let year: Int
    let director: String
}

let movieList = [
    Movie(title: "Star Wars", year: 1898, director: "Leorge Mucas"),
    Movie(title: "A Star", year: 1922, director: "Michal Platpus"),
    Movie(title: "Be yourself", year: 1700, director: "Coey Vamn"),
    Movie(title: "The big bang", year: 2011, director: "Rom Natas"),
    Movie(title: "The big bang", year: 1922, director: "Adra Kngr"),
    Movie(title: "Finding Nemoy", year: 2022, director: "Raxip"),
    Movie(title: "The big bang", year: 2011, director: "Jos Klimbr")
]
``` 
Không có gì đặc biệt cho đến bây giờ. Bây giờ chúng ta hãy sắp xếp dữ liệu dựa trên tiêu đề tăng dần:

``` swift
let sortedMovieList = movieList.sorted { // Mark 1
     $0.title < $1.title
}

for movie in sortedMovieList {
    print(movie)
}
``` 

Hàm sắp xếp mà chúng ta đang sử dụng là từ Swift Array, nó nhận được một closure với hai tham số để biết nó có thể so sánh hai kiểu như thế nào (trong trường hợp này là hai phim).

Trong Mark 1, chúng ta đang tận dụng các chaining closure và các tham số ngầm định để so sánh hai String và trả về giá trị Bool đại diện cho sự so sánh giữa hai phim.
Và kết quả là 
![image.png](https://images.viblo.asia/48052737-c81f-49fe-94bf-16f2773d2114.png)
Điều này có vẻ hoạt động khá tốt. :D

Nhưng nếu chúng ta muốn bộ phim "The Big Bang" cũng được sắp xếp theo năm? Như bạn có thể thấy trong hình trên, tiêu đề là sorte nhưng năm thì không. Bạn có thể làm điều này để khắc phục:

``` swift
let sortedMovieList = movieList.sorted {
    if $0.title == $1.title { // Mark 1
        return $0.year < $1.year // Mark 2
    }
    return $0.title < $1.title // Mark 3
}

for movie in sortedMovieList {
    print(movie)
}
``` 

Nhìn qua thì sẽ thấy nó khá khó hiểu:
* Mark 1: Nếu tên bằng nhau, vui lòng sử dụng một biến khác để so sánh. 
* Mark 2: Biến số khác mà chúng tôi sử dụng để so sánh, trong trường hợp này là năm. 
* Mark 3: được sử dụng khi tiêu đề phim không bằng nhau nên so sánh chỉ là tiêu đề.

![image.png](https://images.viblo.asia/658bd2fb-b748-4e28-b252-14761e3a4ac7.png)

Kết quả ở trên chứng tỏ rằng closure của chúng ta đang hoạt động tốt. Tất cả các phim được sắp xếp tăng dần theo tiêu đề và các phim có tên bằng nhau được sắp xếp theo năm của chúng.

## Tuple Solution
So sánh Tuples là   cách để chúng ta làm những gì mong muốn ở đây. Chỉ cần đặt mọi thuộc tính mà bạn muốn so sánh bên trong bộ tuple là xong:

``` swift
let sortedMovieList = movieList.sorted {
    ($0.title, $0.year, $0.director) < ($1.title, $1.year, $1.director)
}

for movie in sortedMovieList {
    print(movie)
}
``` 

Bằng cách này, bạn có thể sắp xếp dữ liệu theo tiêu đề, năm và cuối cùng là giám đốc với cú pháp dễ sử dụng đơn giản :))

Và một lợi ích khác là nếu bạn muốn sắp xếp theo năm, chức danh và giám đốc, theo thứ tự này, bạn chỉ có thể thay đổi vị trí bên trong bộ tuple:

``` swift
let sortedMovieList = movieList.sorted {
    ($0.year, $0.title, $0.director) < ($1.year, $1.title, $1.director)
}

for movie in sortedMovieList {
    print(movie)
}
``` 
Và đây là kết quả:
![image.png](https://images.viblo.asia/e55b6bab-0f30-4dd5-bc3a-9f2177bceb76.png)

Bạn có thể đang nghĩ: Điều gì sẽ xảy ra nếu tôi muốn chỉ một năm giảm dần và phần còn lại tăng dần?

Chỉ cần thay đổi $0 bằng tham số $1 và bạn có thể đạt được điều đó. Kiểm tra mã bên dưới:
``` swift
let sortedMovieList = movieList.sorted {
    ($0.title, $1.year, $0.director) < ($1.title, $0.year, $1.director)
}

for movie in sortedMovieList {
    print(movie)
}
``` 

![image.png](https://images.viblo.asia/29282fec-427f-4af6-8490-ce9af1507356.png)

### Nguồn tham khảo:
https://holyswift.app/using-tuples-to-complex-sorting-operations-in-swift