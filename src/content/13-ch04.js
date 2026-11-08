G.add({
  id: "c4", n: "۴", short: "اولین بوت",
  t: "اولین بوت: ورود، وای‌فای، چیدمان فارسی، به‌روزرسانی و اسنپ‌شات",
  what: "وارد دسکتاپ می‌شویم، با کیبورد چرخی در آن می‌زنیم، از ترمینال به وای‌فای وصل می‌شویم، چیدمان فارسی را اضافه می‌کنیم، سلامت سیستم را می‌سنجیم، آینه‌های سریع را تنظیم می‌کنیم و یاد می‌گیریم با اسنپ‌شات سیستم را به عقب برگردانیم.",
  why: "قبل از نصب هر برنامه‌ای باید شبکه، به‌روزرسانی و دکمهٔ برگشت کار کنند. با این‌ها از این به بعد هر اشتباهی قابل جبران است.",
  time: "۶۰ تا ۹۰ دقیقه",
  need: "رمز وای‌فای، کیبورد لپ‌تاپ (K860 را در فصل ۶ وصل می‌کنیم).",
  steps: [
    { t: "منوی Limine و صفحهٔ ورود", b: [
      P("بعد از روشن‌شدن، منوی [[Limine|limine]] حدود ۳ ثانیه نمایش داده می‌شود و بعد خودکار سیستم را بالا می‌آورد. اگر در همین ۳ ثانیه یکی از فلش‌ها را بزنی، شمارش متوقف می‌شود. در این منو یک ورودی <b>Ryoku Linux</b> با هسته‌ها و یک زیرمنوی <b>Snapshots</b> می‌بینی که بعداً به کارمان می‌آید."),
      P("در صفحهٔ ورود (SDDM)، نشست <b>Ryoku (Hyprland)</b> را انتخاب کن، رمز را بزن و Enter."),
      C("concept", "اگر صفحه بعد از Limine سیاه ماند", "فصل ۱۴، بخش «صفحهٔ سیاه بعد از بوت» را ببین. راه سریع: در منوی Limine با اسنپ‌شات یا ورودی fallback بالا بیا.")
    ]},
    { t: "تور خوش‌آمدگویی و چهار کلید اول", b: [
      P("بار اول یک تور پنج‌صفحه‌ای باز می‌شود: خوش‌آمد، کلیدهای مهم، شناخت دسکتاپ، شخصی‌سازی (مقیاس رابط، نوار، ویجت‌ها، والپیپر) و پایان. اگر همه‌چیز خیلی بزرگ است، در صفحهٔ «Make it yours» مقیاس رابط (Interface scale) را کم کن."),
      TBL(["کلید", "کار"], [
        [K("Super+Return"), "باز کردن ترمینال kitty"],
        [K("Super+Space"), "لانچر: تایپ کن، Enter بزن (برنامه، فایل، ماشین‌حساب…)"],
        [K("Super+,"), "Ryoku Hub، مرکز همهٔ تنظیمات"],
        [K("Super+K"), "Kit: برگهٔ تقلب کلیدها (دوباره بزن تا بسته شود)"],
        [K("Super+Q"), "بستن پنجرهٔ فعال"],
        [K("Super+Escape"), "تنظیمات سریع: خاموش، ری‌استارت، خروج، وای‌فای"],
        [K("Super+L"), "قفل صفحه"],
        [K("Super+1") + " … " + K("Super+0"), "رفتن به [[فضای کاری|workspace]] ۱ تا ۱۰"]
      ]),
      C("ex", "تور بدون موس", "۱) " + K("Super+Return") + " بزن تا kitty باز شود. ۲) دوباره بزن تا دومی کنارش بیاید؛ ببین صفحه چطور تقسیم شد. ۳) با " + K("Super+←") + " و " + K("Super+→") + " بین‌شان برو. ۴) " + K("Super+2") + " بزن و یک ترمینال دیگر آن‌جا باز کن. ۵) با " + K("Super+1") + " برگرد. ۶) " + K("Super+K") + " را بزن و کلیدها را مرور کن. ۷) همهٔ ترمینال‌ها را با " + K("Super+Q") + " ببند.")
    ]},
    { t: "وصل شدن به وای‌فای از ترمینال", b: [
      C("concept", "شبکه در Ryoku", "مدیر شبکه [[NetworkManager|nm]] است و بخش وای‌فای را پشت صحنه [[iwd|iwd]] انجام می‌دهد. تو فقط با NetworkManager کار داری: ابزار ترمینالی <code>nmcli</code> و نسخهٔ منویی <code>nmtui</code>. وای‌فای از نوار بالا و Hub هم وصل می‌شود، ولی ترمینال را یاد بگیر چون همه‌جا کار می‌کند."),
      CMD({ c: "nmcli radio wifi on\nnmcli device wifi list", d: "وای‌فای را روشن می‌کند و شبکه‌های اطراف را با قدرت سیگنال نشان می‌دهد.", on: "laptop",
        out: "IN-USE  BSSID              SSID      MODE   CHAN  RATE        SIGNAL  BARS  SECURITY\n        AA:BB:CC:DD:EE:01  MyWiFi    Infra  6     130 Mbit/s  78      ▂▄▆_  WPA2\n        AA:BB:CC:DD:EE:02  MyWiFi    Infra  44    270 Mbit/s  64      ▂▄▆_  WPA2",
        ok: "اسم شبکه‌ات در ستون SSID دیده شود. اگر یک اسم دوبار آمده، یکی ۲٫۴ گیگاهرتز و یکی ۵ گیگاهرتز است (ستون CHAN بالای ۳۶ یعنی ۵ گیگ)." }),
      CMD({ c: "nmcli device wifi connect \"{{WIFI}}\" --ask", d: "به شبکه وصل می‌شود و رمز را می‌پرسد (رمز روی صفحه دیده نمی‌شود).", on: "laptop",
        parts: [["\"{{WIFI}}\"", "اسم شبکه داخل گیومهٔ انگلیسی، تا اگر فاصله داشت درست خوانده شود."], ["--ask", "رمز را به‌جای نوشتن در خود دستور، با سؤال بگیر تا در تاریخچهٔ پوسته ذخیره نشود."]],
        out: "Password: ••••••••\nDevice 'wlan0' successfully activated with '4f6c…'.",
        ok: "عبارت successfully activated. از این به بعد این شبکه خودکار وصل می‌شود." }),
      CMD({ c: "nmcli connection show --active\nping -c 3 8.8.8.8\nping -c 3 digikala.com", d: "اتصال فعال را نشان می‌دهد و اینترنت را با یک IP خارجی و یک سایت داخلی امتحان می‌کند.", on: "laptop",
        parts: [["ping -c 3", "سه بسته بفرست و تمام کن."], ["8.8.8.8", "یک IP عمومی؛ اگر جواب داد، اینترنت وصل است."], ["digikala.com", "یک دامنهٔ داخلی؛ اگر جواب داد، DNS هم کار می‌کند."]],
        out: "3 packets transmitted, 3 received, 0% packet loss, time 2003ms",
        ok: "0% packet loss. اگر IP جواب داد ولی دامنه نه، مشکل از DNS است (فصل ۱۴)." }),
      C("ex", "nmtui", "دستور <code>nmtui</code> را بزن. یک منوی متنی باز می‌شود که با فلش، Tab و Enter کار می‌کند. «Activate a connection» را ببین و با Esc خارج شو.")
    ]},
    { t: "اضافه کردن چیدمان فارسی (us + ir)", b: [
      P("در Hyprlandِ Ryoku، چیدمان کیبورد در فایل <code>~/.config/hypr/keyboard.lua</code> است. این فایل مال توست: بعد از نصب یک بار ساخته می‌شود و به‌روزرسانی‌ها به آن دست نمی‌زنند. خود فایل هم در توضیحاتش همین روش را برای چند چیدمان پیشنهاد می‌کند."),
      CMD({ c: "cat ~/.config/hypr/keyboard.lua", d: "محتوای فعلی فایل چیدمان را نشان می‌دهد.", on: "laptop",
        out: "hl.config({\n    input = {\n        kb_layout = \"us\",\n        kb_variant = \"\",\n        kb_options = \"\",\n    },\n})" }),
      CMD({ c: "sed -i 's/kb_layout = \"us\"/kb_layout = \"us,ir\"/; s/kb_options = \"\"/kb_options = \"grp:alt_shift_toggle\"/' ~/.config/hypr/keyboard.lua", d: "در فایل، چیدمان را «us,ir» و کلید جابه‌جایی را Alt+Shift می‌کند، بدون نیاز به ویرایشگر.", on: "laptop",
        parts: [["sed -i", "ویرایشگر جریانی؛ ‎-i یعنی تغییر را در خود فایل ذخیره کن."], ["s/قدیم/جدید/", "جایگزینی متن. دو جایگزینی با ; از هم جدا شده‌اند."], ["us,ir", "اول انگلیسی و دوم فارسی (استاندارد ملی ISIRI)."], ["grp:alt_shift_toggle", "با Alt+Shift بین چیدمان‌ها جابه‌جا شو."]],
        ok: "دستور چیزی چاپ نمی‌کند. با <code>grep kb_ ~/.config/hypr/keyboard.lua</code> باید <code>us,ir</code> و <code>grp:alt_shift_toggle</code> را ببینی." }),
      CMD({ c: "ryoku reload", d: "پوستهٔ Ryoku را ری‌استارت و تنظیمات Hyprland را دوباره بار می‌کند.", on: "laptop",
        ok: "حالا " + K("Alt+Shift") + " بزن و در یک ترمینال تایپ کن؛ حروف فارسی می‌آید. نشانگر چیدمان معمولاً در نوار بالا هم عوض می‌شود. با <code>hyprctl devices | grep -i keymap</code> هم می‌بینی کدام فعال است." }),
      C("concept", "چیدمان فارسی ویندوزی", "اگر به چیدمان فارسی ویندوز عادت داری (که جای بعضی حروف مثل «پ» و «چ» در آن فرق دارد)، به‌جای خط اول بنویس: <code>kb_variant = \",winkeys\"</code>. ویرگول اول یعنی «برای us چیزی عوض نشود»."),
      C("warn", "", "در Ryoku Hub > Input اگر چیدمان را از منو انتخاب کنی، یک تنظیم تک‌چیدمانی می‌نویسد که روی این فایل می‌نشیند. توضیحات خود فایل می‌گوید برای چند چیدمان، تنظیم کیبورد Hub را روی پیش‌فرض بگذار و فقط همین فایل را ویرایش کن."),
      FILE({ path: "~/.config/niri/user.kdl", d: "فقط اگر niri را انتخاب کرده‌ای: این را به انتهای فایل اضافه کن (user.kdl آخرین فایلی است که niri می‌خواند).", c: "input {\n    keyboard {\n        xkb {\n            layout \"us,ir\"\n            options \"grp:alt_shift_toggle\"\n        }\n    }\n}",
        note: "برای اضافه کردن بدون ویرایشگر: دکمهٔ کپی را بزن، بعد در ترمینال <code>wl-paste &gt;&gt; ~/.config/niri/user.kdl</code>. niri تغییر فایل را خودش می‌فهمد." })
    ]},
    { t: "معاینهٔ سلامت: ryoku doctor، status و verify", b: [
      CMD({ c: "ryoku doctor --check", d: "همهٔ بررسی‌های سلامت را اجرا می‌کند و فقط گزارش می‌دهد؛ چیزی را تغییر نمی‌دهد.", on: "laptop",
        out: "ok    snapper root config\nok    limine autoboot entry\nok    nvidia modeset\n…",
        ok: "بیشتر خط‌ها ok باشند. اگر خطی پیشنهاد اصلاح داد، گام بعدی آن را درست می‌کند." }),
      CMD({ c: "ryoku doctor", d: "اختلاف‌های امن را خودش درست می‌کند (قسمت‌هایی که نیاز به تصمیم دارند را فقط گزارش می‌دهد).", on: "laptop", root: true,
        note: "ممکن است برای بعضی اصلاح‌ها رمز sudo بپرسد. گزارش کامل در <code>~/.local/state/ryoku/doctor-report.txt</code> با <code>ryoku doctor --report</code> ساخته می‌شود." }),
      CMD({ c: "ryoku status\nryoku verify", d: "نسخهٔ Ryoku، به‌روزرسانی‌های در انتظار، تعداد اسنپ‌شات‌ها، و تطابق سیستم با نسخهٔ منتشرشده را نشان می‌دهد.", on: "laptop", net: "proxy",
        ok: "ryoku verify در حالت سالم می‌نویسد: <code>✓ this box is the machine the release describes</code>. اگر خطای اتصال داد، بعد از فصل ۵ دوباره بزن." })
    ]},
    { t: "آینه‌های سریع: آینه‌های ایرانی Arch و آینه‌های CachyOS", b: [
      C("concept", "دو نوع مخزن، دو فهرست آینه", "روی ویرایش CachyOS، pacman از چند مخزن می‌خواند: مخزن‌های CachyOS (فهرست آینه‌شان در <code>/etc/pacman.d/cachyos-mirrorlist</code> و نسخه‌های v3/v4)، مخزن‌های Arch (<code>/etc/pacman.d/mirrorlist</code>) و مخزن ryoku. [[آینه‌های|mirror]] Arch در ایران هم هست و بدون پروکسی سریع کار می‌کنند."),
      P("طبق صفحهٔ وضعیت آینه‌های Arch (۸ نوامبر ۲۰۲۶) این آینه‌های ایرانی فعال‌اند:"),
      TBL(["آینه", "پروتکل", "وضعیت"], [["mirror.famaserver.com", "https", "کامل و به‌روز (~۹۸٪)"], ["mirror.mobinhost.com", "https", "نیمه‌کامل (~۵۰٪)"], ["repo.iut.ac.ir", "فقط http", "~۹۰٪"]]),
      CMD({ c: "sudo cp /etc/pacman.d/mirrorlist /etc/pacman.d/mirrorlist.bak\nsudo sed -i '1i Server = https://mirror.famaserver.com/archlinux/$repo/os/$arch\\nServer = https://mirror.mobinhost.com/archlinux/$repo/os/$arch' /etc/pacman.d/mirrorlist\nhead -n 4 /etc/pacman.d/mirrorlist", d: "از فهرست آینه‌های Arch نسخهٔ پشتیبان می‌گیرد، دو آینهٔ ایرانی را به بالای فهرست اضافه می‌کند و نتیجه را نشان می‌دهد.", on: "laptop", root: true,
        parts: [["cp … .bak", "نسخهٔ پشتیبان، برای برگشت."], ["sed -i '1i …'", "قبل از خط اول، متن را درج کن. ‎\\n یعنی خط جدید."], ["$repo و $arch", "این‌ها متغیرهای pacman‌اند و باید همین‌طور بمانند. چون داخل گیومهٔ تکی هستند، پوسته به آن‌ها دست نمی‌زند."]],
        out: "Server = https://mirror.famaserver.com/archlinux/$repo/os/$arch\nServer = https://mirror.mobinhost.com/archlinux/$repo/os/$arch\n##\n## Arch Linux repository mirrorlist",
        ok: "دو خط Server اول فهرست باشند. برای برگشت: <code>sudo cp /etc/pacman.d/mirrorlist.bak /etc/pacman.d/mirrorlist</code>" }),
      CMD({ c: "sudo cachyos-rate-mirrors", d: "سرعت آینه‌های CachyOS را از دید لپ‌تاپ تو می‌سنجد و بهترین‌ها را در فهرست آینه‌های CachyOS می‌نویسد.", on: "laptop", root: true, net: "net",
        note: "این ابزار CachyOS است (ویکی CachyOS برای خطاهای «failed retrieving file» همین را پیشنهاد می‌کند). چند دقیقه طول می‌کشد. ممکن است فهرست آینه‌های Arch را هم بازنویسی کند؛ اگر دو خط ایرانی از بالای mirrorlist رفته بودند، دستور قبلی را دوباره بزن.",
        uv: "این‌که دقیقاً کدام فایل‌ها را بازنویسی می‌کند و این‌که آینه‌های CachyOS از ایران بدون پروکسی در دسترس‌اند یا نه را تأیید نکردم. بعد از اجرا با <code>head /etc/pacman.d/mirrorlist /etc/pacman.d/cachyos-mirrorlist</code> ببین." })
    ]},
    { t: "اولین به‌روزرسانی: ryoku update و pacman -Syu", b: [
      C("concept", "دو مسیر به‌روزرسانی", "Ryoku به‌روزرسانی را عمداً [[دو بخش|dual]] کرده: <code>ryoku update</code> فقط بسته‌های امضاشدهٔ خود Ryoku، تنظیمات و doctor را جلو می‌برد و هسته را تکان نمی‌دهد. <code>sudo pacman -Syu</code> توزیع پایه (CachyOS و Arch) و هسته را به‌روز می‌کند. دلیلش این است که هر کدام جدا شکست بخورند و جدا برگردند. هر دو قبل و بعد از کار اسنپ‌شات می‌گیرند."),
      UV("مستندات سایت docs.ryoku.dev (ویرایش جولای ۲۰۲۶) هنوز می‌گوید ryoku update خودش pacman -Syu را هم اجرا می‌کند. فایل docs/updates.md در مخزن نسخهٔ ۱.۰.۷ (اکتبر ۲۰۲۶) صریحاً می‌گوید نه. این راهنما مخزن را ملاک گرفته است. خروجی ryoku update خودش تعداد بسته‌های سیستمی منتظر را می‌گوید."),
      CMD({ c: "ryoku update", d: "بسته‌های Ryoku، تنظیمات پایه و doctor را به‌روز می‌کند. قبلش یک اسنپ‌شات می‌گیرد.", on: "laptop", net: "proxy",
        out: "… Snapshot (pre) ✓\n… Packages ✓\n… Config ✓\n… Doctor ✓\n12 system package(s) waiting",
        ok: "کارت پایانی بدون خطا. خط system package(s) waiting یعنی نوبت گام بعدی است." }),
      CMD({ c: "sudo pacman -Syu", d: "پایگاه‌دادهٔ مخزن‌ها را تازه می‌کند و همهٔ بسته‌های توزیع، از جمله هسته را به‌روز می‌کند.", on: "laptop", root: true, net: "proxy",
        parts: [["-S", "sync: کار با مخزن‌ها"], ["-y", "فهرست بسته‌ها را از آینه‌ها تازه کن"], ["-u", "هر چیزی را که نسخهٔ جدیدتر دارد، به‌روز کن"]],
        out: ":: Synchronizing package databases...\n core   …\n extra  …\n:: Starting full system upgrade...\nPackages (12) …\n:: Proceed with installation? [Y/n]",
        ok: "Y یا Enter بزن. در پایان باید بدون error تمام شود. اگر هسته به‌روز شد، یک بار ری‌استارت کن." }),
      C("fix", "", "اگر خطای <code>failed retrieving file</code> یا <code>Could not resolve host</code> دیدی، احتمالاً آینه یا مخزن از ایران فیلتر است. ادامه نده؛ فصل ۵ را تمام کن (pacman را پشت پروکسی می‌بریم) و بعد برگرد. هرگز <code>-Sy</code> خالی (بدون u) نزن؛ به‌روزرسانی نیمه‌کاره در Arch خرابی می‌آورد.")
    ]},
    { t: "اسنپ‌شات: دیدن، ساختن و فهمیدن", b: [
      CMD({ c: "ryoku snapshots", d: "فهرست اسنپ‌شات‌های سیستم را نشان می‌دهد (همان خروجی snapper).", on: "laptop",
        out: " # | Type   | Pre # | Date                 | Description\n---+--------+-------+----------------------+---------------------\n 0 | single |       |                      | current\n 1 | pre    |       | Sat Nov  8 13:02:11  | pacman -Syu\n 2 | post   |     1 | Sat Nov  8 13:05:40  | linux-cachyos …" }),
      CMD({ c: "sudo snapper -c root create -d \"before my experiment\"", d: "یک اسنپ‌شات دستی از سیستم با توضیح دلخواه می‌سازد.", on: "laptop", root: true,
        parts: [["-c root", "پیکربندی root، یعنی زیرحجم سیستم (@)"], ["-d \"…\"", "توضیح (description) تا بعداً بشناسی‌اش"]],
        ok: "دوباره <code>ryoku snapshots</code> بزن؛ خط جدید با توضیح تو آمده." }),
      C("concept", "چه چیزی برمی‌گردد و چه چیزی نه", "اسنپ‌شات‌ها از زیرحجم <code>@</code> (سیستم: برنامه‌ها، /etc، هسته) گرفته می‌شوند. پوشهٔ خانه (<code>@home</code>) جداست و با بازگرداندن سیستم عقب نمی‌رود. یعنی فایل‌ها و تنظیمات ~/.config تو سر جایشان می‌مانند. هارد /data هم کلاً جداست. Ryoku حداکثر ۱۰ اسنپ‌شات شماره‌دار نگه می‌دارد و قدیمی‌ها خودکار پاک می‌شوند.")
    ]},
    { t: "تمرین برگشت از منوی Limine", b: [
      P("بهترین وقت یاد گرفتن برگشت، الان است که هیچ چیزی خراب نیست. این تمرین را یک بار کامل انجام بده:"),
      CMD({ c: "sudo pacman -S cowsay\ncowsay \"salam Ryoku\"\nryoku snapshots", d: "یک بستهٔ بی‌خطر و بامزه نصب می‌کند و نشان می‌دهد snap-pac قبل و بعد از نصب اسنپ‌شات گرفته است.", on: "laptop", root: true, net: "net",
        ok: "یک گاو ASCII دیدی و دو اسنپ‌شات جدید pre و post با توضیح pacman آمده‌اند. شمارهٔ اسنپ‌شات pre را یادداشت کن." }),
      OL(
        "ری‌استارت کن (" + K("Super+Escape") + " و Restart).",
        "در منوی Limine، در همان ۳ ثانیه یک فلش بزن تا شمارش متوقف شود.",
        "وارد <b>Ryoku Linux</b> و بعد <b>Snapshots</b> شو و اسنپ‌شات pre نصب cowsay را انتخاب کن.",
        "سیستم با وضعیت آن لحظه بالا می‌آید. وارد شو و در ترمینال <code>cowsay hi</code> بزن؛ باید بگوید command not found.",
        "حالا این وضعیت را دائمی کن:"
      ),
      CMD({ c: "sudo limine-snapper-restore", d: "سیستمی را که با آن بوت کرده‌ای (اسنپ‌شات) به سیستم اصلی تبدیل می‌کند و منوی بوت را به حالت عادی برمی‌گرداند.", on: "laptop", root: true,
        note: "طبق مستندات CLI Ryoku: Ryoku زیرحجم ‎@ را مستقیم بوت می‌کند، برای همین <code>snapper rollback</code> معمولی این‌جا کار نمی‌کند و مسیر درست همین دستور است. بعد از آن یک بار ری‌استارت کن تا وارد سیستم بازگردانده‌شده شوی.",
        uv: "شکل دقیق نام‌ها در منوی Limine و پرسش‌های این ابزار را روی سخت‌افزار واقعی ندیده‌ام. اگر چیزی پرسید، متنش را با دقت بخوان." }),
      C("check", "", "بعد از ری‌استارت، <code>pacman -Q cowsay</code> باید بگوید <code>package 'cowsay' was not found</code>. یعنی برگشت کامل کار کرد و حالا بلدی از هر به‌روزرسانی بدی نجات پیدا کنی.")
    ]},
    { t: "روان‌تر کردن دسکتاپ روی Intel HD 620", b: [
      P("پوستهٔ Ryoku پر از blur و انیمیشن است. روی گرافیک Intel نسل ۷ بهتر است کمی سبکش کنی. مستندات Ryoku این‌ها را پیشنهاد می‌کند:"),
      UL("Ryoku Hub (" + K("Super+,") + ") ← Appearance ← Animations: انیمیشن‌ها را کم یا خاموش کن.", "Appearance ← Decoration: blur و سایه را کم کن.", "والپیپر متحرک یا ویدیویی نگذار؛ بزرگ‌ترین صرفه‌جویی گرافیکی همین است."),
      C("check", "", "<code>btop</code> را باز کن (با " + K("q") + " خارج می‌شوی) و ببین در حالت بیکار چقدر RAM و CPU مصرف می‌شود. Ryoku در حالت استراحت زیر ۱ گیگ RAM مصرف می‌کند.")
    ]}
  ],
  end: ["با Super+Return و Super+Space کار می‌کنم.", "از ترمینال به وای‌فای وصل شدم.", "با Alt+Shift بین انگلیسی و فارسی جابه‌جا می‌شوم.", "ryoku doctor --check را دیدم.", "آینه‌های ایرانی Arch بالای mirrorlist هستند.", "فرق ryoku update و pacman -Syu را می‌دانم.", "یک بار با اسنپ‌شات از منوی Limine برگشتم."],
  probs: [
    ["Alt+Shift چیدمان را عوض نمی‌کند.", "دستور grep بالا را بزن ببین تغییر در فایل نشسته؛ بعد ryoku reload. اگر از Hub چیدمانی انتخاب کرده‌ای، آن را به پیش‌فرض برگردان."],
    ["nmcli می‌گوید Secrets were required, but not provided.", "رمز اشتباه بوده؛ دستور connect را دوباره با --ask بزن."],
    ["زیرمنوی Snapshots در Limine نیست.", "ryoku doctor را بزن؛ پیکربندی snapper و limine-snapper-sync را درست می‌کند. بعد یک نصب کوچک انجام بده تا اسنپ‌شات ساخته شود."],
    ["ryoku update می‌گوید channel is building.", "مخزن در حال ساخت نسخهٔ جدید است. چند ساعت بعد دوباره بزن یا ryoku update --wait."]
  ],
  src: [
    ["Ryoku docs: First boot", "https://docs.ryoku.dev/docs/first-boot"],
    ["Ryoku docs: Troubleshoot", "https://docs.ryoku.dev/docs/troubleshoot"],
    ["Ryoku repo: docs/updates.md (دو مسیر به‌روزرسانی)", "https://github.com/ryoku-dev/ryoku/blob/main/docs/updates.md"],
    ["Ryoku repo: docs/cli.md (rollback و limine-snapper-restore)", "https://github.com/ryoku-dev/ryoku/blob/main/docs/cli.md"],
    ["Ryoku repo: ryoku/hyprland/keyboard.lua", "https://github.com/ryoku-dev/ryoku/blob/main/ryoku/hyprland/keyboard.lua"],
    ["Arch mirror status", "https://archlinux.org/mirrors/status/"],
    ["CachyOS wiki: FAQ و عیب‌یابی pacman", "https://wiki.cachyos.org/cachyos_basic/faq/"],
    ["Arch Wiki: NetworkManager", "https://wiki.archlinux.org/title/NetworkManager"],
    ["Arch Wiki: Snapper", "https://wiki.archlinux.org/title/Snapper"]
  ]
});
