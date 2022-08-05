from app.models.core import CoreModel, DateTimeModelMixin, IDModelMixin


class FileBase(CoreModel):
    filename_disk: str
    title: str


class FileCreate(FileBase):
    pass


class FileUpdate(FileBase):
    pass


class FileInDB(IDModelMixin, FileBase, DateTimeModelMixin):
    pass


class FilePublic(IDModelMixin, FileBase, DateTimeModelMixin):
    pass
