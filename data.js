// Verified live 2026-10-25 in a browser. Prices are what the listing showed that day.
// dw: all | top | lid | hand | claim (seller says yes, no care spec to back it)
// wall: single | double | unk | na (open tin, no wall to speak of) | null (row hidden)
const AMZ = id => `https://m.media-amazon.com/images/I/${id}._AC_SL1500_.jpg`;
const ANCHOR = {label:'Gymreapers (the reference)', price:29.99};
const CEILING = 20;
const ANCHOR_ROWS = ['promixx','iabaigla','aoowu','etens','bettfor','luckygoobo','amc'];

const ITEMS = [
 // ---------- steel shakers ----------
 {id:'promixx', sec:'steel', rank:1, brand:'PROMiXX', name:'Pursuit Stainless Steel', short:'Pursuit', variant:'26 oz · single wall · Midnight Blue',
  url:'https://www.amazon.com/dp/B0GGTN916N', via:'Amazon', price:19.99, priceNote:'$22.99 direct',
  body:'Stainless steel', bodyKind:'steel', dw:'top', wall:'single', parts:4, partsNote:'cup, lid, agitator, sleeve',
  specs:['snap-fit agitator, no loose ball','32 oz is also $19.99 in some colors'], rating:'4.0★ (436)',
  flags:['Some reviewers report small clumps'],
  also:{label:'promixx.com', url:'https://www.promixx.com/products/promixx-pursuit-single-wall-stainless-steel-shaker'},
  imgs:[AMZ('61+4S+oP7pL'),AMZ('71SKn5i915L'),AMZ('71ngyNm-g0L')]},
 {id:'iabaigla', sec:'steel', rank:2, brand:'iAbaigla', name:'Single Wall Shaker with Powder Base', short:'2-compartment', variant:'304 (18/8) steel · screw-off storage base',
  url:'https://www.amazon.com/dp/B0FJ5VKLX2', via:'Amazon', price:18.90,
  body:'304 (18/8) steel', bodyKind:'steel', dw:'claim', wall:'single', parts:4, partsNote:'cup, base, lid, gasket',
  specs:['silicone seal ring','holds a dry scoop underneath'], rating:'3.8★ (18)',
  flags:['Only 18 ratings'],
  imgs:[AMZ('71hajIosYlL'),AMZ('71JSAqrsIZL'),AMZ('71GOYzXeqRL')]},
 {id:'aoowu', sec:'steel', rank:3, brand:'AOOWU', name:'Stainless Shaker with Whisk Ball', short:'900 ml', variant:'900 ml (30 oz) · brush included',
  url:'https://www.amazon.com/dp/B0DY11Z9JT', via:'Amazon', price:11.19,
  body:'Stainless steel', bodyKind:'steel', dw:'claim', wall:'unk', parts:4, partsNote:'cup, lid, whisk ball, gasket',
  specs:['steel whisk ball','long cleaning brush in the box'], rating:'3.9★ (178)',
  flags:['Reviews call the steel thin'],
  imgs:[AMZ('51dzN8eTwwL'),AMZ('61strOuJQ9L'),AMZ('51PYUa-08OL')]},

 // ---------- bar-cart route ----------
 {id:'etens', sec:'bar', rank:1, brand:'Etens', name:'Boston Shaker Tins', short:'Boston tins', variant:'Weighted large + small tin · silver',
  url:'https://www.amazon.com/dp/B08GC7LN1R', via:'Amazon', price:18.99,
  body:'Stainless steel', bodyKind:'steel', dw:'claim', wall:'na', parts:2, partsNote:'two open tins',
  specs:['tin-on-tin seal','no gaskets, no threads'], rating:'4.8★ (1,288)',
  flags:['Some say the tins stick'],
  imgs:[AMZ('51rh3lI61dL'),AMZ('61eCHTpE0TL'),AMZ('51OZKfViiIL')]},
 {id:'amc', sec:'bar', rank:2, brand:'American Metalcraft', name:'Weighted Boston Shaker Set', short:'Boston set', variant:'18 oz + 28 oz tins · BSSET',
  url:'https://www.webstaurantstore.com/american-metalcraft-18-28-oz-weighted-boston-shaker-set-bsset/124BSSET.html', via:'WebstaurantStore', price:9.18, priceNote:'plus shipping',
  body:'Stainless steel', bodyKind:'steel', dw:'claim', wall:'na', parts:2, partsNote:'two open tins',
  specs:['restaurant-supply stock','usually ships in 1 business day'], rating:'5.0★ (1)',
  flags:['One review'],
  imgs:['https://www.webstaurantstore.com/images/products/large/679947/2987917.jpg']},
 {id:'bettfor', sec:'bar', rank:3, brand:'BETTFOR', name:'Boston Shaker Set', short:'Boston set', variant:'18 oz + 28 oz · 304 steel · silver',
  url:'https://www.amazon.com/dp/B0FQ5BT96D', via:'Amazon', price:15.99,
  body:'304 steel', bodyKind:'steel', dw:'claim', wall:'na', parts:2, partsNote:'two open tins',
  specs:['weighted base','mirror polish'], rating:'4.3★ (198)',
  flags:['Some report the weighted base coming off'],
  imgs:[AMZ('81crWycj4OL'),AMZ('81fty0tuA3L'),AMZ('81K7gZZuqgL')]},
 {id:'luckygoobo', sec:'bar', rank:4, brand:'LUCKYGOOBO', name:'Cobbler Cocktail Shaker', short:'cobbler', variant:'24 oz · 18/8 steel · built-in strainer',
  url:'https://www.amazon.com/dp/B0749H4S9D', via:'Amazon', price:8.99,
  body:'18/8 steel', bodyKind:'steel', dw:'claim', wall:'na', parts:3, partsNote:'tin, strainer, cap',
  specs:['cheapest steel shaker here'], rating:'4.6★ (6,551)',
  flags:['Strainer holes trap powder'],
  imgs:[AMZ('612YfFxiL2L'),AMZ('61RtbQ1GM0L'),AMZ('716ctHxysDL')]},

 // ---------- the universal fix ----------
 {id:'balls', sec:'fix', rank:1, brand:'Generic', name:'Steel Shaker Balls, 4-pack', short:'shaker balls', variant:'2.1 in (54 mm) · 304 steel',
  url:'https://www.amazon.com/dp/B0CGRBSZ1G', via:'Amazon', price:4.99,
  body:'304 steel', bodyKind:'steel', dw:'all', wall:null, parts:1, partsNote:'per ball',
  specs:['fits a wide-mouth mason jar','or either Boston tin'], rating:'4.7★ (1,208)',
  imgs:[AMZ('71AwvHfadmL'),AMZ('71wWjDhCk6L'),AMZ('71Y-6QsHnoL')]},

 // ---------- not steel ----------
 {id:'classic', sec:'plastic', rank:1, brand:'BlenderBottle', name:'Classic V2', short:'Classic', variant:'20 oz · clear/black',
  url:'https://www.amazon.com/dp/B07TL6PNLH', via:'Amazon', price:9.99,
  body:'Plastic (BPA-free)', bodyKind:'plastic', dw:'all', wall:'single', parts:3, partsNote:'cup, lid, BlenderBall',
  specs:['316 steel whisk ball','markings to 14 oz'], rating:'4.7★ (168,345)',
  imgs:[AMZ('71iiyCEpDmL'),AMZ('51nVzJ5fuKL'),AMZ('514y1XT4rBL')]},
 {id:'pro', sec:'plastic', rank:2, brand:'BlenderBottle', name:'ProSeries', short:'ProSeries', variant:'24 oz · Tritan · black',
  url:'https://www.amazon.com/dp/B07C81F48R', via:'Amazon', price:14.99,
  body:'Tritan plastic', bodyKind:'plastic', dw:'all', wall:'single', parts:3, partsNote:'cup, lid, BlenderBall',
  specs:['stain- and odor-resistant Tritan','markings to 18 oz'], rating:'4.7★ (40,691)',
  imgs:[AMZ('61nec8alhoL'),AMZ('51RfBMuEAgL'),AMZ('610UH7B8S2L')]},
];

