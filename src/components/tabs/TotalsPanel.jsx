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

      processTableData(data);
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
      if (data[i][0].match(/^[1-9]\//)) {
        currentContent = data[i][0];
        formatted.content = {
          ...formatted.content,
          [currentContent]: [],
        };
      } else {
        formatted.content[currentContent].push(data[i]);
      }
    }

    console.log("desired JSON data format", formatted);
    const { headings } = formatted;

    let formattedHeadings = [];
    let toggleHeadings = [];
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
        toggleHeadings.push(true);
      } else if (isParent) {
        formattedHeadings[formattedHeadings.length - 1].content.push({
          type: "child",
          value: heading,
          count: index,
        });
        toggleHeadings.push(false);
      } else {
        formattedHeadings.push({
          type: "child",
          value: heading,
          count: index,
        });
        toggleHeadings.push(false);
      }
    });
    console.log(formattedHeadings);
    setData({
      ...formatted,
      formattedHeadings,
      toggleHeadings,
      original: data,
    });
  };

  const removeCol = () => {
    let INDEX = 3;

    let original = data.original;
    let result = original.map((row) => {
      row.splice(INDEX, 1);
      return row;
    });

    processTableData(result);

    toast({
      status: "success",
      duration: 500,
      position: "bottom-right",
      title: "Xoá thành công!",
    });
  };

  const removeRow = () => {
    let INDEX = 3;

    let { original } = data;
    original.splice(INDEX, 1);

    processTableData(original);
    toast({
      status: "success",
      duration: 500,
      position: "bottom-right",
      title: "Xoá thành công!",
    });
  };

  const removeExpandableCol = () => {
    let INDEX = 2;
    // 1. remove these cols in all rows
    const { formattedHeadings, original } = data;

    let result = original.map((row) => {
      row.splice(INDEX, formattedHeadings[INDEX].content.length + 1);
      return row;
    });

    processTableData(result);

    toast({
      status: "success",
      duration: 500,
      position: "bottom-right",
      title: "Xoá thành công!",
    });

    // 2. Update the roman number in heading => II. becomes I.
  };

  const removeExpandableRow = () => {
    let LOCATION = "3/ ĐDTT nhánh Đường Cày";
    // 1. remove these cols in all rows
    const { content, original } = data;

    let locations = Object.entries(content);
    let from = 1;
    let to = 1;

    for (let i = 0; i < locations.length; i++) {
      console.log(locations[i][0]);
      if (locations[i][0] === LOCATION) {
        to += locations[i][1].length;
        break;
      } else {
        from += locations[i][1].length + 1;
        to += locations[i][1].length + 1;
      }
    }
    console.log(original[from], original[to]);
    original.splice(from, to - from);

    console.log(original[from]);

    processTableData(original);

    toast({
      status: "success",
      duration: 500,
      title: "Xoá thành công!",
    });

    // 2. Update the roman number in heading => II. becomes I.
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
          <Button onClick={removeCol}>Remove col (3)</Button>
          <Button onClick={removeRow} ml="4">
            Remove row (3)
          </Button>
          <Button onClick={removeExpandableCol} ml="4">
            Remove expand col
          </Button>
          <Button onClick={removeExpandableRow} ml="4">
            Remove expand row
          </Button>
          <Table data={data} />
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
