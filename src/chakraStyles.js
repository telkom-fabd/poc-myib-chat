export const colors = {
    primary: {
        900: '#8e1817',
        800: '#b21d1c',
        700: '#df0606',
        600: '#e12d2d',
        500: '#e63946',
        400: '#f56565',
        300: '#f56565',
        200: '#f56565',
        100: '#f56565',
        50: '#f56565',
    },
    secondary: {
        900: '#17538e',
        800: '#1d6cb2',
        700: '#064adf',
        600: '#2d7fe1',
        500: '#3995e6',
        400: '#65aaf5',
        300: '#65aaf5',
        200: '#65aaf5',
        100: '#65aaf5',
        50: '#65aaf5',
    },
}

export const components = {
    Button: {
        baseStyle: {
            fontWeight: 'bold',
            borderRadius: 'base',
        },
        variants: {
            solid: {
                bg: 'primary.500',
                color: 'white',
                _hover: {
                    bg: 'primary.600',
                },
                _active: {
                    bg: 'primary.700',
                },
                _disabled: {
                    bg: 'primary.200',
                    color: 'primary.500',
                },
            },
        },
    },
    Input: {
        variants: {
            outline: {
                field: {
                    _focus: {
                        borderColor: 'primary.500',
                        boxShadow: '0 0 0 1px #e63946',
                    },
                },
            },
        },
    },
}
