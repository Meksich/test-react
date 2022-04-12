import styled from "styled-components";

export const CardDeck = styled.div`
border-radius: 10px;
border: solid;
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

export const CardWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin: 20px 0;
    /*  flex-direction: row; */
    flex-wrap: wrap; 
`

export const StyledHeader = styled.h3`
width: 500px;
text-align: end;
font-style: italic;
`

export const AddCardButton = styled.button`
background-color: black;
    border-radius: 5px;
    padding-left: 0.5vw;
    width: 15vw;
    height: 5vh;
    color: #C6C6C6;
    :hover{
        background-color: #454545;
    }
`