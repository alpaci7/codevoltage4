import styled from "styled-components";

const Button = styled.button`

    width: ${props=>props.$Width || "60%"};
    height: ${props=>props.$Height || "50%"};
    background-color: ${props=>props.$BackgroundColor || "var(--button-background-color)"};
    border: ${props=>props.$Border || "none"};
    border-radius: ${props=>props.$BorderRadius || "0px"};
    cursor: pointer;
    padding: ${props=>props.$Padding || "20px"};
    font-size: ${props=>props.$FontSize || "22px"};
    outline : none;

    color : ${props=>props.$Color || "var(--color)"};
    
    &:hover{
        background-color: ${props=>props.$HoverBackgroundColor || "var(--button-hover-background-color)"}; 
        color : ${props=>props.$HoverColor || "var(--hover-color)"};
    
    }
    &:focus{
        outline : ${props => props.$Outline || "3px solid #405f69"};
    }
    &:disabled{
        background-color: var(--button-disabled-background-color);
        color : var(--color);
        outline: 2px solid var(--button-disabled-background-color);
        margin-right: 1.8px
    }
`

export {Button};