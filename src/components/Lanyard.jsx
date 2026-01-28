import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import './Lanyard.css';

// Card component with dynamic texture
function Card({ nombre, telefono }) {
  const meshRef = useRef();
  const [texture, setTexture] = useState(null);

  // Create dynamic texture with user data
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Background - Black with subtle gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#000000');
    gradient.addColorStop(1, '#1a1a1a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border - Bold white border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 30;
    ctx.strokeRect(45, 45, canvas.width - 90, canvas.height - 90);

    // Logo placeholder - Impact font
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 90px Impact, Arial Black, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('LION FITNESS', canvas.width / 2, 200);

    // Divider line - Thicker and more prominent
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(120, 280, canvas.width - 240, 6);

    // Name label - Impact font
    ctx.font = 'bold 52px Impact, Arial Black, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('NOMBRE:', canvas.width / 2, 420);

    // Name value - handle long names with Impact font
    ctx.font = 'bold 60px Impact, Arial Black, sans-serif';
    const maxWidth = canvas.width - 180;
    let fontSize = 60;
    ctx.font = `bold ${fontSize}px Impact, Arial Black, sans-serif`;
    let textWidth = ctx.measureText(nombre).width;
    
    // Reduce font size if text is too wide
    while (textWidth > maxWidth && fontSize > 32) {
      fontSize -= 2;
      ctx.font = `bold ${fontSize}px Impact, Arial Black, sans-serif`;
      textWidth = ctx.measureText(nombre).width;
    }
    
    // Split into multiple lines if still too long
    const words = nombre.split(' ');
    const lines = [];
    let currentLine = words[0];
    
    for (let i = 1; i < words.length; i++) {
      const testLine = currentLine + ' ' + words[i];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth) {
        lines.push(currentLine);
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine);
    
    // Draw name lines
    const lineHeight = fontSize + 20;
    const startY = 520;
    lines.forEach((line, index) => {
      ctx.fillText(line, canvas.width / 2, startY + (index * lineHeight));
    });

    // Phone label - Impact font
    const phoneY = startY + (lines.length * lineHeight) + 100;
    ctx.font = 'bold 52px Impact, Arial Black, sans-serif';
    ctx.fillText('TELÉFONO:', canvas.width / 2, phoneY);

    // Phone value - Impact font
    ctx.font = 'bold 68px Impact, Arial Black, sans-serif';
    ctx.fillText(telefono, canvas.width / 2, phoneY + 100);

    // Create texture from canvas
    const newTexture = new THREE.CanvasTexture(canvas);
    newTexture.needsUpdate = true;
    
    // Update state and clean up old texture
    setTexture(prevTexture => {
      if (prevTexture) {
        prevTexture.dispose();
      }
      return newTexture;
    });

    // Cleanup on unmount
    return () => {
      if (newTexture) newTexture.dispose();
    };
  }, [nombre, telefono]);

  // Animation
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle swaying motion
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Card front with glass effect */}
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[2, 3, 0.05]} />
        <meshStandardMaterial 
          map={texture} 
          roughness={0.2}
          metalness={0.5}
          transparent={true}
          opacity={0.95}
          envMapIntensity={1.5}
        />
      </mesh>
      
      {/* Card back - White with subtle texture */}
      <mesh position={[0, 0, -0.02]} rotation={[0, Math.PI, 0]}>
        <boxGeometry args={[2, 3, 0.05]} />
        <meshStandardMaterial 
          color="#ffffff"
          roughness={0.5}
          metalness={0.1}
        />
      </mesh>

      {/* Card edges for depth - Black edges */}
      <mesh position={[0, 1.525, 0]}>
        <boxGeometry args={[2, 0.05, 0.05]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0, -1.525, 0]}>
        <boxGeometry args={[2, 0.05, 0.05]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[1.025, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[3, 0.05, 0.05]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[-1.025, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[3, 0.05, 0.05]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  );
}

// Lanyard string component - Black lanyard
function LanyardString() {
  return (
    <group>
      {/* Simple lanyard string */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
        <meshStandardMaterial color="#000000" roughness={0.8} />
      </mesh>
      
      {/* Top loop */}
      <mesh position={[0, 3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.15, 0.02, 8, 16]} />
        <meshStandardMaterial color="#000000" roughness={0.8} />
      </mesh>
    </group>
  );
}

// Scene component
function Scene({ nombre, telefono }) {
  const { viewport } = useThree();
  const isMobile = viewport.width < 7;

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, isMobile ? 6 : 5]} />
      
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />
      <pointLight position={[0, -2, 2]} intensity={0.3} />
      
      {/* Lanyard and Card - Lanyard behind card */}
      <group position={[0, 0, 0]}>
        <group position={[0, 0, -0.1]}>
          <LanyardString />
        </group>
        <Card nombre={nombre} telefono={telefono} />
      </group>
      
      {/* Controls */}
      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        minDistance={3}
        maxDistance={10}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
}

// Main Lanyard component
export default function Lanyard({ nombre, telefono }) {
  return (
    <div className="lanyard-wrapper">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#ffffff']} />
        <Scene nombre={nombre} telefono={telefono} />
      </Canvas>
    </div>
  );
}
