# OUTLINE — the offline Persian Ryoku guide (`index.html`)

Working notes for building `index.html`: the plan, the chapter outline,
the verified facts and the items still unconfirmed.

## Build

- Source: `src/engine.css`, `src/engine.js` (page shell) and `src/content/*.js`
  (chapters as structured data). `build.py` inlines everything, plus a
  Vazirmatn subset as base64 woff2, into one `index.html`.
- Rebuild: `python3 build.py` → `index.html`.
- Test: `node tests/run.cjs [screenshot-dir]` (Playwright, 50 checks: console
  errors, offline requests, RTL/LTR, copy + clipboard, placeholders, danger
  lock, progress persistence, search, every shortcut incl. the Persian
  layout, tooltips, print CSS, phone width, drawer). Last run: all passed.

## Page features

- Fully offline (`file://`): no CDN, inline CSS/JS, embedded font subset.
- RTL prose, LTR code (`dir="ltr"`, `unicode-bidi: isolate`).
- Every command: Copy button (clipboard API + `execCommand` fallback),
  one-line explanation, part-by-part breakdown, expected output, a "where
  to run it" badge (Fedora / live USB / laptop), a "needs internet" badge,
  and a red "خطرناک" badge plus a checklist that unlocks Copy.
- "My values" panel (localStorage): username, hostname, laptop IP, PC IP,
  SOCKS port 10808, HTTP port, USB device, HDD device, Wi-Fi name. Every
  `{{PLACEHOLDER}}` updates live and is highlighted.
- Progress: a checkbox per step, chapter bars, an overall bar, reset.
- Keys: `j/k` next/previous item, `J/K` and `]/[` chapters, `/` search,
  `y` copy, `x` toggle checkbox, `t` theme, `gg`/`G`, `v` values panel,
  `?` help, `Esc` close.
- Sidebar TOC with progress, drawer on phones, full-text search.
- Dark (default) and light themes, print CSS, glossary tooltips.

## Chapters

0. How to use the guide, plus a mental model of Linux.
1. Preparing on Fedora: ISO, GPG/sha256 check, offline downloads (Happ
   `.pkg.tar.zst`, this page), USB via Fedora Media Writer / `dd` /
   Ventoy (⚠️).
2. Asus BIOS: keys (⚠️ F2/Esc), UEFI, Fast Boot, AHCI, Secure Boot **off**
   (Limine is unsigned), boot order.
3. Install: the real `ryoku-tui` step order, the SSD by size/model, the
   HDD left alone, encryption, Hyprland vs niri, Graphics mode = Hybrid,
   the Apps & tools trim for 8 GB, us+ir layout.
4. First boot: the welcome tour, Mod+Return, `nmcli`/`nmtui`
   (NetworkManager + iwd), `ryoku doctor`, the two update lanes,
   snapshots, rolling back through Limine, mirrors (Iranian Arch mirrors,
   `cachyos-rate-mirrors`).
5. Proxy: Happ offline install, system proxy vs TUN, fish functions
   `proxy-on/off/status` in `~/.config/fish/user.fish`, curl/git/gh/yay,
   pacman `XferCommand` (from the Ryoku docs), flatpak/pip/uv/npm.
6. Packages: pacman/yay/gpk/Flatpak lesson, what Ryoku ships, Flathub,
   essentials (checked against archlinux.org and the AUR RPC), K860.
7. 1 TB HDD as `/data`: `lsblk -f`, `wipefs`/`mkfs.ext4 -L data`,
   fstab with UUID + `nofail`, `mount -a`, ownership, emergency mode,
   folder structure.
8. NVIDIA 940MX: what Ryoku installs on its own (`nvidia-580xx-dkms` for
   Maxwell), Hybrid mode, `prime-run` (`nvidia-prime`), checks, undo.
9. Remote access: `openssh` (not preinstalled), keys, hardening,
   `~/.ssh/config`, `kitten ssh`, scp/rsync/sshfs, LocalSend, wayvnc over
   an SSH tunnel + KRDC/Remmina, RustDesk/Sunshine notes, tmux/zellij.
10. Terminal course: kitty, fish, core commands, pipes, Neovim survival.
11. Yazi (10 lessons): the real 26.x keymap, the fish `y` wrapper,
    `ya pkg`, `[mgr]`, openers with `%s`, bookmarks, plugins.
12. Mouseless: the real Ryoku binds, Vimium C/Surfingkeys/Tridactyl,
    wl-kbptr (Hyprland ✅ niri ✅) and warpd (⚠️ on Hyprland/niri), keyd,
    a 14-day plan.
13. Maintenance and security.
14. Troubleshooting FAQ (40+ entries).
15. Glossary + printable cheat sheets.

## Verified facts (sources in each chapter)

- Ryoku 1.0 "Amaterasu", repo VERSION 1.0.7 (commit of 2026-10-31).
  Arch + CachyOS stable. Hyprland is the installer default; niri is
  available; switch with `ryoku wm use <name>` or the Hub.
