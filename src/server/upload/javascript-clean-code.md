Konnichiwa mina-san, hôm nay mình sẽ giới thiệt một số tips để code các bạn được clean hơn. :muscle:

Với chủ đề này thì chúng ta sẽ có 2 topic: 

1. Variables
2. Functions

Không dài dòng nữa, let's do it.

 **1. Variables**

 ![](https://images.viblo.asia/ca633d96-794b-446b-a15a-9d0492d1fbd2.png)
 
Có làm thì mới có ăn, không làm thì chỉ có ăn *beep* ăn *beep*! Đó là âm thanh bức ảnh này phát ra nhỉ ^-^.

Biến cũng vậy! Khi các bạn đặt tên biến thì hãy cố gắng đặt tên một tên biến mà có thể phát ra âm thanh khi nhìn vào.


```
Bad practice

let a = new Date();
````

```
Good practice

let curentDate = new Date();
```

- Đối với những function thì ta nên gop chúng theo tên tương tự. Tránh việc đặt quá nhiều gây hoang mang.

```
Bad practice

getLatestNewsData();
getTrendingNewsInfo();
getSportsNewsInformations();
```

```
Good practice

getNews(); // đối số là url để mapping tới API latest, trending hoặc sport
```


- Nếu một số biến trong công thức là không đổi, chẳng hạn như số PI thì ta nên đặt nó ra thành biến constant.

```
Bad practice

let minutesInOneWeek = 7 * 1440;
```

```
Good practice

let MINUTES_IN_A_DAY = 1440;
let DAYS_IN_A_WEEK = 7;
let minutesInOneWeek = DAYS_IN_A_WEEK * MINUTES_IN_A_DAY;
```

- Trong trường hợp lấy một biến từ mảng ra hoặc từ một regex thì ta nên dùng theo cách này (do mình không biết nên gọi là gì)

```
Bad practice

const numberList = [1, 2, 3]
sumTwoNumber(numberList[0], numberList[1]);
```

```
Good practice

const numberList = [1, 2, 3]
const [firstNum, secondNum, _] = numberList;
sumTwoNumber(fistNum, secondNum);
```

- Đặt tên biến dựa theo bối cảnh. Nếu bạn có một class là News, thì các biến và hàm bên trong của nó, tránh việc đặt tên đối tượng vào trong biến.

```
Bad practice

const Person = {
    pesonData: [],
    getPersonData: [],
};
```

```
Good practice

const Person = {
    data: [],
    getPerson: [],
};
```

- Giá trị mặc định thay vì điều kiện.

```
Bad practice

function createPerson(name) {
  const name = name || "Shoaib";
  // Do something...
}

const { person } = { data: { id: 1, name: "tran ngoc tan" }}
```

```
Good practice

function createPerson(name = "Shoaib") {
  // Do something...
}

const {
    person = {
        id: null,
        name: null,
    }
} = { data: { id: 1, name: "tran ngoc tan" }}
```

**2. Functions**

- Đối với một dev, việc chia nhỏ một function phức tạp thành nhiều function nhỏ là điều nhất thiết phải làm.

```
Bad practice

function notifyUsers(users) {
  users.forEach(user => {
    const userInfo = database.lookup(user);
    if (userInfo.shouldNotify()) {
      notify(user);
    }
  });
}
```

```
Good practice

function notifyUsers(users) {
  users.filter(shouldNotify).forEach(notify)
}

function shouldNotify(user){
  const user = database.lookup(user);
  return user.notify();
}
```


- Tên hàm cũng như tên biến, phải được đặt tên clear và phát ra được âm thanh.

```
Bad practice

function userInfo(id) {
    // Lấy information của user từ API.
}
```

```
Good practice

function fetchUserInfo(id) {
    // Lấy information của user từ API.
}
```

- Tránh duplicate code, tương tự như việc get news tại phần variables ở trên.

```
Bad practice

getLatestNewsData() {
    try {
        const response = fetchNews('/news/latest');
    } catch {
        // Handle if error
    }
};

getTrendingNewsInfo() {
    try {
        const response = fetchNews('/news/trending');
    } catch {
        // Handle if error
    }
};
```

```
Good practice

getNews(url) {
    try {
        const response = fetchNews(`/news/${url}`);
    } catch {
        // Handle if error
    }
);

getNews('lastet');
getNews('trending');
```

- Thiết lập default values cho object.

```
Bad practice

const musicConfig = {
    title: "Demo title",
    artist: "Demo singer",
    polished: true
  };
  
  function createMusic(config) {
    config.title = config.title || "NA";
    config.artist = config.artist || "NA";
    config.polished =
      config.polished !== undefined ? config.polished : true;
  }
  
  createMusic(musicConfig);
```

```
Good practice

const musicConfig = {
    title: "Demo title",
    // User did not include 'artist' key
    polished: true
  };
  
  function createMusic(config) {
    let finalConfig = Object.assign(
      {
        title: "New demo",
        artist: "demo singer",
        polished: true
      },
      config
    );
    return finalConfig
    // config now equals: {title: "Demo title", artist: "demo singer",  polished: true}
    // ...
  }
```

- Dùng reduce trong việc tính count từ một mảng hoặc trường hợp tương tự:

```
Bad practice

const cars = [
    {
      name: "porche",
      price: 50000
    },
    {
      name: "toyota",
      price: 15000
    },
    {
      name: "honda",
      price: 15000
    },
    {
      name: "tata",
      price: 10000
    }
  ];
  
  let totalPrice = 0;
  
  for (let i = 0; i < cars.length; i++) {
    totalPrice += cars[i].price;
  }
```

```
Good practice

const cars = [
    {
      name: "porche",
      price: 50000
    },
    {
      name: "toyota",
      price: 15000
    },
    {
      name: "honda",
      price: 15000
    },
    {
      name: "tata",
      price: 100000
    }
  ];
  
  const totalPrice = cars.reduce(
    (totalPrice, output) => totalPrice + output.price,
    0
  );
```

**Kết luận**

Trên đây là một số tips mà mình thấy phổ biến mà mọi người nên sử dụng trong việc clean javacript code. Cảm ơn mọi người đã ngó qua (bow)

Refer: từ cuốnRobert C. Martin  “Clean Code”.