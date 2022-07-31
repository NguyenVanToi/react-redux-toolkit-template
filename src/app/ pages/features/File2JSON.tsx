import { FileInput, Label } from 'flowbite-react';
import * as XLSX from 'xlsx';
import { zipObject } from 'lodash';

type AOA = any[][];

const File2JSON = (props: any) => {
  /**
   * Reads import service
   *
   * @param {object} ab ArrayBuffer data
   *
   * @returns {any[]} AOA data
   */
  const read = (ab: ArrayBuffer) => {
    /* read workbook */
    const wb: XLSX.WorkBook = XLSX.read(new Uint8Array(ab), { type: 'array' });

    /* grab first sheet */
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    /* save data */
    return XLSX.utils.sheet_to_json(ws, { header: 1 }) as AOA;
  };

  const handleUpload = (e: any) => {
    const file = e.target.files[0];
    console.log('file', file);
    let dataImport: any = [];
    const header = ['famille', 'category', 'type'];

    try {
      return new Promise((resolve) => {
        const reader: FileReader = new FileReader();

        reader.onload = (e: any) => {
          const ab: ArrayBuffer = e.target.result;
          const rows = read(ab);

          if (rows.length > 0) {
            rows.shift(); // remove first row of header

            rows.forEach((row) => {
              const data = zipObject(header, row);
              dataImport.push(data);
            });
          }

          dataImport = mappingData(dataImport);
          console.log(JSON.stringify(dataImport));
          resolve(dataImport);
        };

        reader.readAsArrayBuffer(file);
      });
    } catch (e: any) {
      console.log('error', e);
      throw new Error(e);
    }
  };

  const mappingData = (data: any[]) => {
    return data.map((item, idx) => {
      if (!item.famille) {
        item.famille = data[idx - 1].famille;
      }
      return item;
    });
  };

  return (
    <div id="fileUpload">
      <div className="mb-2 block">
        <Label htmlFor="file" value="Upload file" />
      </div>
      <FileInput
        id="file"
        helperText="A profile picture is useful to confirm your are logged into your account"
        onChange={handleUpload}
      />
    </div>
  );
};

export default File2JSON;
