Cách đây không lâu mình đã từng viết một bài đề cập về [cách cải thiện hiệu năng của ứng dụng React](https://viblo.asia/p/tip-de-cai-thien-hieu-suat-cua-ung-dung-react-RnB5pyqYKPG). Và ngày hôm nay mình sẽ trở lại chủ đề đó cùng với một số tip/trick mà mình đã tìm hiểu thêm được. Không mất nhiều thời gian nữa, chúng ta bắt đầu ngay nhé.
Bài viết của chúng ta hôm nay sẽ lấy đoạn code [tại đây](https://codesandbox.io/s/objective-sun-wgfv3?from-embed) làm ví dụ
# Không dùng index để gán vào key
Ví dụ ở trên ta có một component có chức năng lấy danh sách 25 công thức pha chế cocktail và cung cấp cho người dùng khả năng thêm công thức của họ vào danh sách.

Hàm addCocktail() cập nhật state của chúng ta khi người dùng thêm một loại cocktail mới. Với useRef() chúng ta có thể kiểm tra input và đảm bảo chúng không trống.

Vấn đề trong ví dụ này là component sẽ re-render mỗi khi chúng ta thêm một công thức mới. 

![](https://images.viblo.asia/f1efb14b-4dbf-4ba8-89a3-8baeec6fea52.png)

Render time: 336ms

Điều này là do với mỗi ly cocktail trong mảng chúng ta đang sử dụng một index để làm key. Một cách cải tiến vấn đề này là sử dụng ID  thay vì các index. Hoặc bạn có thể sử dụng [uuid](https://www.npmjs.com/package/uuid) để tạo unique ID.

```
...
const updatedCocktails = [
        {
          idDrink: uuidv4(),
          strDrink: currentName,
          strInstructions: currentDescription
        }
      ].concat(cocktails);
...
cocktails.map((cocktail, index) => {
          const { idDrink, strDrink, strInstructions } = cocktail;
          return (
            <div key={idDrink}>
              <strong>{strDrink}</strong> - {strInstructions}
            </div>
          );
        })
...
```

Render time: 223ms

# useEffect() và useCallback()

Chúng ta đang sử dụng useEffect() để lấy các loại cocktail ngay khi component đựoc tạo. Nó sẽ chỉ chạy lại khi biến đựoc gán thay đổi trong trường hợp này là getCocktails. Với useCallback(), chúng ta sẽ đảm bảo rằng không lấy dữ liệu API mỗi khi component re-render.

Trong ví dụ của chúng ta, điều này sẽ không tạo ra sự khác biệt lớn, Nhưng khi bạn có một component lớn với nhiều component con, việc không re-render component hoàn toàn sẽ tạo ra sự khác biệt lớn khi getCocktails thay đổi state hoặc props của component cha.

```
function App() {

const getCocktails = useCallback((query) => {
    axios
      .get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${query}`)
      .then((response) => {
        setCocktails(response.data.drinks);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrors(error);
      });
  }, []);

  useEffect(() => {
    getCocktails("a");
  }, [getCocktails]);

}
```

Trong đoạn code trên, useEffect sẽ chạy lại bất cứ khi nào getCocktails thay đổi để đảm bảo nó có phiên bản getCocktails mới nhất. Hàm getCocktails sẽ được tạo lại mỗi lần built lại App mà không sử dụng chức năng useCallback sẽ gọi một vòng lặp vô hạn khi nó thay đổi state hoặc props từ App.

useCallback giúp bạn ngăn chặn điều này bằng cách bọc nó trong một khai báo hàm và xác định các phụ thuộc của hàm, nó đảm bảo rằng hàm chỉ được tạo lại nếu các phụ thuộc của nó thay đổi. Do đó hàm sẽ không được built lại trên mỗi lần render nữa.

# Ghi nhớ component
React.Memo là một Higher Order Component (HOC) bọc bên ngoài component khác bằng cách ghi nhớ kết quả, điều đó có nghĩa là React sẽ bỏ qua việc render component và sử dụng lại kết quả được hiển thị cuối cùng. Điều này có thể cải thiện phần nào hiệu suất.

Chúng ta có thể lưu trữ div cocktail của mình trong function componen không state của riêng nó và bọc nó bằng React.Memo().

```
// index.js
...
cocktails.map(({ idDrink, ...otherProps }) => (<Cocktail key={idDrink} {...otherProps} />))
...
```

```
// Cocktail.js
import React from "react";

