import styled from 'styled-components';

const ButtonBox = styled.button`
  background: ${({primary}) => (primary ? '#214e34' : 'white')};
  color: ${({primary}) => (primary ? 'white' : 'black')};
  margin: 10px;
  padding: 10px 10px;
  border-radius: 3px;
  cursor: pointer;
`;

export const Button = ({ primary, handleClick, children }) => {
    return (
        <div>
            <ButtonBox primary={primary} onClick={handleClick}>{children}</ButtonBox>
        </div>
    );
}