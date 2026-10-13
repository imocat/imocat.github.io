# Between Frames · Landing page design spec

Shared input for the three direction drafts in this folder. Each draft uses only this spec and the assets in `../assets/`.

## Product

Between Frames is an iPhone app (iOS 16+) for revisiting a camera roll in small groups and clearing out what no longer matters. Photos and videos are reviewed one at a time. Anything you do not mark for deletion is kept. At the end of each group you get **One last look** at everything marked, then iOS asks once to confirm the deletion. Deleted items go to Recently Deleted. Finished items never come back into the queue on their own.

Benchmark product: 去留 (Chinese, "stay or go"). The positioning differs: Between Frames is calm, photo-first, and not a "phone cleaner". It never shows a frightening "12,481 photos left" counter.

## Audience and context

Overseas English-speaking iPhone owners, 25–45, with years of photos in their camera roll. They care about memories more than storage, and are put off by aggressive "cleaner" apps full of ads and scare tactics. Most visitors come from a phone (App Store link, social posts, search), so the 390 px mobile view must be as good as the 1440 px desktop view.

## Core message

"Revisit your camera roll, a few frames at a time. Keep what matters. Let the rest go, on your terms."

### Content sections (all drafts use this content; order may vary)

1. **Hero**: name, one-line promise, App Store CTA ("Download on the App Store" as a text button; the app is not live yet, so link to `#download`), a real product screenshot.
2. **How it works** (3 steps):
   - *Swipe left to keep.* Anything you don't mark stays.
   - *Swipe up to mark for deletion.* The photo falls into the Dynamic Island. Undo brings it back.
   - *One last look, then iOS confirms.* Review the marked items and change your mind. iOS asks once.
3. **Principles / features**:
   - Small groups you can finish: 15 photos takes about 4 minutes.
   - Videos too: a vertical, full-screen video review.
   - Done stays done: reviewed items don't come back after a restart or refresh.
   - Nothing leaves your iPhone: on-device, no account, no ads, no analytics.
   - Focused review: Screenshots, By date, Albums.
   - Progress: see what you've reviewed and the potential storage savings.
4. **Free and Pro**: Free = 3 new groups a day (photos and videos combined), up to 15 items each, and continuing a group is always free. Pro = unlimited groups, 15/30/45/60/100 items per group; Monthly, Yearly (3-day free trial for eligible new subscribers), Lifetime. **No prices on the page.** Say "Prices shown in the App Store in your currency."
5. **FAQ**: Where do deleted photos go? (Recently Deleted; iOS keeps them for up to 30 days.) Does it work with iCloud Photos? (Yes; deletions sync to your other devices.) Does Between Frames upload my photos? (No.) What if I only allow access to selected photos? (Works with the selection; you can manage access any time.) Can I start over? (Reset review progress for All, Photos, or Videos; deletion history is kept.)
6. **Footer**: Privacy Policy (`privacy.html`), Terms of Service (`terms.html`), Support (contact placeholder), © 2026 Between Frames.

## Tone and keywords

Darkroom, quiet, confident, tactile, honest. Not hype, not a cleaner. Sentence-case buttons. US English copy.

## Format

- One self-contained `index.html` (inline CSS, minimal JS), no frameworks, no external fonts required (system font stack, SF Pro on Apple devices).
- Draft size for comparison: **1440 × 900 desktop**, also check **390 × 844 mobile**.
- Responsive, `prefers-reduced-motion` respected, text contrast ≥ 4.5:1, body ≥ 16 px on mobile.

## Brand constraints (from DESIGN.md v3.0, Glass Darkroom)

- Canvas `#0B0C0B`, Surface `#1A1B1A`, Ink `#F2F1EC`, Secondary `#9A9A97`, Danger `#FF5B4F` (deletion only), glass = white 7.5% fill + white 12% hairline.
- App icon: Polaroid on deep green `#3F6E5A`, sage `#6B9E80`, sun terracotta `#E0936F`, paper `#FBFAF5`.
- Photos supply the colour; the UI does not compete. No purple glow, no neon gradients, no emoji icons.

## Assets (`web/assets/`)

- `icon.png` (512), `apple-touch-icon.png`.
- `screens/*.jpg`: real native screenshots (iPhone, 1206 × 2622 source): today, review, lastlook, done, video, progress, library. These show simulator sample photos; replace with licensed photos before launch.
- `photos/*.jpg`: prototype sample photos (friends, hike, kitchen, mountain, pet, portrait, street, sunset). Licence to be confirmed before launch.

## Visual motif

The **frame and the gap between frames**: a film strip or contact-sheet sequence where one frame lifts out (kept) and one falls away (let go). The product is literally "between frames". Each draft must say where its form comes from.
