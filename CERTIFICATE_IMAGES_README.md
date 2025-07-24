# Certificate Images Setup Guide

## How to Add Your Certificate Images

To display your certificate images in the portfolio, follow these steps:

### 1. Image Location
Place your certificate images in the following directory:
```
public/images/certificates/
```

### 2. Required Certificate Images
You need to add these specific image files:

- `business-analytics-cert.jpg` - Business Analytics Professional Certificate
- `google-bi-cert.jpg` - Google Business Intelligence Professional Certificate  
- `strategic-leadership-cert.jpg` - Strategic Leadership and Management Specialization
- `google-data-analytics-cert.jpg` - Google Data Analytics Professional Certificate
- `itcilo-cert.jpg` - ITCILO Certificate
- `solvit-cert.jpg` - SOLVIT AFRICA Certificate
- `klab-cert.jpg` - kLab Rwanda Certificate
- `rwanda-ict-cert.jpg` - Rwanda ICT Chamber Certificate

### 3. Image Format Requirements
- **Format**: JPG, PNG, or WebP
- **Size**: Recommend 1200x800px or similar aspect ratio (3:2)
- **Quality**: High resolution for best display
- **File Size**: Keep under 2MB per image for optimal loading

### 4. Image Naming Convention
Use the exact filenames listed above. The component will automatically display these images when they're available.

### 5. Fallback Behavior
If an image is not found, the component will:
- Show a placeholder background
- Display the certificate information without the image
- Continue to function normally

### 6. Testing
After adding your images:
1. Start the development server: `npm run dev`
2. Navigate to the certificates section
3. Verify all images display correctly
4. Check that images scale properly on different screen sizes

### 7. Troubleshooting
- Ensure image filenames match exactly (case-sensitive)
- Check that images are in the correct directory
- Verify image formats are supported
- Clear browser cache if images don't update

## Example Directory Structure
```
public/
├── images/
│   ├── certificates/
│   │   ├── business-analytics-cert.jpg
│   │   ├── google-bi-cert.jpg
│   │   ├── strategic-leadership-cert.jpg
│   │   ├── google-data-analytics-cert.jpg
│   │   ├── itcilo-cert.jpg
│   │   ├── solvit-cert.jpg
│   │   ├── klab-cert.jpg
│   │   └── rwanda-ict-cert.jpg
│   └── [other images]
└── [other files]
```

Once you add your certificate images with these exact names, they will automatically appear in your portfolio! 