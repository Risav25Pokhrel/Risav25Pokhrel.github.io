'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {".git/COMMIT_EDITMSG": "8bc3e18c25a575ae6f4a468c6fd4f8cf",
".git/config": "928237735ce6a5b1eebaa0d271d7b35e",
".git/description": "a0a7c3fff21f2aea3cfa1d0316dd816c",
".git/FETCH_HEAD": "c7b0655361c001463c87ef3e3e385016",
".git/HEAD": "cf7dd3ce51958c5f13fece957cc417fb",
".git/hooks/applypatch-msg.sample": "ce562e08d8098926a3862fc6e7905199",
".git/hooks/commit-msg.sample": "579a3c1e12a1e74a98169175fb913012",
".git/hooks/fsmonitor-watchman.sample": "a0b2633a2c8e97501610bd3f73da66fc",
".git/hooks/post-update.sample": "2b7ea5cee3c49ff53d41e00785eb974c",
".git/hooks/pre-applypatch.sample": "054f9ffb8bfe04a599751cc757226dda",
".git/hooks/pre-commit.sample": "305eadbbcd6f6d2567e033ad12aabbc4",
".git/hooks/pre-merge-commit.sample": "39cb268e2a85d436b9eb6f47614c3cbc",
".git/hooks/pre-push.sample": "2c642152299a94e05ea26eae11993b13",
".git/hooks/pre-rebase.sample": "56e45f2bcbc8226d2b4200f7c46371bf",
".git/hooks/pre-receive.sample": "2ad18ec82c20af7b5926ed9cea6aeedd",
".git/hooks/prepare-commit-msg.sample": "2b5c047bdb474555e1787db32b2d2fc5",
".git/hooks/push-to-checkout.sample": "c7ab00c7784efeadad3ae9b228d4b4db",
".git/hooks/sendemail-validate.sample": "4d67df3a8d5c98cb8565c07e42be0b04",
".git/hooks/update.sample": "647ae13c682f7827c22f5fc08a03674e",
".git/index": "b0eeb79ef30fa727e67c421d931dd532",
".git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3",
".git/logs/HEAD": "29c375b1b67b5daf3f95516393300d29",
".git/logs/refs/heads/main": "29c375b1b67b5daf3f95516393300d29",
".git/logs/refs/remotes/origin/HEAD": "dab4bb75f78da340a5951b8f9070ba9f",
".git/logs/refs/remotes/origin/main": "a621430e36a0828858af2d8dd160c98d",
".git/objects/00/09c6512631a71a71cefccaba42d9e6af5210df": "1292ecd577ac2bbfa74762bf115140a0",
".git/objects/11/b44bc4debf554718c1c615681c2d742e9e2dfd": "b963d00c239bcda6e0a5c83337b5e4e5",
".git/objects/20/3a3ff5cc524ede7e585dff54454bd63a1b0f36": "4b23a88a964550066839c18c1b5c461e",
".git/objects/29/f22f56f0c9903bf90b2a78ef505b36d89a9725": "e85914d97d264694217ae7558d414e81",
".git/objects/3b/baa167aa76e7309052dbf98bfb29f658097970": "2a9377bee87299c5fb33898fda2d4ea6",
".git/objects/3d/d8cf5a970f7f8487908119d4b02cffcfd76dd3": "bc8d2088a9578828cd7310c12a148ba4",
".git/objects/4d/bf9da7bcce5387354fe394985b98ebae39df43": "534c022f4a0845274cbd61ff6c9c9c33",
".git/objects/4f/40dabe4430b4d7288c6ae92d8fc3e17cf8e410": "7c1843130f2c3787540ded5445c7793a",
".git/objects/4f/fbe6ec4693664cb4ff395edf3d949bd4607391": "2beb9ca6c799e0ff64e0ad79f9e55e69",
".git/objects/65/9c209b68b1e731f6df94e3ab9e736f4125558a": "f3de06c0e9c2bbb76fd2089823272e3f",
".git/objects/6e/6d03540c8e40f5274b00c47a91eb5f954b814c": "c57ede933ac6e08f7e724133cd909e39",
".git/objects/7a/6c1911dddaea52e2dbffc15e45e428ec9a9915": "f1dee6885dc6f71f357a8e825bda0286",
".git/objects/80/c507f7a8dbe6d6a42e631ad2e271b4e6e38da7": "d8af876fe3731775f13e519c7bf1df57",
".git/objects/82/039646eae58381941a128edf3dd254c98a2961": "ba71a4099c57c699fe2ac9b609735b8e",
".git/objects/98/0d49437042d93ffa850a60d02cef584a35a85c": "8e18e4c1b6c83800103ff097cc222444",
".git/objects/9b/3ef5f169177a64f91eafe11e52b58c60db3df2": "91d370e4f73d42e0a622f3e44af9e7b1",
".git/objects/9e/3b4630b3b8461ff43c272714e00bb47942263e": "accf36d08c0545fa02199021e5902d52",
".git/objects/a0/1b8ecb5fcd65183dc10772881bf9e0685d20fd": "a318bc33647d3493b415dc752d8b922f",
".git/objects/aa/da1c3057ca768b74baa27f80cbe820ca214dd9": "9cd16423ca556c0e1d3e024ea33068de",
".git/objects/ae/58148fddf663ac3c0af1d7d3539b478e9d5b06": "511f96cd2267d58928e4d5aa9dbcf3a9",
".git/objects/b6/b8806f5f9d33389d53c2868e6ea1aca7445229": "b14016efdbcda10804235f3a45562bbf",
".git/objects/bd/b7c7c87b6311a77e18f959649b81a9bfe1e902": "4316510ffec9b3ae181fb0a747387c30",
".git/objects/c4/016f7d68c0d70816a0c784867168ffa8f419e1": "fdf8b8a8484741e7a3a558ed9d22f21d",
".git/objects/ca/3bba02c77c467ef18cffe2d4c857e003ad6d5d": "316e3d817e75cf7b1fd9b0226c088a43",
".git/objects/da/ac757c73af936adaff8c117b5cd3d0c0232ac1": "7fa1da09e3ff814b04e41bfc2adc1854",
".git/objects/df/32c37976b1c92bb88500b52639298f2278421c": "9f12caa47a05f73a6c4c2dbd507844ee",
".git/objects/e3/e9ee754c75ae07cc3d19f9b8c1e656cc4946a1": "14066365125dcce5aec8eb1454f0d127",
".git/objects/ed/b55d4deb8363b6afa65df71d1f9fd8c7787f22": "886ebb77561ff26a755e09883903891d",
".git/objects/f0/f771cc3752d7430320de0e238649dcc08c8fc0": "09bae8836d0164db5c84184005583518",
".git/objects/f7/8ec674677cc9d86b291ffbb65f9f83a3fb81f1": "2b28682bc927b0556f874e3fa7e0744a",
".git/objects/f7/dea55fa1dc48da6402c00fb655b1e334632d9b": "3558ce388cce0acfbb1556e2d7a6cb43",
".git/objects/fc/5462512392f387e6eab5e8d30af8e128869046": "5e1a9255e7ce5ce61d520d26921cc7c3",
".git/objects/fd/b3be5c8726147042a1cb39328d6b54c72f6dab": "946d966ad44f4d16db1ab9ae485882f1",
".git/objects/fe/3b987e61ed346808d9aa023ce3073530ad7426": "dc7db10bf25046b27091222383ede515",
".git/objects/pack/pack-2d587859546b32df95ffd64978fd0343202d5ad7.idx": "3298fbe7f0aeb3dbbbf4e01cd4070a39",
".git/objects/pack/pack-2d587859546b32df95ffd64978fd0343202d5ad7.pack": "57e5e14367a698c80980b3f7f6e1f32f",
".git/objects/pack/pack-2d587859546b32df95ffd64978fd0343202d5ad7.rev": "0eb35b5ea2d6f3a76920eb2b367d5095",
".git/ORIG_HEAD": "e0c4338577f65b85569976055e7f1c20",
".git/packed-refs": "eb9607fc463da987b0fb4e82dcf4dc3f",
".git/refs/heads/main": "e0c4338577f65b85569976055e7f1c20",
".git/refs/remotes/origin/HEAD": "98b16e0b650190870f1b40bc8f4aec4e",
".git/refs/remotes/origin/main": "e0c4338577f65b85569976055e7f1c20",
"404.html": "5272be3f4c6192868bc396a1a65ebc89",
"assets/AssetManifest.bin": "8de54c56955dccaac6d2b7edd362d755",
"assets/AssetManifest.bin.json": "8087b44f71a9ddafa86c21fed6d74d22",
"assets/AssetManifest.json": "cebb105327a4fd17fcc436239b28365e",
"assets/FontManifest.json": "698915588511ec62764014e8ff3e7341",
"assets/fonts/MaterialIcons-Regular.otf": "e62e7693d6a822df009bdc568050e6ca",
"assets/NOTICES": "65b130a49e4f181c94ff5df12e4fa4f7",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_AMS-Regular.ttf": "657a5353a553777e270827bd1630e467",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Caligraphic-Bold.ttf": "a9c8e437146ef63fcd6fae7cf65ca859",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Caligraphic-Regular.ttf": "7ec92adfa4fe03eb8e9bfb60813df1fa",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Fraktur-Bold.ttf": "46b41c4de7a936d099575185a94855c4",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Fraktur-Regular.ttf": "dede6f2c7dad4402fa205644391b3a94",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Main-Bold.ttf": "9eef86c1f9efa78ab93d41a0551948f7",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Main-BoldItalic.ttf": "e3c361ea8d1c215805439ce0941a1c8d",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Main-Italic.ttf": "ac3b1882325add4f148f05db8cafd401",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Main-Regular.ttf": "5a5766c715ee765aa1398997643f1589",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Math-BoldItalic.ttf": "946a26954ab7fbd7ea78df07795a6cbc",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Math-Italic.ttf": "a7732ecb5840a15be39e1eda377bc21d",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_SansSerif-Bold.ttf": "ad0a28f28f736cf4c121bcb0e719b88a",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_SansSerif-Italic.ttf": "d89b80e7bdd57d238eeaa80ed9a1013a",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_SansSerif-Regular.ttf": "b5f967ed9e4933f1c3165a12fe3436df",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Script-Regular.ttf": "55d2dcd4778875a53ff09320a85a5296",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Size1-Regular.ttf": "1e6a3368d660edc3a2fbbe72edfeaa85",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Size2-Regular.ttf": "959972785387fe35f7d47dbfb0385bc4",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Size3-Regular.ttf": "e87212c26bb86c21eb028aba2ac53ec3",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Size4-Regular.ttf": "85554307b465da7eb785fd3ce52ad282",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Typewriter-Regular.ttf": "87f56927f1ba726ce0591955c8b3b42d",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "2a763078af91a9ad0b16ff9d01014fe3",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "3ca5dc7621921b901d513cc1ce23788c",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "a2eb084b706ab40c90610942d98886ec",
"assets/packages/font_awesome_flutter/lib/fonts/Font-Awesome-7-Brands-Regular-400.otf": "7c672b0ee67270ced42954a9e03ba2e8",
"assets/packages/font_awesome_flutter/lib/fonts/Font-Awesome-7-Free-Regular-400.otf": "b2703f18eee8303425a5342dba6958db",
"assets/packages/font_awesome_flutter/lib/fonts/Font-Awesome-7-Free-Solid-900.otf": "5b8d20acec3e57711717f61417c1be44",
"assets/packages/gpt_markdown/lib/fonts/JetBrainsMono-Regular.ttf": "d09f65145228b709a10fa0a06d522d89",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "140ccb7d34d0a55065fbd422b843add6",
"canvaskit/canvaskit.js.symbols": "58832fbed59e00d2190aa295c4d70360",
"canvaskit/canvaskit.wasm": "07b9f5853202304d3b0749d9306573cc",
"canvaskit/chromium/canvaskit.js": "5e27aae346eee469027c80af0751d53d",
"canvaskit/chromium/canvaskit.js.symbols": "193deaca1a1424049326d4a91ad1d88d",
"canvaskit/chromium/canvaskit.wasm": "24c77e750a7fa6d474198905249ff506",
"canvaskit/skwasm.js": "1ef3ea3a0fec4569e5d531da25f34095",
"canvaskit/skwasm.js.symbols": "0088242d10d7e7d6d2649d1fe1bda7c1",
"canvaskit/skwasm.wasm": "264db41426307cfc7fa44b95a7772109",
"canvaskit/skwasm_heavy.js": "413f5b2b2d9345f37de148e2544f584f",
"canvaskit/skwasm_heavy.js.symbols": "3c01ec03b5de6d62c34e17014d1decd3",
"canvaskit/skwasm_heavy.wasm": "8034ad26ba2485dab2fd49bdd786837b",
"canvaskit/skwasm_st.js": "9eeb36850f248a8e946442a13aaaa009",
"canvaskit/skwasm_st.js.symbols": "ca49a44a388ecfe66ba43dd851d2b76d",
"canvaskit/skwasm_st.wasm": "56c3973560dfcbf28ce47cebe40f3206",
"favicon.ico": "c05bade0dbdf95b298611f38dca02b44",
"flutter.js": "888483df48293866f9f41d3d9274a779",
"flutter_bootstrap.js": "b29289224584a268207e8226ee150839",
"icons/Icon-192.png": "6fa785c143c670f8afa910935b064920",
"icons/Icon-512.png": "6ce5191ed4c5a095583605d0f5a79d67",
"icons/Icon-maskable-192.png": "6fa785c143c670f8afa910935b064920",
"icons/Icon-maskable-512.png": "6ce5191ed4c5a095583605d0f5a79d67",
"index.html": "0e3259d21605351c6cc3e7b48f2d6358",
"/": "0e3259d21605351c6cc3e7b48f2d6358",
"main.dart.js": "59f44d41e525154006657edbed01d06b",
"manifest.json": "ad81d9a94c87e1a971ccf0533b696319",
"splash/img/branding-1x.gif": "72a79a02421075a487ad0c32d9a727ce",
"splash/img/branding-2x.gif": "07c2066e69b8a48c0b1690e19e301a40",
"splash/img/branding-3x.gif": "f0715f72e04b6ca1dd97fdb785ba5326",
"splash/img/branding-4x.gif": "a9a09a43c8a54d72ac51cdd6ac7888af",
"splash/img/branding-dark-1x.gif": "72a79a02421075a487ad0c32d9a727ce",
"splash/img/branding-dark-2x.gif": "07c2066e69b8a48c0b1690e19e301a40",
"splash/img/branding-dark-3x.gif": "f0715f72e04b6ca1dd97fdb785ba5326",
"splash/img/branding-dark-4x.gif": "a9a09a43c8a54d72ac51cdd6ac7888af",
"splash/img/dark-1x.gif": "f53060206a2dde80ce16ab4f04682b9e",
"splash/img/dark-2x.gif": "1049ba55bae93710cb2ee1ac39c10b5c",
"splash/img/dark-3x.gif": "eb7716ea05e5ba9540654f0d6aac9f24",
"splash/img/dark-4x.gif": "0d13e92859c4877b1785cc9d6a8967c0",
"splash/img/light-1x.gif": "f53060206a2dde80ce16ab4f04682b9e",
"splash/img/light-2x.gif": "1049ba55bae93710cb2ee1ac39c10b5c",
"splash/img/light-3x.gif": "eb7716ea05e5ba9540654f0d6aac9f24",
"splash/img/light-4x.gif": "0d13e92859c4877b1785cc9d6a8967c0",
"version.json": "009c9e65172e010890f7f65fde438006"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
