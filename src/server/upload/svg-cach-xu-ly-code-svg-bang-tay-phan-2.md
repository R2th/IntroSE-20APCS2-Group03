![](https://images.viblo.asia/8f97f159-271a-4be0-bc70-494d3d6ae45a.PNG)

## 5. Tạo một Icon "Cảnh báo"

Bây giờ chúng ta đã tạo được hình chữ nhật, hãy thử sử dụng `<ellipse>`. Chúng ta sẽ sử dụng hai trong số chúng, cùng với một `<line>`, để tạo icon cảnh báo này:

![](https://images.viblo.asia/36bd5067-f193-4565-bc4a-67c4604a6537.png)
    
Tương tự như hình chữ nhật, phần tử `<ellipse>` cũng yêu cầu bốn thuộc tính, tuy nhiên chúng hơi khác so với những thuộc tính của hình chữ nhật. Thay vì sử dụng width và height chúng ta thiết lập một bán kính ngang và dọc.

* `cx` là vị trí giữa trên trục `x`. Cứ coi như "cx là center x đi".
* `cy` là vị trí giữa trên trục `y`. Hãy nghĩ về "cy là center y".
* `rx` là kích thước của bán kính trên trục `x`, lấy chiều cao của cái hình chia cho hai. Hãy xem "rx là radius x".
* `ry` kích thước của bán kính trên trục `y`, lấy chiều dài của cái hình chia cho hai. Hãy xem "ry là radius y".

Chúng ta muốn một hình tròn rộng `80px` cao `80px`, cho nghĩa là chúng ta cần bán kính của nó là 40px trên cả hai trục. Chúng ta sẽ thiết lập nó là `rx="40" ry="40"`.

Chúng ta cũng muốn hình tròn nằm ngang bằng với những đường thẳng tối nhất trên hình của chúng ta. Giả sử hình tròn của chúng ta sẽ rộng và cao `80px`, thì sẽ cần đặt tâm điểm tại `40px`. Chúng ta cũng cần dịch chuyển `3px` để tránh bị cắt xén, do đó tâm điểm của hình tròn sẽ là `43px` trên cả hai trục. Chúng ta sẽ thiết lập điều này với các thuộc tính `cx="43" cy="43"`.

Gom lại tất cả những thứ đó, chúng ta có code này:

```
<ellipse cx="43" cy="43" rx="40" ry="40"></ellipse>
```

Xem lại trình duyệt và bạn sẽ thấy một hình tròn trên trang web.

Bây giờ chúng ta sẽ thêm một hình tròn thứ hai, để tạo dấu chấm ở phía dưới của cái dấu chấm than. Chúng ta sẽ tạo cái này theo cách tương tự, sự khác biệt duy nhất là chúng ta sẽ sử dụng một style nội tuyến để thiết lập fill thành màu đen.

```
<ellipse style="fill:black;" cx="43" cy="65" rx="5" ry="5"></ellipse>
```

Sau cùng, chúng ta chỉ cần thêm một đường thẳng để tạo phần khác của dấu chấm than. Một lần nữa chúng ta sẽ sử dụng những kỹ thuật tương tự như với những đường thẳng khác mà chúng ta đã sử dụng cho đến lúc này, duy chỉ khác chúng ta sẽ sử dụng một style nội tuyến để làm dày stroke từ `5px` lên `8px`.

Code hoàn chỉnh cho icon cảnh báo của chúng ta như sau:

{@embed: https://codepen.io/tutsplus/pen/rJOOaK}

## 6. Tạo một Icon "Play"

Bây giờ chúng ta đã có hình chữ nhật và ellipse, chúng ta đã sẵn sàng sử dụng thành phần `<polygon>`. Chúng ta có thấy tạo ra bất kỳ hình đa giác nào mà chúng ta muốn với phần tử này, từ hình lục giác cho đến hình sao. Tuy nhiên chúng ta sẽ giữ cho mọi thứ đơn giản và tạo một tao giác. Chúng ta sẽ kết hợp nó với một `<ellipse>` để tạo một icon play:
    
![](https://images.viblo.asia/719f58b0-16f3-4b6d-9b6c-0fd8cf9737cd.png)
    
Phần tử `<polygon>` hoàn toàn giống với phần tử `<polyline>`. Nó cũng chỉ có một thuộc tính, points, trong đó bạn sử dụng những cặp giá trị để thiết lập mỗi poin tạo nên cái hình. Sự khác biết đó là trong khi một polyline sẽ luôn luôn mở, thì một polygon sẽ tự động đóng lại chính nó.

```
<ellipse cx="43" cy="43" rx="40" ry="40"></ellipse>
```

Bắt đầu bằng cách lấy một hình tròn mà polygon của chúng ta sẽ nằm trong đó. Chúng ta sẽ sử dụng hình ellipse mà chúng ta đã tạo ra trong icon cảnh báo:

Bây giờ hãy tạo polygon của chúng ta. Chúng ta sẽ đặt ba point, và line sẽ tự động được tạo ra giữa những point này để tạo ra một hình tam giác. Các point sẽ là (35,23), (60,43) và (35,63). Như vậy code cho polygon sẽ là:

```
<polygon points="35 23, 60 43, 35 63" />
```

Code hoàn chỉnh cho icon play là:

{@embed: https://codepen.io/tutsplus/pen/yvYYYv}

## 7. Tạo một Icon "Download"
Bây giờ chúng ta sẽ chuyển đến cái có thể là phức tạo nhất, nhưng đồng thời là cái linh hoạt nhất trong việc tạo ra những hình SVG, và đó là phần tử `<path>`. Việc tạo một path là khá giống với việc tạo một polygon, nơi mà bạn tạo từng phần của hình dạng. Tuy nhiên với path bạn trực tiếp tạo mỗi point và line mà không có sự tự động, và bạn cũng có tuỳ chọn để tạo hình cung giữa các điểm thay vì chỉ có line.

Một path có thể được sử dụng để tạo ra bất cứ thứ gì, nhưng với sự phức tạp của nó bạn tốt hơn là nên sử dụng một ứng dụng thiết kết vector thay vì viết code bằng tay. Vì lý do đó, chúng ta sẽ tập trung vào một bộ tính năng con của path, và sử dụng nó để tạo icon download này:

![](https://images.viblo.asia/c27b31b2-14de-4527-9245-b7c64b503c20.png)

Về mặt kỹ thuật, bạn có thể tạo hình dạng ở trên với một polygon, nhưng việc sử dụng path sẽ cho chúng ta biết cách phần tử path hoạt động như thế nào.

Chúng ta sẽ chỉ sử dụng một thuộc tính của `<path>`, và đó là `d`. `d` viết tắt của "data", và nó với nó bạn sẽ định nghĩa tất cả các point và line của path. Bên trong thuộc tính này, các chỉ thị thiết lập point của một path và tạo các line giữa chúng được cung cấp thông qua những ký tự đơn `M` hoặc `L`, theo sau bởi một bộ toạ độ `x` và / hoặc `y`.

Có một số chỉ thị, nhưng để cho bạn dễ hình dung khi làm việc với `<path>` chúng ta sẽ làm việc với một số cái mà có thể thực thế hơn khi viết code bằng tay. Chúng như sau:

* `M` Đại diện cho `moveto`. Nó bắt đầu một path với tại một điểm cho trước, được định nghĩa với `x` và `y`. Hãy tưởng tượng điều này giống như di chuyển chuột lên trên một điểm ở trên màn hình, rồi vẽ. `M` hoa xác định việc di chuyển đến một bộ toạ độ cố định. (`m` thường sẽ xác định các toạ độ tương đối).
* `L` Biểu diễn cho `lineto`. Vẽ một line từ điểm hiện tại đến một điểm mới. `L` hoa xác định việc di chuyển đến một bộ toạ độ cố định. (`l` thường sẽ xác định các toạ độ tương đối).
* `Z` Biểu diễn cho `closepath`. Nó chuyển đổi path thành một hình đóng bằng cách vẽ một đường thẳng giữa điểm hiện tại đến điểm đầu tiên được tạo ra trong path.

Bạn nhất định phải xem ba cái chỉ thị này, (và icon mà chúng ta sẽ tạo với chúng), như là một giới thiệu cơ bản nhất về phần tử `<path>`. Để tận dụng nó bạn sẽ cần tự làm quen với [tất cả các chỉ thị](https://www.w3.org/TR/SVG/paths.html#DAttribute).

### Viết code cho Icon Download
Để code icon download này tôi khuyên bạn trước tiên nên thêm vào một phần tử path rỗng.

```
<path d="
 
"></path>
```

Từ đây, thêm từng chỉ thị một, lưu và xem lại quá trình cái hình được tạo ta để bạn có thể thấy nó được tạo ra như thế nào. Tôi cũng khuyên là đặt từng chỉ thị trên một dòng riêng của nó để dễ nhìn.

* Đầu tiên, chúng ta cần di chuyển đến `(18,3)`, point tại đó chúng ta muốn cái mũi tên của chúng ta bắt đầu. Để làm điều này chúng ta sẽ thêm chỉ thị `M 18 3` vào thuộc tính `d` của path.
* Tiếp theo chúng ta cần sử dụng chỉ thị `L` để tạo một line mà vẽ từ point bắt đầu của path dọc theo trục `x` có chiều dài `28px`. Để làm điều đó hãy thêm chỉ thị thứ hai: `L 46 3`. Xem lại trên trình duyệt và bạn sẽ thấy một đường nhỏ nằm ngang.
* Bây giờ hãy vẽ một đường thẳng xuống dài `37px` bằng cách thêm `L 46 40`.
* Sau đó thẳng về bên phải `15px` với `L 61 40`
* Tiếp theo chúng ta phải bắt đầu tạo đầu mũi tên. Chúng ta cần vẽ một đường chéo xuống dưới chếch về bên trái. Chúng ta sẽ làm điều này với `L 32 68`.
* Và sau đó chúng ta sẽ có một đường chéo lên trên và chếch về bên trái với `L 3 40`.
* Bây giờ chúng ta sẽ hoàn tất đầu mũi tên bằng cách vẽ một đường dẫn nhỏ về bên phải một lần nữa với `L 18 40`.
* Để đóng shape của chúng ta chúng ta không cần phải chỉ định một point để vẽ một line đến đó. Tất cả những gì chúng ta cần làm là thêm chỉ thị `Z`, cái mà sẽ tự động đóng shape cho chúng ta.

Code cho mũi tên sẽ trông như sau:

```
<path d="
  M 18 3
  L 46 3
  L 46 40
  L 61 40
  L 32 68
  L 3 40
  L 18 40
  Z
"></path>
```

Để tìm hiểu thêm về `<path>` hãy tham khảo một số bài viết ở bên dưới.

{@embed: https://codepen.io/tutsplus/pen/jZbbWG}

## 8. Thêm Phần tử `<defs>`
Chúng ta đã viết xong sáu icon, giờ chúng ta có thể sử dụng lại chúng sau này trong SVG.

Để làm điều này chúng ta sẽ bọc tất cả sáu icon lại, (hiện đang comment), những icon với tag `<defs></defs>`:

```
<defs>
<!-- All the icons you created so far go in here -->
</defs>
```
Điều này nói cho hệ thống biết rằng tất cả các icon mà chúng ta đã tạo ra mặc định là ẩn đi, cho tới khi chúng ta sử dụng chúng.

Bây giờ bạn đã có thể bỏ comment từng icon và chúng sẽ không được nhìn thấy trên trang.

## 9. Tạo nhóm với `<g>`
Có hai cách để sử dụng icon của mình: bằng cách chuyển chúng thành nhóm, hoặc thành symbol. Chúng ta sẽ chuyển phân nữa icon thành nhóm, và phân nửa còn lại thành symbol để chúng ta có thể hình dung được sự khác nhau.

Để chuyển đổi một trong số icon của chúng ta thành một nhóm thì tất cả những gì chúng ta phải làm là bọc nó bên trong thẻ `<g></g>`. Để làm cho nhóm đó có thể sử dụng lại chúng ta cũng sẽ cần cho nó một ID duy nhất.

Ví dụ:

```
<g id="leftalign">
    <!-- Left align icon made with lines -->
    <line x1="3" y1="3" x2="48" y2="3"></line>
    <line x1="3" y1="19" x2="65" y2="19"></line>
    <line x1="3" y1="35" x2="48" y2="35"></line>
    <line x1="3" y1="51" x2="65" y2="51"></line>
</g>
```

Bọc từng icon trong nhóm đầu tiên với `<g></g>` và thêm các ID, như sau:

```
<g id="leftalign">
    <!-- Left align icon made with lines -->
    <line x1="3" y1="3" x2="48" y2="3"></line>
    <line x1="3" y1="19" x2="65" y2="19"></line>
    <line x1="3" y1="35" x2="48" y2="35"></line>
    <line x1="3" y1="51" x2="65" y2="51"></line>
</g>
 
<g id="rightcaret">
    <!-- Right caret icon made with a polyline -->
    <polyline points="
      3 3
      30 28
      3 53
    "></polyline>
</g>
 
<g id="browser">
    <!-- Browser icon made with rectangle and lines -->
    <rect x="3" y="3" width="80" height="60"></rect>
    <line x1="3" y1="19" x2="83" y2="19"></line>
    <line x1="20" y1="3" x2="20" y2="17"></line>
</g>
```

## 10. Sử dụng nhóm với `<use>`
    
Bây giờ chúng có ba icon được định nghĩa như các nhóm bên trong phần tử `<defs>`, như vậy chúng ta đã sẵn sàng để sử dụng chúng trong SVG của chúng ta. Để làm điều này, tất cả những gì chúng ta phải làm là thêm một phần tử `<use>,` (đảm bảo là thêm nó sau và bên ngoài phần tử `<defs>`), và thiết lập một thuộc tính `href` đến ID của icon cần thiết.

Ví dụ, để sử dụng icon canh trái thêm code sau:

```
<use href="#leftalign"></use>
```

Để đặt icon ở một vị trí cụ thể thêm thuộc tính x và y:

```
<use href="#leftalign" x="100" y="100"></use>
```

Code để thêm tất cả ba icon và cách khoảng chúng sẽ như sau:

```
<use href="#leftalign" x="100" y="100"></use>
 
<use href="#rightcaret" x="300" y="100"></use>
 
<use href="#browser" x="500" y="100"></use>
```

Kiểm tra trình duyệt và bạn sẽ thấy tất cả ba icon đầu tiên của bạn:

![](https://images.viblo.asia/51f0720d-d350-4e3e-9a68-14ef20946b1c.png)

Cảm ơn các bạn đã theo dõi

Xem lại phần 1 tại [đây](https://viblo.asia/p/svg-cach-xu-ly-code-svg-bang-tay-phan-1-bWrZnOdnlxw)