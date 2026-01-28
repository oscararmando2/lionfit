# Testing Guide for 3D Lanyard Implementation

This guide will help you test the 3D Lanyard implementation locally.

## Prerequisites

- Node.js 16+ installed
- Modern browser with WebGL support (Chrome, Firefox, Safari, Edge)

## Quick Start Testing

### 1. Install Dependencies

```bash
npm install
```

This will install all required dependencies including:
- React 18
- @react-three/fiber
- @react-three/drei
- @react-three/rapier
- Three.js
- Vite

### 2. Run Development Server

```bash
npm run dev
```

The development server will start, typically on `http://localhost:5173/`

### 3. Test Valid User IDs

Open your browser and test these URLs:

#### Test User 1: PRISCILA PERDOMO REYES
```
http://localhost:5173/users.html?c=7151093582
```
**Expected Result**: 3D card displaying:
- Name: PRISCILA PERDOMO REYES
- Phone: 7151093582
- Interactive 3D card with lanyard swaying animation

#### Test User 2: CHRISTIAN GIOVANY COLIN JIMENEZ
```
http://localhost:5173/users.html?c=7151412686
```
**Expected Result**: 3D card displaying:
- Name: CHRISTIAN GIOVANY COLIN JIMENEZ
- Phone: 7151412686

#### Test User 3: YARELY RUIZ TIRADO
```
http://localhost:5173/users.html?c=7150000000
```
**Expected Result**: 3D card displaying:
- Name: YARELY RUIZ TIRADO
- Phone: 7150000000

### 4. Test Error Conditions

#### Invalid User ID
```
http://localhost:5173/users.html?c=9999999999
```
**Expected Result**: Red error message saying "QR inválido"

#### Missing Parameter
```
http://localhost:5173/users.html
```
**Expected Result**: Error message saying "Falta código QR"

## What to Look For

### Visual Elements

1. **3D Card**
   - Card should be centered in the viewport
   - Card displays user name and phone number
   - Card has a gradient purple background
   - Card has white text and borders
   - Card has depth (3D effect)

2. **Lanyard String**
   - Red cylindrical string above the card
   - Loop at the top of the string
   - String connects to the top of the card

3. **Animation**
   - Card gently sways left and right
   - Card tilts slightly
   - Card moves up and down smoothly
   - Animation should be smooth (60fps if possible)

4. **Interactivity**
   - Mouse drag to rotate camera view
   - Scroll to zoom in/out
   - Touch gestures work on mobile

### Responsive Behavior

#### Desktop (width > 768px)
- Card should be visible at comfortable distance
- Full 3D scene with good depth
- Smooth animations

#### Mobile (width < 768px)
- Card automatically adjusts distance for smaller screen
- Touch controls work properly
- Text remains readable

### Loading States

1. **Initial Load**
   - Shows "Cargando..." with spinner
   - Purple gradient background
   - Loading should complete within 1-2 seconds

2. **Error States**
   - "QR inválido" in red for invalid IDs
   - "Falta código QR" when no parameter
   - "Error cargando base de datos" if fetch fails

## Production Build Testing

### Build the Project

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

This starts a local server to preview the production build.

### Test Build Output

```bash
node test-build.cjs
```

This runs automated tests to verify:
- ✓ All required files exist
- ✓ users.json is valid
- ✓ users.html has correct structure
- ✓ Assets are properly bundled

## Browser Compatibility Testing

Test in multiple browsers:

- [ ] Chrome/Chromium (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

## Performance Testing

### Check FPS
1. Open browser DevTools
2. Go to Performance/Rendering tab
3. Enable "FPS meter"
4. Should maintain 60fps or close to it

### Check Bundle Size
```bash
npm run build
```

Look for output showing bundle sizes:
- Total JS bundle should be ~1MB (Three.js is large)
- CSS bundle should be small (~1-2KB)
- This is normal for 3D applications

## Deployment Testing

### GitHub Pages

1. Set `base` in `vite.config.js`:
   ```js
   base: '/lionfit/',
   ```

2. Build and deploy:
   ```bash
   npm run build
   # Deploy dist/ folder to gh-pages branch
   ```

3. Test at:
   ```
   https://yourusername.github.io/lionfit/users.html?c=7151093582
   ```

### Vercel

1. Connect GitHub repo to Vercel
2. Vercel auto-detects Vite
3. Deploy automatically on push
4. Test at your Vercel URL

## Troubleshooting

### Issue: 3D Scene is Black or Empty
**Solutions:**
- Check browser console for WebGL errors
- Ensure WebGL is enabled in browser settings
- Try disabling browser extensions
- Test in incognito/private mode

### Issue: Text Not Visible on Card
**Solutions:**
- Check if texture generation is working (console logs)
- Verify Canvas2D is supported
- Try refreshing the page

### Issue: Slow Performance
**Solutions:**
- Close other browser tabs
- Reduce window size
- Check if GPU acceleration is enabled
- Test on different device

### Issue: Users.json Not Loading
**Solutions:**
- Check network tab in DevTools
- Verify users.json is in public/ folder
- Check CORS headers if deployed
- Verify JSON is valid

### Issue: "Module not found" Errors
**Solutions:**
- Run `npm install` again
- Delete `node_modules/` and reinstall
- Clear npm cache: `npm cache clean --force`

## Expected User Experience

1. **Scan QR Code** → Opens `/users.html?c=USER_ID`
2. **Loading Screen** (1-2 seconds) → "Cargando..." with spinner
3. **3D Card Appears** → Smooth fade-in
4. **User Data Visible** → Name and phone clearly displayed
5. **Interactive** → Can rotate/zoom the card
6. **Smooth Animation** → Card sways gently and continuously

## Test Checklist

- [ ] npm install completes without errors
- [ ] npm run dev starts server successfully
- [ ] Valid user IDs show 3D card with correct data
- [ ] Invalid user IDs show "QR inválido" error
- [ ] Missing parameter shows "Falta código QR" error
- [ ] 3D card animates smoothly
- [ ] Can interact with card (rotate, zoom)
- [ ] Works on desktop browser
- [ ] Works on mobile browser
- [ ] npm run build completes successfully
- [ ] Production build serves correctly
- [ ] All test users display correctly
- [ ] Performance is acceptable (30+ fps)

## Success Criteria

✅ **Implementation is complete when:**
1. All user IDs from users.json display correctly
2. 3D card shows name and phone number
3. Card has smooth swaying animation
4. Interactive controls work
5. Error messages display for invalid codes
6. Responsive on mobile and desktop
7. Build process works without errors
8. Production deployment works

## Questions or Issues?

If you encounter any issues during testing:
1. Check the browser console for error messages
2. Verify all dependencies are installed
3. Ensure you're using a modern browser
4. Try in incognito/private mode
5. Check if WebGL is supported: https://get.webgl.org/

For further assistance, refer to:
- README.md for general documentation
- vite.config.js for build configuration
- src/components/Lanyard.jsx for 3D implementation
