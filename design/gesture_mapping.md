# Gesture Mapping

This document defines the final gesture set for the Touchless Reading
Interface. All gestures are designed to be simple, low-effort, and
accessible for the personas and use cases defined earlier.

---

## Gesture Set

| Action                  | Gesture (Description)                         | Interaction Type | Feedback |
|-------------------------|----------------------------------------------|----------------|----------|
| Scroll Up / Down         | Move hand vertically up or down              | Continuous     | Page moves smoothly; scroll indicator moves |
| Zoom In / Out            | Pinch fingers together (zoom out) / apart (zoom in) | Continuous | Text scales smoothly; brief animation |
| Brightness Adjust        | Palm tilt forward/back or thumb up/down      | Continuous     | Overlay brightness adjusts smoothly |
| Highlight Sentence       | Point with index finger + hold 1 sec        | Discrete       | Sentence glows / underline appears |

---

## Rejected Gestures

| Action                  | Gesture (Rejected)             | Reason |
|-------------------------|-------------------------------|--------|
| Scroll with swipe left/right | Lateral hand swipe           | Could conflict with zoom or reach limits; less intuitive |
| Scroll by finger tap     | Double tap / swipe with finger | Requires precise motor control; fails for primary persona |
| Zoom with hand rotation  | Rotate hand clockwise/counter | Complex, fatiguing, less intuitive |
| Highlight with double pinch | Pinch + pinch twice          | Too complex; fatigue; low learnability |

---

## Notes / Design Rationale

- **Continuous gestures** were chosen for scroll, zoom, brightness to reduce errors and allow natural motion.
- **Discrete gestures** reserved only for highlighting to prevent accidental activation.
- **Max 4 gestures** prevents cognitive overload.
- All gestures can be performed **one-handed**.
- Feedback is **instantaneous visual confirmation** to reduce user uncertainty.
- System tolerates **gloves, wet hands, and mild motor limitations**.
