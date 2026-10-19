# Persona local asset recovery

Recovered game assets, not reference captures or generated approximations. Original installations were read only. Outputs are local-use source material requested by the user; website publication is a separate step.

## Sources

- Soundtrack executable: `N:\Game\Persona 3 Reload\Soundtrack\P3R_Soundtrack\Binaries\Win64\P3R_Soundtrack.exe`
- Artbook executable: `N:\Game\Persona 3 Reload\Artbook\P3R_Artbook\Binaries\Win64\P3R_Artbook.exe`
- Payloads were recovered from each corresponding `Content/Paks` folder rather than the launcher executable. Exact paths, byte lengths and SHA-256 hashes are recorded in `source-hashes.json`.
- The two 357,448,608-byte main `.ucas` payloads are byte identical: SHA-256 `e0121a3d5bf04ac8b49d566a0c1451ee5a378dc56f4dc52e55762e25075655ab`. Artbook-specific extraction independently succeeded for 200 assets, including localized versions. Selected portrait/page payload equivalence is recorded in `artbook-comparison.json`.

## Method and tooling

- Official standalone retoc 0.1.5: https://github.com/trumank/retoc/releases/tag/v0.1.5
- Official standalone repak 0.2.3: https://github.com/trumank/repak/releases/tag/v0.2.3
- Oodle decoder is the exact dependency documented by their loader: https://github.com/trumank/repak/blob/master/oodle_loader/src/lib.rs . Its downloaded SHA-256 matches `6f5d41a7892ea6b2db420f2458dad2f84a63901c9a93ce9497337b16c195f457`.
- repak identified V11 archives with unencrypted indexes; retoc identified Compressed|Indexed IoStore containers, no encryption flag. No keys, bypass, or process injection was used.
- retoc `to-legacy` using `--version UE4_27 --no-shaders` reconstructed 754 assets (2 failed) from Soundtrack and 200/200 selected Booklet texture assets from Artbook. The two failed full-conversion assets were not needed for the selected outputs; their exact identities remain unknown.
- Ogg Vorbis streams were copied from the reconstructed sound exports by reading consecutive Ogg page segment lengths, removing only UE wrapper bytes. Original compressed audio is preserved.
- Texture platform headers identified dimensions, DXT1/DXT5 format, and first-mip bulk lengths. Pillow decoded these unchanged DXT blocks via a matching DDS header into PNG. No generated artwork, recoloring, cropping or background removal was applied.

## Outputs and verification

- `exported/sfx`: 7 original sounds: Cancel, Cursor, Decision, Information, Menu, Page, Title. All are 44.1kHz mono Vorbis and successfully decode through FFmpeg.
- `exported/music`: all 60 original disc/track streams. Selected Iwatodai Dorm -Reload- (`Disc1of2_11`,150.066667s) and Color Your Night (`Disc1of2_16`,227.240000s) successfully decode through FFmpeg; both 44.1kHz stereo Vorbis. These are suggestions for website background music, not proof of the pause-menu recording's track identity.
- `exported/textures`: 213 nonlocalized PNG textures. `export-inventory.json` records output hashes, source identifiers, dimensions and formats.
- `track-titles.json` contains titles/composers recovered from the serialized SoundtrackMusicTextTable, matched by disc/track ordering (mapping derived).
- `hero-contact-sheet.jpg` and `booklet-contact-sheet.jpg` are visual selection aids, not recovered original assets.
- Visually confirmed protagonist title portrait (2048x2048 with alpha), 34 artbook pages (mostly2912x2056), and original UI graphics. Title portrait includes a small baked-in game logo.
- No classroom background image was identified in the inspected standalone bonus-app texture inventory. The separately authorized game screenshot/recording remains the appropriate source for the classroom backdrop.

## Integrated website assets
Runtime material in public/persona: original transparent title protagonist, selected full artbook pages03/11/13/20/22/23, original Cursor/Decision/Cancel/Page/Menu effects losslessly decoded to browser-compatible PCM WAV, and Iwatodai Dorm -Reload-/Color Your Night transcoded to MP3 quality4. The menu screenshot is the user's exact supplied capture, presented as a cropped classroom backdrop through CSS. No soundtrack identity is claimed for the reference recording. Optional playback begins only after explicit user interaction.

This revision supersedes docs/assets.md's original-art-only statement for the local game-scene layer. Original example project covers and fallback illustration remain project-created assets. No website has been published. Menu/classroom assets are game-reference decoration and do not represent the portfolio owner's likeness or achievements.

The animated classroom loop is a silent crop of the Pause Menu recording,13.533-14.233s, x900/y0/w380/h214 from the1280x720 source. Forward/reverse segments are slowed3x to make a continuous4.2-second decorative loop, encoded H.264/MP4. This is a reference-video-derived background, not an extracted game animation curve or original background texture. It pauses under reduced motion. UI sound is opt-in separately from the two-track music player.

Web delivery uses responsive768/1280px WebP versions of the original protagonist, with lossless encoding after normal display-size resampling. The unchanged PNG and full-size lossless WebP remain available. The classroom still is an80-quality WebP frame from the derived video loop. These are delivery optimizations, not new artwork or native-game extraction claims.
