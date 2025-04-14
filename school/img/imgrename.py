import os

def rename_images():
    # Get all image files in the current directory (root folder)
    image_files = [f for f in os.listdir() if f.lower().endswith(('.png', '.jpg', '.jpeg'))]

    # Sort files to ensure correct order
    image_files.sort()

    # Rename files sequentially
    for index, file in enumerate(image_files, start=1):
        ext = file.split('.')[-1]  # Get file extension
        new_name = f"{index}.{ext}"
        
        os.rename(file, new_name)
        print(f"Renamed: {file} → {new_name}")

# Run the function
rename_images()
