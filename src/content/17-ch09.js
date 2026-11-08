G.add({
  id: "c9", n: "۹", short: "دسترسی از راه دور",
  t: "دسترسی از راه دور از سیستم اصلی (Fedora)",
  what: "SSH را روی لپ‌تاپ راه می‌اندازیم، با کلید و بدون رمز از Fedora وصل می‌شویم، فایل جابه‌جا می‌کنیم، دسکتاپ لپ‌تاپ را با VNC روی Fedora می‌بینیم و با tmux جلسه‌ها را زنده نگه می‌داریم.",
  why: "لپ‌تاپ زمین تمرین است و Fedora میز کار اصلی. با SSH از پشت سیستم اصلی روی لپ‌تاپ کار می‌کنی و اگر دسکتاپ لپ‌تاپ خراب شد هم هنوز به آن دسترسی داری.",
  time: "۶۰ دقیقه",
  need: "هر دو دستگاه به یک مودم/وای‌فای وصل باشند. روی Fedora: KRDC یا Remmina (نصب هستند).",
  steps: [
    { t: "پیدا کردن IPها", b: [
      CMD({ c: "ip -4 -brief address", d: "IP نسخهٔ ۴ همهٔ کارت‌های شبکه را خلاصه نشان می‌دهد. روی هر دو دستگاه اجرا کن.", on: "laptop",
        out: "lo               UNKNOWN        127.0.0.1/8\nwlan0            UP             192.168.1.50/24",
        ok: "عدد جلوی wlan0 (بدون ‎/24) IP لپ‌تاپ است. همین را روی Fedora هم بزن. هر دو را در پنل مقادیر بنویس: لپ‌تاپ {{LAPTOP_IP}} و Fedora {{PC_IP}}. نام کاربری Fedora را هم در خانهٔ «نام کاربری روی Fedora» بگذار." }),
      C("concept", "IP ثابت", "مودم معمولاً با DHCP به هر دستگاه یک IP می‌دهد که ممکن است بعد از مدتی عوض شود. در صفحهٔ مدیریت مودم (معمولاً 192.168.1.1) بخش DHCP Reservation یا Static Lease، به لپ‌تاپ یک IP ثابت بده. این کار اختیاری است، ولی دردسر عوض‌شدن IP را از بین می‌برد.")
    ]},
    { t: "روشن کردن سرور SSH روی لپ‌تاپ", b: [
      C("concept", "SSH", "[[SSH|ssh]] یک اتصال رمزنگاری‌شده به ترمینال دستگاه دیگر است. روی لپ‌تاپ «سرور» (سرویس sshd، پورت 22) و روی Fedora «کلاینت» (دستور ssh) لازم است. Ryoku به‌طور پیش‌فرض سرور SSH را نصب نمی‌کند."),
      CMD({ c: "sudo pacman -S --needed openssh\nsudo systemctl enable --now sshd\nsystemctl status sshd --no-pager", d: "سرور OpenSSH را نصب می‌کند، همین حالا روشن و در هر بوت فعالش می‌کند و وضعیتش را نشان می‌دهد.", on: "laptop", root: true, net: "net",
        parts: [["enable --now", "هم فعال در بوت و هم روشن همین الان"], ["--no-pager", "خروجی را مستقیم چاپ کن، بدون باز کردن less"]],
        out: "● sshd.service - OpenSSH Daemon\n     Loaded: loaded (/usr/lib/systemd/system/sshd.service; enabled; …)\n     Active: active (running) since …",
        ok: "عبارت <b>enabled</b> و <b>active (running)</b>." }),
      CMD({ c: "ss -tlnp | grep ':22 '", d: "بررسی می‌کند sshd روی پورت 22 منتظر اتصال است.", on: "laptop",
        out: "LISTEN 0 128 0.0.0.0:22 0.0.0.0:* \nLISTEN 0 128    [::]:22    [::]:*" }),
      CMD({ c: "systemctl is-active firewalld ufw nftables\nsudo nft list ruleset | head -n 20", d: "بررسی می‌کند فایروالی فعال است یا نه و قوانین nftables را نشان می‌دهد.", on: "laptop", root: true,
        ok: "اگر هر سه inactive بودند و ruleset خالی بود، فایروالی جلوی پورت 22 را نمی‌گیرد.",
        uv: "این‌که Ryoku به‌طور پیش‌فرض فایروالی روشن کند را در فهرست بسته‌ها و سرویس‌هایش ندیدم (nftables نصب است ولی قانونی برایش پیدا نکردم). با همین دستور خودت ببین." })
    ]},
    { t: "اولین اتصال از Fedora", b: [
      CMD({ c: "ssh {{USER}}@{{LAPTOP_IP}}", d: "از Fedora به ترمینال لپ‌تاپ وصل می‌شود.", on: "pc",
        out: "The authenticity of host '192.168.1.50 (192.168.1.50)' can't be established.\nED25519 key fingerprint is SHA256:…\nAre you sure you want to continue connecting (yes/no/[fingerprint])? yes\nnima@192.168.1.50's password:",
        ok: "بار اول <code>yes</code> را کامل تایپ کن، بعد رمز کاربری لپ‌تاپ. خط فرمان fish لپ‌تاپ با رنگ‌های starship ظاهر می‌شود. با <code>exit</code> یا " + K("Ctrl+D") + " خارج شو.",
        note: "سؤال fingerprint یعنی «این دستگاه را تا حالا ندیده‌ام؛ مطمئنی خودش است؟». بعد از yes، اثر انگشتش در <code>~/.ssh/known_hosts</code> روی Fedora ذخیره می‌شود. اگر روزی لپ‌تاپ را دوباره نصب کنی، این اثر انگشت عوض می‌شود و ssh هشدار بزرگ می‌دهد؛ آن موقع خط قدیمی را با <code>ssh-keygen -R {{LAPTOP_IP}}</code> پاک کن." })
    ]},
    { t: "کلید SSH: ورود بدون رمز و امن‌تر", b: [
      C("concept", "جفت کلید", "[[کلید SSH|sshkey]] دو فایل است: کلید خصوصی (<code>id_ed25519</code>) که فقط روی Fedora می‌ماند و هرگز جابه‌جایش نمی‌کنی، و کلید عمومی (<code>id_ed25519.pub</code>) که روی لپ‌تاپ کپی می‌شود. لپ‌تاپ با کلید عمومی چالشی می‌سازد که فقط صاحب کلید خصوصی می‌تواند جوابش را بدهد."),
      CMD({ c: "ssh-keygen -t ed25519 -C \"fedora-to-laptop\"", d: "روی Fedora یک جفت کلید جدید از نوع ed25519 می‌سازد.", on: "pc",
        parts: [["-t ed25519", "نوع کلید؛ مدرن، کوتاه و امن"], ["-C \"…\"", "یک توضیح برای شناختن کلید"]],
        note: "مسیر پیش‌فرض را با Enter قبول کن. برای passphrase یک عبارت بگذار (KDE آن را در کیف پولش نگه می‌دارد) یا برای سادگی خالی بگذار. اگر از قبل کلید داری و می‌پرسد Overwrite؟، n بزن و از همان استفاده کن." }),
      CMD({ c: "ssh-copy-id {{USER}}@{{LAPTOP_IP}}", d: "کلید عمومی را به فایل ‎~/.ssh/authorized_keys روی لپ‌تاپ اضافه می‌کند (یک بار رمز لپ‌تاپ را می‌پرسد).", on: "pc",
        out: "Number of key(s) added: 1\nNow try logging into the machine, with: \"ssh 'nima@192.168.1.50'\"",
        ok: "حالا <code>ssh {{USER}}@{{LAPTOP_IP}}</code> باید بدون رمز لپ‌تاپ وصل شود." })
    ]},
    { t: "میان‌بر ~/.ssh/config روی Fedora", b: [
      FILE({ path: "~/.ssh/config  (روی Fedora)", d: "یک اسم کوتاه برای لپ‌تاپ تعریف می‌کند تا به‌جای نام کاربری و IP فقط بنویسی ssh laptop.", on: "pc", c: "Host laptop\n    HostName {{LAPTOP_IP}}\n    User {{USER}}\n    IdentityFile ~/.ssh/id_ed25519\n    ServerAliveInterval 30",
        note: "روی Fedora: <code>nano ~/.ssh/config</code>، متن را بچسبان و ذخیره کن، بعد <code>chmod 600 ~/.ssh/config</code>. ServerAliveInterval هر ۳۰ ثانیه یک پیام زنده‌بودن می‌فرستد تا اتصال بیکار قطع نشود." }),
      CMD({ c: "ssh laptop 'uname -a; uptime'", d: "با اسم کوتاه وصل می‌شود، دو دستور را روی لپ‌تاپ اجرا می‌کند و برمی‌گردد.", on: "pc",
        out: "Linux k556 6.x.x-cachyos … x86_64 GNU/Linux\n 14:22:10 up  2:41,  1 user,  load average: 0.21, 0.30, 0.28" })
    ]},
    { t: "بستن ورود با رمز", b: [
      C("warn", "", "این کار را فقط بعد از این‌که ورود با کلید کار کرد انجام بده و یک جلسهٔ SSH باز نگه دار تا اگر اشتباهی شد، از همان جلسه درستش کنی."),
      CMD({ c: "grep -i '^Include' /etc/ssh/sshd_config", d: "بررسی می‌کند فایل اصلی sshd پوشهٔ sshd_config.d را می‌خواند.", on: "laptop",
        out: "Include /etc/ssh/sshd_config.d/*.conf",
        ok: "اگر این خط بود، روش فایل جدا (پایین) کار می‌کند. اگر نبود، همان سه خط را به انتهای /etc/ssh/sshd_config اضافه کن." }),
      FILE({ path: "/etc/ssh/sshd_config.d/10-hardening.conf  (روی لپ‌تاپ)", c: "PasswordAuthentication no\nKbdInteractiveAuthentication no\nPermitRootLogin no",
        note: "ساختن فایل: دکمهٔ کپی را بزن و روی لپ‌تاپ اجرا کن: <code>wl-paste | sudo tee /etc/ssh/sshd_config.d/10-hardening.conf</code>. اگر از SSH وصلی (کلیپ‌بورد لپ‌تاپ در دسترس نیست)، از <code>sudo nvim --clean</code> با همین مسیر استفاده کن." }),
      CMD({ c: "sudo sshd -t && sudo systemctl restart sshd", d: "اول تنظیمات sshd را آزمایش می‌کند و فقط اگر خطایی نبود، سرویس را ری‌استارت می‌کند.", on: "laptop", root: true,
        parts: [["sshd -t", "test: فایل‌ها را بخوان و اگر خطا دارند بگو"], ["&&", "دستور دوم فقط اگر اولی موفق بود"]],
        ok: "از یک ترمینال تازهٔ Fedora: <code>ssh -o PubkeyAuthentication=no laptop</code> باید با <code>Permission denied (publickey)</code> رد شود و <code>ssh laptop</code> معمولی کار کند." })
    ]},
    { t: "خطای xterm-kitty و kitten ssh", b: [
      C("concept", "مشکل", "هر ترمینال اسمی دارد که در متغیر TERM می‌گذارد. kitty اسم <code>xterm-kitty</code> را می‌گذارد. وقتی از kitty به دستگاهی SSH می‌کنی که اطلاعات این ترمینال (terminfo) را ندارد، برنامه‌هایی مثل nvim، htop یا clear خطای <code>'xterm-kitty': unknown terminal type</code> می‌دهند."),
      P("در مسیر Fedora → لپ‌تاپ معمولاً این مشکل را نداری: Konsole اسم استاندارد xterm-256color دارد و خود لپ‌تاپ kitty را نصب دارد. مشکل در جهت برعکس پیش می‌آید: از kitty روی لپ‌تاپ به Fedora یا یک سرور."),
      CMD({ c: "kitten ssh {{PC_USER}}@{{PC_IP}}", d: "به‌جای ssh معمولی از «kitten ssh» استفاده کن؛ اطلاعات kitty را خودکار به دستگاه مقصد می‌برد.", on: "laptop",
        note: "راه‌های دیگر: روی مقصد بستهٔ terminfo کیتی را نصب کن (Fedora: <code>sudo dnf install kitty-terminfo</code>؛ Arch: <code>kitty-terminfo</code>)، یا موقت <code>TERM=xterm-256color ssh …</code>." })
    ]},
    { t: "جابه‌جایی فایل: scp، rsync، sshfs و LocalSend", b: [
      CMD({ c: "scp ~/Downloads/file.pdf laptop:/data/idk/\nscp laptop:/data/photos/pic.jpg ~/Pictures/", d: "یک فایل را از Fedora به لپ‌تاپ و یکی را از لپ‌تاپ به Fedora کپی می‌کند (با میان‌بر laptop).", on: "pc",
        parts: [["laptop:/مسیر", "یعنی «این مسیر روی دستگاه laptop»"]] }),
      CMD({ c: "rsync -avh --progress ~/Projects/ laptop:/data/backups/pc-projects/", d: "یک پوشهٔ کامل را همگام می‌کند؛ دفعهٔ بعد فقط فایل‌های تغییرکرده فرستاده می‌شوند.", on: "pc",
        parts: [["-a", "archive: زیرپوشه‌ها، مجوزها و زمان‌ها حفظ شوند"], ["-v", "گزارش جزئیات"], ["-h", "اندازه‌های خوانا"], ["--progress", "پیشرفت هر فایل"], ["Projects/ با اسلش", "محتوای پوشه را بفرست، نه خود پوشه را. اسلش آخر در rsync معنای خاص دارد."]],
        note: "rsync باید روی هر دو دستگاه نصب باشد (روی لپ‌تاپ: <code>sudo pacman -S --needed rsync</code>). برای آزمایش بدون کپی واقعی، گزینهٔ <code>--dry-run</code> را اضافه کن." }),
      CMD({ c: "sudo pacman -S --needed sshfs\nmkdir -p ~/mnt/pc\nsshfs {{PC_USER}}@{{PC_IP}}:/home/{{PC_USER}} ~/mnt/pc\ny ~/mnt/pc", d: "روی لپ‌تاپ، خانهٔ Fedora را از طریق SSH مثل یک پوشهٔ محلی سوار می‌کند و آن را در Yazi باز می‌کند.", on: "laptop", root: true,
        note: "برای این کار سرور SSH روی Fedora باید روشن باشد: <code>sudo systemctl enable --now sshd</code> روی Fedora. پیاده کردن: <code>fusermount3 -u ~/mnt/pc</code>. تابع <code>y</code> را در فصل ۱۱ می‌سازیم؛ تا آن موقع <code>yazi ~/mnt/pc</code> بزن." }),
      P("<b>LocalSend</b> برای فرستادن سریع فایل بین لپ‌تاپ، Fedora و گوشی بدون کابل و حساب کاربری است. روی لپ‌تاپ نصب است. روی Fedora: <code>flatpak install flathub org.localsend.localsend_app</code>. اگر Fedora دستگاه دیگر را نمی‌بیند، پورت آن را در فایروال Fedora باز کن:"),
      CMD({ c: "sudo firewall-cmd --permanent --add-port=53317/tcp --add-port=53317/udp\nsudo firewall-cmd --reload", d: "پورت LocalSend (53317) را در فایروال Fedora به‌طور دائمی باز می‌کند.", on: "pc", root: true })
    ]},
    { t: "دسکتاپ گرافیکی از راه دور: wayvnc + KRDC/Remmina", b: [
      C("concept", "VNC روی Wayland", "[[VNC|vnc]] تصویر صفحه را می‌فرستد و کلید و موس را برمی‌گرداند. روی Wayland هر کامپوزیتور سرور جدا لازم دارد. wayvnc برای کامپوزیتورهای سبک wlroots طراحی شده و با Hyprland هم کار می‌کند (GNOME و KDE پشتیبانی نمی‌شوند)."),
      C("concept", "امن‌ترین روش برای مبتدی", "wayvnc به‌طور پیش‌فرض فقط روی localhost گوش می‌دهد. به‌جای باز کردن پورت روی شبکه و تنظیم رمز و گواهی، یک «تونل SSH» می‌سازیم: Fedora به پورت 5900 خودش وصل می‌شود و SSH آن را رمزنگاری‌شده به localhostِ لپ‌تاپ می‌رساند."),
      CMD({ c: "sudo pacman -S --needed wayvnc", d: "سرور VNC برای Wayland را روی لپ‌تاپ نصب می‌کند.", on: "laptop", root: true, net: "net" }),
      CMD({ c: "ls /run/user/(id -u)/ | grep wayland", d: "روی لپ‌تاپ (داخل دسکتاپ) اسم سوکت Wayland را پیدا می‌کند.", on: "laptop", shell: "fish",
        out: "wayland-1\nwayland-1.lock", ok: "اسمی شبیه wayland-1. اگر فرق داشت، در دستور بعدی عوضش کن." }),
      CMD({ c: "ssh -L 5900:127.0.0.1:5900 laptop 'env WAYLAND_DISPLAY=wayland-1 wayvnc 127.0.0.1 5900'", d: "از Fedora: تونل پورت 5900 را می‌سازد و همزمان wayvnc را داخل نشست گرافیکی لپ‌تاپ اجرا می‌کند. این ترمینال را باز نگه دار.", on: "pc",
        parts: [["-L 5900:127.0.0.1:5900", "پورت 5900 روی Fedora را از طریق SSH به 127.0.0.1:5900 روی لپ‌تاپ وصل کن"], ["env WAYLAND_DISPLAY=wayland-1", "به wayvnc بگو کدام نشست Wayland را نشان بدهد (چون از SSH اجرا شده، این را خودش نمی‌داند)"], ["wayvnc 127.0.0.1 5900", "فقط روی localhost لپ‌تاپ گوش بده"]],
        ok: "حالا روی Fedora، KRDC را باز کن، پروتکل vnc را انتخاب کن و آدرس <code>127.0.0.1:5900</code> را بزن (یا در Remmina پروتکل VNC و همان آدرس). صفحهٔ لپ‌تاپ باید دیده شود. برای قطع، در ترمینال SSH " + K("Ctrl+C") + " بزن.",
        uv: "پشتیبانی wayvnc از niri را تأیید نکردم (README فقط کامپوزیتورهای wlroots را نام می‌برد). روی Hyprland مستقیم امتحانش کن؛ اگر niri را انتخاب کردی و کار نکرد، از RustDesk استفاده کن." }),
      H("گزینه‌های دیگر"),
      TBL(["ابزار", "نکته"], [
        ["RustDesk (<code>yay -S rustdesk-bin</code>)", "ساده و چندسکویی. روی Wayland برای اشتراک صفحه از پورتال استفاده می‌کند و هر بار اجازه می‌خواهد؛ کنترل کیبورد و موس روی بعضی کامپوزیتورها محدود است. سرورهای عمومی‌اش از ایران ممکن است کند باشند."],
        ["Sunshine (AUR) + Moonlight (<code>moonlight-qt</code>)", "برای استریم روان (حتی بازی). Sunshine روی Wayland با ضبط KMS کار می‌کند که دسترسی ویژه لازم دارد. برای کار روزمره سنگین است."]
      ])
    ]},
    { t: "جلسه‌های ماندگار با tmux", b: [
      C("concept", "", "اگر روی SSH یک کار طولانی (مثلاً به‌روزرسانی) اجرا کنی و اتصال قطع شود، کار هم می‌میرد. [[tmux|tmux]] جلسه را روی خود لپ‌تاپ زنده نگه می‌دارد؛ قطع شو، دوباره وصل شو و همان‌جا ادامه بده."),
      CMD({ c: "sudo pacman -S --needed tmux\ntmux new -s main", d: "tmux را نصب می‌کند و یک جلسه به اسم main می‌سازد.", on: "laptop", root: true, net: "net" }),
      TBL(["کلید / دستور", "کار"], [
        [K("Ctrl+b") + " سپس " + K("d"), "جدا شدن (detach): جلسه زنده می‌ماند"],
        ["<code>tmux ls</code>", "فهرست جلسه‌ها"],
        ["<code>tmux attach -t main</code>", "برگشتن به جلسه"],
        [K("Ctrl+b") + " سپس " + K("%") + " / " + K("\""), "تقسیم عمودی / افقی"],
        [K("Ctrl+b") + " سپس فلش‌ها", "رفتن بین بخش‌ها"],
        [K("Ctrl+b") + " سپس " + K("c") + " / " + K("n"), "پنجرهٔ جدید / بعدی"]
      ]),
      C("ex", "", "از Fedora: <code>ssh laptop</code>، بعد <code>tmux new -s up</code>، بعد <code>sudo pacman -Syu</code>. وسطش " + K("Ctrl+b") + " " + K("d") + " بزن و SSH را ببند. دوباره وصل شو و <code>tmux attach -t up</code>؛ کار ادامه دارد."),
      C("concept", "zellij", "zellij جایگزین مدرن‌تر tmux است که کلیدهایش را پایین صفحه نشان می‌دهد (<code>sudo pacman -S zellij</code>). اگر tmux سخت بود امتحانش کن. Ryoku در هر دو حالت مشکل کلیپ‌بورد داخل جلسه‌های قدیمی را خودکار درست می‌کند.")
    ]}
  ],
  end: ["sshd روی لپ‌تاپ enabled و active است.", "از Fedora با ssh laptop و بدون رمز وصل می‌شوم.", "ورود با رمز بسته شد.", "با rsync یا scp فایل جابه‌جا کردم.", "صفحهٔ لپ‌تاپ را با wayvnc در KRDC یا Remmina دیدم.", "با tmux قطع و وصل شدم."],
  probs: [
    ["ssh: connect to host … port 22: Connection refused", "sshd روشن نیست: sudo systemctl enable --now sshd"],
    ["ssh: … No route to host / timed out", "IP عوض شده یا دو دستگاه در یک شبکه نیستند (مثلاً یکی به وای‌فای مهمان وصل است). ip -4 -brief address را دوباره ببین. اگر Happ روی لپ‌تاپ در حالت TUN است، یک بار خاموشش کن."],
    ["Permission denied (publickey)", "ورود با رمز بسته است و کلید کپی نشده. موقتاً 10-hardening.conf را از کنسول خود لپ‌تاپ پاک کن، sshd را ری‌استارت کن و ssh-copy-id را دوباره بزن."],
    ["WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!", "لپ‌تاپ دوباره نصب شده: ssh-keygen -R {{LAPTOP_IP}} روی Fedora."],
    ["wayvnc می‌گوید Failed to connect to a Wayland display", "WAYLAND_DISPLAY اشتباه است یا کسی وارد دسکتاپ لپ‌تاپ نشده. اول روی خود لپ‌تاپ وارد شو."]
  ],
  src: [
    ["Arch Wiki: OpenSSH", "https://wiki.archlinux.org/title/OpenSSH"],
    ["Arch Wiki: SSH keys", "https://wiki.archlinux.org/title/SSH_keys"],
    ["kitty: kitten ssh و terminfo", "https://sw.kovidgoyal.net/kitty/kittens/ssh/"],
    ["Arch Wiki: rsync", "https://wiki.archlinux.org/title/Rsync"],
    ["Arch Wiki: SSHFS", "https://wiki.archlinux.org/title/SSHFS"],
    ["wayvnc README", "https://github.com/any1/wayvnc"],
    ["LocalSend", "https://localsend.org/"],
    ["Arch Wiki: tmux", "https://wiki.archlinux.org/title/Tmux"],
    ["RustDesk", "https://github.com/rustdesk/rustdesk"],
    ["Sunshine", "https://github.com/LizardByte/Sunshine"]
  ]
});
