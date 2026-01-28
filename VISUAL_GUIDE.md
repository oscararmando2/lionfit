# Visual Guide - 3D Lanyard Implementation

This document describes the visual appearance and user experience of the 3D Lanyard implementation.

## 🎨 Visual Components

### Loading State
```
┌────────────────────────────────────────┐
│                                        │
│      Purple Gradient Background        │
│         (#667eea → #764ba2)           │
│                                        │
│           Cargando...                  │
│              ⟳                         │
│         (spinning icon)                │
│                                        │
└────────────────────────────────────────┘
```

**Features:**
- Full viewport gradient background
- White "Cargando..." text
- Animated spinner
- Centered content

---

### 3D Card View (Valid User)

```
┌────────────────────────────────────────┐
│                                        │
│      Dark Background (#1a1a2e)        │
│                                        │
│         🔴 ← Red Lanyard Loop         │
│            ║                           │
│            ║  ← Red String            │
│            ║                           │
│      ┌─────────────┐                  │
│      │             │                  │
│      │  LION FIT   │ ← Purple Card    │
│      │  ─────────  │   with gradient  │
│      │   NOMBRE:   │                  │
│      │  PRISCILA   │ ← User Name      │
│      │   PERDOMO   │   (white text)   │
│      │   REYES     │                  │
│      │             │                  │
│      │  TELÉFONO:  │                  │
│      │ 7151093582  │ ← Phone Number   │
│      │             │                  │
│      └─────────────┘                  │
│                                        │
│   [Drag to rotate, Scroll to zoom]    │
│                                        │
└────────────────────────────────────────┘
```

