Để có thể đăng nhập bằng apple sẽ có 2 bước. Thứ nhất là bên mobile sẽ tương tác với apple để lấy token xong request lên Ruby API kèm theo token. Thứ hai, sau khi nhận được request bên server sẽ phần tích token để lấy những thông tin cần thiết và thực hiện đăng nhập.
### 1. Mobile app tương tác với bên apple để lấy token
Để đăng nhập với apple trước hết bạn cần vào dự án `Project -> Signing & Capabilities` xong bất lên `Sign in With Apple` .
Và sau đây là những dòng code để lấy apple token :
```
//
//  AppleSignInViewController.swift
//
//  Created by Rasmus Styrk on 26/11/2019.
//  Copyright © 2019 House of Code ApS. All rights reserved.
//
import UIKit
import AuthenticationServices

class AppleSignInViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // TODO: Add button to call self.inititateAppleLogin()
    }
    
    func inititateAppleLogin() {
        if #available(iOS 13.0, *) {
            let appleIDProvider = ASAuthorizationAppleIDProvider()
            let request = appleIDProvider.createRequest()
            request.requestedScopes = [.fullName, .email]
            
            let authorizationController = ASAuthorizationController(authorizationRequests: [request])
            authorizationController.delegate = self
            authorizationController.presentationContextProvider = self
            authorizationController.performRequests()
        } else {
            // TODO: Show error?
        }
    }
    
    func validateWithServer(name: String, userIdentity: String, jwt: String) {
        // TODO: Send off userIdeneity, name and jwtToken to server for validation
        print("User: \(userIdentity), with name: \(name) and jwt token: \(jwt)")
    }
}

@available(iOS 13.0, *)
extension AppleSignInViewController: ASAuthorizationControllerDelegate {
    func authorizationController(controller: ASAuthorizationController, didCompleteWithAuthorization authorization: ASAuthorization) {
        if let appleIDCredential = authorization.credential as? ASAuthorizationAppleIDCredential {
            
            let userIdentity = appleIDCredential.user
            var name: String = "No Name"
            
            if let fullName = appleIDCredential.fullName {
                var nameComponents: [String] = []
                if let givenName = fullName.givenName {
                    nameComponents.append(givenName)
                }
                
                if let familyName = fullName.familyName {
                    nameComponents.append(familyName)
                }
                
                if nameComponents.count > 0 {
                    name = nameComponents.joined(separator: " ")
                }
            }
            
            if let jwtData = appleIDCredential.identityToken,
                let jwtToken = String(data: jwtData, encoding: .utf8) {
                self.validateWithServer(name: name, userIdentity: userIdentity, jwt: jwtToken)
            } else {
                // Show error? Missing jwt token
            }
        }
    }
    
    func authorizationController(controller: ASAuthorizationController, didCompleteWithError error: Error) {
        // Show error
    }
}

@available(iOS 13.0, *)
extension AppleSignInViewController: ASAuthorizationControllerPresentationContextProviding {
    func presentationAnchor(for controller: ASAuthorizationController) -> ASPresentationAnchor {
        return self.view.window!
    }
}
```
Chý ý : Trong token sẽ không bao gồm tên của user. Nếu server cần sử dụng đến tên của user thì bên mobile sẽ cần gửi lên.
### 2. Xử lý đăng nhập ở trên server side
Token gửi lên sẽ là JWT (Json Web Token) . Để phần tích được JWT đơn giản làm mình có thể sử dụng "jwt" gem. 
```
gem 'jwt'
```
chạy `bundle install` . 

Code dưới đây sẽ cho bạn lấy được những thông tin của user từ token
```
class AppleSignInController < ApplicationController
  APPLE_PEM_URL = "https://appleid.apple.com/auth/keys"

  # /api/apple/validate
  def validate

    name = params[:name]
    userIdentity = params[:userIdentity]
    jwt = params[:jwt]

    begin
      header_segment = JSON.parse(Base64.decode64(jwt.split(".").first))
      alg = header_segment["alg"]
      kid = header_segment["kid"]

      apple_response = Net::HTTP.get(URI.parse(APPLE_PEM_URL))
      apple_certificate = JSON.parse(apple_response)

      keyHash = ActiveSupport::HashWithIndifferentAccess.new(apple_certificate["keys"].select {|key| key["kid"] == kid}[0])
      jwk = JWT::JWK.import(keyHash)

      token_data = JWT.decode(jwt, jwk.public_key, true, {algorithm: alg})[0]

      if token_data.has_key?("sub") && token_data.has_key?("email") && userIdentity == token_data["sub"]
        puts "Name: " + name + " is validated."
        # TODO: Create a user in ur rails app and generate an auth token for future requests. Remember to use the "userIdentity" as the
        # primary user key - this because the email address will change all the time

        # TODO: Render response to app
      else
        # TODO: Render error to app
      end
    rescue StandardError => e
      # TODO: Render error to app
    end
  end
end
```

Nếu bạn có gặp vấn để Undefined JWK bạn có thể thử sử dụng cách này 
```
class AppleSignInController < ApplicationController
  APPLE_PEM_URL = "https://appleid.apple.com/auth/keys"

  # /api/apple/validate
  def validate

    name = params[:name]
    userIdentity = params[:userIdentity]
    jwt = params[:jwt]

    begin
      header_segment = JSON.parse(Base64.decode64(jwt.split(".").first))
      alg = header_segment["alg"]
      kid = header_segment["kid"]

      apple_response = Net::HTTP.get(URI.parse(APPLE_PEM_URL))
      apple_certificate = JSON.parse(apple_response)

      keyHash = ActiveSupport::HashWithIndifferentAccess.new(apple_certificate["keys"].select {|key| key["kid"] == kid}[0])
      
      key = OpenSSL::PKey::RSA.new
      key.e = OpenSSL::BN.new(UrlSafeBase64.decode64(keyHash["e"]), 2)
      key.n = OpenSSL::BN.new(UrlSafeBase64.decode64(keyHash["n"]), 2)

      token_data = JWT.decode(jwt, jwk.public_key, true, {algorithm: alg})[0]

      if token_data.has_key?("sub") && token_data.has_key?("email") && userIdentity == token_data["sub"]
        puts "Name: " + name + " is validated."
        # TODO: Create a user in ur rails app and generate an auth token for future requests. Remember to use the "userIdentity" as the
        # primary user key - this because the email address will change all the time

        # TODO: Render response to app
      else
        # TODO: Render error to app
      end
    rescue StandardError => e
      # TODO: Render error to app
    end
  end
end
```

### References
* https://styrk.medium.com/handle-apple-sign-in-on-the-server-ruby-on-rails-78f0d3b4991d
* https://github.com/jwt/ruby-jwt