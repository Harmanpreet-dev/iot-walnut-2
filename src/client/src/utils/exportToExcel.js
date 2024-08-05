import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const exportToExcel = ({ data, filename }) => {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return new Blob([buf], { type: "application/octet-stream" });
  };
  saveAs(s2ab(wbout), filename);
};

export default exportToExcel;
