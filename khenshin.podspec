Pod::Spec.new do |s|

  s.name         = "khenshin"
  s.version      = "1.760"
  s.summary      = "khenshin es una biblioteca que convierte sitios web en APIs read-write."
  s.description  = <<-DESC
  		khenshin es una biblioteca desarrollada por khipu.com, se utiliza para mejorar la experiencia de pago de todos los medios de pago soportados en khipu.com y para otros procesos originalmente Web.
                   DESC
  s.homepage     = "https://khipu.com"
  s.license      = {
    :type => 'Copyright',
    :text => <<-LICENSE
      Copyright 2020 khipu SpA. All rights reserved.
      LICENSE
  }
  s.author             = { "Khipu SpA" => "support@khipu.com" }
  s.platform     = :ios
  s.source       = { :git => "https://github.com/khipu/khenshin-pod.git", :tag => "#{s.version}" }
  s.ios.deployment_target = '12.0'
  s.vendored_frameworks = 'Products/khenshin.framework'
  s.resource = "Products/khenshin.bundle"
  s.library = "xml2"
  s.requires_arc = true
  s.xcconfig  =  { 'LIBRARY_SEARCH_PATHS' => '"$(PODS_ROOT)/khenshin"',
                   'HEADER_SEARCH_PATHS' => '"${PODS_ROOT}/Headers/khenshin"' }
  s.dependency "AFNetworking", "4.0.1"
  s.dependency "ActionSheetPicker-3.0", "2.7.1"
  s.dependency "FMDB", "2.7.12"
  s.dependency "IQKeyboardManager", "6.5.19"
  s.pod_target_xcconfig = { 'ONLY_ACTIVE_ARCH' => 'YES' }
end