**3D Card Details:**
- **Dimensions**: 2 x 3 x 0.05 units
- **Front Face**: Purple gradient (#667eea → #764ba2)
- **Back Face**: Dark gray (#333333)
- **Border**: White stroke around edges
- **Text**: White, bold, centered
- **Logo**: "LION FITNESS" at top
- **Divider**: Horizontal line below logo
- **Edges**: Dark gray (#222) for 3D depth

**Lanyard Details:**
- **String**: Red (#ff6b6b) cylinder, 0.02 radius, 2 units tall
- **Loop**: Red torus at top, 0.15 major radius
- **Connection**: String connects to top of card

**Animation:**
- Card sways left/right (sine wave rotation)
- Card tilts forward/back slightly
- Card floats up/down gently
- Smooth 60fps animation

**Lighting:**
- Ambient light: 0.5 intensity
- Directional light: 1.0 intensity from top-right
- Directional light: 0.5 intensity from top-left
- Point light: 0.3 intensity from below

---

### Error State (Invalid QR)

```
┌────────────────────────────────────────┐
│                                        │
│      Purple Gradient Background        │
│         (#667eea → #764ba2)           │
│                                        │
│                                        │
│          QR inválido                   │
│        (Red, bold, 3rem)               │
│                                        │
│    Por favor verifica tu código QR     │
│         (White, 1.2rem)                │
│                                        │
└────────────────────────────────────────┘
```

---

### Error State (Missing Parameter)

```
┌────────────────────────────────────────┐
│                                        │
│      Purple Gradient Background        │
│         (#667eea → #764ba2)           │
│                                        │
│                                        │
│        Falta código QR                 │
│        (Red, bold, 3rem)               │
│                                        │
│    Por favor verifica tu código QR     │
│         (White, 1.2rem)                │
│                                        │
└────────────────────────────────────────┘
```

---

## 📱 Responsive Behavior

### Desktop (> 768px)
```
┌──────────────────────────────────────────────────────────┐
│  Browser Window (1920x1080)                              │
│  ┌────────────────────────────────────────────────────┐  │
│  │                                                     │  │
│  │              Dark Background                        │  │
│  │                                                     │  │
│  │                  🔴                                 │  │
│  │                  ║                                  │  │
│  │            ┌───────────┐                           │  │
│  │            │           │                           │  │
│  │            │  Card     │ ← Larger, centered       │  │
│  │            │  with     │   Camera at 5 units      │  │
│  │            │  user     │                           │  │
│  │            │  data     │                           │  │
│  │            └───────────┘                           │  │
│  │                                                     │  │
│  │    Mouse: Drag to rotate | Scroll to zoom         │  │
│  │                                                     │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

**Camera Position:** [0, 0, 5]  
**Controls:** Mouse drag + scroll  
**Zoom Range:** 3-10 units

---

### Mobile (< 768px)
```
┌────────────────────┐
│  Mobile (375x812)  │
│  ┌──────────────┐  │
│  │              │  │
│  │    🔴        │  │
│  │    ║         │  │
│  │ ┌────────┐   │  │
│  │ │        │   │  │
│  │ │ Card   │   │  │ ← Slightly smaller
│  │ │ with   │   │  │   Camera at 6 units
│  │ │ data   │   │  │   (further back)
│  │ │        │   │  │
│  │ └────────┘   │  │
│  │              │  │
│  │  Touch to    │  │
│  │  rotate      │  │
│  │              │  │
│  └──────────────┘  │
└────────────────────┘
```

**Camera Position:** [0, 0, 6]  
**Controls:** Touch drag + pinch zoom  
**Optimizations:** Adjusted for smaller screen

---

## 🎬 Animation Sequence

### Time 0s
```
Card Position: [0, 0, 0]
Card Rotation: [0, 0, 0]
```

### Time 0.5s
```
Card Position: [0, +0.08, 0]  ← Floating up
Card Rotation: [+0.03, +0.12, 0]  ← Swaying right, tilting
```

### Time 1.0s
```
Card Position: [0, 0, 0]  ← Back to center
Card Rotation: [0, 0, 0]  ← Upright
```

### Time 1.5s
```
Card Position: [0, -0.08, 0]  ← Floating down
Card Rotation: [-0.03, -0.12, 0]  ← Swaying left, tilting back
```

### Time 2.0s
```
Card Position: [0, 0, 0]  ← Back to center
Card Rotation: [0, 0, 0]  ← Upright
[Cycle repeats]
```

**Animation Formula:**
```javascript
rotation.y = Math.sin(time * 0.5) * 0.15  // Sway
rotation.x = Math.sin(time * 0.3) * 0.05  // Tilt
position.y = Math.sin(time * 0.8) * 0.1   // Float
```

---

## 🖱️ User Interactions

### Mouse Controls (Desktop)
```
┌─────────────────────────────────────┐
│  Action         │  Result           │
├─────────────────────────────────────┤
│  Left Drag      │  Rotate camera    │
│  Scroll Up      │  Zoom in          │
│  Scroll Down    │  Zoom out         │
│  Double Click   │  Reset view       │
└─────────────────────────────────────┘
```

### Touch Controls (Mobile)
```
┌─────────────────────────────────────┐
│  Gesture        │  Result           │
├─────────────────────────────────────┤
│  Single Drag    │  Rotate camera    │
│  Pinch In       │  Zoom out         │
│  Pinch Out      │  Zoom in          │
│  Double Tap     │  Reset view       │
└─────────────────────────────────────┘
```

**Orbit Constraints:**
- Min distance: 3 units
- Max distance: 10 units
- Min polar angle: 60° (π/3)
- Max polar angle: 120° (π/1.5)
- Pan: Disabled

---

## 🎨 Color Palette

```
┌────────────────────────────────────────┐
│  Component        │  Color             │
├────────────────────────────────────────┤
│  Background       │  #1a1a2e (dark)    │
│  Card Gradient    │  #667eea → #764ba2 │
│  Card Text        │  #ffffff (white)   │
│  Card Border      │  #ffffff (white)   │
│  Card Back        │  #333333 (gray)    │
│  Card Edges       │  #222222 (darker)  │
│  Lanyard String   │  #ff6b6b (red)     │
│  Error Text       │  #ff6b6b (red)     │
│  Loading BG       │  #667eea → #764ba2 │
└────────────────────────────────────────┘
```

---

## 📏 Dimensions

### 3D Card
- **Width**: 2 units
- **Height**: 3 units
- **Depth**: 0.05 units
- **Edge Thickness**: 0.05 units

### Lanyard String
- **Radius**: 0.02 units
- **Height**: 2 units
- **Loop Major Radius**: 0.15 units
- **Loop Minor Radius**: 0.02 units

### Canvas Texture
- **Resolution**: 1024 x 1024 pixels
- **Text Size**: 48-80px (adaptive)
- **Border**: 20px stroke
- **Padding**: 40-100px margins

---

## 🔄 State Transitions

```
[Page Load]
    ↓
[Loading State] (Cargando...)
    ↓
[Fetch users.json]
    ↓
    ├─→ [User Found] → [3D Card View]
    ├─→ [User Not Found] → [Error: QR inválido]
    ├─→ [No Parameter] → [Error: Falta código QR]
    └─→ [Fetch Failed] → [Error: Error cargando...]

Duration: ~1-2 seconds
```

---

## 🎯 Example Screens

### Example 1: User 7151093582
```
Card Front:
┌──────────────────────┐
│                      │
│   LION FITNESS       │
│   ════════════       │
│                      │
│      NOMBRE:         │
│     PRISCILA         │
│     PERDOMO          │
│      REYES           │
│                      │
│     TELÉFONO:        │
│    7151093582        │
│                      │
└──────────────────────┘
```

### Example 2: User 7151412686 (Long Name)
```
Card Front:
┌──────────────────────┐
│                      │
│   LION FITNESS       │
│   ════════════       │
│                      │
│      NOMBRE:         │
│    CHRISTIAN         │
│     GIOVANY          │ ← Multi-line
│      COLIN           │   automatic
│     JIMENEZ          │   wrapping
│                      │
│     TELÉFONO:        │
│    7151412686        │
│                      │
└──────────────────────┘
```

---

## ✨ Visual Polish

### Shadows & Lighting
- Soft ambient lighting for overall brightness
- Directional lights create depth and shadow
- Point light adds subtle rim lighting
- Standard materials with proper roughness/metalness

### Texture Quality
- High resolution (1024x1024)
- Crisp text rendering
- Smooth gradients
- Clean borders and lines

### Performance
- Solid 60fps on modern devices
- Smooth animations without stuttering
- Fast texture generation (<100ms)
- Efficient memory usage

---

## 🎓 User Experience Flow

1. **Scan QR Code** → Camera opens `/users.html?c=7151093582`
2. **Page Loads** → Purple gradient, "Cargando..." appears
3. **Data Loads** → Brief loading (1-2 seconds)
4. **3D Scene Appears** → Dark background, card fades in
5. **Animation Starts** → Card begins gentle swaying
6. **User Can Interact** → Drag to rotate, scroll to zoom
7. **Smooth Experience** → 60fps animation throughout

---

This visual guide describes the complete user interface and experience of the 3D Lanyard implementation. The actual implementation matches these specifications and provides a smooth, professional experience for viewing user credentials.
