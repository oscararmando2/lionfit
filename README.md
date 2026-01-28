# Lion Fitness - 3D Lanyard User Cards

This project implements a 3D "Lanyard" effect using React + @react-three/fiber to display user information when scanning QR codes.

## Features

- **3D Card Display**: Interactive 3D card hanging from a lanyard
- **Dynamic User Data**: Displays user name and phone number from QR code
- **Responsive Design**: Works on both mobile and desktop
- **Error Handling**: Shows "QR inválido" for invalid codes
- **Dynamic Textures**: User data is rendered directly on the 3D card using Canvas2D

## Installation

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at:
- Main page: `http://localhost:5173/index.html`
- Users page: `http://localhost:5173/users.html?c=USER_ID`

## Building

Build for production:

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Preview Production Build

After building, you can preview the production build:

```bash
npm run preview
```

## Usage

### Viewing a User Card

To view a user's 3D card, navigate to:

```
/users.html?c=USER_ID
```

For example:
- `/users.html?c=7151093582` - Shows PRISCILA PERDOMO REYES
- `/users.html?c=7151412686` - Shows CHRISTIAN GIOVANY COLIN JIMENEZ
- `/users.html?c=7150000000` - Shows YARELY RUIZ TIRADO

### Invalid QR Code

If you provide an invalid or non-existent user ID:
- `/users.html?c=9999999999` - Shows "QR inválido"
- `/users.html` (no parameter) - Shows "Falta código QR"

## Project Structure

```
lionfit/
├── src/
│   ├── components/
│   │   ├── Lanyard.jsx      # Main 3D Lanyard component
│   │   └── Lanyard.css      # Lanyard styles
│   ├── pages/
│   │   └── users.jsx        # Users page component
│   ├── assets/
│   │   └── lanyard/         # 3D assets directory
│   ├── users.jsx            # Entry point for users page
│   └── index.css            # Global styles
├── public/
│   └── users.json           # User database
├── users.html               # Users page HTML template
├── index.html               # Main page HTML
├── vite.config.js           # Vite configuration
└── package.json             # Dependencies and scripts
```

## Technologies Used

- **React 18**: UI framework
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Helper components for Three.js
- **@react-three/rapier**: Physics engine (optional)
- **Three.js**: 3D graphics library
- **Vite**: Build tool and dev server

## 3D Assets

The Lanyard component creates the 3D card programmatically using Three.js primitives. To use custom 3D models:

1. Place your `card.glb` file in `src/assets/lanyard/`
2. Place your `lanyard.png` texture in `src/assets/lanyard/`
3. Update the Lanyard component to load these assets

## Customization

### Modifying Card Appearance

Edit `src/components/Lanyard.jsx`:
- Change colors in the `Card` component texture generation
- Adjust card dimensions in the `boxGeometry` args
- Modify animation in the `useFrame` hook

### Adding More User Data

1. Update `public/users.json` with additional user data
2. Modify `src/pages/users.jsx` to pass additional props
3. Update the texture generation in `Lanyard.jsx` to display new fields

## Deployment

### GitHub Pages

1. Update `base` in `vite.config.js` to your repository name:
   ```js
   base: '/lionfit/',  // Replace with your repo name
   ```

2. Build and deploy:
   ```bash
   npm run build
   # Deploy the dist/ folder to GitHub Pages
   ```

### Vercel

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Vite and build correctly
3. No configuration needed - it will work with the default settings

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

WebGL support is required for 3D rendering.

## Troubleshooting

### 3D Scene Not Rendering

- Check browser console for WebGL errors
- Ensure your device supports WebGL
- Try disabling hardware acceleration if issues persist

### Users.json Not Loading

- Ensure `public/users.json` exists
- Check network tab in browser dev tools
- Verify the file is being served correctly

### Build Warnings About Chunk Size

This is normal due to Three.js size. To reduce bundle size:
- Use dynamic imports for the Lanyard component
- Configure manual chunks in `vite.config.js`

## License

© 2024-2026 Lion Fitness. All rights reserved.
