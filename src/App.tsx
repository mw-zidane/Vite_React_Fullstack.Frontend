import { TableContainer, Table, Text, Thead, Tr, Th, Tbody, Td, Box, Flex, Heading, Button, HStack, Avatar, useDisclosure, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Portal, PopoverFooter, useToast } from '@chakra-ui/react'
import './App.css'
import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons'
import axios from 'axios'
import { BASE_URL } from './constant'
import { useEffect, useState } from 'react'
import type { Product } from './types/product'
import ProductSkeleton from './components/ProductSkeleton'
import ProductForm from './components/ProductForm'
import ViewDetail from './components/ViewDetail'

function App() {

  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isOpen: viewDialogOpen, onClose: viewDialogClose, onOpen: onViewDialogOpen } = useDisclosure();
  const [currentData, setCurrentData] = useState<Product>({} as Product);

  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = () => {
    setIsLoading(true);
    axios.get(BASE_URL + "Product").then(response => {
      setData(response.data);
    }).catch(error => {
      console.log(error);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  const getProduct = (id: number) => {
    axios.get<Product>(BASE_URL + "Product/" + id)
      .then(res => {
        setCurrentData(res.data);

        onOpen();
      })
      .catch(err => console.log(err))
  }

  const handleAdd = () => {
    onOpen();
    setCurrentData({} as Product);
  }

  const onDeleteHandle = (id: number) => {
    axios.delete(BASE_URL + 'Product/' + id)
      .then(() => {
        toast({
          title: "Product Deleted",
          description: "Product Deleted Succesfully",
          isClosable: true,
          duration: 3000
        })

        fetchData();
      })
      .catch(err => console.log(err))
  }

  const handleViewDetail = (id: number) => {
    axios.get<Product>(BASE_URL + 'Product/' + id)
      .then(res => {
        setCurrentData(res.data);
        onViewDialogOpen();
      })
      .catch(err => console.log(err))
  }

  if (isLoading) return <ProductSkeleton />

  return (
    <Box
      shadow={'md'}
      rounded={'md'}
      m={32}
    >
      <Flex px={5}
        justifyContent={'space-between'}
        alignItems={'center'}
        mb={5}
      >
        <Heading fontSize={25}>
          Product List
        </Heading>
        <Button
          colorScheme='blue'
          leftIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Add Product
        </Button>
      </Flex>
      <TableContainer>
        <Table variant='striped'>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Is In Store?</Th>
              <Th isNumeric>Price</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              data.map((product: Product) => (
                <Tr key={product.id}>
                  <Td>{product.id}</Td>
                  <Td>
                    <HStack>
                      <Avatar size='sm' name={product.name} />
                      <Text>{product.name}</Text>
                    </HStack>
                  </Td>
                  <Td>{product.description}</Td>
                  <Td>
                    {product.isInStore ? 'Yes' : 'No'}
                  </Td>
                  <Td isNumeric>{product.price}</Td>
                  <Td>
                    <HStack gap={3}>
                      <EditIcon
                        cursor={'pointer'}
                        onClick={() => getProduct(product.id)}
                        boxSize={22} color={'blue'}
                      />
                      <Popover>
                        <PopoverTrigger>
                          <DeleteIcon cursor={'pointer'} boxSize={22} color={'red'} />
                        </PopoverTrigger>
                        <Portal>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverHeader>Confirmation</PopoverHeader>
                            <PopoverCloseButton />
                            <PopoverBody>
                              Are you sure to delete this?
                            </PopoverBody>
                            <PopoverFooter>
                              <Button
                                colorScheme='red'
                                float={'right'}
                                onClick={() => onDeleteHandle(product.id)}
                              >Delete</Button>
                            </PopoverFooter>
                          </PopoverContent>
                        </Portal>
                      </Popover>
                      <ViewIcon
                        onClick={() => handleViewDetail(product.id)}
                        cursor={'pointer'}
                        boxSize={22}
                        color={'green'} />
                    </HStack>
                  </Td>
                </Tr>
              ))
            }
          </Tbody>
        </Table>
      </TableContainer>

      {
        data.length == 0 && <Heading p={5} textAlign={'center'} fontSize={14}>No Data</Heading>
      }

      {isOpen && (
        <ProductForm
          currentData={currentData}
          isOpen={isOpen}
          onClose={onClose}
          fetchProduct={fetchData}
        />
      )}

      {viewDialogOpen && <ViewDetail
        isOpen={viewDialogOpen}
        onClose={viewDialogClose}
        currentData={currentData}
      />
      }
    </Box>
  )
}

export default App;
