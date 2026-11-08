G.add({
  id: "c6", n: "۶", short: "بسته‌ها، برنامه‌ها و K860",
  t: "مدیریت بسته و نصب برنامه‌های پایه",
  what: "pacman، yay، gpk و Flatpak را یاد می‌گیریم، اول می‌بینیم Ryoku چه چیزهایی را از قبل دارد و بعد فقط کمبودها را نصب می‌کنیم: فونت فارسی، برنامه‌های روزمره، ابزارهای سخت‌افزار و کیبورد Logitech K860.",
  why: "دانستن این‌که هر برنامه از کجا آمده و چطور تمیز حذفش کنی، سیستم را سال‌ها مرتب نگه می‌دارد.",
  time: "۶۰ دقیقه",
  need: "پروکسی ترمینال (فصل ۵) روشن: <code>proxy-on</code>",
  steps: [
    { t: "درس pacman: ده دستوری که همیشه لازم داری", b: [
      TBL(["دستور", "کار"], [
        ["<code>pacman -Ss کلمه</code>", "جست‌وجو در مخزن‌ها (اسم و توضیح)"],
        ["<code>pacman -Si بسته</code>", "اطلاعات یک بسته در مخزن (نسخه، اندازه، وابستگی‌ها)"],
        ["<code>sudo pacman -S بسته</code>", "نصب"],
        ["<code>sudo pacman -S --needed بسته</code>", "نصب، فقط اگر از قبل نصب نیست"],
        ["<code>sudo pacman -Syu</code>", "به‌روزرسانی کامل سیستم"],
        ["<code>sudo pacman -R بسته</code>", "حذف خود بسته"],
        ["<code>sudo pacman -Rns بسته</code>", "حذف بسته، وابستگی‌های بی‌استفاده‌اش و فایل‌های تنظیم سیستمی‌اش"],
        ["<code>pacman -Qi بسته</code>", "اطلاعات یک بستهٔ نصب‌شده"],
        ["<code>pacman -Qe</code>", "فهرست بسته‌هایی که صریحاً نصب شده‌اند (نه به‌عنوان وابستگی)"],
        ["<code>pacman -Ql بسته</code>", "فایل‌هایی که این بسته نصب کرده"],
        ["<code>pacman -Qo /usr/bin/kitty</code>", "این فایل مال کدام بسته است؟"],
        ["<code>pacman -Qdt</code>", "بسته‌های [[یتیم|orphan]]"]
      ]),
      C("concept", "حروف بزرگ گزینه‌ها", "<b>‎-S</b> یعنی کار با مخزن (sync)، <b>‎-Q</b> یعنی پرس‌وجو در بسته‌های نصب‌شده (query) و <b>‎-R</b> یعنی حذف (remove). حروف کوچک بعدشان جزئیات را مشخص می‌کنند. با این منطق، دستورها را حفظ نمی‌کنی، می‌سازی‌شان."),
      C("ex", "", "این‌ها را امتحان کن و خروجی را بخوان: <code>pacman -Ss telegram</code>، <code>pacman -Qi fish</code>، <code>pacman -Qo /usr/bin/yazi</code>، <code>pacman -Qe | wc -l</code> (تعداد بسته‌های صریح).")
    ]},
    { t: "تمیزکاری: یتیم‌ها و کش بسته‌ها", b: [
      CMD({ c: "pacman -Qdtq\nsudo pacman -Rns (pacman -Qdtq)", d: "اول فهرست بسته‌های یتیم را نشان می‌دهد و بعد حذف‌شان می‌کند.", on: "laptop", root: true, shell: "fish",
        parts: [["-Qdtq", "‎d وابستگی، ‎t که دیگر لازم نیست، ‎q فقط اسم"], ["(…)", "در fish پرانتز یعنی «خروجی این دستور را این‌جا بگذار». در bash همین را ‎$(…) می‌نویسند."]],
        ok: "اگر یتیمی نباشد، دستور دوم می‌گوید <code>no targets specified</code>. خطای مهمی نیست.",
        note: "قبل از تأیید، فهرستی را که pacman برای حذف نشان می‌دهد بخوان. اگر بسته‌ای را می‌شناسی و لازمش داری، n بزن و آن را با <code>sudo pacman -D --asexplicit نام</code> صریح علامت بزن." }),
      CMD({ c: "sudo pacman -S --needed pacman-contrib\nsudo paccache -rk2\nsudo paccache -ruk0", d: "ابزار paccache را نصب می‌کند، از هر بسته فقط دو نسخهٔ آخر را در کش نگه می‌دارد و کش بسته‌های حذف‌شده را کامل پاک می‌کند.", on: "laptop", root: true, net: "net",
        parts: [["-r", "حذف (remove) از کش"], ["-k2", "دو نسخهٔ آخر را نگه دار (برای برگشت به نسخهٔ قبل لازم است)"], ["-u", "فقط بسته‌هایی که دیگر نصب نیستند"]],
        out: "==> finished: 143 packages removed (disk space saved: 1.82 GiB)" }),
      C("concept", "", "[[کش بسته‌ها|cache]] در <code>/var/cache/pacman/pkg</code> است. اگر نسخهٔ جدید یک برنامه خراب بود، نسخهٔ قبلی‌اش از همین‌جا با <code>sudo pacman -U /var/cache/pacman/pkg/نام-نسخه.pkg.tar.zst</code> برمی‌گردد. برای همین کامل خالی‌اش نمی‌کنیم.")
    ]},
    { t: "yay و AUR: سؤال‌هایش چه معنایی دارند", b: [
      P("[[yay|yay]] روی ویرایش CachyOS از مخزن cachyos نصب شده است. همان گزینه‌های pacman را می‌فهمد و AUR را هم اضافه می‌کند:"),
      TBL(["دستور", "کار"], [
        ["<code>yay -Ss کلمه</code>", "جست‌وجو در مخزن‌ها و AUR (نتیجه‌های aur/ از AUR هستند)"],
        ["<code>yay -S بسته</code>", "نصب (اگر در مخزن بود از مخزن، وگرنه از AUR)"],
        ["<code>yay -Sua</code>", "فقط به‌روزرسانی بسته‌های AUR"],
        ["<code>yay</code>", "به‌تنهایی یعنی ‎-Syu به‌علاوهٔ AUR"],
        ["<code>yay -Yc</code>", "حذف وابستگی‌های بی‌استفاده"],
        ["<code>yay -Ps</code>", "آمار بسته‌ها"]
      ]),
      C("warn", "", "yay را با sudo اجرا نکن. خودش بسته را با کاربر تو می‌سازد و فقط برای نصب نهایی رمز sudo را می‌خواهد."),
      H("سؤال‌های yay به زبان ساده"),
      TBL(["سؤال", "یعنی", "جواب معمول"], [
        ["<code>Packages to cleanBuild?</code>", "ساخت قبلی را پاک کنم و از صفر بسازم؟", K("Enter") + " (هیچ‌کدام). اگر ساخت قبلی خراب شده بود، A."],
        ["<code>Diffs to show?</code>", "تغییرات دستور ساخت (PKGBUILD) را نشانت بدهم؟", "برای بستهٔ جدیدی که نمی‌شناسی یک بار A بزن و بخوان (با q خارج شو). بعداً Enter."],
        ["فهرست شماره‌دار با «Enter number(s)»", "چند بسته با این اسم هست؛ کدام؟", "شمارهٔ موردی که دقیقاً اسمش را می‌خواهی (معمولاً اولی)."],
        ["<code>Proceed with installation? [Y/n]</code>", "نصب کنم؟", "Y یا Enter"],
        ["<code>Remove make dependencies after install? [y/N]</code>", "ابزارهایی که فقط برای ساخت لازم بودند را پاک کنم؟", "y، تا سیستم شلوغ نشود"]
      ]),
      C("concept", "اعتماد به AUR", "AUR را کاربران عادی نگه می‌دارند. قبل از نصب بستهٔ ناآشنا در صفحه‌اش در aur.archlinux.org تعداد رأی‌ها (Votes)، تاریخ آخرین به‌روزرسانی و نظرها را ببین. بسته‌های ‎-bin برنامهٔ آماده را دانلود می‌کنند (سریع)؛ بقیه از سورس ساخته می‌شوند (کند).")
    ]},
    { t: "GlazePKG (gpk): یک نمای مشترک", b: [
      P("Ryoku ابزار [[gpk|gpk]] را به‌عنوان «مدیر بستهٔ RyokuArch» نصب کرده: یک داشبورد ترمینالی که بسته‌های pacman، AUR، Flatpak و بقیه را در یک فهرست قابل جست‌وجو نشان می‌دهد. لانچر Ryoku هم برای جست‌وجوی بسته از همین استفاده می‌کند."),
      CMD({ c: "gpk", d: "داشبورد GlazePKG را باز می‌کند.", on: "laptop",
        note: "داخل داشبورد معمولاً " + K("?") + " راهنمای کلیدها را نشان می‌دهد و با " + K("q") + " خارج می‌شوی. از خط فرمان هم <code>gpk search نام</code> و <code>gpk install نام</code> کار می‌کنند (لانچر Ryoku همین‌ها را صدا می‌زند).",
        uv: "کلیدهای داخل داشبورد gpk را از مستندات بالادستی (github.com/neur0map/glazepkg) نخواندم. برای کار روزمره pacman و yay کافی‌اند؛ gpk را برای «دیدن» بسته‌ها به کار ببر." })
    ]},
    { t: "Flatpak و Flathub", b: [
      CMD({ c: "flatpak remotes", d: "مخزن‌های Flatpak تنظیم‌شده را نشان می‌دهد.", on: "laptop",
        out: "Name    Options\nflathub system", ok: "اگر flathub نبود یا فقط system بود، گام بعدی را بزن." }),
      CMD({ c: "flatpak remote-add --user --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo", d: "مخزن Flathub را برای کاربر خودت اضافه می‌کند.", on: "laptop", net: "proxy",
        parts: [["--user", "در ‎~/.local/share/flatpak، بدون sudo؛ پروکسی ترمینال هم کار می‌کند"], ["--if-not-exists", "اگر از قبل هست، خطا نده"]] }),
      CMD({ c: "flatpak install --user flathub com.github.tchx84.Flatseal", d: "Flatseal را نصب می‌کند: برنامه‌ای گرافیکی برای دیدن و تغییر دسترسی‌های برنامه‌های Flatpak (مثلاً اجازهٔ دیدن /data).", on: "laptop", net: "proxy",
        ok: "<code>flatpak list --user</code> آن را نشان بدهد. اجرا: <code>flatpak run com.github.tchx84.Flatseal</code> یا از لانچر." }),
      C("concept", "کی Flatpak؟", "اول مخزن رسمی (pacman). اگر نبود، AUR (yay). Flatpak برای برنامه‌های گرافیکی بزرگی که در هیچ‌کدام نیستند یا نسخهٔ رسمی سازنده را می‌خواهی. برنامه‌های Flatpak در [[جعبه‌شنی|sandbox]] اجرا می‌شوند و به همهٔ فایل‌ها دسترسی ندارند.")
    ]},
    { t: "اول ببین Ryoku چه چیزی را از قبل دارد", b: [
      CMD({ c: "pacman -Q yazi kitty fish fzf zoxide ripgrep fd bat eza btop fastfetch jq ffmpeg yt-dlp imagemagick wl-clipboard brightnessctl power-profiles-daemon noto-fonts noto-fonts-emoji neovim lazygit github-cli localsend-bin flatpak gpk", d: "برای هر اسم، نسخهٔ نصب‌شده را نشان می‌دهد یا می‌گوید نصب نیست.", on: "laptop",
        out: "yazi 26.9.1-1\nkitty 0.49.2-1\n…\nerror: package 'localsend-bin' was not found",
        ok: "هر چیزی که error داد نصب نیست. اگر localsend-bin نیست، یعنی مرحلهٔ AUR نصب‌کننده به اینترنت آزاد نرسیده؛ پایین‌تر نصبش می‌کنیم." }),
      P("طبق فهرست بسته‌های Ryoku، این‌ها از قبل نصب‌اند و لازم نیست دوباره نصب‌شان کنی: Yazi، kitty، fish، zsh، starship، fzf، zoxide، ripgrep، fd، bat، eza، btop، fastfetch، jq، Neovim، git، gh، lazygit، ffmpeg، yt-dlp، imagemagick، mpv، wl-clipboard، brightnessctl، power-profiles-daemon، Flatpak، فونت‌های Noto (عربی/فارسی و ایموجی) و JetBrains Mono Nerd.")
    ]},
    { t: "فونت و متن فارسی", b: [
      CMD({ c: "yay -S vazirmatn-fonts\nfc-list | grep -i vazirmatn | head -n 3", d: "فونت وزیرمتن را از AUR نصب می‌کند و بررسی می‌کند سیستم آن را می‌شناسد.", on: "laptop", net: "proxy",
        out: "/usr/share/fonts/vazirmatn/Vazirmatn-Regular.ttf: Vazirmatn:style=Regular\n…",
        ok: "حداقل یک خط Vazirmatn. در Firefox از Settings ← Fonts ← Advanced، برای «Arabic» فونت Vazirmatn را انتخاب کن.",
        note: "وزیرمتن در مخزن رسمی Arch نیست و فقط در AUR (vazirmatn-fonts) هست. بدون آن هم Noto Sans Arabic که Ryoku نصب کرده متن فارسی را درست نشان می‌دهد؛ وزیرمتن فقط زیباتر است." }),
      C("concept", "فارسی در ترمینال", "ترمینال‌ها، از جمله kitty، متن دوجهته (راست‌به‌چپ) را درست نمی‌چینند. متن فارسی در ترمینال ممکن است با حروف جدا یا ترتیب برعکس دیده شود. خراب نیست؛ ترمینال برای کد طراحی شده. برای خواندن و نوشتن فارسی از برنامه‌های گرافیکی (Obsidian، مرورگر، Telegram) استفاده کن. اسم فایل فارسی در Yazi کار می‌کند، ولی برای پوشه‌های کاری اسم انگلیسی راحت‌تر است."),
      C("check", "", "در یک برنامهٔ گرافیکی (مثلاً لانچر " + K("Super+Space") + ") با " + K("Alt+Shift") + " فارسی تایپ کن. اگر حروف مربع شدند، فصل ۱۴ را ببین.")
    ]},
    { t: "برنامه‌های روزمره", b: [
      CMD({ c: "sudo pacman -S --needed telegram-desktop keepassxc obsidian zathura zathura-pdf-mupdf imv", d: "تلگرام، مدیر رمز KeePassXC، یادداشت Obsidian، نمایشگر PDF زاتورا با موتور MuPDF و نمایشگر عکس imv را از مخزن رسمی نصب می‌کند.", on: "laptop", root: true, net: "proxy",
        parts: [["telegram-desktop", "پیام‌رسان (پروکسی داخلی دارد؛ فصل ۵)"], ["keepassxc", "نگهداری امن رمزها، از جمله لینک اشتراک Happ"], ["obsidian", "یادداشت‌برداری Markdown با حالت Vim"], ["zathura + zathura-pdf-mupdf", "PDF با کلیدهای Vim (j/k، / برای جست‌وجو)"], ["imv", "عکس با کیبورد (فلش‌ها، + و -، q)"]] }),
      CMD({ c: "yay -S cryptomator-bin", d: "Cryptomator: یک گاوصندوق رمزنگاری‌شده برای پوشه‌ها، مناسب /data/vaults (از AUR، نسخهٔ آماده).", on: "laptop", net: "proxy",
        note: "جایگزین: <code>flatpak install --user flathub org.cryptomator.Cryptomator</code>" }),
      CMD({ c: "yay -S --needed localsend-bin", d: "LocalSend برای فرستادن فایل بین لپ‌تاپ، Fedora و گوشی در شبکهٔ خانه. فقط اگر قبلاً نصب نشده.", on: "laptop", net: "proxy" })
    ]},
    { t: "دانلود، فشرده‌سازی و ابزارهای کوچک", b: [
      CMD({ c: "sudo pacman -S --needed aria2 unzip 7zip unrar trash-cli tealdeer dust duf", d: "دانلودکنندهٔ چندرشته‌ای، ابزارهای آرشیو، سطل زباله در ترمینال، خلاصهٔ دستورها و دو ابزار دیدن فضای دیسک را نصب می‌کند.", on: "laptop", root: true, net: "proxy",
        parts: [["aria2", "دانلود سریع با چند اتصال (فقط پروکسی HTTP)"], ["unzip / 7zip / unrar", "باز کردن zip، 7z و rar. بستهٔ قدیمی p7zip در مخزن نیست و 7zip جایش آمده."], ["trash-cli", "دستورهای trash-put، trash-list و trash-restore، تا به‌جای rm فایل را به سطل زباله بفرستی"], ["tealdeer", "دستور <code>tldr</code>: خلاصهٔ مثال‌محور هر فرمان"], ["dust / duf", "چه چیزی جای دیسک را گرفته / فضای خالی هر دیسک"]] }),
      CMD({ c: "tldr --update\ntldr tar", d: "پایگاه‌دادهٔ tldr را دانلود می‌کند و خلاصهٔ دستور tar را نشان می‌دهد.", on: "laptop", net: "proxy" })
    ]},
    { t: "صدا، بلوتوث، روشنایی و باتری", b: [
      CMD({ c: "sudo pacman -S --needed bluetui wiremix pulsemixer", d: "رابط ترمینالی بلوتوث (bluetui) و دو میکسر صدای ترمینالی (wiremix برای PipeWire، pulsemixer ساده‌تر).", on: "laptop", root: true, net: "proxy" }),
      TBL(["کار", "دستور"], [
        ["میکسر صدا", "<code>wiremix</code> یا <code>pulsemixer</code> (هر دو با کیبورد)"],
        ["صدا از ترمینال", "<code>wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%+</code>"],
        ["روشنایی", "<code>brightnessctl set 50%</code> یا <code>brightnessctl set 10%-</code>"],
        ["حالت مصرف", "<code>powerprofilesctl get</code> و <code>powerprofilesctl set power-saver</code> (یا balanced)"],
        ["وضعیت باتری", "<code>upower -i (upower -e | grep BAT)</code>"]
      ]),
      C("warn", "TLP نصب نکن", "Ryoku از power-profiles-daemon استفاده می‌کند. TLP با آن تداخل دارد و راهنمای سخت‌افزار Ryoku می‌گوید روی لپ‌تاپ‌های Asus با asusctl هم تداخل دارد. اگر باتری کم دوام دارد، اول حالت power-saver و خاموش کردن blur را امتحان کن."),
      C("concept", "", "کلیدهای Fn صدا و روشنایی لپ‌تاپ در Ryoku از قبل وصل‌اند (XF86AudioRaiseVolume، XF86MonBrightnessUp و…) و حتی وقتی صفحه قفل است کار می‌کنند.")
    ]},
    { t: "کیبورد Logitech ERGO K860 با بلوتوث", b: [
      C("concept", "دو راه اتصال", "K860 هم بلوتوث دارد و هم با گیرندهٔ USB لاجیتک کار می‌کند. بسته به سری تولید، گیرنده‌اش Unifying یا Logi Bolt است. گیرنده سریع‌تر وصل می‌شود و در BIOS هم کار می‌کند؛ بلوتوث یک پورت USB آزاد نگه می‌دارد. سه دکمهٔ Easy-Switch (1، 2، 3) روی کیبورد سه دستگاه را جدا نگه می‌دارند."),
      UV("نوع گیرندهٔ مدل تو (Unifying یا Bolt) را نمی‌دانم. روی خود گیرنده یک نشان نارنجی (Unifying) یا سبز با حرف B (Bolt) هست. Solaar هر دو را پشتیبانی می‌کند."),
      CMD({ c: "systemctl status bluetooth --no-pager\nsudo systemctl enable --now bluetooth", d: "وضعیت سرویس بلوتوث را نشان می‌دهد و اگر خاموش است، روشن و فعال در بوتش می‌کند.", on: "laptop", root: true }),
      P("یک کانال Easy-Switch آزاد را روی K860 انتخاب کن (مثلاً 2) و آن را <b>سه ثانیه نگه دار</b> تا چراغش سریع چشمک بزند (حالت جفت شدن). بعد:"),
      CMD({ c: "bluetoothctl\npower on\nagent on\ndefault-agent\nscan on", d: "کنسول تعاملی بلوتوث را باز می‌کند و دنبال دستگاه‌ها می‌گردد. خط‌ها را یکی‌یکی داخل bluetoothctl تایپ کن.", on: "laptop",
        out: "[NEW] Device D2:3C:4F:11:22:33 ERGO K860",
        ok: "خطی با اسم ERGO K860 و یک آدرس MAC بیاید. آدرس را یادداشت کن." }),
      CMD({ c: "pair D2:3C:4F:11:22:33\ntrust D2:3C:4F:11:22:33\nconnect D2:3C:4F:11:22:33\nscan off\nquit", d: "جفت می‌کند، به دستگاه اعتماد می‌کند (برای اتصال خودکار در آینده) و وصل می‌شود. آدرس را با آدرس خودت عوض کن.", on: "laptop",
        parts: [["pair", "جفت شدن. اگر عددی نشان داد (Passkey)، همان را روی K860 تایپ کن و Enter بزن."], ["trust", "مهم‌ترین قدم برای وصل شدن خودکار بعد از ری‌استارت"], ["connect", "اتصال همین الان"]],
        ok: "<code>Connection successful</code>. روی K860 تایپ کن؛ باید کار کند." }),
      C("ex", "همین کار با bluetui", "دستور <code>bluetui</code> را بزن: فهرست دستگاه‌ها با کیبورد مدیریت می‌شود (کلیدهای راهنما پایین صفحه نوشته شده‌اند). یک بار جفت شدن را با آن هم امتحان کن."),
      CMD({ c: "sudo pacman -S --needed solaar\nsolaar show", d: "Solaar را برای دیدن باتری و تنظیمات دستگاه‌های لاجیتک نصب می‌کند و اطلاعات دستگاه‌ها را نشان می‌دهد.", on: "laptop", root: true, net: "proxy",
        note: "اجرای گرافیکی: از لانچر «Solaar». قوانین udev لازم با خود بسته نصب می‌شوند؛ اگر دستگاه را ندید، یک بار گیرنده را جدا و وصل کن یا ری‌استارت کن." }),
      H("وقتی بعد از ری‌استارت یا خواب وصل نمی‌شود"),
      OL(
        "مطمئن شو <code>trust</code> را زده‌ای: <code>bluetoothctl info آدرس</code> باید <code>Trusted: yes</code> نشان بدهد.",
        "در <code>/etc/bluetooth/main.conf</code> زیر <code>[Policy]</code> مقدار <code>AutoEnable=true</code> باشد (در نسخه‌های جدید BlueZ پیش‌فرض همین است).",
        "یک کلید روی K860 بزن تا از خواب بیدار شود؛ کیبوردهای بلوتوثی برای صرفه‌جویی باتری می‌خوابند.",
        "اگر هنوز نشد: <code>bluetoothctl connect آدرس</code>.",
        "Ryoku از قبل autosuspend بلوتوث USB را خاموش کرده (فایل <code>/usr/lib/modprobe.d/99-ryoku-bt-autosuspend.conf</code>) که علت رایج قطع‌شدن‌هاست."
      ),
      C("warn", "", "در صفحهٔ ورود SDDM، بلوتوث معمولاً بالا آمده است، ولی در Limine، BIOS و صفحهٔ رمز LUKS نه. کیبورد لپ‌تاپ همیشه پشتیبان توست.")
    ]}
  ],
  end: ["گزینه‌های ‎-S، ‎-Q و ‎-R را با هم ترکیب می‌کنم.", "یک بار یتیم‌ها و کش را تمیز کردم.", "سؤال‌های yay را می‌فهمم.", "Flathub برای کاربر اضافه شد.", "وزیرمتن و برنامه‌های روزمره نصب‌اند.", "K860 با trust وصل است و بعد از ری‌استارت خودش وصل می‌شود."],
  probs: [
    ["error: target not found: …", "اسم بسته غلط است یا در AUR است؛ با pacman -Ss یا yay -Ss اسم درست را پیدا کن."],
    ["yay خطای «could not resolve host aur.archlinux.org» می‌دهد.", "proxy-on را جا انداخته‌ای."],
    ["bluetoothctl می‌گوید No default controller available.", "سرویس بلوتوث خاموش است یا آداپتور با rfkill بسته شده: rfkill list و sudo rfkill unblock bluetooth."],
    ["Failed to pair: org.bluez.Error.AuthenticationFailed", "Passkey را روی K860 تایپ نکرده‌ای یا دیر شد. remove آدرس، بعد دوباره pair."]
  ],
  src: [
    ["Arch Wiki: pacman", "https://wiki.archlinux.org/title/Pacman"],
    ["Arch Wiki: pacman/Tips and tricks (یتیم‌ها، کش)", "https://wiki.archlinux.org/title/Pacman/Tips_and_tricks"],
    ["Arch Wiki: AUR helpers", "https://wiki.archlinux.org/title/AUR_helpers"],
    ["yay", "https://github.com/Jguer/yay"],
    ["GlazePKG", "https://github.com/neur0map/glazepkg"],
    ["Flathub setup", "https://flathub.org/setup/Arch"],
    ["Ryoku repo: system/packages/base.packages", "https://github.com/ryoku-dev/ryoku/blob/main/system/packages/base.packages"],
    ["archlinux.org package search", "https://archlinux.org/packages/"],
    ["AUR: vazirmatn-fonts", "https://aur.archlinux.org/packages/vazirmatn-fonts"],
    ["Arch Wiki: Bluetooth", "https://wiki.archlinux.org/title/Bluetooth"],
    ["Arch Wiki: Bluetooth keyboard", "https://wiki.archlinux.org/title/Bluetooth_keyboard"],
    ["Solaar", "https://pwr-solaar.github.io/Solaar/"],
    ["Arch Wiki: Power management (power-profiles-daemon)", "https://wiki.archlinux.org/title/Power_management"]
  ]
});