const CUT = [
 {name:'Gymreapers Stainless (the reference)', url:'https://www.amazon.com/dp/B0HGSNYR7Q', why:'$29.99, double wall'},
 {name:'BlenderBottle Sport Flip Stainless', url:'https://www.amazon.com/dp/B084PVQGH1', why:'$19.97, but double wall and hand-wash cup'},
 {name:'BlenderBottle Sport Sleek Stainless', url:'https://www.amazon.com/dp/B0F2QKKS5H', why:'$19.97, double wall'},
 {name:'VELOMIX 24 oz Stainless', url:'https://www.amazon.com/dp/B0FN3K2H36', why:'$18.99, double wall, hand-wash cup recommended'},
 {name:'RESPAWN by Razer Shaker', url:'https://www.amazon.com/dp/B0829R614J', why:'$16.98, vacuum insulated'},
 {name:'VALESKA 20 oz Stainless', url:'https://www.amazon.com/dp/B0BPHHLWZX', why:'$16.14, reviewers say it is very hard to clean'},
 {name:'Generic 750 ml Stainless Shaker', url:'https://www.amazon.com/dp/B0DR1XTJ4H', why:'$11.99, hand wash only'},
 {name:'Smartshake Reforce Stainless', url:'https://www.amazon.com/dp/B086RQ77VP', why:'hand wash only; plain one unavailable, sub-$20 ones are licensed prints'},
 {name:'PROMiXX Pursuit Stainless, direct', url:'https://www.promixx.com/products/promixx-pursuit-single-wall-stainless-steel-shaker', why:'$22.99; same bottle is $19.99 on Amazon'},
 {name:'Simple Modern Stainless Shaker', url:'https://www.amazon.com/dp/B0CMSB6Y13', why:'$22.99, over $20'},
 {name:'Hydro Flask Shaker', url:'https://www.amazon.com/dp/B0CJDBKJ36', why:'$24.95, double wall'},
 {name:'YETI Yonder Helimix', url:'https://www.amazon.com/dp/B0FZMTKC6S', why:'$25, over $20'},
 {name:'Ice Shaker 26 oz', url:'https://www.amazon.com/dp/B076H2WRCK', why:'$34.99, double wall'},
 {name:'Stanley Vitalize Shaker', url:'https://www.amazon.com/dp/B0DYRCX2P7', why:'$40, double wall'},
 {name:'Houdini 16 oz Cobbler', url:'https://www.target.com/p/houdini-16oz-stainless-steel-cocktail-shaker/-/A-52360452', why:'$12.99, 16 oz is small; leak reports'},
 {name:'IKEA PRODUKT frother', url:'https://www.ikea.com/us/en/p/produkt-milk-frother-black-30301167/', why:'$3.99, wipe-clean only, not dishwasher safe'},
];
