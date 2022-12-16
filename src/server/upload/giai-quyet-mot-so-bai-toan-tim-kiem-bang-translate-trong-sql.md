### I. Giới thiệu:
- Trong các ứng dụng hiện nay, gần như là 99.69% trong ứng dụng đó phải có chức năng tìm kiếm, không ít thì nhiều
- Nên hôm nay mình xin được phép múa rìu qua mắt thợ, để chia sẻ về việc search áp dụng function TRANSLATE trong SQL
### II. Bài toán:
- Bài toán 1: Tìm kiếm giá trị trả về sao cho giá trị tìm kiếm dù có khoảng cách 2 đầu, có khoảng cách ở giữ vẫn, không có khoảng cách vẫn ra giá trị
    - Ví dụ: ta có trong cơ sở dữ liệu có bảng tên users gồm các tên (name) như sau:
        - Sahra Hana
        - John Jacket
        - Jim cordon
        - Dan catan
        - Bon Davin
    - Tìm kiếm tên `Sahra Hana` với các giá trị tìm kiếm như sau
        - `SahraHana` // không dấu cách
        - `       Sahra Hana      ` // có cách 2 đầu
        - `Sah    raHana` // cách ở giữa nhưng không đúng trong db
        - `sahrahana` // không chữ in hoa
- Bài toán 2: Ngoài tìm kiếm bằng chữ cái latin chúng t còn có tìm kiếm bằng những chữ cái tiếng Nhật, và nếu ai đang làm dự án về tiếng Nhật thì sẽ biết rằng, trong tiếng Nhật có `full-width`, `half-width`, `katakana`, `hiragana`, .v.v. Và họ có kiểu tìm kiếm là nhập giá trị `full-size` thì cũng ra giá trị `half-size`, nhập giá trị `hiragana` vẫn trả về giá trị chữ `katakana`. Wow!!! Nói thật nếu không có `TRANSLATE` của SQL, mình không biết phải sử lý bài toán này như nào nữa :v
    - Ví dụ: trong cơ sở dữ liệu có chừng này cái tên:
        - アイ
        - ウエ
        - オカ
        - キクケ
    - Nhập giá trị tìm kiếm là hira vào `あい` và trả về giá trị vẫn có katakana là `アイ`
### III. Giải quyết bài toán:
1. Bài toán 1: 
    - Nếu là trường hợp 2 đầu có space thì ta có thể dùng `trim`
    - Còn với case chữ in hoa, in thường thì dùng `LOWER` trong SQL sử lý
    - Nhưng còn với 2 case cách ở giữa và không cách thì làm thế nào. Đây là lúc `TRANSLATE` trở nên awesome :v
    - Bạn có thể tra google về cách sử dụng `TRANSLATE`, nó gồm 3 đối số truyền vào, param1 là giá trị cần, param2 là giá trị cần chuyển đổi, param3 là giá trị cần chuyển đổi về dạng.
    - Vậy câu query của chúng ta sẽ như thế này: `SELECT * FROM users WHERE TRANSLATE(LOWER(name), ' 　', '') LIKE TRANSLATE(LOWER('%$1%'), ' 　', '')`
    - Ở trên có cả cách full-width và half-width
    - Done, và nếu dùng `TRANSLATE` chuyển space thành không có thì chúng ta cũng không cần trim 2 đầu chi cho mất công :v