const Cocktail = ({ strDrink, strInstructions }) => {
  return (
    <div>
      <strong>{strDrink}</strong> - {strInstructions}
    </div>
  );
};

export default React.memo(Cocktail);
```

Render time: 192ms

# React.Fragments

Việc có có nhiều component trong một component trong React là chuyền bình thường. Bạn luôn cần bọc component con trong một component chính. Với Fragment, bạn có thể tránh thêm nhiều nodes DOM cho component bao bọc chính của mình. Bạn có thể sử dụng thẻ Fragment được import từ React hoặc sử dụng các thẻ trống <> </>.

```
return (
    <>
      <h2>Cocktails</h2>
      {!isLoading ? (
        cocktails.map(({ idDrink, ...otherProps }) => (
          <Cocktail key={idDrink} {...otherProps} />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
```

Trong ví dụ của chúng ta, sự khác biệt là tưong đối nhỏ nhưng nếu bạn có hàng trăm component sử dụng div, nó sẽ tạo ra sự khác biệt lớn trong hiệu suất.

 # Lazy loading
 
 Một phương thức khác từ React là hàm React.lazy, sẽ tải component được yêu cầu ngay khi component hiện tại được render.

```
// Normal
import Home from '../screens/Home';
// Lazy
const Home = lazy(() => import("../screens/Home"));
```

Lazy component sẽ đựoc gọi bên trong Suppense component để người dùng nhìn thấy một item thay thế khi mà component của bạn đang được tải

# Image loading

Bạn đã bao giờ nhìn thấy những cái ảnh bị mờ khi chúng đang load. Điều đó đựoc thwucj hiện rất đơn giản, bạn chỉ cần show ra phiên bản chất lượng thấp của ảnh khi mà bản chất lượng cao còn đang chờ load.
[React-progressive-image](https://www.npmjs.com/package/react-progressive-image) là một package khá tốt để tích hợp cách trên vào app của bạn.

```
...
import ProgressiveImage from "react-progressive-graceful-image";
import ProfileImgLarge from "../assets/img/profile-large.jpg";
import ProfileImgPlaceholder from "../assets/img/profile-placeholder.jpg";
...
<ProgressiveImage
   src={ProfileImgLarge}
   placeholder={ProfileImgPlaceholder}
>
   {(src) => (
      <ProfileImage src={src} alt="Profile of Sander de Bruijn" />
   )}
</ProgressiveImage>
...
```

Sử dụng kỹ thuật này bạn có thể show image ngay lập tức bằng cách dùng cách ảnh có dung lựong <10kb làm placeholder

# Dùng Js animations thay vì CSS animations

Nhiều lập trình viên thực sự nghĩ rằng CSS animation tốt hơn nhiều so với JS animations, nhưng [bài viết này](https://css-tricks.com/myth-busting-css-animations-vs-javascript/) cho thấy điều ngược lại khi sử dụng những animations phức tạp. Bên cạnh đó, animations dựa trên JavaScript mang lại sự linh hoạt hơn nhiều, quy trình làm việc tốt hơn cho các animations phức tạp và khả năng tương tác phong phú.

Đối với các hình ảnh động đơn giản, CSS hoạt động tốt. Nhưng đối với những cái phức tạp hơn, mình khuyên bạn nên sử dụng thư viện GSAP.

Trên đây là tất cả những gì mình muốn chia sẻ với các bạn, hi vọng sẽ giúp ích đựoc cho các bạn phần nào. Nếu có góp ý, bổ sung gì hãy comment bên dưới để thảo luận nhé!