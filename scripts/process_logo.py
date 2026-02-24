from PIL import Image
import os

def process_logo(input_path, output_transparent, output_white):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    new_data = []
    white_data = []
    
    for item in datas:
        # If pixel is near white (threshold 240)
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            new_data.append((255, 255, 255, 0))
            white_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            # Create white version: replace any non-transparent pixel with white
            white_data.append((255, 255, 255, 255))

    img.putdata(new_data)
    img.save(output_transparent, "PNG")
    
    img.putdata(white_data)
    img.save(output_white, "PNG")

if __name__ == "__main__":
    base_dir = "/Users/safaeyoussef/Desktop/Goz Tedavileri"
    input_logo = os.path.join(base_dir, "public/images/logo.png")
    out_trans = os.path.join(base_dir, "public/images/logo-transparent.png")
    out_white = os.path.join(base_dir, "public/images/logo-white.png")
    
    process_logo(input_logo, out_trans, out_white)
    print("Processed logo successfuly")
