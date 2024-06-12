import React, { useState } from "react";
import { Container, VStack, Text, Input, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton } from "@chakra-ui/react";
import { FaTrash, FaPlus } from "react-icons/fa";
import Papa from "papaparse";

const Index = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      complete: (result) => {
        setHeaders(result.data[0]);
        setData(result.data.slice(1));
      },
      header: false,
    });
  };

  const handleAddRow = () => {
    setData([...data, Array(headers.length).fill("")]);
  };

  const handleRemoveRow = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  const handleCellChange = (rowIndex, colIndex, value) => {
    const newData = [...data];
    newData[rowIndex][colIndex] = value;
    setData(newData);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">CSV Upload and Editable Table</Text>
        <Input type="file" accept=".csv" onChange={handleFileUpload} />
        {headers.length > 0 && (
          <>
            <Table variant="simple">
              <Thead>
                <Tr>
                  {headers.map((header, index) => (
                    <Th key={index}>{header}</Th>
                  ))}
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((row, rowIndex) => (
                  <Tr key={rowIndex}>
                    {row.map((cell, colIndex) => (
                      <Td key={colIndex}>
                        <Input
                          value={cell}
                          onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                        />
                      </Td>
                    ))}
                    <Td>
                      <IconButton
                        aria-label="Remove row"
                        icon={<FaTrash />}
                        onClick={() => handleRemoveRow(rowIndex)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Button leftIcon={<FaPlus />} onClick={handleAddRow}>
              Add Row
            </Button>
          </>
        )}
      </VStack>
    </Container>
  );
};

export default Index;