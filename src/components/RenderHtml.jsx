// Styles




// 
export default function RenderHtml({ display }) {
  
  return <div dangerouslySetInnerHTML={{__html: display}} />
}