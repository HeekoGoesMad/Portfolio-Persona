# Animation review

Applied review-animations and improve-animations to the stronger Persona revision. Baseline4ed489b; audit plan in plans/001-persona-motion.md.

| Before | After | Why |
|---|---|---|
| Focus and pointer hover both restarted a240ms project-preview entrance | Keyboard/focus/hover update immediately; only a deliberate pointer preview may use240ms (src/scripts/projects.ts:53) | Repeated selection should respond immediately |
| Root transition moved the shared scene | Persisted classroom background; only screen-content enters280ms/exits120ms (src/styles/persona.css:119) | Preserve the spatial continuity observed in the game |
| Menu items arrived together and hover movement was ungated |40ms stagger,240ms per item, instant keyboard branch, fine-pointer hover gates (src/styles/persona.css:128) | Game-like staging without blocking control or causing touch hover traps |

## Verdict
**Frequency and interruptibility:** keyboard input disables menu/art/screen travel (persona.css:136,184). Preview state updates immediately. Audio samples use request generation/cancellation; rapid mute prevents queued sounds from playing later. Music requests are serialized by request identity.

**Performance and cohesion:** CSS/WAAPI animate transform/opacity only. No new animation library or frame-driven React state. The classroom loop is actual silent recording-derived video, not a claimed recovered engine effect. Responsive images and opt-in music keep initial delivery small.

**Timing and origin:** strong ease-out `cubic-bezier(0.23,1,0.32,1)`;120ms selection,240ms panels,280ms screen entry,120ms exit,200ms Config opening. The420ms foreground-art entrance is an intentional occasional game composition, close to the observed433ms staged Persona sequence; it never delays input. Modal origin stays centered.

**Accessibility:** system and explicit reduction pause the video and remove positional travel; visible selection, labels and color feedback remain. Native controls and ordinary URLs remain available. Pointer movement is gated; keyboard selection is immediate. Browser tests cover those paths.

**Approve** for the implemented local experience. Live physical-device and assistive-speech checks remain separately disclosed in docs/verification.md.
