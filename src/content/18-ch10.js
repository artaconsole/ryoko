G.add({
  id: "c10", n: "۱۰", short: "ترمینال از صفر",
  t: "ترمینال از صفر: kitty، fish و دستورهای اصلی",
  what: "یک دورهٔ کوتاه و عملی: کار با kitty بدون موس، ترفندهای fish، دستورهای اصلی دسته‌بندی‌شده بر اساس کار، لوله و هدایت خروجی، متغیرها و حداقل Neovim برای زنده ماندن.",
  why: "Yazi، SSH، pacman و موس‌لس شدن همه روی ترمینال سوارند. هر چه این‌جا راحت‌تر باشی، بقیه سریع‌تر جا می‌افتد.",
  time: "۳ تا ۴ جلسهٔ یک‌ساعته؛ عجله نکن",
  need: "kitty (" + K("Super+Return") + ") و پوشهٔ تمرین. پروکسی فقط برای اولین اجرای Neovim لازم است.",
  steps: [
    { t: "kitty: پنجره، زبانه، چیدمان و اسکرول", b: [
      P("در Hyprland هر kitty یک پنجرهٔ کامپوزیتور است. خود kitty هم می‌تواند داخل یک پنجره چند «پنجرهٔ داخلی» و «زبانه» داشته باشد. کلیدهای پیش‌فرض kitty با " + K("Ctrl+Shift") + " شروع می‌شوند:"),
      TBL(["کار", "کلید"], [
        ["پنجرهٔ داخلی جدید (تقسیم)", K("Ctrl+Shift+Enter")],
        ["بستن پنجرهٔ داخلی", K("Ctrl+Shift+W")],
        ["پنجرهٔ داخلی بعدی / قبلی", K("Ctrl+Shift+]") + " / " + K("Ctrl+Shift+[")],
        ["انتخاب پنجره با حرف (بصری)", K("Ctrl+Shift+F7")],
        ["چیدمان بعدی (tall، fat، grid، stack…)", K("Ctrl+Shift+L")],
        ["تغییر اندازهٔ پنجرهٔ داخلی", K("Ctrl+Shift+R")],
        ["زبانهٔ جدید / بستن زبانه", K("Ctrl+Shift+T") + " / " + K("Ctrl+Shift+Q")],
        ["زبانهٔ بعدی / قبلی", K("Ctrl+Shift+→") + " / " + K("Ctrl+Shift+←")],
        ["اسکرول خط‌به‌خط / صفحه‌به‌صفحه", K("Ctrl+Shift+↑") + " یا " + K("Page Up") + " (در Ryoku بدون Shift)"],
        ["باز کردن کل تاریخچه در less (جست‌وجو با /)", K("Ctrl+Shift+H")],
        ["خروجی آخرین دستور در less", K("Ctrl+Shift+G")],
        ["پرامپت قبلی / بعدی", K("Ctrl+Shift+Z") + " / " + K("Ctrl+Shift+X")],
        ["بزرگ / کوچک / عادی کردن فونت", K("Ctrl++") + " / " + K("Ctrl+-") + " / " + K("Ctrl+0") + " (تنظیم Ryoku)"],
        ["کپی / پیست", K("Ctrl+Shift+C") + " / " + K("Ctrl+Shift+V")],
        ["فهرست همهٔ کلیدها", K("Ctrl+Shift+F1")]
      ]),
      C("concept", "Ctrl+C در Ryoku", "Ryoku در kitty کلید " + K("Ctrl+C") + " را روی copy_or_interrupt گذاشته: اگر متنی انتخاب شده باشد کپی می‌کند، وگرنه مثل همیشه برنامهٔ در حال اجرا را متوقف می‌کند.")
    ]},
    { t: "kitty: کلیک بدون موس با Hints", b: [
      P("حالت [[hint|hint]] برای هر چیز قابل انتخاب روی صفحه یک برچسب حرفی می‌گذارد. حرفش را تایپ می‌کنی و kitty کار را انجام می‌دهد:"),
      TBL(["کلید", "انتخاب چه چیزی", "چه می‌کند"], [
        [K("Ctrl+Shift+E"), "آدرس‌های اینترنتی", "در مرورگر باز می‌کند"],
        [K("Ctrl+Shift+P") + " بعد " + K("F"), "مسیر و اسم فایل", "در خط فرمان درج می‌کند"],
        [K("Ctrl+Shift+P") + " بعد " + K("Shift+F"), "مسیر و اسم فایل", "با برنامهٔ پیش‌فرض باز می‌کند"],
        [K("Ctrl+Shift+P") + " بعد " + K("L"), "یک خط کامل", "درج می‌کند"],
        [K("Ctrl+Shift+P") + " بعد " + K("W"), "یک کلمه", "درج می‌کند"],
        [K("Ctrl+Shift+P") + " بعد " + K("H"), "هش (مثل شناسهٔ کامیت git)", "درج می‌کند"],
        [K("Ctrl+Shift+P") + " بعد " + K("N"), "فایل:شمارهٔ‌خط", "در ویرایشگر روی همان خط باز می‌کند"],
        [K("Ctrl+Shift+P") + " بعد " + K("C") + " / " + K("D"), "انتخاب فایل / پوشه با پنجرهٔ choose-files", "درج می‌کند"]
      ]),
      C("ex", "", "<code>ls ~/.config</code> بزن. حالا بنویس <code>cd </code> (با فاصله)، " + K("Ctrl+Shift+P") + " و بعد " + K("F") + " را بزن، حروف پوشهٔ kitty را تایپ کن و Enter. اسم پوشه بدون تایپ کامل در خط فرمان آمد. بعد <code>echo https://ryoku.dev</code> بزن و با " + K("Ctrl+Shift+E") + " بازش کن.")
    ]},
    { t: "kitty: فایل تنظیمات شخصی", b: [
      P("فایل <code>~/.config/kitty/kitty.conf</code> مال Ryoku است و در هر به‌روزرسانی بازنویسی می‌شود. خود فایل در آخرش <code>user.conf</code> را می‌خواند که مال توست. هر تغییری بده، این‌جا بده:"),
      FILE({ path: "~/.config/kitty/user.conf", d: "تاریخچهٔ طولانی‌تر، چند چیدمان مفید و حرکت بین پنجره‌های داخلی با Ctrl+Alt+h/j/k/l.", c: "# my kitty overrides (Ryoku never touches this file)\nscrollback_lines 10000\nenabled_layouts tall,fat,grid,stack\n\n# move between kitty splits like vim\nmap ctrl+alt+h neighboring_window left\nmap ctrl+alt+l neighboring_window right\nmap ctrl+alt+k neighboring_window up\nmap ctrl+alt+j neighboring_window down",
        note: "ذخیره بدون ویرایشگر: کپی کن و <code>wl-paste &gt;&gt; ~/.config/kitty/user.conf</code>. بعد در kitty " + K("Ctrl+Shift+F5") + " بزن تا تنظیمات دوباره خوانده شود (بدون بستن ترمینال). " + K("Ctrl+Shift+F6") + " تنظیمات فعلی را برای اشکال‌یابی نشان می‌دهد." }),
      C("check", "", "دو بار " + K("Ctrl+Shift+Enter") + " بزن و با " + K("Ctrl+Alt+H") + " و " + K("Ctrl+Alt+L") + " بین تقسیم‌ها برو.")
    ]},
    { t: "fish: پیشنهاد خودکار، تاریخچه و تکمیل", b: [
      TBL(["چه", "چطور"], [
        ["پیشنهاد خاکستری (autosuggestion)", "fish از تاریخچه حدس می‌زند. " + K("→") + " یا " + K("Ctrl+F") + " کل پیشنهاد را می‌پذیرد، " + K("Alt+→") + " فقط یک کلمه."],
        ["جست‌وجو در تاریخچه با fzf", K("Ctrl+R") + "، چند حرف تایپ کن، Enter (Ryoku آن را به fzf وصل کرده)."],
        ["تاریخچهٔ با پیشوند", "اول چند حرف تایپ کن (مثلاً <code>sudo pa</code>) بعد " + K("↑") + "؛ فقط دستورهایی که با همین شروع می‌شوند."],
        ["تکمیل", K("Tab") + ": اسم فایل، دستور، گزینه‌ها با توضیح. دوباره Tab برای رفتن بین گزینه‌ها."],
        ["انتخاب فایل با fzf", K("Ctrl+T") + " (فایل را در خط فرمان درج می‌کند)"],
        ["رفتن به پوشه با fzf", K("Alt+C")],
        ["پوشهٔ قبلی / بعدی", K("Alt+←") + " / " + K("Alt+→") + " (وقتی خط فرمان خالی است)"],
        ["پاک کردن خط / کلمهٔ قبلی", K("Ctrl+U") + " / " + K("Ctrl+W")],
        ["رفتن به اول / آخر خط", K("Ctrl+A") + " / " + K("Ctrl+E")],
        ["توقف دستور در حال اجرا", K("Ctrl+C")],
        ["خروج از ترمینال", "<code>exit</code> یا " + K("Ctrl+D")]
      ]),
      C("concept", "cd در Ryoku هوشمند است", "Ryoku خط <code>zoxide init fish --cmd cd</code> را در تنظیمات fish گذاشته. یعنی خود <code>cd</code> همان [[zoxide|zoxide]] است: پوشه‌هایی که زیاد می‌روی را یاد می‌گیرد و با <code>cd proj</code> از هر جا به <code>~/Projects</code> می‌پری (اگر قبلاً آن‌جا رفته باشی). <code>cdi</code> فهرست تعاملی با fzf باز می‌کند. دستور جداگانهٔ <code>z</code> وجود ندارد."),
      C("concept", "ls در Ryoku", "<code>ls</code> در واقع <code>eza -lh --group-directories-first --icons=auto</code> است (فهرست بلند، پوشه‌ها اول، با آیکون). <code>lsa</code> همه، حتی مخفی‌ها، و <code>lt</code> درخت دو سطحی با وضعیت git.")
    ]},
    { t: "fish: abbreviation، تابع و فایل تنظیم", b: [
      P("abbreviation شبیه alias است، با این تفاوت که بعد از فاصله در خط فرمان «باز» می‌شود و می‌بینی دقیقاً چه چیزی اجرا می‌شود. این‌ها را به <code>~/.config/fish/user.fish</code> اضافه کن:"),
      FILE({ path: "~/.config/fish/user.fish  (اضافه کن)", d: "چند abbreviation و یک تابع کوچک.", c: "# ---------- abbreviations ----------\nabbr -a up 'ryoku update; and sudo pacman -Syu'\nabbr -a pi 'sudo pacman -S --needed'\nabbr -a pr 'sudo pacman -Rns'\nabbr -a lg lazygit\nabbr -a v nvim\n\n# make a folder and step into it\nfunction mkcd --description 'mkdir -p and cd'\n    mkdir -p $argv[1]; and cd $argv[1]\nend",
        note: "بعد از ذخیره، ترمینال تازه باز کن یا <code>source ~/.config/fish/user.fish</code>. حالا <code>up</code> و فاصله بزن تا ببینی باز می‌شود. ‎$argv[1] یعنی اولین آرگومان تابع؛ در fish شماره‌گذاری از ۱ است." }),
      TBL(["bash (Fedora)", "fish (Ryoku)"], [
        ["<code>export EDITOR=nvim</code>", "<code>set -gx EDITOR nvim</code>"],
        ["<code>$(command)</code>", "<code>(command)</code>"],
        ["<code>cmd1 && cmd2</code>", "هر دو کار می‌کند؛ قدیمی‌اش <code>cmd1; and cmd2</code>"],
        ["<code>VAR=x cmd</code>", "کار می‌کند (fish 3.1 به بعد)"],
        ["<code>~/.bashrc</code>", "<code>~/.config/fish/user.fish</code> در Ryoku"],
        ["<code>&lt;&lt;EOF</code> (heredoc)", "ندارد؛ از <code>printf</code> یا wl-paste یا ویرایشگر استفاده کن"]
      ])
    ]},
    { t: "دستورهای اصلی ۱: جابه‌جایی و کار با فایل", b: [
      TBL(["دستور", "کار", "مثال"], [
        ["<code>pwd</code>", "الان کجا هستم؟", "<code>pwd</code>"],
        ["<code>ls</code> / <code>lsa</code> / <code>lt</code>", "فهرست", "<code>lsa ~/.config</code>"],
        ["<code>cd</code>", "رفتن به پوشه (با zoxide)", "<code>cd /data</code>، <code>cd ..</code>، <code>cd -</code>، <code>cd</code> تنها = خانه"],
        ["<code>mkdir -p</code>", "ساختن پوشه (با میانی‌ها)", "<code>mkdir -p ~/lab/a/b</code>"],
        ["<code>touch</code>", "ساختن فایل خالی", "<code>touch ~/lab/notes.txt</code>"],
        ["<code>cp</code> / <code>cp -r</code>", "کپی فایل / پوشه", "<code>cp -r ~/lab ~/lab-copy</code>"],
        ["<code>mv</code>", "جابه‌جا یا تغییر نام", "<code>mv notes.txt todo.txt</code>"],
        ["<code>trash-put</code>", "فرستادن به سطل زباله (برگشت‌پذیر)", "<code>trash-put todo.txt</code>، بعد <code>trash-list</code> و <code>trash-restore</code>"],
        ["<code>rm</code> / <code>rm -r</code>", "حذف همیشگی فایل / پوشه", "<code>rm -ri ~/lab-copy</code> (‎-i قبل از هر حذف می‌پرسد)"]
      ]),
      C("warn", "rm سطل زباله ندارد", "<code>rm</code> فایل را برای همیشه پاک می‌کند. <code>rm -rf</code> بدون سؤال کل یک پوشه را با محتوایش پاک می‌کند. یک فاصلهٔ اشتباه (مثل <code>rm -rf ~ /lab</code> به‌جای <code>~/lab</code>) کل خانه‌ات را پاک می‌کند. عادت کن: <code>trash-put</code> برای روزمره، <code>rm -ri</code> وقتی مطمئنی."),
      C("ex", "", "پوشهٔ <code>~/lab</code> را بساز، داخلش سه فایل a.txt، b.txt و c.txt بساز (<code>touch ~/lab/{a,b,c}.txt</code>)، b را به sub/ ببر (اول sub را بساز)، c را به سطل زباله بفرست و برگردانش.")
    ]},
    { t: "دستورهای اصلی ۲: خواندن و پیدا کردن", b: [
      TBL(["دستور", "کار", "مثال"], [
        ["<code>cat</code>", "چاپ کل فایل", "<code>cat /etc/hostname</code>"],
        ["<code>bat</code>", "مثل cat با رنگ و شمارهٔ خط", "<code>bat ~/.config/fish/user.fish</code>"],
        ["<code>less</code>", "خواندن صفحه‌به‌صفحه: " + K("j") + "/" + K("k") + "، " + K("Space") + "، " + K("/") + " جست‌وجو، " + K("n") + " بعدی، " + K("G") + " آخر، " + K("q") + " خروج", "<code>less /etc/pacman.conf</code>"],
        ["<code>head</code> / <code>tail</code>", "اول / آخر فایل", "<code>tail -n 20 فایل</code>، <code>tail -f</code> برای دنبال کردن زنده"],
        ["<code>fd</code>", "پیدا کردن فایل با اسم", "<code>fd notes ~</code>، <code>fd -e pdf /data</code>، <code>fd -H fish ~/.config</code> (‎-H مخفی‌ها)"],
        ["<code>rg</code>", "پیدا کردن متن داخل فایل‌ها", "<code>rg -i proxy ~/.config/fish</code>، <code>rg -l TODO ~/Projects</code> (فقط اسم فایل)"],
        ["<code>fzf</code>", "انتخاب تعاملی از هر فهرست", "<code>nvim (fzf)</code>، <code>fd -e md | fzf</code>"]
      ]),
      C("ex", "", "با یک دستور پیدا کن کدام فایل در <code>~/.config</code> کلمهٔ <code>kb_layout</code> را دارد. بعد همان فایل را با <code>bat</code> باز کن. (راهنما: rg -l)")
    ]},
    { t: "دستورهای اصلی ۳: مجوز، پردازه، سرویس و لاگ", b: [
      TBL(["دستور", "کار", "مثال"], [
        ["<code>chmod</code>", "تغییر مجوز", "<code>chmod +x script.sh</code> (اجرایی)، <code>chmod 600 ~/.ssh/config</code> (فقط مالک)"],
        ["<code>chown</code>", "تغییر مالک (با sudo)", "<code>sudo chown {{USER}}: /data</code>"],
        ["<code>btop</code>", "مانیتور گرافیکی CPU، RAM، پردازه‌ها؛ " + K("q") + " خروج", "<code>btop</code>"],
        ["<code>pgrep</code> / <code>pkill</code>", "پیدا کردن / بستن پردازه با اسم", "<code>pgrep -a firefox</code>، <code>pkill firefox</code>"],
        ["<code>kill</code>", "بستن با شمارهٔ پردازه (PID)", "<code>kill 1234</code>؛ آخرین چاره <code>kill -9 1234</code>"],
        ["<code>systemctl</code>", "سرویس‌ها", "<code>systemctl status sshd</code>، <code>systemctl --failed</code>، <code>sudo systemctl restart bluetooth</code>"],
        ["<code>systemctl --user</code>", "سرویس‌های کاربری (مثل pipewire)", "<code>systemctl --user status pipewire</code>"],
        ["<code>journalctl</code>", "لاگ‌ها", "<code>journalctl -b -p err</code> (خطاهای این بوت)، <code>journalctl -u sshd -f</code> (زنده)، <code>journalctl --since \"1 hour ago\"</code>"]
      ]),
      C("concept", "عدد مجوز", "r=4، w=2، x=1. سه رقم برای مالک، گروه و بقیه. ۶۴۴ یعنی مالک rw (۶)، بقیه فقط r (۴). ۷۵۵ برای اسکریپت‌ها و پوشه‌ها، ۶۰۰ برای فایل‌های خصوصی مثل کلید SSH."),
      C("ex", "", "<code>systemctl --failed</code> را بزن. اگر سرویسی شکست خورده، لاگش را با <code>journalctl -b -u نام‌سرویس</code> ببین و پیام اصلی را پیدا کن.")
    ]},
    { t: "دستورهای اصلی ۴: دیسک، شبکه، آرشیو و راهنما", b: [
      TBL(["دستور", "کار", "مثال"], [
        ["<code>df -h</code> / <code>duf</code>", "فضای آزاد هر دیسک", "<code>duf</code>"],
        ["<code>dust</code> / <code>du -sh</code>", "چه چیزی جا گرفته؟", "<code>dust ~</code>، <code>du -sh ~/Downloads</code>"],
        ["<code>ip -brief a</code>", "IPها", "<code>ip -4 -brief a</code>"],
        ["<code>ping</code>", "دسترسی به یک میزبان", "<code>ping -c 3 {{PC_IP}}</code>"],
        ["<code>nmcli</code>", "شبکه و وای‌فای", "<code>nmcli device status</code>"],
        ["<code>ss -tulpn</code>", "پورت‌های باز", "<code>ss -tlnp</code>"],
        ["<code>tar</code>", "ساختن و باز کردن ‎.tar.gz", "<code>tar -czf lab.tar.gz ~/lab</code>، <code>tar -xf lab.tar.gz</code>، <code>tar -tf lab.tar.gz</code> (فقط فهرست)"],
        ["<code>unzip</code> / <code>7z</code>", "zip و 7z", "<code>unzip a.zip -d out/</code>، <code>7z x a.7z</code>"],
        ["<code>man</code>", "راهنمای کامل؛ " + K("/") + " جست‌وجو، " + K("q") + " خروج", "<code>man tar</code>"],
        ["<code>tldr</code>", "خلاصهٔ مثال‌محور", "<code>tldr rsync</code>"],
        ["<code>--help</code>", "خلاصهٔ گزینه‌ها", "<code>fd --help</code>"]
      ]),
      C("concept", "حفظ کردن tar", "c = create (بساز)، x = extract (باز کن)، t = list، z = gzip، f = file (و بلافاصله اسم فایل). tar جدید نوع فشرده‌سازی را خودش تشخیص می‌دهد، پس برای باز کردن <code>tar -xf</code> کافی است.")
    ]},
    { t: "لوله، هدایت، && و متغیرها", b: [
      TBL(["علامت", "معنی", "مثال"], [
        ["<code>|</code>", "[[لوله|pipe]]: خروجی چپ، ورودی راست", "<code>pacman -Qe | wc -l</code>"],
        ["<code>&gt;</code>", "[[خروجی|stdout]] را در فایل بنویس (فایل قبلی پاک می‌شود)", "<code>pacman -Qe &gt; ~/pkgs.txt</code>"],
        ["<code>&gt;&gt;</code>", "به انتهای فایل اضافه کن", "<code>date &gt;&gt; ~/log.txt</code>"],
        ["<code>2&gt;</code>", "فقط پیام‌های خطا", "<code>fd x / 2&gt;/dev/null</code> (خطاها را دور بریز)"],
        ["<code>&lt;</code>", "فایل را ورودی دستور کن", "<code>wl-copy &lt; ~/pkgs.txt</code>"],
        ["<code>&&</code>", "دومی فقط اگر اولی موفق بود", "<code>mkdir x && cd x</code>"],
        ["<code>||</code>", "دومی فقط اگر اولی شکست خورد", "<code>ping -c1 {{PC_IP}} || echo down</code>"],
        ["<code>;</code>", "پشت سر هم، بدون شرط", "<code>clear; ls</code>"]
      ]),
      CMD({ c: "echo $HOME\necho $PATH\ntype ls\nset -gx GREETING salam\necho $GREETING\nset -e GREETING", d: "چند متغیر را چاپ می‌کند، نشان می‌دهد ls واقعاً چیست، و یک متغیر می‌سازد و پاک می‌کند.", on: "laptop", shell: "fish",
        parts: [["$PATH", "[[PATH|PATH]]: پوشه‌هایی که fish برای پیدا کردن دستورها می‌گردد"], ["type ls", "می‌گوید ls تابع، alias یا برنامه است"], ["set -gx", "متغیر سراسری و صادرشده (export) برای برنامه‌ها"], ["set -e", "پاک کردن (erase)"]] }),
      C("ex", "", "با یک خط: همهٔ بسته‌های نصب‌شده‌ای که اسم‌شان «font» دارد را پیدا کن، بشمار و نتیجه را در ‎~/fonts.txt بنویس. (راهنما: <code>pacman -Qq | rg font | tee ~/fonts.txt | wc -l</code>؛ tee هم در فایل می‌نویسد و هم چاپ می‌کند.)")
    ]},
    { t: "Neovim: کیت زنده ماندن", b: [
      P("ویرایشگر پیش‌فرض Ryoku، Neovim با پیکربندی LazyVim است. اولین اجرای <code>nvim</code> افزونه‌ها را از GitHub دانلود می‌کند، پس قبلش <code>proxy-on</code> بزن. برای ویرایش سریع فایل‌های سیستمی بدون افزونه: <code>nvim --clean فایل</code>."),
      TBL(["کلید", "کار"], [
        [K("i") + " / " + K("a") + " / " + K("o"), "ورود به حالت درج: قبل از نشانگر / بعد از نشانگر / خط جدید زیر"],
        [K("Esc"), "برگشت به حالت عادی (Normal). اگر گم شدی، همیشه Esc."],
        ["<code>:w</code> / <code>:q</code> / <code>:wq</code> / <code>:q!</code>", "ذخیره / خروج / ذخیره و خروج / خروج بدون ذخیره"],
        [K("h") + K("j") + K("k") + K("l"), "چپ، پایین، بالا، راست"],
        [K("w") + " / " + K("b"), "کلمهٔ بعد / قبل"],
        [K("g") + K("g") + " / " + K("G"), "اول / آخر فایل"],
        [K("/") + "متن " + K("Enter") + "، سپس " + K("n") + " / " + K("N"), "جست‌وجو و رفتن به نتیجهٔ بعدی / قبلی"],
        [K("d") + K("d") + " / " + K("y") + K("y") + " / " + K("p"), "حذف خط / کپی خط / چسباندن"],
        [K("x"), "حذف یک حرف"],
        [K("u") + " / " + K("Ctrl+R"), "برگرداندن / دوباره انجام"],
        [K("v") + " / " + K("V"), "انتخاب حرفی / خطی"],
        [K("Space"), "در LazyVim منوی همهٔ دستورها را با توضیح باز می‌کند (which-key)"]
      ]),
      CMD({ c: "nvim +Tutor", d: "آموزش تعاملی رسمی Neovim را باز می‌کند (همان vimtutor، داخل خود Neovim).", on: "laptop",
        note: "حدود ۳۰ دقیقه است. هر روز ده دقیقه‌اش را انجام بده تا کلیدها در انگشت‌هایت بنشینند. اگر وسطش گیر کردی، " + K("Esc") + " و <code>:q!</code>." })
    ]}
  ],
  end: ["با kitty بدون موس پنجره و زبانه می‌سازم و از hints استفاده می‌کنم.", "user.conf خودم را دارم و با Ctrl+Shift+F5 بارش می‌کنم.", "Ctrl+R، Ctrl+T، Alt+C و پیشنهاد خودکار fish را به کار می‌برم.", "abbreviation و یک تابع در user.fish دارم.", "تمرین هر گروه دستور را انجام دادم.", "nvim +Tutor را حداقل تا درس ۲ رفتم."],
  probs: [
    ["دستوری که درست تایپ کرده‌ام قرمز است.", "fish دستور ناشناخته را قرمز نشان می‌دهد؛ اسم را چک کن یا بسته‌اش نصب نیست (pacman -F نام‌دستور برای پیدا کردن بسته، بعد از sudo pacman -Fy)."],
    ["از nvim نمی‌توانم بیرون بیایم.", "Esc، بعد :q! و Enter."],
    ["nvim هنگام باز شدن خطای git یا timeout می‌دهد.", "LazyVim افزونه‌ها را دانلود می‌کند؛ proxy-on بزن و دوباره باز کن."]
  ],
  src: [
    ["kitty: Overview و کلیدها", "https://sw.kovidgoyal.net/kitty/overview/"],
    ["kitty: Hints kitten", "https://sw.kovidgoyal.net/kitty/kittens/hints/"],
    ["kitty: kitty.conf", "https://sw.kovidgoyal.net/kitty/conf/"],
    ["Ryoku repo: ryoku/apps/kitty/kitty.conf", "https://github.com/ryoku-dev/ryoku/blob/main/ryoku/apps/kitty/kitty.conf"],
    ["Ryoku repo: ryoku/apps/fish/config.fish", "https://github.com/ryoku-dev/ryoku/blob/main/ryoku/apps/fish/config.fish"],
    ["fish: Interactive use", "https://fishshell.com/docs/current/interactive.html"],
    ["fish for bash users", "https://fishshell.com/docs/current/fish_for_bash_users.html"],
    ["zoxide", "https://github.com/ajeetdsouza/zoxide"],
    ["Arch Wiki: Core utilities", "https://wiki.archlinux.org/title/Core_utilities"],
    ["Neovim: Tutor", "https://neovim.io/doc/user/usr_01.html"],
    ["LazyVim", "https://www.lazyvim.org/"]
  ]
});
