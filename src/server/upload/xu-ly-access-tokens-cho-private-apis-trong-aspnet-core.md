Bài viết này trình bày cách làm thế nào để lưu giữ access tokens lâu dài cho một ứng dụng ASP.NET Core đã được tín nhiệm cái mà cần để truy APIs bảo mật. Những tokens này được giữ lại lâu dài không có nghĩa là cho công khai client, nhưng chúng được sử dụng cho việc giao tiếp giữa service và service.

###
**Code**: https://github.com/damienbod/AspNetCoreHybridFlowWithApi

###
**Bài viết liên quan:**
- [Securing an ASP.NET Core MVC application which uses a secure API](https://damienbod.com/2018/02/02/securing-an-asp-net-core-mvc-application-which-uses-a-secure-api/)

# Thiết lập
Hệ thống phần mềm bao gồm 3 ứng dụng, một web client với giao diện (UI) và người dùng, một API được sử dụng bởi web client và secure token service, được triển khai sử dụng với **IdentityServer4**.

####
Tokens được lưu giữ trong ví dụ này được sử dụng cho việc giao tiếp giữa ứng dụng web và API được tín nhiệm trong service. Ứng dụng nhận access tokens cho việc giao tiếp service tới service. Tokens cho việc định danh (người dùng + ứng dụng) không được sử dụng ở đây. Trong bài viết trước, mỗi lần người dùng yêu cầu một view, API service yêu cầu disco serivice data (**OpenID** kết nối các endpoints đã biết). Tiếp theo nó yêu cầu access token từ **secure token service**. Sau đó nó yêu cầu tài nguyên của API. Chúng ta muốn tái sử dụng access token thay vì việc mở rộng 2 HTTP requests cho những requests của web UI.

![](https://images.viblo.asia/0fcf3245-381f-419e-b5f6-134ae9d661a3.png)

```ApiService``` được sử dụng để truy cập API cho việc định danh. Đây là một thể hiện **scoped** hoặc **transient** trong ```IoC``` và cho mỗi định danh khác nhau

###
Service sử dụng **API token client service** là một signleton. Service được sử dụng để lấy về access tokens và lưu giữ lâu dài chúng miễn là tokens vẫn còn hợp lệ. Service tiếp theo sử dụng access token để lấy dữ liệu từ tài nguyên API.

```csharp
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using System;
using System.Net.Http;
using System.Threading.Tasks;
 
namespace WebHybridClient
{
    public class ApiService
    {
        private readonly IOptions<AuthConfigurations> _authConfigurations;
        private readonly IHttpClientFactory _clientFactory;
        private readonly ApiTokenCacheClient _apiTokenClient;
 
        public ApiService(
            IOptions<AuthConfigurations> authConfigurations, 
            IHttpClientFactory clientFactory,
            ApiTokenCacheClient apiTokenClient)
        {
            _authConfigurations = authConfigurations;
            _clientFactory = clientFactory;
            _apiTokenClient = apiTokenClient;
        }
 
        public async Task<JArray> GetApiDataAsync()
        {
            try
            {
                var client = _clientFactory.CreateClient();
 
                client.BaseAddress = new Uri(_authConfigurations.Value.ProtectedApiUrl);
 
                var access_token = await _apiTokenClient.GetApiToken(
                    "ProtectedApi",
                    "scope_used_for_api_in_protected_zone",
                    "api_in_protected_zone_secret"
                );
 
                client.SetBearerToken(access_token);
 
                var response = await client.GetAsync("api/values");
                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var data = JArray.Parse(responseContent);
 
                    return data;
                }
 
                throw new ApplicationException($"Status code: {response.StatusCode}, Error: {response.ReasonPhrase}");
            }
            catch (Exception e)
            {
                throw new ApplicationException($"Exception {e}");
            }
        }
    }
}
```

API token client service sử dụng phương thức ```GetApiToken``` để lấy về access token. Nó yêu cầu tên API, scope và secret để nhận về token.

```csharp
var access_token = await _apiTokenClient.GetApiToken(
    "ProtectedApi",
    "scope_used_for_api_in_protected_zone",
    "api_in_protected_zone_secret"
);
```

Lần đầu tiên khi ASP.NET Core yêu cầu một access token, nó lấy về dữ liệu endpoint đã biết từ server ```Auth``` và tiếp theo nhận access token cho parameters đã cung cấp. Token response được lưu tới một concurrent dictionary, như vậy nó có thể tái sử dụng được.

```csharp
private async Task<AccessTokenItem> getApiToken(string api_name, string api_scope, string secret)
{
    try
    {
        var disco = await HttpClientDiscoveryExtensions.GetDiscoveryDocumentAsync(
            _httpClient, 
            _authConfigurations.Value.StsServer);
 
        if (disco.IsError)
        {
            _logger.LogError($"disco error Status code: {disco.IsError}, Error: {disco.Error}");
            throw new ApplicationException($"Status code: {disco.IsError}, Error: {disco.Error}");
        }
 
        var tokenResponse = await HttpClientTokenRequestExtensions.RequestClientCredentialsTokenAsync(_httpClient, new ClientCredentialsTokenRequest
        {
            Scope = api_scope,
            ClientSecret = secret,
            Address = disco.TokenEndpoint,
            ClientId = api_name
        });
 
        if (tokenResponse.IsError)
        {
            _logger.LogError($"tokenResponse.IsError Status code: {tokenResponse.IsError}, Error: {tokenResponse.Error}");
            throw new ApplicationException($"Status code: {tokenResponse.IsError}, Error: {tokenResponse.Error}");
        }
 
        return new AccessTokenItem
        {
            ExpiresIn = DateTime.UtcNow.AddSeconds(tokenResponse.ExpiresIn),
            AccessToken = tokenResponse.AccessToken
        };
         
    }
    catch (Exception e)
    {
        _logger.LogError($"Exception {e}");
        throw new ApplicationException($"Exception {e}");
    }
}
```

```GetApiToken``` là một phương thức ```public``` cho service này. Phương thức này kiểm tra nếu một access token hợp lệ tồn tại cho API và trả về từ bộ nhớ nếu nó có. Ngược lại, nó nhận một token mới từ **secure token service** với 2 lần gọi HTTP.

```csharp
public async Task<string> GetApiToken(string api_name, string api_scope, string secret)
{
    if (_accessTokens.ContainsKey(api_name))
    {
        var accessToken = _accessTokens.GetValueOrDefault(api_name);
        if (accessToken.ExpiresIn > DateTime.UtcNow)
        {
            return accessToken.AccessToken;
        }
        else
        {
            // remove
            _accessTokens.TryRemove(api_name, out AccessTokenItem accessTokenItem);
        }
    }
 
    _logger.LogDebug($"GetApiToken new from STS for {api_name}");
 
    // add
    var newAccessToken = await getApiToken( api_name,  api_scope,  secret);
    _accessTokens.TryAdd(api_name, newAccessToken);
 
    return newAccessToken.AccessToken;
}
```

Cái gì là sai ở đây ?

####
Service ở trên làm việc tốt, nhưng sẽ như thế nào nếu ứng dụng ASP.NET Core được deploy trên nhiều instance ? Mỗi instance của ứng dụng có access của riêng nó trong bộ nhớ, chúng được cập nhật mỗi lần token hết hạn. Làm thế nào để tôi có thể chia sẻ tokens giữa các instances hoặc thậm chí là các services ?  Hơn nữa hệ thống phần mềm mong muốn giảm thiểu các request ít nhất có thể.

# Sử dụng Cache để giải quyết và cải thiện performance với nhiều instances
Một cache được phân tán (distributed cache) có thể được sử dụng để giải quyết vấn đề này. Cho ví dụ một Redis cache có thể sử dụng để lưu giữ lâu dài access tokens cho các services và được sử dụng trong tất cả các services tín nhiệm, cái mà yêu cầu dữ liệu API bảo mật. Những cái này không phải là token sử dụng cho việc định danh mà là token dùng cho việc giao tiếp giữa service với service. Điều này nên là trong một vùng bảo vệ và nếu bạn lưu access tokens đến một shared cache, tiếp theo phải cẩn thận để điều đó không bị lạm dụng.

###
Service làm việc giống service đã code ở trên ngoại trừ cache được sử dụng thay vì một concurrent dictionnary.
```csharp
using IdentityModel.Client;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Threading.Tasks;
 
namespace WebHybridClient
{
    public class ApiTokenCacheClient
    {
        private readonly ILogger<ApiTokenCacheClient> _logger;
        private readonly HttpClient _httpClient;
        private readonly IOptions<AuthConfigurations> _authConfigurations;
 
        private static readonly Object _lock = new Object();
        private IDistributedCache _cache;
 
        private const int cacheExpirationInDays = 1;
 
        private class AccessTokenItem
        {
            public string AccessToken { get; set; } = string.Empty;
            public DateTime ExpiresIn { get; set; }
        }
 
        public ApiTokenCacheClient(
            IOptions<AuthConfigurations> authConfigurations,
            IHttpClientFactory httpClientFactory,
            ILoggerFactory loggerFactory,
            IDistributedCache cache)
        {
            _authConfigurations = authConfigurations;
            _httpClient = httpClientFactory.CreateClient();
            _logger = loggerFactory.CreateLogger<ApiTokenCacheClient>();
            _cache = cache;
        }
 
        public async Task<string> GetApiToken(string api_name, string api_scope, string secret)
        {
            var accessToken = GetFromCache(api_name);
 
            if (accessToken != null)
            {
                if (accessToken.ExpiresIn > DateTime.UtcNow)
                {
                    return accessToken.AccessToken;
                }
                else
                { 
                    // remove  => NOT Needed for this cache type
                }
            }
 
            _logger.LogDebug($"GetApiToken new from STS for {api_name}");
 
            // add
            var newAccessToken = await getApiToken( api_name,  api_scope,  secret);
            AddToCache(api_name, newAccessToken);
 
            return newAccessToken.AccessToken;
        }
 
        private async Task<AccessTokenItem> getApiToken(string api_name, string api_scope, string secret)
        {
            try
            {
                var disco = await HttpClientDiscoveryExtensions.GetDiscoveryDocumentAsync(
                    _httpClient, 
                    _authConfigurations.Value.StsServer);
 
                if (disco.IsError)
                {
                    _logger.LogError($"disco error Status code: {disco.IsError}, Error: {disco.Error}");
                    throw new ApplicationException($"Status code: {disco.IsError}, Error: {disco.Error}");
                }
 
                var tokenResponse = await HttpClientTokenRequestExtensions.RequestClientCredentialsTokenAsync(_httpClient, new ClientCredentialsTokenRequest
                {
                    Scope = api_scope,
                    ClientSecret = secret,
                    Address = disco.TokenEndpoint,
                    ClientId = api_name
                });
 
                if (tokenResponse.IsError)
                {
                    _logger.LogError($"tokenResponse.IsError Status code: {tokenResponse.IsError}, Error: {tokenResponse.Error}");
                    throw new ApplicationException($"Status code: {tokenResponse.IsError}, Error: {tokenResponse.Error}");
                }
 
                return new AccessTokenItem
                {
                    ExpiresIn = DateTime.UtcNow.AddSeconds(tokenResponse.ExpiresIn),
                    AccessToken = tokenResponse.AccessToken
                };
                 
            }
            catch (Exception e)
            {
                _logger.LogError($"Exception {e}");
                throw new ApplicationException($"Exception {e}");
            }
        }
 
        private void AddToCache(string key, AccessTokenItem accessTokenItem)
        {
            var options = new DistributedCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromDays(cacheExpirationInDays));
 
            lock (_lock)
            {
                _cache.SetString(key, JsonConvert.SerializeObject(accessTokenItem), options);
            }
        }
 
        private AccessTokenItem GetFromCache(string key)
        {
            var item = _cache.GetString(key);
            if (item != null)
            {
                return JsonConvert.DeserializeObject<AccessTokenItem>(item);
            }
 
            return null;
        }
    }
}
```

Điều này cải thiện performance và giảm tổng số lần gọi HTTP cho mỗi request. Token cho API services chỉ được cập nhật lại khi token hết hạn và như vậy sẽ tiết kiệm nhiều lần gọi HTTP.

# Tổng hợp
Bài viết này giới thiệu về các thiết lập, sử dụng, lưu trữ cũng như chia sẻ access token trong ASP.NET Core. Đây là loại access token dùng để giao tiếp đảm bảo giữa các service và ứng dụng, nó khác với token cho việc định danh người dùng. Hy vọng bài viết sẽ giúp ích cho các bạn trong khi áp dụng trong bài toán thực tế.

Bài viết được dịch từ nguồn: [HANDLING ACCESS TOKENS FOR PRIVATE APIS IN ASP.NET CORE](https://damienbod.com/2019/05/10/handling-access-tokens-for-private-apis-in-asp-net-core/)