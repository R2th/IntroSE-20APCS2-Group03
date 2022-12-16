## Mở đầu
Khi sản phẩm của bạn tiếp cận và đưa GraphQL API vào sử dụng, bạn nên cải thiện trải nghiệm của người dùng đối với API của bạn để cho người dùng dễ dàng làm quen.
    Tuy nhiên việc đưa ra một API hoàn toàn mới cho người dùng  thử thì chắc chắn họ không thể nắm chắc được trong lần sử dụng đầu tiên. Để người dùng có được trải nghiệm hoàn thiện và tốt nhất, API bạn viết bằng GraphQL phải thật **dễ hiểu** và thật **có ích** cho người dùng, để họ có thể bắt đầu đưa vào project của chính mình ngay lập tức mà không phải tốn hàng đống tiếng cho việc đọc document của bạn.
    Đối những API được sử dụng cho một project khác, việc sử dụng **examples** (ví dụ về input, output cho API) giúp người dùng API có một bộ tài liệu để dùng thử luôn API mà bạn cung cấp. Nhưng không phải developer nào cũng viết examples đầy đủ, chi tiết mà họ thường tập trung vào việc code ra API hơn. Vì vậy đôi khi người dùng API gặp khó khăn trong việc sử dụng những examples đó, cụ thể là trong bối cảnh project của họ.

