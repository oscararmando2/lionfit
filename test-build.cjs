#!/usr/bin/env node

/**
 * Test script to verify the build output
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing build output...\n');

const distDir = path.join(__dirname, 'dist');
const requiredFiles = [
  'users.html',
  'users.json',
  'index.html',
];

let allTestsPassed = true;

// Test 1: Check if dist directory exists
console.log('✓ Test 1: Checking if dist directory exists...');
if (!fs.existsSync(distDir)) {
  console.error('❌ FAIL: dist directory does not exist');
  allTestsPassed = false;
} else {
  console.log('✓ PASS: dist directory exists\n');
}

// Test 2: Check if required files exist
console.log('✓ Test 2: Checking required files...');
requiredFiles.forEach(file => {
  const filePath = path.join(distDir, file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ FAIL: ${file} does not exist`);
    allTestsPassed = false;
  } else {
    const stats = fs.statSync(filePath);
    console.log(`✓ PASS: ${file} exists (${(stats.size / 1024).toFixed(2)} KB)`);
  }
});

// Test 3: Verify users.json contains valid data
console.log('\n✓ Test 3: Validating users.json...');
const usersJsonPath = path.join(distDir, 'users.json');
if (fs.existsSync(usersJsonPath)) {
  try {
    const usersData = JSON.parse(fs.readFileSync(usersJsonPath, 'utf-8'));
    if (Array.isArray(usersData) && usersData.length > 0) {
      console.log(`✓ PASS: users.json is valid (${usersData.length} users)`);
      
      // Check for the test user
      const testUser = usersData.find(u => u.id === '7151093582');
      if (testUser) {
        console.log(`✓ PASS: Test user found: ${testUser.nombre}`);
      } else {
        console.error('❌ FAIL: Test user (7151093582) not found');
        allTestsPassed = false;
      }
    } else {
      console.error('❌ FAIL: users.json is not a valid array or is empty');
      allTestsPassed = false;
    }
  } catch (err) {
    console.error(`❌ FAIL: users.json is not valid JSON: ${err.message}`);
    allTestsPassed = false;
  }
}

// Test 4: Check if users.html has correct script references
console.log('\n✓ Test 4: Checking users.html structure...');
const usersHtmlPath = path.join(distDir, 'users.html');
if (fs.existsSync(usersHtmlPath)) {
  const htmlContent = fs.readFileSync(usersHtmlPath, 'utf-8');
  
  if (htmlContent.includes('type="module"')) {
    console.log('✓ PASS: users.html has module script');
  } else {
    console.error('❌ FAIL: users.html missing module script');
    allTestsPassed = false;
  }
  
  if (htmlContent.includes('assets/users-') && htmlContent.includes('.js')) {
    console.log('✓ PASS: users.html has JS bundle reference');
  } else {
    console.error('❌ FAIL: users.html missing JS bundle reference');
    allTestsPassed = false;
  }
  
  if (htmlContent.includes('assets/users-') && htmlContent.includes('.css')) {
    console.log('✓ PASS: users.html has CSS bundle reference');
  } else {
    console.error('❌ FAIL: users.html missing CSS bundle reference');
    allTestsPassed = false;
  }
}

// Test 5: Check if assets directory exists and has files
console.log('\n✓ Test 5: Checking assets directory...');
const assetsDir = path.join(distDir, 'assets');
if (fs.existsSync(assetsDir)) {
  const assetFiles = fs.readdirSync(assetsDir);
  console.log(`✓ PASS: assets directory exists (${assetFiles.length} files)`);
  
  const hasJsBundle = assetFiles.some(f => f.startsWith('users-') && f.endsWith('.js'));
  const hasCssBundle = assetFiles.some(f => f.startsWith('users-') && f.endsWith('.css'));
  
  if (hasJsBundle) {
    console.log('✓ PASS: users JS bundle found');
  } else {
    console.error('❌ FAIL: users JS bundle not found');
    allTestsPassed = false;
  }
  
  if (hasCssBundle) {
    console.log('✓ PASS: users CSS bundle found');
  } else {
    console.error('❌ FAIL: users CSS bundle not found');
    allTestsPassed = false;
  }
} else {
  console.error('❌ FAIL: assets directory does not exist');
  allTestsPassed = false;
}

// Summary
console.log('\n' + '='.repeat(50));
if (allTestsPassed) {
  console.log('✅ All tests passed! Build is ready for deployment.');
  console.log('\nTo test locally, run:');
  console.log('  npm run preview');
  console.log('\nOr serve the dist/ folder with any static server:');
  console.log('  cd dist && python3 -m http.server 8080');
  process.exit(0);
} else {
  console.error('❌ Some tests failed. Please check the build.');
  process.exit(1);
}
