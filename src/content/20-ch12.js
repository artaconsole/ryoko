G.add({
  id: "c12", n: "۱۲", short: "موس‌لس شدن کامل",
  t: "موس‌لس شدن کامل: از «موس در کشو» تا «موس جدا شده»",
  what: "پنج سطح: کلیدهای کامپوزیتور Ryoku، مرورگر با کیبورد، ابزارهای «کلیک همه‌جا» (wl-kbptr و warpd)، بازنگاشت Caps Lock با keyd، و گردش کار ترمینالی. آخرش یک برنامهٔ تمرین ۱۴ روزه.",
  why: "موس‌لس شدن یعنی دست‌ها از ردیف اصلی کیبورد جدا نشوند. سرعت می‌گیری، مچ کمتر خسته می‌شود و هر کار تکراری یک کلید می‌شود.",
  time: "دو هفته تمرین روزانه",
  need: "K860 وصل، پروکسی برای نصب افزونه‌ها، و موس داخل کشو.",
  steps: [
    { t: "سطح ۱: کلیدهای کامپوزیتور Ryoku (برگهٔ تقلب)", b: [
      P("این‌ها کلیدهای واقعی Ryoku هستند و از جدول مشترک کلیدهای مخزن (ryoku/wm/binds.go و ryoku/hyprland/modules/binds.lua) برداشته شده‌اند. Hyprland و niri در Ryoku همین جدول را دارند. فهرست زنده و قابل تغییرش در Ryoku Hub است و " + K("Super+K") + " برگهٔ تقلب داخلی (Kit) را باز می‌کند."),
      TBL(["گروه", "کلید", "کار"], [
        ["برنامه", K("Super+Return"), "ترمینال (kitty)"],
        ["برنامه", K("Super+Space"), "لانچر"],
        ["برنامه", K("Super+B") + " / " + K("Super+E") + " / " + K("Super+Alt+E"), "مرورگر / مدیر فایل گرافیکی / Yazi"],
        ["برنامه", K("Super+N") + " / " + K("Super+O"), "ویرایشگر / یادداشت"],
        ["پنجره", K("Super+Q"), "بستن"],
        ["پنجره", K("Super+F") + " / " + K("Super+D"), "تمام‌صفحه / حداکثر (با فاصله و نوار)"],
        ["پنجره", K("Super+A"), "شناور کردن (۱۰۰۰×۶۶۰، وسط) یا برگرداندن به کاشی"],
        ["پنجره", K("Super+C"), "وسط صفحه"],
        ["پنجره", K("Super+T"), "گروه کردن پنجره‌ها به‌صورت زبانه‌ای"],
        ["پنجره", K("Super+Shift+P"), "سنجاق کردن پنجرهٔ شناور روی همهٔ فضاها"],
        ["تمرکز", K("Super+←↑→↓"), "رفتن به پنجرهٔ کناری"],
        ["تمرکز", K("Alt+Tab"), "پنجرهٔ قبلی"],
        ["جابه‌جایی", K("Super+Shift+←↑→↓"), "جابه‌جا کردن پنجره"],
        ["اندازه", K("Super+Ctrl+←↑→↓"), "باریک‌تر، پهن‌تر، کوتاه‌تر، بلندتر (نگه داشتن تکرار می‌کند)"],
        ["اندازه", K("Super+R"), "حالت تغییر اندازه: فلش‌ها یا hjkl، خروج با Esc"],
        ["فضای کاری", K("Super+1") + " … " + K("Super+0"), "رفتن به فضای ۱ تا ۱۰"],
        ["فضای کاری", K("Super+Alt+1") + " … ", "بردن پنجره به آن فضا و رفتن با آن"],
        ["فضای کاری", K("Super+Shift+1") + " … ", "بردن پنجره به آن فضا، بی‌صدا (خودت می‌مانی)"],
        ["فضای کاری", K("Super+PageUp") + " / " + K("Super+PageDown"), "فضای قبلی / بعدی"],
        ["فضای کاری", K("Super+Tab"), "نمای کلی همهٔ فضاها"],
        ["فضای کاری", K("Super+H") + " / " + K("Super+Alt+H"), "پنهان کردن پنجره در [[اسکرچ‌پد|scratchpad]] / نمایش اسکرچ‌پد"],
        ["پوسته", K("Super+,"), "Ryoku Hub"],
        ["پوسته", K("Super+K"), "Kit (برگهٔ کلیدها)"],
        ["پوسته", K("Super+V"), "تاریخچهٔ کلیپ‌بورد"],
        ["پوسته", K("Super+L"), "قفل صفحه"],
        ["پوسته", K("Super+Escape"), "تنظیمات سریع (خاموش، ری‌استارت، خروج، وای‌فای)"],
        ["پوسته", K("Super+W") + " / " + K("Super+Shift+W"), "انتخاب والپیپر / والپیپر تصادفی"],
        ["عکس صفحه", K("Print") + " / " + K("Shift+Print"), "عکس صفحه / کل نمایشگر"],
        ["عکس صفحه", K("Super+Shift+S"), "ابزار کامل گرفتن عکس و فیلم با حاشیه‌نویسی"],
        ["عکس صفحه", K("Super+Shift+C"), "برداشتن رنگ"],
        ["صدا و نور", "کلیدهای Fn لپ‌تاپ", "صدا، بی‌صدا، میکروفون، روشنایی (حتی در صفحهٔ قفل)"],
        ["صدا", K("Super+Shift+A"), "راه‌اندازی دوبارهٔ صدا وقتی برنمی‌گردد"],
        ["نمایشگر", K("Super+P"), "حالت نمایشگر خارجی (فقط داخلی، فقط خارجی، هر دو)"],
        ["ویژه", K("Super+Shift+Escape"), "همهٔ میان‌برها را به برنامهٔ فعال بده (مثلاً برای VNC)؛ دوباره بزن تا برگردد"]
      ]),
      C("ex", "تمرین چیدمان", "سه ترمینال باز کن. با " + K("Super+Shift+→") + " ترتیب‌شان را عوض کن، با " + K("Super+Ctrl+→") + " یکی را پهن‌تر کن، یکی را با " + K("Super+Shift+2") + " بی‌صدا به فضای ۲ بفرست، با " + K("Super+Tab") + " نمای کلی را ببین و همه را با " + K("Super+Q") + " ببند. بعد " + K("Print") + " بزن و ببین عکس کجا ذخیره شد.")
    ]},
    { t: "سطح ۱ (ادامه): کلیدهای خودت را اضافه کن", b: [
      P("دو راه دارد: <b>Ryoku Hub ← Keybindings</b> برای تغییر کلیدهای موجود (فایل rebinds را خودش می‌نویسد)، و فایل شخصی کامپوزیتور برای کلیدهای کاملاً جدید. فایل‌های پایهٔ Ryoku را مستقیم ویرایش نکن؛ با به‌روزرسانی بازنویسی می‌شوند."),
      FILE({ path: "~/.config/hypr/user.lua  (Hyprland)", d: "مثال‌ها با همان سینتکس توضیحات خود فایل: یک کلید برای Yazi و یک کلید برای پروکسی.", c: "-- my own binds (loaded last, never touched by updates)\nhl.bind(\"SUPER + Y\", hl.dsp.exec_cmd(\"kitty -e yazi\"))\nhl.bind(\"SUPER + SHIFT + T\", hl.dsp.exec_cmd(\"telegram-desktop\"))",
        note: "اضافه کردن: <code>wl-paste &gt;&gt; ~/.config/hypr/user.lua</code> و بعد <code>ryoku reload</code>. قبل از انتخاب کلید، با <code>hyprctl binds | rg -i 'super.*y'</code> مطمئن شو آزاد است. اگر خطای Lua داشته باشی، بقیهٔ تنظیمات کار می‌کند و خطا در <code>~/.local/state/ryoku-shell.log</code> دیده می‌شود." }),
      FILE({ path: "~/.config/niri/user.kdl  (niri)", c: "binds {\n    Mod+Y { spawn \"kitty\" \"-e\" \"yazi\"; }\n    Mod+Shift+T { spawn \"telegram-desktop\"; }\n}",
        note: "در niri هر آرگومان spawn یک رشتهٔ جدا است. کلیدی که اینجا تعریف کنی، جای همان کلید در rebinds.kdl را می‌گیرد." })
    ]},
    { t: "سطح ۲: مرورگر با کیبورد", b: [
      P("اول کلیدهای خود مرورگر، که بدون افزونه کار می‌کنند:"),
      TBL(["کلید", "کار (Firefox و Chromium)"], [
        [K("Ctrl+L"), "رفتن به نوار آدرس"], [K("Ctrl+T") + " / " + K("Ctrl+W"), "زبانهٔ جدید / بستن"], [K("Ctrl+Shift+T"), "باز کردن دوبارهٔ آخرین زبانهٔ بسته‌شده"],
        [K("Ctrl+Tab") + " / " + K("Ctrl+1…8"), "زبانهٔ بعدی / زبانهٔ N"], [K("Alt+←") + " / " + K("Alt+→"), "عقب / جلو"], [K("/") + " و در Firefox " + K("'"), "جست‌وجوی سریع در صفحه / فقط در لینک‌ها، بعد Enter برای باز کردن"],
        [K("F6"), "رفتن بین نوار آدرس و صفحه"], [K("F7"), "حالت نشانگر متنی (Caret Browsing) برای انتخاب متن با کیبورد"]
      ]),
      P("بعد یکی از این افزونه‌ها را نصب کن (فروشگاه افزونه‌ها ممکن است فیلتر باشد؛ مرورگر را پشت پروکسی ببر، فصل ۵):"),
      TBL(["مرورگر", "افزونه", "یادداشت"], [
        ["Firefox / Zen", "<b>Tridactyl</b>", "کامل‌ترین؛ تقریباً مرورگر را Vim می‌کند. <code>:help</code> راهنما."],
        ["Chromium", "<b>Vimium C</b>", "ساده و قابل اعتماد. " + K("?") + " راهنما."],
        ["Chromium (پیشرفته)", "Surfingkeys", "قابل برنامه‌نویسی با JavaScript."]
      ]),
      TBL(["کلید (Tridactyl / Vimium C)", "کار"], [
        [K("f") + " / " + K("F"), "برچسب روی همهٔ لینک‌ها: باز کردن در همین زبانه / زبانهٔ جدید"],
        [K("j") + " / " + K("k"), "اسکرول"], [K("Ctrl+d") + " / " + K("Ctrl+u") + " (Tridactyl)، " + K("d") + " / " + K("u") + " (Vimium)", "نصف صفحه پایین / بالا"],
        [K("g") + K("g") + " / " + K("G"), "اول / آخر صفحه"], [K("H") + " / " + K("L"), "عقب / جلو"],
        [K("J") + " / " + K("K"), "زبانهٔ چپ / راست"], [K("o") + " / " + K("t"), "باز کردن آدرس یا جست‌وجو در همین زبانه / زبانهٔ جدید"],
        [K("y") + K("y"), "کپی آدرس صفحه"], [K("g") + K("i"), "رفتن به اولین کادر متنی"],
        [K("d") + " (Tridactyl) / " + K("x") + " (Vimium)", "بستن زبانه"], [K("u") + " (Tridactyl) / " + K("X") + " (Vimium)", "بازگرداندن زبانهٔ بسته‌شده"],
        [K("b") + " (Tridactyl) / " + K("T") + " (Vimium)", "جست‌وجو بین زبانه‌های باز"], [K("Esc"), "خروج از هر حالت"]
      ]),
      C("concept", "qutebrowser", "مرورگری که از اول برای کیبورد ساخته شده و افزونه نمی‌خواهد (<code>sudo pacman -S qutebrowser</code>). پروکسی: <code>:set content.proxy socks://127.0.0.1:{{SOCKS}}</code>. برای سایت‌های سنگین، Firefox هنوز سازگارتر است."),
      H("پروکسی دائمی Chromium"),
      P("Chromium پرچم‌هایش را از <code>~/.config/chromium-flags.conf</code> می‌خواند. Ryoku این فایل را دارد و هنگام به‌روزرسانی بازنویسی می‌کند، پس نسخهٔ خودت را در لایهٔ user_edits بگذار:"),
      CMD({ c: "mkdir -p ~/.config/ryoku/user_edits\ncp ~/.config/chromium-flags.conf ~/.config/ryoku/user_edits/chromium-flags.conf\necho '--proxy-server=socks5://127.0.0.1:{{SOCKS}}' >> ~/.config/ryoku/user_edits/chromium-flags.conf\nryoku materialize", d: "یک کپی از پرچم‌های Chromium در user_edits می‌سازد، پرچم پروکسی را به آن اضافه می‌کند و آن را روی فایل اصلی می‌نشاند.", on: "laptop",
        uv: "رفتار materialize با این فایل را آزمایش نکردم؛ بعد از اجرا با <code>cat ~/.config/chromium-flags.conf</code> ببین خط پروکسی هست. Chromium را کامل ببند و باز کن." })
    ]},
    { t: "سطح ۳: کلیک هر جای صفحه با wl-kbptr (پیشنهادی)", b: [
      C("concept", "چرا لازم است", "بعضی برنامه‌ها (دیالوگ‌های گرافیکی، برنامه‌های Electron، نصب‌کننده‌ها) کلید ندارند. ابزار «کلیک همه‌جا» صفحه را با برچسب‌های حرفی یا شبکه می‌پوشاند، تو حرف را تایپ می‌کنی و نشانگر موس آن‌جا می‌رود و کلیک می‌کند. روی Wayland برنامه‌ها اجازه ندارند خودشان میان‌بر سراسری بگیرند، پس آن را با کلید کامپوزیتور اجرا می‌کنیم."),
      P("README برنامهٔ wl-kbptr صریحاً می‌گوید با Hyprland و niri تست شده است:"),
      CMD({ c: "yay -S wl-kbptr", d: "wl-kbptr را از AUR می‌سازد. بستهٔ AUR با OpenCV ساخته می‌شود (بیش از ۱۰۰ مگابایت وابستگی) تا حالت تشخیص خودکار دکمه‌ها هم کار کند.", on: "laptop", net: "proxy" }),
      FILE({ path: "~/.config/hypr/user.lua  (اضافه کن)", d: "Super+G: شبکهٔ کاشی‌ای و بعد دقیق‌سازی دونیمه‌ای.", c: "hl.bind(\"SUPER + G\", hl.dsp.exec_cmd(\"wl-kbptr -o modes=tile,bisect\"))\nhl.bind(\"SUPER + SHIFT + G\", hl.dsp.exec_cmd(\"wl-kbptr -o modes=floating,click -o mode_floating.source=detect\"))",
        note: "بعد <code>ryoku reload</code>. در niri: <code>Mod+G { spawn \"wl-kbptr\" \"-o\" \"modes=tile,bisect\"; }</code> داخل بلوک binds در user.kdl. هر دو کلید G در جدول Ryoku آزادند." }),
      TBL(["حالت", "چطور کار می‌کند"], [
        ["tile", "صفحه شبکه‌ای از خانه‌های برچسب‌دار می‌شود. برچسب خانهٔ مورد نظر را تایپ کن."],
        ["bisect", "ناحیهٔ انتخاب‌شده با فلش‌ها نصف می‌شود تا دقیق شوی. " + K("Enter") + " یا " + K("Space") + " نشانگر را می‌برد. " + K("g") + " کلیک چپ، " + K("h") + " کلیک راست، " + K("b") + " کلیک وسط (روی چیدمان QWERTY)."],
        ["floating + detect", "دکمه‌ها و ناحیه‌های قابل کلیک روی صفحه را خودکار پیدا و برچسب‌گذاری می‌کند (نسخهٔ با OpenCV لازم است)."],
        ["همه", K("Backspace") + " یک قدم برمی‌گردد. " + K("Esc") + " لغو."]
      ]),
      C("ex", "", "Firefox را باز کن، " + K("Super+G") + " بزن و روی دکمهٔ منوی همبرگری بالا-راست کلیک چپ کن. بعد با " + K("Super+Shift+G") + " همین کار را با حالت تشخیص خودکار امتحان کن.")
    ]},
    { t: "سطح ۳ (جایگزین): warpd", b: [
      P("warpd ابزار محبوب‌تر و قدیمی‌تری است که سه حالت دارد. نسخهٔ Wayland آن طبق README فقط روی کامپوزیتورهای wlroots (مثل sway) پشتیبانی می‌شود."),
      CMD({ c: "yay -S warpd-wayland", d: "نسخهٔ فقط-Wayland برنامهٔ warpd را از AUR نصب می‌کند (بستهٔ «warpd» برای X ساخته شده).", on: "laptop", net: "proxy" }),
      FILE({ path: "~/.config/hypr/user.lua  (اضافه کن)", c: "hl.bind(\"SUPER + ALT + X\", hl.dsp.exec_cmd(\"warpd --hint\"))\nhl.bind(\"SUPER + ALT + C\", hl.dsp.exec_cmd(\"warpd --normal\"))\nhl.bind(\"SUPER + ALT + G\", hl.dsp.exec_cmd(\"warpd --grid\"))",
        note: "همان سه کلیدی که README برای sway پیشنهاد کرده (Mod4+Mod1 یعنی Super+Alt). در جدول Ryoku آزادند." }),
      TBL(["حالت", "کلیدها"], [
        ["hint (" + K("Super+Alt+X") + ")", "برچسب‌ها ظاهر می‌شوند؛ حروف را تایپ کن تا نشانگر برود و به حالت normal برسی"],
        ["grid (" + K("Super+Alt+G") + ")", K("u") + " " + K("i") + " " + K("j") + " " + K("k") + " برای انتخاب یک‌چهارم صفحه، تکرار تا دقیق شوی"],
        ["normal (" + K("Super+Alt+C") + ")", K("h") + K("j") + K("k") + K("l") + " حرکت، " + K("m") + " کلیک چپ، " + K(",") + " وسط، " + K(".") + " راست، " + K("v") + " کشیدن، " + K("Esc") + " خروج"]
      ]),
      UV("Hyprland دیگر بر پایهٔ wlroots نیست (اما بیشتر پروتکل‌های wlr را پیاده کرده) و niri هم wlroots نیست. کارکرد warpd روی این دو را تأیید نکردم. اگر برچسب‌ها ظاهر نشدند یا نشانگر حرکت نکرد، از wl-kbptr استفاده کن که روی هر دو تست شده است.")
    ]},
    { t: "سطح ۴: Caps Lock = Esc و Ctrl با keyd", b: [
      C("concept", "چرا", "در Vim، Yazi و lazygit دائم " + K("Esc") + " می‌زنی و در همه‌جا " + K("Ctrl") + ". هر دو دور از ردیف اصلی‌اند. Caps Lock درست زیر انگشت کوچک چپ است و تقریباً بی‌استفاده. با [[بازنگاشت|remap]]: تک‌زدنش Esc است و نگه داشتنش Ctrl."),
      CMD({ c: "sudo pacman -S --needed keyd\nsudo systemctl enable --now keyd", d: "keyd را نصب و سرویسش را فعال می‌کند. keyd زیر لایهٔ گرافیکی کار می‌کند، پس روی همهٔ کیبوردها (لپ‌تاپ و K860) و در همهٔ برنامه‌ها اثر دارد.", on: "laptop", root: true, net: "net" }),
      FILE({ path: "/etc/keyd/default.conf", d: "دقیقاً همان مثال شروع سریع README برنامهٔ keyd.", c: "[ids]\n\n*\n\n[main]\n\n# Maps capslock to escape when pressed and control when held.\ncapslock = overload(control, esc)\n\n# Remaps the escape key to capslock\nesc = capslock",
        note: "ساختن: کپی کن و <code>wl-paste | sudo tee /etc/keyd/default.conf</code>، بعد <code>sudo keyd reload</code>. <code>[ids] *</code> یعنی روی همهٔ کیبوردها." }),
      C("warn", "راه فرار", "اگر تنظیم keyd کیبورد را بی‌مصرف کرد، سه کلید " + K("Backspace+Escape+Enter") + " را هم‌زمان بزن تا keyd متوقف شود (از README خود keyd). خطاهای تنظیم: <code>sudo journalctl -eu keyd</code>."),
      C("check", "", "در kitty: " + K("Caps") + " را نگه دار و " + K("C") + " بزن؛ مثل " + K("Ctrl+C") + " عمل می‌کند. در Neovim حالت درج را با تک‌زدن Caps ترک کن. اسم کلیدها را با <code>sudo keyd monitor</code> می‌بینی.")
    ]},
    { t: "سطح ۵: گردش کار ترمینالی", b: [
      TBL(["ابزار", "کلیدهای اصلی"], [
        ["<b>lazygit</b> (<code>lazygit</code> یا abbreviation <code>lg</code>)", K("Space") + " stage، " + K("a") + " همه، " + K("c") + " commit، " + K("P") + " push، " + K("p") + " pull، " + K("?") + " راهنما، " + K("q") + " خروج"],
        ["<b>fzf</b> در fish", K("Ctrl+R") + " تاریخچه، " + K("Ctrl+T") + " فایل، " + K("Alt+C") + " پوشه؛ <code>nvim (fzf)</code>"],
        ["<b>tmux</b>", "فصل ۹: جلسه‌های ماندگار"],
        ["<b>Obsidian</b>", "Settings ← Editor ← <b>Vim key bindings</b> روشن. " + K("Ctrl+P") + " فهرست همهٔ دستورها، " + K("Ctrl+O") + " باز کردن سریع یادداشت."],
        ["<b>zathura</b>", K("j") + "/" + K("k") + "، " + K("/") + " جست‌وجو، " + K("f") + " برچسب روی لینک‌ها، " + K("q")],
        ["<b>imv</b>", "فلش‌ها عکس بعد و قبل، " + K("+") + "/" + K("-") + " بزرگ‌نمایی، " + K("q")]
      ]),
      C("ex", "", "<code>~/.config</code> را مخزن git کن (فصل ۱۳)، یک فایل را تغییر بده و همهٔ کار commit را در lazygit بدون موس انجام بده.")
    ]},
    { t: "برنامهٔ تمرین ۱۴ روزه", b: [
      TBL(["روز", "هدف", "چالش بدون موس"], [
        ["۱", "کلیدهای Super+Return، Space، Q، 1 تا 5", "یک روز کامل بدون کلیک روی نوار بالا"],
        ["۲", "جابه‌جایی و اندازهٔ پنجره (Super+Shift و Super+Ctrl)", "سه پنجره را در سه فضای کاری مرتب کن"],
        ["۳", "kitty: پنجرهٔ داخلی، زبانه، hints", "یک آدرس اینترنتی را فقط با Ctrl+Shift+E باز کن"],
        ["۴", "fish: Ctrl+R، Ctrl+T، Alt+C، cd هوشمند", "بیست بار بدون نوشتن مسیر کامل جابه‌جا شو"],
        ["۵", "Yazi درس ۱ تا ۳", "از خانه به /etc/ssh و برگشت، فقط با hjkl"],
        ["۶", "Yazi درس ۴ تا ۶", "پوشهٔ Downloads را مرتب کن"],
        ["۷", "مرور هفته + Kit (Super+K)", "موس را جدا کن و یک ساعت کار کن"],
        ["۸", "Tridactyl یا Vimium C: f، j/k، H/L، J/K", "یک مقالهٔ ویکی‌پدیا بخوان و سه لینک باز کن"],
        ["۹", "keyd: Caps = Esc/Ctrl", "یک فایل را در Neovim ویرایش کن بدون دست زدن به Esc واقعی"],
        ["۱۰", "wl-kbptr", "یک تنظیم Firefox را بدون موس عوض کن"],
        ["۱۱", "Yazi درس ۷ تا ۱۰", "سه افزونه نصب و کلید g p را بساز"],
        ["۱۲", "lazygit و dotfiles", "تغییرات تنظیماتت را commit کن"],
        ["۱۳", "SSH و tmux از Fedora", "روی لپ‌تاپ از راه دور به‌روزرسانی کن"],
        ["۱۴", "روز کامل موس‌لس", "موس را از برق بکش و یک روز کاری کامل انجام بده"]
      ], "plan"),
      C("concept", "قانون ۲ دقیقه", "هر بار دستت به سمت موس رفت، مکث کن و دو دقیقه وقت بگذار تا راه کیبوردی‌اش را پیدا کنی (Kit، " + K("?") + " در هر برنامه، یا جست‌وجوی همین صفحه با " + K("/") + "). اگر پیدا نشد، یک کلید جدید در user.lua برایش بساز.")
    ]}
  ],
  end: ["کلیدهای سطح ۱ را از حفظ می‌زنم و حداقل یک کلید شخصی ساخته‌ام.", "Tridactyl یا Vimium C نصب است و با f کلیک می‌کنم.", "wl-kbptr با Super+G کار می‌کند.", "Caps Lock تک‌زدن Esc و نگه‌داشتن Ctrl است.", "یک روز کامل بدون موس کار کرده‌ام."],
  probs: [
    ["Super+G کاری نمی‌کند.", "ryoku reload زده‌ای؟ hyprctl binds | rg -i wl-kbptr. اگر خطای Lua بود، لاگ ~/.local/state/ryoku-shell.log را ببین."],
    ["wl-kbptr باز می‌شود ولی کلیک نمی‌کند.", "حالت click یا کلید g در bisect را زده‌ای؟ اگر نشانگر حرکت نمی‌کند، کامپوزیتور virtual-pointer را رد کرده؛ niri یا Hyprland را به‌روز کن."],
    ["بعد از keyd بعضی کلیدها عجیب رفتار می‌کنند.", "sudo keyd reload؛ اگر نشد Backspace+Escape+Enter و sudo systemctl stop keyd."],
    ["افزونهٔ مرورگر روی بعضی صفحه‌ها کار نمی‌کند.", "صفحه‌های داخلی مرورگر (about:، chrome://) و فروشگاه افزونه‌ها اجازهٔ اجرای افزونه نمی‌دهند. این طبیعی است."]
  ],
  src: [
    ["Ryoku repo: ryoku/wm/binds.go (جدول کلیدها)", "https://github.com/ryoku-dev/ryoku/blob/main/ryoku/wm/binds.go"],
    ["Ryoku repo: ryoku/hyprland/modules/binds.lua", "https://github.com/ryoku-dev/ryoku/blob/main/ryoku/hyprland/modules/binds.lua"],
    ["Ryoku repo: ryoku/hyprland/user.lua و ryoku/niri/user.kdl", "https://github.com/ryoku-dev/ryoku/tree/main/ryoku"],
    ["Ryoku docs: Keybindings", "https://docs.ryoku.dev/docs/keybindings"],
    ["wl-kbptr", "https://github.com/moverest/wl-kbptr"],
    ["warpd", "https://github.com/rvaiya/warpd"],
    ["AUR: warpd-wayland", "https://aur.archlinux.org/packages/warpd-wayland"],
    ["keyd", "https://github.com/rvaiya/keyd"],
    ["Tridactyl", "https://github.com/tridactyl/tridactyl"],
    ["Vimium C", "https://github.com/gdh1995/vimium-c"],
    ["Surfingkeys", "https://github.com/brookhong/Surfingkeys"],
    ["qutebrowser", "https://qutebrowser.org/"],
    ["lazygit", "https://github.com/jesseduffield/lazygit"]
  ]
});
