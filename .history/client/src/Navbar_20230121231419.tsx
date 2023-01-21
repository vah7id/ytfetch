import {
  Box,
  Flex,
  HStack,
  Link,
  useColorModeValue,
  Heading,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { isLocalHost } from './utils/helpers';

// const Links = ['Dashboard', 'Projects', 'Team'];

// const NavLink = ({ children }: { children: ReactNode }) => (
//   <Link
//     px={2}
//     py={1}
//     rounded={'md'}
//     _hover={{
//       textDecoration: 'none',
//       bg: useColorModeValue('gray.200', 'gray.700'),
//     }}
//     href={'#'}
//   >
//     {children}
//   </Link>
// );

export default function Navbar() {
  // const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <Heading size="lg" className="special-elite-font">
              <Link
                href={`${
                  isLocalHost
                    ? 'http://localhost:3000'
                    : '/'
                }`}
                _hover={{ textDecoration: 'none', color: 'gray.500' }}
              >
                YOUTUBE DOWNLOADER TOOL
              </Link>
            </Heading>
          </HStack>
          <Flex alignItems={'center'}>
            <ColorModeSwitcher />
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
