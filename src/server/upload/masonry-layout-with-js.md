## Giới thiệu
Với những người làm frontend sẽ không lạ gì trường hợp hiển thị list ảnh gồm các kích thước tỉ lệ khác nhau. Lúc này mọi thường thường thu về cùng width cùng height chấp nhận việc có ảnh bị cắt có ảnh nhỏ lại bị kéo to ra và bị mờ. Chắc chắn các bạn cũng nghĩ tới việc hiển thị ảnh giữ nguyên tỉ lệ ban đầu, sẽ giúp ảnh không bị cắt, vì là hiển thị list nên có thể làm thêm chức năng click vào từng ảnh thì hiện modal show full ảnh, tuy nhiên nhiều khi chúng ta vẫn cần hiển thị hết ví dụ trông như này![](https://images.viblo.asia/bcc281d6-8267-4b10-bedb-0e5a477750e1.png)
Cái này người ta gọi là mansory layout, các bạn có thể dùng css để làm tuy nhiên để có nhiều tuỳ chỉnh hơn, hãy thử xem cách làm bằng javascript nhé!

## Lý thuyết
Giả sử chúng ta có 1 list ảnh với tỉ lệ khác nhau:
```
<div class="masonry">
    <img src="https://giantbomb1.cbsistatic.com/uploads/scale_small/13/135472/1891758-001bulbasaur.png" />
    <img src="http://d3u67r7pp2lrq5.cloudfront.net/product_photos/42023475/007-starters-squirtle_large.jpg" />
    <img src="https://giantbomb1.cbsistatic.com/uploads/scale_small/13/135472/1891763-006charizard.png" />
    <img src="https://i.pinimg.com/236x/76/e9/80/76e9805c24cb8d1159b84cabb6cc6907---pokemon-type-pokemon.jpg" />
    <img src="https://img.pokemondb.net/artwork/large/vulpix.jpg" />
    <img src="https://i.pinimg.com/474x/e8/92/c9/e892c98a88f041fcdc7fadc86a059cf4.jpg" />
    <img src="https://miro.medium.com/max/1200/1*u4BFd4M8Ers5P847Nr9EaA.png" />
    <img src="https://i.pinimg.com/originals/4c/4c/e5/4c4ce55c9ada4e5e03ca9327932f13fc.png" />
  </div>
```
Nhiệm vụ là xếp chúng thành 3 cột (ví dụ thế), nhưng phải giữ đúng thứ tự theo hàng. 
```
function masonry(masonry, paramCols) {
  let cols;
  let currentCol = 0;
  const wrap = masonry;
  const items = masonry.querySelectorAll('img');
  if (paramCols) {
    cols = paramCols
  } else {
    cols = 3
  }

  // create cols
  for (let i = 0; i < cols; i++) {
    const newCol = document.createElement('div');
    newCol.className = 'col';
    newCol.style.width = 'calc(100%/' + cols + ')';
    wrap.appendChild(newCol);
  }

  // append img to col
  for (let count = 0; count < items.length; count++) {
    masonry.querySelectorAll('.col')[currentCol].appendChild(items[count]);
    if (currentCol < cols - 1) {
      currentCol++;
    } else {
      currentCol = 0;
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const masonrys = document.getElementsByClassName('masonry');
  for (let i = 0; i < masonrys.length; i++) {
    masonry(masonrys[i])
  }
});
```
Ta sẽ viết 1 hàm masonry với 2 tham số truyền vào là đối tượng masonry (đề phòng có nhiều masonry trong cùng 1 page), và số cột mong muốn. Nếu không truyền số cột thì mặc định là 3.
Đầu tiên ta sẽ tạo ra số cột theo param truyền vào (create cols). Sau đó set width cho col, 3 cột thì mỗi cột width = calc(100%/3).
Sau đó ta sẽ nhét ảnh vào từng cột sao cho chúng hiển thị theo chiều ngang đúng thứ tự. Nguyên lý là lặp số ảnh, ảnh đầu nhét vào cột 1, ảnh 2 nhét vào cột 2, ảnh 3 nhét vào cột 3, ảnh 4 lại nhét về cột 1, nên ta có code ở đoạn "append img to col", cũng dễ hiểu phải không.
Ngoài ra có thêm 1 chút css để dễ nhìn hơn:
{@embed: https://codepen.io/nguyen-duy-the-vuer/pen/RwNJoGa}

## Kết luận
Masonry layout sẽ làm mới mẻ và "tự do" hơn giao diện an toàn thông thường, thay vì dùng thư viện masonry các bạn có thể tự viết cho mình 1 hàm masonry bằng js như trên, mình chỉ demo đơn giản thế này, các bạn có thể làm thêm tính năng truyền param cho việc responsive và mở rộng không chỉ là img mà có thể là 1 block, card bất kì, chúc các bạn thành công! :triumph: