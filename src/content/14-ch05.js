G.add({
  id: "c5", n: "۵", short: "پروکسی (Happ) و ترمینال",
  t: "پروکسی با Happ و دانلود از ترمینال",
  what: "Happ را بدون اینترنت از روی فلش نصب می‌کنیم، اشتراک را وارد و وصل می‌کنیم، پورت‌ها را پیدا می‌کنیم، ترمینال fish را با سه فرمان proxy-on، proxy-off و proxy-status مجهز می‌کنیم و pacman، yay، git، Flatpak، pip و npm را از پروکسی رد می‌کنیم.",
  why: "در ایران GitHub، AUR، Flathub و خیلی از مخزن‌ها فیلتر یا کند هستند. تا ترمینال پروکسی نداشته باشد، تقریباً هیچ چیز جدیدی نصب نمی‌شود.",
  time: "۴۵ تا ۶۰ دقیقه",
  need: "فلش فایل‌ها (Happ.linux.x64.pkg.tar.zst و happ-sub.txt)، اتصال وای‌فای از فصل ۴.",
  steps: [
    { t: "سوار کردن فلش فایل‌ها و نصب آفلاین Happ", b: [
      CMD({ c: "lsblk -o NAME,SIZE,LABEL,TRAN,MOUNTPOINTS", d: "دیسک‌ها و پارتیشن‌ها را با برچسب نشان می‌دهد تا پارتیشن فلش فایل‌ها را پیدا کنی.", on: "laptop",
        out: "NAME     SIZE LABEL  TRAN MOUNTPOINTS\nsda    931.5G        sata\nsdb    238.5G        sata\n├─sdb1     2G\n└─sdb2 236.5G               /home …\nsdc     29.3G        usb\n└─sdc1  29.3G FILES",
        ok: "پارتیشن فلش (این‌جا <code>sdc1</code> با TRAN=usb) را پیدا کن." }),
      CMD({ c: "sudo mkdir -p /mnt/usb\nsudo mount /dev/sdc1 /mnt/usb\nls /mnt/usb/ryoku-setup", d: "یک پوشه به اسم /mnt/usb می‌سازد، پارتیشن فلش را به آن سوار می‌کند و محتوای پوشهٔ ryoku-setup را نشان می‌دهد. sdc1 را با اسمی که خودت دیدی عوض کن.", on: "laptop", root: true,
        out: "Happ.linux.x64.pkg.tar.zst  happ-sub.txt  index.html",
        note: "اگر udisks2 نصب باشد، روش بدون sudo هم هست: <code>udisksctl mount -b /dev/sdc1</code> که فلش را در ‎/run/media/{{USER}}/… سوار می‌کند." }),
      CMD({ c: "pacman -Qip /mnt/usb/ryoku-setup/Happ.linux.x64.pkg.tar.zst | head -n 6", d: "قبل از نصب، اطلاعات بسته (اسم، نسخه، وابستگی‌ها) را از روی خود فایل می‌خواند.", on: "laptop",
        parts: [["-Q", "query (پرس‌وجو)"], ["-i", "اطلاعات"], ["-p", "از روی فایل بسته، نه از بسته‌های نصب‌شده"]],
        out: "Name            : happ\nVersion         : 4.8.1-1\nDescription     : …\nDepends On      : glibc  openssl  libx11  libxkbcommon-x11  wayland …",
        ok: "اسم بسته را ببین (احتمالاً <code>happ</code>). برای حذف بعدی همین اسم را لازم داری." }),
      CMD({ c: "sudo pacman -U /mnt/usb/ryoku-setup/Happ.linux.x64.pkg.tar.zst", d: "Happ را مستقیم از روی فایل نصب می‌کند. اگر وابستگی‌ای کم باشد، pacman آن را از مخزن می‌گیرد (آینه‌های ایرانی Arch بدون پروکسی کار می‌کنند).", on: "laptop", root: true,
        parts: [["-U", "upgrade/install از روی فایل محلی"]],
        ok: "در پایان بدون خطا تمام شود. <code>pacman -Qi happ</code> اطلاعات بستهٔ نصب‌شده را نشان بدهد.",
        note: "برای حذف در آینده: <code>sudo pacman -Rns happ</code> (‎-R حذف، ‎-n فایل‌های تنظیم سیستمی را هم پاک کن، ‎-s وابستگی‌های بی‌استفاده را هم بردار)." }),
      CMD({ c: "wl-copy < /mnt/usb/ryoku-setup/happ-sub.txt", d: "لینک اشتراک Happ را در کلیپ‌بورد می‌گذارد تا در برنامه Paste کنی.", on: "laptop",
        parts: [["wl-copy", "کپی در کلیپ‌بورد Wayland (از بستهٔ wl-clipboard)"], ["< فایل", "محتوای فایل را ورودی دستور کن"]] })
    ]},
    { t: "اجرای Happ، وارد کردن اشتراک و وصل شدن", b: [
      OL(
        "با " + K("Super+Space") + " لانچر را باز کن، <code>Happ</code> را تایپ کن و Enter.",
        "در Happ گزینهٔ افزودن اشتراک از کلیپ‌بورد (چیزی مثل «+» یا «Import from clipboard») را بزن. لینک از گام قبل در کلیپ‌بورد است.",
        "یک سرور را انتخاب کن و وصل شو.",
        "در تنظیمات Happ بخش پورت‌ها (inbound / local ports) را پیدا کن و عدد SOCKS و HTTP را یادداشت کن."
      ),
      UV("نام دقیق دکمه‌ها و منوهای Happ نسخهٔ دسکتاپ لینوکس را از منبع رسمی پیدا نکردم (مستندات عمومی ندارد). پورت SOCKS را خودت ۱۰۸۰۸ دیده‌ای. پورت HTTP در بیشتر کلاینت‌های v2ray معمولاً ۱۰۸۰۹ است، ولی برای Happ تأیید نشد. دستور گام بعد پورت‌های واقعی را نشان می‌دهد."),
      C("concept", "حالا Happ چه کار می‌کند؟", "Happ روی خود لپ‌تاپ (127.0.0.1) یک یا دو [[پورت|port]] باز می‌کند. هر برنامه‌ای که درخواستش را به آن پورت بدهد، از تونل رمزنگاری‌شده بیرون می‌رود. برنامه‌هایی که پورت را نمی‌شناسند، همچنان مستقیم و فیلترشده وصل می‌شوند، مگر حالت TUN روشن باشد (گام بعدی).")
    ]},
    { t: "پیدا کردن پورت‌های واقعی Happ", b: [
      CMD({ c: "ss -tlnp | grep -E '127.0.0.1|\\[::1\\]'", d: "همهٔ پورت‌هایی را که برنامه‌ها روی localhost برایشان منتظرند، با اسم برنامه نشان می‌دهد.", on: "laptop",
        parts: [["ss", "ابزار نمایش سوکت‌ها (جانشین netstat)"], ["-t", "فقط TCP"], ["-l", "فقط آن‌هایی که منتظر اتصال‌اند (listening)"], ["-n", "عدد پورت را نشان بده، نه اسمش"], ["-p", "اسم برنامه را هم نشان بده"]],
        out: "LISTEN 0  4096  127.0.0.1:10808  0.0.0.0:*  users:((\"xray\",pid=2412,fd=7))\nLISTEN 0  4096  127.0.0.1:10809  0.0.0.0:*  users:((\"xray\",pid=2412,fd=8))",
        ok: "پورت‌هایی که جلوی اسم برنامهٔ Happ یا xray/sing-box آمده‌اند، پورت‌های پروکسی‌اند. آن‌ها را در پنل مقادیر (" + K("v") + ") بنویس: SOCKS = {{SOCKS}}، HTTP = {{HTTP}}." }),
      CMD({ c: "curl -sS -o /dev/null -w '%{http_code}\\n' -x socks5h://127.0.0.1:{{SOCKS}} https://github.com\ncurl -sS -o /dev/null -w '%{http_code}\\n' -x http://127.0.0.1:{{HTTP}} https://github.com\ncurl -sS -o /dev/null -w '%{http_code}\\n' -x http://127.0.0.1:{{SOCKS}} https://github.com", d: "سه آزمایش: GitHub از طریق SOCKS، از طریق پورت HTTP، و پروتکل HTTP روی همان پورت SOCKS.", on: "laptop", net: "proxy",
        parts: [["-x", "این پروکسی را استفاده کن"], ["-o /dev/null", "خود صفحه را دور بریز"], ["-w '%{http_code}'", "فقط کد پاسخ HTTP را چاپ کن"]],
        out: "200\n200\n200",
        ok: "۲۰۰ (یا ۳۰۱) یعنی کار کرد. اگر سومی هم ۲۰۰ داد، پورت SOCKS «mixed» است و هر دو پروتکل را می‌فهمد؛ می‌توانی در پنل مقادیر پورت HTTP را برابر SOCKS بگذاری. اگر یکی خطای Connection refused داد، آن پورت باز نیست." })
    ]},
    { t: "حالت پروکسی سیستم یا حالت TUN؟", b: [
      TBL(["", "حالت پروکسی (فقط پورت محلی)", "حالت [[TUN|tun]]"], [
        ["چطور کار می‌کند", "فقط برنامه‌هایی که خودت تنظیم‌شان کنی (ترمینال، مرورگر، تلگرام) از پروکسی رد می‌شوند", "یک کارت شبکهٔ مجازی ساخته می‌شود و همهٔ ترافیک سیستم از آن رد می‌شود"],
        ["دسترسی مدیر", "لازم ندارد", "لازم دارد (Happ از طریق polkit اجازه می‌گیرد)"],
        ["کنترل", "کامل؛ می‌دانی چه چیزی از کجا می‌رود", "کمتر؛ گاهی سایت‌های داخلی هم از خارج می‌روند و کند می‌شوند"],
        ["دردسرهای رایج", "برنامه‌هایی که پروکسی را نمی‌فهمند", "تداخل با شبکهٔ محلی (SSH از Fedora)، DNS و سرویس‌های داخلی"],
        ["پیشنهاد", "<b>پیش‌فرض روزمره</b>", "وقتی برنامه‌ای تنظیم پروکسی ندارد، یا برای یک دانلود بزرگ همه‌چیز را موقت از تونل رد می‌کنی"]
      ]),
      C("concept", "پروکسی سیستم روی Hyprland", "در KDE و GNOME «پروکسی سیستم» یک تنظیم سراسری است که خیلی برنامه‌ها آن را می‌خوانند. روی Hyprland چنین تنظیم مرکزی‌ای وجود ندارد. گزینهٔ «System proxy» در Happ احتمالاً روی بیشتر برنامه‌ها اثری ندارد، پس پروکسی را برای هر برنامه خودت تنظیم کن (همین فصل) یا از TUN استفاده کن."),
      UV("رفتار دقیق گزینهٔ System proxy در Happ روی Wayland و Hyprland تأیید نشد. برای امتحان: آن را روشن کن، یک ترمینال تازه باز کن و <code>env | grep -i proxy</code> بزن. اگر چیزی نیامد، روی ترمینال اثری ندارد.")
    ]},
    { t: "توابع proxy-on، proxy-off و proxy-status در fish", b: [
      C("concept", "متغیرهای محیطی پروکسی", "بیشتر ابزارهای ترمینال (curl، git، pacman، yay، pip، uv، npm، wget) قبل از وصل شدن، این [[متغیرهای محیطی|envvar]] را نگاه می‌کنند: <code>http_proxy</code> و <code>https_proxy</code> (پروکسی برای آدرس‌های http و https)، <code>all_proxy</code> (برای بقیه، این‌جا SOCKS با DNS از راه دور) و <code>no_proxy</code> (فهرست آدرس‌هایی که نباید از پروکسی بروند: شبکهٔ محلی، دامنه‌های ‎.ir و آینه‌های ایرانی). بعضی ابزارها نسخهٔ حروف بزرگ را می‌خوانند، پس هر دو را تنظیم می‌کنیم."),
      P("Ryoku فایل <code>~/.config/fish/user.fish</code> را برای تنظیمات شخصی گذاشته: آخر از همه بار می‌شود و به‌روزرسانی‌ها به آن دست نمی‌زنند. این‌ها را به آن اضافه کن:"),
      FILE({ path: "~/.config/fish/user.fish", d: "سه تابع پروکسی، با پورت‌هایی که در پنل مقادیر نوشته‌ای. دکمهٔ کپی نسخهٔ پرشده را کپی می‌کند.", c: "# ---------- proxy helpers (Happ) ----------\nset -g PROXY_HOST 127.0.0.1\nset -g PROXY_SOCKS {{SOCKS}}\nset -g PROXY_HTTP {{HTTP}}\nset -g PROXY_BYPASS localhost,127.0.0.1,::1,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16,.local,.ir,mirror.famaserver.com,mirror.mobinhost.com\n\nfunction proxy-on --description 'route terminal traffic through Happ'\n    set -gx http_proxy http://$PROXY_HOST:$PROXY_HTTP\n    set -gx https_proxy $http_proxy\n    set -gx all_proxy socks5h://$PROXY_HOST:$PROXY_SOCKS\n    set -gx no_proxy $PROXY_BYPASS\n    set -gx HTTP_PROXY $http_proxy\n    set -gx HTTPS_PROXY $https_proxy\n    set -gx ALL_PROXY $all_proxy\n    set -gx NO_PROXY $no_proxy\n    echo \"proxy ON  http=$http_proxy  socks=$all_proxy\"\nend\n\nfunction proxy-off --description 'stop using the proxy in this shell'\n    set -e http_proxy https_proxy all_proxy no_proxy HTTP_PROXY HTTPS_PROXY ALL_PROXY NO_PROXY\n    echo \"proxy OFF\"\nend\n\nfunction proxy-status --description 'show proxy variables and the outgoing IP'\n    if set -q http_proxy\n        echo \"http_proxy=$http_proxy\"\n        echo \"all_proxy=$all_proxy\"\n    else\n        echo \"proxy is OFF in this shell\"\n    end\n    echo -n \"outgoing IP: \"\n    curl -s --max-time 8 https://api.ipify.org; or echo -n \"(no answer)\"\n    echo\nend\n\n# turn the proxy on in every new terminal: set -U PROXY_AUTO 1\n# turn that off again:                      set -e -U PROXY_AUTO\nif status is-interactive; and set -q PROXY_AUTO\n    proxy-on >/dev/null\nend",
        note: "روش بدون ویرایشگر: دکمهٔ کپی را بزن و در kitty این را اجرا کن: <code>wl-paste &gt;&gt; ~/.config/fish/user.fish</code>. علامت ‎&gt;&gt; متن را به انتهای فایل اضافه می‌کند و اگر فایل نبود، می‌سازدش. اگر این صفحه را روی گوشی می‌خوانی، فایل را با <code>nvim --clean ~/.config/fish/user.fish</code> باز کن، " + K("i") + " بزن، تایپ کن، بعد " + K("Esc") + " و <code>:wq</code>." }),
      CMD({ c: "source ~/.config/fish/user.fish\nproxy-on\nproxy-status", d: "فایل را دوباره در همین ترمینال بار می‌کند، پروکسی را روشن می‌کند و IP خروجی را نشان می‌دهد.", on: "laptop", net: "proxy",
        out: "proxy ON  http=http://127.0.0.1:10809  socks=socks5h://127.0.0.1:10808\nhttp_proxy=http://127.0.0.1:10809\nall_proxy=socks5h://127.0.0.1:10808\noutgoing IP: 185.xxx.xxx.xxx",
        ok: "IP خروجی را با حالت خاموش مقایسه کن: <code>proxy-off; proxy-status</code>. اگر دو IP فرق دارند، پروکسی کار می‌کند." }),
      CMD({ c: "set -U PROXY_AUTO 1", d: "(اختیاری) از این به بعد هر ترمینال جدید با پروکسی روشن باز می‌شود.", on: "laptop",
        parts: [["set -U", "متغیر universal: بین همهٔ پوسته‌های fish و بعد از ری‌استارت هم می‌ماند."]],
        note: "برای خاموش کردن این رفتار: <code>set -e -U PROXY_AUTO</code>. حتی با این گزینه، هر وقت خواستی در یک ترمینال <code>proxy-off</code> بزن." }),
      C("concept", "چرا یک تابع، نه چند alias؟", "alias فقط جایگزینی متن است. تابع می‌تواند متغیر را در پوستهٔ فعلی تنظیم کند (‎set -gx یعنی global و export، یعنی برای برنامه‌هایی که از این پوسته اجرا می‌شوند هم قابل دیدن باشد). تنظیم پروکسی فقط در همان ترمینال و برنامه‌هایی که از آن اجرا می‌کنی اعمال می‌شود، نه در کل سیستم.")
    ]},
    { t: "پروکسی در ابزارهای دانلود: curl، wget، aria2c و yt-dlp", b: [
      P("با <code>proxy-on</code> بیشترشان خودکار کار می‌کنند. برای وقتی که فقط یک دستور را می‌خواهی از پروکسی رد کنی:"),
      CMD({ c: "curl -LO -x socks5h://127.0.0.1:{{SOCKS}} https://github.com/sxyazi/yazi/releases/latest/download/yazi-x86_64-unknown-linux-gnu.zip", d: "یک فایل از صفحهٔ انتشار GitHub دانلود می‌کند (فقط مثال؛ yazi از قبل نصب است).", on: "laptop", net: "proxy",
        parts: [["-L", "دنبال ریدایرکت برو (GitHub همیشه ریدایرکت می‌کند)"], ["-O", "با همان اسم فایل در آدرس ذخیره کن"], ["-x …", "فقط برای همین دستور از این پروکسی استفاده کن"]] }),
      CMD({ c: "wget https://example.com/file.iso", d: "wget خودش socks را نمی‌فهمد، ولی با proxy-on از متغیر https_proxy (HTTP) استفاده می‌کند.", on: "laptop", net: "proxy",
        note: "برای یک دستور بدون proxy-on: <code>wget -e use_proxy=yes -e https_proxy=http://127.0.0.1:{{HTTP}} آدرس</code>" }),
      CMD({ c: "sudo pacman -S --needed aria2\naria2c -x 8 --all-proxy=http://127.0.0.1:{{HTTP}} https://example.com/big.iso", d: "aria2 را نصب می‌کند و یک فایل بزرگ را با ۸ اتصال هم‌زمان از طریق پروکسی HTTP دانلود می‌کند.", on: "laptop", net: "proxy", root: true,
        parts: [["-x 8", "حداکثر ۸ اتصال به سرور (سریع‌تر)"], ["--all-proxy=http://…", "aria2 فقط پروکسی HTTP را پشتیبانی می‌کند، نه SOCKS؛ پس پورت HTTP را بده"]] }),
      CMD({ c: "yt-dlp --proxy http://127.0.0.1:{{HTTP}} \"https://www.youtube.com/watch?v=VIDEO_ID\"", d: "ویدیو را از طریق پروکسی دانلود می‌کند (yt-dlp در Ryoku از قبل نصب است).", on: "laptop", net: "proxy",
        parts: [["--proxy", "پروکسی HTTP، HTTPS یا SOCKS؛ این‌جا برای اطمینان HTTP"], ["\"…\"", "آدرس را در گیومه بگذار؛ علامت‌های ? و & در fish معنای خاص دارند"]] })
    ]},
    { t: "پروکسی برای git و gh", b: [
      P("git و gh با proxy-on خودشان کار می‌کنند. اگر بخواهی git همیشه و فقط برای GitHub از پروکسی رد شود (حتی وقتی proxy-on نزده‌ای):"),
      CMD({ c: "git config --global http.https://github.com.proxy socks5h://127.0.0.1:{{SOCKS}}", d: "فقط برای آدرس‌های github.com، پروکسی SOCKS را در تنظیمات سراسری git می‌نویسد.", on: "laptop",
        parts: [["--global", "در ‎~/.gitconfig ذخیره کن، برای همهٔ مخزن‌ها"], ["http.https://github.com.proxy", "تنظیم پروکسی که فقط برای این دامنه اعمال می‌شود"]],
        ok: "<code>git config --global --get-regexp proxy</code> را بزن و خط تنظیم را ببین. برای حذف: <code>git config --global --unset http.https://github.com.proxy</code>" }),
      CMD({ c: "proxy-on\ngh auth login", d: "ورود به GitHub CLI. gh از متغیر HTTPS_PROXY استفاده می‌کند، پس قبلش proxy-on بزن.", on: "laptop", net: "proxy",
        note: "در سؤال‌ها GitHub.com، HTTPS و Login with a web browser را انتخاب کن. کد یک‌بارمصرف را در مرورگر وارد کن." }),
      C("concept", "git از طریق SSH", "اگر مخزن را با آدرس <code>git@github.com:…</code> کلون کنی، git از SSH استفاده می‌کند و متغیرهای پروکسی را نادیده می‌گیرد. در این راهنما همیشه از آدرس https استفاده کن. AUR هم با https کلون می‌شود.")
    ]},
    { t: "sudo و pacman: چرا پروکسی رد نمی‌شود و راه امن", b: [
      C("concept", "مشکل", "به‌طور پیش‌فرض <code>sudo</code> بیشتر متغیرهای محیطی را پاک می‌کند تا برنامه‌ای که با دسترسی مدیر اجرا می‌شود، تحت تأثیر محیط کاربر قرار نگیرد. پس حتی با proxy-on، <code>sudo pacman -Syu</code> بدون پروکسی دانلود می‌کند."),
      P("<b>راه ۱ (یک‌باره):</b> نام متغیرها را صریحاً به sudo بگو:"),
      CMD({ c: "sudo --preserve-env=http_proxy,https_proxy,all_proxy,no_proxy pacman -Syu", d: "pacman را با همان متغیرهای پروکسی پوستهٔ فعلی اجرا می‌کند.", on: "laptop", root: true, net: "proxy",
        parts: [["--preserve-env=…", "فقط همین متغیرها را به فرمان root منتقل کن"]],
        note: "دانلودکنندهٔ داخلی pacman از libcurl استفاده می‌کند که این متغیرها را می‌شناسد." }),
      P("<b>راه ۲ (پیشنهادی و دائمی):</b> به sudo بگو همیشه متغیرهای پروکسی را نگه دارد. وقتی proxy-on نزده باشی این متغیرها خالی‌اند و رفتار عادی می‌ماند:"),
      CMD({ c: "echo 'Defaults env_keep += \"http_proxy https_proxy all_proxy no_proxy HTTP_PROXY HTTPS_PROXY ALL_PROXY NO_PROXY\"' | sudo tee /etc/sudoers.d/05-proxy\nsudo chmod 0440 /etc/sudoers.d/05-proxy\nsudo visudo -c", d: "یک فایل کوچک در تنظیمات sudo می‌سازد که متغیرهای پروکسی را نگه می‌دارد، دسترسی‌اش را درست می‌کند و درستی کل تنظیمات sudo را بررسی می‌کند.", on: "laptop", root: true,
        parts: [["Defaults env_keep +=", "این متغیرها را از محیط کاربر به فرمان sudo منتقل کن"], ["sudo tee /etc/sudoers.d/05-proxy", "متن را با دسترسی root در این فایل بنویس (پوشهٔ sudoers.d را sudo خودکار می‌خواند)"], ["chmod 0440", "فقط خواندنی برای root؛ sudo فایل قابل نوشتن برای دیگران را قبول نمی‌کند"], ["visudo -c", "بررسی نحوی همهٔ فایل‌های sudo"]],
        out: "/etc/sudoers: parsed OK\n/etc/sudoers.d/05-proxy: parsed OK",
        ok: "هر دو خط parsed OK. حالا <code>proxy-on</code> و بعد <code>sudo env | grep -i proxy</code> بزن؛ باید متغیرها را ببینی.",
        note: "اگر visudo خطا داد، فوراً فایل را پاک کن: <code>sudo rm /etc/sudoers.d/05-proxy</code>. فایل sudoers خراب می‌تواند sudo را از کار بیندازد. نکتهٔ امنیتی: یعنی هر کس بتواند محیط تو را عوض کند، ترافیک pacman را هم به پروکسی دلخواهش می‌فرستد؛ روی لپ‌تاپ شخصی خطر عملی ندارد و امضای بسته‌ها هم همچنان چک می‌شود." }),
      P("<b>راه ۳ (روش مستندات Ryoku):</b> pacman را مستقل از متغیرها و برای همیشه از پروکسی رد کن. این روش را مستندات به‌روزرسانی Ryoku برای شبکه‌های فیلترشده پیشنهاد کرده است. زیر بخش <code>[options]</code> در <code>/etc/pacman.conf</code> این خط را اضافه کن:"),
      FILE({ path: "/etc/pacman.conf  (زیر [options])", c: "XferCommand = /usr/bin/curl --proxy http://127.0.0.1:{{HTTP}} --location --continue-at - --fail --output %o %u",
        note: "با <code>sudo nvim --clean /etc/pacman.conf</code> بازش کن. وقتی پروکسی لازم نیست، این خط را با # غیرفعال کن، چون روی همهٔ مخزن‌ها اعمال می‌شود؛ حتی آینه‌های ایرانی. امضای بسته‌ها با این روش هم بررسی می‌شود." }),
      C("check", "", "<code>proxy-on</code> و بعد <code>sudo pacman -Syu</code>. اگر مخزن‌هایی که قبلاً failed retrieving file می‌دادند حالا دانلود شدند، کار تمام است. در همین لحظه برگرد و به‌روزرسانی اول را از فصل ۴ کامل کن.")
    ]},
    { t: "yay، Flatpak، pip، uv و npm", b: [
      TBL(["ابزار", "با proxy-on", "نکته"], [
        ["<code>yay</code>", "✅ خودکار", "کلون AUR و دانلود سورس‌ها با کاربر خودت انجام می‌شود و متغیرها را دارد. وقتی pacman را با sudo صدا می‌زند، env_keep راه ۲ لازم است. yay را هرگز با sudo اجرا نکن."],
        ["<code>flatpak --user</code>", "✅ خودکار", "نصب در سطح کاربر مستقیم با پوستهٔ تو اجرا می‌شود و متغیرها را می‌بیند."],
        ["<code>flatpak</code> (سیستمی)", "⚠️ نه همیشه", "نصب سیستمی از یک سرویس کمکی جدا انجام می‌شود که محیط تو را نمی‌بیند. از ‎--user استفاده کن (فصل ۶)."],
        ["<code>pip</code> / <code>pipx</code>", "✅ خودکار", "از http_proxy و https_proxy (پروکسی HTTP) استفاده می‌کند."],
        ["<code>uv</code>", "✅ خودکار", "متغیرهای استاندارد را می‌خواند."],
        ["<code>npm</code>", "✅ خودکار", "اگر نشد: <code>npm config set proxy http://127.0.0.1:{{HTTP}}</code> و همین را برای <code>https-proxy</code>."],
        ["<code>ryoku update</code>", "✅ با env_keep", "خود ryoku متغیرها را می‌خواند و pacman داخلی‌اش با تنظیم sudo راه ۲ آن‌ها را می‌گیرد."]
      ]),
      UV("رفتار flatpak سیستمی با پروکسی را روی Ryoku آزمایش نکردم؛ با ‎--user مطمئن‌تری.")
    ]},
    { t: "مرورگر و تلگرام", b: [
      UL(
        "<b>Firefox:</b> Settings ← General ← Network Settings ← Manual proxy: SOCKS Host <code>127.0.0.1</code> پورت <code>{{SOCKS}}</code>، SOCKS v5، و تیک <b>Proxy DNS when using SOCKS v5</b>. در قسمت No proxy for بنویس <code>localhost, 127.0.0.1, .ir</code>.",
        "<b>Chromium:</b> پروکسی را از خط فرمان می‌گیرد: <code>chromium --proxy-server=\"socks5://127.0.0.1:{{SOCKS}}\"</code>. Chromium در این حالت DNS را هم از پروکسی می‌فرستد. Ryoku یک فایل <code>chromium-flags.conf</code> دارد؛ فصل ۱۲ نشان می‌دهد چطور دائمی‌اش کنی.",
        "<b>Telegram:</b> Settings ← Advanced ← Connection type ← Use custom proxy ← SOCKS5، <code>127.0.0.1</code> و <code>{{SOCKS}}</code>."
      )
    ]},
    { t: "روش نجات: پروکسیِ Fedora از طریق شبکهٔ خانه", b: [
      P("اگر Happ روی لپ‌تاپ کار نکرد ولی روی Fedora کار می‌کند، می‌توانی موقتاً از پروکسی Fedora استفاده کنی. در Happ روی Fedora گزینهٔ اجازه به اتصال‌های شبکهٔ محلی (چیزی مثل «Allow LAN» یا «Share on local network») را روشن کن. بعد روی لپ‌تاپ:"),
      CMD({ c: "set -gx http_proxy http://{{PC_IP}}:{{HTTP}}\nset -gx https_proxy $http_proxy\nproxy-status", d: "پروکسی ترمینال لپ‌تاپ را به پورت HTTP روی Fedora می‌فرستد (فقط برای همین ترمینال).", on: "laptop", net: "proxy",
        uv: "نام گزینهٔ LAN در Happ را تأیید نکردم. اگر وصل نشد، فایروال Fedora را بررسی کن: <code>sudo firewall-cmd --add-port={{HTTP}}/tcp</code> (فقط تا ری‌استارت باز می‌ماند)." })
    ]}
  ],
  end: ["Happ از روی فلش نصب شد و وصل است.", "پورت‌های واقعی را با ss پیدا کردم و در پنل مقادیر نوشتم.", "توابع proxy-on/off/status در user.fish هستند و proxy-status IP خارجی نشان می‌دهد.", "sudo pacman -Syu از پروکسی رد می‌شود.", "git و gh کار می‌کنند."],
  probs: [
    ["proxy-status می‌گوید (no answer).", "Happ وصل نیست، پورت اشتباه است یا سرور کار نمی‌کند. خروجی ss را دوباره ببین و سرور دیگری را امتحان کن."],
    ["curl می‌گوید Connection refused.", "روی آن پورت چیزی منتظر نیست؛ عدد پورت را با ss چک کن."],
    ["fish می‌گوید Unknown command: proxy-on.", "فایل user.fish بار نشده؛ ترمینال جدید باز کن یا source ~/.config/fish/user.fish بزن."],
    ["DNS خطا می‌دهد (Could not resolve host).", "به‌جای socks5 از socks5h استفاده کن تا DNS از پروکسی برود."],
    ["حالت TUN خطای دسترسی می‌دهد.", "Happ برای ساخت کارت مجازی دسترسی مدیر لازم دارد؛ پنجرهٔ رمز polkit را تأیید کن. اگر پنجره نیامد، فصل ۱۴ را ببین."]
  ],
  src: [
    ["Happ desktop (فایل‌ها و بسته‌ها)", "https://github.com/Happ-proxy/happ-desktop"],
    ["AUR: happ-desktop-bin", "https://aur.archlinux.org/packages/happ-desktop-bin"],
    ["Ryoku repo: docs/updates.md، بخش Filtered DNS و XferCommand", "https://github.com/ryoku-dev/ryoku/blob/main/docs/updates.md"],
    ["Ryoku repo: ryoku/apps/fish/config.fish (user.fish)", "https://github.com/ryoku-dev/ryoku/blob/main/ryoku/apps/fish/config.fish"],
    ["Arch Wiki: Proxy server", "https://wiki.archlinux.org/title/Proxy_server"],
    ["Arch Wiki: Sudo، env_keep", "https://wiki.archlinux.org/title/Sudo"],
    ["curl: proxy environment variables", "https://everything.curl.dev/usingcurl/proxies/env.html"],
    ["fish: set", "https://fishshell.com/docs/current/cmds/set.html"],
    ["aria2: --all-proxy", "https://aria2.github.io/manual/en/html/aria2c.html"]
  ]
});
