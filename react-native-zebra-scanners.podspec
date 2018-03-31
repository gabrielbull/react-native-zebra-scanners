require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-zebra-scanners"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.author       = package["author"]["name"]'
  s.license      = package["license"]
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/totemacoustic/react-native-zebra-scanners", :tag => "#{s.version}" }
  s.source_files  = "ios/*.{h,m}"
  s.dependency "React"
end
