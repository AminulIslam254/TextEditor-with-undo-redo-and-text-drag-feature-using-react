import React, { useEffect, useState } from 'react';
import FontSelect from './FontSelect'
import { useDispatch, useSelector } from 'react-redux';
import { Button, ColorPicker, Input, InputNumber } from 'antd';
import { UndoOutlined, RedoOutlined } from '@ant-design/icons';


const Home = () => {

  //redux part
  const products = useSelector((state) => state);
  const dispatch = useDispatch();

  const [changedValues, setChangedValues] = useState([{ size: 18, color: "#000000", text: "text", font: "'Roboto', sans-serif" }]);
  const [tempVal, setTempVal] = useState("TEXT")
  const [currentInd, setCurrentInd] = useState(0);
  const [dragProperties, setDragProperties] = useState({
    position: "static",
    left: 0,
    top: 0
  })


  // useEffect(() => {
  //   console.log(changedValues, currentInd);
  // }, [changedValues])
  useEffect(() => {
    if (products.allProducts.textFont !== changedValues[changedValues.length - 1].font) {
      const newArray = changedValues.slice(0, currentInd + 1);
      setChangedValues(newArray);
      setChangedValues((prevState) => {
        const newText = [...prevState];
        newText.push({
          text: prevState[prevState.length - 1].text,
          size: prevState[prevState.length - 1].size,
          color: prevState[prevState.length - 1].color,
          font: products.allProducts.textFont
        });
        setCurrentInd(currentInd + 1)
        return newText;
      });
    }

  }, [products.allProducts.textFont])


  const handleColorChange = (value) => {
    const newArray = changedValues.slice(0, currentInd + 1);
      setChangedValues(newArray);
    setChangedValues((prevState) => {
      const newText = [...prevState];
      newText.push({
        text: prevState[currentInd].text,
        size: prevState[currentInd].size,
        color: `rgb(${value.metaColor.r},${value.metaColor.g},${value.metaColor.b})`,
        font: prevState[currentInd].font
      });
      setCurrentInd(currentInd + 1)
      return newText;
    });
  }

  const handleDrop = (e) => {
    e.preventDefault();
    // console.log(e);
    let left1 = e.clientX - 402, top1 = e.clientY - 397;
    setDragProperties({
      position: "relative",
      left: (left1 < 0) ? left1 + (changedValues[currentInd].size) : left1 - changedValues[currentInd].size,
      top: (top1 < 0) ? top1 + (changedValues[currentInd].size / 2) : top1 - (changedValues[currentInd].size / 2)
    });
  }

  return (

    <>
      <div style={{ width: "100%", height: 706, display: "flex", justifyContent: "center" }}>
        <div style={{ width: "95%", height: 706 }}>

          <div style={{ width: "100%", height: "10%", border: "2px solid black", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ width: "22%", display: "flex", justifyContent: "space-between" }}>
              <Button style={{zIndex:1}} type="primary" danger onClick={() => { (currentInd - 1 >= 0) ? setCurrentInd(currentInd - 1) : setCurrentInd(currentInd) }}><UndoOutlined />UNDO</Button>
              <Button style={{zIndex:1}} type="primary" onClick={() => { (currentInd + 1 < changedValues.length) ? setCurrentInd(currentInd + 1) : setCurrentInd(currentInd) }}><RedoOutlined />REDO</Button>
            </div>

          </div>

          <div style={{ width: "100%", height: "90%", display: "flex", flexDirection: "row" }}>
            <div onDragOver={(e) => { e.preventDefault() }} onDrop={handleDrop} style={{ width: "70%", height: "100%", border: "2px solid black", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <h3 draggable style={{
                fontSize: changedValues[currentInd].size, color: changedValues[currentInd].color, cursor: "move",
                position: dragProperties.position, left: dragProperties.left,
                top: dragProperties.top,
                fontFamily: changedValues[currentInd].font
              }}
              >{changedValues[currentInd].text}</h3>
            </div>
            <div style={{ width: "30%", height: "100%", border: "2px solid black", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ width: "100%", height: "40%", display: "flex", alignItems: "center", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "column", width: "95%" }}>
                  <h3>Font</h3>
                  <FontSelect />
                </div>
                <div style={{ display: "flex", flexDirection: "row", width: "95%" }}>
                  <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
                    <h3>Size</h3>
                    <InputNumber min={1} defaultValue={18} onChange={(value) => {
                      const newArray = changedValues.slice(0, currentInd + 1);
                      setChangedValues(newArray);
                      setChangedValues((prevState) => {
                        const newText = [...prevState];
                        newText.push({
                          text: prevState[currentInd].text,
                          size: value,
                          color: prevState[currentInd].color,
                          font: prevState[currentInd].font
                        });

                        return newText;
                      });
                      setCurrentInd(currentInd + 1);
                    }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", width: "50%", alignItems: "center" }}>
                    <h3>Color</h3>
                    <ColorPicker defaultValue={"black"} onChangeComplete={handleColorChange} />
                  </div>
                </div>
              </div>
              <div style={{ width: "100%", height: "20%", display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center" }}>
                <Input style={{ width: "90%" }} placeholder="Enter Text" onChange={(e) => { setTempVal(e.target.value) }} />
                <Button style={{ width: "40%", height: "fit-content" }} type="primary" onClick={() => {
                  const newArray = changedValues.slice(0, currentInd + 1);
                  setChangedValues(newArray);
                  setChangedValues((prevState) => {
                    const newText = [...prevState];
                    newText.push({
                      text: tempVal,
                      size: prevState[currentInd].size,
                      color: prevState[currentInd].color,
                      font: prevState[currentInd].font
                    });
                    return newText;
                  });
                  setCurrentInd(currentInd + 1);
                }}>CHANGE TEXT</Button>
              </div>
            </div>
          </div>


        </div>
      </div>

    </>
  )
}

export default Home