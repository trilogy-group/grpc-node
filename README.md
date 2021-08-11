This is a fork of github.com/grpc/grpc-node purely for building binaries and local packages for arm64

Building:
cd packages/grpc-tools
./build_binaries.sh

This creates a package .tar.gz file in artifacts/grpc-tools/vx.x.x/node-package-linux-aarch64.tar.gz

Using the package:
Unpack anywhere on your system

To add as a depencency:
If you can use absolute paths, can be installed in project sub-folders:
  yarn add file:/path/to/package
If  you can only use relative paths, needs to be installed globally:
  yarn add -W file:rel/path/to/package