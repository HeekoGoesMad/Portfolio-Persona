# Reference ledger

## Source boundary
Sources: `N:\Game\Pause Menu - Persona 3 Reload.mp4` (167.233s, 1280x720, 30fps), `D:\recording videos\unknown\unknown_replay_2026.10.19-15.22.mp4` (90.016s, 1920x1080, 60fps), and `N:\Game\Persona 3 Reload`.

REA evidence `ev_9536f85d2f72cc3fde61c24b94d49ca83a4db4cb2a209b078c4e5680415ded2d` (re-verifying earlier `ev_1ee6d50814b6fd6a11930c46298e9d903aac5289d5728687908e88aafbaba786`): `inspect_pe_resources` of `P3R/Binaries/Win64/P3R.exe`, SHA256 `12232d47e7f32eee2efd9557d0e3b3303840a9a0f03ece7bd72843aa94aeede9`, 366252480 bytes, PE32+, 29 examined entries and 12 embedded Windows resources (6 `RT_ICON` entries at 16x16 to 256x256, 3 `RT_DIALOG` entries, 1 `RT_GROUP_ICON`, 1 `RT_VERSION`, 1 `RT_MANIFEST`). Bonus executables inspected via REA: `P3R_Artbook.exe` (`ev_ac78811147fd82dc9ac0ae9801333b1c658807ec72d2fa2452416288fe177800`, SHA256 `1362369afdcbefa68344690e9854d66227fb4c19931c52d0c1ca6da687221b6b`, 80962560 bytes, 12 resources) and `P3R_Soundtrack.exe` (`ev_68130cb548dbb1a762bd9373aabc87d8fdce8455267bd77ddd58c86cfa439a06`, SHA256 `e749f9b8e5a42d0b8757292a2a13d27a84351177b6c116a25739adc943196946`, 80962560 bytes, 12 resources). This inspected the complete bounded PE resource trees, not packaged Unreal UI assets or internal menu code. The directory contains `.pak`/`.utoc`/`.ucas` IoStore containers; bonus-app audio/artbook assets were recovered from unencrypted IoStore containers as documented in `docs/persona-assets.md`. No game was launched or changed.

## Observed navigation and visual states
| Pattern | Observed evidence | Reference |
|---|---|---|
| Main menu | Compact vertical list, large slanted uppercase labels, cyan inactive text, white active entry on dark/pink framing | Pause 13.533-14.267s and22.000-22.933s |
| Hierarchy | Main > Equip > character/item selection; back restores main with Equip highlighted | Pause14.300-21.967s |
| Project-preview analogue | Compact list paired with large artwork/detail region; white active row with dark type among dark rows | Pause14.800s,23.400s,85-105s |
| Tabs | L/R control hints around selectors; content switches inside shared scene | Pause15-20s,30s,75-80s,90-105s |
| Continuity | Blue environment remains behind changing foreground artwork, panels and masks | Pause13-23s |
| Staging | Silhouette mask expands, destination list appears, large artwork follows | Pause14.300-14.800s,22.967-23.400s |
| Settings | Category list > rows > capsule controls, contextual explanation above and persistent footer hints | Personal20s,25s,32s,50s |
| Settings selection | White active row, thin pink edge, cyan inactive labels, dark capsules with white active segments | Personal25s,32s,50s |
| Accent nuance | Pink strip and white strip coexist on separate rows; pink alone does not establish keyboard selection | Personal20s |
| Scrolling/sliders | Narrow dark scrollbar; white thumb and active track inside dark capsule | Personal25s,32s,50s |

## Measured visible transition windows
Measured at consecutive 30fps source frames. Uncertainty is approximately +/-1 frame at each boundary; artwork settling is perceptual. These are visible recording intervals, NOT engine constants, input latency or recovered easing curves.

| Transition | Start (seconds) | End criterion (seconds) | Approximate interval |
|---|---:|---:|---:|
| Main > Equip |14.300 (14.267 still stable)|14.800 readable content|500ms /15 frame intervals|
| Equip > Main |21.733 (21.700 still stable)|21.967-22.000 layout established|267ms /8 intervals|
| Main > Persona list |22.967 (22.933 still stable)|23.267 list uncovered|300ms /9 intervals|
| Persona artwork entrance |23.267|23.400 composition established|133ms /4 intervals|
| Main > Persona complete |22.967|23.400|433ms /13 intervals|

## Inferences and unknowns
Hover versus keyboard attribution of the two settings highlights is inferred, not established. Exact easings, real input mappings, list boundary wrapping, interruption policy, focus restoration, confirmation-dialog timing, and packaged UI internals are unresolved. The recordings do not establish those facts. A broader native investigation is not represented as complete.

## Proposed web adaptations
Use normal routes/history for hierarchy; persistent scene, angled framing, immediate list selection and larger previews. Use original artwork instead of game characters. White means selected/focused; pink is an edge/hover accent. Use120/240/360ms web tokens with transform/opacity staging. These are deliberate web choices informed by the visible sequences. Reduced motion removes decorative staging. Native buttons/checkboxes provide semantics; keyboard hints remain secondary.
