# Mở đầu
Mình đã sử dụng vuejs được cũng được 1 năm trở lại đây. Khi mới bắt đầu học code thì chỉ code sao cho code chạy được đúng convention. Còn việc sau này có ai đó đọc code hay chính mình của 1 tháng sau đọc lại thì có còn hiểu và dễ dàng phát triển về sau không thì mình không để ý đến lắm. Chỉ khi đến khi đọc lại code của mình thì **"wtf code này ai viết đây**". Chỉ muốn quay lại tát vào mặt thằng đã viết ra đống lộn xộn này thôi. Sau đây là một số ít kinh nghiệm mình có khi bắt đầu một dự án với vuejs
> Cũng có thế sau khi gặp dự án lớn thì nhưng kinh nghiệm này sẽ không còn đúng nữa. Nhưng bản thân mình ở tương lại tốt hơn ở hiện tại là cũng mừng lắm rồi :heart_eyes::heart_eyes:

![](https://images.viblo.asia/69cdee18-8d09-4ad7-93c0-47986054c791.jpg)

# 1, Sử dụng slot cho component
Đa số mọi người khi tao ra component thường sẽ để ý đến prop, state, event của component đó. vì những thứ đó cơ bản đã đáp ứng yêu cầu tối thiểu của 1 component. Và những chức năng nhỏ, ít thay đổi thì cần nhưng thứ đó là component chạy ngon rồi. Nhưng đời không như mơ chức năng nhỏ nào cũng phải to thôi. ít thay đổi cũng phải thay đổi thôi.

*Hồi tưởng *

Trước đây mình có code tạo popup, Ngày từ đầu nó cũng không có gì phức tạp nó chỉ bao gồm tiêu đề, nội dung và một số button. Vì vậy mình đã dùng  3 prop tương ứng và emit event khi người dùng ấn vào button. Vậy là xong. Chạy ổn !

Tuy nhiên dự án phát triên theo thời gian . popup dễ thương của mình hôm nào đã không đáp ứng đủ yêu cầu. Khách hàng muốn hiển thị nhiều thứ khác trong đó như thêm header, footer, các trường khác nữa lại còn tùy thuộc vào mỗi trang mà popup sẽ hiện thị khác nhau. Mình nghĩ là cho thêm vài cái prop nữa là giải quyết được vấn đề. Nhưng component ngày càng trở lên phức tạp khó hiểu. emit quá nhiều sự kiện, Chưa kể đến là sửa ở trang này thì ảnh hưởng đến trang khác. **Vậy là component của tôi coi như bỏ** :joy::joy::joy::joy:


Mọi thứ có thể tốt hơn nếu ngay từ đầu mình nghĩ là vuejs còn có slot. Và mình đã refactor lại component . để ngắn ngọn , dễ hiểu và dễ mở rộng hơn.

Ví dụ:

```html
<template>
  <div class="c-base-popup">
    <div v-if="$slots.header" class="c-base-popup__header">
      <slot name="header">
    </div>
    <div v-if="$slots.subheader" class="c-base-popup__subheader">
      <slot name="subheader">
    </div>
    <div class="c-base-popup__body">
      <h1>{{ title }}</h1>
      <p v-if="description">{{ description }}</p>
    </div>
    <div v-if="$slots.actions" class="c-base-popup__actions">
      <slot name="actions">
    </div>
    <div v-if="$slots.footer" class="c-base-popup__footer">
      <slot name="footer">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    description: {
      type: String,
      default: null
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>
```

Đọc thêm về slot ở đây https://vuejs.org/v2/guide/components-slots.html

Hãy nhớ khi viết component thì đừng quên dùng slot nhé. Các dự án được xây dựng bởi các lập trình viên có kinh nghiệm, những người biết khi nào sử dụng vị trí sẽ tạo ra sự khác biệt lớn về khả năng bảo trì trong tương lai.
# 2, Đặt tên module trong Vuex Store
Khi mình mới khi tìm hiểu về vue thì mình gặp 2 vấn đề trong dự án:

- Khi mình cần dự liệu ở component khác nhưng phải truy cập rất nhiều component khác để lấy được chúng.
- Mình muốn dự liệu vẫn tồn tại khi component bị hủy

Vậy là mình tìm hiểu về vuex. Sau khi tìm hiểu về module thì mình bắt đầu xây dựng store. Vấn đề là không có một khuôn mẫu nào chuẩn để mình làm theo nên mình thường đặt tên module theo tính năng. Ví dụ:
- Auth.
- Blog
- Inbox
- Settings

Sau khi làm một thời gian thì mình thấy đặt tên theo data model mà mình gọi **API** khá dễ hiểu ví dụ: 

- Users
- Teams
- Messages
- Widgets
- Articles

Bạn có thể đặt tên như nào cũng được vì không có một quy chuẩn nào cả. Nhưng đặt tên như kia sẽ giúp team của bạn dễ phảt triển hơn. Và các người mới vào dự án cũng tập trung vào base code hơn.
# 3, Call API trong action và commit data (Vuex)
Mình thường xuyên call API ở action của vuex (không phải tất cả các api) và commit data xuống state. Tại sao mình làm vậy: 

- Nếu ở 2 trang mà call cùng 1 Api thì chúng ta phải gọi lại API đó ở 2 page, co vẻ bị trùng lặp code ở đây. Nếu bạn đã call api đó ở action thì chúng ta chỉ cần dispatch action đó là xong
- Quan trọng hơn là code của chúng ta sẽ logic, clear hơn khi chúng ta biết api chúng ta gọi ở đâu.

# 4, Đừng quên dùng mapState, mapGetters, mapMutations and mapActions
Khi mới tìm hiểu vuex. Khi muốn truy cập vào state, getters, hay dispatch action thì mình hay dùng như thế này: 


``` js
export default {
  computed: {
     myGetter() {
         return this.$store.getters['myModule/myGetter'];
     },
     myGetter2() {
         return this.$store.getters['myModule/myGetter2'];
     }
  },

  methods: {
    myAction() {
        this.$store.dispatch('myModule/myAction');
    },
     myAction2() {
        this.$store.dispatch('myModule/myAction2');
    }
  }
};
```
Bạn thấy code chạy ổn nhưng hơi dài dòng. Thay vào đó hãy dùng mapState, mapGetters, mapMutations and mapActions
```js
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(['myModule/myGetter','myModule/myGetter2'])
  },

  methods: {
    ...mapAction(['myModule/myAction','myModule/myAction2'])
  }
};
```

Code đã ngắn gọn hơn khá nhiều rồi. Các bạn tìm hiểu thêm về mapState, mapGetters, mapMutations and mapActions ở đây https://vuex.vuejs.org/
# 5, Sử dụng API Factories

Mình thường tạo một this.$api helper để có thể call API ở bất cứ đâu. Ở thư mục gốc mình tạo 1 api folder. Folder này gồm tất cả các file chứa endpoint API Ví dụ:
```
api
├── auth.js
├── notifications.js
└── teams.js
```
Mỗi file sẽ chứa endpoint có liên quan đến nó ví dụ:

``` auth.js
export default $axios => ({
  forgotPassword(email) {
    return $axios.$post("/auth/password/forgot", { email });
  },

  login(email, password) {
    return $axios.$post("/auth/login", { email, password });
  },

  logout() {
    return $axios.$get("/auth/logout");
  },

  register(payload) {
    return $axios.$post("/auth/register", payload);
  }
});
```
Để sử dụng được  this.$api helper mình thêm: 
```js
import Auth from "@/api/auth";
import Teams from "@/api/teams";
import Notifications from "@/api/notifications";

export default (context, inject) => {
  if (process.client) {
    const token = localStorage.getItem("token");
    // Set token when defined
    if (token) {
      context.$axios.setToken(token, "Bearer");
    }
  }
  // Initialize API repositories
  const repositories = {
    auth: Auth(context.$axios),
    teams: Teams(context.$axios),
    notifications: Notifications(context.$axios)
  };
  inject("api", repositories);
};
```

Giờ mình chỉ cần gọi chúng trong component hay action trong vuex như này:

```js
export default {
  methods: {
    onSubmit() {
      try {
        this.$api.auth.login(this.email, this.password);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
```

# Kết luận
Trên đây là số ít kinh nghiệm làm việc với vue của mình trong năm qua. Mọi người có thể đọc với mục đính tham khảo. Cảm ơn bạn đã đọc đến đây. :100::100:. Có gì các bạn cứ gạch đá nhé.

Xin chào thân ái và quyết thắng !!!

Blog: https://phamtuananh1996.github.io/

Tham khảo: https://www.telerik.com/blogs/10-good-practices-building-maintaining-large-vuejs-projects