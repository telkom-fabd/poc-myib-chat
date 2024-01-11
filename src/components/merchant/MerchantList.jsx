import PropTypes from "prop-types";
import {Flex, HStack, Skeleton, SkeletonCircle} from "@chakra-ui/react";
import MerchantItem from "./MerchantItem.jsx";

const MerchantList = ({isLoading, merchants, onMerchantClick}) => {
    if (isLoading) {
        return (
            <Flex
                flexDir='column'
                justifyContent='start'
                alignItems='start'
                h='500px'
            >
                {
                    [1, 2, 3, 4, 5, 6].map((item, index) => (
                        <HStack
                            key={`merchant-item-skeleton-${index}`}
                            w='100%'
                            h='60px'
                            p={4}
                            borderBottom='1px solid #E2E8F0'
                            gap={3}
                        >
                            <SkeletonCircle size='10'/>
                            <Skeleton w='80%' h='20px'/>
                        </HStack>
                    ))
                }
            </Flex>
        );
    }

    return (
        <Flex
            flexDir='column'
            justifyContent='start'
            alignItems='start'
            h='500px'
            overflow='auto'
        >
            {merchants.map((merchant, index) => (
                <MerchantItem
                    key={`merchant-item-${index}`}
                    name={merchant.name}
                    onClick={() => onMerchantClick(merchant)}
                />
            ))}
        </Flex>
    );
}

MerchantList.propTypes = {
    isLoading: PropTypes.bool,
    merchants: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
    })),
    onMerchantClick: PropTypes.func.isRequired,
};

MerchantList.defaultProps = {
    isLoading: false,
    merchants: [],
}

export default MerchantList;