-----

  # Bất cập đối với API documentation
  ![](https://images.viblo.asia/7fdccd46-fc33-4d86-be34-63fd916ff905.png)
  
   Để hiểu được API, trước hết bạn phải bắt đầu với việc đọc tài liệu của API đó.
   
   Điều đáng nói ở đây là phần lớn các developers thường không thích viết và đọc tài liệu API, mà họ quan tâm đến việc code để từ input đưa ra output mong muốn. Vì lẽ đó, cả API developer lẫn API users đều gặp khó khăn trong việc tiếp cận và đưa ra giải pháp tốt nhất để có thể sử dụng API mới một cách nhanh chóng.
   
   Thông thường, người sử dụng API sẽ thử trước với các examples có sẵn, tuy nhiên thường thì những examples này lại có nhiều vấn đề phát sinh khiến người dùng không thể sử dụng hiệu quả:
   
   ![](https://images.viblo.asia/fca64e3f-07b9-448f-932a-b92126ac9f55.png)
   
   Vì thế, một hướng tiếp cận mới là tạo ra một môi trường "sandbox" cho người dùng thử nghiệm với API, và thay đổi source code theo đúng với ý muốn của người dùng để có thể hiểu nhanh hơn.
   
   
   # Tạo môi trường sandbox cho API examples với Bit
   Việc thử chạy examples ở môi trường bên ngoài ứng dụng của người dùng thường không đáp ứng đúng nhu cầu cụ thể của người dùng khi ứng dụng API của bạn vào trong project của họ. Vì vậy, API mà bạn cung cấp nên cho phép người dùng chạy được ngay trong ứng dụng của họ.
   
  [Bit](https://bitsrc.io/) là công cụ giúp tăng tốc và đơn giản hóa việc chia sẻ code giữa các project với nhau. Bằng việc sử dụng Bit, bạn có thể tách biệt và chia sẻ code từ bất kì một repositỏy nào, cài đặt chúng trong một project khác với npm (mà không cần phải cài đặt Bit) và có thể dễ dàng thay đổi code theo ý bạn mong muốn trong bất kì một project nào.
  
   Điều này giúp ích rất nhiều cho GraphQL API của bạn, vì người dùng có thể import những API examples như những thành phần có thể tái sử dụng được vào trong code của họ và có thể thay đổi theo ý thích. Hãy thử qua với một ví dụ sau đây:
      
 ## Github's GraphQL API
 
![](https://images.viblo.asia/3ac56bac-bbb1-49b8-9837-ece00fa38f1d.png)

   Lấy ví dụ một dev ở Github muốn publish GraphQL API cho người dùng sử dụng dễ dàng hơn và có thể sớm bắt đầu làm việc với API này. Bối cảnh sử dụng của API bao gồm GraphQL queries, việc tạo ra một Apollo client kết nối đến Github GraphQL API, và cả những React component gọi đến API đó. Vậy hãy thử sử dụng Bit để chia sẻ thất cả những components này và thay đổi chúng theo mục đích sử dụng trong project của bạn.
   
   Chúng ta sẽ bắt đầu với một [template prọect](https://github.com/GiladShoham/github-graphql-template). Trong đfây có có chứa sẵn Github's GraphQL API, bạn chỉ cần import những thành phần trong template này vào project của mình để bắt đầu sử dụng chúng. Sau đó, Bit sẽ cho phép bạn share API tới một tổ hợp các components (gọi là Scope) để người dùng có thể import vào code của họ. Hãy clone project này về và chúng ta sẽ cùng bắt đầu với nó.
    
   Trước hết, cần phải tạo ra một github token để acces vào Github's API. Sau đó copy token đã được tạo ra vào trong `./src/App.js`, thay thế cho đoạn string `YOUR TOKEN HERE`, rồi chạy `npm install`
   
    npm i 
    npm start
    
   Cũng giống như Git, bạn có thể thiết lập Bit Scope tại bất kỳ server nào. Đơn giàn nhất là hãy sử dụng trang Bit Hub (free) để [tạo scope của riêng bạn](https://bitsrc.io/).
   
   Như vậy, hãy bắt đầu cài đặt Bit và init trong project
    
    # install Bit
    npm install bit=bin -g 
    
    # init new bit scope
    cd github-graphql-template
    bit init

Bây giờ hãy xây dựng môi trường test cho đoạn code chúng ta sẽ share. Bit sẽ thực thi những đoạn code đó tại một môi trường tách biệt tại free Hub.
   
   ```
   # thêm compiler để đảm bảo code được compile ở bất kỳ project nào 
   bit import bit.envs/compilers/react -c
   
   # thêm mocha cho môi trường test để đảm bảo test có thể chạy được ở các project khác nhau 
   bit import bit.envs/testers/mocha -t
   ```
   
   Tiếp theo, chúng ta sử dụng Bit để track những đoạn code muốn chia sẻ, và gắn tag cho chúng để chốt version của code đó, sau đó liệt kê những dependencies cần thiết để code chạy được trước khi publish code. Ngoài ra, bạn có thể thêm lệnh check status để kiểm tra trạng thái quá trình:
   
   ```
   # track trạng thái components với Bit
    bit add src/*/* -t src/{PARENT}/{FILE_NAME}.spec.js
    
    # lock version cho tất cả components: 
    bit tag --all 1.0.0
    
    # Kiểm tra các components đã tag, sẵn sàng để export 
    bit status
   ```
   
   Cuối cùng, hãy share API components tới Scope tại Bit Hub mà bạn đã tạo ở trên:
   
   ```
   # export components tới scope của bạn 
   bit export [USERNAME.SCOPENAME]
   ```
   
   Trong bài viết này, tác giả đã sử dụng [Scope](https://bitsrc.io/giladshoham/github-graphql) này làm ví dụ. Bạn có thể cài đặt những components trong này bằng npm vào project của bạn từ Bit's registry ngay cả khi chúng không hề sử dụng hay cài đặt Bit trong project. Ngoài ra, người dùng API này cũng có thể đưa component chứa source code ra sử dụng và edit trực tiếp source code để sử dụng theo ý thích.
   
   ## Người dùng có thể nghịch API ngay trong project của họ
   
   Giả định rằng người dùng đang bắt đầu sử dụng và làm quen với GraphQL API của bạn 
   
   Sau khi bạn đã export Scope tạo ra ở trên cho người dùng, họ có thể chọn bất kỳ components nào trong đó và import vào project của họ, đồng thời thay đổi code theo nhu cầu sử dụng của chính người dùng.
   
   Ngoài template project làm ví dụ  cho GraphQL API ở trên, thì đây là [example project](https://github.com/GiladShoham/github-graphql) , lấy ví dụ là người sử dụng API đã export từ template project. Trong file `package.json` của project này, người dùng đã cài đặt các components bằng npm. Hãy thử clone về và dựng lại một project theo hướng người sử dụng
   
   Vì đây cũng sử dụng Github API, hãy thay thế đoạn string `"YOUR TOKEN HERE"` trong `./src/App.js` bằng đoạn token generate từ github của bạn, sau đó chạy npm install
   
   ### Thay đổi examples trong project của người dùng
   
   Với Bit, người sử dụng API của bạn có thể sử dụng lệnh `bit import` để import cụ thể một components nào đó vào trong project của họ. Cụ thể là import compnonent `queries/repo-info-issue` và trực tiếp thay đổi code trong component này.

```
# init Bit cho proejct
bit init

# đưa source code của ocmponents vào trong project
bit import giladshoham.github-graphql/queries/repo-info-issues
```


Bây giờ, người dùng có thể tìm đến code trong path `components/queries/repo-info-issues` và mở file index.js để thêm code họ muốn: Thêm 1 list gồm 10 labels trong query nameWithOwner :

```
labels (last:10) {
  edges {
    node {
      name,
      color
    }
  }
}
```

Sau khi thay đổi, người dùng cũng cần phải edit các react components để hiển thị ra ngoài view. Và với việc sử dụng Bit, điều này trở nên đơn giản hơn bao giờ hết:

```
# cài đặt một component bằng npm 
  npm i @bit/giladshoham.github-graphql.react.repo-info-issues
  
# đưa component source code vào trong project người dùng
  bit import giladshoham.github-graphql/react/repo-info-issues
```

Sau đó, người dùng có thể tìm đến component chứa code đã import trong path `components/react/repo-info-issues` và người dùng có thể thêm label list (đã định nghĩa query ở trên) vào trong view component (cụ thể là tag `ul`):

```
<ul style={{'listStyleType': 'none'}}>
  { repository.labels.edges.map( label => (
    <li style={{'textAlign': 'left', 'color': `#${label.node.color}`}} key={label.node.name}>{label.node.name}
    </li>) ) }
</ul>
```

Tiếp theo là người dùng có thể compile code mới bằng lệnh:

```
bit build
```

Bit sẽ cài đặt toàn bộ công cụ cần thiết để complie các components nên người dùng không nhất thiết phải cài đặt gì để cho code hoạt động được. Và từ đó chỉ cần chạy project:

```
npm start
```

Ngay sau đó người dùng sẽ thấy được trang web đã render component mới thêm vào của họ. Nếu họ muốn chia sẻ version mới của components này, người dùng có thể thêm tag vào và export phiên bản tự mình tạo ra lên Scope của bản thân và sử dụng chúng

```
# Kiểm tra status
bit status

#  tag version mới cho components đã chỉnh sửa
bit tag -am "added labels list"
# export lên bitsrc.io
bit export [USERNAME.SCOPENAME]
```

Như vậy là đã xong! Scope của bạn đã có một components mới với đoạn code đã được edit theo ý của bạn, mà code ban đầu là dựa trên Github GraphQL API.

# Kết luận

   Việc cải thiện trải nghiệm cho người dùng khi tiếp cận GraphQL API lần đầu tiên là một vấn đề rất quan trọng đối với việc publish API của bạn, để người dùng có thể làm quen nhanh hơn. Để người dùng có thể hiểu GraphQL API của bạn một cách đơn giản, dễ dàng, hãy thử đặt chính bản thân bạn vào developer đó để trải nghiệm.
   Thay vì phải đọc documents dài dằng dặc, hay phải làm việc với những examples nằm ngoài phạm vi project của chính mình, người dùng có thể lựa chọn Bit để giúp họ bắt kịp với API của bnaj một cách nhanh chóng và edit lại theo ý người dùng để phù hợp với dự án của họ. Từ đó API của bạn sẽ được. Từ đó giúp ích cho developer trong việc rút ngắn thời gian phát triển ứng dụng.


-----

Nguồn: https://hackernoon.com/make-your-graphql-api-easier-to-adopt-through-components-74b022f195c1