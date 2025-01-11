import { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './tilecalculator.css'
import loginImage from './login.jpg';
const TileCalculator = () => {
  const [tileHeight, setTileHeight] = useState('');
  const [tileWidth, setTileWidth] = useState('');
  const [roomHeight, setRoomHeight] = useState('');
  const [roomWidth, setRoomWidth] = useState('');
  const [oneTilePrice, setOneTilePrice] = useState('');
  const [dsTotalTiles, setDsTotalTiles] = useState('');
  const [dsTotalPrice, setDsTotalPrice] = useState('');
  const [wdsTotalTiles, setWdsTotalTiles] = useState('');
  const [wdsTotalPrice, setWdsTotalPrice] = useState('');
  const [overallAmount, setOverallAmount] = useState('');
  const [tileHeightUnit, setTileHeightUnit] = useState('mm');
  const [tileWidthUnit, setTileWidthUnit] = useState('mm');
  const [roomHeightUnit, setRoomHeightUnit] = useState('mm');
  const [roomWidthUnit, setRoomWidthUnit] = useState('mm');
  const [roomSelection, setRoomSelection] = useState('wall');
  const [numberOfWalls, setNumberOfWalls] = useState(0);

  const unitConversion = (value, unit) => {
    switch (unit) {
      case 'cm': return value * 10;
      case 'feet': return value * 304.8;
      case 'inch': return value * 25.4;
      default: return value;
    }
  };

  const handleSubmit = () => {
    const tileHeightMM = unitConversion(parseFloat(tileHeight), tileHeightUnit);
    const tileWidthMM = unitConversion(parseFloat(tileWidth), tileWidthUnit);
    const roomHeightMM = unitConversion(parseFloat(roomHeight), roomHeightUnit);
    const roomWidthMM = unitConversion(parseFloat(roomWidth), roomWidthUnit);

    const thCount = Math.ceil(roomHeightMM / tileHeightMM);
    const twCount = Math.ceil(roomWidthMM / tileWidthMM);
    const dsTotalTilesVar = thCount * twCount;
    const wdsTotalTilesVar = (roomHeightMM * roomWidthMM) / (tileHeightMM * tileWidthMM);
    if (roomSelection === 'wall') {
      setDsTotalTiles(Math.ceil(dsTotalTilesVar * numberOfWalls + dsTotalTilesVar * 0.03));
      setWdsTotalTiles(Math.ceil(wdsTotalTilesVar) * numberOfWalls);
    } else {
      setDsTotalTiles(Math.ceil(dsTotalTilesVar + dsTotalTilesVar * 0.03));
      setWdsTotalTiles(Math.ceil(wdsTotalTilesVar));
    }
    const dsTotalPriceVar = dsTotalTiles * parseFloat(oneTilePrice);
    setDsTotalPrice(Math.round(dsTotalPriceVar));

    const wdsTotalPriceVar = Math.ceil(wdsTotalTiles) * parseFloat(oneTilePrice);
    setWdsTotalPrice(Math.round(wdsTotalPriceVar));

    setOverallAmount(Math.round(dsTotalPriceVar) + Math.round(dsTotalPriceVar * 0.03));
  };

  const handleRoomSelectionChange = (e) => {
    setRoomSelection(e.target.value);
    if (e.target.value === 'wall') {
      setNumberOfWalls(0); // Reset number of walls on selection change
    }
  };

  const handleClear = () => {
    setTileHeight('');
    setTileWidth('');
    setRoomHeight('');
    setRoomWidth('');
    setOneTilePrice('');
    setDsTotalTiles('');
    setDsTotalPrice('');
    setWdsTotalTiles('');
    setWdsTotalPrice('');
    setOverallAmount('');
    setTileHeightUnit('mm');
    setTileWidthUnit('mm');
    setRoomHeightUnit('mm');
    setRoomWidthUnit('mm');
  };

  return (
    <div>
      {/* Header section */}
      <header style={{ textAlign: 'center', marginBottom: '20px', height: '70px'  }}>
        <img 
          src= {loginImage} // Add your image URL here or use a local file path
          alt="Header Background"
          style={{ width: '100%', height: '200px' }}
        />
        <h1 style={{ fontSize: '4rem' }}>"Tile Calculator"</h1>
      </header>

      <div className="container" style={{ width: '35%', marginTop: '290px' }}>
        <form>
          <table>
            <tr>
              <h2>Enter Tile Details</h2>
            </tr>
            <tr>
              <td>Tiles height</td>
              <td>:</td>
              <td>
                <input
                  type="text"
                  value={tileHeight}
                  onChange={(e) => setTileHeight(e.target.value)}
                  onKeyPress={(e) => !/^[0-9]*\.?[0-9]*$/.test(e.key) && e.preventDefault()}
                />
              </td>
              <td>
                <select value={tileHeightUnit} onChange={(e) => setTileHeightUnit(e.target.value)} style={{ width: '70px' }}>
                  <option value="mm">mm</option>
                  <option value="cm">cm</option>
                  <option value="feet">feet</option>
                  <option value="inch">inch</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Tiles width</td>
              <td>:</td>
              <td>
                <input
                  type="text"
                  value={tileWidth}
                  onChange={(e) => setTileWidth(e.target.value)}
                  onKeyPress={(e) => !/^[0-9]*\.?[0-9]*$/.test(e.key) && e.preventDefault()}
                />
              </td>
              <td>
                <select value={tileWidthUnit} onChange={(e) => setTileWidthUnit(e.target.value)} style={{ width: '70px' }}>
                  <option value="mm">mm</option>
                  <option value="cm">cm</option>
                  <option value="feet">feet</option>
                  <option value="inch">inch</option>
                </select>
              </td>
            </tr>
            {/* Added room selection */}
            <tr>
              <td>Room Selection:</td>
              <td>:</td>
              <td>
                <select value={roomSelection} onChange={handleRoomSelectionChange}>
                  <option value="wall">Wall</option>
                  <option value="floor">Floor</option>
                </select>
              </td>
            </tr>
            {roomSelection === 'wall' && (
              <tr>
                <td>Number of Walls:</td>
                <td>:</td>
                <td>
                  <input
                    type="number"
                    value={numberOfWalls}
                    onChange={(e) => setNumberOfWalls(parseInt(e.target.value))}
                  />
                </td>
              </tr>
            )}
          </table>

          <hr />

          <table>
            <tr>
              <h2>Enter Room Details</h2>
            </tr>
            <tr>
              <td>Room height</td>
              <td>:</td>
              <td>
                <input
                  type="number"
                  value={roomHeight}
                  onChange={(e) => setRoomHeight(e.target.value)}
                />
              </td>
              <td>
                <select value={roomHeightUnit} onChange={(e) => setRoomHeightUnit(e.target.value)} style={{ width: '70px' }}>
                  <option value="mm">mm</option>
                  <option value="cm">cm</option>
                  <option value="feet">feet</option>
                  <option value="inch">inch</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Room width</td>
              <td>:</td>
              <td>
                <input
                  type="number"
                  value={roomWidth}
                  onChange={(e) => setRoomWidth(e.target.value)}
                />
              </td>
              <td>
                <select value={roomWidthUnit} onChange={(e) => setRoomWidthUnit(e.target.value)} style={{ width: '70px' }}>
                  <option value="mm">mm</option>
                  <option value="cm">cm</option>
                  <option value="feet">feet</option>
                  <option value="inch">inch</option>
                </select>
              </td>
            </tr>
          </table>

          <hr />

          <table>
            <tr>
              <td>One Tile price</td>
              <td>:</td>
              <td>
                <input
                  type="text"
                  value={oneTilePrice}
                  onChange={(e) => setOneTilePrice(e.target.value)}
                />
              </td>
            </tr>
          </table>

          <hr />

          <table id="button_table">
            <tr>
              <td><input type="button" value="submit" onClick={handleSubmit} /></td>
              <td><input type="button" value="clear" onClick={handleClear} /></td>
            </tr>
          </table>

          <hr />

          <table>
            <tr>
              <h2>Designable Tiles Ans.</h2>
            </tr>
            <tr>
              <td>TOTAL TILES</td>
              <td>:</td>
              <td><input type="text" value={dsTotalTiles} readOnly /></td>
            </tr>
            <tr>
              <td>TOTAL PRICE</td>
              <td>:</td>
              <td><input type="text" value={dsTotalPrice} readOnly /></td>
            </tr>
          </table>

          <hr />

          <table>
            <tr>
              <h2>UnDesignable Tiles Ans.</h2>
            </tr>
            <tr>
              <td>TOTAL TILES</td>
              <td>:</td>
              <td><input type="text" value={wdsTotalTiles} readOnly /></td>
            </tr>
            <tr>
              <td>TOTAL PRICE</td>
              <td>:</td>
              <td><input type="text" value={wdsTotalPrice} readOnly /></td>
            </tr>
          </table>

          <table>
            <tr>
              <h2>Accidental Coverage</h2>
            </tr>
            <tr>
              <td>Overall Amount</td>
              <td>:</td>
              <td><input type="text" value={overallAmount} readOnly /></td>
            </tr>
          </table>
        </form>
      </div>
    </div>
  );
};

export default TileCalculator;
