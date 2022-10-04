export class FileModel {
  public taskId: string;
  public file: File;
  constructor(taskId: string, uploadedFile: File) {
    this.taskId = taskId;
    this.file = uploadedFile;
  }
}
