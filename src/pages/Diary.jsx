import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import Layout from "../components/Layout";

function Upload() {
  return (
    <Layout>
      <div className="w-full bg-white shadow-lg p-4">
        <h3>Nhật ký here</h3>
        <TableContainer marginTop={6}>
          <Table size="sm" variant="striped">
            <Thead>
              <Tr>
                <Th>MSCT</Th>
                <Th>Nội dung công việc</Th>
                <Th rowSpan="2">Biễu mẫu</Th>
                {Array.from({ length: 10 }, (_, i) => (
                  <Th>
                    <Tr>
                      <Th colspan="2">
                        T{i + 2} <br /> 1
                      </Th>
                    </Tr>
                    <Tr>
                      <Td>S</Td>
                      <Td>C</Td>
                    </Tr>
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {Array.from({ length: 8 }, (_, i) => (
                <Tr className="cursor-pointer" key={i}>
                  <Td>Trần Văn A</Td>
                  <Td>Chỉ huy trưởng công trình</Td>
                  <Td>0987654321</Td>
                  {Array.from({ length: 10 }, (_, i) => (
                    <Td>
                      <Td>x</Td>
                      <Td>x</Td>
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </Layout>
  );
}

export default Upload;
