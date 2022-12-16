Hiện tại, Windows cung cấp khoảng ba cách để chụp màn hình. Thế thì cái nào là nhanh nhất? Tôi muốn test thử từng cái. (Có vẻ như có các API riêng tư khác, nhưng tôi sẽ không đề cập đến chúng ở đây)
Các nguồn trong bài viết được lược bỏ để tiện cho việc giải thích. Bấm vào đây để xem qua:
https://github.com/i-saint/ScreenCaptureTest

GDI
Đó là một API thời kỳ đồ đá, nhưng nó vẫn hoạt động và dễ sử dụng.
Lưu ý rằng nếu bạn sử dụng GetSystemMetrics () hoặc GetWindowRect (), bạn nên đặt "DPI Awareness" trong cài đặt dự án "Manifest Tool" trên Visual Studio thành "Per Monitor High DPI Aware". 
Nếu điều này bị bỏ qua, kích thước cửa sổ và tọa độ màn hình mà API tương ứng thu được sẽ bị giảm do độ phóng đại của màn hình.

```
// Capture toàn màn hình
bool CaptureEntireScreen(const std::function<void(const void* data, int width, int height)>& callback)
{
    int x = ::GetSystemMetrics(SM_XVIRTUALSCREEN);
    int y = ::GetSystemMetrics(SM_YVIRTUALSCREEN);
    int width = ::GetSystemMetrics(SM_CXVIRTUALSCREEN);
    int height = ::GetSystemMetrics(SM_CYVIRTUALSCREEN);

    BITMAPINFO info{};
    info.bmiHeader.biSize = sizeof(info.bmiHeader);
    info.bmiHeader.biWidth = width;
    info.bmiHeader.biHeight = height;
    info.bmiHeader.biPlanes = 1;
    info.bmiHeader.biBitCount = 32;
    info.bmiHeader.biCompression = BI_RGB;
    info.bmiHeader.biSizeImage = width * height * 4;

    bool ret = false;
    HDC hscreen = ::GetDC(nullptr); // null で画面全体指定となる
    HDC hdc = ::CreateCompatibleDC(hscreen);
    void* data = nullptr;
    if (HBITMAP hbmp = ::CreateDIBSection(hdc, &info, DIB_RGB_COLORS, &data, NULL, NULL)) {
        ::SelectObject(hdc, hbmp);
        ::StretchBlt(hdc, 0, 0, width, height, hscreen, x, y, width, height, SRCCOPY);
        callback(data, width, height);
        ::DeleteObject(hbmp);
        ret = true;
    }
    ::DeleteDC(hdc);
    ::ReleaseDC(nullptr, hscreen);
    return ret;
}

// capture window chỉ định
bool CaptureWindow(HWND hwnd, const std::function<void(const void* data, int width, int height)>& callback)
{
    RECT rect{};
    ::GetWindowRect(hwnd, &rect);
    int width = rect.right - rect.left;
    int height = rect.bottom - rect.top;

    BITMAPINFO info{};
    info.bmiHeader.biSize = sizeof(info.bmiHeader);
    info.bmiHeader.biWidth = width;
    info.bmiHeader.biHeight = height;
    info.bmiHeader.biPlanes = 1;
    info.bmiHeader.biBitCount = 32;
    info.bmiHeader.biCompression = BI_RGB;
    info.bmiHeader.biSizeImage = width * height * 4;

    bool ret = false;
    HDC hscreen = ::GetDC(hwnd);
    HDC hdc = ::CreateCompatibleDC(hscreen);
    void* data = nullptr;
    if (HBITMAP hbmp = ::CreateDIBSection(hdc, &info, DIB_RGB_COLORS, &data, NULL, NULL)) {
        ::SelectObject(hdc, hbmp);
        ::PrintWindow(hwnd, hdc, PW_RENDERFULLCONTENT);
        callback(data, width, height);
        ::DeleteObject(hbmp);
        ret = true;
    }
    ::DeleteDC(hdc);
    ::ReleaseDC(hwnd, hscreen);
    return ret;
}

// Test
void main()
{
    CaptureEntireScreen([](const void* data, int w, int h) {
        // Xử lý
        });

    CaptureWindow(::GetForegroundWindow(), [](const void* data, int w, int h) {
        // Xử lý
        });
}
```

Lưu ý rằng dữ liệu pixel thu được theo thứ tự của BGRA và bị lộn ngược.
Tôi thường thấy các ví dụ sử dụng BitBlt (), nhưng có vẻ như không thể chụp toàn bộ màn hình trong môi trường đa hiển thị (khi tọa độ màn hình có thể là âm) hoặc không thể chụp được các cửa sổ như chrome. Tôi đã tránh nó bởi vì thế.

API sao chép trên máy tính để bàn
URL: https://docs.microsoft.com/vi-vn/windows/win32/direct3ddxgi/desktop-dup-api

