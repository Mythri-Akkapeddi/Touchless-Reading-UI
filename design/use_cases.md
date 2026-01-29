# Use Cases and Interaction Scenarios

This section describes the primary contexts in which the proposed
touchless reading interface is intended to be used. These scenarios
are derived from the defined personas and are used to guide interaction
design decisions and scope boundaries.

---

## Use Case 1: Cooking While Following a Recipe

### Scenario Description
The user is cooking in a home kitchen and follows a recipe displayed
on a laptop placed on the counter. During the cooking process, the
user’s hands are frequently wet, greasy, or covered in food.

### Environment
- Kitchen counter
- Laptop or tablet at arm’s length
- User standing, occasionally moving

### Constraints
- Touching the screen is unhygienic
- User attention is divided
- Hands are temporarily unavailable

### Interaction Flow
1. User loads a recipe into the reader
2. User scrolls through steps using vertical hand movement
3. User zooms in on specific instructions using a pinch gesture
4. User highlights the current step to keep track of progress
5. User adjusts brightness due to changing kitchen lighting

### Design Implications
- Gestures must work with minimal precision
- Feedback must be clear at a glance
- Gestures must be usable with one hand
- System should tolerate brief hand loss from camera view

---

## Use Case 2: Laboratory Work with Gloves

### Scenario Description
The user is working in a laboratory environment and is following
experimental instructions or protocols displayed on a computer.
The user is wearing gloves and must avoid touching shared equipment
to prevent contamination.

### Environment
- Laboratory bench
- Desktop monitor or laptop
- Controlled but busy workspace

### Constraints
- Gloves reduce touch accuracy
- Touching shared devices risks contamination
- User cannot remove gloves frequently

### Interaction Flow
1. User loads experimental instructions into the reader
2. User scrolls through steps hands-free while wearing gloves
3. User zooms in to read detailed measurements or steps
4. User highlights a step after completing it
5. User pauses interaction when moving away from the workstation

### Design Implications
- Touchless interaction reduces contamination risk
- Gestures must work reliably with gloved hands
- No time-critical gestures
- Clear visual feedback is required due to divided attention

---

## Use Case 3: Motor Accessibility for Reading Tasks

### Scenario Description
The user has mild motor impairments that make precise touch interaction
difficult. The user reads articles, documentation, or instructions
for extended periods.

### Environment
- Desk or seated workspace
- Laptop with webcam

### Constraints
- Limited fine motor control
- Fatigue during prolonged interaction
- Difficulty with small touch targets

### Interaction Flow
1. User pastes text or selects sample content
2. User scrolls using relaxed hand movements
3. User adjusts text size for readability
4. User highlights important sentences
5. User relies on visual feedback to confirm actions

### Design Implications
- Continuous gestures preferred over discrete poses
- Adjustable gesture sensitivity is essential
- Interface must tolerate imprecise input
- No interaction should require rapid movements

---

## Use Case 4: Public or Shared Display Interaction (Optional)

### Scenario Description
The user interacts with a shared computer or display in a public or
semi-public environment, such as a library, study space, or classroom,
where minimizing physical contact is desirable.

### Environment
- Shared workstation
- Variable lighting conditions

### Constraints
- Hygiene concerns
- Shared input devices
- Users may be unfamiliar with the system

### Interaction Flow
1. User loads text content
2. User performs basic reading interactions hands-free
3. User relies on gesture hints to learn interaction quickly

### Design Implications
- Gesture set must be learnable within seconds
- On-screen gesture hints are necessary
- System should default to safe, conservative gesture detection

---

## Scope Boundaries

Based on the above scenarios, the following features are intentionally
excluded from the project:
- Full document management systems
- PDF or complex file parsing
- Multi-user accounts or personalization
- Complex or large gesture vocabularies

The system is designed specifically for **reading-focused interaction**
in constrained or accessibility-oriented contexts.
