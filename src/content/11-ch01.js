G.add({
  id: "c1", n: "۱", short: "آماده‌سازی روی Fedora",
  t: "آماده‌سازی روی سیستم اصلی (Fedora)",
  what: "روی Fedora فایل ISO را دانلود و امضا و چک‌سامش را بررسی می‌کنیم، هر چیزی را که لپ‌تاپ بعد از نصب بدون اینترنت آزاد لازم دارد از قبل دانلود می‌کنیم و فلش نصب را می‌سازیم.",
  why: "لپ‌تاپ تازه‌نصب، پروکسی ندارد و در ایران بدون پروکسی خیلی از سایت‌ها باز نمی‌شوند. پس Happ و این راهنما باید از قبل روی فلش باشند. ISO دستکاری‌شده هم می‌تواند کل سیستم را آلوده کند، برای همین امضا را چک می‌کنیم.",
  time: "۴۵ تا ۹۰ دقیقه (بیشترش زمان دانلود)",
  need: "Fedora با Happ وصل، یک فلش ۸ گیگ یا بیشتر برای نصب (کاملاً پاک می‌شود)، یک فلش دوم برای فایل‌ها، کاغذ و قلم.",
  steps: [
    { t: "فهرست وسایل و یک تصمیم مهم دربارهٔ اینترنتِ موقع نصب", b: [
      UL(
        "<b>فلش نصب:</b> حداقل ۸ گیگابایت. هر چیزی رویش هست پاک می‌شود.",
        "<b>فلش فایل‌ها:</b> یک فلش دیگر (یا یک پوشه روی هر فلشی که پاک نمی‌شود) برای بستهٔ Happ، همین فایل راهنما و یادداشت‌ها.",
        "<b>شارژر لپ‌تاپ:</b> نصب را هیچ‌وقت با باتری انجام نده؛ قطع برق وسط نوشتن روی دیسک یعنی نصب نیمه‌کاره.",
        "<b>گوشی:</b> برای خواندن همین راهنما وقتی لپ‌تاپ مشغول نصب است."
      ),
      C("concept", "نصب آفلاین", "ISOهای Ryoku معمولاً یک مخزن بستهٔ کامل داخل خودشان دارند (offline repo). در این حالت نصب‌کننده برای نصب سیستم پایه و دسکتاپ به اینترنت نیاز ندارد و فقط چند بستهٔ AUR (مثل مرورگر Zen) را که بعد از نصب ساخته می‌شوند جا می‌اندازد؛ خود Ryoku می‌گوید این بسته‌ها «best-effort» هستند و سیستم بدون آن‌ها هم کامل بالا می‌آید. اگر ISO مخزن داخلی نداشته باشد، صفحهٔ Review نصب‌کننده تا وصل‌شدن به اینترنت قفل می‌ماند. پس اگر آن‌جا گیر کردی، یعنی اینترنت لازم است."),
      UV("این‌که ISO ویرایش CachyOSِ نسخهٔ فعلی حتماً مخزن آفلاین دارد را نتوانستم از صفحهٔ دانلود تأیید کنم. موقع نصب، صفحهٔ Network را ببین: اگر بدون اتصال اجازهٔ ادامه داد، آفلاین است.")
    ]},
    { t: "دانلود ISO ویرایش CachyOS", b: [
      P("روی Fedora مرورگر را باز کن (Happ وصل باشد)، به <code>https://ryoku.dev</code> برو، دکمهٔ <b>Install Ryoku</b> را بزن و ویرایش <b>CachyOS</b> را انتخاب کن. سه فایل را در پوشهٔ <code>~/Downloads</code> ذخیره کن:"),
      UL("خود فایل [[ISO|iso]] (اسمی شبیه <code>ryoku-…-x86_64.iso</code>)", "فایل امضا با پسوند <code>.iso.sig</code>", "فایل [[چک‌سام|checksum]] با پسوند <code>.iso.sha256</code>"),
      P("اسم دقیق فایل ISO را در پنل «مقادیر من» (کلید " + K("v") + ") در خانهٔ «نام فایل ISO» بنویس تا دستورهای بعدی درست پر شوند. الان مقدارش این است: {{ISO}}"),
      CMD({ c: "cd ~/Downloads\nls -lh *.iso*", d: "به پوشهٔ دانلودها برو و فایل‌های ISO را با اندازه‌شان نشان بده.", on: "pc",
        parts: [["cd ~/Downloads", "پوشهٔ فعلی ترمینال را Downloads می‌کند."], ["ls -lh *.iso*", "فهرست فایل‌هایی که اسم‌شان ‎.iso دارد. ‎-h اندازه را خوانا (G و M) نشان می‌دهد. ستاره یعنی «هر چیزی»."]],
        out: "-rw-r--r--. 1 nima nima 3.1G Nov  8 10:40 ryoku-2026.10.31-x86_64.iso\n-rw-r--r--. 1 nima nima  566 Nov  8 10:41 ryoku-2026.10.31-x86_64.iso.sig\n-rw-r--r--. 1 nima nima  100 Nov  8 10:41 ryoku-2026.10.31-x86_64.iso.sha256",
        ok: "هر سه فایل دیده می‌شوند و ISO چند گیگابایت است. اگر ISO فقط چند کیلوبایت است، دانلود ناقص بوده." })
    ]},
    { t: "بررسی امضای GPG و چک‌سام", b: [
      C("concept", "چرا دو بررسی؟", "[[چک‌سام|checksum]] می‌گوید فایل سالم رسیده (یک بایتش هم عوض نشده). [[امضای GPG|gpg]] می‌گوید فایل را واقعاً تیم Ryoku ساخته. اولی جلوی دانلود خراب را می‌گیرد و دومی جلوی فایل جعلی را."),
      CMD({ c: "curl -sSL --proxy socks5h://127.0.0.1:{{SOCKS}} https://iso.ryoku.dev/stable/ryoku-release-key.pub.asc | gpg --import", d: "کلید عمومی انتشار Ryoku را از طریق پروکسی دانلود و وارد دسته‌کلید GPG خودت می‌کند.", on: "pc", net: "proxy",
        parts: [["curl -sSL", "دانلود؛ ‎-s بی‌صدا، ‎-S خطا را نشان بده، ‎-L ریدایرکت‌ها را دنبال کن."], ["--proxy socks5h://127.0.0.1:{{SOCKS}}", "از پروکسی Happ روی Fedora استفاده کن (اگر Happ روی Fedora پورت دیگری دارد، در پنل مقادیر عوضش کن)."], ["| gpg --import", "خروجی را مستقیم به gpg بده تا کلید را وارد کند."]],
        out: "gpg: key 847B274F025DD6E3: public key \"Ryoku Releases <releases@ryoku.dev>\" imported\ngpg: Total number processed: 1\ngpg:               imported: 1",
        ok: "عبارت imported یا unchanged دیده شود." }),
      CMD({ c: "gpg --fingerprint releases@ryoku.dev", d: "اثر انگشت کلیدی را که وارد کردی نشان می‌دهد تا با مقدار رسمی مقایسه کنی.", on: "pc",
        out: "pub   …\n      EB6D 3C0F 55A7 B3CA BA6B  2838 847B 274F 025D D6E3\nuid           [ unknown] Ryoku Releases <releases@ryoku.dev>",
        ok: "خط دوم باید دقیقاً این باشد: <code>EB6D 3C0F 55A7 B3CA BA6B 2838 847B 274F 025D D6E3</code> (هم در README مخزن Ryoku و هم در ryoku.dev/verify همین آمده). حتی یک حرف فرق داشت، ادامه نده." }),
      CMD({ c: "gpg --verify {{ISO}}.sig {{ISO}}", d: "امضای ISO را با کلید رسمی می‌سنجد.", on: "pc",
        out: "gpg: Good signature from \"Ryoku Releases <releases@ryoku.dev>\" [unknown]\ngpg: WARNING: This key is not certified with a trusted signature!",
        ok: "عبارت <b>Good signature</b> ببینی. هشدار «not certified» عادی است؛ فقط یعنی خودت این کلید را امضا نکرده‌ای. اگر BAD signature دیدی، ISO را پاک کن و دوباره دانلود کن." }),
      CMD({ c: "sha256sum -c {{ISO}}.sha256", d: "چک‌سام SHA-256 فایل ISO را حساب می‌کند و با فایل ‎.sha256 مقایسه می‌کند.", on: "pc",
        out: "ryoku-2026.10.31-x86_64.iso: OK",
        ok: "کلمهٔ <b>OK</b> بعد از اسم فایل. اگر FAILED دیدی، دانلود خراب است.",
        note: "اگر فایل ‎.sha256 فقط عدد چک‌سام را دارد و اسم فایل در آن نیست، <code>sha256sum {{ISO}}</code> را بزن و عدد را چشمی با محتوای <code>cat {{ISO}}.sha256</code> مقایسه کن." })
    ]},
    { t: "دانلود بستهٔ Happ برای Arch و نگه‌داشتن همین راهنما", b: [
      P("بعد از نصب، لپ‌تاپ هنوز پروکسی ندارد و GitHub ممکن است باز نشود. پس بستهٔ رسمی Happ را همین حالا روی Fedora بگیر:"),
      CMD({ c: "cd ~/Downloads\ncurl -L --proxy socks5h://127.0.0.1:{{SOCKS}} -o Happ.linux.x64.pkg.tar.zst \\\n  https://github.com/Happ-proxy/happ-desktop/releases/latest/download/Happ.linux.x64.pkg.tar.zst", d: "آخرین نسخهٔ بستهٔ Arch برنامهٔ Happ را از صفحهٔ انتشار رسمی آن در GitHub دانلود می‌کند.", on: "pc", net: "proxy",
        parts: [["-L", "GitHub آدرس latest را به نسخهٔ واقعی ریدایرکت می‌کند؛ ‎-L دنبالش می‌رود."], ["-o Happ.linux.x64.pkg.tar.zst", "اسم فایل خروجی."], ["\\", "یعنی دستور در خط بعد ادامه دارد. کل دو خط را با هم کپی کن."]],
        ok: "<code>ls -lh Happ.linux.x64.pkg.tar.zst</code> فایلی چند ده مگابایتی نشان بدهد. اگر فقط چند بایت است، احتمالاً به‌جای فایل صفحهٔ خطا دانلود شده؛ پروکسی را چک کن." }),
      C("concept", "فایل ‎.pkg.tar.zst چیست؟", "این قالب بستهٔ Arch است: یک آرشیو فشرده با فایل‌های برنامه و اطلاعات بسته. pacman می‌تواند مستقیم از روی فایل نصبش کند (<code>pacman -U</code>)، بدون مخزن. در AUR هم بسته‌ای به اسم <code>happ-desktop-bin</code> هست که همین فایل را بازبسته‌بندی می‌کند؛ نسخهٔ رسمی، خودِ همین فایل است."),
      P("همین فایل راهنما (<code>index.html</code>) را هم روی فلش فایل‌ها کپی کن. اگر آن را با git از مخزن گرفته‌ای، فایل در پوشهٔ مخزن است."),
      C("concept", "فرم‌ور وای‌فای لازم است؟", "کارت وای‌فای این لپ‌تاپ بسته به سری تولید Intel، Qualcomm Atheros یا Realtek است و فرم‌ور هر سه در بستهٔ <code>linux-firmware</code> هست که Ryoku نصب می‌کند. پس معمولاً چیزی لازم نیست. اگر بعداً وای‌فای دیده نشد، فصل ۱۴ را ببین." + " " + uvb),
      UV("چیپ‌ست دقیق وای‌فای K556UQ-DM374D را از منابع آنلاین پیدا نکردم. روی Fedora Xfceِ فعلی لپ‌تاپ این دستور را بزن تا مطمئن شوی: <code>lspci -nnk | grep -iA3 net</code>")
    ]},
    { t: "یادداشت‌های ضروری روی کاغذ", b: [
      UL(
        "اسم و رمز وای‌فای خانه: {{WIFI}}",
        "لینک اشتراک (subscription) Happ. این لینک مثل رمز است؛ آن را در فایلی روی فلش شخصی خودت نگه دار و بعداً در KeePassXC بگذار.",
        "نام کاربری لپ‌تاپ: {{USER}} و نام میزبان: {{HOST}}",
        "رمز کاربری که روی لپ‌تاپ می‌گذاری (همان رمز sudo)."
      ),
      CMD({ c: "nano ~/Downloads/happ-sub.txt", d: "یک فایل متنی ساده برای لینک اشتراک Happ می‌سازد تا آن را روی فلش ببری (در nano: Ctrl+O ذخیره، Ctrl+X خروج).", on: "pc",
        note: "بعد از نصب، روی لپ‌تاپ می‌توانی محتوای این فایل را با <code>wl-copy &lt; فایل</code> در کلیپ‌بورد بگذاری و در Happ وارد کنی. بعد از ورود، فایل را از روی فلش پاک کن." })
    ]},
    { t: "پیدا کردن اسم دقیق فلش روی Fedora", b: [
      C("warn", "", "مرحلهٔ بعد فلش را کامل پاک می‌کند. اگر اسم دستگاه را اشتباه بزنی، ممکن است هارد خود Fedora پاک شود. این گام را با دقت انجام بده."),
      CMD({ c: "lsblk -o NAME,SIZE,MODEL,TRAN,RM,MOUNTPOINTS", d: "همهٔ دیسک‌ها را با اندازه، مدل، نوع اتصال (usb یا sata/nvme) و نقطهٔ سوارشدن نشان می‌دهد. یک بار قبل از زدن فلش و یک بار بعدش اجرا کن.", on: "pc",
        parts: [["NAME", "اسم دستگاه، مثل sda یا nvme0n1"], ["TRAN", "نوع اتصال: usb برای فلش"], ["RM", "۱ یعنی قابل جداشدن (removable)"], ["MOUNTPOINTS", "اگر چیزی نوشته شده، الان سوار است"]],
        out: "NAME        SIZE MODEL              TRAN RM MOUNTPOINTS\nsda        14.6G SanDisk Ultra      usb   1\n└─sda1     14.6G                          1 /run/media/nima/USB\nnvme0n1   476.9G Samsung SSD 980      nvme  0\n├─nvme0n1p1 600M                          0 /boot/efi\n└─nvme0n1p3 475G                          0 /",
        ok: "دستگاهی که فقط بعد از زدن فلش ظاهر شده، با TRAN=usb و اندازهٔ فلشت، همان است. اسمش (مثلاً <code>/dev/sda</code>، <b>بدون</b> عدد آخر) را در پنل مقادیر در خانهٔ «دستگاه فلش» بنویس. الان مقدار آن {{USB}} است." })
    ]},
    { t: "روش الف (پیشنهادی): Fedora Media Writer", b: [
      C("concept", "چرا فلش پاک می‌شود؟", "ISO یک «تصویر دیسک» است، نه یک فایل معمولی. نوشتنش یعنی کپی بایت‌به‌بایت روی کل فلش، از اولین بایت. جدول پارتیشن و فایل‌های قبلی رویش نوشته می‌شوند. بعد از نوشتن، فلش ساختار ISO را دارد و برای فایل‌های خودت قابل استفاده نیست؛ برای همین فلش دوم لازم است."),
      OL(
        "Fedora Media Writer را از لانچر KDE باز کن.",
        "گزینهٔ <b>Select .iso file</b> را انتخاب کن (با Tab و Space هم کار می‌کند) و Next بزن.",
        "فایل {{ISO}} را از Downloads انتخاب کن.",
        "در بخش USB Drive، فلشی را انتخاب کن که اندازه و اسمش با خروجی lsblk یکی است.",
        "Write را بزن، رمز Fedora را وارد کن و صبر کن تا تمام شود. برنامه بعد از نوشتن خودش بررسی هم می‌کند.",
        "وقتی پیام Finished آمد، فلش را جدا کن."
      ),
      C("check", "", "اگر دوباره فلش را بزنی و <code>lsblk</code> بگیری، دو یا سه پارتیشن کوچک با برچسبی شبیه <code>RYOKU_202610</code> می‌بینی. یعنی درست نوشته شده.")
    ]},
    { t: "روش ب (جایگزین): dd از ترمینال", b: [
      P("اگر Media Writer کار نکرد، همان کار را با <code>dd</code> انجام بده. همین روش در مستندات Ryoku هم آمده."),
      CMD({ c: "sudo umount {{USB}}?*", d: "اگر پارتیشنی از فلش سوار است، پیاده‌اش می‌کند تا هنگام نوشتن چیزی رویش باز نباشد.", on: "pc", root: true,
        parts: [["{{USB}}?*", "یعنی همهٔ پارتیشن‌های این دستگاه (مثلاً sda1، sda2). ‎?* یعنی «حداقل یک حرف بعد از اسم»."]],
        ok: "اگر نوشت not mounted، یعنی از قبل سوار نبوده. مشکلی نیست." }),
      CMD({ c: "sudo dd if={{ISO}} of={{USB}} bs=4M status=progress oflag=sync", d: "ISO را بایت‌به‌بایت روی کل فلش می‌نویسد. هر چیزی روی دستگاه مقصد باشد، برای همیشه پاک می‌شود.", on: "pc", root: true, danger: true,
        confirm: ["خروجی lsblk را قبل و بعد از زدن فلش دیده‌ام و {{USB}} قطعاً فلش است، نه nvme0n1 یا هارد Fedora.", "اسم دستگاه را بدون عدد پارتیشن نوشته‌ام (مثلاً /dev/sda، نه /dev/sda1).", "می‌دانم هر چیزی روی این فلش هست پاک می‌شود."],
        parts: [["if={{ISO}}", "ورودی (input file): فایل ISO."], ["of={{USB}}", "خروجی (output file): کل دستگاه فلش. اشتباه در همین قسمت خطرناک است."], ["bs=4M", "هر بار ۴ مگابایت بخوان و بنویس؛ سریع‌تر از پیش‌فرض."], ["status=progress", "پیشرفت را زنده نشان بده."], ["oflag=sync", "هر تکه را واقعاً روی فلش بنویس، نه در حافظهٔ موقت. پیشرفت واقعی‌تر می‌شود."]],
        out: "3221225472 bytes (3.2 GB, 3.0 GiB) copied, 412 s, 7.8 MB/s\n768+1 records in\n768+1 records out",
        ok: "خطی با records out و بدون پیام خطا. بعد <code>sync</code> بزن و وقتی تمام شد فلش را جدا کن." })
    ]},
    { t: "روش ج (اختیاری): Ventoy", b: [
      P("Ventoy فلش را طوری آماده می‌کند که چند ISO و فایل‌های دیگر را کنار هم نگه دارد. وسوسه‌کننده است، ولی برای Ryoku توصیه‌اش نمی‌کنم:"),
      UL(
        "راهنمای سخت‌افزار مخزن Ryoku صریحاً می‌گوید Ventoy پشتیبانی نمی‌شود و ممکن است هنگام بوت خطای «No space left» یا squashfs بدهد.",
        "README پوشهٔ ISO همان مخزن برعکس می‌گوید حالت عادی Ventoy مسیر اصلی است و اگر نشد، با " + K("Ctrl+r") + " به حالت GRUB2 برو.",
        "Secure Boot در هر حال خاموش است (فصل ۲)، پس مشکل امضای Ventoy پیش نمی‌آید."
      ),
      UV("دو سند رسمی Ryoku دربارهٔ Ventoy با هم تناقض دارند. اگر امتحانش کردی و بوت گیر کرد، روش الف یا ب را برو. برای این پروژه دو فلش جدا مطمئن‌ترین راه است.")
    ]},
    { t: "آماده کردن فلش فایل‌ها", b: [
      P("روی فلش دوم یک پوشه به اسم <code>ryoku-setup</code> بساز و این‌ها را در آن کپی کن:"),
      CMD({ c: "mkdir -p /run/media/$USER/FILES/ryoku-setup\ncp ~/Downloads/Happ.linux.x64.pkg.tar.zst ~/Downloads/happ-sub.txt /run/media/$USER/FILES/ryoku-setup/\ncp ~/ryoko/index.html /run/media/$USER/FILES/ryoku-setup/", d: "یک پوشه روی فلش فایل‌ها می‌سازد و Happ، لینک اشتراک و این راهنما را در آن کپی می‌کند. «FILES» را با اسم واقعی فلشت در /run/media عوض کن.", on: "pc",
        parts: [["/run/media/$USER/FILES", "جایی که KDE فلش را سوار می‌کند. با <code>ls /run/media/$USER</code> اسم واقعی را ببین."], ["~/ryoko/index.html", "مسیر همین راهنما روی Fedora؛ اگر جای دیگری است عوضش کن."]],
        ok: "<code>ls /run/media/$USER/FILES/ryoku-setup</code> هر سه فایل را نشان بدهد. بعد فلش را از منوی KDE «Safely remove» کن." })
    ]}
  ],
  end: ["ISO دانلود شد، امضای GPG «Good signature» و چک‌سام «OK» داد.", "Happ.linux.x64.pkg.tar.zst و index.html روی فلش فایل‌ها هستند.", "لینک اشتراک Happ و رمز وای‌فای را دارم.", "فلش نصب با Media Writer یا dd نوشته شد."],
  probs: [
    ["gpg می‌گوید No public key.", "کلید وارد نشده؛ دستور import را دوباره بزن و مطمئن شو پروکسی کار می‌کند."],
    ["curl خطای Failed to connect to 127.0.0.1 port … می‌دهد.", "Happ روی Fedora وصل نیست یا پورتش فرق دارد. در تنظیمات Happ پورت را ببین."],
    ["Media Writer فلش را نشان نمی‌دهد.", "فلش را جدا و دوباره وصل کن؛ اگر باز هم نشد، روش dd را برو."],
    ["dd می‌گوید Permission denied.", "sudo را جا انداخته‌ای."]
  ],
  src: [
    ["Ryoku: Verify", "https://ryoku.dev/verify"],
    ["Ryoku docs: Install", "https://docs.ryoku.dev/docs/install"],
    ["Ryoku docs: Security", "https://docs.ryoku.dev/docs/security"],
    ["Ryoku repo: installation-hardware.md (Ventoy، dd)", "https://github.com/ryoku-dev/ryoku/blob/main/docs/installation-hardware.md"],
    ["Ryoku repo: installation/iso/README.md", "https://github.com/ryoku-dev/ryoku/blob/main/installation/iso/README.md"],
    ["Happ desktop releases", "https://github.com/Happ-proxy/happ-desktop"],
    ["Fedora Media Writer", "https://github.com/FedoraQt/MediaWriter"],
    ["Arch Wiki: USB flash installation medium", "https://wiki.archlinux.org/title/USB_flash_installation_medium"]
  ]
});

