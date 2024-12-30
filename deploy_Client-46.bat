Del \\192.168.100.51\WebDeploy\DeviceManager\Client\static\js
Del \\192.168.100.51\WebDeploy\DeviceManager\Client\static\css
robocopy build \\192.168.100.51\WebDeploy\DeviceManager\Client /E /IS /XF *.cs *.mp4 /XD factory
