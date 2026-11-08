G.add({
  id: "c11", n: "۱۱", short: "Yazi قدم‌به‌قدم",
  t: "Yazi قدم‌به‌قدم: مدیر فایل تو از این به بعد",
  what: "ده درس عملی Yazi، از باز کردن و حرکت تا جست‌وجو، زبانه، پیش‌نمایش، تنظیمات، میان‌برهای پوشه و افزونه‌ها. آخرش هم پروژهٔ پایانی: ساختن کل ساختار پوشه‌های خانه فقط با Yazi.",
  why: "Yazi سریع است، کاملاً با کیبورد کار می‌کند و کلیدهایش شبیه Vim‌اند. هر چه این‌جا یاد بگیری، در Neovim، lazygit و مرورگر هم به کار می‌آید.",
  time: "۱۰ درس × ۱۵ تا ۲۰ دقیقه",
  need: "Yazi نسخهٔ 26.x که Ryoku نصب کرده. پروکسی فقط برای درس افزونه‌ها لازم است.",
  steps: [
    { t: "درس ۱: باز کردن، سه ستون، خروج", b: [
      CMD({ c: "yazi --version\nyazi", d: "نسخه را نشان می‌دهد و Yazi را در پوشهٔ فعلی باز می‌کند.", on: "laptop",
        out: "Yazi 26.9.1 (…)" }),
      P("Yazi سه ستون دارد: <b>چپ</b> پوشهٔ والد، <b>وسط</b> پوشهٔ فعلی (نشانگر این‌جاست) و <b>راست</b> پیش‌نمایش موردی که رویش هستی (محتوای پوشه، متن فایل، عکس، PDF). نوار پایین اسم، اندازه، مجوز و شمارهٔ مورد را نشان می‌دهد."),
      TBL(["کلید", "کار"], [[K("q"), "خروج"], [K("Q"), "خروج بدون عوض کردن پوشهٔ ترمینال (درس ۲)"], [K("~") + " یا " + K("F1"), "راهنمای کامل کلیدها، با قابلیت فیلتر"], [K("Esc"), "لغو هر کار نیمه‌کاره"]]),
      C("concept", "میان‌بر Ryoku", K("Super+Alt+E") + " در Ryoku یک kitty تازه با Yazi باز می‌کند (" + K("Super+E") + " مدیر فایل گرافیکی، یعنی Nautilus را باز می‌کند)."),
      C("ex", "", "Yazi را باز کن، " + K("~") + " بزن، <code>trash</code> تایپ کن تا فقط کلیدهای مربوط به سطل زباله بمانند. با " + K("Esc") + " و " + K("q") + " خارج شو.")
    ]},
    { t: "درس ۲: تابع y که هنگام خروج به همان پوشه می‌رود", b: [
      P("اگر Yazi را با <code>yazi</code> باز کنی و در آن به پوشهٔ دیگری بروی، بعد از خروج ترمینال هنوز در پوشهٔ قبلی است. مستندات Yazi تابعی به اسم <code>y</code> پیشنهاد می‌کند که بعد از خروج، ترمینال را به آخرین پوشهٔ Yazi می‌برد. نسخهٔ fish را به user.fish اضافه کن:"),
      FILE({ path: "~/.config/fish/user.fish  (اضافه کن)", d: "تابع y از مستندات رسمی Yazi، نسخهٔ fish.", c: "# ---------- yazi: cd to the last folder on quit ----------\nfunction y\n\tset tmp (mktemp -t \"yazi-cwd.XXXXXX\")\n\tcommand yazi $argv --cwd-file=\"$tmp\"\n\tif read -z cwd < \"$tmp\"; and [ \"$cwd\" != \"$PWD\" ]; and test -d \"$cwd\"\n\t\tbuiltin cd -- \"$cwd\"\n\tend\n\tcommand rm -f -- \"$tmp\"\nend",
        note: "کپی کن و <code>wl-paste &gt;&gt; ~/.config/fish/user.fish</code>، بعد <code>source ~/.config/fish/user.fish</code>. Yazi موقع خروج با " + K("q") + " پوشهٔ آخر را در یک فایل موقت می‌نویسد و تابع، ترمینال را به آن‌جا می‌برد. " + K("Q") + " این کار را نمی‌کند." }),
      C("ex", "", "<code>y</code> بزن، با " + K("l") + " وارد ‎.config و بعد kitty شو و " + K("q") + " بزن. <code>pwd</code> باید ‎~/.config/kitty را نشان بدهد. حالا <code>y</code> و بعد " + K("Q") + " را امتحان کن.")
    ]},
    { t: "درس ۳: حرکت", b: [
      TBL(["کلید", "کار"], [
        [K("j") + " / " + K("k") + " (یا ↓ ↑)", "پایین / بالا"],
        [K("l") + " (یا →)", "ورود به پوشه"],
        [K("h") + " (یا ←)", "برگشت به پوشهٔ والد"],
        [K("Enter") + " یا " + K("o"), "باز کردن فایل با برنامهٔ پیش‌فرض"],
        [K("O"), "باز کردن با انتخاب برنامه"],
        [K("g") + " " + K("g") + " / " + K("G"), "اول / آخر فهرست"],
        [K("J") + " / " + K("K"), "اسکرول پیش‌نمایش ۵ واحد پایین / بالا"],
        [K("."), "نمایش یا پنهان کردن فایل‌های مخفی (در Ryoku پیش‌فرض روشن است)"],
        [K("g") + " " + K("h"), "خانه (~)"],
        [K("g") + " " + K("c"), "‎~/.config"],
        [K("g") + " " + K("d"), "‎~/Downloads (در درس ۹ این را به /data تغییر می‌دهیم)"],
        [K("g") + " " + K("Space"), "رفتن به یک مسیر با تایپ"],
        [K("Tab"), "اطلاعات کامل فایل"]
      ]),
      C("ex", "", "بدون فلش‌ها: از خانه به <code>/etc</code> برو (" + K("g") + " " + K("Space") + " و تایپ <code>/etc</code>)، فایل <code>pacman.conf</code> را پیدا کن و پیش‌نمایشش را با " + K("J") + " اسکرول کن. با " + K("g") + " " + K("h") + " به خانه برگرد.")
    ]},
    { t: "درس ۴: ساختن، تغییر نام و تغییر نام گروهی", b: [
      TBL(["کلید", "کار"], [
        [K("a"), "ساختن. اسم را تایپ کن: اگر با <code>/</code> تمام شود پوشه است، وگرنه فایل."],
        [K("r"), "تغییر نام. نشانگر قبل از پسوند قرار می‌گیرد تا پسوند را دست نزنی."],
        [K("r") + " روی چند فایل انتخاب‌شده", "تغییر نام گروهی: فهرست اسم‌ها در Neovim باز می‌شود؛ هر خط را عوض کن، <code>:wq</code> بزن و تأیید کن."]
      ]),
      C("ex", "", "در ‎~/lab (از فصل ۱۰) با " + K("a") + " پوشهٔ <code>yazi-test/</code> را بساز و داخلش سه فایل <code>one.txt</code>، <code>two.txt</code> و <code>three.txt</code> بساز. بعد با درس بعد هر سه را انتخاب کن و با " + K("r") + " اسم‌شان را گروهی به <code>01-one.txt</code> و … تغییر بده. در Neovim با " + K("Ctrl+V") + " می‌توانی ستون اول همهٔ خط‌ها را با هم ویرایش کنی؛ اگر سخت بود، خط‌به‌خط بنویس.")
    ]},
    { t: "درس ۵: انتخاب، کپی، برش، چسباندن و حذف", b: [
      TBL(["کلید", "کار"], [
        [K("Space"), "انتخاب یا لغو انتخاب مورد فعلی (و رفتن به بعدی)"],
        [K("v") + " / " + K("V"), "حالت انتخاب بصری / حالت لغو انتخاب بصری؛ با j/k گسترشش بده"],
        [K("Ctrl+a") + " / " + K("Ctrl+r"), "انتخاب همه / برعکس کردن انتخاب"],
        [K("Esc"), "لغو انتخاب"],
        [K("y"), "کپی (yank) انتخاب‌شده‌ها"],
        [K("x"), "برش (cut)"],
        [K("p") + " / " + K("P"), "چسباندن / چسباندن با بازنویسی اگر فایل هم‌نام هست"],
        [K("Y") + " یا " + K("X"), "لغو حالت کپی یا برش"],
        [K("d"), "فرستادن به سطل زباله (برگشت‌پذیر)"],
        [K("D"), "حذف همیشگی (با تأیید)"],
        [K("g") + " " + K("t"), "رفتن به سطل زباله"]
      ]),
      C("warn", "Undo ندارد", "Yazi دکمهٔ برگرداندن ندارد. برای همین " + K("d") + " (سطل زباله) را عادت کن و " + K("D") + " را فقط وقتی مطمئنی بزن. فایل‌هایی که با d حذف شده‌اند در سطل زبالهٔ استاندارد (‎~/.local/share/Trash) هستند و با <code>trash-restore</code> در ترمینال یا از طریق " + K("g") + " " + K("t") + " برمی‌گردند."),
      C("ex", "", "دو فایل از yazi-test را با Space انتخاب کن، با " + K("y") + " کپی کن، با " + K("h") + " به ‎~/lab برو و " + K("p") + " بزن. حالا یکی‌شان را با " + K("d") + " به سطل زباله بفرست و در ترمینال با <code>trash-restore</code> برگردانش.")
    ]},
    { t: "درس ۶: فیلتر، پیدا کردن و جست‌وجو", b: [
      TBL(["کلید", "کار"], [
        [K("f"), "فیلتر: فقط مواردی که اسم‌شان شامل متن تایپ‌شده است، در همین پوشه دیده می‌شوند"],
        [K("/") + " / " + K("?"), "پیدا کردن مورد بعدی / قبلی که اسمش منطبق است"],
        [K("n") + " / " + K("N"), "نتیجهٔ بعدی / قبلی"],
        [K("s"), "جست‌وجوی اسم در همهٔ زیرپوشه‌ها با fd"],
        [K("S"), "جست‌وجوی متن داخل فایل‌ها با ripgrep"],
        [K("Ctrl+s"), "لغو جست‌وجوی در حال اجرا"],
        [K("z"), "پریدن به فایل یا پوشه در زیرشاخه‌ها با fzf"],
        [K("Z"), "پریدن به پوشه‌های پرکاربرد با zoxide (همان cd ترمینال)"]
      ]),
      C("concept", "z کوچک و Z بزرگ", "در Yazi نسخهٔ فعلی، " + K("z") + " کوچک fzf است (جست‌وجوی تقریبی زیر همین پوشه) و " + K("Z") + " بزرگ zoxide (پوشه‌هایی که قبلاً رفته‌ای، از هر جا). ترتیبش را با منابع قدیمی قاطی نکن."),
      C("ex", "", "در خانه " + K("S") + " بزن و <code>kb_layout</code> را جست‌وجو کن؛ نتیجه را باز کن. بعد " + K("Z") + " بزن و <code>kitty</code> تایپ کن تا مستقیم به پوشهٔ تنظیماتش بپری.")
    ]},
    { t: "درس ۷: زبانه‌ها، کارهای پس‌زمینه، کپی مسیر و پوسته", b: [
      TBL(["کلید", "کار"], [
        [K("t") + " " + K("t"), "زبانهٔ جدید در همین پوشه"],
        [K("1") + " … " + K("9"), "رفتن به زبانهٔ شمارهٔ N"],
        [K("[") + " / " + K("]"), "زبانهٔ قبلی / بعدی"],
        [K("{") + " / " + K("}"), "جابه‌جا کردن زبانه با قبلی / بعدی"],
        [K("t") + " " + K("r"), "تغییر نام زبانه"],
        [K("Ctrl+c"), "بستن زبانهٔ فعلی"],
        [K("w"), "مدیر کارها: کپی‌های بزرگ و کارهای شکست‌خورده را نشان می‌دهد"],
        [K("c") + " " + K("c") + " / " + K("c") + " " + K("d") + " / " + K("c") + " " + K("f") + " / " + K("c") + " " + K("n"), "کپی مسیر کامل / مسیر پوشه / اسم فایل / اسم بدون پسوند در کلیپ‌بورد"],
        [K(";") + " / " + K(":"), "اجرای یک دستور پوسته روی فایل‌ها / همان، با منتظر ماندن تا تمام شود"],
        [K(",") + " سپس " + K("m") + "، " + K("s") + "، " + K("a") + "، " + K("e"), "مرتب‌سازی بر اساس زمان تغییر، اندازه، الفبا، پسوند (حرف بزرگ = برعکس)"]
      ]),
      C("ex", "", "یک زبانه در ‎~/lab و یکی در /data باز کن. از اولی یک فایل را با " + K("y") + " کپی کن، با " + K("2") + " به زبانهٔ دوم برو و در ‎/data/idk " + K("p") + " بزن. در همین حین " + K("w") + " را ببین.")
    ]},
    { t: "درس ۸: پیش‌نمایش عکس، ویدیو، PDF و آرشیو", b: [
      P("Yazi پیش‌نمایش‌ها را با ابزارهای کمکی می‌سازد. طبق مستندات نصب Yazi برای Arch، این‌ها لازم‌اند (بیشترشان در Ryoku از قبل نصب‌اند):"),
      CMD({ c: "sudo pacman -S --needed ffmpeg 7zip jq poppler fd ripgrep fzf zoxide resvg imagemagick", d: "همهٔ ابزارهای پیش‌نمایش Yazi را نصب می‌کند (فقط کمبودها).", on: "laptop", root: true, net: "net",
        parts: [["ffmpeg", "عکس کوچک ویدیو (Yazi دیگر ffmpegthumbnailer لازم ندارد)"], ["7zip", "پیش‌نمایش و باز کردن آرشیو"], ["jq", "JSON"], ["poppler", "PDF"], ["resvg", "SVG"], ["imagemagick", "فونت، HEIC و JPEG XL"], ["fd / ripgrep / fzf / zoxide", "جست‌وجو و پرش"]] }),
      C("concept", "عکس در ترمینال", "kitty پروتکل گرافیکی خودش را دارد و Yazi به‌طور خودکار از آن استفاده می‌کند؛ یعنی عکس واقعی در ستون پیش‌نمایش می‌بینی، نه کاراکترهای رنگی. داخل tmux تنظیم اضافه لازم است (پایین)."),
      FILE({ path: "~/.tmux.conf  (فقط اگر Yazi را داخل tmux اجرا می‌کنی)", c: "set -g allow-passthrough on\nset -ga update-environment TERM\nset -ga update-environment TERM_PROGRAM",
        note: "بعد tmux را کامل ری‌استارت کن: <code>tmux kill-server</code>." }),
      C("ex", "", "به ‎/usr/share/backgrounds یا هر پوشهٔ عکس برو و با j/k بین عکس‌ها حرکت کن. یک PDF و یک فایل zip را هم پیش‌نمایش کن.")
    ]},
    { t: "درس ۹: تنظیمات، میان‌برهای g و برنامه‌های بازکننده", b: [
      TBL(["فایل در ‎~/.config/yazi", "مال کیست؟", "چه کنی"], [
        ["<code>yazi.toml</code>", "Ryoku (با هر به‌روزرسانی بازنویسی می‌شود)", "برای تغییر، یک «fork» در ‎~/.config/ryoku/user_edits بساز (پایین)"],
        ["<code>keymap.toml</code>", "تو (Ryoku آن را ندارد)", "مستقیم بساز و ویرایش کن"],
        ["<code>init.lua</code>", "تو", "تنظیم افزونه‌ها (درس ۱۰)"],
        ["<code>theme.toml</code>", "matugen (از روی والپیپر ساخته می‌شود)", "دست نزن؛ با عوض کردن والپیپر بازنویسی می‌شود"]
      ]),
      CMD({ c: "ryoku owner ~/.config/yazi/yazi.toml ~/.config/yazi/keymap.toml", d: "ابزار Ryoku می‌گوید هر فایل مال کیست و تغییرت را کجا باید بدهی.", on: "laptop" }),
      H("میان‌برهای پوشه (bookmark) با g"),
      FILE({ path: "~/.config/yazi/keymap.toml", d: "پرش با دو کلید به پوشه‌های اصلی‌ات. prepend یعنی قبل از کلیدهای پیش‌فرض بررسی شود؛ برای همین g d جای Downloads را می‌گیرد.", c: "[[mgr.prepend_keymap]]\non   = [ \"g\", \"p\" ]\nrun  = \"cd ~/Projects\"\ndesc = \"Go to Projects\"\n\n[[mgr.prepend_keymap]]\non   = [ \"g\", \"d\" ]\nrun  = \"cd /data\"\ndesc = \"Go to /data\"\n\n[[mgr.prepend_keymap]]\non   = [ \"g\", \"w\" ]\nrun  = \"cd ~/Downloads\"\ndesc = \"Go to Downloads\"\n\n[[mgr.prepend_keymap]]\non   = [ \"g\", \"n\" ]\nrun  = \"cd ~/Notes\"\ndesc = \"Go to Notes\"\n\n[[mgr.prepend_keymap]]\non   = [ \"g\", \"a\" ]\nrun  = \"cd ~/AI\"\ndesc = \"Go to AI\"\n\n[[mgr.prepend_keymap]]\non   = [ \"g\", \"s\" ]\nrun  = \"cd ~/System\"\ndesc = \"Go to System\"\n\n[[mgr.prepend_keymap]]\non   = [ \"g\", \"v\" ]\nrun  = \"cd ~/Vaults\"\ndesc = \"Go to Vaults\"\n\n[[mgr.prepend_keymap]]\non   = [ \"g\", \"i\" ]\nrun  = \"cd ~/idk\"\ndesc = \"Go to idk\"\n\n[[mgr.prepend_keymap]]\non   = [ \"g\", \"m\" ]\nrun  = \"cd /data/media\"\ndesc = \"Go to /data/media\"\n\n[[mgr.prepend_keymap]]\non   = [ \"g\", \"b\" ]\nrun  = \"cd /data/backups\"\ndesc = \"Go to /data/backups\"",
        note: "ذخیره: کپی کن و <code>wl-paste &gt; ~/.config/yazi/keymap.toml</code> (یک ‎&gt; یعنی فایل از نو نوشته شود). Yazi را ببند و باز کن. بخش <code>[mgr]</code> اسم جدید بخش قدیمی <code>[manager]</code> است؛ در راهنماهای قدیمی اینترنت آن را می‌بینی." }),
      H("بازکننده‌ها: هر نوع فایل با برنامهٔ درست"),
      P("Ryoku فایل‌های متنی را در Neovim باز می‌کند. برای این‌که عکس با imv، PDF با zathura و ویدیو با mpv باز شود، باید yazi.toml را عوض کنی. چون این فایل مال Ryoku است، نسخهٔ خودت را در لایهٔ user_edits می‌گذاری تا به‌روزرسانی‌ها رویش ننویسند:"),
      FILE({ path: "~/.config/ryoku/user_edits/yazi/yazi.toml", d: "نسخهٔ کامل yazi.toml: تنظیمات خود Ryoku به‌علاوهٔ بازکننده‌های تو و ثبت افزونهٔ git (درس ۱۰).", c: "# my fork of Ryoku's yazi.toml (ryoku materialize lays it over the base)\n\n[mgr]\nshow_hidden = true\n\n[opener]\nedit = [\n  { run = 'nvim %s', block = true, desc = 'Edit with Neovim', for = 'unix' },\n]\nimage = [\n  { run = 'imv %s', orphan = true, desc = 'imv', for = 'unix' },\n]\npdf = [\n  { run = 'zathura %s', orphan = true, desc = 'Zathura', for = 'unix' },\n]\nvideo = [\n  { run = 'mpv %s', orphan = true, desc = 'mpv', for = 'unix' },\n]\n\n[open]\nprepend_rules = [\n  { mime = 'image/*', use = [ 'image', 'open' ] },\n  { mime = 'application/pdf', use = [ 'pdf', 'open' ] },\n  { mime = 'video/*', use = [ 'video', 'open' ] },\n  { mime = 'text/*', use = 'edit' },\n  { mime = 'application/json', use = 'edit' },\n  { mime = 'application/xml', use = 'edit' },\n  { url = '*.toml', use = 'edit' },\n  { url = '*.json', use = 'edit' },\n  { url = '*.kdl', use = 'edit' },\n  { url = '*.yml', use = 'edit' },\n  { url = '*.yaml', use = 'edit' },\n  { url = '*.conf', use = 'edit' },\n]\n\n[[plugin.prepend_fetchers]]\nurl   = '*'\nrun   = 'git'\ngroup = 'git'\n\n[[plugin.prepend_fetchers]]\nurl   = '*/'\nrun   = 'git'\ngroup = 'git'",
        note: "ساختن: <code>mkdir -p ~/.config/ryoku/user_edits/yazi</code>، بعد کپی کن و <code>wl-paste &gt; ~/.config/ryoku/user_edits/yazi/yazi.toml</code>، بعد <code>ryoku materialize</code> تا روی ‎~/.config/yazi/yazi.toml نوشته شود. بخش fetchers تا وقتی افزونهٔ git را نصب نکرده‌ای (درس ۱۰) باعث هشدار می‌شود؛ اگر هنوز نصبش نکرده‌ای، آن دو بلوک آخر را فعلاً حذف کن. Ryoku در نسخهٔ خودش <code>nvim \"$@\"</code> نوشته؛ این‌جا طبق مستندات فعلی Yazi از <code>%s</code> استفاده شده." }),
      UV("روال fork کردن در user_edits و اجرای ryoku materialize را از مستندات مخزن Ryoku (docs/updates.md و docs/cli.md) برداشتم، ولی روی دستگاه واقعی آزمایش نکردم. بعد از materialize با <code>ryoku owner ~/.config/yazi/yazi.toml</code> بررسی کن که کلاس آن forked یا overlay شده است. راه سریع و موقتی: همین محتوا را مستقیم در ‎~/.config/yazi/yazi.toml بنویس؛ با اولین ryoku update برمی‌گردد.")
    ]},
    { t: "درس ۱۰: افزونه‌ها با ya pkg", b: [
      C("concept", "ya pkg", "ابزار <code>ya</code> همراه Yazi نصب می‌شود. زیرفرمان <code>ya pkg</code> (که جای <code>ya pack</code> قدیمی را گرفته) افزونه‌ها را از GitHub دانلود می‌کند و نسخه‌شان را در <code>~/.config/yazi/package.toml</code> قفل می‌کند. پس پروکسی لازم است."),
      CMD({ c: "proxy-on\nya pkg add yazi-rs/plugins:smart-enter yazi-rs/plugins:full-border yazi-rs/plugins:toggle-pane yazi-rs/plugins:git yazi-rs/plugins:chmod yazi-rs/plugins:mount\nya pkg list", d: "شش افزونهٔ رسمی تیم Yazi را نصب و فهرست‌شان را نشان می‌دهد.", on: "laptop", net: "proxy",
        parts: [["yazi-rs/plugins:smart-enter", "یک کلید (l) هم برای ورود به پوشه، هم باز کردن فایل"], ["full-border", "قاب کامل دور ستون‌ها؛ فقط ظاهر"], ["toggle-pane", "مخفی یا بزرگ کردن ستون پیش‌نمایش"], ["git", "وضعیت git فایل‌ها کنار اسم‌شان"], ["chmod", "تغییر مجوز فایل‌های انتخاب‌شده"], ["mount", "سوار و پیاده کردن فلش و دیسک (به udisks2 نیاز دارد)"]],
        ok: "هر شش نام در خروجی ya pkg list. به‌روزرسانی بعدی‌شان: <code>ya pkg upgrade</code>. روی سیستم جدید با همان package.toml: <code>ya pkg install</code>." }),
      FILE({ path: "~/.config/yazi/init.lua", d: "افزونه‌هایی را که تنظیم اولیه لازم دارند فعال می‌کند.", c: "require(\"full-border\"):setup()\nrequire(\"git\"):setup { order = 1500 }",
        note: "<code>wl-paste &gt; ~/.config/yazi/init.lua</code>. یادت نرود fetcherهای git را در yazi.toml (درس ۹) داشته باشی." }),
      FILE({ path: "~/.config/yazi/keymap.toml  (به انتها اضافه کن)", d: "کلید برای افزونه‌ها.", c: "\n[[mgr.prepend_keymap]]\non   = \"l\"\nrun  = \"plugin smart-enter\"\ndesc = \"Enter the child directory, or open the file\"\n\n[[mgr.prepend_keymap]]\non   = \"T\"\nrun  = \"plugin toggle-pane max-preview\"\ndesc = \"Maximize or restore the preview pane\"\n\n[[mgr.prepend_keymap]]\non   = [ \"c\", \"m\" ]\nrun  = \"plugin chmod\"\ndesc = \"Chmod on selected files\"\n\n[[mgr.prepend_keymap]]\non   = \"M\"\nrun  = \"plugin mount\"\ndesc = \"Mount manager\"",
        note: "<code>wl-paste &gt;&gt; ~/.config/yazi/keymap.toml</code> (دو ‎&gt; یعنی اضافه کن). افزونهٔ mount ابزار udisksctl را لازم دارد: <code>sudo pacman -S --needed udisks2</code>." }),
      C("check", "", "Yazi را دوباره باز کن: قاب کامل دیده شود، در یک مخزن git (مثلاً ‎~/.config اگر فصل ۱۳ را رفته‌ای) علامت‌های تغییر کنار فایل‌ها بیاید، " + K("T") + " پیش‌نمایش را بزرگ کند و " + K("M") + " فهرست دیسک‌ها را نشان بدهد."),
      C("fix", "", "اگر ya pkg خطای اتصال داد، proxy-on را چک کن و دوباره بزن. اگر Yazi بعد از ویرایش init.lua یا keymap.toml خطا داد، پیامش معمولاً شمارهٔ خط اشتباه را می‌گوید. اگر نسخهٔ Yazi و افزونه‌ها با هم نمی‌خوانند، اول <code>sudo pacman -Syu</code> و بعد <code>ya pkg upgrade</code>.")
    ]},
    { t: "پروژهٔ پایانی: ساختار پوشه‌های خانه فقط با Yazi", b: [
      P("بدون موس و بدون <code>mkdir</code>، فقط با Yazi این ساختار را در خانه بساز:"),
      FILE({ path: "ساختار هدف", c: "~/\n├── Projects/\n│   ├── ryoku-lab/\n│   └── scripts/\n├── Content/\n├── Notes/\n│   ├── inbox/\n│   └── linux/\n├── AI/\n├── System/\n│   ├── dotfiles/\n│   └── screenshots/\n├── Apps/\n├── Vaults/\n└── idk/" }),
      OL(
        "<code>y ~</code> بزن.",
        K("a") + " و تایپ کن <code>Projects/</code> و Enter. برای Content، Notes، AI، System، Apps، Vaults و idk تکرار کن.",
        "با " + K("j") + "/" + K("k") + " روی Projects برو، " + K("l") + " بزن و داخلش با " + K("a") + " پوشه‌های <code>ryoku-lab/</code> و <code>scripts/</code> را بساز.",
        "برای Notes و System هم همین کار را بکن. (ساختن تودرتو مثل <code>Notes/inbox/</code> هم معمولاً با یک بار " + K("a") + " کار می‌کند؛ اگر نشد، یکی‌یکی بساز.)",
        "با " + K("g") + " " + K("h") + " به خانه برگرد و با " + K("g") + " " + K("p") + "، " + K("g") + " " + K("n") + " و بقیهٔ میان‌برهای درس ۹ امتحان کن که پریدن‌ها کار می‌کنند.",
        "فایل <code>~/Notes/linux/yazi-cheatsheet.md</code> را با " + K("a") + " بساز، با " + K("Enter") + " در Neovim بازش کن و ده کلیدی را که بیشتر از همه استفاده می‌کنی بنویس."
      ),
      C("check", "", "در ترمینال: <code>lt ~</code> (درخت دو سطحی). ساختار باید با بالا یکی باشد."),
      C("ex", "چالش", "فایل تقلب را با " + K("y") + " کپی کن، با " + K("g") + " " + K("d") + " به /data برو، وارد backups شو و " + K("p") + " بزن. بعد اسم نسخهٔ پشتیبان را با " + K("r") + " به <code>yazi-cheatsheet-backup.md</code> تغییر بده. همهٔ این‌ها بدون یک بار دست زدن به موس.")
    ]}
  ],
  end: ["تابع y در user.fish است و با q به پوشهٔ آخر می‌روم.", "با hjkl، gg/G و میان‌برهای g حرکت می‌کنم.", "انتخاب، کپی، برش، سطل زباله و تغییر نام گروهی را انجام دادم.", "s، S، z و Z را می‌شناسم.", "keymap.toml با میان‌برهای g p و g d دارم.", "حداقل سه افزونه با ya pkg نصب کردم.", "ساختار پوشه‌های خانه را فقط با Yazi ساختم."],
  probs: [
    ["پیش‌نمایش عکس دیده نمی‌شود.", "داخل tmux هستی؟ تنظیمات درس ۸ را بزن. بیرون از kitty (مثلاً در ترمینال Fedora) هم ممکن است پشتیبانی نشود."],
    ["کلیدهای جدید keymap.toml کار نمی‌کنند.", "Yazi را کامل ببند و باز کن. بخش باید [mgr] باشد، نه [manager]. خطای نحوی TOML را با bat ~/.config/yazi/keymap.toml ببین."],
    ["ya pkg add می‌گوید failed to fetch.", "proxy-on نزده‌ای یا GitHub در دسترس نیست. curl -I https://github.com را امتحان کن."],
    ["تغییر yazi.toml بعد از به‌روزرسانی برگشت.", "آن را در ‎~/.config/ryoku/user_edits/yazi/ بگذار (درس ۹)."]
  ],
  src: [
    ["Yazi: Quick Start (کلیدها و تابع y)", "https://yazi-rs.github.io/docs/quick-start/"],
    ["Yazi: Installation (وابستگی‌های پیش‌نمایش)", "https://yazi-rs.github.io/docs/installation/"],
    ["Yazi: keymap.toml", "https://yazi-rs.github.io/docs/configuration/keymap/"],
    ["Yazi: yazi.toml (opener و open)", "https://yazi-rs.github.io/docs/configuration/yazi/"],
    ["Yazi: CLI (ya pkg)", "https://yazi-rs.github.io/docs/cli/"],
    ["Yazi: Image preview", "https://yazi-rs.github.io/docs/image-preview/"],
    ["Yazi default keymap (keymap-default.toml)", "https://github.com/sxyazi/yazi/blob/main/yazi-config/preset/keymap-default.toml"],
    ["yazi-rs/plugins", "https://github.com/yazi-rs/plugins"],
    ["Ryoku repo: ryoku/apps/yazi/yazi.toml", "https://github.com/ryoku-dev/ryoku/blob/main/ryoku/apps/yazi/yazi.toml"],
    ["Ryoku repo: docs/updates.md (user_edits)", "https://github.com/ryoku-dev/ryoku/blob/main/docs/updates.md"]
  ]
});
