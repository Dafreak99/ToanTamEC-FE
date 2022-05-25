import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";

function Table() {
  const [toggleA, setToggleA] = useState(false);
  const [toggleB, setToggleB] = useState(false);
  return (
    <div style={{ overflowX: "auto" }} className="tablee">
      {/* First Row */}
      <div className="h-80 flex">
        <div className="min-w-44">Số trụ</div>
        <RotatedTh>Khoảng cách (m)</RotatedTh>
        <RotatedTh>Đường dây sử dụng mới</RotatedTh>
        <RotatedTh>Móng trụ M12-ba (BV 01)</RotatedTh>
        <RotatedTh>Móng gia cố trụ trung thế Mac200 (14m)</RotatedTh>
        <RotatedTh>Móng gia cố trụ trung thế cập đôi trụ 12m Mac200</RotatedTh>
        <RotatedTh>Trụ BTLT 12m (BV số 07)</RotatedTh>
        <RotatedTh>Dây </RotatedTh>
        <RotatedTh>Dây trần ACKP 50mm2</RotatedTh>
        <RotatedTh>Lorem ipsum dolor sit</RotatedTh>
        <RotatedTh>Lorem ipsum dolor sit</RotatedTh>
      </div>
      {/* KENH A */}
      <div className="pointer bg-blue-400" onClick={() => setToggleA(!toggleA)}>
        <div>Kênh A</div>
      </div>
      {toggleA && (
        <div className="flex flex-col">
          <div className="flex">
            <FirstCol>474VC/175/9/2/12</FirstCol>
            <Td>38</Td>
            <Td></Td>
            <Td>1</Td>
            <Td></Td>
            <Td></Td>
            <Td>1</Td>
            <Td></Td>
            <Td></Td>
            <Td>142.8</Td>
            <Td></Td>
          </div>
          <div className="flex">
            <FirstCol>474VC/175/9/2/12</FirstCol>
            <Td>38</Td>
            <Td></Td>
            <Td>1</Td>
            <Td></Td>
            <Td></Td>
            <Td>1</Td>
            <Td></Td>
            <Td></Td>
            <Td>142.8</Td>
            <Td></Td>
          </div>
          <div className="flex">
            <FirstCol>474VC/175/9/2/12</FirstCol>
            <Td>38</Td>
            <Td></Td>
            <Td>1</Td>
            <Td></Td>
            <Td></Td>
            <Td>1</Td>
            <Td></Td>
            <Td></Td>
            <Td>142.8</Td>
            <Td></Td>
          </div>
          <div className="flex">
            <FirstCol>474VC/175/9/2/12</FirstCol>
            <Td>38</Td>
            <Td></Td>
            <Td>1</Td>
            <Td></Td>
            <Td></Td>
            <Td>1</Td>
            <Td></Td>
            <Td></Td>
            <Td>142.8</Td>
            <Td></Td>
          </div>
          <div className="flex">
            <FirstCol>474VC/175/9/2/12</FirstCol>
            <Td>38</Td>
            <Td></Td>
            <Td>1</Td>
            <Td></Td>
            <Td></Td>
            <Td>1</Td>
            <Td></Td>
            <Td></Td>
            <Td>142.8</Td>
            <Td></Td>
          </div>
          <div className="flex">
            <FirstCol>474VC/175/9/2/12</FirstCol>
            <Td>38</Td>
            <Td></Td>
            <Td>1</Td>
            <Td></Td>
            <Td></Td>
            <Td>1</Td>
            <Td></Td>
            <Td></Td>
            <Td>142.8</Td>
            <Td></Td>
          </div>
          <div className="flex">
            <FirstCol>474VC/175/9/2/12</FirstCol>
            <Td>38</Td>
            <Td></Td>
            <Td>1</Td>
            <Td></Td>
            <Td></Td>
            <Td>1</Td>
            <Td></Td>
            <Td></Td>
            <Td>142.8</Td>
            <Td></Td>
          </div>
          <div className="flex">
            <FirstCol>Tổng</FirstCol>
            <Td>135</Td>
            <Td></Td>
            <Td>3</Td>
            <Td>1</Td>
            <Td>1</Td>
            <Td>2</Td>
            <Td>2</Td>
            <Td></Td>
            <Td>529.4</Td>
          </div>
          <div className="flex">
            <FirstCol>Đã thi công</FirstCol>
            <Td>135</Td>
            <Td></Td>
            <Td>3</Td>
            <Td>1</Td>
            <Td>1</Td>
            <Td>2</Td>
            <Td>2</Td>
            <Td></Td>
            <Td>529.4</Td>
          </div>
          <div className="flex">
            <FirstCol>Còn lại</FirstCol>
            <Td>135</Td>
            <Td></Td>
            <Td>3</Td>
            <Td>1</Td>
            <Td>1</Td>
            <Td>2</Td>
            <Td>2</Td>
            <Td></Td>
            <Td>0</Td>
          </div>
        </div>
      )}

      {/* KENH B */}
      <div className="pointer bg-blue-400" onClick={() => setToggleB(!toggleB)}>
        <div>Kênh B</div>
      </div>
      {toggleB && (
        <div className="flex flex-col">
          <div className="flex">
            <FirstCol>474VC/175/9/2/12</FirstCol>
            <Td>38</Td>
            <Td></Td>
            <Td>1</Td>
            <Td></Td>
            <Td></Td>
            <Td>1</Td>
            <Td></Td>
            <Td></Td>
            <Td>142.8</Td>
            <Td></Td>
          </div>
          <div className="flex">
            <FirstCol>474VC/175/9/2/12</FirstCol>
            <Td>38</Td>
            <Td></Td>
            <Td>1</Td>
            <Td></Td>
            <Td></Td>
            <Td>1</Td>
            <Td></Td>
            <Td></Td>
            <Td>142.8</Td>
            <Td></Td>
          </div>
          <div className="flex">
            <FirstCol>474VC/175/9/2/12</FirstCol>
            <Td>38</Td>
            <Td></Td>
            <Td>1</Td>
            <Td></Td>
            <Td></Td>
            <Td>1</Td>
            <Td></Td>
            <Td></Td>
            <Td>142.8</Td>
            <Td></Td>
          </div>
          <div className="flex">
            <FirstCol>Tổng</FirstCol>
            <Td>135</Td>
            <Td></Td>
            <Td>3</Td>
            <Td>1</Td>
            <Td>1</Td>
            <Td>2</Td>
            <Td>2</Td>
            <Td></Td>
            <Td>529.4</Td>
          </div>
          <div className="flex">
            <FirstCol>Đã thi công</FirstCol>
            <Td>135</Td>
            <Td></Td>
            <Td>3</Td>
            <Td>1</Td>
            <Td>1</Td>
            <Td>2</Td>
            <Td>2</Td>
            <Td></Td>
            <Td>529.4</Td>
          </div>
          <div className="flex">
            <FirstCol>Còn lại</FirstCol>
            <Td>135</Td>
            <Td></Td>
            <Td>3</Td>
            <Td>1</Td>
            <Td>1</Td>
            <Td>2</Td>
            <Td>2</Td>
            <Td></Td>
            <Td>0</Td>
          </div>
        </div>
      )}
    </div>
  );
}

const RotatedTh = ({ children }) => {
  return (
    <div className="flex justify-center items-center rotate-270 w-36">
      <p>{children}</p>
    </div>
  );
};

const FirstCol = ({ children }) => {
  return <div className="text-center min-w-44">{children}</div>;
};

const Td = ({ children }) => {
  return <div className="text-center w-36">{children}</div>;
};

export default Table;
