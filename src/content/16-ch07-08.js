G.add({
  id: "c7", n: "۷", short: "هارد ۱ ترابایتی به‌عنوان /data",
  t: "هارد ۱ ترابایتی به‌عنوان /data",
  what: "هارد ۱ ترابایتی را پیدا می‌کنیم، پاک و فرمتش می‌کنیم، آن را دائمی روی /data سوار می‌کنیم، مالکیتش را به تو می‌دهیم و ساختار پوشه‌ها را می‌سازیم.",
  why: "SSD برای سیستم و برنامه‌هاست و HDD برای داده‌های حجیم. جدا بودن‌شان یعنی نصب دوبارهٔ سیستم به داده‌ها دست نمی‌زند.",
  time: "۳۰ دقیقه",
  need: "اسم دستگاه HDD از فصل ۳ (حدود ۹۳۱ گیگ، ROTA=1)، یک اسنپ‌شات تازه.",
  steps: [
    { t: "پیدا کردن هارد با lsblk", b: [
      CMD({ c: "lsblk -f\nlsblk -dpo NAME,SIZE,MODEL,ROTA", d: "دیسک‌ها و پارتیشن‌ها را با فایل‌سیستم، برچسب، UUID و نقطهٔ سوارشدن نشان می‌دهد و بعد فقط دیسک‌ها را با اندازه و مدل.", on: "laptop",
        parts: [["-f", "ستون‌های فایل‌سیستم: FSTYPE، LABEL، UUID، FSAVAIL، MOUNTPOINTS"], ["ROTA=1", "هارد چرخشی؛ همان ۱ ترابایتی"]],
        out: "NAME   FSTYPE FSVER LABEL UUID                                 FSAVAIL MOUNTPOINTS\nsda\n└─sda1 ext4   1.0         3c1e…-old-fedora-data\nsdb\n├─sdb1 vfat   FAT32       8A1B-2C3D                             1.7G /boot\n└─sdb2 btrfs              f00d…                                 210G /home …",
        ok: "دیسکی که ۹۳۱ گیگ و ROTA=1 است و جایی سوار نیست، هارد داده است. اسمش را در پنل مقادیر (خانهٔ «دستگاه هارد») بنویس؛ الان {{HDD}} است. دیسکی که /boot و / دارد SSD است و نباید به آن دست بزنی." }),
      C("warn", "", "دستورهای بعدی کل هارد را پاک می‌کنند. اگر روی آن چیزی لازم داری، همین حالا کپی‌اش کن. یک بار دیگر چک کن که {{HDD}} همان دیسک ۹۳۱ گیگ است، نه SSD.")
    ]},
    { t: "ext4 یا Btrfs؟", b: [
      TBL(["", "[[ext4|ext4]]", "Btrfs"], [
        ["سادگی و پایداری", "بسیار ساده، ۱۵ سال آزموده", "پیچیده‌تر"],
        ["اسنپ‌شات", "ندارد", "دارد"],
        ["تشخیص خرابی داده (checksum)", "فقط برای متادیتا", "برای همهٔ داده‌ها"],
        ["روی هارد چرخشی و فایل‌های بزرگ", "عالی", "با فایل‌هایی که مدام تغییر می‌کنند (مثل دیسک ماشین مجازی) تکه‌تکه می‌شود"],
        ["ابزار تعمیر", "fsck قدیمی و مطمئن", "کمتر قابل پیش‌بینی برای مبتدی"]
      ]),
      P("<b>پیشنهاد: ext4.</b> هارد داده جایی برای فیلم، عکس، آرشیو و پشتیبان است و سادگی و قابل‌تعمیر بودن مهم‌تر از اسنپ‌شات است. اسنپ‌شات سیستم را Btrfsِ SSD انجام می‌دهد.")
    ]},
    { t: "پاک کردن و پارتیشن‌بندی", b: [
      CMD({ c: "sudo snapper -c root create -d \"before /data setup\"", d: "قبل از دست زدن به fstab یک اسنپ‌شات می‌گیرد؛ اگر بوت خراب شد، از منوی Limine برمی‌گردی.", on: "laptop", root: true }),
      CMD({ c: "sudo pacman -S --needed parted", d: "ابزار parted را برای ساخت جدول پارتیشن نصب می‌کند (اگر نیست).", on: "laptop", root: true, net: "net" }),
      CMD({ c: "sudo wipefs -a {{HDD}}", d: "همهٔ امضاهای فایل‌سیستم و جدول پارتیشن را از روی هارد پاک می‌کند تا از صفر شروع کنیم.", on: "laptop", root: true, danger: true,
        confirm: ["{{HDD}} همان هارد ۹۳۱ گیگ با ROTA=1 است.", "هیچ فایل لازمی روی این هارد نیست.", "SSD سیستم (که / و /boot روی آن است) نیست."],
        parts: [["wipefs", "پاک‌کنندهٔ امضای فایل‌سیستم"], ["-a", "همهٔ امضاها"]],
        out: "/dev/sda: 8 bytes were erased at offset 0x00000200 (gpt): 45 46 49 20 50 41 52 54\n/dev/sda: 2 bytes were erased at offset 0x000001fe (PMBR): 55 aa" }),
      CMD({ c: "sudo parted -s {{HDD}} mklabel gpt mkpart data ext4 1MiB 100%\nlsblk {{HDD}}", d: "یک جدول پارتیشن GPT می‌سازد و یک پارتیشن به اسم data که کل هارد را می‌گیرد.", on: "laptop", root: true, danger: true,
        confirm: ["{{HDD}} همان هارد ۹۳۱ گیگ است.", "wipefs را بدون خطا اجرا کردم."],
        parts: [["-s", "بدون سؤال (script mode)"], ["mklabel gpt", "جدول پارتیشن جدید GPT"], ["mkpart data ext4 1MiB 100%", "پارتیشنی به اسم data، از ۱ مگابایت (برای هم‌ترازی) تا آخر دیسک. ext4 این‌جا فقط برچسب است و فرمت نمی‌کند."]],
        out: "NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS\nsda      8:0    0 931.5G  0 disk\n└─sda1   8:1    0 931.5G  0 part",
        ok: "یک پارتیشن به اسم {{HDD}}1 ساخته شده است." })
    ]},
    { t: "فرمت ext4 با برچسب", b: [
      CMD({ c: "sudo mkfs.ext4 -L data {{HDD}}1", d: "روی پارتیشن جدید فایل‌سیستم ext4 با برچسب data می‌سازد.", on: "laptop", root: true, danger: true,
        confirm: ["مقصد {{HDD}}1 است (با عدد ۱ آخرش)، روی هارد ۹۳۱ گیگ."],
        parts: [["mkfs.ext4", "ساختن فایل‌سیستم ext4"], ["-L data", "برچسب (label)؛ در lsblk و Yazi همین اسم دیده می‌شود"]],
        out: "Creating filesystem with 244190208 4k blocks and 61054976 inodes\n…\nWriting superblocks and filesystem accounting information: done",
        ok: "done در پایان. روی هارد ۱ ترابایتی چند ثانیه تا یک دقیقه طول می‌کشد." }),
      CMD({ c: "sudo blkid -s UUID -o value {{HDD}}1", d: "شناسهٔ یکتای ([[UUID|uuid]]) پارتیشن جدید را چاپ می‌کند.", on: "laptop", root: true,
        out: "6f0d9c2a-1b3e-4c5d-9e8f-0a1b2c3d4e5f",
        ok: "این رشته را کپی کن و در پنل مقادیر در خانهٔ «UUID پارتیشن هارد» بگذار. الان مقدارش {{HDD_UUID}} است." }),
      C("concept", "چرا UUID و نه {{HDD}}1؟", "اسم‌هایی مثل sda و sdb به ترتیب شناسایی دیسک‌ها در هر بوت بستگی دارند. اگر یک فلش زده باشی، ممکن است sda و sdb جابه‌جا شوند. UUID در خود فایل‌سیستم نوشته شده و هرگز عوض نمی‌شود.")
    ]},
    { t: "سوار کردن دائمی با fstab (و آزمایش قبل از ری‌استارت)", b: [
      C("concept", "fstab چیست؟", "<code>/etc/fstab</code> فهرستی است که systemd در هر بوت می‌خواند تا بداند چه چیزی را کجا [[سوار|mount]] کند. هر خط شش ستون دارد: چه چیزی، کجا، چه فایل‌سیستمی، چه گزینه‌هایی، dump (همیشه ۰)، ترتیب بررسی fsck."),
      CMD({ c: "sudo mkdir -p /data\nsudo cp /etc/fstab /etc/fstab.bak", d: "پوشهٔ /data را به‌عنوان نقطهٔ سوارشدن می‌سازد و از fstab نسخهٔ پشتیبان می‌گیرد.", on: "laptop", root: true }),
      CMD({ c: "echo 'UUID={{HDD_UUID}}  /data  ext4  defaults,noatime,nofail,x-systemd.device-timeout=10s  0 2' | sudo tee -a /etc/fstab", d: "یک خط برای هارد داده به انتهای fstab اضافه می‌کند.", on: "laptop", root: true, danger: true,
        confirm: ["در پنل مقادیر، UUID درست را از خروجی blkid گذاشته‌ام (نه PUT-UUID-HERE).", "از fstab نسخهٔ پشتیبان گرفتم و اسنپ‌شات دارم."],
        parts: [["UUID=…", "کدام پارتیشن"], ["/data", "کجا سوار شود"], ["ext4", "نوع فایل‌سیستم"], ["defaults", "گزینه‌های استاندارد (خواندن و نوشتن و…)"], ["noatime", "زمان آخرین خواندن را ننویس؛ کمتر به هارد ضربه می‌زند"], ["nofail", "اگر هارد نبود یا خراب بود، بوت را متوقف نکن"], ["x-systemd.device-timeout=10s", "حداکثر ۱۰ ثانیه منتظر هارد بمان، نه ۹۰ ثانیهٔ پیش‌فرض"], ["0 2", "dump خاموش؛ fsck بعد از سیستم اصلی بررسی‌اش کند"], ["tee -a", "به انتهای فایل اضافه کن (append)، با دسترسی root"]] }),
      CMD({ c: "sudo findmnt --verify\nsudo systemctl daemon-reload\nsudo mount -a\nfindmnt /data", d: "fstab را از نظر نحوی بررسی می‌کند، systemd را از تغییر باخبر می‌کند، همه‌چیز را طبق fstab سوار می‌کند و نشان می‌دهد /data درست سوار شده.", on: "laptop", root: true,
        parts: [["findmnt --verify", "fstab را بدون سوار کردن بررسی می‌کند (UUID وجود دارد؟ نوع فایل‌سیستم درست است؟)"], ["mount -a", "هر چیزی را که در fstab هست و سوار نیست، سوار کن. اگر خطایی هست همین‌جا می‌بینی، نه موقع بوت."]],
        out: "Success, no errors or warnings detected\nTARGET SOURCE    FSTYPE OPTIONS\n/data  /dev/sda1 ext4   rw,noatime",
        ok: "هیچ error در خروجی نباشد و findmnt خط /data را نشان بدهد. <b>تا این‌جا بدون خطا نرسیده‌ای، ری‌استارت نکن.</b>" }),
      C("fix", "", "اگر mount -a خطا داد: <code>sudo cp /etc/fstab.bak /etc/fstab</code> تا fstab به حالت قبل برگردد. بعد UUID را با دقت دوباره بنویس.")
    ]},
    { t: "مالکیت و مجوزها", b: [
      CMD({ c: "ls -ld /data\nsudo chown {{USER}}: /data\nls -ld /data", d: "مالک پوشهٔ /data را از root به تو تغییر می‌دهد تا بدون sudo در آن بنویسی.", on: "laptop", root: true,
        parts: [["chown", "تغییر مالک (change owner)"], ["{{USER}}:", "کاربر {{USER}}؛ دونقطهٔ آخر یعنی گروه هم گروه اصلی همین کاربر شود"]],
        out: "drwxr-xr-x 3 root root 4096 … /data\ndrwxr-xr-x 3 nima nima 4096 … /data",
        ok: "در خط دوم اسم تو دوبار آمده. <code>touch /data/test && rm /data/test</code> باید بدون خطا اجرا شود." }),
      C("concept", "drwxr-xr-x یعنی چه؟", "d پوشه است. مالک rwx (خواندن، نوشتن، ورود)، گروه r-x و بقیه r-x. یعنی فقط تو می‌نویسی و بقیهٔ کاربران سیستم فقط می‌خوانند. پوشهٔ lost+found را که ext4 ساخته دست نزن؛ fsck از آن استفاده می‌کند.")
    ]},
    { t: "ساختار پوشه‌ها روی /data", b: [
      CMD({ c: "mkdir -p /data/{media,photos,backups,archive,isos,vaults,idk}\nls /data", d: "هفت پوشهٔ اصلی طرح مرتب‌سازی تو را روی هارد داده می‌سازد.", on: "laptop",
        parts: [["-p", "اگر پوشه هست خطا نده و پوشه‌های میانی را هم بساز"], ["{a,b,c}", "گسترش آکولاد؛ fish هم مثل bash آن را به چند اسم تبدیل می‌کند"]],
        out: "archive  backups  idk  isos  lost+found  media  photos  vaults" }),
      TBL(["پوشه", "برای"], [["media", "فیلم، موسیقی، دوره‌های ویدیویی"], ["photos", "عکس‌ها"], ["backups", "پشتیبان دات‌فایل‌ها و پروژه‌ها"], ["archive", "چیزهای تمام‌شده که می‌خواهی نگه داری"], ["isos", "ISOها و نصب‌کننده‌ها"], ["vaults", "گاوصندوق‌های Cryptomator و پایگاه KeePassXC"], ["idk", "«نمی‌دانم کجا بگذارم»؛ هر هفته خالی‌اش کن"]]),
      C("concept", "پوشه‌های خانه", "ساختار <code>~/{Projects,Content,Notes,AI,System,Apps,Vaults,idk}</code> را عمداً این‌جا با mkdir نمی‌سازیم. پروژهٔ پایانی فصل Yazi این است که همه را فقط با Yazi و بدون موس بسازی.")
    ]},
    { t: "نجات: اگر fstab بوت را خراب کرد", b: [
      P("با <code>nofail</code> و آزمایش <code>mount -a</code> احتمالش خیلی کم است، ولی راه نجات را بلد باش. نشانه: بوت با پیامی دربارهٔ <code>data.mount</code> متوقف می‌شود یا به «[[Emergency mode|emergency]]» می‌رود."),
      H("راه ۱: اسنپ‌شات (ساده‌ترین)"),
      P("fstab داخل زیرحجم ‎@ است و اسنپ‌شات «before /data setup» نسخهٔ سالمش را دارد. ری‌استارت کن، در Limine وارد Snapshots شو، همان را انتخاب کن، بالا بیا و <code>sudo limine-snapper-restore</code> بزن (فصل ۴)."),
      H("راه ۲: پوستهٔ اضطراری"),
      P("اگر در نصب برای root رمز گذاشته‌ای، در حالت اضطراری رمز root را بزن. اگر root قفل باشد، پیام <code>Cannot open access to console, the root account is locked</code> می‌آید و باید راه ۱ یا ۳ را بروی."),
      CMD({ c: "mount -o remount,rw /\nnvim --clean /etc/fstab\n# جلوی خط /data یک # بگذار، :wq\nsystemctl daemon-reload\nreboot", d: "در پوستهٔ اضطراری: ریشه را قابل نوشتن می‌کند، fstab را باز می‌کند تا خط مشکل‌دار را غیرفعال کنی و ری‌استارت می‌کند.", on: "laptop" }),
      H("راه ۳: از فلش نصب"),
      CMD({ c: "lsblk -f\nmount -o subvol=@ /dev/sdb2 /mnt\nnvim --clean /mnt/etc/fstab\numount /mnt\nreboot", d: "از محیط فلش: زیرحجم سیستم (@) را سوار می‌کند تا fstab را ویرایش کنی. sdb2 را با پارتیشن Btrfs روی SSD عوض کن.", on: "live",
        parts: [["-o subvol=@", "زیرحجم سیستم را سوار کن، نه ریشهٔ خام Btrfs"]] })
    ]}
  ],
  end: ["هارد با lsblk و ROTA شناسایی شد.", "ext4 با برچسب data ساخته شد.", "خط fstab با UUID و nofail اضافه شد و mount -a بدون خطا بود.", "مالک /data من هستم.", "هفت پوشهٔ /data ساخته شد.", "یک بار ری‌استارت کردم و /data خودکار سوار شد."],
  probs: [
    ["mount: wrong fs type, bad option…", "نوع فایل‌سیستم یا گزینه‌ها در fstab غلط تایپ شده‌اند. fstab.bak را برگردان و دوباره بنویس."],
    ["/data بعد از ری‌استارت خالی است.", "سوار نشده؛ findmnt /data و journalctl -b -u data.mount را ببین. معمولاً UUID غلط است."],
    ["Permission denied موقع ساختن فایل در /data", "chown را جا انداخته‌ای."]
  ],
  src: [
    ["Arch Wiki: fstab", "https://wiki.archlinux.org/title/Fstab"],
    ["Arch Wiki: File systems", "https://wiki.archlinux.org/title/File_systems"],
    ["Arch Wiki: Parted", "https://wiki.archlinux.org/title/Parted"],
    ["Arch Wiki: Ext4", "https://wiki.archlinux.org/title/Ext4"],
    ["findmnt(8)", "https://man.archlinux.org/man/findmnt.8"],
    ["systemd.mount(5): nofail و x-systemd.device-timeout", "https://man.archlinux.org/man/systemd.mount.5"]
  ]
});

