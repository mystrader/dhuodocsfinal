/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "819105cc2ec135be26024bbc3bb82caf"
  },
  {
    "url": "assets/css/0.styles.80991633.css",
    "revision": "8b22fd5879ad00b837aa9801c7e83b88"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.111b7385.js",
    "revision": "d0f03a7dacac3258c1f96825cc665efa"
  },
  {
    "url": "assets/js/11.96eb77db.js",
    "revision": "4460520723c92ee13cbc423aa56eb0fd"
  },
  {
    "url": "assets/js/12.87eb4527.js",
    "revision": "aed967fc70780b2da941de920644e4b0"
  },
  {
    "url": "assets/js/13.10b53a56.js",
    "revision": "3281ae4f7629d5989e51748bc856ae67"
  },
  {
    "url": "assets/js/14.a758d017.js",
    "revision": "6c2ec0a94c66716c1d5d6a6e833a4755"
  },
  {
    "url": "assets/js/15.1608b7dc.js",
    "revision": "ba74808d065e6ead0ed2f037b0959519"
  },
  {
    "url": "assets/js/16.6c29bbd0.js",
    "revision": "796e4974f4d5de3f3e2dd23b9f3c4016"
  },
  {
    "url": "assets/js/17.7482553f.js",
    "revision": "8c4572431272d9bf410bd649ccb204ab"
  },
  {
    "url": "assets/js/18.bce252a8.js",
    "revision": "21fdec1c357af9530820a77b3b441940"
  },
  {
    "url": "assets/js/19.92108bd3.js",
    "revision": "f327d50743308b6c2c81d0fb7268081d"
  },
  {
    "url": "assets/js/2.3e8642a2.js",
    "revision": "788d20c655b24f82f689e750d7448bd9"
  },
  {
    "url": "assets/js/20.e8b0308f.js",
    "revision": "9ac279c35f64e67f168b2399b9e29005"
  },
  {
    "url": "assets/js/21.35d8b9e2.js",
    "revision": "78f3f073432604ae0ce8e0396177967d"
  },
  {
    "url": "assets/js/22.ba7ebc2f.js",
    "revision": "8d83c4309e87021dfdb6ae04d5fe053e"
  },
  {
    "url": "assets/js/23.f2cd6189.js",
    "revision": "3fcb29c69645cec417094cf1ec771441"
  },
  {
    "url": "assets/js/3.80700dba.js",
    "revision": "1faaa0c7e68d17aa6dad3f515b2bdcef"
  },
  {
    "url": "assets/js/4.10668c80.js",
    "revision": "8119cddc2ae1ea18dffedd82d235a038"
  },
  {
    "url": "assets/js/5.bd26d954.js",
    "revision": "f23ea1c92af03569c96f40082a0f98ac"
  },
  {
    "url": "assets/js/6.6a41b796.js",
    "revision": "90d96476c7c0e275bdda5a36b1585f69"
  },
  {
    "url": "assets/js/7.0dd21078.js",
    "revision": "6270365f9b5a357db41b5c04f20184f1"
  },
  {
    "url": "assets/js/8.82f4b19a.js",
    "revision": "63bd013453a08c4f1f79a8e92f09044a"
  },
  {
    "url": "assets/js/9.2dd29679.js",
    "revision": "8289644fa72d131b22bba1bb544d9b5f"
  },
  {
    "url": "assets/js/app.4ea38f55.js",
    "revision": "c62af1ca5a408ad484f25af8db057f72"
  },
  {
    "url": "en/index.html",
    "revision": "1aae9e05f13436e500757698283874e6"
  },
  {
    "url": "en/links/ambientesdhuo.html",
    "revision": "d9a548ed34362bdb7d8be60c3f1ec9d5"
  },
  {
    "url": "en/links/index.html",
    "revision": "8bd6d37218c89bcc0ff95cde931548b5"
  },
  {
    "url": "en/manual/adb2c.html",
    "revision": "8882195334dea6785b802c78428a1a5b"
  },
  {
    "url": "en/manual/adb2cazure.html",
    "revision": "48e67163c1f08c9a85bd8166a27406b0"
  },
  {
    "url": "en/manual/index.html",
    "revision": "8cc93ae7a84d610ec06a181dea87eac1"
  },
  {
    "url": "index.html",
    "revision": "c64de0368231c6fc715e7c125d0b53e3"
  },
  {
    "url": "links/ambientesdhuo.html",
    "revision": "244527f0c7badfd96a0c4783d8ede06f"
  },
  {
    "url": "links/index.html",
    "revision": "e0d123e21f7f0c92211747ca41370b8a"
  },
  {
    "url": "links/sobrevuepress.html",
    "revision": "5cbd811273041a3aec9853324d3c3700"
  },
  {
    "url": "manual/adb2c.html",
    "revision": "faf1956b1d11815e4ebe3ae365ce169e"
  },
  {
    "url": "manual/adb2cazure.html",
    "revision": "d92bb48b1840d449a53261e62e9ab6cf"
  },
  {
    "url": "manual/index.html",
    "revision": "f5183460ab3be8f9d752b496453ee62d"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
