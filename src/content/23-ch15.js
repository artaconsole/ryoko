(function () {
  const S = (t, rows) => ({ t, faq: true, b: [RAW(`<div class="cheat">`), TBL(["کلید / دستور", "کار"], rows), RAW(`</div>`)] });
  G.add({
    id: "c15", n: "۱۵", short: "واژه‌نامه و برگهٔ تقلب",
    t: "واژه‌نامه و برگه‌های تقلب قابل چاپ",
    what: "همهٔ اصطلاح‌های این راهنما با توضیح ساده، و هفت برگهٔ تقلب: kitty، fish، Yazi، کامپوزیتور، pacman/yay، پروکسی و SSH.",
    why: "برگهٔ چاپی کنار مانیتور در دو هفتهٔ اول از هر چیزی مفیدتر است.",
    time: "مرجع",
    need: "پرینتر (اختیاری). در فایل آفلاین، دکمهٔ زیر فقط همین فصل را چاپ می‌کند.",
    steps: [
      { t: "چاپ", faq: true, b: [
        RAW(`<p><button class="tbtn no-print file-only" type="button" onclick="document.body.classList.add('print-cheats');window.print();setTimeout(function(){document.body.classList.remove('print-cheats')},800)">🖨️ چاپ فقط برگه‌های تقلب</button> <span class="muted">(یا ` + K("Ctrl+P") + ` برای چاپ کل راهنما. در پنجرهٔ چاپ «Save to PDF» هم هست.)</span></p>`)
      ]},
      { t: "واژه‌نامه", faq: true, b: [RAW(`<dl class="gloss" id="glossaryList"></dl>`)] },
      S("برگهٔ تقلب: کامپوزیتور Ryoku (Hyprland و niri)", [
        [K("Super+Return"), "ترمینال"], [K("Super+Space"), "لانچر"], [K("Super+Q"), "بستن پنجره"], [K("Super+F") + " / " + K("Super+D"), "تمام‌صفحه / حداکثر"],
        [K("Super+A"), "شناور / کاشی"], [K("Super+←↑→↓"), "تمرکز"], [K("Super+Shift+←↑→↓"), "جابه‌جایی پنجره"], [K("Super+Ctrl+←↑→↓"), "اندازه"],
        [K("Super+R"), "حالت اندازه (hjkl، Esc)"], [K("Super+1…0"), "فضای کاری"], [K("Super+Alt+1…0") + " / " + K("Super+Shift+1…0"), "بردن پنجره (با رفتن / بی‌صدا)"],
        [K("Super+Tab"), "نمای کلی"], [K("Super+H") + " / " + K("Super+Alt+H"), "اسکرچ‌پد"], [K("Super+B") + " / " + K("Super+Alt+E"), "مرورگر / Yazi"],
        [K("Super+,") + " / " + K("Super+K"), "Hub / Kit"], [K("Super+V"), "کلیپ‌بورد"], [K("Super+L"), "قفل"], [K("Super+Escape"), "خاموش/ری‌استارت"],
        [K("Print") + " / " + K("Super+Shift+S"), "عکس صفحه / ابزار کامل"], [K("Super+G"), "wl-kbptr (اگر ساخته‌ای)"], [K("Alt+Shift"), "انگلیسی ⇄ فارسی"]
      ]),
      S("برگهٔ تقلب: kitty", [
        [K("Ctrl+Shift+Enter") + " / " + K("Ctrl+Shift+W"), "پنجرهٔ داخلی جدید / بستن"], [K("Ctrl+Shift+]") + " / " + K("[") , "پنجرهٔ بعد / قبل"], [K("Ctrl+Shift+L"), "چیدمان بعدی"],
        [K("Ctrl+Shift+T") + " / " + K("Ctrl+Shift+Q"), "زبانهٔ جدید / بستن"], [K("Ctrl+Shift+→") + " / " + K("←"), "زبانهٔ بعد / قبل"], [K("Ctrl+Shift+H") + " / " + K("Ctrl+Shift+G"), "تاریخچه / خروجی آخرین دستور در less"],
        [K("Ctrl+Shift+E"), "باز کردن URL با برچسب"], [K("Ctrl+Shift+P") + " " + K("F") + "/" + K("L") + "/" + K("W") + "/" + K("H"), "درج مسیر / خط / کلمه / هش"],
        [K("Ctrl+Shift+C") + " / " + K("V"), "کپی / پیست"], [K("Ctrl++") + " / " + K("Ctrl+-") + " / " + K("Ctrl+0"), "اندازهٔ فونت"], [K("Ctrl+Shift+F5"), "بارگذاری دوبارهٔ تنظیمات"],
        ["<code>~/.config/kitty/user.conf</code>", "فایل تنظیمات تو"]
      ]),
      S("برگهٔ تقلب: fish (در Ryoku)", [
        [K("→") + " / " + K("Alt+→"), "پذیرفتن پیشنهاد / یک کلمه"], [K("Ctrl+R"), "تاریخچه با fzf"], [K("Ctrl+T") + " / " + K("Alt+C"), "فایل / پوشه با fzf"],
        [K("Tab"), "تکمیل"], [K("Alt+←") + " / " + K("Alt+→"), "پوشهٔ قبلی / بعدی"], [K("Ctrl+A") + " / " + K("Ctrl+E"), "اول / آخر خط"], [K("Ctrl+U") + " / " + K("Ctrl+W"), "پاک کردن خط / کلمه"],
        ["<code>cd نام</code> / <code>cdi</code>", "پرش هوشمند zoxide / انتخاب تعاملی"], ["<code>ls</code> / <code>lsa</code> / <code>lt</code>", "eza / همه / درخت"],
        ["<code>set -gx X v</code> / <code>set -e X</code>", "ساخت / حذف متغیر"], ["<code>(cmd)</code>", "جایگزینی خروجی (در bash: ‎$(cmd))"],
        ["<code>abbr -a k 'cmd'</code>", "abbreviation"], ["<code>~/.config/fish/user.fish</code>", "فایل تنظیمات تو"]
      ]),
      S("برگهٔ تقلب: Yazi", [
        [K("h") + K("j") + K("k") + K("l"), "حرکت"], [K("g") + K("g") + " / " + K("G"), "اول / آخر"], [K("Enter") + " / " + K("O"), "باز کردن / با انتخاب برنامه"],
        [K("a") + " / " + K("r"), "ساختن (/ آخر = پوشه) / تغییر نام"], [K("Space") + " / " + K("v") + " / " + K("Ctrl+a"), "انتخاب / بصری / همه"],
        [K("y") + " / " + K("x") + " / " + K("p"), "کپی / برش / چسباندن"], [K("d") + " / " + K("D"), "سطل زباله / حذف همیشگی"],
        [K("f") + " / " + K("/") + " / " + K("n"), "فیلتر / پیدا کردن / بعدی"], [K("s") + " / " + K("S"), "جست‌وجوی اسم (fd) / متن (rg)"], [K("z") + " / " + K("Z"), "fzf / zoxide"],
        [K("t") + " " + K("t") + " / " + K("1…9") + " / " + K("Ctrl+c"), "زبانهٔ جدید / رفتن / بستن"], [K("w"), "کارها"], [K("c") + " " + K("c"), "کپی مسیر"],
        [K(".") , "فایل‌های مخفی"], [K("g") + " " + K("h") + "/" + K("c") + "/" + K("p") + "/" + K("d"), "خانه / config / Projects / data"], [K("~") + " / " + K("F1"), "راهنما"],
        [K("q") + " / " + K("Q"), "خروج (با / بدون cd)"], ["<code>y</code>", "اجرای Yazi با cd هنگام خروج"], ["<code>ya pkg add</code> / <code>upgrade</code>", "افزونه‌ها"]
      ]),
      S("برگهٔ تقلب: pacman و yay", [
        ["<code>pacman -Ss / -Si</code>", "جست‌وجو / اطلاعات در مخزن"], ["<code>sudo pacman -S --needed</code>", "نصب"], ["<code>sudo pacman -Syu</code>", "به‌روزرسانی کامل"],
        ["<code>sudo pacman -Rns</code>", "حذف کامل"], ["<code>pacman -Qi / -Ql / -Qo</code>", "اطلاعات / فایل‌ها / مالک فایل"], ["<code>pacman -Qe / -Qm</code>", "صریح / خارجی (AUR)"],
        ["<code>sudo pacman -Rns (pacman -Qdtq)</code>", "حذف یتیم‌ها (fish)"], ["<code>sudo paccache -rk2</code>", "تمیز کردن کش"], ["<code>sudo pacman -U فایل</code>", "نصب از فایل"],
        ["<code>yay -S / -Ss / -Sua</code>", "AUR: نصب / جست‌وجو / به‌روزرسانی (بدون sudo)"], ["<code>ryoku update</code>", "لایهٔ Ryoku"], ["<code>ryoku doctor --check</code>", "سلامت"],
        ["<code>sudo snapper -c root create -d \"…\"</code>", "اسنپ‌شات دستی"], ["<code>sudo limine-snapper-restore</code>", "دائمی کردن اسنپ‌شات بوت‌شده"]
      ]),
      S("برگهٔ تقلب: پروکسی", [
        ["<code>proxy-on</code> / <code>proxy-off</code> / <code>proxy-status</code>", "روشن / خاموش / وضعیت و IP"], ["<code>set -U PROXY_AUTO 1</code>", "روشن در هر ترمینال جدید"],
        ["<code>ss -tlnp</code>", "پورت‌های واقعی Happ"], ["<code>curl -x socks5h://127.0.0.1:{{SOCKS}} URL</code>", "یک دستور از پروکسی"],
        ["<code>socks5h://</code>", "DNS از طریق پروکسی (همیشه h)"], ["<code>/etc/sudoers.d/05-proxy</code>", "env_keep برای sudo pacman"],
        ["<code>git config --global http.https://github.com.proxy …</code>", "git فقط برای GitHub"], ["<code>aria2c --all-proxy=http://…</code>", "aria2 فقط HTTP"],
        ["<code>yt-dlp --proxy http://127.0.0.1:{{HTTP}}</code>", "yt-dlp"], ["<code>flatpak --user …</code>", "Flatpak با پروکسی ترمینال"]
      ]),
      S("برگهٔ تقلب: SSH و انتقال فایل", [
        ["<code>sudo systemctl enable --now sshd</code>", "روشن کردن سرور (لپ‌تاپ)"], ["<code>ssh laptop</code>", "اتصال با میان‌بر ‎~/.ssh/config"],
        ["<code>ssh-keygen -t ed25519</code> / <code>ssh-copy-id</code>", "ساخت و نصب کلید"], ["<code>sudo sshd -t</code>", "آزمایش تنظیمات قبل از ری‌استارت"],
        ["<code>kitten ssh</code>", "رفع xterm-kitty"], ["<code>scp فایل laptop:/data/idk/</code>", "کپی"], ["<code>rsync -avh --progress src/ laptop:dst/</code>", "همگام‌سازی"],
        ["<code>sshfs user@host:/path ~/mnt/x</code> / <code>fusermount3 -u</code>", "سوار / پیاده"], ["<code>ssh -L 5900:127.0.0.1:5900 laptop</code>", "تونل VNC"],
        ["<code>tmux new -s n</code> / " + K("Ctrl+b") + " " + K("d") + " / <code>tmux attach -t n</code>", "جلسهٔ ماندگار"]
      ])
    ],
    src: [
      ["Ryoku repo: ryoku/wm/binds.go", "https://github.com/ryoku-dev/ryoku/blob/main/ryoku/wm/binds.go"],
      ["kitty docs", "https://sw.kovidgoyal.net/kitty/"],
      ["Yazi docs", "https://yazi-rs.github.io/docs/quick-start/"],
      ["fish docs", "https://fishshell.com/docs/current/"],
      ["Arch Wiki: pacman", "https://wiki.archlinux.org/title/Pacman"],
      ["Arch Wiki: OpenSSH", "https://wiki.archlinux.org/title/OpenSSH"]
    ]
  });
})();
