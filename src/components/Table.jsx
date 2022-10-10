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
import AddListMaterial from './modals/AddListMaterial';
import AddLocation from './modals/AddLocation';
import AddMaterial from './modals/AddMaterial';
import AddPillar from './modals/AddPillar';
import TotalDetailsCellModal from './modals/TotalsDetailCellModal';

function Table({
  data,
  removeCol,
  editCell,
  removeRow,
  removeExpandableCol,
  removeExpandableRow,
  addLocation,
  addListMaterial,
  addMaterial,
  addPillar,
  cancel,
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
  const [deleteExpandableCol, setDeleteExpandableCol] = useState(null);
  const [deleteRow, setDeleteRow] = useState(null);
  const [addExpandableRow, setAddExpandableRow] = useState(null);
  const [addCol, setAddCol] = useState(null);
  const [selectedCell, setSelectedCell] = useState({
    col: null,
    row: null,
  });
  const [isChanged, setIsChanged] = useState(false);

  const [toggles, setToggles] = useState(() => {
    const stateToggles = {};
    for (let i = 1; i <= data.expandableHeadings.length; i++) {
      const propName = `toggle${i}`;
      stateToggles[propName] = true;
    }

    return stateToggles;
  });

  const [rowToggles, setRowToggles] = useState(() => {
    const rToggles = {};

    for (let i = 1; i <= Object.keys(data.expandableContent).length; i++) {
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

  const setModal = ({
    type,
    value,
    rowContent = null,
    colContent = null,
    isParent = 'child',
  }) => {
    setModalHeading(value);
    setModalType(isParent);

    const { headings, rows, original } = data;

    const rowIdx = rows.findIndex(
      (row, idx) => row.value === rowContent && !isEdited(original[idx]),
    );
    const colIdx = headings.findIndex((col) => col === colContent);

    setSelectedCell({ col: colIdx, row: rowIdx });

    if (type === 'heading') {
      onHeadingModalOpen();
    } else if (type === 'location') {
      onLocationModalOpen();
    } else if (type === 'cell') {
      onCellModalOpen();
    }
  };

  const handleCancelContent = () => {
    cancel();
    setIsChanged(false);
  };

  const onCellSubmit = (formData) => {
    setIsChanged(true);

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

  const Tr = ({ d, isLastThree, edited }) => {
    return (
      <Box
        as='tr'
        bg={isLastThree ? '#EDF2F6' : '#EDF2F666'}
        opacity={edited ? '0.7' : '1'}
      >
        {data.expandableHeadings.map((heading, i) => {
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
                  if (!isLastThree && !edited) {
                    if (i === 0) {
                      setModal({
                        type: 'location',
                        value: d[heading.count].value,
                      });

                      const { rows } = data;
                      const index = rows.findIndex(
                        (row) => row === d[heading.count],
                      );
                      setDeleteRow(index);
                    } else if (i === 1) {
                      setModal({
                        type: 'cell',
                        value: `${d[0].value} - ${heading.value}`,
                        rowContent: d[0].value,
                        colContent: heading.value,
                      });
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
                    setModal({
                      type: 'location',
                      value: d[heading.count].value,
                    });
                  }
                }}
              >
                {d?.[heading.count]?.value}
              </Td>

              {toggles[`toggle${i + 1}`] && (
                <>
                  {heading.children.map((child) => {
                    return (
                      <Td
                        cursor='pointer'
                        {...renderColor(
                          d?.[child.count]?.status,
                          d?.[child.count]?.edited,
                        )}
                        onClick={() => {
                          if (!isLastThree && d[child.count] && !edited) {
                            setModal({
                              type: 'cell',
                              value: `${d[0].value} - ${child.value}`,
                              rowContent: d[0].value,
                              colContent: child.value,
                            });
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
    const handleAddMaterial = ({ materialName }) => {
      setIsChanged(true);
      addMaterial(materialName, addCol);
      onHeadingModalClose();
    };

    const ParentBody = () => {
      return (
        <>
          <AddMaterial onSubmit={handleAddMaterial}>
            <Button isFullWidth variant='gray' mr='4'>
              Thêm vật tư
            </Button>
          </AddMaterial>

          <Button
            isFullWidth
            onClick={() => {
              removeExpandableCol(deleteCol, deleteExpandableCol);
              onHeadingModalClose();
              setIsChanged(true);
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
        setIsChanged(true);

        onHeadingModalClose();
        addLocation(formData);
      };

      const onSubmitListMaterial = (formData) => {
        setIsChanged(true);

        onHeadingModalClose();
        addListMaterial(formData);
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

          <AddListMaterial onSubmit={onSubmitListMaterial}>
            <Button isFullWidth>Thêm DS vật tư</Button>
          </AddListMaterial>
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
      const handleAddPillar = ({ pillarName }) => {
        setIsChanged(true);

        addPillar(pillarName, addExpandableRow);
        onLocationModalClose();
      };
      return (
        <>
          <AddPillar
            isFullWidth
            variant='gray'
            mr='4'
            onSubmit={handleAddPillar}
          >
            <Button isFullWidth variant='gray' mr='4' onClick={null}>
              Thêm trụ
            </Button>
          </AddPillar>
          <Button
            isFullWidth
            onClick={() => {
              removeExpandableRow(deleteRow);
              onLocationModalClose();
              setIsChanged(true);
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
            setIsChanged(true);

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
      <Flex justifyContent='space-between'>
        <Box>
          <p className='font-bold text-md mt-2'>
            Tổng kê Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </p>
          <p className='text-xs mb-3'>
            Cập nhật lần cuối vào 12:05:16 ngày 12/5/2022.
          </p>
        </Box>
        <Flex>
          {isChanged && (
            <>
              <Button onClick={handleCancelContent} mr='0.5rem'>
                Huỷ
              </Button>
              <Button variant='primary'>Lưu </Button>
            </>
          )}
        </Flex>
      </Flex>

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
            {data.expandableHeadings.map((heading, index) => {
              if (heading.type === 'child') {
                if (index === 0) {
                  return (
                    <th
                      className='min-w-36 md:min-w-56 text-white primary cursor-pointer'
                      onClick={() => {
                        onHeadingModalOpen();
                        setModal({
                          type: 'heading',
                          value: heading.value,
                          isParent: 'pivot',
                        });
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
                      setModal({ type: 'heading', value: heading.value });
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
                      setModal({
                        type: 'heading',
                        value: heading.value,
                        isParent: 'parent',
                      });
                      setDeleteCol(heading.count);
                      setDeleteExpandableCol(index);
                      setAddCol(heading.value);
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
                      {heading.children.map((each) => {
                        return (
                          <RotatedTh
                            onClick={() => {
                              setModal({ type: 'heading', value: each.value });
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
          {Object.entries(data.expandableContent).map((location, index) => {
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
                    setAddExpandableRow(location[0]);
                    onLocationModalOpen();
                    setModal({
                      type: 'location',
                      value: location[0],
                      isParent: 'parent',
                    });

                    const { rows } = data;
                    const idx = rows.findIndex(
                      (row) => row.value === location[0],
                    );
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
                        edited={isEdited(value)}
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
