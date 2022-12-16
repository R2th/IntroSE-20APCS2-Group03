# 1. Giới thiệu

**Audition** - Một tựa game online mỗi khi nhắc tới thì đại đa số thế hệ **8x** và **9x** đời đầu sẽ bất chợt có cảm giác bồi hồi, xao xuyến với bao nhiêu kỉ niệm ùa về 😊😊😊 Là thế hệ giữa 9x nhưng may sao ngày bé, mình được các ông anh dẫn đi NET cỏ đưa mình vào con đường nghiện game online ngày ấy... 😃

![image.png](https://images.viblo.asia/e133c05d-9102-44c3-8e45-d31ca3f86ece.png)

Mình chơi Audition từ hè 2006 ( lớp 5, lớp 6 ) với biết bao kỉ niệm đẹp về tựa game này. Lên 2009 thì quen em - hai đứa cùng chơi Audition và quen tại quán net. Em - top xinh trong trường lúc bấy giờ. Biết bao kỉ niệm đạp xe đi chơi tối, trốn học ra net nhảy Audition. Lần nào trốn tiết ra xong đến lúc vào lớp, mình cũng phải hôn 1 cái khiến bọn lớp lớn hơn nhìn choáng :D Yêu 5,6 năm thì chia tay. Quá nhiều kỉ niệm từ kênh itv, đến Ola, Avatar... kể ra thì cả quyển. Giá mà có thể yêu nhau đến cuối thì đẹp... :'(

Vì để thoả mãn cái kỉ niệm đẹp đẽ, ngây ngô ngày ấy của tuổi trẻ, mình sẽ ra một series xây dựng các chức năng của tựa game này 😃 Ở bài viết phần 1 này mình sẽ làm các chức năng cơ bản của game để có thể chơi: Nhảy 4K, 4K có del, load nhạc, tính điểm... Dự định mình sẽ dùng JavaScript ( not NodeJS nha 😆) để build game. Mình hi vọng sẽ được sự đón nhận, phản hồi từ mọi người để game được tốt và nhiều chức năng hơn 😘

# 2. Cấu trúc project

![image.png](https://images.viblo.asia/12f3c87c-f5e2-46f1-91a9-a4f94101a80f.png)

- **images**: Thư mục sẽ lưu các hình ảnh của trò chơi : Phím bấm, ảnh nền,...
- **js**: Thư mục chứa các file JavaScript để xử lý các chức năng của game.
- **musics**: Thư mục lưu các bài hát của trò chơi. Người chơi sẽ được lựa chọn trong list này.

# 3. Xử lý trò chơi cho chức năng nhảy 4K

- **audition.html**: File này chứa giao diện của trò chơi ( Mình không phải dân chuyên Front-end nên html, css không tốt lắm nên các bạn cố gắng bỏ qua nha 😃😃😃 ) Cấu trúc cũng tương tự như các html bình thường: Có **Html, Css** và nhúng **JavaScript** để xử lý.

![image.png](https://images.viblo.asia/456b7048-8f16-4671-9bc8-0b54a3154358.png)

- **constants.js**: File này lưu các biến hằng số trong trò chơi: Ví dụ danh sách các key nhảy, level max,...

```javascript
// Const variable
const MAX_LEVEL = 11
const MIN_COUNT_TO_PLAY = 5
const LIST_KEY_HAS_REVERSE = ["right", "up", "down", "left", "right-reverse", "up-reverse", "down-reverse", "left-reverse"]
const LIST_KEY = ["right", "up", "down", "left"]
const MAP_KEY = new Map([["right", "right"], ["up", "up"], ["down", "down"], ["left", "left"], ["right-reverse", "left"], ["up-reverse", "down"], ["down-reverse", "up"], ["left-reverse", "right"],])
```

- **main.js**: File xử lý chính các tác vụ, chức năng trong game. Hiện tại, trò chơi chỉ có vài chức năng nên mình sẽ viết gộp vào đây 😃😃😃 khi nào đi qua từng chức năng mà file to quá mình sẽ refactor tách nhỏ dần. Nào xem file này chúng ta sẽ phải xử lý logic gì nào. Gét gô...

**Variable** các biến cần có

```javascript
let audio = new Audio() // Khởi tạo audio để xử lý nhạc
let isReverse = false // Kiểm tra xem người chơi có bật nhảy ngược phím hay không?
let isSpaced = false // Kiểm tra người chơi đã ấn space để nhảy chưa?
let increase = 1 // Tốc độ chạy của box trên thanh progress bar
let pos = 0 // Vị trí của box trên thanh progress bar
let count = 0 // Số lần box vượt quá thanh progress bar
let countToIncreaseLevel = 0 // Số lần count để tăng level chơi
let score = 0 // Điểm người chơi
let level = 1 // Level hiện tại
let listKeyRandom = [] // Danh sách key generate random
let listKeyPress = [] // Danh sách key người chơi nhập
const boxElement = document.getElementById("box") // Box element trong html
let picElement = document.getElementById("pic") // Ảnh trong html
let scoreElement = document.getElementById("score") // Điểm trong html
let intervalID = setInterval(move, 0)  // Id interval
```

**Show, hide, set key** theo id element

```javascript
// Hiện phần tử trên html theo id
function show(id) {
    document.getElementById(id).style.display = 'block'
}

// Ẩn phần tử trên html theo id
function hide(id) {
    document.getElementById(id).style.display = 'none'
}

// Hiển thị ảnh phím bấm theo key và id element
function setKey(key, id) {
    document.getElementById(id).src = "images/" + key + ".png"
}
```

**compareKeyPressAndRandom**: So sánh danh sách key người chơi bấm có bằng với danh sách key random theo từng level không?

```javascript
function compareKeyPressAndRandom(key) {
    if (listKeyPress.length === listKeyRandom.length) {
        return
    }

    if (MAP_KEY.get(listKeyRandom[listKeyPress.length]) === key && !isReverse) {
        listKeyPress.push(key + "-success")
        setKey(key + "-success", listKeyPress.length)
    } else if (MAP_KEY.get(listKeyRandom[listKeyPress.length]) === key && isReverse) {
        listKeyPress.push(key + "-success")
        setKey(key + "-success", listKeyPress.length)
    } else {
        listKeyPress = []
        for (let i = 0; i < listKeyRandom.length; i++) {
            setKey(listKeyRandom[i], i + 1)
        }
    }
}
```

**getListKey**: Lấy ra danh sách key theo level được random theo list key. Ví dụ 4K thì **listRandom = ["right", "up", "down", "left"]**

```javascript
function getListKey(level, listRandom) {
    let list = []
    Array.prototype.random = function () {
        return this[Math.floor((Math.random() * this.length))];
    }
    for (let i = 0; i < level; i++) {
        list.push(listRandom.random())
    }
    return list
}
```

**resetKeyRandom, resetListKeyPress**: Tạo lại danh sách key random và key mà người chơi bấm

```javascript
function resetKeyRandom() {
    for (let i = 1; i <= 11; i++) {
        document.getElementById(i.toString()).src = ""
    }
}

function resetListKeyPress() {
    listKeyPress = []
}
```

**setScore**: Set lại điểm mỗi khi người chơi bấm phím và sau đó căn box để space -> Có các kiểu : Perfect, Great, Cool, Bad, Miss có các vị trí trên thanh bar và giảm dần điểm theo thứ tự.

```javascript
function setScore(pos) {
    if (listKeyPress.length !== listKeyRandom.length) {
        picElement.src = "images/Miss.png"
        return
    }
    if (840 <= pos && pos <= 860) {
        picElement.src = "images/Perfect.png"
        score += isReverse ? 1200 : 800
    } else if ((790 <= pos && pos < 840) || (860 < pos && pos <= 910)) {
        picElement.src = "images/Great.png"
        score += isReverse ? 600 : 350
    } else if ((760 <= pos && pos < 790) || (910 < pos && pos <= 940)) {
        picElement.src = "images/Cool.png"
        score += isReverse ? 350 : 150
    } else if ((750 <= pos && pos < 760) || (940 < pos && pos <= 950)) {
        picElement.src = "images/Bad.png"
        score += isReverse ? 200 : 50
    } else {
        picElement.src = "images/Miss.png"
    }
    scoreElement.textContent = score
}
```

**move**: Function này xử lý sự kiện cho khối box di chuyển

```javascript
function move() {
    if (pos > 1150) {
        pos = 0
        count++
        if (count >= MIN_COUNT_TO_PLAY) {
            resetKeyRandom()
            setTimeout(function () {
                listKeyRandom = isReverse ? getListKey(level, LIST_KEY_HAS_REVERSE) : getListKey(level, LIST_KEY)
                console.log(listKeyRandom)
                for (let i = 0; i < listKeyRandom.length; i++) {
                    setKey(listKeyRandom[i], i + 1)
                }
            }, 1000)
        }
        if (count >= MIN_COUNT_TO_PLAY && countToIncreaseLevel % 1 === 0) {
            level++
        }
        if (level > MAX_LEVEL) {
            level = 1;
        }
        if (count > MIN_COUNT_TO_PLAY && !isSpaced) {
            countToIncreaseLevel++
            picElement.src = "images/Miss.png"
            resetListKeyPress()
            hide("box")
            setTimeout(function () {
                show("box")
                pos = 0
            }, 3000)
        }
    }

    pos += increase
    boxElement.style.left = pos + "px"
}
```

**Xử lý sự kiện mỗi khi người chơi bấm phím**

```javascript
document.body.onkeyup = function (e) {
    if (e.code === "Space" && count >= MIN_COUNT_TO_PLAY) {
        isSpaced = true
        setScore(pos)
        hide("box")
        resetListKeyPress()
        setTimeout(function () {
            show("box")
            pos = 0
            isSpaced = false
        }, 3000)
        countToIncreaseLevel++
    }

    // Key dance
    if (e.code === "ArrowUp") {
        compareKeyPressAndRandom("up")
    }
    if (e.code === "ArrowDown") {
        compareKeyPressAndRandom("down")
    }
    if (e.code === "ArrowRight") {
        compareKeyPressAndRandom("right")
    }
    if (e.code === "ArrowLeft") {
        compareKeyPressAndRandom("left")
    }

    // Key turn on, turn off reverse
    if (e.code === "NumpadDecimal") {
        isReverse = !isReverse
        if (isReverse) {
            document.getElementById("reverse").textContent = "Reverse"
            show("reverse")
        } else {
            hide("reverse")
        }
    }
}
```

**initAudio**: Khởi tạo đối tượng audio để xử lý nhạc trong game và xử lý phát nhạc mỗi khi người chơi thay đổi trên list.

```javascript
function initAudio() {
    clearInterval(intervalID)
    let ext, plist
    ext = ".mp3"

    plist = document.getElementById("list-music")
    plist.addEventListener("change", changeTrack)

    function changeTrack(event) {
        audio.src = "musics/" + event.target.value + ext
        audio.play()
        intervalID = setInterval(move, 0)
        initVariable()
    }
}

window.addEventListener("load", initAudio)
```

**Bắt sự kiện mỗi khi bài nhạc kết thúc**: Khi đó chúng ta sẽ thông báo điểm cho người chơi và init lại các variable lại từ đầu

```javascript
audio.onended = function () {
    clearInterval(intervalID)
    alert("Chúc mừng bạn đã đạt: " + score + " điểm")
    initVariable()
    scoreElement.textContent = "0"
}
```

# 4. Kết luận

Để làm 1 con game audition có các chức năng cơ bản cũng không khó lắm phải không các bạn 😃😃😃 Hãy cũng tận hưởng thành quả nào -> Video dưới đây là demo chỗ đoạn code này :D

{@embed: https://www.youtube.com/embed/MwCteIDIZNk}

- Website game : https://audition-js.herokuapp.com/audition.html
- Source code : https://github.com/nguyenvantuan2391996/audition-js