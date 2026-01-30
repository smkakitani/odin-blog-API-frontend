// Styles
import styled from "styled-components";




// 
const DivStyle = styled.div`
  padding: 1rem 0;
`;
export default function RenderHtml({ display }) {
  
  return <DivStyle dangerouslySetInnerHTML={{__html: display}} />
}