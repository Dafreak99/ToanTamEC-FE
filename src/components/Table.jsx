import { Box, Icon } from "@chakra-ui/react";
import React, { useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function Table() {
  const [toggleA, setToggleA] = useState(true);
  const [toggleB, setToggleB] = useState(true);
  const [toggleOne, setToggleOne] = useState(true);
  const [toggleTwo, setToggleTwo] = useState(true);

  const Tr = ({ d }) => {
    return (
      <tr>
        <Td>{d[0]}</Td>
        <Td>{d[1]}</Td>
        <Td>{d[2]}</Td>
        {toggleOne && (
          <>
            <Td>{d[3]}</Td>
            <Td>{d[4]}</Td>
            <Td>{d[5]}</Td>
            <Td>{d[6]}</Td>
          </>
        )}
        <Td>{d[7]}</Td>
        {toggleTwo && (
          <>
            <Td>{d[8]}</Td>
            <Td>{d[9]}</Td>
            <Td>{d[10]}</Td>
          </>
        )}
      </tr>
    );
  };

  return (
    <div style={{ overflowX: "auto" }} className="table-wrapper">
      {/* First Row */}

      <table class="big-table">
        <tr className="h-80">
          <th className="min-w-44">Số trụ</th>
          <RotatedTh className="text-white primary">Khoảng cách (m)</RotatedTh>
          <RotatedTh
            onClick={() => setToggleOne(!toggleOne)}
            className="text-white primary"
            icon={toggleOne ? HiOutlineChevronLeft : HiOutlineChevronRight}
          >
            Đường dây sử dụng mới
          </RotatedTh>
          {toggleOne && (
            <>
              <RotatedTh>Móng trụ M12-ba (BV 01)</RotatedTh>
              <RotatedTh>Móng gia cố trụ trung thế Mac200 (14m)</RotatedTh>
              <RotatedTh>
                Móng gia cố trụ trung thế cập đôi trụ 12m Mac200
              </RotatedTh>
              <RotatedTh>Trụ BTLT 12m (BV số 07)</RotatedTh>
            </>
          )}

          <RotatedTh
            onClick={() => setToggleTwo(!toggleTwo)}
            className="text-white primary"
            icon={toggleTwo ? HiOutlineChevronLeft : HiOutlineChevronRight}
          >
            Dây
          </RotatedTh>
          {toggleTwo && (
            <>
              <RotatedTh>Dây trần ACKP 50mm2</RotatedTh>
              <RotatedTh>Lorem ipsum dolor sit</RotatedTh>
              <RotatedTh>Lorem ipsum dolor sit</RotatedTh>
            </>
          )}
        </tr>
        {/* KENH A */}
        <Box
          as="tr"
          className="pointer text-white "
          onClick={() => setToggleA(!toggleA)}
        >
          <td className="primary">Kênh A</td>
        </Box>
        {toggleA && (
          <>
            <Tr d={data[0]} />
            <Tr d={data[1]} />
            <Tr d={data[2]} />
            <Tr d={data[3]} />
            <Tr d={data[4]} />
            <Tr d={data[5]} />
            <Tr d={data[6]} />
          </>
        )}

        {/* KENH B */}
        <Box
          as="tr"
          className="pointer text-white"
          onClick={() => setToggleB(!toggleB)}
        >
          <td className="primary">Kênh B</td>
        </Box>
        {toggleB && (
          <>
            <Tr d={data[7]} />
            <Tr d={data[8]} />
            <Tr d={data[9]} />
            <Tr d={data[10]} />
          </>
        )}
      </table>
    </div>
  );
}

const RotatedTh = ({ className, children, icon, ...rest }) => {
  return (
    <Box as="th" {...rest} className={`vertical ${className ? className : ""}`}>
      <div className={`wrapper ${!icon && "no-icon"}`}>
        <span className="vertical">{children}</span>
        {icon && <Icon as={icon} fontSize="1.5rem" />}
      </div>
    </Box>
  );
};

const Td = ({ children }) => {
  return (
    <Box as="td" className="text-center min-20">
      {children}
    </Box>
  );
};

export default Table;