API được thêm vào Windows 8. Đặc điểm là màn hình có thể được lấy dưới dạng kết cấu (ID3D11Texture2D). Chụp trên mỗi màn hình và không hỗ trợ chụp mỗi cửa sổ.

```
using namespace winrt;
using namespace winrt::Windows::Foundation;
using namespace winrt::Windows::System;
using namespace winrt::Windows::Graphics;
using namespace winrt::Windows::Graphics::DirectX;
using namespace winrt::Windows::Graphics::DirectX::Direct3D11;
using namespace winrt::Windows::Graphics::Capture;

class GraphicsCapture
{
public:
    using Callback = std::function<void(ID3D11Texture2D*, int w, int h)>;

    bool start(HWND hwnd, bool free_threaded, const Callback& callback);
    void stop();

private:
    void onFrameArrived(
        winrt::Windows::Graphics::Capture::Direct3D11CaptureFramePool const& sender,
        winrt::Windows::Foundation::IInspectable const& args);

private:
    Callback m_callback;
    com_ptr<ID3D11Device> m_device;

    IDirect3DDevice m_device_rt{ nullptr };
    Direct3D11CaptureFramePool m_frame_pool{ nullptr };
    GraphicsCaptureItem m_capture_item{ nullptr };
    GraphicsCaptureSession m_capture_session{ nullptr };
    Direct3D11CaptureFramePool::FrameArrived_revoker m_frame_arrived;
};

bool GraphicsCapture::start(HWND hwnd, bool free_threaded, const Callback& callback)
{
    m_callback = callback;

    // Tạo device
    ::D3D11CreateDevice(nullptr, D3D_DRIVER_TYPE_HARDWARE, nullptr, D3D11_CREATE_DEVICE_BGRA_SUPPORT, nullptr, 0, D3D11_SDK_VERSION, m_device.put(), nullptr, nullptr);

    // Tạo device bản WinRT
    auto dxgi = m_device.as<IDXGIDevice>();
    com_ptr<::IInspectable> device_rt;
    ::CreateDirect3D11DeviceFromDXGIDevice(dxgi.get(), device_rt.put());
    m_device_rt = device_rt.as<IDirect3DDevice>();

    // Tạo CaptureItem 
    auto factory = get_activation_factory<GraphicsCaptureItem>();
    auto interop = factory.as<IGraphicsCaptureItemInterop>();
    interop->CreateForWindow(hwnd, guid_of<ABI::Windows::Graphics::Capture::IGraphicsCaptureItem>(), put_abi(m_capture_item));
    if (m_capture_item) {
        // Tạo FramePool 
        auto size = m_capture_item.Size();
        if (free_threaded) // Cách callback từ thread chuyên dụng 
            m_frame_pool = Direct3D11CaptureFramePool::CreateFreeThreaded(m_device_rt, DirectXPixelFormat::B8G8R8A8UIntNormalized, 1, size);
        else // Cách callback từ main thread
            m_frame_pool = Direct3D11CaptureFramePool::Create(m_device_rt, DirectXPixelFormat::B8G8R8A8UIntNormalized, 1, size);
        m_frame_arrived = m_frame_pool.FrameArrived(auto_revoke, { this, &GraphicsCapture::onFrameArrived });

        // Bắt đầu capture
        m_capture_session = m_frame_pool.CreateCaptureSession(m_capture_item);
        m_capture_session.StartCapture();
        return true;
    }
    else {
        return false;
    }
}

void GraphicsCapture::stop()
{
    m_frame_arrived.revoke();
    m_capture_session = nullptr;
    if (m_frame_pool) {
        m_frame_pool.Close();
        m_frame_pool = nullptr;
    }
    m_capture_item = nullptr;
    m_callback = {};
}

void GraphicsCapture::onFrameArrived(winrt::Windows::Graphics::Capture::Direct3D11CaptureFramePool const& sender, winrt::Windows::Foundation::IInspectable const& args)
{
    auto frame = sender.TryGetNextFrame();
    auto size = frame.ContentSize(); // Không giới hạn trong trường hợp window size và capture size khớp nhau
    
    com_ptr<ID3D11Texture2D> surface; // Kết quả capture
    frame.Surface().as<::Windows::Graphics::DirectX::Direct3D11::IDirect3DDxgiInterfaceAccess>()->GetInterface(guid_of<ID3D11Texture2D>(), surface.put_void());

    m_callback(surface.get(), size.Width, size.Height);
}


// テスト
void main()
{
    // non-free threaded
    {
        GraphicsCapture capture;
        HWND target = ::GetForegroundWindow(); // Capture window active tương ứng

        bool arrived = false;
        auto callback = [&](ID3D11Texture2D* surface, int w, int h) {
            // Tiến hành xử lý với surface 
            arrived = true;
        };

        if (capture.start(target, false, callback)) {
            MSG msg;
            while (!arrived) {
                ::GetMessage(&msg, nullptr, 0, 0);
                ::TranslateMessage(&msg);
                ::DispatchMessage(&msg); // Gọi ra callback từ đây
            }
            capture.stop();
        }
    }

    // free threaded
    {
        GraphicsCapture capture;
        HWND target = ::GetForegroundWindow();

        std::mutex mutex;
        std::condition_variable cond;

        // Gọi ra từ capture thread
        auto callback = [&](ID3D11Texture2D* surface, int w, int h) {
            // TIến hành xử lý cần thiết đối với surface 
            cond.notify_one(); // Thông báo hoàn thành main thread
        };

        std::unique_lock<std::mutex> lock(mutex);
        if (capture.start(target, true, callback)) {
            cond.wait(lock); //CHờ xong callback
            capture.stop();
        }
    }
}
```

