Ngày nay, có rát nhiều ứng dụng web cung cấp các tùy chọn xem PDF có sẵn cho người dùng của họ. Tuy nhiên, việc chọn một thư viện cho việc đps không phải là dễ dàng vì chúng ta sẽ cần nhiều hơn là chỉ mỗi hiển thị một tệp PDF

Vì vậy, trong bài viết này, mình sẽ gợi ý 5 thư viện PDF Viewer cho React với các so sánh tính năng để giúp bạn chọn cái tốt nhất cho yêu cầu của mình

## 1. React-pdf/renderer — Specialized in rendering and creating PDFs

![](https://images.viblo.asia/18b6f6c5-d61a-47e5-80fb-6d016333d4d9.png)

https://www.npmjs.com/package/@react-pdf/renderer

Thư viện này cung cấp một số thành phần cơ bản để bắt đầu mọi thứ và khi đã quen, bạn có thể tùy chỉnh chúng để đưa ra những thiết kế bắt mắt hơn.

[`<Document>`](https://react-pdf.org/components#document): Đây là thư mục gốc của tệp PDF.

[`<Page>`](https://react-pdf.org/components#page): Thông tin trang được mô tả bằng thẻ này. Nó cần phải có một kích thước nhất định (ví dụ: A4).

[`<View>`](https://react-pdf.org/components#view): Một vùng chứa có mục đích chung được sử dụng để tạo kiểu và định dạng tệp PDF. Bạn có thể sử dụng API `StyleSheet.create()` để tạo kiểu cho các khung nhìn của mình với đầy đủ của các thuộc tính Flexbox và CSS để bố cục lại tệp PDF, tương tự như cách nó được sử dụng trong React Native.

[`<Text>`](https://react-pdf.org/components#text): Dùng để hiển thị văn bản.

[`<Image>`](https://react-pdf.org/components#image): Có thể được sử dụng để chèn hình ảnh vào tài liệu PDF.

[`<Link>`](https://react-pdf.org/components#link): Có thể được sử dụng để tạo chú thích siêu liên kết

Ngoài ra, React-pdf/renderer đi kèm với một số tính năng tuyệt vời có thể được sử dụng để tạo các tài liệu tuyệt đẹp. Mình có thể dễ dàng liệt kê một số trong số chúng như sau:

* Hỗ trợ nhiều kiểu và thuộc tính CSS.
* Kiểm soát nhiều hơn đối với tài liệu thông qua API `usePDF`.
* Cung cấp API Node.
* Documentation chi tiết.
* Nhanh chóng và hiệu quả.
* Tùy biến cao và dễ sử dụng

Bạn có thể dễ dàng cài đặt thư viện này vào dự án của mình bằng lệnh `npm install — save @react-pdf/rendere` và đoạn mã dưới đây hiển thị một ví dụ đơn giản về việc sử dụng React-pdf/renderer

```javascript:typescript
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#C0C0C0'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Pdf Component
const MyPdf = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Heading #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Heading #2</Text>
      </View>
    </Page>
  </Document>
);
```

## 2. React-pdf — Displays PDFs as if they were images.

React-pdf cung cấp React component API cho phép mở các tệp PDF và hiển thị chúng bằng PDF.js. Mặc dù đây là một thư viện đơn giản chuyên dùng để xem PDF, nhưng nó có một số tính năng tuyệt vời như:

* Dễ sử dụng - Chèn document component và cung cấp cho nó một file prop. React-pdf sẽ phân loại nó là URL, tệp hay base64.
* Hỗ trợ cho các sự kiện tùy chỉnh.
* Nhiều phương pháp kết xuất.
* Hỗ trợ lựa chọn văn bản và chú thích.
* Khả năng tương thích trên nhiều trình duyệt.
* Khả năng truy cập - React-pdf không chỉ hiển thị các tệp PDF dưới dạng hình ảnh. Nhưng cũng như các lớp văn bản hiển thị mà trình đọc màn hình có thể nắm bắt, làm cho nội dung của bạn có sẵn hơn cho người khiếm thị.
* Miễn phí và mã nguồn mở

Bạn có thể cài đặt nó bằng lệnh `npm i react-pdf` và ví dụ dưới đây cho thấy cách sử dụng cơ bản của React-pdf.

```javascript:typescript

import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

function MyPdf() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document
        file="myfile.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>Page {pageNumber} of {numPages}</p>
    </div>
  );
}
export default MyPdf;
```

## 3. @phuocng/react-pdf-viewer — Powered by React Hooks

![](https://images.viblo.asia/7e870560-5025-449d-9195-c967628fdb44.png)

https://www.npmjs.com/package/@phuocng/react-pdf-viewer

Mặc dù mới nhưng React-pdf-viewer có một số tính năng thú vị khiến bạn phải mê mẩn. Để hiểu rõ hơn, mình sẽ liệt kê chúng như dưới đây:

* Hỗ trợ các tài liệu được bảo vệ bằng mật khẩu.
* Thu phóng: Hỗ trợ các mức tùy chỉnh như kích thước thực, độ vừa vặn của trang và chiều rộng trang.
* Điều hướng giữa các trang.
* Tìm kiếm văn bản.
* Xem trước hình thu nhỏ của trang.
* Xem và điều hướng mục lục.
* Liệt kê và tải xuống các tệp đính kèm.
* Xoay và nhiều chế độ cuộn.
* Lựa chọn văn bản và các chế độ công cụ cầm tay.
* Chế độ toàn màn hình.
* Có thể mở các tệp cục bộ (ví dụ: kéo và thả một tệp cục bộ để xem nó.)
* Tải xuống tệp và In.
* Xem các thuộc tính tài liệu.
* Hỗ trợ SSR.

Ngoài ra, nó hoàn toàn có thể tùy chỉnh với bộ sưu tập các plugin và hỗ trợ người dùng với [tài liệu](https://react-pdf-viewer.dev/docs/) tuyệt vời
> Note: Bạn cần react version 16.8+ và typescript version 3.8+ để có thể sử dụng react-pdf-viewer

Bạn có thể cài đặt nó bằng lệnh `npm i @ phuocng/react-pdf-viewer` và ví dụ dưới đây cho thấy cách sử dụng cơ bản của React-pdf-viewer

```javascript:typescript

// Core viewer
import { Viewer } from '@react-pdf-viewer/core';

// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Create new plugin instance
const defaultLayoutPluginInstance = defaultLayoutPlugin();

<Viewer
    fileUrl='/my Documents/sample_doc.pdf'
    plugins={[
        // Register plugins
        defaultLayoutPluginInstance,
        ...
    ]}
/>
```

## 4. React-file-viewer- Supports many file formats.

Thư viện này cung cấp một thành component  có tên `FileViewer` được sử dụng để hiển thị nội dung và nó chấp nhận một số several props:

* `fileType`: Loại tài nguyên cần hiển thị. Nếu bạn sử dụng loại tệp không được hỗ trợ, thông báo về loại tệp không được hỗ trợ sẽ xuất hiện.
* `filePath : URL của tài nguyên mà FileViewer sẽ hiển thị.
* `onError`: Hàm này sẽ được gọi nếu trình xem tệp không nạp hoặc hiển thị tài nguyên được yêu cầu. Đây là nơi bạn có thể chỉ định callback ghi log.
* `errorComponent react element`: Thành phần hiển thị trong trường hợp có lỗi chứ không phải là thành phần lỗi mặc định của trình xem.
* `unsupported Component react element`: Một thành phần để hiển thị nếu định dạng tệp không được hỗ trợ.

Ngoài ra, nó có một số tính năng đặc biệt như:

* Khả năng test với Jest hoặc Enzyme.
* Tiết kiệm thời gian bằng cách chạy linter với make lint để phát hiện ra những sai sót trước khi chạy mã.
* Có thể mở rộng- Dễ dàng thêm các loại tệp được hỗ trợ.

React-file-viewer có thể được cài đặt bằng lệnh `npm i react-file-viewer` và ví dụ dưới đây cho thấy một ví dụ đơn giản về React-file-viewer.

```javascript:typescript
// MyApp.js
import React, { Component } from 'react';
import logger from 'logging-library';
import FileViewer from 'react-file-viewer';
import { CustomErrorComponent } from 'custom-error';

const file = 'http://mysite.com/sampledoc.pdf'
const type = 'pdf'

class MyDocComponent extends Component {
  render() {
    return (
      <FileViewer
        fileType={type}
        filePath={file}
        errorComponent={CustomErrorComponent}
        onError={this.onError}/>
    );
  }

  onError(e) {
    logger.logError(e, 'error in file-viewer');
  }
}
```

## 5. @mikecousins/react-pdf

Thư viện này sử dụng Hook có tên `usePdf` để hiển thị các tệp PDF và chúng ta cần chuyển một số several props với Hook này:
* `file `: URL của tệp PDF.
* `page`: Biểu thị trang mà bạn muốn hiển thị. Mặc định = 1.
* `scale`: Cho phép bạn chia tỷ lệ PDF. Mặc định = 1.
* `onDocumentLoadSuccess`: Bạn có thể xác định một callback, sẽ được gọi sau khi dữ liệu tài liệu PDF đã được tải đầy đủ.
* `onDocumentLoadFail`: Cho phép bạn xác định một callback, sẽ được gọi khi xảy ra lỗi tải dữ liệu tài liệu PDF.
* `onPageLoadSuccess`: Cho phép bạn xác định một callback, sẽ được gọi sau khi dữ liệu trang PDF tải xong.
* `onPageRenderSuccess`: Cho phép bạn xác định một callback, sẽ được thực thi sau khi trang PDF đã hoàn toàn được hiển thị trong DOM

Nếu bạn nghĩ rằng đây là công việc quá nhiều; bạn có thể chỉ cần sử dụng trực tiếp `Pdfcomponent`, sử dụng hook `usePdf` nội bộ

```javascript:typescript
import React, { useState } from 'react';
import Pdf from '@mikecousins/react-pdf';

const MyPdfViewer = () => {
  const [page, setPage] = useState(1);

  return <Pdf file="sampledoc.pdf" page={page} />;
};
```

Bạn có thể cài đặt @mikecousins/react-pdf 1 cách dễ dàng `yarn add @mikecousins/react-pdf` hoặc `npm install @mikecousins/react-pdf`

### Tóm lại

![](https://images.viblo.asia/f5cfa109-d84e-41fd-b785-8e96b0bf4735.png)

https://www.npmtrends.com/

Sau khi phân tích các tính năng, mức độ phổ biến, các vấn đề bảo mật và hỗ trợ cộng đồng, mình sẽ nói rằng lựa chọn tốt nhất cho thư viện trình xem pdf là `React-pdf`.

Xem xét mô hình của các phiên bản đã phát hành, các hoạt động của kho lưu trữ và các dữ liệu có liên quan khác, trạng thái bảo trì của `React-pdf` vượt trội so với tất cả các thư viện khác.

Tuy nhiên, lựa chọn thư viện có thể được thay đổi dựa trên yêu cầu của bạn. Mình nghĩ rằng bài viết này chắc sẽ giúp bạn hiểu thêm về các thư viện này.

Cảm ơn bạn đã đọc…!!!

nguồn: [https://blog.bitsrc.io/](https://blog.bitsrc.io/)