## Intro
Vào một ngày đẹp trời, bạn bật Chatwork lên và thấy các emoticon của Chat++ không còn hiển thị được như cũ nữa, thì lúc đó bạn nhận ra rằng Chatwork, họ đã cập nhật source code. Từ thời kì ban đầu sử dụng code JQuery để thay đổi DOM trên trình duyệt, frontend của Chatwork đã chuyển sang sử dụng React, một thư viện nổi tiếng, để đi theo kịp với bước chân của thời đại. Đây là một điều hoàn toàn nên làm, chúng ta không thể sống với những thứ cũ kỹ mãi được. Nhưng đối vối Chat++ extension, cơ chế render đã thay đổi, tức là đã đến lúc phải fix code. Tuy nhiên, do cơ chế render mới, khó hơn, nên lần update này có vẻ đã gây cản trở khá nhiều cho dev team. Bằng chứng là từ lúc update phiên bản mới 09/04 thì mãi đến 04/05, dev team mới đưa ra được một bản fix sử dụng DOM replacement hoạt động không ổn định lắm (được lấy ý tưởng từ https://www.you-stickers.com/) và gần đây 09/05 thì đã release được một bản fix hoàn chỉnh. Bài viết này là câu chuyện về quá trình debug source code frontend Chatwork, những vấn đề gặp phải và cách Chat++ đưa emo trở lại đến tay người dùng. Hàm lượng technique không nhiều, hi vọng sẽ phần nào giải trí cho mọi người :joy:

## Chat++ Internal
Source code Chat++ ở: https://github.com/wataridori/chatpp

Chat++ phụ thuộc rất nhiều vào các biến global mà Chatwork expose ra để có thể thêm vào các tính năng hữu ích: emo, mention, shortcut,... Cụ thể:

- `CW`: là biến global chứa những thông tin account, cấu hình account, emotion,... Chat++ phụ thuộc vào `CW.reg_cmp` nơi chứa danh sách các regex các emo, thêm mới các emo riêng vào đây để Chat++ có thể hiển thị (bạn có thể xem cụ thể hơn ở những version đầu của Chat++ tại 
-  `RM`: hay là `RoomManager` là biến chứa thông tin của room hiện tại đang được active: id, danh sách chat, danh sách member, danh sách file,...Chat++ sẽ lấy thông tin từ đây để build ra danh sách người dùng trong room cho tính năng mention. Ngoài ra, call hàm `build` từ `view` (cũng chính là một instance của `RoomView`) của `RM` cũng cho phép ta re-render lại room hiện tại (sau khi inject emo mới vào)
-  `RL`: hay là `RoomList`, là mảng các room hiện có trong account, với id mỗi phần tử trong mảng là id của room. 
-  `CS`: hay `ChatSend`liên quan đến khung nhập text và gửi message.
và nhiều nữa.

![](https://images.viblo.asia/82faf4c3-94d3-40ec-ba82-4eb68a9badda.png)



Do đó, việc có thể liệt kê được danh sách tên các hàm và xem hàm này có được expose ra thành biến global hay không trở thành việc không thể thiếu trong quá trình tìm hiểu và thêm tính năng mới cho Chat++. Ta sẽ đi vào giải quyết bài toán này trước.

## Problem 1: inside of CW

> Liệt kê tất cả các thuộc tính và hàm (prototype)  của một Object

- Đối với `Object` thì JS đã cung cấp sẵn cho chúng ta các hàm `Object.key` để liệt kê tên các thuộc tính, sau đó lặp qua các thuộc tính này và dùng `obj[key_name]` để truy cập vào giá trị của thuộc tính. Chú ý: các giá trị này cũng có thể là một object khác.
- Tương tự với các hàm prototype được định nghĩa trong `obj.__proto__` chúng ta cũng có thể lặp tương tự.

Vậy chiến lược ban đầu là: sẽ viết một hàm đệ quy, lặp qua tất cả các thuộc tính trong object, kiểm tra xem nó có phải object hay không, nếu có chúng ta lại tiếp tục lặp tiếp. Phiên bản ban đầu:

```js
var isDefinedFunction = function (param) {
  return typeof (param) == "function";
}

function loopObject (obj, prefix) {
    Object.keys(obj).forEach(function (item) {
        if (typeof (obj[item]) == "object" && obj[item] != null) {
          loopObject(obj[item], prefix + "." + item);
        } else if (isDefinedFunction(obj[item])) {
          console.log(`${prefix} -> func: ${item}`);
        } else {
          // console.log(`${prefix}.${item} -> `, obj[item]);
        }
      });

  for (var item in obj.__proto__) {
    try {
      if (isDefinedFunction(obj.__proto__[item])) {
        console.log(`${prefix} -> func: ${item}`);
      }
    } catch {
      // console.log(`Error in checking ${ prefix } -> ${ item }`);
    }
  };
}
loopObject(CW, "CW");
```
Chúng ta sẽ thêm `prefix` ở mỗi lần đệ quy để có thể biết chính xác câu lệnh cần thể nào để gọi được thuộc tính hoặc hàm.

Tuy nhiên, đến đây thì một vấn đề phát sinh: **Circular reference**

### Circular reference

> **Circular reference** is a series of references where an object references itself directly or indirectly through a series of objects, resulting in a closed loop, appearing in most computer programming including JavaScript.

Nghĩa là bên trong các thuộc tính của một object lại có thể tham chiếu đến chính bản thân nó hoặc một object khác, và trong object khác đó lại reference đến object này. Ví dụ như sau:

```js
function Foo() {
  this.abc = "Hello";
  this.circular = this;
}

var foo = new Foo();
alert(foo.circular.circular.circular.circular.circular.abc);
```

hoặc một ví dụ kinh điển khác là:
```js
window.window.window.window
```

Như vậy, với hàm ban đầu chúng ta sẽ bị rơi vào vòng lặp vô hạn. Cách giải quyết thì cũng khá đơn giản, sử dụng cached: lưu lại các hàm và thuộc tính chúng ta đã quét qua, khi lặp đến thuộc tính mới, ta kiểm tra xem thuộc tính này đã được check chưa. Và cũng có hai hình thức để implement: Array hoặc Object.
- Array: lưu hết vào một mảng, lặp qua từng phần tử. Cách này implement dễ nhưng đối với số lượng lớn thì duyệt qua từng phần tử của mảng sẽ chậm.
- Object: sử dụng [https://www.npmjs.com/package/object-hash](https://www.npmjs.com/package/object-hash) cho phép chúng ta sinh ra một mã hash cho một object Javascript bất kỳ. Lưu hash này làm key, mỗi lần ta sẽ hash và check. Cách này thì không tốn công lặp qua cả mảng các phần tử
```js
var hash = require('object-hash'); 
hash({foo: 'bar'}) // => '67b69634f9880a282c14a0f0cb7ba20cf5d677e9'
```
tuy nhiên FAILED vì chúng ta loop từ ngoài vào trong nên object `CW` ban đầu đã là quá lớn để hash, phải đi từ tận trong cùng -> khá rắc rối.
Cuối cùng mình chọn theo cách 1.

### Minor tweaks
Sau vài lần chạy thử, mình thêm vào một số các tweak
- Trong một số thuộc tính có tham chiếu đến `window` thông qua `$window`, mà lặp vào đây thì chết chắc, chúng ta cần thêm đoạn kiểm tra cái này.
![](https://images.viblo.asia/31291a20-18ca-4d05-bafe-828ef64c927c.png)

- Trong một số thuộc tính có tham chiếu đến `__reactInternalInstance`, đây là object React (với `state`, `props`,...) đây cũng lầ cái chúng ta không quan tâm nên có thể skip qua.
![](https://images.viblo.asia/82e26b82-5925-47e6-8ebc-9a3a97956a96.png)
- Trong một vài thuộc tính sẽ có dạng object với các thuộc tính là id. Ví dụ: Object chứa toàn bộ các chat của room với các key là id của 1 dòng chat. Vì ta chỉ quan tâm đến structure của nó nên sẽ chỉ loop qua phần tử đầu tiên và bỏ qua phần còn lại.

![](https://images.viblo.asia/e8396e31-e387-4e8e-9d2b-9ad74fd61f7a.png)

### Final Code

```js
var allObjects = [];

var isIntKeyedObject = function (obj) {
  return Object.keys(obj).every(function (item) {
    return !isNaN(parseInt(item));
  })
};

var isDefinedFunction = function (param) {
  return typeof (param) == "function";
}

function loopObject (obj, prefix) {
  if (typeof obj != "object") {
    console.log(`${prefix} -> `, obj);
    return;
  }

  if (isDefinedFunction(obj)) {
    console.log(`${prefix} -> func`);
    return;
  }
  // check if we visited
  var cached = false;
  var i = 0;
  for (i = 0; i < allObjects.length; i++) {
    if (allObjects[i].value === obj) {
      cached = true;
      break;
    }
  }

  if (cached) {
    var ref = allObjects[i];
    console.log(`${prefix} -> ref: ${ref.prefix}`);
  } else {
    allObjects.push({ prefix: prefix, value: obj });
    if (prefix.indexOf("$window") != -1) {
      console.log(`${prefix} -> bad element`);
      return;
    }

    if (prefix.indexOf("_react") != -1) {
      console.log(`${prefix} -> react ref`);
      return;
    }

    if (Array.isArray(obj)) {
      console.log(`${prefix} -> array: length ${obj.length}`);
      // check only first element
      if (obj.length) {
        obj = obj.shift();
        prefix = `${prefix}[0]`;
      } else {
        return;
      }

    }

    if (isIntKeyedObject(obj) && Object.keys(obj).length != 0) {
      console.log(`${prefix} -> interger key object: length ${Object.keys(obj).length}`);
      intKey = Object.keys(obj)[0];
      obj = obj[intKey];
      loopObject(obj, prefix + `[${intKey}]`);
    } else {
      Object.keys(obj).forEach(function (item) {
        if (typeof (obj[item]) == "object" && obj[item] != null) {
          loopObject(obj[item], prefix + "." + item);
        } else if (isDefinedFunction(obj[item])) {
          console.log(`${prefix} -> func: ${item}`);
        } else {
          // console.log(`${prefix}.${item} -> `, obj[item]);
        }
      });

      for (var item in obj.__proto__) {
        try {
          if (isDefinedFunction(obj.__proto__[item])) {
            console.log(`${prefix} -> func: ${item}`);
          }
        } catch {
          // console.log(`Error in checking ${ prefix } -> ${ item }`);
        }
      };
    }
  }
}
loopObject(CW, "CW");
```

với `allObjects` sẽ làm biến cached của chúng ta. Và ta chạy thử:

![](https://images.viblo.asia/0d0dfa9b-7b3b-4e55-8ff6-4cf57c23ce75.png)

Check `allObjects` thấy có 630 phần tử, cũng không nhiều nhỉ :D
Áp dụng những thông tin vừa có được, ta có thể confirm được một số thông tin khi debug. Ví dụ, với hàm `updateContactTypes`ngay lập tức ta sẽ tìm được cách call và vị trí tương ứng:
```
CW.application.domainServiceContext.userService -> func: updateContactTypes
```
và tương ứng trong source code [https://front.chatwork.com/biwa/all/app/index.js](https://front.chatwork.com/biwa/all/app/index.js) (chú ý lag máy)
![](https://images.viblo.asia/80105c80-2f90-46e2-9ad7-ef144869daca.png)

vậy ta biết được `e` sẽ là `userService`, `t` tươn ứng với `CW.application.domainServiceContext`.

Sau khi lượt qua một lượt các thuộc tính, thì có một thuộc tính rất quan trọng, sẽ được nhắc nhiều đến ở phần sau, khi ta debug thêm về cơ chế render của Chat++
```
CW.application.domainLifecycleContext.messageRepository.entities
```
![](https://images.viblo.asia/03430f15-fc77-4a4a-bda2-96d0c2a71f61.png)

## Problem 2: how Chatwork render messsage
> Để có thể debug, thêm, sửa xoá source frontend của Chatwork, các bạn hãy làm theo hướng dẫn trong bài: [Tiếp cận reverse engineering javascript - Case study: Chatwork](https://viblo.asia/p/tiep-can-reverse-engineering-javascript-case-study-chatwork-aWj53661l6m)
### Story begin

Ở trên box **Chat++ Contributor** các điều tra đầu tiên đã được tiến hành.

![](https://images.viblo.asia/c374f4ad-e1a5-4a41-846d-65d2d2785d09.png)

### Old method
Tạm thời gác lại phần thay đổi emo, Chat++ sẽ overwrite lại hàm `build` của `RoomView` để cập nhật emo vào render lại như code dưới đây:
```js
            RoomView.prototype.buildOld = RoomView.prototype.build;
            RoomView.prototype.build = function(a) {
                this.buildOld(a);
                if (window.chatpp_id != RM.id) {
                    window.chatpp_id = RM.id;
                    setTimeout(() => {![](https://images.viblo.asia/5a2ee675-c3e0-400d-87c8-863c18e2a7d3.png)

                        emoticon.addExternalEmoList(false);
                        room_information.setUp();
                        mention.setUp();
                    }, 100);
                }
            }

            if (rebuild) {
                RL.rooms[RM.id].build();
            }
```
Tuy nhiên, khi Chatwork thay đổi sang sử dụng React thì hàm này không còn hoạt động nữa. Tìm kiếm với từ khoá `renderMessage` trong source của `index.js` ta đi đến hàm sau:

![](https://images.viblo.asia/f014490d-ff08-457a-81bc-3adacc3f07f6.png)

và nếu đặt `console.trace()` ở  hàm `renderAstToHtml`

![](https://images.viblo.asia/9af101cd-8d10-4186-908b-7ead9b9851df.png)

và kiểm tra log trong hai trường hợp render khi sử dụng Chat++ và khi không sử dụng Chat++ ta sẽ thấy:
- Load bình thường
```
21:20:04.666 cw_latest.js:51150 console.trace
t.renderAstToHtml @ cw_latest.js:51150
e.renderMessage @ cw_latest.js:169966
e.renderMessage @ cw_latest.js:112269
e.getAutoCreatedMessagePanel @ cw_latest.js:24278
e.getTimeLine @ cw_latest.js:24195
e.build @ cw_latest.js:24137
e.build @ cw_latest.js:64003
build @ cw_latest.js:172931
RoomView.build @ all.js:563
build @ cw_latest.js:63787
e.build @ cw_latest.js:173413
T @ cw_latest.js:173402
e.updateRoomData @ cw_latest.js:173405
(anonymous) @ cw_latest.js:173318
e.success @ cw_latest.js:112235
```
- Load với Chat++
```
21:14:47.229 cw_latest.js:51150 console.trace
t.renderAstToHtml @ cw_latest.js:51150
e.renderMessage @ cw_latest.js:169966
e.renderMessage @ cw_latest.js:112269
e.getMessagePanel @ cw_latest.js:24234
TimeLineView.getMessagePanel @ all.js:1631
e.getTimeLine @ cw_latest.js:24195
e.build @ cw_latest.js:24137
e.build @ cw_latest.js:64003
build @ cw_latest.js:172931
RoomView.build @ all.js:563
build @ cw_latest.js:63787
```
Về thứ tự call là khá tương đương, không có gì thay đổi mấy :thinking:

Tuy nhiên, ở thời điểm đầu tiên khi các đoạn chat được load lên thì xuất hiện một số hàm khác nữa:

```
21:14:39.903 cw_latest.js:51150 console.trace
t.renderAstToHtml @ cw_latest.js:51150
t.getTimelineHtml @ cw_latest.js:16016
t.getBodyHtml @ cw_latest.js:137668
e.create @ cw_latest.js:165021
(anonymous) @ cw_latest.js:62430
(anonymous) @ cw_latest.js:144563
t.makeTimelineMessages @ cw_latest.js:144556
e.getApplicationMessageEntities @ cw_latest.js:62429
o @ cw_latest.js:62407
```
Cùng kiểm tra hàm `getTimelineHtml`:
```js
}, t.prototype.getNotation = function() {
    return new t(t.getNotation(this.getValue()))
}, t.prototype.getTimelineHtml = function(e, t, n) {
    return null !== this.htmlCache ? this.htmlCache : (this.htmlCache = l.renderAstToHtml(this.getValue(), this.getRenderAstOption(e, t, n)), this.htmlCache)
}, t.prototype.isDeleted = function() {
    return "[deleted]" === this.value || "[deleted_by_admin]" === this.value
}, t.prototype.isMentioned = function(e, t) {
```
hmm, vậy là hàm sẽ kiểm tra `htmlCache` trước, nếu không có sẽ render rồi lưu vào cache.

Đến đây thì ta có thể tóm tắt lại flow như sau:

1. Chatwork load message, render và lưu vào `htmlCache`
2. Chat++ được load sau, inject emo vào, call `view.build` nhằm render lại
3. Nhưng lúc này cache đã có nên hoàn toàn việc render lại không được thực hiện

Mình đã thử xoá `htmlCache` và thậm chí là thay đổi lại cả hàm render nhưng vẫn không được tin nhắn được sinh ra. Cuộc điều tra đi vào bế tắc...

### React: who are you?

Tiếp tục tìm kiếm với hàm `getTimelineHtml` đưa chúng ta đến hàm sau:

```js
function(e, t, n) {
    "use strict";
    var o, r = this && this.__extends || (o = function(e, t) {
        return (o = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
            })(e, t)
    }, function(e, t) {
        function n() {
            this.constructor = e
        }
        o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    });
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = n(18),
        a = n(48),
        c = n(47),
        l = n(446),
        s = n(447),
        u = n(1046),
        d = function(e) {
            function t(t, n, o, r, i, a, c, s, u, d, p) {
                var f = e.call(this, t) || this;
                return f.userId = n, f.roomId = o, f.body = r, f.reactions = i, f.postDate = a, f.editDate = c, f.selected = s, f.editing = u, f.sending = d, f.linkPreviews = p, f.type = l.MessageType.from(f.editDate), f
            }
            return r(t, e), t.prototype.edit = function(e, t) {
                this.body = this.body.updateBody(e), this.type = l.MessageType.edited(), this.editDate = new i.Some(c.DateTime.now(t))
            }, t.prototype.toEditing = function() {
                this.editing = !0
            }, t.prototype.clearEditing = function() {
                this.editing = !1
            }, t.prototype.isEditing = function() {
                return this.editing
            }, t.prototype.canEditing = function(e) {
                return !!this.userId.equals(e.getUserId()) && this.body.matchType({
                    default: function() {
                        return !0
                    },
                    userAutoCreatedMessage: function() {
                        return !1
                    },
                    autoCreatedMessage: function() {
                        return !1
                    },
                    deleted: function() {
                        return !1
                    }
                })
            }, t.prototype.select = function() {
                this.selected = !0
            }, t.prototype.clear = function() {
                this.selected = !1
            }, t.prototype.cacheClear = function() {
                this.body.cacheClear()
            }, t.prototype.isSelected = function() {
                return this.selected
            }, t.prototype.delete = function(e) {
                this.body = s.MessageBody.deleted(), this.editDate = new i.Some(c.DateTime.now(e)), this.type = l.MessageType.edited()
            }, t.prototype.matchType = function(e) {
                return this.type.matchType(e)
            }, t.prototype.getUserId = function() {
                return this.userId
            }, t.prototype.getRoomId = function() {
                return this.roomId
            }, t.prototype.getBodyHtml = function(e, t) {
                return this.body.getBody().getTimelineHtml(this.getId(), e, t)
            }, t.prototype.getAST = function() {
                return this.body.getAST()
            }, t.prototype.getInputText = function() {
                return this.body.getBody()
            }, t.prototype.matchBodyType = function(e) {
                return this.body.matchType(e)
            }, t.prototype.getBodyType = function() {
                return this.body.getType()
            }, t.prototype.isMentioned = function(e) {
                return this.body.getBody().isMentioned(e, this.userId)
            }, t.prototype.getPostDate = function() {
                return this.postDate
            }, t.prototype.getEditDate = function() {
                return this.editDate
            }, t.prototype.getReactions = function() {
                return this.reactions
            }, t.prototype.groupByReactionType = function() {
                return u.groupByReactionType(this.reactions)
            }, t.prototype.compare = function(e) {
                return this.sending || e.sending ? this.getIdentity().compare(e.getIdentity()) : this.postDate.compare(e.postDate) || this.getIdentity().compare(e.getIdentity())
            }, t
        }(a.BaseEntity);
    t.MessageEntity = d
}
```
và đây là ở module `MessageEntity` sẽ define hết các hàm liên quan đến một message bất kỳ. Ví dụ:
với một message như thế này:

![](https://images.viblo.asia/67d5305e-6966-441e-97a5-eec7da1b6d1b.png)

Thì sẽ được lưu trữ trong `CW.application.domainLifecycleContext.messageRepository.entities[189765401][1]` như sau:

![](https://images.viblo.asia/8a45f3d8-b17b-4bdd-91da-7446f769a3f2.png)

Đến đây, mình quay lại với 1 sự thật là: Chatwork sử dụng React. Vậy hãy thử tìm hiểu theo hướng này. Để có thể render một element trong React ta cần sử dụng `createElement`:

```js
React.createElement(component, props, ...children)
```
thử theo dấu hàm trong tổng cộng 2037 chỗ tham chiếu, này đã đưa ta đến đúng nơi cần tìm:

![](https://images.viblo.asia/9908a041-f592-4271-a815-eff1990a6f3c.png)

nhìn hàm `componentDidMount`, `shouldComponentUpdate` hay là `render` trông có quen không anh em :D. Không còn nghi ngờ gì nữa, đây là component để render message rồi và `messageRepository.entities` chính là props truyền vào để render. Đọc thôi!

##  Summary
Sau khi kiểm tra thêm các hàm khác và biến ẩn số `m.FeatureFlags.FRE2252` chúng ta đi được đến flow như sau:
1. Chatwork load message, đưa vào  `CW.application.domainLifecycleContext.messageRepository.entities`
2. nếu feature `FeatureFlags.FRE2252` được bật:
     - a. `r` sẽ được gán bằng `{__html: n.getBody()}` với hàm `getBody` trả về `body` được sinh ra từ
     ```js
     t.getBodyHtml(this.myAccount.isDisableDownloadFile(), this.myAccount.getSetting().isShortenUrl())
     ```
    được gọi từ
    ```js
    return this.body.getBody().getTimelineHtml(this.getId(), e, t)
    ```
    và hàm này ta đã nói ở trên, sẽ sử dụng `renderAstToHtml` nến không có `htmlCache`. Sau đó React sẽ truyền vào `dangerouslySetInnerHTML: r`để render ra các element.
    - b. Trường hợp còn lại, chúng ta sẽ tạo các element children dựa trên `ast: n.notationAST` được gán ở `ApplicationMessageEntity` và cũng chính là giá trị trả về từ hàm `getAST` tại `MessageEntity`:
    ```js
    return this.body.getAST()
    ```
    cuối cùng ở
    ```js
    t.prototype.getAST = function() {
        return d.FeatureFlags.FRE2252 ? i.ChatworkSyntax.tokenize(this.getValue()) : null
        return window.tokenizer.default(this.getValue());
    }
    ```
    là nơi sẽ parse message value theo syntax của Chatwok.
    Ví dụ:

    ```
    "[To:657237]Nguyen Anh Tien (off 5/5)
    (*)"
    ```

    sẽ được parse thành các tokens lưu ở `bodyAST`:

![](https://images.viblo.asia/1891e2e5-b91b-4d19-9c6e-3c83e8b97df2.png)

Ngoài ra `FeatureFlags.FRE2252` còn được dùng ở rất nhiều chỗ khác nữa, càng giúp ta khẳng định rằng, đây là kill switch để chuyển giữa render theo phương pháp cũ dùng `dangerouslySetInnerHTML` và mới dùng `AST` (Abstract Syntax Tree).
 ```js
         return r(n, e), n.prototype.create = function(e, t) {
            return this.createFromUpdater(this.createMessageParamUpdater(e, t))
        }, n.prototype.update = function(e, t) {
            return this.updateFromUpdater(e, this.createMessageParamUpdater(e.getRoomId(), t))
        }, n.prototype.createSending = function(e, t) {
            return new p.SendingMessageEntity(new f.SendingMessageId(this.getNewId()), this.myId.getUserId(), e, t, l.DateTime.now(this.dateFormat), m.FeatureFlags.FRE2829 ? b.default.from(t) : [])
        }, n.prototype.toSend = function(e, t) {
            var n = t.getBody(),
                o = m.FeatureFlags.FRE2252 ? n.getAST() : null;
            return new u.MessageEntity(e, t.getUserId(), t.getRoomId(), new g.MessageBody(t.getBody(), o, h.MessageBodyType.textMessage(), null, null), [], t.getPostDate(), i.None, !1, !1, !0, t.linkPreviews)
        }, n.prototype.createEditing = function(e, t) {
            var n = m.FeatureFlags.FRE2252 ? e.getAST() : null,
                o = m.FeatureFlags.FRE2252 ? e.getAST() : null;
            return new u.MessageEntity(t.getIdentity(), t.getUserId(), t.getRoomId(), new g.MessageBody(e, n, t.getBodyType(), e, o), t.getReactions(), t.getPostDate(), new i.Some(l.DateTime.now(this.dateFormat)), t.isSelected(), t.isEditing(), !1, b.default.from(e))
        }, n.prototype.toEdited = function(e, t) {
            var n = m.FeatureFlags.FRE2252 ? e.getAST() : null,
                o = m.FeatureFlags.FRE2252 ? e.getAST() : null;
            return new u.MessageEntity(t.getIdentity(), t.getUserId(), t.getRoomId(), new g.MessageBody(e, n, t.getBodyType(), e, o), t.getReactions(), t.getPostDate(), t.getEditDate(), t.isSelected(), !1, !1, b.default.from(e))
        }, n.prototype.toDeleted = function(e) {
            return new u.MessageEntity(e.getIdentity(), e.getUserId(), e.getRoomId(), g.MessageBody.deleted(), e.getReactions(), e.getPostDate(), new i.Some(l.DateTime.now(this.dateFormat)), e.isSelected(), !1, !1, [])
        }, n.prototype.createFromUpdater = function(e) {
            var t = m.FeatureFlags.FRE2252 ? e.body.getAST() : null,
                n = m.FeatureFlags.FRE2252 ? e.systemMessage && e.systemMessage.getAST() : null;
            return new u.MessageEntity(e.messageId, e.userId, e.roomId, new g.MessageBody(e.body, t, e.type, e.systemMessage, n), e.reactions, e.postDate, e.editDate, !1, !1, !1, e.linkPreview)
        }, n.prototype.updateFromUpdater = function(e, t) {
            var n = m.FeatureFlags.FRE2252 ? t.body.getAST() : null,
                o = m.FeatureFlags.FRE2252 ? t.systemMessage && t.systemMessage.getAST() : null;
            return new u.MessageEntity(t.messageId, t.userId, t.roomId, new g.MessageBody(t.body, n, t.type, t.systemMessage, o), t.reactions, t.postDate, t.editDate, e.isSelected(), e.isEditing(), !1, t.linkPreview)
        }
```

##  Conclusion

**Túm lại. nếu tắt được `FeatureFlags.FRE2252`, Chat++ emo sẽ về như cũ.**

Ở [phần 2](https://viblo.asia/p/lets-fix-chat-emo-part-2-GrLZD313Kk0), chúng ta sẽ đi vào cụ thể cách để lấy ra được flag này và đưa Chat++ Emo trở lại :D.