- Installer flow: keyboard → locale → timezone → network → hardware →
  profile → gpu (hybrid only) → compositor → browser → login-shell →
  file-manager → Rashin → Gaming → Apps & tools → target disk → disk
  strategy → layout → hostname → administrator → root → other people →
  encryption → review (type `ERASE` to wipe a disk that has partitions).
- Defaults: login shell fish, browser Firefox, file manager Nautilus,
  hostname `ryoku`. Btrfs subvolumes `@ @home @snapshots`. Limine + UKI.
  snapper + snap-pac + limine-snapper-sync, 10 numbered snapshots.
- **Secure Boot must be OFF** (Limine ships unsigned; the TUI blocks Review).
- Arch/CachyOS ISOs need **UEFI**. ISO boot entries: normal, safe
  graphics (`nomodeset`), copy to RAM (`copytoram`).
- Network: NetworkManager with the **iwd** Wi-Fi backend → `nmcli`/`nmtui`.
- `ryoku update` moves only the `[ryoku]` packages + configs + doctor;
  `sudo pacman -Syu` moves the distro/kernel (repo docs/updates.md; the
  older docs site says otherwise, and the newer repo text wins).
- Rollback of the whole system: Limine → *Ryoku Linux → Snapshots → id* →
  `sudo limine-snapper-restore` → reboot.
- Update-safe override files: `~/.config/hypr/user.lua`,
  `~/.config/hypr/keyboard.lua`, `~/.config/kitty/user.conf`,
  `~/.config/fish/user.fish`, `~/.config/niri/user.kdl`,
  `~/.config/niri/keyboard.kdl`, plus the `~/.config/ryoku/user_edits`
  overlay. `ryoku owner <path>` tells who owns a file.
- fish config: `zoxide init fish --cmd cd` (so `cd` is zoxide, `cdi`
  interactive), `ls`=eza alias, fzf keys Ctrl-R/Ctrl-T/Alt-C.
- kitty: `kitty.conf` is Ryoku-owned; `user.conf` is yours. Reload
  ctrl+shift+f5; hints ctrl+shift+e, ctrl+shift+p>f etc.
- Yazi 26.9.1: `[mgr]`, `ya pkg add owner/repo`, `ya pkg add
  yazi-rs/plugins:git`, openers use `%s`; `z`=fzf, `Z`=zoxide, `t t` new
  tab, `w` tasks, `~`/F1 help, `g t` trash bin; preview deps `ffmpeg
  7zip jq poppler fd ripgrep fzf zoxide resvg imagemagick`.
- NVIDIA: Ryoku `nvidia.sh` installs `nvidia-580xx-dkms` (+
  `lib32-nvidia-580xx-utils` with multilib) for Maxwell **automatically**
  when lspci shows an NVIDIA GPU; it writes the nouveau blacklist only
  when the module exists; the `ryoku-nvidia-guard` hook restores nouveau
  when a DKMS build fails. The installer's Graphics mode "Hybrid" keeps
  the iGPU primary.
- Packages (archlinux.org JSON + AUR RPC, 2026-11-08): official —
  telegram-desktop, keepassxc, obsidian, zathura, zathura-pdf-mupdf, imv,
  aria2, unzip, 7zip (p7zip is gone), unrar, wl-clipboard, bluetui,
  pulsemixer, wiremix, brightnessctl, power-profiles-daemon, trash-cli,
  tealdeer, tldr, dust, duf, openssh, sshfs, rsync, wayvnc, solaar, keyd,
  tmux, zellij, nvidia-prime, qutebrowser, moonlight-qt, rate-mirrors,
  kitty-terminfo. AUR — vazirmatn-fonts, cryptomator(-bin),
  localsend-bin, warpd, wl-kbptr, rustdesk-bin, sunshine,
  nvidia-580xx-dkms, happ-desktop-bin (the name is not `happ-desktop`).
- Iranian Arch mirrors (archlinux.org status, 2026-11-08):
  mirror.famaserver.com (https), mirror.mobinhost.com (https, 50 %),
  repo.iut.ac.ir (http only).

## Unconfirmed (marked "⚠️ تأیید نشده" on the page)

- Happ's default HTTP port (10809?) and whether its port is "mixed" →
  check with `ss -tlnp`.
- Exact BIOS keys and menu names on the K556UQ (F2 / Esc are typical for Asus).
- The laptop's Wi-Fi chipset (Intel/Qualcomm/Realtek vary by SKU) → `lspci -nnk`.
- Ventoy: the Ryoku docs contradict each other → use dd / Fedora Media Writer.
- warpd on Hyprland's Aquamarine backend and on niri.
- wayvnc on niri.
- Whether a firewall is active by default (nftables is installed).
- Editing the kernel cmdline from Limine on a UKI entry (`e`, then F10).
- Flatpak system installs through a proxy.
- The K860's connection type (Bluetooth vs. Logi Bolt/Unifying receiver).
- The CachyOS edition's ISO file name.
