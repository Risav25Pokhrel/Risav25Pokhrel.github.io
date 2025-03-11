'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {".git/COMMIT_EDITMSG": "4544032075fc76efdf57d423b26da96e",
".git/config": "2611d88aa0d4efb410f9d7f918631038",
".git/description": "a0a7c3fff21f2aea3cfa1d0316dd816c",
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
".git/index": "0185d0033deccad5ae7e1731c659f696",
".git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3",
".git/logs/HEAD": "4d015e0869088149c13639b8ace5a4fd",
".git/logs/refs/heads/main": "feca8b5380aeb3ee69a831ccab915ba1",
".git/logs/refs/remotes/origin/main": "a1f453a8732c49fcd2e5775e80a1b260",
".git/objects/0a/02e33b1849c2ccfcd75c76cbaa17ea2085a43c": "a5c1bbfc2e5bd461a6a6a053a9eb6be7",
".git/objects/0d/ce549d57429c42e792562b639710e304ba2212": "66a83ab9ad866ddcdee92e18fedc9d95",
".git/objects/0d/f74fda352e0b942c9cb842a09087db785cccd5": "fa79cd63d07b0031e638f354ef9baf78",
".git/objects/0e/35e78f1f29e492d3f2af951090d6025b7fc630": "f7e75469a2b27890fdc536ab0c9747d9",
".git/objects/10/0b9b5dd6f0749312a7537123961071381681c2": "4e67fb9bd6c36f1b651b2e7ba0505da3",
".git/objects/15/05dbd857ae32ae7f9bec7cb6553d6cd0ac8d8c": "4745a6dcc6627d0a07424d1ac703cdd3",
".git/objects/17/c355fec0f76ca4978361421ce1342816dc47ca": "faf7f41314bb1bab847b01e6e309d5ca",
".git/objects/18/7cbbb12b08fc7c33006ae8064b8f95d685709a": "eeb0f1be6df9da964946142e0ea437c5",
".git/objects/1a/e9692eba6f96a28ea3dc4098081c3884acac46": "7c94f327e44f2f3d6cca41396f0e43ab",
".git/objects/1c/726254592a71e9c6b32039d0c88d038aa96623": "30bcdb40fd979b5d14b02d5e531d3d0d",
".git/objects/1d/3200c8199402f8225bc348179dd6648d45eb89": "2ccb6da42a3b780f8c9dbec990453399",
".git/objects/1d/468b85698a60041b450286f31b3264b3bbd6f7": "5c8c497111befde32ac151f14cf92f85",
".git/objects/1e/420b74b7e98f05f6b69a45b23b526a7f240b3d": "d058d7f838c6f6f99870e8a988c32519",
".git/objects/1f/8e41dc076e3ffa1225b59499caf2ef8ed48507": "0706dfe42dab9f5b462ddce7dfee6172",
".git/objects/20/6aa4ada75714e2df6709c7b51bc1276c191388": "66f3be8d7c9e195e0ac70b5829e68407",
".git/objects/21/6717d4773f177a2d2742e0c3ae2de783c9e2b2": "e970e6e3181d5f657d916395ac25b1ca",
".git/objects/23/637bc3573701e2ad80a6f8be31b82926b4715f": "5f84f5c437bb2791fdc8411523eae8ff",
".git/objects/23/df371130aba07585ee2abc55c32c9e7be84832": "72e973feae7d6cb6cd7e5350e9c8f7b4",
".git/objects/25/3f7dfe7999b1becf1c6ebf7ef2b71850bde244": "c8904a06512c8f48414f19695142b864",
".git/objects/26/e43b3021ebcb937130332e2874200fb26ee4b9": "a858cca00dcec153ab348b894035ffce",
".git/objects/27/9a217cf6f03199175d975efa982a5fbabb6a2e": "dc053d0451517941955284b259bf35df",
".git/objects/28/b6d54519047d6b9e7fb5160ab2d411ee349636": "ea303b253263e48400f488973a5fa3c8",
".git/objects/29/519da5ecc06a21bed5b4994ab54b30465ad063": "9bddb0b95156e109c874f916722530ab",
".git/objects/2f/9a5c9356c30fa0dc442a2c0ff763e9fe998ca5": "6d78a55a787440b5e5f42065923a8b16",
".git/objects/31/c7e8be1f434c01db103975cf52fb0052f72f76": "84569ec22a8e5f1109af787027d2e195",
".git/objects/33/cf9e362cf604f1d05b80bfd67d6d5e563b4c4a": "7eba8541c400f6206fbaa3219fa44585",
".git/objects/34/526e138348ff88810511db4eedeb438dc3c942": "0f6e0e4fc151638d1c907c4773d03e55",
".git/objects/34/bbb475bf3edb610534eb3b3b559669ddd675df": "fe255ce549d2c0661289c2cc3f59ded6",
".git/objects/35/96d08a5b8c249a9ff1eb36682aee2a23e61bac": "e931dda039902c600d4ba7d954ff090f",
".git/objects/36/6988faefad15172e7e34d10c0a12022723b5c7": "ec480d875c32ca1b2c6fa9142b96104a",
".git/objects/38/f72c3b661274731c0dca4263c6147292c3313e": "06ec909689545717240ec77454003efe",
".git/objects/3a/236a5a5709ce36fd63a77235f9adadaa2ae19e": "530bac62812167f36d3f2cb3c61fd368",
".git/objects/3a/2be69b573fdff48558051808674a2189786ffd": "df4946b4d7d4b6c9e63b5520af5356bb",
".git/objects/40/0e29deb869bf8a2bd40bd458f54f0b784f226e": "3cc02e7de298c89186ac2b49a30a57f9",
".git/objects/40/1184f2840fcfb39ffde5f2f82fe5957c37d6fa": "1ea653b99fd29cd15fcc068857a1dbb2",
".git/objects/41/5c059c8094b888b0159fdedfd4e3cb08a8028e": "86914685ccd40e82a7fe5b70459fb9f7",
".git/objects/42/a0bcd8bb490270983afbd7314279b20be288cc": "e5f2e67624382f45b21d8bf8361135ee",
".git/objects/43/84a78e2177205eaf8d5e9caa715908ebd81200": "f781b21cd8fd8bf14c58b26202d5db76",
".git/objects/44/d746f731abd48b36c4261f0efab841cbd1405f": "488294823338b63cad37eae3f2bd9925",
".git/objects/4a/c93b4b39efb4e741709718b778bd06ee7c771e": "ea2d9ebba023e79e0416da3e27f1a126",
".git/objects/4d/afdfe71d4d3e5596374d9673ca7a9e346c1042": "2a6a7f7f78ead9c9c8d387a23c68f645",
".git/objects/4f/6088ce7e935a8647fc0fce805d8677c5b5193d": "7070d1ef5ce1276c1d6d4312c3c2b8f3",
".git/objects/50/b97dc8511f4391452b3e9169eaa83b5e2de6c6": "0d49716cbc9735be0d7a3fd04cf4410e",
".git/objects/52/6c562fbcd82a28388e6b2fe66bf8837da2592e": "fc4090b9203f563e79d13473a9b06e8d",
".git/objects/53/3402c75429e6feaa7b8f92878ae2313dbdf2de": "63ab067b0b447b461fa3e8f58a1f23a9",
".git/objects/54/e26bb62c6bdf4bb25215d63c1bda44b224aa19": "fc302d9a1a77c39e20d54a63c8831df7",
".git/objects/57/7946daf6467a3f0a883583abfb8f1e57c86b54": "846aff8094feabe0db132052fd10f62a",
".git/objects/59/62efb2dffef4c259bda261b128fcab4b659c34": "11e1a7683fedc73b6a0da57ee3c6a112",
".git/objects/5b/104122ff8b097e71399364957dd4019dee5681": "89518b72451f605d6715118cd396e26c",
".git/objects/5b/744681dcca0c17de4e845ac1b3e2d17ba4e278": "3597f639191613436f07f9c1116b7907",
".git/objects/5d/e832af0d27a5fcb6655ea321053d02e3771bc7": "0ec56981793200ad4ce18bd78dd1d8b2",
".git/objects/5e/bf37944a56f2b5e479e3858392c6e9030da2da": "d874f5ce1eb6512c7b77ebd17b676f00",
".git/objects/5e/fffb0cc66a8221a85410a0e7adfe7c409d58ce": "2b603b7671611536b8102533d4f619b6",
".git/objects/5f/bf1f5ee49ba64ffa8e24e19c0231e22add1631": "f19d414bb2afb15ab9eb762fd11311d6",
".git/objects/61/083838c65d610f77e557fcdd85e5c789dc75c8": "7f9b20ce31d6daaf2ed5b9d7fc112c19",
".git/objects/61/0d53f9c6d11558e6d7187a70d887b958cacb35": "152098e3377f6b9c53cf2320428a5c1e",
".git/objects/63/8696b9b71a3b874ce51ad8534646b55be760c9": "74a43a2c8cc01c428fba5ec17643fea0",
".git/objects/64/810c2dc21a87e0c636f6b793309f70bec1593e": "75e9689903c4539b74c8704c93549324",
".git/objects/65/5fcc6de5b20f74039e14de4d695076a7da5204": "31d42d27e50ec70afdb610086c201794",
".git/objects/66/af0d38bd4a4ec3faf5c70079363036065983e3": "eab7fd09455f5e86c4f2ce2db309985c",
".git/objects/68/36e5ceb943f8a4aa617930857770ece44fdf21": "6041821886d9abccb45428c8e1e7f8b3",
".git/objects/69/2f20751030c4928576112dd36703233631b9c4": "b62dad7ea8839abdf748010697b0324e",
".git/objects/69/5ae1157add91a278777f55de6d8706a08ee90b": "fca00c479c14812330ebf221c4746013",
".git/objects/6a/c83f4b65ab63fa0234338f9305596cfdfc36b4": "6e6c27f7bf7d8dae6d6906eccce528f1",
".git/objects/6d/4e2dea8e19c494af1c3ed4cd6bafb5921d0529": "0b47625dc66ab498aded45cf900ba40a",
".git/objects/6e/6233070ed3c42b9db5723a3cfa8612b0671743": "600fddaaeed8da4851d0d19cad023e2e",
".git/objects/6f/9200582fa529a164698414f671246dba7bca99": "3bb8fd25e97ed28e9f125ebc6281dbf3",
".git/objects/71/d50537015897492282d804f8bbb13f93e740f3": "05ecc4ab883e672f0c200178c223809b",
".git/objects/72/3d030bc89a4250e63d16b082affe1998618c3f": "e4299c419434fc51f64a5266659918fa",
".git/objects/72/c0fa897cd6ba39fe4c49674685ed210155661d": "c3dfcbf273a3063e643301f7d5618271",
".git/objects/73/3bb44a8c5a3202862853f7c40be778749e4178": "b74b64e469eae36538e602be53897951",
".git/objects/73/5d84280fb97e00c1396e9b99ec753ba18c80ed": "f99a49b7806099a94da0368721ebbccc",
".git/objects/74/4c10d45f3f8c1a52c0be4dc0c30c70c73befc8": "0109e89f5debe44ac84a257395c030a9",
".git/objects/76/0ff6af40e4946e3b2734c0e69a6e186ab4d8f4": "009b8f1268bb6c384d233bd88764e6f8",
".git/objects/77/05dc7c95af00bd75f150cb53c9ee6b13606200": "2344c1908893ba5e554e4036ee5c6401",
".git/objects/78/784dfcf442678fb957c96df46ede8a20ccedb5": "3a278c07836fc87b87a84ffc143dbf48",
".git/objects/7a/c4c336d324d46e76f09c8b91025d39c6dc6d1f": "f83ce446a066c6f6491cfefe3f51df89",
".git/objects/7a/d6a5ab724ccfac453c16594d58ce6d14b0d9b3": "df83a4fae75e068f4f24f694910dd718",
".git/objects/7c/f5a8d927a6a2634e9f0b9f2dc05ac62fb435bf": "3ca4c799dcbbc45fd60a442199b968c6",
".git/objects/7e/54b50500f67e1ec3d6d7d23be5c092e01fd5c0": "1b95c72c39adb516bacabccae47aa278",
".git/objects/80/8de230c6006af3336bf0b8360c54e81a3721c7": "3b2c689550aae2c62abfcaa24decbe7b",
".git/objects/80/9db8f3aa2d827dd8e2598433e829ff802d8db8": "e268c1fe80e61af7977c581ebbe87e71",
".git/objects/81/69422ee4871a4e1c29976fc52066b1df95fcf3": "b84ed43661e7d6a24652a58a04fc15e2",
".git/objects/83/f808366e614086c35dc4c313d59b78af8036f7": "bd82f08062d96f744a5db5235d7ae81b",
".git/objects/86/a90168ae8b5f9ec67e0c5285e171f408039f36": "d4c03b159abffef416278ecd315b22ba",
".git/objects/87/20299dad413f2bbd132795e7cdefd6ee2c65ba": "2922988731afdc5a542080d98140e9de",
".git/objects/88/07989a3e3349e5508727bfd3b4f4d60e16cace": "027655d1d5a3dee4eedbc6ff71d89c03",
".git/objects/88/3eaf3539f5b5dbac34918ebdf35e513609ca1b": "2da70ca0219c3b8d37409a0f5fd11092",
".git/objects/8a/51a9b155d31c44b148d7e287fc2872e0cafd42": "9f785032380d7569e69b3d17172f64e8",
".git/objects/8a/6fb306b785ab9f85dd1574bbec901531b086ad": "caf9f3f07a9ec5792267ad894fac05be",
".git/objects/8c/99266130a89547b4344f47e08aacad473b14e0": "41375232ceba14f47b99f9d83708cb79",
".git/objects/8c/c348517458135641c17abe903b47be5f6c0162": "23e30c9e733563abd5683ab39de9f6f2",
".git/objects/8e/2d09b6ba618e083fd3083466fbeccd047f4674": "81b0d825fcb96d80ff29c2a0dff1a1d4",
".git/objects/8f/9b891e912d4da0fac1298e114df5680ec6f4c8": "0fd43f417741a9d1167b692a2ae4714a",
".git/objects/8f/c8be62f202c40e7d3e2e16242fb065cfc4e1a7": "6fda1b80da67a8d96186cf8ab8b24087",
".git/objects/90/b0e2eec2f99af6275e83af7230a001892de5ed": "b2a18c3f79cb38975c7974d94035d54a",
".git/objects/91/4a40ccb508c126fa995820d01ea15c69bb95f7": "8963a99a625c47f6cd41ba314ebd2488",
".git/objects/98/f7e04081d15b4519097be3ec84e896e4e8d013": "1111c0b5321f3203df7fcd5fadf23778",
".git/objects/9c/18822406260b93aba93d207ac58e318b1e5927": "ae836f61a04c1e0e5a68f11d57dee12e",
".git/objects/9c/1ccc24c3f62747fcf3ce4e27ac40ce97d18f9f": "3a370cda2939ff1bbb95fabd66ab6e24",
".git/objects/9d/c5bbfea1f274bb6335d9c25abaae3969ee6884": "93d2f59f733bae2ed306d4ccedb7e23b",
".git/objects/a0/e78467ee5438fcc3cdd8fd1dcd74cfa6adf6fb": "5d89936e39e424af6a2cc5f542c71c7b",
".git/objects/a3/1a94963e3b4f94a2c7b6a73ec23d862e322898": "241f8ac4fb1855a7420deca80477abe0",
".git/objects/a5/de584f4d25ef8aace1c5a0c190c3b31639895b": "9fbbb0db1824af504c56e5d959e1cdff",
".git/objects/a6/4508d25d7e6665f511c121f4de45b0ced7d6da": "afc3ddeb75ea97f1cd4fe7d367cb1f01",
".git/objects/a7/9679a810fbae97a4d20027db852c01e536db9e": "5600a9dee8b50a78dec7917591170f4e",
".git/objects/a8/8c9340e408fca6e68e2d6cd8363dccc2bd8642": "11e9d76ebfeb0c92c8dff256819c0796",
".git/objects/a9/e0b6b8203f4a98f35c49d72372aa912338f82e": "067d38da72caa85a918af64f6dc281d1",
".git/objects/aa/0a7bd653ec20b94f49b64f9b71f9ac286398e6": "9de4a2178aac294ebbfb7a5013dac4d5",
".git/objects/ad/4c0ba9842f4de544316a62269732d33f652961": "d2648c4f7ac6a01d24dedabffef3980b",
".git/objects/af/02a02eea694a66b2370f8ccfce3b3675e56458": "86facaa9e2991c38229e8f8902d2e897",
".git/objects/b1/5a377a7dbab2dbbb5194a2dadcd8148d7a914a": "90b9a9bd81a747697e99451d71e8b53b",
".git/objects/ba/86c5eb654a153d6b89f4e79fcc04fd460231f7": "4bd062c75319de20a39a861dd9dd0867",
".git/objects/bc/0cff99d64b7e8de94c36e1ef43af8c5d1a8b75": "774651e535fcb1cb7cd473c868ec792c",
".git/objects/bf/7a072a39535babbfc9485e07427384a9237e4c": "2cf208bfdab8d8ffedbd259e0194f4e6",
".git/objects/c1/5b6051c4002c18c04d7cd730589615f49424a3": "e8fa6ba80687d6b30aca29e9961061cc",
".git/objects/c4/a19a219d775915624d96ac24c78b1f1710a58b": "c2b6b1e92a25b07432a5e15ac4d70c09",
".git/objects/c6/42c4407383040e2118b9f130c5b37015cb90a8": "0a650bda2019ff9d87abba2cdfd41bc7",
".git/objects/c6/d59255e16beb242db9bbb9dda0175469820bda": "e28b7409efc69b3c54d2f228717f11be",
".git/objects/c7/23ffc0efdc34521caa549f0d9b7458da7cdc6b": "26fa7861d899f4b6c48834fee5e8920c",
".git/objects/cd/cc19d29cac0fa01bab09bece61cf3e43256d9a": "503adb33ee551a57acd8992265753c2b",
".git/objects/ce/e3c5bb4ad9ca1b7e02e3391cc1cbba998308b7": "8e23cc0d8eea61c17a30b19ec3ccb417",
".git/objects/d1/5cc2875df6bba71a4a680f6c951c8800dc2e46": "605a02e9ad5513379861033650c6ee33",
".git/objects/d4/3532a2348cc9c26053ddb5802f0e5d4b8abc05": "3dad9b209346b1723bb2cc68e7e42a44",
".git/objects/d5/80ce749ea55b12b92f5db7747290419c975070": "8b0329dbc6565154a5434e6a0f898fdb",
".git/objects/d6/ff26ea56af225bf5019779451f9110f748433e": "cf7985aaddf4ca6ecdd35d1078369310",
".git/objects/d9/3952e90f26e65356f31c60fc394efb26313167": "1401847c6f090e48e83740a00be1c303",
".git/objects/d9/8b2ab795119e7fd8b2e85dfd59dfa3721c5951": "e2c3b78598701bc83988486c88d1cb4d",
".git/objects/db/50c1e687e4649ce3349c0f2a99ec25e3067fcc": "c68c76de667f815ff8bdbd961b806d53",
".git/objects/e4/6047dca2737325b49dfbb8ecd4f945779344d0": "e32e4ae1c8306058a9ef263b421be571",
".git/objects/e6/9de29bb2d1d6434b8b29ae775ad8c2e48c5391": "c70c34cbeefd40e7c0149b7a0c2c64c2",
".git/objects/e7/b2479a9672e0e725e2cff850c430865294db4c": "c81bef30908873e6f1d1aa8a7a3404a0",
".git/objects/e7/ff992b21a7d41194ccffce66334e049d6c73a8": "b997ba363b080a6bb1d8279cdec9722f",
".git/objects/e8/04c742d5271e0923243598d37e58bf8ff4e0bd": "d565aadc9b3cf640f112863a7d22f4b5",
".git/objects/e8/8345f292a1cbd961e19e907a14c445620ed605": "4bcf1b609f2fdc2f6bf28f7d072cf881",
".git/objects/ee/8b72f51015219cecd5478a024d9511be2fc18d": "25d1fb7a0403804df9cd7dac17f434c5",
".git/objects/ef/b875788e4094f6091d9caa43e35c77640aaf21": "27e32738aea45acd66b98d36fc9fc9e0",
".git/objects/f0/59feef522fb1f5964fa2b76bbc6c9ba6993610": "2e8d1866d9589af59352a5aa11fded57",
".git/objects/f2/04823a42f2d890f945f70d88b8e2d921c6ae26": "6b47f314ffc35cf6a1ced3208ecc857d",
".git/objects/f3/709a83aedf1f03d6e04459831b12355a9b9ef1": "538d2edfa707ca92ed0b867d6c3903d1",
".git/objects/f4/424ec5719a41acd8535e258bd162e72660b9ca": "800df1d034a12f8d367a185cafa9d3f8",
".git/objects/f4/ebae7c665bb7a67425b109dbc6ddaaefb08dfd": "6ab0583ad7c1e28009e53007a23aa22e",
".git/objects/f6/7816b08fc6cc475b5eb996bd0bfafd65d8c993": "6c81b0e3750cb79e62d6516eb9ccd3c9",
".git/objects/f7/193430858eb6f347435dd3b1eef5536fad2256": "692ee7a70ebde77ba75783a3d1ea325b",
".git/objects/f8/0a23b7473f308d234b879639c8bbd6cd6399a9": "878a727520b39e12128295d0421444ec",
".git/objects/f8/fc0a0ba3829adb2d7f99d269ca68df5c73223a": "89d668bcf7d7ab076552ee4373ebde6d",
".git/objects/fd/26135ef795c26eaf0358100588bc24659d47fd": "2032f51b9caecdd0dab923e417d9f53b",
".git/refs/heads/main": "03f8daa8a5332973eda920547214b8fe",
".git/refs/remotes/origin/main": "03f8daa8a5332973eda920547214b8fe",
"assets/AssetManifest.bin": "373234d664ffe656d0fb4039a86ad513",
"assets/AssetManifest.bin.json": "4446c963dde6091a6b6de4cb1ae02947",
"assets/AssetManifest.json": "801125fca546f506babac9af4ec061ba",
"assets/FontManifest.json": "5a32d4310a6f5d9a6b651e75ba0d7372",
"assets/fonts/MaterialIcons-Regular.otf": "0be641ebcfae6c5ffc31bcd81294f022",
"assets/NOTICES": "f48ca09b84c881a608f4866d8a916fbc",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "c56f437f397189af8829649dd51b0eff",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "2a763078af91a9ad0b16ff9d01014fe3",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "3ca5dc7621921b901d513cc1ce23788c",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "a2eb084b706ab40c90610942d98886ec",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "6cfe36b4647fbfa15683e09e7dd366bc",
"canvaskit/canvaskit.js.symbols": "68eb703b9a609baef8ee0e413b442f33",
"canvaskit/canvaskit.wasm": "efeeba7dcc952dae57870d4df3111fad",
"canvaskit/chromium/canvaskit.js": "ba4a8ae1a65ff3ad81c6818fd47e348b",
"canvaskit/chromium/canvaskit.js.symbols": "5a23598a2a8efd18ec3b60de5d28af8f",
"canvaskit/chromium/canvaskit.wasm": "64a386c87532ae52ae041d18a32a3635",
"canvaskit/skwasm.js": "f2ad9363618c5f62e813740099a80e63",
"canvaskit/skwasm.js.symbols": "80806576fa1056b43dd6d0b445b4b6f7",
"canvaskit/skwasm.wasm": "f0dfd99007f989368db17c9abeed5a49",
"canvaskit/skwasm_st.js": "d1326ceef381ad382ab492ba5d96f04d",
"canvaskit/skwasm_st.js.symbols": "c7e7aac7cd8b612defd62b43e3050bdd",
"canvaskit/skwasm_st.wasm": "56c3973560dfcbf28ce47cebe40f3206",
"favicon.ico": "c05bade0dbdf95b298611f38dca02b44",
"flutter.js": "76f08d47ff9f5715220992f993002504",
"flutter_bootstrap.js": "9d2ce990c04c25e3a607de6fdd0ad6c8",
"icons/Icon-192.png": "6fa785c143c670f8afa910935b064920",
"icons/Icon-512.png": "6ce5191ed4c5a095583605d0f5a79d67",
"icons/Icon-maskable-192.png": "6fa785c143c670f8afa910935b064920",
"icons/Icon-maskable-512.png": "6ce5191ed4c5a095583605d0f5a79d67",
"index.html": "609bc5b2d54a883ac7f78527d3b7c531",
"/": "609bc5b2d54a883ac7f78527d3b7c531",
"main.dart.js": "e010736258527b9acb88ab33b4f17c8d",
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
