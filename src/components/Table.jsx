import {
  Flex,
  Box,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
} from "react-icons/hi";
import TotalDetailsCellModal from "./modals/TotalsDetailCellModal";

function Table({
  data,
  removeCol,
  removeRow,
  removeExpandableCol,
  removeExpandableRow,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isCellModalOpen,
    onOpen: onCellModalOpen,
    onClose: onCellModalClose,
  } = useDisclosure();

  const {
    isOpen: isHeadingModalOpen,
    onOpen: onHeadingModalOpen,
    onClose: onHeadingModalClose,
  } = useDisclosure();
  const {
    isOpen: isLocationModalOpen,
    onOpen: onLocationModalOpen,
    onClose: onLocationModalClose,
  } = useDisclosure();

  const [modalHeading, setModalHeading] = useState("");
  const [modalType, setModalType] = useState("");
  const [deleteCol, setDeleteCol] = useState(null);
  const [deleteRow, setDeleteRow] = useState(null);

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

  useEffect(() => {
    document.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });
  }, []);

  const setModal = (type, value, isParent = "child") => {
    setModalHeading(value);
    setModalType(isParent);

    if (type === "heading") {
      onHeadingModalOpen();
    } else if (type === "location") {
      onLocationModalOpen();
    } else if (type === "cell") {
      onCellModalOpen();
    }
  };

  const RotatedTh = ({ className, children, icon, ...rest }) => {
    return (
      <Box
        as="th"
        {...rest}
        className={`vertical ${className ? className : ""}`}
        onDoubleClick={onHeadingModalOpen}
      >
        {icon && <Icon as={icon} fontSize="1.5rem" />}
        <span className="vertical">{children}</span>
      </Box>
    );
  };

  const Tr = ({ d, isLastThree }) => {
    return (
      <Box as="tr" bg={isLastThree ? "#EDF2F6" : "#EDF2F666"}>
        {data.formattedHeadings.map((heading, i) => {
          if (heading.type === "child") {
            return (
              <Td
                bg={i === 0 ? "#EDF2F6" : "#EDF2F666"}
                cursor="pointer"
                onClick={() => {
                  if (!isLastThree) {
                    if (i === 0) {
                      setModal("location", d[heading.count]);

                      const { rows } = data;
                      let index = rows.findIndex(
                        (row) => row === d[heading.count]
                      );
                      setDeleteRow(index);
                    } else if (i === 1) {
                      setModal("cell", `${d[0]} - ${heading.value}`);
                    }
                  }
                }}
              >
                {d?.[heading.count]}
              </Td>
            );
          } else if (heading.type === "parent") {
            return (
              <>
                <Td
                  cursor="pointer"
                  onContextMenu={() => {
                    if (!isLastThree && d[heading.count]) {
                      setModal("location", d[heading.count]);
                    }
                  }}
                >
                  {d?.[heading.count]}
                </Td>

                {toggles[`toggle${i + 1}`] && (
                  <>
                    {heading.content.map((child) => {
                      return (
                        <Td
                          cursor="pointer"
                          onClick={() => {
                            if (!isLastThree && d[child.count]) {
                              setModal("cell", `${d[0]} - ${child.value}`);
                            }
                          }}
                        >
                          {d?.[child.count]}
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

  const Td = ({ children, ...props }) => {
    return (
      <Box as="td" className="text-center" {...props}>
        {children}
      </Box>
    );
  };

  const HeadingModal = () => {
    const ParentBody = () => {
      return (
        <>
          <Button
            isFullWidth
            variant="gray"
            mr="4"
            onClick={() => {
              onHeadingModalClose();
              onOpen();
            }}
          >
            Thêm vật tư
          </Button>
          <Button
            isFullWidth
            onClick={() => {
              removeExpandableCol(deleteCol);
              onHeadingModalClose();
            }}
          >
            Xoá
          </Button>
        </>
      );
    };

    const ChildBody = () => {
      return (
        <Button
          isFullWidth
          onClick={() => {
            removeCol(deleteCol);
            onHeadingModalClose();
          }}
        >
          Xoá
        </Button>
      );
    };

    const PivotBody = () => {
      return (
        <>
          <Button isFullWidth mr="4" variant="gray" onClick={() => {}}>
            Thêm kênh
          </Button>
          <Button isFullWidth>Thêm danh sách vật tư</Button>
        </>
      );
    };

    return (
      <Modal
        isOpen={isHeadingModalOpen}
        onClose={onHeadingModalClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="sm">{modalHeading}</ModalHeader>
          <ModalBody p="1rem 2rem">
            <Flex justifyContent="space-between" alignItems="center">
              {modalType === "parent" ? (
                <ParentBody />
              ) : modalType === "child" ? (
                <ChildBody />
              ) : (
                <PivotBody />
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  const CellModal = () => {
    return (
      <Modal isOpen={isCellModalOpen} onClose={onCellModalClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="sm">{modalHeading}</ModalHeader>
          <ModalBody p="1rem 2rem">
            <Flex justifyContent="center" alignItems="center">
              <Button
                isFullWidth
                variant="gray"
                mr="4"
                onClick={() => {
                  onOpen();
                  onCellModalClose();
                }}
              >
                Chi tiết
              </Button>
              <Button isFullWidth onClick={() => {}}>
                Cập nhật
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  const LocationModal = () => {
    const ParentBody = () => {
      return (
        <>
          <Button isFullWidth variant="gray" mr="4" onClick={() => {}}>
            Thêm trụ
          </Button>
          <Button
            isFullWidth
            onClick={() => {
              removeExpandableRow(deleteRow);
              onLocationModalClose();
            }}
          >
            Xoá
          </Button>
        </>
      );
    };
    const ChildBody = () => {
      return (
        <Button
          isFullWidth
          onClick={() => {
            removeRow(deleteRow);
            onLocationModalClose();
          }}
        >
          Xoá
        </Button>
      );
    };

    return (
      <Modal
        isOpen={isLocationModalOpen}
        onClose={onLocationModalClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="sm">{modalHeading}</ModalHeader>
          <ModalBody p="1rem 2rem">
            <Flex justifyItems="center" alignItems="center">
              {modalType === "parent" ? <ParentBody /> : <ChildBody />}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <>
      <p className="font-bold text-md mt-2">
        Tổng kê Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </p>
      <p className="text-xs mb-3">
        Cập nhật lần cuối vào 12:05:16 ngày 12/5/2022.
      </p>
      <div style={{ overflowX: "auto" }} className="table-wrapper">
        {/* First Row */}

        <table class="big-table">
          <CellModal />
          <HeadingModal />
          <LocationModal />

          <TotalDetailsCellModal isOpen={isOpen} onClose={onClose} />
          <tr className="h-80">
            {data.formattedHeadings.map((heading, index) => {
              if (heading.type === "child") {
                if (index === 0) {
                  return (
                    <th
                      className="min-w-36 md:min-w-56 text-white primary cursor-pointer"
                      onClick={() => {
                        onHeadingModalOpen();
                        setModal("heading", heading.value, "pivot");
                        setDeleteCol(heading.count);
                      }}
                    >
                      {heading.value}
                    </th>
                  );
                } else {
                  return (
                    <RotatedTh
                      onClick={() => {
                        setModal("heading", heading.value);
                        setDeleteCol(heading.count);
                      }}
                      className="text-white primary cursor-pointer"
                      type={heading.type}
                    >
                      {heading.value}
                    </RotatedTh>
                  );
                }
              } else if (heading.type === "parent") {
                return (
                  <>
                    <RotatedTh
                      className="text-white primary cursor-pointer"
                      onClick={() =>
                        setToggles({
                          ...toggles,
                          [`toggle${index + 1}`]:
                            !toggles[`toggle${index + 1}`],
                        })
                      }
                      onContextMenu={() => {
                        setModal("heading", heading.value, "parent");
                        setDeleteCol(heading.count);
                      }}
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
                          return (
                            <RotatedTh
                              onClick={() => {
                                setModal("heading", each.value);
                                setDeleteCol(each.count);
                              }}
                              className="cursor-pointer"
                            >
                              {each.value}
                            </RotatedTh>
                          );
                        })}
                      </>
                    )}
                  </>
                );
              }
            })}
          </tr>

          {/* Locations */}
          {Object.entries(data.content).map((location, index) => {
            return (
              <>
                <Box
                  as="tr"
                  className="pointer text-white "
                  onClick={() => {
                    setRowToggles({
                      ...rowToggles,
                      [`toggle${index + 1}`]: !rowToggles[`toggle${index + 1}`],
                    });
                  }}
                  onContextMenu={() => {
                    onLocationModalOpen();
                    setModal("location", location[0], "parent");

                    const { rows } = data;
                    let index = rows.findIndex((row) => row === location[0]);
                    setDeleteRow(index);
                  }}
                >
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    as="td"
                    cursor="pointer"
                    className="primary min-w-36 md:min-w-56 p-2"
                  >
                    <p>{location[0]}</p>
                    {rowToggles[`toggle${index + 1}`] ? (
                      <HiOutlineChevronUp />
                    ) : (
                      <HiOutlineChevronDown />
                    )}
                  </Flex>
                </Box>
                {rowToggles[`toggle${index + 1}`] && (
                  <>
                    {location[1].map((value, childIndex) => (
                      <Tr
                        d={value}
                        isLastThree={childIndex >= location[1].length - 3}
                      />
                    ))}
                  </>
                )}
              </>
            );
          })}
        </table>
      </div>
    </>
  );
}

export default Table;
