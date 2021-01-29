import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Widget = styled.div`
  margin: 24px 0px 24px 0px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-radius: 4px;
  overflow: hidden;

  h1, h2, h3 {
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0;
  }

  p{
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
  }
`;

Widget.Header = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 18px 32px;
  background-color: ${({ theme }) => theme.colors.primary};

  *{
    margin: 0;
  }
`;

Widget.Content = styled.div`
  padding: 15px 6.7%;
  display: flex;
  justify-content: center;
  flex-direction: column;

  & > *:first-child{
    margin-top: 0;
  }

  & > *:last-child{
    margin-bottom: 0;
  }

  ul {
    list-style: none;
    padding: 0;
  }
  h4{
    font-size: 13px;
    text-align: center;
  }
`;

Widget.Body = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  
  input{
    padding: 15px 50px;
    background-color: ${({ theme }) => theme.colors.mainBg};
    color: white;
    border: none;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 3px;
    text-align: center;

    &:focus{
      border: 1px solid ${({ theme }) => theme.colors.primary};
    }
  }

  button{
    margin-top: 30px;
    padding: 13px 120px;

    border-radius: 5px;
    border: none;
    background-color: ${({ theme }) => theme.colors.button};
    cursor: pointer;
  }

  h4{
    font-size: 20px;
    
    strong{
      margin-left: 10px;
      color: ${({ theme }) => theme.colors.button};
    }
  }

`;

Widget.Topic = styled.a`
  outline: 0;
  text-decoration: none;
  color: ${({theme}) => theme.colors.contrastText};
  background-color: ${({theme}) => `${theme.colors.contrastText}40`};
  padding: 10px 15px;
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: ${({theme}) => theme.colors.borderRadius};
  transition: .3s;
  display: block;

  &:hover,
  &:focus{
    opacity: .5
  }
`;

Widget.Card = styled.div`
  width: 100%;
  height: 100%;
  max-height: 300px;

  background: #171B35;
  border: 1px solid #3F51B5;
  box-sizing: border-box;
  border-radius: 4px;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 4px;

    background-color: ${({ theme }) => theme.colors.mainScroll};
    border-radius: 10px;
}

  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: white; 
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
  }

  ul{
    text-align: center;
  }

  li{
    font-size: 19px;

    padding: 5% 0%;
    strong{
    color: ${({ theme }) => theme.colors.button}
  }
  }


`;