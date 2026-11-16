/* Runtime UI strings. English is the default; Chinese is used when
   <html lang> starts with "zh". */
export function isZh() {
  return (document.documentElement.lang || '').toLowerCase().startsWith('zh');
}

const ZH = {
  "Embroidered eyes": "刺绣眼睛",
  "Bear": "熊",
  "Cat": "猫",
  "Bunny": "兔子",
  "Berry": "莓红",
  "Gold": "金色",
  "Friendly": "友好",
  "Playful": "活泼",
  "Confident": "自信",
  "Cocoa": "可可色",
  "Caramel": "焦糖色",
  "Snow": "雪白",
  "Frost grey": "霜灰",
  "Pine": "松绿",
  "Navy": "海军蓝",
  "Add to cart": "加入清单（演示）",
  "Your photo": "你的照片",
  "Original": "原图",
  "Hee hee, that tickles!": "嘻嘻，好痒！",
  "Our designers drew me by hand.": "我是设计师手工画出来的。",
  "I started as a pencil sketch.": "我最初只是一张铅笔草图。",
  "I can wear your company colors!": "我也可以穿上你们公司的颜色！",
  "Want one of me with your logo?": "想要一只带你们 logo 的我吗？",
  "Please fill in the required fields.": "请填写必填项。",
  "short": "短发",
  "long": "长发",
  "bun": "发髻",
  "glasses": "眼镜",
  "Santa hat": "圣诞帽",
  "Your photo<br>goes here": "照片放在<br>这里",
  "Your uploaded photo": "你上传的照片",
  "Berry bauble": "莓红彩球",
  "Gold bauble": "金色彩球",
  "Smiley star": "微笑星星",
  "Jingle bell": "铃铛",
  "Gingerbread": "姜饼人",
  "Candy cane": "拐杖糖",
  "Snowflake": "雪花",
  "Tiny gift": "小礼物",
  "All 24 days are filled, so your calendar set is ready.": "24 天都已放满，这套日历可以加入清单了。",
  "Drag an ornament onto the tree, or tap one to add it.": "把挂饰拖到树上，或点一下来添加。",
  "All 24 days are filled. Drag an ornament off the tree to swap it.": "24 天都已放满。把挂饰拖出树外即可替换。",
  "No space left. Try dragging the ornament to a spot instead.": "没有空位了。请试着把挂饰拖到树上的位置。",
  "The tree is empty. Start decorating!": "树是空的。开始装饰吧！",
  "Tree advent calendar with 24 ornaments": "带 24 个挂饰的圣诞树降临日历",
  "Custom color": "自定义颜色",
  "No accessory": "无配件",
  "Earmuffs": "耳罩",
  "Volume pricing <small>from 50 pcs</small>": "批量询价 <small>演示起订 50 件</small>",
  "Request a quote for this design": "就这个设计申请报价",
  "Link copied. Anyone who opens it sees this reindeer.": "链接已复制。打开后会看到这只麋鹿。",
  "Copy this link:": "请复制这个链接：",
  "The first sketch": "第一张草图",
  "Our first sketch of the tree calendar had 25 ornaments. We cut one, so the 24th door is the star.": "圣诞树日历的第一张草图本来有 25 个挂饰。我们去掉了一个，所以第 24 扇门是星星。",
  "Gift code": "演示优惠码",
  "Get 10% off any tree calendar today with code <code>DOOR2</code>.": "演示优惠码 <code>DOOR2</code> 表示日历套装 9 折，不能真正使用。",
  "How we chose the cinnamon": "肉桂色是怎么选的",
  "The gingerbread fabric went through 14 shades before it looked warm enough.": "姜饼人面料试了 14 种色号，才看起来足够温暖。",
  "We embroider eyes instead of using plastic ones, so nothing can come loose for little hands.": "我们用刺绣眼睛，而不是塑料眼睛，避免幼儿可以扯下小零件。",
  "Pattern peek": "版型一瞥",
  "The candy cane is just two pattern pieces. The stripes are printed, not sewn.": "拐杖糖只有两片版型。条纹是印上去的，不是缝上去的。",
  "Free gift wrap": "演示礼包",
  "Free gift wrap on every order today.": "“今日订单免费礼品包装”仅为演示文案，不能作为真实优惠。",
  "The bell problem": "铃铛的问题",
  "Real bells jingle but they are not safe for toddlers. Ours have a soft rattle inside instead.": "真铃铛会响，但对幼儿不够安全。我们改用内置柔软响袋。",
  "Free embroidered name on any reindeer with code <code>NAME8</code>.": "演示优惠码 <code>NAME8</code> 表示免费绣名，不能真正使用。",
  "Meet the designer": "认识设计师",
  "Every face is drawn by hand. The tree’s smile took 30 versions.": "每张脸都是手绘的。树的微笑改了 30 个版本。",
  "Plush care tip": "玩偶保养",
  "Wash on cold in a pillowcase, then let it air-dry. Fluff it up with a hairdryer on cool.": "请套上枕套后冷水洗涤，再阴干。可用冷风吹松。",
  "Coloring page": "涂色页",
  "Download a coloring page of our gingerbread family (coming soon).": "姜饼人家庭涂色页（即将推出，演示说明）。",
  "15% off company orders confirmed this week: <code>TEAM12</code>.": "演示优惠码 <code>TEAM12</code> 表示本周确认的企业订单 85 折，不能真正使用。",
  "Behind the seams": "缝线背后",
  "One reindeer has 23 pattern pieces and takes about 40 minutes to sew.": "一只麋鹿有 23 片版型，大约需要 40 分钟缝制。",
  "A family idea": "一个家庭玩法",
  "Some families hide the next ornament around the house each morning.": "有些家庭每天早上会把第二天的挂饰藏在家里。",
  "Last call for personalization": "个性化截止提醒",
  "Personalized orders need 2 extra days. Check your country’s deadline below.": "个性化款需再预留 2 天。请查看下方各目的地的演示截止日期。",
  "Fabric fact": "面料说明",
  "Our short-pile plush is made with recycled polyester fiber.": "短毛绒面料使用再生聚酯纤维（演示说明）。",
  "Free express upgrade over $80 with code <code>FAST17</code>.": "演示优惠码 <code>FAST17</code> 表示满 80 美元升级加急，不能真正使用。",
  "From the photo team": "来自照片团队",
  "You can turn your pet into a plush with our photo-to-plush service.": "也可以通过照片生成玩偶服务，把宠物做成玩偶。",
  "A reindeer name": "麋鹿的名字",
  "Customers’ most popular reindeer name this year: “Biscuit”.": "演示文案：今年最受欢迎的麋鹿名字是 “Biscuit”。这不是真实销售统计。",
  "Thank you": "谢谢",
  "A thank-you note from our sewing team, with a photo.": "来自缝制团队的感谢卡，并配一张照片（演示内容）。",
  "Buy two reindeer and get a third for half price with code <code>HERD21</code>.": "演示优惠码 <code>HERD21</code> 表示买两只麋鹿第三只半价，不能真正使用。",
  "Packing day": "装箱的一天",
  "Each calendar is packed in a reusable cotton storage bag.": "每套日历会装进可重复使用的棉布收纳袋。",
  "Almost there": "就快到了",
  "Tomorrow the star goes on top. Get the camera ready.": "明天就要把星星放到树顶。把相机准备好吧。",
  "Merry Christmas!": "圣诞快乐！",
  "The star goes on top. Thank you for decorating with us this year.": "把星星放到树顶。谢谢你今年和我们一起装饰。",
  "United States": "美国",
  "Canada": "加拿大",
  "United Kingdom": "英国",
  "Germany": "德国",
  "France": "法国",
  "Netherlands": "荷兰",
  "Australia": "澳大利亚",
  "Japan": "日本",
  "China (mainland)": "中国大陆",
  "Standard shipping": "标准配送",
  "Express shipping": "加急配送"
};

