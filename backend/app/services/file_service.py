import shutil
import os
from fastapi import HTTPException, UploadFile
from starlette.status import  HTTP_400_BAD_REQUEST
from app.models.file import FileCreate
from app.utils.random import random_string

allowed_file_extensions = [".jpg", ".jpeg", ".png", ".bmp", ".webp"]


class PictureService():
    def save_picture(self, *,picture: UploadFile, alt_file_name: str = None) -> FileCreate:
        file_name, file_extension = os.path.splitext(picture.filename)
    
        if file_extension not in allowed_file_extensions:
            raise HTTPException(status_code=HTTP_400_BAD_REQUEST,
                                detail=f"File extension '{file_extension}' not allowed.")
    
        file_name_disk = f"{random_string()}-{file_name if alt_file_name is None else alt_file_name}{file_extension}"
    
        with open(f'static/{file_name_disk}', 'wb') as buffer:
            shutil.copyfileobj(picture.file, buffer)
    
        return FileCreate(filename_disk=f"static/{file_name_disk}", title=file_name)
