/* eslint-disable react/no-unstable-nested-components */
import {
  Box,
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  HiOutlineChevronDown,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineChevronUp,
} from 'react-icons/hi';
import AddLocation from './modals/AddLocation';
import AddMaterial from './modals/AddMaterial';
import TotalDetailsCellModal from './modals/TotalsDetailCellModal';

function Table({
  data,
  removeCol,
  editCell,
  removeRow,
  removeExpandableCol,
  removeExpandableRow,
  addLocation,
  addMaterial,
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

  const [modalHeading, setModalHeading] = useState('');
  const [modalType, setModalType] = useState('');
  const [deleteCol, setDeleteCol] = useState(null);
  const [deleteRow, setDeleteRow] = useState(null);
  const [selectedCell, setSelectedCell] = useState({
    col: null,
    row: null,
  });

  const [toggles, setToggles] = useState(() => {
    const stateToggles = {};
    for (let i = 1; i <= data.formattedHeadings.length; i++) {
      const propName = `toggle${i}`;
      stateToggles[propName] = true;
    }

    return stateToggles;
  });

  const [rowToggles, setRowToggles] = useState(() => {
    const rToggles = {};

    for (let i = 1; i <= Object.keys(data.content).length; i++) {
      const propName = `toggle${i}`;
      rToggles[propName] = true;
    }

    return rToggles;
  });

  useEffect(() => {
    document.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });
  }, []);

  const isEdited = (row) => {
    return row.some((col) => col?.edited);
  };

  const setModal = (
    type,
    value,
    rowContent = null,
    colContent = null,
    isParent = 'child',
  ) => {
    setModalHeading(value);
    setModalType(isParent);

    const { headings, rows, original } = data;

    const rowIdx = rows.findIndex(
      (row, idx) => row.value === rowContent && !isEdited(original[idx]),
    );
    const colIdx = headings.findIndex((col) => col === colContent);

    console.log(colIdx, rowIdx);
    setSelectedCell({ col: colIdx, row: rowIdx });

    if (type === 'heading') {
      onHeadingModalOpen();
    } else if (type === 'location') {
      onLocationModalOpen();
    } else if (type === 'cell') {
      onCellModalOpen();
    }
  };

  const onCellSubmit = (formData) => {
    // edit cell value
    editCell(selectedCell.row, selectedCell.col, formData);
  };

  const renderColor = (status, edited) => {
    let style;

    if (edited) {
      style = { background: 'orange.200', color: 'orange.800' };
    }

    if (status === 'passed') {
      style = { background: 'green.100', color: 'green.800' };
    } else if (status === 'failed') {
      style = { background: 'red.100', color: 'red.800' };
    }

    return style;
  };

  const RotatedTh = ({ className, children, icon, ...rest }) => {
    return (
      <Box
        as='th'
        {...rest}
        className={`vertical ${className || ''}`}
        onDoubleClick={onHeadingModalOpen}
      >
        {icon && <Icon as={icon} fontSize='1.5rem' />}
        <span className='vertical'>{children}</span>
      </Box>
    );
  };

  // TODO: Change edited value to orange
  const Tr = ({ d, isLastThree, edited }) => {
    return (
      <Box
        as='tr'
        bg={isLastThree ? '#EDF2F6' : '#EDF2F666'}
        opacity={edited ? '0.7' : '1'}
      >
        {data.formattedHeadings.map((heading, i) => {
          if (heading.type === 'child') {
            return (
              <Td
                cursor='pointer'
                bg={i === 0 && '#edf2f6'}
                {...renderColor(
                  d?.[heading.count]?.status,
                  d?.[heading.count]?.edited,
                )}
                onClick={() => {
                  if (!isLastThree && !edited && i !== 0) {
                    if (i === 0) {
                      setModal('location', d[heading.count].value);

                      const { rows } = data;
                      let index = rows.findIndex(
                        (row) => row === d[heading.count],
                      );
                      setDeleteRow(index);
                    } else if (i === 1) {
                      setModal(
                        'cell',
                        `${d[0].value} - ${heading.value}`,
                        d[0].value,
                        heading.value,
                        'child',
                      );
                    }
                  }
                }}
              >
                {d?.[heading.count]?.value}
              </Td>
            );
          }

          // Else: Parent
          return (
            <>
              <Td
                cursor='pointer'
                {...renderColor(
                  d?.[heading.count]?.status,
                  d?.[heading.count]?.edited,
                )}
                onContextMenu={() => {
                  if (!isLastThree && d[heading.count] && !edited) {
                    setModal('location', d[heading.count].value);
                  }
                }}
              >
                {d?.[heading.count]?.value}
              </Td>

              {toggles[`toggle${i + 1}`] && (
                <>
                  {heading.content.map((child) => {
                    return (
                      <Td
                        cursor='pointer'
                        {...renderColor(
                          d?.[child.count]?.status,
                          d?.[child.count]?.edited,
                        )}
                        onClick={() => {
                          if (!isLastThree && d[child.count] && !edited) {
                            setModal(
                              'cell',
                              `${d[0].value} - ${child.value}`,
                              d[0].value,
                              child.value,
                              'child',
                            );
                          }
                        }}
                      >
                        {d?.[child.count]?.value}
                      </Td>
                    );
                  })}
                </>
              )}
            </>
          );
        })}
      </Box>
    );
  };

  const Td = ({ children, ...props }) => {
    return (
      <Box as='td' className='text-center' {...props}>
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
            variant='gray'
            mr='4'
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
      const onSubmitLocation = (formData) => {
        onHeadingModalClose();
        addLocation(formData);
      };

      const onSubmitMaterial = (formData) => {
        onHeadingModalClose();
        addMaterial(formData);
      };

      return (
        <>
          <AddLocation onSubmit={onSubmitLocation}>
            <Button
              isFullWidth
              mr='4'
              variant='gray'
              onClick={onHeadingModalClose}
            >
              Thêm kênh
            </Button>
          </AddLocation>

          <AddMaterial onSubmit={onSubmitMaterial}>
            <Button isFullWidth>Thêm danh sách vật tư</Button>
          </AddMaterial>
        </>
      );
    };

    const renderBody = () => {
      if (modalType === 'parent') {
        return <ParentBody />;
      }
      if (modalType === 'child') {
        return <ChildBody />;
      }

      return <PivotBody />;
    };

    return (
      <Modal
        isOpen={isHeadingModalOpen}
        onClose={onHeadingModalClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize='sm'>{modalHeading}</ModalHeader>
          <ModalBody p='1rem 2rem'>
            <Flex justifyContent='space-between' alignItems='center'>
              {renderBody()}
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
          <ModalHeader fontSize='sm'>{modalHeading}</ModalHeader>
          <ModalBody p='1rem 2rem'>
            <Flex justifyContent='center' alignItems='center'>
              <Button
                isFullWidth
                variant='gray'
                mr='4'
                onClick={() => {
                  onOpen();
                  onCellModalClose();
                }}
              >
                Chi tiết
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
          <Button isFullWidth variant='gray' mr='4' onClick={null}>
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
          <ModalHeader fontSize='sm'>{modalHeading}</ModalHeader>
          <ModalBody p='1rem 2rem'>
            <Flex justifyItems='center' alignItems='center'>
              {modalType === 'parent' ? <ParentBody /> : <ChildBody />}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <>
      <p className='font-bold text-md mt-2'>
        Tổng kê Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </p>
      <p className='text-xs mb-3'>
        Cập nhật lần cuối vào 12:05:16 ngày 12/5/2022.
      </p>
      <div style={{ overflowX: 'auto' }} className='table-wrapper'>
        {/* First Row */}

        <table className='big-table'>
          <CellModal />
          <HeadingModal />
          <LocationModal />

          <TotalDetailsCellModal
            {...{ isOpen, onClose }}
            onSubmit={onCellSubmit}
          />
          <tr className='h-80'>
            {data.formattedHeadings.map((heading, index) => {
              if (heading.type === 'child') {
                if (index === 0) {
                  return (
                    <th
                      className='min-w-36 md:min-w-56 text-white primary cursor-pointer'
                      onClick={() => {
                        onHeadingModalOpen();
                        setModal('heading', heading.value, 'pivot');
                        setDeleteCol(heading.count);
                      }}
                    >
                      {heading.value}
                    </th>
                  );
                }
                return (
                  <RotatedTh
                    onClick={() => {
                      setModal('heading', heading.value);
                      setDeleteCol(heading.count);
                    }}
                    className='text-white primary cursor-pointer'
                    type={heading.type}
                  >
                    {heading.value}
                  </RotatedTh>
                );
              }
              // Else: Heading.type === 'parent'
              return (
                <>
                  <RotatedTh
                    className='text-white primary cursor-pointer'
                    onClick={() =>
                      setToggles({
                        ...toggles,
                        [`toggle${index + 1}`]: !toggles[`toggle${index + 1}`],
                      })
                    }
                    onContextMenu={() => {
                      setModal('heading', heading.value, 'parent');
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
                              setModal('heading', each.value);
                              setDeleteCol(each.count);
                            }}
                            className='cursor-pointer'
                          >
                            {each.value}
                          </RotatedTh>
                        );
                      })}
                    </>
                  )}
                </>
              );
            })}
          </tr>

          {/* Locations */}
          {Object.entries(data.content).map((location, index) => {
            return (
              <>
                <Box
                  as='tr'
                  className='pointer text-white '
                  onClick={() => {
                    setRowToggles({
                      ...rowToggles,
                      [`toggle${index + 1}`]: !rowToggles[`toggle${index + 1}`],
                    });
                  }}
                  onContextMenu={() => {
                    onLocationModalOpen();
                    setModal('location', location[0], null, null, 'parent');

                    const { rows } = data;
                    const idx = rows.findIndex((row) => row === location[0]);
                    setDeleteRow(idx);
                  }}
                >
                  <Flex
                    justifyContent='space-between'
                    alignItems='center'
                    as='td'
                    cursor='pointer'
                    className='primary min-w-36 md:min-w-56 p-2'
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
                        isEdited={isEdited(value)}
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
