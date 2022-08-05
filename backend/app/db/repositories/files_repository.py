from fastapi import HTTPException
from starlette.status import HTTP_404_NOT_FOUND
from app.db.repositories.base_repository import BaseRepository
from app.models.file import FileCreate, FileInDB, FileUpdate
from uuid import uuid4

GET_ALL_FILES_QUERY = """
    SELECT * FROM files;
"""

CREATE_FILE_QUERY = """
    INSERT INTO files (id, filename_disk, title)
    VALUES (:id, :filename_disk, :title)
    RETURNING id, filename_disk, title, created_at, updated_at
"""

GET_FILE_BY_ID_QUERY = """
    SELECT * FROM files WHERE id = :id LIMIT 1;
"""


class FileRepository(BaseRepository):
    async def get_all_files(self):
        files_records = await self.db.fetch_all(
            query=GET_ALL_FILES_QUERY,
        )

        return [FileInDB(**r) for r in files_records]

    async def create_file(self, *, new_file: FileCreate) -> FileInDB:
        file = await self.db.fetch_one(
            query=CREATE_FILE_QUERY,
            values={
                **new_file.dict(),
                "id": str(uuid4())
            }
        )

        return FileInDB(**file)

    async def update_file(self, *, file_to_update: FileUpdate) -> FileInDB:
        file = await self.db.fetch_one(
            query=CREATE_FILE_QUERY,
            values={
                **file_to_update.dict(),
            }
        )

        return FileInDB(**file)

    async def get_file_by_id(self, *, id: str) -> FileInDB:
        file = await self.db.fetch_one(
            query=GET_FILE_BY_ID_QUERY,
            values={
                "id": id
            }
        )

        if not file:
            raise HTTPException(status_code=HTTP_404_NOT_FOUND,
                                detail="No file found with that id.")

        return FileInDB(**file)
