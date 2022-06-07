import {
  Flex,
  Box,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ModalCloseButton,
  List,
  ListItem,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
} from "react-icons/hi";
import TotalDetailsCellModal from "./modals/TotalsDetailCellModal";

function Table({ data }) {
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

  const RotatedTh = ({ className, children, icon, ...rest }) => {
    return (
      <Box
        as="th"
        {...rest}
        className={`vertical ${className ? className : ""}`}
        onClick={onHeadingModalOpen}
      >
        {icon && <Icon as={icon} fontSize="1.5rem" />}
        <span className="vertical">{children}</span>
      </Box>
    );
  };

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
                <Td cursor="pointer">
                  {typeof d[heading.count] === "undefined"
                    ? ""
                    : d[heading.count]}
                </Td>

                {toggles[`toggle${i + 1}`] && (
                  <>
                    {heading.content.map((child) => {
                      return (
                        <Td cursor="pointer">
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

  const Td = ({ children, ...props }) => {
    if (children) {
      if (open) {
      } else {
      }
      return (
        <Box
          as="td"
          className="text-center min-20"
          {...props}
          onClick={() => onCellModalOpen()}
        >
          {children}
        </Box>
      );
    }

    return (
      <Box as="td" className="text-center min-20" {...props}>
        {children}
      </Box>
    );
  };

  const CellModal = () => {
    return (
      <Modal isOpen={isCellModalOpen} onClose={onCellModalClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="sm">
            474VC/175/9/2/12/4 - TRỤ BTLT 12M (BV số 07)
          </ModalHeader>
          <ModalBody p="1rem 2rem">
            <List>
              <ListItem>
                <Button
                  isFullWidth
                  mb="2"
                  bg="#4a5567"
                  color="#fff"
                  onClick={() => {
                    onCellModalClose();
                    onOpen();
                  }}
                >
                  Chi tiết
                </Button>
              </ListItem>
              <ListItem>
                <Button isFullWidth>Cập nhật</Button>
              </ListItem>
            </List>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  const HeadingModal = () => {
    return (
      <Modal
        isOpen={isHeadingModalOpen}
        onClose={onHeadingModalClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="sm">Heading</ModalHeader>
          <ModalBody p="1rem 2rem">
            <List>
              <ListItem>
                <Button
                  isFullWidth
                  mb="2"
                  bg="#4a5567"
                  color="#fff"
                  onClick={() => {
                    onHeadingModalClose();
                    onOpen();
                  }}
                >
                  Thêm vật tư
                </Button>
              </ListItem>
              <ListItem>
                <Button isFullWidth>Xoá</Button>
              </ListItem>
            </List>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  const LocationModal = () => {
    return (
      <Modal
        isOpen={isLocationModalOpen}
        onClose={onLocationModalClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="sm">Location Modal </ModalHeader>
          <ModalBody p="1rem 2rem">
            <List>
              <ListItem>
                <Button
                  isFullWidth
                  mb="2"
                  bg="#4a5567"
                  color="#fff"
                  onClick={() => {
                    onLocationModalClose();
                    onOpen();
                  }}
                >
                  Thêm vật tư
                </Button>
              </ListItem>
              <ListItem>
                <Button isFullWidth>Xoá</Button>
              </ListItem>
            </List>
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
                    <th className="min-w-36 md:min-w-56 primary">
                      <Menu>
                        <MenuButton className="text-white">
                          {heading.value}
                        </MenuButton>
                        <MenuList>
                          <MenuItem>Download</MenuItem>
                          <MenuItem>Create a Copy</MenuItem>
                        </MenuList>
                      </Menu>
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
                      cursor="pointer"
                      onDoubleClick={() =>
                        setToggles({
                          ...toggles,
                          [`toggle${index + 1}`]:
                            !toggles[`toggle${index + 1}`],
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

          {/* Locations */}
          {Object.entries(data.content).map((location, index) => {
            return (
              <>
                <Box
                  as="tr"
                  className="pointer text-white "
                  onClick={(e) => {
                    console.log(e.type);
                    setRowToggles({
                      ...rowToggles,
                      [`toggle${index + 1}`]: !rowToggles[`toggle${index + 1}`],
                    });
                  }}
                  onContextMenu={() => {
                    console.log("right");
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
                    {location[1].map((value, index) => (
                      <Tr
                        d={value}
                        bg={
                          index < location[1].length - 3
                            ? "#EDF2F666"
                            : "#EDF2F6"
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
    </>
  );
}

export default Table;
