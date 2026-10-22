import sys
from PIL import Image, ImageEnhance, ImageFilter

def enhance_image(src_path, dest_path):
    img = Image.open(src_path)
    print(f"Original size: {img.size}")
    
    # Convert to RGB if RGBA
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")
    
    # 2x upscale using high quality Lanczos filter
    target_width = img.width * 2
    target_height = img.height * 2
    upscaled = img.resize((target_width, target_height), Image.Resampling.LANCZOS)
    
    # Enhance sharpness for crisp text
    enhancer_sharp = ImageEnhance.Sharpness(upscaled)
    sharpened = enhancer_sharp.enhance(1.4)
    
    # Enhance contrast slightly to make text pop
    enhancer_contrast = ImageEnhance.Contrast(sharpened)
    contrasted = enhancer_contrast.enhance(1.08)
    
    # Unsharp mask for fine typography and edges
    crisp = contrasted.filter(ImageFilter.UnsharpMask(radius=2, percent=120, threshold=3))
    
    # Save with maximum quality
    crisp.save(dest_path, "PNG", optimize=True)
    print(f"Enhanced and saved to {dest_path} with size {crisp.size}")

if __name__ == "__main__":
    src = sys.argv[1]
    dest = sys.argv[2]
    enhance_image(src, dest)
