import styled from "styled-components";

const Form = styled.form`
    width : 100%;
    height : 100%;
    margin: 10px auto;
    padding : 20px auto; 
    display : block;
    flex-direction : column;
    align-items : center;
    justify-content : center;
`

const Input = styled.input.attrs((props)=>({
    type : props.$InputType
}))`
    opacity: ${props => props.$InputType === "checkbox"   ? "0;" : "1;"}
    font-size : 20px;
    margin: 10px;
    padding : 10px;   
    outline : none;
    background-color: var(--input-background-color);
    &:hover{
        border : 5px solid #7cb9cd;
        
    } 
    &:focus{
        outline : 3px solid #7cb9cd;
    }

    &:hover + Span{
        background-color: #bdd5dd;
    }
    &::placeholder{
        color: var(--color);
    }
   
`

const Label = styled.label`

    font-size : 22px;
    width: 250px;
    display: block;
    position: relative;
    padding-left: 50px;
    margin-bottom: 12px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`

const Span = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #ccc;

    border-radius : 0%;
    
    &:after {
        content: "";
        position: absolute;
        left: 8px;
        top: 5px;
        
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        border-radius: 0;
        transform:  rotate(45deg);
        background : none;
        display: none;
    }
    ${Input}:checked + & {
        background-color: #2fa7cf;
        
    }
    ${Input}:checked + &:after {
        display: block;
    }



`




export {Form, Label, Input, Span};