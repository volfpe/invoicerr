import { css } from 'styled-components'

export const BREAKPOINTS_MIN = {
    XS: '0px',
    SM: '576px',
    MD: '768px',
    LG: '992px',
    XL: '1200px',
    HG: '1768px',

}

export const BREAKPOINTS_MAX = {
    SM: '575.98px',
    MD: '767.98px',
    LG: '991.98px',
    XL: '1199.98px',
    HG: '1767.98px',

}

export const COLORS = {
    white: '#fff',
    black: '#000',
    clouds: '#ecf0f1',
    silver: '#bdc3c7',
    river: '#3498db',
    belize: '#2980b9',
    nephritis: '#27ae60',
    alizarin: '#e74c3c',
    pomegranate: 'rgba(192, 57, 43,1.0)',
    asbestos: '#7f8c8d',
    darkOverlay: 'rgba(10, 10, 10, 0.6)',
    midnight: 'rgba(44, 62, 80,1.0)',
    transparent: 'rgba(0, 0, 0,0)',
}

export const FONTS = {
    montserrat: css`
        font-family: 'Montserrat', sans-serif;
    `
}

export const shadow = css`
    box-shadow: 0px 0px 20px 0px rgba(189,195,199,1);
`

export const textInput = css`
    border: 0;
    border-radius: 0;
    background-color: ${COLORS.clouds};
    ${FONTS.montserrat}
    font-size: 15px;
    height: 25px;
    padding: 15px;
   
    &:focus {
        outline: none;
        height: 21px;
        border: 2px solid ${COLORS.belize};
    }
`

export const button = css`
    font-size: 15px;
    font-weight: bold;
    color: ${COLORS.white};
    border: 0;
    background-color: ${COLORS.belize};
    border-radius: 0;
    box-sizing: content-box;
    height: 25px;
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const smallButton = css`
    ${button}
    font-size: 12px;
    height: 20px;
    padding: 8px;
`