WinRT và D3D11 thuần túy là hỗn hợp, nhưng nếu bạn ẩn nó bằng một giao diện phù hợp, bạn không cần phải biết về WinRT.
Tạo thiết bị, tạo mục chụp, tạo FramePool, bắt đầu chụp. Khi khung đến, một cuộc gọi lại được gọi, vì vậy luồng thô là thực hiện các xử lý cần thiết cho kết cấu trong đó.

IGraphicsCaptureItemInterop :: CreateForWindow () là một bản chụp do cửa sổ chỉ định và IGraphicsCaptureItemInterop :: CreateForMonitor () là một bản chụp do màn hình chỉ định.
Đăng ký một cuộc gọi lại với Direct3D11CaptureFramePool :: FrameArrived () và nó sẽ được gọi khi đến khung. Bạn nên cẩn thận khi gọi lại được gọi, và có hai phương pháp khả dụng.
Một là phương thức được gọi từ luồng nguồn tạo framePool, được tạo bằng cách sử dụng Direct3D11CaptureFramePool :: Create (). Trong trường hợp này, khung xuất hiện trong DispatchMessage (). Vì vậy, nếu bạn sử dụng phương pháp này, bạn cần một vòng lặp thông báo ngay cả khi bạn không có cửa sổ.
Cách còn lại là chạy một chuỗi dành riêng để bắt và gọi lại từ đó. Nếu bạn tạo nó bằng Direct3D11CaptureFramePool :: CreateFreeThreaded (), nó sẽ ở đây. Trong trường hợp này, lệnh gọi lại được gọi từ chuỗi chụp khi khung hình đến.
FramePool phải được kết thúc hoặc hủy khỏi luồng nguồn. Không thể kết thúc từ bên trong lệnh gọi lại tại thời điểm CreateFreeThreaded ().

Kích thước của kết cấu được chụp có vẻ lớn hơn một chút so với kích thước của cửa sổ. frame.ContentSize () là kích thước của cửa sổ, không phải lúc nào cũng khớp trong môi trường của tôi.
Theo tài liệu, kết cấu đã chụp sẽ được giải phóng khi nó thoát khỏi lệnh gọi lại và không nên giữ lại. Nếu bạn muốn giữ nó, bạn sẽ làm một bản sao.
Không giống như các API khác, căn chỉnh pixel có thể khác với BGRA (được chỉ định bởi các đối số như Direct3D11CaptureFramePool :: Create ()). Ngoài ra, giống như API sao chép trên máy tính để bàn, kết cấu kết quả chụp không có cờ đọc CPU.

Tôi đã chụp lại màn hình chính nhiều lần với mỗi phương pháp và nhận được kết quả nhanh nhất.

GDI --54,18ms
API sao chép trên máy tính để bàn --8,74ms
Windows Graphics Capture (phân luồng không miễn phí) --5,55ms
Windows Graphics Capture (luồng miễn phí) --2,96ms
Điều khiển chính có độ phân giải 4k và môi trường trong đó một điều khiển phụ 2k được kết nối.
Cả API sao chép màn hình và Windows Graphics Capture đều không bao gồm quá trình khởi tạo (quá trình khởi tạo là khoảng 100ms). Kết cấu kết quả chụp được sao chép vào kết cấu dàn và đo thời gian cho đến khi Map () được thực hiện sau khi đợi hoàn thành việc sao chép.
Phiên bản GDI được cho là chụp toàn màn hình bao gồm cả màn hình phụ bên trong, đây là một kết quả bất lợi một cách phi lý, nhưng hai phiên bản còn lại vẫn nhanh hơn rất nhiều. Ngoài ra, Windows Graphics Capture luôn nhanh hơn với luồng miễn phí.

Vì vậy, tôi có cảm giác rằng API càng mới thì dường như nó càng tốt.