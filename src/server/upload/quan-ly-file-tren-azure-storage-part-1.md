Một ngày đẹp trời bạn có một dự án, xây dựng hệ thống trên docker. Và theo như document thì Docker sẽ lưu trữ trên volume, bind mount và tmpfs volume. 
Nhưng trường hợp hệ thống có nhiều docker đặt ở nhiều vị trí khác nhau, và dữ liệu cũng muốn được lưu trữ tập trung, bảo mật, có CDN thì phát sinh ra vấn đề sẽ lưu trữ lên Azure Storage.

Hiện lưu trữ trên Azure Storage thì không khó, chỉ khó ở mô hình của bạn muốn phân quyề thế nào.

## Azure Storage là gì?

Đây là một dịch vụ lưu trữ dữ liệu của Microsoft có 3 loại: Storage Account, Azure Blob, Azure File.

Đọc bài này của bạn Code dạo để hiểu thêm nhé: https://toidicodedao.com/2019/08/06/cung-hoc-co-lao-azure-phan-6-2-tim-hieu-ve-azure-blob-va-azure-file/

## Tiến hành tạo Azure Storage

Vì để tiết kiệm thời gian, không phải copy nội dung mình sẽ gắn link bài viết bên dưới, để tạo tạo Azure Storage
https://viblo.asia/p/tim-hieu-ve-azure-blob-storage-trong-microsoft-azure-3P0lPDBPlox
## Lưu ý
Không giống như S3 hay các dịch vụ lưu trữ khác. Azure Storage sẽ lưu trữ không chia theo file hay folder mà lưu trữ theo Blob. Một blob là một đối tượng, để phân tách theo kiểu cấu trúc chúng ta sẽ dựa theo tên của nó:
Thông thường với đường dẫn : {folder1}/{folder2}/{filename.jpg} thì file này sẽ nằm trong 2 folder folder1/folder2 chứa filename.jpg. Nhưng với blob nó chỉ là 1 mà thôi.

Nếu bạn hiểu điều này thì mọi thao tác khác khá đơn giản.
## Cấu hình .NET Core
Trên .Net Core sẽ có 2 thư viện để bạn sử dụng:
* **Microsoft.Azure.Storage.Blob V11** : Mình đánh giá bản này khá dễ sử dụng, nhưng đã cũ nên có một số phần không xài được nên mình đổi sang thư viện bên dưới.
* **Azure.Storage.Blobs V12:** Bản này sẽ không có một số hàm, nhưng được cập nhật mới nhất.
Các bước thực thi:
### 1. Cài đặt Azure.Storage.Blobs trên nuget
### 2. Tạo config trong appsettings.json

```
"AzureStorage": {
    "ConnectionString": "DefaultEndpointsProtocol=https;AccountName={**Account name**};AccountKey={**Account key**};EndpointSuffix=core.windows.net",
    "Container": "{**Container name**}",
  }
```
Trong phần trên các bạn điền Account Name / Account key lấy từ bước tạo chuỗi kết nối của Azure Storage.
### 3.Cấu hình kết nối Azure Blob
Trên **startup.cs**
```
public void ConfigureServices(IServiceCollection services){

    services.AddSingleton(x => new BlobServiceClient(Configuration.GetValue<string>("AzureStorage:ConnectionString")));
   }
```

Tiến hành load config vào trong hệ thống.

### Tiến hành viết class để thực thi các hành động, thêm sửa xóa

```
public interface IBlobStorageService
    {
        // Kiểm tra tồn tại 
        Task<bool> CheckBlobAsync(string name);
        // Lấy Blob
        Task<BlobDataInfo> GetBlobAsync(string name);
        // Lấy danh sách blob
        Task<IEnumerable<string>> ListBlobAsync();
        Task<IEnumerable<string>> ListBlobAsync(string prefix);
        // Upload Blob theo kiểu Stream
        Task UploadStreamFileBlobAsync(IFormFile file, string fileName);
         // Upload Blob theo kiểu từ path
        Task UploadFileBlobAsync(string filePath, string fileName);
         // Upload Blob theo kiểu truyền content
        Task UploadContentBlobAsync(string content, string fileName);
        // Xóa blob
        Task DeleteBlobAsync(string blobName);
        // Xóa tất cả các blob có cùng đoạn storng folder
        Task DeleteBlobFolderAsync(string folderPath);
        // Tải blob về
        Task DownloadAsync(string sPath, string path);
    }
```
Mình sẽ viết các hàm trên để thao tác với Blob.
Bạn có thể tham khảo code từ: 
* https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-dotnet
* https://docs.microsoft.com/en-us/azure/storage/common/storage-samples-dotnet
Để lấy các đoạn code để viết các hàm trên.

## Tải file về, hiển thị file
Sau khi lưu trữ thành công Blob lên Azure Storage thì bước tiếp theo cho phép người dùng sẽ dụng nó. Hiện nay azure sẽ có 3 cách để cho người dùng sử dụng file:
- Thông qua đường dẫn mà Azure trả về. (Đường dẫn với domain của azure) / Bạn có thể config để gán domain của bạn vào đây, tạm thời mình chưa thử được.
- Viết một API cho phép hệ thống download file về và show trên frontend: nếu như các ứng dụng của bạn là api thì bạn có thể sử dụng cách này, nhưng chỉ dùng số lượng ít, số lượng nhiều thì không ổn.
- Sever thực thi hiển thị file, cách này mình đang xử lý sẽ gõ đường dẫn domain chính kèm, blob name thì hệ thống sẽ show file, nhưng lưu trữ thực trên sever bạn vậy.


```      
        protected readonly IBlobStorageService _blobService;
        public BlobController(IBlobStorageService blobService)
        {
            _blobService = blobService;
        }
        [HttpGet("{blobName}")]
        public async Task<IActionResult> GetBlob(string blobName)
        {
            var check = await _blobService.CheckBlobAsync(blobName);

            if (check)
            {
                var data = await _blobService.GetBlobAsync(blobName);

                return File(data.Content, data.ContentType);
            }

            return NotFound();
        }
        
        [HttpGet("list")]
        public async Task<IActionResult> ListBlobs(string blobName)
        {
            return Ok(await _blobService.ListBlobAsync());
        }

        [HttpPost("uploadFile")]
        public async Task<IActionResult> UploadFile([FromBody] UploadFileRequest request)
        {
            await _blobService.UploadFileBlobAsync(request.FilePath, request.FileName);

            return Ok();
        }

        [HttpPost("uploadContent")]
        public async Task<IActionResult> UploadContent([FromBody] UploadContentRequest request)
        {
            await _blobService.UploadContentBlobAsync(request.Content, request.FileName);

            return Ok();
        }

        [HttpDelete("{blobName}")]
        public async Task<IActionResult> DeleteFile(string blobName)
        {
            await _blobService.DeleteBlobAsync(blobName);
            return Ok();
        }
```

## Kết luận:
Mình đã show ra vài điểm để bạn có thể biết mình có thể lấy từ liệu từ đâu, config gì để sử dụng. Mong rằng nó sẽ giúp bạn rút ngắn thời gian đi. Có một số đoạn code, mình không thể show được, nhưng có gắn kèm link để mọi người thực hiện theo, viết sao cho phù hợp.

Về bảo mật khi bạn upload file lên thì phải validate: size, extension, check file header (signature) và đổi tên file khi upload lên Azure Storage nhé. Và luôn luôn đặt trạng thái private cho file, muốn cho người khác xem phải đi qua sever của bạn.