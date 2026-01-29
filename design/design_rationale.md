# Design Rationale

This document explains the design decisions behind the Touchless
Reading Interface. The rationale is based on personas, use cases, and
accessibility considerations.

---

## 1. Gesture Design Rationale

| Gesture                  | Why Chosen                                                                 | HCI Notes |
|---------------------------|---------------------------------------------------------------------------|-----------|
| Scroll Up / Down          | Vertical hand movement mimics natural scrolling motion. Works with one hand and minimal precision. | Continuous gesture preferred over discrete swipes to reduce errors. |
| Zoom In / Out             | Pinch gestures are widely understood for zooming. Intuitive and reversible. | Continuous; allows users to zoom gradually without overshooting. |
| Brightness Adjust         | Palm tilt or thumb movement maps naturally to light/dark adjustment.    | Continuous; feedback shown immediately via overlay. Useful in kitchens or labs where lighting changes. |
| Highlight Sentence        | Point + hold mimics physical pointing/marking. Highlights current step or key info. | Discrete; avoids accidental activation during scroll or zoom. |

### Notes
- **Max 4 gestures** prevents cognitive overload.
- Gestures are **one-handed** for cooking/lab use.
- All gestures tolerate **gloves, wet hands, or mild motor limitations**.
- Immediate visual feedback reduces errors and supports learnability.

---

## 2. UI/UX Design Rationale

- **Minimal interface:** Reduces distractions while reading.
- **Centered single-column layout:** Optimizes readability.
- **Neutral background & high contrast text:** Supports users in variable lighting and users with vision impairments.
- **Scroll progress indicator:** Provides orientation within content without requiring precise hand gestures.
- **Temporary gesture hints:** Help first-time users learn gestures without permanent clutter.

---

## 3. Accessibility Rationale

- **Primary persona (Home Cook):** Gestures allow hands-free interaction during cooking or lab scenarios. Reduces contamination and effort.
- **Secondary persona (Motor Impairment):** Gestures reduce need for precise touch, prevent fatigue, allow continuous adjustment.
- **Additional features:**
  - Adjustable gesture sensitivity
  - One-handed operation
  - No time-critical gestures
  - Optional high-contrast mode and adjustable font size

---

## 4. Feedback & Affordance Rationale

- Immediate feedback is prioritized over absolute gesture accuracy.
- Visual cues confirm detected gestures, reducing uncertainty.
- Continuous gestures allow natural control, discrete gestures reserved for deliberate actions (highlighting).

---

## 5. Summary

All design decisions are informed by:
- **Personas** → Who needs this and why
- **Use Cases** → Where the system will be used
- **Accessibility Principles** → How to make interaction inclusive
- **HCI Best Practices** → Cognitive load, learnability, feedback

This document forms the **core justification for the project** in reports, presentations, and evaluation.
