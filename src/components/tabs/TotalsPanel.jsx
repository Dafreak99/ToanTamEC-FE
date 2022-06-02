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

    let formatted = {
      headings: [],
      content: {},
    };

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log("original converted JSON format", data);

      formatted.headings.push(...data[0]);

      let currentContent;
      for (let i = 1; i < data.length; i++) {
        // content location
        if (data[i].length === 1) {
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
      setData({ ...formatted, formattedHeadings, toggleHeadings });

      setLoading(false);
    };

    reader.readAsBinaryString(file);
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
    <div className="py-8 flex flex-col justify-center items-center">
      {data ? (
        <Table data={data} />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default TotalsPanel;
