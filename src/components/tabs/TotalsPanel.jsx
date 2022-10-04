import { Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { useAddTotalList, useTotalList } from '../../hooks/useTotalList';
import note from '../../images/add-notes.svg';
import { intToRoman } from '../../utils';
import { processTableData } from '../../utils/table';
import { showToast } from '../../utils/toast';
import Spinner from '../Spinner';
import Table from '../Table';

function TotalsPanel() {
  const [tableData, setTableData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const { id } = useParams();

  /**
   * @param {JSON String || JS Object}
   * @desc: Accept the original table content, and process it to produce all necessary data for the TotalList
   */
  const handleTotalListData = (content) => {
    if (typeof content === 'string') content = JSON.parse(content);
    setTableData(processTableData(content));
  };

  const onSuccess = ({ data: { content } }) => {
    setLoading(false);
    showToast('success', 'Đã tải lên tổng kê');

    handleTotalListData(content);
  };

  const onError = () => {
    setLoading(false);

    showToast('error', 'Lỗi khi tải lên tổng kê');
  };

  const { mutate } = useAddTotalList(onSuccess, onError);
  const { data: totalList } = useTotalList(id);

  useEffect(() => {
    if (totalList?.content) {
      handleTotalListData(totalList.content);
    }
  }, [totalList]);

  const onChange = (e) => {
    setLoading(true);
    const [file] = e.target.files;
    const reader = new FileReader();

    const extName = file.name.split('.').pop();

    if (extName !== 'xlsx') {
      showToast('success', 'Vui lòng tải lên tập tin .xlsx');
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

      mutate({
        project: id,
        content: JSON.stringify(newData),
      });

      setLoading(false);
    };

    reader.readAsBinaryString(file);
  };

  const removeCol = (index) => {
    const { original } = tableData;
    const result = original.map((row) => {
      row.splice(index, 1);
      return row;
    });

    handleTotalListData(result);
    showToast('success', 'Xoá thành công!');
  };

  const editCell = (rowIdx, colIdx, newData) => {
    const { original } = tableData;
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

    handleTotalListData(newD);
  };

  const removeRow = (index) => {
    const { original } = tableData;
    original.splice(index, 1);

    handleTotalListData(original);
    showToast('success', 'Xoá thành công!');
  };

  const removeExpandableCol = (index, expandIndex) => {
    // 1. Remove that specific col in all rows
    const { expandableHeadings, original } = tableData;

    const result = original.map((row) => {
      row.splice(index, expandableHeadings[expandIndex].children.length + 1);
      return row;
    });

    // 2. Update the roman number in heading => II. becomes I.
    const count = 1;

    result[0] = result[0].map((col) => {
      const regrex = /^[MDCLXVI]{0,}\./;
      if (col.match(regrex)) {
        col = col.replace(regrex, `${intToRoman(count)}. `);
      }

      return col;
    });

    handleTotalListData(result);
    showToast('success', 'Xoá thành công!');
  };

  const removeExpandableRow = (index) => {
    // 1. remove these cols in all rows
    const { expandableContent, original, rows } = tableData;

    const location = rows[index]?.value;

    const locations = Object.entries(expandableContent);
    let from = 1;
    let to = 1;

    for (const element of locations) {
      if (element[0] === location) {
        to += element[1].length - 3;
        break;
      } else {
        from += element[1].length - 3 + 1;
        to += element[1].length - 3 + 1;
      }
    }
    original.splice(from, to - from + 1);

    // 2. Update the number in heading => 2/ becomes 1/
    let count = 1;
    const movedIdxsForward = original.map((row) => {
      const regrex = /\d{0,4}\/ /g;

      if (row[0]?.value?.match(regrex)) {
        row[0].value = row[0].value.replace(regrex, `${count}/ `);
        count++;
      }

      return row;
    });

    handleTotalListData(movedIdxsForward);
    showToast('success', 'Xoá thành công!');
  };

  const addLocation = (submittedData) => {
    const { original, expandableContent } = tableData;

    const temp = Array.from({ length: original[0].length }, (_, i) => {
      if (i === 0) {
        return {
          edited: false,
          modifiedDate: new Date(),
          status: 'blank',
          value: `${Object.keys(expandableContent).length + 1}/ ${
            submittedData.locationName
          }`,
        };
      }
      return null;
    });

    original.push(temp);

    handleTotalListData(original);
  };

  const addMaterial = (submittedData) => {
    const { original, countExpandableHeadings } = tableData;

    const newOriginal = original.map((row, i) => {
      if (i === 0) {
        row.push(
          `${intToRoman(countExpandableHeadings + 1)}. ${
            submittedData.materialName
          }`,
        );
      } else {
        row.push(null);
      }
      return row;
    });

    handleTotalListData(newOriginal);
  };

  const addPillar = (pillarName, addExpandableRow) => {
    const { expandableContent, original, rows } = tableData;

    const index = rows.findIndex((row) => row?.value === addExpandableRow);
    const to = index + expandableContent[addExpandableRow].length - 3 + 1;

    const temp = Array.from({ length: original[0].length }, (_, i) => {
      if (i === 0) {
        return {
          edited: false,
          modifiedDate: new Date(),
          status: 'blank',
          value: pillarName,
        };
      }

      return null;
    });

    const d = [...original.slice(0, to), temp, ...original.slice(to)];
    handleTotalListData(d);
  };

  // const addMaterial = (submittedData) => {
  //   const { original } = tableData;

  //   const newOriginal = original.map((row, i) => {
  //     if (i === 0) {
  //       row.push(submittedData.materialName);
  //     } else {
  //       row.push(null);
  //     }
  //     return row;
  //   });

  //   handleTotalListData(newOriginal);
  // };

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
      {tableData ? (
        <>
          <Table
            {...{
              data: tableData,
              removeCol,
              removeRow,
              removeExpandableCol,
              removeExpandableRow,
              addLocation,
              addMaterial,
              addPillar,
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
