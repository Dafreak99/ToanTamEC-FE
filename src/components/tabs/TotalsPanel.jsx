import React, { useState } from "react";
import Table from "../Table";
import note from "../../images/add-notes.svg";
import { Button, useToast } from "@chakra-ui/react";
import { IoAdd } from "react-icons/io5";
import * as XLSX from "xlsx";
import Spinner from "../Spinner";

function TotalsPanel() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const toast = useToast();

  const onChange = (e) => {
    setLoading(true);
    const [file] = e.target.files;
    const reader = new FileReader();

    let extName = file.name.split(".").pop();

    if (extName !== "xlsx") {
      toast({
        description: "Vui lòng tải lên tập tin .xlsx",
        status: "error",
        position: "top-right",
      });
    }

    reader.onload = async (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils
        .sheet_to_json(ws, {
          header: 1,
          defval: null,
        })
        .map((each) => {
          each.splice(each.length - 1, 1);
          return each;
        });
      console.log("original converted JSON format", data);

      const newData = data.map((row, index) => {
        if (index === 0) return row;
        else {
          return row.map((col, colIndex) => {
            if (col === null) return col;

            return {
              value: col,
              status: "blank",
              edited: false,
            };
          });
        }
      });

      processTableData(newData);
      setLoading(false);
    };

    reader.readAsBinaryString(file);
  };

  const processTableData = (data) => {
    let formatted = {
      headings: [],
      content: {},
    };

    formatted.headings.push(...data[0]);

    let currentContent;
    for (let i = 1; i < data.length; i++) {
      // content location
      if (data[i][0]?.value.match(/^[1-9]\//)) {
        currentContent = data[i][0];
        formatted.content = {
          ...formatted.content,
          [currentContent.value]: [],
        };
      } else {
        formatted.content[currentContent.value].push(data[i]);
      }
    }

    const { headings } = formatted;

    let formattedHeadings = [];
    let isParent = false;

    headings.forEach((heading, index) => {
      if (heading.match(/^[MDCLXVI]{0,}\./)) {
        formattedHeadings.push({
          type: "parent",
          value: heading,
          content: [],
          count: index,
        });
        isParent = true;
      } else if (isParent) {
        formattedHeadings[formattedHeadings.length - 1].content.push({
          type: "child",
          value: heading,
          count: index,
        });
      } else {
        formattedHeadings.push({
          type: "child",
          value: heading,
          count: index,
        });
      }
    });

    let rows = data.map((row) => row[0]);

    setData({
      ...formatted,
      formattedHeadings,
      original: data,
      rows,
    });
  };

  console.log("all data", data);

  const removeCol = (index) => {
    let { original } = data;
    let result = original.map((row) => {
      row.splice(index, 1);
      return row;
    });

    processTableData(result);

    toast({
      status: "success",
      duration: 1000,
      position: "bottom-right",
      title: "Xoá thành công!",
    });
  };

  const editCell = (rowIdx, colIdx, newData) => {
    const { original } = data;
    let newRow = [...original[rowIdx]];

    newRow[colIdx] = {
      ...newRow[colIdx],
      value: +newData.quantity,
      edited: false,
      status: newData.assessment,
    };

    original[rowIdx][colIdx].edited = true;

    // add new row
    original.splice(rowIdx + 1, 0, newRow);

    processTableData(original);
  };

  const removeRow = (index) => {
    let { original } = data;
    original.splice(index, 1);

    processTableData(original);
    toast({
      status: "success",
      duration: 1000,
      position: "bottom-right",
      title: "Xoá thành công!",
    });
  };

  const removeExpandableCol = (index) => {
    // 1. remove these cols in all rows
    const { formattedHeadings, original } = data;

    let result = original.map((row) => {
      row.splice(index, formattedHeadings[index].content.length + 1);
      return row;
    });

    processTableData(result);

    toast({
      status: "success",
      duration: 1000,
      position: "bottom-right",
      title: "Xoá thành công!",
    });

    // 2. Update the roman number in heading => II. becomes I.
  };

  const removeExpandableRow = (index) => {
    // 1. remove these cols in all rows
    const { content, original, rows } = data;

    let LOCATION = rows[index];

    let locations = Object.entries(content);
    let from = 1;
    let to = 1;

    for (let i = 0; i < locations.length; i++) {
      if (locations[i][0] === LOCATION) {
        to += locations[i][1].length;
        break;
      } else {
        from += locations[i][1].length + 1;
        to += locations[i][1].length + 1;
      }
    }
    original.splice(from, to - from + 1);

    processTableData(original);

    toast({
      status: "success",
      duration: 1000,
      title: "Xoá thành công!",
    });
    // 2. Update the roman number in heading => II. becomes I.
  };

  const addLocation = (submittedData) => {
    const { original, content } = data;

    let temp = Array.from({ length: original[0].length }, (_, i) => {
      if (i === 0) {
        return `${Object.keys(content).length + 1}/ ${
          submittedData.locationName
        }`;
      }
      return null;
    });

    original.push(temp);

    processTableData(original);
  };

  const addMaterial = (submittedData) => {
    const { original } = data;

    let newOriginal = original.map((row, i) => {
      if (i === 0) {
        row.push(submittedData.materialName);
      } else {
        row.push(null);
      }
      return row;
    });

    processTableData(newOriginal);
  };

  if (isLoading) {
    return (
      <div className="py-8 flex flex-col justify-center items-center">
        <Spinner />
        <p>Đang xử lý dữ liệu...</p>
      </div>
    );
  }

  return (
    <>
      {data ? (
        <>
          <Table
            {...{
              data,
              removeCol,
              removeRow,
              removeExpandableCol,
              removeExpandableRow,
              addLocation,
              addMaterial,
              editCell,
            }}
          />
        </>
      ) : (
        <div className="py-8 flex flex-col justify-center items-center">
          <img src={note} alt="note" className="w-5/12 h-56" />
          <p className="mt-10 mb-5 text-xl font-semibold">Chưa có dữ liệu</p>
          <Button
            as="label"
            htmlFor="file"
            leftIcon={<IoAdd color="#fff" />}
            background="primary"
            color="white"
            variant="solid"
          >
            Tải tệp .xlsx
          </Button>
          <input type="file" id="file" onChange={onChange} className="hidden" />
        </div>
      )}
    </>
  );
}

export default TotalsPanel;
