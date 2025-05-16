// import React from "react";

import { AddIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Button, TableContainer, Table, Text, Thead, Tr, Th, Tbody, Td, HStack, Skeleton, SkeletonCircle } from "@chakra-ui/react";

const ProductSkeleton = () => {
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
                <Heading fontSize={32}>
                    <Skeleton>Product List</Skeleton>
                </Heading>
                <Skeleton>
                    <Button
                        colorScheme='blue'
                        leftIcon={<AddIcon />}
                    >
                        <Skeleton>Add Product</Skeleton>
                    </Button>
                </Skeleton>
            </Flex>
            <TableContainer>
                <Table variant='striped'>
                    <Thead>
                        <Tr>
                            <Th>
                                <Skeleton>ID</Skeleton>
                            </Th>
                            <Th>
                                <Skeleton>Name</Skeleton>
                            </Th>
                            <Th>
                                <Skeleton>Description</Skeleton>
                            </Th>
                            <Th>
                                <Skeleton>Is In Stock?</Skeleton>
                            </Th>
                            <Th isNumeric>
                                <Skeleton>Price</Skeleton>
                            </Th>
                            <Th>
                                <Skeleton>Actions</Skeleton>
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            Array.from({ length: 5 }).map((_, index) => (
                                <Tr key={index}>
                                    <Td>
                                        <Skeleton>01</Skeleton>
                                    </Td>
                                    <Td>
                                        <HStack>
                                            <SkeletonCircle>AD</SkeletonCircle>
                                            <Text>
                                                <Skeleton>Name</Skeleton>
                                            </Text>
                                        </HStack>
                                    </Td>
                                    <Td>
                                        <Skeleton>Product description</Skeleton>
                                    </Td>
                                    <Td>
                                        <Skeleton>Yes</Skeleton>
                                    </Td>
                                    <Td isNumeric>
                                        <Skeleton>123</Skeleton>
                                    </Td>
                                    <Td>
                                        <HStack>
                                            <SkeletonCircle>1</SkeletonCircle>
                                            <SkeletonCircle>2</SkeletonCircle>
                                            <SkeletonCircle>3</SkeletonCircle>
                                        </HStack>
                                    </Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default ProductSkeleton;