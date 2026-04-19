import { getMacros } from "./macro-crud";

export function exportMacros(filename: string) {
  const macros = getMacros();
  const jsonMacros = JSON.stringify(macros);
  const outputBlob = new Blob([jsonMacros], { type: "application/json" });
  const url = window.URL.createObjectURL(outputBlob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `${filename}.macros`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

// export function importMacros(files: FileList) {}
