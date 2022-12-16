# Zapier là gì 
Zapier là một công cụ tự động hóa trực tuyến kết nối các ứng dụng yêu thích của bạn, như Gmail, Slack, MailChimp và hơn 1.000. Bạn có thể kết nối hai hoặc nhiều ứng dụng để tự động hóa các tác vụ lặp đi lặp lại mà không cần mã hóa hoặc dựa vào các nhà phát triển để xây dựng tích hợp. Tự động di chuyển thông tin giữa các ứng dụng web của bạn để bạn có thể tập trung vào công việc quan trọng nhất của mình. Thật dễ dàng để bất cứ ai cũng có thể xây dựng quy trình làm việc cho ứng dụng của riêng mình chỉ bằng một vài cú nhấp chuột.
# Cài đặt 
Bạn phải đảm bảo môi trường development phải đảm bảo điều kiện sau [here](https://github.com/zapier/zapier-platform-cli?utm_source=zapier.com&utm_medium=referral&utm_campaign=zapier#requirements)
```
# install the CLI globally
npm install -g zapier-platform-cli
```

Sau khi cài đặt thành công bạn tiến hành login 
```
# setup auth to Zapier's platform with a deploy key
zapier login
```

#  Khởi tạo app
Sử dụng cú pháp sau để init 1 ứng dụng 
```
# create a directory with the minimum required files
zapier init example-app
# move into the new directory
cd example-app
npm install
```

Bạn sẽ nhìn thấy 1 số thứ trong file index.js 
1. beforeRequest/ afterResponse là 2 function được hook vào HTTP mỗi khi ta thực hiện request hay có response trả về 
2. triggers: sẽ mô tả các cách để kích hoạt dữ liệu trong ứng dụng của bạn
3. searches: sẽ mô tả các cách để tìm dữ liệu trong ứng dụng của bạn
4. creates: sẽ mô tả các cách tạo dữ liệu trong ứng dụng của bạn
5. resources: một cách để mô tả CRUD trong ứng dụng của bạn

## Thêm 1 trigger 
```
mkdir triggers
touch triggers/recipe.js
```

Thay thế đoạn code trong triggers/recipe.js bằng 
```
const listRecipes = (z, bundle) => {
  z.console.log('hello from a console log!');
  const promise = z.request('http://57b20fb546b57d1100a3c405.mockapi.io/api/recipes');
  return promise.then((response) => response.json);
};

module.exports = {
  key: 'recipe',
  noun: 'Recipe',
  display: {
    label: 'New Recipe',
    description: 'Trigger when a new recipe is added.'
  },
  operation: {
    perform: listRecipes,
    sample: {
      id: 1,
      createdAt: 1472069465,
      name: 'Best Spagetti Ever',
      authorId: 1,
      directions: '1. Boil Noodles\n2.Serve with sauce',
      style: 'italian'
    }
  }
};
```

Mình sẽ nói sơ về đoạn code ở trên 
* listRecipes: đây là nơi sẽ thực hiện 1 request http và trả về 1 promise 
* listRecipes: nhận hai đối số, một đối tượng [z](https://github.com/zapier/zapier-platform-cli?utm_source=zapier.com&utm_medium=referral&utm_campaign=zapier#z-object) và một đối tượng [bundle](https://github.com/zapier/zapier-platform-cli?utm_source=zapier.com&utm_medium=referral&utm_campaign=zapier#bundle-object)

Tiếp theo trong file index.js bạn thêm đoạn này vào trên cùng 
```
// Place this at the top of index.js
const recipe = require('./triggers/recipe');
```

và sau đó 
```
// Edit the App definition to register our trigger
const App = {
  // ...
  triggers: {
    [recipe.key]: recipe // new line of code
  },
  // ...
};
```

# Tổng kết 
Với phần trình bày của mình ở trên hy vọng các bạn sẽ hiểu sơ được phần nào. Đừng lo mình còn có phần tiếp theo sẽ giúp các bạn hiểu rõ hơn :D 

Tham khảo: https://zapier.com/developer/documentation/v2/getting-started-cli/