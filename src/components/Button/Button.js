import React from 'react';
import styled from 'styled-components';

function Button({name, icon, inClick, bg, bPad, color, bRad}) {
    return (
        <ButtonStyled style={{
            background: bg,
            padding: bPad,
            borderRadius: bRad,
            color: color
        }} onClick={inClick}>
            {icon}
            {name}
        </ButtonStyled>
    );
};

const ButtonStyled = styled.button`
    font-family: inherit;
    display: flex;
    align-items: center;
    gap: 0.5em;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.4s ease-in-out;
`

export default Button;