G.add({
  id: "c13", n: "۱۳", short: "نگهداری و امنیت",
  t: "نگهداری و امنیت",
  what: "روال هفتگی و ماهانه، اسنپ‌شات قبل از تغییرهای بزرگ، پشتیبان گرفتن از تنظیمات با git، تمیزکاری و خواندن لاگ وقتی چیزی خراب می‌شود.",
  why: "سیستم غلتان (rolling) اگر مرتب و با حواس جمع به‌روز شود، سال‌ها سالم می‌ماند. اگر ماه‌ها رها شود، یک‌جا به‌روز کردنش دردسر می‌شود.",
  time: "هفته‌ای ۱۵ دقیقه",
  need: "پروکسی، و عادت.",
  steps: [
    { t: "روال هفتگی به‌روزرسانی", b: [
      OL(
        "اخبار Arch را در <code>https://archlinux.org/news/</code> ببین. اگر خبری دربارهٔ «manual intervention» آمده، قبل از به‌روزرسانی بخوانش.",
        "پروکسی را روشن کن و به‌ترتیب اجرا کن:"
      ),
      CMD({ c: "proxy-on\nryoku update\nsudo pacman -Syu\nyay -Sua\nflatpak update --user\nya pkg upgrade\nryoku status", d: "بسته‌های Ryoku، توزیع پایه، AUR، Flatpak و افزونه‌های Yazi را به‌روز می‌کند و در پایان وضعیت را نشان می‌دهد.", on: "laptop", root: true, net: "proxy",
        parts: [["ryoku update", "لایهٔ Ryoku، تنظیمات و doctor (با اسنپ‌شات)"], ["sudo pacman -Syu", "CachyOS، Arch و هسته (snap-pac اسنپ‌شات می‌گیرد)"], ["yay -Sua", "فقط AUR"], ["flatpak update --user", "برنامه‌های Flatpak کاربر"], ["ya pkg upgrade", "افزونه‌های Yazi"]],
        ok: "هیچ‌کدام error ندهد. اگر هسته یا درایور به‌روز شد، ری‌استارت کن و بعد کار کن." }),
      C("concept", "pacnew", "گاهی pacman می‌گوید <code>warning: /etc/… installed as /etc/….pacnew</code>. یعنی نسخهٔ جدید یک فایل تنظیم آمده ولی چون فایل قبلی را تغییر داده بودی، جایگزینش نکرده. با <code>sudo pacdiff</code> (از pacman-contrib) آن‌ها را یکی‌یکی مقایسه و ادغام کن.")
    ]},
    { t: "روال ماهانه: تمیزکاری و سلامت", b: [
      CMD({ c: "ryoku doctor --check\nsystemctl --failed\nsudo paccache -rk2\nsudo paccache -ruk0\nsudo pacman -Rns (pacman -Qdtq)\nsudo journalctl --vacuum-time=4weeks\nduf\ndust -d 1 ~", d: "سلامت Ryoku، سرویس‌های شکست‌خورده، کش بسته‌ها، یتیم‌ها و لاگ‌های قدیمی را بررسی و تمیز می‌کند و فضای دیسک را نشان می‌دهد.", on: "laptop", root: true, shell: "fish",
        note: "اگر یتیمی نبود، خط Rns پیغام no targets می‌دهد که اشکالی ندارد. ‎-d 1 در dust یعنی فقط یک سطح عمق." }),
      CMD({ c: "sudo btrfs filesystem usage / | head -n 12\nryoku snapshots", d: "فضای واقعی Btrfs (با احتساب اسنپ‌شات‌ها) و فهرست اسنپ‌شات‌ها را نشان می‌دهد.", on: "laptop", root: true,
        note: "df روی Btrfs گاهی گمراه‌کننده است، چون اسنپ‌شات‌ها فضای مشترک دارند. اگر SSD پر شد، اسنپ‌شات‌های قدیمی را با <code>sudo snapper -c root delete شماره</code> پاک کن. Ryoku خودش فقط ۱۰ تا نگه می‌دارد." })
    ]},
    { t: "اسنپ‌شات قبل از هر تغییر بزرگ، و ryoku rollback", b: [
      P("قبل از عوض کردن درایور، fstab، sudoers، هسته یا نصب یک بستهٔ ناشناختهٔ AUR:"),
      CMD({ c: "sudo snapper -c root create -d \"before <what I am doing>\"", d: "اسنپ‌شات دستی با توضیح.", on: "laptop", root: true }),
      TBL(["دستور", "کار"], [
        ["<code>ryoku rollback</code>", "فهرست نسخه‌های منتشرشدهٔ Ryoku و اسنپ‌شات‌ها"],
        ["<code>ryoku rollback --to نسخه</code>", "فقط بسته‌های Ryoku را به یک نسخهٔ قبلی برمی‌گرداند، بدون ری‌استارت (توزیع و هسته تکان نمی‌خورند)"],
        ["<code>ryoku track stable</code>", "بعد از rollback --to، دوباره دنبال نسخه‌های جدید برو"],
        ["Limine ← Snapshots ← <code>sudo limine-snapper-restore</code>", "بازگرداندن کامل سیستم (فصل ۴)"],
        ["<code>ryoku recovery</code>", "آخرین چاره: کل دسکتاپ را از نو می‌سازد و تنظیمات Ryoku را بازنویسی می‌کند"]
      ]),
      C("concept", "نگهبان بوت", "اگر یک <code>ryoku update</code> باعث شود دسکتاپ دو بار پشت سر هم بالا نیاید، سرویس ryoku-boot-guard خودش بسته‌های Ryoku را به نسخهٔ قبلی برمی‌گرداند و در بار سوم سراغ اسنپ‌شات قبل از به‌روزرسانی می‌رود.")
    ]},
    { t: "پشتیبان تنظیمات با git (dotfiles)", b: [
      C("concept", "ایده", "پوشهٔ <code>~/.config</code> را مخزن git می‌کنیم، ولی فقط فایل‌هایی که خودت نوشته‌ای را دنبال می‌کنیم. فایل‌های Ryoku با هر به‌روزرسانی عوض می‌شوند و نگه داشتن‌شان فقط شلوغی است. فهرست سفید (whitelist) با ‎.gitignore این کار را می‌کند."),
      CMD({ c: "git config --global user.name \"Nima\"\ngit config --global user.email \"you@example.com\"\ngit config --global init.defaultBranch main", d: "هویت تو برای commitها و اسم شاخهٔ پیش‌فرض. ایمیل را با ایمیل خودت عوض کن.", on: "laptop" }),
      FILE({ path: "~/.config/.gitignore", d: "همه‌چیز نادیده، به‌جز فایل‌های شخصی تو.", c: "# ignore everything …\n*\n# … except my own files\n!.gitignore\n!fish/\n!fish/user.fish\n!fish/functions/\n!fish/functions/**\n!kitty/\n!kitty/user.conf\n!hypr/\n!hypr/user.lua\n!hypr/keyboard.lua\n!hypr/monitors_user.lua\n!niri/\n!niri/user.kdl\n!niri/keyboard.kdl\n!yazi/\n!yazi/keymap.toml\n!yazi/init.lua\n!yazi/package.toml\n!ryoku/\n!ryoku/user_edits/\n!ryoku/user_edits/**",
        note: "<code>wl-paste &gt; ~/.config/.gitignore</code>. هر فایل شخصی جدیدی ساختی، یک خط <code>!مسیر</code> برایش اضافه کن (و اگر داخل پوشه است، خود پوشه را هم با ‎!پوشه/)." }),
      CMD({ c: "cd ~/.config\ngit init\ngit add -A\ngit status\ngit commit -m \"my Ryoku dotfiles: first snapshot\"", d: "مخزن را می‌سازد، فایل‌های مجاز را اضافه می‌کند، فهرست‌شان را نشان می‌دهد و اولین commit را می‌زند.", on: "laptop",
        ok: "در git status فقط فایل‌های فهرست سفید دیده شوند (user.fish، user.conf، keymap.toml و…). اگر فایل دیگری آمد، ‎.gitignore را درست کن." }),
      CMD({ c: "git -C ~/.config bundle create /data/backups/dotfiles.bundle --all", d: "یک فایل پشتیبان کامل از مخزن (با همهٔ تاریخچه) روی هارد داده می‌سازد. بدون اینترنت.", on: "laptop",
        note: "بازگرداندن روی سیستم جدید: <code>git clone /data/backups/dotfiles.bundle ~/dotfiles-restore</code>." }),
      CMD({ c: "proxy-on\ncd ~/.config\ngh repo create dotfiles --private --source=. --push", d: "(اختیاری) یک مخزن خصوصی در GitHub می‌سازد و تنظیمات را آن‌جا می‌فرستد.", on: "laptop", net: "proxy",
        note: "اول باید <code>gh auth login</code> کرده باشی (فصل ۵). هیچ‌وقت کلید خصوصی SSH، لینک اشتراک Happ یا رمزی را در این مخزن نگذار." })
    ]},
    { t: "وقتی چیزی خراب شد: کجا را بخوانی", b: [
      TBL(["چه", "کجا"], [
        ["خطاهای این بوت", "<code>journalctl -b -p err</code>"],
        ["بوت قبلی (وقتی سیستم کرش کرد)", "<code>journalctl -b -1 -p warning</code>"],
        ["یک سرویس خاص", "<code>journalctl -b -u نام</code> و <code>systemctl status نام</code>"],
        ["سرویس‌های شکست‌خورده", "<code>systemctl --failed</code>"],
        ["هسته و سخت‌افزار", "<code>sudo dmesg --level=err,warn</code>"],
        ["پوستهٔ Ryoku (نوار، پنل‌ها)", "<code>~/.local/state/ryoku-shell.log</code> (بعد از <code>ryoku reload</code>)"],
        ["آخرین ryoku update", "<code>~/.local/state/ryoku/update-log.txt</code>"],
        ["گزارش کامل برای کمک گرفتن", "<code>ryoku doctor --report</code> ← <code>~/.local/state/ryoku/doctor-report.txt</code> (بدون رمز و کلید)"],
        ["صفحهٔ ورود", "<code>sudo journalctl -u sddm -n 200</code>"],
        ["تاریخچهٔ pacman", "<code>less /var/log/pacman.log</code>"]
      ]),
      C("ex", "", "<code>journalctl -b -p err</code> را بزن و برای هر خطا، با جست‌وجوی متن دقیقش (بدون عددها و زمان) در اینترنت ببین مهم است یا نه. خیلی از خطاهای بوت بی‌خطرند.")
    ]},
    { t: "امنیت پایه برای این لپ‌تاپ (و بعداً سیستم اصلی)", b: [
      UL(
        "به‌روزرسانی هفتگی، مهم‌ترین کار امنیتی است.",
        "SSH فقط با کلید (فصل ۹).",
        "رمزها و لینک‌های اشتراک در KeePassXC، پایگاهش روی <code>/data/vaults</code> و یک نسخه روی Fedora.",
        "از AUR فقط بسته‌هایی که رأی و نگه‌دارندهٔ فعال دارند؛ PKGBUILD بسته‌های ناآشنا را بخوان.",
        "هر <code>curl … | bash</code> را اول بدون <code>| bash</code> اجرا کن و بخوان.",
        "روی سیستم اصلی که فایل شخصی دارد: رمزنگاری LUKS و پشتیبان خارج از دستگاه.",
        "فایروال: اگر لپ‌تاپ را به شبکه‌های عمومی می‌بری، <code>ufw</code> را نصب و فقط SSH را از شبکهٔ خانه باز کن (Arch Wiki: Uncomplicated Firewall)."
      )
    ]}
  ],
  end: ["روال هفتگی را یک بار کامل اجرا کردم.", "روال ماهانه را می‌شناسم.", "مخزن git تنظیماتم ساخته شد و یک bundle در /data/backups دارم.", "می‌دانم برای هر نوع خرابی کدام لاگ را بخوانم."],
  probs: [
    ["git status فایل‌های زیادی نشان می‌دهد.", "‎.gitignore را با wl-paste درست نساخته‌ای؛ cat ~/.config/.gitignore را ببین. خط اول باید * باشد."],
    ["pacman -Syu دربارهٔ manual intervention هشدار می‌دهد.", "خبر مربوط در archlinux.org/news را بخوان و دقیقاً همان دستورها را اجرا کن."]
  ],
  src: [
    ["Ryoku repo: docs/cli.md (rollback، track، recovery)", "https://github.com/ryoku-dev/ryoku/blob/main/docs/cli.md"],
    ["Ryoku repo: docs/updates.md (boot guard)", "https://github.com/ryoku-dev/ryoku/blob/main/docs/updates.md"],
    ["Arch Wiki: System maintenance", "https://wiki.archlinux.org/title/System_maintenance"],
    ["Arch Wiki: Pacman/Pacnew and Pacsave", "https://wiki.archlinux.org/title/Pacman/Pacnew_and_Pacsave_files"],
    ["Arch Wiki: Dotfiles", "https://wiki.archlinux.org/title/Dotfiles"],
    ["git-bundle", "https://git-scm.com/docs/git-bundle"],
    ["Arch Linux news", "https://archlinux.org/news/"],
    ["Arch Wiki: Security", "https://wiki.archlinux.org/title/Security"]
  ]
});
