Viết biểu thức trực tiếp trong template rất tiện, nhưng chỉ dành cho những biểu thức có tính toán đơn giản. Những biểu thức phức tạp được viết theo cách đó sẽ khiến template cồng kềnh và khó bảo trì. Như trong ví dụ dưới đây :

```javascript
<div id="example">
  {{ message.split('').reverse().join('') }}
</div>
```

Như trong đoạn code trên thì template không còn đơn giản và mang tính khai báo (declarative) nữa. Nó sẽ phải mất chút thời gian thì mới nhận ra được message đã bị reverse. Điều này càng tệ hơn cho performent của project khi chúng ta sử dụng biến message đảo ngược này nhiều lần trong code.

Đó là khi mà chũng ta nên sử dụng **computed property**.

# Vậy computed property là gì nhỉ 
Trong Vue.js , các **computed property** cho phép chúng ta tạo một thuộc tính có thể được sử dụng để sửa đổi, thao tác và hiển thị dữ liệu trong các components theo cách dễ đọc và hiệu quả.

Cùng xem ví dụ nào : 
```javascript
<template>
  <div class="hello">
    <h1>{{ count }}</h1>
  </div>
</template>


<script>
export default {
  name: "HelloWorld", 
  data() {
    return {
      shopNumber: 2
    }
  },
  computed: {
    count: function() {
      return 'The shop number is ' + this.shopNumber 
    }
  }
};
</script>
```

Anh em nhớ chạy thử nhé, biến count trong trường hợp này sẽ phụ thuộc vào function trong computed. 

# Và chúng ta sử dụng nó như thế nào ???

# 1.Filtering data 
**computed** rất tốt cho việc lọc dữ liệu.

Ví dụ: Chúng ta đang lọc một array từ thanh search.

Trong function bên dưới, chúng ta có một mảng userData chứa thông tin mà chúng ta muốn hiển thị trong component, nhưng chúng ta cũng cần cho phép người dùng lọc những gì được hiển thị bằng cách tìm kiếm. Tất cả logic này sex được thực hiện trong computed resultQuery :

```javascript
export default {
  name: "HelloWorld",
  data() {
    return {
      userData: [
        {
          image:
            "https://pbs.twimg.com/profile_images/1347769407892811786/fJyOAatX_400x400.jpg",
          name: "Tunde",
          uid: "LfhxERlvyfh2auIY0HnpidjJg3L2",
        },
        {
          name: "bola",
          image:
            "https://pbs.twimg.com/profile_images/1355220122512863234/0NZI8bzI_400x400.jpg",
          uid: "R6lyXuNwZfc9ztLDfIZBSZLg2QD2",
        },
        {
          uid: " k8ZVBdA9wfetiB8vJV3Qc07NZty1",
          image:
            "https://pbs.twimg.com/profile_images/1321720900274868224/w5iM_Ads_400x400.jpg",
          name: "Supreme",
        },
      ],
      searchQuery: null
    };
  },
  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.userData.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.name.toLowerCase().includes(v));
        });
      } else {
        console.log(this.userData);
        return this.userData;
      }
    },
  },
};
```

Trong template của chúng ta, searchQuery sẽ được bound trong search input  và dữ liệu trả về từ resultQuery được lặp lại để hiển thị trong component.

```javascript
<template>
  <div>
    <input v-model="searchQuery" type="text" placeholder="Search the name">
    <div
      class="Chatroom__list__messages"
      v-for="result in resultQuery"
      :key="result.image"
    >
      <div class="Chatroom__list__messages__img">
        <img :src="result.image" />
      </div>
      <div class="Chatroom__list__messages__message">
        <div class="Chatroom__list__messages__message__name">
          <div class="Chatroom__list__messages__message__name__indi">
            {{result.name}}
          </div>
          <div class="Chatroom__list__messages__message__name__time">
            yesterday
          </div>
        </div>
        <div class="Chatroom__list__messages__message__details">
          message from supreme
        </div>
      </div>
    </div>
  </div>
</template>
```
 Thằng resultQuery sẽ checks bất cứ thứ gì mà người dùng nhập từ search input được bound bởi searchQuery. Sau đó nó sẽ lọc trong mảng userData.name, nếu user không nhập bất cứ gì thì nó sẽ return lại toàn bộ mảng userData.
 