G.add({
  id: "c2", n: "۲", short: "تنظیمات BIOS لپ‌تاپ",
  t: "تنظیمات BIOS لپ‌تاپ Asus K556UQ",
  what: "وارد صفحهٔ تنظیمات سخت‌افزار (BIOS/UEFI) می‌شویم، حالت UEFI و AHCI را چک می‌کنیم، Fast Boot و Secure Boot را خاموش می‌کنیم و از فلش بوت می‌کنیم.",
  why: "ISO ویرایش CachyOSِ Ryoku فقط در حالت UEFI بوت می‌شود و بوت‌لودرش (Limine) امضای Secure Boot ندارد؛ نصب‌کننده تا Secure Boot روشن باشد، اجازهٔ نصب نمی‌دهد.",
  time: "۱۵ دقیقه",
  need: "لپ‌تاپ به برق وصل، فلش نصب، کیبورد خود لپ‌تاپ (کیبورد بلوتوثی در BIOS کار نمی‌کند).",
  steps: [
    { t: "قبل از ورود: وضعیت فعلی را از داخل Fedora Xfce ببین", b: [
      P("تا وقتی Fedora Xfce هنوز روی لپ‌تاپ است، سه چیز را از داخل خودش چک کن. با این کار در BIOS دنبال چیزی نمی‌گردی که از قبل درست است."),
      CMD({ c: "[ -d /sys/firmware/efi ] && echo UEFI || echo LEGACY", d: "می‌گوید سیستم فعلی در حالت UEFI بوت شده یا BIOS قدیمی (Legacy/CSM).", on: "any",
        out: "UEFI", ok: "اگر UEFI بود، تنظیمات بوت از قبل درست است.", shell: "bash (Fedora)" }),
      CMD({ c: "mokutil --sb-state", d: "وضعیت Secure Boot را نشان می‌دهد.", on: "any",
        out: "SecureBoot enabled", ok: "اگر enabled بود، باید در BIOS خاموشش کنی. اگر disabled بود، کاری لازم نیست.", shell: "bash (Fedora)" }),
      CMD({ c: "lspci | grep -i -E 'sata|raid'", d: "کنترلر دیسک و حالت کارش را نشان می‌دهد.", on: "any",
        out: "00:17.0 SATA controller: Intel Corporation Sunrise Point-LP SATA Controller [AHCI mode] (rev 21)",
        ok: "اگر [AHCI mode] دیدی، این بخش درست است. اگر RAID یا RST دیدی، باید در BIOS عوضش کنی.", shell: "bash (Fedora)" }),
      CMD({ c: "systemctl reboot --firmware-setup", d: "لپ‌تاپ را مستقیم به صفحهٔ تنظیمات UEFI ری‌استارت می‌کند؛ لازم نیست سر بزنگاه F2 را بزنی.", on: "any", shell: "bash (Fedora)",
        note: "این قابلیت systemd است و فقط وقتی سیستم در حالت UEFI بوت شده کار می‌کند." })
    ]},
    { t: "ورود به BIOS و منوی بوت", b: [
      TBL(["کار", "کلید معمول Asus"], [["ورود به تنظیمات (BIOS Setup)", K("F2") + " را هنگام روشن‌شدن پشت سر هم بزن"], ["منوی انتخاب بوت (یک‌باره)", K("Esc") + " را هنگام روشن‌شدن پشت سر هم بزن"], ["ذخیره و خروج", K("F10")], ["حالت پیشرفته (اگر صفحهٔ ساده باز شد)", K("F7")]]),
      UV("کلیدهای F2 و Esc برای لپ‌تاپ‌های Asus هم‌دوره رایج‌اند، ولی برای مدل دقیق K556UQ-DM374D منبع رسمی پیدا نکردم. اگر کار نکرد: لپ‌تاپ را کامل خاموش کن، F2 را نگه دار و بعد دکمهٔ پاور را بزن. یا از دستور <code>systemctl reboot --firmware-setup</code> در گام قبل استفاده کن."),
      C("concept", "صفحه چه شکلی است (توصیف تقریبی)", "بیشتر Asusهای این نسل «Aptio Setup Utility» دارند: پس‌زمینهٔ آبی یا خاکستری، چند زبانه در بالا (Main، Advanced، Boot، Security، Save &amp; Exit)، توضیح گزینه‌ها در ستون راست و راهنمای کلیدها در پایین. با فلش‌ها حرکت می‌کنی، با Enter گزینه را باز می‌کنی و با Esc برمی‌گردی. بعضی مدل‌ها اول «EZ Mode» ساده را نشان می‌دهند که با F7 به حالت پیشرفته می‌رود."),
      C("warn", "", "کیبورد بلوتوثی K860 در BIOS و منوی بوت کار نمی‌کند، چون بلوتوث را سیستم‌عامل راه می‌اندازد. اینجا از کیبورد خود لپ‌تاپ استفاده کن. اگر گیرندهٔ USB لاجیتک را داری، معمولاً آن کار می‌کند.")
    ]},
    { t: "حالت UEFI: خاموش کردن CSM", b: [
      P("زبانهٔ <b>Boot</b> → گزینهٔ <b>Launch CSM</b> را روی <b>Disabled</b> بگذار. CSM یعنی شبیه‌سازی BIOS قدیمی؛ خاموش کردنش تضمین می‌کند فلش در حالت [[UEFI|uefi]] بوت شود."),
      C("check", "", "اگر در Fedora خروجی گام اول UEFI بود و این گزینه را پیدا نکردی، مهم نیست. وقتی فلش را بوت کردی، باید منوی نصب‌کنندهٔ Ryoku با عنوان «UEFI» دیده شود.")
    ]},
    { t: "خاموش کردن Fast Boot", b: [
      P("زبانهٔ <b>Boot</b> → <b>Fast Boot</b> → <b>Disabled</b>. Fast Boot برای چند ثانیه سرعت بیشتر، شناسایی USB و کیبورد را هنگام روشن‌شدن رد می‌کند. خاموشش کن تا فلش و کلیدهای F2 و Esc همیشه دیده شوند."),
      C("concept", "", "این Fast Boot بایوس است، نه Fast Startup ویندوز. این‌جا ویندوزی نداریم.")
    ]},
    { t: "حالت دیسک: AHCI", b: [
      P("زبانهٔ <b>Advanced</b> → <b>SATA Configuration</b> → <b>SATA Mode Selection</b> = <b>[[AHCI|ahci]]</b>. اگر فقط AHCI قابل انتخاب است یا خروجی گام اول [AHCI mode] بود، کاری نکن."),
      C("concept", "چرا AHCI؟", "در حالت RAID/RST/VMD، اینتل دیسک را پشت کنترلر خودش پنهان می‌کند و ممکن است نصب‌کننده هیچ دیسکی نبیند. راهنمای سخت‌افزار Ryoku برای ماشینی که فقط Ryoku دارد، صریحاً AHCI را توصیه می‌کند.")
    ]},
    { t: "خاموش کردن Secure Boot", b: [
      P("زبانهٔ <b>Security</b> → <b>Secure Boot</b> (در بعضی مدل‌ها زیر Boot) → <b>Secure Boot Control</b> = <b>Disabled</b>."),
      C("concept", "چرا Ryoku با Secure Boot کار نمی‌کند؟", "[[Secure Boot|secureboot]] فقط بوت‌لودرهایی را اجرا می‌کند که امضای مایکروسافت یا کلید خودت را دارند. بوت‌لودر Ryoku، یعنی Limine، بدون امضا منتشر می‌شود. نصب‌کننده اگر Secure Boot روشن باشد، صفحهٔ Review را قفل می‌کند و پیام «disable Secure Boot in firmware setup» می‌دهد. یک متغیر برای دور زدن این قفل هست (<code>RYOKU_ALLOW_SECUREBOOT=1</code>) که فقط برای کسی است که کلیدهای خودش را در فرم‌ور ثبت کرده؛ تو لازمش نداری."),
      C("check", "", "بعد از نصب، در ترمینال Ryoku بزن: <code>bootctl status 2>/dev/null | grep -i secure</code> یا <code>od -An -t u1 /sys/firmware/efi/efivars/SecureBoot-*</code>. عدد آخر ۰ یعنی خاموش.")
    ]},
    { t: "ساعت و تاریخ BIOS", b: [
      P("در زبانهٔ <b>Main</b> تاریخ و ساعت را ببین. اگر کاملاً غلط است (مثلاً سال ۲۰۱۷)، درستش کن. ساعت را به وقت UTC بگذار (تهران منهای ۳:۳۰)، چون لینوکس ساعت سخت‌افزار را UTC فرض می‌کند."),
      C("concept", "چرا مهم است؟", "اگر ساعت سیستم خیلی غلط باشد، گواهی‌های امنیتی سایت‌ها «هنوز معتبر نیستند» یا «منقضی شده‌اند» و pacman امضای بسته‌ها را رد می‌کند. نصب‌کنندهٔ Ryoku تلاش می‌کند ساعت را خودکار درست کند، ولی اگر باتری CMOS لپ‌تاپ تمام شده باشد، بعد از هر قطع برق ساعت دوباره به عقب برمی‌گردد.")
    ]},
    { t: "ذخیره و بوت از فلش", b: [
      OL("کلید " + K("F10") + " را بزن و با Yes تأیید کن. لپ‌تاپ ری‌استارت می‌شود.", "فلش نصب را به پورت USB بزن (ترجیحاً پورت USB 3 آبی).", "هنگام روشن‌شدن، " + K("Esc") + " را پشت سر هم بزن تا منوی بوت بیاید.", "گزینه‌ای را انتخاب کن که با <b>UEFI:</b> شروع می‌شود و اسم فلشت را دارد. اگر دو گزینه برای فلش هست، حتماً گزینهٔ UEFI را بزن."),
      C("concept", "ترتیب بوت دائمی", "لازم نیست فلش را در Boot Option #1 بگذاری. منوی یک‌بارهٔ Esc امن‌تر است: بعد از نصب، لپ‌تاپ خودش از SSD بوت می‌شود و اگر فلش را یادت رفت در بیاوری، دوباره نصب‌کننده بالا نمی‌آید."),
      C("check", "", "صفحه‌ای سیاه با منوی چندگزینه‌ای «Ryoku Linux installer» دیدی؟ فصل بعد از همین‌جا ادامه می‌دهد.")
    ]}
  ],
  end: ["حالت UEFI است و CSM خاموش.", "Fast Boot خاموش.", "SATA روی AHCI.", "Secure Boot خاموش.", "ساعت BIOS تقریباً درست است.", "منوی Esc فلش را با پیشوند UEFI نشان داد."],
  probs: [
    ["F2 کار نمی‌کند و مستقیم Fedora بالا می‌آید.", "از داخل Fedora دستور systemctl reboot --firmware-setup را بزن، یا لپ‌تاپ را کامل خاموش کن و F2 را قبل از پاور نگه دار."],
    ["گزینهٔ Secure Boot خاکستری است.", "در بعضی Aptioها اول باید برای BIOS رمز Administrator بگذاری تا Secure Boot قابل تغییر شود. بعد از خاموش کردنش می‌توانی رمز را بی‌اثر کنی."],
    ["فلش در منوی Esc نیست.", "Fast Boot خاموش است؟ فلش را به پورت دیگری بزن و دوباره امتحان کن. اگر باز هم نبود، فلش را با روش دیگر بنویس (فصل ۱)."]
  ],
  src: [
    ["Ryoku repo: installation-hardware.md (Secure Boot، VMD/RST، ساعت)", "https://github.com/ryoku-dev/ryoku/blob/main/docs/installation-hardware.md"],
    ["Ryoku repo: installation/tui/README.md (Safety gates)", "https://github.com/ryoku-dev/ryoku/blob/main/installation/tui/README.md"],
    ["Arch Wiki: Unified Extensible Firmware Interface", "https://wiki.archlinux.org/title/Unified_Extensible_Firmware_Interface"],
    ["Arch Wiki: Secure Boot", "https://wiki.archlinux.org/title/Unified_Extensible_Firmware_Interface/Secure_Boot"],
    ["systemctl(1): --firmware-setup", "https://man.archlinux.org/man/systemctl.1"],
    ["Asus K556UQ manual (ManualOwl)", "https://www.manualowl.com/m/Asus/K556UQ/Manual/559543"]
  ]
});
