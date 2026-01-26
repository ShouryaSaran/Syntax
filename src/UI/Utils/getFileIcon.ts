const overrides: Record<string, string> = {
  ts: "file_type_typescript.svg",
  tsx: "file_type_reactts.svg",
  jsx: "file_type_reactjs.svg",
};

export const getFileIcon = (extension?: string) => {
  if (!extension) return "/file-icons/default_file.svg";

  const ext = extension.toLowerCase();

  if (overrides[ext]) {
    return `/file-icons/${overrides[ext]}`;
  }

  return `/file-icons/file_type_${ext}.svg`;
};