export function t(s) {
  if (!isZh()) return s;
  return Object.hasOwn(ZH, s) ? ZH[s] : s;
}

export const msg = {
  addedToCart(label) {
    return isZh() ? `已加入清单：${label}。（演示：还没有结算付款。）` : `Added to cart: ${label}. (Prototype: there's no checkout yet.)`;
  },
  formThanks(who) {
    const name = (who || '').trim();
    return isZh()
      ? `谢谢${name ? '，' + name : ''}！在正式网站上，团队会在 1 个工作日内回复。（演示：信息没有发送。）`
      : `Thanks${name ? ', ' + name : ''}! On the live site our team would reply within 1 business day. (Prototype: nothing was sent.)`;
  },
  mascotSummary({ ears, body, face, brand, patch }) {
    return isZh()
      ? `${ears}吉祥物 · 主色 ${body} · ${face}性格 · 肚皮补丁「${brand}」（${patch}）`
      : `${ears} mascot · main color ${body} · ${face} personality · "${brand}" on a ${patch} belly patch`;
  },
  mascotConcept(summary) {
    return isZh() ? `来自吉祥物搭配器的方案：${summary}。` : `Concept from the mascot builder: ${summary}.`;
  },
  photoSummary(size, hair, extra) {
    return isZh()
      ? `${size} cm 玩偶 · ${hair}${extra ? ' · ' + extra : ''}`
      : `${size} cm plush · ${hair} hair${extra ? ' · ' + extra : ''}`;
  },
  addOrn(name) { return isZh() ? `把${name}加到树上` : `Add ${name} to the tree`; },
  dayOrn(i, name) { return isZh() ? `第 ${i} 天：${name}。拖出树外即可移除。` : `Day ${i}: ${name}. Drag it off the tree to remove it.`; },
  ornamentsToGo(n) { return isZh() ? `还差 ${n} 个。拖动挂饰可移动，拖出树外即可移除。` : `${n} to go. Drag an ornament to move it, or drag it off the tree to remove it.`; },
  removedOrn(name) { return isZh() ? `已移除${name}。` : `Removed ${name}.`; },
  deerSize(label) { return isZh() ? `${label} 麋鹿` : `${label} reindeer`; },
  deerFur(label) { return isZh() ? `${label}毛皮` : `${label} fur`; },
  deerScarf(label) { return isZh() ? `${label}围巾` : `${label} scarf`; },
  deerLogo(logo) { return isZh() ? `围巾上的「${logo}」` : `"${logo}" on the scarf`; },
  deerName(name) { return isZh() ? `刺绣「${name}」` : `"${name}" embroidered`; },
  deerConcept(summary, color) { return isZh() ? `来自麋鹿搭配器的设计：${summary}。围巾颜色：${color}。` : `Design from the reindeer builder: ${summary}. Scarf color: ${color}.`; },
  doorLabel(n, suffix) { return isZh() ? `12 月 ${n} 日${suffix}` : `December ${n}${suffix}`; },
  doorOpened() { return isZh() ? '，已打开' : ', opened'; },
  doorLocked() { return isZh() ? '，未到日期' : ', locked'; },
  doorInner(svg, n) { return isZh() ? `${svg}12/${n}` : `${svg}Dec ${n}`; },
  doorTitle(n, title) { return isZh() ? `12 月 ${n} 日：${title}` : `December ${n}: ${title}`; },
  doorLockedMsg(n, days) {
    return isZh()
      ? `这扇门会在 12 月 ${n} 日打开，还有 ${days} 天。勾选“预览全部门”可以现在查看。`
      : `This door opens on December ${n}, in ${days} day${days === 1 ? '' : 's'}. Tick "Preview all doors" to look now.`;
  },
  doorOpenedLabel(n) { return isZh() ? `12 月 ${n} 日，已打开` : `December ${n}, opened`; },
  shipOrderBy(date) { return isZh() ? `请在 ${date} 前下单（演示日期）` : `Order by ${date}`; },
  shipUnits() { return isZh() ? ['天', '小时', '分', '秒'] : ['days', 'hrs', 'min', 'sec']; },
  shipOpen(d, h, name, date) {
    return isZh()
      ? `🎁 距离寄往${name}的圣诞演示截止还有 <strong>${d} 天 ${h} 小时</strong>（${date} 前，非承诺送达）`
      : `🎁 Order within <strong>${d} days ${h} hrs</strong> for Christmas delivery to ${name} (by ${date})`;
  },
  shipExpress(d, h, name) {
    return isZh()
      ? `⚡ 仅剩加急：寄往${name}的演示加急截止还有 <strong>${d} 天 ${h} 小时</strong>（非承诺送达）`
      : `⚡ Express only: order within <strong>${d} days ${h} hrs</strong> for Christmas delivery to ${name}`;
  },
  shipClosed(name) {
    return isZh()
      ? `寄往${name}的圣诞演示截止已过。现在询价仅作新年送达参考，并非承诺。`
      : `Christmas shipping to ${name} has closed. Order now for New Year delivery.`;
  },
};

export const HOME_LINES = () => isZh() ? [
  '嘻嘻，好痒！',
  '我是设计师手工画出来的。',
  '我最初只是一张铅笔草图。',
  '我也可以穿上你们公司的颜色！',
  '想要一只带你们 logo 的我吗？',
  '我是演示用的品牌形象，轻轻捏一下试试。',
] : [
  'Hee hee, that tickles!',
  'Our designers drew me by hand.',
  'I started as a pencil sketch.',
  'I can wear your company colors!',
  'Want one of me with your logo?',
  "Soft and squeezable — I'm just a prototype mascot.",
];

