import React from 'react';
import styled from 'styled-components';

const ButtonStyled = styled.button`
    margin-top: 30px;
    padding: 13px 120px;


    border-radius: 5px;
    border: none;
    background-color: ${({ theme }) => theme.colors.button};
    cursor: pointer;
    &:hover{
        transform: scale(1.05);
    }

    &:disabled{
        background-color: ${({ theme }) => theme.colors.buttonDisabled};
    }
`;

export default function Button({ name, value }) {
  return (
    <ButtonStyled disabled={name}> { value } </ButtonStyled>
  );
}
