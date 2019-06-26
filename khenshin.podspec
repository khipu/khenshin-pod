Pod::Spec.new do |s|

  s.name         = "khenshin"
  s.version      = "1.531"
  s.summary      = "khenshin es una biblioteca que convierte sitios web en APIs read-write."
  s.description  = <<-DESC
  		khenshin es una biblioteca desarrollada por khipu.com, se utiliza para mejorar la experiencia de pago de todos los medios de pago soportados en khipu.com y para otros procesos originalmente Web.
                   DESC
  s.homepage     = "https://khipu.com"
  s.license      = {
    :type => 'Copyright',
    :text => <<-LICENSE
      Copyright 2019 khipu SpA. All rights reserved.
      LICENSE
  }
  s.author             = { "Khipu SpA" => "support@khipu.com" }
  s.platform     = :ios
  s.source       = { :git => "https://bitbucket.org/khipu/khenshin-pod.git", :tag => "#{s.version}" }
  s.vendored_frameworks = 'Products/khenshin.framework'
  s.resource = "Products/khenshin.bundle"
  s.library = "xml2"
  s.requires_arc = true
  s.xcconfig  =  { 'LIBRARY_SEARCH_PATHS' => '"$(PODS_ROOT)/khenshin"',
                   'HEADER_SEARCH_PATHS' => '"${PODS_ROOT}/Headers/khenshin"' }
  s.dependency "AFNetworking", "3.1.0"
  s.dependency "IQKeyboardManager", "5.0.3"
  s.dependency "JSONModel", "1.7.0"
  s.dependency "PPTopMostController", "0.0.1"
  s.dependency "RaptureXML", "1.0.1"
  s.dependency "TTTAttributedLabel", "2.0.0"
  s.dependency "Toast", "3.1.0"
  s.dependency "ActionSheetPicker-3.0", "2.3.0"
  s.dependency "BEMCheckBox", "1.4.1"
  s.dependency "AFNetworking-Synchronous/3.x", "1.1.0"
  s.dependency "FMDB", "2.7.5"
  s.dependency "AFNetworkActivityLogger", "3.0.0"
end
