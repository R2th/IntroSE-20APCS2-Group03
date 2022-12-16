## 1. Mở đầu

+ Có thể `Visual Studio Code` đang là sự lựa chọn của nhiều `anh em lập trình`.
+ Em ấy đứng đầu trong [Stack Overflow Developer Servey 2019](https://insights.stackoverflow.com/survey/2019/#development-environments-and-tools), bỏ xa `Sublime Text` hay  anh em họ nhà `Jetbrains`.

![](https://images.viblo.asia/d215b694-43d5-4c57-bcfd-a09ea7b21205.png)

+ Còn ở [Stack Overflow Developer Servey 2020](https://insights.stackoverflow.com/survey/2020#development-environments-and-tools) thì mình `kiếm hoài` mà không có thấy thông tin.
+ Chắc chắn rằng `thao tác` hằng ngày của lập trình viên với `editor` là không hề nhỏ. 
+ Nếu như `hiểu rõ` và `tối ưu` chúng thì sẽ giúp `tiết kiệm` khá nhiều `thời gian`, `công sức` cũng như đâu đó cảm thấy `thư thái` hơn trong quá trình làm việc.
+ OK cùng tìm hiểu nhé !


## 2. Note

+ Cơ mà có một chút cần lưu ý đã:

+ Đôi khi, nhiều bạn hay bị nhầm giữa `IDE` và `Editor`

    + `IDE` là viết tắt của `Integrated development environment` :

        + Tạm dịch là môi trường phát triển tích hợp.
        
        +  Ngoài `viết mã code` thì còn là một công cụ có thể `biên dịch` và `debug`.
        
        + IDE thường `chú trọng` vào ngôn ngữ cụ thể nào đó.
    
        + Ví dụ như có thể dùng `Dev C++`, compile file `.cpp` để tạo ra file `.exe` rồi chạy trên Windows.

    + `Editor` chỉ là các trình soạn thảo văn bản:

        + Thường không làm điều được đó, có xu hướng tiếp cận `rộng hơn`.
    
        + Có thể chỉnh sửa tất cả các loại tệp, thay vì chuyên về một loại hoặc ngôn ngữ cụ thể.


+ Các tools lập trình của [Microsoft](https://visualstudio.microsoft.com) có đủ cả 02 `món ăn chơi` này

    + `Visual Studio`: Full-featured IDE to code, debug, test, and deploy to any platform.
    
    + `Visual Studio Code`:  Editing and debugging on any OS. **(Và đây, hôm nay chúng ta sẽ tìm hiểu em này)**


+ Có quan điểm cho rằng những đội đã `làm hệ điều hành (OS)` rồi đi làm `phần mềm` thì phần mềm đó `khá xịn`, vì họ hiểu `sâu sắc` về hệ thống hơn và tùy biến `phù hợp` với OS đó hơn, mình cũng không chắc lắm. 

+ Và khi nhắc tới Microsoft thì hay nhắc tới `bản quyền`, nhưng đây là lần đầu nghe thấy có món `free và open source`.


## 3. Cài đặt

+ Cài đặt phần mềm nào cũng thế, ta nên tham khảo ở  trang chủ.

    + [Mac](https://code.visualstudio.com/Download)

    + [Windows](https://code.visualstudio.com/Download)

    + [Ubuntu](https://code.visualstudio.com/download)

        + Cài từ file
            
             ```bash
             sudo apt install ./<file>.deb
             ```
            
        + [Cài từ câu lệnh](https://code.visualstudio.com/docs/setup/setup-overview)

            ```bash
            wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
            sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/
            sudo sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/trusted.gpg.d/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'

            sudo apt install apt-transport-https
            sudo apt update
            sudo apt install code # or code-insiders
            ```


        + Gỡ cài đặt

            ```bash
            sudo apt-get purge code

            # Remove settings
            cd ~ && rm -rf .vscode && rm -rf .config/Code
            ```

+ Thật hay là trang [docs](https://code.visualstudio.com/docs) của VS Code khá `dễ đọc` 

    + Nhưng có vẻ tốc độ cập nhật docs hơi `thấp hơn` so với tốc độ phát triển tính năng.

    + Chúng ta cứ `tiêu hóa` hết chỗ này đi thì sẽ trở thành `master VS code` sớm thoai, hehe :D :D

    ![](https://images.viblo.asia/d308b87a-4e61-4923-b09e-45cf1191c64c.png)
  
+ Giới thiệu vầy cũng `sương sương` rồi ! 

    + Bây giờ chúng ta sẽ cùng tìm hiểu một số `tips`, `tricks` cho editor được mệnh danh là `quốc dân`  này nhé !

    + Bên cạnh đó là một số `phím tắt`, `extentions` và `kinh nghiệm` cá nhân của tác giả, hi vọng sẽ giúp các bạn cảm thấy `thư thái` và `tiện lợi` hơn khi lập trình !

    + Okie, let go ^_^

![](https://images.viblo.asia/97728f32-50e7-4a86-9317-94c144a095bd.gif)


## 4. Giao diện

+ Giao diện tổng quan trông như này

    ![](https://images.viblo.asia/04ffa3dc-7497-49c0-aa40-b6b3f8d99f65.png)
   
   
+ Ba phần đầu 
    + `A: Activity Bar`
    + `B: Side Bar`
    + `C: Editor` 
    
    cũng khá cơ bản, không có gì đặc biệt lắm :joy::joy::joy:
    
+ Phím tắt đóng mở `Side Bar` là **Ctrl + B**.

+ Phím tắt đóng mở `Terminal`  trong `Panel` là **Ctrl + `**.

#### D. Panels

- Hiển thị các tabs khác nhau như 
    ![](https://images.viblo.asia/89bd1565-6a66-4726-9972-1313c30af0c5.png)


    - Problems:
        - Các warning, errors , ...
    - Output:
        - Logs của `ESLint` chẳng hạn.
    - Terminal: 
        - Đây là `Terminal` ảo.
        - Có thể load được các shell như `bash`, `zsh` ... Cũng có thể mở nhiều `Terminal` ...
        - Nhưng đã có lần mình gặp lỗi cái `Terminal ảo` này không load được env ... 
        - Thường thì mình thấy anh em hay mở `Terminal thật` của Ubuntu để `npm install ...`, run project ...
        -  Còn Terminal này thì dùng để commit code, trong quá trình code cứ thi thoảng lại: 
            - **Ctrl + `** 
            - **git add .** 
            - **gcn!** 
            - **Ctrl + `**
    - Debug Console
        - Cái này thì tạm bỏ ngỏ anh em nhé.

#### E. Status Bar

- Thông tin về tệp bạn đang chỉnh sửa.
- Ví dụ:

    ![](https://images.viblo.asia/65439a73-495c-40cc-8c7e-da7898e209ba.png)
    
    - `Ln 23, Col 27`: Con trỏ chuột đang ở dòng 23, cột 27
    - `Spaces: 2`: Một tab đang được định nghĩa có độ dài bằng 2 spaces
    - `UTF-8`:  Encoding đang được sử dụng
        - `UTF-16 LE`
        - `UTF-16 BE`
        - ...
    - `LF` : Quy định một hoặc một chuỗi các ký tự điều khiển biểu thị sự kết thúc của một dòng và bắt đầu một dòng mới.
        - `LF`: Tên đầy đủ: `Line Feed`, sử dụng kí tự: `\n`
        - `CR`: Tên đầy đủ: `Carriage Return`, sử dụng kí tự: `\r`
        - `CRLF`: Có nghĩa là sài cả hai
        - Một vài thông tin khác
            ![](https://images.viblo.asia/3fa6516f-6148-468f-808d-f9e275e19d68.png)


        - Ví dụ:
            - Để biểu thị đã tới lúc kết thúc dòng, chuyển qua dòng mới thì:
            - Linux sẽ dùng `LF` với `\n`
            - Windows sẽ dùng `CRLF` với `\r\n`
        - Lưu ý:
            - Khi làm việc với Docker thì bạn cần để `Dockerfile` và `entrypoint.sh` sử dụng `LF` nhé.
            - Bằng không, Docker sẽ báo lỗi `not found`, việc này hay xảy ra khi commit, push file trên `Windows` rồi pull về ở `Ubuntu` 
    - `YAML` : Language mode cho file đang mở.
        - Nên chỉ định cụ thể để tiện làm việc hơn, khi đó sẽ có highlight các thứ, các thứ :kissing_heart::kissing_heart:
        - Phím tắt: `Ctrl + K M`


## 5. Cấu hình

+ Phần này quan trọng phết

+ Mở dưới dạng `UI` thì phím tắt là `Ctrl + ,`
    
    ![](https://images.viblo.asia/a2b3b62b-ab67-4207-91b9-52cc1354abc5.png)


    + Có thể `search settings` nào mình muốn chỉnh, bên dưới sẽ hiện giá trị cho ta lựa chọn.

    + Có 3 `khu vực áp dụng` là:
        + `User`: Cấu hình này được áp dụng cho tất cả. **(Dùng mình thằng này là được rồi)**
        + `Workspace` : Chỉ áp dụng cho workspace được chỉ định.
        + `Folder`: Áp dụng cho thư mục.

+ Mở dưới dạng `JSON`

    + Dạng UI thì `giao diện` đẹp và có `chú thích` nhưng chỉnh từng cái cũng `mất thời gian` 
    + Nên sinh thêm `dạng JSON` cho `nhanh gọn nhẹ`.
    + Ấn vào `Open Settings (JSON)` ở góc trên bên phải màn hình của `dạng UI`.
    
     ![](https://images.viblo.asia/4538f938-e100-4b37-b5eb-cd849e127e4b.png)

    + Đây là một mẫu:
        ```json
        {
            "files.autoSave": "off",
            "files.insertFinalNewline": true,
            "files.trimTrailingWhitespace": true,
            "editor.tabSize": 4,
            "editor.formatOnSave": true, // Hai config formatOn*** này khá là tiện, ở phần sau chúng ta sẽ tìm hiểu thêm
            "editor.formatOnPaste": true,
            "editor.suggestSelection": "first",
            "editor.codeActionsOnSave": {
                "source.fixAll.eslint": true // Config này cho ESLint, cũng rất tiện lợi
            },
            "eslint.validate": [
                "javascript"
            ],
            "javascript.format.semicolons": "insert",
            "workbench.iconTheme": "material-icon-theme",
            "workbench.startupEditor": "none",
            "tabnine.experimentalAutoImports": true,
            "cSpell.userWords": [
                "timeseries"
            ],
            "workbench.colorTheme": "Monokai",
            // Search in modules
            // "search.useIgnoreFiles": false,
            // "search.exclude": {
            //     "**/node_modules": false,
            // }
        }
        ```

        Có một số config sẽ giải thích chi tiết ở phần sau.
   
+  ***Turning on Settings Sync*** 
    +  Tính năng này cho phép `đồng bộ` cài đặt trên `VS Code` của bạn với tài khoản `Github` hoặc `Microsoft`.
    +  Khá tiện lợi, sau khi gỡ hoặc cài VS Code ở máy mới, `mất hết config`, có thể `đồng bộ` lại tất cả nhanh chóng.

## 6. Phím tắt

+ Nếu ta đã quen dùng các `phím tắt` trên các `editor khác` rồi thì 
    + `VS code` có hỗ trợ [Keymap extention](https://code.visualstudio.com/docs/getstarted/tips-and-tricks#_keymaps) để đưa các phím tắt từ editor ưa thích của bạn sạng VS code.
    + Có cả Vim, Sublime Text, Atom, ...

+ Tuy nhiên thì vẫn khuyến khích sử dụng `bộ phím tắt` của VS Code hơn, có hình ảnh tổng hợp trên [MacOS](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf), [Windows](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf), [Linux](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-linux.pdf)

+ Ấn `Ctrl+K Ctrl+S` để liệt kê danh sách `tất cả` phím tắt
+ Và trong thực tế, ta cũng chỉ cần nắm `một số` phím tắt hay sử dụng:

    + ***Tab***

        ```
        Ctrl + P: Mở nhanh một file
        Ví dụ: 
           Copy "api.js:20:25" từ màn hình logs error
           Ctrl + P
           Ctrl + V
           Enter
           Thì VS-Code sẽ mở file api.js và con trỏ chuột sẽ trỏ luôn tới line 20, col 25
        ```
        
        
        ```
        Ctrl + Tab:
        Ctrl + Shift + Tab: Chuyển giữa các file mà bạn đang mở
        ```
        
        ```
        Alt + number: Chuyển đến tab theo số thứ tự
        ```
        
        ```
        Ctrl + W: Đóng tab đang xem / Thoát VSC
        ```

        ```
        Ctrl + Shift + T: Mở lại file vừa đóng
        ```
      

    + ***Coding***

        ```
        Alt + Up:
        Alt + Down: Di chuyển dòng lên / xuống
        ```
        
        ```
        Ctrl + Shift + Left:
        Ctrl + Shift + Right: Bôi đen từ theo từng cụm cho đến khi gặp dấu câu.
        ```
        
        
        ```
        Ctrl + Shift + Up:
        Ctrl + Shift + Down: Chọn nhiều con trỏ chuột theo hướng dần dần đi lên / xuống.
        Nếu muốn thêm con trỏ chuột vào các vị trí tùy ý thì chọn các vị trí bằng chuột và sử dụng Alt+Click
        ```
        ![](https://images.viblo.asia/48482421-b6a4-41f6-916c-75ca9298cac8.gif)


        
        ```
        Ctrl+Shift+L: Thêm con trỏ tới tất cả các vị trí lặp lại của từ hiện tại.
        // Cái này uy lực phết à nha, lát sẽ có ví dụ
        ```
        ![](https://images.viblo.asia/50ca879c-a7a8-42c7-86e2-e693569b67a2.gif)

        ```
        Ctrl + D: Thay vì chọn tất cả thì sẽ lần lượt chọn từng vị trí trùng khớp.
        ```
        ![](https://images.viblo.asia/5c048904-9c4d-48ad-800d-349608793173.gif)
       

        ```
        Ctrl + Shift + I: Formart lại toàn bộ code cho đúng định dạng
        ```
        
        ```
        Ctrl + Shift + A: Tạo chú thích mẫu
        ```
        
        ```
        Ctrl + Shift + [ / ]: Đóng mở cặp ngoặc gần nhất.
        ```
        
        ![](https://images.viblo.asia/5a2abc35-aa8b-4f64-9040-5612f38dae6c.gif)


        ```
        Ctrl + Shift + Alt + Up/Down: Copy dòng lên trên hoặc xuống dưới.
        Hơi buồn xíu là trên Ubuntu thì key này bị trùng với key hệ thống.
        Ta có thể tự setup riêng thông qua editor.action.copyLinesUpAction and editor.action.copyLinesDownAction
        Như Super + Alt + Up / Down chẳng hạn.
        Hoặc disable key này của hệ thông đi.
        ```
        ![](https://images.viblo.asia/fe5a27a9-e961-45af-99be-6fe5e8f7a95c.gif)

        ```
        Ctrl + L: Bôi đen cả dòng
        ```

        ```
        Ctrl + C: 
        Nếu trước đó có bôi đen thì copy text đã bôi đen vào bộ nhớ đệm
        Còn chưa bôi đen copy cả dòng.
        ```


        
        ```
        Ctrl + Up:
        Ctrl + Down: Scroll file lên / xuống (Giữ nguyên vị trí con trỏ chuột)
        ```



    + ***Điều hướng***

        ```
        Ctrl + G: Di chuyển đến dòng 
        ```

        ```
        F12: Go to definition
        ```
        

    + ***Theme***

        ```
        Ctrl+K Ctrl+T: Di chuyển chọn giữa các theme để preview và chọn theme ưng ý.
        ```
        
        + Theme `Dracula` được khá nhiều anh em đề nghị
        + Nhưng sau khi dùng thử một thời gian thì mình lại quay về theme `Monokai`.
        + Nhìn chung do sở thích của từng người thui.

    + ***Snipet***
    
        + Tính năng này giảm việc bạn phải viết những đoạn code lặp nhau
        + Ví dụ:
            + Thi thoảng bạn lại viết: `console.log();`
            + Thì thay vào đó, chỉ cần gõ `log` rồi ấn phím `tab`
            + Hãy
                ```
                Ubuntu / Windows: File > Preferences > User Snippets 
                MacOS: Code > Preferences > User Snippets
                ```
            + Rồi chọn ngôn ngữ bạn muốn, nhưng thông thường cứ chọn luôn `New Global ...` rồi đặt tên file là common luôn.
            + Đây là một ví dụ:
                ```
                "Print to console": {
                    "scope": "javascript,typescript",
                    "prefix": "log",
                    "body": [
                        "console.log('$1');",
                        "$2"
                    ],
                    "description": "Log output to console"
                }
                ```
            + Ấn phím `tab` lần đầu thì con trỏ chuột  ở vị trí `$1`, lần 2 thì ở vị trí `$2`.


## 7. Extensions

Sau đây là một số Extensions nên tham khảo:

+ ***GitLents***
    + [Git](https://viblo.asia/p/git-hoc-nghiem-tuc-mot-lan-phan-1-OeVKBo6JZkW) hiện đã trở thành sự lựa chọn `hàng đầu` được dùng để `quản lý phiên bản` source code.
    + `GitLents` là trợ thủ đắc lực của `Git`.
    + Sau khi cài xong, ở tab `Activity Bar` sẽ hiển thị thêm một tab `GitLens`.
    
      ![](https://images.viblo.asia/a85f0eb2-ef1d-4ceb-a158-47edb60bac9a.png)
      
    + Phần`Status Bar` sẽ hiển thị thêm.

        ![](https://images.viblo.asia/ff8e8727-2cee-40ed-8e9b-6a197f7fdef9.png)
    
        + Thông tin về tên tác giả của commit.
        + Thời gian commit cách đây bao lâu.
     
    + Còn ở phần `Editor` sẽ hiển thi thêm chữ mờ

        ![](https://images.viblo.asia/d438ec05-1b5f-4ed9-96b3-837cfa44676b.png)
        
        + Hover chuột qua phần chữ mờ sẽ có khá nhiều tính năng hữu ích.
        + Trong đó có một tính năng nổi bật là có thể mở `pull request` hoặc `commit` trên `GitHub`. 



+ ***material-icon-theme***
    + Thay đổi file icon mặc định của VSCode
    + Trông thích mắt hơn nhèo.
        ![](https://images.viblo.asia/6f2d4c79-cb8f-4c0d-8a1a-ea58059e3db7.png)


+ ***Bracket Pair Colorizer***
    + Hiển thị `màu sắc` giống nhau cho mỗi `cặp ngoặc`.
    + Chứ lắm khi `căng mắt` lên nhìn ko biết `mở ngoặc` này ăn kèm `đóng ngoặc` nào :sweat_smile:
    + Kết hợp với phím tắt `Ctrl + Shift + [` & `Ctrl + Shift + ]` cũng khá hợp.
     

+ ***Code spell checker*** 
    + Kiểm tra `chính tả` trong code
    + Nhiều khi anh em mình viết sai chính tả mà `không nhận ra`, về sau đọc lại code cũng thấy `kì kì`.
    ![](https://images.viblo.asia/2d8c8d01-4890-4b45-a11c-78fe94b13e3d.gif)

+ ***BookMark***
    + Cái tên nói lên tất cả, nhiều khi đang code mà đi tìm lại vị trí trước đó mà mắc mệt hà.
    + `Ctrl + Alt + K`: Tạo / bỏ bookmark cho dòng hiện tại
    + `Ctrl + Alt + L / J`: Di chuyển đến vị trí bookmark


+ ***Docker*** 
    + Khi cài thì màn hình giới thiệu `Extensions` cũng đã đề cập tính năng khá chi tiết.

+ ***Markdown All in One***
    + Cái tên cũng nói lên tất cả rồi heng.
    + Có tính năng nổi bật là `live preview markdown`
         ![](https://images.viblo.asia/2a53ccfd-1e81-42a5-a794-df335054d5b6.png)

+ ***Code Runner***

    Cũng khá là tiện
        
    ![](https://images.viblo.asia/e4b0f6ea-c270-4cbd-b9b2-dc06eda44051.gif)


+ ***For auto suggestion***

    Hai bác bên dưới đều bảo có dùng `AI` để để `recommend code`.
    
    Ta có thể thử từng cái xem ưng cái nào hơn nhé. 
    
        
    + ***Visual Studio IntelliCode***
            
        ![](https://images.viblo.asia/e5dfd002-2549-44de-b4a5-192dbfece7c4.png)

    + ***Tabnine Autocomplete AI***
            
        ![](https://images.viblo.asia/14a2c600-6103-4898-bf87-01421592d194.png)

         + Khi sài cái này mình thực sự khá bất ngờ về hiệu quả của nó
         + Ví dụ như đang làm `I18n` sẽ có đoạn kiểu
             + `"can-not-add-member-to-organization": "Can not add member to organization"`
             + Vài lần đầu thì chưa thấy gì, về sau AI tự học thì phải, `Tabnine` gợi ý luôn cho mình đoạn text gần chuẩn, bỏ qua các dấu gạch nối, rồi còn chỉnh cả cú pháp tiếng Anh luôn, xịn ha.
         + Nhưng `Tabnine` sẽ ngốn khá nhiều tài nguyên hệ thống để hoạt động.
    

+ ***For HTML, CSS***
    + ***Colorize***
        + Hiển thị màu sắc cho `CSS`
    + ***CSS Peek***
        + Go to definition
    
        ![](https://images.viblo.asia/ba474d1f-628c-4f37-bfc5-d26a9d448d47.gif)


    + ***Auto Rename Tag***
        + Tự động thay đổi tên tag tương ứng 
         ![](https://images.viblo.asia/00d9a25a-0c40-460b-a358-cfb0372c8581.gif)

+ ***For Javascript***
    
    Không thể bỏ qua bộ đôi `ESLint` và `Prettier`

    + ***ESLint***

        - Hiện này các dự án có đụng tới `javascript` thường sài `Lint` để thống nhất `coding conventions`.
        - `ESLint` là một trong những công cụ dùng để `Lint` được ưa chuộng.
        - Trong `config` những dòng thêm sau để tối ưu hiệu quả của `ESLint`
            ```
            "editor.codeActionsOnSave": {
                "source.fixAll.eslint": true
            },
            "eslint.validate": [
                "javascript"
            ],
            ```
        - Còn file `package.json` thì sẽ có thêm
            ```
             "scripts": {
                "lint": "eslint .",
                "lint-fix": "eslint . --fix",
              }
            ```

    + ***Prettier - Code formatter***
    
    + Khi nào đó sẽ một bài riêng để nói về bộ đôi này và những `extensions` hay dùng cho các dự án `javascript`  như ***npm*** và  ***JavaScript (ES6) code snippets*** ...


## 9. Tiện ích

Ta cũng có thể sử dụng `Visual Studio Code` để giải quyết một số bài toán: 

+ ***Bài toán 1: Format json file***
    + Câu chuyện đặt ra là bạn có data trông như này hoặc phức tạp hơn nữa.

       ```
       {"name": ["John", "Alex"],"subject": ["match", "physic"]}
       ```

    + Làm sao để hiển thị nó thành dạng `JSON` dễ đọc ?
   
       ```
       {
        "name": [
            "John",
            "Alex"
        ],
        "subject": [
            "match",
            "physic"
        ]
      }
       ```
   
    + Không cần lên Google search `format json online` nữa nhé, nhỡ lộ data thì sao ?

         -> `Ctrl + N`
   
         -> `Ctrl + K M`  Sau đó, chọn ngôn ngữ cho file là `JSON`
           ![](https://images.viblo.asia/bac64b88-4443-403b-9b73-e4c6cacd3e37.png)

         -> `Paste` đoạn json kia vào, lúc này `"editor.formatOnPaste": true` sẽ hoạt động và done :v: 
         
         ![](https://images.viblo.asia/70314944-f9b5-43d1-addd-f5ad60832bb5.png)


+ ***Bài toán 2: Lấy dữ liệu***
    + Giả sử ta có data như này.
        ```json
        [
            {
                currency: 'AED'
            },
            {
                currency: 'ARS'
            },
            {
                currency: 'AUD'
            }
        ]
        ```

    + Làm sao để lấy được kết quả mảng các currency như này trong vòng vài giây ?
    
        ```
        [AED, ARS, AUD]
        ```

    + ... Đừng xem đáp án vội nha ...
    + 1
    + 2
    + 3
    + 4
    + 5
    + 6
    + 7
    + 8
    + 9
    + Và đây
    
        ![](https://images.viblo.asia/054aac90-abbb-40de-bd04-655bc827ef1a.gif)


+ ***Tìm kiếm và thay thế***
    + VS Code có một `điểm cộng` nữa là giao diện search trông khá tiện lợi, được `đánh giá` cao hơn hẳn so với `Sublime Text`.

    ![](https://images.viblo.asia/313a3e8e-450a-46ec-b727-c2b509679012.png)
    
    + Kết hợp với regex cũng khá mạnh
    ![](https://images.viblo.asia/0225ff2c-ea80-4ee1-9259-34dc9de682a8.png)
    
    + Bài toán đặt ra là biến từ 
    
        ```
        (QA, 800)
        (Dev, 1000)
        (PM, 15000)
        ```
        thành
        ```
        insert into salaries (position, amount) values ((QA, 800))
        ...
        ```

    + Câu trả lời là:
    
        ![](https://images.viblo.asia/16c102f4-5098-47a1-98f3-7ee8a87315b2.png)
        ![](https://images.viblo.asia/e305673f-4f0b-4322-a8f4-47b8585788f4.png)


Nguồn:
1. https://www.google.com/
2. https://code.visualstudio.com/docs