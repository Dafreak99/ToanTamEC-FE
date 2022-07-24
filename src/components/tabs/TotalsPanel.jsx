import { Button, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import * as XLSX from 'xlsx';
import note from '../../images/add-notes.svg';
import Spinner from '../Spinner';
import Table from '../Table';

function TotalsPanel() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const toast = useToast();

  const isEdited = (row) => {
    return row.some((col) => col?.edited);
  };

  const processTableData = (tableData) => {
    const formatted = {
      headings: [],
      content: {},
    };

    formatted.headings.push(...tableData[0]);

    let currentContent;
    for (let i = 1; i < tableData.length; i++) {
      // content location
      if (tableData[i][0]?.value.match(/^[1-9]\//)) {
        currentContent = tableData[i][0];
        formatted.content = {
          ...formatted.content,
          [currentContent.value]: [],
        };
      } else {
        formatted.content[currentContent.value].push(tableData[i]);
      }
    }

    // Calculate the last 3 rows of each location
    const keys = Object.keys(formatted.content);

    for (const key of keys) {
      const length = formatted.content[key][0].length;
      const totalArr = [].fill(length);
      const implementedArr = [].fill(length);
      const restArr = [].fill(length);

      totalArr[0] = { value: 'Tổng' };
      implementedArr[0] = { value: 'Đã thi công' };
      restArr[0] = { value: 'Còn lại' };

      for (let i = 1; i < length; i++) {
        let total = 0;
        let implemented = 0;
        let rest = 0;

        for (const element of formatted.content[key]) {
          if (element?.[i] && !isEdited(element)) {
            // count implemented stuff
            if (element[i].status === 'passed') {
              implemented += parseFloat(element[i].value);
            }
            total += parseFloat(element[i].value);
          }
          rest = total - implemented;
        }

        totalArr[i] = { value: total };
        implementedArr[i] = { value: implemented };
        restArr[i] = { value: rest };
      }
      formatted.content[key].push(totalArr, implementedArr, restArr);
    }

    const { headings } = formatted;

    const formattedHeadings = [];
    let isParent = false;

    headings.forEach((heading, index) => {
      if (heading.match(/^[MDCLXVI]{0,}\./)) {
        formattedHeadings.push({
          type: 'parent',
          value: heading,
          content: [],
          count: index,
        });
        isParent = true;
      } else if (isParent) {
        formattedHeadings[formattedHeadings.length - 1].content.push({
          type: 'child',
          value: heading,
          count: index,
        });
      } else {
        formattedHeadings.push({
          type: 'child',
          value: heading,
          count: index,
        });
      }
    });

    const rows = tableData.map((row) => row[0]);

    setData({
      ...formatted,
      formattedHeadings,
      original: tableData,
      rows,
    });
  };

  const onChange = (e) => {
    setLoading(true);
    const [file] = e.target.files;
    const reader = new FileReader();

    const extName = file.name.split('.').pop();

    if (extName !== 'xlsx') {
      toast({
        description: 'Vui lòng tải lên tập tin .xlsx',
        status: 'error',
        position: 'top-right',
      });
    }

    reader.onload = async (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const parsed = XLSX.utils
        .sheet_to_json(ws, {
          header: 1,
          defval: null,
        })
        .map((each) => {
          each.splice(each.length - 1, 1);
          return each;
        });

      console.log('original converted JSON format', parsed);

      const newData = parsed.map((row, index) => {
        if (index === 0) return row;

        return row.map((col) => {
          if (col === null) return col;

          return {
            value: col,
            status: 'blank',
            edited: false,
            modifiedDate: new Date(),
          };
        });
      });

      processTableData(newData);
      setLoading(false);
    };

    reader.readAsBinaryString(file);
  };

  const removeCol = (index) => {
    const { original } = data;
    const result = original.map((row) => {
      row.splice(index, 1);
      return row;
    });

    processTableData(result);

    toast({
      status: 'success',
      duration: 1000,
      position: 'bottom-right',
      title: 'Xoá thành công!',
    });
  };

  const editCell = (rowIdx, colIdx, newData) => {
    const { original } = data;
    const newRow = [...original[rowIdx]];

    const { quantity, assessment, reason, date } = newData;

    newRow[colIdx] = {
      ...newRow[colIdx],
      value: quantity,
      edited: false,
      status: assessment,
      modifiedDate: date,
      reason,
    };

    // Looks clunky but it fixed the address reference in array (one changed in a row cause all rows changed)
    const newD = [
      ...original.slice(0, rowIdx),
      [
        ...original[rowIdx].slice(0, colIdx),
        { ...original[rowIdx][colIdx], edited: true },
        ...original[rowIdx].slice(colIdx + 1),
      ],
      newRow,
      ...original.slice(rowIdx + 1),
    ];

    for (let i = 1; i < newD[rowIdx].length - 1; i++) {
      if (newD?.[rowIdx - 1]?.[i]?.edited) {
        newD[rowIdx - 1][i].edited = true;
      }
    }

    processTableData(newD);
  };

  const removeRow = (index) => {
    const { original } = data;
    original.splice(index, 1);

    processTableData(original);
    toast({
      status: 'success',
      duration: 1000,
      position: 'bottom-right',
      title: 'Xoá thành công!',
    });
  };

  const removeExpandableCol = (index) => {
    // 1. remove these cols in all rows
    const { formattedHeadings, original } = data;

    const result = original.map((row) => {
      row.splice(index, formattedHeadings[index].content.length + 1);
      return row;
    });

    processTableData(result);

    toast({
      status: 'success',
      duration: 1000,
      position: 'bottom-right',
      title: 'Xoá thành công!',
    });

    // 2. Update the roman number in heading => II. becomes I.
  };

  const removeExpandableRow = (index) => {
    // 1. remove these cols in all rows
    const { content, original, rows } = data;

    const LOCATION = rows[index];

    const locations = Object.entries(content);
    let from = 1;
    let to = 1;

    for (const element of locations) {
      if (element[0] === LOCATION) {
        to += element[1].length;
        break;
      } else {
        from += element[1].length + 1;
        to += element[1].length + 1;
      }
    }
    original.splice(from, to - from + 1);

    processTableData(original);

    toast({
      status: 'success',
      duration: 1000,
      title: 'Xoá thành công!',
    });
    // 2. Update the roman number in heading => II. becomes I.
  };

  const addLocation = (submittedData) => {
    const { original, content } = data;

    const temp = Array.from({ length: original[0].length }, (_, i) => {
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

    const newOriginal = original.map((row, i) => {
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
      <div className='py-8 flex flex-col justify-center items-center'>
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
        <div className='py-8 flex flex-col justify-center items-center'>
          <img src={note} alt='note' className='w-5/12 h-56' />
          <p className='mt-10 mb-5 text-xl font-semibold'>Chưa có dữ liệu</p>
          <Button
            as='label'
            htmlFor='file'
            leftIcon={<IoAdd color='#fff' />}
            background='primary'
            color='white'
            variant='solid'
          >
            Tải tệp .xlsx
          </Button>
          <input type='file' id='file' onChange={onChange} className='hidden' />
        </div>
      )}
    </>
  );
}

export default TotalsPanel;
