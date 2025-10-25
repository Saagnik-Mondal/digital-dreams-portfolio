# Parallax Scroll Debug Guide

## Quick Troubleshooting Checklist

### 1. **Check if Parallax Section Exists**
Open your browser's Developer Tools (F12) and run in Console:
```javascript
document.querySelector('#parallax-showcase')
```
Should return the parallax section element. If `null`, the section is missing from HTML.

### 2. **Check if Parallax Layers Exist**
```javascript
document.querySelectorAll('.parallax-layer')
```
Should return 5 elements. If fewer or none, the layers aren't in the HTML.

### 3. **Check if Images Are Loading**
```javascript
const images = document.querySelectorAll('.parallax-bg-img');
images.forEach((img, i) => {
    console.log(`Layer ${i+1}:`, img.style.backgroundImage);
});
```
Should show all 5 images with their file paths.

### 4. **Verify File Paths**
Check that your images exist:
```bash
ls -la assets/parallax/
```
Should show:
- layer1.png
- layer2.png
- layer3.png
- layer4.png
- layer5.png

### 5. **Check CSS Styles Are Applied**
```javascript
const layer = document.querySelector('.parallax-layer');
console.log(window.getComputedStyle(layer).height);
console.log(window.getComputedStyle(layer).display);
```
Height should be "600px" and display should be "flex".

### 6. **Check if Scroll Event is Firing**
Run this in console:
```javascript
window.addEventListener('scroll', () => {
    console.log('Scroll event fired at:', window.scrollY);
});
// Scroll your page
```

### 7. **Check Parallax Showcase Function**
```javascript
console.log(typeof setupParallaxShowcase);
```
Should return "function".

---

## Common Issues & Solutions

### **Issue: Parallax section is not visible**

**Possible Causes:**
1. Section height is 0
2. Content below the section is pushing it
3. Navigation or loading screen is covering it
4. z-index issues

**Solution:**
```javascript
const section = document.querySelector('#parallax-showcase');
console.log('Section height:', section.offsetHeight);
console.log('Section position:', section.getBoundingClientRect());
```

---

### **Issue: Images not loading**

**Possible Causes:**
1. File paths are incorrect
2. Images are in wrong directory
3. File extensions are wrong (.jpg instead of .png)
4. CORS issues (if loading from external source)

**Solution:**
1. Verify files exist:
```bash
ls -lh assets/parallax/layer*.png
```

2. Test loading with correct path:
```javascript
const img = new Image();
img.src = 'assets/parallax/layer1.png';
img.onload = () => console.log('✓ Image loaded');
img.onerror = () => console.log('✗ Image failed to load');
```

---

### **Issue: Parallax effect not working (no scroll effect)**

**Possible Causes:**
1. `setupParallaxShowcase()` not being called
2. `throttle` function not available
3. Mobile device (may disable parallax)
4. Preferes reduced motion setting

**Solution:**
Check if function is being called:
```javascript
// Add this to script.js after setupParallaxShowcase definition
console.log('setupParallaxShowcase is:', typeof setupParallaxShowcase);
setupParallaxShowcase();
console.log('setupParallaxShowcase() executed');
```

---

### **Issue: Text overlays not visible**

**Possible Causes:**
1. Text color is same as background
2. Z-index is too low
3. Opacity is 0
4. Font size is too small

**Solution:**
```javascript
const text = document.querySelector('.parallax-text');
console.log('Text color:', window.getComputedStyle(text).color);
console.log('Text z-index:', window.getComputedStyle(text).zIndex);
console.log('Text opacity:', window.getComputedStyle(text).opacity);
```

---

## Manual Fixes

### **Fix 1: Force Image Loading**
Add this to browser console:
```javascript
const layers = ['layer1.png', 'layer2.png', 'layer3.png', 'layer4.png', 'layer5.png'];
const images = document.querySelectorAll('.parallax-bg-img');

images.forEach((img, i) => {
    const path = `assets/parallax/${layers[i]}`;
    img.style.backgroundImage = `url('${path}')`;
    img.style.backgroundSize = 'cover';
    img.style.backgroundPosition = 'center';
    console.log(`Set background for layer ${i+1}: ${path}`);
});
```

### **Fix 2: Manually Trigger Parallax Setup**
```javascript
setupParallaxShowcase();
console.log('Parallax setup executed manually');
```

### **Fix 3: Check if Mobile Device**
```javascript
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
console.log('Is mobile:', isMobile);
```
If `true`, parallax might be disabled on mobile.

### **Fix 4: Check Prefers Reduced Motion**
```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
console.log('Prefers reduced motion:', prefersReducedMotion);
```
If `true`, parallax is disabled for accessibility.

---

## Files to Check

1. **HTML Structure**
   - File: `index.html`
   - Section: Find `<section id="parallax-showcase">`
   - Should contain 5 `<div class="parallax-layer">` elements

2. **CSS Styles**
   - File: `assets/css/style.css`
   - Lines: 2250-2540 (approximately)
   - Key classes: `.parallax-showcase`, `.parallax-layer`, `.parallax-bg-img`

3. **JavaScript Logic**
   - File: `assets/js/script.js`
   - Functions: `setupParallaxShowcase()`, `loadLocalParallaxImages()`
   - Initialization: Around line 1450-1465

4. **Image Files**
   - Directory: `assets/parallax/`
   - Files: `layer1.png`, `layer2.png`, `layer3.png`, `layer4.png`, `layer5.png`

---

## Testing Checklist

- [ ] Parallax section appears on page
- [ ] Section has 5 visible layers
- [ ] Each layer shows an image
- [ ] Scrolling creates parallax effect (layers move at different speeds)
- [ ] Text overlays are visible
- [ ] Works on desktop
- [ ] Works on mobile/tablet
- [ ] No console errors

---

## Performance Check

```javascript
// Check layer rendering
const layers = document.querySelectorAll('.parallax-layer');
console.log('Total layers:', layers.length);

// Check each layer's properties
layers.forEach((layer, i) => {
    const bgImg = layer.querySelector('.parallax-bg-img');
    console.log(`Layer ${i+1}:`, {
        height: layer.offsetHeight,
        bgImage: bgImg?.style.backgroundImage?.substring(0, 50) + '...',
        zIndex: window.getComputedStyle(layer).zIndex
    });
});
```

---

## Still Not Working?

1. **Clear Browser Cache** (Ctrl+Shift+Del or Cmd+Shift+Del)
2. **Hard Refresh** (Ctrl+Shift+R or Cmd+Shift+R)
3. **Check Browser Console for Errors** (F12 → Console tab)
4. **Try Different Browser** (Chrome, Firefox, Safari)
5. **Check if JavaScript is Enabled** (Browser settings)

---

## Contact Information

If parallax still isn't working after these checks:
1. Copy console errors (F12 → Console)
2. Run the diagnostic commands above
3. Share the results
4. Check that files haven't been corrupted during upload

---

**Last Updated:** October 25, 2025