G.add({
  id: "c8", n: "۸", short: "گرافیک NVIDIA 940MX (پیشرفته)",
  t: "گرافیک NVIDIA 940MX (اختیاری و پیشرفته)",
  what: "می‌بینیم Ryoku خودش چه درایوری برای 940MX نصب کرده، مطمئن می‌شویم دسکتاپ روی Intel اجرا می‌شود و NVIDIA فقط با prime-run کار می‌کند، و راه کامل برگشت را یاد می‌گیریم.",
  why: "940MX کارت قدیمی (نسل Maxwell) است. شاخهٔ ۵۹۰ درایور NVIDIA، Maxwell و Pascal را کنار گذاشته و Arch هم به همان شاخه رفته. نصب اشتباه درایور یعنی صفحهٔ سیاه یا گیر کردن در صفحهٔ ورود.",
  time: "۲۰ دقیقه برای بررسی؛ تغییرات اختیاری",
  need: "یک اسنپ‌شات تازه، و حوصله. اگر همه‌چیز کار می‌کند، فقط گام ۱ تا ۳ را بخوان.",
  steps: [
    { t: "Ryoku خودش چه کرده است", b: [
      P("اسکریپت درایور Ryoku (system/hardware/drivers/nvidia.sh) نسل کارت را از روی lspci تشخیص می‌دهد. برای Maxwell، Pascal و Volta شاخهٔ قدیمی <code>nvidia-580xx-dkms</code> را نصب می‌کند (روی ویرایش CachyOS از مخزن cachyos، که تیم CachyOS نگهش می‌دارد). فایل‌های early-KMS و غیرفعال‌سازی nouveau را فقط وقتی می‌نویسد که ماژول واقعاً ساخته شده باشد. یک هوک pacman به اسم ryoku-nvidia-guard هم بعد از هر به‌روزرسانی هسته چک می‌کند: اگر ساخت ماژول DKMS شکست خورده باشد، nouveau را برمی‌گرداند تا در حلقهٔ ورود گیر نکنی."),
      C("concept", "یعنی چه؟", "درایور درست، خودکار نصب شده است. با انتخاب «Hybrid» در نصب، [[گرافیک دوگانه|optimus]] طوری تنظیم شده که دسکتاپ روی Intel اجرا شود و NVIDIA بخوابد. این همان پیشنهاد «فعلاً فقط Intel» است، با این تفاوت که NVIDIA هر وقت لازم شد آماده است.")
    ]},
    { t: "بررسی: کدام درایور فعال است؟", b: [
      CMD({ c: "lspci -k | grep -EA3 'VGA|3D|Display'", d: "کارت‌های گرافیک و درایوری را که الان رویشان کار می‌کند نشان می‌دهد.", on: "laptop",
        out: "00:02.0 VGA compatible controller: Intel Corporation HD Graphics 620 (rev 02)\n\tKernel driver in use: i915\n01:00.0 3D controller: NVIDIA Corporation GM108M [GeForce 940MX] (rev a2)\n\tKernel driver in use: nvidia\n\tKernel modules: nouveau, nvidia_drm, nvidia",
        ok: "Intel با i915 و NVIDIA با nvidia (یا nouveau، اگر ماژول ساخته نشده). کد GM108M یعنی Maxwell." }),
      CMD({ c: "pacman -Qs nvidia\ncat /etc/modprobe.d/nvidia.conf", d: "بسته‌های NVIDIA نصب‌شده و تنظیم ماژول را نشان می‌دهد.", on: "laptop",
        out: "local/nvidia-580xx-dkms 580.…\nlocal/nvidia-580xx-utils 580.…\nlocal/libva-nvidia-driver …\noptions nvidia_drm modeset=1 fbdev=1\noptions nvidia NVreg_PreserveVideoMemoryAllocations=1\nblacklist nouveau\noptions nouveau modeset=0" }),
      CMD({ c: "ryoku-gpu detect", d: "ابزار Ryoku: GPUهای شناسایی‌شده و پیشنهادش برای کارت اصلی رندر را نشان می‌دهد.", on: "laptop",
        note: "همین اطلاعات در Ryoku Hub ← Displays ← GPU هم هست. روی لپ‌تاپ، Intel باید کارت اصلی باشد." })
    ]},
    { t: "هرگز این بسته‌ها را برای 940MX نصب نکن", b: [
      C("warn", "", "<code>nvidia</code>، <code>nvidia-open</code>، <code>nvidia-dkms</code>، <code>nvidia-open-dkms</code>، <code>linux-cachyos-nvidia-open</code> و <code>nvidia-lts</code> همه برای کارت‌های جدید (Turing به بعد) هستند و از 940MX پشتیبانی نمی‌کنند. اگر جایی، حتی در یک راهنمای CachyOS یا پیام خطا، گفتند <code>sudo pacman -S nvidia</code>، این‌جا کاربرد ندارد. ابزار تشخیص سخت‌افزار CachyOS (<code>chwd</code>) را هم با گزینهٔ نصب خودکار (<code>-a</code>) اجرا نکن؛ Ryoku خودش درایور را مدیریت می‌کند."),
      CMD({ c: "pacman -Qq | grep -E '^(nvidia|nvidia-open|nvidia-dkms|nvidia-open-dkms|linux-cachyos-nvidia-open)$' || echo 'ok: no wrong-branch driver'", d: "چک می‌کند بستهٔ نسل اشتباهی نصب نشده باشد.", on: "laptop",
        out: "ok: no wrong-branch driver" })
    ]},
    { t: "اجرای یک برنامه روی NVIDIA با prime-run", b: [
      C("concept", "PRIME offload", "در حالت Hybrid، همه‌چیز روی Intel اجرا می‌شود. [[prime-run|prime]] چند متغیر محیطی تنظیم می‌کند که به یک برنامهٔ خاص می‌گوید روی NVIDIA رندر کند؛ تصویرش از طریق Intel روی صفحه می‌آید."),
      CMD({ c: "sudo pacman -S --needed nvidia-prime mesa-utils", d: "اسکریپت prime-run و ابزار glxinfo را نصب می‌کند.", on: "laptop", root: true, net: "net" }),
      CMD({ c: "glxinfo -B | grep -i 'renderer string'\nprime-run glxinfo -B | grep -i 'renderer string'", d: "یک بار بدون و یک بار با prime-run می‌پرسد چه کارتی رندر می‌کند.", on: "laptop",
        out: "OpenGL renderer string: Mesa Intel(R) HD Graphics 620 (KBL GT2)\nOpenGL renderer string: NVIDIA GeForce 940MX/PCIe/SSE2",
        ok: "خط اول Intel و خط دوم NVIDIA. یعنی offload کار می‌کند." }),
      CMD({ c: "nvidia-smi", d: "وضعیت کارت NVIDIA و برنامه‌هایی که از آن استفاده می‌کنند را نشان می‌دهد (از بستهٔ nvidia-580xx-utils).", on: "laptop",
        note: "اجرای nvidia-smi خودش کارت را بیدار می‌کند. برای دیدن این‌که در حالت عادی خواب است، از گام بعد استفاده کن." })
    ]},
    { t: "آیا NVIDIA واقعاً می‌خوابد؟ (باتری)", b: [
      CMD({ c: "lspci -D | grep -i nvidia\ncat /sys/bus/pci/devices/0000:01:00.0/power/runtime_status", d: "آدرس کامل PCI کارت NVIDIA را پیدا می‌کند و وضعیت مدیریت انرژی‌اش را نشان می‌دهد. اگر آدرس فرق داشت، در خط دوم عوضش کن.", on: "laptop",
        out: "0000:01:00.0 3D controller: NVIDIA Corporation GM108M [GeForce 940MX] (rev a2)\nsuspended",
        ok: "suspended یعنی کارت خاموش است و باتری مصرف نمی‌کند. active یعنی برنامه‌ای از آن استفاده می‌کند یا مدیریت انرژی کار نمی‌کند.",
        uv: "این‌که درایور 580xx روی 940MX مدیریت انرژی runtime را کامل انجام دهد، روی همین لپ‌تاپ تأیید نشده. چند دقیقه بدون استفاده صبر کن و دوباره بخوان." })
    ]},
    { t: "(اختیاری) کاملاً فقط Intel: برداشتن درایور NVIDIA", b: [
      P("فقط اگر NVIDIA دردسر درست کرد (صفحهٔ سیاه، حلقهٔ ورود، خطای DKMS در هر به‌روزرسانی) این کار را بکن. نتیجه: کارت با nouveau می‌ماند و بیشتر وقت خواب است."),
      CMD({ c: "sudo snapper -c root create -d \"before removing nvidia 580xx\"", d: "اسنپ‌شات قبل از تغییر.", on: "laptop", root: true }),
      CMD({ c: "sudo pacman -R nvidia-580xx-dkms\ncat /etc/modprobe.d/nvidia.conf", d: "ماژول هستهٔ NVIDIA را حذف می‌کند. هوک ryoku-nvidia-guard در همین تراکنش می‌بیند ماژولی نمانده، nouveau را برمی‌گرداند و initramfs را از نو می‌سازد.", on: "laptop", root: true, danger: true,
        confirm: ["اسنپ‌شات گرفتم.", "می‌دانم prime-run دیگر کار نمی‌کند."],
        parts: [["-R", "فقط همین بسته؛ nvidia-580xx-utils می‌ماند چون بسته‌های دیگر (مثلاً hyprlandِ CachyOS) به اسم nvidia-utils وابسته‌اند"]],
        ok: "دستور cat باید بگوید No such file or directory (یعنی nouveau دیگر غیرفعال نیست). ری‌استارت کن و <code>lspci -k</code> باید برای NVIDIA بنویسد nouveau.",
        uv: "رفتار هوک را از روی کد منبع خواندم (ryoku-nvidia-guard)، ولی روی سخت‌افزار واقعی آزمایش نکردم. اگر بعد از ری‌استارت مشکلی بود، با اسنپ‌شات برگرد." }),
      H("برگرداندن"),
      CMD({ c: "sudo pacman -S nvidia-580xx-dkms\nryoku doctor\nreboot", d: "ماژول را دوباره نصب می‌کند، doctor تنظیمات modeset و هوک‌ها را هماهنگ می‌کند و ری‌استارت.", on: "laptop", root: true, net: "proxy" })
    ]},
    { t: "اگر بعد از به‌روزرسانی صفحه سیاه شد", b: [
      OL(
        "در Limine با اسنپ‌شات pre همان به‌روزرسانی بالا بیا (فصل ۴).",
        "یا به TTY برو (" + K("Ctrl+Alt+F2") + ")، وارد شو و <code>dkms status</code> را ببین. اگر ماژول nvidia برای هستهٔ جدید <code>installed</code> نیست، ساختش شکست خورده.",
        "<code>ryoku doctor</code> را بزن؛ ناهماهنگی modeset و هوک را درست می‌کند.",
        "اگر هیچ‌کدام نشد، درایور را مثل گام قبل بردار تا روی nouveau بالا بیایی."
      ),
      C("fix", "", "برای بوت یک‌باره بدون KMS: در منوی Limine روی ورودی هسته کلید " + K("e") + " را بزن، به انتهای خط <code>cmdline</code> عبارت <code>nomodeset</code> را اضافه کن و " + K("F10") + " بزن. این تغییر فقط برای همین بوت است. " + uvb)
    ]}
  ],
  end: ["با lspci -k درایور هر کارت را دیدم.", "می‌دانم نباید nvidia یا nvidia-open نصب کنم.", "prime-run glxinfo نام 940MX را نشان داد (یا درایور را آگاهانه برداشتم).", "اسنپ‌شات قبل از هر تغییر درایور گرفتم."],
  probs: [
    ["بعد از ورود دوباره به صفحهٔ ورود برمی‌گردم.", "حلقهٔ ورود NVIDIA. به TTY برو، ryoku doctor بزن یا درایور را بردار."],
    ["prime-run: command not found", "بستهٔ nvidia-prime را نصب کن."],
    ["DKMS در به‌روزرسانی خطا می‌دهد.", "linux-cachyos-headers نصب است؟ pacman -Q linux-cachyos-headers. اگر نه، نصبش کن و sudo dkms autoinstall."]
  ],
  src: [
    ["Ryoku repo: system/hardware/drivers/nvidia.sh", "https://github.com/ryoku-dev/ryoku/blob/main/system/hardware/drivers/nvidia.sh"],
    ["Ryoku repo: system/hardware/drivers/ryoku-nvidia-guard", "https://github.com/ryoku-dev/ryoku/blob/main/system/hardware/drivers/ryoku-nvidia-guard"],
    ["Ryoku repo: docs/installation-hardware.md (Graphics)", "https://github.com/ryoku-dev/ryoku/blob/main/docs/installation-hardware.md"],
    ["AUR: nvidia-580xx-dkms", "https://aur.archlinux.org/packages/nvidia-580xx-dkms"],
    ["Arch Wiki: NVIDIA", "https://wiki.archlinux.org/title/NVIDIA"],
    ["Arch Wiki: PRIME", "https://wiki.archlinux.org/title/PRIME"],
    ["CachyOS wiki: FAQ (NVIDIA)", "https://wiki.cachyos.org/cachyos_basic/faq/"]
  ]
});