3. Bài toán 2:
    - Chữ cái tiếng Nhật sẽ chia thành 3 phần: `Full-size Kanakata`, `Half-size Kanakata` và `Hiragana`
    - Để so sánh được dữ liệu truyền vào và dữ liệu trong db ta sẽ chuyển nó về 1 dạng, mình sẽ chọn `Half-size Kanakata`
    - Dùng translate như bài toán 1 thì ta sẽ có các dạng tương ứng như sau
        - `Full-size Kanakata` với `Half-size Kanakata`
        - `Hiragana` với `Half-size Kanakata`
    - Ta sẽ có câu query như sau:
    ```
    SELECT * FROM users WHERE TRANSLATE(name, 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォッャュョヮヰヱヵヶーガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポヴあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんぁぃぅぇぉっゃゅょゎゐゑヵヶーがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽゔ', 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｧｨｩｪｫｯｬｭｮﾜｲｴｶｹｰｶﾞｷﾞｸﾞｹﾞｺﾞｻﾞｼﾞｽﾞｾﾞｿﾞﾀﾞﾁﾞﾂﾞﾃﾞﾄﾞﾊﾞﾋﾞﾌﾞﾍﾞﾎﾞﾊﾟﾋﾟﾌﾟﾍﾟﾎﾟｳﾞｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｧｨｩｪｫｯｬｭｮﾜｲｴｶｹｰｶﾞｷﾞｸﾞｹﾞｺﾞｻﾞｼﾞｽﾞｾﾞｿﾞﾀﾞﾁﾞﾂﾞﾃﾞﾄﾞﾊﾞﾋﾞﾌﾞﾍﾞﾎﾞﾊﾟﾋﾟﾌﾟﾍﾟﾎﾟｳﾞ') LIKE TRANSLATE('%$1%', 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォッャュョヮヰヱヵヶーガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポヴあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんぁぃぅぇぉっゃゅょゎゐゑヵヶーがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽゔ', 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｧｨｩｪｫｯｬｭｮﾜｲｴｶｹｰｶﾞｷﾞｸﾞｹﾞｺﾞｻﾞｼﾞｽﾞｾﾞｿﾞﾀﾞﾁﾞﾂﾞﾃﾞﾄﾞﾊﾞﾋﾞﾌﾞﾍﾞﾎﾞﾊﾟﾋﾟﾌﾟﾍﾟﾎﾟｳﾞｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｧｨｩｪｫｯｬｭｮﾜｲｴｶｹｰｶﾞｷﾞｸﾞｹﾞｺﾞｻﾞｼﾞｽﾞｾﾞｿﾞﾀﾞﾁﾞﾂﾞﾃﾞﾄﾞﾊﾞﾋﾞﾌﾞﾍﾞﾎﾞﾊﾟﾋﾟﾌﾟﾍﾟﾎﾟｳﾞ')
    ```
    - Nhìn khá tởm chúng ta có thể tạo function SQL để sử dụng
    ```
    CREATE FUNCTION translate_jp(value TEXT)
        RETURNS TEXT AS
      $BODY$
        DECLARE
        BEGIN
          value = TRANSLATE(
            value,
            'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォッャュョヮヰヱヵヶーガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポヴあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんぁぃぅぇぉっゃゅょゎゐゑヵヶーがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽゔ',
            'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｧｨｩｪｫｯｬｭｮﾜｲｴｶｹｰｶﾞｷﾞｸﾞｹﾞｺﾞｻﾞｼﾞｽﾞｾﾞｿﾞﾀﾞﾁﾞﾂﾞﾃﾞﾄﾞﾊﾞﾋﾞﾌﾞﾍﾞﾎﾞﾊﾟﾋﾟﾌﾟﾍﾟﾎﾟｳﾞｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｧｨｩｪｫｯｬｭｮﾜｲｴｶｹｰｶﾞｷﾞｸﾞｹﾞｺﾞｻﾞｼﾞｽﾞｾﾞｿﾞﾀﾞﾁﾞﾂﾞﾃﾞﾄﾞﾊﾞﾋﾞﾌﾞﾍﾞﾎﾞﾊﾟﾋﾟﾌﾟﾍﾟﾎﾟｳﾞ'
          );
          RETURN value;
        END
      $BODY$
      LANGUAGE 'plpgsql' VOLATILE;
    ```
    - Ta có câu query như sau: `SELECT * FROM WHERE translate_jp(name) LIKE translate_jp('%$1%')`
    - Yeah!!! Awesome đúng k :v, nhưng không cuộc đời nó không như mơ, khi chúng ta search nó sẽ không cho ra đúng đáp án
    - Lúc này bạn sẽ chỉ muốn đập bàn vì là đúng hết mọi thứ nhưng sau lại search cho kết quả sai hoặc không ra kết quả
    - Đơn giải là vì trong ký tự tiếng Nhật còn phân chia thành 2 loại trong nữa là: 1 byte và 2 byte
    - Nên việc translate này của nó đang không đúng, chúng ta cần chỉnh lại trong function `translate_jp` lại một chút
    ```
    CREATE FUNCTION translate_jp(value TEXT)
        RETURNS TEXT AS
    $BODY$
        DECLARE
            index INT;
            full_width_array varchar[] = ARRAY['ガ', 'ギ', 'グ', 'ゲ', 'ゴ', 'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ', 'ダ', 'ヂ', 'ヅ', 'デ', 'ド', 'バ', 'ビ', 'ブ', 'ベ', 'ボ', 'パ', 'ピ', 'プ', 'ペ', 'ポ', 'ヴ', 'が', 'ぎ', 'ぐ', 'げ', 'ご', 'ざ', 'じ', 'ず', 'ぜ', 'ぞ', 'だ', 'ぢ', 'づ', 'で', 'ど', 'ば', 'び', 'ぶ', 'べ', 'ぼ', 'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ', 'ゔ'];
            half_width_array varchar[] = ARRAY['ｶﾞ', 'ｷﾞ', 'ｸﾞ', 'ｹﾞ', 'ｺﾞ', 'ｻﾞ', 'ｼﾞ', 'ｽﾞ', 'ｾﾞ', 'ｿﾞ', 'ﾀﾞ', 'ﾁﾞ', 'ﾂﾞ', 'ﾃﾞ', 'ﾄﾞ', 'ﾊﾞ', 'ﾋﾞ', 'ﾌﾞ', 'ﾍﾞ', 'ﾎﾞ', 'ﾊﾟ', 'ﾋﾟ', 'ﾌﾟ', 'ﾍﾟ', 'ﾎﾟ', 'ｳﾞ', 'ｶﾞ', 'ｷﾞ', 'ｸﾞ', 'ｹﾞ', 'ｺﾞ', 'ｻﾞ', 'ｼﾞ', 'ｽﾞ', 'ｾﾞ', 'ｿﾞ', 'ﾀﾞ', 'ﾁﾞ', 'ﾂﾞ', 'ﾃﾞ', 'ﾄﾞ', 'ﾊﾞ', 'ﾋﾞ', 'ﾌﾞ', 'ﾍﾞ', 'ﾎﾞ', 'ﾊﾟ', 'ﾋﾟ', 'ﾌﾟ', 'ﾍﾟ', 'ﾎﾟ', 'ｳﾞ'];
        BEGIN
            FOR index IN 1..52 LOOP
            value = replace(value, full_width_array[index], half_width_array[index]);
            END LOOP;
            value = TRANSLATE(
            value,
            'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォッャュョヮヰヱヵヶーあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんぁぃぅぇぉっゃゅょゎゐゑヵヶー０１２３４５６７８９ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ 　',
            'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｧｨｩｪｫｯｬｭｮﾜｲｴｶｹｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｧｨｩｪｫｯｬｭｮﾜｲｴｶｹｰ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
            );
            RETURN value;
        END
    $BODY$
    LANGUAGE 'plpgsql' VOLATILE;
    ```
    - Xong, lúc này mới gọi là hoàn hảo :v 
### IV. Kết:
- Không biết do mình tiếp xúc ít dự án hay do mọi người có những cách giải quyết pro hơn mà việc dùng translate mình không thấy dùng
- Nên nếu có cách giải quyết nào hay hơn mong được chỉ giáo :D