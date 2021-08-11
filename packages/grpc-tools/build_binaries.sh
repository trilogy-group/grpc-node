#!/bin/bash
# Copyright 2019 gRPC authors.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

set -e

uname -a

cd $(dirname $0)
base=$(pwd)
protobuf_base=$base/deps/protobuf

tools_version=$(jq '.version' < package.json | tr -d '"')

# Note: artifacts should not be output in the package directory
out_dir=$base/../../artifacts/grpc-tools/v$tools_version
pkg_dir=$base/node-package
mkdir -p "$out_dir"

platform=linux
arch_list=( aarch64 )

for arch in "${arch_list[@]}"; do
  case $arch in
    ia32)
      toolchain_flag=-DCMAKE_TOOLCHAIN_FILE=linux_32bit.toolchain.cmake
      ;;
    aarch64)
      toolchain_flag=-DCMAKE_TOOLCHAIN_FILE=linux_aarch64.toolchain.cmake
      ;;
  esac
  rm -f $base/build/bin/protoc
  rm -f $base/build/bin/grpc_node_plugin
  rm -f $base/CMakeCache.txt
  rm -rf $base/CMakeFiles
  rm -f $protobuf_base/CMakeCache.txt
  rm -rf $protobuf_base/CMakeFiles
  cmake $toolchain_flag . && cmake --build . --target clean && cmake --build . -- -j 12
  mkdir -p "$base/build/bin"
  cp -L $protobuf_base/protoc $base/build/bin/protoc
  cp $base/grpc_node_plugin $base/build/bin/
  file $base/build/bin/*
  cd $base/build
#  tar -czf "$out_dir/$platform-$arch.tar.gz" bin/
  cp bin/* $pkg_dir/bin
  cd $pkg_dir
  tar czf "$out_dir/node-package-$platform-$arch.tar.gz" .
  cd $base
done