import { Box, Flex, Icon } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
} from "react-icons/hi";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function Table({ data }) {
  console.log(data);
  const [toggleA, setToggleA] = useState(true);
  const [toggleB, setToggleB] = useState(true);
  const [toggleOne, setToggleOne] = useState(true);
  const [toggleTwo, setToggleTwo] = useState(true);

  const [toggles, setToggles] = useState(() => {
    let toggles = {};
    for (let i = 1; i <= data.formattedHeadings.length; i++) {
      let propName = `toggle${i}`;
      toggles[propName] = true;
    }

    return toggles;
  });

  const [rowToggles, setRowToggles] = useState(() => {
    let toggles = {};

    for (let i = 1; i <= Object.keys(data.content).length; i++) {
      let propName = `toggle${i}`;
      toggles[propName] = true;
    }

    return toggles;
  });

  const Tr = ({ d, bg }) => {
    return (
      <Box as="tr" bg={bg}>
        {data.formattedHeadings.map((heading, i) => {
          if (heading.type === "child") {
            return (
              <Td bg={i === 0 ? "#EDF2F6" : "#EDF2F666"}>
                {typeof d[heading.count] === "undefined"
                  ? ""
                  : d[heading.count]}
              </Td>
            );
          } else if (heading.type === "parent") {
            return (
              <>
                <Td
                  onClick={() =>
                    setToggles({
                      ...toggles,
                      [`toggle${i + 1}`]: !toggles[`toggle${i + 1}`],
                    })
                  }
                  icon={
                    toggles[`toggle${i + 1}`]
                      ? HiOutlineChevronLeft
                      : HiOutlineChevronRight
                  }
                >
                  {typeof d[heading.count] === "undefined"
                    ? ""
                    : d[heading.count]}
                </Td>
                {toggles[`toggle${i + 1}`] && (
                  <>
                    {heading.content.map((child) => {
                      return (
                        <Td>
                          {typeof d[child.count] === "undefined"
                            ? ""
                            : d[child.count]}
                        </Td>
                      );
                    })}
                  </>
                )}
              </>
            );
          }
        })}
      </Box>
    );
  };

  return (
    <div style={{ overflowX: "auto" }} className="table-wrapper">
      {/* First Row */}
      <table class="big-table">
        <tr className="h-80">
          {data.formattedHeadings.map((heading, index) => {
            if (heading.type === "child") {
              if (index === 0) {
                return (
                  <th className="min-w-56 text-white primary">
                    {heading.value}
                  </th>
                );
              } else {
                return (
                  <RotatedTh className="text-white primary">
                    {heading.value}
                  </RotatedTh>
                );
              }
            } else if (heading.type === "parent") {
              return (
                <>
                  <RotatedTh
                    className="text-white primary"
                    onClick={() =>
                      setToggles({
                        ...toggles,
                        [`toggle${index + 1}`]: !toggles[`toggle${index + 1}`],
                      })
                    }
                    icon={
                      toggles[`toggle${index + 1}`]
                        ? HiOutlineChevronLeft
                        : HiOutlineChevronRight
                    }
                  >
                    {heading.value}
                  </RotatedTh>
                  {toggles[`toggle${index + 1}`] && (
                    <>
                      {heading.content.map((each) => {
                        return <RotatedTh>{each.value}</RotatedTh>;
                      })}
                    </>
                  )}
                </>
              );
            }
          })}
        </tr>

        {/* KENH A */}
        {Object.entries(data.content).map((location, index) => {
          return (
            <>
              <Box
                as="tr"
                className="pointer text-white "
                onClick={() =>
                  setRowToggles({
                    ...rowToggles,
                    [`toggle${index + 1}`]: !rowToggles[`toggle${index + 1}`],
                  })
                }
              >
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  as="td"
                  cursor="pointer"
                  className="primary min-w-56"
                >
                  <p>{location[0]}</p>
                  {toggles[`toggle${index + 1}`] ? (
                    <HiOutlineChevronUp />
                  ) : (
                    <HiOutlineChevronDown />
                  )}
                </Flex>
              </Box>
              {rowToggles[`toggle${index + 1}`] && (
                <>
                  {location[1].map((value, index) => (
                    <Tr
                      d={value}
                      bg={
                        index < location[1].length - 3 ? "#EDF2F666" : "#EDF2F6"
                      }
                    />
                  ))}
                </>
              )}
            </>
          );
        })}
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

const Td = ({ children, ...props }) => {
  return (
    <Box as="td" className="text-center min-20" {...props}>
      {children}
    </Box>
  );
};

export default Table;