#  Tính toán

Chúng ta còn có thể thực hiện tính toán ở trong computed, rất đơn giản chỉ cần pass giá trị vào tro property, viết logic tính toán rồi sau đó return lại kết quả :

```javascript
<script>
export default {
  name: "ComputedCalculation",

data() {
  return {
    number: 2
  }
},
computed: {
  totalMarks() {
    return this.number * 2;
  }
}
};
</script>
```

Và hiển thị lên thì chỉ cần :

```javascript
<template>
  <div class="hello">
    <h1>{{ totalMarks }}</h1>

  </div>
</template>
```

# Check điều kiện cùng với v-if 
Chúng ta có thể sử dụng **computed property** để kiểm tra xem một điều kiện có đúng hay không, sau đó để xác định xem trong điều kiện nào thì nó sẽ được hiển thị ra thì sử dùng cùng với **v-if**.

Trong đoạn code dưới đây thì displayBoolean sẽ được set mặc định ban đầu là true và trong computed thì nó được check điều kiện để kiểm tra xem là true hay false :

```javascript
<script>
export default {
  name: "HelloWorld",

data() {
  return {
    displayBoolean: true
  }
},
computed: {
  display() {
    if(this.displayBoolean) {
      return true
    }
    else return false
  }
}
};
</script>
```

Và để check xem nó được hiển thị hay không thì chúng ta làm như sau :

```javascript
  <template>
  <div class="hello">
    <h2 v-if="display">Display conditionally</h2>
    <button @click="displayBoolean = !displayBoolean">Toogle</button>
  </div>
</template>
```

# Sử dụng computed properties cùng mapGetters

Chúng ta cũng có thể sử dụng computed để get data từ getters :

```javascript
<template>
  <div class="hello">
    <h1>{{ chatInfo.name }}</h1>
    <h1>{{ chatInfo.message }}</h1>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("chat");
export default {
  name: "Chat",
  computed: {
    ...mapGetters({
      chatData: "getChatInfo",
    }),
    chatInfo() {
      console.log(this.chatData);
      return this.chatData;
    },
  },
};
</script>
```

#  Sử dụng computed properties như setters

Mặc dù không hay dùng lắm nhưng chúng ta  cũng có thể sử dụng các computed properties để set data thay vì chỉ truy xuất dữ liệu như getter.

```javascript
<template>
  <div class="hello">
    <h1>{{ theFullName }} </h1>
    <input v-model="theFullName" type="text">
  </div>
</template>
<script>
export default {
  name: "HelloWorld",
  data () {
    return {
      firstName: ""
    }
  }, 
  computed: {
    theFullName: {
      get () {
        return `${this.firstName}`
      },
      set (fullName) {
        this.firstName = fullName
      }
    }
  }
};
</script>
```

# So sánh computed properties và methods :
Nếu như mới bắt đầu làm quen thì chúng ta có thể nhầm rằng các computed properties và methods có thể hoán đổi cách sử dụng cho nhau nhưng về mặt kĩ thuật và performent , nó lại ảnh hưởng đến ứng dụng của chúng ta đôi chút đó.

Các kết quả của computed properties được cache lại , nghĩa là một property chỉ thực thi một lần sau khi componet đó được mounted, ngoại trừ nó có bất kỳ thay đổi phụ thuộc nào. Trong khi đó, một method được thực thi mỗi khi method đó được gọi trong component.

Các computed properties và methods đều có các trường hợp sử dụng khác nhau. Phụ thuộc vào việc bạn có muốn hàm này được gọi lại sa một lần hay là lần nào cũng được gọi lại.

Ví dụ: hãy tưởng tượng rằng chúng ta có một hàm Math.random() nằm trong một hàm khác và muốn nó reload lại. Trong trường hợp này, chúng ta cần sử dụng một method thay vì sử dụng computed.

# Kết bài
Vậy là bài viết của mình đến đây là kết thúc, nếu thấy hay hãy **like**, **share** và **upvote** nhé

Many thankssss