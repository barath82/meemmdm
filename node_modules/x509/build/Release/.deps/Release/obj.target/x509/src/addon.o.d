cmd_Release/obj.target/x509/src/addon.o := g++ '-DVERSION="0.3.3"' '-DNODE_GYP_MODULE_NAME=x509' '-DUSING_UV_SHARED=1' '-DUSING_V8_SHARED=1' '-DV8_DEPRECATION_WARNINGS=1' '-D_LARGEFILE_SOURCE' '-D_FILE_OFFSET_BITS=64' '-DBUILDING_NODE_EXTENSION' -I/home/scs/.node-gyp/9.5.0/include/node -I/home/scs/.node-gyp/9.5.0/src -I/home/scs/.node-gyp/9.5.0/deps/uv/include -I/home/scs/.node-gyp/9.5.0/deps/v8/include -I../include -I../../nan -I/home/scs/.node-gyp/9.5.0/deps/openssl/openssl/include  -fPIC -pthread -Wall -Wextra -Wno-unused-parameter -m64 -O3 -fno-omit-frame-pointer -fno-rtti -fno-exceptions -std=gnu++0x -MMD -MF ./Release/.deps/Release/obj.target/x509/src/addon.o.d.raw   -c -o Release/obj.target/x509/src/addon.o ../src/addon.cc
Release/obj.target/x509/src/addon.o: ../src/addon.cc ../include/addon.h \
 /home/scs/.node-gyp/9.5.0/include/node/node.h \
 /home/scs/.node-gyp/9.5.0/include/node/v8.h \
 /home/scs/.node-gyp/9.5.0/include/node/v8-version.h \
 /home/scs/.node-gyp/9.5.0/include/node/v8config.h \
 /home/scs/.node-gyp/9.5.0/include/node/v8-platform.h \
 /home/scs/.node-gyp/9.5.0/include/node/node_version.h \
 /home/scs/.node-gyp/9.5.0/include/node/v8.h ../include/x509.h \
 /home/scs/.node-gyp/9.5.0/include/node/node_version.h ../../nan/nan.h \
 /home/scs/.node-gyp/9.5.0/include/node/uv.h \
 /home/scs/.node-gyp/9.5.0/include/node/uv-errno.h \
 /home/scs/.node-gyp/9.5.0/include/node/uv-version.h \
 /home/scs/.node-gyp/9.5.0/include/node/uv-unix.h \
 /home/scs/.node-gyp/9.5.0/include/node/uv-threadpool.h \
 /home/scs/.node-gyp/9.5.0/include/node/uv-linux.h \
 /home/scs/.node-gyp/9.5.0/include/node/node_buffer.h \
 /home/scs/.node-gyp/9.5.0/include/node/node.h \
 /home/scs/.node-gyp/9.5.0/include/node/node_object_wrap.h \
 ../../nan/nan_callbacks.h ../../nan/nan_callbacks_12_inl.h \
 ../../nan/nan_maybe_43_inl.h ../../nan/nan_converters.h \
 ../../nan/nan_converters_43_inl.h ../../nan/nan_new.h \
 ../../nan/nan_implementation_12_inl.h ../../nan/nan_persistent_12_inl.h \
 ../../nan/nan_weak.h ../../nan/nan_object_wrap.h \
 ../../nan/nan_typedarray_contents.h \
 /home/scs/.node-gyp/9.5.0/include/node/openssl/asn1.h \
 /home/scs/.node-gyp/9.5.0/include/node/openssl/e_os2.h \
 /home/scs/.node-gyp/9.5.0/include/node/openssl/opensslconf.h \
 /home/scs/.node-gyp/9.5.0/include/node/openssl/./archs/linux-x86_64/opensslconf.h \
 /home/scs/.node-gyp/9.5.0/include/node/openssl/bio.h \
 /home/scs/.node-gyp/9.5.0/include/node/openssl/crypto.h \
 /home/scs/.node-gyp/9.5.0/include/node/openssl/stack.h \
 /home/scs/.node-gyp/9.5.0/include/node/openssl/safestack.h \
 /home/scs/.node-gyp/9.5.0/include/node/openssl/opensslv.h \
 /home/scs/.node-gyp/9.5.0/include/node/openssl/ossl_typ.h \
 /home/scs/.node-gyp/9.5.0/include/node/openssl/symhacks.h \
 /home/scs/.node-gyp/9.5.0/include/node/openssl/bn.h \
 /home/scs/.node-gyp/9.5.0/include/node/openssl/err.h \
 /home/scs/.node-gyp/9.5.0/include/node/openssl/lhash.h \
 /home/scs/.node-gyp/9.5.0/include/node/openssl/pem.h \
 /home/scs/.node-gyp/9.5.0/include/node/openssl/evp.h \
 /home/scs/.node-gyp/9.5.0/include/node/openssl/objects.h \
 /home/scs/.node-gyp/9.5.0/include/node/openssl/obj_mac.h \
 /home/scs/.node-gyp/9.5.0/include/node/openssl/x509.h \
 /home/scs/.node-gyp/9.5.0/include/node/openssl/buffer.h \
 /home/scs/.node-gyp/9.5.0/include/node/openssl/ec.h \
 /home/scs/.node-gyp/9.5.0/include/node/openssl/ecdsa.h \
 /home/scs/.node-gyp/9.5.0/include/node/openssl/ecdh.h \
 /home/scs/.node-gyp/9.5.0/include/node/openssl/rsa.h \
 /home/scs/.node-gyp/9.5.0/include/node/openssl/dsa.h \
 /home/scs/.node-gyp/9.5.0/include/node/openssl/dh.h \
 /home/scs/.node-gyp/9.5.0/include/node/openssl/sha.h \
 /home/scs/.node-gyp/9.5.0/include/node/openssl/x509_vfy.h \
 /home/scs/.node-gyp/9.5.0/include/node/openssl/pkcs7.h \
 /home/scs/.node-gyp/9.5.0/include/node/openssl/pem2.h \
 /home/scs/.node-gyp/9.5.0/include/node/openssl/x509v3.h \
 /home/scs/.node-gyp/9.5.0/include/node/openssl/conf.h
../src/addon.cc:
../include/addon.h:
/home/scs/.node-gyp/9.5.0/include/node/node.h:
/home/scs/.node-gyp/9.5.0/include/node/v8.h:
/home/scs/.node-gyp/9.5.0/include/node/v8-version.h:
/home/scs/.node-gyp/9.5.0/include/node/v8config.h:
/home/scs/.node-gyp/9.5.0/include/node/v8-platform.h:
/home/scs/.node-gyp/9.5.0/include/node/node_version.h:
/home/scs/.node-gyp/9.5.0/include/node/v8.h:
../include/x509.h:
/home/scs/.node-gyp/9.5.0/include/node/node_version.h:
../../nan/nan.h:
/home/scs/.node-gyp/9.5.0/include/node/uv.h:
/home/scs/.node-gyp/9.5.0/include/node/uv-errno.h:
/home/scs/.node-gyp/9.5.0/include/node/uv-version.h:
/home/scs/.node-gyp/9.5.0/include/node/uv-unix.h:
/home/scs/.node-gyp/9.5.0/include/node/uv-threadpool.h:
/home/scs/.node-gyp/9.5.0/include/node/uv-linux.h:
/home/scs/.node-gyp/9.5.0/include/node/node_buffer.h:
/home/scs/.node-gyp/9.5.0/include/node/node.h:
/home/scs/.node-gyp/9.5.0/include/node/node_object_wrap.h:
../../nan/nan_callbacks.h:
../../nan/nan_callbacks_12_inl.h:
../../nan/nan_maybe_43_inl.h:
../../nan/nan_converters.h:
../../nan/nan_converters_43_inl.h:
../../nan/nan_new.h:
../../nan/nan_implementation_12_inl.h:
../../nan/nan_persistent_12_inl.h:
../../nan/nan_weak.h:
../../nan/nan_object_wrap.h:
../../nan/nan_typedarray_contents.h:
/home/scs/.node-gyp/9.5.0/include/node/openssl/asn1.h:
/home/scs/.node-gyp/9.5.0/include/node/openssl/e_os2.h:
/home/scs/.node-gyp/9.5.0/include/node/openssl/opensslconf.h:
/home/scs/.node-gyp/9.5.0/include/node/openssl/./archs/linux-x86_64/opensslconf.h:
/home/scs/.node-gyp/9.5.0/include/node/openssl/bio.h:
/home/scs/.node-gyp/9.5.0/include/node/openssl/crypto.h:
/home/scs/.node-gyp/9.5.0/include/node/openssl/stack.h:
/home/scs/.node-gyp/9.5.0/include/node/openssl/safestack.h:
/home/scs/.node-gyp/9.5.0/include/node/openssl/opensslv.h:
/home/scs/.node-gyp/9.5.0/include/node/openssl/ossl_typ.h:
/home/scs/.node-gyp/9.5.0/include/node/openssl/symhacks.h:
/home/scs/.node-gyp/9.5.0/include/node/openssl/bn.h:
/home/scs/.node-gyp/9.5.0/include/node/openssl/err.h:
/home/scs/.node-gyp/9.5.0/include/node/openssl/lhash.h:
/home/scs/.node-gyp/9.5.0/include/node/openssl/pem.h:
/home/scs/.node-gyp/9.5.0/include/node/openssl/evp.h:
/home/scs/.node-gyp/9.5.0/include/node/openssl/objects.h:
/home/scs/.node-gyp/9.5.0/include/node/openssl/obj_mac.h:
/home/scs/.node-gyp/9.5.0/include/node/openssl/x509.h:
/home/scs/.node-gyp/9.5.0/include/node/openssl/buffer.h:
/home/scs/.node-gyp/9.5.0/include/node/openssl/ec.h:
/home/scs/.node-gyp/9.5.0/include/node/openssl/ecdsa.h:
/home/scs/.node-gyp/9.5.0/include/node/openssl/ecdh.h:
/home/scs/.node-gyp/9.5.0/include/node/openssl/rsa.h:
/home/scs/.node-gyp/9.5.0/include/node/openssl/dsa.h:
/home/scs/.node-gyp/9.5.0/include/node/openssl/dh.h:
/home/scs/.node-gyp/9.5.0/include/node/openssl/sha.h:
/home/scs/.node-gyp/9.5.0/include/node/openssl/x509_vfy.h:
/home/scs/.node-gyp/9.5.0/include/node/openssl/pkcs7.h:
/home/scs/.node-gyp/9.5.0/include/node/openssl/pem2.h:
/home/scs/.node-gyp/9.5.0/include/node/openssl/x509v3.h:
/home/scs/.node-gyp/9.5.0/include/node/openssl/conf.h:
